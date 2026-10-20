# Detective: Again! — full case loop: SOLVED + reset verified

**Game:** Detective: Again! by kicodes (itch.io page by Janis / Bubbly Games). Free browser edition. Played via the direct frame URL https://html-classic.itch.zone/html/2574314/index.html (observed from the itch page's iframe src — ordinary navigation; the itch page's own "Run game" click hit the iframe wrapper).
**Session:** 2026-10-06 ~22:43–22:55 PDT (~12 min). No account, no sign-in, no purchase, no download.
**Coverage:** COMPLETE — one full case loop from title to SOLVED state to restart.
**Prior exposure disclosed:** an earlier session played only the opening, then hit Cloudflare 522s and an unresponsive renderer (~13h earlier). This session had NO Cloudflare issue (page loaded first try); the earlier iframe click problem was bypassed via the direct frame URL.

## Event journal (sparse; PDT)

- 22:44 — Loaded itch page, clicked Run game; click hit the iframe wrapper, so navigated directly to the observed iframe src. Title screen "Detective: Again!" loaded.
- 22:46 — Pre-action theory: time-loop detective game. Top sticky-note timer counts up from ~06:50; bottom-right clock-with-arrows icon is a rewind/restart. Dark room scene: seated man, cabinet with small red-glowing object, door "05", locked door, wall clock, left toolbar (magnifier/hand/inventory).
- 22:48 — Clicked the red-glowing object in the cabinet → it vanished from the cabinet; red glow appeared at the man's side (he picked it up — likely a gun). Screenshot captured.
- 22:50 — Clicked door "05" → new scene: tiled bathroom, detective-in-hat at a brown door. Clicked him → message: "If you go into that bathroom, I will shoot you."
- 22:52 — Pre-action theory: the man is a guard; need to enter the bathroom. WRONG THEORY (marked): clicking the man himself (holding the red gun) flipped the message to "You found the killer! Click to replay" at 13:50 — SOLVED. The guard WAS the killer; the threat was the confession.
- 22:53 — Renderer went unresponsive (intermittent all session); reload restarted the game to the 06:00 dark-room opening with the red object back in the cabinet — confirming the game's reset/restart boundary (the in-game "Click to replay" click itself was blocked by renderer flakiness, but restart was verified via reload producing a clean new run).

## Aha / funny moments

1. **The threat is the confession.** "If you go into that bathroom, I will shoot you" — the man promising to shoot you IS the killer telling you he has a gun. The warning and the solution are the same sentence.
2. **The evidence arms the suspect.** The red glow migrates from the cabinet to the man's hand after one click — you watch the "evidence" literally arm him.
3. **Seven clicks to genius.** The whole case resolves in ~7 clicks: the loop design makes you feel like a brilliant detective when it was really one observation (red gun → gunman → killer).

## Friction / almost-quit moments

- **Tooling (the real friction):** the Unity renderer on html-classic.itch.zone died repeatedly — visual clicks failed with frame-unavailable, AX showed "(no interactive elements)", two page reloads needed to recover.
- **Game:** no audio/dialogue trees — solving felt abrupt rather than earned. The loop/rewind fantasy implied by the title and clock icon is barely exercised in this case.

## Locked verdict

"Detective: Again! is a micro-loop mystery that works exactly as advertised — a five-minute time-loop vignette where the 'investigation' is one visual tell (the red gun) and the 'deduction' is clicking the man holding it. It's a cute gag-game rather than a deep detective experience; the loop/rewind fantasy is implied by the title and the clock icon but barely exercised in this case. It is technically fragile in-browser (renderer stalls), but when it runs it plays cleanly end to end: SOLVED CASE reached at 13:50 on the timer, and restart verified."

## Design lesson (for our demo: study a character image to help them; a remembered decision changes a later encounter)

**Make the studied detail load-bearing twice** — first as a pure observation task (spot the red gun on the suspect), then gate a later encounter on the *decision* you made about it (e.g., if you took the gun yourself in the past loop, the suspect can't threaten you with it in the future loop), so "studying" converts into agency rather than a one-shot pixel hunt.

**Falsification:** if players can reach the solved state by clicking every hotspot at random without ever noticing the red object, then the "study the image" mechanic is decorative, not design.
