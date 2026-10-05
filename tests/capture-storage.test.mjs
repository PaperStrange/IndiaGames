import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp } from 'node:fs/promises';
import { globSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { Miniflare } from 'miniflare';

// 使用实际编译后的 Worker、D1 和 R2；图片仅验证存储，不作为识别准确率证据。
test('paper sources survive restart, retry, immutable retakes and recovery into clean storage', { timeout: 60000 }, async () => {
    await mkdir('work/capture-tests', { recursive: true });
    const root = await mkdtemp(resolve('work/capture-tests/run-'));
    const modules = globSync('**/*.js', { cwd: 'dist/server' }).map(path => ({ type: 'ESModule', path: resolve('dist/server', path) }));
    const entry = modules.findIndex(module => module.path === resolve('dist/server/index.js'));
    modules.unshift(...modules.splice(entry, 1));
    const settings = directory => ({ modules, compatibilityDate: '2026-05-15', compatibilityFlags: ['nodejs_compat'],
        d1Databases: ['DB'], r2Buckets: ['BUCKET'], d1Persist: `${directory}/d1`, r2Persist: `${directory}/r2`, cf: false });
    let runtime = new Miniflare(settings(root));
    async function initialize(directory) {
        await (await runtime.getD1Database('DB')).prepare('SELECT 1 AS ready').first();
        const databases = globSync('d1/**/*.sqlite', { cwd: directory }).filter(path => !path.includes('metadata'));
        assert.equal(databases.length, 1);
        const database = new DatabaseSync(resolve(directory, databases[0]));
        for (const migration of globSync('drizzle/*.sql').sort()) database.exec(await readFile(migration, 'utf8'));
        database.close();
    }
    async function request(path, init = {}) {
        // 原生 Request 负责 multipart 编码，跨 runtime 传输明确的请求字节。
        const encoded = new Request(`https://capture.test${path}`, init);
        return runtime.dispatchFetch(encoded.url, { method: encoded.method, headers: Object.fromEntries(encoded.headers),
            body: encoded.method === 'GET' ? undefined : await encoded.arrayBuffer() });
    }
    const original = await readFile('public/demo/harry-potter-notebook-demo.jpg');
    const prepared = await readFile('tests/fixtures/notebook-reference.png');
    const metadata = { id: crypto.randomUUID(), notebookId: 'paper-test', pageLabel: 'Reference page', rotation: 0, crop: { left: 0, top: 0, right: 1, bottom: 1 } };
    async function upload(details = metadata, options = {}) {
        const form = new FormData();
        form.set('metadata', JSON.stringify(details));
        form.set('original', new File([original], 'reference.jpg', { type: 'image/jpeg' }));
        form.set('prepared', new File([prepared], 'reading-copy.png', { type: 'image/png' }));
        return request('/api/captures', { method: 'POST', body: form, ...options });
    }
    try {
        await initialize(root);
        const savedResponse = await upload();
        assert.equal(savedResponse.status, 201, await savedResponse.clone().text());
        const saved = (await savedResponse.json()).capture;
        assert.equal(saved.originalHash, createHash('sha256').update(original).digest('hex'));
        assert.deepEqual((await (await upload()).json()).capture, saved);
        assert.equal((await upload({ ...metadata, pageLabel: 'Changed under same ID' })).status, 409);
        const retake = { ...metadata, id: crypto.randomUUID(), parentId: metadata.id, pageLabel: 'Reference page retake' };
        assert.equal((await upload(retake)).status, 201);
        const concurrent = { ...retake, id: crypto.randomUUID() };
        assert.equal((await upload(concurrent)).status, 201);
        assert.equal((await request(`/api/captures/${metadata.id}`, { headers: { 'oai-authenticated-user-id': 'another-test-owner' } })).status, 404);
        assert.equal((await request(`/api/captures/${metadata.id}?asset=prepared`, { headers: { 'oai-authenticated-user-id': 'another-test-owner' } })).status, 404);
        assert.equal((await upload({ ...metadata, id: crypto.randomUUID() }, { headers: { origin: 'https://elsewhere.test' } })).status, 403);
        const wrongNotebook = await request('/api/companion', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ mode: 'vision', captureId: metadata.id, notebookId: 'another-book' }) });
        assert.equal(wrongNotebook.status, 403);
        const missingProvider = await request('/api/companion', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ mode: 'vision', captureId: metadata.id, notebookId: metadata.notebookId }) });
        assert.equal(missingProvider.status, 400);
        assert.match(await missingProvider.text(), /service key/);
        await runtime.dispose(); runtime = new Miniflare(settings(root));
        const reopened = await request(`/api/captures/${metadata.id}?asset=original`);
        assert.equal(reopened.status, 200); assert.match(reopened.headers.get('cache-control'), /private, no-store/);
        assert.deepEqual(Buffer.from(await reopened.arrayBuffer()), original);
        assert.equal((await (await request(`/api/captures/${metadata.id}`)).json()).capture.pageLabel, 'Reference page');
        assert.equal((await (await request('/api/captures?notebookId=paper-test')).json()).captures.length, 3);
        const recoveryDirectory = `${root}/restored`;
        await runtime.dispose(); runtime = new Miniflare(settings(recoveryDirectory));
        await initialize(recoveryDirectory);
        assert.equal((await upload()).status, 201);
        assert.equal((await upload(retake)).status, 201);
        assert.equal((await (await request(`/api/captures/${retake.id}`)).json()).capture.parentId, metadata.id);
        assert.deepEqual(Buffer.from(await (await request(`/api/captures/${retake.id}?asset=original`)).arrayBuffer()), original);
        assert.deepEqual(Buffer.from(await (await request(`/api/captures/${retake.id}?asset=prepared`)).arrayBuffer()), prepared);
    } finally { await runtime.dispose(); }
});
