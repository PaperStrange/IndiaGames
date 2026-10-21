# Blank release-candidate packet

These files intentionally **fail readiness validation**. They contain no human results and no official version.

On `master`, create `release-candidates/<game>/<version>/`. Copy `candidate.json` and `notes.md` into it; add the exported browser game under `build/`, including `build/index.html`. For Small Hours and Bell, copy `human-playtest.json` and use `session.json` for each session. For every new Vivid candidate, copy **`human-playtest.vivid.json` as `human-playtest.json`** and use `session.vivid.json` for each story's sessions. Keep this README, session templates and other helper files out of the packet.

Vivid's build must include `story-catalog.json`, generated from the shipping manifests in the shape shown by `story-catalog.vivid.json`. It lists both `iona` / `iona-return-v1` and `mara` / `mara-object-v1`, their current positive revisions and titles. Generate the build inventory only after the catalog is included. Its bytes are part of the shipped hash. Do not add these helper templates at the packet root.

Use game IDs `small-hours`, `keepers-frame`, or `thirteenth-bell` and a three-part version such as `1.0.0`. Record the full implementation commit in `source_commit`. Generate the manifest's `build` object with:

```sh
python3 scripts/validate-release.py --inventory release-candidates/GAME/VERSION/build
```

Copy the resulting `sha256` into the envelope, every story/study report and every session. Register each cohort's six session IDs and protocol before starting. Use twelve distinct people for Small Hours (six pairs), six for Bell, or twelve for Vivid (six Iona remembered and six Mara). Vivid's optional six-person Iona neutral cohort increases the target to eighteen; it cannot replace either shipping cohort. Participant and observer IDs are pseudonyms; do not commit names, contact information, recordings or sensitive raw notes. Predeclare session IDs, but never fabricate people, observations or approval. Registration timestamps must record the actual preregistration time.

Each session's `method` is `manual-in-person` or `manual-remote`; the observer must be human. Record all six attempts including abandonment and failures. `completed_at` means session end, not gameplay success. Record accurate UTC timestamps ending in `Z`, concise observed behavior in `observation_notes`, and the exact metric keys below. Metric values must be JSON `true` or `false`, never guessed values. A real human reviewer, distinct from every participant and observer, completes `human_approval` only after reviewing all manual evidence.

| Game | Required metric keys |
|---|---|
| Small Hours | `reached_reveal_unaided`, `both_contributed`, `voluntarily_saved_or_replayed` |
| Vivid / Iona remembered or optional neutral | `completed_unassisted`, `explained_choice_to_return_action`, `expected_unrestricted_ai` |
| Vivid / Mara | `completed_unassisted`, `explained_action_to_visible_consequence` |
| Thirteenth Bell | `explained_cause`, `predicted_before_outcome`, `earned_action_uncoached`, `explained_fracture`, `delayed_recalled_specific_mina_outcome` |

For Bell, predeclare `delayed_recall_min_hours` of at least `0.03333333333333333` (two minutes), use a neutral break, then record `follow_up_at` and `follow_up_notes` for every participant, including failures. This is short delayed recall, not day-two retention. Other games do not use the follow-up fields.

For Vivid, `story_reports` contains exactly the two shipping story reports, with `condition: "remembered"`. Each session repeats its `story_id` and `condition`. The optional neutral cohort goes only in `study_reports`, using `story_id: "iona"`, `condition: "neutral"`, `release_profile: "iona-neutral-v1"`, its own six preregistered session IDs and the same report/session shape. Keep it absent (`[]`) until included under a real registered protocol. All cohorts use distinct people and session IDs, and the approving human is independent of every participant and observer. Record zero critical bugs both on the envelope and each story/study report only after humans have classified and checked the known issues. Both shipping stories must pass on the same bundle; one cannot substitute for the other.

To stage a pending Vivid build, fill the candidate identity/inventory, envelope `version`, and every `build_sha256` identity; keep sessions empty, registration/bug-count fields null and approval false. Staging accepts this as pending. Readiness must fail until real human evidence is recorded. Story thresholds are fixed in the trusted release policy, never accepted from template or game content.

Read [the release policy](../../docs/RELEASE-POLICY.md) for criteria, staging checks, selective promotion, required review and publication.
