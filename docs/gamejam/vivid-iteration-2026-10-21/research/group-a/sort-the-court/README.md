# Sort the Court! — Poki edition, two days and reentry

**Actually played by an agent through visible browser controls on 2026-10-21, approximately 07:43–07:55 UTC.** This is one bounded run, not a human participant session, a full campaign completion, a device benchmark or a claim about all players. The run completed two in-game days, observed a later callback to a funded request, and reloaded into day three. No walkthrough, game source, hidden state or state-injection shortcut was used.

## Edition and method

- Entry: <https://poki.com/en/g/sort-the-court>. The title screen visibly identifies **Version 2.5.2, Poki edition**. The host listing labels its latest update May 2026 and advertises a new quest UI, mobile support and account progress saving. Those are listing claims; this run tested desktop browser controls and anonymous same-context reload only.
- Browser: headless Chromium at `/usr/bin/chromium`, 1280×900 desktop viewport. Mouse clicks chose the game and Queen; keyboard Y, N and Space handled subsequent play. Screenshots and visible dialogue informed every decision.
- The task-scoped transport used Playwright API requests through the configured managed proxy with its provided CA and normal TLS validation, relaying responses into the browser. No TLS verification was disabled. This mediated environment can differ from ordinary cookies, SDKs, service workers and advertisement behavior; it is not a consumer-device benchmark.
- One game page was active. Other team browsers shared compute, and screenshots/commands sometimes took several seconds. The elapsed research window is **not** a player completion-time measurement. Audio was not listened to or assessed. No account was created, no ad was selected, and cross-device/cloud saving was not tested.
- Ten curated captures are in `captures/`; `input-log.jsonl` records every supplied mouse/keyboard/reload/wait input. The task helper `ui-step.mjs` attaches to this run's browser port and captures visible UI; it does not access game internals. It is environment-specific research tooling, not a portable product test.

This Poki edition is separate evidence from the older itch.io edition in the previous research. Do not pool their UI, saving or mobile claims.

## Journey as played

| Moment | Action and expectation | What visibly happened | Player-perspective interpretation / limitation |
|---|---|---|---|
| Arrival | Opened the Poki listing, clicked New Game, chose Queen. Expected a short decision game. | A visibly hand-drawn throne room, settlement outside the window, and three counters: population 100, happiness 100, wealth 200. | The scene establishes a role before explaining a system. A single character choice gives ownership cheaply. Surrounding portal recommendations and ad slots compete for attention. |
| Onboarding | Answered the adviser Y and advanced each text page with Space. | The adviser taught yes/no rulings, named happiness/population as priorities, and suggested eventual membership in the Council of Crowns. | Local control is simple while the distant objective creates a reason to continue. Several text advances came before the first substantive request. |
| First investment | Jester asked for funds for a show. Answered Y, expecting a community benefit. | Wealth fell by 50 to 150; the jester approved and left. No benefit appeared immediately. | The unresolved promise stayed salient precisely because the cost was already visible. The amount was not stated in the request. |
| Surprise | Lil Fang asked whether the Queen felt spooky. Answered Y as a light social reply. | He answered “Let the blood flow”; population fell by one to 99. | A casual-sounding answer carried an unstated human cost. This creates comic surprise, but also weakens the ability to choose an outcome deliberately. |
| Small care | Boots asked for food. Answered Y. | Wealth −2 and happiness +1; the cat's short response closed the exchange. | The same input grammar handles both a tiny act of care and a major investment. Character drawing and concise response differentiate them. |
| Uncertain refusal | Witch offered to slay goblins in the lower quarter. Answered N because the initial request did not establish that they were threatening anyone. | Her response said the people would be bullied; happiness fell by four to 97. | The consequence introduced information after the decision. This was observed uncertainty, not proof that every choice is arbitrary. |
| Later callback | Advanced after the Witch; did not request or inspect hidden results. | A dedicated night card said the jester's show was loved and made the court happy; happiness +8 to 105. | The earlier cost acquired a specific later meaning. The return was a named event, not just an unexplained change to a meter. This satisfied the planned request→later-consequence observation. |
| Resolved milestone | Advanced the show card. | “Day 1 complete”: population −1, happiness +5, wealth −52; the city grew by one because people were happy, leaving 100/105/148. The UI exposed a population target and an optional rewarded-ad offer. | A bounded day provides closure while the population objective invites another round. The ad is an alternative resource path on this portal edition; it was not used. |
| Second investment | Grandma proposed a soup shop and needed gold. Answered Y. | Wealth −50, population +10 and happiness +5, reaching 110/110/98. | A practical civic action produced clear immediate feedback in all three counters. No later soup-shop callback was observed in this bounded run. |
| Character beat | Chester asked whether the Queen had seen a treasure chest do a backflip. Answered N truthfully. | “Well, you're not gonna.” No visible counter change. | A non-reward exchange still adds character and changes pacing; not every interaction is an economic transaction. |
| Open thread | Sultan offered a business proposition. Answered Y to hear it. | He promised to bring details soon; counters did not visibly change. | An unresolved offer gave a concrete reason to wonder about later days. Its eventual outcome was not reached, so no payoff is claimed. |
| Two small rulings | Adviser asked whether a citizen was cool; answered Y. Mason asked for a sandwich; answered Y. | The adviser gave happiness +1. The sandwich cost three gold and gave happiness +3, leaving 110/114/95 before nightly growth. | Small approval decisions create an easy cadence, but repeating Y is possible without much deliberation. That is a design tension, not a measured boredom finding. |
| Second milestone | Advanced to the day summary. | “Day 2 complete”: population +10, happiness +9, wealth −53. Night growth added eight population, settling at **118/114/95**. | Settlement growth makes the effect of accumulated choices visible beyond a single response. The full Council objective and side-quest completion were not reached. |
| Reentry | Entered day three, saw a Wizard request, then reloaded the browser without clearing storage. Clicked Continue after loading. | The menu offered **Continue — Day 3**. Population/happiness/wealth remained **118/114/95**, and the Queen remained selected. The next visitor was **Peanut**, replacing the pre-reload Wizard request. | The day-level state survived. The exact pending request did not remain the same. This is evidence of same-context day continuity, not exact interaction checkpointing or cross-device/cloud saving. The run ended here without answering Peanut. |

