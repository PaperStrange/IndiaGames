// Local dashboard integration, not gameplay, human validation or a Pages deployment check.
// From main: PLAYWRIGHT_MODULE=/absolute/path/to/playwright node docs/verification-milestone-2026-10-27/browser.mjs
// Optional: CHROMIUM_PATH (or CHROME_BIN), DASHBOARD_EVIDENCE_DIR, DASHBOARD_ROOT.
// Optional independent identity expectations: EXPECTED_VIVID_MASTER_SHA,
// EXPECTED_BELL_MASTER_SHA, EXPECTED_VIVID_SOURCE_SHA, EXPECTED_BELL_SOURCE_SHA.
// Default expectations come from the current manifest and are checked against Git objects.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.env.DASHBOARD_ROOT || resolve(here, '../..'));
const observedAt = new Date().toISOString();
const out = resolve(process.env.DASHBOARD_EVIDENCE_DIR || join(here, 'run-' + observedAt.replaceAll(':', '-')));
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const identity = value => typeof value === 'string' && /^[0-9a-f]{40}$/.test(value);
const hashPattern = /^[0-9a-f]{64}$/;
const github = 'https://github.com/PaperStrange/IndiaGames/';
const inputs = [
  'index.html', 'app.js', 'styles.css', 'data/tasks.json', 'data/source-manifest.json', 'data/releases.json',
  'scripts/sync-dashboard.py', 'docs/games/small-hours/tasks.json', 'docs/games/keepers-frame/tasks.json',
  'docs/games/thirteenth-bell/tasks.json', 'docs/verification-milestone-2026-10-27/browser.mjs',
];
function checkoutState() {
  const raw = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
  const entries = raw ? raw.split('\n') : [];
  const tracked = entries.filter(line => !line.startsWith('??'));
  const untracked = entries.filter(line => line.startsWith('??'));
  return {
    head: git(['rev-parse', 'HEAD']),
    branch: git(['branch', '--show-current']) || '(detached)',
    tracked_dirty: tracked.length > 0,
    untracked_present: untracked.length > 0,
    dirty: entries.length > 0,
    tracked_changes: tracked,
    untracked_files: untracked,
    status_porcelain: entries,
  };
}
async function fileHashes() {
  const hashes = {};
  for (const name of inputs) hashes[name] = sha256(await readFile(resolve(root, name)));
  return hashes;
}
function pinnedFile(url, expectedPath) {
  assert.equal(typeof url, 'string', 'Missing immutable evidence URL');
  const match = url.match(/^https:\/\/github\.com\/PaperStrange\/IndiaGames\/blob\/([0-9a-f]{40})\/(.+)$/);
  assert.ok(match, 'Evidence URL must pin an immutable 40-hex commit: ' + url);
  if (expectedPath) assert.equal(match[2], expectedPath);
  git(['cat-file', '-e', match[1] + '^{commit}']);
  git(['cat-file', '-e', match[1] + ':' + match[2]]);
  return { commit: match[1], path: match[2] };
}
async function loadPlaywright() {
  const candidates = process.env.PLAYWRIGHT_MODULE ? [process.env.PLAYWRIGHT_MODULE] : [
    'playwright', '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs',
    '/workspace/IndiaGames/vivid-2.5d-photo-game/play/node_modules/playwright/index.mjs',
  ];
  const failures = [];
  for (const candidate of candidates) {
    try {
      let specifier = candidate;
      if (isAbsolute(candidate)) {
        const info = await stat(candidate);
        const file = info.isDirectory() ? createRequire(import.meta.url).resolve(candidate) : candidate;
        specifier = pathToFileURL(file).href;
      }
      const loaded = await import(specifier);
      return { module: loaded.chromium ? loaded : loaded.default, specifier };
    } catch (error) { failures.push(candidate + ': ' + error.message); }
  }
  throw new Error('Playwright could not load; set PLAYWRIGHT_MODULE. ' + failures.join(' | '));
}
const report = {
  observed_at: observedAt,
  method: 'Automated local Chromium dashboard integration at direct and /IndiaGames/ mounts. No game playthrough, human observation, physical device or deployed Pages claim.',
  output_directory: out,
  viewport_groups: [],
  checks: [],
  source_file_sha256: {},
  page_errors: [],
  http_failures: [],
  request_failures: [],
  screenshots: [],
};
let server, browser, activePage;
let outputCreated = false;
const check = (id, detail) => report.checks.push({ id, status: 'pass', detail });

