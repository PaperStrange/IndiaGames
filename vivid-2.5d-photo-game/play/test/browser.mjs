// Run with PLAYWRIGHT_MODULE_PATH pointing to an existing Playwright package.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const base = process.env.GAME_URL || 'http://127.0.0.1:8112/';
await mkdir('evidence',{recursive:true});
const observations=[];const errors=[];
const context=await browser.newContext({viewport:{width:1365,height:950}});
await context.tracing.start({screenshots:true,snapshots:true,sources:true});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const record=async(label)=>observations.push({action:label,url:page.url(),screen:await page.locator('body').innerText()});
const discover=async()=>{
  await page.locator('[data-view="-1"]').click();await page.locator('[data-clue="ledger"]').click();
  await page.locator('[data-view="1"]').click();await page.locator('[data-clue="plate"]').click();
};
const solve=async()=>{await page.locator('[data-bearing="east"]').click();await page.locator('[data-rhythm="sls"]').click();await page.locator('#send-signal').click();};
await page.goto(base);await page.screenshot({path:'evidence/desktop-intro.png',fullPage:true});await record('First arrival: intro and supported inputs');
await page.locator('#start').click();await solve();assert.match(await page.locator('#feedback').innerText(),/both harbour marks/);await record('Guess cannot bypass evidence');
await page.locator('[data-view="-1"]').click();await page.locator('[data-clue="ledger"]').click();await page.screenshot({path:'evidence/desktop-left.png',fullPage:true});
await page.locator('[data-view="1"]').click();await page.locator('[data-clue="plate"]').click();await page.screenshot({path:'evidence/desktop-evidence.png',fullPage:true});
assert.equal(await page.locator('#clue-count').innerText(),'2 / 2');
assert.equal(await page.locator('#feedback').innerText(),'');
await page.locator('[data-bearing="west"]').click();await page.locator('#send-signal').click();assert.match(await page.locator('#feedback').innerText(),/No answer/);await record('Wrong signal: try again without losing clues');
await solve();assert.equal(await page.locator('[data-memory]').count(),2);await record('Ferry answers; keeper offers permission');
await page.locator('[data-memory="private"]').click();await page.screenshot({path:'evidence/desktop-ending.png',fullPage:true});
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('keepers-frame:v1')).choice),'private');await record('Private promise saved');
await page.reload();assert.match(await page.locator('#story').innerText(),/You kept my letter between us/);await page.screenshot({path:'evidence/desktop-return.png',fullPage:true});await record('Reload recognizes concrete promise');
await page.locator('#start').click();await page.locator('[data-view="1"]').click();assert.match(await page.locator('#letter').innerText(),/she offers/);await page.locator('#letter').click();assert.match(await page.locator('#story').innerText(),/I was frightened every night/);assert.doesNotMatch(await page.locator('#story').innerText(),/could have asked/);await record('Returning guest receives letter by permission');
await discover();await solve();await page.locator('[data-memory="archive"]').click();await page.locator('#return').click();assert.match(await page.locator('#story').innerText(),/They came back to thank me/);await record('Second ending changes recognition');
await page.locator('#forget').click();assert.equal(await page.locator('#forget').innerText(),'Confirm: forget our visits');await page.locator('#forget').click();assert.equal(await page.evaluate(()=>localStorage.getItem('keepers-frame:v1')),null);
await page.locator('#start').click();await discover();await page.locator('#letter').click();assert.match(await page.locator('#story').innerText(),/could have asked/);await solve();await page.locator('[data-memory="private"]').click();await page.reload();assert.match(await page.locator('#story').innerText(),/You looked before I said yes/);await record('Premature letter opening persists honestly');
await context.tracing.stop({path:'evidence/desktop-trace.zip'});await context.close();
// Keyboard-only navigation on a fresh page, with OS reduced motion enabled.
const keyboardContext=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});
const kb=await keyboardContext.newPage();await kb.goto(base);assert.equal(await kb.locator('#motion').innerText(),'Motion: off');
const tabTo=async(selector)=>{for(let i=0;i<40;i++){if(await kb.locator(selector).evaluate(el=>el===document.activeElement))return;await kb.keyboard.press('Tab');}throw new Error('Keyboard focus did not reach '+selector);};
await tabTo('#start');await kb.keyboard.press('Enter');await kb.keyboard.press('ArrowLeft');await kb.keyboard.press('Enter');await kb.keyboard.press('ArrowRight');await kb.keyboard.press('ArrowRight');await kb.keyboard.press('Enter');assert.equal(await kb.locator('#clue-count').innerText(),'2 / 2');
await tabTo('[data-bearing="east"]');await kb.keyboard.press('Enter');await tabTo('[data-rhythm="sls"]');await kb.keyboard.press('Enter');await tabTo('#send-signal');await kb.keyboard.press('Enter');await kb.keyboard.press('Enter');assert.equal(await kb.locator('.ending-title').innerText(),'A promise between frames');
await kb.screenshot({path:'evidence/keyboard-reduced-motion.png',fullPage:true});observations.push({action:'Keyboard only: Tab, Enter and arrows complete encounter with reduced motion'});await keyboardContext.close();
// Touch viewport: no hover required, portrait controls and both outcomes remain reachable.
const mobileContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});const mobile=await mobileContext.newPage();await mobile.goto(base);await mobile.screenshot({path:'evidence/mobile-intro.png',fullPage:true});
await mobile.locator('#start').tap();await mobile.locator('[data-view="-1"]').tap();await mobile.locator('[data-clue="ledger"]').tap();await mobile.locator('[data-view="1"]').tap();await mobile.locator('[data-clue="plate"]').tap();await mobile.screenshot({path:'evidence/mobile-evidence.png',fullPage:true});await mobile.locator('[data-bearing="east"]').tap();await mobile.locator('[data-rhythm="sls"]').tap();await mobile.locator('#send-signal').tap();await mobile.locator('[data-memory="archive"]').tap();await mobile.screenshot({path:'evidence/mobile-ending.png',fullPage:true});assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);observations.push({action:'390×844 emulated touch: full completion, no horizontal overflow'});await mobileContext.close();
const small=await browser.newPage({viewport:{width:821,height:462}});await small.goto(base);await small.locator('#start').click();await small.locator('[data-view="-1"]').click();await small.locator('[data-clue="ledger"]').click();assert.equal(await small.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await small.screenshot({path:'evidence/compact-821x462.png',fullPage:true});observations.push({action:'821×462 browser/embed viewport: scrollable, no horizontal overflow; first clue usable'});await small.close();
// A browser refusing storage must remain playable and explain memory scope.
const blocked=await browser.newPage();await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}})});await blocked.goto(base);assert.match(await blocked.locator('#storage-status').innerText(),/storage is unavailable/);await blocked.locator('#start').click();assert.equal(await blocked.locator('#send-signal').isVisible(),true);observations.push({action:'Blocked browser storage: safe startup and explicit temporary-memory notice'});await blocked.close();
assert.deepEqual(errors,[]);await browser.close();await writeFile('evidence/browser-observations.json',JSON.stringify({date:'2026-10-05',browser:'Chromium headless, /usr/bin/chromium',automated:true,notHumanEvidence:true,errors,observations},null,2));console.log(JSON.stringify({passed:true,observations:observations.length,errors},null,2));
