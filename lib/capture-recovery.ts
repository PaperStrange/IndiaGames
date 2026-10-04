import { z } from 'zod';
import { captureMetadataSchema, captureUrl, sha256, type PaperCapture } from './paper-capture';
import { blobDataUrl } from './prepare-photo';

const recoveryItem = z.object({
    capture: captureMetadataSchema.and(z.object({ originalName: z.string().max(300), originalType: z.enum(['image/jpeg', 'image/png', 'image/webp']), originalHash: z.string().regex(/^[a-f0-9]{64}$/), preparedHash: z.string().regex(/^[a-f0-9]{64}$/) })),
    original: z.string().max(22000000), prepared: z.string().max(2000000),
});
const recoverySchema = z.object({ format: z.literal('mentalcity-paper-sources-v1'), sources: z.array(recoveryItem).min(1).max(20) });
export async function readJson<T>(response: Response): Promise<T> {
    const data = await response.json() as { error?: string };
    if (!response.ok) throw new Error(data.error || 'The source operation failed. Your original is retained.');
    return data as T;
}
export async function uploadCapture(base: string, metadata: unknown, original: File, prepared: Blob) {
    const form = new FormData();
    form.set('metadata', JSON.stringify(metadata)); form.set('original', original); form.set('prepared', prepared, 'reading-copy.png');
    const response = await fetch(`${base.replace(/\/$/, '')}/api/captures`, { method: 'POST', body: form, signal: AbortSignal.timeout(45000) });
    return (await readJson<{ capture: PaperCapture }>(response)).capture;
}
export async function exportCapture(base: string, selected: PaperCapture) {
    const sources: z.infer<typeof recoveryItem>[] = [];
    const visited = new Set<string>();
    let capture: PaperCapture | undefined = selected, bytes = 0;
    while (capture) {
        if (visited.has(capture.id) || visited.size >= 20) throw new Error('Export supports up to 20 retakes in one recovery file.');
        visited.add(capture.id);
        const responses = await Promise.all(['original', 'prepared'].map(asset => fetch(captureUrl(base, capture!.id, asset as 'original' | 'prepared'), { signal: AbortSignal.timeout(30000) })));
        if (responses.some(response => !response.ok)) throw new Error('The complete source could not be downloaded. Retry the export.');
        const [original, prepared] = await Promise.all(responses.map(response => response.blob()));
        bytes += original.size + prepared.size;
        if (bytes > 45 * 1024 * 1024) throw new Error('This revision chain exceeds the 45 MB recovery limit. Export its earlier revisions individually.');
        sources.unshift({ capture: recoveryItem.shape.capture.parse(capture), original: await blobDataUrl(new Blob([original], { type: capture.originalType })), prepared: await blobDataUrl(prepared) });
        capture = capture.parentId ? (await readJson<{ capture: PaperCapture }>(await fetch(captureUrl(base, capture.parentId), { signal: AbortSignal.timeout(15000) }))).capture : undefined;
    }
    return new Blob([JSON.stringify({ format: 'mentalcity-paper-sources-v1', sources })], { type: 'application/json' });
}
export async function restoreCapture(base: string, notebookId: string, file: File) {
    if (file.size > 65 * 1024 * 1024) throw new Error('This recovery file exceeds 65 MB.');
    const bundle = recoverySchema.parse(JSON.parse(await file.text()));
    const preparedSources = [];
    const seen = new Set<string>();
    for (const source of bundle.sources) {
        if (source.capture.notebookId !== notebookId) throw new Error('Open the original notebook before restoring its paper sources.');
        if (seen.has(source.capture.id) || (source.capture.parentId && !seen.has(source.capture.parentId))) throw new Error('The recovery file must include each earlier revision first.');
        seen.add(source.capture.id);
        if (!source.original.startsWith(`data:${source.capture.originalType};base64,`) || !source.prepared.startsWith('data:image/png;base64,')) throw new Error('This recovery file has an unsupported image encoding.');
        const [original, prepared] = await Promise.all([fetch(source.original).then(r => r.blob()), fetch(source.prepared).then(r => r.blob())]);
        if (await sha256(await original.arrayBuffer()) !== source.capture.originalHash || await sha256(await prepared.arrayBuffer()) !== source.capture.preparedHash) throw new Error('A source checksum does not match. Nothing from this recovery file has been uploaded.');
        preparedSources.push({ metadata: captureMetadataSchema.parse(source.capture), original: new File([original], source.capture.originalName, { type: source.capture.originalType }), prepared });
    }
    let restored: PaperCapture | undefined;
    // 先检查完整文件，再按原始顺序恢复。重试重复来源时保持同一身份。
    for (const source of preparedSources) restored = await uploadCapture(base, source.metadata, source.original, source.prepared);
    return restored!;
}
