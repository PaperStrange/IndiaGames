# Vivid 0.1.0 verification — 21 October 2026

Implementation source: `25d784b5973e0b1112d8afbba00d32e63257a10b`.
Frozen build digest: `9f7283b275ee0560c49e959488453fdec136b737e0f45898c5b8a9cb420d082f`.
The edge report includes the exact 14-file build inventory. Later research/verification commits do not change these build bytes. These are automated technical observations, **not human participants or proof of enjoyment**.

## Passing checks

- `npm test`: 49 unit/scenario tests, including the eight historical baseline tests, 16 runtime tests and 25 story tests.
- `npm run build`: two lazy packs, 25 representative accessible views and declared local assets validated; shipping catalog generated from those same packs.
- [Full browser journey report](iteration-2026-10-21T07-41-16-662Z/browser-observations.json): 16 observations, no uncaught browser errors. Both stories completed with mouse, keyboard and emulated touch; both Iona outcomes, privacy continuity, neutral profile, reload/checkpoints, invalid/cancelled placement, future/malformed saves, blocked storage, missing artwork and actual WebGL context loss covered.
- [Input/lifecycle edge report](edge-2026-10-21/report.json): 10 checks, no uncaught errors. Escape mid-drag, real CDP touch cancellation and second-touch input, motion interruption, disabled-step focus, cross-story text isolation, invalid bookmarks, hash routing, late asset response and explicitly simulated cached-page lifecycle.
- [Renderer report](../art/verification-2026-10-21/renderer-verification.json): nine checks of geometry, DPR, motion, missing assets, context loss and disposal. Source/art hashes are recorded; only the selected scene's models/textures load.
- [Nested candidate serving](nested-candidate-2026-10-21.json): complete Mara journey and Iona clue inspection from the exact portable packet under `/release-candidates/keepers-frame/0.1.0/build/`; no HTTP asset errors or uncaught exceptions.
- Release tooling has 35 passing synthetic-fixture tests. The pending real packet passes staging identity/inventory checks and intentionally fails readiness because human evidence and approval are absent.

## Budgets and limits

The complete two-story production directory is **1,398,414 bytes (1.334 MiB)** uncompressed, below the 8 MiB selected-experience target even when counting both stories. Exported model geometry is below 7,000 triangles per scene; active scene measurements and DPR≤1.5 are in the renderer report. These measurements do not establish 30 FPS, memory use or comfort on a physical phone. A 390×844 emulated touch viewport is not a physical-device playtest. No audio is required.

Human comprehension, appeal, enjoyment, timing, later recall and comparative benefit over a neutral return remain unknown. The human-study documents define how to collect those observations. No generated person, automated journey or source-only competitor reference counts toward a release cohort.

## Preserved intermediate runs

Earlier runs are retained to explain verification changes, not counted as passing evidence:

| Run directory suffix | Result and resolution |
|---|---|
| 07-33-26-463Z | Interrupted development run used old action-ID names; runner corrected to the pack contract. |
| 07-33-54-769Z | Vite hot reload interrupted interaction during concurrent app edits. Subsequent checks use a frozen built preview. |
| 07-36-48-261Z | Gallery-to-fragment navigation did not open a story; hash routing added and independently verified. |
| 07-38-03-827Z | Ten observations completed, then a malformed future-save fixture expected a future-version message. The fixture omitted required profile/revision fields; corrected fixture verifies future preservation. |

The original October 5 files at this folder's root are unchanged historical evidence for the earlier prototype; do not substitute their dates or results for this iteration.
