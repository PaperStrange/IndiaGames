# Owner unblock checklist · November 5

**Start with accepted human roles and the earliest realistic booking date.** You chose three parallel lanes and facilitator-machine sessions; recruitment needs more time. Nothing below is booked or completed. The November 20 target stays conditional, with candidate freeze November 11 and go/no-go November 16.

| Priority | Your action | Completion evidence | Timing |
|---|---|---|---|
| 1 · People running the studies | Name a study coordinator, facilitators for three simultaneous lanes, device tester and an independent reviewer. Roles may combine where independence permits. | Each person accepts the role and gives actual availability. The reviewer is neither a participant nor an observer. | As soon as available; before booking sessions |
| 2 · Participants | Recruit six Small Hours pairs (12 people), six Iona players, six different Mara players and six Bell players. Keep people fresh across games. | Private roster of 30 distinct participants; exactly six preregistered sessions per required cohort, with Bell's first-build order split 3/3. | Before first play; never choose six successful attempts afterward |
| 3 · Appointment capacity | Reserve roughly 24 facilitator-hours, plus device/reviewer time and possible retests. | Confirmed appointment slots and a realistic revised schedule. A changed build may require another round. | Small Hours pilot/decision before Nov 11 staging; release evidence by Nov 15 |
| 4 · Machines and phones | Supply facilitator computers and physical touch devices. Include iPhone/Safari and Android/Chrome if both will be advertised. | Agents help verify the local HTTP setup; the human device owner checks actual access, inputs, download/save/retry and accessibility. | Before using that setup for participants |
| 5 · Repository administrator | Have the administrator apply the [reviewed protection runbook](../governance/2026-10-28/ADMIN-RUNBOOK.md). | Effective main/master rules, rule IDs, required current-head checks and eligible review evidence recorded in [issue #2](https://github.com/PaperStrange/IndiaGames/issues/2). A merged configuration file alone is insufficient. [Fresh readback](admin/STATUS.md) still shows both branches unprotected. | Preferably before Nov 11; required before Nov 16 go/no-go |
| 6 · Independent approval | Reserve a qualified reviewer for governed PRs and exact-build game decisions. | Reviewer inspects original records, actually plays the candidate, checks critical defects/devices and records approve/revise/stop against its hash. | By Nov 15 for the current launch track |

The November 5 readback lists only PaperStrange as a collaborator; an owner-authored PR cannot self-approve. Arrange a second eligible human through the normal access process. The November 4 agent code-review exception was limited to that batch. Do not invent a bot owner, assume Nemo accepted, or count an agent as a human participant/reviewer. No outreach is sent by this checklist.

## What to send back

Provide role names or stable IDs, accepted availability, earliest participant dates, available devices/browsers, and the administrator's status. Keep participant contacts, consent and recordings private. A useful reply format is:

| Item | Fill with actual information |
|---|---|
| Coordinator and facilitators | Names/IDs, lane assignments and available dates |
| Recruitment | Pairs / Iona / Mara / Bell counts and earliest appointment dates |
| Devices | Computer/browser; physical phone/model/OS/browser; device owner |
| Independent reviewer | Name/ID and review availability; confirm no observer/participant role |
| Administrator | Name/ID; protection action or exact blocker |

## Session packets and practical limits

Use the [game packets and recording templates](../launch/2026-11-20/README.md#game-packets). Copy them into a private study workspace before entering participant details. The dated per-game facilitator handoffs supplement, but do not replace, the canonical protocols and thresholds.

- **Small Hours:** two real people share a device. Observe privacy handoffs and each person's creative contribution; inspect the actual saved SVG. Do not prompt the voluntary save/replay metric.
- **Vivid:** two separate cohorts on the same 0.1.3 artifact; Iona's return is scheduled within the session. Do not mix saved story/profile histories or score Mara's emotional interpretation as correct/incorrect.
- **Bell:** each person uses the frozen reference and candidate in the predeclared order. Complete at least 120 seconds of neutral activity after each run, before recall and before showing the next build. Record first-exposure and second-build results separately.

A facilitator-machine HTTP server is reachable only where configured. A participant on another machine cannot open the facilitator's `localhost`; physical-phone access needs a separately verified same-network route or local device setup. The old public candidate URL repair remains paused. Issue #5's original managed-browser route need not be repaired to use a verified supported setup.

## If recruitment takes longer

Keep all three preparation lanes active, but leave dates unconfirmed until bookings exist. A game without its required frozen candidate by November 11 leaves the default November 20 track. Missing required observations, devices, critical-defect clearance or approval at November 16 means no-go for that game. Other independently approved games can ship; no threshold, story or recall interval is removed to meet the calendar.
