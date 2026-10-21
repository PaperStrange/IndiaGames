import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, saveKey } from '../src/runtime/session.js';
import { validatePack, validateViewModel, assertSerializable, loadStory, isLocalAssetPath } from '../src/runtime/validate.js';
import { pack as iona } from '../src/stories/iona/index.js';
import { pack as mara } from '../src/stories/mara/index.js';
import { recastPack } from '../src/stories/fixtures/recast.js';

const LEGACY_MEMORY_KEY = 'keepers-frame:v1';
const legacyImport = { key: LEGACY_MEMORY_KEY, profiles: ['remembered'], version: 1 };

const manifest = {
  id: 'fixture', revision: 1, saveVersion: 1,
  title: 'A test room', subtitle: 'A small fixture', description: 'Only used by automated checks.',
  duration: 'A few actions', releaseProfile: 'test-only',
  cast: { host: { name: 'Aster', pronouns: 'they/them', description: 'The host of this test room.' } },
  assets: [], capabilities: ['choose'],
};

function fixturePack(overrides = {}) {
  return {
    manifest,
    createState: ({ profile = 'remembered' } = {}) => ({ profile, visits: 0, view: 0 }),
    reduce(state, event) {
      if (event.type === 'VISIT') return { ...state, visits: state.visits + 1 };
      if (event.type === 'VIEW' && [-1, 0, 1].includes(event.value)) return { ...state, view: event.value };
      return state;
    },
    getViewModel(state) {
      return {
        title: 'A test room', kicker: 'A small fixture', text: `Visit ${state.visits}`, speaker: 'Aster',
        phase: 'room', progress: String(state.visits),
        scene: { kind: 'portrait', actorId: 'host', view: state.view, light: 'low', placement: null, details: [] },
        actions: [{ id: 'visit', label: 'Visit the room', kind: 'choose', event: { type: 'VISIT' } }],
      };
    },
    serialize: ({ profile, visits }) => ({ profile, visits }),
    migrate({ version, state }) {
      if (version !== 1 || !state || !['remembered', 'neutral'].includes(state.profile)
          || !Number.isSafeInteger(state.visits) || state.visits < 0) throw new Error('Malformed fixture state');
      return { profile: state.profile, visits: state.visits, view: 0 };
    },
    ...overrides,
  };
}

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  const writes = [];
  return {
    values, writes,
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => { values.set(key, value); writes.push([key, value]); },
    removeItem: key => values.delete(key),
  };
}

function record(state = { profile: 'remembered', visits: 3 }, overrides = {}) {
  return JSON.stringify({ schemaVersion: 1, storyId: 'fixture', contentRevision: 1,
    storySaveVersion: 1, profile: 'remembered', state, ...overrides });
}

test('semantic checkpoints resume while camera orientation resets', () => {
  const storage = memoryStorage();
  const first = createSession({ pack: fixturePack(), storage });
  first.dispatch({ type: 'VISIT' });
  first.dispatch({ type: 'VIEW', value: -1 });
  const saved = JSON.parse(storage.getItem(first.key));
  assert.deepEqual(saved.state, { profile: 'remembered', visits: 1 });
  assert.equal(saved.storyId, 'fixture');
  assert.equal(saved.contentRevision, 1);
  const resumed = createSession({ pack: fixturePack(), storage });
  assert.deepEqual(resumed.getState(), { profile: 'remembered', visits: 1, view: 0 });
});

test('stories and study profiles own independent records', () => {
  const storage = memoryStorage();
  const remembered = createSession({ pack: fixturePack(), storage });
  const neutral = createSession({ pack: fixturePack(), profile: 'neutral', storage });
  const other = createSession({ pack: fixturePack({ manifest: { ...manifest, id: 'other' } }), storage });
  remembered.dispatch({ type: 'VISIT' });
  remembered.dispatch({ type: 'VISIT' });
  neutral.dispatch({ type: 'VISIT' });
  other.dispatch({ type: 'VISIT' });
  remembered.reset();
  assert.equal(neutral.getState().visits, 1);
  assert.equal(other.getState().visits, 1);
  assert.equal(JSON.parse(storage.getItem(neutral.key)).state.visits, 1);
  assert.equal(JSON.parse(storage.getItem(other.key)).state.visits, 1);
  assert.equal(remembered.getState().visits, 0);
});

