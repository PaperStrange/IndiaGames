# The Thirteenth Bell

A time-loop mystery adventure that plays in the browser. One town, one cracked
bell, three loops to understand what the thirteenth chime is pulling out of the
day — then break it.

Current handoff: [human playtest checklist, recording templates and November 20 plan](docs/gamejam/launch-2026-11-20/README.md). Human approval is still pending.

**Play it:** serve this folder over a local static server and open the printed URL:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

(`file://` also works for the split tree, but a static server matches how the
game is hosted on itch.io. For sharing (e.g. Google Drive previews), send
`dist/thirteenth-bell-playable-demo.html` — the split tree's relative `css/`/`js/`
references don't survive Drive's preview sandbox.)

**Single-file build:** `dist/thirteenth-bell-playable-demo.html` is the whole game
in one file (CSS/JS inlined, town map embedded as a data URI, system fonts).
The current candidate makes no external font request.
Regenerate it any time with:

```sh
node build.mjs
```

## How to play

- Travel the six districts of the town map as the clock moves Dawn → Noon → Dusk → Midnight.
- **Predict** what each phase will bring *before* you travel — correct predictions earn **Momentum**, which lets you skip scenes you've already mastered.
- Anchor three memories on the **Midnight Anchor Board** to face the thirteenth bell.
- The **Original / Contrast** toggle (top of the page) compares two builds of the experience: the original map adventure vs. the research-driven contrast build (two-view journal, prediction ledger, batched theory validation).

## GameJam update · 2026-10-05

Contrast now remembers witnessed forecast outcomes and lets you spend 1 Momentum on a familiar route to borrow one extra visit per loop. New encounters keep their full story; Fracture still counts. [Play observations, journey, evidence and human validation gate](docs/gamejam-2026-10-05.md).

## What's here

```
index.html            thin shell — loads css/, js/, assets/
css/main.css          all styling
js/data.js            story/world content: locations, NPC schedules, scenes, tuning (edit story here)
js/echo-time.js       pure borrowed-minute rules (no DOM or state mutation)
js/square-event.js    pure witnessed-clue, preparation and Mina-route rules
js/engine.js          game systems + UI copy: loop, clock, scenes, predictions, journal, meters
                      (story data lives in js/data.js; engine.js keeps narrative UI copy with the
                      systems that render it)
assets/images/        town-map.webp — the official canon town map
docs/                 design dossier PDF, work-package README, research reports
dist/                 generated single-file build (do not hand-edit; run node build.mjs)
tests/                static checks + headless-Chromium smoke test
```

**Content vs. engine:** story/world data lives in `js/data.js` and is read through
`window.TTB_DATA` — change locations, schedules, scenes, and tuning without
touching the engine. `js/engine.js` holds the game systems plus the narrative UI
copy those systems render (theory text, consequence leads, mode labels).

## Tests

```sh
node --test tests/*.test.cjs   # earned-time and Square causal rules
node build.mjs                 # regenerate current branch output
python3 tests/check_static.py   # syntax, JSON, asset references, dist freshness
node tests/square-journey.cjs   # HTTP-hosted browser journeys; set PLAYWRIGHT_MODULE if needed
```

The browser runner needs Playwright and Chromium; its header documents executable/module/output settings. The older `tests/smoke_cdp.py` uses file URLs, which managed browsers may block. For that environment use the preserved [HTTP adapter and smoke notes](docs/gamejam/milestone-2026-10-27/verification.md) with a fresh `BELL_SMOKE_TMP` profile. Do not reuse old profile locks or treat archived output as a new run.

## License

- Code (`index.html`, `css/`, `js/engine.js`, `tests/`, `build.mjs`): MIT — see LICENSE.
- Game content and art (`js/data.js`, `assets/`, `docs/`, the design dossier): all rights reserved. Do not redistribute or reuse the story, art, or design documents without permission.

## 27 October milestone: a route remembered

The Contrast demo now contains **Prepare Mina's route**: witness the alley blockage, keep the clue through midnight, and prepare a side passage on a later morning. Ordinary and borrowed visits have different time costs; the outcome shows Mina and her crate at the stalls or sheltered well. Fracture still matters. This is an agent-verified pilot candidate, not a human-approved release.

Start with the [pilot packet](docs/gamejam/milestone-2026-10-27/README.md), [launch instructions](docs/gamejam/milestone-2026-10-27/launch.md), and [human protocol](docs/gamejam/milestone-2026-10-27/protocol.md). The [frozen previous build](docs/gamejam/milestone-2026-10-27/reference/index.html) preserves Original and previous Contrast for comparison. New candidate fonts are local system fallbacks; all gameplay stays in the browser tab and reload clears the run.

Run `node --test tests/*.test.cjs`, `node build.mjs`, and `python3 tests/check_static.py` for rules/build checks. `tests/square-journey.cjs` self-hosts the browser scenarios and accepts `PLAYWRIGHT_MODULE`; consult its header for evidence output settings. Do not count automated journeys or blank study forms as human observations. Candidate 0.1.0 is delivered to master for manual review before any official main release.
