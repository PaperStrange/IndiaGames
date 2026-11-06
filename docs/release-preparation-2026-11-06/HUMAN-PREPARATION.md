# Proposed human language and device release preparation

**Planning audit only. No new playtest, translation, supported-device claim, participant assignment or policy change has occurred.** The owner confirmed English (`en`), Japanese (`ja`) and Simplified Chinese (`zh-Hans`) across desktop web, phones and tablets. Actual hardware, fluent reviewers and appointments remain unknown. Source review is pinned to main `345c33970745297103a099ecdf9dc11f134b0038`.

## What must stay separate

| Evidence layer | What it can establish | What it cannot establish |
|---|---|---|
| Locale content/editorial review | Terminology, register, meaning, consent/privacy wording, clue and consequence equivalence | Fresh-player understanding, enjoyment or device compatibility |
| Automated locale/engine/layout checks | Missing keys, placeholder consistency, text/layout behavior, input/state invariants on the actual test configuration | Native-language quality, real hardware, touch comfort or genuine human recall |
| Physical-device technical sessions | Actual keyboard/touch/IME, rendering, storage, downloads, background/resume and accessibility on named hardware/software | Naive-player product metrics if the tester already knows the game |
| Original preregistered product cohorts | The game's existing small formative thresholds on the exact build and declared study conditions | A per-language pass merely because several languages were pooled into six rows |
| Additional locale-comprehension study | Observed understanding in the declared language, with prior exposure and help recorded | Automatic replacement for original cohorts or proof of universal cultural appeal |

Use familiar QA staff for repeated technical device checks; reserve fresh participants for first-exposure product/locale comprehension. An English playthrough makes the same person's later Japanese or Chinese run a learned replay, not a fresh localized journey. A native editor can review multiple devices, but their familiarity must stay visible. The final human approver remains independent of all participants and observers.

## Existing gate and the new coverage gap

