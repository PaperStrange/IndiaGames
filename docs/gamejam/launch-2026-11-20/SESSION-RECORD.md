# Vivid human session record — blank template

Copy into the coordinator's private evidence location for **one real predeclared participant**. This is a convenience sheet for the [canonical protocol](../vivid-iteration-2026-10-21/human-study/protocol.md), not a completed record or a new scoring rule. Empty means unknown. Keep consent, contact details, identity mapping and recordings outside Git, preferably in `/workspace/indiagames-human-playtests/keepers-frame/` or the agreed private store. If using a local `playtest-private/` folder, keep it ignored and never force-add it. Share only reviewed deidentified extracts with participant permission.

## Identity, consent and setup

| Field | Actual record |
|---|---|
| Session ID; registered cohort and order; actual registration UTC | |
| Participant pseudonym; eligibility/freshness confirmed | |
| Observer pseudonym; actual human; independent reviewer pseudonym | |
| Story / condition / release profile | |
| Candidate version / source SHA / immutable master SHA / inventory SHA-256 | |
| Method (`manual-in-person` or `manual-remote`); actual served URL | |
| Physical device model / OS / browser version / input | |
| Viewport / orientation / zoom / reduced motion / flat or 3D | |
| Fresh context confirmed; storage warnings; origin/profile retained for Iona | |
| Consent reference; notes permission; recording permission or declined | |
| Private evidence owner/access/retention date; withdrawal reference | |
| Actual start UTC / end UTC / unaided-play start and stop | |
| Recording start/stop UTC and file reference, only if consented | |
| Initial capability expectation: exact words before gameplay | |

Do not record names, emails, a public contact link or a personal device identifier here. Record optional recording failure or refusal without excluding a valid notes-only session.

## Observed journey, in the player's actual order

| Elapsed time / UTC | Scene or goal | Player action / input | Visible response | Player words / expected response | Hesitation, error, recovery or help | Evidence reference / observer interpretation clearly labeled |
|---|---|---|---|---|---|---|
| | | | | | | |

Add rows for entry, first purposeful action, exploration, failed attempts, repair/alignment, consequential choice/reveal, ending and exit. For Iona add return and placement, recording **spontaneous or scheduled** and the exact prompt time. Intended scenes are observer reminders, not a checklist to read to the participant. A missing stage stays missing; do not reconstruct a smoother journey from the design.

## Outcome, gate fields and evidence

| Field | True / false / pending, with words or observed behavior |
|---|---|
| Endpoint reached, abandoned, timed out, or no-show | |
| Total duration / unaided-play duration / stopping reason | |
| First assistance time and exact wording, or observed none | |
| Built-in hint/transcript/settings use (allowed; record it) | |
| `completed_unassisted` and reason | |
| Iona only: `explained_choice_to_return_action`; their own choice and later object/place in their words | |
| Iona only: `expected_unrestricted_ai`; exact capability expectation/attempt and context | |
| Mara only: `explained_action_to_visible_consequence`; their concrete action and visible change | |
| Joint success: completion AND applicable explanation by this person | |
| Disputed/unobserved criterion; original coding and reviewer reasoning | |
| Issue IDs, severity reason, effect on progress, private evidence refs | |

Iona causal prompt: **“What, if anything, connects what you did earlier with what you could do on this visit? Please point to something in the story.”** Mara causal prompt: **“Describe one thing you changed and what you could see change because of it.”** All: **“What would you tell someone this experience can and cannot do?”** Do not teach the expected explanation first.

For an observed attempt, assisted/abandoned completion is false; an explanation not observed is false. Uncertainty remains visible for reviewer adjudication; it is not silently made true. “It remembered me” alone does not identify Iona's choice-to-return link. Any Mara interpretation is allowed. A no-show has no completed-session JSON; retain the missing registered slot and keep readiness pending.

## Player perspective, after scoring

- First moment they wanted to continue and what caused it, in their words:
- First moment they wanted to stop or felt unsure, plus attempted recovery:
- Most meaningful action / least connected action and why:
- What they would tell a friend; their comparison to other experiences:
- Desired unsupported action or capability:
- Exact stated feelings, separate from observed expressions or observer inference:
- Observer hypothesis and plausible alternative explanation:
- Proposed design issue, evidence reference and confidence/uncertainty:

Optional 48–72-hour recall **only if preregistered**: invited/declined/nonresponse status; consented contact reference held separately; follow-up UTC and elapsed hours; intervening replay/discussion; exact unprompted action/consequence answer; out-of-window explanation. Store this separately from mandatory gate metrics. It measures prompted recall, not organic retention.

## Release-report mapping

Use a working copy of the **exact candidate's schema-v2** `human-playtest.json`; do not downgrade to main's older generic schema-v1 template while policy review is pending. Reuse the existing blank session exports: [Iona](../milestone-2026-10-27/session-iona-blank.json), [Mara](../milestone-2026-10-27/session-mara-blank.json), [optional neutral](../milestone-2026-10-27/session-iona-neutral-blank.json). They are templates, not participant data.

| Recorded evidence | Export field / rule |
|---|---|
| Candidate identity | Top-level `game`, `version`, `build_sha256`; preserve the verified identity. Every cohort and session uses the same digest. |
| Registered order/time | Matching `story_reports[]` → `protocol.registered_at` and six `session_ids`; `sampling_rule` remains `first-six-predeclared-sessions`. |
| Iona cohort | `story_id: iona`, `condition: remembered`, `release_profile: iona-return-v1`; sessions use Iona's three exact metric keys. |
| Mara cohort | `story_id: mara`, `condition: remembered`, `release_profile: mara-object-v1`; sessions use Mara's two exact metric keys. |
| Session identity | `id`, `participant_count: 1`, one pseudonym in `participant_ids`, `story_id`, `condition`. IDs and participants remain distinct across cohorts. |
| Human observation | Actual `method`, `observer_is_human: true`, actual `observer_id`, ISO-8601 UTC `started_at`/`completed_at`; the latter means observation ended, not that play succeeded. |
| Actual behavior/quotes/help | Concise permitted deidentified `observation_notes`; exact boolean `metrics` after scoring and review. Preserve full private notes separately. |
| Optional neutral study | Separate `study_reports[]`, profile `iona-neutral-v1`, all six real attempts if included. Do not put it into `story_reports` or borrow its results to pass Iona. |
| Critical issues | Cohort and top-level `critical_bugs_open` only after real triage. An empty issue register is not an assessed zero. |
| Approval | One `human_approval` from the independent real reviewer after all reported sessions, personal play and evidence review; actual reviewer ID/date. Until then approval stays false. |

Keep device measurements, optional recall, journey rows and issue detail in their evidence files; do not invent metric keys or insert private media into the candidate package. The validator checks structured consistency, not the authenticity of people. Record the actual staging/readiness commands and outputs after evidence export; a staging pass is not a release approval.
