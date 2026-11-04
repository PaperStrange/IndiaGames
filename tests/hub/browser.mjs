// Dashboard integration: no game playthrough, human participant or physical-device claim.
// PLAYWRIGHT_MODULE=/path/to/playwright HUB_EVIDENCE_DIR=/tmp/new-run node tests/hub/browser.mjs
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, extname, isAbsolute, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(process.env.HUB_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '../..'));
const observedAt = new Date().toISOString();
const out = resolve(process.env.HUB_EVIDENCE_DIR || join(tmpdir(), 'indiagames-hub-' + observedAt.replaceAll(':', '-')));
const githubRoot = 'https://github.com/PaperStrange/IndiaGames/';
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const blob = object => execFileSync('git', ['show', object], { cwd: root, maxBuffer: 16 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const inputFiles = ['index.html', 'app.js', 'styles.css', 'data/hub-presentation.json', 'data/tasks.json', 'data/source-manifest.json', 'data/releases.json', 'tests/hub/browser.mjs'];
const report = { observed_at: observedAt, method: 'Local Chromium dashboard integration, direct/project mounts, responsive layouts, keyboard and navigation, immutable asset/source checks. No human session, game regression, physical-device or deployed-site claim.', viewport_groups: [], extra_scenarios: [], static_checks: [], images: [], links: [], errors: [], screenshots: [], input_sha256: {} };
let server, browser, activePage, created = false;
const allLinks = new Map();
const pass = (id, detail) => report.static_checks.push({ id, status: 'pass', detail });
const json = async path => JSON.parse(await readFile(join(root, path), 'utf8'));

async function loadPlaywright() {
  const candidates = process.env.PLAYWRIGHT_MODULE ? [process.env.PLAYWRIGHT_MODULE] : ['playwright', join(root, 'vivid-2.5d-photo-game/play/node_modules/playwright'), '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright'];
  for (const candidate of candidates) {
    try {
      const module = isAbsolute(candidate) ? pathToFileURL(createRequire(import.meta.url).resolve(candidate)).href : candidate;
      const loaded = await import(module);
      report.playwright_module = module;
      return loaded.chromium ? loaded : loaded.default;
    } catch { /* Try the next installed module; never install or change lockfiles. */ }
  }
  throw new Error('Playwright not found. Set PLAYWRIGHT_MODULE to an installed module.');
}

async function hashes() {
  return Object.fromEntries(await Promise.all(inputFiles.map(async name => [name, digest(await readFile(join(root, name)))])));
}

async function verifyIdentity(tasks, manifest, presentation, releases) {
  assert.equal(tasks.tasks.length, 60);
  assert.equal(new Set(tasks.tasks.map(task => task.id)).size, 60);
  assert.deepEqual(releases.releases, []);
  assert.equal(manifest.research.human_participant_rows, 0);
  const lanes = { memorable: 19, vivid: 23, bell: 18 };
  for (const [lane, count] of Object.entries(lanes)) {
    assert.equal(tasks.tasks.filter(task => task.lane === lane).length, count);
    const source = manifest.sources.find(source => source.lane === lane);
    assert.equal(source.human_participant_rows, 0);
    assert.equal(source.official_release, false);
    assert.equal(git(['rev-parse', source.branch]), source.reviewed_head, 'Game branch changed since the source manifest review');
    // Historical evidence was committed after Vivid's executable QA source; it is not runtime.
    const exclusions = lane === 'vivid' ? [':(exclude)vivid-2.5d-photo-game/play/evidence/**'] : [];
    git(['diff', '--exit-code', source.qa_source_commit, source.branch, '--', ...source.runtime_scope, ...exclusions]);
  }
  pass('human-and-runtime-boundaries', '60 task IDs and 19/23/18 lane counts; human counts remain zero; official registry empty; game branch heads equal the source review; runtime/test scopes equal their verified source (Vivid later play/evidence records excluded).');
  report.candidates = [];
  for (const source of manifest.sources.filter(source => source.candidate_manifest)) {
    const path = new URL(source.candidate_manifest).pathname.split('/').slice(5).join('/');
    const candidate = JSON.parse(blob(source.candidate_master_commit + ':' + path));
    const prefix = path.slice(0, -'candidate.json'.length);
    const sortedFiles = Object.fromEntries(Object.entries(candidate.build.files).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
    assert.equal(digest(JSON.stringify(sortedFiles)), candidate.build.sha256);
    assert.equal(candidate.build.sha256, source.candidate_build_sha256);
    for (const [name, hash] of Object.entries(sortedFiles)) assert.equal(digest(blob(source.candidate_master_commit + ':' + prefix + 'build/' + name)), hash, name);
    git(['diff', '--exit-code', source.candidate_master_commit, 'master', '--', prefix]);
    const human = JSON.parse(blob(source.candidate_master_commit + ':' + prefix + 'human-playtest.json'));
    const rows = (human.sessions || []).length + [...(human.story_reports || []), ...(human.study_reports || [])].reduce((n, record) => n + (record.sessions || []).length, 0);
    assert.equal(rows, 0); assert.equal(human.human_approval.approved, false);
    report.candidates.push({ game: candidate.game, version: candidate.version, build_sha256: candidate.build.sha256, files: Object.keys(sortedFiles).length, source_commit: candidate.source_commit });
  }
  pass('candidate-identity', 'Current master candidate trees and file hashes equal their pinned packets; no human report populated or approval granted.');
  assert.equal(presentation.projects.length, 3);
  let imageBytes = 0;
  for (const project of presentation.projects) {
    const art = project.image;
    assert.ok(art.src.startsWith('assets/hub/') && !art.src.includes('..'));
    assert.ok(art.alt.trim() && art.caption.trim());
    assert.match(art.source_commit, /^[0-9a-f]{40}$/);
    const bytes = await readFile(join(root, art.src));
    assert.equal(digest(bytes), art.sha256);
    assert.equal(digest(blob(art.source_commit + ':' + art.source_path)), art.sha256);
    assert.equal(bytes.byteLength, art.bytes);
    imageBytes += bytes.byteLength;
    report.images.push({ lane: project.lane, path: art.src, sha256: art.sha256, bytes: art.bytes, source_commit: art.source_commit, source_path: art.source_path, kind: art.kind });
  }
  assert.ok(imageBytes <= 4 * 1024 * 1024, 'Original hub images exceed the 4 MiB budget');
  pass('genuine-images', `Three displayed assets are byte-identical to pinned game captures/art; total ${imageBytes} bytes.`);
}

async function collectLinks(page) {
  const entries = await page.locator('a[href]').evaluateAll(anchors => anchors.map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim(), url: a.href })));
  for (const entry of entries) if (!allLinks.has(entry.url)) allLinks.set(entry.url, entry);
  const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
  report.document_ids = [...new Set([...(report.document_ids || []), ...ids])];
}

