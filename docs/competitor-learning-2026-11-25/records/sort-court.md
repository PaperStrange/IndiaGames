# Sort the Court! — three-day repeat-title study, 25 November 2026

**Evidence status: genuine agent-operated browser session; three in-game days completed. This is a deeper repeat of the previously filed 14 November Day 1 study, not an additional unique competitor.** It is neither a human playtest nor evidence of retention. No source, hidden game state, walkthrough, save modification or outcome injection was used. Public comments were read after the session.

## Edition, scope and method

| Item | Recorded scope |
|---|---|
| Official entry | https://graebor.itch.io/sort-the-court |
| Played edition | Official itch HTML5/Unity WebGL browser build; menu visibly says Version 2.2.0 |
| Environment | Fresh browser context, Chromium 151.0.7922.173, desktop 1280×900, English; strict HTTPS |
| Inputs | Actual pointer and keyboard actions through Playwright; Y/N decisions made after screenshot inspection, Space advances dialogue |
| Session | Entry 02:15:29 UTC; New Game 02:17:12; Day 3 endpoint 02:26:45; browser closed 02:26:56 |
| Timing limitation | About 9m34s from New Game to endpoint includes screenshot inspection, tool latency and deliberation. It is not a human completion-time benchmark. |
| Planned stop | Three completed days or 20 active minutes; stopped at the three-day endpoint |
| Rating snapshot | Official page web fetch on 25 November: **4.7/5, 11,175 ratings**; search service marked page “crawled today.” This is a dated fetched snapshot, not independently polled live telemetry. |
| Edition boundary | Official page directs mobile/languages to an updated Poki edition. No claim here about that edition, phone support, gamepad, downloadable compatibility or full-game endings. |
| Audio/accessibility | Audio was not audibly assessed; no screen-reader, color-vision or motor-accessibility test performed. |

The fixed task was saved before play in the private PLAN.md. The separate action log preserves every actual key and screenshot timestamp, including a few attempted image reads before their files existed; those were tool synchronization errors, not game failures.

## Complete attempted journey

The crown, throne, resource panel and arriving citizens communicate the role before the first decision. The advisor explicitly teaches Y/N, then says to keep citizens happy and increase population, with the Council of Crowns as a distant prospect. This is a meaningful immediate goal, but the opening still takes several Space advances. I initially waited for the advisor to continue automatically; the later Space label clarified the required action. No loss screen occurred.

Resource tuples below are population / happiness / wealth. Numbers are transcribed from visible screens, not extracted from the game.

