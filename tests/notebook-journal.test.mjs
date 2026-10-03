import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

mkdirSync('work/journal-tests', { recursive: true });
const directory = mkdtempSync(resolve('work/journal-tests/run-'));

function run(file, mode, id) {
    const result = spawnSync(process.execPath, [
        '--experimental-webstorage', `--localstorage-file=${resolve(directory, file)}`,
        'tests/journal-process.mjs', mode, ...(id ? [id] : []),
    ], { encoding: 'utf8', env: { ...process.env, TMPDIR: directory } });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout;
}

test('a committed device edit survives a separate process reopening its real storage file', () => {
    const id = run('restart.storage', 'write');
    assert.match(id, /^[\da-f-]{36}$/);
    run('restart.storage', 'recover', id);
});

test('owner isolation, stale acknowledgments and concurrent copies retain pending work', () => {
    run('races.storage', 'isolation-and-races');
});

test('a real storage quota failure retains the previous acknowledged device record', () => {
    run('quota.storage', 'quota');
});
