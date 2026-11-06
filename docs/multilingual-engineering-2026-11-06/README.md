# Three-language engineering iteration · November 6

The owner authorized implementation and will coordinate the human handoff over the November 7–8 weekend. The six technical cards are complete on the three game branches; the board now records **53 completed / 84 total cards**. The target remains **English, Japanese and Simplified Chinese on desktop web, phones and tablets**, with incomplete games deferred from November 20.

This iteration completed the technical portion of [the settled direction](../release-preparation-2026-11-06/README.md). Exact physical configurations, fluent reviewers and the additional language-comprehension protocol remain to be assigned or reviewed. Their absence does not block catalogs, game implementation, automated checks or a reviewable release-contract patch. It does block claims of human qualification and official release.

## Verified development builds

| Game | Committed development evidence | Observed technical result |
|---|---|---|
| Small Hours | [Source and verification](https://github.com/PaperStrange/IndiaGames/blob/6e09d4ff7315ea8848f5f792002c78af709c4c8f/docs/gamejam/localization-2026-11-06/README.md) | 21 unit/export tests; 1,416 locale assertions across three engines and two mounts. Committed 12-file export matches tested bytes; known favicon diagnostics remain. |
| Vivid · both stories | [Source and verification](https://github.com/PaperStrange/IndiaGames/blob/83c76dc2a2744e38298f38aa5b3ec0a734f4ed1f/docs/gamejam/localization-2026-11-06/README.md) | 69 unit tests, 7 version guards, 39 locale/engine cases and 10 edge cases. Active controls and both endpoints verified; repeated 16-file build and latest branch CI pass. |
| The Thirteenth Bell | [Source and verification](https://github.com/PaperStrange/IndiaGames/blob/58e5cf15ac6920b6a25df0b656d843e69217fafd/docs/gamejam/localization-2026-11-06/README.md) | 32 Node tests, 30 static checks, 13 inventory/exporter tests and 9 locale/engine journeys. Onboarding corrected; committed two-file export matches tested bytes. |

All three final browser matrices ran Chromium 141.0.7390.37, Firefox 142.0.1 and WebKit 26.0 in the supported Linux container. Bell couples locale to desktop/phone/tablet viewport sizes and does not claim the full Cartesian matrix. All hardware, native keyboard, actual screen-reader and fluent-quality claims remain pending. Missing host libraries/browser launch failures, SVG preview harness failures and a transient container storage failure are retained as infrastructure evidence. No failed attempt is relabelled as a human or physical-device pass.

Independent review corrected Vivid’s replaceable-character grammar and an empty-control geometry assertion, plus Bell’s regenerated English onboarding. Root verified final artifact identities and preserved original frozen packets. Japanese/Chinese translations are still drafts. New development sources are available on their game branches; `master` remains unchanged and no official release was promoted.

## Work and acceptance

| Lane | Engineering work | Complete journey to verify | Human judgment still required |
|---|---|---|---|
| Small Hours | Complete-message catalogs; private-session locale boundaries; CJK composition and grapheme handling; localized, readable SVG output | Pair and rehearsal entry → choice and guess → private handoff → reveal → activity → an actually downloaded keepsake | Willing participation, privacy wording, shared authorship, fluent meaning and actual keyboard/download behavior |
| Vivid / Keeper’s Frame | Localize engine and both story packs around stable story/action/cast/save identities; safe collection-level switching and recovery | Iona: choice → return → actual placement; Mara: arrangement → actual interpretation; saves survive switching | Both stories’ tone, consent, narrative clarity and consequences; readability, touch and physical graphics performance |
| The Thirteenth Bell | Remove English labels from rules/costs/history identity before translating full clues, receipts, journal and map access | Witness → retained clue → loop-two intervention → visible consequence; forecast remains optional and distinct from eyewitness knowledge | Causal understanding, clue fairness, matched-language comparison and genuine neutral recall |
| Release operations | Prepare a separately reviewed validator/policy extension binding locale and device evidence to exact build bytes | Reject missing/invalid coverage, changed identities, self-approval and unadopted comprehension criteria | Responsible review of policy/protocol and independent approval of any eventual game release |

Japanese and Chinese catalogs are **agent drafts pending fluent review**. Automated checks are engineering observations, not participant sessions or hardware approval. Browser engine names and versions will be recorded with results; desktop-size, phone-size and tablet-size viewports remain emulation.

## Implementation contract

- Ship one self-contained multilingual bundle per game/version. Keep semantic story, action, cast, item and save identities independent of language.
- Resolve a supported explicit choice, then saved preference, then supported browser preference, then English. Do not silently interpret Traditional Chinese as Simplified Chinese. Storage failures must not prevent play.
- Validate complete key and placeholder parity. Localize visible and assistive text, feedback, transcripts and exports; preserve player-authored text unchanged.
- Choose safe language-switch boundaries. Switching must not spend an action, grant an outcome, erase an active run or overwrite protected saves.
- Declare font fallback and CJK input/wrapping behavior. Real keyboards, operating-system fonts and physical comfort require separate observation.
- Emit a hashed `build/locale-catalog.json` with schema version 1, game, default locale, all three locale IDs and shipping units. Units are `small-hours`; `iona` and `mara` within `keepers-frame`; and `thirteenth-bell`. Keep Vivid’s existing story catalog. Catalog presence declares content scope, not fluent approval.
- Preserve old candidate packets, comparison artifacts and Small Hours’ frozen eight-file study baseline. Changed build bytes require a new identity and exact-build evidence.

The candidate packet remains `candidate.json`, `human-playtest.json`, `notes.md` and `build/**`. Draft coordination forms live outside packets. [Draft PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) contains the release extension, blank decision worksheet and migration guidance. It passed 53 authored tests and 42 independent adversarial cases. It remains separate from game implementation and dashboard publication; the new gate is not adopted merely because a field appears in JSON.

## Delivery and dates

| Cutoff | Delivery | Decision boundary |
|---|---|---|
| Nov 6 | Completed catalogs, critical journeys, independent review and verified development exports; publish the engineering dashboard | Translation drafts and technical results do not fill human review cells |
| Nov 7–8 | Owner coordinates the [weekend handoff](WEEKEND-HANDOFF.md); reviewers assess [draft PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) | Accepted people, actual devices and reviewed comprehension criteria remain pending |
| Nov 9–10 | Resolve findings, obtain fluent corrections, settle physical configurations and the comprehension protocol | Reforecast any game with missing capacity or unresolved critical defects |
| Nov 11 | Freeze only eligible, testable new candidate bytes under the adopted contract and existing staging prerequisites | Unfinished scope stays in development; Small Hours keeps its pilot-first requirements |
| Nov 12–15 | Run preregistered studies and physical qualification on exact builds; fix and retest where needed | Preserve failed/assisted attempts and invalidate approvals when bytes change |
| Nov 16 | Decide separately for each game | All three locales, declared devices, existing cohorts, repository protection and independent approval must pass |
| Nov 20 | Publish only approved versions and truthful release notes | Defer incomplete games; no silent language or device-scope reduction |

The existing 30-person baseline and all fixed thresholds remain. Supplemental language sampling is a decision for the reviewed protocol; this iteration neither splits six participants into three validated language cohorts nor silently multiplies recruitment by every device combination.

One integrator owns each game branch. Independent review precedes delivery; commits, build inventories, test failures and exact restart steps are retained. The dashboard reports verified progress separately from pending human work. Codex allowance is not visible in this environment; if the owner reports less than 5%, stop new work at a safe boundary and preserve a restart checkpoint.

## Dashboard verification

[Final local dashboard evidence](dashboard-qa.json) verifies desktop/narrow root and project mounts, tablet layout, doubled text, keyboard controls, load failure/retry, all 84 task links and unchanged frozen artifacts. Desktop overview has 646 words and narrow overview 640, within the 650-word budget; there were zero unexpected errors. Independent review also checked the language table at 320–1440 CSS pixels and malformed-data recovery. These are local engineering checks; the delivery PR records CI and actual Pages proof after publication.
