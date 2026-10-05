import { bounds, newPage, type Notebook, type Page, type Stroke } from './notebook';
import { renderedBlockHeight } from './input-placement';
import { WRITING_BOTTOM, WRITING_TOP } from './page-layout';

export function isUnsentStroke(stroke: Stroke): boolean {
    return stroke.tool === 'pen' && stroke.purpose !== 'annotation' && !stroke.absorbedBy;
}

export function inputDraft(page: Page) {
    const blocks = page.blocks.filter(block => block.pendingInput && block.purpose !== 'annotation' && !block.absorbedBy);
    const linkedIds = new Set(blocks.flatMap(block => block.inkIds || []));
    const strokes = page.strokes.filter(stroke => isUnsentStroke(stroke) || linkedIds.has(stroke.id));
    return { blocks, strokes };
}

export function isPendingInput(block: Page['blocks'][number]): boolean {
    return !!block.pendingInput && block.purpose !== 'annotation' && !block.absorbedBy;
}

export function hasOverlappingInk(page: Page): boolean {
    const draft = inputDraft(page);
    const draftIds = new Set(draft.blocks.map(block => block.id));
    return draft.strokes.filter(isUnsentStroke).some(stroke => {
        const area = bounds([stroke]);
        return area && page.blocks.some(block => !block.absorbedBy && !draftIds.has(block.id)
            && area.right + stroke.size >= block.x && area.x - stroke.size <= 692
            && area.bottom + stroke.size >= block.y - 34
            && area.y - stroke.size <= block.y + renderedBlockHeight(block));
    });
}

export function keepDraftAsAnnotation(page: Page): Page {
    const draft = inputDraft(page);
    const strokeIds = new Set(draft.strokes.map(stroke => stroke.id));
    const blockIds = new Set(draft.blocks.map(block => block.id));
    return { ...page,
        strokes: page.strokes.map(stroke => strokeIds.has(stroke.id)
            ? { ...stroke, purpose: 'annotation', revision: (stroke.revision || 0) + 1 } : stroke),
        blocks: page.blocks.map(block => blockIds.has(block.id) ? { ...block, purpose: 'annotation', pendingInput: false } : block),
    };
}

export function moveDraftToFreshLeaf(notebook: Notebook, pageId: string): { notebook: Notebook; page: Page } {
    const source = notebook.pages.find(page => page.id === pageId);
    if (!source) throw new Error('Open the leaf containing your ink.');
    const draft = inputDraft(source);
    if (!draft.strokes.length && !draft.blocks.length) throw new Error('There is no unsent ink to move.');
    if (notebook.pages.length >= 200) throw new Error('This notebook has 200 leaves. Your ink is saved here; export it before making more room.');
    const area = bounds(draft.strokes);
    const top = Math.min(area?.y ?? Infinity, ...draft.blocks.map(block => block.y - 34));
    const bottom = Math.max(area?.bottom ?? -Infinity, ...draft.blocks.map(block => block.y + renderedBlockHeight(block)));
    if (bottom - top > WRITING_BOTTOM - WRITING_TOP) {
        throw new Error('This draft spans a whole leaf. Your ink is saved here; erase a region or keep it as an annotation.');
    }
    const left = Math.min(area?.x ?? Infinity, ...draft.blocks.map(block => block.x));
    const dx = 68 - left, dy = WRITING_TOP - top;
    const page = { ...newPage(`${source.title.slice(0, 55)} · a new thought`, source.topic),
        notebookId: source.notebookId, paper: source.paper, inkSourcePageId: source.id,
        strokes: draft.strokes.map(stroke => ({ ...stroke, revision: (stroke.revision || 0) + 1,
            points: stroke.points.map(([x, y, pressure]): [number, number, number] => [x + dx, y + dy, pressure]) })),
        blocks: draft.blocks.map(block => ({ ...block, x: block.x + dx, y: block.y + dy,
            erasedRegions: block.erasedRegions?.map(region => ({ ...region, x: region.x + dx, y: region.y + dy })) })),
    };
    const strokeIds = new Set(draft.strokes.map(stroke => stroke.id));
    const blockIds = new Set(draft.blocks.map(block => block.id));
    // 原页面移除与新页面加入使用同一次 journal 写入，保留笔迹标识和字符引用。
    const pages = notebook.pages.map(old => old.id === source.id ? { ...old,
        strokes: old.strokes.filter(stroke => !strokeIds.has(stroke.id)),
        blocks: old.blocks.filter(block => !blockIds.has(block.id)),
    } : old);
    pages.splice(pages.findIndex(old => old.id === source.id) + 1, 0, page);
    return { notebook: { ...notebook, pages }, page };
}
