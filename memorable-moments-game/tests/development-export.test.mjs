import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm, readFile, symlink, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exportDevelopment, inventory, PLAY_FILES, PLAY_PATH } from '../scripts/development-export.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'small-hours-export-contract-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const repo = path.join(root, 'repo'); await mkdir(repo);
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
  git('init', '-q'); git('config', 'user.name', 'Export fixture'); git('config', 'user.email', 'fixture@example.invalid');
  const play = path.join(repo, PLAY_PATH); await mkdir(play, { recursive: true });
  for (const name of PLAY_FILES) await writeFile(path.join(play, name), `fixture:${name}\n`);
  const commit = () => { git('add', '.'); git('commit', '-qm', 'fixture'); return git('rev-parse', 'HEAD'); };
  return { root, repo, play, commit, head: commit() };
}

test('exports exact pinned bytes twice, ignoring dirty checkout contents', async t => {
  const f = await fixture(t);
  await writeFile(path.join(f.play, 'game.js'), 'dirty uncommitted mutation');
  await writeFile(path.join(f.play, 'private.txt'), 'not a committed playable file');
  const first = await exportDevelopment({ repo: f.repo, commit: f.head, output: path.join(f.root, 'first') });
  const second = await exportDevelopment({ repo: f.repo, commit: f.head, output: path.join(f.root, 'second') });
  assert.deepEqual(first, second); assert.equal(first.file_count, 9);
  assert.equal(await readFile(path.join(f.root, 'first/game.js'), 'utf8'), 'fixture:game.js\n');
});

test('missing committed playable module fails before output creation', async t => {
  const f = await fixture(t); await rm(path.join(f.play, 'countdown.js')); const commit = f.commit();
  await assert.rejects(exportDevelopment({ repo: f.repo, commit, output: path.join(f.root, 'out') }), /missing \[countdown.js\]/);
});

test('extra committed file fails, including private files or new nested assets', async t => {
  const f = await fixture(t); await mkdir(path.join(f.play, 'nested')); await writeFile(path.join(f.play, 'nested/private.txt'), 'private');
  await assert.rejects(exportDevelopment({ repo: f.repo, commit: f.commit(), output: path.join(f.root, 'out') }), /extra \[nested\/private.txt\]/);
});

test('committed symlink is refused', async t => {
  const f = await fixture(t); await rm(path.join(f.play, 'game.js')); await symlink('content.js', path.join(f.play, 'game.js'));
  await assert.rejects(exportDevelopment({ repo: f.repo, commit: f.commit(), output: path.join(f.root, 'out') }), /regular playable file/);
});

test('existing output is preserved instead of overwritten', async t => {
  const f = await fixture(t); const output = path.join(f.root, 'out'); await mkdir(output); await writeFile(path.join(output, 'keep'), 'existing evidence');
  await assert.rejects(exportDevelopment({ repo: f.repo, commit: f.head, output }), /EEXIST/);
  assert.equal(await readFile(path.join(output, 'keep'), 'utf8'), 'existing evidence');
});

test('branch names and in-checkout outputs are refused', async t => {
  const f = await fixture(t);
  await assert.rejects(exportDevelopment({ repo: f.repo, commit: 'HEAD', output: path.join(f.root, 'out') }), /full 40-character/);
  await assert.rejects(exportDevelopment({ repo: f.repo, commit: f.head, output: path.join(f.repo, 'out') }), /outside the source checkout/);
  await symlink(f.repo, path.join(f.root, 'checkout-alias'));
  await assert.rejects(exportDevelopment({ repo: f.repo, commit: f.head, output: path.join(f.root, 'checkout-alias/out') }), /outside the source checkout/);
});

test('post-export missing/extra files and symlinks fail inventory validation', async t => {
  const f = await fixture(t); const output = path.join(f.root, 'out'); await exportDevelopment({ repo: f.repo, commit: f.head, output });
  await writeFile(path.join(output, 'unlisted.js'), 'extra'); await assert.rejects(inventory(output), /extra \[unlisted.js\]/); await rm(path.join(output, 'unlisted.js'));
  await rm(path.join(output, 'state.js')); await assert.rejects(inventory(output), /missing \[state.js\]/);
  await symlink('content.js', path.join(output, 'state.js')); await assert.rejects(inventory(output), /regular playable file/);
});

test('wrapper rejects an in-checkout evidence folder even when repo names a subdirectory', async t => {
  const f = await fixture(t), output = path.join(f.repo, 'evidence');
  const script = fileURLToPath(new URL('../scripts/verify-development-export.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [script, '--repo', f.play, '--commit', f.head, '--output', output], { encoding: 'utf8' });
  assert.equal(result.status, 1); assert.match(result.stderr, /outside the source checkout/);
  await assert.rejects(access(output), /ENOENT/);
  const external = await exportDevelopment({ repo: f.play, commit: f.head, output: path.join(f.root, 'external') });
  assert.equal(external.file_count, 9);
});
