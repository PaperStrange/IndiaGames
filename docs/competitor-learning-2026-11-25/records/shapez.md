# shapez — firsthand opening session and player-source critique

**Status: played, partial game coverage, research only.** One agent-controlled session completed the first three hub goals and stopped at Level 4, **0/30 right-half rectangles**. This is not a human playtest, a completed demo, a retention study, or evidence that our games are now enjoyable.

## Session and evidence contract

| Field | Recorded value |
| --- | --- |
| Date / operator | 2026-11-25 UTC; Codex research agent, operating visible browser UI |
| Entry / edition | https://shapez.io/ — title: “shapez Demo - Factory Automation Game”; official browser demo, fresh profile, no savegames at entry |
| Device actually tested | Linux Chromium 151.0.7922.173; 1440 × 1000 desktop viewport; mouse coordinates, drag and keyboard through Playwright |
| Pre-play question | Can the opening teach goal, construction, consequence, failure diagnosis and revision without a walkthrough? |
| Planned boundary | Up to 25 active minutes; first hub delivery → next transformation → deliberate layout revision. Stop when this evidence boundary is reached. |
| Actual timing | Navigation 02:15:00; Play clicked 02:16:22; final paused screenshot 02:25:13; browser closed 02:25:15. About 8m53s from Play to closure. Game pause screen displayed **6 minutes**. |
| Exact endpoint | Levels 1–3 completed; cutter/trash used; balancer unlocked but not placed; Level 4 visible at 0/30. Pause screen: **37 belts, 7 buildings**. |
| Assistance | Built-in animated tutorials and tool descriptions. Upgrade introduction opened. “Show hint” was visible but never clicked. No external walkthrough before/during play. |
| Constraints | No account, purchase, game-state inspection, game API outcome, console cheat, source-code solving, speed alteration, or cloned game. Normal TLS verification remained on. |
| Measurement limits | Tool latency, screenshot inspection and modal reading contribute to wall time. Do not compare it to human task time. No audible listening, physical touch device, keyboard-only accessibility or translation test. |

The start plan was saved before navigation. Actions include predictions and correction notes in a timestamped local log. Screenshots were inspected during play; decisions were adapted to the observed screen. Browser actions are genuine UI inputs, but agent problem solving and its tooling are not a substitute for a player's emotions or motor experience.

The demo entry advertises additional levels, wires and buildings in the paid game. The player sources below concern Steam **shapez, app 1318690**, sometimes its later game; they do not establish that the browser demo contains those systems. Nothing here concerns shapez 2.

## Complete attempted journey

Times below identify evidence captures, not exact in-engine event times. Image IDs are filenames in the private evidence folder, not web image links.

