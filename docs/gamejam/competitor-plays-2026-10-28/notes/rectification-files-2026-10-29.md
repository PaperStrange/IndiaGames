# Rectification of playing recording files — IndiaGames game-jam package (2026-10-29)

Scope: `play-2026-10-28/{bell,moments,vivid}/` (demo beat PNGs + TXT dumps),
`play-2026-10-28/competitors/` (per-game PDFs, renders, GIF), the Small Hours
keepsake SVG, and `~/.hatch-browser/outputs/` as reference only.
Rules observed: no file moved, renamed, or deleted; copies only; no .md file
edited (this log is newly created); nothing filed, pushed, or committed.

## 1. Inventory (mechanical, verified by the parent)

Demo dirs (700 files total):
- bell: 177 PNG + 177 TXT + journal.json = 355 files, 51M.
- moments: 85 PNG + 85 TXT + journal.json + keepsake SVG = 172 files, 6.8M.
- vivid: 85 PNG + 87 TXT + journal.json = 173 files, 63M.
- vivid anomaly: 2 TXT dumps with no PNG sibling (b0-return-state.txt,
  b1-remember-watch.txt). Every PNG in all three dirs has a TXT sibling
  except moments/38-curtain-b.png (see §4).

Competitors/ (364 files, 39M, all levels): 30 PDFs, 146 PNGs, 2 GIFs, 9 MDs,
139 TXTs, 27 driver scripts (.cjs), misc (journal.json, chrome.pid).
Top-level per game: birdography 5 PDF / 6 PNG / 1 MD; core-rush 2 PDF / 1 MD;
drawize 0 PDF / 1 PNG (render-fork); gartic-phone 5 PDF / 2 GIF / 1 MD;
pixel-harbor 5 PDF / 1 PNG / 1 MD; rollback 8 PDF / 5 PNG / 1 MD;
skribbl-io 5 PDF / 1 MD; skribbl 1 PNG; field-guide 10 files (replay only);
the-same-bullet 4 files; codenames-game 2; detective-again 3; drawasaurus 2;
fireboy-watergirl, last-seen-online, night-oclock, pathipelago, photohacks,
tranquility 0 files at any level.
Per-game totals including replay-2026-10-28 subdirs: birdography 50,
core-rush 199, pixel-harbor 23, rollback 29, skribbl-io 26, gartic-phone 14,
field-guide 10, the-same-bullet 4, detective-again 3, codenames-game 2,
drawasaurus 2, skribbl 1. Replay subdirs hold headless-replay output that was
already discarded as live evidence — they are inventoried here, not endorsed.

Reference only: ~/.hatch-browser/outputs/ = 37 task dirs, 182 browser-page
PDFs, 235M. Live-window PDFs live there, not in competitors/ — the package
holds its own renders for only five games (see §5).

In-package competitor PDF text layers (first-round beats only): birdography
5 × 1005 bytes (identical itch-page chrome — canvas content is not in the
text layer); core-rush 2552/2571; gartic-phone 478/423/97/464/215;
pixel-harbor ~2000 each; rollback 2790–3602 (itch description text);
skribbl-io 1126/297/506/418/408. A text layer is never, by itself, visual
proof of gameplay.

## 2. Duplicate groups by md5 (demo PNGs, all 347 checked — flag only)

50 byte-identical groups. Nothing deleted: records and git history reference
these files. "Distinct" counts: moments 85 PNGs = 30 distinct images.

