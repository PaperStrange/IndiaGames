import { z } from 'zod';
import { db, owner, sameOrigin, error } from '@/lib/server';
import { CaptureError, saveCapture } from '@/lib/capture-store';

export async function GET(request: Request) {
    const notebookId = new URL(request.url).searchParams.get('notebookId');
    if (!notebookId || notebookId.length > 100) return error('Choose a notebook.', 400);
    try {
        const rows = await db().prepare('SELECT content FROM paper_captures WHERE owner=? AND notebook_id=? ORDER BY created_at DESC,id DESC LIMIT 201')
            .bind(owner(request), notebookId).all<{ content: string }>();
        return Response.json({ captures: rows.results.slice(0, 200).map(row => JSON.parse(row.content)), more: rows.results.length > 200 }, { headers: { 'cache-control': 'private, no-store' } });
    } catch (cause) {
        console.error('Paper source list unavailable', cause instanceof Error ? cause.name : 'StorageError');
        return error('Saved paper pages could not be opened. Try again.', 503);
    }
}

export async function POST(request: Request) {
    if (!sameOrigin(request)) return error('This request is not allowed.', 403);
    const limit = 18 * 1024 * 1024;
    if (Number(request.headers.get('content-length')) > limit) return error('This upload is too large.', 413);
    try {
        const body = await request.arrayBuffer();
        if (body.byteLength > limit) return error('This upload is too large.', 413);
        const form = await new Response(body, { headers: { 'content-type': request.headers.get('content-type') || '' } }).formData();
        const capture = await saveCapture(owner(request), form);
        return Response.json({ capture }, { status: 201, headers: { 'cache-control': 'private, no-store' } });
    } catch (cause) {
        if (cause instanceof CaptureError) return error(cause.message, cause.status);
        if (cause instanceof z.ZodError || cause instanceof SyntaxError) return error('The page details could not be read.', 400);
        console.error('Paper source save unavailable', cause instanceof Error ? cause.name : 'StorageError');
        return error('The photo was not confirmed saved. Keep it open and retry.', 503);
    }
}
