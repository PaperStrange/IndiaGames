/** Task-scoped browser research transport, not a game shipping dependency.
 * Run with NODE_EXTRA_CA_CERTS set to the environment's installed proxy CA.
 * TLS validation remains enabled; no persistent browser trust changes.
 * Reuse the existing page when connecting over CDP; CDP-created pages are not
 * automatically in this routed context. This relay is not equivalent to an
 * ordinary consumer browser for cookies, service workers or network timings.
 */
import {chromium, request} from '/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs';
const [url,port='9334']=process.argv.slice(2);
if (!url?.startsWith('https://') || !/^\d{4,5}$/.test(port)) throw new Error('Provide an HTTPS URL and a local CDP port.');
if (!process.env.HTTPS_PROXY || !process.env.NODE_EXTRA_CA_CERTS) throw new Error('Use the configured proxy and installed environment CA.');
const api=await request.newContext({proxy:{server:process.env.HTTPS_PROXY},ignoreHTTPSErrors:false,timeout:60000});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox',`--remote-debugging-port=${port}`]});
const context=await browser.newContext({viewport:{width:1280,height:900},ignoreHTTPSErrors:false});
await context.route(/^https?:\/\//,async route=>{
 try {const response=await api.fetch(route.request());await route.fulfill({response});}
 catch(error){console.log('AUTHENTICATED_FETCH_FAILED',route.request().url(),error.message.slice(0,300));await route.abort();}
});
const page=await context.newPage();await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
console.log('RESEARCH_READY',new Date().toISOString(),await page.title(),port);
await new Promise(resolve=>browser.on('disconnected',resolve));
await api.dispose();
