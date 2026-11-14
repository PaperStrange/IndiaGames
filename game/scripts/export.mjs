import { readFile, readdir, lstat, mkdir, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { buildInputs } from './build-inputs.mjs';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const args = process.argv.slice(2);
const argument = flag => { const index = args.indexOf(flag); return index < 0 ? null : args[index + 1]; };
const outArgument = argument('--out'), version = argument('--version');
if (!outArgument || !version) throw new Error('Usage: npm run export -- --version 0.1.0 --out /new/path [--allow-dirty]');
const out = path.resolve(outArgument);
if (out === root || out.startsWith(root + path.sep)) throw new Error('Export must be outside the game source directory');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
if (version !== pkg.version) throw new Error(`Version must match package ${pkg.version}`);
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const dirty = !!execFileSync('git', ['status', '--porcelain', '--untracked-files=all', '--', '.'], { cwd: root, encoding: 'utf8' }).trim();
if (dirty && !args.includes('--allow-dirty')) throw new Error('Game source is dirty; commit before an immutable export, or explicitly mark development --allow-dirty');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
async function inventory(dir, prefix = '') {
  const files = [];
  for (const name of (await readdir(dir)).sort()) {
    const relative = prefix ? `${prefix}/${name}` : name;
    const full = path.join(dir, name), stat = await lstat(full);
    if (stat.isSymbolicLink()) throw new Error(`Symbolic link rejected: ${relative}`);
    if (stat.isDirectory()) files.push(...await inventory(full, relative));
    else if (stat.isFile()) files.push({ path: relative, bytes: stat.size, sha256: sha(await readFile(full)) });
    else throw new Error(`Non-file rejected: ${relative}`);
  }
  return files;
}
const files = await inventory(path.join(root, 'dist'));
const buildFiles = Object.fromEntries(files.map(file => [file.path, file.sha256]).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
const exact = new Set(['index.html', 'locale-catalog.json', 'build-info.json', 'favicon.svg', 'fonts/caveat.ttf', 'fonts/OFL.txt', 'materials/leather-alpha-02.webp', 'materials/vellum-alpha-02.webp']);
for (const file of files) {
  if (!exact.has(file.path) && !/^assets\/index-[A-Za-z0-9_-]+\.(js|css)$/.test(file.path)) throw new Error(`Non-game asset rejected: ${file.path}`);
}
for (const required of exact) if (!files.some(file => file.path === required)) throw new Error(`Missing asset: ${required}`);
if (files.filter(file => /^assets\/.*\.js$/.test(file.path)).length !== 1 || files.filter(file => /^assets\/.*\.css$/.test(file.path)).length !== 1) throw new Error('Expected one runtime and one stylesheet');
const info = JSON.parse(await readFile(path.join(root, 'dist/build-info.json'), 'utf8'));
if (info.version !== version || info.game !== 'toms-notebook' || info.kind !== 'development-preview') throw new Error('Build identity mismatch; rebuild');
const inputs = await buildInputs(root);
if (info.source_inputs_sha256 !== inputs.sha256) throw new Error('Build inputs changed after compilation; rebuild before export');
const localeCatalog = JSON.parse(await readFile(path.join(root, 'dist/locale-catalog.json'), 'utf8'));
if (JSON.stringify(localeCatalog) !== JSON.stringify({ schema_version: 1, game: 'toms-notebook', default_locale: 'en', locales: ['en', 'ja', 'zh-Hans'], units: [{ id: 'toms-notebook', locales: ['en', 'ja', 'zh-Hans'] }] })) throw new Error('Locale catalog mismatch');
await mkdir(out, { recursive: false });
try {
  await cp(path.join(root, 'dist'), path.join(out, 'build'), { recursive: true, errorOnExist: true });
  const copied = await inventory(path.join(out, 'build'));
  if (JSON.stringify(copied) !== JSON.stringify(files)) throw new Error('Copied inventory differs');
  const manifest = { schema_version: 1, kind: 'development-preview', official_release: false, game: 'toms-notebook', version, source_commit: sourceCommit, source_dirty: dirty, source_inputs_sha256: inputs.sha256, build_inventory_sha256: sha(Buffer.from(JSON.stringify(buildFiles))), build_files: buildFiles, build_bytes: files.reduce((sum, file) => sum + file.bytes, 0), files };
  await writeFile(path.join(out, 'development-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ out, source_commit: sourceCommit, source_dirty: dirty, files: files.length, inventory: manifest.build_inventory_sha256 }));
} catch (error) {
  throw new Error(`Export incomplete at ${out}; preserve it for diagnosis: ${error.message}`);
}
