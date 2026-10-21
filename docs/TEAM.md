# Team workflow

## Ownership and status

`main` owns the project overview, current per-game to-do lists, reusable templates and approved official game versions. `master` owns pre-commit candidate packages and their pending or completed human evidence. Each game branch owns its implementation, game-specific research and test evidence. The `gamejam-next-iteration-2026-10-20` branch preserves the earlier cross-game review. Do not merge entire game branches into main to update a plan; copy only the intended documentation/data or link to a pinned source.

Each task has a proposed role owner, a deliverable, dependencies and acceptance criteria. `proposed` means not started; `conditional` means a preceding observation must justify selecting it; `blocked_human` means real participants are required. None is an assignment already accepted by a person or a claim that a feature has shipped. No progress percentage is inferred from the number of cards.

## Parallel work that stays compatible

| Role | Owns | Handoff |
|---|---|---|
| Research/design lead | Evidence ledger, player promise, experiment and decision | Exact source/edition, observed endpoint, alternative explanation, falsifying observation |
| Systems engineer | State transitions and invariants | Named states/actions, data schema, failure/recovery rules, focused checks |
| Narrative/content designer | Authored scenes and response variants | Stable content IDs, state requirements, branch consequences and copy limits |
| Artist/interaction designer | Visual states, composition, feedback and accessible equivalents | Before/after state board, asset IDs, dimensions, interaction/focus requirements |
| Integrator | Shared renderer and state/content interface | One owner for overlapping files; merge contract before polishing |
| QA/playtest lead | Functional verification and human-session protocol | Source SHA, commands, actual results, assistance, stopping and limitations |

Systems and art can proceed together once their state/content contract is settled. Do not let two agents independently change the same schema or compressed renderer. In this managed environment, all agents share `/workspace/IndiaGames`; use separate task environments or serialize source edits. Read-only reviewers may use source archives. Follow the environment’s rule against creating worktrees without an explicit request.

## Decision order

1. Read the relevant game’s TODO, latest source manifest and new evidence. Record what changed rather than reclassifying old partial journeys as completed.
2. Settle the bounded experiment before new gameplay implementation. Small Hours first needs an unchanged-build real-pair pilot; its proposed feature changes remain conditional.
3. Preserve the six-competitor/four-family research requirement before final comparative conclusions. A bounded prototype can still be discussed while the shortfall is explicitly recorded; it is not a finished market verdict.
4. Implement only selected cards. Record a skipped conditional card as an explicit decision, so dependents can proceed without a fabricated implementation.
5. Verify the exact source and observe actual people where the task requires them. Automated completion does not establish fun, comprehension or retention.
6. Choose advance, revise or stop, citing contradictory observations as well as successes.

## Update and backup rhythm

- Before editing, inspect branch/status and applicable instructions. Preserve local user work and stop any server whose files will change when switching branches.
- At a contract milestone, commit the agreed state/content boundary and notify dependent agents in this task.
- At a playable milestone, commit implementation with its evidence, push the owning game branch and verify the remote SHA. No force pushes or automatic history resets.
- Update `docs/games/<game>/TODO.md` and its `tasks.json` together. Run `scripts/sync-dashboard.py`; commit the combined dashboard to main separately. Links to completed evidence should pin an immutable revision.
- Back up records and small selected artifacts to Git. Local bundles are useful recovery copies, but do not replace remote SHA verification. Never commit browser profiles, credentials, caches or dependency trees.

## Evidence language

Use explicit categories: source/critic-only, access/menu/lobby-only, partial gameplay, completed declared unit, completion reported with missing provenance, automated demo QA, and human session. A song, route, match, loop or run is not automatically a full-game completion. Record the exact edition, URL/build, actor type, date, assistance, stopping condition and screenshot/reshoot provenance. Audio claims require actual listening. Emotional agent prose is not participant testimony.

## Release handoff

Follow [RELEASE-POLICY.md](RELEASE-POLICY.md). A release integrator packages a source-branch revision on `master`; a facilitator observes six predeclared human sessions on that exact artifact; an independent human reviewer assesses the raw records and thresholds. Failed or incomplete candidates stay on master. Publish a correction as a new version, preserving the previous evidence.

A maintainer promotes only an approved `game/version` into main through a reviewed PR. The gate checks source provenance, hashes, human criteria and prior-version immutability. After merge, the workflow publishes the GitHub release and the dashboard provides the official build, version and notes. Agent-written check results cannot replace human playtest or approval. Main documentation and hub maintenance may proceed with an empty release registry; this does not certify any game.
