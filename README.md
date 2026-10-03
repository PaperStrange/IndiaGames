# The Thirteenth Bell

A time-loop mystery adventure that plays in the browser. One town, one cracked
bell, three loops to understand what the thirteenth chime is pulling out of the
day — then break it.

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
in one file (CSS/JS inlined, town map embedded as a data URI — web fonts excepted:
the CSS references Google Fonts, which degrade to system fallbacks offline).
Regenerate it any time with:

```sh
node build.mjs
```

## How to play

- Travel the six districts of the town map as the clock moves Dawn → Noon → Dusk → Midnight.
- **Predict** what each phase will bring *before* you travel — correct predictions earn **Momentum**, which lets you skip scenes you've already mastered.
- Anchor three memories on the **Midnight Anchor Board** to face the thirteenth bell.
- The **Original / Contrast** toggle (top of the page) compares two builds of the experience: the original map adventure vs. the research-driven contrast build (two-view journal, prediction ledger, batched theory validation).

## What's here

```
index.html            thin shell — loads css/, js/, assets/
css/main.css          all styling
js/data.js            story/world content: locations, NPC schedules, scenes, tuning (edit story here)
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
python3 tests/check_static.py   # syntax, JSON, asset references, dist freshness
python3 tests/smoke_cdp.py      # headless-Chromium smoke test: boot, start click, first scene, mode toggle, no console errors
```

## License

- Code (`index.html`, `css/`, `js/engine.js`, `tests/`, `build.mjs`): MIT — see LICENSE.
- Game content and art (`js/data.js`, `assets/`, `docs/`, the design dossier): all rights reserved. Do not redistribute or reuse the story, art, or design documents without permission.
