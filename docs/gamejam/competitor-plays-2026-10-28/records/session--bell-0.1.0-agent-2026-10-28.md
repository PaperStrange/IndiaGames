# Bell 0.1.0 — Agent Session Record (2026-10-28)

**AGENT session, not a human session.** Played by the assistant via Playwright + `file://` against the frozen candidate build, because the agent browser refuses loopback URLs (HTTP server verified up at `http://127.0.0.1:8113/`; see the loopback-blocker issue). This record follows the `launch-2026-11-20/SESSION-RECORD.md` structure where applicable. **It is not gate evidence and enters no release denominator.** Full detail: `records/bell/journey--bell-0.1.0-2026-10-28.md`.

## Registration and context

- Session ID / registration slot: agent session, 2026-10-28, unregistered (no human gate)
- Participant pseudonym: none — agent operator
- Facilitator: none — agent operator, self-observed
- Method: `playwright-file-url` (not `manual-in-person` / `manual-remote`)
- Candidate version / implementation SHA / inventory SHA-256: 0.1.0, source `700dcea61eaedc704ddce5adc98d5a6bd5d42a06`, inventory `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e`, index.html `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973`
- Device: Linux VM, managed Chromium 152.0.7977.82, headless, 1280×800 viewport, mouse + scripted clicks
- Build order: candidate Contrast only (previous Contrast as comparator, not played in this session — the Oct-22 round played the reference)

## Run A — candidate Contrast (bell19, the completing run)

- Start / end UTC: 2026-10-28 ~12:11–12:16 UTC (file mtimes: `pw/play-bell19.cjs` 12:11, `pw/play-bell19.log` / `bell/p9-prepared.txt` / `bell/q1-outcome.txt` 12:16)
- End reason: completed (Loop 2 Noon outcome reached)
- Fresh run verified: yes — fresh browser context, `?profile` n/a (Bell has no profile param)
- Mode selected: "Try GameJam / Contrast"

| Elapsed | Scene, phase, loop | Player goal / expectation | Visible action and result | Help | Hesitation / reaction |
|---|---|---|---|---|---|
| 0:00 | Loop 1 Dawn | Predict, then witness the blockage | Predicted "Bell Square draws a masked crowd"; visited Bell Square; read Brann's delivery marks (+1 Fracture) | none (driver knew the route from earlier runs) | The marks' boundary panel ("does not explain a safe route") is the clue's guardrail |
| ~2:00 | Loop 1 Noon | Test the prediction | Resolved Dawn → Noon; journal: "Eyewitness clue · Loop 1 · Noon · Bell Square: you saw the masked crowd close the main alley and strand Mina's crate. This clue survives midnight." | none | "Prepare the side passage" offered in Noon — too late, per its own text |
| ~4:00 | Loop 1 Dusk | Reach midnight | "Ring the boundary bell" → resolve → "Face the thirteenth bell" → Midnight | none | Dusk advances via the bell, not "Enter …" — unstated in-game |
| ~5:00 | Loop 1 Midnight | Anchor one bond + one object | Chose Mina + redflower petal → "Anchor these into tomorrow" → Loop 2 Dawn | none | Without the confirm click, midnight never resolves (bell15/16) |
| ~7:00 | Loop 2 Dawn | Prepare the passage | Clicked the Bell Square pin (map pin, not button) → "Prepare the side passage +1 Fracture — Move the empty stands before Noon" | none | Loop 2 destinations are pins; a button-only driver cannot click them (bell17) |
| ~9:00 | Loop 2 Noon | See Mina's outcome | "Mina and her crate reach the sheltered market well through the side passage you prepared. One uncrushed redflower rests on the well stones." / "The main alley is still blocked; the changed route, not a changed crowd, brought her here." | none | Outcome proven first-hand |