- 00ef9269: vivid/m5-ending, m6-return, m7-recollection, m8-braced, m9-wedge
- 02524fc8: moments/36-a-guess, 37-a-seal, 38-curtain-b
- 18eea9aa: bell/l6-dusk, l8-anchor, l9-anchored, m1-prepared, m3-outcome, n6-dusk
- 1d2366f9: vivid/13-step03, 13-step04
- 2052b794: moments/14-step02, 14-step03
- 23d9dfb7: bell/e9-prepared, f0-loop2-noon, f1-outcome
- 24f25424: bell/b0-loop2-square, b1-prepared, b2-loop2-noon, b3-outcome, g9-prepared, h0-loop2-noon, h1-outcome
- 25fce854: moments/02-rehearsal-start, 03-step00, 23-step01
- 3447e487: moments/r3-rehearsal-reveal, r4-rehearsal-keepsake
- 37b265c5: vivid/i0-return, i1-recollection
- 3c06376a: moments/99-final, s6-rehearsal-keepsake
- 45fc809c: vivid/01-iona-inside, 05-iona-return, 21-iona-inside
- 4b5dfd8b: moments/35-a-choice, 40-b-guess, 41-b-seal, 42-reveal, 43-activity, 44-activity2, 45-keepsake, 46-pair-final
- 4c1cdd2a: vivid/55-after-signal, 56-iona-ending, 57-iona-return
- 559d8a15: bell/32-step28, 32-step29
- 561ffa3b: moments/91-detail-A, a1-detail-A
- 5734b07a: bell/c9-dusk-visit, d0-midnight, d1-anchor, g3-noon, g4-dusk, j4-noon-hospice
- 65c2161e: bell/99-final, q1-outcome
- 66785705: moments/63-b-sealed, 70-both-sealed
- 78026d4b: moments/01-pair-entry, 11-pair-scenes, 31-scenes
- 790c28de: moments/73-step0, 74-pair-final, 80-keep-detail-curtain, 90-keep-detail
- 79b04e97: bell/c0-entry, p0-entry
- 7b8c3f21: vivid/13-step05, 13-step06, 13-step07
- 806f7067: vivid/99-final, n0-letter
- 8cc7318a: moments/00-entry, 10-pair-entry, 20-entry, 30-entry, 60-entry
- 9543b087: bell/41-marks-read, 51-dawn-marks, 81-dawn-marks, a1-dawn-marks, c1-dawn-marks, e1-dawn, g1-dawn, j1-dawn, l1-dawn, n1-dawn, p1-dawn
- 9708ebb0: vivid/02-iona-step00…02-iona-step07, 03-iona-first-ending (9 files)
- 975cf8ae: bell/01-contrast-intro, 21-contrast-intro
- 9db4681d: bell/86-midnight, 87-anchor, 88-anchor-open, 89-anchor-picked
- ad98bd03: moments/a2-keepsake, a3-after-save
- b149d7f9: bell/g5-dusk, g6-midnight, g7-anchor, g8-loop2
- b15f6e60: bell/22-prediction, 31-prediction-locked
- b284346d: moments/64-step01, 71-reveal
- b2a4a7f1: vivid/27-after-signal, 29-iona-ending, 30-iona-return
- ba81eee8: bell/32-step07…32-step10
- c3b771b9: moments/14-step00, 14-step01
- c80c4fed: vivid/61-mark1-bearing, m1-page
- cd233875: vivid/65-after-signal, 66-iona-ending, 67-iona-return
- ce362031: bell/25-step00, 32-step00, 32-step01, 32-step02, 32-step05, 32-step06
- d310215e: bell/63-noon-square, 64-resolve-noon, 65-dusk, 84-noon-witnessed, 85-dusk, a4-noon-witnessed, a5-noon-visit2, a6-dusk, a7-traveler, a8-anchor, a9-after-midnight, c5-noon-witnessed, c6-noon-resolved, c7-noon-visit2, c8-dusk, e3-noon-witnessed, e4-dusk, j3-noon-witnessed, k1-prepared, k3-outcome (20 files)
- d5c180e8: moments/13-person-a, 22-person-a-curtain, 33-play
- d64f4601: vivid/62-mark2-plate, 63-notch, m2-plate, m3-notch
- d76282c0: bell/32-step12…32-step17
- d97a1754: moments/23-step00, 34-curtain-a, 61-a-choice-screen
- db3629b4: moments/81-detail-A, 81-detail-B, 82-keepsake, 83-after-save
- df057a2b: vivid/00-iona-entry, 20-iona-entry, 50-iona-entry, 60-iona-entry, 70-iona-entry, m0-entry
- df722b74: moments/12-scene-chosen, 21-scene-chosen
- e0444454: vivid/06-mara-entry, 07-mara-step00…07-mara-step03
- e1993855: moments/23-step04, 23-step05
- e2253c90: moments/47-rehearsal, 48-reh-choice, 49-reh-seal, 50-reh-next, 66-rehearsal-scenes, 67-rehearsal-choice, 68-rehearsal-after, 76-rehearsal-scenes, 77-rehearsal-choice, 78-rehearsal-after, 79-step0, r0-rehearsal-start (12 files)
- eacf9407: bell/l3-noon-witnessed, l4-noon-hospice, n3-noon-witnessed, n4-noon-hospice
- ecf31cb6: moments/64-step01, 64-step02, 65-pair-final, 72-activity
- f15fbdcb: moments/a1-detail-B, b2-keepsake, c2-keepsake, d1-keepsake

Consequence: whole supposed beats have no distinct frame (see §4 for moments;
bell/vivid equivalents pending §3).

## 3. Bell + Vivid misnomers and TXT/PNG mismatches (audit child)

Method: every verdict from reading the PNG itself, never its TXT dump.
TXT/PNG verdicts compare the TXT against the PNG's visible content; both
dirs' TXTs are full-page dumps, so extra off-crop text was not counted as a
mismatch unless it describes a panel closed or contradicted in the visible
state. "Hard misnomer" = the frame shows a different named beat/phase or
directly contradicts the name. "Weak" = the named beat is not visible
(generic map/ledger view, or a pre-action state) but the frame shows no
contradictory beat. Known duplicates were verified by sha256 and not
re-reported as misnomers unless the shared frame's content disagrees with
the name. Keyword note: zero filenames in either directory contain
postcard, harbour, market, or well (the market well appears inside frames
and TXT text, not filenames). Bell has no ending/letter/return/signal/
notch/plate filenames; vivid has no prepared/anchored/outcome filenames.

