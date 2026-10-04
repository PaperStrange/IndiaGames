import { bucket, db } from './server';
import { captureMetadataSchema, ORIGINAL_LIMIT, PREPARED_LIMIT, sha256, type PaperCapture } from './paper-capture';

export class CaptureError extends Error {
    constructor(message: string, public status: number) { super(message); }
}
type CaptureRow = { content: string; original_key: string; prepared_key: string; fingerprint: string };

export async function readCapture(user: string, id: string) {
    const row = await db().prepare('SELECT content, original_key, prepared_key, fingerprint FROM paper_captures WHERE owner=? AND id=?')
        .bind(user, id).first<CaptureRow>();
    if (!row) throw new CaptureError('This paper source is unavailable.', 404);
    return { ...row, capture: JSON.parse(row.content) as PaperCapture };
}

export async function saveCapture(user: string, form: FormData): Promise<PaperCapture> {
    const raw = form.get('metadata');
    if (typeof raw !== 'string') throw new CaptureError('Page details are missing.', 400);
    const metadata = captureMetadataSchema.parse(JSON.parse(raw));
    const original = form.get('original'), prepared = form.get('prepared');
    if (!original || typeof original === 'string' || !prepared || typeof prepared === 'string')
        throw new CaptureError('Choose an original photo and prepare its reading copy.', 400);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(original.type) || prepared.type !== 'image/png')
        throw new CaptureError('Use a JPEG, PNG or WebP photo.', 415);
    if (!original.size || original.size > ORIGINAL_LIMIT || !prepared.size || prepared.size > PREPARED_LIMIT)
        throw new CaptureError('The original must be under 15 MB and the reading copy under 1.4 MB.', 413);

    const originalBytes = await original.arrayBuffer(), preparedBytes = await prepared.arrayBuffer();
    const [originalHash, preparedHash] = await Promise.all([sha256(originalBytes), sha256(preparedBytes)]);
    const fingerprint = await sha256(new TextEncoder().encode(JSON.stringify({ metadata, originalHash, preparedHash, name: original.name, type: original.type })).buffer);
    const existing = await db().prepare('SELECT content, fingerprint FROM paper_captures WHERE owner=? AND id=?').bind(user, metadata.id).first<CaptureRow>();
    if (existing) {
        if (existing.fingerprint !== fingerprint) throw new CaptureError('This saved source is immutable. Save the change as a retake.', 409);
        return JSON.parse(existing.content) as PaperCapture;
    }
    if (metadata.parentId) {
        const parent = await readCapture(user, metadata.parentId);
        if (parent.capture.notebookId !== metadata.notebookId) throw new CaptureError('A retake belongs to its original notebook.', 409);
    }
    const capture: PaperCapture = { ...metadata, createdAt: Date.now(), originalName: original.name.slice(0, 300), originalType: original.type, originalBytes: original.size, originalHash, preparedHash };
    const ownerHash = await sha256(new TextEncoder().encode(user).buffer);
    const prefix = `paper/${ownerHash}/${metadata.id}/${fingerprint}`;
    // 原件与派生图片完成写入后，才确认可恢复的来源记录。
    await bucket().put(`${prefix}/original`, originalBytes, { httpMetadata: { contentType: 'application/octet-stream' } });
    await bucket().put(`${prefix}/prepared`, preparedBytes, { httpMetadata: { contentType: 'image/png' } });
    await db().prepare('INSERT OR IGNORE INTO paper_captures(id,owner,notebook_id,content,original_key,prepared_key,fingerprint,created_at) VALUES(?,?,?,?,?,?,?,?)')
        .bind(metadata.id, user, metadata.notebookId, JSON.stringify(capture), `${prefix}/original`, `${prefix}/prepared`, fingerprint, capture.createdAt).run();
    const saved = await readCapture(user, metadata.id);
    if (saved.fingerprint !== fingerprint) throw new CaptureError('Another save used this source ID. Save your photo as a new capture.', 409);
    return saved.capture;
}

export async function captureImage(user: string, id: string, notebookId: string) {
    const row = await readCapture(user, id);
    if (row.capture.notebookId !== notebookId) throw new CaptureError('This source belongs to another notebook.', 403);
    const object = await bucket().get(row.prepared_key);
    if (!object || object.size > PREPARED_LIMIT) throw new CaptureError('The reading copy is unavailable. Your original source is retained.', 503);
    const bytes = new Uint8Array(await object.arrayBuffer());
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    return { capture: row.capture, image: btoa(binary) };
}
