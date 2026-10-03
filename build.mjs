#!/usr/bin/env node
// Build the single-file distribution: inlines css/, js/ and the town map
// (as base64) into dist/thirteenth-bell-playable-demo.html.
// The committed dist/ file must always be the output of this script —
// tests/dist-freshness is enforced by tests/check_static.py.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFileSync(join(root, p), 'utf8');

let html = read('index.html');
const css = read('css/main.css');
const dataJs = read('js/data.js');
const engineJs = read('js/engine.js');
const mapB64 = readFileSync(join(root, 'assets/images/town-map.webp')).toString('base64');

function replaceOrThrow(haystack, needle, replacer, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`build.mjs: anchor not found for ${label} — index.html was likely reformatted; update the anchor in build.mjs`);
  }
  return haystack.replace(needle, replacer);
}

// NOTE: replacements use replacer *functions* (() => str), never plain strings:
// String.replace interprets `$` patterns (e.g. `$$` -> `$`) in a string
// replacement, which would silently corrupt the game's `$$` helper.
html = replaceOrThrow(
  html,
  '<link rel="stylesheet" href="css/main.css">',
  () => `<style>\n${css}\n</style>`,
  'css link'
);
html = replaceOrThrow(
  html,
  '<script src="js/data.js"></script>\n    <script src="js/engine.js"></script>',
  () => `<script>\n${dataJs}\n${engineJs}\n</script>`,
  'js scripts'
);
const mapNeedle = 'assets/images/town-map.webp';
if (html.split(mapNeedle).length - 1 !== 1) {
  throw new Error(`build.mjs: expected exactly 1 town-map reference, found ${html.split(mapNeedle).length - 1}`);
}
html = html.replace(mapNeedle, () => `data:image/webp;base64,${mapB64}`);

mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist/thirteenth-bell-playable-demo.html');
writeFileSync(out, html);
console.log('wrote', out, Buffer.byteLength(html), 'bytes');
