import test from 'node:test';
import assert from 'node:assert/strict';
import { pack as iona } from '../src/stories/iona/index.js';
import { pack as mara } from '../src/stories/mara/index.js';
import { recastPack } from '../src/stories/fixtures/recast.js';
import { catalog } from '../src/stories/catalog.js';

const run = (pack, state, events) => events.reduce((s, event) => pack.reduce(s, event), state);
const rescueEvents = [
  { type: 'START' }, { type: 'VIEW', value: -1 }, { type: 'INSPECT', id: 'ledger' },
  { type: 'VIEW', value: 1 }, { type: 'INSPECT', id: 'plate' },
  { type: 'SET_BEARING', value: 'east' }, { type: 'SET_RHYTHM', value: 'sls' }, { type: 'SIGNAL' },
];
const recollectEvents = [
  { type: 'BEGIN_RECOLLECTION' }, { type: 'BRACE' }, { type: 'PLACE_WEDGE', destination: 'notch' }, { type: 'FINISH_RECOLLECTION' },
];
const returnEvents = choice => [{ type: 'REMEMBER', value: choice }, { type: 'RETURN' }];
const placementEvent = (choice, profile = 'remembered') => profile === 'neutral' ?
  { type: 'PLACE_MEMORY', object: 'cloth', destination: 'peg' } : choice === 'private' ?
    { type: 'PLACE_MEMORY', object: 'letter', destination: 'recess' } :
    { type: 'PLACE_MEMORY', object: 'dedication', destination: 'harbour-edge' };
const restore = (pack, state) => pack.migrate({ version: 1, state: JSON.parse(JSON.stringify(pack.serialize(state))) });
const inspectMara = order => [{ type: 'START' }, ...order.map(id => ({ type: 'INSPECT', id }))];

test('catalog ships two stories, never the recast fixture', async () => {
  assert.deepEqual(catalog.map(c => c.id), ['iona', 'mara']);
  for (const entry of catalog) assert.equal((await entry.load()).pack.manifest.id, entry.id);
});

test('Iona rescue requires spatial evidence and correct signal; every error is recoverable', () => {
  let s = iona.reduce(iona.createState(), { type: 'START' });
  const noClue = iona.reduce(s, { type: 'INSPECT', id: 'ledger' });
  assert.equal(noClue, s);
  s = run(iona, s, [{ type: 'SET_BEARING', value: 'east' }, { type: 'SET_RHYTHM', value: 'sls' }, { type: 'SIGNAL' }]);
  assert.equal(s.phase, 'explore'); assert.match(s.feedback, /both harbour marks/);
  s = run(iona, s, rescueEvents.slice(1, 5));
  s = run(iona, s, [{ type: 'SET_BEARING', value: 'west' }, { type: 'SIGNAL' }]);
  assert.equal(s.phase, 'explore'); assert.match(s.feedback, /try again/);
  s = run(iona, s, [{ type: 'SET_BEARING', value: 'east' }, { type: 'SIGNAL' }]);
  assert.equal(s.phase, 'rescued'); assert.equal(s.attempts, 3);
});

test('recollection latches brace, rejects out-of-order or wrong placement and resumes each checkpoint', () => {
  let s = run(iona, iona.createState(), rescueEvents);
  assert.equal(iona.reduce(s, { type: 'REMEMBER', value: 'private' }), s);
  s = iona.reduce(s, { type: 'BEGIN_RECOLLECTION' });
  assert.equal(iona.reduce(s, { type: 'PLACE_WEDGE', destination: 'notch' }), s);
  assert.equal(iona.reduce(s, { type: 'FINISH_RECOLLECTION' }), s);
  s = restore(iona, s);
  assert.equal(s.recollectionStage, 'entered');
  s = iona.reduce(s, { type: 'BRACE' });
  assert.equal(iona.reduce(s, { type: 'BRACE' }), s);
  assert.equal(iona.reduce(s, { type: 'PLACE_WEDGE', destination: 'harbour-edge' }), s);
  s = restore(iona, s);
  assert.equal(s.recollectionStage, 'braced');
  assert.equal(iona.getViewModel(s).scene.notchBraced, true);
  s = iona.reduce(s, { type: 'PLACE_WEDGE', destination: 'notch' });
  assert.equal(iona.reduce(s, { type: 'PLACE_WEDGE', destination: 'notch' }), s);
  s = restore(iona, s);
  assert.equal(iona.getViewModel(s).scene.light, 'steady');
  s = iona.reduce(s, { type: 'FINISH_RECOLLECTION' });
  assert.equal(s.phase, 'choice');
});

