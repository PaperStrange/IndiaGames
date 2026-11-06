# The Thirteenth Bell

A time-loop mystery adventure that plays in the browser. One town, one cracked
bell, three loops to understand what the thirteenth chime is pulling out of the
day — then break it.

Current development milestone: [English, Japanese and Simplified Chinese](docs/gamejam/localization-2026-11-06/README.md), with semantic action IDs, localized narrative/UI and device preparation. This is a new development build, not an approved release. The staged **0.1.0** package and previous Contrast study reference remain unchanged; use the frozen study package for its registered protocol.

For actual studies, use the [verified facilitator setup](docs/gamejam/readiness-2026-11-05/FACILITATOR-SETUP.md) and its linked blank records. The [November 20 plan](docs/gamejam/launch-2026-11-20/README.md) retains the human release criteria.

**Play it:** serve this folder over a local static server and open the printed URL:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# open http://localhost:8000/
```

Open the URL on that same computer. Use HTTP for both the split tree and the
portable build; a source-file page or a cloud-storage preview is not a verified
game host. Physical phones need the separately verified route in the facilitator
setup. A developer server is not human-device evidence.

**Portable build:** `dist/thirteenth-bell-playable-demo.html` is the whole game
in one file (CSS/JS inlined, town map embedded as a data URI, system fonts).
The development export also writes the required `locale-catalog.json` beside the HTML; keep both files for packaging. It makes no external font request. `dist/` is ignored local
output, not a committed candidate. Generate it explicitly with:

```sh
node build.mjs
# Or write an isolated build without replacing the default output:
node build.mjs --output /tmp/bell-review/index.html
```

## How to play

- Travel the six districts of the town map as the clock moves Dawn → Noon → Dusk → Midnight.
- Optionally **predict** before committing an action. Correct forecasts earn **Momentum**; in Contrast, a prior-loop familiar route can use one Momentum to borrow a visit while Fracture still counts.
- At the **Midnight Anchor Board**, choose one bond and one object, then confirm. Learned route, song, lens and eyewitness knowledge persist independently.
- The **Original / Contrast** toggle (top of the page) selects two separate modes: the original map adventure and the consequence-led Contrast mode. The study comparator remains the separately frozen previous Contrast artifact.

## GameJam update · 2026-10-05

Contrast now remembers witnessed forecast outcomes and lets you spend 1 Momentum on a familiar route to borrow one extra visit per loop. New encounters keep their full story; Fracture still counts. [Play observations, journey, evidence and human validation gate](docs/gamejam-2026-10-05.md).

## What's here

```
index.html            thin shell — loads css/, js/, assets/
css/main.css          all styling
js/data.js            story/world content: locations, NPC schedules, scenes, tuning (edit story here)
js/actions.js         pure action identity, explicit costs and inventory contracts
js/i18n.js            strict locale negotiation and presentation, without game rules
js/messages.js        required complete English UI messages
js/*-locales.js       Japanese / Simplified Chinese UI and story drafts
js/echo-time.js       pure borrowed-minute rules (no DOM or state mutation)
js/square-event.js    pure witnessed-clue, preparation and Mina-route rules
js/engine.js          game systems + UI copy: loop, clock, scenes, predictions, journal, meters
                      (story data lives in js/data.js; engine.js keeps narrative UI copy with the
                      systems that render it)
assets/images/        label-free development map SVG; historical WebP preserved
docs/                 design dossier PDF, work-package README, research reports
dist/                 generated self-contained HTML + locale catalog (run node build.mjs)
tests/                pure rules, build/inventory contracts, static validation and browser journeys
.github/workflows/    branch-scoped engineering CI; no deployment
```

**Content vs. engine:** story/world data lives in `js/data.js` and is read through
`window.TTB_DATA` — change locations, schedules, scenes, and tuning without
touching the engine. `js/engine.js` holds the game systems plus the narrative UI
copy those systems render (theory text, consequence leads, mode labels).

## Tests

```sh
node --test tests/*.test.cjs    # earned-time/Square rules and build contracts
python3 tests/check_static.py   # syntax, data references, assets, isolated reproducible builds
python3 -B -m unittest discover -s tests -p 'test_reproducible.py' -v
python3 tests/check_reproducible.py --report /tmp/bell-inventory-new.json
node build.mjs                 # explicitly create/refresh local output for browser checks
node tests/square-journey.cjs   # HTTP-hosted browser journeys; set PLAYWRIGHT_MODULE if needed
```

The first two commands work on a clean checkout without generating `dist/`.
Static validation compares two temporary builds. If a local distribution exists,
it must match; a stale file fails the check and remains untouched for inspection.
`--output FILE` resolves a relative path from the command's working directory;
source inputs always come from the directory containing `build.mjs`.

The browser runner needs Playwright and Chromium; its header documents executable/module/output settings. The older `tests/smoke_cdp.py` uses file URLs, which managed browsers may block. For that environment use the preserved [HTTP adapter and smoke notes](docs/gamejam/milestone-2026-10-27/verification.md) with a fresh `BELL_SMOKE_TMP` profile. Do not reuse old profile locks or treat archived output as a new run.

## Parallel development ownership

Keep one integrator for `js/engine.js`; narrative work owns `js/data.js`, pure-rule
work owns `js/echo-time.js` and `js/square-event.js`, and build/QA work owns
`build.mjs` and `tests/`. Agree state/content contracts before concurrent changes
cross those boundaries. Each lane runs the relevant checks and links actual
results. Historical evidence and frozen candidate/reference packages stay intact.

The branch CI job now runs the dependency-free rule/build/static checks and
complete portable-build inventory checks on Ubuntu 24.04, Node 24.19.0 and
Python 3.12.14. The [technical-freeze record](docs/gamejam/technical-freeze-2026-11-06/README.md)
separates actual local verification from remote CI status. Reports require a new
output path and do not replace earlier evidence or create local `dist/`. Browser
smoke on a supported runner remains separate future work. Gameplay-selection and
official-release decisions still require real observations and approval.

## License

- Code (`index.html`, `css/`, `js/engine.js`, `tests/`, `build.mjs`): MIT — see LICENSE.
- Game content and art (`js/data.js`, `assets/`, `docs/`, the design dossier): all rights reserved. Do not redistribute or reuse the story, art, or design documents without permission.

## 27 October milestone: a route remembered

The Contrast demo now contains **Prepare Mina's route**: witness the alley blockage, keep the clue through midnight, and prepare a side passage on a later morning. Ordinary and borrowed visits have different time costs; the outcome shows Mina and her crate at the stalls or sheltered well. Fracture still matters. This is an agent-verified pilot candidate, not a human-approved release.

Start with the [pilot packet](docs/gamejam/milestone-2026-10-27/README.md), [launch instructions](docs/gamejam/milestone-2026-10-27/launch.md), and [human protocol](docs/gamejam/milestone-2026-10-27/protocol.md). The [frozen previous build](docs/gamejam/milestone-2026-10-27/reference/index.html) preserves Original and previous Contrast for comparison. New candidate fonts are local system fallbacks; all gameplay stays in the browser tab and reload clears the run.

Run `node --test tests/*.test.cjs`, `node build.mjs`, and `python3 tests/check_static.py` for rules/build checks. `tests/square-journey.cjs` self-hosts the browser scenarios and accepts `PLAYWRIGHT_MODULE`; consult its header for evidence output settings. Do not count automated journeys or blank study forms as human observations. Candidate 0.1.0 is delivered to master for manual review before any official main release.