## Answers to the three design questions

**Why might people want to play?** In this run, the low input cost made it easy to take responsibility for a small fictional community. Distinct visitors, occasional surprises, a named delayed callback and daily summaries offered several reasons to see the next request. The jester sequence is concrete evidence that an earlier action can become interesting again later. This is an agent's design interpretation; it does not establish population preference, emotional attachment or retention.

**How can Vivid differentiate on a browser platform?** The Poki game makes many short rulings and exposes resource totals, distant targets and optional ad rewards. Vivid can give fewer actions more personal, spatial consequence: bracing a worn lamp, placing a privately kept letter or pinning an approved dedication. The choice should disclose what may be shared before it happens. The observed Lil Fang and Witch surprises show why Vivid should test whether players can explain their consequences rather than merely notice a number changed. A quiet self-contained page may help attention, but this run does not prove that removing portal chrome improves enjoyment or acquisition.

**What unusually specific experience can we offer?** A player returns to the same small illustrated place and physically arranges an object whose meaning they helped establish earlier. The return object and its placement persist; a different story can express discovery by aligning drawings instead of repeating a dialogue choice. Sort the Court supplied a useful delayed-recognition pattern. Vivid's differentiating hypothesis is to make that recognition tactile and intimate, without requiring a large economy or a long campaign. It remains a hypothesis until the planned human study shows that players notice and value the connection.

## What is still unknown

The run did not reach the Council, complete a side quest, resolve the Sultan offer, test a losing economy, play alternate branches, use touch, hear audio, test screen readers, sign in, watch ads, test cloud saves or establish replay desire. The observed two-day loop is stronger evidence than a menu-only visit, but it is not comprehensive competitor coverage. Future research should include a contrasting restrictive-ruler run and a real touch session before drawing broader claims about strategic depth or mobile usability.

## Capture index

1. `01-arrival-poki-2.5.2.png` — title/version and portal context.
2. `02-simple-rule-queen.png` — adviser instruction and initial counters.
3. `03-jester-funding-request.png` — request before the delayed payoff.
4. `04-casual-answer-costs-population.png` — Lil Fang consequence.
5. `05-jester-later-callback.png` — explicit later show result.
6. `06-day-one-resolved.png` — first day summary.
7. `07-day-two-resolved.png` — settled second-day values.
8. `08-before-reentry.png` — Wizard prompt and 118/114/95.
9. `09-reentry-continue-day-three.png` — saved-day menu.
10. `10-reentry-state-preserved-request-changed.png` — same counters, different visitor.

The [capture integrity inventory](capture-inventory.json) was made during final coordination. All ten images match the first remote research checkpoint byte-for-byte; its inventory timestamp is not an image capture time.
