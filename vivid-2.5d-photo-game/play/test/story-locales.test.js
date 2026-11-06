import test from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, validateCatalogs } from '../src/i18n/core.js';
import { catalogs as ionaCatalogs } from '../src/stories/iona/catalogs.js';
import { catalogs as maraCatalogs } from '../src/stories/mara/catalogs.js';
import { createIonaPack } from '../src/stories/iona/index.js';
import { createMaraPack } from '../src/stories/mara/index.js';
import { defaultCast as ionaCast } from '../src/stories/iona/content.js';
import { defaultCast as maraCast } from '../src/stories/mara/content.js';
import { getCatalog } from '../src/stories/catalog.js';
import { validatePack, validateViewModel } from '../src/runtime/validate.js';

const rescue = [
  { type: 'START' }, { type: 'SIGNAL' },
  { type: 'INSPECT', id: 'ledger' }, // Wrong view must not unlock a clue.
  { type: 'VIEW', value: -1 }, { type: 'INSPECT', id: 'ledger' },
  { type: 'VIEW', value: 1 }, { type: 'INSPECT', id: 'plate' },
  { type: 'INSPECT', id: 'letter' },
  { type: 'SET_BEARING', value: 'west' }, { type: 'SET_RHYTHM', value: 'sls' },
  { type: 'SIGNAL' }, { type: 'SET_BEARING', value: 'east' }, { type: 'SIGNAL' },
];
const recollect = [
  { type: 'BEGIN_RECOLLECTION' },
  { type: 'PLACE_WEDGE', destination: 'notch' }, // No success before bracing.
  { type: 'BRACE' }, { type: 'PLACE_WEDGE', destination: 'harbour-edge' },
  { type: 'PLACE_WEDGE', destination: 'notch' }, { type: 'FINISH_RECOLLECTION' },
];
const semanticActions = vm => vm.actions.map(({ id, kind, event, disabled, selected, value, min, max, step }) =>
  ({ id, kind, event, disabled, selected, value, min, max, step }));
function compareJourney(factory, profile, events) {
  const packs = LOCALES.map(locale => factory({ locale }));
  let states = packs.map(pack => pack.createState({ profile }));
  for (const event of [null, ...events]) {
    if (event) states = packs.map((pack, i) => pack.reduce(states[i], event));
    const reference = packs[0].serialize(states[0]);
    const referenceView = packs[0].getViewModel(states[0]);
    packs.forEach((pack, i) => {
      const view = pack.getViewModel(states[i]);
      validateViewModel(view, pack.manifest);
      assert.deepEqual(pack.serialize(states[i]), reference, `${LOCALES[i]} semantic state after ${JSON.stringify(event)}`);
      assert.deepEqual(semanticActions(view), semanticActions(referenceView), `${LOCALES[i]} actions after ${JSON.stringify(event)}`);
      assert.equal(view.complete, referenceView.complete);
      assert.deepEqual(pack.serialize(pack.migrate({ version: 1, state: reference })), packs[0].serialize(packs[0].migrate({ version: 1, state: reference })));
      assert.doesNotMatch(JSON.stringify(reference), /[\u3040-\u30ff\u3400-\u9fff]/, 'translations must not enter semantic saves');
    });
  }
  return { packs, states };
}

test('both story resource sets have exact locale/key/placeholder parity and reject damaged translations', () => {
  for (const catalogs of [ionaCatalogs, maraCatalogs]) {
    assert.equal(validateCatalogs(catalogs), Object.keys(catalogs.en).length);
    const missing = structuredClone(catalogs);
    delete missing.ja.welcome;
    assert.throws(() => validateCatalogs(missing));
    const placeholder = structuredClone(catalogs);
    placeholder['zh-Hans'].welcome = placeholder['zh-Hans'].welcome.replace('{name}', '{wrongName}');
    assert.throws(() => validateCatalogs(placeholder));
  }
});

test('localized catalog entries keep story IDs/profiles/assets and match their packs', async () => {
  for (const locale of LOCALES) {
    const entries = getCatalog(locale);
    assert.deepEqual(entries.map(entry => entry.id), ['iona', 'mara']);
    for (const entry of entries) {
      const { pack } = await entry.load();
      validatePack(pack);
      for (const field of ['title', 'subtitle', 'description', 'duration']) assert.equal(entry[field], pack.manifest[field]);
      assert.equal(pack.manifest.id, entry.id);
      assert.equal(pack.manifest.releaseProfile, entry.id === 'iona' ? 'iona-return-v1' : 'mara-object-v1');
      for (const state of pack.validationStates()) validateViewModel(pack.getViewModel(state), pack.manifest);
      if (locale !== 'en') {
        assert.match(pack.manifest.title, /[\u3040-\u30ff\u3400-\u9fff]/);
        for (const asset of pack.manifest.assets) assert.match(asset.alt, /[\u3040-\u30ff\u3400-\u9fff]/);
      }
    }
  }
});

