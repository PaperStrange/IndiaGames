# Small Hours · blank pilot and launch decision

**Unfilled decision template, not approval.** Complete only after actual evidence exists. Preserve all six preregistered attempts; do not replace failures or missing observations with another pair. Use the [protocol's metric definitions](../milestone-2026-10-27/protocol.md).

- Decision date / accountable designer and research reviewer:
- Protocol registration / ordered session IDs / artifact source and aggregate hash:
- Actual pairs observed / expected six; attendance, missingness and deviations:
- Observation sheets / device reviews / issue list references:

| Metric | True count | False count | Unknown/missing count | Fixed threshold / conclusion |
|---|---|---|---|---|
| Unaided reveal | | | | At least 5 of the six registered attempts |
| Both contribute to the activity | | | | At least 4 of six |
| Voluntary save or replay | | | | At least 3 of six |

- Strongest observed reason to choose the game / contrary observation:
- Browser-platform distinction supported by actual behavior / still a hypothesis:
- Specific action → shared consequence → payoff worth preserving / competing explanation:
- Unresolved critical bugs and real-device/accessibility gaps (actual assessment, not assumed zero):
- What remains unanswered by the six-slot competitor ledger:

## SH-06 selection and dispositions

- Decision: **unselected** (choose one after review: one experiment / no change / further study / stop).
- Supporting observations and exact problem:
- Expected changed behavior and observation that would reject it:
- SH-07 prediction/handoff: selected / not selected; reason:
- SH-08 complementary contribution prompts: selected / not selected; reason:
- SH-09 earned keepsake ending: selected / not selected; reason:
- SH-11 integration disposition; SH-12 verification or unchanged-runtime reuse evidence:
- SH-14 comparison disposition (required for variant; explicitly not applicable if no variant):
- Next study's build, registration, metric, people/device needs and accountable owner:
- Launch decision due November 16: pending / ready for independent review / defer; reason:

No change does not skip SH-10 physical review, verification identity checks or independent approval. No-build dispositions describe why implementation is unnecessary; they are not claims of implemented variants. Failed criteria cannot be waived to meet November 20.

## Mapping real evidence to the release packet

Only after SH-06, SH-10 and SH-12 may SH-17 stage a version on `master`. Use the current [release templates](https://github.com/PaperStrange/IndiaGames/tree/main/templates/release-candidate) and policy; this sheet does not alter their schema.

| Release field | Actual evidence required |
|---|---|
| `game`, `version`, `build_sha256` | Candidate manifest: `small-hours`, assigned staged version and byte-identical aggregate inventory hash. A baseline filename is not a release version. |
| `protocol.sampling_rule` | `first-six-predeclared-sessions`. |
| `protocol.registered_at`, `protocol.session_ids` | Preserved registration made before play; exactly six IDs in the registered order. |
| `sessions` | All six actual human records in that order, including observed failures and abandonment. Exactly two participant IDs per session, twelve distinct people overall. |
| Session identity and time | Actual ID, participant IDs/count, `manual-in-person` or `manual-remote`, human observer ID, matching build hash and UTC start/end timestamps. |
| `observation_notes` | Concise deidentified account of actual behavior, help, contributions and outcome, plus reviewer-accessible record references. A template link alone is not an observation. |
| `metrics` | Exactly `reached_reveal_unaided`, `both_contributed`, `voluntarily_saved_or_replayed`; each supported by the actual session record. Working records retain null for unknown. Readiness requires observed booleans; do not coerce missing data to pass. |
| `critical_bugs_open` | Human severity triage and verified issue closure on the exact candidate; keep null until assessed. |
| `human_approval` | Independent human reviewer plays the exact artifact, inspects records, assesses criteria and enters their own actual review decision/time/ID. Leave approval false and identity/time empty until then. |

Pilot records may be reused only if the staged build is byte-identical and the original protocol was preregistered with all required observations. Changing any build byte requires a new frozen candidate and recorded test run; do not pool baseline and variant pairs. If one or more required outcomes remain unknown, keep readiness pending and seek a reviewed future protocol rather than replacing unfavorable attempts.

`python3 scripts/validate-release.py --staging` validates the candidate package on master without approving it. `python3 scripts/validate-release.py --candidate small-hours/VERSION` checks readiness after actual evidence is entered. A passing program does not authenticate people or replace the human reviewer.
