# Small Hours — Concept Decision Brief (2026-10-28)

**Demo:** Small Hours (Memorable Moments baseline). **Audience:** the 20 November 2026 release gate. **Evidence:** first-hand pair flow + solo rehearsal ([REAL]), competitor coverage (`coverage--small-hours-2026-10-28.md`), journey + art records. Third-person throughout.

## §1 — Why play it

Two people, one screen, five minutes, one keepsake. Small Hours asks a pair to choose privately, guess each other, reveal together, and make something small from the difference. The game never scores them and never fails them. The only artifact is a postcard the pair saves — a brass key that hums, the smell of rain on the harbour steps — and the only question the design has to answer is whether two real people feel that postcard is worth keeping. The demo proves the machine works: the full pair flow runs from "Make a moment" to the keepsake screen, and the SVG download lands (1,425 bytes, verified). What it cannot prove alone is the pair.

## §2 — Why choose it on this platform

| Competitor | What it does | Why Small Hours instead |
|---|---|---|
| Gartic Phone (free browser) | Telephone + draw-guess; album export as GIF | Gartic's reveal is the draw chain; Small Hours' reveal is the *difference between two people's choices* — no drawing skill required, and the pair already knows each other. |
| skribbl.io (free browser) | Live draw-guess with strangers | skribbl proves the loop works with zero social context; Small Hours bets the opposite — the pair is the whole game. No strangers, no lobby, no wait. |
| Split Fiction ($49.99) | Two-player co-op story, hours long | The same promise (two people, one story) in five minutes, no account, no purchase, one screen. |
| PICO PARK 2 ($8.99) | One-screen co-op puzzle | Shared screen, shared failure — but PICO PARK 2 fails you. Small Hours has no fail state; there is no wrong answer. |
| Jackbox Party Pack 11 ($29.99) | Party; phones as controllers | The screen is the stage; Small Hours makes the screen the private space, passed back and forth under a curtain. |
| Tiny Glade ($14.99) | Solo make-to-keep diorama | The artifact is the point — but Tiny Glade is solo. Small Hours makes the artifact *together*. |

No competitor in the six makes a keepsake the pair owns. That is the differentiator to protect.

## §3 — Distinctive experience (three candidates)

**Candidate A — the keepsake is the product.** Two people make an impossible postcard and save it as an SVG. Supported: the full pair flow ran first-hand; the download verified; the keepsake renders both details ("a brass key that hums when the tide comes in" / "the smell of rain on the harbour steps"). *Keep.*

**Candidate B — the reveal alone is the product.** Two private choices, one reveal, nothing made afterwards. Rejected on play evidence: the reveal leads directly into making ("Make something with this. No right answer. The interesting part is what happens next") and the keepsake step; a reveal with nothing made leaves nothing to keep, and the pair flow's own text treats the reveal as a beginning, not an ending. *Reject as standalone; keep as the moment inside A.*

**Candidate C — the solo rehearsal is the product.** Rejected on play evidence: the rehearsal was played to completion (Weather for two, both sides, keepsake reached) and its reveal is labelled "See the rehearsal reveal" — a tutorial label, not a game moment. A solo player has nobody to surprise, and the rehearsal's second detail round is easy to miss (two earlier drivers stalled on it). The design doc's "rehearsal only" matches what the play shows. *Reject.*

## Proposed decision

**Choose Small Hours for the 20 November gate.** The machine is ready: the pair flow, the reveal, the keepsake download, and the solo rehearsal all ran first-hand. The gate's job is the one thing a solo operator cannot prove — six real pairs, two people sharing one screen, measured against the release policy (at least 5/6 unaided reveals, 4/6 both contributing, 3/6 voluntarily saving or replaying). Run the six-pair human gate before 20 November; do not ship on solo evidence alone.

## Evidence ledger

- Journey: `records/moments/journey--small-hours-2026-10-28.md` (pair flow + rehearsal, event journals, drawn routes)
- Art/sensory: `records/moments/art--small-hours-2026-10-28.md` (8-beat pair board, 6-beat rehearsal board, three evidence strips)
- Coverage: `records/moments/coverage--small-hours-2026-10-28.md` (6 titles, 6 families, 2 browser editions studied via browser task). [Rectified 2026-10-29: revised to 9 titles attempted, 6 studied — see the coverage live-window update; browser-task detail splits [REAL] capture text / [SECONDARY] task-report prose.]
- Beats: `evidence/moments/` (PNG + TXT per beat; `keepsake--pair-impossible-postcard.svg`, 1,425 bytes)
- Competitor captures: `evidence/competitors/gartic-phone/` (5 PDFs), `evidence/competitors/skribbl-io/` (5 PDFs)
- Session: `records/moments/session--small-hours-agent-2026-10-28.md` (agent session, pair flow + rehearsal, honestly labeled not a true pair)
- [OPEN] Six-pair human gate: not run; facilitator, participants, reviewer unassigned (release plan, 2026-10-28).

## Evidence gallery

![Keepsake screen](../evidence/moments/b2-keepsake.png)
Keepsake screen [REAL] — "It didn't exist before you two." The postcard reads "A postcard from our impossible place — October 28, 2026 · MADE TOGETHER — PERSON A: a brass key that hums when the tide comes in — PERSON B: the smell of rain on the harbour steps — NO MAP · JUST US", with "Save our keepsake ↓" and "Make another moment" buttons.

### Gallery expansion 2026-10-29

Decisive frames behind the decision above, each read as a PNG before captioning [REAL]. The pair flow was played by one operator playing both sides: flow proof, not pair proof.

![Pair reveal](../evidence/moments/71-reveal.png)
Pair reveal [REAL] — "TWO WAYS OF SEEING: Well, look at that. The same or different — both make a good beginning." Person A chose "An upside-down sea" (guessed a sleepy little moon, "A little room for surprise"); Person B chose "A midnight garden" (guessed an upside-down sea, "A little shared wavelength"). The reveal is the moment inside Candidate A, not a standalone product.

![Solo rehearsal keepsake](../evidence/moments/s6-rehearsal-keepsake.png)
Rehearsal keepsake [REAL] — "The weather when we were here — October 28, 2026 · SOLO REHEARSAL", two rehearsal details, "A FORECAST THAT ONLY HAPPENS ONCE". The rehearsal reached the keepsake, yet remains a tutorial, not the game moment (Candidate C, rejected).

## Live-window update 2026-10-29 (appended; decision above unchanged)

- Verdict stands: ready for the human gate; the six-pair gate remains the only unproven item. Nothing in the live round changes the Small Hours decision.
- skribbl.io completed (winner screen, 1,015 points, [REAL]) strengthens the strangers lesson: even a completed stranger session carries churn, votekicks, and a profane insult — the known pair, not strangers, remains the whole game.
- The second deep family stays [OPEN]: Reign is the diorama family's first real play (Round 3, road never placed; setup by Sakura's takeover, turns via reference clicks) but a partial, not a completed deep play; Drawize (Quick Draw FORK finished, no submitted guess) and Drawasaurus (guessing only, drawing turn never completed) are partials. Gartic Normal (multi-human) stays [OPEN].
- Competitor-UX note (not a Small Hours defect): Drawasaurus's AFK banner covering timed choice buttons and freezing the timer is the failure mode to avoid in any timed-choice UI — overlays must never cover the choice itself. Small Hours' detail rounds carry no timer, so the note is precautionary, not a fix-list item.
