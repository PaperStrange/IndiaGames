/* Build-contract regression checks. Fixtures never alter the working tree. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const repository = path.resolve(__dirname, '..');
const distribution = 'dist/thirteenth-bell-playable-demo.html';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-build-contract-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const name of ['build.mjs', 'index.html', 'css', 'js', 'assets/images', 'tests/check_static.py']) {
    const destination = path.join(root, name);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(path.join(repository, name), destination, { recursive: true });
  }
  return root;
}

function build(root, args = [], cwd = root) {
  return spawnSync(process.execPath, [path.join(root, 'build.mjs'), ...args], { cwd, encoding: 'utf8' });
}

function staticCheck(root) {
  return spawnSync(process.env.PYTHON || 'python3', ['tests/check_static.py'], { cwd: root, encoding: 'utf8' });
}

function succeeds(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

test('explicit output works from another working directory and matches the default build', t => {
  const root = fixture(t);
  const destination = path.join(root, 'review', 'portable.html');
  succeeds(build(root, ['--output', destination], os.tmpdir()));
  assert.equal(fs.existsSync(path.join(root, 'dist')), false);
  succeeds(build(root));
  assert.deepEqual(fs.readFileSync(destination), fs.readFileSync(path.join(root, distribution)));
});

test('static validation passes without creating an absent dist directory', t => {
  const root = fixture(t);
  succeeds(staticCheck(root));
  assert.equal(fs.existsSync(path.join(root, 'dist')), false);
});

test('static validation preserves an existing valid distribution and its modification time', t => {
  const root = fixture(t);
  succeeds(build(root));
  const output = path.join(root, distribution);
  const bytes = fs.readFileSync(output);
  const modified = fs.statSync(output).mtimeMs;
  succeeds(staticCheck(root));
  assert.deepEqual(fs.readFileSync(output), bytes);
  assert.equal(fs.statSync(output).mtimeMs, modified);
});

test('static validation reports a stale distribution without replacing it', t => {
  const root = fixture(t);
  const output = path.join(root, distribution);
  fs.mkdirSync(path.dirname(output));
  fs.writeFileSync(output, 'stale build retained for diagnosis');
  const modified = fs.statSync(output).mtimeMs;
  const result = staticCheck(root);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL local dist matches fresh build/);
  assert.equal(fs.readFileSync(output, 'utf8'), 'stale build retained for diagnosis');
  assert.equal(fs.statSync(output).mtimeMs, modified);
});

test('missing or duplicate anchors fail before replacing an output', async t => {
  for (const [label, change, diagnostic] of [
    ['missing stylesheet', html => html.replace('<link rel="stylesheet" href="css/main.css">', ''), /css link, found 0/],
    ['duplicate stylesheet', html => html + '<link rel="stylesheet" href="css/main.css">', /css link, found 2/],
    ['duplicate rule script', html => html + '<script src="js/echo-time.js"></script>', /echo rules, found 2/],
  ]) {
    await t.test(label, t => {
      const root = fixture(t);
      const shell = path.join(root, 'index.html');
      fs.writeFileSync(shell, change(fs.readFileSync(shell, 'utf8')));
      const output = path.join(root, 'keep.html');
      fs.writeFileSync(output, 'previous output');
      const result = build(root, ['--output', output]);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, diagnostic);
      assert.equal(fs.readFileSync(output, 'utf8'), 'previous output');
    });
  }
});

test('inlined JavaScript preserves literal dollar replacement sequences', t => {
  const root = fixture(t);
  const marker = '// build marker: $$ $& $` $\'\n';
  fs.appendFileSync(path.join(root, 'js/engine.js'), '\n' + marker);
  succeeds(build(root));
  assert.ok(fs.readFileSync(path.join(root, distribution), 'utf8').includes(marker));
});

test('invalid output arguments fail without creating a distribution', t => {
  const root = fixture(t);
  const result = build(root, ['--output']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Usage: node build.mjs/);
  assert.equal(fs.existsSync(path.join(root, 'dist')), false);
});
