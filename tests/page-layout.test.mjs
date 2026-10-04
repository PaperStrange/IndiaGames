import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve } from 'node:path';

const vite = await createServer({ configFile: false, cacheDir: '.sites-runtime/page-layout-tests', appType: 'custom',
    resolve: { alias: { '@': resolve('.') } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { paginateBlocks, placeReply, WRITING_BOTTOM, SHEET_HEIGHT } = await vite.ssrLoadModule('/lib/page-layout.ts');
const { block, newPage } = await vite.ssrLoadModule('/lib/notebook.ts');
const { recognitionMode } = await vite.ssrLoadModule('/lib/recognition-policy.ts');
const { findInputPlacement, renderedBlockHeight } = await vite.ssrLoadModule('/lib/input-placement.ts');

test('long replies keep every word on fixed pages in every lettering style', () => {
    const text = Array.from({length: 140}, (_, index) => `Thought ${index}: remember the exact words.`).join('\n');
    for (const font of ['hand', 'book', 'mono']) {
        const pages = paginateBlocks([block('text', text, 850, 6000, {font})], 850);
        assert.ok(pages.length > 4);
        assert.equal(SHEET_HEIGHT, 1000);
        const words = pages.flat().map(value => value.text).join(' ').replace(/\s+/g, ' ').trim();
        assert.equal(words, text.replace(/\s+/g, ' ').trim());
        for (const value of pages.flat()) assert.ok(value.y + value.h <= WRITING_BOTTOM);
    }
});

test('stream growth reuses continuation pages and retains unrelated writing', () => {
    const page = newPage('A question');
    const original = block('user', 'My question', 122, 60, {absorbedBy:'exchange'});
    page.blocks.push(original);
    let notebook = {pages:[page, newPage('Another topic')]};
    const response = block('text', 'First answer.\n'.repeat(60), 122, 3000);
    notebook = placeReply(notebook, page.id, 'exchange', [response], 122);
    const firstContinuation = notebook.pages[1].id;
    notebook.pages[1].strokes.push({id:'annotation', points:[[100,900,.5]], color:'#111111', size:3, tool:'pen'});
    notebook = placeReply(notebook, page.id, 'exchange', [{...response,text:response.text+'Last answer.\n'.repeat(40)}], 122);
    assert.equal(notebook.pages[1].id, firstContinuation);
    assert.equal(notebook.pages[1].strokes[0].id, 'annotation');
    assert.equal(notebook.pages[0].blocks.find(value => value.id === original.id).text, 'My question');
    assert.equal(notebook.pages.at(-1).title, 'Another topic');
    assert.equal(new Set(notebook.pages.flatMap(page => page.blocks.map(b => b.id))).size, notebook.pages.flatMap(page => page.blocks).length);
});

test('images stay together and begin on a continuation when space is insufficient', () => {
    const pages = paginateBlocks([block('picture','A picture',800,410)],800);
    assert.equal(pages.length,2);
    assert.equal(pages[0].length,0);
    assert.equal(pages[1][0].h,410);
    assert.equal(pages[1][0].y,122);
});

test('provider mode requires vision and never selects device OCR', () => {
    assert.equal(recognitionMode({live:false,vision:false}), 'device');
    assert.equal(recognitionMode({live:true,vision:true,config:{ocr:'device'}}), 'vision');
    assert.throws(() => recognitionMode({live:true,vision:false}), /image-capable/);
    assert.throws(() => recognitionMode(null), /still loading/);
});

test('long tables retain all rows and repeat column labels on continuation leaves', () => {
    const rows = Array.from({length:48}, (_,index) => `${index}|A recorded value`);
    const pages = paginateBlocks([block('table', ['Item|Value',...rows].join('\n'), 122, 3000)]);
    assert.ok(pages.length > 2);
    assert.deepEqual(pages.flat().flatMap(block => block.text.split('\n').slice(1)), rows);
    for(const value of pages.flat()) {
        assert.equal(value.text.split('\n')[0], 'Item|Value');
        assert.ok(value.y + value.h <= WRITING_BOTTOM);
    }
});

test('a placement selected inside existing writing moves below its rendered content', () => {
    const page = newPage('An existing leaf');
    const existing = block('text', 'A full line of existing writing.\n'.repeat(5), 122, 20);
    page.blocks.push(existing);
    const placement = findInputPlacement(page, 'A new thought.', {x:100,y:140});
    assert.ok(placement.y - 34 >= existing.y + renderedBlockHeight(existing) + 12);
    assert.ok(placement.y + placement.h <= WRITING_BOTTOM);
    assert.equal(page.blocks.length,1);
    assert.equal(page.blocks[0],existing);
});

test('input uses an available location and reports a full leaf without moving old ink', () => {
    const page = newPage('A full leaf');
    page.blocks.push(block('text','Existing text.',122,740));
    assert.equal(findInputPlacement(page,'A new thought.',{x:68,y:122}),undefined);
    assert.equal(page.blocks[0].y,122);
    assert.deepEqual(findInputPlacement(newPage(),'A new thought.',{x:100,y:350}),{x:100,y:350,h:54});
});

test('recognition ignores its own raw strokes and preserves other occupied regions', () => {
    const page = newPage();
    page.strokes.push({id:'raw',points:[[100,150,.5],[200,180,.5]],size:3,color:'#111',tool:'pen'});
    const placed = findInputPlacement(page,'Recognized words.',{x:68,y:179},{strokeIds:['raw']});
    assert.equal(placed.y,179);
    page.blocks.push(block('text','An existing answer.',200,120));
    const shifted = findInputPlacement(page,'Recognized words.',{x:68,y:179},{strokeIds:['raw']});
    assert.ok(shifted.y - 34 > 320);
});
