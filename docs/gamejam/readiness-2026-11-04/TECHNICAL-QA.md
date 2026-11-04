# Vivid — technical readiness, 4 November 2026

**The Mara alignment helper defect is reproduced and fixed. New 0.1.3 passes eight layout/keyboard cases; twenty distinct semantic completion cases are covered across retained runs, with final functional checks passing after the harness corrections and navigation retry described below. Human approval is still pending.**

| Artifact | Exact identity |
| --- | --- |
| Frozen comparison | 0.1.2 source `0c72da97994d9f2d315e6aba1afba5219936b78b`; master packet `f9488e5079d1d193caef560d1fe72936add6cba3` |
| Comparison inventory | `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4` |
| Tested new build | 0.1.3, 15 files; source [`813f264`](https://github.com/PaperStrange/IndiaGames/commit/813f264400bfc01d7e3e5f668de29bb835f5a70d); the coordinator verified the committed source matches the tested build |
| New inventory SHA-256 | `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00` |
| Browser / transport | Chromium 151.0.7922.173; Playwright1.56.1; same-host ephemeral HTTP; inherited proxy/TLS unchanged |
| UTC date | 2026-11-04; exact start/end timestamps per attempt in [technical-qa.json](technical-qa.json) |

| Check | Actual result |
| --- | --- |
| Original defect | Four root/nested ×1280/390 reproductions: helper occupied a 44px grid cell; its text scrolled internally to77px and grew to201.47px high |
| Negative control | The new regression failed8/8 cases on frozen0.1.2 at the expected full-row assertion; no network errors |
| Fixed geometry | PASS8/8 root/nested ×1280/390 ×normal/200% computed text; helper spans437.77px desktop or351px narrow, has no internal/page overflow |
| Normal text height | Narrow helper fell from201.47px to28.78px; at200% computed text it wraps to115.19px within351px |
| Keyboard | Tab reaches slider; three ArrowRight steps preserve focus and set alignment3; actual reveal and repair ending follow |
| Iona private and archive | PASS8 unique cases; evidence-gated rescue and safe wrong signal, explicit brace + wedge destination, reload while braced, offered letter, choice, actual return placement, reload persistence, independent story resume |
| Mara | PASS12 unique cases; all three interpretations (`repair`, `meet`, `unfinished`) ×root/nested ×1280/390; reveal was followed through to `end`, then reloaded |
| Artifact preservation | Both frozen comparison and new tested build remained unchanged during all runs |

| Before: frozen0.1.2 | After: new0.1.3 |
| --- | --- |
| [390px screenshot](mara-helper-before-390.png) | [390px screenshot](mara-helper-after-390.png) |

The ferry rescue is an intermediate phase; the tested Iona paths continue through the earlier-watch recollection, choice, return and object placement. Reload of a completed ending migrates live state to return; it need not rewrite the persisted `end` value until an action occurs. The private letter remains in its recess and the archive dedication remains placed after reload. Mara's workshop reveal likewise precedes the final interpretation.

## Retained failures and correction history

1. Semantic attempt01 passed all12 Mara paths. Its eight Iona cases stopped at a harness assertion comparing CSS-uppercase `innerText` with mixed-case content; the corrected assertion reads `textContent`.
2. Attempt02 passed all four archive paths. Its four private paths reached the correct return controls but the harness incorrectly demanded an immediate persisted phase rewrite. The assertion was corrected to the visible placement control and the documented migration behavior.
3. Attempt03 passed all four private functional paths. Its strict aggregate remains **FAIL** because one `keeper-portrait.svg` request was aborted during rapid scripted navigation (`net::ERR_ABORTED`).
4. A single targeted root/1280/private retry waited for asset-idle boundaries before navigation. It passed with no page or network errors. This supports a navigation-cancellation explanation; the original abort and report were retained.

These were local harness corrections; no story behavior or save format was changed to obtain a pass. Counts above describe unique tested conditions, not participants. No claim is made about physical devices, screen readers, human empathy/recall, neutral-profile study outcomes, or the separate managed Chromium152 route in issue5. Legacy/corrupt/future-save and forced-WebGL-failure browser cases were not rerun in this pass.

## Reproduce the committed layout regression

Use installed dependencies and a built artifact; preserve the proxy/TLS environment:

```sh
MARA_BUILD=/absolute/immutable/build MARA_EVIDENCE=/new/external/evidence node vivid-2.5d-photo-game/play/test/mara-layout-browser.mjs
```

The runner serves the exact build at `/` and `/IndiaGames/pilots/vivid/` on same-host HTTP, records an inventory and geometry, and closes contexts/browser/server in `finally`. Running against frozen0.1.2 intentionally returns failure; running against the tested0.1.3 inventory returns success. It models text enlargement by doubling computed text sizes, not physical browser zoom.

Detailed semantic traces, failed attempts, drivers and screenshots remain outside Git under `/workspace/indiagames-readiness-2026-11-04/qa/`. The local semantic driver is `qa/drivers/vivid-semantic.cjs` (arguments: build directory, new evidence directory); environment filters `VIVID_STORY`, `VIVID_CHOICE`, `VIVID_WIDTH`, `VIVID_ROOT` select a targeted retry. Those are retained workspace paths, not public links. The committed compact JSON preserves the evidence ledger. No `file://` fallback or network restriction bypass was used.
