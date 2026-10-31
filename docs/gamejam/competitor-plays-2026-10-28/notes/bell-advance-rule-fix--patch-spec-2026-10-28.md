# Bell 0.1.0 — advance-rule fix, ready-to-paste patch spec (2026-10-28)

## Status

**Prepared, not applied, not filed.** Written 2026-10-28 (08:30 PDT) from the
first-hand play records in `play-2026-10-28/`. Applying it is a Bell branch
owner edit; filing it rides on Sakura's open call (side chat, 2026-10-28
05:41 PDT) on whether to file the play package to the three branches now or
look at the files first. No game file was edited to produce this spec.

## Why this spec exists

The one-page critique (`critique--one-page-2026-10-28.md`) gates Bell's
human gate (before 20 November) on "one in-game line stating the advance
rule" and suggests:

> "A visit counts when you act in the scene; the bell advances when the
> prediction has been tested"

That line covers only part of the rule the play proved. Five runs stalled
(three in Noon, two at Midnight), and the stalls came from four distinct
unstated mechanics, not one. A paste of the critique's line alone would
leave the Midnight stalls in place. This spec states the whole rule, in the
game's own labels, at the exact edit points.

## Two corrections to the critique (verified in source)

1. **"Loop 2 map destinations are pins, not buttons" is wrong as written.**
   Destinations are `<button class="place …">` elements
   (`js/engine.js`, `drawPlaces()`, line 47), styled as map pins. The
   bell17 stall was a driver failure — the journey record excludes it from
   the game-friction count. Do not add pin wording to the fix; there is
   nothing for a human player to misunderstand there.
2. **The advance rule appears nowhere — but a "How to play" modal already
   exists** (`#rulesModal`, "How to play" button in the top bar). The fix
   is an addition to existing text, not a new surface.

## The complete rule (from the journey record)

Source: `records/bell/journey--bell-0.1.0-2026-10-28.md`, "The phase engine",
rules 1–7. All [REAL], first-hand, 2026-10-28.

1. Each phase: predict → visit → take a scene ACTION (+1 Fracture) →
   "Resolve the phase" → advance.
2. A visit REGISTERS only when a scene action is taken; merely arriving
   leaves the journal at "No visit recorded" (bell11 g7, bell12 j4).
3. After a scene action, return to the map ("Choose elsewhere" / "Back to
   the map") before the next destination — scene screens show no map
   destinations (bell11).
4. The advance button's label is the next phase AFTER the resolve; a stale
   label ("Enter Noon" while in Noon) is a no-op (bell8/9/12).
5. Dusk → Midnight is NOT "Enter …": "Ring the boundary bell" → resolve →
   "Face the thirteenth bell" (bell14/15/16).
6. Midnight anchor: choose exactly one bond and one object, then confirm
   with "Anchor these into tomorrow" — picks without the confirm leave
   "Carried through midnight: Nothing chosen yet" (bell15/16).
7. "Face the thirteenth bell" is the Dusk control only — a no-op at
   Midnight (bell15/16).

## Proposed text (verbatim, paste-ready)

### Edit A — "How to play" modal, Contrast mode (the played mode)

File: `js/engine.js`, `renderMode()`, line 43 — the Contrast `rulesText`
string. Current text (verbatim):

> "Use the people × phase ledger to make one prediction, then travel.
> Repeat scenes compress automatically to their new information. Your
> choice and prediction stay unresolved until the phase boundary, where
> consequences arrive as a batch and correct foresight earns Momentum.
> Place and Theory journal views persist alongside Scars and anchored
> memories."

Append this sentence (new text only):

> "A visit counts only when you act in the scene — arriving is not
> seeing. Each phase ends at the bell: resolve, then follow the button it
> names. At Dusk, ring the boundary bell, then face the thirteenth bell
> to reach Midnight. At Midnight, choose one bond and one object, then
> confirm with 'Anchor these into tomorrow' — picks alone carry nothing."

### Edit B — "How to play" modal, Original mode

Same file and line, the Original `rulesText` string. Current text
(verbatim):

> "Before each bell, declare a prediction about the scheduled event. A
> correct call earns Momentum; spend 1 Momentum to skip a district scene
> you mastered in an earlier loop. Every action adds 1 Fracture, while
> dangerous actions add 2. At 4, catastrophe advances and midnight
> arrives early. At the Anchor Board, choose one bond and one object to
> survive the reset. Route, song, lens, and every Scar persist
> automatically."

Append this sentence (new text only):

> "A visit counts only when you act in the scene. At Dusk, ring the
> boundary bell, then face the thirteenth bell to reach Midnight — and
> confirm the Anchor Board with 'Anchor these into tomorrow', or nothing
> is carried."

### Edit C — static fallback in `index.html`, line 101

The `#rulesText` paragraph in `index.html` carries the Original text as
the pre-JS fallback. Apply Edit B's appended sentence there too, so the
rule is present before `renderMode()` runs.

### Edit D (optional, small) — start modal, Contrast mode

File: `js/engine.js`, `renderMode()`, line 43 — the Contrast `startHow`
string. Current step 3–4 (verbatim):

> `3 · Commit` — "The town withholds judgment."
> `4 · Resolve` — "See consequences at the bell."

Change step 3 to `3 · Act` — "A visit counts only when you act in the
scene." Leave step 4 as is. This puts the single most-stalled rule in
front of the player before the first prediction, without touching the
Original mode's start steps.

## What not to change

- No label renames, no structural change, no new modal. The loop is
  proven sound; only its statement is missing.
- Do not add anything about map pins (see correction 1 above).
- The stale-label no-op (rule 4) and return-to-map step (rule 3) are
  covered implicitly by "follow the button it names" and by the scene
  flow; if the owner wants them explicit, they belong in a second
  sentence, not in this paste.

## After applying

1. Rebuild the distributable (`build.mjs` → `dist/`) so the frozen
   candidate and the served build match; verify the new sentence renders
   in both modes and in the static `index.html` fallback.
2. Re-test with a fresh player (not an agent driver): the gate criterion
   from `records/bell/decision--bell-0.1.0-2026-10-28.md` is that a
   first-time player no longer stalls on the advance rule — the five-run
   stall pattern (three Noon, two Midnight) should not recur.
3. Then run the human gate (before 20 November), per the critique's
   item 2.

## Paths checked

- Play records: `~/workspace/gamejam-studies/play-2026-10-28/records/bell/`
  (`journey--`, `session--`, `decision--`, `coverage--`).
- Critique: `~/workspace/gamejam-studies/play-2026-10-28/critique--one-page-2026-10-28.md`.
- Source verified against: `~/workspace/india-games/stage/the-thirteenth-bell/`
  (`index.html` lines 15, 33, 47, 94–95, 101, 103, 105; `js/engine.js`
  lines 43, 47, 83, 88, 96, 101). Owner should confirm this stage copy
  matches the Bell branch source before pasting; the frozen candidate
  per the journey record is `release-candidates/thirteenth-bell/0.1.0/`
  on `master` (index.html SHA-256
  `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973`).
- Labels "Ring the boundary bell", "Face the thirteenth bell", and
  "Anchor these into tomorrow" are source-verified in `engine.js`
  (lines 83, 88, 96, 101) and in the driver logs.
