# Hands-On Browser Games Report — Time-Loop Mystery Research
**The Thirteenth Bell · 2026-09-24**

Eight browser games were actually played (hands-on, 10–55 min each) across three play sessions on itch.io, plus honest failure records for seven more that could not run in this environment. This report sits beside the [desktop-games evidence report](./comparable-games-evidence-report.md).

**Evidence labels:** [REAL] = genuinely played or read from a live page this session. [OPEN] = not verified. Player comments are [REAL] public evidence quoted from itch.io pages.

**Environment caveat:** this session's Chromium cannot initialize HTML5 canvas/WebGL, so canvas-based games failed to boot. Failures were recorded honestly and substituted with runnable games — they were not worked around.

---

## Played [REAL]

### 1. Detective: Again! — Janis (Bubbly Games) · kicodes.itch.io/detective-again
- **Core loop:** point-and-click detective; a countdown timer runs and the loop resets when time runs out (an "I ran out of time" scene). Objective: find and deactivate the time machine.
- **Persists:** knowledge only. World state resets; players report solving it in a single loop, so knowledge is the whole game.
- **Knowledge surfacing:** "?" hint button, detective one-liners, inventory box. No journal, notebook, or map — knowledge lives entirely in the player's head.
- **Repetition:** none observed or reported. Content replays identically; repetition is optional, not designed around.
- **UX strength:** charming concept; the "I ran out of time" fail scene is genuinely praised (hyperboid0: *"A genius concept with a very clever 'I ran out of time' scene"*).
- **UX weakness:** buggy (lockpick-door softlock; clicking the time machine twice breaks the game — DogeKingElite: *"DO NOT CLICK THE TIME MACHINE TWICE. THE GAME STOPS WORKING..."*), too easy, very dark rooms. [OPEN] I did not personally reach a loop reset in ~15 min; reset behavior confirmed via player comments and page text.
- **Player data:** 4.1/5 · 36 ratings. allnamearetake: *"Fun game, but I wish there were more puzzles that used the time travel. I beat it on the first loop."* medas2801: *"It was nice, but so short and easy that I did it all on the first loop without even trying."* fruitsu: *"game is a bit buggy, but a very interesting concept. i feel like it definitely could've been longer."*

### 2. PROMPTBOX — CSAF (Core Systems Asset Factory) · csaf.itch.io/promptbox
*"Three minutes of an overture, played over and over. Only what you work out survives."*
- **Core loop:** each loop is exactly 3 minutes (90 bars; the 60-second overture plays 3×). You are the prompter; five NPCs move through 9 rooms on real schedules. At loop end the curtain rises on a corpse and the loop resets. You spend earned verbs — WATCH (start), then FOLLOW, BOLT doors, DOUSE lamps, PALM items, CUE a whispered line — to re-route people and engineer being in the right room at the right bar to stop the murder, having witnessed opportunity + motive + method.
- **Persists:** knowledge ONLY. The casebook writes to browser storage the moment each fact is recorded — *"A loop that goes wrong costs you the loop. Closing the tab costs you nothing at all."* Verbs earned persist. *"When the loop resets you keep nothing: no levels, no money, no equipment. You keep what you worked out."*
- **Knowledge surfacing:** the CASEBOOK (J key) lists every recorded fact as categorized entries (CONTEXT / MOTIVE / OPPORTUNITY / METHOD, e.g. MOTIVE: "VELLO is told the role will never be his while she sings."); the always-visible side panel shows "X of 12 known" plus three accusation checkboxes (opportunity/motive/method) that light up as earned; the "THE HOUSE" panel shows presence without identity.
- **Repetition:** NO skip or compression — every loop is a full 3 real minutes. *"Interfering is the only way to make the next loop show you something the last one did not."* Mastery is aided by the bar counter and by learning the overture's tune rather than fast-forwarding.
- **UX strength:** zero progress anxiety — the instant-persist casebook plus "there is no restart, only the next time round" makes experimentation free; the verb-unlock economy (knowledge literally buys new actions) is an elegant knowledge-as-currency design.
- **UX weakness:** each loop costs a full 3 real minutes with no fast-forward, so early loops with only WATCH feel slow; phone portrait shrinks the board to ~40% with genuinely small type (admitted by the developer).
- **Player data:** NO star rating and NO comments on the itch.io page (verified via page HTML). Published 04 September 2026; updated 23 September 2026. Trijam #388 jam submission.

