import { build } from 'vite';
import { readFile, writeFile, readdir, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { CATALOGS, LOCALES, STORY } from '../src/content/index.ts';
import { buildInputs } from './build-inputs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const englishKeys = Object.keys(CATALOGS.en).sort();
for (const locale of LOCALES) {
  if (JSON.stringify(Object.keys(CATALOGS[locale]).sort()) !== JSON.stringify(englishKeys)) throw new Error(`Catalog key mismatch: ${locale}`);
  for (const [key, value] of Object.entries(CATALOGS[locale])) if (typeof value !== 'string' || !value.trim()) throw new Error(`Empty message: ${locale}/${key}`);
}
const semanticIds = new Set();
const requireKey = key => { for (const locale of LOCALES) if (!CATALOGS[locale][key]) throw new Error(`Missing story message ${locale}/${key}`); };
requireKey(STORY.titleKey); requireKey(STORY.subtitleKey); STORY.introKeys.forEach(requireKey);
for (const role of Object.values(STORY.cast)) requireKey(role.nameKey);
for (const beat of STORY.beats) {
  if (semanticIds.has(beat.id)) throw new Error('Duplicate beat ID'); semanticIds.add(beat.id);
  [beat.sceneKey, beat.promptKey, ...Object.values(beat.arrivalKeys)].forEach(requireKey);
  for (const intent of beat.options) {
    if (semanticIds.has(intent.id)) throw new Error('Duplicate intent ID'); semanticIds.add(intent.id);
    [intent.labelKey, intent.sourceKey, intent.replyKey, ...Object.values(intent.outcomeKeys)].forEach(requireKey);
  }
}
for (const ending of STORY.endings) [ending.titleKey, ending.bodyKey, ...Object.values(ending.patternKeys)].forEach(requireKey);
const before = await buildInputs(root);
await build({ root, configFile: path.join(root, 'vite.config.ts') });
const inputs = await buildInputs(root);
if (inputs.sha256 !== before.sha256) throw new Error('Build inputs changed during compilation; stop concurrent edits and rebuild');
await writeFile(path.join(root, 'dist/locale-catalog.json'), JSON.stringify({ schema_version: 1, game: 'toms-notebook', default_locale: 'en', locales: LOCALES, units: [{ id: 'toms-notebook', locales: LOCALES }] }, null, 2) + '\n');
await writeFile(path.join(root, 'dist/build-info.json'), JSON.stringify({ schema_version: 1, kind: 'development-preview', game: 'toms-notebook', version: pkg.version, story: { id: STORY.id, version: STORY.version }, source_inputs_sha256: inputs.sha256, catalogs_sha256: createHash('sha256').update(JSON.stringify(CATALOGS)).digest('hex'), translation_status: { en: 'draft', ja: 'draft', 'zh-Hans': 'draft' } }, null, 2) + '\n');
async function inspect(dir) {
  for (const name of await readdir(dir)) {
    const file = path.join(dir, name), stat = await lstat(file);
    if (stat.isSymbolicLink()) throw new Error('Build contains symbolic link');
    if (stat.isDirectory()) await inspect(file);
    else if (!stat.isFile()) throw new Error('Unexpected build entry');
  }
}
await inspect(path.join(root, 'dist'));
console.log(`Built ${pkg.version}: ${LOCALES.length} complete catalogs, ${englishKeys.length} messages each, ${STORY.beats.length} exchanges.`);
