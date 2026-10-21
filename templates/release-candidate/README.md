# Blank release-candidate packet

These files intentionally **fail readiness validation**. They contain no human results and no official version.

On `master`, create `release-candidates/<game>/<version>/`. Copy only `candidate.json`, `human-playtest.json`, and `notes.md` into it; add the exported browser game under `build/`, including `build/index.html`. Keep `README.md` and `session.json` out of the packet. Use `session.json` as the shape for each object in `human-playtest.json` → `sessions`.

Use game IDs `small-hours`, `keepers-frame`, or `thirteenth-bell` and a three-part version such as `1.0.0`. Record the full implementation commit in `source_commit`. Generate the manifest's `build` object with:

```sh
python3 scripts/validate-release.py --inventory release-candidates/GAME/VERSION/build
```

Copy the resulting `sha256` into the report and each session. Register the six session IDs and protocol before starting. Use twelve distinct people for Small Hours (six pairs), six distinct people for either other game. Participant and observer IDs are pseudonyms; do not commit names, contact information, recordings or sensitive raw notes.

Each session's `method` is `manual-in-person` or `manual-remote`; the observer must be human. Record all six attempts including abandonment and failures. `completed_at` means session end, not gameplay success. Record accurate UTC timestamps ending in `Z`, concise observed behavior in `observation_notes`, and the exact metric keys below. Metric values must be JSON `true` or `false`, never guessed values. A real human reviewer, distinct from every participant and observer, completes `human_approval` only after reviewing all manual evidence.

| Game | Required metric keys |
|---|---|
| Small Hours | `reached_reveal_unaided`, `both_contributed`, `voluntarily_saved_or_replayed` |
| Keeper’s Frame | `completed_unassisted`, `explained_choice_to_return_action`, `expected_unrestricted_ai` |
| Thirteenth Bell | `explained_cause`, `predicted_before_outcome`, `earned_action_uncoached`, `explained_fracture`, `delayed_recalled_specific_mina_outcome` |

For Bell, predeclare `delayed_recall_min_hours` of at least `0.03333333333333333` (two minutes), use a neutral break, then record `follow_up_at` and `follow_up_notes` for every participant, including failures. This is short delayed recall, not day-two retention. Other games do not use the follow-up fields.

Read [the release policy](../../docs/RELEASE-POLICY.md) for criteria, staging checks, selective promotion, required review and publication.
