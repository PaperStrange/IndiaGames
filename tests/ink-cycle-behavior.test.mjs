import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve } from 'node:path';

const vite = await createServer({
    configFile: false, cacheDir: '.sites-runtime/ink-regression-cache', appType: 'custom',
    resolve: { alias: { '@': resolve('.') } }, server: { middlewareMode: true, hmr: false },
});
after(() => vite.close());
const cycle = await vite.ssrLoadModule('/lib/ink-cycle.ts');
const { eraseStroke } = await vite.ssrLoadModule('/lib/erase-ink.ts');
const { visibleInkText, replaceErasedText } = await vite.ssrLoadModule('/lib/ink-text.ts');

test('a current recognition result waits for the full fade and is revealed at most once', () => {
    const state = cycle.beginInkCycle('page', 2, [], ['stroke'], 1000);
    assert.equal(cycle.INPUT_END_MS, 380);
    assert.equal(state.startedAt, 1000);
    assert.equal(state.fading, true);
    assert.equal(cycle.cycleMayReply(state, 2, 6000), false);
    state.ready = true;
    assert.equal(cycle.cycleMayReply(state, 2, 5999), false);
    assert.equal(cycle.cycleMayReply(state, 2, 6000), true);
    state.sent = true;
    assert.equal(cycle.cycleMayReply(state, 2, 6001), false);
});

test('editing restores visibility while a completed old recognition remains ineligible', () => {
    const old = cycle.beginInkCycle('page', 2, [], ['stroke'], 1000);
    cycle.restoreForEdit(old);
    old.ready = true;
    assert.equal(old.fading, false);
    assert.equal(cycle.cycleMayReply(old, 3, 9000), false);
    const current = cycle.beginInkCycle('page', 3, ['corrected'], [], 9000);
    assert.equal(current.ready, true);
    assert.equal(cycle.cycleMayReply(current, 3, 14000), true);
});

test('regional erase changes recognition identity and preserves both untouched ends', () => {
    const original = { id: 'stroke', points: [[0, 0, .5], [100, 0, .5]], color: '#222222', size: 3, tool: 'pen' };
    const parts = eraseStroke(original, [50, 0, .5], 10);
    assert.equal(parts.length, 2);
    assert.deepEqual(parts[0].points[0], original.points[0]);
    assert.deepEqual(parts[1].points.at(-1), original.points[1]);
    assert.notEqual(cycle.recognitionKey(parts), cycle.recognitionKey([original]));
    assert.ok(parts.every(part => part.points.every(point => Math.abs(point[0] - 50) >= 10)));
});

test('replacing a touched text region preserves an independently erased character', () => {
    const block = { id: 'b', kind: 'user', text: 'ABCDE', x: 0, y: 0, h: 40,
        erased: [1, 3], erasedRegions: [{ index: 1, x: 20, y: 0, w: 10, h: 30 }, { index: 3, x: 80, y: 0, w: 10, h: 30 }] };
    assert.equal(visibleInkText(block), 'A C E');
    assert.equal(replaceErasedText(block, { x: 20, y: 0, right: 30, bottom: 30 }, 'Z'), 'AZC E');
    assert.equal(visibleInkText(block), 'A C E');
});
