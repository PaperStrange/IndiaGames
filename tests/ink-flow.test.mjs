import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const moduleFrom = async name => {
  const source = await readFile(new URL(`../lib/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};
const { paperProjection } = await moduleFrom('paper-plane');
const { consumeCompanionStream } = await moduleFrom('companion-stream');

test('an angled sheet maps viewport coordinates back to exact pen positions at every corner and across its interior', () => {
  // Independent forward projection, with skew, translation, and perspective.
  const forward = (u, v) => { const w = 1 + .12 * u - .08 * v; return { x: (780 * u + 18 * v + 230) / w, y: (-9 * u + 1100 * v + 285) / w }; };
  const inverse = paperProjection([[0,0],[1,0],[1,1],[0,1]].map(([u,v]) => forward(u,v)));
  for (const [u,v] of [[0,0],[1,0],[1,1],[0,1],[.5,.5],[.1,.82],[.77,.22]]) {
    const screen = forward(u,v), actual = inverse(screen.x,screen.y);
    assert.ok(Math.abs(actual.x-u)<1e-9); assert.ok(Math.abs(actual.y-v)<1e-9);
  }
});
test('phone scale and scrolling do not shift the ink coordinate plane', () => {
  const inverse = paperProjection([{x:20,y:-230},{x:338,y:-235},{x:342,y:215},{x:16,y:219}]);
  const p = inverse(338,-235); assert.ok(Math.abs(p.x-1)<1e-9); assert.ok(Math.abs(p.y)<1e-9);
  assert.throws(()=>paperProjection(Array(4).fill({x:0,y:0})),/no measurable/);
});
const event = item => `event: ${item.type}\r\ndata: ${JSON.stringify(item)}\r\n\r\n`;
const delta = text => event({type:'content_block_delta',delta:{type:'text_delta',text}});
function streamResponse(text, chunkSize=7) {
  const bytes = new TextEncoder().encode(text); let at=0;
  return new Response(new ReadableStream({pull(c){if(at>=bytes.length)c.close();else{c.enqueue(bytes.slice(at,at+chunkSize));at+=chunkSize;}}}));
}
test('streamed reply handles split Unicode, fragmented SSE, pings and unknown events', async () => {
  const updates=[];
  const text=await consumeCompanionStream(streamResponse(event({type:'ping'})+delta('Ink 🦉 ')+event({type:'future_event'})+delta('你好')+event({type:'message_stop'}),1),s=>updates.push(s));
  assert.equal(text,'Ink 🦉 你好'); assert.deepEqual(updates,['Ink 🦉 ','Ink 🦉 你好']);
});
test('network interruption keeps partial output but reports that it did not complete',async()=>{
  const updates=[];
  await assert.rejects(consumeCompanionStream(streamResponse(delta('A partial reply')),s=>updates.push(s)),/ended early/);
  assert.deepEqual(updates,['A partial reply']);
  await assert.rejects(consumeCompanionStream(streamResponse(event({type:'error',error:{message:'Provider unavailable'}})),()=>{}),/Provider unavailable/);
});
test('stopping a reply cancels the transport and never marks it complete',async()=>{
  const controller=new AbortController(); let cancelled=false;
  const response=new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode(delta('First words')));},cancel(){cancelled=true;}}));
  await assert.rejects(consumeCompanionStream(response,()=>controller.abort(),controller.signal),{name:'AbortError'});
  assert.equal(cancelled,true);
});
test('upstream failure and empty completed streams remain visible errors', async()=>{
  await assert.rejects(consumeCompanionStream(new Response(JSON.stringify({error:'Wait a minute'}),{status:429}),()=>{}),/Wait a minute/);
  await assert.rejects(consumeCompanionStream(streamResponse(event({type:'message_stop'})),()=>{}),/empty reply/);
});
