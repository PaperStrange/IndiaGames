# Dashboard QA — 4 November 2026

**PASS locally: the final 65-task dashboard works at root and GitHub-project mounts, including desktop, narrow, tablet and enlarged text. GitHub Pages deployment is still pending; this is not a live-publication result.**

| Execution identity | Value |
| --- | --- |
| UTC window | 2026-11-04 16:12:20–16:12:34 |
| Tested branch | `hub/readiness-2026-11-04` |
| Ancestry commit | `9bc2934c2550a4bd0699e5ee690c19e3bac438e9` plus the final readiness working-tree changes |
| Exact bytes | Eleven runtime/data/test input SHA-256 values in [dashboard-qa.json](dashboard-qa.json); unchanged throughout the run |
| Browser | Chromium 151.0.7922.173, installed Playwright 1.56.1, Linux managed cloud |
| Transport | Same-host ephemeral HTTP; inherited proxy/TLS unchanged; no `file://` fallback |
| Errors | Zero unexpected page errors, failed requests or HTTP error responses |

The ancestry commit alone is not the tested revision. The compact JSON records exact input hashes; the release coordinator should bind the eventual commit to those inputs before publishing. GitHub CI and deployment must still verify that published revision.

| Condition | Result |
| --- | --- |
| `/` at 1440×1000 and 390×844 | PASS |
| `/IndiaGames/` at 1440×1000 and 390×844 | PASS |
| `/IndiaGames/` at 768×1024 | PASS; overview/board reflow and keyboard detail activation |
| 390px with doubled computed text sizes | PASS; no horizontal overflow; detail remains operable; not physical browser zoom |
| Simulated load failure | PASS; one intentional `tasks.json` HTTP 503 produced the visible error; keyboard Retry recovered without reloading |
| Task completeness | All 65 unique authored IDs reached through 12-row pages, with next/previous boundaries; Small Hours 20, Vivid 26, Bell 19 |
| Filtering / search | All three lanes; `blocked_human`; the first authored task's perspective; `SH-17` finds itself and dependent `SH-18`; empty search recovers |
| Task details / navigation | Keyboard Enter opens/closes acceptance and dependency details; back/forward, legacy overview anchors, `#sources`, `#task-TB-17`, malformed hash handled |
| Readiness / release boundaries | Correct zero human denominators, pending devices/approval, empty official-release registry and conditional November 20 timeline |
| Source / candidate identity | Reviewed game heads and verified runtime scopes match; master candidate trees and inventories equal pinned packets; human reports remain empty and unapproved |
| Images | Three real game assets loaded and matched their pinned Git source bytes; 2,041,402 bytes total, below 4 MiB budget |
| Destinations | 119 unique rendered destinations classified; local anchors/files and GitHub blob/tree source targets resolve; external/service destinations were recorded, not remotely fetched |

![Dashboard overview at 1440px](dashboard-overview-1440.jpg)

[View the 390px project-mount overview](dashboard-overview-390.jpg)

The desktop and narrow overview screenshots were visually inspected: all three original game images render, readiness values and candidate labels remain readable, and the timeline/release boundary is visible. The overview contains 384 visible words on desktop and 381 on narrow screens; task detail remains in the separate board. This is a technical/presentation observation, not a human usability study.

## Reproduce

From a checkout containing the final dashboard and its pinned local source refs, with Playwright and Chromium already installed:

```sh
PLAYWRIGHT_MODULE=/workspace/IndiaGames/vivid-2.5d-photo-game/play/node_modules/playwright HUB_EVIDENCE_DIR=/new/external/dashboard-evidence node tests/hub/browser.mjs
```

`PLAYWRIGHT_MODULE` can point to another installed module; `CHROMIUM_PATH` defaults to `/usr/bin/chromium`. The runner starts and stops its own same-host server, validates Git/source inventories before browsing, and records failed attempts rather than changing policy or falling back to another transport. No tracked files were changed by QA. Browser and server were closed in `finally`.

Detailed output and ten screenshots remain at `/workspace/indiagames-readiness-2026-11-04/qa/dashboard-final-01/` (a retained workspace path, not a public link). The compact JSON includes the full external report's hash. No live Pages request, paused candidate-URL repair, game regression, physical-device session or human approval is implied by this dashboard pass. Test coverage includes the specific filter/search/deep-link cases above, not every possible combination or a full screen-reader audit.
