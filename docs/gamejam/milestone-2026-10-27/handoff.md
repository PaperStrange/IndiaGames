# Ownership, pilot decision and restart handoff

## Accountable work

| Responsibility | Current assignee | Boundary / evidence |
|---|---|---|
| Packet research and protocol | `/root/small_hours_packet` agent | This dated packet; no claim of human facilitation. |
| Game design/content decision | `/root` coordinator | SH-06 after actual baseline results; no variant selected today. |
| Runtime / transition integration | `/root` coordinator | Frozen this milestone; no concurrent edits to shared transition code. |
| Packaging and delivery | `/root` coordinator | Verify pinned source, artifact inventory, launch checks and remote SHA. |
| Independent technical review | `/root` coordinator assigns a reviewer before handoff | Inspect package/docs/links; record actual completion evidence. |
| Human facilitator and physical-device reviewer | **Unassigned** | Must be a real person; participant availability is pending. |
| Independent human release reviewer | **Unassigned** | Must inspect the exact build and evidence; distinct from participants/observers. |

Agent IDs identify work responsibility, not participant or human-reviewer identities. The human owner can combine compatible facilitation/device roles, but independence and distinct participant counts still apply. Consent/contact mapping remains private.

## Next decision after six-pair evidence

| Observation | Bounded response worth considering | Rejecting observation / cost |
|---|---|---|
| Guessing/handoffs repeatedly obstruct an otherwise wanted activity | One prediction/handoff experiment | Reject if the revised flow loses the curiosity people valued; transition and privacy checks required. |
| Both want the activity but one person carries it | One complementary-prompt set | Reject if the second person still contributes only when coached; content-only change first. |
| Activity works, but the card feels generic or writing drains it | One ending/keepsake experiment | Reject if authors cannot recognize both contributions or do not want to keep it; export/accessibility checks required. |

Passing all gates may justify no change; unwillingness to participate may justify revising the proposition, further study or stopping. These are future alternatives, not three promised features. Record disposition of SH-07/08/09 explicitly after SH-06. The interim three-question brief remains provisional until human findings exist.

## Delivery boundary

Keep this baseline on `memorable-moments-game`. SH-17 still depends on SH-06, SH-10 and SH-12; do not stage it on `master` merely to make a dashboard card green. After those dependencies, stage an immutable candidate with source/hash and pending or completed evidence as appropriate. Official `main` publication needs the human gate and independent review. Never merge the entire game branch into either distribution branch.

At each coordinator checkpoint, record current branch/commit, completed items, unrun or failed checks, immutable artifact/hash, owned server processes, active agent/file ownership and exact resume commands. Keep a Git bundle and verify the pushed remote SHA. Codex allowance is not visible: if the user reports less than 5%, stop new work at a safe boundary, save that checkpoint and wait.
