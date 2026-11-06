import { createTranslator } from '../../i18n/core.js';
import { catalogs } from './catalogs.js';

export const defaultCast = {
  painter: {
    name: 'Mara', pronouns: 'she/her', subject: 'she', object: 'her', possessive: 'her',
    description: catalogs.en['cast.description'],
    descriptions: Object.fromEntries(Object.entries(catalogs).map(([locale, values]) => [locale, values['cast.description']])),
    subjects: Object.fromEntries(Object.entries(catalogs).map(([locale, values]) => [locale, values['cast.subject']])),
  },
};

export function localizeCast(cast, locale) {
  const painter = cast.painter;
  const description = locale === 'en' ? painter.description ?? painter.descriptions?.en : painter.descriptions?.[locale];
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error(`The painter cast needs an authored description for ${locale}.`);
  }
  return { ...cast, painter: { ...painter, description } };
}

export function makeContent(cast, locale = 'en') {
  const t = createTranslator(catalogs, locale);
  const values = {
    name: cast.painter.name,
    // Preserve English recasting grammar. CJK uses an authored, gender-neutral
    // noun phrase unless the author supplies a locale-specific form.
    subject: locale === 'en' ? cast.painter.subject : cast.painter.subjects?.[locale] || t('cast.subject'),
  };
  // Complete question variants preserve English agreement for singular they,
  // we/you and explicitly authored casts; CJK keeps its own full sentence.
  const agreement = cast.painter.subjectAgreement || (['they', 'we', 'you'].includes(String(values.subject).toLowerCase()) ? 'plural' : 'singular');
  if (!['singular', 'plural'].includes(agreement)) throw new Error('Unknown cast subject agreement');
  values.question = t(`ui.welcomeQuestion.${agreement}`, { subject: values.subject });
  const content = {};
  for (const key of Object.keys(catalogs.en)) {
    if (key === 'duration' || /^(ui|cast|assets)\./.test(key)) continue;
    const path = key.split('.');
    let node = content;
    for (const part of path.slice(0, -1)) node = node[part] ||= {};
    const params = Object.fromEntries([...catalogs.en[key].matchAll(/\{(\w+)\}/g)].map(([, name]) => [name, values[name]]));
    node[path.at(-1)] = t(key, params);
  }
  content.interpretations = ['repair', 'meet', 'unfinished'].map(id => ({ id, ...content.interpretations[id] }));
  return content;
}
