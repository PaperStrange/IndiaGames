# Small Hours — November 5 preparation handoff

**Four targeted automated groups passed on the unchanged baseline. Human studies remain unbooked.** The user selected all three game lanes in parallel, with playtests on facilitator machines, and needs more time to arrange people. This update changes documentation only; it neither stages Small Hours nor supplies human release evidence.

| Area | November 5 result | Next owner/action |
|---|---|---|
| Keyboard and focus | Full first-scene pair journey, download, replay and exit passed using Tab/Enter; dialogs returned focus | Human device/accessibility tester verifies the actual setup |
| Optional and long details | Empty/whitespace fallback and native 120-character limit passed; actual SVGs parsed and retained contributions | Facilitator checks actual device download/open and virtual keyboard |
| Optional timer | Real 45-second deadline expired without advancing the game; leaving the activity cancelled the timer | Human observations determine whether timing feels comfortable |
| Artifact | Same eight files, 58,313 bytes, same inventory hash before and after | Preserve baseline until the canonical pilot decision |
| Staffing and sessions | Unassigned/unregistered/unbooked; no observations or approvals | User/coordinator supplies availability, six pairs, devices and independent reviewer |
| Release | Not staged on master; no official release | SH-06/10/12 prerequisites still govern staging |

[Technical report](TECHNICAL-QA.md) · [Machine-readable results](technical-qa.json) · [Facilitator setup and your unblock list](FACILITATOR-SETUP.md) · [Existing human packet](../launch-2026-11-20/README.md)

## Exact baseline

- Source: `ca7fb8ea0fa7ceb1a9fd1c8ab238a71a47e9c649`.
- Inventory: `fa4ca1930fc1964d929bca9704c5f0bba89dc9cc46208d34294a1e1ae5c458e3`.
- ZIP SHA-256: `64ebb3bdfd69b4a643a06817cc023754e94fc114c5a812fae6fb111af1ad2fd2`.
- Reviewed branch before this documentation: `e94aa04273e581d1a27ade1988fe6d422b6111ec`.

The [frozen inventory](../milestone-2026-10-27/baseline-inventory.json) and [download](../milestone-2026-10-27/small-hours-baseline.zip) identify the artifact. No new version, scene or runtime fix was selected.

## Next decision and deadline

The missed October 31–November 4 pilot and November 5 design selection are not completed by these automated checks. Obtain real bookings, preregister the unchanged six-pair study, and keep all attempts. Then select at most one bounded response, no change, further study or stop using the [existing decision sheet](../launch-2026-11-20/decision-template.md).

November 11 remains the candidate-freeze cutoff. Small Hours can join the November 20 track only if its original pilot, physical-check and staging prerequisites fit before that cutoff. Exact-build human review is due before November 16 go/no-go; otherwise defer this game. Passing games may release independently. Do not shorten or invent a human study to fit the calendar.

## Interpretation boundaries

From the player's perspective, the controls are technically reachable in the tested setup; this does not establish privacy comfort or enjoyment. From the designer's perspective, optional writing and timer expiry preserve player choice; shared authorship still needs actual pair observation. Art/accessibility review retains the narrow-screen synthetic text capture without treating it as physical-device readability. Operators have a concrete local launch and download check. Researchers must record what each person contributes away from the interface, why they continue/stop, and what action/consequence they remember, using the canonical neutral prompts rather than teaching a desired response.

The three product questions remain hypotheses. Automated saving is not voluntary saving, successful keyboard input is not a contribution to the offscreen activity, and a known-route operator is not a first-time pair.
