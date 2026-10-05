import { clues, dialogue, endings } from './content.js';
import { createGame, transition, parseMemory, memoryFor, MEMORY_KEY } from './rules.js';

const $ = (selector) => document.querySelector(selector);
let storageAvailable = true;
let memory = null;
try { memory = parseMemory(localStorage.getItem(MEMORY_KEY)); } catch { storageAvailable = false; }
let state = createGame(memory);
let still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let forgetArmed = false;
let currentSpeech = '';

function say(text) { currentSpeech = text; $('#announcement').textContent = text; }
function dispatch(event) {
  const previous = state;
  state = transition(state, event);
  if (event.type === 'START') {
    say(state.memory ? (state.memory.choice === 'archive' ? dialogue.returningArchive : state.memory.peeked ? dialogue.returningPeek : dialogue.returningPrivate) : dialogue.welcome);
  } else if (event.type === 'CLUE' && state.clues.length > previous.clues.length) {
    say(clues[event.id].body);
  } else if (event.type === 'LETTER' && !previous.letterOpen && state.letterOpen) {
    say(state.memory ? dialogue.letter : `${dialogue.firstPeek} ${dialogue.letter}`);
  } else if (event.type === 'VIEW') {
    $('#announcement').textContent = state.view === -1 ? 'A tucked page is now visible. Read it to collect a harbour mark.' : state.view === 1 ? 'A brass plate and a private letter are now visible.' : 'You face Iona again.';
  } else if (event.type === 'SIGNAL') {
    if (state.phase === 'choice') say(dialogue.grant);
  } else if (event.type === 'REMEMBER' && state.phase === 'end') {
    memory = memoryFor(state);
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(memory)); } catch { storageAvailable = false; }
    say(endings[state.ending].body);
  }
  render();
  if (event.type === 'START') {
    $('[data-view="-1"]').focus({ preventScroll: true });
    if (innerWidth <= 760) $('#portrait').scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  if (event.type === 'SIGNAL' && state.phase === 'choice') $('[data-memory="private"]').focus({ preventScroll: true });
  if (event.type === 'REMEMBER') $('#return').focus({ preventScroll: true });
}
function speaker(text) { return `<div class="speaker">IONA, KEEPER OF THE EAST LIGHT</div><p class="speech">“${text}”</p>`; }
function render() {
  const started = state.phase !== 'intro';
  const exploring = state.phase === 'explore';
  const won = ['choice', 'end'].includes(state.phase);
  document.body.classList.toggle('success', won);
  document.body.classList.toggle('started', started);
  document.body.classList.toggle('still', still);
  $('.encounter').classList.toggle('compact', exploring);
  $('#portrait').dataset.view = state.view;
  document.documentElement.style.setProperty('--lean', state.view);
  $('#motion').textContent = `Motion: ${still ? 'off' : 'on'}`;
  $('#motion').setAttribute('aria-pressed', String(still));
  $('#weather').textContent = won ? 'A LIGHT IN THE FOG' : 'A FOGBOUND EVENING';
  $('[data-clue="ledger"]').hidden = !exploring || state.view !== -1;
  $('[data-clue="plate"]').hidden = !exploring || state.view !== 1;
  $('#letter').hidden = !exploring || state.view !== 1;
  $('#letter').textContent = state.memory ? 'Read the letter she offers →' : 'Open her private letter →';
  document.querySelectorAll('[data-view]').forEach((button) => {
    if (button.tagName !== 'BUTTON') return;
    button.disabled = !exploring;
    button.setAttribute('aria-pressed', String(Number(button.dataset.view) === state.view));
  });
  $('#view-hint').textContent = !started ? 'Some things become clear from a different angle.' : won ? 'A ferry finds its way home.' : state.view === -1 ? 'A folded page, tucked behind her shoulder.' : state.view === 1 ? 'Brass catches the light. A letter waits below.' : 'Use the lean buttons, or ← and →, to look behind the frame.';
  $('#evidence').hidden = !exploring;
  $('#signal').hidden = !exploring;
  $('#clue-count').textContent = `${state.clues.length} / 2`;
  $('#clue-list').innerHTML = state.clues.length ? state.clues.map(id => `<div class="clue-card"><strong>${clues[id].short}</strong><p>${clues[id].body}</p></div>`).join('') : '<div class="empty-clue">Look around the frame to find two harbour marks.</div>';
  document.querySelectorAll('[data-bearing]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.bearing === state.bearing)));
  document.querySelectorAll('[data-rhythm]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.rhythm === state.rhythm)));
  $('#feedback').textContent = state.feedback;
  $('#forget').hidden = !memory;
  $('#storage-status').textContent = !storageAvailable ? 'Browser storage is unavailable. Iona will remember during this open page; a reload will forget this visit.' : state.phase === 'end' ? 'Promise saved in this browser. Return now to see what she remembers.' : '';
  if (state.phase === 'intro') {
    $('#story').innerHTML = memory ? `<span class="memory-label">A FAMILIAR VISITOR · ${memory.visits} ${memory.visits === 1 ? 'PROMISE' : 'PROMISES'} KEPT</span>${speaker(memory.choice === 'archive' ? dialogue.returningArchive : memory.peeked ? dialogue.returningPeek : dialogue.returningPrivate)}` : speaker('Most visitors look at a painting. You look as though you might listen.');
    $('#actions').innerHTML = `<p class="instruction">Look around her frame. Find the safe signal. Decide what she gets to remember.</p><button class="primary" id="start">${memory ? 'Visit Iona again' : 'Step closer'} <span>→</span></button><p class="note">No timer. No sound required. A small encounter, at your own pace.</p>`;
    $('#start').onclick = () => dispatch({ type: 'START' });
  } else if (exploring) {
    $('#story').innerHTML = speaker(currentSpeech || dialogue.welcome) + `<p class="instruction">${state.clues.length < 2 ? 'Find two harbour marks behind the frame. Lean left and right, then read what you uncover.' : 'Use your two harbour marks to set the lamp. Iona is ready when you are.'}</p>`;
    $('#actions').innerHTML = '';
  } else if (state.phase === 'choice') {
    $('#story').innerHTML = speaker(dialogue.grant) + '<p class="instruction">Iona takes out a letter. “I was afraid every night. I kept the light anyway. You may add it to the harbour record, if you think it would help someone.”</p>';
    $('#actions').innerHTML = '<button class="secondary" data-memory="private">Keep the letter between us.<small>A private promise. On your next visit, she will offer it freely.</small></button><button class="secondary" data-memory="archive">Let the harbour know her name.<small>With her permission, let her courage become public history.</small></button>';
    document.querySelectorAll('[data-memory]').forEach(b => b.onclick = () => dispatch({ type: 'REMEMBER', value: b.dataset.memory }));
  } else {
    const ending = endings[state.ending];
    $('#story').innerHTML = `<span class="memory-label">THE FERRY IS HOME</span><h2 class="ending-title">${ending.title}</h2><p class="ending-copy">${ending.body}</p><p class="ending-mark">${ending.memory}${state.peeked ? ' She also remembers that you opened it before asking.' : ''}</p>`;
    $('#actions').innerHTML = '<button class="primary" id="return">Leave, then return <span>↻</span></button><p class="note">Every visit starts a new evening. Your promise crosses the frame.</p>';
    $('#return').onclick = () => { state = createGame(memory); currentSpeech = ''; render(); $('#start').focus({ preventScroll: true }); };
  }
}

$('.view-controls').addEventListener('click', event => {
  const b = event.target.closest('button[data-view]');
  if (b) dispatch({ type: 'VIEW', value: Number(b.dataset.view) });
});
document.querySelectorAll('[data-clue]').forEach(b => b.onclick = () => dispatch({ type: 'CLUE', id: b.dataset.clue }));
$('#letter').onclick = () => dispatch({ type: 'LETTER' });
document.querySelectorAll('[data-bearing]').forEach(b => b.onclick = () => dispatch({ type: 'SET_BEARING', value: b.dataset.bearing }));
document.querySelectorAll('[data-rhythm]').forEach(b => b.onclick = () => dispatch({ type: 'SET_RHYTHM', value: b.dataset.rhythm }));
$('#send-signal').onclick = () => dispatch({ type: 'SIGNAL' });
$('#motion').onclick = () => { still = !still; render(); };
$('#forget').onclick = () => {
  if (!forgetArmed) { forgetArmed = true; $('#forget').textContent = 'Confirm: forget our visits'; return; }
  try { localStorage.removeItem(MEMORY_KEY); } catch { /* in-memory reset still works */ }
  memory = null; state = createGame(); currentSpeech = ''; forgetArmed = false; $('#forget').textContent = 'Forget our visits'; render(); $('#start').focus();
};
$('#portrait').addEventListener('pointermove', event => {
  if (still || event.pointerType === 'touch') return;
  const box = $('#portrait').getBoundingClientRect();
  document.documentElement.style.setProperty('--mouse', ((event.clientX - box.left) / box.width - .5) * 2);
});
$('#portrait').addEventListener('pointerleave', () => document.documentElement.style.setProperty('--mouse', 0));
document.addEventListener('keydown', event => {
  if (state.phase !== 'explore' || !['ArrowLeft', 'ArrowRight'].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
  event.preventDefault();
  const value = Math.max(-1, Math.min(1, state.view + (event.key === 'ArrowLeft' ? -1 : 1)));
  dispatch({ type: 'VIEW', value });
  // The arrow key reveals an actionable clue; focus it so keyboard-only players can read it.
  if (value === -1) $('[data-clue="ledger"]').focus({ preventScroll: true });
  if (value === 1) $('[data-clue="plate"]').focus({ preventScroll: true });
});
render();
