// Run against the already served main dashboard; this script does not publish.
// DASHBOARD_URL=http://127.0.0.1:8115 node docs/verification-vivid-2026-10-21/dashboard-browser.mjs
// Optional: PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs CHROMIUM_PATH=/path/to/chromium
// Override a later frozen identity with EXPECTED_CANDIDATE_VERSION,
// EXPECTED_MASTER_SHA and EXPECTED_SOURCE_SHA. Defaults identify the current 0.1.2 snapshot.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const date = new Date().toISOString();
const out = resolve(process.env.DASHBOARD_EVIDENCE_DIR || resolve(here, 'run-' + date.replaceAll(':', '-')));
await mkdir(out, { recursive: false }); // Preserve previous observations.
let playwright;
try { playwright = await import(process.env.PLAYWRIGHT_MODULE || 'playwright'); }
catch { playwright = await import('/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs'); }
const base = process.env.DASHBOARD_URL || 'http://127.0.0.1:8115/';
const expectedVersion = process.env.EXPECTED_CANDIDATE_VERSION || '0.1.2';
const expectedMaster = process.env.EXPECTED_MASTER_SHA || 'f9488e5079d1d193caef560d1fe72936add6cba3';
const expectedSource = process.env.EXPECTED_SOURCE_SHA || '0c72da97994d9f2d315e6aba1afba5219936b78b';
assert.match(expectedVersion, /^\d+\.\d+\.\d+$/);
assert.match(expectedMaster, /^[0-9a-f]{40}$/);
assert.match(expectedSource, /^[0-9a-f]{40}$/);
const candidate = `https://github.com/PaperStrange/IndiaGames/tree/${expectedMaster}/release-candidates/keepers-frame/${expectedVersion}`;
const policy = 'https://github.com/PaperStrange/IndiaGames/pull/1';
const report = {
  observed_at: date,
  method: 'Automated local Chromium dashboard integration; not game playtesting, human evidence or a deployed Pages check.',
  base_url: base,
  expected_candidate: { version: expectedVersion, master_commit: expectedMaster, source_commit: expectedSource },
  checkout_head_at_run: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  tracked_changes_at_run: execFileSync('git', ['status', '--short', '--untracked-files=no'], { cwd: root, encoding: 'utf8' }).trim().split('\n'),
  file_sha256: {},
  browser: null,
  checks: [],
  page_errors: [],
  http_failures: [],
};
for (const path of ['index.html', 'app.js', 'styles.css', 'data/tasks.json', 'data/source-manifest.json', 'data/releases.json']) {
  report.file_sha256[path] = createHash('sha256').update(await readFile(resolve(root, path))).digest('hex');
}
const browser = await playwright.chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'],
});
report.browser = browser.version();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
page.on('pageerror', error => report.page_errors.push(error.message));
page.on('response', response => {
  if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) report.http_failures.push({ url: response.url(), status: response.status() });
});
const pass = (id, detail) => report.checks.push({ id, status: 'pass', detail });

