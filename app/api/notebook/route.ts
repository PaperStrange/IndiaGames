import { z } from 'zod';
import { db, owner, error, sameOrigin } from '@/lib/server';
const point = z.tuple([z.number().finite(), z.number().finite(), z.number().min(0).max(1)]);
const stroke = z.object({ purpose: z.literal('annotation').optional(), revision:z.number().int().min(0).optional(), id: z.string().max(100), points: z.array(point).min(1).max(50000), color: z.string().regex(/^#[a-fA-F0-9]{6}$/), size: z.number().min(.1).max(20), tool: z.enum(['pen', 'highlight']), absorbedBy: z.string().max(100).optional() });
const inkBlock = z.object({ pendingInput:z.boolean().optional(),recognitionId:z.string().max(100).optional(),inkIds:z.array(z.string().max(100)).max(2000).optional(),erased:z.array(z.number().int().min(0)).max(10000).optional(),erasedRegions:z.array(z.object({index:z.number().int().min(0),x:z.number().finite(),y:z.number().finite(),w:z.number().finite(),h:z.number().finite()})).max(10000).optional(),mediaUrl:z.string().url().refine(s=>new URL(s).protocol==='https:').optional(),runId:z.string().max(100).optional(),citations:z.array(z.object({id:z.string().max(150),title:z.string().max(500),excerpt:z.string().max(1800),url:z.string().url().optional(),pageId:z.string().max(100).optional(),notebookId:z.string().max(100).optional()})).max(40).optional(), id: z.string().max(100), kind: z.enum(['user', 'text', 'mitosis', 'coordinates', 'doodle', 'table', 'quiz', 'sticker', 'picture', 'video']), font: z.enum(['hand', 'book', 'mono']).optional(), absorbedBy: z.string().max(100).optional(), exchangeId: z.string().max(100).optional(), media: z.enum(['owl', 'forest', 'cell-film']).optional(), text: z.string().max(10000), x: z.number().finite(), y: z.number().finite(), h: z.number().finite(), source: z.string().max(300).optional(), sourcePageId: z.string().max(100).optional(), question: z.string().max(2000).optional(), answer: z.string().max(500).optional(), choices: z.array(z.string().max(500)).max(8).optional(), selected: z.string().max(500).optional(), feedback: z.string().max(2000).optional() });
const pageCapture = z.object({ id: z.string().uuid(), pageLabel: z.string().max(80), transcription: z.string().max(12000).optional() });
const notebook = z.object({ books:z.array(z.object({id:z.string().max(100),title:z.string().max(80)})).max(50).optional(), pages: z.array(z.object({ inkSourcePageId: z.string().max(100).optional(), capture: pageCapture.optional(), notebookId:z.string().max(100).optional(), id: z.string().max(100), title: z.string().max(80), topic: z.string().max(100), paper: z.enum(['grid', 'lined', 'plain']), strokes: z.array(stroke).max(10000), blocks: z.array(inkBlock.extend({ purpose: z.literal('annotation').optional() })).max(500), annotations: z.record(z.array(stroke)).optional(), document: z.object({ id: z.string().max(100), name: z.string().max(300), page: z.number().int().min(1), total: z.number().int().min(1) }).optional() })).min(1).max(200) });
export async function GET(request: Request) { try {
    const row = await db().prepare('SELECT content, updated_at FROM notebooks WHERE owner = ?').bind(owner(request)).first<{
        content: string;
        updated_at: number;
    }>();
    return Response.json({ notebook: row ? JSON.parse(row.content) : null, version: row?.updated_at || 0, owner: owner(request) }, { headers: { 'Cache-Control': 'no-store' } });
}
catch {
    return error('Saved notes could not be opened. Please try again.');
} }
export async function PUT(request: Request) { if (!sameOrigin(request))
    return error('This request is not allowed.', 403); try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 1800000)
        return error('This notebook is full. Export a page before adding more ink.', 413);
    const parsed = notebook.safeParse(JSON.parse(raw));
    if (!parsed.success)
        return error('Some notebook data could not be saved.', 400);
    const expected = Number(request.headers.get('X-Notebook-Version'));
    if (!request.headers.has('X-Notebook-Version') || !Number.isSafeInteger(expected) || expected < 0)
        return error('Reload the notebook before saving.', 428);
    const version = Math.max(Date.now(), expected + 1);
    const result = expected === 0 ? await db().prepare('INSERT OR IGNORE INTO notebooks (owner, content, updated_at) VALUES (?, ?, ?)').bind(owner(request), JSON.stringify(parsed.data), version).run() : await db().prepare('UPDATE notebooks SET content = ?, updated_at = ? WHERE owner = ? AND updated_at = ?').bind(JSON.stringify(parsed.data), version, owner(request), expected).run();
    if (!result.meta.changes)
        return error('This notebook changed in another tab. Export your page, then reload to keep the newer notes safe.', 409);
    return Response.json({ saved: true, version });
}
catch {
    return error('Your notes could not be saved. Please try again.');
} }
