# Human session recording template

**Blank template — not a completed playtest or approval.** Copy into a private study workspace for one real registered session. Use the owning game's frozen protocol and metric names; this form does not replace or relax them. Keep contact details, consent documents and raw recordings outside Git. Only deliberately reviewed, deidentified summaries belong in a release packet.

## Before play

| Field | Record |
|---|---|
| Game / story / condition | |
| Protocol ID, revision and immutable link | |
| Preregistered session ID / registration UTC | |
| Pseudonymous participant ID(s), count | |
| Human observer ID | |
| Candidate version / source commit / master commit | |
| Exact build inventory SHA-256 | |
| Reference version/hash and assigned first-build order, if applicable | |
| Actual date, local time zone, started_at UTC | |
| Physical device model / OS / browser version / input / viewport | |
| Actual assistive technology / motion/text preferences, if voluntarily disclosed | |
| Genre familiarity / prior game exposure / previous session | |
| Consent and stopping explanation completed; private record reference | |
| Initial storage/context setup verified against protocol | |
| Actual entry instruction, verbatim | |

Confirm exact bytes before entry. Predeclare cohort/order before observing results. Leave unknown fields unknown; do not infer identity, demographic traits, disability or motivation from behavior.

## Observed journey

Record the entire attempted journey, including early departure. One row per meaningful transition; add rows freely. Times are relative to started_at or actual UTC, consistently labelled.

| Time | Screen/state and player's goal, if stated | Observable action | Prediction stated **before** result | Visible result | Participant's words, with permission | Help/intervention verbatim | Observer interpretation / uncertainty |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Keep words and visible behavior separate from interpretation. Record confusion, misclicks, rereads, natural mistakes, corrections, deliberate pauses, voluntary retries, reloads and stopping. Do not coach a solution to obtain a passing metric. If help is needed, offer only the protocol's allowed help, record it and classify the affected outcome honestly.

## End, follow-up and metrics

| Field | Record |
|---|---|
| completed_at UTC (run ended, including failure/exit) | |
| Actual endpoint / completion state / reason for stopping | |
| First place the person lost the thread; observed recovery | |
| Voluntary keep/replay/return action vs prompted response | |
| Neutral break started/ended; screen and discussion removed, if required | |
| follow_up_at UTC / exact prompt / exact answer, if applicable | |
| One specific action and consequence remembered | |
| What felt worth continuing, if the participant says so | |
| What they would change, in their words | |
| Contrary or ambiguous observation | |
| Private evidence locator and reviewer access | |

Copy the **exact canonical metric names** for this game/story; add one evidence row per metric. Leave values blank until the observer has evidence. Failure is false when observed; missing/unobserved is unknown and cannot be exported as an invented boolean.

| Canonical metric | true / false / unknown | Timestamp and behavioral basis | Assistance / alternative explanation |
|---|---|---|---|
| | | | |

Joint criteria require the same participant to satisfy both conditions; do not add counts from different participants. Keep all six preregistered attempts, including failures. Comparison/reference runs stay separate from candidate release metrics; optional study data stays separate from required shipping cohorts.

## Issues and device observations

| Issue ID | Exact build and state | Actual device/browser/input | Reproduction steps | Expected / observed | Severity proposed by observer | Critical classification by human reviewer | Evidence | Fix/version/retest status |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

Check relevant fresh entry, core action, completion, retry/restart, persistence/privacy, keyboard focus/readability, motion alternatives and touch on actual supported devices. A desktop narrow viewport is not a physical-phone result. Mark unperformed checks pending. Report bugs observed; do not infer “zero critical bugs” from an empty table.

## Release summary handoff

A release integrator may transcribe reviewed session facts into the game's existing `session.json` shape: `id`, `participant_count`, `participant_ids`, `method`, `observer_is_human`, `observer_id`, `build_sha256`, `started_at`, `completed_at`, `observation_notes`, `metrics`, `follow_up_at`, `follow_up_notes`. Use `manual-in-person` or `manual-remote` only for a session actually observed by a human, as required by the current validator. Vivid additionally uses its per-story schema and condition fields; do not flatten its two cohorts into six pooled rows. Bell's `follow_up_at` must preserve the real neutral-break timing.

This record is **not** the release approval. The independent reviewer must be a real person distinct from participants and observers, review raw evidence, play the exact artifact and sign approve/revise/stop in the existing candidate report. Until then, `human_approval.approved` stays false and unassessed critical-bug counts stay null. Preserve original notes and timestamps after transcription.
