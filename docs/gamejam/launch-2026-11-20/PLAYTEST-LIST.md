# Bell human playtest list

Facilitator-only. Use [the canonical protocol](../milestone-2026-10-27/protocol.md) without teaching its solution. All checkboxes below are pending, not completed results.

## People and registration

- [ ] Name an actual human facilitator/observer, a scheduling/consent owner, a physical-device/accessibility tester, and an independent human reviewer. A person may cover scheduling and facilitation; the approving reviewer must differ from every participant and observer.
- [ ] Arrange **six fresh individual participants**, not six agent runs. Record genre familiarity and previous exposure. Recruitment/outreach is a separate human-owner action; this packet sends no invitations.
- [ ] Before any run, register exactly six ordered session IDs, six distinct participant pseudonyms, UTC registration time, candidate/reference inventory hashes, intended hardware/browser and build order. Copy the header-only [roster](roster-template.csv) privately; a planned slot is not a completed session.
- [ ] Alternate **reference-first, candidate-first** for slots 1–6: three of each. Each person plays both builds. Keep the same device/input for their two runs where possible; log deviations. Later-build results carry learning effects.
- [ ] Seek a mix of time-loop/narrative familiarity and keyboard/touch use without changing the denominator after outcomes. Device quotas are coverage goals, not new scoring thresholds: include actual desktop keyboard and actual phone touch coverage, with Safari/iOS if available and Android/Chromium if supported. Complete missing coverage separately using the manual checklist; do not label emulation as physical play.
- [ ] Confirm voluntary participation, stopping rights, optional recording and private storage. Preserve no-shows, withdrawals, abandoned and assisted attempts. A no-show remains a roster status, not an invented timed session; unresolved required records leave the gate pending. Any replacement/exclusion needs a prospectively reviewed new protocol.

## Build and room setup

- [ ] Export the exact [0.1.0 package](README.md#frozen-identities), verify its inventory, and freeze both launch URLs. Serve over HTTP; use separate candidate/reference paths or origins. Do not serve files from a checkout that another agent may switch.
- [ ] Open each run fresh, select **Contrast**, then Start. Original is not the comparator. Record device model, OS/browser versions, actual viewport, input, host URL/path and loading failures. Set no hidden state, developer shortcuts or saved answers.
- [ ] Explain active-tab-only progress: reload loses a run, Restart clears it. Do not reload mid-study to make a difficult attempt disappear. Log accidental reload as observed behavior/failure.
- [ ] Check independent access from the actual phone before the participant arrives. `127.0.0.1` on a phone is that phone, not the facilitator's computer; use an owner-arranged reachable test host or local-network setup and record it. A GitHub blob page is not playable hosting.
- [ ] Have a clock and private copy of [SESSION-RECORD.md](SESSION-RECORD.md) ready. Allow up to **20 minutes per build**, plus setup, at least two neutral minutes after each build, recall and debrief. Reserve roughly 60 minutes per participant; this is scheduling capacity, not measured playtime.

## Observe each run

| Step | Facilitator action | Record |
|---|---|---|
| Opening | Say only: “Explore the town and try to understand what your actions change. You can stop at any time.” | Expectation and first chosen action; do not name Square, borrowing, Mina's route or the correct forecast |
| Exploration | Follow the player's route without pointing or demonstrating | Entry, encounter, forecast, return, rereads, cancellations, help and actual elapsed times |
| Naturally chosen decision | Ask “What do you expect to happen, and why?” before the result | Exact prediction and evidence used; do not correct it |
| Cost understanding | Ask what their action costs, without supplying Fracture or a correct answer | Player explanation, performed action, whether help preceded it |
| Intervention or miss | Observe the action, timing and resulting scene | Visible clue, ordinary/borrowed choice, missed opportunity, Mina destination, confusion and reactions |
| Stop | End on voluntary stop, completion, critical failure or 20-minute cap | Actual reason and end timestamp; ending a run is not success |
| Neutral break | Hide game and avoid game discussion/feedback for **at least 120 seconds** | Break start/end, actual elapsed seconds and unrelated activity |
| Recall | Ask “What changed in the town because of something you did?” | Verbatim answer and timestamp; finish before exposing the other build |
| Exit | Allow a voluntary retry/leave choice without persuasion; debrief after both runs | Immediate preference/behavior, not retention or demand |

Stop the next session on a repeatable wrong-state, duplicate-reward or inaccessible-action failure. Preserve records; repair and refreeze under a new version before a prospectively reviewed study. A recorded critical bug cannot be averaged away by successful players.

## Score without replacing observations

These are the existing formative candidate thresholds, not statistical estimates:

| Candidate metric(s) | Evidence needed | Gate |
|---|---|---|
| `explained_cause` **and** `predicted_before_outcome` | Same person explains the witnessed cause and predicts the consequence before seeing it | At least **4/6** satisfy both |
| `earned_action_uncoached` **and** `explained_fracture` | Same person performs the earned action without coaching and explains that Fracture can still end the day | At least **4/6** satisfy both |
| `delayed_recalled_specific_mina_outcome` | Specific changed Mina outcome after the neutral break; a meter/currency alone does not count | At least **3/6** |
| Critical/state/access failures | Human triage and verification of fixes; no repeatable wrong state, duplicate reward or inaccessible promised action | **Zero unresolved critical bugs** |

Record each true/false judgment with a quote/behavior and timestamp. Missing, assisted or unobserved success is not true. Keep null while a record is still unassessed; never turn unknown into a fabricated result just to satisfy the validator. Final assessable attempts require all five metric booleans. Report all six candidate results and each first-build-order subgroup of three; keep reference scores separate. A four-person cause count plus a different four-person prediction count does not satisfy the joint 4/6 requirement.

## Release JSON handoff

1. Use a copy of the existing [session JSON template](../milestone-2026-10-27/session-template.json). Transfer **candidate run only** to the six `sessions` rows on master, in registered order; keep the paired reference run/journey available as supporting evidence.
2. `participant_count` is 1; `participant_ids` contains the real person's deidentified ID. `method` is `manual-in-person` or `manual-remote`; `observer_is_human` and observer ID describe the actual observer. Use the candidate **inventory** hash.
3. `started_at`/`completed_at` are actual UTC ISO timestamps ending in `Z`; `completed_at` is the run's end even if abandoned. `follow_up_at` is candidate recall time, at least 120 seconds after its end and before the next build. Retain notes for the neutral break and recall, including absence of recall.
4. Preserve `protocol.sampling_rule = first-six-predeclared-sessions`, actual `registered_at`, six ordered `session_ids`, and `delayed_recall_min_hours >= 2/60`. Registration must precede all sessions. Do not invent timestamps retroactively.
5. Add deidentified `observation_notes`, the five exact metric names above and `follow_up_notes`. Retain assistance and conflicting interpretation, not only the score. The report `critical_bugs_open` stays null until an actual human assessment; zero requires verified closure.
6. Complete [manual checks](MANUAL-CHECKS.md). The independent reviewer inspects raw records, actually plays the exact candidate, records approve/revise/stop and signs only after all sessions and recall. Until then `approved` remains false. An agent cannot supply that signature.
7. Release integrator validates staging and, only when genuine evidence is complete, candidate readiness using master tooling: `python3 scripts/validate-release.py --staging` and `python3 scripts/validate-release.py --candidate thirteenth-bell/0.1.0`. A changed version needs its own identifier. Readiness failure leaves the candidate staged; the date does not override the gate.
