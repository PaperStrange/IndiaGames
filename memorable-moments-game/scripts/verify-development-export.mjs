import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { execFileSync, spawn } from 'node:child_process';
import { mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { argumentsFrom, exportDevelopment, inventory, PLAY_FILES, PLAY_PATH } from './development-export.mjs';

const options = argumentsFrom(process.argv.slice(2));
// The evidence root must also be external. Export destination checking protects each child.
const output = path.join(await realpath(path.dirname(options.output)), path.basename(options.output));
const checkout = await realpath(execFileSync('git', ['-C', options.repo, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim());
const relative = path.relative(checkout, output);
if (!relative || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative))) throw new Error('Evidence output must be outside the source checkout.');
await mkdir(output);
const report = { started_at: new Date().toISOString(), source_commit: options.commit, source_path: PLAY_PATH, development_only: true, human_sessions: 0, physical_devices: 0, approval: false, node_version: process.version, git_version: execFileSync('git', ['--version'], { encoding: 'utf8' }).trim(), tooling_sha256: {}, commands: [], http: [], errors: [] };
const gameDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
let server;
async function command(label, script, env) {
  const log = path.join(output, label + '.log');
  const child = spawn(process.execPath, [script], { env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
  const chunks = [];
  child.stdout.on('data', data => chunks.push(data)); child.stderr.on('data', data => chunks.push(data));
  const code = await new Promise((resolve, reject) => { child.once('error', reject); child.once('close', resolve); });
  await writeFile(log, Buffer.concat(chunks));
  report.commands.push({ label, runner_sha256: hash(await readFile(script)), exit_code: code, log: path.basename(log) });
  assert.equal(code, 0, `${label} failed; inspect retained log and evidence.`);
}
try {
  for (const name of ['scripts/development-export.mjs', 'scripts/verify-development-export.mjs', 'tests/browser.mjs', 'tests/timer-browser.mjs']) {
    report.tooling_sha256['memorable-moments-game/' + name] = hash(await readFile(path.join(gameDirectory, name)));
  }
  const first = path.join(output, 'export-a'), second = path.join(output, 'export-b');
  report.first = await exportDevelopment({ ...options, output: first });
  report.second = await exportDevelopment({ ...options, output: second });
  assert.deepEqual(report.first, report.second, 'Two committed-source exports differ.');
  const prefix = '/IndiaGames/development/small-hours/';
  server = createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      const name = pathname.startsWith(prefix) ? pathname.slice(prefix.length) || 'index.html' : pathname.slice(1) || 'index.html';
      if (!PLAY_FILES.includes(name)) { report.http.push({ path: pathname, status: 404, known_missing_favicon: pathname === '/favicon.ico' }); res.writeHead(404); res.end('Not in development export'); return; }
      const body = await readFile(path.join(first, name)), actual = hash(body);
      assert.equal(actual, report.first.files[name], `Served file changed: ${name}`);
      report.http.push({ path: pathname, file: name, status: 200, sha256: actual });
      res.writeHead(200, { 'Content-Type': { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.md': 'text/plain; charset=utf-8' }[path.extname(name)], 'Cache-Control': 'no-store' }); res.end(body);
    } catch (error) { report.errors.push(String(error)); res.writeHead(500); res.end('Export verification failed'); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const base = `http://127.0.0.1:${server.address().port}`;
  report.mounts = ['/', prefix];
  for (const [label, mount] of [['root', '/'], ['nested', prefix]]) {
    // Fetch every public file too, including the development README, and compare real HTTP bytes.
    for (const name of PLAY_FILES) {
      const response = await fetch(base + mount + name); assert.equal(response.status, 200);
      assert.equal(hash(Buffer.from(await response.arrayBuffer())), report.first.files[name]);
    }
    await command('browser-' + label, path.join(gameDirectory, 'tests/browser.mjs'), { PLAY_URL: base + mount, EVIDENCE_DIR: path.join(output, 'browser-' + label) });
  }
  await command('timer', path.join(gameDirectory, 'tests/timer-browser.mjs'), { PLAY_URL: base + '/', NESTED_PLAY_URL: base + prefix, EVIDENCE_DIR: path.join(output, 'timer') });
  report.first_after = await inventory(first); report.second_after = await inventory(second);
  assert.deepEqual(report.first_after, report.first); assert.deepEqual(report.second_after, report.second);
  assert.deepEqual(report.errors, []);
  assert(report.http.every(row => row.status === 200 || row.known_missing_favicon), 'Unexpected failed HTTP request.');
  report.status = 'pass';
} catch (error) { report.status = 'fail'; report.failure = error.stack; process.exitCode = 1; }
finally {
  if (server) await new Promise(resolve => server.close(resolve));
  report.completed_at = new Date().toISOString();
  await writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ status: report.status, source_commit: options.commit, inventory_sha256: report.first?.inventory_sha256, evidence: output }));
}
