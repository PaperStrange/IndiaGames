import { type Block, type Notebook, type Page, uid } from './notebook';
import { graphemes, wrapReply } from './reply-presentation';

export const SHEET_HEIGHT = 1000;
export const WRITING_TOP = 122;
export const WRITING_BOTTOM = 900;
const BLOCK_GAP = 38;

export function paginateBlocks(blocks: Block[], startY = WRITING_TOP): Block[][] {
    const sheets: Block[][] = [[]];
    let cursor = Math.max(WRITING_TOP, startY);
    const advance = () => { sheets.push([]); cursor = WRITING_TOP; };
    const place = (value: Block) => {
        sheets[sheets.length - 1].push({ ...value, y: cursor });
        cursor += value.h + BLOCK_GAP;
    };
    for (const original of blocks) {
        if (original.kind === 'text' || original.kind === 'user') {
            const lines = wrapReply(original.text, original.font || 'hand', original.kind === 'user' ? 44 : undefined);
            let offset = 0, characterOffset = 0, part = 0;
            while (offset < lines.length) {
                const capacity = Math.floor((WRITING_BOTTOM - cursor - 16) / 38);
                if (capacity < 1) { advance(); continue; }
                const section = lines.slice(offset, offset + capacity);
                const characters = section.reduce((sum, line) => sum + graphemes(line).length, 0);
                // 分页保持原始字符顺序及擦除索引；流式更新使用稳定的片段标识。
                place({ ...original, id: part ? `${original.id}:part:${part}` : original.id,
                    text: section.join('\n'), h: section.length * 38 + 16,
                    erased: original.erased?.filter(index => index >= characterOffset && index < characterOffset + characters).map(index => index - characterOffset),
                    erasedRegions: undefined });
                characterOffset += characters;
                offset += section.length;
                part++;
                if (offset < lines.length) advance();
            }
        } else if (original.kind === 'table') {
            const rows = original.text.split('\n');
            const header = rows[0];
            let offset = 1, part = 0;
            while (offset < rows.length) {
                const capacity = Math.floor((WRITING_BOTTOM - cursor - 30) / 42) - 1;
                if (capacity < 1) { advance(); continue; }
                const section = [header, ...rows.slice(offset, offset + capacity)];
                place({ ...original, id: part ? `${original.id}:part:${part}` : original.id,
                    text: section.join('\n'), h: section.length * 42 + 30 });
                offset += section.length - 1;
                part++;
                if (offset < rows.length) advance();
            }
            if (rows.length === 1) {
                if (cursor + 72 > WRITING_BOTTOM) advance();
                place({ ...original, h: 72 });
            }
        } else {
            const height = original.kind === 'mitosis' ? Math.max(original.h, 270) : original.h;
            if (height > WRITING_BOTTOM - WRITING_TOP) throw new Error('This illustration is taller than one notebook page.');
            if (cursor + height > WRITING_BOTTOM) advance();
            place({ ...original, h: height });
        }
    }
    return sheets;
}

export function placeReply(notebook: Notebook, pageId: string, exchangeId: string, replies: Block[], startY: number): Notebook {
    const origin = notebook.pages.find(page => page.id === pageId);
    if (!origin) throw new Error('The reply page is no longer available.');
    const sheets = paginateBlocks(replies, startY);
    const existing = notebook.pages.filter(page => page.id !== pageId && page.blocks.some(b => b.exchangeId === exchangeId));
    const continuationIds = new Set(existing.map(page => page.id));
    const pages = notebook.pages.map(page => ({ ...page, blocks: page.blocks.filter(b => b.exchangeId !== exchangeId) }));
    const index = pages.findIndex(page => page.id === pageId);
    pages[index].blocks.push(...sheets[0].map(b => ({ ...b, exchangeId })));
    const additions = sheets.slice(1).map((blocks, index): Page => ({
        ...(existing[index] || { ...origin, id: uid(), strokes: [], blocks: [], annotations: undefined, document: undefined }),
        title: `${origin.title.slice(0, 55)} · continued ${index + 2}`,
        blocks: [...(pages.find(page => page.id === existing[index]?.id)?.blocks || []), ...blocks.map(b => ({ ...b, exchangeId }))],
    }));
    const retained = pages.filter(page => !continuationIds.has(page.id) || (!existing.slice(0, additions.length).some(old => old.id === page.id) && (page.blocks.length || page.strokes.length)));
    retained.splice(retained.findIndex(page => page.id === pageId) + 1, 0, ...additions);
    if (retained.length > 200) throw new Error('This notebook has reached its 200-page limit. Export it or open another notebook.');
    return { ...notebook, pages: retained };
}

export function paginateExistingReplies(notebook: Notebook): Notebook {
    const pages = notebook.pages.flatMap(page => {
        const visible = page.blocks.filter(block => !block.absorbedBy).sort((a,b) => a.y - b.y);
        if (page.document || !visible.some(block => block.kind !== 'user' && block.y + block.h > WRITING_BOTTOM)) return [page];
        const sheets = paginateBlocks(visible, Math.min(...visible.map(block => block.y)));
        return sheets.map((blocks, index): Page => index === 0 ? {
            ...page, blocks: [...page.blocks.filter(block => block.absorbedBy), ...blocks],
        } : { ...page, id: uid(), title: `${page.title.slice(0,55)} · continued ${index + 1}`, blocks,
            strokes: [], annotations: undefined, document: undefined });
    });
    if (pages.length > 200) throw new Error('This notebook needs more than 200 pages. Export it before continuing.');
    return { ...notebook, pages };
}
