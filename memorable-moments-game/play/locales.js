import { messageRows } from './messages.js';
export const LOCALES = Object.freeze(['en', 'ja', 'zh-Hans']);
export const LOCALE_KEY = 'small-hours.locale.v1';
export const localeCatalog = Object.freeze({ schema_version: 1, game: 'small-hours', default_locale: 'en', locales: LOCALES, units: [{ id: 'small-hours', locales: LOCALES }] });
export const catalogs = Object.fromEntries(LOCALES.map((locale, i) => [locale, Object.fromEntries(Object.entries(messageRows).map(([key, values]) => [key, values[i]]))]));
const placeholders = text => [...text.matchAll(/\{([a-z]+)\}/g)].map(match => match[1]).sort();
export function validateCatalogs(value = catalogs) {
  if (JSON.stringify(Object.keys(value).sort()) !== JSON.stringify([...LOCALES].sort())) throw new Error('Locale catalog set mismatch');
  const keys = Object.keys(catalogs.en).sort();
  if (!keys.length) throw new Error('Empty message catalog');
  for (const locale of LOCALES) {
    if (JSON.stringify(Object.keys(value[locale]).sort()) !== JSON.stringify(keys)) throw new Error(`Missing or extra message in ${locale}`);
    for (const key of keys) {
      const text = value[locale][key];
      if (typeof text !== 'string' || !text.trim()) throw new Error(`Missing message ${locale}:${key}`);
      if (JSON.stringify(placeholders(text)) !== JSON.stringify(placeholders(value.en[key]))) throw new Error(`Placeholder mismatch ${locale}:${key}`);
    }
  }
  return true;
}
validateCatalogs();
export function message(locale, key, values = {}) {
  const text = catalogs[locale]?.[key];
  if (typeof text !== 'string') throw new Error(`Unknown message ${locale}:${key}`);
  const expected = [...new Set(placeholders(text))];
  if (expected.some(key => !(key in values)) || Object.keys(values).some(key => !expected.includes(key))) throw new Error(`Message arguments differ: ${key}`);
  return text.replace(/\{([a-z]+)\}/g, (_, name) => String(values[name]));
}
export function supportedLocale(value) {
  if (typeof value !== 'string') return null;
  const tag = value.replaceAll('_', '-').toLowerCase();
  if (/^en(?:-|$)/.test(tag)) return 'en';
  if (/^ja(?:-|$)/.test(tag)) return 'ja';
  // Explicit Traditional script always wins over a region hint; bare zh is ambiguous.
  if (tag.includes('-hant')) return null;
  if (/^zh-hans(?:-|$)/.test(tag) || /^zh-(cn|sg)(?:-|$)/.test(tag)) return 'zh-Hans';
  return null;
}
export function resolveLocale({ explicit, saved, languages = [] } = {}) {
  return supportedLocale(explicit) || supportedLocale(saved) || languages.map(supportedLocale).find(Boolean) || 'en';
}
export function readPreference(storage) { try { return { locale: supportedLocale(storage().getItem(LOCALE_KEY)), available: true }; } catch { return { locale: null, available: false }; } }
export function savePreference(storage, locale) { if (!LOCALES.includes(locale)) return false; try { storage().setItem(LOCALE_KEY, locale); return true; } catch { return false; } }
export function fontStack(locale) { return locale === 'zh-Hans' ? 'Noto Sans CJK SC, PingFang SC, Microsoft YaHei, Noto Sans CJK JP, sans-serif' : 'Noto Sans CJK JP, Hiragino Sans, Yu Gothic, Noto Sans CJK SC, Arial, sans-serif'; }
// Modern supported browsers use UAX #29 segmentation. The conservative fallback
// joins marks/variation selectors/ZWJ/flags instead of cutting their UTF-16 units.
export function graphemes(value) {
  if (typeof Intl.Segmenter === 'function') return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value)].map(part => part.segment);
  const parts = []; let regional = 0;
  for (const char of Array.from(value)) {
    const isRegional = /[\u{1F1E6}-\u{1F1FF}]/u.test(char);
    if (parts.length && (/\p{Mark}|[\uFE0E\uFE0F\u200D\u{1F3FB}-\u{1F3FF}]/u.test(char) || parts.at(-1).endsWith('\u200D') || (isRegional && regional % 2 === 1))) parts[parts.length - 1] += char;
    else parts.push(char);
    regional = isRegional ? regional + 1 : 0;
  }
  return parts;
}
export const limitText = (value, limit = 120) => graphemes(value).slice(0, limit).join('');
