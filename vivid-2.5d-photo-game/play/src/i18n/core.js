export const LOCALES = Object.freeze(['en', 'ja', 'zh-Hans']);
export const LOCALE_KEY = 'vivid:locale';

// Traditional Chinese is deliberately not treated as Simplified Chinese.
export function normalizeLocale(value) {
  if (typeof value !== 'string') return null;
  const tag = value.trim().replaceAll('_', '-').toLowerCase();
  if (/^en(?:-|$)/.test(tag)) return 'en';
  if (/^ja(?:-|$)/.test(tag)) return 'ja';
  if (/^zh-hant(?:-|$)/.test(tag)) return null;
  if (/^zh-hans(?:-|$)/.test(tag) || /^zh-(?:cn|sg)(?:-|$)/.test(tag)) return 'zh-Hans';
  return null;
}

export function resolveLocale({ explicit, saved, languages = [] } = {}) {
  return [explicit, saved, ...languages].map(normalizeLocale).find(Boolean) || 'en';
}

export function readLocalePreference(storage) {
  try { return storage?.getItem(LOCALE_KEY) || null; } catch { return null; }
}

export function rememberLocale(locale, storage) {
  if (!LOCALES.includes(locale)) throw new Error('Unsupported locale');
  try { storage?.setItem(LOCALE_KEY, locale); return !!storage; } catch { return false; }
}

export function placeholders(message) {
  return [...new Set([...message.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)].map(match => match[1]))].sort();
}

export function validateCatalogs(catalogs) {
  if (!catalogs || typeof catalogs !== 'object' || Array.isArray(catalogs)) throw new Error('Message catalogs are required');
  if (JSON.stringify(Object.keys(catalogs).sort()) !== JSON.stringify([...LOCALES].sort())) throw new Error('Catalog locales must match the supported locales');
  const keys = Object.keys(catalogs.en || {}).sort();
  if (!keys.length) throw new Error('English catalog cannot be empty');
  for (const locale of LOCALES) {
    const catalog = catalogs[locale];
    if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog) || JSON.stringify(Object.keys(catalog).sort()) !== JSON.stringify(keys)) throw new Error(`Message key mismatch: ${locale}`);
    for (const key of keys) {
      const message = catalog[key];
      if (typeof message !== 'string' || !message.trim()) throw new Error(`Empty message: ${locale}.${key}`);
      if (/[{}]/.test(message.replace(/\{[A-Za-z][A-Za-z0-9_]*\}/g, ''))) throw new Error(`Malformed placeholder: ${locale}.${key}`);
      if (JSON.stringify(placeholders(message)) !== JSON.stringify(placeholders(catalogs.en[key]))) throw new Error(`Placeholder mismatch: ${locale}.${key}`);
    }
  }
  return keys.length;
}

export function createTranslator(catalogs, locale = 'en') {
  validateCatalogs(catalogs);
  if (!LOCALES.includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
  return (key, params = {}) => {
    if (!Object.hasOwn(catalogs[locale], key)) throw new Error(`Missing message: ${locale}.${key}`);
    const message = catalogs[locale][key];
    const expected = placeholders(message);
    if (JSON.stringify(Object.keys(params).sort()) !== JSON.stringify(expected)) throw new Error(`Message parameters differ: ${locale}.${key}`);
    return message.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (_, name) => {
      if (!['string', 'number'].includes(typeof params[name])) throw new Error(`Invalid message parameter: ${name}`);
      return String(params[name]);
    });
  };
}