The current baseline remains **24 registered candidate sessions / 30 distinct people**: six Small Hours pairs (12 people), six Iona remembered players, six different Mara players and six Bell players. Bell also has the six reference runs within those comparisons. Optional Iona neutral adds six distinct people; it cannot replace either shipping story. Keep all first-six preregistered attempts, including failures, and all original thresholds. Bell preserves 3/3 first-build order and at least 120 seconds of neutral activity before recall. See [release criteria](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/docs/RELEASE-POLICY.md#L7-L39), [capacity](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/docs/launch/2026-11-20/README.md#L59-L71), and [owner protocol reminder](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/docs/iteration-2026-11-06/OWNER-TODO.md#L16).

**A protocol/schema decision is required before multilingual release acceptance can be claimed.** The current [validator](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L90-L150) checks the exact build, six sessions, metrics and independent approval; it does not enforce locale or device coverage. Vivid accepts [one report per shipping story and at most one optional neutral Iona report](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L178-L223). Unknown locale metadata or three translated rows are not a new automated gate. Do not put Japanese/Chinese cohorts into `study_reports`, duplicate story IDs, or treat two people per language as three validated six-person cohorts.

Recommended planning structure: preserve the existing product cohorts; preregister their actual study language; add a separate locale review/comprehension evidence plan for all three target languages. The research lead and independent reviewer must settle its sampling, acceptance and connection to release approval **before sessions**. Native editorial signoff alone is insufficient for a localized-comprehension claim. Additional fresh Japanese- and Chinese-speaking players will be needed if the original cohort language is English; counts are not yet settled. If the owner instead requires the full original gate independently in every language, that is a different explicitly reviewed plan: repeating the 30-person design three times would mean 90 distinct people, before optional studies. This is a capacity scenario, not an approved requirement or recruitment commitment.

Translation or font/catalog changes alter build bytes. Use a new immutable candidate and new exact-build records; do not transplant approvals from an earlier English package. Freeze the displayed locale, instruction language, catalog revision/hash, story/profile and reference language before a measured run. A participant must not be switched to English after difficulty and still counted as an unaided Japanese/Chinese success. Record assisted/fallback runs and their interpretation under the settled protocol.

## Proposed physical-device coverage slots

These are **planning targets, all untested**, not a support matrix. Fill actual model, OS/browser versions, viewport and available inputs before allocating sessions.

| Slot | Proposed environment | Primary concern |
|---|---|---|
| D1 | Windows desktop, Chrome | Pointer/keyboard, CJK IME, browser storage, SVG download |
| D2 | Windows desktop, Edge | Same Chromium family; verify browser-specific download/storage behavior rather than claiming a new engine |
| D3 | macOS desktop, Safari | WebKit behavior, keyboard focus, storage, download and text rendering |
| D4 | Available desktop, Firefox | Gecko behavior and keyboard/focus differences; record the actual OS |
| P1 | Physical iPhone, Safari | Touch, safe areas, virtual keyboard/IME, background/resume, saving/sharing |
| P2 | Physical Android phone, Chrome | Touch/IME, resize, GPU/memory, storage, download/share behavior |
| T1 | Physical iPad, Safari | Portrait/landscape, split view, touch plus external keyboard/trackpad if actually available |
| T2 | Physical Android tablet, Chrome | Larger layouts, rotation/multiwindow, touch/keyboard transitions, graphics fallback |

Record actual browser engine, not just branding. A WebKit-based Chrome-on-iOS build does not add independent Chromium coverage; browser UI behavior may still deserve a separate targeted check. Playwright WebKit is not physical iOS Safari. Phone and tablet Chromium share a family but not necessarily performance, input, layout or OS behavior. Do not infer all phone/tablet support from one device.

## Manage the combinations without invalid shortcuts

There are four playable units for coverage: Small Hours, Iona, Mara and Bell; Vivid remains one release. Plan all three locales for each unit's content and critical path. Automated checks may cover broad combinations cheaply after implementation. Human technical sessions can use a preregistered risk-based device assignment, retaining a list of uncovered combinations; do not claim exhaustive coverage from pairwise sampling.

For each intended physical support slot, verify the complete critical path in the locale assigned before the run, plus CJK rendering/IME and relevant locale switching on that same device where those features exist. Rotate additional locale/device combinations based on observed risks and actual inventory. Any claim that **each locale works on each device** requires evidence for those cells; an English-only phone pass plus Japanese desktop pass does not fill the Japanese-phone cell. Distinguish complete-path, targeted smoke and not-run cells in release notes.

Critical paths to preserve: Small Hours private choice/handoff → reveal → shared activity → voluntary keepsake/replay, with no privacy leakage; Iona choice/return/consequence and story-isolated saves; Mara arrangement/visible consequence; Bell witness/provenance → earned intervention/cost → Mina outcome → declared neutral recall. Bell's candidate/reference language and terms must be comparable; never silently translate or replace its frozen reference.

## Review the experience from four perspectives

Localization is a design and storytelling change, not only a word substitution. Record the original three product questions as hypotheses: why a person chooses to continue, how the experience differs from games they actually know, and which specific player action/consequence is memorable. Editorial fluency cannot answer those questions on behalf of players.

| Perspective | Review or observation question | Evidence boundary |
|---|---|---|
| Player | What did this person intend, what made them continue or stop, and where did they lose the thread in this language? | Preserve actual words, visible behavior and assistance; do not infer motivation from a completed screen |
| Designer | Does the localized cue preserve the same available action, discoverability, cost and understandable consequence? Does wording accidentally teach the solution? | Compare stable state/action contracts and observed predictions; distinguish translation defects from a weak mechanic |
| Narrative / art | Do voice, register, names, emotional ambiguity, privacy/consent and object meaning preserve the intended relationship and player agency? Is the scene readable with actual CJK text and glyphs? | Native editorial reasoning is useful but separate from fresh-player interpretation; do not grade an expected emotion |
| Operator | Can the player enter the correct language, recover from errors, understand support limits and safely save/share on the actual device? Can a facilitator run neutral prompts without live coaching translation? | Record exact locale/build/device and support wording; familiarity and operational success are not a fresh product-cohort result |

A shared fluent reviewer may edit all three games, with that role recorded. That does not authorize reusing the same person as a fresh participant across game/story/cohorts or replacing a required cohort with language review. Additional interview prompts must be settled before testing and placed after canonical metrics/recall tasks so they do not coach the measured behavior. Comparisons with competitors require actual prior exposure; otherwise record the comparison as unknown.

## Parallel ownership and decision points

| Owner | Work before human testing | Evidence needed later |
|---|---|---|
| Agents, one integrator per game | After implementation plan settlement: extract stable locale resources, validate keys/placeholders, CJK stress, automate supported engine/layout cases, reproducible export and recording helpers | Actual command/source/artifact hashes and retained failures; no human result |
| Owner/coordinator | Confirm fluent reviewers, bilingual facilitation, available hardware and time; settle per-locale acceptance approach and whether all three locales are mandatory on November 20 | Accepted names/role IDs and actual appointments, held privately where appropriate |
| Native/fluent reviewers | English source review, Japanese and Simplified Chinese meaning/register review, glossary and ambiguity resolution for every playable unit | Original wording, proposed revision, rationale and approval/rework decision; no invented native-language signoff |
| Device QA | Inventory and test-host access; assign physical cells and accessibility configurations | Actual device results, full attempts and defect reproduction; familiarity disclosed |
| Research lead + independent approver | Preregister product and supplemental-language studies; define claims and no-go rules without lowering existing gates | Raw evidence review, exact-build play and independent per-game release decision |

## Calendar proposal, not bookings

| Cutoff | Proposed work | If incomplete |
|---|---|---|
| Nov 6–7 | Settle locale architecture, human acceptance model, glossary ownership, device inventory and feasible staffing | Keep implementation/claims bounded; no invented appointments or language support |
| Nov 8–10 | Implement only settled scope; native editorial review and automated checks proceed together; prepare exact-build test setup | Reforecast, rather than compress translation review or human observations |
| Nov 11 | Freeze only testable new candidate bytes, locale/catalog identities and complete protocols | The affected multilingual game is off the default launch track; preserve old candidates |
| Nov 12–15 | Run real product cohorts, settled locale studies, physical-device checks and fixes/retests on exact builds | Missing coverage remains pending; no pooled-language shortcut or reused changed-build approval |
| Nov 16 | Per-game go/no-go including declared locale/device claims | Owner chooses an explicitly revised release scope or deferral; do not silently drop a requested language/device |
| Nov 20 | Publish only approved versions and truthful support notes | No release announcement for unverified scope |

The existing estimate is about 24 facilitator-hours **before** the added language/device work. No defensible added-hours estimate exists until text scope, reviewers and hardware are known. All three languages and all three form factors are requested targets, not a promise that the expanded scope fits the remaining calendar.

## Blank draft forms and packet boundary

Use [scope/preregistration](human-scope-preregistration-template.md), [language review](human-language-review-template.md), and [physical-device session](human-device-session-template.md) alongside the canonical per-game form. They contain no observations or approvals. Keep raw recordings, contacts and consent private; publish only reviewed deidentified summaries.

These forms are not drop-in candidate schema replacements. The [candidate validator](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L226-L230) admits exactly the three manifest/note files plus `build/**`; place planning records outside immutable candidate packets unless a separately reviewed schema/policy change specifies otherwise. The [existing session form](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/templates/game-demo/06A-HUMAN-SESSION.md#L9-L23) already records build and device identity; this proposal adds explicit locale and coverage distinctions, not automatic gate acceptance.