- Prediction asked before travel; exact prediction: "Bell Square draws a masked crowd" — fulfilled ("Foresight fulfilled · Momentum +1" in an earlier run, bell14).
- Action cost, in the game's words: scene actions cost +1 Fracture; a borrowed visit costs 1 Momentum; the preparation costs +1 Fracture. Fracture reached 3/4 in the deepest runs.
- Mina destination actually seen: sheltered market well (Loop 2 Noon), via the prepared side passage.
- Wrong-state observations: "Face the thirteenth bell" is a no-op at Midnight (bell15/16); the advance button's label is the next phase after the resolve (stale-label clicks are no-ops); a visit registers only on a scene action (bell11/12).

### Run scoring — agent-observed (not human gate metrics)

| Metric | Agent value | Evidence |
|---|---|---|
| `explained_cause` | true (agent) | The clue + journal state the cause ("you saw the masked crowd close the main alley") |
| `predicted_before_outcome` | true (agent) | Prediction declared at Dawn, tested by the Noon visit |
| `earned_action_uncoached` | true (agent) | The preparation was earned by the Loop 1 witness, not coached |
| `explained_fracture` | true (agent) | Fracture shown as a counter (3/4) with per-action costs |
| `delayed_recalled_specific_mina_outcome` | not assessed | No neutral break was taken; agent sessions do not do recall breaks |

## Issues (agent-observed, awaiting human triage)

| Issue ID | Build | Reproduction | Severity + rationale |
|---|---|---|---|
| BELL-AGENT-01 | 0.1.0 | The advance rule is never stated: a visit registers only on a scene action; the prediction must be tested; Dusk advances via the boundary bell; midnight needs a confirm click. Five agent runs stalled on it (three in Noon, two at Midnight; bell17/18 excluded — driver failures, not game friction). | High — a first-time human player hits the same wall. Fix: one in-game line stating the rule, then re-test with a fresh player. |
| BELL-AGENT-02 | 0.1.0 | Loop 2 map destinations are pins, not buttons. | Low — cosmetic/consistency; a human clicks pins fine. |
| BELL-AGENT-03 | 0.1.0 | "Face the thirteenth bell" is a no-op at Midnight (button remains visible and clickable with no effect). | Low — stale state; hide or disable the button once used. |

## After both runs

- No human participant; no verbatim player words. The moment that mattered (agent-observed): the Loop 2 Noon sentence — "The main alley is still blocked; the changed route, not a changed crowd, brought her here." — because it is the game's thesis stated as a result, not a claim.
- What felt confusing: the advance rule (see BELL-AGENT-01). What felt repetitive: the Dawn predict → visit → resolve loop is the same shape every phase; the variety is in the scenes, not the verbs.
- Reference (previous Contrast) not played in this session; the candidate stands alone here.

## Evidence gallery

![Loop 2 Noon outcome](../evidence/bell/q1-outcome.png)
Loop 2 Noon, Bell Square — "Redflowers beside the market well": Mina and her crate reach the sheltered market well through the side passage you prepared; one uncrushed redflower rests on the well stones; the main alley is still blocked — the changed route, not a changed crowd, brought her here.

### Gallery expansion 2026-10-29

![Midnight anchor board](../evidence/bell/n8-anchor.png)
Midnight anchor board [REAL] — "What must tomorrow remember?": one bond (Mina, redflower seller / the procession drummer) and one object (redflower petal / drum key), confirm control still reading "Choose a bond and an object" — the board before any pick. Board frame from the bell14/15 driver step n8; the bell19 anchor picks are logged as [p6] and visible as carried items in p9-scene.

![Loop 2 Dawn preparation scene](../evidence/bell/p9-scene.png)
Loop 2 Dawn, Bell Square — "A route remembered" [REAL] (bell19, before the preparation click): carried Bond Mina + Object redflower petal, scar Bellmarked, the Loop 1 eyewitness clue in the journal, and "Prepare the side passage +1 Fracture" offered beside "Borrow a minute · 1 Momentum".

![Loop 2 Dawn preparation committed](../evidence/bell/p9-prepared.png)
Loop 2 Dawn, Bell Square — "A route remembered" [REAL] (bell19, after the click): "Commitment recorded" at Fracture 1/4, the journal now listing "Loop 2 · Prepare the side passage" under Bell Square, carried Bond Mina + Object redflower petal, scar Bellmarked.
