# Keeper's Frame (Vivid 0.1.2) — Agent Session Record (2026-10-28)

**AGENT session, not a human session.** Played by the assistant via Playwright + `file://` against the frozen candidate build, because the agent browser refuses loopback URLs (HTTP server verified up at `http://127.0.0.1:8114/`). This record follows the `launch-2026-11-20/SESSION-RECORD.md` structure where applicable. **It is not gate evidence and enters no release denominator.** Full detail: `records/vivid/journey--vivid-0.1.2-2026-10-28.md`.

## Identity, consent and setup

- Session ID / registration: none — agent session, 2026-10-28, unregistered
- Participant pseudonym: none — agent operator
- Observer: none — agent operator, self-observed
- Story / condition / release profile: Iona "A Place for the Promise" (`?profile=remembered#iona`) + Mara "The Unfinished Postcard" (`?profile=remembered#mara`)
- Candidate version / source SHA / immutable master SHA / inventory SHA-256: 0.1.2; source `0c72da97994d9f2d315e6aba1afba5219936b78b`; master packet `f9488e5079d1d193caef560d1fe72936add6cba3`; inventory `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4`; 15 files, 1,401,263 bytes
- Method: `playwright-file-url` (not `manual-in-person` / `manual-remote`)
- Device: Linux VM, managed Chromium 152.0.7977.82, headless, 1280×800 viewport
- Fresh context confirmed: yes — fresh browser context per story; no legacy `keepers-frame:v1` / `vivid:save:<story>:<profile>`
- Consent: n/a (agent session)

## Observed journey — Iona (vivid15, full replay from scratch)

| Elapsed | Scene or goal | Player action | Visible response | Hesitation / help |
|---|---|---|---|---|
| 0:00 | Entry | "Step closer to the frame" | Framed portrait of a harbour keeper in a weathered blue coat; "The last ferry is somewhere in the fog. Iona cannot reach beyond the painted frame. Two harbour marks will tell you how to call it home." / counter "0/2 harbour marks found" | none |
| ~1:00 | Mark 1/2 | Lean left → "Read the tucked page" | "A PAGE BEHIND THE FRAME — FOG PROCEDURE · Aim EAST, toward the old breakwater. The west channel is closed." (header: "Bearing · EAST") | none |
| ~2:00 | Mark 2/2 | Lean right → "Read the brass plate" | "A WORN BRASS PLATE — FERRY CALL · One short flash. One long flash. One short flash. Wait for the answering light." | none |
| ~2:30 | Notch | "Notice the worn notch" | "A WORN NOTCH — A shallow notch has been rubbed smooth beside the lamp. A little wooden wedge rests below it. Someone has kept this ordinary scrap for a long time." | none |
| ~3:00 | Signal (wrong) | "Send the signal" with 1/2 marks | "Find both harbour marks first. A good signal begins with evidence." | The game refuses the signal before the evidence exists — proven by failure [Rectified 2026-10-29: the refusal sentence sits in 55-after-signal.txt [SECONDARY]; the frame is a signal-selection view with no result visible, so it weakly supports rather than shows the refusal] |
| ~3:30 | Signal (wrong pattern) | 2/2 marks, pattern Long · short · long | "No answering light yet. Compare the settings with the two harbour marks. Nothing is lost; you can try again." | none [Rectified 2026-10-29: the failed-signal sentence sits in 65-after-signal.txt [SECONDARY], scrolled out of the frame; the frame is a signal-settings view with no outcome visible] |
| ~4:00 | Signal (correct) | Bearing East + Short · long · short | **"The ferry is safely home — Bearing · EAST · Rhythm · SHORT / LONG / SHORT"** (first ending) | none |
| ~5:00 | Return visit (same profile/context, reloaded) | Reload | "There. The answering light. The ferry has found the breakwater. We can leave the lamp steady now. Would you like to know why I kept that little wedge?" + **"Remember an earlier watch"** | The return is offered, not forced |
| ~6:00 | Recollection | "Remember an earlier watch" | "THE WORN NOTCH · AN EARLIER WATCH — An earlier watch, years before this ferry. The shade rattled all night. I thought keeping the light meant never being frightened. First, help me brace the shade. It will stay where you put it." | none |
| ~7:00 | Brace | "Brace the lamp shade — The catch stays closed. You do not need to hold a button." | Header changes to "A memory · fit the wedge"; the wedge step resolves without a separate click | none |
| ~8:00 | Letter | "Open the private letter" | "That was my letter. You could have asked. We can speak about it later. For now, please read the harbour marks; people are waiting." + **"A FOLDED LETTER — To whoever keeps this light after me: I was frightened every night. I turned it on anyway. — Iona"** | The letter action's label ("The keeper has not offered this letter to you") stays visible after opening — stale state |