for (const choice of ['private', 'archive']) for (const peeked of [false, true]) for (const profile of ['remembered', 'neutral']) {
  test(`Iona ${choice}, peek=${peeked}, profile=${profile}: choice, persistent return and valid privacy`, () => {
    let s = iona.createState({ profile });
    s = run(iona, s, rescueEvents.slice(0, 5));
    if (peeked) s = iona.reduce(s, { type: 'INSPECT', id: 'letter' });
    s = run(iona, s, [...rescueEvents.slice(5), ...recollectEvents]);
    assert.equal(s.phase, 'choice');
    s = iona.reduce(s, { type: 'REMEMBER', value: choice });
    const end = iona.getViewModel(s);
    assert.equal(end.text.includes('read before'), peeked);
    assert.equal(s.letterPublished, false);
    s = restore(iona, s); // reload an ending goes directly to return
    assert.equal(s.phase, 'return');
    assert.equal(s.choice, choice);
    assert.equal(iona.reduce(s, { type: 'START' }), s);
    assert.equal(iona.reduce(s, { type: 'SIGNAL' }), s);
    assert.equal(iona.reduce(s, { ...placementEvent(choice, profile), destination: 'wrong' }), s);
    if (profile === 'neutral') {
      const vm = iona.getViewModel(s);
      assert.equal(vm.choiceSummary, undefined);
      assert.match(vm.text, /cleaning the lamp/);
      assert.doesNotMatch(vm.text, /private|dedication|letter|before I/);
    }
    s = iona.reduce(s, placementEvent(choice, profile));
    assert.equal(iona.getViewModel(s).complete, true);
    assert.equal(iona.reduce(s, placementEvent(choice, profile)), s);
    assert.deepEqual(restore(iona, s), s);
    if (profile === 'remembered') assert.equal(s.placement, choice === 'private' ? 'letter' : 'dedication');
  });
}

test('reading an offered letter does not retroactively count as an intrusion', () => {
  const choice = run(iona, iona.createState(), [...rescueEvents, ...recollectEvents]);
  const read = iona.reduce(choice, { type: 'INSPECT', id: 'letter' });
  assert.equal(read.peeked, false);
  assert.match(iona.getViewModel(read).inspection.text, /frightened every night/);
});

test('legacy archive preserves that the original letter was published; optional memory never repeats rescue', () => {
  let s = iona.migrateLegacy({ version: 1, choice: 'archive', peeked: true, visits: 4 });
  assert.equal(s.phase, 'return'); assert.equal(s.letterPublished, true);
  assert.match(iona.getViewModel(s).text, /already public/);
  assert.match(iona.getViewModel(s).choiceSummary, /original letter/);
  s = run(iona, s, recollectEvents);
  assert.equal(s.phase, 'return'); assert.equal(s.choice, 'archive');
  assert.equal(iona.getViewModel(s).actions.some(a => a.id === 'optional-recollection'), false);
  s = iona.reduce(s, placementEvent('archive'));
  assert.equal(restore(iona, s).letterPublished, true);
});

test('legacy private return can ignore optional recollection and place its letter immediately', () => {
  const s = iona.migrateLegacy({ version: 1, choice: 'private' });
  assert.equal(s.recollectionStage, 'unseen');
  const done = iona.reduce(s, placementEvent('private'));
  assert.equal(iona.getViewModel(done).complete, true);
  assert.equal(restore(iona, done).placement, 'letter');
});

test('only semantic fields survive saves; malformed and future Iona checkpoints reject', () => {
  const s = run(iona, iona.createState(), rescueEvents);
  const saved = iona.serialize({ ...s, view: -1, feedback: 'transient', cameraPixels: 123 });
  for (const key of ['view', 'feedback', 'inspection', 'cameraPixels']) assert.equal(Object.hasOwn(saved, key), false);
  for (const bad of [null, {}, { ...saved, clues: ['ledger', 'ledger'] }, { ...saved, phase: 'choice' }, { ...saved, attempts: NaN }, { ...saved, placement: 'cloth' }, { ...saved, letterPublished: true }]) {
    assert.throws(() => iona.migrate({ version: 1, state: bad }));
  }
  assert.throws(() => iona.migrate({ version: 2, state: saved }));
  assert.throws(() => iona.migrateLegacy({ version: 1, choice: 'public' }));
  const initial = iona.serialize(iona.createState());
  assert.throws(() => iona.migrate({ version: 1, state: { ...initial, choice: 'private' } }));
  const ended = iona.serialize(run(iona, iona.createState(), [...rescueEvents, ...recollectEvents, { type: 'REMEMBER', value: 'archive' }]));
  assert.throws(() => iona.migrate({ version: 1, state: { ...ended, recollectionStage: 'unseen' } }));
});

