import { STORY, LOCALES, catalog } from './content/index.ts';
import type { Locale, PriorPattern } from './content/types.ts';

export const SAVE_KEY = 'toms-notebook.borrowed-words.save.v1';
export const PREF_KEY = 'toms-notebook.borrowed-words.preferences.v1';
export type Resolution = 'accept' | 'correct';
export type Phase = 'reading' | 'reply' | 'resolved' | 'ending';
export type Entry = {
  beatId: string;
  intentId: string;
  locale: Locale;
  sourceText: string;
  replyText: string;
  resolution: Resolution | null;
  outcomeText: string | null;
};
export type GameState = {
  schemaVersion: 1;
  storyId: string;
  storyVersion: number;
  locale: Locale;
  phase: Phase;
  beat: number;
  selectedIntentId: string | null;
  entries: Entry[];
};

export function supportedLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function preferredLocale(explicit?: string | null, saved?: string | null, languages: readonly string[] = []): Locale {
  if (supportedLocale(explicit)) return explicit;
  if (supportedLocale(saved)) return saved;
  for (const language of languages) {
    const lower = language.toLowerCase();
    if (lower === 'ja' || lower.startsWith('ja-')) return 'ja';
    if (lower === 'en' || lower.startsWith('en-')) return 'en';
    // Traditional Chinese is deliberately not silently mapped to Simplified.
    if (lower === 'zh-hans' || lower.startsWith('zh-hans-') || lower === 'zh-cn' || lower === 'zh-sg') return 'zh-Hans';
  }
  return 'en';
}

export function newGame(locale: Locale): GameState {
  return { schemaVersion: 1, storyId: STORY.id, storyVersion: STORY.version, locale, phase: 'reading', beat: 0, selectedIntentId: null, entries: [] };
}

export function selectIntent(state: GameState, intentId: string): GameState {
  if (state.phase !== 'reading' || !STORY.beats[state.beat]?.options.some(option => option.id === intentId)) throw new Error('Unavailable intent');
  return { ...state, selectedIntentId: intentId };
}

export function submitIntent(state: GameState): GameState {
  if (state.phase !== 'reading') throw new Error('Entry already submitted');
  const beat = STORY.beats[state.beat];
  const intent = beat.options.find(option => option.id === state.selectedIntentId);
  if (!intent) throw new Error('Choose an intent before submitting');
  const strings = catalog(state.locale);
  const entry: Entry = { beatId: beat.id, intentId: intent.id, locale: state.locale, sourceText: strings[intent.sourceKey], replyText: strings[intent.replyKey], resolution: null, outcomeText: null };
  return { ...state, phase: 'reply', selectedIntentId: null, entries: [...state.entries, entry] };
}

export function resolveReply(state: GameState, resolution: Resolution): GameState {
  if (state.phase !== 'reply' || !['accept', 'correct'].includes(resolution)) throw new Error('No unresolved reply');
  const entry = state.entries.at(-1)!;
  const intent = STORY.beats[state.beat].options.find(option => option.id === entry.intentId)!;
  return { ...state, phase: 'resolved', entries: [...state.entries.slice(0, -1), { ...entry, resolution, outcomeText: catalog(state.locale)[intent.outcomeKeys[resolution]] }] };
}

export function turnPage(state: GameState): GameState {
  if (state.phase !== 'resolved') throw new Error('Resolve this reply first');
  return state.beat === STORY.beats.length - 1
    ? { ...state, phase: 'ending' }
    : { ...state, phase: 'reading', beat: state.beat + 1, selectedIntentId: null };
}

export function canChangeLocale(state: GameState | null): boolean {
  return state === null || (state.phase !== 'reply' && state.selectedIntentId === null);
}

export function changeLocale(state: GameState, locale: Locale): GameState {
  if (!supportedLocale(locale) || !canChangeLocale(state)) throw new Error('Finish the current exchange before changing language');
  return { ...state, locale };
}

export function endingId(state: GameState): string | null {
  if (state.phase !== 'ending') return null;
  return state.entries.at(-1)?.resolution === 'correct' ? 'own-hand' : 'borrowed-hand';
}

export function endingPatternKey(state: GameState): string | null {
  if (state.phase !== 'ending') return null;
  const pattern = `${state.entries[0].resolution}-${state.entries[1].resolution}` as PriorPattern;
  return STORY.endings.find(ending => ending.id === endingId(state))!.patternKeys[pattern];
}