async function verifyLinks(base) {
  for (const entry of allLinks.values()) {
    const url = new URL(entry.url);
    if (url.origin === new URL(base).origin) {
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.startsWith('/IndiaGames/')) pathname = pathname.slice('/IndiaGames'.length);
      const path = resolve(root, '.' + pathname);
      assert.ok(path === root || path.startsWith(root + sep), entry.href);
      if (pathname === '/' || pathname === '/index.html') {
        if (url.hash) assert.ok(report.document_ids.includes(decodeURIComponent(url.hash.slice(1))), 'Missing anchor: ' + entry.href);
      } else await stat(path);
      report.links.push({ ...entry, validation: 'local file / document anchor' });
    } else if (entry.url.startsWith(githubRoot)) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (['blob', 'tree'].includes(parts[2])) {
        const ref = parts[3];
        const path = decodeURIComponent(parts.slice(4).join('/'));
        if (ref === 'main') {
          if (path) {
            const file = await stat(join(root, path));
            assert.equal(parts[2] === 'tree', file.isDirectory(), entry.url);
          }
          report.links.push({ ...entry, validation: 'intended main publication working-tree target (not yet a live HTTP assertion)' });
        } else {
          const type = git(['cat-file', '-t', path ? ref + ':' + path : ref + '^{tree}']);
          assert.equal(type, parts[2] === 'blob' ? 'blob' : 'tree', entry.url);
          report.links.push({ ...entry, validation: 'existing Git object and link type' });
        }
      } else report.links.push({ ...entry, validation: 'repository service link; no remote HTTP claim' });
    } else report.links.push({ ...entry, validation: 'external destination recorded; not fetched' });
  }
  pass('navigation-targets', `${report.links.length} unique rendered destinations classified; local anchors/files and GitHub source targets resolve. The paused candidate URL is not repaired or claimed successful.`);
}

