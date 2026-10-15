# Adversarial review (Sakura's lens) — Player-First Play Report, revised edition
**Reviewer:** adversarial / player-truth · **Date:** 2026-10-15 · **Scope:** exported page `~/workspace/your_files/player-first-play-report/player-first-play-report.html` (30 inlined screenshots) vs. filed session records in `~/workspace/gamejam-studies/*/player-replay-*.md`, `player-walk-2026-10-13.md`, `playtest-report.md`, plus the contrast doc.
**Method:** every journey-strip node, caption, correction, and claim checked against the file on disk. No live browser used. Every claim below was read, not asserted.

## Verdict: APPROVE-WITH-FIXES

The rebuild is strong: all 13 journey strips track their records, the four mandated corrections landed, player voice is intact, tooling losses are labeled, and there is no market/business/ranking framing anywhere. Two findings must be fixed before this ships: one factual falsehood (P0) and one page-vs-record contradiction (P1).

---

## Findings

### 1. [P0 — must-fix] Detective: Again! claims "No surviving capture" — but three genuine Oct-6 screenshots exist on disk and are verified

**Page text at fault** (`#detective` article): a dashed placeholder reading "No surviving capture — tooling loss, not the game's fault." The method section reinforces it: "two games have no surviving capture and are marked honestly."

**What the record actually says:** `~/workspace/gamejam-studies/detective-again/snapshots/` contains three captures from the Oct-6 solved session: `01-bathroom-detective-door-05.png`, `02-red-gun-tell.png`, `03-loop-reset-opening.png`. I opened and viewed two of them: `02-red-gun-tell.png` shows the dark room, the seated man with the red glow at his side, the magnifier/hand/inventory toolbar, the sticky-note timer, and the clock-with-arrows rewind icon — matching the filed `playtest-report.md` beat-for-beat ("red glow appeared at the man's side"; "top sticky-note timer"; "bottom-right clock-with-arrows icon"). `01-bathroom-detective-door-05.png` shows the tiled bathroom with the detective at door 05, matching "tiled bathroom, detective-in-hat at a brown door."

**Why it matters:** under Sakura's "no snapshot no reliability" law, claiming a loss that didn't happen is the same class of dishonesty as claiming a win that didn't. The solves described on the page ("the red gun moving to the man's hand," "the threat becoming the confession") are exactly what these screenshots show.

**Required fix:** either (a) embed the three Oct-6 screenshots in the `#detective` article with honest captions ("Oct 6, 2026 session — the solved run; no fresh re-shoot capture exists"), or (b) change the placeholder to "No fresh re-shoot capture — three Oct 6, 2026 session captures exist on file." Do not leave the blanket "No surviving capture" standing.

### 2. [P1 — must-fix] Red Pearls: "never reached the interface for attuning the phone" contradicts the filed Oct-13 record

**Page text at fault** (`#pearls` prose): "I never reached the interface for attuning the phone to a suspect, so I do not claim that interaction." Caption: "the 'attune the phone to a suspect' UI was never reached."

**What the record actually says** (`red-pearls-of-borneo/player-replay-2026-10-13-partial.md`): "So I went into the cabinet, opened Items, clicked the phone, hit IDENTIFY OWNER, and picked Jeremiah. The phone lit up green: Aura Infused." The record's own coverage line summarizes this as "attuned the Rotary Telephone to Jeremiah Goodwill, learned it gets used at 2am by a man with a Bornean accent."

**The tension:** the fresh Oct-15 re-shoot did not reach an attunement screen, and the contrast doc instructed reporting screenshot 2 as "the sensing moment, not the previously described attunement UI." But the filed original record describes the IDENTIFY OWNER attunement in concrete detail. The page's blanket "never reached" denies the Oct-13 beat outright instead of distinguishing the two sessions.

**Required fix:** reconcile, don't erase. Honest text would be: "In the Oct 13 session I identified Jeremiah as the phone's owner (Aura Infused) and learned of the 2am call; the Oct 15 re-shoot reached only the sensing moment, so the attunement screen has no surviving capture." If "attune to a suspect" names a genuinely different UI from IDENTIFY OWNER, the page must name that distinction explicitly — the current wording doesn't.