Vivid — hard misnomers (14):
- 03-iona-first-ending.png = Iona intro frame ("0/2 harbour marks found", "Look straight ahead" highlighted, "You there. Will you help me with the light?"). Intro state, not an ending (byte-identical to all 02-iona-step frames).
- 05-iona-return.png = same Iona intro frame, 0/2 marks, no button highlighted. Intro state, not a return visit (byte-identical to 01/21-iona-inside).
- 29-iona-ending.png = scrolled signal-selection view ("A WORN NOTCH" panel, East + Short·long·short highlighted, "Send the signal" highlighted); no ending text. Signal-selection state, not an ending (= 27/30 bytes).
- 30-iona-return.png = same signal-selection frame. Not a return visit.
- 56-iona-ending.png = scrolled signal-selection view (brass plate panel, East + Long·short·long highlighted, "Send the signal" highlighted); no ending text. Signal-selection state, not an ending (= 55/57 bytes).
- 57-iona-return.png = same signal-selection frame. Not a return visit.
- 66-iona-ending.png = signal-settings frame (brass plate panel, East + Long·short·long, "Send the signal" highlighted); no ending text. Its TXT says "No answering light yet" — a failed signal, explicitly not an ending. Failed-signal settings state (known dup 66=65; reported because content disagrees with "ending").
- 67-iona-return.png = same signal-settings frame. Not a return visit.
- 63-notch.png = "A WORN BRASS PLATE / FERRY CALL" panel, 2/2 marks; no notch panel anywhere. Brass plate state, not the notch.
- m3-notch.png = same brass plate frame, 2/2 marks; no notch panel. Brass plate state, not the notch (known dup m3=m2).
- m5-ending.png = scrolled signal-selection view (East + Short·long·short highlighted, "Send the signal" plain, "Open the private letter / The keeper has not offered this letter to you."); no ending text. Signal-selection state, not an ending (known dup m5=m6).
- m6-return.png = same signal-selection frame. Not a return visit.
- m9-wedge.png = same signal-selection frame; no wedge/notch panel visible. Signal-selection state, not the wedge.
- 75-iona-return.png = ferry-home ending frame ("There. The answering light. The ferry has found the breakwater…" + "The ferry is safely home" header + "Remember an earlier watch" button). Iona ferry-home ending, not a return-visit screen.

Vivid — weak / unsupported (5, plus 1 precision note):
- 27-after-signal.png = signal-selection frame, "Send the signal" highlighted, no post-signal result visible; TXT blocked-signal line ("Find both harbour marks first") sits above the PNG crop, so the PNG alone does not evidence an after-signal state.
- 55-after-signal.png = same class (Send highlighted, no result visible; TXT blocked-signal line, 1/2 marks).
- 65-after-signal.png = signal-settings frame, no outcome visible in the crop; TXT claims a failed signal ("No answering light yet") above the crop. Weakly supported, not flatly contradicted.
- 99-final.png = signal-selection frame (East + Short·long·short, Send plain, letter action with "not offered" sublabel); no final/ending panel. Mid-game state, not a final screen (known dup 99=n0).
- n0-letter.png = confirmed per brief: shows only the letter action ("Open the private letter" highlighted with the stale "The keeper has not offered this letter to you." sublabel); NO letter text is visible. True visible letter panel is 68-private-letter.png.
- Precision note (not counted): 51-lean-Leanright.png shows the right-edge panel (brass plate + letter actions) at 1/2 marks with no lean button highlighted — treated as agreeing, since the edge content is the leaned-right state.

Bell — hard misnomers (25):
- "Dusk" files showing Noon (6): 65-dusk, a6-dusk, c8-dusk, e4-dusk = all the same "NOON · BELL SQUARE / The alley has closed" panel (Mina + crate stranded at auction stalls, eyewitness clue in journal); 65-dusk byte-identical to 84-noon-witnessed. g4-dusk = Noon witnessed summary + "NOON · SAINT ORRA'S HOSPICE / The bellkeeper has left his sickbed". j6-dusk = Noon witnessed summary + "NOON · UNDERBELL / Procession of the first chime".
- "Loop 2" files showing Loop 1 (4): 92-loop2-noon = Loop 1 Noon phase-boundary modal ("Wait beside the traveler · Fracture 2/4", "Prediction disproved", "Enter Dusk"); its TXT header also says Loop 1 Noon. b0-loop2-square = Loop 1 Noon "alley has closed" panel, journal Loop 1 entries only. e8-loop2 = "DUSK · BELL SQUARE / The alley has closed" panel, Loop 1 journal only (TXT header: Loop 1 Dusk). g8-loop2 = Loop 1 Noon Underbell scene (byte-identical to g7-anchor).
- "Anchored" files contradicting the name (3): 89-anchor-picked = North Gate commitment screen (Fracture 2/4, "Resolve the phase"); sidebar "Carried through midnight: Nothing chosen yet" — no anchor picked (byte-identical to 87/88-anchor). j9-anchored = Noon map + witnessed panel; sidebar "Nothing chosen yet". l9-anchored = Dusk Underbell commitment screen (Fracture 3/4, "Ring the boundary bell"); sidebar "Nothing chosen yet" (byte-identical to l8-anchor and m1-prepared).
- "Anchor" files showing other scenes with no anchor UI (4): a8-anchor = Noon "alley has closed" outcome panel. d1-anchor = Noon Hospice scene ("The bellkeeper has left his sickbed", "Read the unfinished lullaby" / "Follow the wet footprints"). g7-anchor = Noon Underbell scene ("Procession of the first chime"). l8-anchor = Dusk Underbell commitment screen (Fracture 3/4).
- Other wrong-scene names (8): l4-noon-hospice = "NOON · BELL SQUARE / The alley has closed" panel + Commitment recorded (Fracture 2/4) + "Resolve the phase"; no Hospice content. b1-prepared, g9-prepared, k1-prepared = Noon outcome panel with "Prepare the side passage" still offered as an untaken action (note: "The preparation window ended at Noon"); nothing prepared. e9-prepared = Dusk Bell Square panel with "Prepare the side passage" still offered. m1-prepared = Dusk Underbell commitment screen; no preparation content. o1-prepared = anchor board modal ("What must tomorrow remember?", redflower petal highlighted, choice unconfirmed); no preparation content. o3-outcome = same anchor board modal; no outcome panel.