## Observed journey — Mara (mara2)

| Elapsed | Scene or goal | Player action | Visible response |
|---|---|---|---|
| 0:00 | Entry | "Look at the workbench" | "A MYSTERY TOLD BY OBJECTS — The station closed on a Thursday. On Friday, its sign painter, Mara, was still at the workbench. The room is empty now. What was she making?" |
| ~1:00 | Examine | Three objects (cancelled timetable; postcard with paint on its edge; two architectural sketches) | Each: "You have examined this. Look again whenever you like." Counter "3/3 objects examined · registration notch 0" |
| ~2:00 | Lightbox | "Align the architectural sketches −/+" | "REGISTRATION NOTCH 3 ALIGNS THE WINDOW EDGES. USE THE SLIDER OR STEP BUTTONS; DRAGGING IS OPTIONAL." |
| ~3:00 | Align | Step + three times to notch 3 → "Read the completed picture" | **"The picture comes together"** — "The last train left. Someone kept a key. · An invitation to bring something broken. · The old room and a new arrangement, drawn on separate sheets." / "The layers move across the lightbox. Look for the window edges meeting at registration notch 3. There is no time limit; each step can be undone." |
| — | Drag | Mouse drag tested | Drag-to-look-around works |

## Outcome, gate fields and evidence (agent-observed, not human gate metrics)

| Field | Agent value | Evidence |
|---|---|---|
| Endpoint reached | true — both stories | Iona ending + return + letter; Mara ending |
| Total duration | Iona ~8 min (ending + return); Mara ~4 min — estimates (the driver logs carry no timestamps) | Driver logs (no timestamps) |
| First assistance | none observed (agent knew the routes from earlier runs — the first Iona profile, iona5/iona6b, was lost in the VM restart and re-earned from scratch) | — |
| `completed_unassisted` | true (agent) | Both endings reached without help |
| Iona `explained_choice_to_return_action` | true (agent) | The return's chain is explicit: the notch → the wedge → brace the shade → the letter |
| Iona `expected_unrestricted_ai` | false (agent) | No unrestricted-AI expectation observed; the frame's limits are stated ("Iona cannot reach beyond the painted frame") |
| Mara `explained_action_to_visible_consequence` | true (agent) | Stepping to notch 3 visibly aligns the window edges; the picture comes together |
| Joint success | true (agent) | Completion + explanation by the same operator |

## Issues (agent-observed, awaiting human triage)

| Issue ID | Build | Reproduction | Severity + rationale |
|---|---|---|---|
| VIVID-AGENT-01 | 0.1.2 | The letter action's label ("The keeper has not offered this letter to you") stays visible after the letter is opened. | Low — stale state; the label should change once the letter is offered. |
| VIVID-AGENT-02 | 0.1.2 | Vivid screenshots occasionally time out (WebGL canvas); text dumps used as [SECONDARY] backup. | Low — agent-tooling friction, not a game bug. |

## Player perspective, after scoring

