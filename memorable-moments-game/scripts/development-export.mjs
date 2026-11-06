import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, lstat, readdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, localeCatalog, validateCatalogs } from '../play/locales.js';

export const PLAY_PATH = 'memorable-moments-game/play';
export const PLAY_FILES = Object.freeze(['README.md', 'content.js', 'countdown.js', 'game.js', 'icons.js', 'index.html', 'locale-catalog.json', 'locales.js', 'messages.js', 'state.js', 'style.css', 'views.js']);
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const git = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], { maxBuffer: 8 * 1024 * 1024 });

export function assertFileSet(actual) {
  const missing = PLAY_FILES.filter(name => !actual.includes(name));
  const extra = actual.filter(name => !PLAY_FILES.includes(name));
  if (missing.length || extra.length) throw new Error(`Playable file set differs: missing [${missing.join(', ')}]; extra [${extra.join(', ')}]`);
}

export async function validateLocaleArtifact(files) {
  const byName = Object.fromEntries(files.map(file => [file.name, file.bytes]));
  assert.deepEqual(JSON.parse(byName['locale-catalog.json'].toString()), localeCatalog, 'Locale catalog metadata differs from the supported scope.');
  // Load the exact exported data module, not another checkout's translations.
  const { messageRows } = await import(`data:text/javascript;base64,${Buffer.from(byName['messages.js']).toString('base64')}`);
  assert(Object.values(messageRows).every(row => Array.isArray(row) && row.length === LOCALES.length), 'Every message needs exactly three translations.');
  validateCatalogs(Object.fromEntries(LOCALES.map((locale, i) => [locale, Object.fromEntries(Object.entries(messageRows).map(([key, row]) => [key, row[i]]))])));
}

export async function inventory(directory) {
  const names = (await readdir(directory)).sort();
  assertFileSet(names);
  const files = {};
  let bytes = 0;
  for (const name of names) {
    const filename = path.join(directory, name);
    if (!(await lstat(filename)).isFile()) throw new Error(`Expected regular playable file: ${name}`);
    const content = await readFile(filename);
    files[name] = sha(content); bytes += content.length;
  }
  // Existing development convention: UTF-8 compact JSON of the sorted filename/hash map.
  const inventory_sha256 = sha(JSON.stringify(files));
  return { files, file_count: names.length, bytes, inventory_sha256 };
}

export function pinnedFiles(repo, commit) {
  if (!/^[0-9a-f]{40}$/.test(commit || '')) throw new Error('Provide --commit as a full 40-character lowercase Git commit SHA, not a moving branch.');
  const resolved = git(repo, 'rev-parse', '--verify', `${commit}^{commit}`).toString().trim();
  assert.equal(resolved, commit, 'Source must identify a commit, not a tag object.');
  const entries = git(repo, 'ls-tree', '-rz', '--full-tree', commit, '--', PLAY_PATH).toString().split('\0').filter(Boolean).map(row => {
    const match = row.match(/^(\d+) (\w+) ([0-9a-f]{40})\t(.+)$/);
    if (!match) throw new Error('Unrecognized Git tree entry.');
    const [, mode, type, object, filename] = match;
    if (mode !== '100644' || type !== 'blob') throw new Error(`Expected non-executable regular playable file: ${filename}`);
    return { name: filename.slice(PLAY_PATH.length + 1), object };
  });
  assertFileSet(entries.map(entry => entry.name));
  return entries.sort((a, b) => a.name.localeCompare(b.name)).map(entry => ({ name: entry.name, bytes: git(repo, 'cat-file', 'blob', entry.object) }));
}

export async function exportDevelopment({ repo, commit, output }) {
  // Resolve and validate the complete committed tree before creating any output.
  const files = pinnedFiles(repo, commit);
  await validateLocaleArtifact(files);
  const requested = path.resolve(output);
  const target = path.join(await realpath(path.dirname(requested)), path.basename(requested));
  const checkout = await realpath(git(repo, 'rev-parse', '--show-toplevel').toString().trim());
  const relative = path.relative(checkout, target);
  if (!relative || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative))) {
    throw new Error('Export output must be outside the source checkout.');
  }
  await mkdir(target); // Fail closed on any existing destination; never overwrite evidence.
  for (const file of files) await writeFile(path.join(target, file.name), file.bytes, { flag: 'wx' });
  return inventory(target);
}

export function argumentsFrom(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    if (!['--repo', '--commit', '--output'].includes(key) || !argv[i + 1] || key in options) throw new Error('Usage: --repo PATH --commit FULL_SHA --output NEW_EXTERNAL_DIRECTORY');
    options[key] = argv[i + 1];
  }
  if (Object.keys(options).length !== 3) throw new Error('Usage: --repo PATH --commit FULL_SHA --output NEW_EXTERNAL_DIRECTORY');
  return { repo: path.resolve(options['--repo']), commit: options['--commit'], output: path.resolve(options['--output']) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = argumentsFrom(process.argv.slice(2));
    console.log(JSON.stringify({ source_commit: options.commit, source_path: PLAY_PATH, development_only: true, ...(await exportDevelopment(options)) }, null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
