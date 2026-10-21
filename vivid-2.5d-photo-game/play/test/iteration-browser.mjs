import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
const base = process.env.GAME_URL || "http://127.0.0.1:8112/";
const runId = new Date()
  .toISOString()
  .replaceAll(":", "-")
  .replaceAll(".", "-");
const output = process.env.EVIDENCE_DIR || `evidence/iteration-${runId}`;
await mkdir(output, { recursive: true });
const errors = [],
  observations = [];
let passed = false,
  failure = null;
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const contexts = [];
async function page(options = {}) {
  const c = await browser.newContext(options);
  contexts.push(c);
  c.on("page", (p) => p.on("pageerror", (e) => errors.push(e.message)));
  return c.newPage();
}
const a = (p, id) => p.locator(`[data-action="${id}"]`);
const d = (p, id) => p.locator(`[data-destination="${id}"]`);
async function record(p, label, name) {
  console.log(label);
  observations.push({
    at: new Date().toISOString(),
    label,
    url: p.url(),
    screen: await p.locator("#experience").innerText(),
  });
  if (name)
    await p.screenshot({ path: `${output}/${name}.png`, fullPage: true });
}
async function open(p, id, query = "") {
  await p.goto(`${base}${query}#${id}`);
  await a(p, "start").waitFor();
}
async function press(p, id) {
  await a(p, id).click();
}
async function place(p, id) {
  await press(p, id);
  await d(p, id).click();
}
async function rescue(p, peek = false) {
  await press(p, "start");
  await press(p, "view--1");
  await press(p, "ledger");
  await press(p, "view-1");
  await press(p, "plate");
  if (peek) await press(p, "letter");
  await press(p, "bearing-east");
  await press(p, "rhythm-sls");
  await press(p, "signal");
}
async function recollect(p) {
  await press(p, "recollect");
  assert.equal(await p.locator("#scene-caption").textContent(), "An earlier watch · a recollection");
  assert.match(await p.locator("#world").getAttribute("aria-label"), /^A framed painted portrait\./);
  await press(p, "brace");
  await place(p, "wedge");
  await press(p, "present");
}
async function finishMara(p) {
  await press(p, "start");
  assert.equal(await p.locator("#scene-caption").textContent(), "A mystery told by objects");
  assert.match(await p.locator("#world").getAttribute("aria-label"), /^A station workbench and lightbox\./);
  for (const id of ["sketches", "postcard", "timetable"]) await press(p, id);
  for (let i = 0; i < 3; i++) await press(p, "align-plus");
  await press(p, "reveal");
  await press(p, "repair");
}
try {
  const p = await page({ viewport: { width: 1440, height: 1000 } });
  await p.goto(base);
  assert.equal(await p.locator("[data-story]").count(), 2);
  await p.screenshot({ path: `${output}/gallery.png`, fullPage: true });
  await p.locator('[data-story="iona"]').click();
  await press(p, "start");
  await press(p, "bearing-east");
  await press(p, "rhythm-sls");
  await press(p, "signal");
  assert.match(await p.locator("#narration").innerText(), /both harbour marks/);
  await press(p, "view--1");
  await press(p, "ledger");
  await press(p, "view-1");
  await press(p, "plate");
  await press(p, "letter");
  await press(p, "bearing-west");
  await press(p, "signal");
  assert.match(await p.locator("#narration").innerText(), /No answering light/);
  await press(p, "bearing-east");
  await press(p, "signal");
  await record(
    p,
    "Evidence-gated rescue, safe wrong answer and prior uninvited reading",
    "iona-rescue",
  );
  await press(p, "recollect");
  assert.equal(await p.locator("#scene-caption").textContent(), "An earlier watch · a recollection");
  assert.match(await p.locator("#world").getAttribute("aria-label"), /^A framed painted portrait\./);
  await press(p, "brace");
  await p.reload();
  await a(p, "wedge").waitFor();
  assert.match(await p.locator("#narration").innerText(), /hands are free/);
  // An invalid drag does not commit. A cancelled pointer also keeps the wedge.
  const wedge = a(p, "wedge"),
    box = await wedge.boundingBox();
  await p.mouse.move(box.x + 15, box.y + 15);
  await p.mouse.down();
  await p.mouse.move(box.x - 55, box.y - 40);
  await p.mouse.up();
  assert.equal(await a(p, "wedge").count(), 1);
  await p.mouse.move(box.x + 10, box.y + 10);
  await p.mouse.down();
  await wedge.dispatchEvent("pointercancel", { pointerId: 1, isPrimary: true });
  await p.mouse.up();
  assert.equal(await a(p, "wedge").count(), 1);
  await place(p, "wedge");
  await record(
    p,
    "Recollection reload retains latched brace; invalid/cancelled drops do not grant success; wedge steadies lamp",
    "iona-recollection",
  );
  await press(p, "present");
  await press(p, "private");
  assert.match(await p.locator("#narration").innerText(), /read before/);
  await p.reload();
  await a(p, "place-memory").waitFor();
  assert.equal(await a(p, "signal").count(), 0);
  await record(
    p,
    "Reload after ending goes directly to promised return",
    "iona-return-before",
  );
  await place(p, "place-memory");
  await p.reload();
  await p
    .locator("#narration")
    .filter({ hasText: "Out of the wind" })
    .waitFor();
  assert.equal(
    await p.locator("#world").getAttribute("data-placement"),
    "letter",
  );
  await record(
    p,
    "Private folded letter remains in the sheltered recess after real reload",
    "iona-return-after",
  );
  await p.locator("#back").click();
  await p.locator('[data-story="mara"]').click();
  assert.doesNotMatch(await p.locator("#transcript-lines").innerText(), /Iona/);
  await finishMara(p);
  await record(
    p,
    "Mara: three objects, stepped alignment, visible community-workshop reveal and interpretive ending",
    "mara-ending",
  );
  await p.reload();
  await p.locator("#narration").filter({ hasText: "loose leg" }).waitFor();
  assert.equal(await a(p, "start").count(), 0);
  await record(
    p,
    "Switching and reloading preserves independent stories without transcript leakage",
  );
  const touch = await page({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  await open(touch, "iona", "?flat=1");
  const tap = async (id) => a(touch, id).tap();
  await tap("start");
  await tap("view--1");
  await tap("ledger");
  await tap("view-1");
  await tap("plate");
  await tap("bearing-east");
  await tap("rhythm-sls");
  await tap("signal");
  await tap("recollect");
  await tap("brace");
  await tap("wedge");
  await d(touch, "wedge").tap();
  await tap("present");
  await tap("archive");
  await tap("return");
  await tap("place-memory");
  await d(touch, "place-memory").tap();
  assert.equal(
    await touch.locator("#world").getAttribute("data-placement"),
    "dedication",
  );
  assert.equal(
    await touch.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
  await record(
    touch,
    "390×844 emulated touch, flat mode: public dedication completed without dragging",
    "touch-dedication",
  );
  const kb = await page({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  await open(kb, "iona", "?flat=1");
  assert.equal(await kb.locator("#motion").isChecked(), false);
  async function key(selector) {
    for (let i = 0; i < 90; i++) {
      if (
        await kb
          .locator(selector)
          .evaluate((el) => el === document.activeElement)
      ) {
        await kb.keyboard.press("Enter");
        return;
      }
      await kb.keyboard.press("Tab");
    }
    throw new Error("Keyboard could not reach " + selector);
  }
  for (const id of [
    "start",
    "view--1",
    "ledger",
    "view-1",
    "plate",
    "bearing-east",
    "rhythm-sls",
    "signal",
    "recollect",
    "brace",
    "wedge",
  ])
    await key(`[data-action="${id}"]`);
  await key('[data-destination="wedge"]');
  for (const id of ["present", "archive", "return", "place-memory"])
    await key(`[data-action="${id}"]`);
  await key('[data-destination="place-memory"]');
  await record(
    kb,
    "Keyboard-only Iona completion, latched actions and reduced motion",
    "keyboard-ending",
  );
  await key("#back");
  await key('[data-story="mara"]');
  for (const id of [
    "start",
    "timetable",
    "postcard",
    "sketches",
    "align-plus",
    "align-plus",
    "align-plus",
    "reveal",
    "unfinished",
  ])
    await key(`[data-action="${id}"]`);
  await record(
    kb,
    "Keyboard-only Mara completes both nonlinear inspection and alignment",
  );
  const legacy = await page();
  await legacy.addInitScript(() => {
    if (!localStorage.getItem("seeded")) {
      localStorage.setItem(
        "keepers-frame:v1",
        JSON.stringify({
          version: 1,
          choice: "archive",
          peeked: true,
          visits: 2,
        }),
      );
      localStorage.setItem("seeded", "1");
    }
  });
  await legacy.goto(`${base}?flat=1#iona`);
  await a(legacy, "place-memory").waitFor();
  assert.match(
    await legacy.locator("#narration").innerText(),
    /already public/,
  );
  assert.match(await legacy.locator("#narration").innerText(), /read before/);
  await press(legacy, "optional-recollection");
  await press(legacy, "brace");
  await place(legacy, "wedge");
  await press(legacy, "present");
  await place(legacy, "place-memory");
  await record(
    legacy,
    "Synthetic v1 archive preserves truthful publication history; optional recollection returns without another rescue",
  );
  await legacy.locator("#reset").click();
  await legacy.locator("#reset").click();
  await legacy.reload();
  await a(legacy, "start").waitFor();
  assert.equal(
    await legacy.evaluate(() => localStorage.getItem("keepers-frame:v1")),
    null,
  );
  const future = await page();
  const futureRaw = JSON.stringify({
    schemaVersion: 99,
    storyId: "iona",
    profile: "remembered",
    contentRevision: 1,
    storySaveVersion: 1,
    state: { precious: "keep" },
  });
  await future.addInitScript(
    (raw) => localStorage.setItem("vivid:save:iona:remembered", raw),
    futureRaw,
  );
  await open(future, "iona", "?flat=1");
  await press(future, "start");
  assert.match(
    await future.locator("#storage-status").innerText(),
    /newer|future|version/i,
  );
  assert.equal(
    await future.evaluate(() =>
      localStorage.getItem("vivid:save:iona:remembered"),
    ),
    futureRaw,
  );
  await record(
    future,
    "Future save preserved byte-for-byte while current story plays in temporary memory",
  );
  const corrupt = await page();
  await corrupt.addInitScript(() =>
    localStorage.setItem("vivid:save:mara:remembered", "{broken"),
  );
  await open(corrupt, "mara", "?flat=1");
  await press(corrupt, "start");
  assert.equal(
    await corrupt.evaluate(() =>
      localStorage.getItem("vivid:save:mara:remembered"),
    ),
    "{broken",
  );
  await corrupt.locator("#recover").click();
  assert.equal(
    await corrupt.evaluate(
      () =>
        JSON.parse(localStorage.getItem("vivid:save:mara:remembered"))
          .schemaVersion,
    ),
    1,
  );
  await record(
    corrupt,
    "Malformed save preserved until explicit recovery; active progress then saved",
  );
  const blocked = await page();
  await blocked.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    }),
  );
  await open(blocked, "mara", "?flat=1");
  await finishMara(blocked);
  assert.match(
    await blocked.locator("#storage-status").innerText(),
    /unavailable|saved|memory/i,
  );
  await record(
    blocked,
    "Blocked storage still allows a complete Mara story with clear temporary-memory notice",
  );
  const neutral = await page();
  await open(neutral, "iona", "?profile=neutral&flat=1");
  await rescue(neutral, true);
  await recollect(neutral);
  await press(neutral, "private");
  await press(neutral, "return");
  assert.doesNotMatch(
    await neutral.locator("#narration").innerText(),
    /kept the letter|read before|dedication/,
  );
  await place(neutral, "place-memory");
  assert.equal(
    await neutral.locator("#world").getAttribute("data-placement"),
    "cloth",
  );
  await neutral.goto(`${base}?flat=1#iona`);
  await a(neutral, "start").waitFor();
  await record(
    neutral,
    "Neutral condition uses routine cloth; remembered profile has independent fresh state",
  );
  const asset = await page();
  await asset.route("**/*.glb", (route) => route.abort());
  await open(asset, "mara");
  await asset
    .locator("#render-label")
    .filter({ hasText: /unavailable/ })
    .waitFor();
  await finishMara(asset);
  await record(
    asset,
    "Missing GLB switches to a complete flat story without resetting progress",
    "asset-fallback",
  );
  const contextLoss = await page();
  await open(contextLoss, "iona");
  await contextLoss.locator(".world.has-three").waitFor({ timeout: 15000 });
  const lost = await contextLoss.locator("canvas").evaluate((canvas) => {
    const gl = canvas.getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_lose_context");
    if (!ext) return false;
    ext.loseContext();
    return true;
  });
  assert.equal(lost, true);
  await contextLoss
    .locator("#render-label")
    .filter({ hasText: /unavailable/ })
    .waitFor();
  await rescue(contextLoss);
  await recollect(contextLoss);
  await press(contextLoss, "private");
  await press(contextLoss, "return");
  await place(contextLoss, "place-memory");
  await record(
    contextLoss,
    "Actual WEBGL_lose_context extension forces flat fallback, then story completes",
  );
  assert.deepEqual(errors, []);
  passed = true;
} catch (error) {
  failure = error.message;
  throw error;
} finally {
  for (const c of contexts) await c.close();
  await browser.close();
  const report = {
    runId,
    at: new Date().toISOString(),
    sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim(),
    workingDiffSHA256: createHash("sha256")
      .update(execFileSync("git", ["diff", "--binary"]))
      .digest("hex"),
    base,
    automated: true,
    passed,
    failure,
    notHumanEvidence: true,
    physicalDeviceTested: false,
    audioRequired: false,
    errors,
    observations,
  };
  await writeFile(
    `${output}/browser-observations.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      { output, observations: observations.length, errors },
      null,
      2,
    ),
  );
}
