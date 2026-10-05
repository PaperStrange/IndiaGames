import { z } from 'zod';

export const ORIGINAL_LIMIT = 15 * 1024 * 1024;
export const PREPARED_LIMIT = 1400 * 1024;
export const captureMetadataSchema = z.object({
    id: z.string().uuid(),
    notebookId: z.string().min(1).max(100),
    pageLabel: z.string().trim().min(1).max(80),
    parentId: z.string().uuid().optional(),
    rotation: z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]),
    crop: z.object({ left: z.number().min(0).max(.95), top: z.number().min(0).max(.95), right: z.number().min(.05).max(1), bottom: z.number().min(.05).max(1) })
        .refine(c => c.right - c.left >= .05 && c.bottom - c.top >= .05, 'Keep at least 5% of the photo in each direction.'),
}).refine(c => c.id !== c.parentId, 'A retake needs a new source ID.');
export type CaptureMetadata = z.infer<typeof captureMetadataSchema>;
export type PaperCapture = CaptureMetadata & {
    createdAt: number; originalName: string; originalType: string; originalBytes: number;
    originalHash: string; preparedHash: string;
};
export const captureUrl = (base: string, id: string, asset?: 'original' | 'prepared') =>
    `${base.replace(/\/$/, '')}/api/captures/${encodeURIComponent(id)}${asset ? `?asset=${asset}` : ''}`;
export async function sha256(bytes: ArrayBuffer) {
    if (!globalThis.crypto?.subtle) throw new Error('Recovery verification needs HTTPS. Open the secure published notebook to restore this file.');
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
}
