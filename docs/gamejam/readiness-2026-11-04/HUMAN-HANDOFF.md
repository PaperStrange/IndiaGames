# Bell — human readiness handoff

**Facilitator-only; prepared, not run.** This packet records no recruited people, scheduled sessions, physical-device passes or human approval. Technical QA is a separate workstream; see [current readiness](README.md). Arrange human work later with the release owner.

## Authoritative materials

| Material | Purpose |
|---|---|
| [October 27 canonical protocol](../milestone-2026-10-27/protocol.md) | Registration, neutral prompts, comparison, recall and decision thresholds |
| [Frozen build identities](../launch-2026-11-20/README.md#frozen-identities) | Candidate 0.1.0 and previous Contrast reference, source and inventory hashes |
| [Playtest list](../launch-2026-11-20/PLAYTEST-LIST.md) and [blank roster](../launch-2026-11-20/roster-template.csv) | Staffing, six registrations, device/host setup and release transfer |
| [Paired session record](../launch-2026-11-20/SESSION-RECORD.md) | Full journey, exact quotes, assistance, before-outcome prediction, recall and scoring |
| [Supplemental diagnostic sheet](SUPPLEMENTAL-DIAGNOSTICS.md) | Optional additional observation detail; no extra task or participant prompt |
| [Manual checks](../launch-2026-11-20/MANUAL-CHECKS.md) | Physical phone, keyboard/focus, readability, reduced motion, full ending and restart |
| [Decision record](../launch-2026-11-20/DECISION-RECORD.md) and [canonical JSON form](../milestone-2026-10-27/session-template.json) | Human adjudication and exact release metric names |

Use candidate inventory SHA-256 `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e` and previous Contrast inventory SHA-256 `47793d0ebc1801226a6b1f1e4fc11fb056d632c54919f179b91e14520c54fda8` for the existing comparison. Confirm them against the frozen manifests before recruitment. These identify the current artifacts, not a future patched build.

## Unchanged study contract

- Register the **first six fresh individual participants**, six ordered session IDs, distinct pseudonyms, exact builds and UTC registration before any play. Preserve failed, assisted, abandoned and unavailable attempts. No retrospective replacement of unfavorable outcomes.
- Alternate **reference-first, candidate-first** across slots 1–6: three in each order. Each person plays previous Contrast and candidate Contrast. Original remains a historical inspection reference, not the comparator.
- Serve immutable exports over HTTP from separate paths/origins; open each run fresh, select Contrast, then Start. Confirm actual device reachability. A GitHub source page or a remote computer's loopback address is not a playable phone URL.
- Say only: “Explore the town and try to understand what your actions change. You can stop at any time.” Do not direct the player to Square, the clue, Mina's route, borrowing or the correct forecast.
- At a naturally chosen decision, ask “What do you expect to happen, and why?” **before the result**. Ask what the action costs without supplying the answer. Record help verbatim and mark assisted outcomes.
- Allow at most **20 minutes per build**, with earlier voluntary stopping. After each build, hide the game for **at least 120 seconds** of neutral unrelated activity without game discussion or feedback. Then ask “What changed in the town because of something you did?” Finish recall before exposing the other build.
- Preserve the exact candidate thresholds: **4/6 each both** explain cause and predict before the outcome; **4/6 each both** perform the earned action uncoached and explain that Fracture can still end the day; **3/6** recall Mina's specific changed outcome after the break. Report all six and both first-build-order groups separately.
- A repeatable wrong-state, duplicate-reward or inaccessible-action failure blocks the next session pending repair, refreezing and a reviewed protocol for changed bytes. Keep earlier failed records. Zero unresolved critical bugs remains required.
- Separately complete actual physical-phone and access checks. An independent real human, distinct from participants and observers, reviews raw observations and plays the exact artifact before signing. Until then approval stays false and human critical-bug review stays pending.

The supplemental diagnostic does not change prompts, route choice, timing, denominators or thresholds. The historical advance-rule critique must not become a solution script for participants.

## Transfer checklist

| Required handoff | Owner / evidence / status |
|---|---|
| Human facilitator/observer, scheduling/consent owner, physical-device tester and independent reviewer assigned | Pending |
| Candidate/reference exact inventories and usable launch URLs confirmed | Pending human session setup |
| Six predeclared slots and alternating orders registered privately | Pending |
| Candidate technical report reviewed; visible-control issues distinguished from driver failures | [Agent technical report](TECHNICAL-QA.md) prepared; human coordinator review pending |
| Physical phone and keyboard/access checklist completed on actual devices | Pending |
| Each person's two journeys, assistance and neutral recall recorded | Pending |
| All six outcomes, order groups and contrary evidence reviewed | Pending |
| Six candidate-only summaries mapped to canonical release JSON | Pending |
| Independent human exact-build review and approve/revise/stop decision | Pending |
| Release/version/notes links and master → reviewed main promotion | Conditional on the existing gate |

Copy the blank sheets to a private location outside the checkout. Preserve the [existing record-care rules](../launch-2026-11-20/README.md#record-care): no names, contact details, consent mappings, raw recordings or private evidence links in the repository. Publication requires deliberate deidentification. Do not fill missing observations with agent scores.

## After evidence exists

If at least two of the six participants independently encounter the same procedural barrier, investigate that one transition for the next bounded clarity iteration. Capture expressed intent, reachable controls, action/result, assistance and recovery. Distinguish deliberate reading from inability to proceed and separate build-order groups. This diagnostic selects an investigation; it neither adds a gate nor licenses a broad tutorial redesign.

If successful actions lack causal explanations, consider causal clarity. If recall contains only a meter, consider the visible/narrative payoff. Preserve Mina's causal promise in either case: the crowd remains blocked while the prepared route changes her destination. Technical defects use the existing critical-bug policy immediately; they do not wait for two participants.

