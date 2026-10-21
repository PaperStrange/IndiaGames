// Automated regression checks. These are not human playtest observations.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const base = process.env.BASE_URL || 'http://127.0.0.1:8113/';
const output = process.env.EDGE_EVIDENCE_DIR || '/tmp/vivid-app-edge';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const results = [];
await mkdir(output, { recursive: true });

async function check(name, run, options = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, ...options });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const start = Date.now();
  try {
    await run(page, context);
    assert.deepEqual(errors, [], 'Uncaught browser exceptions');
    await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
    results.push({ name, passed: true, durationMs: Date.now() - start });
    console.log(`PASS ${name}`);
  } catch (error) {
    await page.screenshot({ path: `${output}/${name}-failure.png`, fullPage: true }).catch(() => {});
    results.push({ name, passed: false, error: error.message, browserErrors: errors, durationMs: Date.now() - start });
    console.error(`FAIL ${name}: ${error.message}`);
  } finally {
    await context.close();
  }
}

function url(story = '', query = 'flat=1') {
  const result = new URL(base);
  result.search = query;
  result.hash = story;
  return result.href;
}

async function act(page, id) {
  await page.locator(`[data-action="${id}"]`).click();
}

async function reachWedge(page) {
  await page.goto(url('iona'));
  for (const id of ['start', 'view--1', 'ledger', 'view-1', 'plate', 'bearing-east', 'rhythm-sls',
    'signal', 'recollect', 'brace']) await act(page, id);
  await page.locator('[data-action="wedge"]').waitFor();
  assert.equal(await page.locator('#world').getAttribute('data-notch-braced'), 'true');
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'false');
}

async function placementPoints(page) {
  const object = page.locator('[data-action="wedge"]');
  const target = page.locator('[data-destination="wedge"]');
  await object.scrollIntoViewIfNeeded();
  await target.scrollIntoViewIfNeeded();
  const sourceBox = await object.boundingBox();
  const targetBox = await target.boundingBox();
  return {
    source: { x: sourceBox.x + sourceBox.width / 2, y: sourceBox.y + sourceBox.height / 2 },
    target: { x: targetBox.x + targetBox.width / 2, y: targetBox.y + targetBox.height / 2 },
  };
}

await check('escape-cancels-drag-and-keyboard-still-places', async page => {
  await reachWedge(page);
  const points = await placementPoints(page);
  await page.mouse.move(points.source.x, points.source.y);
  await page.mouse.down();
  await page.mouse.move(points.target.x, points.target.y, { steps: 8 });
  await page.keyboard.press('Escape');
  await page.mouse.up();
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'false');
  await page.locator('[data-action="wedge"]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-action="wedge"]').getAttribute('aria-pressed'), 'true');
  await page.locator('[data-destination="wedge"]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'true');
});

await check('touch-cancel-keeps-object-and-next-tap-works', async (page, context) => {
  await reachWedge(page);
  const points = await placementPoints(page);
  const client = await context.newCDPSession(page);
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...points.source, id: 0 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: points.source.x + 35, y: points.source.y, id: 0 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'false');
  await page.locator('[data-action="wedge"]').tap();
  assert.equal(await page.locator('[data-action="wedge"]').getAttribute('aria-pressed'), 'true');
  await page.locator('[data-destination="wedge"]').tap();
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'true');
}, { hasTouch: true });

await check('second-touch-cancels-placement-without-losing-object', async (page, context) => {
  await reachWedge(page);
  const points = await placementPoints(page);
  const client = await context.newCDPSession(page);
  const first = { ...points.source, id: 0 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [first] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...points.target, id: 0 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [
    { ...points.target, id: 0 }, { x: points.source.x, y: points.source.y - 45, id: 1 },
  ] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'false');
  await page.locator('[data-action="wedge"]').tap();
  await page.locator('[data-destination="wedge"]').tap();
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'), 'true');
}, { hasTouch: true });

await check('reduced-motion-interrupts-active-world-drag', async page => {
  await page.goto(url('iona'));
  await page.locator('[data-action="start"]').waitFor();
  const box = await page.locator('#world').boundingBox();
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 90, y);
  assert.match(await page.locator('#flat-world').evaluate(el => el.style.transform), /rotateY/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.body.classList.contains('motion-off'));
  await page.mouse.move(x + 125, y);
  assert.equal(await page.locator('#flat-world').evaluate(el => el.style.transform), '');
  assert.equal(await page.locator('#motion').isChecked(), false);
  await page.mouse.up();
  assert.match(await page.locator('#motion-hint').textContent(), /off/);
});

