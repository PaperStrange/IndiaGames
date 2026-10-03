# Self-questioning: Thirteenth Bell repo reorganization → IndiaGames branch push
Date: 2026-10-03. Written BEFORE any file moves (work-sequence law).

## What we're pushing
"The Thirteenth Bell" — a browser-based time-loop mystery adventure demo.
Current source of truth: `ts-spaces/flash-playable-game/index.html` (77KB: inline CSS+JS,
references `assets/town-map.webp` relatively) + the self-contained 1.4MB export in the
goal's files/ (same build, map inlined as base64). Design docs: README work-package,
design dossier PDF (20pp, with .src), two research reports. Canon map verified by hash:
v4 webp, byte-identical to `assets/town-map.webp` and to the base64 blob in the export.

## Q1: Does splitting the single HTML into files add real value, or just ceremony?
A skeptic says: it's 77KB, it works, one file is the simplest possible artifact.
Counter: (a) itch.io ZIP route needs real files with relative paths; (b) diffs on a
1.4MB single file containing base64 blobs are unreadable — any future content edit
by Sakura's team produces an unreviewable diff; (c) the research found the industry
pattern is develop-split / distribute-single-file. The split costs one build script.
**Verdict: split.**

## Q2: Research says extract narrative data to JSON. Should we?
The JS has clear data objects (worlds, schedules, leads/keepsakes/flowers, flags).
JSON extraction would require rewriting boot to async fetch() — a behavior-changing
refactor of working, playtested code, with no second content author and no
localization on the horizon to justify it. The real payoff today is *separation of
diffs* (content edits don't touch engine lines), which a `js/data.js` module gives
with zero behavior change. **Verdict: `js/data.js` as a data module, not JSON.**
Record JSON extraction as the documented next step if content grows or localization
lands. Do not present data.js as the full data-driven architecture — it's the
pragmatic step.

## Q3: LFS or not for the map/PDF binaries?
git-lfs is NOT installed on this machine, so LFS objects cannot be pushed from here
anyway. Files are small (map ~1MB, PDF ~5MB), nowhere near GitHub's 100MB limit.
**Verdict: no LFS.** Use `.gitattributes` with binary diff suppression (`-diff`) for
media types so diffs stay clean, and note the no-LFS decision in README.

## Q4: Should `dist/` (generated single-file HTML) be committed?
Sakura's distribution flow IS the single file (per-person Drive sharing, after the
public link was revoked for security). The generated file is the thing he hands to
testers. Committing it makes the branch self-sufficient for his flow; the build
script makes it reproducible so the committed copy never drifts silently — the test
suite will rebuild and diff. **Verdict: commit `dist/`, with `build.mjs` and a
dist-freshness check in tests.**

## Q5: What is the "test" that actually proves something?
"no test no fact no result." For a static browser game the honest suite is:
1. `node --check` on every JS file (parse-level, zero-dep).
2. Asset-reference validation: every relative src/href/url() resolves on disk,
   case-exact (the itch.io CDN case-sensitivity pitfall).
3. Headless Chromium smoke test: serve the split tree over a local static server,
   fail on any console error/pageerror, assert the game boots (title, map container,
   Original/Contrast toggle, first scene text renders). Playwright is likely
   unavailable; fall back to `/opt/meta-chromium/chrome --headless --dump-dom`
   plus `--enable-logging` console capture. If console capture proves unreliable,
   say so — do not fake a passing check.
4. dist-freshness: rebuild dist/ and assert byte-identical to committed copy.
If any check can't be made honest in this environment, it gets marked [OPEN] in
the test report, not silently dropped.

## Q6: What could break in the reorganization?
- Path breakage: moving the map to `assets/images/` changes the relative URL the
  JS uses. Mitigated by the asset-reference check + smoke test.
- CSS/JS extraction: must be byte-preserving (no reformatting). Verify by
  re-inlining and diffing against the original single file.
- The `<script>` in index.html is inline; extraction means index.html gains
  `<script src>` tags — order matters if there were multiple blocks (there's one).
- Branch from `main` (empty + .gitignore). Branch name: `the-thirteenth-bell`.

## Q7: What are we deliberately NOT doing?
- No engine rewrite, no JSON data extraction, no new features, no art changes.
- No re-share of the public demo link (revoked for security; Sakura's call).
- No merge to main — branch only, merge is Sakura's later decision.
- No company names in any file (partner-safe rule); LICENSE splits code (MIT)
  from content/art (all rights reserved).

## Plan (execute after this file)
1. Stage new tree under `~/workspace/india-games/stage/the-thirteenth-bell/`.
2. Byte-preserving extraction: index.html shell, css/main.css, js/engine.js +
   js/data.js, assets/images/town-map.webp, docs/*, build.mjs → dist/.
3. README.md, LICENSE, .gitattributes, .gitignore, tests/.
4. Run test suite; fix until green.
5. Plural independent reviews (adversarial + mistake-hunt), findings in
   notes/, fixes applied.
6. New branch from main, single clean commit (or a few logical commits), push,
   verify remote.
