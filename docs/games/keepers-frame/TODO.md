# The Keeper’s Frame / Vivid — detailed to-do plan

Prepared 21 October 2026 from the 20 October review. **Proposed work, not implementation or a completed experiment.** This page adds no new gameplay, participant records or provider research. The reviewed Vivid source remains pinned to [`0b35e3fb`](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/README.md). All owner roles below are proposed and unassigned.

The immediate decision is whether one short, memory-dependent return action deserves a bounded test. Decide that experiment before source changes. The [prior review](https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/vivid-next.md) and [evidence audit](https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/evidence-audit.md) remain the detailed rationale; this page breaks the work into reviewable deliverables.

## What the current slice actually does

| Journey stage | Supported behavior | Consequence for the plan |
| --- | --- | --- |
| Enter and help | Iona asks for a safe ferry signal. Leaning exposes a bearing and rhythm; both clues must be collected before a correct signal succeeds. [Content](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/content.js#L3), [rules](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/rules.js#L18). | Preserve purposeful observation and the evidence log. This slice demonstrates observation and matching, not a deep deduction game. |
| Recover | Wrong answers preserve clues and allow retry, without a timer or limited attempt resource. [Recovery](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/rules.js#L33). | Keep recovery safe; added pressure is not the experiment. |
| Decide | After the rescue, Iona permits public sharing. The player chooses a private promise or harbour record. Earlier uninvited reading is possible and is remembered. [Choice and consent](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/app.js#L80), [history](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/rules.js#L24). | Both private and public outcomes remain legitimate; later consent must not erase prior intrusion. |
| Return | Saved choice/history can change the greeting. **Every saved state still offers the same letter action and resets the same ferry puzzle.** Letter opening already exists on the first visit; it is not a newly unlocked action. [Greeting](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/app.js#L17), [offered label](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/app.js#L57), [reset](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/src/rules.js#L10). | A mechanically different remembered-action return is proposed, not present. |
| Leave and reload | Browser-local storage retains choice, prior peek and visit count; blocked storage is disclosed, and the player can forget visits. [Storage and controls](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/play/README.md#L17). | Keep minimal local memory, explicit reset and honest reload behavior. No account, backend, uploaded photo, voice or generative character is implemented. |

The 20 October review reported **8 rule tests and 13 browser observations passing** on an unchanged snapshot. Those are historical automated checks, not new runs for this page, human satisfaction evidence, exhaustive browser coverage or real-phone verification. The prior runner's embedded date was stale; future records need their actual run date.

## Three product answers — hypotheses to challenge

| Product question | Current hypothesis | Rival explanation or falsifier |
| --- | --- | --- |
| Why would someone play this kind of game? | A short, quiet browser visit lets the player help someone by noticing what she cannot reach. The small act of care may make the portrait worth attending to. | People may experience only a simple matching task with lengthy text. Useful assistance in Sort the Court! or the indirect rescue in Six Cats Under may offer a stronger reason to stay; their partial records do not settle preference. |
| How could it differ on a game platform? | In an itch.io browser context, original art, immediate entry, no sound requirement and one authored relationship might offer a low-friction alternative to longer native encounters. A remembered consequence could become the reason to choose it. | Browser convenience and parallax alone may be insufficient. Native benchmarks compare experience, not identical acquisition conditions; six-competitor coverage and current platform requirements remain incomplete. |
| What unusually distinctive experience could we deliver? | “I chose what to keep private or share; she remembered; I can now place that choice visibly in her world.” The player performs the remembered relationship instead of only reading a callback. | If people recall appearance but cannot explain why their action changed, the proposed difference is decorative. If a neutral return works equally well, memory has not earned an expansion. No claim of market uniqueness follows. |

The original question definitions are [pinned in the research plan](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/docs/gamejam/research-plan-2026-10-06.md#L159). Known precedents include specific choice recall in the [Anxiety record](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/docs/gamejam/player-first-replays-2026-10-15/records/adventures-with-anxiety--player-replay-2026-10-12.md#L15) and action-to-visible-world-change in the [WBWWB record](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/docs/gamejam/player-first-replays-2026-10-15/records/we-become-what-we-behold--player-replay-2026-10-14-retry.md#L18). These are bounded agent observations; neither is a new human result or an automatic addition to the required six.

## Evidence gaps that remain open

**2/6 required competitors have partial gameplay evidence; the six-title firsthand gate is unmet. Zero populated human-test rows exist.** There are no new Vivid records since the prior review. Agent emotional prose must not be quoted as participant testimony. [Human sheet](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/docs/gamejam/human-playtest.csv#L1), [evidence definitions](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/docs/gamejam/field-report.md#L9).

| Required competitor | Current evidence | Missing question |
| --- | --- | --- |
| V1 Sort the Court!, updated Poki edition | Partial Poki reshoot: three days and day four begun. Older itch observations are a separate edition/session. | Trace a request through later consequence, resolved milestone and re-entry. |
| V2 Six Cats Under, HTML5 | Partial kitchen interactions; no rescue/ending. Stopping was imposed by tools and then parked. | Complete the indirect helping arc; no voluntary return or cozy lingering can be inferred. |
| V3 Event[0], commercial desktop | Source/critic-only; no new firsthand record. | Useful conversation, cooperation, misunderstanding and recovery. |
| V4 TOEM, official native demo first | Source-only; no installed/demo journey. | Purposeful framing, request acceptance and the declared demo endpoint. |
| V5 Townscaper, full desktop | Source-only; shared with the Small Hours lane. | Whether authoring an image supplies agency that recognition does not. |
| V6 Rhythm Doctor, current native release | Source-only; no timed/audio session. | Whether helping becomes meaningful through precise action and recovery. |

The [required matrix](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/docs/gamejam/competitor-matrix-2026-10-06.md#L44) spans five selected families, not five observed families. Keep at least four broad families, at least two titles outside narrative/deduction, at most two from one family and at most one occasion-only comparator. Native access remains deferred; reserves need an explicit promotion, exact edition, reason and recalculated coverage. Do not silently replace these gaps with more narrative browser games or count Townscaper twice as a unique title.

## Proposed experiment: a place for the promise

Keep the existing first rescue. Propose roughly one minute of new authored interaction on return; that is a content target, not measured human timing.

| Remembered choice | Proposed invitation and action | Proposed persistent consequence |
| --- | --- | --- |
| Private | Iona offers the folded letter. Lean, then place it in a sheltered recess inside the frame. | The letter remains sheltered on reload; she names what the player protected. |
| Public harbour record | An approved dedication awaits. Lean, then pin it on the harbour-facing edge. | The dedication remains visible on reload; she names what the player chose to share. |
| Neutral comparison condition | Complete a routine frame task of comparable length and interaction count, without referencing the earlier choice. | A clear finished task, with comparable art and controls, but no claimed causal memory. |

Both remembered paths have equal care and interaction scope. Prior uninvited reading remains part of the authored acknowledgment. Each reaches a quiet stopping point; no repeat ferry puzzle, extra portrait, currency, free-text chat or complete second chapter is included.

KF-01 must also consider a simpler spatial revisit and stopping after the first rescue as alternative directions. This experiment is a recommendation to decide, not an instruction to implement immediately. Its human comparison tests the complete package of remembered line, object and action; it cannot isolate their separate effects.

## Sequence, ownership and status

`proposed` means a planning/specification deliverable is ready to consider; `conditional` means execution depends on the named decisions and prerequisites; `blocked_human` means actual consenting participants are needed. No status means completed. P0 protects the decision or valid pilot; P1 is supporting or optional work. Each card requires its own evidence before any future completion claim.

1. **Evidence and decision:** KF-02 → KF-01. Retain the unmet six-competitor gate in the decision, rather than calling the research complete.
2. **Agree contracts before editing:** KF-03 → narrative/art/UX and persistence specifications (KF-04–07); prepare KF-11 and KF-14 in parallel.
3. **Only after the experiment decision and later source-work authorization:** KF-08 → KF-09 → KF-10. One integrator owns the renderer/schema handoff.
4. **Verified pilot:** prepare KF-15, then run KF-12 when people are available. KF-13 is an optional, genuinely later follow-up.
5. **Decision from evidence:** KF-16 can advance, revise or stop. Recruitment delays and unperformed follow-up stay visible.

The machine-readable [task array](tasks.json) uses stable KF identifiers and empty completion-evidence lists. The paths in that array refer to this page's eventual repository destination, `docs/games/keepers-frame/TODO.md`.

## Actionable cards

### KF-01 · Choose and record the one-minute return experiment

**P0 · proposed · research / product**\
**Proposed owner:** Product/design lead. **Depends on:** KF-02. **Human participants required:** no.

**Deliverable:** A one-page decision brief selecting, revising or declining the remembered-action experiment before any game source change.

**Acceptance criteria:**

- [ ] Answer all three product questions as hypotheses: why play, why choose this browser experience, and what distinctive action/consequence/payoff it may offer.
- [ ] Compare the proposed remembered-action return with a neutral routine task and a no-new-return option; state the strongest substitute and the failure that would make us stop.
- [ ] Acknowledge 2/6 required competitors with partial gameplay and zero human tests; explicitly record the unresolved research gaps or time-boxed pilot rationale.
- [ ] Record decision owner, date, intended audience/occasion, scope, and experiment decision before releasing KF-08 or KF-09.

### KF-02 · Maintain the six-competitor gap ledger

**P0 · proposed · research / competitors**\
**Proposed owner:** Research lead. **Depends on:** none. **Human participants required:** no.

**Deliverable:** An edition-specific V1–V6 comparison ledger and a proposed future research queue, with source links and exact observed endpoints.

**Acceptance criteria:**

- [ ] Keep Sort the Court! Poki and older itch sessions separate; retain V1 and V2 as partial, with Six Cats' tool-imposed stopping explicitly recorded.
- [ ] Keep Event[0], TOEM, Townscaper and Rhythm Doctor source-only/unplayed; native access, purchases, installation and new gameplay are deferred in this planning pass.
- [ ] For every slot state the competitive role, family, action/consequence question, missing journey stages and what evidence could change the product decision.
- [ ] Retain six distinct titles, at least four broad families, at least two outside narrative/deduction, no more than two per family and at most one occasion comparator; any future reserve promotion needs a reason and a recalculated roster.

### KF-03 · Specify the return state and action contract

**P0 · proposed · core / gameplay**\
**Proposed owner:** Systems designer. **Depends on:** KF-01. **Human participants required:** no.

**Deliverable:** A rules table and short player journey for the first rescue, both remembered-action returns and neutral control.

**Acceptance criteria:**

- [ ] Cover first/return visit, private/archive choice, prior peek/no peek, invitation, accepted action, visible result and stopping state.
- [ ] Private history invites placing the folded letter in a sheltered recess; archive history invites pinning an approved dedication on the harbour-facing edge.
- [ ] Each branch offers one bounded placement with comparable lean/place interactions and care; both are legitimate outcomes and neither repeats the unchanged ferry puzzle.
- [ ] Retain evidence-gated first rescue, external clue log, safe retries and no timer; dialogue never grants an invalid mechanical success.

### KF-04 · Write the invitation, acknowledgment and quiet ending

**P0 · proposed · narrative**\
**Proposed owner:** Narrative designer. **Depends on:** KF-03. **Human participants required:** no.

**Deliverable:** A reviewed script for both return branches, prior-intrusion variants, neutral control and end/return copy.

**Acceptance criteria:**

- [ ] Each experimental acknowledgment names the player's specific earlier choice and the action now offered; no generic praise substitutes for causality.
- [ ] Both private and public routes receive equivalent warmth and narrative care; public sharing is explicitly permitted by Iona.
- [ ] Prior uninvited reading is acknowledged truthfully without erasing it through later consent or making privacy the only morally rewarded ending.
- [ ] The control omits prior-choice reference while matching interaction count and approximate length; copy promises authored interaction rather than free AI chat or uploaded-photo animation.

### KF-05 · Storyboard the object, invitation and visible consequence

**P0 · proposed · art**\
**Proposed owner:** Visual/interaction artist. **Depends on:** KF-03, KF-04. **Human participants required:** no.

**Deliverable:** An annotated before/invitation/placement/after board for both returns using the existing portrait and frame.

**Acceptance criteria:**

- [ ] Show an offered gesture, folded letter/recess and approved dedication/harbour edge as clearly distinguishable states.
- [ ] A reviewer can identify the changed object and its location without the ending paragraph; any such review remains design review, not human-test evidence.
- [ ] Preserve the existing visual language and first-visit clue concealment; avoid adding portraits, decorative animation systems or a second full scene.
- [ ] Include narrow-screen composition and static reduced-motion frames; pair object change with readable text so color or motion alone carries no essential state.

### KF-06 · Specify equivalent touch, keyboard and static interaction

**P0 · proposed · ux / accessibility**\
**Proposed owner:** UX/accessibility designer. **Depends on:** KF-03, KF-05. **Human participants required:** no.

**Deliverable:** An interaction specification covering discoverability, focus, labels, target sizes, announcements and mobile composition.

**Acceptance criteria:**

- [ ] The same meaningful action is available through visible touch controls and keyboard; hover and animation are optional.
- [ ] Keep the changed object, invitation and action response visible together at 390×844 where practicable; specify any necessary scrolling instead of hiding consequences below the portrait.
- [ ] Describe focus after start, placement, ending and reset; distinguish accessible names, state text and live announcements without duplicating confusing speech.
- [ ] Define manual screen-reader and real-phone checks separately from Chromium emulation; unperformed checks remain unknown rather than inferred passes.

### KF-07 · Design minimal memory and migration behavior

**P0 · proposed · engineering / persistence**\
**Proposed owner:** Rules/persistence engineer. **Depends on:** KF-03. **Human participants required:** no.

**Deliverable:** A versioned local-memory schema, migration table and failure/recovery matrix for the approved return.

**Acceptance criteria:**

- [ ] Preserve private/archive and prior-peek history; define whether return placement is pending or performed and how both display after reload.
- [ ] Specify deterministic migration from every valid v1 memory, malformed/unknown versions, absent data and bounded visit counts.
- [ ] Blocked storage never prevents play; text accurately distinguishes open-page memory from reload persistence, and forgetting removes all experiment-related local state.
- [ ] Assign one schema owner and keep experimental condition assignment explicit and reproducible without introducing accounts, backend analytics or additional personal data.

### KF-08 · Implement the approved remembered-action return

**P0 · conditional · engineering / core**\
**Proposed owner:** Rules/persistence engineer. **Depends on:** KF-01, KF-03, KF-04, KF-06, KF-07, KF-14. **Human participants required:** no.

**Deliverable:** A later, separately authorized game change implementing the approved state table, local persistence and neutral condition.

**Acceptance criteria:**

- [ ] Start only after KF-01 records the experiment decision and later source work is authorized; this planning task implements nothing.
- [ ] Rules accept only the invited action for the active return branch; invalid actions cannot complete or corrupt memory.
- [ ] Placement survives a real reload when storage works; legacy, malformed and blocked-storage cases follow KF-07, and forgetting restores a fresh encounter.
- [ ] Meaningful state-transition tests cover private/archive × peek/no peek, repeated input, replay, migration and control; preserve the first rescue and safe recovery.

### KF-09 · Integrate art, controls and return feedback

**P0 · conditional · engineering / integration**\
**Proposed owner:** Frontend integrator. **Depends on:** KF-04, KF-05, KF-06, KF-08. **Human participants required:** no.

**Deliverable:** A later integrated browser candidate joining approved assets, script and rules with a reproducible condition selector.

**Acceptance criteria:**

- [ ] Renderer follows rules state; source ownership and the schema contract are reconciled before integration.
- [ ] Both return branches show the correct object, invitation, placement and acknowledgment without changing the first-rescue clues.
- [ ] Keyboard, touch and reduced-motion paths match the specification; stale dialogue or a delayed visual update cannot contradict the saved state.
- [ ] The neutral return has comparable length, controls and art quality; condition assignment is recorded and cannot accidentally change during a session.

### KF-10 · Verify the complete journey and evidence provenance

**P0 · conditional · qa**\
**Proposed owner:** QA lead. **Depends on:** KF-09. **Human participants required:** no.

**Deliverable:** A dated functional/visual verification record for the exact integrated revision, including unresolved coverage limits.

**Acceptance criteria:**

- [ ] Exercise first rescue, a natural wrong signal/retry, both final choices, all peek histories, immediate return, real reload, repeated placement and forget through visible controls.
- [ ] Run the rule suite and browser checks; preserve the historical baseline of 8 rule tests and 13 recorded observations as prior-review evidence, and explain any later test changes.
- [ ] Check desktop, 390×844 touch emulation, keyboard/reduced motion and blocked storage; attach error listeners to every tested context and label physical-phone/screen-reader results separately.
- [ ] Every record includes actual run date, build revision, device/browser, actions and outcomes; remove or clearly override the browser runner's historical hardcoded date in future evidence.

### KF-11 · Prepare a fair human comparison and recording sheet

**P0 · proposed · research / protocol**\
**Proposed owner:** Playtest/research lead. **Depends on:** KF-01, KF-02. **Human participants required:** no.

**Deliverable:** A session protocol, consent wording, neutral questions, condition assignment plan and empty participant sheet.

**Acceptance criteria:**

- [ ] Target six fresh humans for enacted memory and, if feasible, six different humans for neutral return; define assignment and report actual N and branch imbalance.
- [ ] Hold first rescue, art quality, control scheme and exposure length comparable; document that the package comparison cannot isolate line, object and permission effects.
- [ ] Observe any voluntary return before asking remaining participants to open the return; record later exposure as prompted and ask neutral questions such as 'What changed?' and 'What caused that?'.
- [ ] Predeclare the diagnostic gate of at least 4/6 completing unaided and explaining choice-to-action causality, plus absence of recurring AI/photo expectation errors; fewer than six cannot pass the gate and this is not statistical or retention proof.

### KF-12 · Run the enacted-memory and neutral-return sessions

**P0 · blocked_human · human / comparison**\
**Proposed owner:** Human playtest facilitator. **Depends on:** KF-10, KF-11, KF-15. **Human participants required:** yes.

**Deliverable:** Consented human observation rows and a condition-by-condition synthesis linked to the tested revision.

**Acceptance criteria:**

- [ ] Requires real, willing participants and a verified candidate; no human sessions have been recorded and actual participant availability remains unconfirmed. Agent roleplay cannot fill rows.
- [ ] Record condition, build, branch, prior genre exposure, device, order, assistance, completion, spontaneous/prompted return, causal explanation and permitted verbatim response.
- [ ] Report actual N and all failures; if neutral recruitment is unavailable, label the enacted-memory sessions a single-condition pilot with no comparative conclusion.
- [ ] Apply the predeclared diagnostic gate, preserve contrary cases, and make no enjoyment, market-demand, physiological or day-two retention claims from agent prose or same-session clicks.

### KF-13 · Measure a genuine later revisit if separately arranged

**P1 · blocked_human · human / followup**\
**Proposed owner:** Research lead. **Depends on:** KF-12. **Human participants required:** yes.

**Deliverable:** An optional later-session recall/revisit record with the elapsed interval and invitation history.

**Acceptance criteria:**

- [ ] Arrange follow-up only with consenting participants and an agreed protocol; no outreach or invitations occur during this planning pass.
- [ ] Distinguish spontaneous later return, an invited follow-up and an immediate in-session restart; record missing participants without inventing outcomes.
- [ ] Record whether the participant remembers the specific choice, recognizes the persisted object and finds an available action meaningful.
- [ ] Use findings as qualitative later-session evidence, not a retention rate or a requirement to add daily rewards; leave the result unknown if follow-up does not happen.

### KF-14 · Assign file ownership and review handoffs

**P0 · proposed · team / ownership**\
**Proposed owner:** Coordinating lead. **Depends on:** KF-01. **Human participants required:** no.

**Deliverable:** A proposed role/file map, integrator assignment and shared handoff checklist for any later authorized build.

**Acceptance criteria:**

- [ ] Give one owner each for rules/schema, content, renderer, art/layout and verification; name one integrator for cross-cutting contracts.
- [ ] Record proposed human assignees separately from roles; do not imply staffing or commitment has been confirmed.
- [ ] Every handoff identifies files, revision, changed contract, validation command/result, evidence and open limitation; coordinate schema changes before parallel edits.
- [ ] Keep planning artifacts separate from gameplay branches and preserve prior records; this plan makes no repository write, branch switch, purchase or deployment.

### KF-15 · Prepare a browser pilot package with truthful entry copy

**P1 · conditional · distribution**\
**Proposed owner:** Release/UX owner. **Depends on:** KF-10, KF-11, KF-14. **Human participants required:** no.

**Deliverable:** A versioned review archive and distribution checklist for a later pilot, without publishing it.

**Acceptance criteria:**

- [ ] Package bundled assets with index.html at the archive root, record exact revision, and distinguish static-host review from a future itch.io HTML submission.
- [ ] Explain authored portrait interaction, local-only memory, forgetting and storage failure; the one-minute return remains a design target until humans supply timing data.
- [ ] Record current submission/technical requirements only when verified in later authorized research; assess CrazyGames separately rather than assuming itch.io rules apply.
- [ ] Include control/viewport notes, review instructions and known limits; no account setup, uploads, external analytics, native distribution or public gameplay release is performed by this planning work.

### KF-16 · Decide advance, revise or stop from observed evidence

**P0 · conditional · product / decision**\
**Proposed owner:** Product/design lead with research and QA. **Depends on:** KF-02, KF-12, KF-14. **Human participants required:** no.

**Deliverable:** A short decision record and updated task board linking actual observations, counterexamples and remaining gaps.

**Acceptance criteria:**

- [ ] Compare results with KF-01 and the predeclared human diagnostic gate; report actual sample and whether a control exists.
- [ ] If appearance is recalled but the causal action is not, revise or stop the relationship experiment before expanding content; if both conditions work similarly, do not claim memory won.
- [ ] Keep six-competitor coverage status independent from prototype QA and human-test counts; no completion percentage erases the 2/6 partial baseline or unresolved native studies.
- [ ] Name the next bounded decision and owner, or stop; later follow-up is optional, and providers, photo uploads, voice/LLM chat, extra portraits and monetization remain deferred without a new evidence-backed scope.

## Keep outside this iteration

Photo uploads and depth inference, real-time avatar providers, LLM/free-text or voice dialogue, extra portraits, native delivery, monetization, daily rewards and a full second puzzle remain deferred. Native competitor access is also deferred rather than assumed available. Old provider, pricing and availability claims are dated research, not current verification; see the [qualified freshness note](https://github.com/PaperStrange/IndiaGames/blob/0b35e3fb23bef222f3f3cae72d2b78f6ab72d18b/vivid-2.5d-photo-game/research/09-freshness-update-2026-10-12.md#L2).

The next evidence needed is whether people notice and understand a remembered choice becoming a specific action. No task on this page reports new gameplay, recruited participants, purchases, source changes or a published gameplay build.


## Candidate staging and official release

These tasks implement the shared [release policy](../../RELEASE-POLICY.md). `master` is the pre-commit candidate branch; `main` contains the hub and approved official versions. The six-session thresholds are formative release decisions, not proof of market demand or retention. No human sessions are supplied yet.

### KF-17 — Stage one immutable candidate on master

**Perspective:** Production · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Release integrator\
**Depends on:** KF-10, KF-11\
**Deliverable:** A versioned release-candidates/keepers-frame/<version>/ package on master, built from the owning game branch.

- [ ] Record the exact source SHA, version, player-facing notes, build inventory and hash; include a portable build/index.html and only intended files.
- [ ] Use the release-candidate template and staging validator. Preserve the predeclared human-session protocol before recruiting; staging may contain pending evidence and is not an official release.
- [ ] Keep the previous candidate and source branch recoverable, push master without force, and verify its remote SHA. Do not merge the whole game branch into master or main.

**Completion evidence:** none; future release work.

### KF-18 — Review the exact candidate against the human release gate

**Perspective:** Human playtesting · **Priority:** P0 · **Status:** `blocked_human`\
**Owner role:** Human playtest facilitator + independent reviewer\
**Depends on:** KF-17\
**Deliverable:** A complete human-playtest.json and linked anonymized records for the exact packaged build, with a recorded approve/revise/stop decision.

- [ ] Six predeclared individual players: at least 4/6 each both complete the return unaided and explain how their earlier choice changed the return. At most 1/6 expects unrestricted AI interaction after the actual entry copy. Record denominators and the paired per-player outcomes.
- [ ] Include every one of the six predeclared sessions, distinct pseudonymous participant IDs, raw observations and assistance. An incomplete, abandoned or assisted attempt cannot be silently replaced or counted as unaided success.
- [ ] Zero unresolved critical bugs; manually check actual browser entry, core journey, failure/retry, keyboard, and one physical mobile/touch device. Record measured duration and issues rather than inferring results from automated checks.
- [ ] An independent human reviewer inspects the evidence and signs the build-specific approval. Existing pilot sessions may be reused only if the protocol was predeclared, participants and required outcomes are recorded, and the artifact hash matches exactly; changed builds need revalidation.
- [ ] Run full candidate validation. A failed gate stays on master; agent sessions and synthetic test fixtures cannot satisfy human evidence.

**Completion evidence:** none; future release work.

### KF-19 — Promote only the approved game version to main

**Perspective:** Distribution · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Release maintainer\
**Depends on:** KF-18\
**Deliverable:** A reviewed official release package, registry entry, GitHub version and release-note links, plus a verified playable Pages URL.

- [ ] Copy only the approved candidate package into releases/<game>/<version>/ on main. Pin its immutable ancestor commit on master; preserve all previous official versions and registry entries.
- [ ] Open a main promotion PR with human approval and gate results. Required owner review and release-gate must pass; do not auto-merge or include unrelated candidates.
- [ ] After the human-approved merge, verify automated GitHub release publication, tag target, notes, registry links and the deployed Pages build. A push or draft link alone is not a verified official delivery.
- [ ] If publication fails, preserve the approved artifact, report the actual failure and rerun only the failed publication step. Never rewrite a released version; publish corrections under a new version.

**Completion evidence:** none; future release work.
