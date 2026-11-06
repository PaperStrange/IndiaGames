# Remaining engineering and release operations audit

Read-only inspection on **6 November 2026**, pinned main `345c33970745297103a099ecdf9dc11f134b0038` and master `ac931cde281e9483f6f693289cad2d99038d5bc0`. No tests, game play, settings writes, candidate changes or policy changes were performed. New scope supplied by the owner: **English (`en`), Japanese (`ja`), Simplified Chinese (`zh-Hans`); desktop web, phones and tablets**. Exact hardware, browser versions and fluent reviewers remain unconfirmed.

## What remains from the existing board

The current 75 cards contain **47 done, 11 blocked_human, 11 conditional, four active and two proposed**. SH-23, KF-30 and TB-22 are complete; their successful export/CI records should not be reopened as new work.

| Category | Existing work | Interpretation |
|---|---|---|
| Independent preparation | SH-02, KF-02, TB-02 comparison preparation; parts of SH-16 owner coordination | Research/access/ownership preparation can continue, but it is not an unfinished unconditional implementation card. Further game play still follows a settled study plan. |
| Human/design-dependent engineering | SH-06 → SH-07/08/09/11/12; SH-17 staging; KF-16; TB-14 | A baseline decision or observations select any correction. An exporter pass does not supply that selection. Preserve conditional status. |
| Exact-build human/device/release work | SH-05/10/14/18; KF-12/13/18/23; TB-13/17; promotion SH-19/KF-19/TB-18 | Real people, physical devices and independent release review remain required. The optional KF-13 recall study must stay optional. |
| Administrator | Issue #2 | Protection is a separate release dependency; passing workflows do not enforce it. |
| New proposed engineering | Locale catalogs, internationalized interaction/layout, cross-engine/device checks and a locale/device evidence contract | These are new tasks to settle, not missing evidence from the completed milestone. |

Source: [task snapshot](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/data/tasks.json). SH-15 remains an active decision brief with unresolved human dependencies; do not turn its status into an evidence-backed product conclusion.

## Fresh issue and protection readback

At **07:07:11 UTC**, GitHub returned only **#2 and #10** as open issues. Both `main` and `master` have `protected: false`; repository rulesets and effective branch-rule lists are empty. The public-safe API readback is retained locally in `ops-readback.json`.

