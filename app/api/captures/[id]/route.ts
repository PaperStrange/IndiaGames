import { bucket, owner, error } from '@/lib/server';
import { CaptureError, readCapture } from '@/lib/capture-store';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const row = await readCapture(owner(request), id);
        const asset = new URL(request.url).searchParams.get('asset');
        if (!asset) return Response.json({ capture: row.capture }, { headers: { 'cache-control': 'private, no-store' } });
        if (asset !== 'original' && asset !== 'prepared') return error('Unknown paper asset.', 400);
        const object = await bucket().get(asset === 'original' ? row.original_key : row.prepared_key);
        if (!object) throw new CaptureError('This source file is temporarily unavailable.', 503);
        return new Response(object.body, { headers: {
            'content-type': asset === 'original' ? 'application/octet-stream' : 'image/png',
            'content-disposition': asset === 'original' ? `attachment; filename*=UTF-8''${encodeURIComponent(row.capture.originalName)}` : 'inline',
            'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff',
            'content-security-policy': "default-src 'none'; sandbox",
            etag: `"${asset === 'original' ? row.capture.originalHash : row.capture.preparedHash}"`,
        } });
    } catch (cause) {
        if (cause instanceof CaptureError) return error(cause.message, cause.status);
        console.error('Paper source read unavailable', cause instanceof Error ? cause.name : 'StorageError');
        return error('This paper source could not be opened. Try again.', 503);
    }
}
