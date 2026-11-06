# Proposed multilingual and multi-device release preparation

**Scope confirmed; implementation plan proposed.** The owner selected **English (`en`), Japanese (`ja`) and Simplified Chinese (`zh-Hans`)** across **desktop web, phones and tablets**. Exact devices, browser/OS floors, fluent reviewers and additional language-study requirements are unconfirmed. The November 20 choice between all three languages and a verified subset is still pending; no narrower fallback has been authorized.

The [export and branch-CI milestone](../technical-freeze-2026-11-06/README.md) is complete. None of its engineering cards is reopened. This audit adds nine **proposed** cards: the board now has **84 cards / 47 completed**. The existing 75 card contracts, current game artifacts, QA histories and human release criteria are preserved. No new game test, translation or gameplay implementation is supplied by this planning update.

## What remains, and why it matters

| Lane | Source-grounded finding | Proposed engineering response | Human evidence still needed |
|---|---|---|---|
| Small Hours | English messages span UI, privacy text and SVG export. Input counting/truncation uses UTF-16; the fixed-size SVG wraps text without a demonstrated CJK layout contract. | **SH-24/25:** complete-message catalogs, explicit locale/session behavior, IME/grapheme policy, CJK keepsake/font layout, deliberate export allowlist and cross-engine checks. | **SH-26:** native meaning/privacy review, actual keyboards/downloads and comfortable pair participation on declared devices. |
| Vivid | Story IDs and saves are already semantic, but English is distributed across app and both packs; feedback/transcripts currently contain rendered prose. | **KF-31/32:** catalog layer around the existing Iona/Mara packs, locale-switch/transcript contract, stable saves/recasting, both-story cross-engine and flat/3D checks. | **KF-33:** review both stories in each locale; verify actual touch/keyboard, readability, saves and physical performance. |
| Bell | Some English action prefixes and labels influence consequences/Fracture costs. The map has baked English lettering. | **TB-23/24:** isolate semantic IDs and cost metadata first, then localize messages/map access and verify rule invariance plus device layouts. | **TB-25:** native clue-fairness/causal wording review and real-device comparison with matched languages and preserved neutral recall. |
| Shared release operations | Current validation checks artifact identity and existing human criteria, **not locale/device coverage**. Extra JSON labels do not create a gate. | Settle a versioned evidence contract and its separately reviewed validator/policy change before multilingual promotion. | Accepted reviewer/device owners, actual observations, critical-defect judgments, repository protection and independent release approval. |

These are static source findings and cited historical test limits, not newly reproduced gameplay failures. [Small Hours audit](audits/small-hours.md) · [Vivid audit](audits/vivid.md) · [Bell audit](audits/bell.md) · [Operations audit](audits/ops.md).

## Sequence to settle before implementation

| Step | Agent team prepares | Decision or exit condition |
|---|---|---|
| **1. Agree the contract** | String/content inventory; language resolution/fallback and switching behavior; support matrix; proposed evidence fields and failure cases. | Owner settles November 20 scope, exact claimed browser/device combinations and locale sampling. A responsible human reviewer approves any release-policy/protocol change separately from promotion. |
| **2. Build foundations in parallel** | Small Hours message/privacy/export contract; Vivid locale layer around stable story/save IDs; Bell semantic-action/cost refactor before translating labels. | Each lane demonstrates unchanged rules and preserved English reference behavior on an exact source. No shared engine or cast identity is translated into a new story ID. |
| **3. Add locale resources and technical coverage** | Reviewed complete sentences/placeholders, local CJK fonts/art alternatives and tests for missing keys, long strings, input, recovery and exports. | English, Japanese and Simplified Chinese content coverage is explicit; Chromium/Firefox/WebKit results name versions and remain separate from hardware evidence. |
| **4. Prepare exact candidates and qualify them** | New immutable versions/inventories, blank locale/device records, critical journeys and a retest-impact ledger. | Native reviewers and physical-device testers record actual outcomes on those exact bytes; existing release cohorts still run under their reviewed protocol. |
| **5. Decide and release per game** | Reconcile every declared support cell and unresolved defect; prepare the selected package's promotion/release notes only when eligible. | Required human/device/locale evidence, protection and independent approval pass. Missing evidence is pending or a defer decision, never an invented pass. |

Recommended packaging is one self-contained multilingual bundle per game/version with local locale catalogs and stable identifiers. This is a proposal, not an implemented schema. Translation, font or layout changes alter build bytes and require a new candidate identity and exact-build human evidence. Preserve Vivid 0.1.4, Bell 0.1.0, all prior packages and Small Hours' frozen eight-file study artifact. Small Hours' current development exporter permits nine files; adding resources requires a deliberate updated allowlist and failure tests.

The current packet admits only its documented manifests/notes and `build/**`. Keep draft templates outside candidate packets. Do not add `iona-ja`, duplicate Vivid story reports by locale, invent `0.1.4-ja` versions, or add locale fields to the exact metric set. A future catalog inside a hashed build establishes identity only after its semantics are explicitly checked by an adopted contract. [Current policy](../RELEASE-POLICY.md) remains authoritative.

