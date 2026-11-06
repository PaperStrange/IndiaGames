import { fresh, begin, choose, seal, sealLine, keepsakeSvg, escapeHtml as h } from './state.js';
import { view, pageParts } from './views.js';
import { createCountdown } from './countdown.js';
import { message, readPreference, savePreference, resolveLocale, LOCALES, limitText, graphemes } from './locales.js';
let state = fresh();
const app = document.querySelector('#app');
const preference = readPreference(() => window.localStorage);
let locale = resolveLocale({ saved: preference.locale, languages: navigator.languages });
let preferenceAvailable = preference.available;
let composing = false;
const date = new Date();
const dateLabel = () => new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
const t = (key, values) => message(locale, key, values);
const countdown = createCountdown({
  onTick: remaining => { app.querySelector('#timer').textContent = `0:${String(remaining).padStart(2, '0')}`; },
  onFinish: () => { app.querySelector('#timer-status').textContent = t('timer.finished'); },
});
function renderPage() {
  document.documentElement.lang = locale;
  document.title = t('page.title');
  document.querySelector('meta[name="description"]').content = t('page.description');
  const parts = pageParts(locale);
  document.querySelector('.topbar').innerHTML = parts.header;
  document.querySelector('.site-footer').innerHTML = parts.footer;
  document.querySelector('#about').innerHTML = parts.about;
  document.querySelector('#about-button').addEventListener('click', () => document.querySelector('#about').showModal());
}
function render(focus = true) {
  countdown.cancel();
  composing = false;
  app.innerHTML = view(state, dateLabel(), locale, preferenceAvailable);
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
  dialog.innerHTML = `<p class="eyebrow">${h(t('end.tag'))}</p><h2>${h(t('end.title'))}</h2><p>${h(t('end.explain'))}</p><div class="dialog-actions"><button class="secondary" data-cancel>${h(t('end.cancel'))}</button><button class="primary" data-confirm>${h(t('end.button'))}</button></div>`;
  document.body.append(dialog);
  dialog.addEventListener('close', () => dialog.remove());
  dialog.querySelector('[data-cancel]').onclick = () => dialog.close();
  dialog.querySelector('[data-confirm]').onclick = () => { dialog.close(); erase(); };
  dialog.showModal();
}
function startTimer(button) {
  if (!countdown.start()) return;
  button.disabled = true;
  button.textContent = t('timer.running');
}
function download() {
  const context = document.createElement('canvas').getContext('2d');
  const measure = context ? (text, size, font) => { context.font = `${size}px ${font}`; return context.measureText(text).width; } : undefined;
  const blob = new Blob([keepsakeSvg(state, dateLabel(), locale, measure)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = `small-hours-${state.mode === 'solo' ? 'rehearsal-' : ''}keepsake.svg`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#download-status').textContent = t('keepsake.downloaded');
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
  if (action === 'seal-line') { if (composing) return; state = sealLine(state, app.querySelector('#memory')?.value || '', locale); return render(); }
  if (action === 'timer' && state.step === 'action') return startTimer(button);
  if (action === 'download' && state.step === 'keepsake') return download();
  if (action === 'swap' && state.step === 'action') { state = begin(state, state.mode); return render(); }
  if (action === 'again' && state.step === 'keepsake') { const mode = state.mode; const nextScene = (state.sceneIndex + 1) % 3; state = { ...begin(state, mode), sceneIndex: nextScene }; render(); }
});
function updateWriting(field) {
  if (!composing) {
    const limited = limitText(field.value);
    if (limited !== field.value) { const start = field.selectionStart, end = field.selectionEnd; field.value = limited; field.setSelectionRange(Math.min(start, limited.length), Math.min(end, limited.length)); }
  }
  document.querySelector('#char-count').textContent = t('write.counter', {count: graphemes(field.value).length});
}
app.addEventListener('compositionstart', event => { if (event.target.id === 'memory') { composing = true; app.querySelector('[data-action="seal-line"]').disabled = true; } });
app.addEventListener('compositionend', event => { if (event.target.id === 'memory') { composing = false; updateWriting(event.target); app.querySelector('[data-action="seal-line"]').disabled = false; } });
app.addEventListener('input', event => { if (event.target.id === 'memory') updateWriting(event.target); });
app.addEventListener('change', event => {
  if (event.target.id !== 'language' || state.step !== 'home' || !LOCALES.includes(event.target.value)) return;
  locale = event.target.value;
  preferenceAvailable = savePreference(() => window.localStorage, locale);
  renderPage(); render(false); app.querySelector('#language').focus();
});
// Never retain private DOM in the browser's back-forward cache.
window.addEventListener('pagehide', () => { state = fresh(); countdown.cancel(); app.replaceChildren(); });
window.addEventListener('pageshow', event => { if (event.persisted) render(); });
renderPage(); render(false);
