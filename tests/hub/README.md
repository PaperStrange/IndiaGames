# Hub browser verification

Run after the interface and presentation metadata are stable. This checks the
static dashboard, not game playability, human research, physical devices or
GitHub protection settings.

Use the repository's full-history working checkout, with the reviewed local refs
`master`, `memorable-moments-game`, `vivid-2.5d-photo-game`, and
`the-thirteenth-bell`, plus the pinned historical commits from
`data/source-manifest.json`. An ordinary shallow or single-branch clone is not
enough for the source/candidate identity checks. The runner never fetches,
creates, switches, or updates refs; prepare those separately before running it.

```sh
PLAYWRIGHT_MODULE=/path/to/playwright HUB_EVIDENCE_DIR=/tmp/new-hub-run node tests/hub/browser.mjs
```

Use an installed Chromium executable via `CHROMIUM_PATH` if it is not
`/usr/bin/chromium`. The runner serves both `/` and `/IndiaGames/`, closes its
browser/server, and refuses an existing evidence directory. Reports include the
actual input hashes, failures, screenshots, and observation time. A successful
local run does not establish a live Pages deployment.

Coverage includes desktop and narrow layouts on both mounts, a tablet viewport,
all 60 tasks and their filters/navigation, keyboard details, late-task and
legacy anchors, load failure/retry, and doubled computed font sizes. The latter
is a 200% text reflow check, not a browser zoom or physical-device test.
