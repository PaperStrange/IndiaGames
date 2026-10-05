# Browser capture and recoverable ink milestone

Owner: Codex implementation and verification; product acceptance remains SakuraSan's decision.
Source baseline: `fde7e57d9b08ab510d360ff2e5202cdb11e42e33`.
Scope: MC-006 overlapping-ink defect and MC-032 browser capture evidence. MC-031's complete multi-leaf input turn remains separately scheduled.

## User-visible behavior

- Unsent ink offers Move ink to a fresh leaf, Keep as annotation, and Read this ink.
- Moving uses one notebook journal mutation. Original stroke identifiers, pressure, recognized-text references and erased regions travel together. Existing page content stays in place.
- Annotation intent is saved with the stroke and excluded from recognition.
- Page navigation restores ink visibility and pauses automatic submission. Loading a page creates no new input-end event. New writing and explicit Read can start recognition.
- Running recognition completes. Revision and stroke-identity guards prevent its result from changing moved or annotated input.
- Page capacity errors preserve the draft and provide an explicit recovery message.

## Verification gate

- [x] TypeScript and production build.
- [x] Four draft-transfer/annotation tests, including capacity rejection and recognized correction geometry.
- [x] Desktop Chromium: move overlap, page return, reload, annotation persistence.
- [x] Phone and tablet viewport equivalents.
- [x] Browser photo selection, rotation/crop, save, original download, retake, revision-chain export and restore.
- [x] Existing storage, ink-cycle, journal and fixed-page regression checks.
- [x] Durable source checkpoint: `72f5639d3d1ae7d2656accf5442d5d10b54a66cd`.

Release handoff: the final source is saved and published through Sites after these checks. The native deployment result records its commit, version and terminal publication status; this document does not predict that result.

## Reproducible browser runner

Install the locked dependencies, run `npm run build`, install Chromium with `npx playwright install chromium`, then run `npm run test:browser`. A supplied compatible Chromium binary can be selected through `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

The runner starts the actual compiled Worker with local Miniflare D1/R2 and production client assets. Each run uses a separate directory under `work/browser-server`; browser scenarios use independent local test identities. The provider is unconfigured and no AI output is simulated. Direct `setInputFiles` tests the application's file input and avoids the system chooser. The runner records failures with screenshots and traces under `work/browser-results`.

Limits: 10-second actions, 60-second scenarios, five-minute suite and six-minute independent process watchdog. Local test identity headers verify storage scoping only. Viewport checks use Chromium and do not establish physical Safari, camera permissions, Pencil input or Android device acceptance. Genuine provider accuracy, timing/cost, safety screening and customer baseline acceptance remain open.

## Current evidence

Verified on 2026-10-05 UTC (2026-10-04 America/Los_Angeles). Nine browser checks passed in 2.3 minutes using Playwright 1.62.1 and Chromium 153.0.8010.0. The three journeys ran at desktop 1440×1000, phone 390×844 with touch emulation, and tablet 820×1180 with touch emulation:

1. Draw over existing content, navigate away/back, move the exact draft to a fresh leaf, reload the unsent draft, and preserve it as an annotation. Source content, stroke identity/pressure and annotation intent are checked against the actual storage API. The returned or reloaded draft does not begin another fade.
2. Turn the page during a typed thought's fade. Returning restores its visible, unsent state; an explicit annotation action preserves it without auto-submission.
3. Select a real image, rotate/crop and save its reading copy, download byte-identical original content, retake with an immutable revision link, export and restore the sources. The prepared image must decode successfully in the browser.

All 20 selected regression checks passed: capture storage/recovery, fixed-page layout, notebook journal, ink-cycle behavior, and draft movement/annotation. TypeScript, the production build and `git diff --check` passed. Browser interactions use real application endpoints and storage; no model responses are mocked. The suite also checks for page JavaScript errors.

The capture checks exposed two additional issues now fixed: preparing a preview interrupted crop/control input, and original downloads could fail without a useful recovery path. Preview generation now leaves editing controls usable while preventing an outdated copy from being saved. Original download uses an authenticated fetch with a bounded timeout and visible failure reporting. Save status has an accessible label on compact layouts.

Selected screenshots are in `evidence/`; the current run's machine-readable results are saved alongside them. No parent story is marked Done by this milestone. MC-006 and MC-032 remain In progress; live-provider and physical-device acceptance remains open.
