const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const releaseRoot = process.env.GAMEJAM_RELEASE_ROOT || '/workspace/gamejam-release';
const baseUrl = process.env.GAMEJAM_BASE_URL || 'http://127.0.0.1:8120';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const results=[];
for(const game of ['memorable','vivid','bell']){
 const c=await b.newContext({viewport:{width:1280,height:900}}),p=await c.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto(`${baseUrl}/${game}/`,{waitUntil:'domcontentloaded'});
 if(game==='memorable'){
  await p.getByRole('button',{name:'Try a solo rehearsal'}).click();
  await p.getByRole('button',{name:'Let’s play',exact:true}).click();
  for(let i=0;i<2;i++) {await p.getByRole('button',{name:'I have the screen'}).click();await p.locator('.option').nth(i).click();await p.locator('.guess').nth(2-i).click();await p.getByRole('button',{name:'Seal my choices'}).click();}
  const before=await p.locator('body').innerText();assert(!before.includes('Ask the other person to look away'));
  await p.locator('#app button.primary').click();assert((await p.locator('body').innerText()).includes('TWO WAYS OF SEEING'));
  await p.getByRole('button',{name:'Make something with this'}).click();await p.getByRole('button',{name:'We made our moment'}).click();
  for(let i=0;i<2;i++){await p.getByRole('button',{name:'I have the screen'}).click();await p.locator('textarea').fill(`Synthetic package check ${i+1}`);await p.locator('#app button.primary').click();}
  const dl=p.waitForEvent('download');await p.getByRole('button',{name:'Save our keepsake'}).click();await (await dl).saveAs(`${releaseRoot}/package-test-keepsake.svg`);
  assert((await p.locator('body').innerText()).includes('Synthetic package check 2'));
 } else if(game==='vivid'){
  await p.locator('#start').click();await p.getByRole('button',{name:'Lean left',exact:false}).click();await p.locator('.clue-left').click();await p.getByRole('button',{name:'Lean right',exact:false}).click();await p.locator('.clue-right').click();await p.locator('[data-bearing="east"]').click();await p.locator('[data-rhythm="sls"]').click();await p.locator('#send-signal').click();await p.getByRole('button',{name:'Keep the letter',exact:false}).click();await p.reload();assert((await p.locator('body').innerText()).includes('You kept my letter between us.'));
 } else {
  await p.getByRole('button',{name:'Try GameJam / Contrast'}).click();await p.locator('#startBtn').click();assert((await p.locator('#runLabel').innerText()).includes('Contrast'));await p.locator('.p-square').click();await p.locator('#choices button').first().click();await p.locator('#continueBtn').click();await p.locator('#batchContinue').click();assert((await p.locator('#runLabel').innerText()).includes('Noon'));
 }
 assert.deepEqual(errors,[]);await p.screenshot({path:`${releaseRoot}/${game}-package-check.png`,fullPage:true});
 results.push({game,pass:true,checks:'Bundled runtime, real UI interaction and expected consequence; no page exceptions',errors});await c.close();
}
await b.close();fs.writeFileSync(`${releaseRoot}/package-validation.json`,JSON.stringify({at:new Date().toISOString(),results},null,2));console.log(JSON.stringify(results));