const orders = [
  ['timetable', 'postcard', 'sketches'], ['timetable', 'sketches', 'postcard'],
  ['postcard', 'timetable', 'sketches'], ['postcard', 'sketches', 'timetable'],
  ['sketches', 'timetable', 'postcard'], ['sketches', 'postcard', 'timetable'],
];
for (const order of orders) test(`Mara objects in any order: ${order.join(', ')}`, () => {
  let s = run(mara, mara.createState(), inspectMara(order));
  s = restore(mara, s);
  assert.deepEqual(s.inspected, order);
  s = run(mara, s, [{ type: 'ALIGN', value: 3 }, { type: 'REVEAL' }]);
  assert.equal(s.phase, 'reveal');
  assert.match(mara.getViewModel(s).text, /community workshop/);
  for (const interpretation of ['repair', 'meet', 'unfinished']) {
    const end = mara.reduce(s, { type: 'INTERPRET', value: interpretation });
    assert.equal(mara.getViewModel(end).complete, true);
    assert.equal(restore(mara, end).interpretation, interpretation);
  }
});

test('Mara alignment is reversible, gated by inspection, validates input and does not grant early completion', () => {
  let s = mara.reduce(mara.createState(), { type: 'START' });
  assert.equal(mara.reduce(s, { type: 'ALIGN', value: 3 }), s);
  s = mara.reduce(s, { type: 'INSPECT', id: 'sketches' });
  for (const value of [-1, 7, 2.5, '3', null, Infinity, NaN]) assert.equal(mara.reduce(s, { type: 'ALIGN', value }), s);
  s = mara.reduce(s, { type: 'ALIGN', value: 3 });
  s = mara.reduce(s, { type: 'REVEAL' });
  assert.equal(s.phase, 'investigate');
  s = mara.reduce(s, { type: 'ALIGN', value: 2 });
  assert.equal(restore(mara, s).alignment, 2);
  s = run(mara, s, [{ type: 'INSPECT', id: 'timetable' }, { type: 'INSPECT', id: 'postcard' }]);
  assert.equal(mara.getViewModel(s).actions.find(a => a.id === 'reveal').disabled, true);
  s = run(mara, s, [{ type: 'ALIGN', value: 3 }, { type: 'REVEAL' }]);
  assert.equal(mara.reduce(s, { type: 'REVEAL' }), s);
  assert.equal(mara.reduce(s, { type: 'INTERPRET', value: 'correct' }), s);
});

test('Mara malformed checkpoint rejected; reload retains facts without transient panels', () => {
  const s = run(mara, mara.createState(), inspectMara(orders[0]));
  assert.equal(restore(mara, s).inspection, null);
  const saved = mara.serialize({ ...s, cameraPixels: 120 });
  assert.equal(Object.hasOwn(saved, 'cameraPixels'), false);
  for (const bad of [null, {}, { ...saved, inspected: ['sketches', 'sketches'] }, { ...saved, phase: 'end' }, { ...saved, interpretation: 'repair' }, { ...saved, alignment: -1 }]) {
    assert.throws(() => mara.migrate({ version: 1, state: bad }));
  }
  assert.throws(() => mara.migrate({ version: 99, state: saved }));
  assert.throws(() => mara.migrate({ version: 1, state: { ...mara.serialize(mara.createState()), inspected: ['sketches'] } }));
});

test('replacement actor changes prose and accessible portrait description without shared-engine changes', () => {
  const s = run(recastPack, recastPack.createState(), [...rescueEvents, ...recollectEvents]);
  const letter = recastPack.reduce(s, { type: 'INSPECT', id: 'letter' });
  const vm = recastPack.getViewModel(letter);
  assert.equal(vm.speaker, 'Eris'); assert.match(vm.text, /Eris/);
  assert.match(vm.inspection.text, /— Eris/);
  assert.doesNotMatch(JSON.stringify(vm), /Iona/);
  assert.match(recastPack.manifest.assets[0].alt, /Eris/);
  assert.equal(recastPack.legacyImport, undefined);
  assert.deepEqual(recastPack.serialize(s), iona.serialize(run(iona, iona.createState(), [...rescueEvents, ...recollectEvents])));
});

test('story reducers and save round-trips do not mutate source state', () => {
  for (const pack of [iona, mara]) {
    for (const state of pack.validationStates()) {
      const before = JSON.stringify(state);
      Object.freeze(state);
      for (const value of Object.values(state)) if (Array.isArray(value)) Object.freeze(value);
      for (const descriptor of pack.getViewModel(state).actions) {
        pack.reduce(state, descriptor.kind === 'adjust' ? { ...descriptor.event, value: descriptor.value } : descriptor.event);
      }
      restore(pack, state);
      assert.equal(JSON.stringify(state), before);
    }
  }
});
