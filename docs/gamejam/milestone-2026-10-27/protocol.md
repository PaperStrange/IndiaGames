# Six-pair baseline protocol · SH-BASELINE-2026-10-27

**Status: prepared, not started.** This protocol supersedes the October 5 proposal to mix in a facilitator-run no-prediction condition. Every primary session uses the unchanged pair-play build first. No variant is part of this study.

## Before the first participant

1. The coordinator assigns a real facilitator and an independent human reviewer; unfilled roles remain unfilled. Arrange six willing pairs (12 distinct people, no reuse between pairs), preferably including friends/partners with varied familiarity. Do not infer representativeness. No recruitment messages are sent by preparing this packet.
2. Generate the baseline with `package-baseline.py`, retain `baseline.json` and record its exact build SHA-256 and deployed location. A GitHub source page is not a playable URL. Check the actual served package against that inventory before the study.
3. Privately obtain consent, preferred accessibility arrangements and permission for any quotations. Use pseudonymous participant/observer IDs. Keep contact details, consent mapping and personal keepsakes outside GitHub. Do not collect keepsakes, recordings or screenshots containing personal text by default.
4. Before any session, complete `study-registration.template.json`: six unique ordered session IDs, source/build hash, actual registration timestamp, facilitator and reviewer IDs, host and device plan. Preserve this preregistration. Register session slots without inventing participants or results. A missed/abandoned/assisted slot cannot be replaced post hoc with a successful pair.
5. Check entry, keyboard navigation and one physical mobile/touch device before calling that input path ready. Record actual model, OS/browser, zoom/input/accessibility setup, outcome and blockers. Prefer physical iPhone/Safari and Android/Chrome where available; unavailable device coverage stays pending. Critical failures block sessions until fixed and re-frozen. A changed artifact needs a new identity and study decision.

## Neutral opening and observation

Read: “This is a small browser game for two people sharing a screen. Use it as you normally would. You may change the activity, imagine objects, leave writing blank, or stop at any time without giving a reason. We are observing the game, not testing either of you. Please avoid personal details. Your active session clears when you leave or reload; any file you choose to save stays on your device.”

Give the verified link. Do not teach the choices, handoff, payoff or save/replay controls. Let the pair choose their scene and who goes first. Record when the invitation/link is supplied, the start click, reveal and ending/stop. Separate loading/setup, play and debrief time; never use automated timing as the human baseline.

Observe each stage using `observation-template.md`: expectations; actual actions; pauses, rereading and misunderstandings; handoff comfort; each person's distinct offscreen contribution; optional timer/writing; ending; help; route changes and exits. Keep direct words, observable behavior and interpretation in separate columns. Do not enact either player's part.

If asked for help, first say “What would you like to do?” Record the request and response verbatim where permitted. Give concrete help if they need it or want to stop; record exactly what was taught and when. Assistance to reach reveal makes `reached_reveal_unaided` false. Do not pressure someone to continue for the metric.

At the ending, wait for the pair's own next action or decision to finish; do not point out saving or replay. Once they choose, debrief: “What happened during the activity?” “What did each of you add?” “Which part would you keep or change?” “Was anything unclear or uncomfortable?” Ask privately if needed for comfort. Do not frame the desired answer as closeness or shared authorship.

## Definitions and first-six decision rules

| Metric | Count a pair only when… | Threshold |
|---|---|---|
| `reached_reveal_unaided` | Both-ready reveal is reached through their own actions without facilitator navigation/instruction help. Ordinary partner interaction is part of the game; document it. | ≥5 of six |
| `both_contributed` | Each person makes an observable creative contribution to the shared offscreen activity (spoken, imagined, gestured or otherwise accessible). Clicking a choice or typing alone is not sufficient. Record A and B contributions without unnecessary personal content. | ≥4 of six |
| `voluntarily_saved_or_replayed` | The pair chooses save or starts replay through the interface without a facilitator/observer prompt. Record which action and whether both agreed; distinguish attempted download from successful file delivery. | ≥3 of six |

Use null for unobserved/missing values, false for an observed miss and true only with supporting notes. Include all first-six attempts, assistance and exits; do not turn missing outcomes into successes or silently omit them. If fewer than six actual pairs attend, report the observed denominator and leave the six-pair decision pending. These are formative thresholds, not a population estimate or proof of retention.

Zero unresolved critical bugs and independent human review are required for later release. Record privacy confusion, inability to leave, inaccessible actions or serious participation pressure as blockers even when numeric targets pass.

## After observation

Preserve a de-identified session file and journey sheet per actual attempt, then summarize counts and contrary cases. An independent human reviewer inspects the evidence and plays the exact artifact; the reviewer must not be a participant or the observer whose evidence they approve. No approval field is prefilled.

Use SH-06 to select at most one response: prediction/handoff friction, contribution prompts, or keepsake ending; no change, further study and stop are valid. Unselected variants stay unbuilt. A new build requires targeted technical checks and a declared follow-up study. SH-17 staging on `master` remains conditional on the pilot decision, physical review and verification; this baseline packet is not that release candidate.