async function makeServer() {
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
  const instance = createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
      let pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      if (pathname === '/IndiaGames') { response.writeHead(302, { Location: '/IndiaGames/' }).end(); return; }
      if (pathname.startsWith('/IndiaGames/')) pathname = pathname.slice('/IndiaGames'.length);
      if (pathname === '/favicon.ico') { response.writeHead(204).end(); return; }
      if (pathname.split('/').some(part => part.startsWith('.'))) { response.writeHead(403).end(); return; }
      let path = resolve(root, '.' + pathname);
      if (path !== root && !path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
      if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
      const bytes = await readFile(path);
      response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((done, fail) => { instance.once('error', fail); instance.listen(0, '127.0.0.1', done); });
  return instance;
}

async function ready(page) {
  await page.waitForFunction(() => document.querySelector('#task-count')?.textContent === '60');
  assert.equal(await page.locator('#load-error').isVisible(), false);
}

async function noOverflow(page, label) {
  const bounds = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(bounds.document <= bounds.width + 1 && bounds.body <= bounds.width + 1, label + ': horizontal overflow ' + JSON.stringify(bounds));
  return bounds;
}

async function revealImages(page) {
  // Visit the images as a scrolling reader would so lazy/async images are painted in captures.
  for (const image of await page.locator('.project-image').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async image => { await image.decode(); await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))); });
    assert.equal(await image.evaluate(image => image.complete && image.naturalWidth > 0), true);
  }
  await page.evaluate(async () => { scrollTo(0, 0); await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))); });
}

function watch(page, group, expectedFailure = false) {
  page.on('pageerror', error => report.errors.push({ group, kind: 'pageerror', message: error.message }));
  page.on('response', response => {
    if (response.status() >= 400 && !(expectedFailure && response.status() === 503 && response.url().endsWith('/data/tasks.json'))) report.errors.push({ group, kind: 'http', status: response.status(), url: response.url() });
  });
  page.on('requestfailed', request => report.errors.push({ group, kind: 'requestfailed', url: request.url(), error: request.failure()?.errorText }));
}

async function taskIds(page) {
  return page.locator('#task-grid tr.task-row').evaluateAll(rows => rows.map(row => row.dataset.taskId || row.querySelector('.task-id')?.textContent?.trim()));
}

async function allTaskIds(page) {
  const ids = [];
  for (let pages = 0; pages < 10; pages++) {
    const current = await taskIds(page);
    assert.ok(current.length > 0 && current.length <= 12, 'A task page must contain 1–12 rows');
    ids.push(...current);
    await collectLinks(page);
    if (await page.locator('#page-next').isDisabled()) break;
    await page.locator('#page-next').click();
  }
  return ids;
}

async function openDetails(page) {
  const toggle = page.locator('button.task-toggle').first();
  await toggle.focus();
  await page.keyboard.press('Enter');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  const controlled = await toggle.getAttribute('aria-controls');
  assert.ok(controlled);
  assert.equal(await page.locator('[id="' + controlled + '"]').isVisible(), true);
  const words = await page.locator('[id="' + controlled + '"]').innerText();
  assert.match(words, /acceptance/i);
  assert.match(words, /dependenc/i);
  await collectLinks(page);
  await toggle.focus();
  await page.keyboard.press('Enter');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('[id="' + controlled + '"]').isVisible(), false);
}

