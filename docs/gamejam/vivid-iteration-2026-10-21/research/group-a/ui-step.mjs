// Research helper: sends ordinary UI input and captures rendered output; never reads or writes game state.
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { chromium } from '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs';
const [name, x, y, delay='1600']=process.argv.slice(2);
const b=await chromium.connectOverCDP('http://127.0.0.1:9332');
const p=b.contexts()[0].pages().find(p=>p.url().startsWith('https://ncase.me'));await p.bringToFront();
if(x && y)await p.mouse.click(Number(x),Number(y));
await p.waitForTimeout(Number(delay));
const path=new URL('./captures/'+name+'.png',import.meta.url).pathname;
await p.screenshot({path,clip:{x:460,y:150,width:360,height:600}});
const observed=execFileSync('tesseract',[path,'stdout','--psm','6'],{encoding:'utf8',timeout:3500,env:{...process.env,OMP_THREAD_LIMIT:'1'},stdio:['ignore','pipe','ignore']});
console.log(observed);
appendFileSync(new URL('./ui-log.jsonl',import.meta.url), JSON.stringify({at:new Date().toISOString(),url:p.url(),capture:name+'.png',input:x&&y?{x:Number(x),y:Number(y)}:null,observedOCR:observed})+'\n');
console.log(new Date().toISOString(),p.url(),name,x??'',y??'');
await b.close();
