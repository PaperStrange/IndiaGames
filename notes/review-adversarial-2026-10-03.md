# Adversarial review — the-thirteenth-bell reorg (2026-10-03)

Reviewer: independent adversarial pass (no edits made). Tree reviewed as staged at
`~/workspace/india-games/stage/the-thirteenth-bell/`, NOT yet committed.
Ground-truth reference used for transform checks:
`~/workspace/goals/time-loop-indie-module/files/flash-playable-game/flash-playable-game.html`
(the Sep-24 single-file demo — 1,427,163 bytes, the artifact the reorg claims to preserve).

Verdict key: **GATE-BLOCKING** (do not push until fixed), **SHOULD-FIX**
(fix before or at push), **NIT** (hygiene, non-blocking).

---

## Claim 1 — "The reorganization preserves the game exactly"

**VERDICT: holds, with unusually strong mechanical evidence — BUT the evidence is mine, not the suite's.**

I ran ground-truth comparisons the repo's own tests do not perform:

- **String-literal multiset, original game script vs. `js/data.js` + `js/engine.js`: 836 literals each, zero missing, zero extra.** Every story string, label, and code string survived byte-identical.
- **Identifier sets:** zero identifiers present in the original and absent in the split. The only new identifiers are words from the added comments ("Pure", "Extracted", "TTB_DATA", "NPCs"...). No invented logic, no dropped references.
- **All 8 `TTB_DATA.<key>` references in engine.js resolve** to the 8 keys declared in data.js (`icons, loopMeta, worlds, npcScheduleRows, bonds, keepsakes, schedules, risky`). `risky` regex source identical to original.
- **CSS byte-identical** to the original `<style>` block. **Body HTML identical** after normalizing the single intended difference (map `src`: data-URI in original → `assets/images/town-map.webp` in the split).
- **`state.bonds` vs `TTB_DATA.bonds` "collision": checked clean — no collision exists.** `state.bonds` is always a property access on an array (`fresh()` initializes `bonds:[]`); `TTB_DATA.bonds` is the keyed object. Both are used correctly in `applyCommitment` (`js/engine.js:78`), `prepareAnchorBoard`, and `wake`. The suspicion was unfounded.
- **Data/key cross-checks:** roster roots ⊇ worlds/bonds/keepsakes/icons keys (all six), `npcScheduleRows` is 4×5 matching the 5-column ledger header, `schedules` has 3 entries for phases 0–2, `loopMeta` has 3 entries for `worldIndex()`.

