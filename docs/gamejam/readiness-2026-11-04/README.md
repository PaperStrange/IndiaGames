# Small Hours — readiness handoff, 4 November 2026

**Scope: agent verification, evidence corrections and a prepared human packet.**
The user will arrange human play afterward. This handoff supplies no human
results, recruitment, bookings, candidate staging or official release approval.
The unchanged baseline remains the next product experiment.

| Area | Current status | Owner / evidence |
|---|---|---|
| Research interpretation | Dated adjudication prepared; historical records retained | Research lead / [evidence adjudication](evidence-adjudication.md) |
| Baseline identity | Frozen October 27 package; no runtime change in this documentation slice | Integration owner / [inventory](../milestone-2026-10-27/baseline-inventory.json) |
| Current technical verification | **8/8 HTTP lifecycle cases pass**; [results and limits](TECHNICAL-QA.md) | QA owner / actual coverage in the table below |
| Human protocol and forms | Prepared, unchanged; supplementary sheet is blank | [Canonical protocol](../milestone-2026-10-27/protocol.md), [launch packet](../launch-2026-11-20/README.md) |
| Facilitator, participants and reviewer | Unassigned / unregistered / unbooked | User and coordinator, after handoff |
| Physical devices / assistive technology | Pending actual human checks | [Device checklist](../launch-2026-11-20/human-playtest-checklist.md#physical-device-and-accessibility-checks--separate-record) |
| Release | Not staged on master; not approved or officially released | SH-17/18/19 remain conditional |

## Exact game to hand over

| Identity | Value |
|---|---|
| Frozen source | `ca7fb8ea0fa7ceb1a9fd1c8ab238a71a47e9c649` |
| Build SHA-256 | `fa4ca1930fc1964d929bca9704c5f0bba89dc9cc46208d34294a1e1ae5c458e3` |
| Contents | Eight files, 58,313 bytes; HTTP(S) entry `index.html` |
| [Baseline ZIP](../milestone-2026-10-27/small-hours-baseline.zip) SHA-256 | `64ebb3bdfd69b4a643a06817cc023754e94fc114c5a812fae6fb111af1ad2fd2` |
| Reviewed documentation commit before this slice | `45042578e549d0aba3ee10702384d0a86c780aa9` |
| Status | Pilot baseline; documentation changes do not create a new game build |

Follow the [exact-artifact launch instructions](../milestone-2026-10-27/launch.md).
A GitHub source page is not playable. Extract all eight files and use the
supported HTTP(S) route; a `file://` capture is not a replacement for checking
modules, nested paths or origin-dependent browser behavior. Record the actual
participant-facing host when one is chosen; do not hand participants an
executor-only loopback URL.

## Technical verification handoff — actual November 4 results

The [technical report](TECHNICAL-QA.md) identifies source, build hash, server route, browser/version,
viewport/input, commands, observed states and limits. Keep agent checks
separate from human/device evidence. Historical October assertions remain
historical and do not fill this table.

| Check | Result | Required evidence |
|---|---|---|
| Served file inventory before and after checks | PASS; frozen eight-file inventory unchanged | Every file hash matches the frozen inventory; byte count and aggregate hash |
| HTTP root and nested project path, desktop and narrow viewport | PASS; pair/solo × root/nested ×1280/390 | Actual URLs, asset/navigation failures, console errors and entry capture |
| Visible-control pair flow through reveal, activity, details and SVG | PASS; complete flow and actual escaped SVG | Inputs and visible transitions; successful download distinguished from attempted save |
| Solo rehearsal, blank/long/markup text and optional participation paths | Solo/short markup PASS; blank/maximum-length details NOT RUN this pass | Actual exercised cases, escaped output and applicable regression report |
| End & forget, reload and fresh replay | PASS; cancel/confirm, reload reset and next scene | Active choices/text clear as specified; new activity starts; previously downloaded files remain outside session clearing |
| Keyboard/focus and narrow layout | Narrow layout PASS; keyboard/focus NOT RUN this pass | Exact emulated input/viewport; no claim of physical touch or assistive-technology coverage |
| Known failures, skipped checks and remaining limits | Zero page/network errors; unrun cases listed above; timer expiry, human devices and screen reader remain unverified | Honest failure/blocked list and linked issue or next owner; never a blank interpreted as pass |

If verification finds a genuine defect, record its visible trigger before
changing code. A runtime fix requires a new build identity and declared study
decision; it must not silently replace the frozen baseline. This documentation
slice changes no game bytes. A transport failure remains a technical blocker,
not evidence of player confusion or a reason to claim `file://` is equivalent.

## Human packet — ready to assign, not executed

1. The coordinator/user later assigns a facilitator, six willing pairs
   comprising 12 distinct people, and an independent human reviewer. No one is
   named or contacted by this preparation. Earlier dates in the October launch
   plan are historical planning targets, not evidence that sessions occurred.
2. Before play, use the [canonical SH-BASELINE-2026-10-27 protocol](../milestone-2026-10-27/protocol.md),
   [registration template](../milestone-2026-10-27/study-registration.template.json)
   and [human checklist](../launch-2026-11-20/human-playtest-checklist.md).
   Preserve the ordered first-six attempts and exact served inventory. Perform
   required physical-device checks before calling those paths ready.
3. For each actual attempt, use the [canonical recording sheet](../launch-2026-11-20/session-recording-template.md)
   and [JSON template](../milestone-2026-10-27/session.template.json).
   The [blank supplemental sheet](supplemental-observations.template.md) records
   current research questions without changing prompts, thresholds or the
   neutral opening. It is optional documentation, not an additional score.
4. Keep identifiable/contact/consent data and personal keepsakes outside the Git
   checkout in an access-controlled human study location. Publish only reviewed,
   consented, deidentified summaries. Record unknowns as unknown/null; do not
   manufacture a participant, quote, timing or outcome to complete a form.
5. Apply the existing [decision sheet](../launch-2026-11-20/decision-template.md).
   SH-06 selects at most one response, no change, further study or stop. No
   gameplay variant is selected by the agent walkthrough alone.

The standing six-pair criteria remain **at least 5/6 unaided reveals, 4/6 pairs
with both contributing creatively to the offscreen activity, and 3/6 voluntary
saves or replays**, using the protocol's full definitions. Clicking or typing
alone is insufficient for `both_contributed`. Include help, exits and missing
observations; fewer than six actual pairs leaves the decision pending. Zero
unresolved critical bugs, actual required device checks and independent human
review remain required for release. These are formative criteria, not claims
about retention, demand or relationship benefit.

## Next decision and November 20 boundary

| Task IDs | Next action | Boundary |
|---|---|---|
| SH-01/02/15 | Use the adjudication to update positioning and retain open social/family comparisons | No exclusivity, human-fun or completed-play claim from desk material or partials |
| SH-12/16 | Finish technical evidence and transfer the packet to the user/coordinator | Agent readiness and human staffing are distinct statuses |
| SH-05/10 | Later observe the unchanged baseline and physical devices | Pending humans; no invented schedule or results |
| SH-06 | Decide from actual pair evidence | At most one of SH-07/08/09; no change/further study/stop are valid |
| SH-11/12/14 | Only if a variant is selected, integrate, verify and observe that declared build | Preserve original artifact and evidence; do not pool versions |
| SH-17/18/19 | Conditional candidate, human approval and publication | master is the candidate gate; main is official only after approval |

November 20 remains a conditional target. Human availability is intentionally
outside this execution slice. If required evidence is unavailable, record a
defer decision instead of compressing consent, observation or review. Research
gaps constrain positioning; they are not newly invented release thresholds.
No new scenes, AI/remote partners, scoring or mandatory sharing are part of
this handoff.
