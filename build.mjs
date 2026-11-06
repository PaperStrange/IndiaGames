#!/usr/bin/env node
// Build the single-file distribution: inlines css/, js/ and the town map
// (as base64) into dist/thirteenth-bell-playable-demo.html.
// dist/ is generated local output. --output FILE supports isolated validation
// without replacing an existing build; frozen candidates live on master.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--output' || !args[1])) {
  throw new Error('Usage: node build.mjs [--output FILE]');
}
const out = args.length ? resolve(args[1]) : join(root, 'dist/thirteenth-bell-playable-demo.html');
const read = (p) => readFileSync(join(root, p), 'utf8');

let html = read('index.html');
const css = read('css/main.css');
const dataJs = read('js/data.js');
const echoJs = read('js/echo-time.js');
const squareJs = read('js/square-event.js');
const engineJs = read('js/engine.js');
const mapB64 = readFileSync(join(root, 'assets/images/town-map.webp')).toString('base64');

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
html = replaceOrThrow(html, '<script src="js/echo-time.js"></script>', () => `<script>\n${echoJs}\n</script>`, 'echo rules');
html = replaceOrThrow(html, '<script src="js/square-event.js"></script>', () => `<script>\n${squareJs}\n</script>`, 'square event rules');
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
html = replaceOrThrow(html, mapNeedle, () => `data:image/webp;base64,${mapB64}`, 'town map');

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log('wrote', out, Buffer.byteLength(html), 'bytes');