Bell — weak / unsupported (11): 69-anchor (Loop 1 Noon map + Anchored memories panel, "Nothing chosen yet"; pre-choice state; TXT matches visible numbers 1:23 elapsed, Loop 1, 1 visit, redflower petal); 70-anchor-choose (same map view; no choice highlighted/selected); 87-anchor, 88-anchor-open (Noon North Gate commitment screen Fracture 2/4; no anchor panel open, no anchor UI); 73-prepare (Loop 1 Noon map view; no preparation action visible); 76-outcome (Loop 1 Noon map view; no outcome panel visible); 91-prepared (Noon phase-boundary modal "Enter Dusk"; no preparation action visible); e7-anchor (Dusk map + witnessed summary; no anchor UI, "Nothing chosen yet"); j8-anchor (Noon map + witnessed panel; no anchor UI); m3-outcome (Dusk Underbell commitment screen "Ring the boundary bell"; the boundary outcome itself not yet shown); n9-anchored (anchor board with redflower petal highlighted but no bond selected, button still "Choose a bond and an object" — selection unconfirmed, so "anchored" overstates the frame).

Not misnomers (for the record): vivid agreeing names include 02-step01, 04-collection, 07-mara-step01, 11-workbench, 13-step02, 13-step06, 22-lean-Leanleft, 24-notch, 42-aligned-notch3, 43-mara-ending (genuine Mara ending text), 53-notch, 54-signal-ready, 60-iona-entry, 62-mark2-plate, 64-ready, 68-private-letter (the true visible letter panel), 73-after-signal, 74-iona-ending (genuine ferry-home ending), i0-return (earlier-watch recollection = return-visit content), m1-page, m2-plate, m4-signal. Bell agreeing names include all entry modals (20, 30, 40, 80, c0, e0, g0, j0), all step/boundary captures (03-step00, 32-step02/06/10/14/18/22/26, 43-step01/05, 52-boundary0, 53-phase0, 61-resolve-dawn), 84-noon-witnessed, b3-outcome, c4-noon, f1-outcome, h1-outcome, k3-outcome, 99-final and q1-outcome (Loop 2 Noon "Redflowers beside the market well" outcome scene — agrees with both "final" and "outcome"), n8-anchor (genuine anchor board), p6-anchored (carried "Bond · Mina, redflower seller / Object · redflower petal" visible), p1-dawn, p9-prepared (journal shows "Loop 2 · Prepare the side passage" + commitment recorded), p9-scene, n3-noon-witnessed (weak-agree: Noon Bell Square panel + eyewitness clue in journal).
Side observation, not a filename/TXT issue: vivid 64-ready shows East + Long·short·long selected, which contradicts the brass plate's Short·long·short — a gameplay-state note only.

