import test from 'node:test';
import assert from 'node:assert/strict';
import { STORY, LOCALES, catalog } from '../src/content/index.ts';
import type { Locale } from '../src/content/types.ts';
import { newGame, selectIntent, submitIntent, resolveReply, turnPage, changeLocale, canChangeLocale, arrivalKey, endingId, endingPatternKey, validateState, preferredLocale, readSave, writeSave, eraseSave, SAVE_KEY, transcript } from '../src/state.ts';
import type { GameState, StorageLike, Resolution } from '../src/state.ts';

class MemoryStorage implements StorageLike {
  data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
}
const choose = (state: GameState, option = 0) => submitIntent(selectIntent(state, STORY.beats[state.beat].options[option].id));
const finish = (locale: Locale, bits = 0) => {
  let state = newGame(locale);
  for (let index = 0; index < 3; index++) {
    state = choose(state, (bits >> (index * 2)) & 1);
    state = resolveReply(state, ((bits >> (index * 2 + 1)) & 1) ? 'accept' : 'correct');
    state = turnPage(state);
  }
  return state;
};

test('all 192 authored choice paths reach a valid ending with three retained originals', () => {
  for (const locale of LOCALES) for (let bits = 0; bits < 64; bits++) {
    const state = finish(locale, bits);
    assert.equal(state.phase, 'ending'); assert.equal(state.entries.length, 3);
    assert.equal(endingId(state), (bits & 32) ? 'borrowed-hand' : 'own-hand');
    assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))), state);
    for (const [i, entry] of state.entries.entries()) assert.equal(entry.sourceText, catalog(locale)[STORY.beats[i].options[(bits >> (i * 2)) & 1].sourceKey]);
  }
});
test('each phrase changes the actual reply and visible consequence', () => {
  for (const locale of LOCALES) for (const beat of STORY.beats) {
    const [a, b] = beat.options;
    assert.notEqual(catalog(locale)[a.replyKey], catalog(locale)[b.replyKey]);
    for (const resolution of ['accept', 'correct'] as const) assert.notEqual(catalog(locale)[a.outcomeKeys[resolution]], catalog(locale)[b.outcomeKeys[resolution]]);
  }
});
test('accepting versus correcting changes the next page arrival', () => {
  const reply = choose(newGame('en'));
  const accepted = turnPage(resolveReply(reply, 'accept'));
  const corrected = turnPage(resolveReply(reply, 'correct'));
  assert.notEqual(arrivalKey(accepted), arrivalKey(corrected));
  assert.notEqual(catalog('en')[arrivalKey(accepted)!], catalog('en')[arrivalKey(corrected)!]);
});
test('each prior decision pattern changes the final paragraph, including the downloaded chapter', () => {
  for (const locale of LOCALES) {
    const paragraphs = new Set<string>();
    for (const bits of [0, 2, 8, 10, 32, 34, 40, 42]) {
      const state = finish(locale, bits), key = endingPatternKey(state)!;
      paragraphs.add(catalog(locale)[key]); assert.ok(transcript(state).includes(catalog(locale)[key]));
    }
    assert.equal(paragraphs.size, 8);
  }
});
test('reading, selecting and comparing never submit or advance the story', () => {
  const state = newGame('en'), selected = selectIntent(state, STORY.beats[0].options[0].id);
  assert.equal(selected.entries.length, 0); assert.equal(selected.phase, 'reading'); assert.equal(state.selectedIntentId, null);
  assert.throws(() => turnPage(selected)); assert.throws(() => resolveReply(selected, 'accept')); assert.throws(() => submitIntent(state));
});
test('double submit, foreign intent and early page turns are rejected', () => {
  assert.throws(() => selectIntent(newGame('en'), STORY.beats[1].options[0].id));
  const reply = choose(newGame('en')); assert.throws(() => submitIntent(reply)); assert.throws(() => turnPage(reply));
  const resolved = resolveReply(reply, 'correct'); assert.throws(() => resolveReply(resolved, 'accept'));
});
test('locale changes preserve original-language source, reply and consequence snapshots', () => {
  let state = resolveReply(choose(newGame('en')), 'correct');
  const original = JSON.stringify(state.entries[0]);
  state = changeLocale(state, 'ja'); state = turnPage(state); state = resolveReply(choose(state), 'accept');
  state = changeLocale(state, 'zh-Hans');
  assert.equal(JSON.stringify(state.entries[0]), original); assert.equal(state.entries[1].locale, 'ja');
  assert.deepEqual(validateState(state), state); assert.ok(transcript(state).includes(state.entries[0].sourceText));
});
test('active mark and unresolved reply lock locale without erasing the source', () => {
  const selected = selectIntent(newGame('en'), STORY.beats[0].options[0].id);
  assert.equal(canChangeLocale(selected), false); assert.throws(() => changeLocale(selected, 'ja'));
  const reply = submitIntent(selected); assert.equal(canChangeLocale(reply), false); assert.throws(() => changeLocale(reply, 'zh-Hans'));
  assert.equal(reply.entries[0].locale, 'en');
});
test('save roundtrip retains choices but cannot mutate the original state', () => {
  const storage = new MemoryStorage(), state = finish('ja', 33);
  assert.equal(writeSave(storage, state), 'saved');
  const read = readSave(storage); assert.equal(read.kind, 'saved');
  if (read.kind === 'saved') { assert.deepEqual(read.state, state); read.state.entries[0].sourceText = 'edited'; }
  assert.notEqual(state.entries[0].sourceText, 'edited'); assert.equal(readSave(storage).kind, 'saved');
});
test('future and malformed saves remain byte-for-byte untouched during attempted saving', () => {
  for (const raw of ['{broken', JSON.stringify({ schemaVersion: 9 }), JSON.stringify({ schemaVersion: 1, storyId: 'other' })]) {
    const storage = new MemoryStorage(); storage.setItem(SAVE_KEY, raw);
    assert.equal(readSave(storage).kind, 'protected'); assert.equal(writeSave(storage, finish('en')), 'protected'); assert.equal(storage.getItem(SAVE_KEY), raw);
  }
});
test('storage denial and quota errors preserve an in-memory completed journey', () => {
  const denied: StorageLike = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() { throw new Error('denied'); } };
  const state = finish('zh-Hans'); assert.equal(readSave(denied).kind, 'unavailable'); assert.equal(writeSave(denied, state), 'unavailable'); assert.equal(eraseSave(denied), false); assert.equal(state.phase, 'ending');
  const quota = new MemoryStorage(); quota.setItem = () => { throw new Error('quota'); }; assert.equal(writeSave(quota, state), 'unavailable');
});
test('forget clears only this game save, preserving unrelated notebook product data', () => {
  const storage = new MemoryStorage(); storage.setItem('notebook-private-product', 'original'); writeSave(storage, finish('en'));
  assert.equal(eraseSave(storage), true); assert.equal(storage.getItem(SAVE_KEY), null); assert.equal(storage.getItem('notebook-private-product'), 'original');
});
test('locale precedence is explicit then saved then supported browser, never Traditional Chinese', () => {
  assert.equal(preferredLocale('ja', 'en', ['zh-CN']), 'ja');
  assert.equal(preferredLocale(null, 'zh-Hans', ['ja']), 'zh-Hans');
  assert.equal(preferredLocale(null, null, ['zh-Hant-TW']), 'en');
  assert.equal(preferredLocale(null, null, ['zh-CN']), 'zh-Hans');
  assert.equal(preferredLocale(null, null, ['fr', 'ja-JP']), 'ja');
});
test('tampered source, impossible phase, wrong count and unknown semantic ID fail safe', () => {
  const valid = finish('en');
  const invalid: GameState[] = [ { ...valid, beat: 0 }, { ...valid, entries: valid.entries.slice(1) }, { ...valid, selectedIntentId: 'arbitrary' }, { ...valid, phase: 'reply' } ];
  for (const field of ['sourceText', 'replyText', 'outcomeText', 'intentId'] as const) { const copy = structuredClone(valid); copy.entries[0][field] = 'tampered'; invalid.push(copy); }
  for (const item of invalid) assert.equal(validateState(item), null);
});
test('every locale transcript retains all originals, decisions and both possible endings without unresolved placeholders', () => {
  for (const locale of LOCALES) for (const bits of [0, 63]) {
    const state = finish(locale, bits), text = transcript(state);
    for (const entry of state.entries) { assert.ok(text.includes(entry.sourceText)); assert.ok(text.includes(entry.replyText)); assert.ok(text.includes(entry.outcomeText!)); }
    assert.ok(text.includes(catalog(locale)[STORY.endings.find(ending => ending.id === endingId(state))!.titleKey]));
    assert.doesNotMatch(text, /undefined|\{[a-zA-Z]+\}/); assert.ok(text.includes('0.1.0'));
  }
});
test('all complete-message catalogs have key and placeholder parity', () => {
  const keys = Object.keys(catalog('en')).sort();
  for (const locale of LOCALES) {
    assert.deepEqual(Object.keys(catalog(locale)).sort(), keys);
    for (const key of keys) {
      assert.ok(catalog(locale)[key].trim(), `${locale}/${key}`);
      assert.deepEqual([...catalog(locale)[key].matchAll(/\{([a-zA-Z]+)\}/g)].map(m => m[1]).sort(), [...catalog('en')[key].matchAll(/\{([a-zA-Z]+)\}/g)].map(m => m[1]).sort(), `${locale}/${key}`);
    }
  }
});
