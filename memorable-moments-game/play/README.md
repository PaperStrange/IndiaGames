# Small Hours

A browser experiment for two people sharing one screen. Private choices and predictions lead to a tiny joint activity, then a keepsake with one contribution from each person. Three authored scenes; no account, network API, external asset, build step, or runtime dependency.

From the repository worktree root:

```sh
python3 -m http.server 8111 --bind 0.0.0.0
```

Open `http://localhost:8111/memorable-moments-game/play/`.

Browser verification (requires Playwright + Chromium; neither ships to players):

```sh
PLAYWRIGHT_PATH=/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright \
CHROMIUM_PATH=/usr/bin/chromium \
node memorable-moments-game/tests/browser.mjs
```

Alternatively install Playwright in your own dev tooling and let the test script resolve it normally. Set `BASE_URL` when serving elsewhere. Do not open `index.html` with `file://`: browser module imports require HTTP(S).

For a static host, upload the contents of `play/` together with `index.html` at the root. The experience uses normal document scrolling; it is not a fixed canvas. Test the host's embed and download rules before publication.

Data is held in module memory for the current tab only. Reload, navigation, or End & forget clears the session. Handoff curtains are visual courtesy screens, not secure storage. Downloaded SVG files contain the two authors’ text; the players decide whether to save one together. Solo rehearsal never supplies an AI partner and does not validate shared play.

See `../docs/gamejam-2026-10-05.md` for the evidence limits, observed journey, and human test gates; `../docs/COLLABORATION.md` for module ownership.
