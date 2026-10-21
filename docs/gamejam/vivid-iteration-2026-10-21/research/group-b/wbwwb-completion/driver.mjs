// Research input harness: only public web navigation, visible pixels and normal
// browser input. It never reads or changes game variables or source functions.
import {chromium, request} from '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs';
import {appendFile, mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import readline from 'node:readline';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
await mkdir(resolve(root,'captures'),{recursive:true});
const api=await request.newContext({proxy:{server:process.env.HTTPS_PROXY},timeout:60000});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1280,height:800}});
await context.route(/^https?:\/\//,async route=>{
  try{const response=await api.fetch(route.request());await route.fulfill({response});}
  catch(error){await record({type:'network-error',url:route.request().url(),message:error.message});await route.abort();}
});
const page=await context.newPage();
async function record(data){await appendFile(resolve(root,'inputs.jsonl'),JSON.stringify({at:new Date().toISOString(),...data})+'\n');}
page.on('pageerror',error=>record({type:'page-error',message:error.message}));
console.log('READY');
for await(const line of readline.createInterface({input:process.stdin,terminal:false})){
  try{
    const command=JSON.parse(line);await record({type:'command',...command});
    if(command.op==='goto'){await page.goto(command.url,{waitUntil:'domcontentloaded',timeout:60000});console.log(await page.title());}
    else if(command.op==='click'){await page.mouse.click(command.x,command.y);console.log('clicked');}
    else if(command.op==='move'){await page.mouse.move(command.x,command.y);console.log('moved');}
    else if(command.op==='key'){await page.keyboard.press(command.key);console.log('key sent');}
    else if(command.op==='wait'){await page.waitForTimeout(Math.min(command.ms,10000));console.log('waited');}
    else if(command.op==='shot'){
      const path=command.keep?resolve(root,'captures',command.name+'.png'):resolve('/tmp/wbwwb-completion',command.name+'.png');
      await page.screenshot({path});await record({type:'capture',path,curated:!!command.keep});console.log(path);
    }
    else if(command.op==='body'){console.log((await page.locator('body').innerText()).slice(0,7000));}
    else if(command.op==='frames'){console.log(page.frames().map(frame=>({url:frame.url()})));}
    else if(command.op==='aim'){
      const path='/tmp/wbwwb-completion/current.png';await page.screenshot({path});
      const found=JSON.parse(execFileSync('python3',[resolve(root,'visible-match.py'),path,command.template],{encoding:'utf8',env:{...process.env,OMP_THREAD_LIMIT:'1',OPENBLAS_NUM_THREADS:'1'}}));
      await record({type:'visible-pixel-aim',template:command.template,found});
      if(found.score>=(command.threshold||.8)){await page.mouse.click(found.x,found.y);await record({type:'assisted-click',x:found.x,y:found.y});console.log(found);}
      else console.log({notClicked:true,...found});
    }
    else if(command.op==='exit')break;
  }catch(error){await record({type:'driver-error',message:error.message});console.log('ERROR',error.message);}
}
await browser.close();await api.dispose();
