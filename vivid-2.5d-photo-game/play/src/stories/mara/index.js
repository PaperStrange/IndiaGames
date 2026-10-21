import { defaultCast, makeContent } from './content.js';

const OBJECTS = ['timetable', 'postcard', 'sketches'];
const INTERPRETATIONS = ['repair', 'meet', 'unfinished'];
const action = (id, label, kind, event, extra = {}) => ({ id, label, kind, event, ...extra });

export function createMaraPack({ id = 'mara', cast = defaultCast } = {}) {
  const content = makeContent(cast);
  const manifest = {
    id, revision: 1, saveVersion: 1, title: content.title, subtitle: content.subtitle,
    description: content.description, duration: 'About 2–4 minutes · one sitting', cast,
    assets: [
      { id: 'workbench', src: 'art/workbench.glb', alt: 'A station workbench holding a lightbox and three paper objects.' },
      { id: 'postcard', src: 'art/postcard.svg', alt: 'A painted postcard of the old station waiting room, with space for an invitation.' },
      { id: 'sketch-underlay', src: 'art/sketch-underlay.svg', alt: 'The waiting-room windows drawn on transparent paper.' },
      { id: 'sketch-overlay', src: 'art/sketch-overlay.svg', alt: 'Tables and tools drawn on a second sheet; its window lines can align with the first.' },
    ],
    capabilities: ['inspect', 'choose', 'adjust'], releaseProfile: 'mara-object-v1',
  };
  function createState({ profile = 'remembered' } = {}) {
    if (!['remembered', 'neutral'].includes(profile)) throw new Error('Unknown study profile');
    return { profile, phase: 'intro', inspected: [], alignment: 0, inspection: null, interpretation: null, feedback: '' };
  }
  function reduce(state, event) {
    if (!event || typeof event !== 'object') return state;
    const s = { ...state, inspected: [...state.inspected] };
    switch (event.type) {
      case 'START':
        if (s.phase !== 'intro') return state;
        s.phase = 'investigate'; break;
      case 'INSPECT':
        if (s.phase !== 'investigate' || !OBJECTS.includes(event.id)) return state;
        if (!s.inspected.includes(event.id)) s.inspected.push(event.id);
        s.inspection = event.id; s.feedback = ''; break;
      case 'ALIGN':
        if (s.phase !== 'investigate' || !s.inspected.includes('sketches') || !Number.isInteger(event.value) || event.value < 0 || event.value > 6) return state;
        s.alignment = event.value; s.feedback = ''; break;
      case 'REVEAL':
        if (s.phase !== 'investigate') return state;
        if (s.inspected.length !== 3 || s.alignment !== 3) { s.feedback = content.notYet; break; }
        s.phase = 'reveal'; s.inspection = null; s.feedback = ''; break;
      case 'INTERPRET':
        if (s.phase !== 'reveal' || !INTERPRETATIONS.includes(event.value)) return state;
        s.interpretation = event.value; s.phase = 'end'; break;
      default: return state;
    }
    return s;
  }
  function getViewModel(s) {
    let text = content.welcome;
    let progress = 'An empty station, an unfinished picture';
    const actions = [];
    if (s.phase === 'intro') actions.push(action('start', 'Look at the workbench', 'choose', { type: 'START' }));
    if (s.phase === 'investigate') {
      text = s.feedback || (s.inspected.includes('sketches') ? s.alignment === 3 ? content.aligned : content.adjustment : content.investigate);
      progress = `${s.inspected.length}/3 objects examined · registration notch ${s.alignment}`;
      for (const id of OBJECTS) actions.push(action(id, content.objects[id].title, 'inspect', { type: 'INSPECT', id }, { group: 'On the workbench', hint: s.inspected.includes(id) ? 'You have examined this. Look again whenever you like.' : 'Examine this object.' }));
      if (s.inspected.includes('sketches')) actions.push(action('align', 'Align the architectural sketches', 'adjust', { type: 'ALIGN' }, {
        value: s.alignment, min: 0, max: 6, step: 1, group: 'On the lightbox',
        hint: 'Registration notch 3 aligns the window edges. Use the slider or step buttons; dragging is optional.',
      }));
      actions.push(action('reveal', 'Read the completed picture', 'choose', { type: 'REVEAL' }, {
        group: 'On the lightbox', disabled: s.inspected.length !== 3 || s.alignment !== 3,
        hint: 'Examine all three objects and align the sketches at notch 3.',
      }));
    }
    if (s.phase === 'reveal') {
      text = content.reveal; progress = 'The picture comes together';
      for (const option of content.interpretations) actions.push(action(option.id, option.label, 'choose', { type: 'INTERPRET', value: option.id }, { group: 'What stays with you?', hint: 'An interpretation, not a right-or-wrong answer.' }));
    }
    if (s.phase === 'end') {
      text = `${content.interpretations.find(option => option.id === s.interpretation).ending} ${content.closing}`;
      progress = 'An invitation completed';
    }
    return {
      title: content.title, kicker: content.subtitle, speaker: '', text, phase: s.phase, progress, actions,
      scene: {
        kind: 'workbench', view: 0, actorId: null, light: s.phase === 'intro' ? 'low' : 'steady', placement: null,
        caption: content.subtitle, descriptionLabel: content.sceneLabels.description,
        details: s.inspected.map(id => content.objects[id].short),
        alignment: s.alignment, alignmentTarget: 3, clueCount: s.inspected.length,
        revealed: ['reveal', 'end'].includes(s.phase),
      },
      ...(s.inspection ? { inspection: { title: content.objects[s.inspection].title, text: content.objects[s.inspection].text } } : {}),
      complete: s.phase === 'end',
    };
  }
  function serialize(s) {
    return { profile: s.profile, phase: s.phase, inspected: [...s.inspected], alignment: s.alignment, interpretation: s.interpretation };
  }
  function migrate({ version, state }) {
    if (version !== 1 || !state || typeof state !== 'object' || Array.isArray(state)) throw new Error('Unsupported Mara save');
    const s = state;
    const fail = () => { throw new Error('Malformed Mara checkpoint'); };
    if (!['remembered', 'neutral'].includes(s.profile) || !['intro', 'investigate', 'reveal', 'end'].includes(s.phase)) fail();
    if (!Array.isArray(s.inspected) || s.inspected.some(id => !OBJECTS.includes(id)) || new Set(s.inspected).size !== s.inspected.length) fail();
    if (!Number.isInteger(s.alignment) || s.alignment < 0 || s.alignment > 6) fail();
    if (s.alignment !== 0 && !s.inspected.includes('sketches')) fail();
    if (![null, ...INTERPRETATIONS].includes(s.interpretation)) fail();
    if (['reveal', 'end'].includes(s.phase) && (s.inspected.length !== 3 || s.alignment !== 3)) fail();
    if ((s.phase === 'end') !== Boolean(s.interpretation)) fail();
    if (s.phase === 'intro' && (s.inspected.length || s.alignment !== 0)) fail();
    return { ...createState({ profile: s.profile }), ...serialize(s), inspection: null, feedback: '' };
  }
  const validationStates = () => {
    let s = createState();
    const states = [s];
    for (const event of [
      { type: 'START' }, { type: 'INSPECT', id: 'sketches' }, { type: 'ALIGN', value: 3 },
      { type: 'INSPECT', id: 'postcard' }, { type: 'INSPECT', id: 'timetable' }, { type: 'REVEAL' },
      { type: 'INTERPRET', value: 'repair' },
    ]) { s = reduce(s, event); states.push(s); }
    return states;
  };
  return { manifest, createState, reduce, getViewModel, serialize, migrate, validationStates };
}

export const pack = createMaraPack();
