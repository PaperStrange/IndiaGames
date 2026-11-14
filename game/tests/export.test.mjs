import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const scratch = await mkdtemp(path.join(os.tmpdir(), 'notebook-export-'));
const run = (output, version = '0.1.0') => execFileSync(process.execPath, ['scripts/export.mjs', '--version', version, '--out', output, '--allow-dirty'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

test('two development exports retain byte-identical build inventories', async () => {
  run(path.join(scratch, 'one')); run(path.join(scratch, 'two'));
  const one = JSON.parse(await readFile(path.join(scratch, 'one/development-manifest.json'), 'utf8'));
  const two = JSON.parse(await readFile(path.join(scratch, 'two/development-manifest.json'), 'utf8'));
  assert.deepEqual(one, two); assert.equal(one.official_release, false); assert.equal(one.game, 'toms-notebook');
  const independentlyRead = {};
  for (const name of Object.keys(one.build_files).sort()) independentlyRead[name] = createHash('sha256').update(await readFile(path.join(scratch, 'one/build', name))).digest('hex');
  assert.deepEqual(one.build_files, independentlyRead);
  assert.equal(one.build_inventory_sha256, createHash('sha256').update(JSON.stringify(independentlyRead)).digest('hex'));
  assert.equal(one.files.length, 10); assert.ok(one.files.every(row => !/ocr|api|provider|companion_profiles/i.test(row.path)));
});
test('exporter rejects a wrong version and refuses overwriting existing evidence', () => {
  assert.throws(() => run(path.join(scratch, 'wrong'), '9.9.9'), /Version must match/);
  assert.throws(() => run(path.join(scratch, 'one')), /EEXIST/);
});
test('export cannot write into the source tree or its existing build', () => {
  assert.throws(() => run(root), /outside the game source/);
  assert.throws(() => run(path.join(root, 'src', 'export-fixture')), /outside the game source/);
  assert.throws(() => run(path.join(root, 'dist', 'nested-export')), /outside the game source/);
});
test('exporter rejects an unexpected file in the build instead of leaking private product content', async () => {
  const extra = path.join(root, 'dist/private-note.txt');
  await writeFile(extra, 'synthetic forbidden fixture');
  try { assert.throws(() => run(path.join(scratch, 'extra')), /Non-game asset rejected/); }
  finally { await rm(extra); }
});
test('exporter rejects a stale build input fingerprint', async () => {
  const file = path.join(root, 'dist/build-info.json'), original = await readFile(file);
  const info = JSON.parse(original.toString()); info.source_inputs_sha256 = '0'.repeat(64);
  await writeFile(file, JSON.stringify(info));
  try { assert.throws(() => run(path.join(scratch, 'stale')), /Build inputs changed/); }
  finally { await writeFile(file, original); }
});
test('exporter rejects a catalog that omits per-unit locale coverage', async () => {
  const file = path.join(root, 'dist/locale-catalog.json'), original = await readFile(file);
  const catalog = JSON.parse(original.toString()); catalog.units = ['toms-notebook'];
  await writeFile(file, JSON.stringify(catalog));
  try { assert.throws(() => run(path.join(scratch, 'catalog')), /Locale catalog mismatch/); }
  finally { await writeFile(file, original); }
});
test.after(async () => { await rm(scratch, { recursive: true, force: true }); });
