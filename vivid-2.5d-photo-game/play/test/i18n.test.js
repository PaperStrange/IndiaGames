import test from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, LOCALE_KEY, normalizeLocale, resolveLocale, readLocalePreference, rememberLocale, validateCatalogs, createTranslator } from '../src/i18n/core.js';
import { uiCatalogs, createUiTranslator } from '../src/i18n/ui.js';
import { createSession, saveKey } from '../src/runtime/session.js';
import { pack as iona } from '../src/stories/iona/index.js';

test('locale resolution honors explicit then saved then browser choices without treating Traditional as Simplified', () => {
  for (const [tag, expected] of [['en-US','en'],['ja-JP','ja'],['zh-Hans-CN','zh-Hans'],['zh-CN','zh-Hans'],['zh-SG','zh-Hans'],['zh-Hant','null'],['zh-TW','null'],['zh-HK','null'],['zh','null']]) {
    assert.equal(String(normalizeLocale(tag)), expected);
  }
  assert.equal(resolveLocale({ explicit:'ja-JP', saved:'zh-CN', languages:['en'] }), 'ja');
  assert.equal(resolveLocale({ explicit:'unsupported', saved:'zh-CN', languages:['ja'] }), 'zh-Hans');
  assert.equal(resolveLocale({ languages:['zh-TW','ja-JP'] }), 'ja');
  assert.equal(resolveLocale({ languages:['zh-Hant'] }), 'en');
});

test('locale preference stores only the locale and safely tolerates denied storage', () => {
  const map = new Map();
  const storage = { getItem:key=>map.get(key), setItem:(key,value)=>map.set(key,value) };
  assert.equal(rememberLocale('ja',storage),true);
  assert.deepEqual([...map],[[LOCALE_KEY,'ja']]);
  assert.equal(readLocalePreference(storage),'ja');
  const denied = { getItem(){throw new Error('denied');}, setItem(){throw new Error('denied');} };
  assert.equal(readLocalePreference(denied),null);
  assert.equal(rememberLocale('ja',denied),false);
  assert.equal(rememberLocale('ja',null),false);
});

test('shipping catalogs reject incomplete locales, blank messages, malformed and mismatched placeholders', () => {
  assert.ok(validateCatalogs(uiCatalogs)>50);
  const fixture = () => ({en:{greeting:'Hello {name}.'},ja:{greeting:'こんにちは、{name}。'},'zh-Hans':{greeting:'你好，{name}。'}});
  let broken=fixture();delete broken.ja.greeting;assert.throws(()=>validateCatalogs(broken),/key mismatch/);
  broken=fixture();broken.ja.greeting=' ';assert.throws(()=>validateCatalogs(broken),/Empty message/);
  broken=fixture();broken.ja.greeting='こんにちは、{person}。';assert.throws(()=>validateCatalogs(broken),/Placeholder mismatch/);
  broken=fixture();broken.ja.greeting='{name';assert.throws(()=>validateCatalogs(broken),/Malformed placeholder/);
  broken=fixture();delete broken['zh-Hans'];assert.throws(()=>validateCatalogs(broken),/locales/);
  const t=createTranslator(fixture(),'ja');
  assert.equal(t('greeting',{name:'Eris'}),'こんにちは、Eris。');
  assert.throws(()=>t('missing'),/Missing message/);
  assert.throws(()=>t('greeting'),/parameters differ/);
  assert.throws(()=>t('greeting',{name:'Eris',unused:1}),/parameters differ/);
  assert.throws(()=>createTranslator(fixture(),'zh-Hant'),/Unsupported locale/);
});

test('all locale storage warnings preserve protected records while a semantic snapshot survives collection switching', () => {
  const denied={getItem(){throw new Error('read denied');},setItem(){throw new Error('write denied');},removeItem(){throw new Error('remove denied');}};
  const first=createSession({pack:iona,storage:denied});
  first.dispatch({type:'START'});
  first.dispatch({type:'VIEW',value:-1});
  first.dispatch({type:'INSPECT',id:'ledger'});
  const snapshot=iona.serialize(first.getState());
  first.dispose();
  for(const locale of LOCALES){
    const session=createSession({pack:iona,storage:denied,translate:createUiTranslator(locale),resumeState:snapshot});
    assert.deepEqual(iona.serialize(session.getState()),snapshot);
    assert.equal(session.status.kind,'unavailable');
    assert.equal(session.status.message,uiCatalogs[locale].storageUnavailable);
  }
  const key=saveKey('iona');
  const original=JSON.stringify({schemaVersion:99,contentRevision:1,storySaveVersion:1,storyId:'iona',profile:'remembered',state:snapshot});
  const map=new Map([[key,original]]);
  const storage={getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};
  const protectedSession=createSession({pack:iona,storage,translate:createUiTranslator('ja'),resumeState:snapshot});
  assert.equal(protectedSession.status.kind,'future');
  assert.equal(protectedSession.status.message,uiCatalogs.ja.storageFuture);
  protectedSession.dispatch({type:'VIEW',value:1});
  assert.equal(map.get(key),original);
  assert.deepEqual(protectedSession.getState().clues,['ledger']);
});
