# CELESTE Classic — observed play and discussion comparison

**Status: played, bounded partial session.** On 25 November 2026, an agent operating the official browser game cleared the first two rooms, reached the third room marked **300 m**, and collected one strawberry there. The collection produced a visible **1000** popup. The session ended on that room's lower-left platform; the third room and the full game were **not completed**.

## Identity, selection and protocol

| Field | Evidence |
|---|---|
| Exact edition | Original PICO-8 **CELESTE Classic**, not the 2018 commercial Celeste |
| Official entry | [Maddy Makes Games — CELESTE Classic](https://maddymakesgamesinc.itch.io/celesteclassic) |
| Browser build | Official page's embedded `https://html-classic.itch.zone/html/235259/Celeste/index.html` |
| Selection signal | **4.7/5 from 1,011 itch.io ratings**, directly read from the live page's expanded **More information** panel after play on 2026-11-25; independently matched web retrieval. This is a self-selected platform rating, not evidence that every player enjoys it. |
| Operator and setup | Codex agent, Playwright driving Chromium, 1100 × 850 desktop viewport, keyboard and pointer UI only; no sound assessment |
| Prior knowledge | Official description supplied mountain-climbing goal and arrows/X/C. No walkthrough, level source, or gameplay-state inspection used before/during play. |
| Preregistered bound | 20 minutes of observation or three rooms plus one optional collectible attempt. Interpreted as three rooms **visited**, not three cleared. The plan was saved before input. |
| Actual window | Start input **02:17:03 UTC**; endpoint screenshot **02:34:50 UTC**: approximately **17m47s wall time**, including tool delays and pauses. The last visible room-entry timer read **00:08:07**. Neither number is a human completion-time estimate. |
| Assistance and deviations | Bounded key combinations selected from screenshots; from screenshot 36 onward, the game's visible **Pause** toolbar control was used repeatedly to inspect airborne positions. Some successful inputs were chained through already-observed geometry. No source inspection, hidden coordinates, game-state reading, solver, cheats, or outcome injection. |

Initial entry showed a black game area before the title appeared. Starting required focusing the game and following the visible X+C prompt. The public description named keys but did not explain which key jumped, which dashed, directional dashing, or wall jumping. Those relationships were learned through operation in this session.

## Observed journey

| Stage | Action and visible result | What changed in the operator's understanding | Evidence frames |
|---|---|---|---|
| Entry and first action | Focused the canvas, pressed X+C, then used right+C. The character rose from the lower-left floor toward the first ledge. | The immediate job was spatial: move upward through the room. C behaved as jump; movement produced visible feedback before any story reading. | `02-loading-check`, `04-started`, `05-first-jump` |
| First room | Jumped between lower platforms, then combined a jump with upward/right X and later upward X. Reached the upper-right opening and transitioned to **200 m**. | The same movement controls could be combined into routes; a directional dash extended a jump. The altitude transition confirmed progress. | `09-jump-toward-right`, `10-first-dash`, `13-upper-ledge-attempt`, `15-room-two` |
| First repeated obstacle | Tried a narrow ascent with wall jumps. Several approaches missed the left resting ledge: two clearly returned to the bottom, and another was captured sliding below the ledge. A longer leftward hold reached the platform. | The failure was local and inspectable. Changing lateral commitment changed the result without opening a menu or rereading instructions. | `18-first-wall-jump`, `19-ledge-outcome`, `20-corrected-wall-jump`, `22-wall-chain-outcome`, `23-left-rest-platform`, `24-longer-left-landing` |
| Harder crossing | Attempts to clear the central spikes and overhang led to resets. A visible spike-contact burst was captured; other attempts fell toward the lower-right opening and returned to the room start. | Reusing the first-room dash pattern was insufficient. A dash spent early could leave no recovery for the later crossing. Some failures also reflected delayed observation/input. | `25-spike-gap-attempt`–`35-recovery-jump-attempt`, `40-ledge-side-approach`, `41-wall-recovery-outcome`, `45-ledge-recovery` |
| Changed strategy | Used wall jumps while preserving the dash, positioned closer to the left ledge's edge, crossed the central pillar, then dashed right **after descending below the overhang**. Reached the right resting platform and climbed to **300 m**. | Progress followed a different allocation of an existing action, rather than a new upgrade or dialogue choice. Pause assistance makes this a route-learning observation, not a precision-skill benchmark. | `47-grounded-start`–`54-upper-right-platform`, `56-upward-exit-retry`, `57-room-three` |
| Optional detour and stop | Walked onto the visible spring; observed an upward bounce. From a paused airborne position, directed a dash toward the strawberry. The berry disappeared and **1000** appeared. Landed back on the left platform and stopped. | A visible optional target turned the same movement verbs into a self-chosen detour. The spring changed the starting condition; collection had an immediate, explicit consequence. | `58-optional-berry-spring-approach`, `59-spring-bounce-pause`, `60-optional-berry-outcome`, `61-endpoint` |

**Failure accounting:** six distinct death/reset events are evidenced in frames 26, 30, 31–32, 34, 41, and 45. This is a manually observed lower bound, not a readout of the game's total death counter; animations and transitions between screenshots were not continuously recorded. Nonfatal falls and missed landings are separate. The attempt named `55-third-room-arrival` did **not** reach a new room: it returned to the upper-right ledge. Frame 57 is the actual third-room transition. Likewise, frame 52's filename anticipated success; frame **53** confirms the right-platform landing. Evidence descriptions take precedence over optimistic capture filenames.

The return after a death required no confirmation dialog and retained the current room. The session did not measure respawn latency precisely. One berry attempt was made and succeeded; no further room exploration followed.

## Player reviews and discussion, read after play

These are public posts from individual accounts, not a representative survey or verified player panel. Publication dates below are the dates shown by the threads; relative dates and cached view counts were not used as recency claims. The critical thread, independent positive post, and mastery diary were also opened in the live browser after the session.

| Source | What the source actually contributes | Interpretation and limit |
|---|---|---|
| [Difficulty and control-discovery discussion](https://itch.io/t/1111740/bruh-level-1-is-too-hard), started 14 Dec 2020 | The original poster reports repeated failure. Replies explain upward dashing; another participant expresses surprise that it exists. Some replies are dismissive. | Sparse instructions can leave a player missing a consequential verb. This supports testing control comprehension, not merely checking that key bindings appear on a page. It does not quantify how common that confusion is. |
| [Independent positive response](https://itch.io/t/4476773/thoroughly-enjoyed-it), 18 Jan 2025 | The author praises the appearance and gameplay despite not hearing sound. | The visual/action loop worked for this person under their stated circumstances. It is not evidence of complete audio accessibility or confirmation of why audio was absent. |
| [My Gemskip Journey](https://itch.io/t/5404201/my-gemskip-journey), started 9 Oct 2025 | An experienced player describes repeated failure, alternative routes, returning for collectibles, and valuing challenge and the resulting pride beyond the ending reward. The diary references other mods and external guides. | A concrete account of motivation through self-chosen mastery. It concerns advanced play far beyond our three-room sample and should not define a novice or relaxed-game difficulty target. |
| [Positive post with promotional interest](https://itch.io/t/6522581/this-game-is-a-masterpiece), 23 Jun 2026 | Praises controls and learning through failure, then promotes the author's own mobile-browser app. | Retained as a disclosed source-quality caveat. It is not treated as independent validation of mobile usability. No promoted app was installed or tested. |
| [Personal-best post](https://itch.io/t/5445752/new-pb-000433-23-deaths), 21 Oct 2025 | The post's title presents a completion-time/death-count result. | Evidence that at least one community member shares performance outcomes; no basis for a retention estimate or universal competitive motivation. |

## Criticism from different roles

| Perspective | Supported observation | Design implication to test |
|---|---|---|
| New player | The goal direction and immediate movement were readable; the page's key list omitted important action relationships. Public discussion independently exposes upward-dash confusion. | Show the first consequential action in context and ask the player to demonstrate it. A short instruction is successful only when the player can use it. |
| System designer | The second room defeated a strategy that worked in the first. Keeping the same verbs but changing where a dash was spent produced progress. | Variety can come from different consequences and constraints, not simply more buttons or more character text. In a relaxed game, use reversible manipulation and discoveries rather than tight timing. |
| Narrative designer | This sample supplied an immediate mountain-climbing objective and an observable ascent. It did not establish a rich character motive or demonstrate the commercial game's narrative. | Separate knowing the next action from caring about its outcome. Our games still need a concrete person, relationship, or unresolved situation affected by the action. Celeste Classic does not by itself answer that narrative problem. |
| Art and interaction designer | Bright character/hair, white spikes, contrasting terrain edges, dash trails, room labels, spring movement, and the collection popup made many changes visible. The operator nevertheless misread some background rock as potential terrain. | Use art to distinguish actionable surfaces, hazards, state and decoration. Validate the distinction with unfamiliar players and reduced-motion/color-vision checks; do not assume contrast alone explains rules. |
| Operator/community manager | The official public page offered immediate browser access without account creation. Discussion contains support, expertise sharing, and dismissive responses to beginners. | Treat reliable public previews and constructive help as part of the first-play experience. Publish exact edition/build, controls and known device limits. Do not direct confused users to hostile community replies. |
| Accessibility/QA | Timing depended on keyboard holds, screenshots arrived after airborne states had changed, and UI pause assistance was used. Phones, tablets, Japanese and Simplified Chinese were not tested. | This agent session cannot clear any human, multilingual, touch, or device release gate. Input-timing frustrations must be separated from content/motivation failures. |

## Answers this session can and cannot support

**Why might people play?** A supported hypothesis is the wish to understand a compact system, improve a route and choose an additional challenge. The mastery diary explicitly supplies one player's account of pride and challenge; the negative discussion supplies a contrary account of repeated failure and missing knowledge. Agent success is not evidence of enjoyment. There is no support here for saying all players want difficulty, pixel art, speedruns or collectibles.

**How could our browser games differ?** Preserve the causal clarity—action, visible consequence, recoverable revision—while applying it to story-bearing objects. For Vivid, a character interaction should reveal or alter a relationship, not merely unlock the next paragraph. For Notebook, an ink action should change what can be discovered or repaired, with a reversible result. These are hypotheses for later prototype tests, not completed designs or measured preferences.

**What unusually distinctive experience is worth testing?** Let a player's expressive manipulation of an object become the means of understanding another person's story, and let a later scene reinterpret that same action. The transferable lesson is a familiar action gaining new meaning through context. This session does not establish that this proposal is unique in the market. Its falsifier: players can complete the action but cannot describe a meaningful consequence or reason to continue.

Do **not** copy Celeste's precision demands, punitive hazard density, or external-guide reliance into a relaxed narrative game by default. The third-room berry was a useful optional target in this sample; it does not justify putting compulsory scores or collectibles into every story.

## Evidence and handoff

Private research files are under `raw/celeste/`: preregistration `plan.md`, timestamped UI commands/results `actions.jsonl`, browser driver `play.mjs`, screenshots 01–65, `checkpoint.md`, and `manifest.sha256`. These drivers/logs are local research evidence, not proposed repository uploads. No JavaScript page errors were logged during this run; this is not a full compatibility or console/network audit.

Suggested publication selection: `04-started.png` (goal/layout), `15-room-two.png` (first clear), `31-long-jump-over-pillar.png` (failure), `50-saved-dash-crossing.png` and `53-right-platform-arrival.png` (revised strategy), `57-room-three.png` (actual scope), `60-optional-berry-outcome.png` (consequence), and `61-endpoint.png` (stopping state). Preserve edition, operator and partial-session captions when publishing.

No game code, repository branch, issue, pull request, purchase, login, or external message was changed by this research session. The browser was closed after source reading. Human onboarding, enjoyment, complete play, all three release languages, phones/tablets and sustained performance remain unverified.
