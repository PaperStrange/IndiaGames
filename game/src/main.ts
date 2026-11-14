import './style.css';
import { STORY, LOCALES, catalog } from './content/index.ts';
import type { Locale } from './content/types.ts';
import { PREF_KEY, newGame, selectIntent, submitIntent, resolveReply, turnPage, canChangeLocale, changeLocale, endingId, endingPatternKey, arrivalKey, preferredLocale, readSave, writeSave, eraseSave, transcript } from './state.ts';
import type { GameState, Entry, StorageLike } from './state.ts';

const app = document.querySelector<HTMLDivElement>('#app')!;
const storage: StorageLike = {
  getItem: key => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
  removeItem: key => window.localStorage.removeItem(key),
};
const initialSave = readSave(storage);
let state: GameState | null = null;
let retainedState = initialSave.kind === 'saved' ? initialSave.state : null;
let storedLocale: string | null = null;
try { storedLocale = storage.getItem(PREF_KEY); } catch { /* Preference storage is optional. */ }
let locale = preferredLocale(new URLSearchParams(location.search).get('lang'), storedLocale, navigator.languages);
if (retainedState) {
  if (!canChangeLocale(retainedState)) locale = retainedState.locale;
  else retainedState = changeLocale(retainedState, locale);
}
let cover = true;
let saveEnabled = initialSave.kind === 'saved';
let protectedSave = initialSave.kind === 'protected';
let reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealing = false;
let revealTimer: ReturnType<typeof setTimeout> | null = null;
let notice = initialSave.kind === 'protected' ? (initialSave.reason === 'future' ? 'ui.futureSave' : 'ui.corruptSave') : initialSave.kind === 'unavailable' ? 'ui.saveUnavailable' : '';
let dialogReturnFocus: HTMLElement | null = null;

const esc = (text: unknown) => String(text).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
function t(key: string, values: Record<string, string | number> = {}): string {
  const message = catalog(locale)[key];
  if (typeof message !== 'string') throw new Error(`Missing message: ${locale}/${key}`);
  return message.replace(/\{([a-zA-Z]+)\}/g, (match, name) => name in values ? String(values[name]) : match);
}
const button = (action: string, text: string, extra = '') => `<button type="button" data-action="${action}" ${extra}>${esc(text)}</button>`;
const paragraph = (text: string, className = '') => `<p class="${className}">${esc(text)}</p>`;