test('alternate scene labels survive normal play and save recovery without another story setting', () => {
  const base = fixturePack();
  const pack = fixturePack({
    getViewModel(state) {
      const vm = base.getViewModel(state);
      return { ...vm, scene: { ...vm.scene, kind: 'workbench', actorId: null,
        caption: state.visits ? 'Winter remembered · the last rehearsal' : 'A paper theatre at dusk',
        descriptionLabel: 'A miniature theatre stage with folded scenery' } };
    },
  });
  const storage = memoryStorage();
  const first = createSession({ pack, storage });
  assert.equal(pack.getViewModel(first.getState()).scene.caption, 'A paper theatre at dusk');
  first.dispatch({ type: 'VISIT' });
  first.dispose();
  const restored = createSession({ pack, storage });
  const scene = pack.getViewModel(restored.getState()).scene;
  assert.equal(scene.caption, 'Winter remembered · the last rehearsal');
  assert.equal(scene.descriptionLabel, 'A miniature theatre stage with folded scenery');
  assert.doesNotMatch(JSON.stringify(scene), /Iona|Mara|station|earlier watch/i);
  const vm = pack.getViewModel(restored.getState());
  for (const key of ['caption', 'descriptionLabel']) {
    for (const value of ['', '  ', null, { text: 'not a label' }]) {
      assert.throws(() => validateViewModel({ ...vm, scene: { ...scene, [key]: value } }, manifest), /readable text/);
    }
  }
});

test('shipped story captions and accessible labels remain authored in their packs', () => {
  const recollection = iona.validationStates().find(state => state.phase === 'recollection');
  const flashback = iona.getViewModel(recollection);
  assert.equal(flashback.scene.caption, 'An earlier watch · a recollection');
  assert.equal(flashback.scene.descriptionLabel, 'A framed painted portrait');
  assert.equal(iona.getViewModel(iona.createState()).scene.caption, iona.manifest.subtitle);
  const workbench = mara.getViewModel(mara.createState());
  assert.equal(workbench.scene.caption, mara.manifest.subtitle);
  assert.equal(workbench.scene.descriptionLabel, 'A station workbench and lightbox');
});

test('future save schema, content revision, and story version are preserved during play', () => {
  for (const field of ['schemaVersion', 'contentRevision', 'storySaveVersion']) {
    const original = record(undefined, { [field]: 7 });
    const storage = memoryStorage({ [saveKey('fixture')]: original });
    const session = createSession({ pack: fixturePack(), storage });
    assert.equal(session.status.kind, 'future', field);
    session.dispatch({ type: 'VISIT' });
    assert.equal(session.getState().visits, 1);
    assert.equal(storage.getItem(session.key), original);
    assert.equal(storage.writes.length, 0);
    assert.equal(session.recover(), true);
    assert.equal(session.status.kind, 'ok');
    assert.equal(JSON.parse(storage.getItem(session.key)).state.visits, 1);
  }
});

test('malformed records remain untouched until explicit reset', () => {
  for (const original of ['{broken', 'null', '[]', record({ profile: 'remembered', visits: -1 }),
    record(undefined, { storyId: 'wrong' }), record({ profile: 'neutral', visits: 1 }),
    record(undefined, { schemaVersion: 0 })]) {
    const storage = memoryStorage({ [saveKey('fixture')]: original });
    const session = createSession({ pack: fixturePack(), storage });
    assert.equal(session.status.kind, 'corrupt');
    session.dispatch({ type: 'VISIT' });
    assert.equal(storage.getItem(session.key), original);
    assert.equal(session.reset(), true);
    assert.equal(session.status.kind, 'ok');
    assert.equal(JSON.parse(storage.getItem(session.key)).state.visits, 0);
  }
});

