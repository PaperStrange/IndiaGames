/* Visible-control regression for the Mina route experiment. No game-state injection.
 * PLAYWRIGHT_MODULE=/path/to/playwright node tests/square-journey.cjs
 * Starts and stops its own local HTTP server unless BELL_URL is supplied.
 * BELL_EVIDENCE_DIR overrides the ignored tests/.tmp/square-journey output folder.
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const evidence = path.resolve(process.env.BELL_EVIDENCE_DIR || path.join(__dirname, '.tmp/square-journey'));
const prep = '[data-action="prepare-mina-route"]';
const referenceScenario = 'immutable comparison retains Original and previous Contrast';
const legacyFontURL = 'https://fonts.googleapis.com/css2?family=Marcellus&family=Public+Sans:wght@400;500;600;700&display=swap';
const report = {
  startedAt: new Date().toISOString(),
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim(),
  sourceIdentityNote: 'HEAD identifies ancestry; sourceFiles and artifacts identify the exact tested bytes, including any uncommitted implementation.',
  interaction: 'Visible controls; repeated DOM button activation only for race regression. No game-state injection.',
  limitations: 'Automated Chromium; mobile and iframe dimensions are emulated. No human participants, physical device, screen-reader or fun assessment.',
  scenarios: [], notRunScenarios: [], pageErrors: [], consoleErrors: [], failedRequests: []
};
const sourceFiles = ['index.html', 'css/main.css', 'js/data.js', 'js/echo-time.js', 'js/square-event.js', 'js/engine.js', 'build.mjs'];
function inventory() {
  return sourceFiles.map(file => ({file, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex')}));
}
function artifacts() {
  return ['dist/thirteenth-bell-playable-demo.html', 'docs/gamejam/milestone-2026-10-27/reference/index.html'].map(file => {
    const body = fs.readFileSync(path.join(root, file));
    return {file, bytes: body.length, sha256: crypto.createHash('sha256').update(body).digest('hex')};
  });
}
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      if (req.url === '/favicon.ico') { res.writeHead(204); res.end(); return; }
      const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const target = path.resolve(root, '.' + (name.endsWith('/') ? name + 'index.html' : name));
      if (!target.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
      fs.readFile(target, (error, body) => {
        if (error) { res.writeHead(404); res.end(); return; }
        const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp'};
        res.writeHead(200, {'Content-Type': types[path.extname(target)] || 'application/octet-stream'}); res.end(body);
      });
    });
    server.listen(0, '127.0.0.1', () => resolve({server, base: 'http://127.0.0.1:' + server.address().port + '/'}));
  });
}
let browser, ownedServer, page, base;
let trace;
const text = selector => page.locator(selector).innerText();
const click = selector => page.locator(selector).click();
async function observe(label) {
  trace.push({label, phase: await text('#runLabel'), actions: await text('#actionMetric'), momentum: await text('#momentum'),
    fracture: await page.locator('#fractureTrack').getAttribute('aria-label'),
    square: await text('#squareStatus'), clue: await text('#squareClue')});
}
async function boot(url = base) { await page.goto(url); await click('#tryContrastBtn'); await click('#startBtn'); }
async function predict(index) { if (index !== undefined) await page.locator('#predictionChoices button').nth(index).click(); }
async function visit(name) { await page.locator('.place').filter({hasText: name}).click(); }
async function choose(index) { await page.locator('#choices button').nth(index).click(); await click('#continueBtn'); }
async function finish() { await click('#batchContinue'); }
async function act(name, index, prediction) { await predict(prediction); await visit(name); await choose(index); await finish(); }
async function wake() {
  assert.equal(await page.locator('#resetModal').isVisible(), true);
  await page.locator('#bondOptions button').first().click();
  await page.locator('#objectOptions button').first().click();
  await click('#wakeBtn');
}
async function firstLoop(withPredictions = true, witness = true) {
  await act(witness ? 'Bell Square' : 'North Gate', 0, withPredictions ? 0 : undefined);
  await act('Flooded Archive', 0, withPredictions ? 1 : undefined);
  await act('Glassworks', 1, withPredictions ? 0 : undefined);
  await wake();
}
async function status(expected) { assert.equal(await page.locator('#squareStatus').getAttribute('data-status'), expected); }
async function known(expected) { assert.equal(await page.locator('#squareClue').getAttribute('data-known'), String(expected)); }
async function photo(name) { await page.screenshot({path: path.join(evidence, name + '.png'), fullPage: true}); }
async function repeatActivation(selector) {
  assert.equal(await page.locator(selector).isVisible(), true);
  // Replaying a real control activation is deliberately stronger than a timed double click.
  // It cannot edit closure-owned game state, DOM flags or production functions.
  await page.locator(selector).evaluate(button => { button.click(); button.click(); });
}
async function keyActivate(selector) {
  assert.equal(await page.locator(selector).isVisible(), true, selector + ' must be visible');
  assert.equal(await page.locator(selector).isEnabled(), true, selector + ' must be enabled');
  let tabs = 0;
  while (!await page.locator(selector).evaluate(button => button === document.activeElement)) {
    assert.ok(tabs < 100, selector + ' must be reachable through Tab without programmatic focus');
    await page.keyboard.press('Tab'); tabs++;
  }
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => {
    const focused = document.activeElement;
    return focused !== document.body && focused !== document.documentElement && focused.getClientRects().length > 0 &&
      getComputedStyle(focused).visibility !== 'hidden';
  }, null, {timeout:2000});
  trace.push({keyboardActivation: selector, tabs, focusAfter: await page.evaluate(() => ({
    tag: document.activeElement.tagName, id: document.activeElement.id,
    action: document.activeElement.dataset.action || null
  }))});
}
async function keyAct(place, choice, forecast) {
  if (forecast !== undefined) await keyActivate('#predictionChoices button:nth-child(' + (forecast + 1) + ')');
  await keyActivate('.place[data-place="' + place + '"]');
  await keyActivate('#choices button:nth-child(' + (choice + 1) + ')');
  await keyActivate('#continueBtn'); await keyActivate('#batchContinue');
}
async function run(name, fn, options = {}) {
  if (process.env.BELL_SCENARIO && !name.includes(process.env.BELL_SCENARIO)) { report.notRunScenarios.push(name); return; }
  const result = {name, startedAt: new Date().toISOString(), trace: []};
  trace = result.trace;
  const context = await browser.newContext({viewport:{width:1440, height:1000}, reducedMotion:'reduce', ...options});
  page = await context.newPage();
  page.setDefaultTimeout(8000);
  page.on('pageerror', error => report.pageErrors.push({scenario: name, message: error.message}));
  page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push({scenario: name, message: message.text(), location: message.location()}); });
  page.on('requestfailed', request => report.failedRequests.push({scenario: name, url: request.url(), error: request.failure()?.errorText}));
  try { await fn(); result.status = 'PASS'; }
  catch (error) {
    result.status = 'FAIL'; result.error = error.stack;
    result.layout = await page.evaluate(() => ({viewport:innerWidth, documentWidth:document.documentElement.scrollWidth,
      overflow:[...document.querySelectorAll('body *')].map(element => {
        const rect=element.getBoundingClientRect();
        return {tag:element.tagName,id:element.id,classes:typeof element.className==='string'?element.className:'',
          text:element.innerText?.slice(0,90),left:rect.left,right:rect.right,width:rect.width,
          clientWidth:element.clientWidth,scrollWidth:element.scrollWidth};
      }).filter(item=>item.width>0&&item.right>innerWidth+.5).sort((a,b)=>b.right-a.right).slice(0,25),
      internalOverflow:[...document.querySelectorAll('body *')].filter(element=>element.getBoundingClientRect().width>0&&element.scrollWidth>element.clientWidth+1).map(element=>({
        tag:element.tagName,id:element.id,classes:typeof element.className==='string'?element.className:'',
        text:element.innerText?.slice(0,100),clientWidth:element.clientWidth,scrollWidth:element.scrollWidth,
        overflowX:getComputedStyle(element).overflowX
      })).sort((a,b)=>(b.scrollWidth-b.clientWidth)-(a.scrollWidth-a.clientWidth)).slice(0,25)
    })).catch(()=>null);
    await photo('failure-' + name.replace(/[^a-z0-9]+/gi, '-')).catch(() => {});
  } finally { result.finishedAt = new Date().toISOString(); report.scenarios.push(result); await context.close(); }
  console.log(result.status + ' ' + name + (result.error ? '\n' + result.error : ''));
}
(async () => {
  fs.mkdirSync(evidence, {recursive:true});
  report.sourceFiles = inventory();
  report.artifacts = artifacts();
  if (process.env.BELL_URL) base = process.env.BELL_URL;
  else { const local = await serve(); ownedServer = local.server; base = local.base; }
  report.base = base;
  browser = await chromium.launch({executablePath:process.env.CHROME_BIN || '/usr/bin/chromium', args:['--no-sandbox']});

  await run(referenceScenario, async () => {
    await page.goto(new URL('docs/gamejam/milestone-2026-10-27/reference/index.html', base).href);
    await click('#startBtn');
    assert.match(await text('#runLabel'), /Original · Loop 1 · Dawn/);
    await visit('Bell Square');
    assert.equal(await text('#eventTitle'), 'The flower auction');
    assert.equal(await page.locator(prep).count(), 0);
    await click('#contrastMode'); await click('#startBtn'); await firstLoop();
    await visit('Bell Square'); assert.equal(await text('#eventTitle'), 'The breakfast masquerade');
    assert.equal(await page.locator(prep).count(), 0);
    assert.equal(await page.locator('#squareStatus').count(), 0);
    trace.push({label:'Frozen comparison retains its old loop-driven Square scene and both modes', phase:await text('#runLabel')});
    await photo('immutable-previous-contrast');
  });

  await run('cancel and late arrival never manufacture eyewitness knowledge', async () => {
    await boot(); await visit('Bell Square'); await known(false);
    assert.equal(await page.locator(prep).isDisabled(), true);
    assert.doesNotMatch(await text(prep), /side passage/i, 'The unearned action must not reveal the intervention solution');
    await click('#closeEncounter');
    assert.equal(await text('#actionMetric'), '0'); assert.match(await text('#runLabel'), /Dawn/); await status('pending');
    await act('Flooded Archive', 0, 0); await status('blocked'); await known(false);
    assert.match(await text('#squareStatus'), /auction stalls/i);
    await visit('Bell Square'); await known(false); assert.equal(await page.locator(prep).isDisabled(), true);
    await choose(0); await finish(); await known(false);
    await act('Glassworks', 1); await wake();
    assert.match(await text('#forecastMemory'), /Reported in loop 1/);
    await visit('Bell Square'); assert.equal(await page.locator(prep).isDisabled(), true);
    await observe('A cancelled Dawn visit and an actual Noon visit do not grant the missing witnessed clue');
  });

  for (const [label, forecast, expectedMomentum] of [['correct',0,1], ['wrong',1,0], ['blank',undefined,0]]) {
    await run(label + ' forecast does not gate witnessing or ordinary preparation', async () => {
      await boot(); await act('Bell Square', 0, forecast);
      await status('blocked'); await known(true); assert.equal(await text('#momentum'), String(expectedMomentum));
      assert.match(await text('#squareClue'), /loop 1/i); assert.match(await text('#squareClue'), /Dawn|Noon/);
      if (label === 'correct') {
        await photo('witnessed-blockage-before');
        await page.locator('#squareStatus').screenshot({path:path.join(evidence,'witnessed-blockage-before-outcome.png')});
      }
      await act('Flooded Archive', 0); await act('Glassworks', 1); await wake();
      await visit('Bell Square'); assert.equal(await page.locator(prep).isDisabled(), false);
      assert.match(await text(prep), /side passage/i);
      if (!expectedMomentum) assert.equal(await page.locator('#borrowMinute').isDisabled(), true);
      await click(prep); await click('#continueBtn'); await finish();
      await status('safe'); await known(true); assert.match(await text('#runLabel'), /Loop 2 · Noon/);
      assert.equal(await page.locator('#fractureTrack').getAttribute('aria-label'), 'Fracture 1 of 4');
      assert.equal(await text('#actionMetric'), '4');
      assert.match(await text('#squareStatus'), /sheltered market well/i);
      await observe('Ordinary preparation succeeds without requiring a forecast reward or borrowed time');
      if (label === 'blank') await photo('ordinary-preparation-no-momentum');
    });
  }

  await run('borrowed preparation is atomic and preserves an expedition action', async () => {
    await boot(); await firstLoop(); assert.equal(await text('#momentum'), '3');
    await predict(0); await visit('Bell Square'); await click('#borrowMinute');
    assert.equal(await text('#momentum'), '3'); await click('#closeEncounter');
    await visit('Bell Square'); assert.equal(await page.locator('#borrowMinute').getAttribute('aria-pressed'), 'false');
    await click('#borrowMinute'); await repeatActivation(prep);
    assert.equal(await text('#momentum'), '2'); assert.equal(await text('#actionMetric'), '4');
    assert.equal(await page.locator('#fractureTrack').getAttribute('aria-label'), 'Fracture 1 of 4');
    assert.equal(await page.locator('#originalMode').isDisabled(), true);
    assert.equal(await page.locator('#closeEncounter').isDisabled(), true);
    await repeatActivation('#continueBtn');
    assert.match(await text('#batchList'), /forecast stays locked and unresolved/);
    assert.equal(await text('#momentum'), '2'); await status('pending');
    await repeatActivation('#batchContinue'); assert.match(await text('#runLabel'), /Loop 2 · Dawn/);
    assert.equal(await page.locator('#predictionChoices button:enabled').count(), 0);
    await visit('Bell Square'); assert.equal(await page.locator('#borrowMinute').isDisabled(), true);
    assert.equal(await page.locator(prep).isDisabled(), true); await click('#closeEncounter');
    await act('Flooded Archive', 1); await status('safe');
    assert.equal(await text('#momentum'), '3'); assert.equal(await text('#actionMetric'), '5');
    assert.match(await text('#runLabel'), /Loop 2 · Noon/);
    const ledger = await page.locator('#scheduleGrid .schedule-cell').allTextContents();
    assert.match(ledger[7], /Sheltered well/); assert.match(ledger[8], /Sheltered well/);
    await visit('Bell Square'); assert.match(await text('#eventText'), /sheltered market well/i);
    assert.doesNotMatch(await text('#eventTitle'), /Only the change remains/);
    await observe('The saved minute permits an Archive action before Noon; only the actual boundary rewards the locked forecast');
    await photo('borrowed-route-visible-outcome');
  });

  await run('Fracture four before Noon interrupts the event and its forecast', async () => {
    await boot(); await firstLoop(true, false); await known(false); assert.equal(await text('#momentum'), '3');
    await predict(0); await visit('Glassworks'); await click('#borrowMinute'); await choose(1); await finish();
    assert.match(await text('#runLabel'), /Loop 2 · Dawn/);
    assert.equal(await page.locator('#fractureTrack').getAttribute('aria-label'), 'Fracture 2 of 4');
    await visit('Bell Square'); await choose(1);
    await status('interrupted'); await known(false); assert.equal(await text('#momentum'), '2');
    assert.doesNotMatch(await text('#batchList'), /Foresight fulfilled/);
    await finish(); assert.match(await text('#runLabel'), /Midnight/);
    await observe('A correct declaration earns nothing when catastrophe skips the scheduled event');
    await photo('interrupted-before-noon');
  });

  await run('catastrophe after Noon preserves the already observed outcome', async () => {
    await boot(); await act('Bell Square', 0, 0); await act('Flooded Archive', 0, 1);
    await predict(0); await visit('Glassworks'); await choose(0);
    await status('blocked'); await known(true); assert.equal(await text('#momentum'), '2');
    await finish(); assert.match(await text('#runLabel'), /Midnight/);
    await observe('Later catastrophe does not erase the observed blocked alley or mint a skipped Dusk reward');
  });

  await run('missed intervention is legible and daily state resets while knowledge remains', async () => {
    await boot(); await firstLoop(); await act('North Gate', 0, 0); await status('blocked');
    await visit('Bell Square'); assert.equal(await page.locator(prep).isDisabled(), true);
    assert.match(await text('#squareActionHint'), /Noon|late|passed/i); await click('#closeEncounter');
    await act('Glassworks', 0); await act('Flooded Archive', 1); await wake();
    await status('pending'); await known(true); assert.match(await text('#squareClue'), /loop 1/i);
    await visit('Bell Square'); assert.equal(await page.locator(prep).isDisabled(), false);
    await observe('Missing the window costs this day, while the original sourced clue still permits a later attempt');
  });

  await run('mode isolation and reload clear only their intended run state', async () => {
    await boot(); await firstLoop(); await visit('Bell Square'); await click('#borrowMinute');
    await click('#originalMode'); await click('#startBtn');
    assert.equal(await page.locator('#squareStatus').isVisible(), false);
    assert.equal(await page.locator('#squareClue').isVisible(), false);
    await click('#contrastMode'); await known(true); await status('pending');
    assert.equal(await text('#momentum'), '3');
    await visit('Bell Square'); assert.equal(await page.locator('#borrowMinute').getAttribute('aria-pressed'), 'false');
    await boot(); await known(false); await status('pending'); assert.equal(await text('#momentum'), '0');
    assert.equal(await text('#actionMetric'), '0');
    await observe('Original has no candidate clue; returning to Contrast preserves its run; reload starts fresh');
  });

  await run('Mina intervention retains the complete ending and restart', async () => {
    await boot(); await firstLoop(); await predict(0); await visit('Bell Square');
    await click('#borrowMinute'); await click(prep); await click('#continueBtn'); await finish();
    await act("Saint Orra's Hospice", 0); await status('safe');
    await act('Glassworks', 0, 1); await act('Flooded Archive', 1, 0); await wake();
    assert.equal(await page.locator('.anchor.found').count(), 3);
    await predict(0); await visit('Underbell'); await choose(0); await finish();
    assert.equal(await page.locator('#winModal').isVisible(), true);
    await photo('mina-route-complete-ending');
    await click('#restartBtn'); await known(false); await status('pending');
    assert.equal(await text('#momentum'), '0'); assert.equal(await text('#actionMetric'), '0');
    await observe('All three anchors still release the day; restart clears clue, preparation and resources');
  });

  await run('complete keyboard journey witnesses remembers prepares and sees the outcome', async () => {
    await page.goto(base); await keyActivate('#tryContrastBtn'); await keyActivate('#startBtn');
    await keyAct('bell-square', 0, 0); await known(true); await status('blocked');
    await keyAct('flooded-archive', 0, 1); await keyAct('glassworks', 1, 0);
    await keyActivate('#bondOptions button:first-child'); await keyActivate('#objectOptions button:first-child');
    await keyActivate('#wakeBtn'); await known(true); await status('pending');
    await keyActivate('#predictionChoices button:first-child'); await keyActivate('.place[data-place="bell-square-1"]');
    await keyActivate('#borrowMinute'); await keyActivate(prep);
    await keyActivate('#continueBtn'); await keyActivate('#batchContinue');
    assert.match(await text('#runLabel'), /Loop 2 · Dawn/);
    await keyAct('north-gate-1', 0); await status('safe');
    await observe('Entire witness→midnight→borrowed preparation→extra visit→outcome path uses Tab and Enter only; not a screen-reader audit');
    await photo('mina-route-keyboard-complete');
  });

  await run('390px touch emulation exposes the same causal outcome', async () => {
    await boot(); await firstLoop(); await predict(0); await visit('Bell Square');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.ok((await page.locator(prep).boundingBox()).height >= 44);
    await page.locator('#borrowMinute').tap(); await page.locator(prep).tap();
    await page.locator('#continueBtn').tap(); await page.locator('#batchContinue').tap();
    await act('North Gate', 0); await status('safe');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await observe('Tap-activated preparation and the visible outcome fit an emulated phone viewport');
    await photo('mina-route-390-touch-emulation');
  }, {viewport:{width:390,height:844}, isMobile:true, hasTouch:true});

  await run('200 percent text enlargement reflows at a 390px viewport', async () => {
    await boot(); await firstLoop(false); await visit('Bell Square');
    await click(prep); await click('#continueBtn'); await finish(); await visit('Bell Square');
    // Model a text-enlargement user stylesheet without changing layout widths.
    // Snapshot computed sizes first so inheritance cannot multiply the scale.
    // This is a CSS accessibility stress test, not a physical browser zoom result.
    await page.evaluate(() => {
      const sizes = [...document.querySelectorAll('body, body *')].map(element => [element, parseFloat(getComputedStyle(element).fontSize)]);
      sizes.forEach(([element, size]) => { if (Number.isFinite(size)) element.style.fontSize = size * 2 + 'px'; });
    });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator('#squareStatus').evaluate(element => element.scrollWidth <= element.clientWidth), true);
    assert.equal(await page.locator('#eventModal').evaluate(element => element.scrollWidth <= element.clientWidth), true);
    // The current-place YOU badge deliberately protrudes 7px. Check the names,
    // not their decorative badge's contribution to the button scroll bounds.
    assert.deepEqual(await page.locator('.place b').evaluateAll(labels => labels.filter(label => label.scrollWidth > label.clientWidth + 1).map(label => label.textContent)), []);
    assert.ok((await page.locator(prep).boundingBox()).height >= 44);
    await observe('Every computed text size doubled without enlarging layout widths; outcome and scene remain within the narrow page');
    await photo('mina-route-390-text-200-percent');
    await page.locator('#squareStatus').screenshot({path:path.join(evidence,'mina-route-text-200-percent-outcome.png')});
  }, {viewport:{width:390,height:844}});

  await run('821x462 embedded candidate supports a full boundary', async () => {
    await page.setContent('<iframe title="Game" style="width:821px;height:462px;border:0" src="' + base + '"></iframe>');
    const frame = page.frameLocator('iframe');
    await frame.locator('#tryContrastBtn').click(); await frame.locator('#startBtn').click();
    await frame.locator('.place').filter({hasText:'Bell Square'}).click();
    await frame.locator('#choices button').first().click(); await frame.locator('#continueBtn').click();
    await frame.locator('#batchContinue').click();
    assert.equal(await frame.locator('#squareStatus').getAttribute('data-status'), 'blocked');
    assert.equal(await frame.locator('#squareClue').getAttribute('data-known'), 'true');
    assert.equal(await frame.locator('html').evaluate(element => element.scrollWidth <= element.clientWidth), true);
    await photo('mina-route-821x462-embed');
  });

  await run('portable single-file distribution carries the causal scene', async () => {
    await boot(new URL('dist/thirteenth-bell-playable-demo.html', base).href);
    await firstLoop(false); await visit('Bell Square'); await click(prep); await click('#continueBtn'); await finish();
    await status('safe'); await known(true);
    await observe('The generated portable HTML supports the same witnessed clue and ordinary intervention');
  });

  report.sourceFilesUnchangedDuringRun = JSON.stringify(report.sourceFiles) === JSON.stringify(inventory());
  report.artifactsUnchangedDuringRun = JSON.stringify(report.artifacts) === JSON.stringify(artifacts());
  report.finishedAt = new Date().toISOString();
  report.passed = report.scenarios.filter(item => item.status === 'PASS').length;
  report.failed = report.scenarios.filter(item => item.status === 'FAIL').length;
  // The historical reference must stay byte-identical. Its one known optional
  // Google Fonts import may fail here; it has explicit serif/sans-serif fallbacks.
  // Candidate resource failures and all other reference errors remain fatal.
  const optionalRequest = item => item.scenario === referenceScenario && item.url === legacyFontURL && item.error === 'net::ERR_CERT_AUTHORITY_INVALID';
  const optionalConsole = item => item.scenario === referenceScenario && item.location.url === legacyFontURL &&
    item.message === 'Failed to load resource: net::ERR_CERT_AUTHORITY_INVALID';
  report.optionalReferenceFontFailures = {
    requests: report.failedRequests.filter(optionalRequest), console: report.consoleErrors.filter(optionalConsole),
    limit: 'The frozen comparison rendered with fallback fonts; its requested web-font appearance was not verified.'
  };
  report.blockingConsoleErrors = report.consoleErrors.filter(item => !optionalConsole(item));
  report.blockingFailedRequests = report.failedRequests.filter(item => !optionalRequest(item));
  report.result = report.failed || report.pageErrors.length || report.blockingConsoleErrors.length || report.blockingFailedRequests.length ||
    !report.sourceFilesUnchangedDuringRun || !report.artifactsUnchangedDuringRun ? 'FAIL' : report.notRunScenarios.length ? 'PASS_SELECTED' : 'PASS';
  fs.writeFileSync(path.join(evidence, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({result: report.result, passed: report.passed, failed: report.failed, pageErrors: report.pageErrors, evidence}, null, 2));
  if (report.result === 'FAIL') process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (browser) await browser.close();
  if (ownedServer) await new Promise(resolve => ownedServer.close(resolve));
});
