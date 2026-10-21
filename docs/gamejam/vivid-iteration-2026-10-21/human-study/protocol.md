# Protocol: two stories, three separate cohorts

Status: preparation only. Replace no blank field with a fabricated person, reaction, device measurement or approval. Register the frozen protocol before the first real participant begins.

## Freeze and preregister

1. Select the exact candidate package on an immutable `master` commit, including `candidate.json`, `build/`, the shipping-story catalog and schema-v2 human report. Record implementation commit, master commit, candidate version and build inventory SHA-256.
2. Check the staged packet with the reviewed release validator. Record the command and result. A staging pass permits blank human fields; it is not readiness or approval.
3. Select six unique ordered session IDs for each required story cohort; declare six more for the neutral cohort if it will run. Use pseudonymous participant IDs and keep the identity mapping outside the repository. Do not count designers, developers, observers, reviewers, agents or prior viewers as fresh participants.
4. Set the real UTC `registered_at` before any `started_at`. Record the recruitment and allocation rule, task wording, time budget, device mix, and whether the optional 48–72-hour question will be used. Keep the original protocol with any amendments.
5. Declare who observes and who independently reviews. The approving reviewer must be a real human different from every participant and observer across all reported cohorts. Register the observer and reviewer pseudonyms; do not merely tick an independence box.

Use the first six predeclared sessions in order, including failed attempts, early exits and abandonment. Do not replace an unfavorable session with a later successful one. A no-show is an unfilled session, not evidence of a completed trial; retain it and keep readiness pending until the declared protocol is honestly satisfied. Any revised sampling rule needs review before a new run, not a retrospective edit to improve a result.

## Cohorts and task endpoints

| Cohort | People | Condition | Required endpoint |
|---|---:|---|---|
| Iona remembered | 6 | `story_id: iona`, `condition: remembered`, `release_profile: iona-return-v1` | Rescue, recollection, choice, then a scheduled same-session return and the corresponding placement. |
| Iona neutral | 6, optional for release | `story_id: iona`, `condition: neutral`, `release_profile: iona-neutral-v1` | Identical first rescue, recollection and choice; on scheduled return, place the cleaning cloth on its peg. |
| Mara | 6 | `story_id: mara`, `condition: remembered`, `release_profile: mara-object-v1` | Inspect three objects, align the sketches, reveal the workshop and choose any interpretation. No return task. |

Each person plays only one cohort before its required observations are complete. Use distinct participants across both stories and the optional neutral cohort. Allocate eligible recruits by the predeclared alternating cohort sequence, not by a guess about who will like a condition. Record departures from the allocation rule. Small cohorts support descriptive comparison, not a claim of statistical or causal superiority.

Iona's return is **scheduled exposure**, not voluntary retention. After the first ending, use the same neutral instruction in both Iona cohorts: “Please leave this story and open the same one once more.” Give no instruction about letters, dedications, cloths, destinations or the relationship to a choice. If a participant returns spontaneously before this prompt, record that separately; do not relabel every scheduled return as voluntary.

## Acceptance rules fixed before testing

For each required six-person cohort, the report contains all six sessions and the same exact build hash. No report can substitute another story's success for its own.

- **Iona remembered:** at least 4/6 participants must each both complete the task unassisted **and** explain how their earlier choice changes the available return action. These are joint successes by the same people, not separate totals. At most 1/6 may expect unrestricted AI interaction.
- **Mara:** at least 4/6 participants must each both complete unassisted **and** explain an action-to-visible-consequence connection. Accept a specific account such as moving the drawing until the window lines meet and seeing the room become a workshop. Do not grade which emotional interpretation they choose.
- **Both stories:** zero open critical bugs; an independent human reviews the observations and plays the exact candidate before approving it. A blocker, required-state loss/corruption, or inability to perform a promised action is critical. Human triage decides severity; an empty bug list is not proof that no bugs exist.
- **Neutral:** record the same Iona metrics and observations, including whether a player invents a choice-to-return relationship. There is no neutral efficacy threshold. Report its actual descriptive results if conducted; do not use it to rescue a failed remembered cohort.

`completed_unassisted` means the participant reaches the defined endpoint without a facilitator revealing a rule, control, solution, hidden object or next action. Built-in hints, transcript, keyboard equivalents and flat rendering are part of the product and are allowed. Record their use. Standard opening instructions and the scheduled return instruction are protocol exposure, not coaching. Any subsequent gameplay hint makes this metric false even if the player finishes; preserve what assistance helped and when.

`explained_choice_to_return_action` requires the participant to identify their own choice and the corresponding later object or place. “It remembered me” alone is insufficient. `explained_action_to_visible_consequence` requires a concrete action and an observable change; repeating the story ending alone is insufficient. Score from the player's words and observed actions, with a concise quote. Do not teach the explanation before scoring.

`expected_unrestricted_ai` is true when the player describes or repeatedly tries unrestricted chat, invented on-demand dialogue or arbitrary photo/person transformation as an expected capability after the initial screen. Capture the actual wording or behavior. Do not introduce the term AI to elicit the expectation. Ask the open expectation question before gameplay and the general capability question afterward; resolve uncertainty through independent review, not a favorable assumption.

An abandoned or assisted session has `completed_unassisted: false`; an explanation not observed is false. A session ending timestamp marks when the observation ended, not successful completion. Record all failures and uncertainty in notes. Missing evidence cannot be marked true to make a threshold pass.

## Time, changes and publication

Budget 25 minutes for Iona and 20 for Mara, including consent and debrief. Allow up to 15 minutes of unaided Iona play or 10 minutes of unaided Mara play before ending the scored attempt; those are facilitator study limits, not game timers or claimed typical completion times. Stop sooner at the participant's request. Record actual times and any timeout. Guided exploration may continue after metrics are locked, clearly separated from the scored session.

Changing any shipped byte creates a different build and invalidates the prior report's identity. Freeze a new version, review the changed protocol if needed, and collect a new first-six run. Preserve failed candidate records. The candidate stays on `master` if either shipped story fails or evidence is incomplete. No official release or `main` promotion is justified by automated tests alone.

Only deidentified concise observations belong in the repository. Keep consent forms, contact details, recordings and identity mappings in a controlled location agreed with participants. Obtain explicit recording consent; participation must remain possible without recording. The schema-v2 envelope uses `story_reports` for Iona and Mara, optional `study_reports` for neutral, and one independent `human_approval`. Null counts, empty sessions and false approval remain pending until actual evidence is recorded.
