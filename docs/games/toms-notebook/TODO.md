# Tom’s Notebook — ink redesign and preserved baseline

## Current direction · November 15

Keep the original product’s freehand writing, pressure-aware strokes, erasing, fading and recoverable originals. Build gameplay around consequences of the player’s marks. The existing phrase-selection game remains **0.1.0, a comparison baseline**; it is not the selected future design. The private product remains separate.

[Source review and full plan](https://github.com/PaperStrange/IndiaGames/blob/b395ca7a4c332c43a48e47ff9cb61b0f10ce45c3/docs/gamejam/ink-redesign-2026-11-15/README.md) · [Seven-game roster](https://github.com/PaperStrange/IndiaGames/blob/b395ca7a4c332c43a48e47ff9cb61b0f10ce45c3/docs/gamejam/ink-redesign-2026-11-15/MARKET-PLAN.md) · [Observation template](https://github.com/PaperStrange/IndiaGames/blob/b395ca7a4c332c43a48e47ff9cb61b0f10ce45c3/docs/gamejam/ink-redesign-2026-11-15/OBSERVATION-TEMPLATE.md) · [Decision matrix](https://github.com/PaperStrange/IndiaGames/blob/b395ca7a4c332c43a48e47ff9cb61b0f10ce45c3/docs/gamejam/ink-redesign-2026-11-15/DECISION-MATRIX.md)

| Stage | Status | Cards / next result |
|---|---|---|
| Original ink review and research plan | Prepared; source review complete | TN-11: retain real product behavior and distinguish proposed systems |
| Seven new market journeys | Not started | TN-12: observe complete attempted journeys and critique across roles |
| Three different ink experiments | Conditional; none built | TN-13: select experiments from evidence across eight alternatives |
| Core decision and revised study | Conditional; no favorite selected | TN-14: select/reject, scope the next milestone and review fitting human criteria |

The eight families are material experimentation, construction, living-page ecology, graphic programming, performance, restoration, a learning companion, and an ink workshop/economy. These are alternatives to test, not a combined feature backlog. A persistent evolving page is allowed; one page per authored scene is not a constraint. Narrative and replaceable characters should support the chosen interaction.

The new seven titles are Line Rider, Sandspiel, Townscaper, shapez, Universal Paperclips, A Dance of Fire and Ice and Draw a Stickman. None of these new sessions is complete. Keep their evidence distinct from TN-01’s six earlier narrative-game studies. The original local handwriting model targets English; do not assume Japanese or Chinese handwriting recognition, stylus ownership or recognition errors as game difficulty.

November 16 remains the individual go/defer checkpoint and November 20 a conditional target. The redesigned edition requires its own exact-build verification, fitting reviewed human protocol, all three languages and actual declared desktop/phone/tablet evidence. The 0.1.0 draft consequence metric does not automatically qualify a changed core.

## Historical 0.1.0 baseline · November 14

The owner selected an authored, unsettling psychological diary adventure on November 14. This is the fourth game in the November 20 programme. The independent game version is **0.1.0**; the existing Enchanted Notebook product remains **0.4.0-alpha.0**, with its original application, private hosting and 35 MC cards unchanged.

### Baseline experience and questions

| Question | Hypothesis to test | Contrary evidence to preserve |
|---|---|---|
| Why play? | An object that answers, then remembers differently, may create curiosity and tension. | Players stop because the reply feels arbitrary, the setup is unclear or the interaction is tedious. |
| Why choose this over competitors? | Players can mark real phrases, recover their own words and challenge the book’s account. | Choices appear cosmetic, recovery feels like an administrative panel, or players expect unrestricted AI chat. |
| What distinctive experience? | The same notebook holds the player’s account and a conflicting answer; earlier corrections change the last page. | The final page does not reveal a comprehensible consequence of the player’s action. |

These are hypotheses, not measured demand, enjoyment or uniqueness. [Six browser competitor observations](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/docs/gamejam/competitor-plays-2026-11-14/README.md) informed the authored interactions: A Dark Room, Seedship, Birdland, The Uncle Who Works for Nintendo, Sort the Court! and We Become What We Behold. Only one Seedship mission reached its ending; the other journeys are partial and WBWWB's successful hat capture used disclosed pixel targeting assistance. Agent observations remain labelled agent; human qualification is separate.

### Baseline game edition

One chapter, three exchanges and two endings. Ten–fifteen minutes is a design target, not an observed duration. The player marks authored phrases, explicitly submits, observes a reply, compares the original, corrects or accepts, and reaches an ending reflecting those decisions. Circle/strike/select targets have equivalent keyboard, pointer and touch controls. There is no handwriting recognition, free-form AI, timed failure or jump scare.

Stable story, cast, action and message identities support later narrative replacement. Keeper and Correspondent are original replaceable roles. Preserve original-language source snapshots when changing locale. Restore, cancellation, reload and repeated input must not spend duplicate choices. Optional saves and transcript export are local; denied storage must not prevent a complete journey or claim durable saving.

The separate static TypeScript/Vite export includes only allowed game assets. It retains the original notebook’s material direction without shipping its backend, provider settings, large OCR payload or supplied reference films. English, Japanese and Simplified Chinese ship together; all three Notebook drafts require fluent review. Desktop, phone and tablet viewport checks do not establish physical-device support.

### Baseline team work

| Cards | Perspective | Required result |
|---|---|---|
| TN-01 | Player / design / art / operations | Six real attempted competitor journeys, critique and selected implications |
| TN-02–03 | Narrative / interaction / engineering | Complete authored chapter, consequential marking and recoverable original words |
| TN-04–05 | Localization / accessibility / QA | Three-language complete routes, meaningful regression checks and reproducible exact-byte export |
| TN-06–07 | Governance / research | Separate reviewed draft protocol and readable four-game human-result forms |
| TN-08 | Dashboard / publication | Genuine capture, development preview, truthful fourth lane and verified publication |
| TN-09–10 | Human qualification / release | Actual language/device/product evidence, independent approval or deferral |

[Task contracts](tasks.json) are the status authority. Existing 84 dashboard tasks are preserved. The new game does not close notebook-product MC cards.

**November 14 checkpoint:** TN-01–08 are complete with source-bound research, content, runtime, technical verification, export, draft policy preparation, handoff and actual Pages publication evidence. [The engineering report](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/docs/gamejam/notebook-game-2026-11-14/README.md) records 54 authored browser cases / 2,166 assertions, 26 independent cases / 147 assertions, 16 unit tests including 192 complete semantic paths and six exporter tests. The [0.1.0 development preview](https://paperstrange.github.io/IndiaGames/development/toms-notebook/0.1.0/) contains ten exact files from source `5ef5ab4`, inventory `b91bc1f841ac6e9910a8be0ca8c6663e0253d7d41c0aab4a09088e3f7bd2dc9a`.

TN-08 completed after [independent review, CI and actual Pages verification](https://github.com/PaperStrange/IndiaGames/pull/19#issuecomment-6875593290). TN-09–10 remain blocked on human qualification and approval. At that checkpoint the board had 61 completed cards out of 94. New redesign cards add separate work without rewriting that historical completion; task counts are engineering progress, not release readiness.

### Baseline human-study proposal and release boundary

The owner selected six additional fresh solo players. The proposed product protocol uses the first six preregistered attempts and requires at least four of those same players both to finish unaided and correctly explain an edit-to-reply/ending consequence. It also records original recovery, authored-versus-AI expectations, trust and voluntary continuation without inventing a numerical “fun” pass.

This proposal still needs responsible human review before qualifying observations. The [pinned Notebook protocol](https://github.com/PaperStrange/IndiaGames/blob/f2a90c242350ea1a3d9d9ffdd9cccf9d777a286c/docs/governance/locale-device-evidence-2026-11-06/NOTEBOOK-PROTOCOL.md) in [draft PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) contains the governed extension; it is not adopted by publishing this page. Supplemental language comprehension needs separate reviewed sampling and criteria. Do not split six mixed-language sessions into three validated language cohorts.

Use the [four-game handoff](../../four-game-release-2026-11-14/HUMAN-HANDOFF.md). Official release additionally requires declared physical-device coverage, fluent review of every locale, zero unresolved human-classified critical bugs, effective repository protection and independent exact-build approval. Notebook may remain a labelled development preview while incomplete; it must not delay another qualified game or bypass master staging.