async function checkJourney(base, tasks, manifest, presentation, releases) {
  const sourceByLane = Object.fromEntries(manifest.sources.map(source => [source.lane, source]));
  const expectedIds = tasks.tasks.map(task => task.id).sort();
  for (const [mountName, mount] of [['root', '/'], ['project', '/IndiaGames/']]) {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const id = mountName + '-' + viewport.width;
      const group = { id, mount, viewport, status: 'running', checks: [] };
      report.viewport_groups.push(group);
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const page = await context.newPage(); activePage = page;
      page.setDefaultTimeout(15000);
      watch(page, id);
      await page.goto(base + mount, { waitUntil: 'networkidle' });
      await ready(page);
      assert.equal(await page.locator('#overview-view').isVisible(), true);
      assert.equal(await page.locator('#tasks').isVisible(), false);
      assert.equal(await page.locator('#project-grid .project-card').count(), 3);
      assert.equal(await page.locator('#project-grid .project-image').count(), 3);
      const imageStates = await page.locator('#project-grid .project-image').evaluateAll(images => images.map(image => ({ loaded: image.complete && image.naturalWidth > 0, src: image.getAttribute('src'), alt: image.getAttribute('alt') })));
      assert.ok(imageStates.every(image => image.loaded && image.alt?.trim()));
      assert.deepEqual(imageStates.map(image => image.src.replace(/^\.\//, '')).sort(), presentation.projects.map(project => project.image.src).sort());
      group.visible_words = (await page.locator('body').innerText()).split(/\s+/).filter(Boolean).length;
      group.overview_height_px = await page.evaluate(() => document.documentElement.scrollHeight);
      assert.ok(group.visible_words <= 650, `${id}: ${group.visible_words} overview words exceeds 650`);
      await noOverflow(page, id + ' overview');
      const readiness = page.locator('#readiness-rows tr');
      assert.equal(await readiness.count(), 3);
      const rowWords = await readiness.allInnerTexts();
      assert.ok(rowWords.every(words => /pending/i.test(words) && /0\s*\/\s*6/.test(words)), 'Readiness must preserve zero human results and pending checks');
      assert.match(rowWords.find(words => /small hours/i.test(words)), /pairs/i);
      const vividWords = rowWords.find(words => /vivid/i.test(words));
      assert.match(vividWords, /Iona/i); assert.match(vividWords, /Mara/i);
      assert.equal((vividWords.match(/0\s*\/\s*6/g) || []).length, 2);
      assert.match(await page.locator('#release-grid').innerText(), /no official releases/i);
      assert.match(await page.locator('#launch-date').innerText(), /20 November/i);
      assert.ok(await page.locator('#timeline li').count() >= 5);
      const served = await page.evaluate(async () => Object.fromEntries(await Promise.all(['tasks', 'source-manifest', 'releases', 'hub-presentation'].map(async name => [name, await (await fetch('./data/' + name + '.json')).json()]))));
      assert.deepEqual(served, { tasks, 'source-manifest': manifest, releases, 'hub-presentation': presentation });
      for (const source of manifest.sources) {
        const hrefs = await page.locator('#project-grid a').evaluateAll(nodes => nodes.map(node => node.href));
        assert.ok(hrefs.includes(source.human_playtest_packet), source.lane + ' human packet link');
      }
      await collectLinks(page);
      await revealImages(page);
      const overviewShot = id + '-overview.jpg';
      await page.screenshot({ path: join(out, overviewShot), type: 'jpeg', quality: 78, fullPage: true });
      report.screenshots.push(overviewShot);
      group.checks.push('Default overview has three genuine loaded images, correct human denominators, empty release registry, launch timeline, exact served data and <=650 visible words.');

      await page.locator('#board-link').click();
      await page.locator('#tasks').waitFor({ state: 'visible' });
      assert.equal(new URL(page.url()).hash, '#tasks');
      assert.equal(await page.locator('#tasks').isVisible(), true);
      assert.equal(await page.locator('#overview-view').isVisible(), false);
      assert.equal((await taskIds(page)).length, 12);
      assert.equal(await page.locator('#page-previous').isDisabled(), true);
      const seen = await allTaskIds(page);
      assert.equal(seen.length, 60); assert.equal(new Set(seen).size, 60);
      assert.deepEqual([...seen].sort(), expectedIds);
      assert.equal(await page.locator('#page-next').isDisabled(), true);
      await page.locator('#page-previous').click();
      assert.match(await page.locator('#page-status').innerText(), /4\s*(of|\/)\s*5/i);

      for (const [lane, count] of Object.entries({ memorable: 19, vivid: 23, bell: 18 })) {
        await page.locator('#lane-filter').selectOption(lane);
        assert.match(await page.locator('#page-status').innerText(), /1\s*(of|\/)\s*2/i);
        const filtered = await allTaskIds(page);
        assert.equal(filtered.length, count);
        assert.deepEqual(filtered.sort(), tasks.tasks.filter(task => task.lane === lane).map(task => task.id).sort());
      }
      await page.locator('#clear-filters').click();
      await page.locator('#status-filter').selectOption('blocked_human');
      const humanIds = await allTaskIds(page);
      assert.deepEqual(humanIds.sort(), tasks.tasks.filter(task => task.status === 'blocked_human').map(task => task.id).sort());
      await page.locator('#clear-filters').click();
      const perspective = tasks.tasks[0].perspective;
      await page.locator('#perspective-filter').selectOption(perspective);
      assert.deepEqual((await allTaskIds(page)).sort(), tasks.tasks.filter(task => task.perspective === perspective).map(task => task.id).sort());
      await page.locator('#clear-filters').click();
      await page.locator('#task-search').fill('SH-17');
      // A dependency search should also expose the downstream task that names this ID.
      assert.deepEqual(await taskIds(page), ['SH-17', 'SH-18']);
      await openDetails(page);
      await page.locator('#task-search').fill('no_such_task_qa_28971');
      assert.equal((await taskIds(page)).length, 0);
      assert.equal(await page.locator('#empty-state').isVisible(), true);
      await page.locator('#empty-clear').click();
      assert.equal((await taskIds(page)).length, 12);
      await noOverflow(page, id + ' board');
      const boardShot = id + '-board.jpg';
      await page.screenshot({ path: join(out, boardShot), type: 'jpeg', quality: 78, fullPage: true });
      report.screenshots.push(boardShot);
      group.checks.push('All 60 tasks reachable in five 12-row pages; previous/next boundaries, each lane/status/perspective filter, ID/dependency search, empty recovery, and keyboard detail open/close.');

      await page.locator('#overview-link').click();
      await page.locator('#overview-view').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#overview-view').isVisible(), true);
      await page.goBack();
      await page.locator('#tasks').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#tasks').isVisible(), true);
      await page.goForward();
      await page.locator('#overview-view').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#overview-view').isVisible(), true);
      await page.goto(base + mount + '#sources', { waitUntil: 'networkidle' });
      await ready(page);
      await page.locator('#evidence-details[open]').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#overview-view').isVisible(), true);
      assert.equal(await page.locator('#evidence-details').getAttribute('open'), '');
      await collectLinks(page);
      await noOverflow(page, id + ' expanded evidence');
      for (const anchor of ['projects', 'releases', 'design-kit', 'evidence']) {
        await page.evaluate(hash => { location.hash = hash; }, anchor);
        await page.waitForFunction(() => !document.querySelector('#overview-view').hidden);
        assert.equal(await page.locator('#' + anchor).isVisible(), true);
      }
      await page.goto(base + mount + '#task-TB-17', { waitUntil: 'networkidle' });
      await ready(page);
      await page.locator('#details-TB-17').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#tasks').isVisible(), true);
      assert.equal(await page.locator('#task-TB-17').isVisible(), true);
      assert.equal(await page.locator('#task-TB-17 .task-toggle').getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#details-TB-17').isVisible(), true);
      await collectLinks(page);
      await page.goto(base + mount + '#bad%', { waitUntil: 'networkidle' });
      await ready(page);
      await page.locator('#overview-view').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#overview-view').isVisible(), true);
      group.checks.push('Browser back/forward preserves the selected view; legacy anchors remain reachable; sources opens evidence; late-task deep links select and open the task; malformed hashes do not crash.');
      group.status = 'pass';
      await context.close(); activePage = null;
    }
  }

  // A separate context proves a visible loading failure can be recovered without a reload.
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage(); activePage = page; watch(page, 'load-failure-retry', true);
    let failed = false;
    await page.route('**/data/tasks.json', async route => {
      if (!failed) { failed = true; await route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"intentional QA load failure"}' }); }
      else await route.continue();
    });
    await page.goto(base + '/IndiaGames/', { waitUntil: 'domcontentloaded' });
    await page.locator('#load-error').waitFor({ state: 'visible' });
    await page.locator('#retry-load').focus(); await page.keyboard.press('Enter');
    await ready(page);
    assert.equal(await page.locator('#project-grid .project-card').count(), 3);
    await page.locator('#board-link').click();
    await page.locator('#tasks').waitFor({ state: 'visible' });
    assert.equal((await taskIds(page)).length, 12);
    await noOverflow(page, 'recovered dashboard');
    report.extra_scenarios.push({ id: 'load-failure-retry', status: 'pass', expected_fault: 'one 503 response for tasks.json', result: 'Visible error recovered through keyboard activation of Retry; three projects and the task board load.' });
    await context.close(); activePage = null;
  }

  // Check the intermediate layout independently of the desktop/narrow breakpoints.
  {
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, reducedMotion: 'reduce' });
    const page = await context.newPage(); activePage = page; watch(page, 'tablet-layout');
    await page.goto(base + '/IndiaGames/', { waitUntil: 'networkidle' }); await ready(page);
    await noOverflow(page, 'tablet overview');
    assert.ok(await page.locator('.project-image').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)));
    await revealImages(page);
    const shot = 'project-768-overview.jpg';
    await page.screenshot({ path: join(out, shot), type: 'jpeg', quality: 78, fullPage: true }); report.screenshots.push(shot);
    await page.locator('#board-link').click();
    await page.locator('#tasks').waitFor({ state: 'visible' });
    await noOverflow(page, 'tablet board');
    await openDetails(page);
    report.extra_scenarios.push({ id: 'tablet-layout', status: 'pass', viewport: { width: 768, height: 1024 }, result: 'Images loaded, overview and board have no horizontal overflow, keyboard detail works. Browser viewport only; no physical-device claim.' });
    await context.close(); activePage = null;
  }

  // Actual computed font sizes are doubled; this is not a physical device or browser zoom claim.
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage(); activePage = page; watch(page, 'enlarged-text');
    await page.goto(base + '/IndiaGames/', { waitUntil: 'networkidle' }); await ready(page);
    const fontChange = await page.evaluate(() => {
      const elements = [...document.body.querySelectorAll('*')].filter(node => !['SCRIPT', 'STYLE', 'SVG', 'PATH'].includes(node.tagName));
      const sizes = elements.map(node => [node, parseFloat(getComputedStyle(node).fontSize)]);
      for (const [node, size] of sizes) node.style.fontSize = size * 2 + 'px';
      const before = sizes.find(([node]) => node.id === 'page-title')[1];
      return { before, after: parseFloat(getComputedStyle(document.querySelector('#page-title')).fontSize), method: 'Doubled computed CSS font sizes at 390 CSS px; not browser zoom.' };
    });
    assert.equal(fontChange.after, fontChange.before * 2);
    await noOverflow(page, 'doubled text overview');
    await page.locator('#board-link').click();
    await page.locator('#tasks').waitFor({ state: 'visible' });
    await noOverflow(page, 'doubled text board');
    await openDetails(page);
    const shot = 'project-390-enlarged-text.jpg';
    await page.screenshot({ path: join(out, shot), type: 'jpeg', quality: 78, fullPage: true }); report.screenshots.push(shot);
    report.extra_scenarios.push({ id: 'enlarged-text', status: 'pass', ...fontChange, result: 'Overview and board reflow without horizontal overflow; keyboard task detail remains operable.' });
    await context.close(); activePage = null;
  }
}

