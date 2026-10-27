// Artifact launch check only. Run with SMALL_HOURS_BUILD and PLAYWRIGHT_MODULE.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(process.env.SMALL_HOURS_BUILD);
const output = path.resolve(process.env.PILOT_EVIDENCE || '/tmp/small-hours-launch');
const prefix = '/IndiaGames/pilots/small-hours/';
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.glb':'model/gltf-binary'};
fs.mkdirSync(output,{recursive:true});
const server = http.createServer((req,res)=>{
  let p = decodeURIComponent(new URL(req.url,'http://local').pathname);
  if(p === '/favicon.ico'){res.writeHead(204);res.end();return;}
  if(p.startsWith(prefix))p=p.slice(prefix.length);else p=p.slice(1);
  const file = path.resolve(root,p||'index.html');
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const report={at:new Date().toISOString(),kind:'automated artifact launch only; no human results',build:root,checks:[],pageErrors:[],failedResponses:[]};
  try{
    for(const mount of ['/',prefix]){
      const context=await browser.newContext({viewport:mount==='/'?{width:1280,height:900}:{width:390,height:844},reducedMotion:'reduce'});
      const page=await context.newPage();
      page.on('pageerror',e=>report.pageErrors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)report.failedResponses.push({url:r.url(),status:r.status()});});
      await page.goto(base+mount);
      await page.locator('[data-action="start-pair"]').focus();await page.keyboard.press('Enter');
      await page.locator('[data-action="start-scene"]').click();
      await page.locator('[data-action="ready-a"]').click();
      assert.equal(await page.locator('[data-action="seal"]').isDisabled(),true);
      assert.ok(await page.locator('[data-action="choose"]').count()>1);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      report.checks.push({mount,viewport:await page.viewportSize(),pairEntryByKeyboard:true,privateChoiceLoaded:true,noHorizontalOverflow:true});
      await page.screenshot({path:path.join(output,mount==='/'?'desktop-entry.png':'nested-narrow-entry.png'),fullPage:true});
      await page.reload();assert.equal(await page.locator('[data-action="start-pair"]').count(),1);
      await context.close();
    }
    assert.deepEqual(report.pageErrors,[]);assert.deepEqual(report.failedResponses,[]);
    report.passed=true;
  }catch(e){report.passed=false;report.error=e.stack;process.exitCode=1;}
  finally{fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
