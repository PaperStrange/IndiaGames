import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, transition as step, parseMemory, memoryFor } from '../src/rules.js';
const play = (...events) => events.reduce(step, createGame());
const begin = { type: 'START' };
const evidence = [begin, {type:'VIEW',value:-1},{type:'CLUE',id:'ledger'},{type:'VIEW',value:1},{type:'CLUE',id:'plate'}];
const solution = [{type:'SET_BEARING',value:'east'},{type:'SET_RHYTHM',value:'sls'},{type:'SIGNAL'}];
test('correct guessed settings cannot bypass physical evidence discovery', () => {
  const s = play(begin,...solution);
  assert.equal(s.phase,'explore'); assert.match(s.feedback,/both harbour marks/);
});
test('clues can only be collected from their actual viewpoint and cannot duplicate', () => {
  const s = play(begin,{type:'CLUE',id:'ledger'},{type:'CLUE',id:'unknown'},{type:'VIEW',value:-1},{type:'CLUE',id:'plate'},{type:'CLUE',id:'ledger'},{type:'CLUE',id:'ledger'});
  assert.deepEqual(s.clues,['ledger']);
});
test('wrong signal is recoverable, correct signal leads to an explicit memory decision', () => {
  let s = play(...evidence,{type:'SET_BEARING',value:'west'},{type:'SET_RHYTHM',value:'sls'},{type:'SIGNAL'});
  assert.equal(s.phase,'explore'); assert.match(s.feedback,/No answer/);
  s = step(step(s,{type:'SET_BEARING',value:'east'}),{type:'SIGNAL'});
  assert.equal(s.phase,'choice'); assert.equal(memoryFor(s),null);
  s = step(s,{type:'REMEMBER',value:'archive'});
  assert.deepEqual(memoryFor(s),{version:1,choice:'archive',peeked:false,visits:1});
});
test('privacy decision records uninvited opening; returning guest receives permission', () => {
  let s = play(...evidence,{type:'LETTER'},...solution,{type:'REMEMBER',value:'private'});
  assert.equal(memoryFor(s).peeked,true);
  s = createGame({version:1,choice:'private',peeked:false,visits:1});
  s = [begin,{type:'VIEW',value:1},{type:'LETTER'}].reduce(step,s);
  assert.equal(s.letterOpen,true); assert.equal(s.peeked,false);
});
test('end state cannot be changed by gameplay events', () => {
  const s = play(...evidence,...solution,{type:'REMEMBER',value:'private'});
  assert.deepEqual(step(s,{type:'REMEMBER',value:'archive'}),s);
  assert.deepEqual(step(s,{type:'SIGNAL'}),s);
});
test('corrupt or future browser memory is ignored; untrusted fields are not rendered', () => {
  assert.equal(parseMemory('{'),null); assert.equal(parseMemory('{"version":2,"choice":"private"}'),null);
  assert.equal(parseMemory('{"version":1,"choice":"<script>"}'),null);
  assert.deepEqual(parseMemory('{"version":1,"choice":"private","visits":-100,"name":"<script>"}'),{version:1,choice:'private',peeked:false,visits:1});
});
test('rules preserve their input state and reject out-of-range viewpoints', () => {
  const s = createGame(); const snapshot=JSON.stringify(s);
  step(s,begin); assert.equal(JSON.stringify(s),snapshot);
  assert.equal(step(step(s,begin),{type:'VIEW',value:5}).view,0);
});
test('later visits retain the privacy history even without reopening the letter', () => {
  const m = {version:1,choice:'private',peeked:true,visits:2};
  const s = [...evidence,...solution,{type:'REMEMBER',value:'private'}].reduce(step,createGame(m));
  assert.equal(memoryFor(s).peeked,true); assert.equal(memoryFor(s).visits,3);
});
