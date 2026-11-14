import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { STORY, LOCALES, catalog } from '../src/content/index.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const arg = (flag, fallback) => args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback;
const engine = arg('--engine', 'chromium');
const mount = arg('--mount', '/');
const out = arg('--out', null);
if (!out || !mount.startsWith('/') || !mount.endsWith('/')) throw new Error('Use --out /private/evidence/path and an absolute --mount /path/');
await mkdir(out, { recursive: true });
const pw = await import(process.env.NOTEBOOK_PLAYWRIGHT_MODULE || 'playwright');
const build = path.join(root, 'dist');
const report = { status: 'running', started_at: new Date().toISOString(), engine, mount, browser_version: null, cases: [], errors: [], requests: [], assertions: 0, limitation: 'Automated browser/viewport observations, not human or physical-device qualification.' };
const fileMap = {};
async function readBuild(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) await readBuild(path.join(directory, entry.name), relative);
    else fileMap[relative] = createHash('sha256').update(await readFile(path.join(directory, entry.name))).digest('hex');
  }
}
await readBuild(build);
report.build_files = Object.fromEntries(Object.keys(fileMap).sort().map(name => [name, fileMap[name]]));
report.build_inventory_sha256 = createHash('sha256').update(JSON.stringify(report.build_files)).digest('hex');
report.build_info = JSON.parse(await readFile(path.join(build, 'build-info.json'), 'utf8'));
const check = (condition, message) => { report.assertions++; assert.ok(condition, message); };
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ttf': 'font/ttf', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!pathname.startsWith(mount)) { res.writeHead(404); res.end(); return; }
    const file = path.resolve(build, pathname.slice(mount.length) || 'index.html');
    if (!file.startsWith(build + path.sep)) { res.writeHead(403); res.end(); return; }
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(bytes);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '0.0.0.0', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await pw[engine].launch({ headless: true, ...(engine === 'chromium' && process.env.NOTEBOOK_CHROMIUM_EXECUTABLE ? { executablePath: process.env.NOTEBOOK_CHROMIUM_EXECUTABLE } : {}) });
report.browser_version = browser.version();
const viewports = [{ id: 'desktop', width: 1440, height: 1000 }, { id: 'phone', width: 390, height: 844 }, { id: 'tablet', width: 820, height: 1180 }];
try {
  for (const locale of LOCALES) for (const viewport of viewports) for (const resolution of ['correct', 'accept']) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce', acceptDownloads: true });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    page.on('request', request => { if (!request.url().startsWith(origin)) report.requests.push(request.url()); });
    const id = `${locale}-${viewport.id}-${resolution}`, originals = [];
    await page.goto(`${origin}${mount}?lang=${locale}`, { waitUntil: 'networkidle' });
    check(await page.locator('h1').textContent() === catalog(locale)[STORY.titleKey], `${id}: localized title`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id}: cover fits viewport`);
    if (resolution === 'correct') await page.screenshot({ path: path.join(out, `${id}-cover.png`), fullPage: true });
    await page.locator('.preferences > summary').click(); await page.locator('#save-choice').check(); await page.locator('.preferences > summary').click();
    await page.locator('[data-action="start"]').click();
    for (let beat = 0; beat < 3; beat++) {
      const option = (beat + (resolution === 'accept' ? 1 : 0)) % 2;
      const intent = STORY.beats[beat].options[option];
      await page.locator(`[data-intent="${intent.id}"]`).click();
      check(await page.locator('#language').isDisabled(), `${id}/${beat}: language locked while marked`);
      check((await page.evaluate(() => JSON.parse(localStorage.getItem('toms-notebook.borrowed-words.save.v1')).entries.length)) === beat, `${id}/${beat}: marking did not submit`);
      await page.locator('[data-action="submit"]').click();
      const original = await page.locator('.original-record blockquote').textContent(); originals.push(original);
      check(original === catalog(locale)[intent.sourceKey], `${id}/${beat}: exact original`);
      check(await page.locator('.reply-ink').textContent() === catalog(locale)[intent.replyKey], `${id}/${beat}: intent-specific reply`);
      await page.locator('[data-action="originals"]').click();
      check(await page.locator('dialog').isVisible(), `${id}/${beat}: inspect original`);
      check(await page.locator('dialog').textContent().then(text => text.includes(original)), `${id}/${beat}: record preserved`);
      await page.keyboard.press('Escape');
      check(!(await page.locator('dialog').isVisible()), `${id}/${beat}: keyboard dialog close`);
      await page.locator(`[data-action="${resolution}"]`).click();
      check(await page.locator('.outcome').textContent().then(text => text.includes(catalog(locale)[intent.outcomeKeys[resolution]])), `${id}/${beat}: visible consequence`);
      check(!(await page.locator('#language').isDisabled()), `${id}/${beat}: safe language boundary`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id}/${beat}: page fits viewport`);
      const boxes = await page.locator('button:visible:not(:disabled),select:visible:not(:disabled)').evaluateAll(nodes => nodes.map(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
      check(boxes.length > 0 && boxes.every(box => box.width >= 44 && box.height >= 44), `${id}/${beat}: active controls have44px targets`);
      await page.locator('[data-action="next"]').click();
    }
    const ending = STORY.endings.find(ending => ending.id === (resolution === 'correct' ? 'own-hand' : 'borrowed-hand'));
    check(await page.locator('h1').textContent() === catalog(locale)[ending.titleKey], `${id}: ending`);
    const downloadPromise = page.waitForEvent('download'); await page.locator('[data-action="export"]').first().click(); const download = await downloadPromise;
    const downloaded = await download.path(), bytes = await readFile(downloaded), text = bytes.toString('utf8');
    check(originals.every(original => text.includes(original)), `${id}: downloaded originals`);
    check(!/undefined|\{[a-zA-Z]+\}/.test(text), `${id}: complete localized download`);
    await copyFile(downloaded, path.join(out, `${id}.txt`));
    if (resolution === 'correct') await page.screenshot({ path: path.join(out, `${id}-ending.png`), fullPage: true });
    await page.reload({ waitUntil: 'networkidle' }); await page.locator('[data-action="resume"]').click();
    check(await page.locator('h1').textContent() === catalog(locale)[ending.titleKey], `${id}: resume exact endpoint`);
    await page.locator('.preferences > summary').click(); await page.locator('[data-action="reset"]').click(); await page.locator('[data-action="reset-confirm"]').click();
    check(await page.evaluate(() => localStorage.getItem('toms-notebook.borrowed-words.save.v1')) === null, `${id}: confirmedforget`);
    report.cases.push({ id, status: 'pass', original_count: originals.length, transcript_sha256: createHash('sha256').update(bytes).digest('hex') });
    await context.close();
  }
  check(report.errors.length === 0, 'no unexpected browser errors'); check(report.requests.length === 0, 'no external runtime requests');
  report.status = 'pass';
} catch (error) { report.status = 'fail'; report.failure = error.stack; throw error; }
finally {
  report.completed_at = new Date().toISOString();
  await writeFile(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close(); await new Promise(resolve => server.close(resolve));
  console.log(JSON.stringify({ status: report.status, engine, cases: report.cases.length, assertions: report.assertions, report: path.join(out, 'report.json') }));
}
