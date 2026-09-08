import { db, bucket, owner, error, sameOrigin } from '@/lib/server';
export async function POST(request: Request) { if (!sameOrigin(request))
    return error('This request is not allowed.', 403); if (Number(request.headers.get('content-length') || 0) > 16 * 1024 * 1024)
    return error('Choose a PDF smaller than 15 MB.', 413); try {
    const form = await request.formData();
    const f = form.get('file');
    if (!(f instanceof File))
        return error('Please choose a PDF.', 400);
    if (f.size > 15 * 1024 * 1024)
        return error('Choose a PDF smaller than 15 MB.', 413);
    const data = await f.arrayBuffer();
    const header = new TextDecoder().decode(data.slice(0, 8));
    if (!header.startsWith('%PDF-'))
        return error('This file is not a valid PDF.', 400);
    const id = crypto.randomUUID();
    await bucket().put(id, data, { httpMetadata: { contentType: 'application/pdf' } });
    await db().prepare('INSERT INTO documents (id, owner, name, created_at) VALUES (?, ?, ?, ?)').bind(id, owner(request), f.name.slice(0, 300), Date.now()).run();
    return Response.json({ id, name: f.name }, { status: 201 });
}
catch {
    return error('The PDF could not be imported. Please try again.');
} }
