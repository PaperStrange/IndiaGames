# Agile progress — paper-notebook sprint selection

Reviewed 2026-10-03 America/Los_Angeles / 2026-10-04 UTC. Planning revision: 2. Reviewed product source: `d696112d9ae6e94ffec2bc9e2c3db4f6bbf1dda7`; published Site version 9. This review supersedes previous scheduling and status summaries. Historical acceptance evidence remains linked below.

Implementation review: 2026-10-04 America/Los_Angeles / 2026-10-05 UTC. 35 cards: 6 In progress, 2 Blocked, 27 Proposed, 0 Done. MC-032/033 have candidate implementation and partial verification. Readiness blocks remain distinct from implementation status. B1–B3 are tasks on parent cards and do not increase the card count.

| Card | Execution state | Current scheduling / evidence boundary |
|---|---|---|
| MC-001 | In progress | B1 integration/data review; named owners and complete milestone review pending |
| MC-002 | Proposed | B1 ownership prerequisite; two-identity and public/native acceptance open |
| MC-003 | In progress | B2 durability; historical restart evidence exists, photo/device evidence pending |
| MC-004 | Proposed | B2 idempotent sync and two-client handoff |
| MC-005 | Blocked | B3 real provider access and spend unverified in QA environment |
| MC-006 | In progress | Recoverable overlap handling and navigation pause implemented; mobile discoverability correction tracked in INK-RECOVERY-DISCOVERABILITY.md; broader paper correction and physical input acceptance pending |
| MC-007 | Proposed | Prepare paper-to-app switching research and recruitment plan |
| MC-008 | Proposed | B3 exact capture/reply source links; full 100-probe baseline recall gate remains open |
| MC-009 | Proposed | Required correction/deletion propagation; included in paper regression |
| MC-010 | Proposed | Required companion permission, history and undo; no new identity created by paper pairing |
| MC-011 | Proposed | B3 provider/model-lock boundary; full two-provider evidence pending |
| MC-012 | Proposed | B3 actual timings/costs; complete workload and billing reconciliation pending |
| MC-013 | Proposed | M0 generic plugin conformance and injection/scope evidence remains required |
| MC-014 | Proposed | B2 capture sync failures; full concurrent/offline fault matrix remains required |
| MC-015 | Proposed | B2 source restoration evidence; full service-disaster drill remains required |
| MC-016 | Proposed | B2 source export/import; account-wide export/deletion remains required |
| MC-017 | Proposed | B1 processing/retention/revocation plus photo metadata and minimal egress |
| MC-018 | Proposed | B3 grounded, screened output; full contextual safety review remains required |
| MC-019 | Proposed | M0 reports and incident handling remain required |
| MC-020 | Proposed | M0 supported-market/provider eligibility remains required |
| MC-021 | Proposed | Paper camera/import plus existing input physical-device checks; complete device gate remains open |
| MC-022 | Proposed | Broad handwriting comparison remains after M0; MC-033 uses a separately declared photo sample |
| MC-023 | Proposed | Prepare pilot protocol; customer execution waits for MC-024 |
| MC-024 | Blocked | Complete M0 evidence missing; customer pilot remains blocked |
| MC-025 | Proposed | Hosted PaperReadingAgent after generic baseline plugin conformance |
| MC-026 | Proposed | Acquisition evidence after baseline readiness |
| MC-027 | Proposed | Retention/payment/margin evidence after eligible customer study |
| MC-028 | In progress | Existing lighting/red ribbon evidence; MC-034 informs later renderer adoption; visual/device acceptance open |
| MC-029 | Proposed | Queued after paper sprint; complete conversation policy retained |
| MC-030 | Proposed | Queued after paper sprint and relevant M0 prerequisites; complete harness requirements retained |
| MC-031 | Proposed | Queued after paper sprint; full multi-leaf input requirements retained |
| MC-032 | In progress | Compiled-Worker restart/retry/retake/clean-store recovery checks pass; browser capture/recovery evidence tracked in the current milestone; actual identities and devices open |
| MC-033 | In progress | Vision/source/fade integration implemented; genuine-provider, screening, photo-region correction and device acceptance open |
| MC-034 | Proposed | Selected time-bounded 3D investigation; dimensions and physical devices required |
| MC-035 | Proposed | Selected physical design specification; specialist owner required; fabrication validation remains separate |

## Planning verification

Planning revision 2 retains MC-029–031 acceptance, distinguishes design investigation from production adoption, and keeps all eighteen original MC-024 dependency IDs. Twenty storage, ink, placement and journal checks pass. The standalone Playwright runner exercises the compiled application and native file inputs with explicit run deadlines. Current browser evidence and scope are in [BROWSER-INK-MILESTONE.md](BROWSER-INK-MILESTONE.md). No live-provider, physical-device, prototype or customer acceptance is asserted. Prior checkpoint scope remains in [RECOVERY-CHECKPOINT.md](RECOVERY-CHECKPOINT.md).

## Evidence and next review

- [Current sprint goal, order, capacity and checkpoints](SPRINT-PREPARATION.md)
- [Machine-readable backlog](BACKLOG-DELTA.json)
- [Recovery-action discoverability correction](INK-RECOVERY-DISCOVERABILITY.md)
- [Previous implementation evidence](../01/AGILE-PROGRESS-2026-10-04.md)
- [Component/scenario observations](BEHAVIOR-AUDIT.md)
- [Original acceptance definitions](../../agile-baseline/02-PRIORITIZED-BACKLOG.MD)

At the sprint review, attach exact source/deployment, test environment, sample counts, actual results and remaining failures to each criterion. A parent card becomes Done only when its complete acceptance and shared definition of done pass. A completed investigation with a negative decision is recorded as such and cannot close the product-art card.