### 3. The Red Pearls of Borneo — bushmonkey · bushmonkey.itch.io/the-red-pearls-of-borneo
- **Core loop (deduction):** you are Delphine, a clairvoyant in 1948 London probing psychic "echoes" of a 1941 Borneo plantation tragedy.
- **Deduction interface:** THE MIND'S EYE — a node-based timeline grid (Tuesday 15:00–23:00, Wednesday 00:00–08:00) where you trace each guest's movements hour by hour; nodes turn green when solved. Loop: pick a location on the plantation map → set the hourly slot → select a character's photo → press FOCUS to summon a psychic "echo" (a narrated vision of that person at that hour). Names in echo text are clickable links that open INVESTIGATION NOTE panels — free-text notes pinned to people, items, and locations.
- **Handholding:** difficulty choice at start — NORMAL vs HARDCORE (hardcore disables the global timeline tracker and discovery hints). Tutorialized first echo; per-hour headcount badges nudge toward populated hours on Normal.
- **UX strength:** summoning an echo — photo + hour + FOCUS — is a tactile, diegetic deduction ritual that makes "testing a theory" feel like casting a spell; the timeline's per-hour headcounts are a superb orienting device.
- **UX weakness:** the clickable-names note mechanic is undiscoverable (triggered accidentally); the Mind's Eye header icon is tiny and easy to miss entirely.
- **Player data:** 343 total ratings (stars not displayed in listing). PinkPhoenix: *"this was sooooo good I was fully immersed in the game."* Mizilene: *"Made my brain hurt in the best way."* Granny Sniff (critique): *"the ui often blocks the view of the events."* majkm: *"I didn't really notice the minds eye"* (matches the UX finding). Optimust: *"Storytelling I'd give a 5/5... Gameplay: 3/5... I did find myself many times 'throwing stuff at the wall.'"* qwertyasdef: *"I wish there were a way to save partial information, like if I know part of someone's [identity]."*

### 4. Investigator and the Case of the Chekhov's Gun — theskyandthesea · theskyandthesea.itch.io/investigator-the-chekhovs-gun
- **Core loop (deduction):** point-and-click whodunnit; Investigator the alligator + sidekick The Bad Luck Duck probe the apparent suicide of The Bipolar Bear.
- **Deduction interface:** a CASE FILE folder (always on screen) with two tabs — CLUES: a corkboard of polaroid-style clue slots (undiscovered clues show "?"); VICTIM/SUSPECTS: victim bio + 4 suspect photo slots. Cases end with an explicit accuse-the-murderer step.
- **Handholding:** strongly linear and dialogue-driven; the case file auto-organizes everything found. No fail state in the opening; very long unskippable intro briefing.
- **UX strength:** the polaroid clue board makes collecting evidence tangible and delightful; hand-drawn art and pun-heavy writing give it real charm.
- **UX weakness:** ~10 minutes of intro dialogue before meaningful interaction; small click targets (corroborated by Hades: *"I got stuck on the first one only because I couldn't get the mouse to click it"*).
- **Player data:** 282 total ratings (stars not displayed in listing). Shad0wWolf96: *"the artstyle and writing are perfect and unique! It was a little short."* 9 (critique): *"The only issue I had was with the puns, which were, for my taste, a bit 'too' much. And it hurt to play through the game with the fear that a 'clue' was just a pun."* MooingLemur (critique): *"I had to get the last puzzle wrong like 5 times before I knew what it wanted exactly."*

