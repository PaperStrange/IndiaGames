# Vivid: ready-to-run human session packet · 27 October 2026

**Preparation, not human validation.** The game remains the existing two-story candidate **0.1.2**. No gameplay, artwork, story contract or save schema changes are required for this milestone. No participants have been enrolled, no invitations sent and no human gate passed by this packet.

## Start here

1. Read the existing [study protocol](../vivid-iteration-2026-10-21/human-study/protocol.md) and [facilitator script](../vivid-iteration-2026-10-21/human-study/facilitator.md). They remain the rules of the study; this packet makes the frozen build operationally explicit.
2. Follow [launch and separate story setup](launch-and-session-setup.md). Prepare six fresh Iona participants and six different fresh Mara participants only when a real facilitator and independent reviewer are arranged. Record ordered session IDs and actual registration time before play; do not fill them with agent identities or placeholders.
3. Copy the canonical [blank observation sheet](../vivid-iteration-2026-10-21/human-study/observation-sheet.md). Use [journey prompts](journey-and-device-form.md) to keep intended steps separate from observed behavior. The three JSON session files here are unfilled, profile-specific copies of the master template, not participant records or a new schema.
4. Keep consent, identity mappings and recordings private; put only permitted deidentified observations in the repository. Reconcile actual observations into the exact candidate's schema-v2 report only after the sessions.

## Frozen identity

| Field | Value |
|---|---|
| Owning branch | `vivid-2.5d-photo-game` |
| Reviewed research head | `12ecc786d27a9d17d1bf93e07893bed16490a5b8` |
| Implementation SHA | `0c72da97994d9f2d315e6aba1afba5219936b78b` |
| Immutable master packet commit | `f9488e5079d1d193caef560d1fe72936add6cba3` |
| Packet | `release-candidates/keepers-frame/0.1.2/` |
| Build inventory SHA-256 | `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4` |
| Build contents | 15 files, 1,401,263 bytes; Iona and Mara only |
| Candidate schema / human report schema | 1 / 2 |
| Human results / approval | Empty sessions; unknown critical-bug count; approval false |

The digest hashes the sorted file-name → SHA-256 inventory, not a ZIP file. The [verification/export helper](prepare-vivid-pilot.py) checks the committed inventory, every byte, both catalog profiles and the still-empty human report. It exports the frozen artifact without rebuilding or switching branches. Prior automated evidence remains dated October 21: 51 unit tests and 16 full browser scenarios for 0.1.2. This document does not redate those tests as a fresh run. [Packet verification](packet-verification.json) records the new documentation, template and artifact-integrity checks only.

## What this milestone asks humans to decide

The [research reconciliation and three product questions](research-and-product-questions.md) explain the current hypotheses. The twelve required sessions test readable actions and consequences; they do not establish market demand or worldwide originality.

- **Iona remembered:** at least 4/6 people must each both finish unaided and explain their choice-to-return connection; at most 1/6 may expect unrestricted AI. The scheduled return is exposure, not retention.
- **Mara:** at least 4/6 must each both finish unaided and explain an action-to-visible-consequence connection. Any authored interpretation is valid; do not grade emotion.
- **Both:** zero open critical bugs, required physical-input/accessibility checks and an independent real reviewer who plays the exact build and is not a participant or observer in any cohort.
- Optional six-person neutral Iona comparison and 48–72-hour prompted recall remain separately predeclared studies. They cannot compensate for a failed required story cohort.

Keep all first-six attempts, help, timeouts and exits. Recruitment and device results remain pending. The separate [multi-story release-policy PR](https://github.com/PaperStrange/IndiaGames/pull/1) still requires its own review before promotion. A staging pass, dashboard link or source push is not an official release or a public playable URL.

## Fresh artifact launch verification · 27 October

Six launch routes passed: direct and nested hosting × Iona remembered, Mara and Iona neutral. Each reached the first playable scene with no page errors or failed HTTP responses. This does not repeat the complete story suite. See [the actual report](launch-evidence/report.json) and [reproducible launch checker](check-pilot-launch.cjs). Browser automation is not human or physical-device validation.
