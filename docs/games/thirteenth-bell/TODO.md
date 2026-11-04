# The Thirteenth Bell — Mina-route experiment and human handoff

## Next iteration · launch target 20 November 2026

Use the [game-specific human test list, blank records and iteration plan](https://github.com/PaperStrange/IndiaGames/blob/fce070bd9ee3006f0a017b9c33ee11f5b5133657/docs/gamejam/launch-2026-11-20/README.md), alongside the [cross-game launch calendar](../../launch/2026-11-20/README.md). Candidate freeze: **11 November**; go/no-go: **16 November**. Human roles and results remain pending. This schedule adds no completed gameplay or human-validation claims; existing task status and evidence below remain authoritative.

## Current milestone · 27 October 2026

Option A, Prepare Mina’s route, was selected on October 24. The bounded scene is implemented and verified, and candidate 0.1.0 is staged on master with human approval pending; the manifest pins its exact source and artifacts. Original and previous Contrast remain comparison references. No human results or official release are implied.

[Current playtest packet](https://github.com/PaperStrange/IndiaGames/blob/1f0fe0798ca991a05686e17c08f043d2c225f162/docs/gamejam/milestone-2026-10-27/README.md) · [Team milestone](../../milestones/2026-10-27.md) · [Current task status](tasks.json)

The current packet reconciles the October 22 research uploads with edition, substitution and partial-journey limits. Underlying play dates remain explicit. The detailed baseline below is retained for design rationale and acceptance criteria; its historical coverage/status statements do not replace the current packet, task JSON or source manifest. No human facilitator or independent reviewer is assigned.

## Preserved design rationale and acceptance criteria

**Historical planning baseline — 21 October 2026.** No game implementation was active in that snapshot. The proposed next experiment is small: **witness a Bell Square event → retain usable knowledge → spend the earned minute on an intervention → see Mina reach a different outcome.** Settle that experiment before coding. The six-title research gate applies before final competitive conclusions; incomplete coverage does not automatically prohibit a disclosed, bounded design specification.

[Back to project overview](../../../README.md) · [Machine-readable cards](tasks.json) · [Earlier Bell proposal][old-plan] · [Historical evidence audit][old-audit]

## What is established, and what remains a hypothesis

The source snapshot is [`c28b29771ed17661c43437eed3042903afc687cf`][tip] on `the-thirteenth-bell`. A read-only Git comparison against `1be02bc9fc0b846e4c24cb1ceb67ddd69ebfe590` found **no changes under `index.html`, `css/`, `js/`, `assets/`, `build.mjs` or `tests/`**. The delta adds eight text records, eight PNG files and one trailer under `docs/gamejam/competitor-plays-2026-10-20/`. This planning pass reads records; it does not replay competitors, execute the video or rerun the game.

The prior archived review reported build success, 3/3 rule tests, 17 static checks and 19 smoke assertions, plus an existing-control journey. Those are historical functional results, not fresh tests of a new feature, human enjoyment or phone usability. Current source still selects scenes by loop/district while forecasts select by phase; its “Witnessed” forecast memory is populated on a boundary even without a Square visit. That explains why a schedule reveal and the actual encounter can disagree. [Scene selection][engine-scene] · [Forecast memory][engine-memory] · [Prior review][old-plan]

| Rule or behavior | Original reference | Current Contrast comparison | Proposed slice |
|---|---|---|---|
| Event identity | Loop-keyed scene, fixed phase forecast | Same mismatch remains | One real Square Dawn→Noon transition, independent of answer |
| Repetition | Momentum skip can bypass an unseen next-loop scene | New loop-specific scenes retain full context; same-world repeat can compress | Preserve Contrast’s new-scene protection |
| Extra time | Skip costs a visit/phase and provides no selected scene effect | Once per loop after loop one, 1 Momentum buys a visit on an earlier-visited route | Give that extra visit a specific person-level use |
| Timing and risk | Immediate result, forecast on Continue | Commitment/batch resolution; borrowed visit holds phase/forecast, except Fracture 4 | Preserve atomic spend, cancellation, once-only rewards and catastrophe override |
| Memory | Carried objects/bonds mostly seed UI/inventory | Separate in-memory mode states; forecast reveals persist across midnight | One observed clue and one outcome receipt; no two-token hidden key |
| Reload/restart | No save across reload | No save across reload; restart clears run | Preserve and disclose; save system deferred |

Sources: [borrow eligibility][borrow], [commitment and batch][engine-batch], [restart/mode isolation][engine-reset].

## What the new Bell records change

| Slot | Strongest supported evidence at this snapshot | Delta and design implication |
|---|---|---|
| B1 Detective: Again!, creator web frame | **Recovered original report:** one case reaches “You found the killer! Click to replay” at game timer 13:50; clean opening verified by reload. The in-game replay click was blocked. Three older captures survive. | The original report is no longer missing. Its pre-action theory was wrong and clicking the man triggered the solve; that supports checking inference versus lucky hotspot selection, not assuming a deeply learned deduction. Later retries remain partial. [Original][detective] · [Retries][detective-partial] |
| B2 Outer Wilds, base game | Source-only; no expedition/loop record. | World-exploration comparison remains open. No license/purchase assumed. [Roster][matrix] |
| B3 Into the Breach, base product/settings recorded | Source-only; no campaign attempt. | Visible-intent/sacrifice contrast remains open. No native play implied. [Roster][matrix] |
| B4 Slice & Dice, intended browser demo | Creator-listing access check reports download-only demos; storefront facts and an archived **Steam store trailer**, not the YouTube 3.0 cut. No gameplay. | Correct the access premise for the checked listings. Free native demo differs from paid full game; snapshot price/ratings are not current verification or demand evidence. The trailer was not watched for this plan and supplies zero player coverage. [Access][slice-access] · [Market record][slice-market] |
| B4 candidate replacement: Rogue Fable IV, browser v0.26 | Two complete runs ending in death, turns 79 and 117, Upper Dungeon 2/4; second-run terrain/healing choices differ. No campaign victory, third run or saved session images. Record gives only a generic itch.io URL. | The incoming package explicitly declares this substitution. Record the roster decision and exact-title URL before using an adjusted denominator; it was not a named matrix reserve. Tactical risk is relevant, party-dice allocation remains unanswered. Randomized runs and tooling prevent attributing the turn increase solely to learning. [Record][rogue] |
| B5 Seedship, creator-linked web v1.4.0 | One terminal run: 9 planets, Dearth planetfall, colony collapse and 2,873 score. Title/share links seen; neither a second run nor sharing was performed. Seven in-session capture references, no banked files. | Adds a complete colony/end-state record. Explicit human stakes plus tradeoffs motivate making the minute’s beneficiary concrete; the report is an agent account, not human empathy evidence. [Record][seedship] |
| B6 A Dark Room, browser original | Raw record reaches trading post, population loss/recovery and a 400-fur compass wall; no dusty path or ending. Older/reshoot images only. | The new README incorrectly says “no stranger”; the raw record explicitly includes stranger/builder and much later progression. Preserve the detailed endpoint and flag the conflict. Refiling is not new play. [Raw][dark-room] · [Package index][intake] |

**Coverage arithmetic:** the original required Bell roster now has **3/6 titles with gameplay evidence (B1, B5, B6), across three broad families**; two have a completed bounded endpoint and B6 is partial. With an explicitly recorded B4→Rogue Fable IV substitution, the adjusted set would have **4/6 with gameplay across four families**, including three titles with completed bounded units. Both sets still fail the six-title gate; four families alone does not complete the study. Do not promote Pawnbarian, Sort the Court, PROMPTBOX or other reserve/pool titles silently. Detective’s recovered report improves provenance rather than adding a new title or session.

The older PROMPTBOX observation→intervention→outcome chain remains useful, but its successful singing scene is not a proven full case; DOUSE also worked, so a mandatory precision-timing solution is unsupported. Demonology/Red Pearls motivate checkable inference and externalized facts without supplying Bell human outcomes. [Earlier evidence discussion][old-plan]

## Three product questions: proposed answers, with counterexamples

| Question | Working answer | What could reject it |
|---|---|---|
| Why would someone play this kind of game? | A solo browser visitor may want a compact mystery where a noticed cause becomes a better second plan and helps a recognizable person. Detective supplies a brief visual reveal; Seedship supplies legible responsibility; Rogue Fable IV supplies applied knowledge amid risk. | Detective’s abrupt/accidental solve warns that clicking can impersonate deduction. A Dark Room’s reported maintenance wall warns about repetition. Bell players may recall only a currency or follow a highlight without understanding. No human motivation evidence is present. |
| How could it differ on a game platform? | In an itch.io browser context, combine quick entry, one repeated visible event, an earned spare action and a concrete changed outcome. Contrast with native exploration/tactics on access/session cost, while acknowledging that browser entry, time loops and journals are common. CrazyGames is a separate context pending current requirements. | Six-title comparison is incomplete, human duration is unmeasured, phone interaction and reload loss may undermine a short-visit promise. Do not claim uniqueness, demand, superior conversion or platform readiness. |
| What unusually distinctive experience could we deliver? | Test the specific remembered sentence: “I saw why Mina’s route failed; I used my saved minute to change it; I can see where she ended up.” This is a proposed player story, not a quote. | If the clue does not change the decision, the extra action has no opportunity cost, or the outcome is only prose/meter gain, the signature moment has not landed. Choose among the alternatives below before building. |

| Bounded story | Signature action → consequence → payoff | Precedent / cost / likely failure |
|---|---|---|
| **A · Prepare Mina’s route (recommended)** | Watch the crowd close an alley; next loop prepare another route before Noon, using the borrowed visit to preserve an expedition action; Mina and crate reach a visibly different destination. | PROMPTBOX’s intervention chain + Seedship’s named stakes. One event, clue, conditional action, outcome pair. Fails if highlighting replaces reasoning or the extra visit has no visible use. |
| B · Warn Brann in time | Observe the same blockage; use the clue to warn Brann before he closes the market; see Mina pass while the normal town action remains available. | Visible intent/sacrifice is a hypothesis until tactics coverage arrives. Similar state cost but extra dialogue dependence; fails if generic persuasion always works. |
| C · Help at an explicit cost | Learn the blockage, then choose a normal visit helping Mina instead of the expedition; compare that lost opportunity with an earned minute that allows both. | Seedship’s explicit tradeoffs. Minimal additional art, more careful opportunity-cost writing; fails if “both” makes the choice trivial or frames helping as a morality score. |

Only one story is implemented after settlement. Alternatives are design options, not added scope.

## Compact intended journey and state contract

**Entry → encounter Square at Dawn → witness the Noon blockage → keep one sourced clue through midnight → predict a different plan → choose a normal or borrowed intervention before Noon → observe the changed or missed outcome → explain the cause → choose retry/leave.** The pilot records actual route and stops; this is an intended design, not a completed playthrough.

| Situation | Intended state and player-facing result |
|---|---|
| Ordinary Dawn boundary, any forecast answer | Square’s event occurs. Being elsewhere does not prevent the world change or manufacture an eyewitness clue. |
| Player sees the specified event in Square | Store one clue with event/loop/phase provenance; later journal retrieval offloads factual memory. |
| Loop two, clue present, before Noon | Permit the one preparation action. A normal visit uses the phase; a valid borrowed visit saves the phase so an expedition action still fits. |
| Clue absent / arrival late / Momentum absent | Explain the relevant limit honestly. Ordinary action and missed-opportunity paths remain legible; no arbitrary two-token requirement. |
| Borrowed action, Fracture below 4 | Spend once, keep forecast locked and unresolved, apply the action consequence, then let the next normal boundary resolve the forecast once. |
| Fracture reaches 4 | Midnight overrides the held phase; make the interrupted opportunity visible and carry only the state the settled contract allows. |
| Noon after an eligible intervention / after a miss | Show the corresponding Mina destination and a brief action→effect receipt. Keep both outcomes specific and recoverable. |
| Restart / mode switch | Restart clears new-run knowledge; modes stay isolated. Cross-midnight clue persistence is explicit. Reload does not promise save. |

The exact blocking cause, visibility trigger, timing and recovery wording are TB-03 decisions, not claims that the current runtime already implements this table.

## Work order and decision gates

1. **Plan ready:** TB-01 reconciles intake; TB-03 settles the causal contract, story and scope. TB-02 can continue coverage planning in parallel. No source implementation starts before settlement.
2. **Build ready:** TB-04–TB-10 are conditional work. One systems owner integrates state changes; narrative, art and UX use agreed seams.
3. **Pilot ready:** TB-11 passes the causal/regression/accessibility checks and TB-12 fixes the observation protocol. Human availability is a separate prerequisite.
4. **Decision ready:** TB-13 observes six real people, three per first-build order, against current Contrast. Gates: at least 4/6 explain cause and predict consequence; at least 4/6 use the earned action uncoached and explain Fracture; at least 3/6 recall Mina’s specific changed outcome; zero repeatable wrong-state, duplicate-reward or inaccessible-action failures. Failures lead to revise/defer, not more content. These are formative thresholds, not statistical validation.
5. **Claims/release ready:** TB-14 prepares delivery only after the tested decision. Final comparative claims still require the documented six-title/four-family study or an explicit report that it remains unmet. TB-15 keeps decisions and evidence separate. This plan authorizes no launch, purchase, recruitment message or deployment.

## Task cards

`P0` protects the central causal contract or a release/pilot gate; `P1` supports comprehension and evidence; `P2` prepares later distribution. `proposed` means planning work is specified, `conditional` means it follows a settled design and dependencies, and `blocked_human` needs real participants. None means active or completed. Owner names are roles, and completion evidence starts empty.

### TB-01 · Reconcile the October 20 evidence delta and the B4 substitution

**Perspective:** Research / evidence provenance · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Bell research lead\
**Depends on:** None\
**Deliverable:** A versioned B1–B6 ledger, source-conflict note and explicit roster decision for Rogue Fable IV.

- [ ] Record Detective’s recovered October 6 SOLVED report and reload restart separately from October 12–13 partial retries; do not describe the in-game replay control as verified.
- [ ] Record Seedship v1.4.0 as one terminal colony run with 9 planets and score 2,873; record no actual second run, share action or banked session screenshots.
- [ ] Preserve the original roster count of 3/6 gameplay titles across three families. If Rogue Fable IV is adopted, record the B4 replacement, v0.26 browser build, precise title URL/provenance gap, tactical relevance and unanswered party-dice allocation question; only then label the adjusted count 4/6 across four families.
- [ ] Use A Dark Room’s raw trading-post/compass endpoint; explicitly flag the package README’s contradictory “no stranger” summary. Do not count duplicated records/images as new sessions.
- [ ] Label Slice & Dice access findings and archived Steam trailer as October 20 market evidence, not gameplay; scope the no-browser finding to the checked creator listings and keep the free native demo distinct from the paid full game.

**Completion evidence:** none; proposed work.

### TB-02 · Plan the remaining exploration and tactics comparisons

**Perspective:** Research / comparison design · **Priority:** P1 · **Status:** `proposed`\
**Owner role:** Bell research lead + coordinator\
**Depends on:** TB-01\
**Deliverable:** An access-conditional study plan and claim ledger for Outer Wilds, Into the Breach and any explicitly selected replacement.

- [ ] List exact edition, legal access/device needs, available input/audio, prior exposure, complete activity boundary and remaining question for each study; authorize no purchases, installs or play through this card.
- [ ] Preserve Outer Wilds’ self-directed expedition question and Into the Breach’s visible-intent/sacrifice question. A proposed reserve must name the question it leaves unanswered and recalculate distinct titles and family limits.
- [ ] For future sessions, capture at least one prediction before an action, a natural mistake/recovery if encountered, exact terminal or stopping state, and actual retry separately from an invitation.
- [ ] Attach the full coverage gate to final competitive claims: six distinct titles, at least four families, at least two outside narrative/deduction, no more than two per family, and two deep comparisons from different families with complete bounded units. Bounded design specification may proceed with disclosed gaps after the experiment is settled; source-only titles never satisfy firsthand coverage.
- [ ] Keep agent interpretations, critic claims, storefront facts, screenshots and human accounts in separate evidence fields.

**Completion evidence:** none; proposed work.

### TB-03 · Settle the two-loop causal experiment before implementation

**Perspective:** Product / gameplay direction · **Priority:** P0 · **Status:** `proposed`\
**Owner role:** Bell design lead + coordinator\
**Depends on:** TB-01\
**Deliverable:** A chosen concept, state/choice table, scope boundary and signed-off comparison protocol.

- [ ] Choose between the three bounded stories above; retain one Bell Square Dawn→Noon event, Mina and Brann, one observed clue, one intervention and one changed outcome.
- [ ] Specify how an actually witnessed blockage produces a provenance-bearing clue, how that clue permits the next-loop intervention, and how ordinary versus borrowed visits change the opportunity cost.
- [ ] Cover correct/wrong/blank forecasts, absent witness, late arrival, no Momentum, missed intervention, Fracture 4, revisit, restart and mode switching; preserve understandable failure and recovery.
- [ ] Use current Contrast as the main comparison and keep an immutable Original reference. Do not attribute Original’s skip/journal/batching differences to the new experiment.
- [ ] Record the unresolved research/human questions and a keep/revise/defer criterion. The plan must be explicitly settled before any game source, art asset or gameplay implementation starts.

**Completion evidence:** none; proposed work.

### TB-04 · Make Bell Square’s Dawn→Noon event occur in the world

**Perspective:** Engineering / event state · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Bell systems owner\
**Depends on:** TB-03\
**Deliverable:** One bounded event transition and a documented clue-provenance schema, after TB-03 is settled.

- [ ] Event state changes at the selected ordinary phase boundary regardless of forecast answer; forecast text, encounter and map agree about what happened.
- [ ] Separate scheduled/revealed information from personally observed evidence. Grant the clue only through the specified witnessed scene, with source event, loop and phase recorded.
- [ ] A player elsewhere can discover the changed Square state later without receiving retroactive eyewitness credit or a falsely worded “Witnessed” message.
- [ ] Do not build a general NPC schedule simulator, extra district, meter or item-key framework; leave other authored loops readable and the existing ending reachable.

**Completion evidence:** none; proposed work.

### TB-05 · Make one learned intervention change Mina’s outcome

**Perspective:** Gameplay / knowledge and action economy · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Bell gameplay designer + systems owner\
**Depends on:** TB-04, TB-06\
**Deliverable:** One clue-gated route preparation action and two visible outcomes.

- [ ] Without the witnessed clue, present an honest unavailable-action explanation without revealing the answer. With the clue, expose one meaningful intervention before Noon; no extra carried-token key is required.
- [ ] A regular visit can perform the intervention at its normal phase cost. A valid borrowed visit fits it beside a normal expedition action; the extra action creates an opportunity the player can explain.
- [ ] Spend exactly 1 Momentum atomically on commitment, once per loop after loop one and on a previously visited route; reservation and cancellation spend nothing.
- [ ] A borrowed action holds phase and forecast only while Fracture remains below 4. Fracture 4 still forces midnight; the next real boundary resolves a locked forecast and rewards it at most once.
- [ ] Show the missed opportunity and successful destination as specific Mina outcomes, with a recoverable next plan; do not grade the player’s morality.

**Completion evidence:** none; proposed work.

### TB-06 · Write the clue, intervention and aftermath as a checkable story

**Perspective:** Narrative / character consequence · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Bell narrative designer\
**Depends on:** TB-03\
**Deliverable:** A compact script sheet for two Square states, one action, two outcomes and one receipt.

- [ ] Settle one concrete cause using existing flower/crate/market/alley motifs: what blocks Mina, what the player can observe, why preparation changes it and where Mina ends up.
- [ ] Distinguish observation, prediction, inference and outcome in wording. A correct guess alone never becomes an eyewitness claim.
- [ ] Write ordinary, informed, absent-clue, late and missed-opportunity variants; each references the same cause without adding a second puzzle.
- [ ] Make Brann and Mina’s responses specific to the action. The receipt says what the player did and what changed, without congratulating an unsupported deduction.
- [ ] Preserve the wider game’s tone and avoid new endings, relationship meters, lore branches or long explanatory monologues.

**Completion evidence:** none; proposed work.

### TB-07 · Put the usable clue and its cost beside the next decision

**Perspective:** UX / memory and uncertainty · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** Bell UX writer + interaction designer\
**Depends on:** TB-04, TB-06\
**Deliverable:** A focused action panel and short evidence receipt within the existing journal.

- [ ] Display clue provenance and the pending intervention’s Momentum/Fracture cost near the relevant action; the player should not need to cross-reference the entire people×phase table.
- [ ] Label schedule knowledge, observed fact and untested theory differently in text, not only by color; keep the clue available across midnight and clear it on restart.
- [ ] At the outcome, show a short observation → action → changed destination receipt; do not reveal an unearned solution through a global highlight.
- [ ] Keep the existing Place/Theory journal available while limiting the new feature to one receipt and one local cue; no new top-level dashboard or meter.

**Completion evidence:** none; proposed work.

### TB-08 · Create a small scene kit that makes the route change visible

**Perspective:** Art / visual storytelling · **Priority:** P1 · **Status:** `conditional`\
**Owner role:** Bell art lead\
**Depends on:** TB-03, TB-06\
**Deliverable:** Two Bell Square scene states and one changed-outcome inset, with annotated composition references.

- [ ] Retain the canon map and repeat the same Mina silhouette, crate, redflower and alley landmarks so the later image can be compared with the earlier one.
- [ ] Stage the blocking crowd and alternate destination legibly at desktop, 390px portrait and compact iframe sizes without a full-town repaint or portrait roster.
- [ ] Labels and shape/location cues communicate the change in grayscale and with motion disabled; optional bell/route audio has mute and equivalent text.
- [ ] Provide before/after annotations identifying which visible detail teaches the clue and which confirms consequence. Do not use decorative animation as evidence that the action mattered.

**Completion evidence:** none; proposed work.

### TB-09 · Keep the full decision path reachable and understandable

**Perspective:** UX / accessibility and devices · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Bell accessibility reviewer + UI owner\
**Depends on:** TB-05, TB-07, TB-08\
**Deliverable:** Keyboard, touch-layout, focus and reduced-motion acceptance evidence for both outcomes.

- [ ] Complete witness → clue → intervention → outcome using keyboard alone; focus remains visible, follows modal transitions and returns to the triggering action.
- [ ] Check label associations, state announcements, readable contrast/text, reduced motion and non-color cues; disabled actions state their reason without requiring hover.
- [ ] Check 390×844 portrait and 821×462 iframe layouts, zoom and long-page scroll recovery. State clearly when these are emulated viewports rather than real device observations.
- [ ] Run a real touch-device/Safari check only when the device is available; record unavailable coverage and never turn desktop screenshots into a mobile usability claim.
- [ ] A newly accessible action may not bypass a clue requirement, spend Momentum twice or allow a second borrow.

**Completion evidence:** none; proposed work.

### TB-10 · Preserve restart, loop and mode boundaries

**Perspective:** Engineering / state lifecycle · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Bell systems owner\
**Depends on:** TB-04, TB-05, TB-07\
**Deliverable:** A state ownership/reset table and a small implementation patch with one engine integrator.

- [ ] Define which event, clue and outcome fields persist across midnight, reset on a new run, and remain isolated between Original and Contrast.
- [ ] Prevent double resolution from repeated Continue input or revisits; preserve pending-action guards, new-scene retention, cancel semantics and once-only forecast reward.
- [ ] Retain the existing no-save-on-reload behavior unless separately chosen later; label this limitation in the pilot and distribution notes.
- [ ] One systems owner integrates engine.js; narrative and art contributors work through agreed data/asset seams, not simultaneous changes to the compressed engine.
- [ ] Record base/new commit, build output hash, rollback reference and touched paths. Do not change unrelated districts or repair Original within this experiment.

**Completion evidence:** none; proposed work.

### TB-11 · Verify the cause-and-effect slice and the complete existing path

**Perspective:** QA / causal and regression coverage · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Bell QA owner\
**Depends on:** TB-09, TB-10\
**Deliverable:** A scenario matrix, exact build identifiers and visible-control traces/screenshots.

- [ ] Run the existing build, three echo-time tests, 17 static checks and applicable smoke/journey suites against the new isolated build; historical passing results alone are insufficient.
- [ ] Cover witnessed/unwitnessed clue, correct/wrong/blank forecast, ordinary/borrowed intervention, no Momentum, cancellation, revisit, late/missed opportunity and both Mina outcomes.
- [ ] Cover second-borrow rejection, atomic spend, locked phase/forecast, reward exactly once, Fracture reaching 4, restart, mode switching and retention of unseen new scenes.
- [ ] Re-run the existing full ending and restart through visible controls. Publish exact counts and failures, console errors and artifact links rather than a bare “works”.
- [ ] Block the human pilot on repeatable wrong-state, duplicate-reward or inaccessible-action failures; repair and rerun only the affected checks plus justified regression coverage.

**Completion evidence:** none; proposed work.

### TB-12 · Prepare a six-person formative comparison without teaching the solution

**Perspective:** Research / human pilot protocol · **Priority:** P1 · **Status:** `proposed`\
**Owner role:** Human playtest owner + Bell design lead\
**Depends on:** TB-03\
**Deliverable:** A consent/observation template, counterbalanced build order and predeclared decision sheet.

- [ ] Plan six new participants, three per first-build order: current Contrast then candidate, or candidate then current Contrast. Record genre familiarity, device, prior exposure and any help.
- [ ] Capture the player’s causal explanation and prediction before the result; prompt neutrally. Treat second-build responses as affected by learning and emphasize first-exposure evidence.
- [ ] Record help requests, wrong forecasts, rereading, missed-opportunity reaction, Fracture explanation and optional retry/leave choice. Elicit outcome recall after a two-minute neutral break following each run, before the next build or final debrief; this is short-delay recall, not next-day retention.
- [ ] Predeclare the thresholds below and record the exact denominator. Report candidate-build results separately for the two first-build orders (three each), alongside the six-person total; keep current-Contrast results separate. Do not turn six sessions into a statistical superiority, retention or market-demand claim.
- [ ] Recruitment and consent belong to the human owner when separately arranged. No invitations or external messages are sent by preparing this plan.

**Completion evidence:** none; proposed work.

### TB-13 · Observe six real players and decide keep, revise or defer

**Perspective:** Human pilot / design decision · **Priority:** P0 · **Status:** `blocked_human`\
**Owner role:** Human playtest owner + Bell design lead\
**Depends on:** TB-11, TB-12\
**Deliverable:** Consented raw observations, build-order log and an evidence-linked design decision.

- [ ] Require six actual new participants and TB-11’s passing pilot gate; an agent run or roleplay supplies zero participant rows.
- [ ] At least four of six explain the witnessed cause and predict the intervention consequence before receiving it.
- [ ] At least four of six use the earned action without coaching and explain that Fracture can still end the day; at least three name Mina’s specific changed outcome after the predeclared two-minute break, rather than only extra Momentum.
- [ ] Record zero repeatable wrong-state, duplicate-reward or inaccessible-action failures. Keep all misses/help requests and build-order effects visible.
- [ ] If success comes from memorized answers or highlighting without causal explanation, revise the slice; if the outcome is remembered only as a meter, revise the payoff. Incomplete recruitment leaves the decision pending, not passed.
- [ ] Separate verbatim participant words, observed behavior and interpretation; optional retry is immediate behavior, not delayed return or retention.

**Completion evidence:** none; proposed work.

### TB-14 · Prepare an honest browser pilot package

**Perspective:** Distribution / browser delivery · **Priority:** P2 · **Status:** `conditional`\
**Owner role:** Bell distribution owner + QA owner\
**Depends on:** TB-11, TB-13\
**Deliverable:** A local preview manifest, entry copy and itch.io/CrazyGames readiness checklist with dated sources.

- [ ] State the intended context as an itch.io browser release/pilot; treat CrazyGames as a separate acquisition context whose current technical requirements still need authorized verification.
- [ ] Package the tested portable build with commit/hash, direct launch instructions, viewport/input limitations, no-save-on-reload disclosure and one clear route into the selected comparison build.
- [ ] Measure actual loading/entry behavior when implementation exists; do not reuse the 4–8 minute UI promise as a measured human duration.
- [ ] Use copy about the concrete learned-action payoff; make no uniqueness, preference, retention or market-conversion claim from competitor notes or six formative sessions.
- [ ] Preparing the package does not publish, upload to a portal, add accounts, purchase services or install analytics. Release is a later scoped decision.

**Completion evidence:** none; proposed work.

### TB-15 · Keep the plan, dependencies and evidence reviewable

**Perspective:** Project / handoff and scope control · **Priority:** P1 · **Status:** `proposed`\
**Owner role:** Bell coordinator\
**Depends on:** TB-01, TB-03\
**Deliverable:** A dashboard-ready task export and phase decision log with artifact links.

- [ ] Keep all cards proposed/conditional/blocked_human until their stated prerequisites are met and work is actually assigned; owner roles are not accepted assignments.
- [ ] Record TB-03’s settled design before implementation begins. Separate design readiness, QA readiness, human-evidence readiness and final competitive-claim readiness.
- [ ] For each completed future card, attach the source/build commit, acceptance evidence and open limits; never mark the plan itself as a completed game feature.
- [ ] Reconcile the new Bell evidence addendum with the older audit without rewriting historical claims as though the recovered records had always been present.
- [ ] Defer general schedule simulation, new districts/endings, bond/item frameworks, save/accounts, procedural cases, co-op, generalized art overhaul, paid distribution and analytics backend.

**Completion evidence:** none; proposed work.


## Source links and limits

All source links below are pinned to commits. The new records are agent-produced observations with the capture/edition limitations stated above; agent affective prose is not participant testimony. Store/trailer evidence is market context. The old audit is historical and is superseded only where this addendum identifies a specific delta. No current price, ranking, access claim or human outcome was independently rechecked in this planning pass.

[tip]: https://github.com/PaperStrange/IndiaGames/tree/c28b29771ed17661c43437eed3042903afc687cf
[old-plan]: https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/bell-next.md
[old-audit]: https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/evidence-audit.md
[matrix]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-matrix-2026-10-06.md#L75
[intake]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/README.md
[detective]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/records/detective-again--playtest-report-2026-10-06.md
[detective-partial]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/records/detective-again--player-replay-2026-10-12-partial.md
[rogue]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/records/rogue-fable-iv--player-replay-2026-10-20.md
[seedship]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/records/seedship--player-replay-2026-10-20.md
[dark-room]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/records/a-dark-room--player-replay-2026-10-12-partial.md
[slice-access]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/records/slice-and-dice--access-check-2026-10-20.md
[slice-market]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/docs/gamejam/competitor-plays-2026-10-20/market-research/slice-and-dice--market-research-record-2026-10-20.md
[engine-scene]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/js/engine.js#L85
[engine-memory]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/js/engine.js#L31
[borrow]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/js/echo-time.js#L4
[engine-batch]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/js/engine.js#L91
[engine-reset]: https://github.com/PaperStrange/IndiaGames/blob/c28b29771ed17661c43437eed3042903afc687cf/js/engine.js#L121


## Candidate staging and official release

These tasks implement the shared [release policy](../../RELEASE-POLICY.md). `master` is the pre-commit candidate branch; `main` contains the hub and approved official versions. The six-session thresholds are formative release decisions, not proof of market demand or retention. No human sessions are supplied yet.

### TB-16 — Stage one immutable candidate on master

**Perspective:** Production · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Release integrator\
**Depends on:** TB-11, TB-12\
**Deliverable:** A versioned release-candidates/thirteenth-bell/<version>/ package on master, built from the owning game branch.

- [ ] Record the exact source SHA, version, player-facing notes, build inventory and hash; include a portable build/index.html and only intended files.
- [ ] Use the release-candidate template and staging validator. Preserve the predeclared human-session protocol before recruiting; staging may contain pending evidence and is not an official release.
- [ ] Keep the previous candidate and source branch recoverable, push master without force, and verify its remote SHA. Do not merge the whole game branch into master or main.

**Completion evidence:** none; future release work.

### TB-17 — Review the exact candidate against the human release gate

**Perspective:** Human playtesting · **Priority:** P0 · **Status:** `blocked_human`\
**Owner role:** Human playtest facilitator + independent reviewer\
**Depends on:** TB-16\
**Deliverable:** A complete human-playtest.json and linked anonymized records for the exact packaged build, with a recorded approve/revise/stop decision.

- [ ] Six predeclared individual players: at least 4/6 each explain cause and predict consequence; at least 4/6 each use the earned action uncoached and explain Fracture; at least 3/6 recall a specific Mina outcome after a neutral break of at least 120 seconds. Keep the counterbalanced first-build groups of three visible in the design analysis.
- [ ] Include every one of the six predeclared sessions, distinct pseudonymous participant IDs, raw observations and assistance. An incomplete, abandoned or assisted attempt cannot be silently replaced or counted as unaided success.
- [ ] Zero unresolved critical bugs; manually check actual browser entry, core journey, failure/retry, keyboard, and one physical mobile/touch device. Record measured duration and issues rather than inferring results from automated checks.
- [ ] An independent human reviewer inspects the evidence and signs the build-specific approval. Existing pilot sessions may be reused only if the protocol was predeclared, participants and required outcomes are recorded, and the artifact hash matches exactly; changed builds need revalidation.
- [ ] Run full candidate validation. A failed gate stays on master; agent sessions and synthetic test fixtures cannot satisfy human evidence.

**Completion evidence:** none; future release work.

### TB-18 — Promote only the approved game version to main

**Perspective:** Distribution · **Priority:** P0 · **Status:** `conditional`\
**Owner role:** Release maintainer\
**Depends on:** TB-17\
**Deliverable:** A reviewed official release package, registry entry, GitHub version and release-note links, plus a verified playable Pages URL.

- [ ] Copy only the approved candidate package into releases/<game>/<version>/ on main. Pin its immutable ancestor commit on master; preserve all previous official versions and registry entries.
- [ ] Open a main promotion PR with human approval and gate results. Required owner review and release-gate must pass; do not auto-merge or include unrelated candidates.
- [ ] After the human-approved merge, verify automated GitHub release publication, tag target, notes, registry links and the deployed Pages build. A push or draft link alone is not a verified official delivery.
- [ ] If publication fails, preserve the approved artifact, report the actual failure and rerun only the failed publication step. Never rewrite a released version; publish corrections under a new version.

**Completion evidence:** none; future release work.
