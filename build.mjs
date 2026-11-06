#!/usr/bin/env node
// Build a self-contained HTML distribution plus its required locale catalog: inline CSS, JS and map
// (as base64) into dist/thirteenth-bell-playable-demo.html.
// dist/ is generated local output. --output FILE supports isolated validation
// without replacing an existing build; frozen candidates live on master.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import vm from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--output' || !args[1])) {
  throw new Error('Usage: node build.mjs [--output FILE]');
}
const out = args.length ? resolve(args[1]) : join(root, 'dist/thirteenth-bell-playable-demo.html');
const read = (p) => readFileSync(join(root, p), 'utf8');

let html = read('index.html');
const css = read('css/main.css');
const scriptPaths = ['js/actions.js','js/echo-time.js','js/square-event.js','js/story-locales.js','js/ui-locales.js','js/messages.js','js/i18n.js','js/data.js','js/engine.js'];
const scripts = Object.fromEntries(scriptPaths.map(path => [path, read(path)]));
// Validate the entire translation contract before writing either output file.
const context = {window:{}};
for (const path of ['js/messages.js','js/story-locales.js','js/ui-locales.js','js/data.js','js/i18n.js']) vm.runInNewContext(scripts[path], context, {filename:path});
context.window.TTB_I18N.validate(context.window.TTB_DATA);
const localeCatalog = {schema_version:1,game:'thirteenth-bell',default_locale:'en',locales:['en','ja','zh-Hans'],units:[{id:'thirteenth-bell',locales:['en','ja','zh-Hans']}]};
const mapB64 = readFileSync(join(root, 'assets/images/town-map.svg')).toString('base64');

function replaceOrThrow(haystack, needle, replacer, label) {
  const count = haystack.split(needle).length - 1;
  if (count !== 1) {
    throw new Error(`build.mjs: expected exactly 1 anchor for ${label}, found ${count} — check index.html and its build anchor`);
  }
  return haystack.replace(needle, replacer);
}

// NOTE: replacements use replacer *functions* (() => str), never plain strings:
// String.replace interprets `$` patterns (e.g. `$$` -> `$`) in a string
// replacement, which would silently corrupt the game's `$$` helper.
for (const path of scriptPaths) {
  html = replaceOrThrow(html, `<script src="${path}"></script>`, () => `<script>\n${scripts[path]}\n</script>`, path === 'js/echo-time.js' ? 'echo rules' : path);
}
html = replaceOrThrow(html, '<link rel="stylesheet" href="css/main.css">', () => `<style>\n${css}\n</style>`, 'css link');
html = replaceOrThrow(html, 'assets/images/town-map.svg', () => `data:image/svg+xml;base64,${mapB64}`, 'town map');

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
writeFileSync(join(dirname(out), 'locale-catalog.json'), JSON.stringify(localeCatalog, null, 2)+'\n');
console.log('wrote', out, Buffer.byteLength(html), 'bytes');