| Stage | Visible question / action and reasoning | Observed result | What changed in the decision demand |
|---|---|---|---|
| Opening | Agree that Y/N is understood; advance advisor text | Starts at 100 / 100 / 200 | Learn control, role and broad goal |
| Day 1: Butler | Accept tea as an apparently friendly interaction | −3 wealth, +3 happiness → 100 / 103 / 197 | Even a small social response has a resource consequence |
| Knight | Permit the treacherous quest, expecting a future report | Promises to return; no immediate resource change | Delayed consequence creates an unresolved thread; return not seen in this sample |
| Lil Fang | Say yes to feeling spooky, treating this as rapport | Blood-themed reply; −1 population → 99 / 103 / 197 | The casual wording concealed a harmful consequence |
| Advisor | Welcome refugees to support the explicit population goal | +15 population, +3 happiness → 114 / 106 / 197 | Direct connection between stated goal and action |
| Day 1 close | Inspect summary | Petition changes +14 / +6 / −3, then +4 growth; total 118 / 106 / 197 | Clear short-session closure; growth is separate from petition total |
| Day 2: Mason | Approve a granary despite only “cost a bit” being disclosed | −70 wealth, +7 population → 125 / 106 / 127 | The vague cost was materially larger than tea; budget becomes salient |
| Peanut | Say yes to a monkey holding a coin; inferred acceptance, no explicit verbal offer | +5 wealth → 125 / 106 / 132 | Character animation/text supplies an intentionally ambiguous request |
| Georgie | Refuse gold in exchange for people's souls; keep the population goal and chosen values | No visible resource change | Same input now expresses a moral boundary |
| Advisor | Refuse forcing a child to bathe | +1 happiness → 125 / 107 / 132 | Refusal can be the positive result; green Yes is not synonymous with “good” |
| Grandma | Fund a soup shop while 132 wealth remains | −50 wealth, +10 population, +5 happiness → 135 / 112 / 82 | Resource pressure accumulates; investment has visible tradeoffs |
| Day 2 close | Inspect summary | +17 / +6 / −115, then +9 growth; total 144 / 112 / 82 | Strong growth coexists with depleted money; not one monotonic score |
| Day 3: General | Refuse making prisoners work | No immediate resource change; general says something must be done | Refusal opens a follow-up question instead of ending the event |
| General follow-up | Approve ransom to replenish money | +100 wealth → 144 / 112 / 182 | A small branching exchange changes the available alternative |
| Drummer | Agree conversationally; not an assessment of audible rhythm | +3 happiness → 144 / 115 / 182 | Low-stakes social relief between resource choices |
| Lil Fang returns | Refuse a spooky nickname because the earlier encounter cost a citizen | −1 happiness → 144 / 114 / 182 | Recognition informed the next decision, but the old lesson did not predict the new consequence perfectly |
| Skelly | Agree that an unseen skeleton is strange | No visible resource change | Some beats provide humor/character without economic reward |
| General returns | Accept a neighboring town's alliance | +15 population → 159 / 114 / 182 | Familiar character, different question and consequence |
| Day 3 close | Stop at predeclared endpoint | +15 / +2 / +100, then +6 growth; **165 / 114 / 182** | Three complete local loops; no claim of campaign completion |

There were two deliberately preserved expectation mismatches: Lil Fang's first “spooky” greeting cost population; treating his later nickname offer cautiously cost happiness. There was no reload to optimize those outcomes. Recurrence is observed for Lil Fang, the general and advisor. The knight's promised return and Grandma's longer business arc remain unobserved, so they cannot be credited as delivered payoffs in this sample.

## Criticism from different roles

| Perspective | Supported strength | Friction / uncertainty | Implication to test in our demos |
|---|---|---|---|
| Player | Role, control and local goal are stated before substantive petitions; every answer receives a recognizable response | Exact costs are sometimes concealed. An initially harmless-looking greeting can damage the goal | Separate meaningful uncertainty from ambiguous controls; ask players what they expect before a risky action |
| Systems designer | Same Y/N verb serves investment, social rapport, refusal, moral cost and follow-up negotiation; three resources produce tension | Three days do not establish long-term variety; several events are almost consequence-free | Vary what the player must infer and what later changes, rather than merely changing the button or story label |
| Narrative designer | A returning named character makes a prior decision relevant without a long exposition block | The nickname outcome shows that recognition is not a reliable rule; payoff for the knight is still pending | Vivid can let a prior repair/interpretation change a later encounter, then make the consequence legible |
| Art/UI | Distinct silhouettes, expressive short dialogue, physical coin pile, background town and resource deltas reinforce the ruler role | Numeric costs are not previewed consistently; the positive/negative colored input response can be mistaken for an outcome judgment | Make visual feedback communicate the actual consequence, not merely input acceptance |
| Accessibility / device | Three keyboard inputs handled the observed play; no precision pointer work was required after entry | This does not establish touch, gamepad, screen-reader or audio accessibility. The tested edition is English desktop | Retain low-input alternatives while measuring comprehension in all required languages/devices |
| Operator | Public browser entry worked without account/payment, and the game visibly reported saving | Persistence after browser closure was not tested. Current official page warns old downloads may not work on newer systems | A visible playable URL, correct edition label and resume behavior belong to the release journey |

**Is it fun?** This session supports a specific design explanation: simple inputs can carry changing judgments when character identity, scarce resources, uncertain consequences and short closures interact. It cannot establish that human players enjoyed this run. The sampled public feedback below supplies attributed human claims, not a representative satisfaction estimate.

## Public reviews and discussion, read after play

