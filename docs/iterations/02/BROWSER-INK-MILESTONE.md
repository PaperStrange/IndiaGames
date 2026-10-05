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
- [ ] Desktop Chromium: move overlap, page return, reload, annotation persistence.
- [ ] Phone and tablet viewport equivalents.
- [ ] Browser photo selection, rotation/crop, save, original download, retake, revision-chain export and restore.
- [ ] Existing storage, ink-cycle, journal and fixed-page regression checks.
- [ ] Saved source checkpoint and successful private deployment.

## Reproducible browser runner

Install the locked dependencies, run `npm run build`, install Chromium with `npx playwright install chromium`, then run `npm run test:browser`. A supplied compatible Chromium binary can be selected through `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

The runner starts the actual compiled Worker with local Miniflare D1/R2 and production client assets. Each run uses a separate directory under `work/browser-server`; browser scenarios use independent local test identities. The provider is unconfigured and no AI output is simulated. Direct `setInputFiles` tests the application's file input and avoids the system chooser. The runner records failures with screenshots and traces under `work/browser-results`.

Limits: 10-second actions, 60-second scenarios, five-minute suite and six-minute independent process watchdog. Local test identity headers verify storage scoping only. Viewport checks use Chromium and do not establish physical Safari, camera permissions, Pencil input or Android device acceptance. Genuine provider accuracy, timing/cost, safety screening and customer baseline acceptance remain open.

## Current evidence

Candidate implementation and four unit checks are complete. Browser verification is in progress. No parent story is marked Done by this checkpoint.