export function arrivalKey(state: GameState): string | null {
  if (state.beat === 0) return null;
  const previous = state.entries[state.beat - 1];
  return previous?.resolution ? STORY.beats[state.beat].arrivalKeys[previous.resolution] : null;
}

export function validateState(value: unknown): GameState | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const s = value as GameState;
  if (s.schemaVersion !== 1 || s.storyId !== STORY.id || s.storyVersion !== STORY.version || !supportedLocale(s.locale)
      || !['reading', 'reply', 'resolved', 'ending'].includes(s.phase) || !Number.isInteger(s.beat)
      || s.beat < 0 || s.beat >= STORY.beats.length || !Array.isArray(s.entries)) return null;
  const expectedCount = s.phase === 'reading' ? s.beat : s.beat + 1;
  if (s.entries.length !== expectedCount || (s.phase === 'ending' && s.beat !== STORY.beats.length - 1)) return null;
  if (s.selectedIntentId !== null && (s.phase !== 'reading' || !STORY.beats[s.beat].options.some(o => o.id === s.selectedIntentId))) return null;
  for (const [index, entry] of s.entries.entries()) {
    if (!entry || typeof entry !== 'object' || !supportedLocale(entry.locale)) return null;
    const beat = STORY.beats[index];
    const intent = beat.options.find(option => option.id === entry.intentId);
    if (!intent || entry.beatId !== beat.id || entry.sourceText !== catalog(entry.locale)[intent.sourceKey] || entry.replyText !== catalog(entry.locale)[intent.replyKey]) return null;
    const unresolved = s.phase === 'reply' && index === s.entries.length - 1;
    if (unresolved) {
      if (entry.resolution !== null || entry.outcomeText !== null || entry.locale !== s.locale) return null;
    } else {
      if (entry.resolution !== 'accept' && entry.resolution !== 'correct') return null;
      if (catalog(entry.locale)[intent.outcomeKeys[entry.resolution]] !== entry.outcomeText) return null;
    }
  }
  return structuredClone(s);
}

export type SaveRead = { kind: 'empty' } | { kind: 'saved'; state: GameState } | { kind: 'protected'; reason: 'future' | 'invalid' } | { kind: 'unavailable' };
export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function readSave(storage: StorageLike): SaveRead {
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (raw === null) return { kind: 'empty' };
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return { kind: 'protected', reason: 'invalid' }; }
    if (parsed && typeof parsed === 'object' && 'schemaVersion' in parsed && typeof parsed.schemaVersion === 'number' && parsed.schemaVersion > 1) return { kind: 'protected', reason: 'future' };
    const state = validateState(parsed);
    return state ? { kind: 'saved', state } : { kind: 'protected', reason: 'invalid' };
  } catch { return { kind: 'unavailable' }; }
}

export function writeSave(storage: StorageLike, state: GameState): 'saved' | 'protected' | 'unavailable' {
  const current = readSave(storage);
  if (current.kind === 'protected') return 'protected';
  if (current.kind === 'unavailable' || !validateState(state)) return 'unavailable';
  try { storage.setItem(SAVE_KEY, JSON.stringify(state)); return 'saved'; } catch { return 'unavailable'; }
}

export function eraseSave(storage: StorageLike): boolean {
  try { storage.removeItem(SAVE_KEY); return storage.getItem(SAVE_KEY) === null; } catch { return false; }
}

export function transcript(state: GameState): string {
  const ui = catalog(state.locale);
  const lines = [ui['ui.exportTitle'], ui['ui.exportIdentity'].replace('{version}', '0.1.0').replace('{story}', STORY.id), ui['ui.authoredNote'], ''];
  for (const entry of state.entries) {
    const beat = STORY.beats.find(b => b.id === entry.beatId)!;
    lines.push(ui[beat.sceneKey], ui['ui.originalLocale'].replace('{language}', ui['ui.language.' + entry.locale]), `${ui['ui.exportIntent']}: ${entry.sourceText}`, `${ui['ui.exportReply']}: ${entry.replyText}`);
    if (entry.resolution) lines.push(`${ui['ui.exportResolution']}: ${ui['ui.' + entry.resolution]}`, `${ui['ui.exportOutcome']}: ${entry.outcomeText}`);
    lines.push('');
  }
  const ending = STORY.endings.find(item => item.id === endingId(state));
  if (ending) lines.push(ui[ending.titleKey], ui[endingPatternKey(state)!], ui[ending.bodyKey]);
  lines.push('', ui['ui.exportFooter']);
  return lines.join('\n') + '\n';
}