- No human participant; no verbatim player words. The moment that mattered (agent-observed): the folded letter — because it is the only payoff in the three demos that requires coming back, and it is a sentence, not a reward.
- Iona neutral profile (`?profile=neutral#iona`) not played — optional per the launch doc.
- What the game would tell a friend (agent's reading): it can show you a small story that remembers you; it cannot do anything beyond its frame — and it says so.

## Evidence gallery

![Iona return visit, letter action selected](../evidence/vivid/n0-letter.png)
Caption: Iona on the return visit with "Open the private letter" selected; the button still reads "The keeper has not offered this letter to you" (the stale label the record notes). The letter text itself ("To whoever keeps this light after me: I was frightened every night. I turned it on anyway. — Iona") is in the companion dump n0-letter.txt, not visible in this frame.

### Gallery expansion 2026-10-29

Decisive frames cited in the session tables above [REAL]; each caption states only what the frame itself shows.

![Iona mark 1, tucked page](../evidence/vivid/m1-page.png)
Caption: Mark 1/2 [REAL]: "1/2 harbour marks found" and the panel "A PAGE BEHIND THE FRAME — FOG PROCEDURE · Aim EAST, toward the old breakwater." Verified by PNG read + m1-page.txt.

![Iona mark 2, brass plate](../evidence/vivid/m2-plate.png)
Caption: Mark 2/2 [REAL]: "2/2 harbour marks found" and the panel "A WORN BRASS PLATE — FERRY CALL · One short flash. One long flash. One short flash." Verified by PNG read + m2-plate.txt.

![Iona wrong-pattern signal](../evidence/vivid/65-after-signal.png)
Caption: Wrong-pattern signal [REAL]: the "Long · short · long" pattern button selected. The response sentence ("No answering light yet. Compare the settings with the two harbour marks. Nothing is lost; you can try again.") is in 65-after-signal.txt, scrolled out of this frame. Verified by PNG read + 65-after-signal.txt.

![Iona ending sentence and return offer](../evidence/vivid/74-iona-ending.png)
Caption: First ending and return offer [REAL]: header "The ferry is safely home", the return text ("There. The answering light. The ferry has found the breakwater. We can leave the lamp steady now. Would you like to know why I kept that little wedge?"), the "Remember an earlier watch" button, and the settings line "Bearing · EAST · Rhythm · SHORT / LONG / SHORT". Verified by PNG read + 74-iona-ending.txt.

![Iona recollection, brace the shade](../evidence/vivid/i0-return.png)
Caption: Recollection [REAL]: header "A memory · brace the shade" and the "Brace the lamp shade" button with the earlier-watch text. Verified by PNG read + i0-return.txt.

![Iona fit the wedge](../evidence/vivid/i2-braced.png)
Caption: Fit the wedge [REAL]: header "A memory · fit the wedge", the instruction "Fit it into the notch beside the lamp.", and the "Wooden wedge" / "Worn notch" selectors. Verified by PNG read + i2-braced.txt.

![Iona private letter, letter panel visible](../evidence/vivid/68-private-letter.png)
Caption: Private letter [REAL]: the panel "A FOLDED LETTER — To whoever keeps this light after me: I was frightened every night. I turned it on anyway. — Iona" is visible in this frame (unlike n0-letter.png, where the letter text sits in the dump only). The letter button still carries the stale label "The keeper has not offered this letter to you." Lamp settings in this earlier-run frame are not relied on. Verified by PNG read + 68-private-letter.txt. [Rectified 2026-10-29: added — the session gallery previously showed the letter action (n0-letter.png) but no frame with the letter text itself.]

![Mara lightbox at registration notch 3](../evidence/vivid/42-aligned-notch3.png)
Caption: Mara lightbox at notch 3 [REAL]: the slider with step buttons, "REGISTRATION NOTCH 3 ALIGNS THE WINDOW EDGES", and the three-sentence picture caption. Verified by PNG read + 42-aligned-notch3.txt.

![Mara ending, invitation and interpretations](../evidence/vivid/43-mara-ending.png)
Caption: Mara ending [REAL]: the invitation paragraph ("The postcard was an invitation, not a farewell. Mara was drawing a community workshop inside the old waiting room.") and the three "WHAT STAYS WITH YOU?" cards ("A place to repair things", "A reason to meet again", "An invitation still taking shape"). The "The picture comes together" header is in 43-mara-ending.txt. Verified by PNG read + 43-mara-ending.txt.