### 3. [P2 — nit] Dark Room FRICTION node lacks the explicit tooling label

**Page text:** `#dark-room` journey strip FRICTION: "400 fur — Compass grind; reloads reverted progress."

**What the record says:** the reloads-reverting-progress detail comes from the Oct-15 re-shoot session (contrast doc), i.e., a tooling loss. Every other tooling friction on the page carries an explicit tag ("tooling," "A tooling failure, not the game").

**Fix:** append "(tooling)" — "reloads reverted progress (tooling)." Keeps the page's own labeling discipline uniform.

### 4. [P2 — observation, discretionary] Two live sessions disagree on the Different Strokes tutorial; the page resolves it silently

**What happened:** the mandated correction was applied correctly — "SUPER-SPECTACULAR COLLABORATORIUM" is gone from the page (grep confirms zero hits), and the verified "THANKS FOR VISITING! HERE'S HOW THE EXHIBITION WORKS." line is quoted. However, the filed Oct-14 record (`different-strokes/player-replay-2026-10-14-retry-partial.md`) quotes the COLLABORATORIUM speech verbatim from a live session, while the Oct-15 fresh session (two playthroughs, screenshot-backed) never saw it. The likeliest explanations are a game update between sessions or a misquote in the original — the contrast doc already records this. The page presents the fresh line as "the ghost-bat's real welcome" with no hint that an earlier live session recorded a longer variant.

**Fix (optional):** a one-line footnote in `#strokes` — e.g. "An earlier session recorded a longer variant of this speech; the line above is what the Oct 15 re-shoot captured." This is the most honest posture when two live records disagree, and it costs one sentence. Same category, smaller instance: the original Make it Meme walk recorded the "Let's play!" button as disabled, while the fresh re-shoot found it visually enabled but functionally gated — the page correctly presents the fresh evidence per the mandated correction; no change required there, noted for completeness.

---

## Checks that passed (verified, no findings)

- **Journey strips vs. records (all 13):** every ENTRY → SURPRISE → PEAK → FRICTION → STOP node matches the filed record. Spot-verified: Temple's replay drag (stairs, snake-room ellipsis) matches the record's "two slow stretches"; PROMPTBOX's 4 loops + 5th started with SHE SINGS on loop 3 matches; Court's ~6-day record, Winston on Day 2, dragon −400 gold, Chester eating folks anyway, Eye +100/−100 all match; WBWWB's 9-attempt grab wall and unreached ending match; Demonology's sugar-words and inverted-statements chains match; Six Cats' kitchen parking matches.
- **Correction (b) Make it Meme:** no "sat disabled" wording anywhere; page says the bright yellow button "looked ready, but clicking it produced a red minimum-two-players toast and left the lobby at one" — matches the fresh session; the ProSloth (original) vs. LittleVibe (re-shoot) distinction is captioned.
- **Correction (d) Sort the Court:** Eye petitioner captioned "not Winston; Winston was met on Day 2, but that screenshot expired" — exactly right; Winston is not mislabeled anywhere.
- **PROMPTBOX names:** "VELLO is the male understudy and culprit; LA SORRENTA is the singer" — stated correctly.
- **Player voice:** first-person throughout; "No rankings. No market lens." preserved in the hero; no business, market, traction, or ranking framing anywhere; the moments section ("None of these were inferred from design docs. They happened to me, in a browser, while playing.") is pure player voice.
- **Tooling vs. game:** labeled consistently — Anxiety's batched-input skips ("tooling"), There Is No Game's renderer death ("A tooling failure, not the game"), Detective's replay blocks ("Tooling killed each fresh attempt"), Temple's replay drag correctly attributed to the game per the record.
- **Screenshot honesty:** all 30 inlined images counted (5+2+3+2+3+3+3+3+1+0+0+3+2 = 30); every caption carries its session date; journey strips carry the "diagram from the session record, not a screenshot" caption; There Is No Game's no-capture placeholder is truthful (its record confirms the only capture was a non-game test shot).
- **Detective solve details:** "the red gun moving to the man's hand" and "the threat becoming the confession" both verified against `playtest-report.md` ("red glow appeared at the man's side"; "The threat is the confession").
