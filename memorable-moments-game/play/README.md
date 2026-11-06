# Small Hours

A browser experiment for two people sharing one screen. Private choices and predictions lead to a tiny joint activity, then a keepsake with one contribution from each person. Three authored scenes; no account, network API, external asset, build step, or runtime dependency.

This is the **development build**, including the November 6 timer cleanup and English, Japanese and Simplified Chinese message catalogs. Japanese/Chinese translations are drafts awaiting fluent review. The twelve-file development export includes `locale-catalog.json`; it is not the frozen eight-file human-study baseline or an approved release. For that baseline, use the [facilitator guide](../../docs/gamejam/readiness-2026-11-05/FACILITATOR-SETUP.md) and its verified ZIP.

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

Session data is held in module memory for the current tab only. Reload, navigation, or End & forget clears the session. Only the supported language preference is stored (`small-hours.locale.v1`); storage failures do not prevent play. Choose a language on the home screen before starting. An explicit choice wins over the saved preference, supported browser preferences, then English. Traditional Chinese and ambiguous `zh` are not silently treated as Simplified Chinese. To change language during play, explicitly End & forget and confirm first; there is no automatic reset or mid-composition switch.

Handoff curtains are visual courtesy screens, not secure storage. Downloaded SVG files contain the two authors’ text, never their private predictions; the players decide whether to save one together. Solo rehearsal never supplies an AI partner and does not validate shared play. Player writing is never translated, uploaded or added to preference storage.

Writing is limited to 120 grapheme clusters using `Intl.Segmenter`, with a conservative combining-mark/emoji fallback for older engines. Active IME composition is neither truncated nor submitted; committed text is limited after composition ends. The SVG uses measured line wrapping and grows vertically for long CJK text. It names installed CJK fonts (Noto, Hiragino/Yu Gothic or PingFang/Microsoft YaHei, then sans-serif); no network fonts or embedded font binary ships. Glyph coverage and metrics therefore depend on the viewer's fonts. Technical browser output does not establish all-device glyph coverage, OS keyboard behavior, native file opening, translation quality or physical-device support.

Run catalog, state, timer and strict export-contract tests with `npm test`. For an HTTP-served exact build, `PLAY_URL=http://127.0.0.1:8111/play/ EVIDENCE_DIR=/new/external/path npm run test:locales` exercises all three locales, pair/rehearsal, synthetic IME events, actual SVG delivery and reopening those saved bytes through local HTTP. It defaults to Chromium; `BROWSER_ENGINE=firefox` or `webkit` uses an installed Playwright engine. Preserve unavailable-engine failures. The committed `verify:development` command includes these locale journeys at root and nested mounts. Human language/device qualification and all original release gates remain separate.

See the [current maintenance report](../../docs/gamejam/maintenance-2026-11-06/README.md), [human-study packet](../../docs/gamejam/launch-2026-11-20/README.md) and [module ownership](../docs/COLLABORATION.md). The [October 5 report](../docs/gamejam-2026-10-05.md) remains historical evidence with its original limits.
