import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';
import {resolve} from 'node:path';
import {readFile} from 'node:fs/promises';
// The production Worker imports cloudflare:workers and cannot run in Node's
// default ESM loader. Validate the layout with Vite; browser QA covers the route.
test('production layout supplies notebook identity, favicon and mobile viewport',async()=>{
 const vite=await createServer({configFile:false,cacheDir:'.sites-runtime/layout-test-cache',appType:'custom',resolve:{alias:{'@':resolve('.')}},server:{middlewareMode:true,hmr:false}});
 try{const layout=await vite.ssrLoadModule('/app/layout.tsx');assert.equal(layout.metadata.title,'Enchanted Notebook');assert.equal(layout.viewport.width,'device-width');assert.equal(layout.viewport.initialScale,1);assert.equal(layout.metadata.icons.icon,'/favicon.svg');const html=renderToStaticMarkup(React.createElement(layout.default,null,React.createElement('main',null,'Write a thought')));assert.match(html,/<html lang="en">/);assert.match(html,/<main>Write a thought<\/main>/);assert.match(await readFile('dist/server/index.js','utf8'),/fetch/);}finally{await vite.close();}
});
