import { bounds, type Block, type Page } from './notebook';
import { replyHeight } from './reply-presentation';
import { WRITING_TOP, WRITING_BOTTOM } from './page-layout';

const ASCENT = 34;
const CLEARANCE = 12;
export type InputPlacement = { x: number; y: number; h: number };

export function renderedBlockHeight(block: Block): number {
    if (block.kind === 'user' || block.kind === 'text') {
        return Math.max(block.h, replyHeight(block.text, block.font || 'hand', block.kind === 'user' ? 44 : undefined));
    }
    const minimum = { mitosis: 270, doodle: 315, coordinates: 275, quiz: 330 };
    return Math.max(block.h, minimum[block.kind as keyof typeof minimum] || 0);
}

export function findInputPlacement(page: Page, text: string, preferred?: { x: number; y: number },
    excluded: { blockIds?: string[]; strokeIds?: string[] } = {}): InputPlacement | undefined {
    const height = replyHeight(text, 'hand', 44);
    const areas = page.blocks.filter(block => !block.absorbedBy && !excluded.blockIds?.includes(block.id))
        .map(block => ({ top: block.y - ASCENT, bottom: block.y + renderedBlockHeight(block) }));
    for (const stroke of page.strokes) {
        if (stroke.absorbedBy || excluded.strokeIds?.includes(stroke.id)) continue;
        const area = bounds([stroke]);
        if (area) areas.push({ top: area.y - stroke.size, bottom: area.bottom + stroke.size });
    }
    areas.sort((a, b) => a.top - b.top);
    let y = preferred ? Math.max(WRITING_TOP, preferred.y) : Math.max(WRITING_TOP, ...areas.map(area => area.bottom + ASCENT + CLEARANCE));
    // 文字采用整行排版；留出字形上缘与已有内容之间的空间。
    for (const area of areas) {
        if (y - ASCENT < area.bottom + CLEARANCE && y + height > area.top - CLEARANCE) {
            y = area.bottom + ASCENT + CLEARANCE;
        }
    }
    if (y + height > WRITING_BOTTOM) return undefined;
    return { x: Math.max(68, Math.min(140, preferred?.x ?? 68)), y, h: height };
}
