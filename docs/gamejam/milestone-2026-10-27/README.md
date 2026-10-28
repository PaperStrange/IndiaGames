# Small Hours: unchanged-baseline playtest packet

Next: [November 20 human checklist, recording templates and iteration plan](../launch-2026-11-20/README.md). This frozen protocol and artifact remain authoritative.

Prepared 27 October 2026. **Ready for facilitator preparation; zero human sessions recorded.** This milestone packages the current game without changing its mechanics, art, prompts or instrumentation. The first product decision follows observation of six willing pairs.

**Frozen source:** [`ca7fb8ea0fa7ceb1a9fd1c8ab238a71a47e9c649`](https://github.com/PaperStrange/IndiaGames/commit/ca7fb8ea0fa7ceb1a9fd1c8ab238a71a47e9c649), branch `memorable-moments-game`. Its `memorable-moments-game/play/` files match `822366ad3eb309f7009bb7a05e26cddfb466422f` byte for byte. The added October 22 package changes the research evidence, not the game.

Start with [facilitator protocol](protocol.md), [blank observation form](observation-template.md), [machine-readable session template](session.template.json), [launch and invitation instructions](launch.md), and [ownership and decision handoff](handoff.md). The [baseline packer](package-baseline.py) exports the pinned Git objects, writes a per-file inventory and aggregate hash, and makes a deterministic ZIP with `index.html` at its root. `baseline.json` identifies a study artifact, **not an official release**.

The [frozen inventory](baseline-inventory.json) and [packet verification](packet-verification.json) record an eight-file, 58,313-byte export and reproducible ZIP. Aggregate build SHA-256: `fa4ca1930fc1964d929bca9704c5f0bba89dc9cc46208d34294a1e1ae5c458e3`. These are packaging checks, not a new gameplay or human test.

## Three questions, with tests attached

| Question | Hypothesis and supporting contrast | What the baseline must tell us |
|---|---|---|
| Why choose this game? | Two willing people may want a small shared break without planning an outing. Make it Meme shows a second-person entry dependency; Hanabi demonstrates constrained information with bots, not human rapport. | Do both people opt in, reach the reveal without explanation and actually contribute away from the screen? One person carrying the activity challenges the premise. |
| How can it differ in a browser platform? | A direct-link/itch.io occasion: two people, one screen, private choices, a shared activity and an optional immediate keepsake. Twin Flames provides a mechanical cooperation contrast; Townscaper supplies open creation. Neither proves our product demand. | Do handoffs and guessing earn their cost? Do players understand the occasion from the invitation? Platform discovery and actual itch.io embed behavior remain untested. |
| Which distinctive experience is worth delivering? | “Only these two people could have made this”: a color prompt and a story prompt become an invented exhibit, then each person chooses a detail to keep. This is a design proposition, not a participant quotation or uniqueness claim. | Can each person identify their contribution, and do they voluntarily keep or repeat the moment? The current SVG contains the two optional written lines and scene title/stamp; early choices are not directly rendered into the export. |

The launch claim is not “reveal + missions + memories is new”: the [dated product review](../../../memorable-moments-game/docs/gamejam-2026-10-05.md) already records Paired and Drawful precedents. No relationship benefit, memory improvement, retention or commercial demand has been established.

## Reconciled six-slot competitor ledger

The [October 22 evidence package](../competitor-plays-2026-10-22/README.md) contains agent sessions from October 13–20. Filing/rebuilding dates are not new play dates. Its stronger evidence supersedes the older intake's zero-gameplay tally, but does not establish six complete journeys or human social play.

| Slot / family | Actual edition and endpoint | Evidence and remaining question |
|---|---|---|
| M1 · social creation | [Make it Meme](../competitor-plays-2026-10-22/records/make-it-meme--player-walk-2026-10-13.md): private lobby and settings; no second player, caption round or reveal. | Three banked screenshots, including October 15 reshoots. **Lobby only.** The real social loop remains open. |
| M2 · cooperative puzzle | [Fireboy & Watergirl](../competitor-plays-2026-10-22/records/fireboy-and-watergirl--player-attempt-2026-10-20-fragment.md): Level 1 reached; inputs did not reach the emulated canvas. Reserve [Twin Flames Demo](../competitor-plays-2026-10-22/records/twin-flames--player-record-2026-10-20.md): Level 1 reportedly cleared solo; later level transition uncertain. | Page shells establish page presence, not completed gameplay. Twin Flames' progression rests on the report. A single operator does not test two-person negotiation or timing. |
| M3 · constrained-information tabletop | [Hanabi](../competitor-plays-2026-10-22/records/hanabi--player-record-2026-10-20.md), hanabi.live, three players with two bots: complete 57-turn game, **18 points**. | Entry/end captures; intermediate account is report-based. Eighteen was the reachable maximum after losses, not a perfect 25-point game. Different platform/player configuration from the planned BGA human study; human conventions remain open. |
| M4 · spatial observation | [GeoGuessr / HorrorGuessr](../competitor-plays-2026-10-22/records/geoguessr--player-record-2026-10-20.md): main modes unplayed; seasonal mode six runs, zero days survived, zero pins placed. | Verified captures. No successful guess-to-feedback cycle or shared private location session; seasonal mechanics cannot answer the original social question. |
| M5 · open construction | [Townscaper](../competitor-plays-2026-10-22/records/townscaper--player-record-2026-10-20.md): official free web prototype, six-structure building session. | A save-state URL is recorded; no independent reopening was performed for this packet. This is not the full desktop edition. Count the shared October 20 M5/V5 record once across syntheses; the distinct older October 13 record is not a new title. |
| M6 · authored narrative | [Florence](../competitor-plays-2026-10-22/market-research/florence--market-record-2026-10-20.md) remains unplayed. Reserve [novena](../competitor-plays-2026-10-22/records/novena--player-record-2026-10-20.md): two reported complete nine-visit cycles. | Four verified captures support scenes in the report. Repetition with changing context is relevant; solitary dialogue does not replace Florence's tactile two-person domestic arc. `missed messages.` is an access check, not another played game. |

These six assignments span six working families, including four outside narrative/social creation, with no more than two in a family. Substitutes expand available mechanical evidence but do not close the original-edition questions. **Six qualifying competitor journeys and the human social comparisons remain open.** Raw agent first-person feelings are reflections, not human testimony.

## Intended journey and evidence boundary

Entry and mutual willingness → choose a scene → A's private choice/prediction → handoff → B's private choice/prediction → both-ready reveal → offscreen shared activity with choice-derived roles → optional timer → optional writing through handoffs → shared card → voluntary save/replay/end.

This is the intended route, supported technically by the historical [agent walkthrough](../../../memorable-moments-game/docs/gamejam-2026-10-05.md#journey-i-actually-walked). An agent supplied both sides and did not observe a real pair performing the activity. Record actual routes, omissions, help and exits in the new sheets; do not fill their observed columns from this diagram.

The [October 20 review](https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/memorable-next.md) reports 33 synthetic Chromium assertions at `2026-10-20T15:11:12.948Z` on `822366ad`. Reuse that result explicitly as historical verification of unchanged files. This packet does not claim a new browser run, physical-device check or human accessibility result.

## Fresh artifact launch verification · 27 October

Two launch groups passed: root desktop and nested 390px viewport; keyboard entry, private-choice controls, reload reset, no horizontal overflow, no page errors or failed HTTP responses. See [the actual report](launch-evidence/report.json) and [reproducible launch checker](check-pilot-launch.cjs). Browser automation is not human or physical-device validation.