try {
  // Capture checkout state before this run creates its own untracked report directory.
  report.checkout_before = checkoutState();
  await mkdir(out, { recursive: false }); // Refuse to overwrite an earlier run.
  outputCreated = true;
  report.source_file_sha256 = await fileHashes();
  const tasks = JSON.parse(await readFile(join(root, 'data/tasks.json'), 'utf8'));
  const manifest = JSON.parse(await readFile(join(root, 'data/source-manifest.json'), 'utf8'));
  const releases = JSON.parse(await readFile(join(root, 'data/releases.json'), 'utf8'));
  const sources = Object.fromEntries(manifest.sources.map(source => [source.lane, source]));
  const byId = Object.fromEntries(tasks.tasks.map(task => [task.id, task]));
  const laneCounts = { memorable: 19, vivid: 23, bell: 18 };
  assert.equal(manifest.sources.length, 3);
  assert.equal(tasks.tasks.length, 60);
  for (const [lane, count] of Object.entries(laneCounts)) {
    assert.equal(tasks.tasks.filter(task => task.lane === lane).length, count, lane + ' task count');
    assert.equal(sources[lane].human_participant_rows, 0, lane + ' human rows');
    assert.equal(sources[lane].official_release, false, lane + ' official release flag');
  }
  assert.deepEqual(releases.releases, []);
  assert.equal(manifest.research.human_participant_rows, 0);
  assert.equal(byId['KF-22'].status, 'active', 'Separate Vivid policy review remains open');
  const humanBlockers = ['SH-03', 'SH-05', 'SH-10', 'SH-14', 'SH-18', 'KF-12', 'KF-13', 'KF-18', 'KF-23', 'TB-13', 'TB-17'];
  for (const id of humanBlockers) {
    assert.equal(byId[id]?.status, 'blocked_human', id + ' human status');
    assert.equal(byId[id].human_participants_required, true, id + ' human requirement');
  }
  assert.ok(!sources.memorable.candidate_manifest && !sources.memorable.candidate_version, 'Small Hours is not staged');
  assert.match(sources.memorable.candidate_status, /^not_staged/);
  assert.deepEqual(byId['SH-17'].depends_on, ['SH-06', 'SH-10', 'SH-12'], 'Small Hours staging dependencies remain intact');
  check('scope-and-human-boundaries', 'Three projects; 19/23/18 task counts; no official releases or human rows; required human cards blocked; KF-22 active; Small Hours unstaged.');

  report.candidates = {};
  for (const [lane, game, version] of [['vivid', 'keepers-frame', '0.1.2'], ['bell', 'thirteenth-bell', '0.1.0']]) {
    const source = sources[lane];
    const envPrefix = lane.toUpperCase();
    const expectedMaster = process.env['EXPECTED_' + envPrefix + '_MASTER_SHA'] || source.candidate_master_commit;
    assert.ok(identity(expectedMaster), lane + ' requires a full candidate master commit');
    assert.equal(source.candidate_version, version);
    assert.equal(source.candidate_master_commit, expectedMaster);
    assert.match(source.candidate_status, /^staged/);
    const candidatePath = 'release-candidates/' + game + '/' + version + '/candidate.json';
    assert.equal(source.candidate_manifest, github + 'blob/' + expectedMaster + '/' + candidatePath);
    pinnedFile(source.candidate_manifest, candidatePath);
    // Check actual staged content and master ancestry, not only two matching URL strings.
    git(['merge-base', '--is-ancestor', expectedMaster, 'refs/heads/master']);
    const candidate = JSON.parse(git(['show', expectedMaster + ':' + candidatePath]));
    assert.equal(candidate.game, game);
    assert.equal(candidate.version, version);
    assert.ok(identity(candidate.source_commit));
    git(['cat-file', '-e', candidate.source_commit + '^{commit}']);
    const expectedSource = process.env['EXPECTED_' + envPrefix + '_SOURCE_SHA'];
    if (expectedSource) assert.equal(candidate.source_commit, expectedSource);
    assert.match(candidate.build.sha256, hashPattern);
    assert.equal(source.candidate_build_sha256, candidate.build.sha256);
    const human = JSON.parse(git(['show', expectedMaster + ':' + candidatePath.replace('candidate.json', 'human-playtest.json')]));
    const rows = (human.sessions || []).length + (human.story_reports || []).reduce((n, item) => n + (item.sessions || []).length, 0) + (human.study_reports || []).reduce((n, item) => n + (item.sessions || []).length, 0);
    assert.equal(rows, 0, lane + ' staged human rows');
    assert.equal(human.human_approval.approved, false, lane + ' human approval');
    report.candidates[lane] = { version, master_commit: expectedMaster, source_commit: candidate.source_commit, build_sha256: candidate.build.sha256, candidate_manifest: source.candidate_manifest, expected_source_override: expectedSource || null };
  }
  report.pilot_packets = {};
  for (const lane of Object.keys(laneCounts)) report.pilot_packets[lane] = pinnedFile(sources[lane].pilot_packet, 'docs/gamejam/milestone-2026-10-27/README.md');
  check('immutable-packets', 'Vivid 0.1.2 and Bell 0.1.0 point to existing immutable master candidate manifests with matching identities and pending human reports; all three pilot links pin existing files.');

  const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
  server = createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
      let pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      if (pathname === '/IndiaGames') { response.writeHead(302, { Location: '/IndiaGames/' }).end(); return; }
      if (pathname.startsWith('/IndiaGames/')) pathname = pathname.slice('/IndiaGames'.length);
      if (pathname === '/favicon.ico') { response.writeHead(204).end(); return; }
      if (pathname.split('/').some(part => part.startsWith('.'))) { response.writeHead(403).end(); return; }
      let file = resolve(root, '.' + pathname);
      if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      const bytes = await readFile(file);
      response.writeHead(200, { 'Content-Type': contentTypes[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((resolveListening, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolveListening); });
  const base = 'http://127.0.0.1:' + server.address().port;
  report.base_url = base;
  const pw = await loadPlaywright();
  report.playwright_module = pw.specifier;
  browser = await pw.module.chromium.launch({ executablePath: process.env.CHROMIUM_PATH || process.env.CHROME_BIN || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  report.browser_version = browser.version();
  for (const [mountName, mount] of [['root', '/'], ['project', '/IndiaGames/']]) {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const id = mountName + '-' + viewport.width;
      const group = { id, url: base + mount, viewport, status: 'running', checks: [] };
      report.viewport_groups.push(group);
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const page = await context.newPage(); activePage = page;
      page.setDefaultTimeout(12000);
      page.on('pageerror', error => report.page_errors.push({ group: id, message: error.message }));
      page.on('response', response => { if (response.status() >= 400) report.http_failures.push({ group: id, url: response.url(), status: response.status() }); });
      page.on('requestfailed', request => report.request_failures.push({ group: id, url: request.url(), error: request.failure()?.errorText }));
      await page.goto(group.url, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.querySelector('#task-count').textContent === '60');
      assert.equal(await page.locator('#load-error').isVisible(), false);
      assert.equal(await page.locator('#project-grid .project-card').count(), 3);
      assert.equal(await page.locator('#task-grid .task-card').count(), 60);
      assert.equal(await page.locator('#human-rows').innerText(), '0');
      assert.match(await page.locator('#release-grid').innerText(), /No official releases yet/i);
      assert.equal(await page.locator('#release-grid a').count(), 0);
      const served = await page.evaluate(async () => {
        const [tasks, manifest, releases] = await Promise.all(['tasks', 'source-manifest', 'releases'].map(async name => {
          const response = await fetch('./data/' + name + '.json');
          if (!response.ok) throw new Error(name + ' status ' + response.status);
          return response.json();
        }));
        return { tasks, manifest, releases };
      });
      assert.deepEqual(served, { tasks, manifest, releases });
      for (const lane of Object.keys(laneCounts)) {
        const card = page.locator('.project-card.' + lane);
        assert.equal(await card.locator('a', { hasText: 'Playtest packet & launch instructions' }).getAttribute('href'), sources[lane].pilot_packet);
        assert.equal(await card.locator('.project-state').innerText(), sources[lane].milestone_status_label);
      }
      for (const lane of ['vivid', 'bell']) {
        const expected = report.candidates[lane];
        const url = expected.candidate_manifest.replace('/blob/', '/tree/').replace('/candidate.json', '');
        assert.equal(await page.locator('.project-card.' + lane + ' a', { hasText: 'Staged ' + expected.version + ' packet' }).getAttribute('href'), url);
      }
      assert.equal(await page.locator('.project-card.memorable a', { hasText: /^Staged / }).count(), 0);
      assert.equal(await page.locator('.project-card.vivid a', { hasText: 'Separate release-policy review' }).getAttribute('href'), github + 'pull/1');
      group.checks.push('Three project cards, 60 task cards, exact served data, immutable pilot/candidate links and no official/human release claim.');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, id + ' initial overflow');
      const projectShot = id + '-projects.jpg';
      if (viewport.width > 1000) await page.locator('#project-grid').screenshot({ path: join(out, projectShot), type: 'jpeg', quality: 76 });
      else {
        await page.locator('.project-card.bell').scrollIntoViewIfNeeded();
        await page.locator('.project-card.bell').screenshot({ path: join(out, projectShot), type: 'jpeg', quality: 78 });
      }
      report.screenshots.push(projectShot);
      for (const [lane, count] of Object.entries(laneCounts)) {
        await page.locator('#lane-filter').selectOption(lane);
        assert.equal(await page.locator('#task-grid .task-card').count(), count, id + ' ' + lane + ' filter');
      }
      await page.locator('#clear-filters').click();
      await page.locator('#status-filter').selectOption('blocked_human');
      const humanTasks = tasks.tasks.filter(task => task.status === 'blocked_human');
      assert.equal(await page.locator('#task-grid .task-card').count(), humanTasks.length);
      for (const blocker of humanBlockers) assert.equal(await page.locator('#task-' + blocker).count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, id + ' filtered overflow');
      await page.locator('#tasks').scrollIntoViewIfNeeded();
      const humanShot = id + '-human-gates.jpg';
      await page.screenshot({ path: join(out, humanShot), type: 'jpeg', quality: 76 });
      report.screenshots.push(humanShot);
      await page.locator('#clear-filters').click();
      const perspective = tasks.tasks.find(task => task.id === 'TB-11').perspective;
      await page.locator('#perspective-filter').selectOption(perspective);
      assert.equal(await page.locator('#task-grid .task-card').count(), tasks.tasks.filter(task => task.perspective === perspective).length);
      await page.locator('#clear-filters').click();
      await page.locator('#task-search').fill('Review the multi-story release policy separately');
      assert.equal(await page.locator('#task-grid .task-card').count(), 1);
      assert.equal(await page.locator('#task-KF-22').count(), 1);
      const summary = page.locator('#task-grid .task-card summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('#task-grid .task-card details').evaluate(node => node.open), true);
      assert.match(await page.locator('#task-grid .detail-body').innerText(), /Owner role|Dependencies/i);
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('#task-grid .task-card details').evaluate(node => node.open), false);
      await page.locator('#task-search').fill('no-such-milestone-task-20261027-check');
      assert.equal(await page.locator('#task-grid .task-card').count(), 0);
      assert.equal(await page.locator('#empty-state').isVisible(), true);
      await page.locator('#empty-clear').click();
      assert.equal(await page.locator('#task-grid .task-card').count(), 60);
      assert.equal(await page.locator('#empty-state').isVisible(), false);
      assert.equal(await page.locator('#task-search').evaluate(node => node === document.activeElement), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, id + ' final overflow');
      group.checks.push('Lane/status/perspective filters, unique task search, keyboard details, empty-state recovery, focus restoration and no horizontal overflow.');
      group.status = 'pass';
      await context.close(); activePage = null;
    }
  }
  assert.deepEqual(report.page_errors, []);
  assert.deepEqual(report.http_failures, []);
  assert.deepEqual(report.request_failures, []);
  check('browser-resources', 'No page errors, HTTP failures or failed browser requests across all four mount/viewport groups.');
  const hashesAfter = await fileHashes();
  assert.deepEqual(hashesAfter, report.source_file_sha256, 'Dashboard inputs changed while the checker was running');
  assert.equal(git(['rev-parse', 'HEAD']), report.checkout_before.head, 'Checkout HEAD changed during verification');
  assert.equal(git(['branch', '--show-current']) || '(detached)', report.checkout_before.branch, 'Checkout branch changed during verification');
  report.source_files_stable_during_run = true;
  report.status = 'pass';
} catch (error) {
  report.status = 'fail';
  report.error = String(error.stack || error);
  process.exitCode = 1;
  if (activePage && !activePage.isClosed()) {
    try { await activePage.screenshot({ path: join(out, 'failure.jpg'), type: 'jpeg', quality: 80 }); report.screenshots.push('failure.jpg'); } catch {}
  }
} finally {
  if (browser) await browser.close();
  if (server) { server.closeAllConnections(); await new Promise(resolveClosed => server.close(resolveClosed)); }
  try { report.checkout_after = checkoutState(); } catch (error) { report.checkout_after_error = error.message; }
  report.checkout_after_includes_generated_evidence = relative(root, out).split(sep)[0] !== '..' && !isAbsolute(relative(root, out));
  report.finished_at = new Date().toISOString();
  report.groups_passed = report.viewport_groups.filter(group => group.status === 'pass').length;
  report.group_count = report.viewport_groups.length;
  report.check_count = report.checks.length;
  report.count_note = 'Counts are integration groups/checks, not game behavioral assertions, unit tests or human participants.';
  try {
    const outputStat = await stat(out);
    if (outputCreated && outputStat.isDirectory()) {
      await writeFile(join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
      console.log(JSON.stringify({ status: report.status, groups_passed: report.groups_passed, groups: report.group_count, checks: report.check_count, output: out }));
    } else console.error(report.error || 'The output directory was not created; no report overwritten.');
  } catch (error) { console.error('Could not save report: ' + error.message); process.exitCode = 1; }
}
