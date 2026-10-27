# Bell browser QA handoff · 27 October 2026

Implementation-ready test changes are in `tests/square-journey.cjs` and `tests/browser_journey.cjs`. No branch switch, commit, push, runtime edit or human session was performed by the QA owner. All owned browser/server processes have stopped.

## Final verification

- `run-04/report.json`: **16/16 scenario groups pass**, 02:16:51–02:17:24 UTC. No candidate console errors, failed requests or page exceptions. Runtime files and both HTML artifacts were unchanged during the run; their hashes are recorded. The reported HEAD `928a85f` is ancestry, not a claim that uncommitted runtime bytes already existed in that commit.
- `legacy-journey/after-action-trace.json`: existing full journey passes, with **19 recorded journey steps**, no page exceptions, complete ending/restart, catastrophe, emulated narrow view and iframe checks.
- Final candidate HTML: **1,455,336 bytes**, SHA-256 `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973`.
- Frozen comparison HTML: **1,434,008 bytes**, SHA-256 `c2facc2a008c7bb232a629c4bd79efcb07cb5e46b73c4ebf6e55ceaa5337f405`.
- The frozen comparison's exact historical Google Fonts request still fails certificate validation in this browser. Its serif/sans-serif fallbacks rendered. The test explicitly records that exception only for the immutable comparison; candidate resource errors remain fatal. The candidate no longer makes that request.
- Complete keyboard path: **30 Tab/Enter activations, 78 Tabs**, with visible focused headings/controls after every activation and no programmatic test focus. This covers entry, witnessing, midnight carry selection, preparation, the saved expedition action and the outcome.
- The 390px view passes with all computed text sizes doubled. This is an explicit CSS text-enlargement stress test, not a measurement of native browser zoom, physical phone usability or screen-reader support.

## Observed agent journey

1. Enter Contrast, declare a forecast and commit a Square action at Dawn. At Noon, the crowd blocks the alley; the same Mina/crate/flower markers remain at the auction stalls. The journal records the witnessed loop, phase and place. Correct, wrong and blank forecasts all allow this witnessed clue.
2. Complete the day, choose a carried bond/object and wake. The sourced clue remains while the daily outcome returns to pending.
3. The learned preparation appears. An ordinary preparation works with zero Momentum and resolves safely at Noon for one phase and one Fracture.
4. A borrowed preparation instead spends one Momentum once, keeps Dawn and leaves the prediction locked. The path is prepared but Mina has not crossed yet. An Archive action still fits before Noon, then the event and forecast resolve once.
5. The same Mina/crate/flower markers move to the sheltered well; the crowd stays on the main alley and the side route becomes a solid teal path. Scene, map hint, status diagram and future Dusk ledger agree. The persistent visible consequence is distinct from the Momentum change.
6. A late visit or cancelling an encounter does not manufacture an eyewitness clue. A before-Noon catastrophe interrupts the event without rewarding a skipped forecast; a later catastrophe preserves the outcome already seen. The complete anchor ending and restart still work.

These are automated observations. Whether players infer the cause independently, care about Mina, remember the outcome or enjoy retrying remains a human-study question. The instruction to prepare a route may still be followed mechanically; the protocol should collect explanation and prediction before showing its consequence.

## Failures retained and resolved

- `new-scene/`: 15 behavior groups passed, but candidate and comparison both failed the legacy Google Fonts request. Candidate import was removed; comparison bytes stayed intact.
- `run-02/` and `reflow-diagnostic/`: doubled text exposed 8px page overflow in the existing header. Header wrapping fixed it.
- `run-03/` and `reflow-diagnostic-02/`: page width was corrected, exposing clipped encounter-heading content and overflowing long map labels. Encounter wrapping and label wrapping fixed those defects.
- `reflow-fixed/`: the additional whole-button guard counted the intentionally protruding YOU badge. The guard was refined to inspect name labels; no content was hidden to make the test pass.
- `reflow-confirmed/`: targeted enlarged-text pass, explicitly marked `PASS_SELECTED` with the other 15 scenarios not run. `run-04/` is the subsequent complete pass.

## Useful screenshots

- `run-04/witnessed-blockage-before.png` and `witnessed-blockage-before-outcome.png`: actual first witnessed blocked event. The card crop includes the edge of a transient toast below the diagram.
- `run-04/borrowed-route-visible-outcome.png`: changed destination and corresponding scene/ledger/journal.
- `run-04/mina-route-text-200-percent-outcome.png`: enlarged text with the same visual landmarks.
- `run-04/mina-route-keyboard-complete.png`, `mina-route-390-touch-emulation.png`, `mina-route-821x462-embed.png` and `mina-route-complete-ending.png` document the other verified paths.

Physical-device, screen-reader and human cohort results remain pending. No participant rows or fun/retention claims are supplied by these runs.
