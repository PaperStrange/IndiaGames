# Agent handoff and update protocol

This is a plan and review handoff. Check the [dashboard](README.md) before assigning work. The lead has announced incoming Small Hours and Thirteenth Bell research and will notify us when it is ready. Do not treat the current plans as settled implementation instructions.

## Branch and file ownership

| Lane | Source branch | Working area | Proposed integration owner |
|---|---|---|---|
| Small Hours | `memorable-moments-game` | `memorable-moments-game/play/`, its tests and game docs | Small Hours lead |
| Keeper’s Frame | `vivid-2.5d-photo-game` | `vivid-2.5d-photo-game/play/`, its tests and research | Vivid lead |
| Thirteenth Bell | `the-thirteenth-bell` | `js/`, `css/`, `index.html`, `tests/`, game docs | Bell lead |
| Shared evidence and planning | `gamejam-next-iteration-2026-10-20` | `docs/gamejam/iteration-2026-10-20/` | Coordinator |

One game per source branch; one coordinator for shared documentation. Do not merge this whole coordination branch into another game branch: it is based on Vivid and carries unrelated history. Transfer a selected documentation-only commit/path if needed, or link to the dashboard. Preserve game-specific source and history.

Use separate agent tasks for review, systems, art and QA, with explicit file ownership. A task should provide: source SHA, objective, allowed files, state/content contract, dependency IDs, acceptance criteria, commands, evidence destination, and limitations to retain. Share contract changes before consuming them. One integrator edits shared renderer/state interfaces at a time.

In this environment `/workspace/IndiaGames` is shared by agents. Follow its applicable instructions and `/workspace/indiagames-env/START.md`. Do not switch its branch while another agent is using it or serving files from it. For read-only parallel review, use `git archive` snapshots outside the checkout. Do not create a worktree here without an explicit user request. For implementation, give each agent an isolated task environment or serialize edits to the shared checkout.

## Intake of the announced records

1. Wait for the project lead’s notice; no periodic polling or automatic new gameplay has been scheduled.
2. Inspect local changes and `git config --get-all remote.origin.fetch`. During this review, plain `git fetch origin` fetched only `main`, despite the environment guide describing all heads. To discover every head without changing the refspec, use `git fetch origin '+refs/heads/*:refs/remotes/origin/*'`. Never reset a local branch to the fetched head.
3. Compare the announced game branch heads with [source-manifest.json](source-manifest.json). Read applicable new instructions before working. Record the new SHA and files; keep the October 20 review as a dated snapshot.
4. Add a dated evidence delta: title/edition, session date, actor type, journey endpoint, terminal marker, screenshots versus reshoots, tool limitations, and any contradiction. Recover the original Detective record if supplied; do not silently promote its earlier completion claim.
5. Recount the required competitor matrix. New narrative games may add useful insights without filling a missing social, strategy or construction slot. Explicitly document any substitution and recount broad families.
6. For each affected task, record **keep / revise / defer / remove**, why, and which observation changed it. Reconcile the game plan, `tasks.json` and dashboard together. Settle the resulting scope before implementation.

## Player-journey record

Use the existing [journey](../journey-observation-template.md), [art](../art-observation-template.md), [coverage](../competitor-coverage-template.md) and [decision](../concept-decision-template.md) templates. Extend them only where needed to preserve:

| Stage | Observe | Never infer from absence |
|---|---|---|
| Entry | Exact page/build, load, instructions, expectation, first action | A listing proves the game ran |
| Learning | What the player attempts before help; what changes their model | Automated success proves discoverability |
| Consequence | Choice stated before action, actual visible result, interpretation | An emotional line proves emotion |
| Friction/recovery | Error, hesitation, assistance, tool delay, recovery | Tool failure proves bad game design |
| Completion | Declared bounded unit and observed terminal state | A screenshot or positive outcome proves full completion |
| Keep/leave/return | Actual choice, reason if volunteered, prompt status, later revisit separately | Same-session repeat proves retention |

Record emotions only as consented participant reports or clearly labeled researcher hypotheses. Agent reflection belongs in a separate field. Record actually heard audio separately from visual inspection. A human pair is two real participants; roleplaying both seats does not replace that evidence.

## Verification and backup rhythm

- Before work: inspect status, pin the base SHA, identify local user edits, and read the task’s acceptance criteria.
- At a contract milestone: commit the agreed state/content/asset boundary and update dependents. Avoid parallel edits to the same state schema.
- At each playable and checked milestone: save test outputs with actual time, source SHA and browser/device details; commit source and evidence together; push the owning game branch; verify `git ls-remote origin refs/heads/<branch>` equals the intended commit. Report a failed push as unsynced.
- Before handoff: record changed files, commands/results, evidence links, remaining limitations and the next decision. Update the coordination branch separately. Do not force-push, merge game histories, delete user branches or overwrite old records.
- Back up durable outputs to Git, not only `/tmp` or agent prose. A local bundle is an additional recovery copy; it is not proof of remote sync. Exclude browser profiles, cookies, caches and generated dependency trees.

## Done means

A task is complete only when its deliverable and acceptance criteria are met and its evidence is linked. A feature can be functionally complete while human validation remains blocked; record both states. A promising observation does not close competitor coverage. The lead’s **advance / revise / stop** decision must name the evidence and its limits.
