# Human playtest checklist · Small Hours

**Use alongside the [unchanged-baseline protocol](../milestone-2026-10-27/protocol.md), not as a replacement.** Every checkbox below is pending. Suggested session IDs and device allocations are planning slots only; actual preregistration requires a completed, timestamped registration before the first session.

## Staff, register and prepare

- [ ] Coordinator assigns an accountable facilitator, device/QA owner, designer, release integrator and independent human reviewer by October 30. Record names/contact details privately; use consistent pseudonyms in shareable evidence. The reviewer is distinct from every participant and observer.
- [ ] Arrange six willing pairs / twelve distinct people. Do not reuse someone in another baseline pair. Record voluntary familiarity/context and prior exposure without collecting sensitive relationship details. Both people must be free to decline or stop. Preparation sends no invitations.
- [ ] Complete the [registration JSON](../milestone-2026-10-27/study-registration.template.json): exact source/hash/host, actual UTC registration time, ordered six session IDs, observer/reviewer IDs and device plan. Lock and preserve the registration before play. An absent or abandoned slot remains visible; it is not silently replaced.
- [ ] Verify the served eight-file artifact against [its inventory](../milestone-2026-10-27/baseline-inventory.json). A GitHub file page or a local-only URL is not a participant-facing game link. Use the full ZIP on an approved study host or the actual test machine.
- [ ] Complete the device checklist below. A device blocker is resolved before testing that path; changed bytes require a new frozen artifact and study decision. Do not mix builds in one six-pair denominator.
- [ ] Obtain consent and accessibility arrangements privately. Store working records outside the Git checkout. Do not collect names, personal keepsakes, recordings or screen captures by default; permission to participate is not permission to publish a quote.

## Proposed session list

Reserve approximately **30 minutes per pair**, including setup and debrief; this is scheduling allowance, not a measured play duration. Let people stop or continue naturally rather than making them hit a timing target.

| Proposed slot | Pair / participants | Planned input context | Status |
|---|---|---|---|
| SH-B01 | Unassigned / 2 people | Desktop Chromium, shared screen | Unregistered, unbooked |
| SH-B02 | Unassigned / 2 people | Desktop Firefox or Safari, shared screen | Unregistered, unbooked |
| SH-B03 | Unassigned / 2 people | Physical Android / Chrome, shared device | Unregistered, unbooked |
| SH-B04 | Unassigned / 2 people | Physical iPhone / Safari, shared device | Unregistered, unbooked |
| SH-B05 | Unassigned / 2 people | Pair's preferred available device/input | Unregistered, unbooked |
| SH-B06 | Unassigned / 2 people | Pair's preferred available device/input | Unregistered, unbooked |

This is a coverage proposal, not a representative sample or a requirement to pressure participants into unfamiliar controls. Set the actual plan before registration. If a proposed device is unavailable, record the gap and schedule a separate physical-device check; do not label emulation as physical coverage. Accessibility-focused checks may be separate from the six pairs and do not add to the product-outcome denominator. A remote observer is acceptable only when two real participants still share one device and the observer can reliably observe the activity; remote partner play is not a game feature.

## Run each pair session

- [ ] Confirm the session ID, exact artifact/host, two distinct pseudonyms, date/time, device/browser version and prior exposure. Verify both people are comfortable proceeding.
- [ ] Read the protocol's neutral opening verbatim. Explain stopping, optional writing, session clearing and downloaded-file persistence. Do not teach the reveal, roles or ending controls.
- [ ] Give the game link; let the pair choose who starts and which scene. Record invitation time, first action, reveal, finish/stop and setup/play/debrief durations separately.
- [ ] Observe entry → private choice/prediction → handoff → second private turn → reveal → shared activity → optional writing → ending. Record the actual order, repetitions, detours and skipped stages; do not prefill the observed journey from this expected route.
- [ ] Record each person's actual creative contribution away from the interface. A click or typed line alone does not establish `both_contributed`. Record whether one person carries the activity.
- [ ] Record any help with its time, exact content and effect. Helping the pair reach reveal makes `reached_reveal_unaided` false. Let them stop; a distressed or unwilling participant is not a failed player.
- [ ] At the ending, wait for a spontaneous action before debrief. Do not point to Save or Replay. Record save attempt versus file delivery, replay start, agreement and leaving separately.
- [ ] Ask the neutral debrief questions in the protocol, not a leading question about closeness or shared authorship. Keep quotations, observable behavior and interpretation separate.
- [ ] Save one actual [recording sheet](session-recording-template.md) and JSON record. Enter observed true/false or null where unobserved, and retain all assistance, abandonment and missingness. Add issues without unnecessary personal content.

## Physical device and accessibility checks · separate record

Use [device-checks.template.csv](device-checks.template.csv); mark the actual result only after a person performs it. These are compatibility checks, not extra product participants or evidence of fun.

| Check | What the human reviewer must observe |
|---|---|
| Real host and nested/embed entry | Actual hosted entry and assets; narrow layout; scrolling; keyboard focus into/out of embed if used; no inaccessible controls. |
| Keyboard and readability | Reach all scenes and private/joint turns without a mouse; visible focus; enlarged text/zoom; useful labels. Assistive technology is reported only if actually used. |
| Physical touch and virtual keyboard | Private handoffs, touch targets, optional writing, long text, no obscured Next/End controls; actual model/OS/browser recorded. |
| Consent and private/joint content | One person can decline/leave; curtains do not unexpectedly expose private turns. The curtain is visual courtesy, not security. |
| End, reload and retry | Reload or End & forget clears the active session; a fresh session/replay works; recovery expectations are understandable. |
| Keepsake download | SVG download/open on the tested host and browser; attempted versus delivered file distinguished. Saved files remain on the device after End & forget. |

## Close the pilot and decide

- [ ] All six registered attempts are accounted for; missing participants and unknown outcomes remain visible. Do not choose six successes from a larger pool.
- [ ] Tally the three metrics using the exact definitions and attach supporting observation references; report missing values separately. If the six attempts or required observations are incomplete, the gate remains pending.
- [ ] Human reviewer classifies issues and confirms zero unresolved critical bugs before approval. Numeric thresholds never override privacy confusion, inability to leave, inaccessible core actions or participation pressure.
- [ ] Complete [SH-06 decision](decision-template.md): select one bounded hypothesis, no change, further study or stop, with contrary evidence. Record explicit disposition of SH-07/08/09.
- [ ] Stage on master only after SH-06, SH-10 and SH-12, including explicit no-build dispositions where applicable. Pilot evidence is eligible for release reuse only with complete preregistration, required observations and byte-identical staged artifact. Changed builds need new declared testing.
