import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { catalogs, validateCatalogs, message, supportedLocale, resolveLocale, readPreference, savePreference, LOCALE_KEY, LOCALES, localeCatalog, graphemes, limitText } from '../play/locales.js';
import { scenesFor } from '../play/content.js';
import { fresh, begin, choose, seal, sealLine, keepsakeSvg, wrappedLines } from '../play/state.js';
import { view } from '../play/views.js';

test('all required messages, placeholders and exact exported scope agree', async () => {
  assert.equal(validateCatalogs(), true);
  assert.deepEqual(JSON.parse(await readFile(new URL('../play/locale-catalog.json', import.meta.url))), localeCatalog);
  for (const locale of LOCALES) {
    const missing = structuredClone(catalogs); delete missing[locale]['about.privacy'];
    assert.throws(() => validateCatalogs(missing), /Missing or extra/);
    const blank = structuredClone(catalogs); blank[locale]['about.privacy'] = '';
    assert.throws(() => validateCatalogs(blank), /Missing message/);
    const mismatch = structuredClone(catalogs); mismatch[locale]['choice.person'] = 'No placeholder';
    assert.throws(() => validateCatalogs(mismatch), /Placeholder mismatch/);
  }
  assert.throws(() => message('ja', 'not-real'), /Unknown message/);
  assert.throws(() => message('ja', 'choice.person'), /arguments differ/);
});

test('locale precedence is explicit, saved, supported browser then English; Traditional is not Simplified', () => {
  assert.equal(resolveLocale({explicit:'ja-JP', saved:'en', languages:['zh-CN']}), 'ja');
  assert.equal(resolveLocale({saved:'zh-SG', languages:['ja']}), 'zh-Hans');
  assert.equal(resolveLocale({languages:['zh-TW','zh-Hant-CN','ja']}), 'ja');
  for (const tag of ['zh', 'zh-TW', 'zh-HK', 'zh-Hant', 'zh-Hant-CN']) assert.equal(supportedLocale(tag), null);
  assert.equal(resolveLocale({languages:['zh-TW']}), 'en');
  assert.equal(supportedLocale('zh-Hans-CN'), 'zh-Hans');
});

test('unavailable preference storage never blocks play and stores only the supported locale', () => {
  const failed = () => { throw new Error('disabled'); };
  assert.deepEqual(readPreference(failed), {locale:null, available:false});
  assert.equal(savePreference(failed, 'ja'), false);
  const writes = [], storage = () => ({setItem: (key,value) => writes.push([key,value]), getItem: () => 'zh-Hans'});
  assert.equal(savePreference(storage, 'ja'), true);
  assert.equal(savePreference(storage, 'private guess'), false);
  assert.deepEqual(writes, [[LOCALE_KEY,'ja']]);
  assert.equal(readPreference(storage).locale, 'zh-Hans');
});

test('limits keep combining text, surrogate pairs, flags and family emoji intact', () => {
  const units = ['か\u3099', '👩🏽‍🚀', '👨‍👩‍👧‍👦', '🇯🇵', '中'];
  assert.deepEqual(graphemes(units.join('')), units);
  assert.equal(graphemes(limitText(units.join('').repeat(30))).length, 120);
  assert.equal(limitText('日'.repeat(120)+'本'), '日'.repeat(120));
  assert.deepEqual(wrappedLines('日本語\n中文', 2), ['日本','語','中文']);
  assert.deepEqual(wrappedLines('甲乙。丙', 2), ['甲乙。','丙']);
  assert.deepEqual(wrappedLines('甲「乙丙', 2), ['甲','「乙','丙']);
});

test('scene and choice IDs remain identical and rule outcomes independent of locale', () => {
  const ids = scenes => scenes.map(s => [s.id, s.choices.map(c => c.id)]);
  for (const locale of LOCALES) {
    assert.deepEqual(ids(scenesFor(locale)), ids(scenesFor('en')));
    for (const [sceneIndex, scene] of scenesFor(locale).entries()) {
      let state = {...begin(fresh(), 'pair'), sceneIndex, step:'choose-a'};
      state = seal(choose(choose(state, 'choice', scene.choices[0].id), 'guess', scene.choices[1].id));
      assert.equal(state.step,'pass-b'); assert.equal(state.choice,null);
      assert(!view(state, 'date', locale).includes(scene.choices[0].label));
      state = {...state, step:'choose-b'};
      state = seal(choose(choose(state, 'choice', scene.choices[2].id), 'guess', scene.choices[0].id));
      assert.equal(state.step,'together'); assert.equal(state.answers.length,2);
    }
  }
});

test('two optional localized contributions export escaped text without private guesses', () => {
  for (const locale of LOCALES) {
    let state = {...fresh(),step:'write-a', answers:[{choice:'secret-one',guess:'private-guess'},{choice:'secret-two',guess:'private-other'}]};
    const personal = '<記憶 & "思い出"> 👩🏽‍🚀';
    state = sealLine(state, personal, locale);
    assert.equal(state.step,'pass-write-b');
    assert(!view(state,'date',locale).includes(personal));
    state = sealLine({...state,step:'write-b'},'',locale);
    assert.equal(state.lines[0], personal); assert.equal(state.lines[1],message(locale,'write.fallback'));
    const svg = keepsakeSvg(state, 'date', locale);
    assert(svg.includes('&lt;記憶 &amp; &quot;思い出&quot;&gt;'));
    assert(!svg.includes('private-guess')); assert(!svg.includes('secret-one')); assert(!svg.includes('<script'));
    assert(svg.includes(`xml:lang="${locale}"`));
    assert(svg.includes(message(locale,'keepsake.pair')));
    assert(keepsakeSvg({...state,mode:'solo'},'date',locale).includes(message(locale,'keepsake.solo')));
  }
});

test('long CJK contributions grow the SVG instead of overlapping the next person or footer', () => {
  const svg=keepsakeSvg({...fresh(),step:'keepsake',lines:['漢'.repeat(120),'日'.repeat(120)]},'2026年11月6日','zh-Hans');
  assert(Number(svg.match(/height="(\d+)"/)[1]) > 850);
  const ys=[...svg.matchAll(/<text x="60" y="(\d+)"/g)].map(match=>Number(match[1]));
  assert(ys.every((y,i)=>i===0 || y>ys[i-1]));
});
