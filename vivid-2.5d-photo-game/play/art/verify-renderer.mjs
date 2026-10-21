// Art/lifecycle verification only. This is not human playtesting or phone FPS.
// Start Vite first, then: node art/verify-renderer.mjs http://127.0.0.1:8112 /tmp/new-proof-directory
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.argv[2] || 'http://127.0.0.1:8112';
const now = new Date().toISOString();
const out = resolve(process.argv[3] || `/tmp/vivid-art-${now.replaceAll(':', '-')}`);
await mkdir(dirname(out), { recursive: true });
await mkdir(out); // Refuse to overwrite an earlier observation directory.
const report = {
  observed_at: now,
  method: 'Automated Chromium with software WebGL. Art/lifecycle checks; no human or physical-device claims.',
  browser: null,
  assertions: [],
  stats: {},
  file_sha256: {},
};
for (const path of ['src/renderers/world.js', 'public/art/frame.glb', 'public/art/workbench.glb',
  'public/art/keeper-portrait.svg', 'public/art/postcard.svg', 'public/art/sketch-underlay.svg', 'public/art/sketch-overlay.svg']) {
  report.file_sha256[path] = createHash('sha256').update(await readFile(resolve(root, path))).digest('hex');
}
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
});
report.browser = browser.version();
const page = await browser.newPage({ viewport: { width: 1100, height: 950 }, deviceScaleFactor: 1.5 });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const note = (id, detail) => report.assertions.push({ id, result: 'pass', detail });
const open = async () => {
  await page.goto(new URL('/art/renderer-harness.html', base).href);
  await page.waitForFunction(() => window.ready);
  await page.waitForFunction(() => !window.world.stats().activeAnimation);
};

try {
  await open();
  report.stats.portrait = await page.evaluate(() => world.stats());
  assert.ok(report.stats.portrait.activeTriangles > 0 && report.stats.portrait.activeTriangles < 100_000);
  assert.ok(report.stats.portrait.pixelRatio <= 1.5);
  assert.equal(report.stats.portrait.activeAnimation, false);
  assert.deepEqual(await page.evaluate(() => failures), []);
  note('portrait-render', 'Locally bundled frame and painted texture render; active triangle budget passes; idle RAF stops.');
  await page.screenshot({ path: resolve(out, 'portrait.png') });

  await page.evaluate(async () => {
    view.scene = { kind: 'workbench', view: 0, alignment: 3, alignmentTarget: 3, clueCount: 3, revealed: true };
    await world.update(view, manifest);
  });
  await page.waitForFunction(() => !window.world.stats().activeAnimation);
  report.stats.workbench = await page.evaluate(() => world.stats());
  assert.ok(report.stats.workbench.activeTriangles > 0 && report.stats.workbench.activeTriangles < 100_000);
  await page.screenshot({ path: resolve(out, 'workbench.png') });
  note('workbench-render', 'Separate workbench, underlay and aligned overlay render through the same renderer API.');

  await page.evaluate(() => { world.setReducedMotion(true); world.setTilt(100); });
  await page.waitForFunction(() => !window.world.stats().activeAnimation);
  const reduced = await page.evaluate(() => world.stats());
  assert.equal(reduced.reducedMotion, true);
  assert.equal(reduced.targetTiltRadians, Math.PI / 15);
  assert.equal(reduced.tiltRadians, reduced.targetTiltRadians);
  note('motion-and-tilt', 'Manual motion off settles without easing; extreme input clamps to 12 degrees.');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { world.setReducedMotion(false); world.setTilt(-100); });
  await page.waitForFunction(() => !window.world.stats().activeAnimation);
  const systemReduced = await page.evaluate(() => world.stats());
  assert.equal(systemReduced.reducedMotion, true);
  assert.equal(systemReduced.tiltRadians, -Math.PI / 15);
  note('system-motion', 'OS reduced motion cannot be overridden by enabling the optional movement setting.');

  for (let index = 0; index < 6; index += 1) {
    await page.evaluate(async index => {
      view.scene = index % 2 ? { kind: 'workbench', view: 0, alignment: 3, clueCount: 3, revealed: true }
        : { kind: 'portrait', view: 0, actorId: 'keeper', light: 'steady', placement: 'cloth' };
      await world.update(view, manifest);
    }, index);
  }
  await page.waitForFunction(() => !window.world.stats().activeAnimation);
  const switched = await page.evaluate(() => world.stats());
  assert.equal(switched.geometries, report.stats.workbench.geometries);
  assert.equal(switched.textures, report.stats.workbench.textures);
  note('scene-switch', 'Six alternating scene loads leave active geometry/texture counts at the same workbench baseline.');

  await page.evaluate(() => document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await page.waitForFunction(() => failures.length === 1);
  assert.equal((await page.evaluate(() => world.stats())).failed, true);
  await page.evaluate(() => world.dispose());
  assert.equal(await page.locator('canvas').count(), 0);
  assert.equal((await page.evaluate(() => world.stats())).geometries, 0);
  note('context-loss', 'Software WebGL context loss reports fallback once; dispose removes its canvas and scene geometry.');

  await open();
  await page.route('**/workbench.glb', route => route.fulfill({ status: 404, body: 'Missing test asset' }));
  const missing = await page.evaluate(async () => {
    try { await world.update({ scene: { kind: 'workbench', view: 0 } }, manifest); } catch {}
    return { failures, stats: world.stats() };
  });
  assert.equal(missing.failures.length, 1);
  assert.equal(missing.stats.failed, true);
  await page.evaluate(() => world.dispose());
  await page.unroute('**/workbench.glb');
  note('missing-asset', 'A missing selected-scene model reports the illustrated fallback instead of silently showing stale art.');

  await open();
  await page.route('**/workbench.glb', async route => {
    await new Promise(resolve => setTimeout(resolve, 300));
    try { await route.continue(); } catch {} // Abort is expected in this test.
  });
  await page.evaluate(() => {
    window.pendingUpdate = world.update({ scene: { kind: 'workbench', view: 0 } }, manifest);
    world.dispose();
  });
  await page.evaluate(() => window.pendingUpdate);
  await page.waitForTimeout(350);
  assert.equal(await page.locator('canvas').count(), 0);
  assert.deepEqual(await page.evaluate(() => failures), []);
  note('in-flight-disposal', 'Disposing during a selected-scene fetch cancels it; no late canvas or fallback callback is created.');

  assert.deepEqual(errors, []);
  note('browser-errors', 'No uncaught page errors across all renderer scenarios.');
  report.status = 'pass';
} catch (error) {
  report.status = 'fail';
  report.error = String(error.stack || error);
  process.exitCode = 1;
} finally {
  report.page_errors = errors;
  await writeFile(resolve(out, 'renderer-verification.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify({ status: report.status, assertions: report.assertions.length, output: out }));
}