try {
  report.checkout_before = { commit: git(['rev-parse', 'HEAD']), branch: git(['branch', '--show-current']), status: git(['status', '--porcelain=v1', '--untracked-files=all']) };
  await mkdir(out, { recursive: false }); created = true;
  report.input_sha256 = await hashes();
  const [tasks, manifest, presentation, releases] = await Promise.all(['data/tasks.json', 'data/source-manifest.json', 'data/hub-presentation.json', 'data/releases.json'].map(json));
  await verifyIdentity(tasks, manifest, presentation, releases);
  server = await makeServer();
  const base = 'http://127.0.0.1:' + server.address().port;
  const pw = await loadPlaywright();
  browser = await pw.chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  report.browser_version = browser.version();
  await checkJourney(base, tasks, manifest, presentation, releases);
  await verifyLinks(base);
  assert.deepEqual(await hashes(), report.input_sha256, 'Inputs changed while QA was running; rerun against one stable revision.');
  assert.deepEqual(report.errors, []);
  report.status = 'pass';
} catch (error) {
  report.status = 'fail'; report.failure = error.stack; process.exitCode = 1;
  if (activePage) try { await activePage.screenshot({ path: join(out, 'failure.png'), fullPage: true }); report.screenshots.push('failure.png'); } catch { /* Original error remains authoritative. */ }
} finally {
  if (browser) await browser.close();
  if (server) await new Promise(done => server.close(done));
  if (created) { report.completed_at = new Date().toISOString(); await writeFile(join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n'); }
  console.log(JSON.stringify({ status: report.status, groups: report.viewport_groups.filter(group => group.status === 'pass').length, static_checks: report.static_checks.length, output: out, failure: report.failure }));
}