test('unreadable storage never gets overwritten by a normal dispatch', () => {
  let writes = 0;
  const storage = {
    getItem() { throw new Error('Denied'); },
    setItem() { writes += 1; },
    removeItem() {},
  };
  const session = createSession({ pack: fixturePack(), storage });
  session.dispatch({ type: 'VISIT' });
  assert.equal(session.status.kind, 'unavailable');
  assert.equal(session.getState().visits, 1);
  assert.equal(writes, 0);
  assert.equal(session.recover(), true);
  assert.equal(writes, 1);
});

test('blocked or full storage keeps the active story playable', () => {
  for (const storage of [null, {}, {
    getItem: () => null,
    setItem() { throw new Error('Quota exceeded'); },
    removeItem() { throw new Error('Denied'); },
  }]) {
    const session = createSession({ pack: fixturePack(), storage });
    session.dispatch({ type: 'VISIT' });
    assert.equal(session.getState().visits, 1);
    assert.equal(session.status.kind, 'unavailable');
    assert.equal(session.reset(), false);
    assert.equal(session.getState().visits, 0);
  }
});

test('external state mutation, invalid events, disposed sessions, and old listeners cannot change a checkpoint', () => {
  const storage = memoryStorage();
  const session = createSession({ pack: fixturePack(), storage });
  let notifications = 0;
  const off = session.subscribe(state => { notifications += 1; state.visits = 999; });
  session.getState().visits = 999;
  session.dispatch(null);
  session.dispatch({});
  session.dispatch({ type: 'UNKNOWN' });
  session.dispatch({ type: 'VIEW', value: NaN });
  session.dispatch({ type: 'VISIT', callback: () => {} });
  assert.equal(notifications, 0);
  session.dispatch({ type: 'VISIT' });
  assert.equal(session.getState().visits, 1);
  assert.equal(notifications, 1);
  off();
  session.dispatch({ type: 'VISIT' });
  assert.equal(notifications, 1);
  session.dispose();
  const original = storage.getItem(session.key);
  session.dispatch({ type: 'VISIT' });
  assert.equal(session.reset(), false);
  assert.equal(session.recover(), false);
  assert.equal(session.getState().visits, 2);
  assert.equal(storage.getItem(session.key), original);
});

test('legacy memory is only imported by the remembered Iona profile and explicit reset prevents resurrection', () => {
  const legacy = JSON.stringify({ version: 1, choice: 'archive', peeked: true });
  const storage = memoryStorage({ [LEGACY_MEMORY_KEY]: legacy });
  const pack = fixturePack({
    manifest: { ...manifest, id: 'iona' },
    legacyImport,
    migrateLegacy: (_value, { profile }) => ({ profile, visits: 12, view: 0 }),
  });
  const remembered = createSession({ pack, storage });
  assert.equal(remembered.getState().visits, 12);
  assert.equal(storage.getItem(LEGACY_MEMORY_KEY), legacy);
  assert.equal(createSession({ pack, profile: 'neutral', storage }).getState().visits, 0);
  assert.equal(createSession({ pack: fixturePack(), storage }).getState().visits, 0);
  assert.equal(remembered.reset(), true);
  assert.equal(storage.getItem(LEGACY_MEMORY_KEY), null);
  storage.setItem(LEGACY_MEMORY_KEY, legacy);
  assert.equal(createSession({ pack, storage }).getState().visits, 0);
});

test('future legacy memory is preserved rather than interpreted as current memory', () => {
  const original = JSON.stringify({ version: 9, choice: 'archive' });
  const storage = memoryStorage({ [LEGACY_MEMORY_KEY]: original });
  const pack = fixturePack({ manifest: { ...manifest, id: 'iona' }, legacyImport, migrateLegacy: () => { throw new Error('Must not run'); } });
  const session = createSession({ pack, storage });
  assert.equal(session.status.kind, 'future');
  session.dispatch({ type: 'VISIT' });
  assert.equal(storage.getItem(LEGACY_MEMORY_KEY), original);
  assert.equal(storage.getItem(session.key), null);
});

