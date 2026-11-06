// One story identity per story. Locale selects presentation resources, never a
// new save namespace, release profile, action set, or protagonist identity.
import { makeContent as ionaContent, defaultCast as ionaCast } from './iona/content.js';
import { catalogs as ionaCatalogs } from './iona/catalogs.js';
import { makeContent as maraContent, defaultCast as maraCast } from './mara/content.js';
import { catalogs as maraCatalogs } from './mara/catalogs.js';
import { createTranslator } from '../i18n/core.js';

export function getCatalog(locale = 'en') {
  const iona = ionaContent(ionaCast, locale);
  const mara = maraContent(maraCast, locale);
  return [
    {
      id: 'iona', title: iona.title, subtitle: iona.subtitle,
      description: iona.description, duration: createTranslator(ionaCatalogs, locale)('duration'),
      presentation: { kind: 'portrait', art: 'art/keeper-portrait.svg' },
      load: async () => ({ pack: (await import('./iona/index.js')).createIonaPack({ locale }) }),
    },
    {
      id: 'mara', title: mara.title, subtitle: mara.subtitle,
      description: mara.description, duration: createTranslator(maraCatalogs, locale)('duration'),
      presentation: { kind: 'workbench', art: 'art/postcard.svg' },
      load: async () => ({ pack: (await import('./mara/index.js')).createMaraPack({ locale }) }),
    },
  ];
}
export const catalog = getCatalog();