function rememberLocale() { try { storage.setItem(PREF_KEY, locale); } catch { /* Does not prevent play. */ } }
function persist() {
  if (!state || !saveEnabled) return;
  const result = writeSave(storage, state);
  if (result === 'saved') { retainedState = structuredClone(state); notice = 'ui.saved'; }
  else { notice = result === 'protected' ? 'ui.saveProtected' : 'ui.saveUnavailable'; if (result === 'protected') protectedSave = true; }
}
function stopReveal() {
  if (revealTimer) clearTimeout(revealTimer);
  revealTimer = null; revealing = false;
}
function header() {
  const locked = !canChangeLocale(state || retainedState);
  return `<header class="site-header"><a class="wordmark" href="#" data-action="cover"><span class="book-icon" aria-hidden="true">◒</span> ${esc(t('ui.brand'))} <span class="edition">${esc(t('ui.preview'))}</span></a><div class="language-control"><label for="language">${esc(t('ui.language'))}</label><select id="language" ${locked ? 'disabled aria-describedby="language-lock"' : ''}>${LOCALES.map(id => `<option value="${id}" ${id === locale ? 'selected' : ''}>${esc(t('ui.language.' + id))}</option>`).join('')}</select></div></header>${locked ? `<p id="language-lock" class="language-lock">${esc(t('ui.languageLocked'))}</p>` : ''}`;
}
function settings() {
  return `<footer class="site-footer"><details class="preferences"><summary>${esc(t('ui.saveLabel'))} · ${esc(t('ui.reducedMotion'))}</summary><div class="preference-panel"><label class="check-option"><input id="save-choice" type="checkbox" ${saveEnabled ? 'checked' : ''} ${protectedSave ? 'disabled' : ''}/><span>${esc(t('ui.saveLabel'))}</span></label>${paragraph(t('ui.saveHint'), 'hint')}<label class="check-option"><input id="motion-choice" type="checkbox" ${reduceMotion ? 'checked' : ''}/><span>${esc(t('ui.reducedMotion'))}</span></label>${button('reset', t('ui.reset'), 'class="text-button danger"')}</div></details><p class="local-note">${esc(t('ui.localOnly'))}</p><p class="draft-note">${esc(t('ui.translationDraft'))}</p><p id="status" role="status" aria-live="polite">${esc(notice ? t(notice) : t(saveEnabled ? 'ui.saveOn' : 'ui.saveOff'))}</p></footer>`;
}
function coverPage() {
  const hasChapter = state || retainedState;
  return `<main class="cover-scene"><div class="cover-book"><span class="ribbon" aria-hidden="true"></span><div class="cover-rule" aria-hidden="true"></div><p class="eyebrow">${esc(t('ui.chapter'))}</p><h1 id="main-title" tabindex="-1">${esc(t(STORY.titleKey))}</h1><p class="cover-subtitle">${esc(t(STORY.subtitleKey))}</p><span class="cover-seal" aria-hidden="true">✧</span><div class="cover-actions">${hasChapter ? button('resume', t('ui.continue'), 'class="primary"') : button('start', t('ui.start'), 'class="primary"')}${hasChapter ? button('restart', t('ui.newChapter'), 'class="quiet"') : ''}</div><p class="cover-instruction">${esc(t('ui.howTo'))}</p></div><aside class="invitation"><span class="chapter-ornament" aria-hidden="true">— I —</span>${STORY.introKeys.map(key => paragraph(t(key))).join('')}<div class="expectations">${paragraph(t('ui.contentNote'))}${paragraph(t('ui.authoredNote'))}</div></aside></main>`;
}
function progress() {
  return `<nav class="chapter-progress" aria-label="${esc(t('ui.pageNumber', { current: state!.beat + 1, total: STORY.beats.length }))}">${STORY.beats.map((beat, i) => `<span class="progress-step ${i === state!.beat ? 'current' : i < state!.beat ? 'complete' : ''}" ${i === state!.beat ? 'aria-current="step"' : ''}><span aria-hidden="true">${i + 1}</span><span>${esc(t(beat.sceneKey))}</span></span>`).join('<span class="progress-line" aria-hidden="true"></span>')}</nav>`;
}
function original(entry: Entry) {
  return `<div class="original-record"><span class="small-label">${esc(t('ui.originalHeading'))}</span><blockquote lang="${entry.locale}">${esc(entry.sourceText)}</blockquote><p class="source-locale">${esc(t('ui.originalLocale', { language: t('ui.language.' + entry.locale) }))}</p></div>`;
}
function readingPage() {
  const beat = STORY.beats[state!.beat], arrival = arrivalKey(state!);
  const selected = beat.options.find(intent => intent.id === state!.selectedIntentId);
  return `<section class="paper-page left-page"><p class="eyebrow">${esc(t(STORY.cast.correspondent.nameKey))}</p><h1 id="main-title" tabindex="-1">${esc(t(beat.sceneKey))}</h1>${arrival ? paragraph(t(arrival), 'arrival') : ''}${paragraph(t(beat.promptKey), 'story-prose')}<div class="page-foot">${button('originals', t('ui.restoreOriginals'), 'class="text-button"')}</div></section><section class="paper-page right-page"><span class="ribbon" aria-hidden="true"></span><p class="eyebrow">${esc(t(STORY.cast.keeper.nameKey))}</p><h2>${esc(t('ui.chooseIntent'))}</h2><div class="intent-list" role="group" aria-label="${esc(t('ui.chooseIntent'))}">${beat.options.map(intent => `<button type="button" class="intent ${intent.mark} ${state!.selectedIntentId === intent.id ? 'marked' : ''}" data-action="select" data-intent="${intent.id}" aria-pressed="${state!.selectedIntentId === intent.id}"><span class="mark-symbol" aria-hidden="true">${intent.mark === 'circle' ? '◯' : '╱'}</span><span><strong>${esc(t(intent.labelKey))}</strong><span class="intent-source">${esc(t(intent.sourceKey))}</span></span></button>`).join('')}</div>${selected ? `<div class="mark-preview"><span class="small-label">${esc(t('ui.selected'))}</span><p>${esc(t(selected.sourceKey))}</p>${button('clear', t('ui.clearMark'), 'class="text-button"')}</div>` : paragraph(t('ui.selectHint'), 'hint')}<div class="page-foot">${button('submit', t('ui.submit'), `class="primary" ${selected ? '' : 'disabled'}`)}</div></section>`;
}
function exchangePage() {
  const entry = state!.entries.at(-1)!;
  const beat = STORY.beats[state!.beat];
  const resolved = state!.phase === 'resolved';
  return `<section class="paper-page left-page"><p class="eyebrow">${esc(t(STORY.cast.keeper.nameKey))}</p><h1 id="main-title" tabindex="-1">${esc(t(beat.sceneKey))}</h1>${original(entry)}${paragraph(t('ui.originalHint'), 'hint')}<div class="page-foot">${button('originals', t('ui.compare'), 'class="quiet"')}</div></section><section class="paper-page right-page"><span class="ribbon" aria-hidden="true"></span><p class="eyebrow">${esc(t(STORY.cast.correspondent.nameKey))}</p><h2>${esc(t('ui.replyHeading'))}</h2><div class="reply-ink ${revealing ? 'revealing' : ''}" lang="${entry.locale}" ${revealing ? 'aria-hidden="true"' : ''}><p>${esc(entry.replyText)}</p></div>${revealing ? `<div class="reveal-status"><p role="status">${esc(t('ui.replyRevealing'))}</p>${button('skip', t('ui.skipReveal'), 'class="quiet"')}</div>` : resolved ? `<div class="outcome"><span class="small-label">${esc(t(entry.resolution === 'correct' ? 'ui.corrected' : 'ui.accepted'))}</span><h3 tabindex="-1">${esc(t('ui.consequenceHeading'))}</h3><p lang="${entry.locale}">${esc(entry.outcomeText!)}</p></div><div class="page-foot">${button('next', t(state!.beat === STORY.beats.length - 1 ? 'ui.finish' : 'ui.next'), 'class="primary"')}</div>` : `<div class="resolution"><h3>${esc(t('ui.resolutionPrompt'))}</h3>${paragraph(t('ui.resolutionHint'), 'hint')}<div class="resolution-actions">${button('correct', t('ui.correct'), 'class="primary"')}${button('accept', t('ui.accept'), 'class="primary"')}</div></div>`}</section>`;
}
function entryTrace(entry: Entry, index: number) {
  return `<article class="trace-entry"><h3>${esc(t('ui.entryHeading', { current: index + 1 }))}</h3>${original(entry)}<p><strong>${esc(t('ui.replyHeading'))}</strong> <span lang="${entry.locale}">${esc(entry.replyText)}</span></p>${entry.resolution ? `<p class="decision"><strong>${esc(t(entry.resolution === 'correct' ? 'ui.corrected' : 'ui.accepted'))}</strong></p><p lang="${entry.locale}">${esc(entry.outcomeText)}</p>` : ''}</article>`;
}
function endingPage() {
  const ending = STORY.endings.find(ending => ending.id === endingId(state!))!;
  return `<section class="paper-page ending-page"><span class="ribbon" aria-hidden="true"></span><p class="eyebrow">${esc(t('ui.endingHeading'))}</p><h1 id="main-title" tabindex="-1">${esc(t(ending.titleKey))}</h1>${paragraph(t(endingPatternKey(state!)!), 'ending-pattern')}${paragraph(t(ending.bodyKey), 'story-prose')}<div class="ending-actions">${button('export', t('ui.export'), 'class="primary"')}${button('restart', t('ui.replay'), 'class="quiet"')}${button('cover', t('ui.closeBook'), 'class="text-button"')}</div><details class="ending-trace"><summary>${esc(t('ui.traceHeading'))}</summary>${paragraph(t('ui.traceHint'), 'hint')}${state!.entries.map(entryTrace).join('')}</details></section>`;
}
function render(focus?: string) {
  document.documentElement.lang = locale;
  document.documentElement.classList.toggle('reduced-motion', reduceMotion);
  document.title = `${t(STORY.titleKey)} — ${t('ui.brand')}`;
  const navigation = state && state.phase !== 'ending' ? `<div class="under-book">${button('cover', t('ui.closeBook'), 'class="text-button"')}${state.entries.length ? button('export', t('ui.export'), 'class="text-button"') : ''}<span>${esc(t('ui.pageNumber', { current: state.beat + 1, total: STORY.beats.length }))}</span></div>` : '';
  const body = cover || !state ? coverPage() : `<main class="chapter-scene">${progress()}<div class="book-spread ${state.phase === 'ending' ? 'at-ending' : ''}">${state.phase === 'ending' ? endingPage() : state.phase === 'reading' ? readingPage() : exchangePage()}</div>${navigation}</main>`;
  app.innerHTML = `${header()}${body}${settings()}<dialog id="record-dialog" aria-labelledby="dialog-title"></dialog>`;
  document.querySelector<HTMLSelectElement>('#language')!.addEventListener('change', event => {
    const value = (event.target as HTMLSelectElement).value as Locale;
    if (state) state = changeLocale(state, value);
    if (!state && retainedState) retainedState = changeLocale(retainedState, value);
    locale = value; rememberLocale(); if (state) persist(); render('#language');
  });
  document.querySelector<HTMLInputElement>('#save-choice')!.addEventListener('change', event => {
    saveEnabled = (event.target as HTMLInputElement).checked;
    if (saveEnabled) { if (state) persist(); else notice = 'ui.saveOn'; }
    else { const removed = eraseSave(storage); if (removed) retainedState = null; notice = removed ? 'ui.saveOff' : 'ui.saveDisableFailed'; }
    render(); document.querySelector<HTMLDetailsElement>('.preferences')!.open = true; document.querySelector<HTMLInputElement>('#save-choice')!.focus();
  });
  document.querySelector<HTMLInputElement>('#motion-choice')!.addEventListener('change', event => {
    reduceMotion = (event.target as HTMLInputElement).checked;
    if (reduceMotion) stopReveal(); render(); document.querySelector<HTMLDetailsElement>('.preferences')!.open = true; document.querySelector<HTMLInputElement>('#motion-choice')!.focus();
  });
  if (focus) document.querySelector<HTMLElement>(focus)?.focus();
}
function start() {
  stopReveal(); state = newGame(locale); cover = false; notice = protectedSave ? 'ui.saveProtected' : ''; persist(); render('#main-title');
}
function showDialog(content: string, focusSelector = '[data-action="dialog-close"]') {
  dialogReturnFocus = document.activeElement as HTMLElement;
  const dialog = document.querySelector<HTMLDialogElement>('#record-dialog')!;
  dialog.innerHTML = content;
  dialog.addEventListener('close', () => dialogReturnFocus?.focus(), { once: true });
  dialog.showModal(); dialog.querySelector<HTMLElement>(focusSelector)?.focus();
}
function confirmReset(replay: boolean) {
  if (revealing) { stopReveal(); render(replay ? '[data-action="restart"]' : '[data-action="reset"]'); }
  showDialog(`<h2 id="dialog-title">${esc(t(replay ? 'ui.replayTitle' : 'ui.resetTitle'))}</h2>${paragraph(t(replay ? 'ui.replayBody' : 'ui.resetBody'))}<div class="dialog-actions">${button('dialog-close', t('ui.cancel'), 'class="quiet"')}${button(replay ? 'restart-confirm' : 'reset-confirm', t(replay ? 'ui.replayConfirm' : 'ui.resetConfirm'), 'class="primary"')}</div>`);
}
function openOriginals() {
  if (revealing) { stopReveal(); render('[data-action="originals"]'); }
  const entries = state?.entries ?? [];
  showDialog(`<div class="dialog-heading"><h2 id="dialog-title">${esc(t('ui.compareHeading'))}</h2>${button('dialog-close', t('ui.close'), 'class="quiet"')}</div>${paragraph(t('ui.compareHint'), 'hint')}${entries.length ? entries.map(entryTrace).join('') : paragraph(t('ui.originalEmpty'))}`);
}
function exportChapter() {
  if (!state) return;
  try {
    const url = URL.createObjectURL(new Blob([transcript(state)], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `borrowed-words-${locale}-0.1.0.txt`; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); notice = 'ui.exported';
  } catch { notice = 'ui.exportFailed'; }
  render('[data-action="export"]');
}
app.addEventListener('click', event => {
  if (revealing && (event.target as Element).closest('.preferences > summary')) {
    event.preventDefault(); stopReveal(); render(); document.querySelector<HTMLDetailsElement>('.preferences')!.open = true; document.querySelector<HTMLElement>('.preferences > summary')!.focus(); return;
  }
  const control = (event.target as Element).closest<HTMLElement>('[data-action]');
  if (!control || control.hasAttribute('disabled')) return;
  event.preventDefault();
  const action = control.dataset.action;
  if (action === 'dialog-close') { document.querySelector<HTMLDialogElement>('#record-dialog')?.close(); return; }
  if (action === 'start') { start(); return; }
  if (action === 'resume') {
    state = state || retainedState; if (!state) return;
    locale = state.locale; cover = false; stopReveal(); persist(); render('#main-title'); return;
  }
  if (action === 'cover') { stopReveal(); cover = true; render('#main-title'); return; }
  if (action === 'reset') { confirmReset(false); return; }
  if (action === 'restart') { confirmReset(true); return; }
  if (action === 'reset-confirm') {
    stopReveal(); const removed = eraseSave(storage); state = null; retainedState = null; cover = true; saveEnabled = false; protectedSave = !removed; notice = removed ? 'ui.resetDone' : 'ui.resetFailed'; render('#main-title'); return;
  }
  if (action === 'restart-confirm') {
    if (!protectedSave) { const removed = eraseSave(storage); if (!removed) { saveEnabled = false; notice = 'ui.resetFailed'; } }
    retainedState = null; start(); return;
  }
  if (action === 'originals') { openOriginals(); return; }
  if (!state || cover) return;
  if (action === 'select') { state = selectIntent(state, control.dataset.intent!); persist(); render(`[data-intent="${control.dataset.intent}"]`); }
  else if (action === 'clear') { state = { ...state, selectedIntentId: null }; persist(); render('[data-action="select"]'); }
  else if (action === 'submit') {
    state = submitIntent(state); persist(); stopReveal(); revealing = !reduceMotion; render('#main-title');
    if (revealing) revealTimer = setTimeout(() => {
      const focused = document.activeElement as HTMLElement; const selector = focused?.id ? `#${focused.id}` : focused?.dataset.action ? `[data-action="${focused.dataset.action}"]` : undefined;
      revealing = false; revealTimer = null; render(selector);
    }, 1600);
  } else if (action === 'skip') { stopReveal(); render('[data-action="correct"]'); }
  else if ((action === 'accept' || action === 'correct') && !revealing) { state = resolveReply(state, action); persist(); render('.outcome h3'); }
  else if (action === 'next') { state = turnPage(state); persist(); render('#main-title'); }
  else if (action === 'export') exportChapter();
});

render();
