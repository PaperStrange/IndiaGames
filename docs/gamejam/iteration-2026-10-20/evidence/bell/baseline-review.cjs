const {chromium}=require('/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const trace=[],errors=[]; page.on('pageerror', e=>errors.push(e.message));
const txt=s=>page.locator(s).innerText();
async function rec(action){trace.push({action,run:await txt('#runLabel'),momentum:await txt('#momentum'),fracture:await page.locator('#fractureTrack').getAttribute('aria-label'),visits:await txt('#actionMetric'),anchors:await page.locator('.anchor.found').allTextContents()});}
async function pred(n){await page.locator('#predictionChoices button').nth(n).click();}
async function visit(n){await page.locator('.place').filter({hasText:n}).click();}
async function act(n,c,p){await pred(p);await visit(n);await page.locator('#choices button').nth(c).click();await page.locator('#continueBtn').click();await rec(n);}
await page.goto('http://127.0.0.1:8113/');await page.locator('#startBtn').click();
await act('Bell Square',0,0);
await visit('Bell Square');
assert.equal(await txt('#eventTitle'),'The flower auction');
trace.push({action:'Return to Bell Square at Noon after forecast reports masked crowd',title:await txt('#eventTitle'),text:await txt('#eventText'),journal:await txt('#journal')});
await page.screenshot({path:'/workspace/review-2026-10-20/bell-evidence/baseline-noon-forecast-scene.png',fullPage:true});
await page.locator('#closeEncounter').click();
await act('Flooded Archive',1,1);await act('Glassworks',1,0);
await page.screenshot({path:'/workspace/review-2026-10-20/bell-evidence/baseline-anchor-board.png',fullPage:true});
await page.locator('#bondOptions button').first().click();await page.locator('#objectOptions button').first().click();await page.locator('#wakeBtn').click();
await pred(0);await visit('Flooded Archive');
assert.equal(await txt('#eventTitle'),'The archive remembers your chalk');
assert.equal(await page.locator('#skipScene').isVisible(),true);
trace.push({action:'New loop-two scene still offers district-level skip',title:await txt('#eventTitle'),choices:await page.locator('#choices button').allTextContents(),carry:await txt('#carried')});
await page.screenshot({path:'/workspace/review-2026-10-20/bell-evidence/baseline-new-archive-skip.png',fullPage:true});
await page.locator('#skipScene').click();
await rec('Skip unseen loop-two Archive: 1 Momentum spent, no route acquired');
assert.equal(await page.locator('.anchor[data-anchor="route"]').evaluate(e=>e.classList.contains('found')),false);
await page.locator('#continueBtn').click();await rec('Skip consumed phase; correct forecast repaid 1 Momentum');
assert.deepEqual(errors,[]);
fs.writeFileSync('/workspace/review-2026-10-20/bell-evidence/baseline-review.json',JSON.stringify({result:'PASS',interaction:'Visible UI clicks; read-only DOM assertions; no state injection',trace,errors},null,2)+'\n');
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
