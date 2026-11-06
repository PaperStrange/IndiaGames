# Small Hours

A browser experiment for two people sharing one screen. Private choices and predictions lead to a tiny joint activity, then a keepsake with one contribution from each person. Three authored scenes; no account, network API, external asset, build step, or runtime dependency.

This is the **development build**, including the November 6 timer-lifecycle cleanup. It is not the frozen eight-file human-study baseline. For that artifact, use the [facilitator guide](../../docs/gamejam/readiness-2026-11-05/FACILITATOR-SETUP.md) and its verified ZIP.

From the repository root, serve only this game's public files:

```sh
python3 -m http.server 8111 --bind 127.0.0.1 --directory memorable-moments-game
```

Open `http://127.0.0.1:8111/play/` on the same machine. A phone needs a separately verified local-network route; do not serve private study records.

Timer lifecycle checks use Node 18 or newer, with no dependency installation:

```sh
node --test memorable-moments-game/tests/countdown.test.mjs
```

Browser verification (requires Playwright + Chromium; neither ships to players):

```sh
BASE_URL=http://127.0.0.1:8111/ \
PLAYWRIGHT_PATH=/path/to/installed/playwright \
CHROMIUM_PATH=/usr/bin/chromium \
node memorable-moments-game/tests/browser.mjs
```

Alternatively install Playwright in your own dev tooling and let the script resolve it normally. `BASE_URL` is the game directory URL containing `play/`, with a trailing slash. The default supports serving the whole repository at port 8111. Do not open `index.html` with `file://`: browser module imports require HTTP(S).

Each browser run writes to a new temporary directory and prints that path. Set `EVIDENCE_DIR` to a **new, nonexistent directory** to choose a destination; an existing directory is rejected before a browser starts. Partial failure traces are retained and the browser closes on success or failure. Historical `docs/evidence/` is never the default output. From this game's directory, `npm test` and `npm run test:browser` are equivalent convenience commands; the package has no dependencies and is private.

For a static host, upload the contents of `play/` together with `index.html` at the root. The experience uses normal document scrolling; it is not a fixed canvas. Test the host's embed and download rules before publication.

Data is held in module memory for the current tab only. Reload, navigation, or End & forget clears the session. Handoff curtains are visual courtesy screens, not secure storage. Downloaded SVG files contain the two authors’ text; the players decide whether to save one together. Solo rehearsal never supplies an AI partner and does not validate shared play.

See the [current maintenance report](../../docs/gamejam/maintenance-2026-11-06/README.md), [human-study packet](../../docs/gamejam/launch-2026-11-20/README.md) and [module ownership](../docs/COLLABORATION.md). The [October 5 report](../docs/gamejam-2026-10-05.md) remains historical evidence with its original limits.