| Item | Observed state | Appropriate next step |
|---|---|---|
| [#2: protection](https://github.com/PaperStrange/IndiaGames/issues/2) | Open, latest comment 05:39:23 UTC; original settings writes returned 403 and were not retried by this audit | Administrator applies the reviewed runbook, records effective rules/IDs and proves current-head check/review enforcement. Prefer before Nov 11; required before Nov 16 go/no-go. Do not infer a counted bot approval from an agent comment. |
| [#10: original managed Chromium route](https://github.com/PaperStrange/IndiaGames/issues/10) | Open, no comments; explicitly non-blocking | Investigate only when an equivalent supported managed-browser task exists. The working co-located HTTP route is separate evidence. Do not weaken LNA/TLS or call a desktop route a phone test. |
| Historical candidate Pages URL | Repair remains paused by request | Keep it out of supported-link claims. If preview hosting is selected for the new device study, settle that independently and verify its real URL; do not silently resume the old repair or publish a candidate as an official release. |
| Small Hours favicon | Known cosmetic 404, preserved in the accepted export report | Optional bounded correction during a separately versioned runtime change; it does not invalidate SH-23 or justify changing frozen baseline bytes. |
| Hosted action runtime | Passing Vivid CI retained the warning that pinned v4 actions declaring Node 20 ran under forced Node 24 | Schedule a scoped action-pin upgrade when selected, with review and actual CI. It is maintenance, not evidence that current CI failed. |

References: [Small Hours known limitation, line 52](https://github.com/PaperStrange/IndiaGames/blob/c9b98b025e0b7ea38254648058146fceddeb9d1a/docs/gamejam/technical-freeze-2026-11-06/README.md#L52), [Vivid warning, line 38](https://github.com/PaperStrange/IndiaGames/blob/2130e5523dbf9ba27af268f0ba8cccb86aef56e2/docs/gamejam/technical-freeze-2026-11-06/README.md#L38).

## Important release-contract gap

**The existing gate does not verify locale or device coverage.** This is a static code finding, not a newly executed negative test.

| Current behavior | Consequence for the proposed work |
|---|---|
| `playtests()` checks known identity/protocol/session/metric/approval fields; there is no locale/device requirement or blanket rejection of extra report/session fields. Metric keys themselves must match exactly. | Adding `locale`, `devices_tested` or a true Boolean to a report would not establish an enforced multilingual/device gate. Do not put locale fields inside `metrics`; they would violate the existing exact metric set. |
| `candidate.json` known top-level fields are inspected, while `manifest.build` must equal the generated inventory exactly. | Extra top-level metadata is not semantic validation. Adding arbitrary keys inside `build` fails equality. |
| The packet allows only `candidate.json`, `human-playtest.json`, `notes.md` and files under `build/`. | A new top-level `locale-review.json` or `device-matrix.csv` sidecar is currently rejected. Keep proposed blank planning records outside packets until a reviewed contract says where they belong. |
| Vivid allows exactly the reviewed `iona` and `mara` stories and exactly one report per shipping story. | Do not add `iona-ja` as a new story or duplicate one story report per locale under schema 2. A reviewed contract is needed for per-locale evidence. |
| Game/version identity is fixed, versions are numeric `x.y.z`, publication processes new game/version entries and does not inspect language support. | Do not invent per-language game IDs or `0.1.4-ja` versions. A successful publisher run would still not prove language or device support. |

Pinned source: [validator playtests, line 90](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L90), [story contracts, line 154](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L154), [package checks, line 226](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L226), [version grammar, line 21](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/validate-release.py#L21), [publisher, line 34](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/scripts/publish-releases.py#L34).

## Proposed ordered engineering milestone

1. **Settle the shipping/evidence contract before implementation.** Recommend one self-contained, immutable multilingual bundle per game/version with stable game/story/action IDs and local `en`, `ja`, `zh-Hans` catalogs. Record the exact locale list, fallback behavior, catalog/font revisions and proposed supported device/browser cells. These are targets until verified. Translation, font and layout bytes create a new candidate version; current Vivid 0.1.4, Bell 0.1.0 and the Small Hours baseline remain immutable.
2. **Prepare versioned locale/device evidence requirements separately from promotion.** Propose a reviewed new contract for exact build hash, locale/catalog identity, per-story scope, actual device/OS/browser/engine/input, reviewer identity, observations and approval. Preserve existing criteria and old immutable archives. Design failure cases for missing locale/story, stale catalog/build, simulated device presented as physical, absent reviewer and unknown support values. A compatible hashed build catalog can establish artifact identity, but the validator must explicitly check its semantics before it becomes a release gate. Do not implement this policy change as an incidental dashboard edit.
3. **Implement per-game localization and device adaptations after the plan is settled.** Extract text without translating state IDs, introduce replacement/formatting contracts and CJK-capable local font/layout handling; preserve semantic saves, private-state behavior and the original game comparisons. Update export inventories deliberately when new locale/font files are introduced—Small Hours' current exact nine-file development contract cannot silently accept extra resources. Each game audit supplies the concrete source seams.
4. **Add technical verification and prepare actual-device runs.** Test each locale and both Vivid stories for missing strings, placeholders, text expansion, wrapping, IME behavior where input exists, keyboard/touch alternatives and failure/recovery. Use Chromium, Firefox and WebKit automation as proposed engine coverage, clearly distinct from actual Safari/iPhone/iPad/Android hardware. Verify root/nested deployment, cache/reload, downloads, storage, orientation and background/resume on the exact exported artifact. Avoid adding PWA/offline/native-store scope merely because phones/tablets are targets.
5. **Freeze new artifacts, then conduct language/device qualification and existing human release cohorts.** Native-language reviewers assess meaning, tone, labels, clue fairness and neutrality; real devices establish only the recorded combinations. Keep build-specific gameplay cohorts and independent official approval intact. Reconcile failures before claiming support. Promotion remains selected package → master → reviewed main release, never a wholesale merge of the queue.

The original fixed cohorts remain six Small Hours pairs, six Iona people, six distinct Mara people and six Bell people—30 distinct people when kept fresh across games. This audit neither reduces those cohorts nor declares that 30 mixed-language observations validate all three locales. It also does not invent a mandatory 90-person rule: the additional per-locale qualification and any comparison/cohort changes require an explicitly reviewed protocol before recruitment. A fluent translation walkthrough is not automatically a gameplay cohort session. The current requirement is exact-build evidence; adding translations changes the bundle hash even if English rules are unchanged. See [policy lines 9–18](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/docs/RELEASE-POLICY.md#L9) and [Vivid requirements, line 35](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/docs/RELEASE-POLICY.md#L35).

## Management and dates

Agents can audit/extract/catalog, draft translations, prepare blank records, implement agreed tooling and run technical checks. People supply accepted role assignments, fluent review, actual hardware, genuine sessions, severity judgments and independent release approval. Administrator work is a separate lane. Unavailable hardware or unreviewed language stays `not tested`/`pending`, not `supported`.

There are five days from Nov 6 to the existing Nov 11 candidate freeze. A complete three-language desktop/phone/tablet release cannot be promised from English source checks and unbooked reviewers. By Nov 11, record which new exact builds are actually frozen; on Nov 16, defer any game/language/device claim missing required evidence. Keep Nov 20 conditional. **Owner decision received November 6 after this audit: require all three languages per released game; defer incomplete games.** English-only release is not an allowed fallback. No narrower-device release is authorized. Calendar pressure must not reduce human thresholds or reuse stale build approval. [Existing dates and capacity](https://github.com/PaperStrange/IndiaGames/blob/345c33970745297103a099ecdf9dc11f134b0038/docs/launch/2026-11-20/README.md#L45).

Documentation housekeeping: `docs/PUBLISHING.md:7–9` still describes PR12 as current and the export/CI dashboard as awaiting verification. The next planning update should carry the already-completed [PR13 verification](https://github.com/PaperStrange/IndiaGames/pull/13#issuecomment-6679061493) forward as dated evidence, without claiming this read-only audit reran deployment checks.