TXT/PNG mismatches: vivid 2 (n0-letter, 99-final — same bytes, same cause: TXT contains the full letter text and the Iona line "That was my letter. You could have asked…", while the PNG shows only the letter button with the "not offered" sublabel — the letter panel is not open; full-DOM-dump effect, a closed panel's text in the dump). All other 41 vivid pairs checked match visible content; in particular 03-iona-first-ending.txt and 05-iona-return.txt match their PNGs (both intro state) — those failures are filename-only, not TXT failures. Bell 0 mismatches among the 72 checked: every checked pair's visible panel text, scene header, Fracture count, and (where the Journey panel is visible) elapsed/loop/visits/satchel matches the sibling TXT. Two caveats, neither counted as a mismatch: systematic 1-second elapsed skew on map-view pairs (PNG vs TXT: 69-anchor 1:23 vs 1:24; 73-prepare 3:02 vs 3:03; 76-outcome 4:09 vs 4:10) — the timer ticking between PNG capture and TXT dump; and for modal/scene crops the Journey panel is not visible, so elapsed/visits/satchel could not be cross-checked from the PNG (verdicts rest on visible panel text; in every case the TXT's scene/phase header agreed with the PNG — e.g. 92-loop2-noon's TXT says Loop 1 Noon, matching its PNG; the filename is the wrong part, not the TXT).

Coverage (explicit, no full check claimed): vivid 43/85 (all 30 specific-content names — ending, letter, return, final, signal, notch, plate — ∪ every 4th file in sorted order, 21 files = 43 unique pairs, each PNG + TXT read). Bell 72/177 (all 34 specific-content names — anchor, anchored, prepare, prepared, outcome, final — ∪ every 4th file, 44 files = 72 unique pairs, each PNG read and TXT read or targeted-grep verified). The 42 vivid + 105 bell unchecked files are step/entry/boundary/phase/dawn/noon/dusk-visit files outside the required keyword set and the every-4th sample. Pairs checked total for this section: 115 of 262.

Headline pattern: the failures are systematic, not one-off typos. In vivid, whole runs of captures reuse one stale frame under ending/return/notch/wedge names (notably the 27/29/30, 55/56/57, 65/66/67, and m5–m9 groups). In bell, the "dusk" and "loop2" labels are repeatedly wrong in the same direction (Noon/Loop 1 frames filed as Dusk/Loop 2), and "prepared"/"anchored" labels are repeatedly applied to frames where the preparation is still offered or the sidebar still reads "Nothing chosen yet".

## 4. Moments misnomers and TXT/PNG mismatches (audit child, 84/85 pairs)

Coverage: 84 of 85 PNG/TXT pairs checked (every content-implying filename
plus all remaining pairs — the "every 4th otherwise" sample was exceeded by
checking everything). Unchecked: 38-curtain-b.png (no TXT). All 85 PNG
contents viewed via their 30 distinct frames (md5-verified repeats inherit
their representative's reading). Orphan 38-a-choice-again.txt also read.
Headline: the filenames are the unreliable layer, not the TXT dumps.

Misnomers (34 filenames contradict their frame):
- 42-reveal.png = Person A's private choice screen ("Where does your mind wander?", upside-down sea selected, guess row unselected). True pair reveal is 71-reveal.png.
- a2-keepsake.png = Person B's detail input ("One detail you would put on the postcard", "the smell of rain on the harbour steps", 38/120, "Bring our details together"). Not a keepsake.
- 81-detail-B.png = byte-identical to 81-detail-A.png (A's detail input, brass key, 44/120). Not B's screen.
- 33-play.png = Person A turn curtain. 34-curtain-a.png = A private choice screen, nothing selected. 36-a-guess.png = A choice screen, moon selected, guess row entirely unselected (no guess shown). 37-a-seal.png = same A choice screen, moon selected (no seal state). 38-curtain-b.png = same A choice screen, moon selected (not B, not a curtain).
- 39-b-choice.png = still Person A's choice screen (midnight garden selected). Not B.
- 40-b-guess, 41-b-seal, 43-activity, 44-activity2, 45-keepsake, 46-pair-final = all byte-identical to 42-reveal.png (A choice screen, sea selected). None shows a B guess, seal, activity, keepsake, or final screen.
- 48-reh-choice, 49-reh-seal, 50-reh-next, 67-rehearsal-choice, 68-rehearsal-after, 77-rehearsal-choice, 78-rehearsal-after = all byte-identical to the solo-rehearsal scene picker ("SOLO REHEARSAL · PLAYING BOTH SIDES", pocket museum chosen). None shows a choice, seal, next, or after state.
- 65-pair-final.png = activity screen ("Send a postcard from nowhere", 0:45, "We made our moment"). Not final.
- 74-pair-final.png = Person A keep-detail curtain ("One detail, just from you. Pass the screen to Person A."). Not final.
- 82-keepsake.png, 83-after-save.png = byte-identical to 81-detail-A.png (A detail input, brass key, 44/120). Neither a keepsake nor after-save.
- 91-detail-A.png, a1-detail-A.png = Person B's keep-detail curtain ("And one detail from you. Pass the screen to Person B."). Not A's detail, not a detail input.
- a1-detail-B.png = the pair keepsake itself ("A postcard from our impossible place", A brass key, B rain smell, "Save our keepsake"). Not B's detail input.
- a3-after-save.png = byte-identical to a2-keepsake.png (B detail input, 38/120). Not after-save.
- b3-after-save.png = pair keepsake screen with no download note. Not after-save; genuine after-save frame is c3-after-save.png (adds "Your keepsake download has started.").
- r3-rehearsal-reveal.png, r4-rehearsal-keepsake.png = rehearsal Person A weather choice (sunshine/rain/wind, nothing selected). Neither a reveal nor a keepsake.

Failed captures under generic step names (not game screens at all, 6):
- 02-rehearsal-start, 03-step00, 23-step01 = server directory listing "Index of /tmp/small-hours-baseline-2026-10-27/build/".
- 23-step02 = listing of /tmp/small-hours-baseline-2026-10-27/ (build/, baseline.json, zip).
- 23-step03 = listing of /tmp/.
- 23-step04, 23-step05 = listing of / (root filesystem).
(02-rehearsal-start is counted inside the 34 misnomers above, not in addition.)

Imprecise but not flatly false (4): 63-b-sealed.png = both-sealed screen (identical to correctly named 70-both-sealed.png; "B sealed" understates it); 62-a-sealed.png = post-seal handoff curtain (acceptable as the A-sealed moment); 90-keep-detail.png = A keep-detail curtain, not the detail input; 10-pair-entry.png = landing page, not pair entry (identical to 00-entry.png).

Correct specific names verified (31, including 62/63 as acceptable-with-note):
00-entry (landing); 01-pair-entry / 11-pair-scenes / 31-scenes (pair scene picker, pocket museum chosen); 12-scene-chosen / 21-scene-chosen (picker, impossible postcard chosen); 22-person-a-curtain (A turn curtain); 32-scene (picker, postcard chosen); 35-a-choice (A choice, sea selected); 47-rehearsal / 66-rehearsal-scenes / 76-rehearsal-scenes / r0-rehearsal-start (rehearsal picker, pocket chosen); 61-a-choice-screen (A choice, unselected); 70-both-sealed; 71-reveal (TRUE pair reveal: "Well, look at that.", A upside-down sea/guessed sleepy moon, B midnight garden/guessed upside-down sea); 72-activity (postcard-from-nowhere activity, 0:45); 80-keep-detail-curtain (A detail curtain); 81-detail-A (A detail input, brass key, 44/120); 99-final / s6-rehearsal-keepsake (rehearsal keepsake, "The weather when we were here"); b2-keepsake / c2-keepsake / d1-keepsake (pair keepsake); c3-after-save (keepsake + download-started note); s5-rehearsal-reveal (rehearsal reveal: A soft sunshine/guessed friendly rain, B curious wind/guessed soft sunshine).
Generic step names that are not false: 12. Arithmetic: 34 + 6 + 4 + 12 + 31 = 85 with 02-rehearsal-start counted once inside the 34 (the child's arithmetic note is preserved here as reported).

Beats with NO distinct frame anywhere in moments/: Person B's private choice screen, Person B's guess, any seal-confirmation screen, any guess-made state (every choice PNG leaves the guess row unselected), any second activity. Any caption claiming those beats from these files would be invented.

TXT/PNG mismatches: ZERO screen-level mismatches in 84/85 checkable pairs. Every TXT describes the same screen its PNG shows — including where the filename is wrong (42-reveal.txt correctly describes A's choice screen; the filename is the lie, not the dump). Correction to a standing premise: the warning that Moments TXT dumps describe different screens than their PNGs did NOT reproduce here. Two systematic TXT gaps instead: (1) selection state is invisible in TXT dumps — the 15 TXTs of the A-choice family are byte-identical while their PNGs show four states (nothing/sea/moon/garden selected), so a TXT confirms screen type but never which option was picked; (2) typed detail text is absent — 81-detail-A.txt carries 44/120 but not the brass-key wording; a2-keepsake.txt carries 38/120 but not the rain-smell wording. Counters match the PNGs; wording does not appear in the dumps. Pairing defects: 38-curtain-b.png has no TXT; 38-a-choice-again.txt has no PNG (its text is identical to the A-choice family dumps). Nuance: 14-step*.txt dumps contain both the "End this little moment?" dialog text and the underlying curtain text, matching PNGs that show the dialog over a blurred curtain background.

Keepsake SVG — CONFIRMED (child read in full + parent size check): 1,425 bytes, carries both details verbatim (PERSON A "a brass key that hums when the tide comes in", PERSON B "the smell of rain on the harbour steps"), title "A postcard from our impossible place", footer "NO MAP · JUST US", dated "October 28, 2026 · MADE TOGETHER". Matches the pair-keepsake PNG frame exactly.

## 5. Competitor PDF audit (per game, legible vs shell — audit child, page-1 renders read)

Method: page 1 of every PDF rendered with pdftoppm and read visually;
verdicts are page-1 verdicts only (in-package PDFs have 2–3 pages each;
later pages were not rendered). LEGIBLE = the render shows real page/game
content. SHELL = blank/white/black game area, loader only, or page frame
only. A text layer is never visual proof on its own.

In-package PDFs (30 total: 23 legible, 7 shell):
- birdography 5: 5 legible (beat1 title screen PLAY/QUIT binoculars; beat2 Blue Jay photo frame; beat3 Blue Jay journal; beat4 Ruby-Throated Hummingbird frame; beat5 Hummingbird journal).
- core-rush 2: 0 legible, 2 shell (beat1 white game area + itch description/screenshot strip; beat2 white + faint touch controls only).
- gartic-phone 5: 5 legible (beat1 lobby CoolNickname8787; beat2 lobby presets PLAYERS 1/14; beat3 LEGIBLE-UI, canvas empty pre-draw "CREATE THE ANIMATION'S FIRST DRAWING" — no drawing yet, not a print failure; beat4 album settings; beat5 album end, line drawing).
- pixel-harbor 5: 5 legible (beat1 harbor select 0/8 charted; beat2 mid-board No. 1; beat3 Sailboat CHARTED! 2:42; beat4 No. 2 board; beat5 Anchor CHARTED! 0:45).
- rollback 8: 3 legible, 5 shell (beat1 legible title DOM text + Begin; beat2/beat3/beat5/beat7/beat8 shell blank white CRT + itch description; beat4 legible notebook DOM overlay WREN'S THREE QUESTIONS, WALTER 0/3; beat6 legible notebook overlay + "WHAT I HAVE LEARNED").
- skribbl-io 5: 5 legible (beat1 home; beat2 guess drawing Round 1; beat3 "The word was stove" Round 2; beat4 LEGIBLE-UI, canvas empty at capture instant; beat5 guess in progress "Seal guessed the word!").

Live-window reference PDFs, ~/.hatch-browser/outputs/ (80 total: 64 legible, 16 shell):
- core-rush (739a4284) 3: 0 legible, 3 shell (dark empty embed + "Run game"; white; white).
- pixel-harbor (896287f0) 5: 4 legible, 1 shell (-3 "Run game" placeholder only; -6 harbor 2/8 charted; -12 mid-board; -15 Sailboat CHARTED! 0:55; -20 Anchor CHARTED! 0:45).
- birdography (5493f1ff) 5: 5 legible (-1 title; -7 title identical render to -1; -13 camera/forest frame; -18 Blue Jay journal; -21 Chickadee journal).
- rollback (98ed2162) 5: 2 legible, 3 shell (-0 "Run game" placeholder + description; -8 title DOM + Continue/New game; -14 notebook overlay; -16 blank CRT; -22 SHELL visually with text-layer state markers only — the "PROMISE" ending PDF renders a blank monitor and must never be labeled visible gameplay).
- gartic-phone (38db2389) 5: 5 legible (-4 lobby CoolNickname8819; -10 lobby presets; -17 drawing frame line art; -23 album end; -26 album end ad overlay).
- skribbl-io (1ed960b6) 5: 5 legible (-5 home BrowserTester; -11 guess drawing Round 1; -24 LEGIBLE-UI DRAW THIS "fry" canvas empty at turn start; -27 word choice exhausted/hockey stick/onion; -28 winner podium BrowserTester 1015).
- reign (a85aab8d) 4: 0 legible, 4 shell-board (all four: DOM chrome legible — player bars, Chronicle, hand cards — but the board canvas prints BLACK in every one; -4/-19 Setup "Place your first settlement", -1 Round 2 Trade/End turn, -9 Round 3 "Click a glowing spot to place your road"). No board frame exists to copy. Note: no competitors/reign/ directory exists.
- the-same-bullet (21a8d3fe) 3: 3 legible (-1 language select; -3 Room 01 Loop 01 Echoes 00 Time 5.6, canvas prints; -12 Loop 02 Echoes 01 cyan echo bullet visible).
- drawize (43f3ca00) 6: 6 legible (-0 lobby; -15 "TIME ELAPSED / answer was: chandelier" keyboard; -22 LEGIBLE-UI canvas blank WORD: FORK TIME 4:20; -25 LEGIBLE-UI canvas blank WORD: FORK TIME 2:14; -27 GAME FINISHED dialog; -2 guess canvas black/pink strokes TIME 1:42).
- drawasaurus (d9268e19) 8: 8 legible (-2 home 48 players online; -5 LEGIBLE-UI Penguin Room countdown 8; -10 sara drawing stroke visible; -13 LEGIBLE-UI Vaayadi choosing; -23 LEGIBLE-UI Cool Room2 countdown 3; -24 Venkat drawing TREE full green tree; resumed -22 Gucci drawing stroke; resumed -23 "Sorry, you were AFK!" banner).
- night-oclock (cacaafa1) 11: 10 legible, 1 shell (-8 title NIGHT O'CLOCK lantern Play; -9 pure white shell; -14 corridor timer 0:43 WASD sign; -16 0:16 clock item; -20 0:38 character in corridor; -21 0:20 SHIFT/RUN sign; -6 0:09 HOLD SPACEBAR; -7 0:43 corridor; -13 0:51 corridor; second -16 0:19 corridor; -18 0:02 green-lit view. Unity renders as a horizontal strip, rest of page white — the strip is real gameplay.)
- last-seen-online (d1f3c268) 2: 2 legible (-6 simulated desktop Buddy List, LoseAmp Player, Other World, photos4em.zip, corner arrows 3/4; -7 Em chat window).
- field-guide (193f9044) 6: 6 legible (-11 menu island Start/Gallery/Settings/Quit; -17 menu; -3 IN-GAME island view health/stamina bars; -5 pause menu over dimmed scene; second -11 menu; -14 menu).
- photohacks (d5924a56) 10: 8 legible, 2 shell (-18 title + language dialog ALPHA 0.6.0; -26 Paused menu; -8 Tutorial Step 1 park scene; -10/-12/-15/-19 Step 2; -17 black frame "Tutorial" label + DIGITAL footer only shell; -20 black frame identical to -17 shell; -21 Paused menu).
- tranquility (d69466d8) 2: 0 legible, 2 shell (Unity loader only, identical renders).

CORRECTIONS to prior fold notes, established by these renders (flagged for the
parent — records were NOT edited): (1) Night OClock is NOT title-only — 9
gameplay strips print legibly, not just the title screen. (2) Field Guide is
NOT menu-only — PDF -3 shows an in-game island view (with bars) and -5 a
pause menu, so Start did produce in-game frames at some point; no creature
photo or gallery entry was seen, so the play slot still stays open on that
point.

Existing in-package renders audited (6 of 6 render-*.png, plus extras):
- competitors/rollback/render-promise-1.png: SHELL, confirmed — blank white CRT monitor + itch description + small screenshot strip below. Must not be presented as gameplay evidence. Left untouched (no overwrite/delete per constraints) — parent decision needed on replacing it with a legible notebook frame (in-package rollback-beat4/beat6, or live -14).
- competitors/skribbl/render-winner-1.png: LEGIBLE, confirmed — winner podium, BrowserTester #1, 1015 points, scoreboard, chat.
- competitors/pixel-harbor/render-charted-1.png: LEGIBLE, confirmed — Sailboat CHARTED!, 5×5, 0:55, best 0:55, grid.
- competitors/drawize/render-fork-1.png: LEGIBLE-UI, canvas blank — WORD: FORK, TIME 4:20, tools, FINISH/CANCEL. It proves the Quick Draw session state, NOT a fork drawing (the canvas is empty).
- competitors/birdography/render-journal-1.png: LEGIBLE, confirmed — Black-Capped Chickadee journal spread, pixel-art chickadee, title clipped at right edge.
- competitors/birdography/render-beat1.png: LEGIBLE, confirmed — title screen (binoculars, PLAY/QUIT) + screenshot strip + itch description.
- competitors/core-rush/img/core-rush-beat2-1.png: SHELL (white + touch controls) — core-rush has no legible frame anywhere in the package or live set.
- Gartic GIFs: album-2026-10-28.gif (208,955 bytes, GIF89a 770×490) first frame LEGIBLE (album line drawing); gartic-album-2026-10-28.gif (214,639 bytes, different md5) was NOT frame-checked beyond headers — flagged, not verified.

Coverage: 30/30 in-package PDFs + 80/80 live-reference PDFs rendered page 1 and read = 110/110. One live render initially hung pdftoppm (PhotoHacks -19); it rendered cleanly on a timed retry and was read normally. Scratch renders live only in /tmp/pdfaudit/ (not part of the package).

## 6. Copies made (copies only, never moves, no overwrites — all destinations verified absent first)

By the competitor-PDF audit child (8 renders, all 80-dpi page-1 renders of
frames it read):
- Live gartic-phone -23 → competitors/gartic-phone/render-album-1.png — COOLNICKNAME8819'S ALBUM, END OF ALBUM, line drawing.
- Live skribbl-io -28 → competitors/skribbl-io/render-winner-1.png — winner podium, BrowserTester 1015 (same content as the existing skribbl/render-winner-1.png, now also held in the skribbl-io dir, which previously had none).
- Live drawasaurus -24 → competitors/drawasaurus/render-tree-1.png — Venkat drawing TREE, full green tree.
- Live field-guide -3 → competitors/field-guide/render-ingame-1.png — in-game island view with health/stamina bars.
- Live night-oclock -14 → competitors/night-oclock/render-corridor-1.png — corridor, timer 0:43, WASD sign (Unity strip render).
- Live photohacks -8 → competitors/photohacks/render-tutorial-1.png — Tutorial Step 1, camera controls + park scene.
- Live last-seen-online -6 → competitors/last-seen-online/render-desktop-1.png — simulated desktop with photos4em.zip and corner arrows.
- Live the-same-bullet -12 → competitors/the-same-bullet/render-echo-1.png — Loop 02, Echoes 01, cyan echo bullet.
No copies for: birdography, pixel-harbor, drawize, skribbl (already hold render-*.png); rollback (already holds one, but it is a shell — flagged in §5, not overwritten); core-rush, tranquility, reign (no verified legible frame exists — core-rush all shells, tranquility loader-only, reign board black in all 4; reign also has no competitors/reign/ directory).
Parent-made copy already in place before this task: competitors/gartic-phone/album-2026-10-28.gif (copied from browser_downloads, same 208,955 bytes).

## 7. Banked artifacts — final verification

- Gartic GIF: GIF89a, 770×490, 208,955 bytes — VERIFIED, exact match.
- Keepsake SVG: 1,425 bytes, 720×850, both details verbatim — VERIFIED, exact match.
