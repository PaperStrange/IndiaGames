import { fresh, begin, choose, seal, sealLine, keepsakeSvg } from './state.js';
import { view } from './views.js';
let state = fresh();
let clock = null;
let remaining = 45;
let timerStarted = false;
const app = document.querySelector('#app');
const dateLabel = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
function clearClock() { clearInterval(clock); clock = null; remaining = 45; timerStarted = false; }
function render(focus = true) {
  clearClock();
  app.innerHTML = view(state, dateLabel);
  if (focus) {
    const heading = app.querySelector('h1');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
function go(step) { state = { ...state, step }; render(); }
function erase() { state = fresh(); render(); }
function confirmEnd() {
  // The dialog covers the current step. Cancel leaves it untouched.
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `<p class="eyebrow">YOU CAN ALWAYS LEAVE</p><h2>End this little moment?</h2><p>Your choices and details will be cleared from this tab. Any keepsake you already downloaded stays with you.</p><div class="dialog-actions"><button class="secondary" data-cancel>Keep playing</button><button class="primary" data-confirm>End & forget</button></div>`;
  document.body.append(dialog);
  dialog.addEventListener('close', () => dialog.remove());
  dialog.querySelector('[data-cancel]').onclick = () => dialog.close();
  dialog.querySelector('[data-confirm]').onclick = () => { dialog.close(); erase(); };
  dialog.showModal();
}
function startTimer(button) {
  if (timerStarted) return;
  timerStarted = true;
  button.disabled = true;
  button.textContent = 'Your moment is yours';
  const deadline = Date.now() + 45000;
  const tick = () => {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    document.querySelector('#timer').textContent = `0:${String(remaining).padStart(2, '0')}`;
    if (remaining <= 0) {
      clearInterval(clock); clock = null;
      document.querySelector('#timer-status').textContent = 'A little time has passed. Keep going as long as you like.';
    }
  };
  clock = setInterval(tick, 1000);
}
function download() {
  const blob = new Blob([keepsakeSvg(state, dateLabel)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = `small-hours-${state.mode === 'solo' ? 'rehearsal-' : ''}keepsake.svg`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#download-status').textContent = 'Your keepsake download has started. Open the SVG image in a browser, or print it.';
}
app.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === 'end') return confirmEnd();
  if (action.startsWith('start-') && ['start-pair','start-solo'].includes(action)) { state = begin(state, action === 'start-solo' ? 'solo' : 'pair'); return render(); }
  if (action === 'scene' && state.step === 'scene') { state = { ...state, sceneIndex: Number(button.dataset.index) }; render(false); app.querySelector(`[data-index="${state.sceneIndex}"]`).focus({preventScroll:true}); return; }
  const transitions = { 'start-scene': ['scene','pass-a'], 'ready-a': ['pass-a','choose-a'], 'ready-b': ['pass-b','choose-b'], 'reveal': ['together','reveal'], 'action': ['reveal','action'], 'write': ['action','pass-write-a'], 'ready-write-a': ['pass-write-a','write-a'], 'ready-write-b': ['pass-write-b','write-b'] };
  if (transitions[action] && state.step === transitions[action][0]) return go(transitions[action][1]);
  if (['choose','guess'].includes(action)) {
    state = choose(state, action === 'choose' ? 'choice' : 'guess', button.dataset.id);
    const selector = `[data-action="${action}"][data-id="${button.dataset.id}"]`;
    render(false); app.querySelector(selector)?.focus({ preventScroll: true }); return;
  }
  if (action === 'seal') { const next = seal(state); if (next !== state) { state = next; render(); } return; }
  if (action === 'seal-line') { state = sealLine(state, app.querySelector('#memory')?.value || ''); return render(); }
  if (action === 'timer' && state.step === 'action') return startTimer(button);
  if (action === 'download' && state.step === 'keepsake') return download();
  if (action === 'swap' && state.step === 'action') { state = begin(state, state.mode); return render(); }
  if (action === 'again' && state.step === 'keepsake') { const mode = state.mode; const nextScene = (state.sceneIndex + 1) % 3; state = { ...begin(state, mode), sceneIndex: nextScene }; render(); }
});
app.addEventListener('input', event => {
  if (event.target.id === 'memory') document.querySelector('#char-count').textContent = `${event.target.value.length} / 120`;
});
document.querySelector('#about-button').addEventListener('click', () => document.querySelector('#about').showModal());
// Never retain private DOM in the browser's back-forward cache.
window.addEventListener('pagehide', () => { state = fresh(); clearClock(); app.replaceChildren(); });
window.addEventListener('pageshow', event => { if (event.persisted) render(); });
render(false);
