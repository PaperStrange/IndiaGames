import { db, bucket, owner, error } from '@/lib/server';
export async function GET(request: Request, { params }: {
    params: Promise<{
        id: string;
    }>;
}) { try {
    const { id } = await params;
    const doc = await db().prepare('SELECT id FROM documents WHERE id = ? AND owner = ?').bind(id, owner(request)).first();
    if (!doc)
        return error('Document not found.', 404);
    const obj = await bucket().get(id);
    if (!obj)
        return error('Document not found.', 404);
    return new Response(obj.body, { headers: { 'content-type': 'application/pdf', 'cache-control': 'private, max-age=300', 'x-content-type-options': 'nosniff' } });
}
catch {
    return error('This PDF is temporarily unavailable.');
} }
