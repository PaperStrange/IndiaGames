# Vivid human playtest list

**Blank operational checklist; no box below is a result.** Use with the [canonical protocol](../vivid-iteration-2026-10-21/human-study/protocol.md). These checks arrange observation; they do not amend its sample, wording, timing or thresholds.

## A. Staff and preregister before anyone plays

- [ ] Assign a real coordinator, a real human observer and a real independent release reviewer. Record their pseudonyms privately. The reviewer must be neither an observer nor a participant in any reported cohort and must personally play the exact build.
- [ ] Confirm separate review of [multi-story release policy PR #1](https://github.com/PaperStrange/IndiaGames/pull/1); do not merge it automatically or treat it as game approval.
- [ ] Select the consent process, optional recording permission, storage owner, access list, deletion date and withdrawal contact. Permit a notes-only session. Keep identity mappings/contact/consent/media outside this repository and its backups, preferably in `/workspace/indiagames-human-playtests/keepers-frame/` or the agreed private store. A repo-side `playtest-private/` folder must remain ignored and never be force-added.
- [ ] Screen for adults new to both stories, excluding designers, developers, observers, reviewers, agents and people who watched prior play. Use the existing [recruitment draft and screening fields](../vivid-iteration-2026-10-21/human-study/recruitment.md).
- [ ] Reserve **12 distinct fresh participants: six Iona remembered and six Mara**. Optionally reserve six further people for Iona neutral only if declared before testing. Do not fill missing slots with agents or replace unfavorable attempts.
- [ ] Before assignment, write the alternating allocation sequence across the chosen cohorts. Allocate the next eligible person to its next slot, not by predicted preference. Record deviations.
- [ ] Register six unique ordered session IDs per required cohort, real UTC registration time, exact frozen build, observer/reviewer IDs, task wording, time limits and device mix. The header-only session register has no registered people until this happens.
- [ ] Decide before testing whether to run optional neutral comparison and optional 48–72-hour prompted recall. If omitted, make no claims from those studies. Declining optional recall does not exclude a main-session participant.

Across the required pilot, aim for both rare and frequent game players, **at least two real keyboard-primary participants and at least two sessions on physical phones**. Record the actual mix and missed targets. Aim to cover iOS/Safari and Android/Chrome in the separate device review; arrange a human screen-reader check with a familiar user and the relevant access needs. These coverage targets do not replace either six-person cohort. Do not exclude an otherwise eligible person to improve the result. Device reviews are separate from fresh-player cohorts and do not supply extra successes.

## B. Verify operator setup without contaminating the sample

- [ ] Export candidate 0.1.2 using the [October 27 helper](../milestone-2026-10-27/launch-and-session-setup.md); verify the full inventory digest listed in [README](README.md). Record the command, UTC and actual output.
- [ ] Serve those exact exported bytes at the agreed host; record the actual URL and nested path if used. A cloud loopback URL is not reachable from a physical phone. Use an agreed trusted LAN for local phone testing, not an assumed master Pages site.
- [ ] Conduct an operator dry run before recruitment sessions: correct story title, assets, visible controls, basic interaction and no blocking console/network errors. Log failures honestly. Stop a server before replacing what it serves.
- [ ] Make a fresh dedicated browser context for each participant, with no legacy `keepers-frame:v1` or `vivid:save:<story>:<profile>` data. Do not clear unrelated personal storage or use developer save fixtures.
- [ ] Select the assigned route privately: Iona `?profile=remembered#iona`; Mara `?profile=remembered#mara`; optional neutral `?profile=neutral#iona`. Keep the condition out of spoken instructions.
- [ ] Note physical device, OS/browser version, input, motion/flat settings, viewport and actual storage availability. A new tab in an old profile is not a fresh context.

## C. Observe the complete human journey

| Story | What the observer watches, without teaching it | Endpoint and time limit |
|---|---|---|
| Iona remembered | Entry expectation; purposeful viewpoint/input; marks and signal recovery; earlier-watch repair; privacy/dedication choice; first ending; scheduled or spontaneous return; corresponding placement. | First story **and** return placement. At most 15 minutes unaided play within 25-minute session budget. |
| Mara | Entry expectation; player-selected inspection order; noticing relationships; alignment attempts and recovery; visible workshop reveal; any interpretation; exit. | Any interpretation ending after reveal. At most 10 minutes unaided play within 20-minute session budget. |
| Optional Iona neutral | Same first story, then the routine cloth placement without choice-specific return framing. | Same Iona timing. Separate cohort, no efficacy threshold. |

- [ ] Say the canonical opening and ask the unprompted capability expectation before gameplay. Do not introduce AI, the workshop, the letter outcome, alignment position or a preferred interpretation.
- [ ] Timestamp action → feedback → next expectation, hesitation, unsuccessful input, help, recovery, and exit in [SESSION-RECORD](SESSION-RECORD.md). Distinguish direct observations, verbatim quotes and your interpretation.
- [ ] Use neutral prompts sparingly and record each. Built-in hints, transcript, flat mode and keyboard equivalents are allowed. Revealing a rule, control, solution or next action makes `completed_unassisted` false; record when and why help began.
- [ ] For Iona only, preserve the same origin, browser context and profile through return. Unless already spontaneous, say exactly: **“Please leave this story and open the same one once more.”** Do not reset memory or explain the return object. Scheduled exposure is not retention.
- [ ] Stop on request or at the protocol limit. Preserve abandoned, assisted and timed-out attempts. A no-show stays missing; do not manufacture a completed failure or swap in a successful replacement.
- [ ] After the scored endpoint, ask the story's causal question and the capability question from the [facilitator script](../vivid-iteration-2026-10-21/human-study/facilitator.md). Lock metrics before explaining intent or demonstrating alternate routes.
- [ ] Ask when they wanted to continue/stop, which action mattered, what they would tell a friend and what they wished they could do. Do not use “was it fun?” as the sole measure or grade Mara's interpretation.

## D. Physical-device and accessibility review

Use a separate copy of the [device record](../milestone-2026-10-27/journey-and-device-form.md) per real device and build, following the [measurement method](../vivid-iteration-2026-10-21/human-study/devices-and-recall.md).

- [ ] Observe both stories on actual phones: cold load, touch alternatives, active camera/placement/alignment, rotation, background/resume, gallery, browser back and story return. Keep 3D and flat results separate.
- [ ] For a physical 3D performance claim, capture three 30-second **active interaction** samples with device/tool/context and mean/median FPS, stalls and traces. Target at least 30 FPS. If unmeasured, mark unverified; idle render-on-demand counters are not a valid substitute.
- [ ] Record cold-load bytes ≤8 MiB, active triangles ≤100,000 and DPR ≤1.5 separately from physical FPS; small assets alone do not prove smooth interaction.
- [ ] Review real keyboard focus/activation/cancellation/placement/alignment; real screen-reader names/state/transcript/endpoints; larger text, reading comfort, reduced motion and flat-mode checkpoint preservation. Record actual tools and assistance.
- [ ] Triage each failure with reproduction and evidence. A blocker, required-state loss/corruption, or inability to perform a promised action is critical. Leave unknown checks explicit; do not mark them passed from automation.

## E. Synthesize and decide

- [ ] Review all twelve first-six records in original order, not only favorable recordings; preserve ambiguous classifications and adjudication reasons.
- [ ] Calculate Iona joint successes from the **same** people's completion AND causal explanation (≥4/6); count unrestricted-AI expectations (≤1/6). Calculate Mara completion AND action/consequence joint successes (≥4/6). Never pool the stories.
- [ ] Export permitted deidentified fields using [SESSION-RECORD's mapping](SESSION-RECORD.md#release-report-mapping), leaving pending values pending until real evidence exists. Do not put raw media inside a candidate package.
- [ ] The independent human reviews original consented evidence, severity decisions and device results, plays the exact candidate and records a dated approval or rejection. Set critical count to zero only after actual triage and fix verification.
- [ ] Follow [NEXT-ITERATION](NEXT-ITERATION.md): retain, revise or stop. Changed shipped bytes require a new version and fresh complete cohorts before release. A late failure postpones the game rather than relaxing its gate.
