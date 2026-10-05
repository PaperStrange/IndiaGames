# The Keeper’s Frame

A browser-first GameJam slice for the Vivid 2.5D Photo Game research branch. Meet Iona, a lighthouse keeper who cannot reach outside her portrait. Lean around the frame, inspect two harbour marks, send the ferry’s safe signal, and decide what happens to her private letter. Return immediately or reload: she remembers the specific choice and offers the letter differently.

**This build uses original SVG illustration, authored branching dialogue, and browser-local memory. It has no generative AI, uploaded-photo inference, microphone, account, backend, or runtime dependency.** It tests a purposeful portrait and earned recognition. It does not implement the research concept’s photo-to-depth pipeline or free conversation. The “3 minutes” caption is a design target, not a measured human completion time.

## Play

From this directory:

```sh
python3 -m http.server 8112
```

Open <http://localhost:8112>. Serve over HTTP; module imports are not intended for `file://` use. All assets are bundled in the source. The prototype can be uploaded unchanged as an HTML game to a static host or an itch.io HTML upload, with `index.html` at the archive root. No public release or platform integration is included.

Use the lean buttons or left/right arrow keys to reveal marks; click or press Enter to read them. Tab reaches every control. Choose a bearing and flash pattern, then send the signal. There is no time limit or sound requirement. Touch does not require hover. OS reduced motion is respected, and the header has a motion toggle. In compact embedded viewports the page scrolls vertically.

Your ending and whether you opened the letter without permission are stored under `keepers-frame:v1` in this browser’s local storage. Storage contains only version, ending choice, privacy flag, and visit count. A two-click “Forget our visits” control removes it. If storage is blocked, the game works with memory for the open page and displays that limitation. No analytics or external requests are made by game code.

## Cooperating without conflicting

| Area | Files | Contract |
| --- | --- | --- |
| Rules and persistence schema | `src/rules.js` | Pure `transition(state, event)`; reject invalid phase/viewpoint changes; `memoryFor()` only after an ending. |
| Writing | `src/content.js` | Authored clue text must agree with rules and visible artwork. Never introduce undisplayed answers. |
| Interaction and rendering | `src/app.js` | Dispatch events; render rules state. Dialogue cannot grant success. Storage errors never block play. |
| Art and layout | `index.html`, `styles.css` | Original inline SVG. Preserve semantic buttons, focus order, and equivalent reduced-motion clue access. |
| Verification | `test/`, `evidence/` | Behavioral tests and observed action record; agent evidence is not human research. |

Coordinate shared event/schema changes before editing. A writer and renderer can work independently if clue IDs and state fields stay stable. Keep this game on the `vivid-2.5d-photo-game` branch; commit a runnable milestone, then validation/notes, and sync only the intended branch. Do not cherry-pick another game’s working tree into this one.

## Verify

Rules use Node’s built-in test runner:

```sh
node --test test/rules.test.js
```

Browser coverage uses an existing Playwright installation and Chromium; those are development tools, not shipped dependencies:

```sh
PLAYWRIGHT_MODULE_PATH=/path/to/node_modules/playwright \
CHROMIUM_PATH=/usr/bin/chromium \
node test/browser.mjs
```

Run the HTTP server first. Optional `GAME_URL` overrides localhost. The suite overwrites `evidence/`, completes the interaction through visible controls, tests actual reload persistence, and saves screenshots plus a Playwright trace. See [the jam notebook](../docs/gamejam-2026-10-05.md) for the user journey, findings, limitations, and next experiment.
