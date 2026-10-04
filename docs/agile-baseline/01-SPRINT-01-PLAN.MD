# Sprint 1 — durable writing and a genuine reply

**Status:** proposed, not committed. **Duration:** ten working days from an agreed start. **Audience:** internal testers using synthetic notes. **Goal:** own, durably save and resume a note without losing ink; observe one real provider path.

## Capacity and scope

Assumption: two engineers for ten days = 20 nominal engineer-days. Reserve six for integration, support and uncertainty; plan 14. Half-time QA provides five days, with four planned and one reserved. MC-007 needs two product/research days separately. These are capacity assumptions, not actual staffing or historical velocity. Re-estimate with implementers by day 3.

| Candidate | Outcome | Engineer-days | Proposed owner role |
|---|---|---:|---|
| MC-001 | Baseline audit and shared contracts | 2 | Engineering lead + Product |
| MC-002 | Real session and user isolation | 3 | Backend |
| MC-003 | Restart-safe local writing | 3 | Client |
| MC-004 | Idempotent sync and two-client handoff | 3 | Backend + Client |
| MC-005 | Genuine text/vision smoke and trace | 2 | AI engineering |
| MC-006 | Preserve agreed ink correction behavior | 1 | Client + QA |
| MC-007 | Five behavioral interviews or documented recruitment gaps | 0; two research days separately | Product + Research |
| Total engineering | | 14 | People unassigned |

No additional features are hidden in these estimates. MC-004 is a thin sync slice; full fault coverage, restore drills and recall come later within M0. MC-005 is a live smoke slice, not the two-provider performance gate. If the selected provider needs a separate vision route, record it explicitly and re-estimate rather than pretend text capability includes vision.

## Sequence and dependency handling

- Days 1–3: MC-001 audit and contract review; provision synthetic accounts and provider connection. MC-007 recruitment/preparation can run independently, within authorized channels.
- Days 2–6: begin MC-002 and MC-003 after their relevant contracts are reviewed. Mock contracts can unblock local work but cannot satisfy live integration acceptance.
- Days 5–9: MC-004 once identity and durable operation contracts work; MC-005 once test identity, endpoint and spending allowance are ready. Run MC-006 against the integrated candidate.
- Days 9–10: QA, failure recovery demonstrations, evidence review and retrospective. Unfinished cards return to the ordered backlog with evidence and remaining work.

Limit active engineering work to two cards and QA review to two cards. Dependencies are completion gates; overlapping implementation is allowed only when the required interface is reviewed and tracked. Raise blockers older than one working day. If no provider connection is available, MC-005 stays Blocked; fixture output cannot close it. Reduce scope or extend the forecast after re-estimation; do not remove privacy or data-loss gates.

## Review demonstration

Using two synthetic identities: sign in, write a note, restart locally, reconnect and reopen on a second client; replay a request without duplication; show a conflict without silent overwrite; reject the other user's source ID; perform ink correction during fading; show one real provider trace and one failure state. Link the exact revision, environment and recording to each card.

Sprint success requires all committed acceptance criteria and the shared definition of done. A failed criterion is visible unfinished work, not a waived pass. Completing this sprint does not authorize a real-customer pilot or public release.

## Forecast after Sprint 1

S2: source-linked recall, correction propagation, memory controls, full live provider routing, measurement, plugin boundaries, sync faults and privacy implementation. S3: restore/export/delete, content handling, reports, market eligibility, physical devices and integrated M0 review. These waves are unestimated and may overlap after dependency review. A six-week M0 remains a planning hypothesis until day-3 sizing and external prerequisites are resolved; extend time rather than weaken M0.
