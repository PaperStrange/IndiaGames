// Built-artifact regression: MARA_BUILD=/immutable/build MARA_EVIDENCE=/new/output
// node test/mara-layout-browser.mjs. Starts and closes its own same-host HTTP server.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const build = path.resolve(process.env.MARA_BUILD || fileURLToPath(new URL('../dist', import.meta.url)));
const evidence = process.env.MARA_EVIDENCE
  ? path.resolve(process.env.MARA_EVIDENCE)
  : fs.mkdtempSync(path.join(os.tmpdir(), 'mara-layout-'));
fs.mkdirSync(evidence, { recursive: true });
const prefix = '/IndiaGames/pilots/vivid/';
const report = {
  startedAt: new Date().toISOString(), build,
  scope: 'Automated Chromium geometry and keyboard regression; emulated dimensions, no human or screen-reader result. Text enlargement doubles computed text sizes, not physical browser zoom.',
  cases: [], errors: [],
};
function inventory(dir, relative = '') {
  return Object.fromEntries(fs.readdirSync(dir).sort().flatMap(name => {
    const full = path.join(dir, name), key = relative + name;
    return fs.statSync(full).isDirectory()
      ? Object.entries(inventory(full, key + '/'))
      : [[key, createHash('sha256').update(fs.readFileSync(full)).digest('hex')]];
  }));
}
let server, browser;
try {
  report.inventory = inventory(build);
  server = http.createServer((req, res) => {
    let name = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    if (name === '/favicon.ico') { res.writeHead(204).end(); return; }
    name = name.startsWith(prefix) ? name.slice(prefix.length) : name.slice(1);
    const file = path.resolve(build, name || 'index.html');
    if (!file.startsWith(build + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404).end(); return;
    }
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.glb': 'model/gltf-binary' };
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  report.base = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  report.browser = browser.version();
  for (const mount of ['/', prefix]) for (const width of [1280, 390]) for (const textScale of [1, 2]) {
    const id = `${mount === '/' ? 'root' : 'nested'}-${width}-text-${textScale}`;
    const result = { id, mount, width, textScale };
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    page.on('pageerror', error => report.errors.push({ id, type: 'pageerror', message: error.message }));
    page.on('requestfailed', request => report.errors.push({ id, type: 'requestfailed', url: request.url(), error: request.failure()?.errorText }));
    page.on('response', response => { if (response.status() >= 400) report.errors.push({ id, type: 'http', url: response.url(), status: response.status() }); });
    try {
      await page.goto(report.base + mount + '?profile=remembered#mara');
      for (const action of ['start', 'timetable', 'postcard', 'sketches']) {
        await page.locator(`[data-action="${action}"]`).click();
      }
      if (textScale === 2) {
        await page.evaluate(() => {
          const sizes = [...document.querySelectorAll('body, body *')].map(element => [element, parseFloat(getComputedStyle(element).fontSize)]);
          for (const [element, size] of sizes) if (Number.isFinite(size)) element.style.fontSize = size * 2 + 'px';
        });
      }
      const hint = page.locator('#hint-align');
      await hint.scrollIntoViewIfNeeded();
      result.geometry = await hint.evaluate(element => {
        const rect = element.getBoundingClientRect(), parent = element.parentElement.getBoundingClientRect();
        return {
          width: rect.width, height: rect.height, left: rect.left, right: rect.right,
          parentWidth: parent.width, parentLeft: parent.left, parentRight: parent.right,
          clientWidth: element.clientWidth, scrollWidth: element.scrollWidth,
          viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
        };
      });
      await page.screenshot({ path: path.join(evidence, id + '.png'), fullPage: true });
      const box = result.geometry;
      assert.ok(Math.abs(box.width - box.parentWidth) <= 1, 'Alignment help must span its control row');
      assert.ok(Math.abs(box.left - box.parentLeft) <= 1 && Math.abs(box.right - box.parentRight) <= 1, 'Help must share the row edges');
      assert.ok(box.scrollWidth <= box.clientWidth + 1, 'Help text must fit without internal overflow');
      assert.ok(box.documentWidth <= box.viewport, 'The page must not overflow horizontally');
      const slider = page.locator('#adjust-align');
      assert.equal(await slider.getAttribute('aria-describedby'), 'hint-align');
      let tabs = 0;
      while (!await slider.evaluate(element => element === document.activeElement)) {
        assert.ok(tabs++ < 100, 'Alignment slider must be reachable with Tab');
        await page.keyboard.press('Tab');
      }
      for (let value = 1; value <= 3; value++) {
        await page.keyboard.press('ArrowRight');
        assert.equal(await slider.inputValue(), String(value), 'Arrow key must change alignment by one step');
        assert.equal(await slider.evaluate(element => element === document.activeElement), true, 'Rerender must retain keyboard focus on the slider');
      }
      result.keyboard = { tabs, finalValue: await slider.inputValue(), retainedFocus: true };
      await page.locator('[data-action="reveal"]').click();
      await page.locator('[data-action="repair"]').click();
      assert.match(await page.locator('#narration').innerText(), /loose leg/);
      result.status = 'PASS';
    } catch (error) {
      result.status = 'FAIL'; result.error = error.stack;
      await page.screenshot({ path: path.join(evidence, id + '-failure.png'), fullPage: true }).catch(() => {});
    } finally {
      report.cases.push(result); await context.close();
      console.log(`${id}: ${result.status}`);
    }
  }
  report.buildUnchanged = JSON.stringify(report.inventory) === JSON.stringify(inventory(build));
  report.result = report.cases.every(result => result.status === 'PASS') && !report.errors.length && report.buildUnchanged ? 'PASS' : 'FAIL';
} catch (error) {
  report.result = 'FAIL'; report.failure = error.stack;
} finally {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(evidence, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ result: report.result, errors: report.errors, evidence }));
  if (report.result !== 'PASS') process.exitCode = 1;
}
