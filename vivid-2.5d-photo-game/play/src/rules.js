// Pure state transitions: game truth belongs here, never in dialogue or the DOM.
export const MEMORY_KEY = 'keepers-frame:v1';
export function parseMemory(raw) {
  try {
    const m = JSON.parse(raw);
    if (m?.version !== 1 || !['private', 'archive'].includes(m.choice)) return null;
    return { version: 1, choice: m.choice, peeked: m.peeked === true, visits: Math.max(1, Math.min(999, Number.isInteger(m.visits) ? m.visits : 1)) };
  } catch { return null; }
}
export function createGame(memory = null) {
  return { phase: 'intro', memory, view: 0, clues: [], peeked: memory?.peeked === true, letterOpen: false, bearing: null, rhythm: null, attempts: 0, feedback: '', ending: null };
}
export function transition(state, event) {
  const s = { ...state, clues: [...state.clues] };
  switch (event.type) {
    case 'START': if (s.phase === 'intro') s.phase = 'explore'; break;
    case 'VIEW': if (s.phase === 'explore' && [-1, 0, 1].includes(event.value)) s.view = event.value; break;
    case 'CLUE': {
      if (s.phase !== 'explore') break;
      const correctView = event.id === 'ledger' ? -1 : event.id === 'plate' ? 1 : null;
      if (s.view === correctView && !s.clues.includes(event.id)) { s.clues.push(event.id); s.feedback = ''; }
      break;
    }
    case 'LETTER':
      if (s.phase === 'explore' && s.view === 1) { s.letterOpen = true; s.peeked = !s.memory || s.memory.peeked; }
      break;
    case 'SET_BEARING':
      if (s.phase === 'explore' && ['east', 'west'].includes(event.value)) { s.bearing = event.value; s.feedback = ''; }
      break;
    case 'SET_RHYTHM':
      if (s.phase === 'explore' && ['sls', 'sss', 'lsl'].includes(event.value)) { s.rhythm = event.value; s.feedback = ''; }
      break;
    case 'SIGNAL':
      if (s.phase !== 'explore') break;
      s.attempts += 1;
      if (s.clues.length < 2) s.feedback = 'Find both harbour marks first. Iona needs evidence before opening the lamp.';
      else if (!s.bearing || !s.rhythm) s.feedback = 'Choose a bearing and a flash pattern.';
      else if (s.bearing !== 'east' || s.rhythm !== 'sls') s.feedback = 'No answer from the ferry. Compare your signal with the two harbour marks; you can try again.';
      else { s.phase = 'choice'; s.feedback = ''; s.view = 0; }
      break;
    case 'REMEMBER':
      if (s.phase === 'choice' && ['private', 'archive'].includes(event.value)) { s.phase = 'end'; s.ending = event.value; }
      break;
    default: break;
  }
  return s;
}
export function memoryFor(state) {
  if (state.phase !== 'end') return null;
  return { version: 1, choice: state.ending, peeked: state.peeked, visits: (state.memory?.visits || 0) + 1 };
}
