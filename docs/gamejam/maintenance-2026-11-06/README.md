# Small Hours · November 6 maintenance milestone

**Engineering work continues while human recruitment is unbooked.** The development branch now has explicit timer ownership and a browser runner that preserves historical evidence. The frozen October 27 study baseline, six-pair protocol and release gate remain unchanged. No candidate was staged and no human approval is claimed.

| Area | Before | Current development behavior |
|---|---|---|
| Timer ownership | Three mutable timer variables and interval work lived inside the DOM adapter | `countdown.js` owns start, wall-clock deadline, cancellation and stale-callback rejection; `game.js` owns visible updates and stage transitions |
| Player behavior | Optional 45 seconds; no automatic transition on expiry | Same duration, copy and flow; dismissing End keeps the timer, while confirmed End, screen changes and pagehide cancel it |
| Verification output | Browser checks wrote by default into committed historical `docs/evidence/` and logged an obsolete “no playable prototype” statement | Fresh external evidence directory per run; existing directories rejected; current automation language; partial failure report and browser teardown |
| Developer commands | Browser-only command tied to a machine-specific path | Dependency-free Node lifecycle tests plus configurable browser commands in a private package; no runtime dependencies |

[Verification and exact inventories](VERIFICATION.md) · [Development run instructions](../../../memorable-moments-game/play/README.md) · [Frozen-baseline facilitator setup](../readiness-2026-11-05/FACILITATOR-SETUP.md)

## Artifact boundary

The implementation parent is `7f4a7f26418b61632acf4e02634a636da5e08da0`. The new development package contains nine files, including its README and new timer module; its inventory is recorded in [verification.json](verification.json). It is **not byte-identical** to the eight-file human-study baseline. The frozen baseline ZIP remains SHA-256 `64ebb3bdfd69b4a643a06817cc023754e94fc114c5a812fae6fb111af1ad2fd2`, inventory `fa4ca1930fc1964d929bca9704c5f0bba89dc9cc46208d34294a1e1ae5c458e3`.

Use the frozen ZIP for the currently declared human protocol. Do not transfer its future observations to this development build by claiming the cleanup is “the same build.” A new study artifact needs explicit identity and the existing protocol/revalidation decision. All historical research, recordings, screenshots, forms and packages remain in place.

## Progress and next engineering goal

The lifecycle/evidence-preservation cleanup is complete: five timer tests, the existing 33-check browser journey, and three focused timer groups passed. This is technical evidence, not proof that pairs enjoy the activity or choose to save it. No new scenes, rules, score, persistence or social mechanic were selected from agent observations.

The next independent engineering goal is a repeatable **development export check**: copy only the declared public play files to a fresh folder, inventory them, and verify entry, relative imports and download behavior at root and project-style nested paths. It must produce a development manifest without replacing the baseline ZIP or staging a candidate. This work can proceed without recruitment; its acceptance is a portable package with verified local dependencies and an honest source/hash record.

Human work remains separate: six willing pairs, physical-device/privacy checks, the evidence-linked pilot decision and independent human review. Keep the 5/6 unaided reveal, 4/6 both-contribute and 3/6 voluntary-save/replay thresholds. November 11/16/20 are conditional freeze/decision/launch cuts, never permission to fill blank results.