| UTC / stage | Prediction and actual action | Visible result / changed decision | Evidence |
| --- | --- | --- | --- |
| 02:15, entry | Expected a playable demo and control guidance; opened official URL. | Large Play button, no savegames, Steam upgrade promotion. Play was reachable without login. | `01-entry.png` |
| 02:16:23, first goal | Clicked Play; read the hub and highlighted tool. | Hub displayed a circle, 0/10, and a specific reward: cutting shapes. Animated tutorial asked for an extractor on a circle deposit. This answered **what** and gave an immediate mechanical **why**, not a fictional purpose. | `02-first-instructions.png` |
| 02:16:40, first action | Selected highlighted extractor; placed it on the gray circle at approximately (637,750). | Extractor appeared with north-facing outlet. Tutorial changed to connecting it to the hub. This was first successful placement feedback. | `03-extractor-placed.png` |
| 02:16:59, first route | Selected belt; dragged north from the outlet and then east into the hub. Expected automatic cornering. | Corner connected and whole circles visibly traveled. Tutorial changed to encouraging expansion rather than idling. The visible moving item let me trace what the construction did before the counter changed. | `04-first-route.png` |
| 02:17:17–41, reward | Waited briefly to check whether moving items actually counted. | Captured 5/10, then 9/10; Level 1 completion unlocked cutter and trash. First captured nonzero goal was about 55 seconds after Play, including tooling delays; not a human onboarding benchmark. | `05-delivery-feedback.png`, `06-first-unlock.png`, `07-cutter-unlocked.png` |
| 02:17:59–18:12, new demand | Read target left semicircle, 0/20. Selected cutter and previewed replacing a straight belt. Expected left output to continue on the existing route. | Tool description explained cutting direction and warned that the unused output can block production. This changed the problem from routing one item to managing two outputs. | `08-level-two-layout.png`, `09-cutter-preview.png` |
| 02:18:30, mistaken observation | Placed cutter, pressed Escape to end placement, then waited to inspect an intentional missing-trash test. | Escape opened pause because single-building placement had already deselected the tool. **This screenshot is not stall evidence.** I resumed before drawing a conclusion. | `10-intentional-waste-stall.png` |
| 02:18:51–19:11, deliberate failure | Left the right output unconnected, as declared before placement. Expected the warning's blockage. | Two left halves reached the hub; right half remained at the outlet, whole circles queued below cutter, downstream belt emptied. The result was **two**, not my interim expectation of one, escaping before blockage. This was an intentional diagnostic experiment, not an unprompted novice mistake. | `11-unconnected-output-running.png`, `12-stall-evidence.png` |
| 02:19:34, repair | Placed trash immediately above the unused right outlet. | Left halves resumed traveling; tutorial acknowledged the repair and asked for two more cutters. Hub later reached 15/20. Repair was legible in the material flow before the delayed delivery counter. | `13-trash-repair.png`, `14-parallel-route-before-cutter.png` |
| 02:20:05–25, expansion interrupted | Built a second circle source and separate belt to another hub port. Intended to add another cutter and trash. | Level 2 completed during the next command sequence. Completion modal intercepted the attempted extra cutter/trash clicks. **Only the second extractor and whole-circle route were actually built.** Do not credit a second cutting line or measured speedup. | `14-parallel-route-before-cutter.png`, `15-two-lines-or-level-complete.png` |
| 02:20:40–21:30, value of old work | Opened mandatory upgrade introduction; inspected available upgrade; closed without buying. | Old whole circles were usable for a belt-speed upgrade. Level 3 demanded rectangles. Retained the second whole-circle line instead of converting it: the new information changed my plan. No upgrade was purchased. | `16-level-three-inspection.png`, `18-upgrade-panel-visible.png`, `19-post-transition-layout.png` |
| 02:21:59–22:20, transfer of control | Rotated an extractor south using R twice, placed it on rectangle deposit, dragged down and west to a right hub inlet. | Rectangles traveled and first delivery reached 1/30. Basic tool rules transferred to a new location and orientation. | `20-square-extractor-rotation-preview.png`, `21-rectangle-delivery-route.png` |
| 02:22:49–23:41, genuine design error | Added adjacent rectangle source. Assumed a shared westbound belt across the first vertical approach would merge both sources. Deleted the now-unused lower bend with right-drag. | Count rose, but first source backed up completely while the second remained sparse. At 24/30 the same first-column queue remained. **My intended merge had not delivered the expected behavior.** Rising global count alone would have hidden this defect. | `22-merge-revision.png`, `23-revised-route-cleaned.png`, `24-shared-route-queue.png` |
| 02:24:04–20, intercepted repair | Tried routing first source left one row earlier into its own hub port. | Level 3 completion modal intercepted this attempt too. On dismissing it, layout was unchanged and first queue still full. Balancer description explicitly introduced splitting/merging; I did not test it. | `25-separate-inlets-repair.png`, `26-level-four-revision-check.png` |
| 02:24:44, confirmed revision | Reapplied earlier separate-inlet route using the now-shifted toolbar. | First queue cleared into the new upper route; both source streams had distinct paths. This is the actual successful layout revision. No timed throughput comparison was performed. | `27-repair-actually-applied.png` |
| 02:25:13, stop | Paused at declared evidence boundary rather than claiming completion. | Level 4 right-half rectangle target remained 0/30. Did not attempt this new transformation, use balancer, buy upgrades, paint, stack, build wires, test save recovery or complete the demo. | `28-stop-paused-level-four.png` |

The two intercepted action sequences are partly an automation observation problem: command batches continued while a modal appeared. They demonstrate the need to verify the resulting state. They do **not** establish that ordinary human players frequently lose clicks or find these modals confusing.

## Player reviews and discussion, inspected after play

Selection was purposive, not random: one detailed mixed review, one detailed positive systems comparison, and a thread about waiting with disagreement. This is useful for competing explanations; it cannot estimate their prevalence. Steam hours are platform-reported, not independently verified.

