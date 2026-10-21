# Small Hours — proposed work plan

**Lane:** Memorable Moments (`memorable`). **Prepared:** 21 October 2026. **Status:** proposed, not active. This document organizes future work; it does not start competitor play, participant recruitment, purchases, code changes or feature implementation. The next product experiment remains an **unchanged-build real-pair pilot**, followed by at most one observation-driven change or a no-change/stop decision.

## Scope and immutable sources

The reviewed branch tip is [`875230b1619482e485b71441bcc551edea613438`](https://github.com/PaperStrange/IndiaGames/commit/875230b1619482e485b71441bcc551edea613438). Its predecessor for this intake is [`822366ad3eb309f7009bb7a05e26cddfb466422f`](https://github.com/PaperStrange/IndiaGames/commit/822366ad3eb309f7009bb7a05e26cddfb466422f). Their diff contains **six additions under `docs/gamejam/competitor-plays-2026-10-20/` and no gameplay/test changes**. The older replay package used for provenance comparison is Vivid [`0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b`](https://github.com/PaperStrange/IndiaGames/commit/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b).

This plan extends the [20 October Small Hours review](https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/memorable-next.md) and [evidence audit](https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/evidence-audit.md). The prior review reports **33 passing synthetic Chromium assertions at 2026-10-20T15:11:12.948Z on 822366ad**. That run is reused as historical verification, not represented as newly run here. Unchanged source is not new evidence of real pair play, physical-device behavior, enjoyment or accessibility.

## Concrete incoming-record delta

| Assignment | Evidence at the new tip | What changes in the ledger |
|---|---|---|
| M1 — Make it Meme, official private web session | The October 13 lobby note and three October 15 reshoot PNGs are byte-identical to the older Vivid replay package. No template, caption round or second player appears in the session record. | **Lobby-only; social loop untested.** Relocation improves lane access, not coverage. |
| M2 — Fireboy and Watergirl, Coolmath Forest Temple | A new October 20 record reaches the title and main menu, then stops. It reports unavailable WASD/key-hold inputs and unreliable menu clicks; screenshots were viewed in-session but are not banked files. | Refine “source-only/unplayed” to **menu-only/tooling-blocked, zero gameplay**. No level or reciprocal coordination was observed. |
| M3 — Hanabi, BGA private two-player | No session; accounts, separate views, same-IP conditions and a real partner remain unresolved. | **Source-only/unplayed.** |
| M4 — GeoGuessr, exact private consumer mode unresolved | No session; account/plan/host/guest conditions remain unresolved. | **Source-only/access unresolved.** |
| M5 — Townscaper, selected full desktop edition | No new session in this package. Its index references a Vivid October 13 session pending provenance reconciliation. | **Source-only/unplayed for this reviewed assignment** until the source and exact edition are recovered; an Instant Demo cannot silently satisfy the full-desktop choice. |
| M6 — Florence, full desktop edition | No session or ending; native access remains conditional. | **Source-only/unplayed.** |

**Coverage remains 0/6 required titles with core gameplay observed in the verified Small Hours evidence:** one lobby-only, one menu-only fragment and four source-only/unplayed. There are no new human observations. The six-title/four-family gate remains open. The new record intake can close **TEAM-01 for this lane's supplied package only**, after integration; it cannot close all research validation.

Pinned evidence: [new package index](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/docs/gamejam/competitor-plays-2026-10-20/README.md#L5), [M1 exact stop](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/docs/gamejam/competitor-plays-2026-10-20/records/make-it-meme--player-walk-2026-10-13.md#L4), [M2 exact scope/tool limitations](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/docs/gamejam/competitor-plays-2026-10-20/records/fireboy-and-watergirl--player-attempt-2026-10-20-fragment.md#L4), [required editions and journey targets](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/docs/gamejam/competitor-matrix-2026-10-06.md#L15).

The M1 index also mentions a rejected public name-entry flow, whereas the attached raw record documents successful private-lobby creation. Keep the raw route authoritative for this session and reconcile the index before treating it as another access observation. Emotional first-person prose in the agent record is reflection, not participant testimony. The M2 record's tool attribution does not establish a defect in the game or a barrier on an ordinary keyboard.

## Actual journey and product hypotheses

**Current route:** choose pair play or explicitly labeled solo rehearsal → select one of three scenes → A privately chooses and predicts B → handoff → B privately chooses and predicts A → both-ready reveal → fixed scene activity with a role prompt from each selected choice → optional non-forcing timer → each optionally writes a detail → joint card/SVG, replay or End & forget. Earlier choices shape role prompts but are **not directly rendered into the export**. The default route has twelve button activations from Start to the activity; that source/trace count alone does not establish friction.

Sources: [entry, handoffs, activity and ending](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/play/views.js#L17), [mandatory prediction](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/play/state.js#L10), [export contents](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/play/state.js#L39), [historical agent journey and its limits](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/docs/gamejam-2026-10-05.md#L39).

| Product question | Current hypothesis | Evidence that could challenge it |
|---|---|---|
| Why would people want to play? | Two willing people nearby may welcome a small playful break that needs little planning, supplies a surprise and gives both a role. | Unprompted entry fails, one person carries the activity, or a simpler social competitor supplies a more appealing reward. |
| How could it differ on a game platform? | A same-device browser session with private turns, an offscreen activity and an immediate two-author keepsake may fit a direct-link/itch.io occasion. | Entry/handoff costs outweigh the payoff; pairs prefer shared accomplishment, humor or open creation; platform/device constraints undermine the occasion. Six qualifying competitor journeys are still missing. |
| What distinctive experience could it deliver? | “Only the two of us could have made this”: private choices lead to a shared action whose result visibly contains both contributions. This is a proposed signature, not a quote or uniqueness claim. | People cannot recognize both contributions, writing weakens a good activity, or the artifact feels generic and is neither kept nor retold. |

The proposition competes with humor, cooperative accomplishment, constrained communication, shared noticing, open creation and authored relationship narrative. The roster supplies these contrasts as **selection hypotheses**, not experienced results. [Original three-question brief requirements](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/docs/gamejam/research-plan-2026-10-06.md#L159).

## Sequence and open decisions

1. Incorporate the lane intake and assign owners (SH-01/16). Prepare the remaining-coverage ledger and unchanged-build protocol (SH-02/04); prepare honest distribution copy in parallel (SH-13).
2. Stage actual people/devices for the social comparisons, baseline and device review (SH-03/05/10). Competitor coverage stays independent of the internal pilot: neither replaces the other.
3. Review the baseline and select one change, no change, further study or stop (SH-06). Only the selected SH-07/08/09 card can become a build candidate; preserve at least one unchanged reference.
4. If a variant is justified, integrate it, verify it and compare its targeted behavior (SH-11/12/14). Write the separate three-question brief with all missing evidence visible (SH-15).

The [six-pair formative gates](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/docs/gamejam-2026-10-05.md#L96) remain 5/6 unaided reveals, 4/6 pairs with both contributing and 3/6 voluntary saves or replays. They guide a small design decision and do not estimate retention or causal effects. The current iteration first observes the unchanged build; any comparison is a subsequent declared experiment.

Open decisions: actual participant availability; whether prediction feels playful or evaluative; whether both people perform the activity; whether optional writing earns its cost; exact M3/M4 access; M5 shared-record provenance and edition; M5/M6 licensed hardware; physical-device/assistive-technology coverage; and the eventual browser distribution context. These are not answered by the incoming menu/lobby records.

**Do not build now:** additional scenes, accounts, persistent archives, remote multiplayer, AI partners, camera/photo capture, relationship scores, analytics services, native ports or a decorative art expansion. Do not rewrite the historical records, count a lobby as a social match, or substitute a demo/reserve without a documented decision. Curtains provide visual courtesy rather than secure device storage. Follow the existing [module ownership contract](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/docs/COLLABORATION.md#L5).

## Actionable cards

All owners below are proposed roles, not assignments to named people. `proposed` means ready for planning/assignment; `conditional` means it requires the stated evidence decision; `blocked_human` means actual participants or devices must be staged. None is active or completed. `completion_evidence` stays empty until the future work has evidence. For an unselected conditional branch, a written not-selected/no-build disposition can satisfy its downstream dependency without claiming implementation. Estimates are focused effort allowances, not calendar commitments; recruitment, access waits and long competitor sessions are excluded. Do not add all alternative-card estimates into one schedule.

### SH-01 — Publish the incoming-record delta and provenance ledger

**Perspective:** Research / evidence · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Small Hours research lead\
**Depends on:** None · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A lane intake note linked to the immutable source, with one row per M1–M6 assignment and an explicit TEAM-01 lane-intake disposition.

Acceptance:

- [ ] Record that 875230b adds six documentation/evidence files and changes no gameplay or tests relative to 822366ad.
- [ ] Classify M1 as lobby-only, M2 as menu-only/tooling-blocked with zero gameplay, and M3–M6 as source-only/unplayed in this reviewed package.
- [ ] Record that the Make it Meme note and three PNGs are byte-identical to the older Vivid package; preserve October 13 session and October 15 reshoot dates.
- [ ] Flag the M1 index/raw-record wording discrepancy and the unsupported-in-this-package Townscaper cross-branch reference for reconciliation.
- [ ] Close only the Small Hours incoming-record intake when incorporated; keep competitor coverage and human validation open.

**Rough effort:** 1–2 focused hours to incorporate and cross-review the existing audit; no new play included.

### SH-02 — Make the remaining M3–M6 coverage executable

**Perspective:** Research / competitive coverage · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Small Hours research lead + access coordinator\
**Depends on:** SH-01 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A versioned access/edition ledger and future session briefs for Hanabi, GeoGuessr, Townscaper and Florence; source recovery for any claimed shared Townscaper session.

Acceptance:

- [ ] For Hanabi, document legitimate accounts, separate views, same-IP conditions and a real partner; for GeoGuessr, identify the exact consumer mode, eligible host and agreed round boundary.
- [ ] For Townscaper and Florence, record existing license/device availability or keep the rows blocked; do not treat a browser demo as the selected full desktop edition.
- [ ] Retrieve and reconcile the claimed Townscaper record before reuse: exact edition, actor, date, creation/revision/finish/save boundary and original evidence; shared M5/V5 evidence counts as one title.
- [ ] Write each future journey target from the matrix, including failure/recovery when encountered, ending or bounded unit, exit and actual repeat; distinguish planned from observed stages.
- [ ] Any reserve promotion includes the lost question and recalculated six-title/four-family rules, at least two outside narrative/deduction, no more than two per family and at most one occasion comparator.
- [ ] Do not purchase, create accounts or launch a competitor while preparing this plan; unavailable access remains an explicit gap.

**Rough effort:** 2–3 hours for the ledger and session briefs; subsequent play, licensing and waiting are unestimated.

### SH-03 — Complete staged competitor journeys, starting with M1/M2

**Perspective:** Research / social comparison · **Priority:** P0 · **Status:** `blocked_human`\
**Owner role:** Human research facilitator + Small Hours researcher\
**Depends on:** SH-01, SH-02 · **Human participants required:** yes\
**Deliverable:** An M1/M2 human comparison milestone, followed by scoped M3–M6 studies as access permits, each with a journey, system observations and an art board.

Acceptance:

- [ ] Use real willing participants; disclose observer assistance and prior knowledge. An agent controlling both sides does not satisfy the social question.
- [ ] M1 records join, authoring, reveal/judgment, three agreed rounds and the actual repeat/leave decision; distinguish authorship, recognition, surprise and scoring.
- [ ] M2 uses a keyboard capable of WASD, arrows and held inputs; records role division, introduction, a coordination-level completion, natural recovery if encountered and continue/leave.
- [ ] After SH-02 resolves access, M3 targets a complete Hanabi game/debrief; M4 an agreed private location session/recalled detail; M5 a creation/revision/finish/save cycle in the selected edition; M6 the full story/ending and recalled interaction. Unreached targets stay explicitly partial or blocked.
- [ ] Record active play, setup and notes separately; preserve the October 20 tool limitation as that session’s limitation, not a general game defect.
- [ ] Store exact stop points and capture provenance; incomplete sessions retain their partial status and do not satisfy the full-journey gate.

**Rough effort:** Schedule with actual participant/access availability. Budget the M1/M2 milestone first and re-estimate M3–M6 afterward; no claim that six whole journeys fit one day.

### SH-04 — Settle the unchanged-build six-pair protocol

**Perspective:** Research / experiment design · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Research lead + game designer\
**Depends on:** SH-01 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A short neutral facilitator script, observation sheet and predeclared decision rules for the current build.

Acceptance:

- [ ] Pin 875230b as the reviewed source and state that its game files match 822366ad; log the actual tested build if the study later uses another export.
- [ ] Observe entry, private choice/prediction, handoff, reveal, actual offscreen activity, optional writing, save/leave and voluntary repeat without explaining the intended payoff.
- [ ] Record both people’s contributions, assistance, stopping, device/browser, time to reveal and voluntary comments; do not solicit or collect keepsakes by default.
- [ ] Predeclare the formative gates: 5/6 pairs reach reveal unaided, 4/6 show both contributing and 3/6 voluntarily save or replay; these are diagnostic thresholds, not population or retention estimates.
- [ ] Give the unchanged build first. Record prediction and writing friction qualitatively; do not mix an unimplemented no-prediction variant into the baseline.
- [ ] A person may stop without explanation; seated/imaginary participation and blank writing stay valid.

**Rough effort:** 2–3 focused hours, excluding recruiting and sessions.

### SH-05 — Observe six willing pairs on the unchanged build

**Perspective:** Product / human gameplay · **Priority:** P0 · **Status:** `blocked_human`\
**Owner role:** Human playtest facilitator\
**Depends on:** SH-04 · **Human participants required:** yes\
**Deliverable:** Six de-identified pair observations, an actual-sample summary and the three gate counts.

Acceptance:

- [ ] Record recruitment context and willingness; include friends/partners where feasible without treating six pairs as representative.
- [ ] Observe rather than enact the shared activity; separately record A and B contributions and any one-person carrying of the task.
- [ ] Do not prompt saving or replay; distinguish choosing the interface’s replay button from a later voluntary return.
- [ ] Report assistance, exits, missing data and contrary cases. If fewer than six pairs attend, state the actual denominator and leave six-pair thresholds unevaluated.
- [ ] Keep participant statements separate from observer interpretation and agent-generated examples.

**Rough effort:** 4–6 facilitator/analysis hours as the inherited pilot allowance; excludes recruitment, scheduling and cancellations.

### SH-06 — Choose one response to the baseline, including no change or stop

**Perspective:** Product / decision · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Game designer + research lead\
**Depends on:** SH-05 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A brief observation → problem → hypothesis → falsifier decision, with explicit disposition of SH-07/08/09.

Acceptance:

- [ ] Apply all three baseline gates and examine qualitative exceptions before selecting a change.
- [ ] Select at most one bounded experiment: prediction/handoff friction, complementary activity prompts, or the earned keepsake ending; document why the others are not selected.
- [ ] If both people do not want the activity, consider revising the proposition or stopping before polishing export.
- [ ] Identify the expected changed behavior, a result that would reject the hypothesis, and remaining rival explanations.
- [ ] Keep six-competitor validation open even if the internal pilot is encouraging; an internal result does not replace required competitor journeys.

**Rough effort:** 1–2 hours to review observed results; no feature batch implied.

### SH-07 — If selected, address observed prediction or handoff friction

**Perspective:** UX / interaction · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** Interaction designer + transition owner\
**Depends on:** SH-06 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** One bounded future interaction variant and a transition/copy specification tied to the baseline issue.

Acceptance:

- [ ] Activate only if SH-06 selects this hypothesis; otherwise record a not-selected disposition.
- [ ] If prediction becomes optional, a skipped prediction is represented explicitly and the reveal never invents a guess or matching outcome.
- [ ] If handoff is the issue, identify the exact confusing step before reducing or rewriting controls; the twelve-activation count alone is not evidence of human friction.
- [ ] Preserve informed pair participation, solo-rehearsal labels, private versus joint curtains, keyboard/touch equivalence and End & forget.
- [ ] Deliver only this selected flow change on the game’s own future implementation workstream after the decision; no change is made by this planning task.

**Rough effort:** 3–5 hours only if the selected interaction scope stays small; re-estimate after specification.

### SH-08 — If selected, make each person’s contribution to the activity clearer

**Perspective:** Narrative / content / gameplay · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** Content designer + social play reviewer\
**Depends on:** SH-06 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** One revised scene-prompt set with a before/after role map and a falsifiable contribution hypothesis.

Acceptance:

- [ ] Activate only if SH-06 identifies weak or one-sided participation; otherwise record a not-selected disposition.
- [ ] Show the fixed scene activity, A’s selected role prompt and B’s selected role prompt separately so the causal change is inspectable.
- [ ] Preserve stable scene/choice IDs, three choices per current scene, imaginary/seated alternatives and permission to alter or leave the activity.
- [ ] Do not demand personal disclosure, add a relationship score or use claims of togetherness as instructions to participants.
- [ ] Test the proposed wording against the observed confusion; no extra scene is part of this experiment.

**Rough effort:** 2–4 focused hours for one selected prompt revision; subsequent human comparison is separate.

### SH-09 — If selected, make the ending recognizably belong to both people

**Perspective:** Art / keepsake experience · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** Visual designer + content owner\
**Depends on:** SH-06 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A compact ending storyboard and, only when chosen, one bounded keepsake variant aligned with the joint-authorship hypothesis.

Acceptance:

- [ ] Activate only when the activity works but the baseline ending does not; otherwise record a not-selected disposition.
- [ ] Trace the signature action → contribution → artifact; current SVG content is two optional written lines plus scene title/stamp, not a direct visualization of earlier choices.
- [ ] Keep each person’s contribution legible in the card and export, including one or two blank contributions; any edit-before-save step preserves mutual agreement.
- [ ] Use the existing table/window/paper visual language and legible text; do not add unrelated decoration, captured photos or asset pipelines.
- [ ] Compare recognition of this particular moment, not a generic preference for prettier art; altered exports retain escaping and readable long text.

**Rough effort:** 3–5 hours for a bounded ending treatment; size again if the state model would expand.

### SH-10 — Check comfortable participation on real devices

**Perspective:** Accessibility / physical devices · **Priority:** P1 · **Status:** `blocked_human`\
**Owner role:** Accessibility reviewer + device tester\
**Depends on:** SH-04 · **Human participants required:** yes\
**Deliverable:** A dated device/accessibility matrix with actual observations and unresolved gaps.

Acceptance:

- [ ] Use a physical iPhone/Safari and Android/Chrome where available; record models, OS/browser, virtual keyboard, background/resume, reload, SVG saving and browser history.
- [ ] Inspect keyboard focus and order, visible labels, zoom/reflow, contrast and reduced motion; record assistive-technology checks actually performed.
- [ ] Verify a seated/imaginary route and comfortable stop/change-scene/blank-writing route with willing people; do not claim universal accessibility from technical checks.
- [ ] Exercise the actual hosted embed only when that distribution path is available; the previous synthetic iframe check is not an itch.io device test.
- [ ] Log severity and reproduction for any barrier; a serious participation or privacy-confusion issue takes priority over expanding scenes.

**Rough effort:** Define coverage from available devices and participants; do not assign a fixed completion date to unavailable hardware.

### SH-11 — Integrate only the selected experiment with explicit state ownership

**Perspective:** Engineering / integration · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** Single integration owner + module owners\
**Depends on:** SH-06, SH-16 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A narrow future implementation branch/patch, transition contract and source manifest for the selected change.

Acceptance:

- [ ] Begin only after SH-06 and the selected SH-07/08/09 specification; document the other cards’ not-selected disposition.
- [ ] Keep content in content.js, rules/export in state.js, event transitions in game.js and rendering in views.js/CSS; one owner resolves shared transitions.
- [ ] Preserve ephemeral session behavior, hidden-stage DOM filtering, escaped user strings, optional timer behavior, restart and reset contracts.
- [ ] Record the exact baseline and variant commits and the smallest changed file set; no storage, backend, accounts or remote-play architecture is introduced.
- [ ] If SH-06 selects no change or stop, deliver a no-build disposition instead of creating a patch.

**Rough effort:** Size after the selected variant is specified; avoid adding a second estimate for the same coding hours already in SH-07/08/09.

### SH-12 — Verify the selected variant and preserve evidence boundaries

**Perspective:** QA / verification · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** QA owner + integration reviewer\
**Depends on:** SH-11 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A verification report linked to the exact reviewed source, or a documented reuse of the unchanged baseline.

Acceptance:

- [ ] Run the existing 33 behavioral assertions only against a changed build or another justified verification target; explain changed expectations rather than preserving a stale assertion count.
- [ ] Cover affected keyboard/touch controls, private/joint DOM content, all impacted scenes, blank/long/markup text, SVG parsing, timer, replay, cancel/end and reload paths.
- [ ] Label synthetic Chromium, emulated phone, real-device and human observations separately; passing automation is not evidence of fun or pair authorship.
- [ ] For unchanged/no-build outcomes, cite the October 20 verification at 822366ad and the no-game-file delta; do not fabricate a new run timestamp.
- [ ] Resolve any blocker before the follow-up study, and record exact evidence paths and remaining limitations.

**Rough effort:** 2–3 focused hours for a small changed variant; less for documented baseline reuse.

### SH-13 — Prepare a truthful browser invitation and hosting checklist

**Perspective:** Distribution / positioning · **Priority:** P1 · **Status:** `proposed`\
**Owner role:** Distribution owner + product writer\
**Depends on:** SH-01 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A reviewable invitation, short platform-fit brief and package checklist for a direct link/itch.io browser context.

Acceptance:

- [ ] Explain the actual occasion: two willing people, one screen, private choices, a shared activity and an optional keepsake; describe five minutes as a design target until observed timings support it.
- [ ] Keep a portal such as CrazyGames as a separate acquisition hypothesis with requirements still to verify; do not claim acceptance or audience demand.
- [ ] Specify relative static assets, full play/ package, embed sizing, keyboard/touch access and download behavior; link actual host checks when later performed.
- [ ] State that the active session clears on reload/leave and a downloaded file remains with the player; curtains are visual courtesy rather than device security.
- [ ] Do not claim market uniqueness, memory improvement, relationship benefit, human-tested accessibility or retention; no upload, publication or campaign is part of this card.

**Rough effort:** 1–2 hours for draft copy/checklist; current host-policy research and publishing are separate future scope.

### SH-14 — If a variant exists, compare its targeted behavior with the baseline

**Perspective:** Research / comparative test · **Priority:** P1 · **Status:** `blocked_human`\
**Owner role:** Human playtest facilitator + research lead\
**Depends on:** SH-12 · **Human participants required:** yes\
**Deliverable:** A predeclared comparison protocol, actual session observations and a narrow advance/revise/stop recommendation.

Acceptance:

- [ ] Begin only after a selected variant passes SH-12; if there is no variant, record that disposition and use SH-05/06 rather than manufacturing a comparison.
- [ ] Use fresh pairs or a declared counterbalanced order; state the actual sample, prior exposure, learning effects and missing data.
- [ ] Choose the target metric/observation before sessions: prediction friction, balanced contribution, or recognizable ending; avoid changing multiple levers.
- [ ] Record contrary evidence, comfort leaving and voluntary keep/replay; do not interpret a small formative comparison as a causal population estimate.
- [ ] If later recall/return is studied, obtain an agreed follow-up and report actual attendance; agent replay never fills that gap.

**Rough effort:** 4–6 hours is an inherited exploratory allowance only; re-estimate after choosing sample and order, excluding recruitment.

### SH-15 — Write the three-question decision brief with unresolved evidence visible

**Perspective:** Product / synthesis · **Priority:** P1 · **Status:** `proposed`\
**Owner role:** Game designer + research lead + art reviewer\
**Depends on:** SH-02, SH-03, SH-06, SH-10, SH-14 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A separate Small Hours brief comparing complete player stories and deciding advance, revise, further study or stop.

Acceptance:

- [ ] Answer why someone might choose this break, how it differs in the chosen browser context, and which signature action → consequence → payoff is worth testing.
- [ ] Use observed M1/M2 contrasts plus M3–M6 only to their recorded scope; six titles/four families remain an unmet gate until actual qualifying studies exist.
- [ ] Offer two or three concise alternative stories with a strongest precedent, production cost, likely failure and rejecting observation, rather than a list of desired features.
- [ ] Include baseline and any follow-up human results, contrary evidence, access/device limits and exact source links; separate human statements from design hypotheses.
- [ ] A no-change/stop outcome may close the experiment without building a variant; a further-study outcome leaves research tasks visibly open.

**Rough effort:** 2–3 hours once the relevant evidence exists; an interim brief must state every unresolved dependency.

### SH-16 — Assign accountable owners and protect the pilot-first sequence

**Perspective:** Team / ownership · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Project coordinator + lane lead\
**Depends on:** SH-01 · **Human participants required:** no for this card’s planning/review work\
**Deliverable:** A role-to-person ownership map, dependency review and acceptance/evidence handoff convention.

Acceptance:

- [ ] Name one accountable research owner, human facilitator, designer, content/visual owners, transition integrator, QA reviewer and distribution owner; roles may be combined without inflating sample size.
- [ ] Confirm that all cards are proposed, conditional or blocked_human and no future feature has completion evidence yet.
- [ ] Do not assign parallel edits to shared transition files; preserve the game branch/worktree ownership contract and source/evidence pinning.
- [ ] For each conditional card, record selection or not-selected/no-build disposition after the decision; a disposition is not an implemented feature.
- [ ] Track participant/device/access needs separately from person-hours; share only de-identified observations and agreed artifacts with the integration reviewer.

**Rough effort:** About 1 focused hour to assign and review; ongoing coordination follows actual work.


## Candidate staging and official release

These tasks implement the shared [release policy](../../RELEASE-POLICY.md). `master` is the pre-commit candidate branch; `main` contains the hub and approved official versions. The six-session thresholds are formative release decisions, not proof of market demand or retention. No human sessions are supplied yet.

### SH-17 — Stage one immutable candidate on master

**Perspective:** Production · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Release integrator\
**Depends on:** SH-06, SH-10, SH-12\
**Deliverable:** A versioned release-candidates/small-hours/<version>/ package on master, built from the owning game branch.

- [ ] Record the exact source SHA, version, player-facing notes, build inventory and hash; include a portable build/index.html and only intended files.
- [ ] Use the release-candidate template and staging validator. Preserve the predeclared human-session protocol before recruiting; staging may contain pending evidence and is not an official release.
- [ ] Keep the previous candidate and source branch recoverable, push master without force, and verify its remote SHA. Do not merge the whole game branch into master or main.

**Completion evidence:** none; future release work.

### SH-18 — Review the exact candidate against the human release gate

**Perspective:** Human playtesting · **Priority:** P0 · **Status:** `blocked_human`\
**Owner role:** Human playtest facilitator + independent reviewer\
**Depends on:** SH-17\
**Deliverable:** A complete human-playtest.json and linked anonymized records for the exact packaged build, with a recorded approve/revise/stop decision.

- [ ] Six predeclared pairs (12 distinct people): at least 5/6 reach the reveal unaided, 4/6 pairs both contribute, and 3/6 voluntarily save or replay. Record the actual choice and both contributions, including failures and assistance.
- [ ] Include every one of the six predeclared sessions, distinct pseudonymous participant IDs, raw observations and assistance. An incomplete, abandoned or assisted attempt cannot be silently replaced or counted as unaided success.
- [ ] Zero unresolved critical bugs; manually check actual browser entry, core journey, failure/retry, keyboard, and one physical mobile/touch device. Record measured duration and issues rather than inferring results from automated checks.
- [ ] An independent human reviewer inspects the evidence and signs the build-specific approval. Existing pilot sessions may be reused only if the protocol was predeclared, participants and required outcomes are recorded, and the artifact hash matches exactly; changed builds need revalidation.
- [ ] Run full candidate validation. A failed gate stays on master; agent sessions and synthetic test fixtures cannot satisfy human evidence.

**Completion evidence:** none; future release work.

### SH-19 — Promote only the approved game version to main

**Perspective:** Distribution · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Release maintainer\
**Depends on:** SH-18\
**Deliverable:** A reviewed official release package, registry entry, GitHub version and release-note links, plus a verified playable Pages URL.

- [ ] Copy only the approved candidate package into releases/<game>/<version>/ on main. Pin its immutable ancestor commit on master; preserve all previous official versions and registry entries.
- [ ] Open a main promotion PR with human approval and gate results. Required owner review and release-gate must pass; do not auto-merge or include unrelated candidates.
- [ ] After the human-approved merge, verify automated GitHub release publication, tag target, notes, registry links and the deployed Pages build. A push or draft link alone is not a verified official delivery.
- [ ] If publication fails, preserve the approved artifact, report the actual failure and rerun only the failed publication step. Never rewrite a released version; publish corrections under a new version.

**Completion evidence:** none; future release work.