try {
  await page.goto(base);
  await page.waitForFunction(() => document.querySelector('#task-count').textContent === '60');
  assert.equal(await page.locator('#load-error').isVisible(), false);
  assert.equal(await page.locator('#project-grid .project-card').count(), 3);
  assert.match(await page.locator('.project-card.vivid').innerText(), /A Place for the Promise.*The Unfinished Postcard/s);
  const candidateState = await page.locator('.project-card.vivid .project-state').innerText();
  assert.ok(candidateState.includes(`Candidate ${expectedVersion}`) && candidateState.includes('human validation pending'));
  assert.match(await page.locator('.project-card.memorable .project-state').innerText(), /Proposed/);
  assert.match(await page.locator('.project-card.bell .project-state').innerText(), /Proposed/);
  pass('project-scope', `Three projects remain; Vivid contains two stories and a pending ${expectedVersion} candidate; the other lanes remain proposed.`);

  assert.equal(await page.locator('.project-card.vivid a', { hasText: `Staged ${expectedVersion} packet` }).getAttribute('href'), candidate);
  assert.equal(await page.locator('.project-card.vivid a', { hasText: 'Separate release-policy review' }).getAttribute('href'), policy);
  assert.match(await page.locator('#release-grid').innerText(), /No official releases yet/i);
  assert.equal(await page.locator('#human-rows').innerText(), '0');
  assert.equal(await page.locator('#release-grid a').count(), 0);
  pass('release-boundary', 'Candidate link pins the exact master packet, policy link opens PR #1, the official registry is empty and human rows remain zero.');

  const data = await page.evaluate(async () => ({ tasks: await (await fetch('./data/tasks.json')).json(), manifest: await (await fetch('./data/source-manifest.json')).json() }));
  const vivid = data.manifest.sources.find(source => source.lane === 'vivid');
  assert.equal(vivid.reviewed_head, expectedSource);
  assert.equal(vivid.candidate_master_commit, expectedMaster);
  assert.equal(vivid.candidate_version, expectedVersion);
  assert.equal(data.tasks.implementation_started, true);
  assert.equal(data.tasks.lane_status.vivid.implementation_started, true);
  assert.equal(data.tasks.lane_status.memorable.implementation_started, false);
  assert.equal(data.tasks.lane_status.bell.implementation_started, false);
  assert.equal(data.tasks.lane_status.vivid.qa_date_utc, '2026-10-21');
  assert.equal(data.tasks.lane_status.memorable.qa_date_utc, '2026-10-20');
  assert.equal(data.tasks.lane_status.bell.qa_date_utc, '2026-10-20');
  assert.equal(data.tasks.tasks.find(task => task.id === 'KF-22').status, 'active');
  assert.equal(data.tasks.tasks.find(task => task.id === 'KF-02').status, 'active');
  const research = data.manifest.research.vivid_browser_iteration;
  assert.equal(research.core_gameplay_titles, 6);
  assert.equal(research.distinct_families, 5);
  assert.equal(research.declared_units_completed, 3);
  assert.equal(research.declared_units_incomplete, 3);
  assert.equal(await page.locator('.project-card.vivid a', { hasText: 'Competitor journeys & design findings' }).getAttribute('href'), research.journeys_url);
  assert.equal(data.manifest.research.aggregate_count_scope, 'historical_original_roster_baseline');
  assert.match(await page.locator('#evidence').innerText(), /Historical original-roster gameplay baseline/i);
  pass('provenance-and-claims', 'Implementation/QA dates are lane-specific, policy review stays active and the old aggregate is explicitly historical.');

  await page.locator('#lane-filter').selectOption('vivid');
  assert.equal(await page.locator('#task-grid .task-card').count(), 23);
  await page.locator('#status-filter').selectOption('done');
  assert.equal(await page.locator('#task-grid .task-card').count(), 15);
  const first = page.locator('#task-grid .task-card').first();
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await first.locator('details').getAttribute('open'), '');
  const evidenceLink = await first.locator('.detail-body a[href*="/blob/"]').first().getAttribute('href');
  assert.match(evidenceLink, /\/blob\/[0-9a-f]{40}\//);
  pass('tasks-and-evidence', 'Vivid has 23 cards and 15 completed deliverables; keyboard opens task details with immutable evidence links.');

  await page.locator('#status-filter').selectOption('blocked_human');
  assert.equal(await page.locator('#task-grid .task-card').count(), 4);
  assert.match(await page.locator('#task-grid').innerText(), /physical-device performance/i);
  await page.locator('#clear-filters').click();
  await page.locator('#task-search').fill('Deliver Mara');
  assert.equal(await page.locator('#task-grid .task-card').count(), 1);
  await page.locator('#task-search').fill('no-match-for-this-check-827');
  assert.equal(await page.locator('#empty-state').isVisible(), true);
  await page.locator('#empty-clear').click();
  assert.equal(await page.locator('#task-grid .task-card').count(), 60);
  pass('filter-recovery', 'Four human blockers remain visible; search and empty-result recovery restore the complete board.');

  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.locator('#project-grid').screenshot({ path: resolve(out, 'desktop-projects.jpg'), type: 'jpeg', quality: 78 });
  await page.locator('#lane-filter').selectOption('vivid');
  await page.locator('#status-filter').selectOption('blocked_human');
  await page.locator('#tasks').scrollIntoViewIfNeeded();
  await page.screenshot({ path: resolve(out, 'desktop-human-gates.jpg'), type: 'jpeg', quality: 78 });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.project-card.vivid').scrollIntoViewIfNeeded();
  await page.locator('.project-card.vivid').screenshot({ path: resolve(out, 'mobile-vivid-card.jpg'), type: 'jpeg', quality: 80 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.locator('#tasks').scrollIntoViewIfNeeded();
  await page.screenshot({ path: resolve(out, 'mobile-human-gates.jpg'), type: 'jpeg', quality: 80 });
  pass('responsive-layout', '1440px desktop and 390px mobile captures saved; no narrow-screen horizontal overflow.');

  assert.deepEqual(report.page_errors, []);
  assert.deepEqual(report.http_failures, []);
  pass('load-and-errors', 'No uncaught page errors or failed required HTTP resources. Optional browser favicon is excluded.');
  report.status = 'pass';
} catch (error) {
  report.status = 'fail';
  report.error = String(error.stack || error);
  process.exitCode = 1;
} finally {
  await browser.close();
  await writeFile(resolve(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ status: report.status, checks: report.checks.length, output: out }));
}
