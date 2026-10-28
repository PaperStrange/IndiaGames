# Small Hours · human playtests and November 20 launch plan

Prepared **28 October 2026** on `memorable-moments-game`. Target: **20 November 2026**, conditional on the human release gate. **No human sessions have been run or registered by this packet; facilitator, participants and reviewer are unassigned.** No runtime, artifact or acceptance threshold changes are proposed by this preparation.

1. Assign people and complete the [human playtest checklist](human-playtest-checklist.md).
2. Use the existing [SH-BASELINE-2026-10-27 protocol](../milestone-2026-10-27/protocol.md), [registration template](../milestone-2026-10-27/study-registration.template.json) and [exact-artifact launch instructions](../milestone-2026-10-27/launch.md). These remain authoritative; this folder makes their operation and launch sequence easier to follow.
3. Copy the [recording sheet](session-recording-template.md) for each actual preregistered attempt. [Session index](session-index.template.csv), [issues](issues.template.csv) and [manual device checks](device-checks.template.csv) are header-only templates, not results. Use the existing [JSON session template](../milestone-2026-10-27/session.template.json) for structured observations.
4. Complete the [decision sheet](decision-template.md), then follow the [iteration plan](iteration-plan.md). A no-change, further-study or stop decision is valid. Select at most one gameplay experiment.

## Artifact and evidence boundary

| Item | Frozen identity |
|---|---|
| Source | `ca7fb8ea0fa7ceb1a9fd1c8ab238a71a47e9c649` |
| Aggregate build SHA-256 | `fa4ca1930fc1964d929bca9704c5f0bba89dc9cc46208d34294a1e1ae5c458e3` |
| Contents | Eight files; 58,313 bytes; HTTP(S) entry `index.html` |
| [Download ZIP](../milestone-2026-10-27/small-hours-baseline.zip) SHA-256 | `64ebb3bdfd69b4a643a06817cc023754e94fc114c5a812fae6fb111af1ad2fd2` |
| Status | Unchanged pilot baseline; **not staged on master and not an official release** |

Historical verification remains dated: 33 behavioral assertions on October 20; two targeted artifact-launch groups on October 27. Those checks are not new human results. This packet adds documentation only. Browser/device support, voluntary participation, fun and contribution balance require actual observation.

The six-pair decision uses **12 distinct people**, with all six preregistered attempts retained: at least **5/6 unaided reveals**, **4/6 pairs with both contributing to the activity**, and **3/6 voluntary saves or replays**. Zero unresolved critical bugs and an independent human review are also required for release. Full definitions are in the protocol. Six-pair outcomes are formative evidence, not retention, market demand or relationship benefit.

The public documentation contains blank forms and, later, consented deidentified summaries. Keep contact details, consent keys, recordings, personal text and keepsakes in an access-controlled location **outside the Git checkout**, for example `/workspace/indiagames-human-playtests/small-hours/` with access limited to the authorized humans. If a local in-repository staging folder is necessary, use ignored `playtest-private/`; ignoring prevents accidental addition but does not provide access control. Never force-add it. Only an intentionally reviewed, consented deidentified summary belongs in GitHub. Raw media collection is optional and requires explicit consent; it is not necessary to complete these forms. Do not email or recruit anyone automatically from this packet.

CSV templates contain headers only. Populate actual records after observations; use `true`/`false` for observed metric outcomes and leave unknown cells blank with an explanation in `missing_observations`. Convert unknowns to JSON `null`, never to a fabricated boolean. Do not upload spreadsheet exports containing private columns or personal content.

The [shared release policy](https://github.com/PaperStrange/IndiaGames/blob/main/docs/RELEASE-POLICY.md) governs candidate approval and publication. The launch date never overrides it. Documentation updates may reach main while the game remains unreleased.
