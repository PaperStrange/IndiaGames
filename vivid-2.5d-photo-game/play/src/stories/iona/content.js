import { createTranslator } from '../../i18n/core.js';
import { catalogs } from './catalogs.js';

// Names and descriptions belong to the cast; actor/object IDs stay in index.js.
export const defaultCast = {
  keeper: {
    name: 'Iona', pronouns: 'she/her', subject: 'she', object: 'her', possessive: 'her',
    portrait: 'art/keeper-portrait.svg',
    description: catalogs.en['cast.description'],
    descriptions: Object.fromEntries(Object.entries(catalogs).map(([locale, values]) => [locale, values['cast.description']])),
  },
};

export function localizeCast(cast, locale) {
  const keeper = cast.keeper;
  const description = locale === 'en' ? keeper.description ?? keeper.descriptions?.en : keeper.descriptions?.[locale];
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error(`The keeper cast needs an authored description for ${locale}.`);
  }
  return { ...cast, keeper: { ...keeper, description } };
}

export function makeContent(cast, locale = 'en') {
  const t = createTranslator(catalogs, locale);
  const content = {};
  for (const key of Object.keys(catalogs.en)) {
    if (key === 'duration' || /^(ui|cast|assets)\./.test(key)) continue;
    const path = key.split('.');
    let node = content;
    for (const part of path.slice(0, -1)) node = node[part] ||= {};
    node[path.at(-1)] = t(key, catalogs.en[key].includes('{name}') ? { name: cast.keeper.name } : {});
  }
  return content;
}