await check('adjustment-boundary-keeps-keyboard-focus', async page => {
  await page.goto(url('mara'));
  await act(page, 'start');
  await act(page, 'sketches');
  for (let index = 0; index < 6; index += 1) await act(page, 'align-plus');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'adjust-align');
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#adjust-align').inputValue(), '5');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'adjust-align');
});

await check('switching-stories-clears-transcript-and-hidden-inspection', async page => {
  await page.goto(url('iona'));
  await act(page, 'start');
  await act(page, 'view-1');
  await act(page, 'letter');
  assert.match(await page.locator('#transcript-lines').textContent(), /Iona/);
  await page.locator('#back').click();
  await page.locator('[data-story="mara"]').click();
  await page.locator('[data-action="start"]').waitFor();
  assert.doesNotMatch(await page.locator('#transcript-lines').textContent(), /Iona|frightened every night/);
  assert.equal(await page.locator('#inspection-text').textContent(), '');
  await act(page, 'start');
  await act(page, 'timetable');
  assert.doesNotMatch(await page.locator('#transcript-lines').textContent(), /Iona|frightened every night/);
});

await check('malformed-bookmark-leaves-gallery-usable', async page => {
  const target = new URL(base);
  target.hash = '%E0%A4%A';
  await page.goto(target.href);
  await page.locator('[data-story="mara"]').waitFor();
  assert.equal(await page.locator('#gallery').isVisible(), true);
  await page.locator('[data-story="mara"]').click();
  await page.locator('[data-action="start"]').waitFor();
});

await check('same-document-bookmarks-open-stories-and-preserve-skip-link', async page => {
  await page.goto(url());
  await page.locator('[data-story="iona"]').waitFor();
  await page.goto(url('iona'));
  await page.locator('[data-action="start"]').waitFor();
  await act(page, 'start');
  await page.goto(url('main'));
  assert.equal(await page.locator('#experience').isVisible(), true);
  await page.goto(url('mara'));
  await page.locator('[data-action="start"]').waitFor();
  assert.equal(await page.locator('#story-title').textContent(), 'The Unfinished Postcard');
  await page.goto(url('not-a-story'));
  await page.locator('[data-story="iona"]').waitFor();
  assert.equal(await page.locator('#gallery').isVisible(), true);
});

await check('simulated-bfcache-lifecycle-resumes-live-session', async page => {
  await page.goto(url('mara'));
  await act(page, 'start');
  await act(page, 'sketches');
  await page.evaluate(() => {
    // Browser lifecycle simulation, not a claim that headless Chromium used
    // its back/forward cache for an external navigation.
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await page.locator('[data-action="align-plus"]').waitFor();
  await act(page, 'align-plus');
  assert.equal(await page.locator('#adjust-align').inputValue(), '1');
});

await check('late-previous-story-assets-cannot-replace-current-scene', async page => {
  let release;
  const barrier = new Promise(resolve => { release = resolve; });
  let requested;
  const sawRequest = new Promise(resolve => { requested = resolve; });
  await page.route('**/art/frame.glb', async route => {
    requested();
    await barrier;
    await route.continue().catch(() => {});
  });
  try {
    await page.goto(url('iona', ''));
    await Promise.race([sawRequest, new Promise((_, reject) => setTimeout(() => reject(new Error('3D frame request was not observed')), 15000))]);
    await page.locator('#back').click();
    await page.locator('[data-story="mara"]').click();
    await page.locator('[data-action="start"]').waitFor();
    release();
    await page.waitForFunction(() => document.getElementById('world').classList.contains('has-three'));
    assert.equal(await page.locator('#three-world canvas').count(), 1);
    assert.equal(await page.locator('#world').evaluate(el => el.classList.contains('workbench')), true);
    assert.equal(await page.locator('#story-title').textContent(), 'The Unfinished Postcard');
    assert.doesNotMatch(await page.locator('#transcript-lines').textContent(), /Iona/);
  } finally {
    release();
  }
});

await browser.close();
let sourceCommit = 'unknown';
try { sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); } catch {}
const report = {
  recordedAt: new Date().toISOString(), sourceCommit, base,
  kind: 'automated-browser-regression', humanPlaytest: false,
  passed: results.every(result => result.passed), results,
};
await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2) + '\n');
if (!report.passed) process.exitCode = 1;
