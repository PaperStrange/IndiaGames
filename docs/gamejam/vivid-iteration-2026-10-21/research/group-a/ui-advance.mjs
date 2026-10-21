// Batch ordinary click-to-advance input; stops at visible text in choice-button area.
// OCR only reads rendered pixels. No game variables, reducer, storage or event handlers are inspected.
import { chromium } from '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs';
import {execFileSync} from 'node:child_process';import {appendFileSync,mkdirSync} from 'node:fs';
const [startArg,countArg='12']=process.argv.slice(2);const start=Number(startArg),count=Number(countArg);
const scratch='/workspace/vivid-research-group-a';mkdirSync(scratch,{recursive:true});
const b=await chromium.connectOverCDP('http://127.0.0.1:9332');const p=b.contexts()[0].pages().find(p=>p.url().startsWith('https://ncase.me'));await p.bringToFront();
let previousOCR="",unchanged=0;
for(let n=start;n<start+count;n++){
 await p.mouse.click(640,450);await p.waitForTimeout(950);
 const name=`anxiety-${n}-dialogue.png`,path=scratch+'/'+name;await p.screenshot({path,clip:{x:460,y:150,width:360,height:600}});
 const observed=execFileSync('tesseract',[path,'stdout','--psm','6'],{encoding:'utf8',timeout:3500,env:{...process.env,OMP_THREAD_LIMIT:'1'},stdio:['ignore','pipe','ignore']});
 const bottom=await p.screenshot({clip:{x:475,y:605,width:330,height:125}});
 const choiceOCR=execFileSync('tesseract',['stdin','stdout','--psm','6'],{input:bottom,encoding:'utf8',timeout:3500,env:{...process.env,OMP_THREAD_LIMIT:'1'},stdio:['pipe','pipe','ignore']});
 console.log(n,observed,choiceOCR);
 appendFileSync(new URL('./ui-log.jsonl',import.meta.url),JSON.stringify({at:new Date().toISOString(),url:p.url(),capture:name,captureLocation:'local-scratch',input:{x:640,y:450},observedOCR:observed})+'\n');
 unchanged=observed===previousOCR?unchanged+1:0;previousOCR=observed;
 if(unchanged>=2){console.log('UNCHANGED_SCREEN_REVIEW',n);break;}
 if(choiceOCR.trim().length>20 && /[a-z]{3}/i.test(choiceOCR)){console.log('VISIBLE_CHOICES_STOP',n);break;}
}
await b.close();
