// Exercise the production guard in isolated fixtures, using the actual built HTML.
// Run after npm run build. Never rewrite the package, lockfile or real dist.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { after, afterEach, before, beforeEach, test } from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const inputPaths = ["scripts/check-build-version.mjs", "package.json", "package-lock.json", "dist/index.html"];
const hashes = async () => Promise.all(inputPaths.map(async path =>
  createHash("sha256").update(await readFile(join(root, path))).digest("hex")));
let originalHashes;
let fixture;

before(async () => { originalHashes = await hashes(); });
after(async () => { assert.deepEqual(await hashes(), originalHashes, "Guard fixtures must not mutate production inputs"); });
beforeEach(async () => {
  fixture = await mkdtemp(join(tmpdir(), "vivid-version-guard-"));
  await mkdir(join(fixture, "scripts"));
  await mkdir(join(fixture, "dist"));
  await Promise.all(inputPaths.map(path => copyFile(join(root, path), join(fixture, path))));
});
afterEach(async () => { if (fixture) await rm(fixture, { recursive: true, force: true }); });

function runGuard() {
  const result = spawnSync(process.execPath, [join(fixture, "scripts/check-build-version.mjs")], {
    cwd: fixture, encoding: "utf8", timeout: 10_000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, "Guard must finish normally");
  return result;
}
function rejects(message) {
  const result = runGuard();
  assert.equal(result.status, 1, "Invalid metadata must fail the actual guard");
  assert.ok(result.stderr.includes(message), `Expected diagnostic: ${message}\n${result.stderr}`);
}
async function changeHtml(change) {
  const path = join(fixture, "dist/index.html");
  const original = await readFile(path, "utf8");
  const changed = change(original);
  assert.notEqual(changed, original, "Fixture mutation must actually change the HTML");
  await writeFile(path, changed);
}
async function changeLock(change) {
  const path = join(fixture, "package-lock.json");
  const lock = JSON.parse(await readFile(path, "utf8"));
  change(lock);
  await writeFile(path, JSON.stringify(lock));
}

test("accepts the actual built badge and matching package/lock", () => {
  const result = runGuard();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Verified built version badge:/);
});
test("rejects a stale visible badge", async () => {
  await changeHtml(html => html.replace(/(<span id="build-version">)[^<]+/, "$1Work in progress · stale-fixture"));
  rejects("Built badge must match the package version");
});
test("rejects a stale top-level lock version", async () => {
  await changeLock(lock => { lock.version = "0.0.0-stale-fixture"; });
  rejects("Lockfile version must match the package");
});
test("rejects a stale root-package lock version", async () => {
  await changeLock(lock => { lock.packages[""].version = "0.0.0-stale-fixture"; });
  rejects("Root lock package must match the package");
});
test("rejects a missing visible badge", async () => {
  await changeHtml(html => html.replace(/<span id="build-version">[^<]+<\/span>/, ""));
  rejects("Built HTML needs one visible version badge");
});
test("rejects duplicate visible badges", async () => {
  await changeHtml(html => html.replace(/<span id="build-version">[^<]+<\/span>/, badge => badge + badge));
  rejects("Built HTML needs one visible version badge");
});
test("rejects an untransformed version placeholder", async () => {
  await changeHtml(html => html + "\n<!-- %PACKAGE_VERSION% -->\n");
  rejects("Version placeholder must be transformed");
});
