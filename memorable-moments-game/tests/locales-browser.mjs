import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'node:http';
import { message, LOCALES, LOCALE_KEY } from '../play/locales.js';
import { scenesFor } from '../play/content.js';
const require = createRequire(import.meta.url);
let playwright; try { playwright = require('playwright'); } catch { playwright = require(process.env.PLAYWRIGHT_PATH); }
const engine = process.env.BROWSER_ENGINE || 'chromium';
const target = new URL(process.env.PLAY_URL);
assert.equal(target.protocol, 'http:', 'Use a supported HTTP artifact');
const out = path.resolve(process.env.EVIDENCE_DIR); await mkdir(out);
const report = { started_at:new Date().toISOString(), engine, method:'Automated exact-artifact localization journeys. Touch/viewport and composition events are synthetic; no fluent review, physical device, real OS IME or human pair evidence.', cases:[], checks:0, errors:[], knownDiagnostics:[] };
let browser;
let svgServer;
const savedSvgs = new Map();
const click = (page, action) => page.locator(`[data-action="${action}"]`).click();
const check = (value, label) => { assert(value, label); report.checks++; };
async function fits(page, label) { check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), label + ': no horizontal overflow'); }
function observe(page) {
  page.on('pageerror', error => report.errors.push({type:'pageerror', message:error.message}));
  page.on('requestfailed', req => report.errors.push({type:'requestfailed',url:req.url(),error:req.failure()?.errorText}));
  page.on('console', msg => { if (msg.type() === 'error') { const row={type:'console',message:msg.text(),url:msg.location().url}; (row.url?.endsWith('/favicon.ico') ? report.knownDiagnostics : report.errors).push(row); } });
  page.on('response', res => { if (res.status() >= 400) (new URL(res.url()).pathname === '/favicon.ico' ? report.knownDiagnostics : report.errors).push({type:'http',url:res.url(),status:res.status()}); });
}
try {
  // Reopen actual downloaded bytes through the supported local HTTP route.
  // Managed Chromium disallows file URLs; this is not an OS viewer assertion.
  svgServer=createServer((req,res)=>{
    const preview=req.url.startsWith('/preview/');
    const name=preview ? '/' + req.url.slice('/preview/'.length) : req.url;
    const bytes=savedSvgs.get(name); if(!bytes){res.writeHead(404);res.end();return;}
    res.writeHead(200,{'Content-Type':preview ? 'text/html; charset=utf-8' : 'image/svg+xml; charset=utf-8','Cache-Control':'no-store'});
    res.end(preview ? `<html><body style="margin:0"><img alt="Saved keepsake preview" src="${name}"></body></html>` : bytes);
  });
  await new Promise(resolve=>svgServer.listen(0,'127.0.0.1',resolve));
  browser = await playwright[engine].launch(engine === 'chromium' ? {executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']} : {headless:true});
  report.browser_version = browser.version();
  for (const [index, locale] of LOCALES.entries()) for (const mode of ['pair','solo']) {
    const width = mode === 'pair' ? 1280 : 390;
    const row={locale,mode,width,scene:scenesFor(locale)[index].id}; report.cases.push(row);
    const context = await browser.newContext({viewport:{width,height:900},locale:'en-US',hasTouch:mode==='solo',acceptDownloads:true});
    const page=await context.newPage(); page.setDefaultTimeout(8000); observe(page);
    try {
      await page.goto(target.href); await page.locator('#language').selectOption(locale);
      check(await page.locator('html').getAttribute('lang')===locale,'document language');
      check(await page.evaluate(key => localStorage.getItem(key), LOCALE_KEY)===locale,'only supported locale preference');
      check(await page.locator('#language').evaluate(el=>el===document.activeElement),'language choice retains focus');
      await page.locator('#about-button').click();
      check((await page.locator('#about').innerText()).includes(message(locale,'about.privacy')),'translated privacy explanation');
      await page.locator('#about .close').click(); await fits(page,'localized home');
      await page.screenshot({path:path.join(out,`${locale}-${mode}-home.png`),fullPage:true});
      await page.locator(`[data-action="start-${mode}"]`).focus(); await page.keyboard.press('Enter');
      check(await page.locator('#language').count()===0,'language switching absent from active private journey');
      await page.locator(`[data-index="${index}"]`).click(); await click(page,'start-scene'); await click(page,'ready-a');
      const choices=scenesFor(locale)[index].choices;
      check(await page.locator('[data-action="seal"]').isDisabled(),'both choices required');
      await page.locator(`[data-action="choose"][data-id="${choices[0].id}"]`).click();
      await page.locator(`[data-action="guess"][data-id="${choices[1].id}"]`).click(); await fits(page,'private choice'); await click(page,'seal');
      check(!(await page.locator('#app').innerText()).includes(choices[0].label),'A choice absent at handoff');
      await click(page,'ready-b'); check(await page.locator('[aria-pressed="true"]').count()===0,'B starts with no selected answers');
      await page.locator(`[data-action="choose"][data-id="${choices[2].id}"]`).click();
      await page.locator(`[data-action="guess"][data-id="${choices[0].id}"]`).click(); await click(page,'seal');
      check(await page.locator('.reveal-card').count()===0,'joint ready precedes reveal');
      check((await page.locator('[data-action="reveal"]').innerText()).includes(message(locale,`together.${mode}.button`)),'mode-specific reveal label');
      await click(page,'reveal'); check(await page.locator('.reveal-card').count()===2,'two reveal contributions');
      check((await page.locator('.match-label').allTextContents()).includes(message(locale,'reveal.surprise')),'nonjudgmental surprise');
      await fits(page,'reveal'); await click(page,'action'); await fits(page,'offscreen activity');
      await page.clock.install(); await click(page,'timer'); await page.clock.fastForward(46000);
      check(await page.locator('#timer-status').innerText()===message(locale,'timer.finished'),'localized optional timer expiry');
      await click(page,'write'); await click(page,'ready-write-a');
      const detail = locale === 'ja' ? 'か\u3099'.repeat(118)+'👩🏽‍🚀🇯🇵' : locale === 'zh-Hans' ? '我们一起创造的记忆。'.repeat(12) : 'A shared memory <&> 👩🏽‍🚀';
      await page.locator('#memory').fill(detail);
      const committed=await page.locator('#memory').inputValue();
      if (locale !== 'en') {
        await page.locator('#memory').evaluate(el=>{el.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));el.value += '仮';el.dispatchEvent(new InputEvent('input',{bubbles:true,isComposing:true}));});
        check((await page.locator('#memory').inputValue()).endsWith('仮'),'composition not truncated in progress');
        check(await page.locator('[data-action="seal-line"]').isDisabled(),'composition cannot accidentally submit');
        // Simulated cancelled conversion restores the previously committed text.
        await page.locator('#memory').evaluate((el,previous)=>{el.value=previous;el.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true}));},committed);
        check(await page.locator('#memory').inputValue()===committed,'composition cancellation preserves committed text');
        check(!(await page.locator('[data-action="seal-line"]').isDisabled()),'composition releases submit');
      }
      await fits(page,'writing'); await click(page,'seal-line');
      check(!(await page.locator('#app').innerText()).includes(committed),'A writing absent at B curtain');
      await click(page,'ready-write-b'); check(await page.locator('#memory').inputValue()==='','B writes privately');
      const second=mode==='solo' ? '' : '二人の物語 <秘密 & 安心> 👨‍👩‍👧‍👦';
      await page.locator('#memory').fill(second); await click(page,'seal-line');
      const card=await page.locator('.keepsake-card').innerText();
      check(card.includes(committed),'personal writing unchanged in card');
      check(card.includes(second || message(locale,'write.fallback')),'B contribution or localized optional fallback');
      check(card.includes(message(locale,mode==='solo'?'keepsake.solo':'keepsake.pair')),'mode-stamped artifact');
      await fits(page,'keepsake'); await page.screenshot({path:path.join(out,`${locale}-${mode}-keepsake.png`),fullPage:true});
      const pending=page.waitForEvent('download'); await click(page,'download'); const downloaded=await pending;
      const filename=path.join(out,`${locale}-${mode}.svg`); await downloaded.saveAs(filename); const svg=await readFile(filename,'utf8');
      check(svg.includes(`xml:lang="${locale}"`),'actual file delivered in correct locale');
      check(!svg.includes('<秘密'),'personal XML escaped');
      savedSvgs.set(`/${locale}-${mode}.svg`,svg);
      const image=await context.newPage(); await image.goto(`http://127.0.0.1:${svgServer.address().port}/${locale}-${mode}.svg`); await image.evaluate(()=>document.fonts.ready);
      check(await image.locator('parsererror').count()===0,'saved SVG parses when reopened');
      const bounds=await image.locator('svg').evaluate(svg=>[...svg.querySelectorAll('text')].map(el=>{const b=el.getBBox();return {text:el.textContent,x:b.x,right:b.x+b.width,y:b.y,bottom:b.y+b.height,height:svg.viewBox.baseVal.height};}));
      check(bounds.length >= 8 && bounds.every(b=>b.x>=22 && b.right<=698 && b.y>=22 && b.bottom<b.height-22),'all saved SVG text fits its card');
      check(bounds.some(b=>b.text.includes('👩🏽‍🚀') || b.text.includes('我们')) || locale==='en','saved personal graphemes retained');
      // Playwright's standalone XML-document screenshot stalls in both managed
      // and stock Chromium. Bounds above inspect the reopened SVG directly;
      // its visual preview uses an HTML image of those exact saved bytes.
      await image.goto(`http://127.0.0.1:${svgServer.address().port}/preview/${locale}-${mode}.svg`);
      await image.locator('img').evaluate(el=>el.decode());
      await image.locator('img').screenshot({path:path.join(out,`${locale}-${mode}-svg.png`)}); await image.close();
      row.saved_svg=path.basename(filename); row.reopened_via='Same-machine HTTP serving actual downloaded bytes; XML bounds inspected directly, preview via HTML img; not an OS viewer check'; row.svg_text_bounds=bounds;
      await page.setViewportSize({width:768,height:1024}); await fits(page,'tablet-sized keepsake');
      await click(page,'again'); check(await page.locator(`[data-index="${(index+1)%3}"]`).getAttribute('aria-pressed')==='true','replay advances suggested scene');
      await click(page,'end'); await page.locator('[data-cancel]').click(); check(await page.locator('[data-action="start-scene"]').count()===1,'cancel does not reset');
      await click(page,'end'); await page.locator('[data-confirm]').click(); check(await page.locator('#language').count()===1,'explicit reset returns safe language choice');
      await page.reload(); check(await page.locator('html').getAttribute('lang')===locale,'preference survives reload');
      check(!(await page.locator('body').innerText()).includes(committed),'reload has no private writing');
      const saved=await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage)));
      check(Object.keys(saved).length===1 && saved[LOCALE_KEY]===locale,'storage contains locale only');
      row.status='pass';
    } finally { await context.close(); }
  }
  const context=await browser.newContext({locale:'ja-JP'});
  await context.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}}));
  const page=await context.newPage(); observe(page); await page.goto(target.href);
  check(await page.locator('html').getAttribute('lang')==='ja','browser language works with blocked storage');
  await page.locator('#language').selectOption('zh-Hans'); check(await page.locator('html').getAttribute('lang')==='zh-Hans','explicit choice works with blocked storage');
  check((await page.locator('[role="status"]').innerText()).includes(message('zh-Hans','locale.unsaved')),'storage failure disclosed without blocking');
  await click(page,'start-pair'); check(await page.locator('[data-action="start-scene"]').count()===1,'play remains available');
  await context.close();
  assert.deepEqual(report.errors,[]); report.status='pass';
} catch(error) { report.status='fail'; report.failure=error.stack; process.exitCode=1; }
finally { await browser?.close(); if(svgServer) await new Promise(resolve=>svgServer.close(resolve)); report.completed_at=new Date().toISOString(); await writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n'); console.log(JSON.stringify({status:report.status,engine,checks:report.checks,evidence:out,failure:report.failure})); }