### 5. Where Is Starlingdive? — neokry · neokry.itch.io/where-is-starlingdive
- **Core loop (deduction):** a 2008 college radio DJ "starlingdive" vanished; prove she never withdrew. 18 identities to solve, ~2–3 hours.
- **Deduction interface:** the WHO'S WHO board — for each forum handle you match FIRST NAME + LAST NAME (dropdowns) + PHOTO (collected candid photos via "PLACE A FACE"). *"For each printed handle, match a first name, last name, and photo. When all three fields are correct, those people lock in together."* Per-group progress counter. Free navigation between FORUM (searchable 2008-style message board), RECORDS (sealed conduct files), INVENTORY (photos), NOTES. A HINT button exists. Wrong guesses cost nothing.
- **UX strength:** the "lock in together" identity confirmation gives satisfying incremental feedback; the diegetic 2008 message-board/records-desk UI makes research feel like real detective work.
- **UX weakness:** no suggested reading order — easy to feel adrift (corroborated by Erimora: *"maybe a more clear order to read the forums in"*); long expository file dumps (corroborated by Chvorka: *"The information/file dumps felt pretty clumsy to me"*).
- **Player data:** 255 total ratings (stars not displayed in listing). ragnorinki: *"This was incredibly well done, chilling and endearing and entertaining."* velinaveli: *"hardest part for me was the face to name matching."* pericostic (critique): quit after noticing obviously AI images. Dev is actively patching (September 2026 updates; Steam version with hand-made new art announced for 2027).

