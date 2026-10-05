import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve } from 'node:path';

const vite = await createServer({ configFile: false, cacheDir: 'work/ink-draft-cache', appType: 'custom',
    resolve: { alias: { '@': resolve('.') } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { initialNotebook } = await vite.ssrLoadModule('/lib/notebook.ts');
const { inputDraft, isUnsentStroke, hasOverlappingInk, keepDraftAsAnnotation, moveDraftToFreshLeaf } = await vite.ssrLoadModule('/lib/ink-draft.ts');
const mark = () => ({ id: 'ink', tool: 'pen', color: '#40372a', size: 3, points: [[80, 220, .3], [160, 245, .8]] });

test('moving overlapping ink retains pressure, identity, existing content and notebook membership', () => {
    const notebook = initialNotebook(), source = notebook.pages[0];
    source.notebookId = 'personal'; source.strokes = [mark(), { ...mark(), id: 'highlight', tool: 'highlight' }];
    const before = structuredClone(notebook);
    assert.equal(hasOverlappingInk(source), true);
    const result = moveDraftToFreshLeaf(notebook, source.id);
    assert.deepEqual(notebook, before);
    assert.equal(result.page.notebookId, 'personal');
    assert.equal(result.page.inkSourcePageId, source.id);
    assert.deepEqual(result.notebook.pages[0].blocks, source.blocks);
    assert.deepEqual(result.notebook.pages[0].strokes.map(stroke => stroke.id), ['highlight']);
    assert.equal(result.page.strokes[0].id, 'ink');
    assert.equal(result.page.strokes[0].revision, 1);
    assert.deepEqual(result.page.strokes[0].points, [[68, 122, .3], [148, 147, .8]]);
    assert.equal(hasOverlappingInk(result.page), false);
});

test('annotation intent keeps visible marks and excludes them from later recognition', () => {
    const page = initialNotebook().pages[0]; page.strokes = [mark()];
    const annotated = keepDraftAsAnnotation(page);
    assert.equal(annotated.strokes[0].absorbedBy, undefined);
    assert.deepEqual(annotated.strokes[0].points, page.strokes[0].points);
    assert.equal(isUnsentStroke(annotated.strokes[0]), false);
    assert.equal(inputDraft(annotated).strokes.length, 0);
    assert.equal(annotated.strokes[0].revision, 1);
});

test('recognized correction moves with its original strokes and erased regions', () => {
    const notebook = initialNotebook(), page = notebook.pages[0];
    page.strokes = [{ ...mark(), absorbedBy: 'recognition' }];
    page.blocks.push({ id: 'draft', kind: 'user', text: 'A B', x: 80, y: 254, h: 54, pendingInput: true,
        recognitionId: 'recognition', inkIds: ['ink'], erased: [1], erasedRegions: [{ index: 1, x: 110, y: 230, w: 12, h: 30 }] });
    const moved = moveDraftToFreshLeaf(notebook, page.id);
    assert.equal(moved.page.blocks[0].text, 'A B');
    assert.deepEqual(moved.page.blocks[0].erased, [1]);
    assert.equal(moved.page.blocks[0].erasedRegions[0].y, 132);
    assert.deepEqual(moved.page.blocks[0].inkIds, ['ink']);
    assert.equal(moved.notebook.pages[0].strokes.length, 0);
    assert.equal(moved.notebook.pages[0].blocks.length, 4);
});

test('page limit rejects a move without changing the saved draft', () => {
    const notebook = initialNotebook(); notebook.pages[0].strokes = [mark()];
    while (notebook.pages.length < 200) notebook.pages.push({ ...notebook.pages[1], id: String(notebook.pages.length) });
    const before = structuredClone(notebook);
    assert.throws(() => moveDraftToFreshLeaf(notebook, notebook.pages[0].id), /200 leaves/);
    assert.deepEqual(notebook, before);
});
