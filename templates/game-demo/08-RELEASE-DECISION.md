# Release and decision record — [game / milestone]

Date: [date]. Source branch/SHA: [exact]. Baseline: [exact]. Delivery target: [local browser / host / platform]. Decision owner: [role].

## What changed for the player

Trigger → previous behavior → current behavior: [fill]. Why selected: [evidence]. What remains unproven: [fill].

## Verification record

| Check | Exact command/device/build | Actual outcome | Evidence | Limit |
|---|---|---|---|---|
| Rules | [fill] | [not run] | [fill] | [fill] |
| Full declared journey | [fill] | [not run] | [fill] | [fill] |
| Failure/recovery/reset | [fill] | [not run] | [fill] | [fill] |
| Keyboard/narrow screen | [fill] | [not run] | [fill] | [fill] |
| Physical device/host | [fill] | [not run] | [fill] | [fill] |
| Human experiment | [fill] | [not run] | [fill] | [fill] |

Check actual host/embed and download behavior before calling it supported. A source suite does not validate a differently packaged release. Preserve the tested artifact’s provenance.

## Publish / recover

Intended publication is authorized by: [task/session decision]. Commit source and evidence; push the owning branch without force; verify remote SHA. Update the main hub’s plan/data separately. Keep an immutable previous release and rollback instructions. Exclude credentials, browser profiles and incidental personal data. A pushed commit is not a verified live deployment.

## Decision

Advance / revise / stop: [pending]. Supporting observations: [fill]. Contradictory observations: [fill]. Coverage/sample limitations: [fill]. Next bounded experiment: [fill]. Features explicitly deferred: [fill].

## Required branch route for an official demo

Read the [release policy](../../docs/RELEASE-POLICY.md) and copy the [candidate template](../release-candidate/README.md). Package the game/source SHA under `master:release-candidates/<game>/<version>/`. Freeze the build hash and six-session protocol before manual testing; record actual human results and an independent human decision. Do not fill a template with synthetic successes.

Only after the per-game gate passes, propose copying that exact package to `main:releases/<game>/<version>/` and adding its canonical release registry entry with the immutable master commit. Required review/checks precede merge; the workflow then publishes versioned GitHub release notes. Verify the live build and links. An unsuccessful candidate remains on master, and previously official versions remain immutable.