All accessed on 25 November 2026. These are self-reported public player comments; identity, play duration, build and representativeness are unverified. No forum claim is treated as an authoritative rule or ending guide. Paraphrases avoid reproducing substantial source text.

| Source | Evidence and disagreement | Relation to our observation |
|---|---|---|
| [Bbeol Arcade, “My first few choices,” 7 October 2026](https://itch.io/t/7078178/my-first-few-choices) | Describes contrasting consequences for Lil Fang, an alliance and a Butler decision; attributes tension to fast feedback from simple choices | Supports the consequence-feedback hypothesis. Their crystal/day-off events were not the ones played here; do not merge journeys |
| [Jong_Kil, “I really like it but doesn't it have a final?”, 28 May 2026](https://itch.io/t/6409809/i-really-like-it-but-doesnt-it-have-a-final) | Says roughly two hours of play did not clarify whether there was an ending. Another participant, Peich19, reports more than three hours and a Council milestone without perceived closure | Criticism concerns the long journey, which our three-day sample cannot adjudicate. Clear day endings do not guarantee clear campaign completion |
| [Gardener repetition discussion](https://itch.io/t/6908488/does-the-gardener-lady-do-absolutely-anything-other-than-ask-for-gold-to-hire-an-exterminatior), including [BaGhost's reply](https://itch.io/post/17344102) | A player questions whether a recurring character does anything beyond requesting money; another recalls a later social event and happiness effect | Repetition and deferred payoff can coexist. Do not assume recurring characters alone prevent boredom; the payoff must arrive soon enough and be noticed |
| [“100+ citizens reached!” discussion](https://itch.io/t/6602041/100-citizens-reached) | Players share population achievements, propose a larger group target and ask after an unresolved dragon thread | Suggests both numeric self-set goals and narrative curiosity; not evidence of population targets' actual distribution or retention rate |

The ending thread contains mutually inconsistent informal explanations. Those explanations are deliberately not copied into our rules or treated as verified walkthrough knowledge. This is useful negative evidence about communication, even without settling the underlying ending condition.

## Answers and bounded design transfers

| Question | Supported answer / proposal | Evidence required before adoption |
|---|---|---|
| Why would someone want to play this kind of game? | Exercising a recognizable role, anticipating a returning character, managing competing resources and getting an interpretable response can motivate another short loop. Public comments describe both tension and achievement sharing | Human sessions must distinguish curiosity, care, optimization and mere clicking to finish |
| How differentiate on browser platforms? | Immediate playable access and legible consequence loops matter alongside theme. For our games, offer a specific player responsibility and visible consequence in the first minute | Test first meaningful action, unaided goal explanation and return after a consequence; do not treat a high rating as causal market proof |
| What unique experience could we deliver? | Candidate: a portrait or ink mark retains the player's interpretation and visibly changes what a returning character can do later. The distinctive promise is a remembered, consequential act, not an unusual gesture alone | Compare against a simpler choice version with the same story. A novel interaction should earn its extra effort through a consequence the player can explain |

For Vivid, test one scene where noticing a material clue changes an actual rescue/repair outcome, followed by a short revisit that demonstrates the memory. For Notebook, retain the freehand act and let the physical mark affect a later readable page, with recoverable misunderstanding. These are hypotheses; this study does not authorize implementation or prove either design fun. Bell and Small Hours can borrow explicit role/goal and consequence feedback while retaining their own interaction identities.

## Private evidence and reproducibility

Public record intentionally contains no image embeds or local-only hyperlinks. Private evidence root: `raw/sort-court/`. PLAN.md predates play; driver.cjs and steps.json preserve visible-UI automation and timestamps. Screenshots 01–44 cover the entire journey. Key audit frames: 03-advisor (control), 07-advisor-goal and 08-advisor (motivation), 12-tea-outcome, 16-fang-outcome, 19-next (Day 1), 21-granary-outcome, 31-next (Day 2), 34-next (branching follow-up), 39-fang-return-outcome, 44-day3-complete. Evidence is raw/private until deliberately selected and checked for publication rights.