test('story loading validates lazy imports and keeps failures explicit for gallery recovery', async () => {
  const pack = fixturePack();
  assert.equal(await loadStory({ id: 'fixture', load: async () => ({ pack }) }), pack);
  await assert.rejects(loadStory({ id: 'other', load: async () => ({ pack }) }), /differs/);
  await assert.rejects(loadStory({ id: 'fixture', load: async () => { throw new Error('Network failed'); } }), /Network failed/);
  await assert.rejects(loadStory({ id: 'fixture', load: async () => ({}) }), /export pack/);
});

test('pack validation catches missing methods, actors, accessible actions, and asset references', () => {
  const pack = fixturePack();
  assert.equal(validatePack(pack), pack);
  assert.throws(() => validatePack({ ...pack, reduce: undefined }), /missing reduce/);
  const vm = pack.getViewModel(pack.createState());
  assert.throws(() => validateViewModel({ ...vm, scene: { ...vm.scene, actorId: 'missing' } }, manifest), /unknown actor/);
  assert.throws(() => validateViewModel({ ...vm, scene: { ...vm.scene, assetIds: ['missing'] } }, manifest), /unknown asset/);
  assert.throws(() => validateViewModel({ ...vm, actions: [{ ...vm.actions[0], label: '' }] }, manifest), /accessible label/);
  assert.throws(() => validateViewModel({ ...vm, actions: [...vm.actions, vm.actions[0]] }, manifest), /Duplicate action/);
  assert.throws(() => validatePack({ ...pack, manifest: { ...manifest, capabilities: ['drag-only'] } }), /accessible runtime/);
  assert.throws(() => validatePack({ ...pack, manifest: { ...manifest,
    cast: { host: { ...manifest.cast.host, portrait: 'https://example.com/portrait.svg' } } } }), /local public-relative/);
  assert.throws(() => validatePack({ ...pack, manifest: { ...manifest,
    cast: { host: { ...manifest.cast.host, portrait: 'art/undeclared.svg' } } } }), /declared in manifest.assets/);
  const placement = { id: 'put', label: 'Put object away', kind: 'place', event: { type: 'PUT' } };
  assert.throws(() => validateViewModel({ ...vm, actions: [placement] }, { ...manifest, capabilities: ['place'] }), /object and destination labels/);
  const adjustment = { id: 'turn', label: 'Turn a dial', kind: 'adjust', event: { type: 'TURN' }, min: 0, max: 10, step: 1, value: 11 };
  assert.throws(() => validateViewModel({ ...vm, actions: [adjustment] }, { ...manifest, capabilities: ['adjust'] }), /valid accessible range/);
});

test('JSON and local-asset validation rejects values or locations that cannot be shipped faithfully', () => {
  for (const src of ['https://example.com/a.svg', '/art/a.svg', '../a.svg', 'art/%2e%2e/a.svg', 'art\\a.svg', 'art/a.svg?v=1']) {
    assert.equal(isLocalAssetPath(src), false, src);
  }
  assert.equal(isLocalAssetPath('art/painted-frame.svg'), true);
  for (const value of [{ bad: undefined }, { bad: Infinity }, { bad: () => {} }, new Date(), [1, , 3]]) {
    assert.throws(() => assertSerializable(value));
  }
  const cycle = {}; cycle.self = cycle;
  assert.throws(() => assertSerializable(cycle), /cycles/);
});

const rescueEvents = [
  { type: 'START' }, { type: 'VIEW', value: -1 }, { type: 'INSPECT', id: 'ledger' },
  { type: 'VIEW', value: 1 }, { type: 'INSPECT', id: 'plate' },
  { type: 'SET_BEARING', value: 'east' }, { type: 'SET_RHYTHM', value: 'sls' }, { type: 'SIGNAL' },
];

