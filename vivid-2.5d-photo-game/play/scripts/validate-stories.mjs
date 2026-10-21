import { access, realpath, stat } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog } from '../src/stories/catalog.js';
import { loadStory, validateViewModel, assertSerializable } from '../src/runtime/validate.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(root, 'public');
const seen = new Set();
let views = 0;
let assets = 0;

if (!Array.isArray(catalog) || catalog.length === 0) throw new Error('The catalog needs at least one story');
for (const entry of catalog) {
  if (seen.has(entry.id)) throw new Error(`Duplicate catalog story ${entry.id}`);
  seen.add(entry.id);
  const pack = await loadStory(entry);
  for (const key of ['title', 'subtitle', 'description', 'duration']) {
    if (entry[key] !== pack.manifest[key]) throw new Error(`Catalog ${entry.id}.${key} differs from its story manifest`);
  }
  if (entry.presentation) {
    const initialScene = pack.getViewModel(pack.createState()).scene;
    if (entry.presentation.kind !== initialScene.kind) throw new Error(`Catalog ${entry.id} has the wrong scene presentation`);
    if (entry.presentation.art && !pack.manifest.assets.some(asset => asset.src === entry.presentation.art)) {
      throw new Error(`Catalog artwork for ${entry.id} must be declared in manifest.assets`);
    }
  }
  for (const asset of pack.manifest.assets) {
    const path = resolve(publicRoot, asset.src);
    await access(path);
    const resolvedPath = await realpath(path);
    const publicPath = await realpath(publicRoot);
    const relativePath = relative(publicPath, resolvedPath);
    if (relativePath.startsWith('..') || !(await stat(resolvedPath)).isFile()) {
      throw new Error(`Asset ${entry.id}/${asset.id} must be a file within public/`);
    }
    assets += 1;
  }
  const states = typeof pack.validationStates === 'function'
    ? pack.validationStates() : pack.validationStates || [pack.createState({ profile: 'remembered' })];
  if (!Array.isArray(states) || states.length === 0) throw new Error(`No validation states for ${entry.id}`);
  for (const state of states) {
    assertSerializable(state, `${entry.id} validation state`);
    const before = JSON.stringify(state);
    validateViewModel(pack.getViewModel(state), pack.manifest);
    if (JSON.stringify(state) !== before) throw new Error(`Story ${entry.id} mutates state when creating a view`);
    const saved = pack.serialize(state);
    assertSerializable(saved, `${entry.id} serialized checkpoint`);
    validateViewModel(pack.getViewModel(pack.migrate({ version: pack.manifest.saveVersion, state: saved })), pack.manifest);
    views += 1;
  }
}
console.log(`Validated ${seen.size} story packs, ${views} representative views and ${assets} local asset references.`);
