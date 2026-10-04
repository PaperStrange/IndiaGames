# Iteration operating templates

## Suggested cadence

Planning: 60 minutes to agree capacity, dependencies and acceptance. Daily coordination: up to 15 minutes around goal, blockers and next evidence. Mid-sprint refinement: 30 minutes on the next dependency chain. Review: 45 minutes of working outcomes and failure cases. Retrospective: 30 minutes, selecting at most three improvements with people and due dates. These are proposed team timeboxes, not scheduled meetings or official framework requirements.

## Sprint review agenda

1. Restate the goal and committed scope; show actual capacity changes.
2. Demonstrate synthetic-user login/isolation, restart-safe writing, retry-safe sync and second-device handoff.
3. Correct text during fading, show touched-region behavior and an out-of-order OCR job completing without overwriting current input.
4. Show one real provider response and sanitized usage/timing evidence, then a failure with honest recovery UI.
5. Review each acceptance criterion, unresolved defects and readiness for subsequent work.
6. Review discovery evidence separately from implementation completion; decide the next ordered scope.

A demo alone cannot close a card without its required evidence. Label pre-recorded versus live demonstrations and mocked versus actual services. No metrics in this pack are measured results.

## Weekly status template

Reporting interval: __. Candidate revision: __. Sprint goal confidence and evidence: __.

| Card | Previous/current state | Accepted outcome/evidence | Remaining risk | Person / next date |
|---|---|---|---|---|
| Fill from actual work | | | | |

Completed acceptance criteria: __. Blocked items and blocker age: __. Scope changes and reason: __. Capacity spent/remaining: __. Decision needed and owner: __. Do not manufacture burndown, velocity or percentages from the number of drafted cards.

## Retrospective template

What improved the user's outcome? What produced rework or waiting? Which assumption failed? What should we stop, repeat or change? Select at most three experiments, each with an accountable person, due date and observable check. Review those checks next retrospective.

## M0 release checklist

Current decision: **not ready; evidence pending**. Sprint 1 completion does not imply M0 completion. MC-024 owns the integrated decision after all gates in 03-READY-DONE-AND-QA.MD.

- [ ] Exact code, configuration, migration, policy and model/adapter revisions recorded.
- [ ] Ownership, durable save, sync/conflict, restore and export/delete evidence approved.
- [ ] Source-linked recall, scope isolation and correction propagation approved.
- [ ] Live providers, actual latency/cost and plugin boundaries approved.
- [ ] Privacy, content handling, reporting and selected-market eligibility reviewed.
- [ ] Physical-device, accessibility and ink regression evidence approved.
- [ ] No unresolved critical defects; other limits are explicit and accepted by accountable reviewers.
- [ ] Rollback and recovery rehearsed against the candidate; deployment authority and intended audience confirmed.

Release record: candidate and environment; accountable product/engineering/QA/trust reviewers; evidence links; eligible markets and audience; open limits; go/no-go; date; rollback owner and trigger. Begin a permitted limited cohort only after this decision. Public app-store submission is a separate operational step, not an outcome of this documentation task.

## Rollback / incident outline

Stop expansion on confirmed data loss, ownership leakage, harmful critical output or persistent budget failure. Disable affected routes/features through reviewed configuration; preserve acknowledged operations and audit references; restore only through tested recovery procedures; retain deletion tombstones. Record impact, owner, containment, recovery evidence and follow-up defects. Re-run affected gates before resuming. Actual users should receive the approved incident communication through an authorized process; this pack sends no messages.

## Handoff checklist

Keep story IDs stable; assign people during planning; attach evidence before Done; update BACKLOG.json and cards together; record scope decisions; recompute the iteration manifest after edits. Preserve alpha 0.4 and docs-v5 references unless implementation or documentation is actually revised. The planning package does not claim that older backup or ChatGPT Project sources have been updated.