### 6. Slice of Quest — Voycawojka · voycawojka.itch.io/slice-of-quest
- **Core loop:** short time-loop puzzle adventure (GMTK Game Jam 2026). You are a minor deity of time who lost 3 totems. Each loop starts with 7 mana (flask icon); entering a NEW area costs 1 mana; mana 0 → loop resets. Totems grant control of time of day and seasons (e.g., winter freezes water so you can cross). Hub room (4 chests + clock portal) leads to the Mortal Realm.
- **Persists:** [OPEN] I could not drain mana to 0 in ~55 min of exploration, so the reset was never observed firsthand. By design intent (page text: "You can influence the starting state of the world at the beginning of each loop"), totems persist; knowledge (NPC hints, map layout) persists in the player's head.
- **Knowledge surfacing:** NPC dialogue with branching choices (Finna the sailor's "walk on water" hint), wooden signposts. NO journal, map, quest log, or UI tracking — all knowledge is in NPC text, signs, and player memory. Repeated dialogue replays identically.
- **UX strength:** charming readable pixel art; the mana-flask countdown is a clean, instantly legible loop timer; NPC hints are genuinely helpful without handholding.
- **UX weakness:** no map or objective tracking in a large world — ~55 min of wandering without finding a totem or triggering a reset; slow movement; no way found to voluntarily end a loop early.
- **Player data:** no star rating, no ratings count, 0 comments.

### 7. Is this me? — Doersein / Black Fig Games · doersein.itch.io/is-this-me
- **Core loop:** precision platformer (Brackeys Game Jam 2026.2). *"Dying is not how you fail. It is how you play."* Press F to die on purpose; the run you just played comes back as a clone that *"walks the exact path you walked, stands where you stood, holds the plate you held."* Later clones become unreliable (*"One replays late. One rushes ahead... One reaches for a lever again and again. And one of them kills you."*).
- **Persists:** clones (recorded runs) persist within a room and accumulate; nothing persists beyond the room (R restarts clean). Knowledge = muscle memory.
- **Repetition:** death resets the room instantly with no fade or menu — repetition is frictionless. Content does not compress.
- **UX strength:** instant respawn makes experimentation feel free; the "die on purpose" framing reframes failure as progress — psychologically clever.
- **UX weakness:** the headline clone mechanic is gated behind a precision skill check — I was stuck ~20 min on Level 1's spike gap and never saw a clone manifest [OPEN]. No practice/assist options.
- **Player data:** no star rating, no ratings count, 0 comments. (Dev note: *"This is my first game jam... there might be bugs sorry in advance."*)

### 8. Echo Diver — bronevichok · bronevichok.itch.io/echo-diver
- **Core loop:** *"Ten seconds. One diver. Every failure returns to help."* Each dive gives exactly 10.0 seconds of oxygen; swim to the exit hatch while pufferfish turrets shoot and pressure switches must be held. When a dive ends, your movement is recorded; next dive, an echo (green ghost, numbered 1, 2, 3...) replays your exact path, fights enemies, and holds switches alongside you. I completed 5 dives on Level 1/10 ("First Breath").
- **Persists:** echoes — full recordings of each prior dive's movement (and auto-fire) accumulate within the level (up to 10 dives); level progress persists. Nothing carries between levels (10 levels total).
- **Knowledge surfacing:** HUD "DIVE X / 10", "LEVEL 1/10 · FIRST BREATH", live oxygen countdown, "ECHOES ONLINE: N" banner, each echo labeled with its dive number; "OUT OF OXYGEN / ECHO N RECORDED" interstitials. The echoes THEMSELVES are the knowledge surface — your past behavior is visible as green ghosts.
- **Repetition:** mastered content is AUTOMATED, not skipped — your successful sub-tasks (e.g., swimming to a switch and holding it) are replayed by echoes, freeing you to do the next job. The 10-second loop is identical each time with no fast-forward, but it is so short that repetition never drags. Failed dives are never wasted — every attempt adds an echo.
- **UX strength:** the echo system turns every failure into visible progress — extremely motivating; the 10-second loop keeps iteration tight and the growing "ECHOES ONLINE" count gives a real sense of growing power; auto-fire removes aim friction so focus stays on routing.
- **UX weakness:** the game assumes held-key smooth movement — tap-based input was too slow to reach the switch in 10 s, so Level 1 stayed unsolved. Echoes replay EXACTLY, including mistakes: a bad early dive pollutes your team with useless ghosts, and there is no way to delete a single bad echo (only the 10-dive cap resets).
- **Player data:** no star rating, no ratings count, 0 comments. (Page notes: generative AI assisted with programming and interface text; not graphics or audio.)

---

## Not playable in this environment (recorded, not retried)
| Game | Ratings | Reason |
|---|---|---|
| Murky (Mecha Studios) — narrative puzzle adventure, 3-day loop | none shown | No browser version; Windows .exe download only (84 MB) |
| P.E. Noire (Picogram) | 4.7★ · 1,643 | Canvas boot failure |
| Let Sleeping Dogs Lie (BRANE) | 4.8★ · 374 | Canvas boot failure |
| Shift At Midnight (bun muen) | 4.7★ · 366 | No browser version; demo moved to Steam |
| Confidential Killings (BRANE) | ~350 | Canvas boot failure |
| Sketchy Individuals | 4.5★ · 563 | Canvas boot failure |
| Until Death Do We Part (anniversary VN) | — | Windows 482 MB download only |

---

## Cross-game design takeaways for The Thirteenth Bell
1. **Knowledge-only persistence is the dominant pattern** (PROMPTBOX, Detective: Again!) — it matches our loop design and players accept it without complaint when the knowledge surface is strong.
2. **Zero-anxiety persistence is the gold standard** (PROMPTBOX: "Closing the tab costs you nothing at all"). Our Midnight Anchor Board + Momentum serve this; say it out loud in the rules so players experiment freely.
3. **Deduction surfaces beat silent knowledge:** categorized casebooks, time-grids, lock-in confirmations. Contrast's Theory board (string-and-pin, redacted-until-proven) answers the lock-in-feedback lesson directly.
4. **Repetition must compress or stay short.** PROMPTBOX's 3-minute no-skip loops were its clearest weakness; Echo Diver's 10-second loops and automated mastered sub-tasks are the fix shape. Contrast's shortened return scenes and prediction-before-travel respond to exactly this complaint (which also echoes the Twelve Minutes repetition complaints in the desktop report).
5. **Don't gate the core loop behind skill checks** ("Is this me?"): the time-loop twist should land in the first minutes, not behind precision play.
6. **Tutorialize the deduction verbs explicitly** — discoverability failed in Red Pearls (tiny Mind's Eye icon) and Starlingdive (no reading order). Our Theory-board verbs (pin, link, redact, validate) need onboarding, not a tooltip.
7. **Show partial credit** (qwertyasdef's request to save partial identity info): batched phase-boundary validation must keep partial progress visible rather than silent.
8. **Slice of Quest is the cautionary tale:** no knowledge surface + big world = 55 minutes of aimless wandering. A mystery loop game needs an explicit notes/deduction surface from loop one.
