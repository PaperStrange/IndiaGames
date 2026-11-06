// Exact-build automated journeys. Physical devices and fluent review are separate.
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { chromium, firefox, webkit } from 'playwright';
import { LOCALES } from '../src/i18n/core.js';
import { createUiTranslator } from '../src/i18n/ui.js';

const build=path.resolve(process.env.VIVID_BUILD || 'dist');
const output=path.resolve(process.env.VIVID_QA_ROOT || '/tmp/vivid-locale-qa');
fs.mkdirSync(output,{recursive:true});
const inventory=dir=>Object.fromEntries(fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(entry=>entry.isDirectory()?Object.entries(inventory(path.join(dir,entry.name))).map(([p,h])=>[`${entry.name}/${p}`,h]):[[entry.name,createHash('sha256').update(fs.readFileSync(path.join(dir,entry.name))).digest('hex')]]));
const report={startedAt:new Date().toISOString(),scope:'Automated browser-engine checks with emulated viewports/input. No fluent-language approval, physical-device result or human study evidence.',build,inventory:inventory(build),cases:[],failures:[]};
const server=http.createServer((request,response)=>{
  const raw=decodeURIComponent(new URL(request.url,'http://local').pathname).replace(/^\/nested\//,'/');
  const file=path.resolve(build,'.'+(raw==='/'?'/index.html':raw));
  if(!file.startsWith(build+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){response.writeHead(404).end();return;}
  response.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.glb':'model/gltf-binary'})[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  response.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const engines={chromium,firefox,webkit};
const selected=(process.env.VIVID_BROWSERS || 'chromium').split(',');
let browser;

async function checkCase(id,fn){
  const record={id};report.cases.push(record);
  try{await fn(record);record.status='passed';console.log(`PASS ${id}`);}
  catch(error){record.status='failed';record.error=error.stack;report.failures.push(id);console.error(`FAIL ${id}: ${error.message}`);}
  fs.writeFileSync(path.join(output,'browser-report.json'),JSON.stringify(report,null,2)+'\n');
}
function actions(page,mode){
  const use=async selector=>{
    const el=page.locator(selector);await el.waitFor({state:'visible'});
    if(mode==='keyboard'){await el.focus();await page.keyboard.press('Enter');}
    else if(mode==='touch')await el.tap();
    else await el.click();
    if(selector.startsWith('[data-story=')) await page.locator('#experience').waitFor({state:'visible'});
  };
  return {use,press:id=>use(`[data-action="${id}"]`),place:async id=>{await use(`[data-action="${id}"]`);await use(`[data-destination="${id}"]`);}};
}
const checkpoint=(page,story,profile='remembered')=>page.evaluate(([story,profile])=>JSON.parse(localStorage.getItem(`vivid:save:${story}:${profile}`))?.state,[story,profile]);
async function layout(page,required=[]){
  const measured=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('#actions button,#actions input')].filter(el=>el.getClientRects().length).map(el=>({id:el.dataset.action||el.dataset.destination,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))}));
  assert.ok(measured.document<=measured.viewport+1,`Horizontal overflow ${JSON.stringify(measured)}`);
  for(const id of required) assert.ok(measured.buttons.some(button=>button.id===id),`Expected active control ${id}: ${JSON.stringify(measured)}`);
  if(required.length) assert.ok(measured.buttons.length>0,'Active target measurements must not be empty');
  assert.ok(measured.buttons.every(button=>button.height>=43.9&&button.width>=43.9),`Action target smaller than44×44px ${JSON.stringify(measured)}`);
  return measured;
}
async function iona(page,controls,{choice='private',profile='remembered',storage=true}={}){
  const activeLayouts=[];
  await controls.press('start');
  await controls.press('signal'); // no evidence, no success
  await controls.press('view--1');await controls.press('ledger');
  await controls.press('view-1');await controls.press('plate');
  await controls.press('letter'); // unauthorized read does not create permission
  await controls.press('bearing-east');await controls.press('rhythm-lsl');await controls.press('signal');
  if(storage)assert.equal((await checkpoint(page,'iona',profile)).phase,'explore');
  await controls.press('rhythm-sls');await controls.press('signal');
  await controls.press('recollect');await controls.press('brace');
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'),'false');
  assert.equal(await page.locator('[data-action="present"]').count(),0);
  activeLayouts.push({phase:'braced-placement',...await layout(page,['wedge'])});
  // A destination without selecting an object must not place it.
  await controls.use('[data-destination="wedge"]');
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'),'false');
  await controls.place('wedge');
  assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'),'true');
  await controls.press('present');await controls.press('read-offered-letter');
  activeLayouts.push({phase:'permission-choice',...await layout(page,['read-offered-letter','private','archive'])});
  await controls.press(choice);await controls.press('return');
  activeLayouts.push({phase:'return-placement',...await layout(page,['place-memory'])});
  await controls.place('place-memory');
  const expected=profile==='neutral'?'cloth':choice==='private'?'letter':'dedication';
  assert.equal(await page.locator('#world').getAttribute('data-placement'),expected);
  if(storage){const state=await checkpoint(page,'iona',profile);assert.equal(state.phase,'return');assert.equal(state.placement,expected);assert.equal(state.peeked,true);assert.equal(state.letterPublished,false);}
  return activeLayouts;
}
async function mara(page,controls){
  const activeLayouts=[];
  await controls.press('start');
  assert.equal(await page.locator('[data-action="reveal"]').isDisabled(),true);
  for(const id of ['postcard','sketches','timetable'])await controls.press(id);
  activeLayouts.push({phase:'alignment',...await layout(page,['align','align-minus','align-plus','reveal'])});
  for(let i=0;i<3;i++)await controls.press('align-plus');
  await controls.press('align-minus');
  assert.equal(await page.locator('[data-action="reveal"]').isDisabled(),true);
  await controls.press('align-plus');await controls.press('reveal');
  assert.equal((await checkpoint(page,'mara')).phase,'reveal');
  activeLayouts.push({phase:'interpretation',...await layout(page,['repair','meet','unfinished'])});
  await controls.press('unfinished');
  const state=await checkpoint(page,'mara');assert.equal(state.phase,'end');assert.equal(state.interpretation,'unfinished');
  return activeLayouts;
}
try{
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(build,'locale-catalog.json'),'utf8')),{schema_version:1,game:'keepers-frame',default_locale:'en',locales:['en','ja','zh-Hans'],units:[{id:'iona',locales:['en','ja','zh-Hans']},{id:'mara',locales:['en','ja','zh-Hans']}]});
  for(const engine of selected){
    assert.ok(engines[engine],`Unknown engine ${engine}`);
    browser=await engines[engine].launch(engine==='chromium'?{executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}:{headless:true});
    for(const locale of LOCALES)for(const [label,width,input] of [['desktop',1440,'keyboard'],['phone',390,'touch'],['tablet',768,'pointer']]){
      await checkCase(`${engine}-${locale}-${label}`,async record=>{
        const context=await browser.newContext({viewport:{width,height:900},hasTouch:input==='touch',reducedMotion:'reduce'});
        const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',error=>errors.push(error.message));
        try{
          const mount=label==='desktop'?'/':'/nested/';
          await page.goto(`${base}${mount}?lang=${locale}&flat=1`);
          await page.locator('[data-story="iona"]').waitFor();
          const t=createUiTranslator(locale);assert.equal(await page.locator('html').getAttribute('lang'),locale);
          assert.equal(await page.locator('#gallery-title').innerText(),t('headline'));
          assert.equal(await page.locator('#build-version').innerText(),t('version',{version:'0.2.0'}));
          record.galleryLayout=await layout(page);
          const controls=actions(page,input);await controls.use('[data-story="iona"]');
          assert.equal(await page.locator('#language').isVisible(),false);
          record.ionaActiveLayouts=await iona(page,controls,{choice:label==='phone'?'archive':'private'});
          record.ionaLayout=await layout(page);
          const before=await checkpoint(page,'iona');await page.reload();await page.locator('#world[data-placement]').waitFor();
          await page.waitForFunction(()=>document.querySelector('#world').dataset.placement!=='');
          assert.deepEqual(await checkpoint(page,'iona'),before);
          await controls.use('#back');await controls.use('[data-story="mara"]');record.maraActiveLayouts=await mara(page,controls);
          record.maraLayout=await layout(page);
          assert.equal(await page.locator('#actions').getAttribute('aria-label'),t('actions'));
          assert.equal(await page.locator('#transcript summary').innerText(),t('transcript'));
          assert.equal((await page.locator('#transcript-lines').innerText()).includes('Iona'),false);
          await page.evaluate(()=>scrollTo(0,0));
          record.skipLink=await page.locator('.skip-link').evaluate(el=>({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom,focused:el===document.activeElement}));
          assert.ok(record.skipLink.focused||record.skipLink.bottom<=0,'Unfocused skip link stays above viewport');
          await page.screenshot({path:path.join(output,`${engine}-${locale}-${label}.png`),fullPage:true});
          assert.deepEqual(errors,[]);record.browser=browser.version();record.input=input;record.locale=locale;record.fullEndpoints=['iona-return-placement','mara-interpretation'];
        }finally{await context.close();}
      });
    }
    for(const locale of LOCALES)await checkCase(`${engine}-${locale}-neutral-and-fallback`,async record=>{
      const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});const page=await context.newPage();page.setDefaultTimeout(10000);
      try{
        await page.route('**/*.glb',route=>route.abort());
        await page.goto(`${base}/nested/?lang=${locale}&profile=neutral#iona`);
        await page.locator('#render-label').filter({hasText:createUiTranslator(locale)('unavailableWorld')}).waitFor();
        record.ionaActiveLayouts=await iona(page,actions(page,'touch'),{profile:'neutral'});
        record.layout=await layout(page);record.fallback='3D asset request deliberately failed; full flat path completed';
      }finally{await context.close();}
    });
    await checkCase(`${engine}-switch-storage-recovery`,async record=>{
      const context=await browser.newContext({viewport:{width:390,height:844}});const page=await context.newPage();page.setDefaultTimeout(10000);
      try{
        await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('denied for fixture');}});});
        await page.goto(`${base}/?lang=en&flat=1#iona`);const controls=actions(page,'keyboard');
        await controls.press('start');await controls.press('view--1');await controls.press('ledger');
        await controls.use('#back');await page.locator('#language').selectOption('ja');await controls.use('[data-story="iona"]');
        assert.equal(await page.locator('[data-action="start"]').count(),0);
        assert.equal(await page.locator('#storage-status').innerText(),createUiTranslator('ja')('storageUnavailable'));
        await controls.press('view-1');await controls.press('plate');await controls.press('bearing-east');await controls.press('rhythm-sls');await controls.press('signal');
        await controls.press('recollect');await controls.press('brace');await controls.press('wedge');
        await controls.use('#back');await page.locator('#language').selectOption('zh-Hans');await controls.use('[data-story="iona"]');
        assert.equal(await page.locator('[data-action="wedge"]').count(),1);
        assert.equal(await page.locator('#world').getAttribute('data-wedge-placed'),'false');
        assert.equal((await page.locator('#transcript-lines li').count()),1);
        await controls.place('wedge');await controls.press('present');await controls.press('private');await controls.press('return');await controls.place('place-memory');
        assert.equal(await page.locator('#world').getAttribute('data-placement'),'letter');
        await controls.use('#reset');assert.equal(await page.locator('#world').getAttribute('data-placement'),'letter');
        await controls.use('#reset');assert.equal(await page.locator('[data-action="start"]').count(),1);
        record.result='Blocked storage preserves in-page semantic progress across en→ja→zh-Hans; gesture not committed by language switch; reset still explicit.';
      }finally{await context.close();}
      const recovery=await browser.newContext();const recoveryPage=await recovery.newPage();
      try{
        await recoveryPage.addInitScript(()=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem('vivid:save:iona:remembered','{damaged');sessionStorage.setItem('seeded','1');}});
        await recoveryPage.goto(`${base}/?lang=ja&flat=1#iona`);await recoveryPage.locator('#recover').waitFor();
        assert.equal(await recoveryPage.locator('#storage-status').innerText(),createUiTranslator('ja')('storageCorrupt'));
        await recoveryPage.locator('[data-action="start"]').click();
        assert.equal(await recoveryPage.evaluate(()=>localStorage.getItem('vivid:save:iona:remembered')),'{damaged');
        await recoveryPage.locator('#recover').click();assert.equal((await checkpoint(recoveryPage,'iona')).phase,'explore');
      }finally{await recovery.close();}
    });
    await browser.close();browser=null;
  }
}catch(error){report.failures.push('harness');report.harnessError=error.stack;console.error(error);}
finally{
  await browser?.close();await new Promise(resolve=>server.close(resolve));
  report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(output,'browser-report.json'),JSON.stringify(report,null,2)+'\n');
}
if(report.failures.length)process.exitCode=1;
