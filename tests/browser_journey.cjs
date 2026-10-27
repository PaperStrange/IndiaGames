/* Browser journey, no state injection. Serve the repository before running.
 * PLAYWRIGHT_MODULE=/path/to/playwright node tests/browser_journey.cjs
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.BELL_URL || 'http://127.0.0.1:8113/';
const evidence = path.resolve(process.env.BELL_EVIDENCE_DIR || path.join(__dirname, '.tmp/browser-journey'));
fs.mkdirSync(evidence,{recursive:true});
const trace = [];
const startedAt = new Date().toISOString();
(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROME_BIN || '/usr/bin/chromium',args:['--no-sandbox']});
  const page = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const text = selector => page.locator(selector).innerText();
  const click = selector => page.locator(selector).click();
  async function record(action) {
    trace.push({action,run:await text('#runLabel'),visits:await text('#actionMetric'),momentum:await text('#momentum'),fracture:await page.locator('#fractureTrack').getAttribute('aria-label')});
  }
  async function boot() {await page.goto(base); await click('#tryContrastBtn'); await click('#startBtn');}
  async function predict(n) {await page.locator('#predictionChoices button').nth(n).click();}
  async function visit(name) {await page.locator('.place').filter({hasText:name}).click();}
  async function choose(n) {await page.locator('#choices button').nth(n).click(); await click('#continueBtn');}
  async function finish() {await click('#batchContinue');}
  async function act(name,n,pred) {if(pred!==undefined)await predict(pred);await visit(name);await choose(n);await finish();await record(name+' choice '+n);}
  async function wake() {await page.locator('#bondOptions button').first().click();await page.locator('#objectOptions button').first().click();await click('#wakeBtn');}
  async function firstLoop() {
    assert.equal(await page.locator('#forecastMemory').isVisible(),false);
    await act('Bell Square',0,0); await act('Flooded Archive',0,1); await act('Glassworks',1,0); await wake();
  }
  await boot(); await firstLoop();
  assert.match(await text('#forecastMemory'),/Witnessed in loop 1: The masked crowd/);
  await page.screenshot({path:path.join(evidence,'06-after-earned-memory.png'),fullPage:true});
  await predict(0); await visit('Bell Square');
  assert.equal(await page.locator('#squareStatus').getAttribute('data-status'),'pending');
  assert.match(await text('#eventText'),/Mina/);
  assert.equal(await page.locator('[data-action="prepare-mina-route"]').isDisabled(),false);
  await click('#borrowMinute');
  assert.equal(await text('#momentum'),'3'); // Reservation is reversible, not a spend.
  await click('#originalMode'); await click('#startBtn');
  assert.equal(await page.locator('#forecastMemory').isVisible(),false);
  await click('#contrastMode'); await visit('Bell Square');
  assert.equal(await page.locator('#borrowMinute').getAttribute('aria-pressed'),'false');
  await click('#borrowMinute');
  await page.screenshot({path:path.join(evidence,'07-after-new-scene-borrow.png'),fullPage:true});
  await page.locator('#choices button').first().click();
  assert.equal(await page.locator('#originalMode').isDisabled(),true);
  assert.equal(await page.locator('#closeEncounter').isDisabled(),true);
  assert.equal(await page.locator('.place:enabled').count(),0);
  await click('#continueBtn');
  assert.match(await text('#batchList'),/forecast stays locked and unresolved/);
  assert.equal(await text('#momentum'),'2');
  await page.screenshot({path:path.join(evidence,'08-after-borrowed-result.png'),fullPage:true});
  await finish(); await record('Borrowed Bell Square visit: no phase advance or forecast reward');
  assert.match(await text('#runLabel'),/Loop 2 · Dawn/);
  assert.equal(await text('#actionMetric'),'4');
  assert.equal(await page.locator('#predictionChoices button:enabled').count(),0);
  await visit('Bell Square'); assert.equal(await page.locator('#borrowMinute').isDisabled(),true); await click('#closeEncounter');
  await act("Saint Orra's Hospice",0); // Resolves the still-locked Dawn prediction exactly once.
  assert.equal(await text('#momentum'),'3'); assert.match(await text('#runLabel'),/Noon/);
  await act('Glassworks',0,1); await act('Flooded Archive',1,0);
  assert.equal(await text('#actionMetric'),'7'); assert.match(await text('#runLabel'),/Midnight/);
  await wake(); await predict(0); await visit('Underbell'); await choose(0); await finish();
  assert.equal(await page.locator('#winModal').isVisible(),true);
  await page.screenshot({path:path.join(evidence,'09-after-completed-arc.png'),fullPage:true});
  await click('#restartBtn'); assert.equal(await text('#momentum'),'0');
  assert.equal(await page.locator('#forecastMemory').isVisible(),false);
  await record('Restart clears earned memory and Momentum');
  // A second route checks that borrowed time cannot cancel catastrophe.
  await firstLoop(); await act("Saint Orra's Hospice",0,0); await act('North Gate',1,1);
  await predict(0); await visit('Bell Square'); await click('#borrowMinute'); await choose(1);
  assert.doesNotMatch(await text('#batchList'),/A minute borrowed/);
  await finish(); assert.match(await text('#runLabel'),/Midnight/);
  assert.equal(await page.locator('#resetModal').isVisible(),true);
  await record('Risky borrowed visit at Fracture 2 still forces midnight at 4');
  // Touch-sized layout: actual fresh play through a return and borrowed action.
  await page.setViewportSize({width:390,height:844}); await boot(); await firstLoop();
  await predict(0); await visit('Bell Square'); await click('#borrowMinute');
  await page.screenshot({path:path.join(evidence,'10-after-mobile-borrow.png'),fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.ok((await page.locator('#borrowMinute').boundingBox()).height>=44);
  await choose(0);await finish();assert.match(await text('#runLabel'),/Loop 2 · Dawn/);
  await record('390px viewport: played borrowed return with no horizontal overflow');
  const embed=await browser.newPage({viewport:{width:1000,height:700},reducedMotion:'reduce'});
  await embed.setContent('<iframe title="Game embed" style="width:821px;height:462px;border:0" src="'+base+'"></iframe>');
  const embedded=embed.frameLocator('iframe');
  await embedded.locator('#startBtn').click();await embedded.locator('#contrastMode').click();await embedded.locator('#startBtn').click();
  await embedded.locator('.place').filter({hasText:'Glassworks'}).click();
  await embedded.locator('#choices button').nth(1).click();await embedded.locator('#continueBtn').click();await embedded.locator('#batchContinue').click();
  assert.equal(await embedded.locator('html').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  assert.match(await embedded.locator('#runLabel').innerText(),/Noon/);
  await embed.screenshot({path:path.join(evidence,'11-after-821x462-embed.png')});
  trace.push({action:'821×462 iframe: start, choose, resolve, advance with no horizontal overflow'});
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(evidence,'after-action-trace.json'),JSON.stringify({startedAt,finishedAt:new Date().toISOString(),base,interaction:'Visible browser controls only; no state injection',trace,pageErrors:errors},null,2)+'\n');
  console.log(JSON.stringify({result:'PASS',journeySteps:trace.length,checks:'earned memory, scene context, reversible reservation, mode isolation, no duplicate forecast reward, fourth visit, win, restart, catastrophe, 390px layout, 821x462 iframe',pageErrors:errors},null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
