import {chromium} from '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs';
import {appendFile} from 'node:fs/promises';
const browser=await chromium.connectOverCDP('http://127.0.0.1:9342');
const pages=browser.contexts().flatMap(c=>c.pages());
const page=pages.find(p=>p.url().includes('poki.com/en/g/sort-the-court'))||pages[0];
const actions=JSON.parse(process.argv[2]||'[]');
for(const action of actions){
  if(action.kind==='reload')await page.reload({waitUntil:'domcontentloaded',timeout:60000});
  if(action.kind==='click')await page.mouse.click(action.x,action.y);
  if(action.kind==='press')await page.keyboard.press(action.key);
  if(action.kind==='wait')await page.waitForTimeout(action.ms);
  await appendFile('/workspace/IndiaGames/docs/gamejam/vivid-iteration-2026-10-21/research/group-a/sort-the-court/input-log.jsonl',JSON.stringify({at:new Date().toISOString(),...action})+'\n');
}
await page.waitForTimeout(1200);
await page.screenshot({path:'/tmp/vivid-sort-current.png',clip:{x:166,y:16,width:837,height:470}});
console.log(new Date().toISOString(), await page.title());
await browser.close();
