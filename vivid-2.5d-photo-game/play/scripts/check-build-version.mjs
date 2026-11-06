// Verify emitted HTML, including an exported build when a directory is supplied.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const lock = JSON.parse(await readFile(resolve(root, "package-lock.json"), "utf8"));
assert.equal(lock.version, packageJson.version, "Lockfile version must match the package");
assert.equal(lock.packages[""].version, packageJson.version, "Root lock package must match the package");
const directory = resolve(process.argv[2] || resolve(root, "dist"));
const html = await readFile(resolve(directory, "index.html"), "utf8");
const badges = [...html.matchAll(/<span id="build-version">([^<]+)<\/span>/g)];
assert.equal(badges.length, 1, "Built HTML needs one visible version badge");
assert.equal(badges[0][1], `Work in progress · ${packageJson.version}`, "Built badge must match the package version");
assert.equal(html.includes("%PACKAGE_VERSION%"), false, "Version placeholder must be transformed");
console.log(`Verified built version badge: ${packageJson.version}`);