**Caveat (not a defect, but the claim overreaches the repo's own proof):** nothing *in the tree* proves equivalence to the original — the suite never touches the original file. The claim rests on my ad-hoc comparison above. If the parent wants the claim to be machine-verified going forward, add a one-time `tests/reference_check.py` that replays the literal/identifier comparison against the known-good single file (or drop the "exactly" wording to "mechanical transform, spot-verified").

---

## Claim 2 — "dist/ is a faithful single-file build"

**VERDICT: the committed dist/ is faithful — verified, not just asserted:**

- Re-ran `node build.mjs`: **byte-identical to the committed dist** (1.35MB output).
- **dist's inline-script string literals == split's literals** (multiset-equal), so no build-time corruption of content.
- The fixed `$$`→`$` hazard is genuinely fixed: all three `html.replace` calls in `build.mjs:22,26,30` use replacer *functions* `() => str`, which are immune to `$`-pattern substitution in the replacement. Search patterns are plain strings (not regexes), so `$` in them is harmless. No `</script>` in either JS file and no `</style>` in the CSS that could break inlining.
- Script ordering correct: `data.js` before `engine.js` inside a single tag (`build.mjs:26-29`).

**SHOULD-FIX — build.mjs fails open on missed replacements.** `String.replace` with no match is a silent no-op. If `index.html` is ever reformatted so the search strings at `build.mjs:22,26,30` stop matching:

- a missed CSS replacement → dist renders **unstyled**, and **no test would catch it** (the smoke test has zero style assertions; freshness only byte-compares two equally-broken builds);
- a missed map replacement → dist 404s the map over `file://`/Drive, also uncaught (no image-load assertion).

Fix: throw in `build.mjs` when any replacement count is 0 (one line each). Cheap, and it closes the only real hole in this pipeline.

**NIT:** the map replacement at `build.mjs:30` replaces only the *first* occurrence of `assets/images/town-map.webp`. One occurrence exists today; a second (e.g., a preload link) would silently produce a dist that 404s. Pair with the miss-assertion, or replace all occurrences deliberately.

**SHOULD-FIX (claim wording):** README "the whole game in one file (CSS/JS inlined, town map embedded)" is overstated — `css/main.css:2` carries `@import url('https://fonts.googleapis.com/...')`, so dist/ still phones home to Google Fonts at runtime. It's not offline-capable and not fully self-contained. Either inline/vendor the fonts or qualify the claim ("except web fonts"). (Also a privacy note for per-person Drive sharing.)

---

## Claim 3 — "Tests prove what they claim"

**VERDICT: they prove boot + one happy path, not a working game. The docstrings oversell.**

What the suite actually covers (all green, verified by reading the code — not re-run):

- `tests/check_static.py` — syntax parse, asset-ref resolution, dist byte-freshness. Honest, mechanical, genuinely useful. Fine as far as it goes.
- `tests/smoke_cdp.py` — loads split tree AND dist over `file://`, clicks `#startBtn`, clicks the **first** `.place` button (always Bell Square), clicks the contrast toggle. Asserts: title, run label changed, 6 place buttons, toggle present, 4 phases, `choices > 0`, "Contrast" in run label, run labels match between builds, zero console errors.

What it **cannot** catch (theater list):

1. **~36 choice paths; 1 exercised.** Fracture/catastrophe path (4), Anchor Board, `wake`/reset modal, win modal, skip-mastered, contrast batch mode (`showBatch`/`finishBatch`), journal views, schedule ledger rendering, mode-state persistence across toggles, scars — all unexercised.
2. **`check_static.py:40` "engine declares no story data"** checks only `var icons|loopMeta|...` declarations — but the README's real claim (`README.md:45-46`: "js/engine.js declares no story content") is **false on its face**: `js/engine.js` contains the entire `theoryCopy` narrative map (`engine.js:40`), the `consequenceLead` narrative strings (`engine.js:61-74`), the anchor labels (`engine.js:21`), and all contrast/original UI copy (`engine.js:43`). The check passes while the documented separation guarantee is violated. Either move the copy to data.js or correct the README claim to "systems + UI copy" (the honest version).
3. **`check_static.py:42` "data.js has no logic"** (`'function' not in data_js`) — data.js ships `risky: /^(Release|Unmask|...)/`, a game rule encoded as a regex that directly sets Fracture values. "No logic" is a stretch; "no functions / no DOM access" is the true, weaker claim.
4. **The dist-vs-split equivalence assertion** (`smoke_cdp.py:254`) compares only the run-label string — two builds could diverge arbitrarily elsewhere and pass.
5. **README's http-server recommendation** (`README.md:10-15`) is untested — the smoke docstring admits `http://` navigation is blocked in this Chromium build, so only `file://` was ever exercised. The "Drive previews" parenthetical is additionally dubious: Drive's HTML preview sandbox does not reliably resolve the split tree's relative `css/`/`js/` references — per-person Drive distribution should use `dist/`, and the README should say so.
6. **Dead code carried over unnoticed:** `chose()` is defined in `engine.js:9` and called nowhere (1 occurrence total). Preserved faithfully from the original, so not a regression — but a reorg that claims a "throughout review" should have flagged it.

None of this blocks the push (the build is verified good by independent means), but the test section of the README should be reworded to "smoke-level coverage: boot, first scene, toggle, zero console errors" instead of implying a verified working game.

---

## Claim 4 — "The structure follows the research"

**GATE-BLOCKING — the evidence artifact is missing from the staged tree.**

The task brief states `notes/reorg-self-questioning.md` (the pre-work self-questioning + plan) is in the tree. **It is not.** There is no `notes/` directory at all in the staged tree (`ls` confirms; `~/workspace/india-games/stage/` contains only `the-thirteenth-bell/`). Per the standing review-record evidence law, a "research-backed plan" claim with no written record on disk is ahead of ground truth — the file must be staged (or the claim withdrawn) before push.

On the merits, the tree itself is a conventional, defensible static-game layout (shell / css / js-data / js-engine / assets / docs / dist / tests / build script) and matches what the README documents. No scope creep detected: everything in the tree is accounted for in the README's "What's here" map, and nothing from the original demo was dropped (verified mechanically, see Claim 1). The honest gap is the one in Claim 3.2 — the content/engine separation the research presumably recommended is only ~70% achieved (narrative UI copy still lives in engine.js), and the README claims 100%.

---

## Claim 5 — Partner-safety / licensing / attribution

**SHOULD-FIX — pushing all-rights-reserved content to GitHub needs a visibility decision.**

- `LICENSE` + `README.md` draw the line clearly and consistently: MIT for `index.html`, `css/`, `js/engine.js`, `tests/`, `build.mjs`; all-rights-reserved for `js/data.js`, `assets/`, `docs/`, `dist/`. The carve-out is stated in both files — good.
- **But:** this branch is about to be pushed to `github.com/PaperStrange/IndiaGames`. If that repo (or the branch) is **public**, the all-rights-reserved content (full story text in `data.js`, the canon map, the design PDF, and `dist/` embedding all of it) becomes cloneable by anyone — the restriction is then unenforceable in practice. **Confirm the repo/branch is private (or obtain explicit approval) before pushing.** Do not push ARR content to a public repo on the strength of a LICENSE file alone.
- **SHOULD-FIX (sloppy grant):** LICENSE's MIT grant names "the files under ... `js/` ..." wholesale and then carves `js/data.js` back out in a later section. It works, but contributors will misread it. Name the grant positively: `js/engine.js` (not `js/`).
- **NIT:** copyright holder "The Thirteenth Bell contributors" is a placeholder with no named rights holder — fine for a private branch, weak for anything partner-visible.
- **NIT:** the AI-generated town map (`assets/images/town-map.webp`) has no provenance/attribution note anywhere; harmless under ARR, but a one-line note in `assets/` costs nothing.
- Clean: `docs/*.md` contain no company-name hits; `.gitattributes` binary `-diff` (no LFS) is appropriate at these sizes; `.gitignore` covers `tests/.tmp/`, so the **2.5 MB Chrome-profile litter sitting in `tests/.tmp/` won't be committed — but delete it from the staging area anyway** before handoff.

---

## Summary of required actions

| # | Finding | Verdict | Location |
|---|---------|---------|----------|
| 1 | `notes/reorg-self-questioning.md` missing from staged tree — research claim has no record | GATE-BLOCKING | `notes/` (absent) |
| 2 | `build.mjs` silently no-ops on missed replacements; suite can't catch unstyled/mapless dist | SHOULD-FIX | `build.mjs:22,26,30` |
| 3 | README claims "engine declares no story content" — engine.js holds theoryCopy, consequenceLead, all mode UI copy | SHOULD-FIX | `README.md:45-46`, `js/engine.js:21,40,43,61-74` |
| 4 | Confirm `PaperStrange/IndiaGames` is private before pushing ARR content | SHOULD-FIX | repo visibility |
| 5 | dist/ still fetches Google Fonts at runtime — "whole game in one file" overstated | SHOULD-FIX | `css/main.css:2`, `README.md` |
| 6 | Smoke test covers boot + 1 of 36 choice paths; docstring implies more | SHOULD-FIX (wording) | `tests/smoke_cdp.py` |
| 7 | LICENSE grants MIT to `js/` then carves out `data.js` — name `js/engine.js` positively | SHOULD-FIX | `LICENSE` |
| 8 | `data.js` "no logic" check ignores the `risky` regex (a game rule) | NIT | `js/data.js:22`, `tests/check_static.py:42` |
| 9 | Dead `chose()` carried over; 2.5MB `tests/.tmp/` litter in staging | NIT | `js/engine.js:9`, `tests/.tmp/` |
| 10 | README "Drive previews" for the split tree is dubious — recommend `dist/` for Drive | NIT | `README.md:10-15` |

**Bottom line:** the reorganization itself is faithful — I verified it against the original with stronger checks than the repo's suite performs (identical literal multiset, no lost identifiers, byte-identical CSS/HTML). The push is blocked on exactly one thing: the missing `notes/reorg-self-questioning.md` evidence artifact. Everything else is fix-the-words or add-the-assertion work, none of which changes game behavior.
