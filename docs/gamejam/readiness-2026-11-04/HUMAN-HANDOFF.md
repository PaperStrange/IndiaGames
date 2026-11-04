# Keeper's Frame — blank human readiness handoff

**Prepared, not conducted.** This packet adds operator handoff fields and post-scoring diagnostics. It does not recruit people, register sessions, change the gate or record human approval. Unfilled human fields below remain pending. The [canonical protocol](../vivid-iteration-2026-10-21/human-study/protocol.md), [facilitator wording](../vivid-iteration-2026-10-21/human-study/facilitator.md), [session record](../launch-2026-11-20/SESSION-RECORD.md) and [device/recall method](../vivid-iteration-2026-10-21/human-study/devices-and-recall.md) remain authoritative.

## Candidate and staffing handoff

The previous `keepers-frame/0.1.2` identity and dated exporter are historical. A changed build needs an unused version, a new exact inventory and fresh human evidence. `0.1.3` is now reproducibly exported after the bounded helper-layout fix; reviewed [PR #6](https://github.com/PaperStrange/IndiaGames/pull/6) has staged it on master; human work remains pending. Do not start a study from an unspecified candidate.

| Required field | Verified value / evidence |
|---|---|
| Candidate version and implementation commit | 0.1.3; `813f264400bfc01d7e3e5f668de29bb835f5a70d` |
| Reviewed master staging PR and immutable master commit | [PR #6](https://github.com/PaperStrange/IndiaGames/pull/6); master `2be5f3648fed5422eb4459486661385df73c91be` |
| Build inventory SHA-256 and shipping-story catalog | `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00`; 15 files, Iona + Mara |
| Exact export command and exported directory | [Version-aware export](CANDIDATE-EXPORT.md); dual clean builds, 1,401,316 bytes |
| Actual HTTP URL / path / origin | |
| Agent complete-journey and regression record | [Technical QA](TECHNICAL-QA.md): 20 semantic conditions, 8 layout/keyboard conditions; limits and retries retained |
| Staging validator command, UTC and result | Exporter invoked policy `7a26e07a` with `--staging`, 2026-11-04: one draft package passed; human readiness pending |
| Policy-review PR result, separate from human approval | [#1 merged](https://github.com/PaperStrange/IndiaGames/pull/1), independent agent code review authorized for this batch; human approval remains mandatory |
| Human coordinator / observer / independent reviewer pseudonyms | |
| Preregistration UTC and private protocol location | |
| Consent, notes/media storage and withdrawal arrangement | |
| Physical-device/accessibility evidence location | |

A staging pass permits blank human evidence; it is not readiness approval. The coordinator must use the exact candidate's reviewed schema-v2 report. Preserve distinct participant IDs, first-six order and failed attempts. Keep consent forms, contact details, raw recordings and identity mappings outside Git.

## Cohorts and unchanged gate

| Cohort | Planned people | Endpoint | Gate |
|---|---:|---|---|
| Iona remembered | Six fresh individuals | Rescue, recollection, choice, scheduled same-session return and corresponding placement | At least 4/6 **joint** unaided completion and choice-to-return explanation by the same people; at most 1/6 unrestricted-AI expectations |
| Mara | Six different fresh individuals | Inspect three objects, align, reveal and choose any interpretation | At least 4/6 **joint** unaided completion and action-to-visible-consequence explanation by the same people |
| Iona neutral | Optional six additional individuals, only if predeclared | Same first story; on scheduled return place the cloth on its peg | Descriptive comparison only; cannot rescue a failed required cohort |

There are no scheduled participants or results in this document. Required participants are individuals, not six pairs. For Iona use the existing neutral prompt: **“Please leave this story and open the same one once more.”** Record a spontaneous return separately; scheduled exposure is not voluntary retention. Keep the existing 15-minute unaided Iona / 10-minute unaided Mara limits and built-in assistance rules. Zero open critical bugs requires actual triage, not an empty register. The independent human reviewer must personally play the exact candidate and review the human evidence.

## Blank post-scoring diagnostics

Ask these only after the canonical causal/capability questions have been answered and mandatory metrics locked. Record exact words before interpretation. Do not add these as release JSON metric keys or use them to replace a failed gate result. A refusal or absent observation stays visible.

| Field | Actual record |
|---|---|
| Session ID / story / exact build | |
| Mandatory metrics locked at UTC | |
| Diagnostic prompt used, verbatim | |
| Participant answer, verbatim | |
| Observed action or frame supporting the answer | |
| Additional coaching/demo after scoring, if any | |
| Observer interpretation, explicitly labeled | |
| Plausible alternative explanation | |
| Follow-up issue and confidence | |

**Iona — consent and remembered action:** begin with “What, if anything, changed for you when you returned?” If they encountered the letter, follow with “How did you understand the letter's availability and the keeper's invitation?” Do not describe the earlier reading as permission or tell them which response is correct. The design question is whether the privacy/dedication choice gives the later placement meaning. The consent warning is not a confirmed stale-label bug.

**Mara — expressive arrangement:** ask “What did moving the lightbox help you understand, if anything?” Then ask “Which action felt most connected to the story, and which felt least connected?” Do not ask whether they solved a harder puzzle or prefer the designer's interpretation. The question is whether their movement helps them perceive the workshop, rather than simply completing a numbered instruction.

For both, preserve the [existing player-perspective prompts](../launch-2026-11-20/SESSION-RECORD.md#player-perspective-after-scoring): wanted-to-continue/stop moments, meaningful action, desired unsupported action, and their own comparison. A comparison is a participant's claim, not verified competitor research. Optional 48–72-hour prompted recall remains separate and must be declared before the study.

## Handoff completion checklist

- [ ] Exact candidate identity, inventory, export and served route recorded above.
- [ ] Agent verification covers true final endpoints and saved-state reload; any unsupported platform/device claim is explicit.
- [ ] Human coordinator accepts the blank packet and later arranges six Iona plus six different Mara participants.
- [ ] Canonical protocol preregistered before the first real attempt; no historical agent session inserted as a human result.
- [ ] All required first-six observations, physical-device review, critical-issue triage and independent human approval recorded later.
- [ ] Official promotion reviewed only after the existing gate passes; until then candidate stays on `master`.
