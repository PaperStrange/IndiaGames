import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(process.env.PLAYWRIGHT_PATH)); }
const rootURL = new URL(process.env.PLAY_URL);
const nestedURL = new URL(process.env.NESTED_PLAY_URL);
if (rootURL.protocol !== 'http:' || nestedURL.protocol !== 'http:') throw new Error('Use supported local HTTP URLs.');
const out = path.resolve(process.env.EVIDENCE_DIR);
await mkdir(out);
const report = { started_at: new Date().toISOString(), method: 'Automated exact-export timer regression. Clock emulation and synthetic page transition events are explicitly separated from real expiry; no human, physical-device or bfcache claim.', cases: [], errors: [], knownDiagnostics: [] };
let browser;
const action = (page, id) => page.locator(`[data-action="${id}"]`).click();
async function toAction(page) {
  for (const id of ['start-pair', 'start-scene', 'ready-a']) await action(page, id);
  await page.locator('[data-action="choose"]').first().click();
  await page.locator('[data-action="guess"]').nth(1).click();
  await action(page, 'seal'); await action(page, 'ready-b');
  await page.locator('[data-action="choose"]').nth(1).click();
  await page.locator('[data-action="guess"]').first().click();
  for (const id of ['seal', 'reveal', 'action']) await action(page, id);
}
async function run(id, url, width, fn) {
  const row = { id, url: url.href, width, checks: [] }; report.cases.push(row);
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage(); page.setDefaultTimeout(7000);
  page.on('pageerror', error => report.errors.push({ id, type: 'pageerror', message: error.message }));
  page.on('requestfailed', request => report.errors.push({ id, type: 'requestfailed', url: request.url(), error: request.failure()?.errorText }));
  page.on('console', message => {
    if (message.type() !== 'error') return;
    const item = { id, type: 'console', message: message.text(), url: message.location().url };
    if (item.url && new URL(item.url).pathname === '/favicon.ico' && /404/.test(item.message)) report.knownDiagnostics.push(item);
    else report.errors.push(item);
  });
  page.on('response', response => {
    if (response.status() < 400) return;
    const item = { id, type: 'http', status: response.status(), url: response.url() };
    if (new URL(item.url).pathname === '/favicon.ico' && item.status === 404) report.knownDiagnostics.push(item);
    else report.errors.push(item);
  });
  try {
    await page.goto(url.href);
    await fn(page, row, async (label, assertion) => { await assertion(); row.checks.push(label); });
    row.status = 'pass';
  } catch (error) {
    row.status = 'fail'; row.error = error.stack;
    await page.screenshot({ path: path.join(out, id + '-failure.png') }).catch(() => {});
  } finally { await context.close(); }
}
try {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  report.browser = browser.version();
  await Promise.all([
    run('real-expiry-root', rootURL, 1280, async (page, row, check) => {
      await toAction(page); const heading = await page.locator('h1').innerText(), started = Date.now();
      await action(page, 'timer');
      await check('repeated start disabled; initial 45 seconds shown', async () => {
        assert(await page.locator('[data-action="timer"]').isDisabled()); assert.equal(await page.locator('#timer').innerText(), '0:45');
      });
      await page.waitForFunction(() => document.querySelector('#timer')?.textContent === '0:00', {}, { timeout: 49000 });
      row.real_elapsed_ms = Date.now() - started;
      await check('real expiry keeps the optional activity playable', async () => {
        assert(row.real_elapsed_ms >= 44000 && row.real_elapsed_ms < 49000);
        assert.equal(await page.locator('h1').innerText(), heading);
        assert.equal(await page.locator('#timer-status').innerText(), 'A little time has passed. Keep going as long as you like.');
        assert(await page.locator('[data-action="write"]').isEnabled());
      });
      await page.screenshot({ path: path.join(out, 'real-expiry.png'), fullPage: true });
    }),
    run('dialog-and-navigation-nested', nestedURL, 390, async (page, row, check) => {
      row.clock_method = 'Playwright clock emulation';
      await toAction(page); await page.clock.install(); await action(page, 'timer'); await page.clock.fastForward(12000);
      await check('elapsed time updates countdown', async () => assert.equal(await page.locator('#timer').innerText(), '0:33'));
      await action(page, 'end'); await page.clock.fastForward(5000); await page.locator('[data-cancel]').click();
      await check('canceling End retains the active countdown', async () => {
        assert.equal(await page.locator('#timer').innerText(), '0:28'); assert(await page.locator('[data-action="timer"]').isDisabled());
      });
      await action(page, 'end'); await page.locator('[data-confirm]').click(); await page.clock.fastForward(60000);
      await check('confirm forget clears timer and stage without late writes', async () => {
        assert(await page.locator('[data-action="start-pair"]').isVisible()); assert.equal(await page.locator('#timer').count(), 0);
      });
      await toAction(page);
      await check('new activity has its own optional 45-second timer', async () => {
        assert.equal(await page.locator('#timer').innerText(), '0:45'); assert(await page.locator('[data-action="timer"]').isEnabled());
      });
      await action(page, 'timer'); await page.clock.fastForward(5000); await action(page, 'write'); await page.clock.fastForward(60000);
      await check('leaving activity cancels the old timer', async () => {
        assert(await page.locator('[data-action="ready-write-a"]').isVisible()); assert.equal(await page.locator('#timer').count(), 0);
      });
    }),
    run('page-lifecycle-root', rootURL, 1280, async (page, row, check) => {
      row.lifecycle_method = 'Synthetic PageTransitionEvent dispatch, not an actual browser bfcache test';
      await toAction(page); await page.clock.install(); await action(page, 'timer'); await page.clock.fastForward(3000);
      await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }))); await page.clock.fastForward(60000);
      await check('simulated pagehide clears private DOM and interval', async () => assert.equal(await page.locator('#app').innerHTML(), ''));
      await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
      await check('simulated persisted pageshow restores a fresh welcome', async () => {
        assert(await page.locator('[data-action="start-pair"]').isVisible()); assert.equal(await page.locator('#timer').count(), 0);
      });
    }),
  ]);
  assert(report.cases.every(row => row.status === 'pass'));
  assert.deepEqual(report.errors, []); report.status = 'pass';
} catch (error) { report.status = 'fail'; report.failure = error.stack; process.exitCode = 1; }
finally {
  if (browser) await browser.close();
  report.completed_at = new Date().toISOString();
  await writeFile(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ status: report.status, cases: report.cases.length, checks: report.cases.reduce((total, row) => total + row.checks.length, 0), errors: report.errors.length }));
}
