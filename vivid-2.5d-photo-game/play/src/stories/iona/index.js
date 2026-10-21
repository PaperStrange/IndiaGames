import { defaultCast, makeContent } from './content.js';

const PHASES = ['intro', 'explore', 'rescued', 'recollection', 'choice', 'end', 'return'];
const STAGES = ['unseen', 'entered', 'braced', 'wedged', 'complete'];
const CLUES = ['ledger', 'plate'];
const CHOICES = ['private', 'archive'];
const PROFILES = ['remembered', 'neutral'];
const copy = state => ({ ...state, clues: [...state.clues] });
const action = (id, label, kind, event, extra = {}) => ({ id, label, kind, event, ...extra });
const viewAction = (value, label) => action(`view-${value}`, label, 'choose', { type: 'VIEW', value }, { group: 'Look around' });

export function createIonaPack({ id = 'iona', cast = defaultCast } = {}) {
  const content = makeContent(cast);
  const manifest = {
    id, revision: 1, saveVersion: 1, title: content.title, subtitle: content.subtitle,
    description: content.description, duration: 'About 5–8 minutes · a return visit',
    cast, assets: [
      { id: 'portrait', src: cast.keeper.portrait || 'art/keeper-portrait.svg', alt: cast.keeper.description },
      { id: 'frame', src: 'art/frame.glb', alt: 'A wooden portrait frame with a brass lamp, a worn notch, and a sheltered recess.' },
    ], capabilities: ['inspect', 'choose', 'place'], releaseProfile: 'iona-return-v1',
  };

  function createState({ profile = 'remembered' } = {}) {
    if (!PROFILES.includes(profile)) throw new Error('Unknown study profile');
    return {
      profile, phase: 'intro', view: 0, clues: [], peeked: false, notchNoticed: false,
      inspection: null, bearing: null, rhythm: null, attempts: 0, feedback: '',
      recollectionStage: 'unseen', recollectionFromReturn: false, choice: null,
      letterPublished: false, placement: null, legacy: false,
    };
  }

  function expectedPlacement(state) {
    return state.profile === 'neutral' ? 'cloth' : state.choice === 'private' ? 'letter' : 'dedication';
  }

  function reduce(state, event) {
    if (!event || typeof event !== 'object') return state;
    const s = copy(state);
    switch (event.type) {
      case 'START':
        if (s.phase !== 'intro') return state;
        s.phase = 'explore'; break;
      case 'VIEW':
        if (s.phase !== 'explore' || ![-1, 0, 1].includes(event.value)) return state;
        s.view = event.value; s.inspection = null; break;
      case 'INSPECT': {
        if (s.phase === 'explore') {
          const requiredView = { ledger: -1, plate: 1, letter: 1, notch: 0 }[event.id];
          if (requiredView === undefined || s.view !== requiredView) return state;
          s.inspection = event.id;
          if (CLUES.includes(event.id) && !s.clues.includes(event.id)) s.clues.push(event.id);
          if (event.id === 'notch') s.notchNoticed = true;
          if (event.id === 'letter') { s.peeked = true; s.feedback = content.firstPeek; }
          else s.feedback = '';
        } else if (event.id === 'letter' && ['choice', 'end'].includes(s.phase)) {
          s.inspection = 'letter';
        } else return state;
        break;
      }
      case 'SET_BEARING':
        if (s.phase !== 'explore' || !['east', 'west'].includes(event.value)) return state;
        s.bearing = event.value; s.feedback = ''; break;
      case 'SET_RHYTHM':
        if (s.phase !== 'explore' || !['sls', 'sss', 'lsl'].includes(event.value)) return state;
        s.rhythm = event.value; s.feedback = ''; break;
      case 'SIGNAL':
        if (s.phase !== 'explore') return state;
        s.attempts = Math.min(s.attempts + 1, 9999);
        if (s.clues.length !== 2) s.feedback = content.noEvidence;
        else if (!s.bearing || !s.rhythm) s.feedback = content.incompleteSignal;
        else if (s.bearing !== 'east' || s.rhythm !== 'sls') s.feedback = content.wrongSignal;
        else { s.phase = 'rescued'; s.feedback = ''; s.inspection = null; s.view = 0; }
        break;
      case 'BEGIN_RECOLLECTION':
        if (!(s.phase === 'rescued' || (s.phase === 'return' && s.recollectionStage === 'unseen'))) return state;
        s.recollectionFromReturn = s.phase === 'return';
        s.phase = 'recollection'; s.recollectionStage = 'entered'; s.inspection = null; break;
      case 'BRACE':
        if (s.phase !== 'recollection' || s.recollectionStage !== 'entered') return state;
        s.recollectionStage = 'braced'; break;
      case 'PLACE_WEDGE':
        if (s.phase !== 'recollection' || s.recollectionStage !== 'braced' || event.destination !== 'notch') return state;
        s.recollectionStage = 'wedged'; break;
      case 'FINISH_RECOLLECTION':
        if (s.phase !== 'recollection' || s.recollectionStage !== 'wedged') return state;
        s.recollectionStage = 'complete';
        s.phase = s.recollectionFromReturn ? 'return' : 'choice';
        s.recollectionFromReturn = false; break;
      case 'REMEMBER':
        if (s.phase !== 'choice' || !CHOICES.includes(event.value)) return state;
        s.choice = event.value; s.phase = 'end'; s.inspection = null; break;
      case 'RETURN':
        if (s.phase !== 'end') return state;
        s.phase = 'return'; s.inspection = null; break;
      case 'PLACE_MEMORY':
        if (s.phase !== 'return' || s.placement || event.object !== expectedPlacement(s)) return state;
        if (event.destination !== { letter: 'recess', dedication: 'harbour-edge', cloth: 'peg' }[event.object]) return state;
        s.placement = event.object; break;
      default: return state;
    }
    return s;
  }

  function getViewModel(s) {
    const k = cast.keeper;
    const actions = [];
    let text = content.welcome;
    let kicker = content.subtitle;
    let progress = 'Begin an evening at the harbour';
    let speaker = k.name;
    if (s.phase === 'intro') {
      actions.push(action('start', 'Step closer to the frame', 'choose', { type: 'START' }));
    } else if (s.phase === 'explore') {
      text = s.feedback || (s.clues.length ? content.explore : content.invitation);
      progress = `${s.clues.length}/2 harbour marks found`;
      actions.push(viewAction(-1, 'Lean left'), viewAction(0, 'Look straight ahead'), viewAction(1, 'Lean right'));
      if (s.view === -1) actions.push(action('ledger', 'Read the tucked page', 'inspect', { type: 'INSPECT', id: 'ledger' }, { group: 'At this edge' }));
      if (s.view === 1) {
        actions.push(action('plate', 'Read the brass plate', 'inspect', { type: 'INSPECT', id: 'plate' }, { group: 'At this edge' }));
        actions.push(action('letter', 'Open the private letter', 'inspect', { type: 'INSPECT', id: 'letter' }, { group: 'At this edge', hint: 'The keeper has not offered this letter to you.' }));
      }
      if (s.view === 0) actions.push(action('notch', 'Notice the worn notch', 'inspect', { type: 'INSPECT', id: 'notch' }, { group: 'Beside the lamp' }));
      for (const [value, label] of [['east', 'East — old breakwater'], ['west', 'West — outer channel']]) {
        actions.push(action(`bearing-${value}`, label, 'choose', { type: 'SET_BEARING', value }, { group: 'Lamp bearing', selected: s.bearing === value }));
      }
      for (const [value, label] of [['sls', 'Short · long · short'], ['sss', 'Short · short · short'], ['lsl', 'Long · short · long']]) {
        actions.push(action(`rhythm-${value}`, label, 'choose', { type: 'SET_RHYTHM', value }, { group: 'Flash pattern', selected: s.rhythm === value }));
      }
      actions.push(action('signal', 'Send the signal', 'choose', { type: 'SIGNAL' }, { group: 'Call the ferry', hint: 'You can try again; there is no timer.' }));
    } else if (s.phase === 'rescued') {
      text = content.rescued; progress = 'The ferry is safely home';
      actions.push(action('recollect', 'Remember an earlier watch', 'choose', { type: 'BEGIN_RECOLLECTION' }));
    } else if (s.phase === 'recollection') {
      kicker = 'The Worn Notch · an earlier watch';
      text = content.recollection[s.recollectionStage];
      progress = { entered: 'A memory · brace the shade', braced: 'A memory · fit the wedge', wedged: 'A memory · the light steadies' }[s.recollectionStage];
      if (s.recollectionStage === 'entered') actions.push(action('brace', 'Brace the lamp shade', 'choose', { type: 'BRACE' }, { hint: 'The catch stays closed. You do not need to hold a button.' }));
      if (s.recollectionStage === 'braced') actions.push(action('wedge', 'Fit the wedge into the notch', 'place', { type: 'PLACE_WEDGE', destination: 'notch' }, { objectLabel: 'Wooden wedge', destinationLabel: 'Worn notch' }));
      if (s.recollectionStage === 'wedged') actions.push(action('present', 'Return to the present', 'choose', { type: 'FINISH_RECOLLECTION' }));
    } else if (s.phase === 'choice') {
      text = `${content.recollection.finished} ${content.choice}`;
      progress = 'Choose what may be shared';
      actions.push(action('read-offered-letter', 'Read the letter, with permission', 'inspect', { type: 'INSPECT', id: 'letter' }));
      actions.push(action('private', 'Keep the letter between us', 'choose', { type: 'REMEMBER', value: 'private' }));
      actions.push(action('archive', 'Approve the public dedication', 'choose', { type: 'REMEMBER', value: 'archive' }, { hint: content.dedication }));
    } else if (s.phase === 'end') {
      kicker = content.endings[s.choice].title;
      text = `${content.endings[s.choice].text}${s.peeked ? ` ${content.intrusion}` : ''}`;
      progress = 'A promise made';
      actions.push(action('return', 'Visit the frame again', 'choose', { type: 'RETURN' }, { hint: 'Your choice has made a place for something.' }));
    } else if (s.phase === 'return') {
      kicker = 'Another evening';
      const object = expectedPlacement(s);
      text = s.placement ? `${content.placed[s.placement]} ${content.closing}` :
        s.profile === 'neutral' ? content.returns.neutral :
          `${s.letterPublished ? content.returns.legacyArchive : content.returns[s.choice]}${s.peeked ? ` ${content.intrusion}` : ''}`;
      progress = s.placement ? 'The frame remembers its arrangement' : 'One small thing to put in place';
      if (!s.placement) actions.push(action('place-memory', {
        letter: 'Shelter the folded letter', dedication: 'Pin the dedication', cloth: 'Hang the cleaning cloth',
      }[object], 'place', { type: 'PLACE_MEMORY', object, destination: { letter: 'recess', dedication: 'harbour-edge', cloth: 'peg' }[object] }, {
        objectLabel: { letter: 'Folded letter', dedication: 'Approved dedication', cloth: 'Cleaning cloth' }[object],
        destinationLabel: { letter: 'Sheltered recess', dedication: 'Harbour-facing edge', cloth: 'Drying peg' }[object],
      }));
      if (s.recollectionStage === 'unseen') actions.push(action('optional-recollection', 'Ask about the worn notch', 'choose', { type: 'BEGIN_RECOLLECTION' }, { hint: 'An optional memory. The ferry does not need rescuing again.' }));
    }
    const hasLight = ['rescued', 'choice', 'end', 'return'].includes(s.phase) || ['wedged', 'complete'].includes(s.recollectionStage);
    const inspection = s.inspection ? { title: content.marks[s.inspection].title, text: content.marks[s.inspection].text } : undefined;
    return {
      title: content.title, kicker, speaker, text, phase: s.phase, progress, actions,
      scene: {
        kind: 'portrait', view: s.view, actorId: 'keeper', light: hasLight ? 'steady' : 'low',
        caption: s.phase === 'recollection' ? content.sceneLabels.recollection : content.subtitle,
        descriptionLabel: content.sceneLabels.description,
        placement: s.placement, details: [...s.clues.map(c => content.marks[c].short), ...(s.notchNoticed ? [content.marks.notch.short] : [])],
        notchBraced: ['braced', 'wedged', 'complete'].includes(s.recollectionStage),
        wedgePlaced: ['wedged', 'complete'].includes(s.recollectionStage),
        memory: s.phase === 'recollection', letterPublished: s.letterPublished,
      },
      ...(inspection ? { inspection } : {}),
      ...(s.choice && s.profile !== 'neutral' ? { choiceSummary: s.letterPublished ? 'On the earlier version, you approved publishing the original letter.' : content.endings[s.choice].summary } : {}),
      complete: s.phase === 'return' && Boolean(s.placement),
    };
  }

  function serialize(s) {
    return {
      profile: s.profile, phase: s.phase, clues: [...s.clues], peeked: s.peeked,
      notchNoticed: s.notchNoticed, bearing: s.bearing, rhythm: s.rhythm, attempts: s.attempts,
      recollectionStage: s.recollectionStage, recollectionFromReturn: s.recollectionFromReturn,
      choice: s.choice, letterPublished: s.letterPublished, placement: s.placement, legacy: s.legacy,
    };
  }

  function migrate({ version, state }) {
    if (version !== 1 || !state || typeof state !== 'object' || Array.isArray(state)) throw new Error('Unsupported Iona save');
    const s = state;
    const fail = () => { throw new Error('Malformed Iona checkpoint'); };
    if (!PROFILES.includes(s.profile) || !PHASES.includes(s.phase) || !STAGES.includes(s.recollectionStage)) fail();
    if (!Array.isArray(s.clues) || s.clues.some(v => !CLUES.includes(v)) || new Set(s.clues).size !== s.clues.length) fail();
    for (const key of ['peeked', 'notchNoticed', 'recollectionFromReturn', 'letterPublished', 'legacy']) if (typeof s[key] !== 'boolean') fail();
    if (![null, 'east', 'west'].includes(s.bearing) || ![null, 'sls', 'sss', 'lsl'].includes(s.rhythm)) fail();
    if (!Number.isSafeInteger(s.attempts) || s.attempts < 0) fail();
    if (![null, ...CHOICES].includes(s.choice) || ![null, 'letter', 'dedication', 'cloth'].includes(s.placement)) fail();
    if (['end', 'return'].includes(s.phase) && !s.choice) fail();
    if (s.letterPublished && (!s.legacy || s.choice !== 'archive')) fail();
    if (s.placement && (!s.choice || s.placement !== expectedPlacement(s))) fail();
    if (s.phase === 'recollection' && !['entered', 'braced', 'wedged'].includes(s.recollectionStage)) fail();
    if (s.recollectionFromReturn && (s.phase !== 'recollection' || !s.choice)) fail();
    if (s.phase === 'choice' && (s.recollectionStage !== 'complete' || s.choice)) fail();
    if (['intro', 'explore', 'rescued', 'choice'].includes(s.phase) && (s.choice || s.placement || s.recollectionFromReturn)) fail();
    if (['intro', 'explore', 'rescued'].includes(s.phase) && s.recollectionStage !== 'unseen') fail();
    if (s.phase === 'intro' && (s.clues.length || s.peeked || s.notchNoticed || s.bearing || s.rhythm || s.attempts)) fail();
    if (s.phase === 'recollection' && Boolean(s.choice) !== s.recollectionFromReturn) fail();
    if (s.phase === 'end' && s.placement) fail();
    if (!s.legacy && ['end', 'return'].includes(s.phase) && s.recollectionStage !== 'complete') fail();
    if (!s.legacy && ['rescued', 'recollection', 'choice', 'end', 'return'].includes(s.phase) && (s.clues.length !== 2 || s.bearing !== 'east' || s.rhythm !== 'sls')) fail();
    return { ...createState({ profile: s.profile }), ...serialize(s), view: 0, feedback: '', inspection: null, phase: s.phase === 'end' ? 'return' : s.phase };
  }

  function migrateLegacy(value, { profile = 'remembered' } = {}) {
    if (!value || value.version !== 1 || !CHOICES.includes(value.choice)) throw new Error('Malformed legacy memory');
    if (!PROFILES.includes(profile)) throw new Error('Unknown study profile');
    return {
      ...createState({ profile }), phase: 'return', choice: value.choice, peeked: value.peeked === true,
      letterPublished: value.choice === 'archive', legacy: true,
    };
  }

  const validationStates = () => {
    let s = createState();
    const states = [s];
    for (const event of [
      { type: 'START' }, { type: 'VIEW', value: -1 }, { type: 'INSPECT', id: 'ledger' },
      { type: 'VIEW', value: 1 }, { type: 'INSPECT', id: 'plate' }, { type: 'INSPECT', id: 'letter' },
      { type: 'SET_BEARING', value: 'east' }, { type: 'SET_RHYTHM', value: 'sls' }, { type: 'SIGNAL' },
      { type: 'BEGIN_RECOLLECTION' }, { type: 'BRACE' }, { type: 'PLACE_WEDGE', destination: 'notch' },
      { type: 'FINISH_RECOLLECTION' }, { type: 'REMEMBER', value: 'archive' }, { type: 'RETURN' },
      { type: 'PLACE_MEMORY', object: 'dedication', destination: 'harbour-edge' },
    ]) { s = reduce(s, event); states.push(s); }
    return states;
  };
  return {
    manifest, createState, reduce, getViewModel, serialize, migrate, migrateLegacy, validationStates,
    ...(id === 'iona' ? { legacyImport: { key: 'keepers-frame:v1', profiles: ['remembered'], version: 1 } } : {}),
  };
}

export const pack = createIonaPack();