## A manageable testing matrix

Use the [planning matrix](planning-matrix.json) as a **target list, not a compatibility claim**. It separates four game units (Small Hours, Iona, Mara, Bell), three locales and proposed desktop/phone/tablet browser rows. Exact models, versions and support floors stay blank until assigned.

| Evidence layer | Unit of work | Efficient division of responsibility |
|---|---|---|
| Language quality | Each locale × game/story, including private/consent text, clues, actions and endings | Fluent reviewers check meaning, tone and cultural clarity. Agent drafts and back-translations are supporting material, not approval. |
| Automated compatibility | Exact build × locale × relevant engine/input/layout journey | Agents cover deterministic rules, missing strings, placeholders, long text, font load, state recovery and exports. Browser engine emulation is labelled. |
| Physical compatibility | Each actually claimed device/browser/input cell on the exact build | Device QA records real hardware, orientation, virtual keyboard, download/storage/lifecycle and accessibility behavior. Pairwise selection can reduce low-risk permutations, not omit blocking paths or claim unseen hardware. |
| Gameplay/design evidence | Existing registered game cohorts plus any explicitly reviewed additional locale qualification | Keep uncoached observation and all attempts. Language acceptance and device smoke do not automatically become gameplay cohort sessions. |

Proposed browser rows include Windows Chrome, Edge and Firefox; macOS Safari; iPhone Safari and Android phone Chrome; iPad Safari and Android tablet Chrome. These are inventory slots awaiting hardware and scope agreement. An iOS browser brand is not automatically a different engine; record the actual OS/build/engine where known rather than count labels as coverage. No native-app, app-store, PWA, offline or cross-device save capability is added by this scope.

## Preserve human study integrity

The original release cohorts remain **six Small Hours pairs (12 people), six Iona people, six different Mara people and six Bell people: 30 distinct people kept fresh across games**. Keep the fixed metric thresholds, independent reviewer and all preregistered failed/assisted attempts. Bell retains 3/3 first-build order and at least 120 seconds of neutral activity before recall. Vivid keeps both shipping stories and its separate optional studies.

Thirty mixed-language observations do not validate all three locales. Equally, this plan does not silently require 30 people for every language/device combination. Settle additional per-locale sampling and claims before preregistration; never divide a six-person cohort into two per language and call each validated. Comparison/reference and candidate language must be matched or a revised protocol explicitly reviewed. Any changed build invalidates prior build-specific approval even when English rules appear unchanged.

[Human coordination and blank forms](HUMAN-PREPARATION.md) will record locale/catalog identity, participant/facilitator language, actual device/input, observations and reviewer decisions outside candidate packets until the contract is adopted. Contacts, consent, recordings and personal keepsakes stay private.

## Dates and shared ownership

| Cutoff | Proposed work | Honest boundary |
|---|---|---|
| **Nov 6–7** | Settle scope/evidence contract, name fluent reviewers and inventory physical devices; assign one integrator per game. | This is a target window, not accepted staffing or an implemented contract. |
| **Nov 7–10** | Work on the selected foundations and one end-to-end localized journey per game before expanding; prepare technical and human records in parallel. | No completion estimate is promised without content/reviewer capacity. Bell's semantic prerequisite comes first. |
| **Nov 11** | Identify which exact new candidates are genuinely ready to freeze. | Preserve Small Hours' prior staging prerequisites; unfinished languages or physical targets stay pending. |
| **Nov 12–15 / Nov 16** | Conduct approved exact-build studies/qualification, then per-game go/no-go. | Additional locale evidence needs its own reviewed scope; do not compress cohorts or neutral recall to meet the calendar. |
| **Nov 20** | Conditional release of only eligible, explicitly scoped games. | All-three-versus-subset decision is pending. Do not silently switch to English-only or narrower device claims. |

Agents own agreed catalogs, tooling, technical checks and evidence packaging. People own fluent judgment, actual devices, genuine sessions, defect severity and independent game approval. [Your checklist](OWNER-TODO.md) lists the concrete inputs needed to manage those lanes together. [Issue #2](https://github.com/PaperStrange/IndiaGames/issues/2) remains an administrator dependency; [#10](https://github.com/PaperStrange/IndiaGames/issues/10) is non-blocking tooling follow-up. The legacy candidate URL and Nemo invitation remain deferred. Known Small Hours favicon and successful hosted-action runtime warnings remain documented maintenance items; they do not become invented blockers or completed fixes.

## Publication and evidence boundary

[PR #13](https://github.com/PaperStrange/IndiaGames/pull/13#issuecomment-6679061493) published and verified the completed engineering dashboard at main `345c33970745297103a099ecdf9dc11f134b0038`. Pages built it at 06:49:31 UTC; actual HTTPS/browser verification ran 06:50:21–06:50:30 UTC with all 11 file hashes matching, all 75 tasks reachable and zero unexpected dashboard errors. [Portable previous result](publication-pr13.json). This proposed-plan update needs its own review and deployment verification; a planning document is not game QA or release approval.
