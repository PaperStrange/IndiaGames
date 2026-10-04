# Ready, done and M0 evidence

## Definition of ready

A card can be committed when its user outcome and acceptance criteria are understood; required contracts are reviewed; dependencies have an execution plan; credentials, hardware, reviewers and consent are available where required; a named implementer and reviewer accept the work; and the team estimates that it fits the sprint. Split work larger than roughly five engineer-days into demonstrable outcomes. This is a planning rule, not a claim about existing velocity.

Proposed → Ready → In progress → Review → Done. Use Blocked with a reason and owner at any unfinished stage. Status changes require actual evidence. All cards start Proposed.

## Definition of done

- All card acceptance criteria pass on the candidate revision; link evidence by criterion.
- A reviewer examines code/config changes and relevant user journeys, including failure and accessibility behavior.
- Regression tests cover meaningful changed behavior. Fixture results are labeled; live tests use real configured services.
- No unresolved critical data-loss, privacy or safety defect remains in the changed flow.
- Update contracts, migrations, operational notes and version references where changed.
- Record remaining limits, environment, sample size and measurement method. Product owner accepts the demonstrated outcome.

## M0 release matrix

All thresholds below are proposed release acceptance targets inherited from the planning direction, not observed performance or universal guarantees. Passing individual stories does not replace integrated evidence. Tune a target only through an explicit documented decision before evaluation; never retrospectively to disguise a failure.

| Gate | Cards | Required evidence / exit target |
|---|---|---|
| Identity and ownership | 001–002 | Two-user source/object/API isolation, session expiration and revocation |
| Durable capture and sync | 003–004, 014 | 100 documented fault cases with no lost acknowledged operations inside the declared failure model; retry and conflict handling |
| Recovery and portability | 015–016 | Two timed restore drills; proposed RPO ≤15 minutes, RTO ≤4 hours; usable export and deletion propagation |
| Source-linked recall | 008–010 | 100 held-out probes: recall ≥90%, source support ≥95%; 50 scope/deletion cases with zero forbidden recall; history and undo |
| Live providers and routing | 005, 011 | Two genuinely live provider configurations, at least 100 short turns per configuration; strict model lock and bounded retry |
| Latency and cost | 012 | ≥95% required trace coverage; p50/p95 by route and declared workload; proposed p95 input-end-to-first-visible-reply ≤12s including five-second fade; reconciled usage and all tool costs |
| Plugin boundaries and privacy | 013, 017 | Two minimal generic protocol conformance services; scoped credentials, egress/injection cases, retention/data-flow review |
| Harm and unsupported claims | 018–019 | 300 balanced evaluated cases; zero critical failures, ≥95% required handling, ≤5% benign false blocks; report queue and incident drill |
| Selected-market readiness | 020 | Reviewed server-enforced eligibility records and qualified policy review for each launch market; no worldwide-readiness inference |
| Devices and ink behavior | 006, 021 | Physical iPad/Pencil, iPhone, Android phone and stylus tablet; keyboard/IME, palm rejection, accessibility and regression records; proposed p95 ink-to-paint ≤50ms under stated workload |
| Integrated release decision | 024 | All preceding gates linked to exact release revision, accountable go/no-go and validated rollback |

All M0 gate statuses are **not yet evidenced by this planning pack**. Historical alpha automated tests and mobile builds are not live-provider or physical-device evidence. Unsynced data on a destroyed sole device is outside server recovery; disclose that boundary.

## Evidence record template

Story / AC ID; candidate commit and deployment; tester and reviewer; UTC date; device/OS/build; provider/model/config version; test-data source and consent; sample definition and count; expected/actual; pass/fail; sanitized artifact link; limitation; defect ID; retest reference. Keep credentials and raw private notebook content out of tickets and telemetry.

## Ink race scenarios required in MC-006

At the agreed 380ms quiet threshold, input end starts recognition and a 5,000ms fade together. Erasing during fading restores remaining text first, then removes only the touched region; previously erased text stays erased. Rewriting and erasing never cancel running OCR jobs. Snapshot revisions prevent old results overwriting newer input or producing stale replies. Each next input end begins the next cycle. Reply reveal waits for both the current recognition result and completed fade, on the correct active page. Record fast/slow/out-of-order recognition, repeated erasure, IME composition, navigation and failures.