test('Iona checkpoints resume the braced recollection, then preserve both kinds of return placement', () => {
  for (const choice of ['private', 'archive']) {
    const storage = memoryStorage();
    let session = createSession({ pack: iona, storage });
    for (const event of [...rescueEvents, { type: 'BEGIN_RECOLLECTION' }, { type: 'BRACE' }]) session.dispatch(event);
    session.dispose();
    session = createSession({ pack: iona, storage });
    assert.equal(session.getState().phase, 'recollection');
    assert.equal(session.getState().recollectionStage, 'braced');
    session.dispatch({ type: 'PLACE_WEDGE', destination: 'notch' });
    session.dispatch({ type: 'FINISH_RECOLLECTION' });
    session.dispatch({ type: 'REMEMBER', value: choice });
    session.dispose();
    session = createSession({ pack: iona, storage });
    assert.equal(session.getState().phase, 'return', 'completed stories do not replay the ferry');
    assert.equal(session.getState().letterPublished, false, 'new archive choice approves only a dedication');
    const object = choice === 'private' ? 'letter' : 'dedication';
    const destination = choice === 'private' ? 'recess' : 'harbour-edge';
    session.dispatch({ type: 'PLACE_MEMORY', object, destination });
    session.dispose();
    session = createSession({ pack: iona, storage });
    assert.equal(session.getState().placement, object);
    assert.equal(iona.getViewModel(session.getState()).complete, true);
  }
});

test('real legacy archive memory remains truthful and is never imported by Mara or the neutral profile', () => {
  const legacy = JSON.stringify({ version: 1, choice: 'archive', peeked: true, visits: 3 });
  const storage = memoryStorage({ [LEGACY_MEMORY_KEY]: legacy });
  const session = createSession({ pack: iona, storage });
  assert.equal(session.getState().phase, 'return');
  assert.equal(session.getState().letterPublished, true);
  assert.match(iona.getViewModel(session.getState()).text, /already public/);
  assert.match(iona.getViewModel(session.getState()).text, /before I had said yes/);
  assert.equal(createSession({ pack: iona, profile: 'neutral', storage }).getState().phase, 'intro');
  assert.equal(createSession({ pack: mara, storage }).getState().phase, 'intro');
  session.dispatch({ type: 'BEGIN_RECOLLECTION' });
  assert.equal(storage.getItem(LEGACY_MEMORY_KEY), legacy);
  assert.equal(createSession({ pack: iona, storage }).getState().recollectionFromReturn, true);
});

test('Mara keeps independent investigation and completed-image checkpoints through story switching', () => {
  const storage = memoryStorage();
  let session = createSession({ pack: mara, storage });
  session.dispatch({ type: 'START' });
  session.dispatch({ type: 'INSPECT', id: 'sketches' });
  session.dispatch({ type: 'ALIGN', value: 2 });
  session.dispose();
  const other = createSession({ pack: iona, storage });
  other.dispatch({ type: 'START' });
  other.dispose();
  session = createSession({ pack: mara, storage });
  assert.deepEqual(session.getState().inspected, ['sketches']);
  assert.equal(session.getState().alignment, 2);
  for (const event of [{ type: 'INSPECT', id: 'postcard' }, { type: 'INSPECT', id: 'timetable' },
    { type: 'ALIGN', value: 3 }, { type: 'REVEAL' }, { type: 'INTERPRET', value: 'meet' }]) session.dispatch(event);
  session.dispose();
  session = createSession({ pack: mara, storage });
  assert.equal(session.getState().phase, 'end');
  assert.equal(session.getState().interpretation, 'meet');
  assert.equal(createSession({ pack: iona, storage }).getState().phase, 'explore');
});

test('an actor can be replaced without engine changes or inheriting another character’s memory', () => {
  const storage = memoryStorage({ [LEGACY_MEMORY_KEY]: JSON.stringify({ version: 1, choice: 'private' }) });
  const session = createSession({ pack: recastPack, storage });
  assert.equal(session.getState().phase, 'intro');
  const view = recastPack.getViewModel(session.getState());
  assert.match(view.text, /Eris/);
  assert.doesNotMatch(view.text, /Iona/);
  assert.equal(view.speaker, 'Eris');
  session.dispatch({ type: 'START' });
  assert.equal(session.key, 'vivid:save:recast-fixture:remembered');
  assert.equal(storage.getItem(saveKey('iona')), null);
});