| Source | Date / scope | What it contributes and what it cannot establish |
| --- | --- | --- |
| [Steam store, current fetch](https://store.steampowered.com/app/1318690/?l=english) | Direct HTTPS response, **2026-11-25 02:26:30 UTC** | English: **96% positive, 8,461 reviews, Overwhelmingly Positive**. Recent: **93% of 83 reviews, Very Positive**, as returned by that page. This justifies calling it highly rated; it does not prove a particular mechanic causes the rating. Cached search results had different recent counts and are not substituted for this snapshot. |
| [Fuzzyweed39 review](https://steamcommunity.com/profiles/76561198170104070/recommended/1318690/) | 2024-04-06; Recommended; 29.8 hours at review time | Praises an approachable, decomposable logistics experience, but criticizes repeated production-line designs, waiting and limited reasons to replay. Finds the later general-purpose machine more distinctive. Also notes placement deselection friction. My short session observed that deselection behavior; it did not verify the later-game critique or replay claim. |
| [Prorogue review](https://steamcommunity.com/profiles/76561197976439814/recommended/1318690/) | 2021-09-12; Recommended; 40.3 hours at review time | Argues that removing inventory, environmental threats and resource limits shifts complexity into exposed assembly steps and shape variety. Unlike Fuzzyweed39's newcomer recommendation, this reviewer recommends Factorio first for beginners. The disagreement matters: fewer subsystems need not mean an easier mental model for every player. |
| [“How do I speed up the game?” discussion](https://steamcommunity.com/app/1318690/discussions/0/603018753649744870/) | Started 2025-01-07; 11 replies shown, including April replies | Starter complains about waiting for 600 items. Replies suggest upgrades and scaling; one player describes learning to specialize, another wants much higher throughput demands, while later replies criticize diminishing upgrade returns and discuss performance limits. Thus waiting can invite redesign for one player and feel like a tax to another. No speed mod was used in this session. |

The review permalinks were fetched directly with HTTP 200 and saved locally. The search tool could not open the Prorogue permalink, so its direct fetched text was read instead. No inaccessible source is presented as read. Source bodies are retained privately for audit, not republished wholesale.

## Criticism from different roles

| Perspective | Supported observation | Interpretation / limitation |
| --- | --- | --- |
| Player goal and motivation | Requested shape, count and reward were colocated at the hub. Each initial tool instruction pointed at the current action. | A credible opening motivation is “make my system work, then earn a new way to change it.” There was no observed character attachment or fiction-based motivation. Shape mastery will not satisfy every narrative-game player. |
| Systems designer | Routing → cutting with unwanted output → retaining old production → new source orientation → failed intersection and revision changed the decision. | The same drag gesture supported different causal questions. This suggests variation in decisions can matter more than inventing an unusual gesture. Later duplication can still become repetitive, as a review argues; the opening cannot answer that. |
| Interaction / accessibility designer | Ghost preview, arrows, moving items, counters and animated examples formed a usable feedback chain. Escape's context changed; toolbar positions shifted after unlock. | Do not teach only a button and then test recall. Teach a prediction the player can verify. Keyboard shortcuts and right-drag are desktop affordances; this session establishes nothing about touch precision, one-handed use, screen readers or our EN/JA/zh-Hans readiness. |
| Art / narrative designer | Shape silhouettes and spatial flow communicated state without needing a story paragraph. Cutter's discarded half made consequence visible. | Visual economy helped diagnosis here. It does not mean our photo/memory stories should become abstract factories. Art should carry consequence: a modified photograph, altered memory or changed page must show what the player's action did. Audio was not assessed. |
| Operator / producer | Official demo was online and playable without account. Paid upgrade promotion was distinct from the Play entry. | Browser access lowers the steps needed to start this session. We did not measure conversion, mobile load, returning sessions or save reliability. Our preview links must be independently verified; this research does not turn a local build into an online release. |
| Researcher | Aggregate count kept increasing while one source was blocked. Failed command sequences looked superficially successful without inspecting the layout. | “Completed the level” and “all intended interactions worked” are separate claims. Keep failed predictions, assistance and the exact stop; avoid success-only evidence. |

## Answers to the project's three design questions

**Why might people play this kind of game?** This opening supports a hypothesis about legible competence and ownership: a player can predict a result, build a mechanism, see its material consequences, diagnose a fault and improve their own arrangement. The reviews add conflicting accounts of how long that appeal lasts. This is not evidence that all players want optimization or that an abstract count is enough motivation for our audience.

**How could we differentiate on a web platform?** Keep the first causal action reachable in the public browser build, then specialize the problem and its consequence. A long introduction explaining a unique premise is weaker evidence than a player producing a distinctive change. Our games should expose their own playable verbs and stakes early, and test whether players can explain both. The demonstration here supports trying that sequence, not promising conversion gains.

**What unusual experience could our games offer?** The candidate opportunity is an authored system in which the player changes the material that carries the story and can trace how that changes what is known. This should be explored through multiple prototypes and player rejection, not declared unique based on one comparison. The proposals below are **unbuilt hypotheses based on the conversation's goals**, not claims about inspected IndiaGames code or current demos.

| Game | Bounded experiment suggested by this session | What would disconfirm it |
| --- | --- | --- |
| Vivid 2.5D Photos | Let repositioning a photo layer reveal or contradict one concrete clue before the character's next passage. Next scene should require a different inference, rather than repeating the same reveal-and-read recipe. Show the changed clue in the image itself. | Players find the clue accidentally, cannot explain the causal relation, or say the second scene is the same task with another portrait. Extra visual movement alone is insufficient. |
| The Thirteenth Bell | Make one bell action's cost and consequence observable in the room before asking for another choice. Ask players to predict the next result, then let a failed prediction guide revision. | Players can operate the bell but cannot say why they would do so, or need external explanation to distinguish consequence from decorative animation. |
| Tom's Notebook | Preserve ink as the main action. Trial a page where the placement of a stroke connects, blocks or redirects something meaningful in the scene; let the player repair the arrangement and see a different consequence. Compare several rule families before choosing one. | Drawing becomes an arbitrary tracing task, only a disguised menu selection, or a single magic gesture repeated across pages. Factory-like routing should not erase the notebook's identity. |
| Memorable Moments | Put a small shared activity before exposition, with two observable contributions combining into one changed memory object. Let the next activity change how those contributions relate. | “Cooperation” is merely taking turns clicking, one participant can do everything without a meaningful loss, or players do not care what changed. |

Suggested human observation fields: first deliberate action; explanation of immediate objective and reason; predicted versus actual consequence; aid requested; first self-initiated repair; what changes in the second loop; voluntary stopping reason. Record actual utterances and screen events separately from interpretation. Do not convert the agent's 55-second first captured delivery into a release threshold. Establish thresholds against our own test design and participants.

## Evidence custody and provenance

Local root: `/workspace/indiagames-research-2026-11-25/raw/shapez/`. Raw files stay local; the Markdown record may be published. There are **28 original viewport screenshots**; filenames above are evidence identifiers, not broken embeds. `evidence-inventory.json` contains hashes and sizes for all screenshots, the plan, driver, log and source snapshots. `sources-provenance.json` records requested/final URLs, fetch UTC, status, bytes and source hashes. The full chronological `actions.jsonl` preserves unsuccessful actions and observations.

| Artifact | SHA-256 |
| --- | --- |
| Pre-play `PLAN.md` | `59dfae35ec0178dc719285e0d2ec0baee51c2ca6681d99082806c5d7ac2b4bc0` |
| UI driver `play.cjs` | `9d70fcf5ebd3746309158e834dbacda1b4573fa9297a7f7e1c123c8ec8c615a6` |
| Action log `actions.jsonl` | `7e9f831bd27ccea1195dad2ac893a050141c0f48c737e7a4bd9d23b35c7b868d` |
| Failure `24-shared-route-queue.png` | `96c10f2269aba87f73fb92cce0424f2c78327db3ef8156e637eea033a6a89eda` |
| Confirmed repair `27-repair-actually-applied.png` | `7b537b1d185d1fee70515ae6abd14f51e3738e12759bfed26627a4a991a4e8ce` |
| Exact stop `28-stop-paused-level-four.png` | `a7ec3192c5b3437a88218fe4e67734ecd4586ad5c89de27b0f7154e80e13f78e` |
| Live store HTML | `18e95a694d0fae85a90a6cf9c73bf31604fee2cc239ba173f7543d3052e2c61c` |
| Fuzzyweed39 review HTML | `2a9bb82a9e01617bec329070ec63d3acce6955cb610aeb442f9387227802e887` |
| Prorogue review HTML | `bbb968303343142e0de6d7e93ab31d261072d4c446fb3a3f0023ab5ff20d8406` |
| Discussion HTML | `0590c50dfbed6830928005170f83532a050051b225481956c470f06610c3db4f` |

Record hash is stored separately in local `report-provenance.json`, avoiding a self-referential hash. The browser closed normally after the paused final capture. No IndiaGames code, branch, issue or release was modified by this subtask.