for (const profile of ['remembered', 'neutral']) for (const choice of ['private', 'archive']) {
  test(`all locales retain Iona agency, privacy and complete endpoint: ${profile}/${choice}`, () => {
    const object = profile === 'neutral' ? 'cloth' : choice === 'private' ? 'letter' : 'dedication';
    const destination = { cloth: 'peg', letter: 'recess', dedication: 'harbour-edge' }[object];
    const events = [...rescue, ...recollect, { type: 'INSPECT', id: 'letter' }, { type: 'REMEMBER', value: choice }, { type: 'RETURN' }];
    const before = compareJourney(createIonaPack, profile, events);
    before.packs.forEach((pack, i) => {
      assert.equal(pack.getViewModel(before.states[i]).complete, false);
      assert.equal(before.states[i].letterPublished, false, 'public dedication must never publish the private letter');
      assert.equal(before.states[i].peeked, true);
      if (profile === 'remembered') assert.ok(pack.getViewModel(before.states[i]).choiceSummary);
      else assert.equal(pack.getViewModel(before.states[i]).choiceSummary, undefined);
    });
    const after = compareJourney(createIonaPack, profile, [...events,
      { type: 'PLACE_MEMORY', object, destination: 'wrong-place' },
      { type: 'PLACE_MEMORY', object, destination },
    ]);
    after.packs.forEach((pack, i) => {
      assert.equal(pack.getViewModel(after.states[i]).complete, true);
      assert.equal(after.states[i].placement, object);
    });
  });
}

for (const profile of ['remembered', 'neutral']) for (const interpretation of ['repair', 'meet', 'unfinished']) {
  test(`all locales retain Mara reversible alignment and legitimate ending: ${profile}/${interpretation}`, () => {
    const events = [
      { type: 'START' }, { type: 'ALIGN', value: 3 }, { type: 'REVEAL' },
      { type: 'INSPECT', id: 'sketches' }, { type: 'ALIGN', value: 2 }, { type: 'ALIGN', value: 1 },
      { type: 'INSPECT', id: 'timetable' }, { type: 'INSPECT', id: 'postcard' }, { type: 'REVEAL' },
      { type: 'ALIGN', value: 3 }, { type: 'REVEAL' },
    ];
    const before = compareJourney(createMaraPack, profile, events);
    before.packs.forEach((pack, i) => assert.equal(pack.getViewModel(before.states[i]).complete, false));
    const after = compareJourney(createMaraPack, profile, [...events, { type: 'INTERPRET', value: interpretation }]);
    after.packs.forEach((pack, i) => assert.equal(pack.getViewModel(after.states[i]).complete, true));
  });
}

test('checkpoints reopen under another language without translating identity or legacy publication history', () => {
  for (const fromLocale of LOCALES) for (const toLocale of LOCALES) {
    const from = createIonaPack({ locale: fromLocale });
    const to = createIonaPack({ locale: toLocale });
    const entered = [...rescue, ...recollect.slice(0, 3)].reduce((state, event) => from.reduce(state, event), from.createState());
    assert.equal(entered.recollectionStage, 'braced');
    const restored = to.migrate({ version: 1, state: from.serialize(entered) });
    assert.equal(restored.recollectionStage, 'braced');
    assert.deepEqual(to.serialize(restored), from.serialize(entered));
    assert.equal(to.getViewModel(restored).actions[0].id, 'wedge');
    assert.equal(to.getViewModel(restored).complete, false);
    const legacy = to.migrateLegacy({ version: 1, choice: 'archive', peeked: true });
    assert.equal(legacy.letterPublished, true);
    assert.equal(legacy.legacy, true);
    assert.ok(to.getViewModel(legacy).choiceSummary);
    assert.deepEqual(to.serialize(legacy), from.serialize(from.migrateLegacy({ version: 1, choice: 'archive', peeked: true })));
  }
});

test('recast protagonists keep supplied names, local descriptions and locale-specific grammar', () => {
  const descriptions = { en: 'Eris in a green coat.', ja: '緑の上着を着たエリス。', 'zh-Hans': '穿绿外套的埃里斯。' };
  for (const locale of LOCALES) {
    const iona = createIonaPack({ locale, cast: { keeper: { ...ionaCast.keeper, name: 'Eris', description: descriptions.en, descriptions } } });
    assert.equal(iona.manifest.id, 'iona');
    assert.equal(iona.manifest.cast.keeper.name, 'Eris');
    assert.equal(iona.manifest.assets[0].alt, descriptions[locale]);
    assert.match(iona.getViewModel(iona.createState()).text, /Eris/);
    const mara = createMaraPack({ locale, cast: { painter: { ...maraCast.painter, name: 'Sora', subject: 'they', description: descriptions.en, descriptions, subjects: { ja: 'その人', 'zh-Hans': '这位画师' } } } });
    const text = mara.getViewModel(mara.createState()).text;
    assert.match(text, /Sora/);
    assert.equal(mara.manifest.cast.painter.description, descriptions[locale]);
    if (locale === 'en') {
      assert.match(text, /What were they making\?/);
      assert.match(createMaraPack().getViewModel(createMaraPack().createState()).text, /What was she making\?/);
    }
    else assert.doesNotMatch(text, /\b(?:she|they|her|their)\b/);
  }
  assert.throws(() => createIonaPack({ locale: 'ja', cast: { keeper: { name: 'Eris', description: 'Only English' } } }), /authored description for ja/);
});
