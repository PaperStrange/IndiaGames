# Review B — Mistake-hunt / executability (2026-10-28)

**Scope:** `critique--one-page-2026-10-28.md`, the 15 records under `records/{bell,moments,vivid}/`, and `organize-self-qa.md`, checked against the evidence on disk (`bell/`, `moments/`, `vivid/` PNG+TXT beats, `moments/keepsake--pair-impossible-postcard.svg`, `competitors/` PDFs, `builds/`, `pw/` driver logs, the three `fresh-competitors-*-2026-10-28.md` sweeps, the branch launch docs, and the GitHub API for PaperStrange/IndiaGames issue #5). I read all 17 files and ran the greps/hash/PDF checks cited below. I did not edit any record.

**Verdict: FAIL.** One central claim in the one-page critique itself is factually wrong (F1: the "no curtain" claim — the B curtain exists in the evidence), and the Bell journey record contradicts itself on the Loop 2 outcome (M1–M5), which is the headline finding of the whole operation. Do not deliver to Sakura until F1 and M1–M14 are fixed. The SHOULD-FIX items (S1–S17) should be fixed in the same pass; none of them alone blocks delivery, but S1 (the stall-count contradiction) and S2 (report-only competitor details) are close to it.

**What verified clean (so the fixes are bounded):**
- Frozen-build hashes: Bell index.html SHA-256 `433c9c67…` matches the record exactly (`sha256sum` on `~/workspace/checkouts/master/release-candidates/thirteenth-bell/0.1.0/build/index.html`); Small Hours build SHA-256 `fa4ca193…`, source commit `ca7fb8…`, 8 files, 58,313 bytes all match `builds/small-hours/baseline.json` and `du -sb`; Vivid 15 files, 1,401,263 bytes match `builds/vivid-pilot-0.1.2/build` exactly.
- Keepsake SVG: exactly 1,425 bytes, 720×850 (`width="720" height="850"` in the file), text "SMALL HOURS / MEMORABLE MOMENTS" and "A postcard from our impossible place" confirmed; both details present in `moments/b2-keepsake.txt`.
- Loop 2 outcome quotes verified verbatim in `bell/q1-outcome.txt` ("Mina and her crate reach the sheltered market well…", "The main alley is still blocked; the changed route, not a changed crowd, brought her here.", "One uncrushed redflower rests on the well stones.").
- All four Vivid competitor dates verified in the sweep (EOS 22 July 2024; Paper Trail 21 May 2024; Lost Records Tape 1 18 Feb 2025 / Tape 2 15 Apr 2025; 1000xRESIST 9 May 2024); all desk prices/dates for Bell and Moments verified in the sweeps; BOKURA 24 Apr 2025 verified.
- Gate thresholds verified in the branch launch docs: Bell 4/6 cause+prediction, 4/6 action+Fracture, 3/6 recall, 20-minute cap (`DECISION-RECORD.md`, `PLAYTEST-LIST.md`, `protocol.md`); Moments 5/6 reveals, 4/6 both contributing, 3/6 saves/replays, 12 distinct people (`launch-2026-11-20/README.md`); Vivid 4/6 Iona + ≤1/6 unrestricted-AI, 4/6 Mara, 15-min Iona / 10-min Mara maximums (`PLAYTEST-CHECKLIST.md`).
- "Solo mode is a rehearsal" verified in the Moments milestone launch doc ("There is no remote partner or AI partner; solo mode is a rehearsal.").
- Field Guide verified by fresh `browser.open` (2026-10-28 12:31 UTC): 81st Godot Wild Jam, "Take pictures of the creatures on the island", controls W/A/S/D, Space, Left Click, Right Click/C, E, Left Alt/X, Left Shift/Z, Escape.
- GitHub issue #5 is real: `gh api repos/PaperStrange/IndiaGames/issues/5` returns `{"number": 5, "state": "open", "title": "Agent playtesting blocked: browser cannot reach locally deployed demos (loopback refused)", "created_at": "2026-10-28T12:24:43Z"}`. The organize file's claim that it was filed is TRUE.
- Competitor PDF counts verified: ROLLBACK 8, Birdography 5, Gartic Phone 5, Core Rush 2, skribbl.io 5, Pixel Harbor 5. ROLLBACK "8 endings" appears in all 8 PDFs; Core Rush features verified in the PDFs (six layers incl. Topsoil/Crystal Caverns/Magma Belt/Ancient Ruins; "6 pod upgrades: Drill, Tank, Hold, Hull, Lamp and Thrust"; 9 ores; cave-ins/lava; "12 hidden field notes"); Birdography controls verified in `birdography-beat1.pdf` ("Turn on Camera: Right Mouse Button", "Take picture: Left mouse Button", "Open Journal: F", "Cheat Unlock all Birds: X"); Gartic "CoolNickname8787" verified in beats 1/2/4/5; Pixel Harbor "Sailboat" (beat3) and "Anchor" (beat5) verified.
- Bell button labels "Anchor these into tomorrow" and "Face the thirteenth bell" verified in the build source (`index.html`: `$('#wakeBtn').textContent=ready?'Anchor these into tomorrow':…`; `state.phase===2?'Face the thirteenth bell':…`) — see S17 for the citation problem.
- "See the rehearsal reveal" verified by the driver (`pw/play-moments16.cjs:54` clicks `/See the rehearsal reveal/` and the reveal shows; moments14 stalled on the pair label) and "Person A's line is tucked away until you finish" verified in the build source (`builds/small-hours/build/views.js:32`, the `pass-write-b` curtain) — see S16.
- "We're both ready to reveal" (pair label) verified in `views.js`; "Rehearsal: take both turns yourself" verified in `views.js`; "East — old breakwater" lamp panel verified in `vivid/01-iona-inside.txt` and `02-iona-step0*.txt`; "Plan from patterns, not waypoints" and the companion-layer text verified in `bell/p6-anchored.txt`.

---

## FAIL

### F1 — "No curtain between A's seal and B's choice screen" is FALSE; the B curtain exists in the evidence
- **Files + claims:** `records/moments/journey--small-hours-2026-10-28.md` row 5 ("**No curtain between A's seal and B's choice screen** — B's turn starts directly", evidence `38-curtain-b`) and Reactions ("no curtain between A's seal and B's turn"); `records/moments/session--small-hours-agent-2026-10-28.md` row 5 and Issues ("no privacy curtain between A's seal and B's choice screen"); `critique--one-page-2026-10-28.md` ("Friction: no curtain between A's seal and B's turn"); `organize-self-qa.md` ("no curtain between A's seal and B's turn").
- **What the evidence actually says:** `moments/62-a-sealed.txt` (60-series pair-flow run; `65-pair-final.txt` confirms the pair flow) shows the B curtain verbatim: "B — A LITTLE PRIVACY, PLEASE — Pass the screen to Person B. / Person A's choices are tucked away. Now it's your turn to choose, then guess. / Ask the other person to look away. This curtain hides answers on screen; it does not secure the device." The build source confirms it (`builds/small-hours/build/views.js:20`, the `pass-b` curtain). The detail handoff has its own B curtain too (`moments/91-detail-A.txt`: "Pass the screen to Person B. Person A's line is tucked away until you finish."). The cited evidence file `38-curtain-b.txt` is not a curtain at all — it is a duplicate of Person A's choice screen (byte-identical to `39-b-choice.txt` per `diff`; both show "PERSON A · A PRIVATE LITTLE CHOICE"). The 30-series driver evidently clicked through the B curtain without dumping it and the operator concluded from the missing dump that no curtain exists. The "gap" analysis built on it ("B could see A's sealed screen state if the handover is slow") is therefore wrong.
- **Fix required:** Strike the "no curtain" claim in all four files and replace it with the correct finding: the B curtain exists at both handoffs (choice + detail); the 30-series run did not capture it, and `38-curtain-b.txt` is misnamed (it is a choice-screen dump, duplicate of `39-b-choice.txt`). Rename or annotate the misnamed file. Do not ship the critique with this friction point in it.

---

## MUST-FIX

### M1 — Bell journey contradicts itself: "No claim about the Loop 2 outcome (pending bell17)"
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md`, "What this record does not claim": "No claim about the Loop 2 outcome (pending bell17) or the Fracture-4 catastrophe."
- **Evidence:** The same file's "Loop 2 outcome — PROVEN (bell19, [REAL])" section proves the outcome with `p9-prepared` / `q1-outcome`, and `bell/q1-outcome.txt` (mtime 12:16 UTC) contains the outcome verbatim. The "does not claim" bullet is stale from before bell19.
- **Fix:** Delete the Loop 2 clause from that bullet (keep only the Fracture-4 catastrophe, which genuinely was never reached — deepest 3/4).

### M2 — Bell journey header: wrong run count + stale "bell17 in flight"
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md`, header: "Seven driver runs (bell3/6/7/8/9/10/11/12/13/14/15/16; bell17 in flight at the time of writing)."
- **Evidence:** The parenthetical lists 12 runs, not seven; bell17, bell18 and bell19 all ran afterwards (`pw/play-bell17.log`, `play-bell18.log`, `play-bell19.log` exist; bell19 completed 12:11–12:16 UTC). "bell17 in flight" is stale.
- **Fix:** Correct the count and list to the runs actually made (bell3 through bell19 as applicable), and remove "in flight".

### M3 — Bell journey drawn route ends "→ Loop 2 (pending)"
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md`, "Drawn route (deepest run)": "… → anchor board (Mina + redflower petal + confirm) → Loop 2 (pending)."
- **Evidence:** bell19 completed Loop 2 (see M1). **Fix:** Extend the route: "→ Loop 2 Dawn → prepare the side passage → Loop 2 Noon → Mina at the sheltered market well."

### M4 — Bell journey event journal row 10 is stale
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md`, row 10: "(bell17 in flight at the time of writing — outcome below)".
- **Evidence:** bell17 finished (Loop 2 Dawn reached, `pw/play-bell17.log` tail: "loop=2 phase=DAWN · 7:00"); bell19 proved the outcome. **Fix:** Replace with the bell19 outcome and cite `q1-outcome`.

### M5 — Bell art record's Loop 2 section is stale and misattributes the evidence
- **File:** `records/bell/art--bell-0.1.0-2026-10-28.md`, heading "Journey board (Loop 2 Dawn — arrival only; outcome pending bell18)" and beat 8 citing "`p9-prepared` (bell17)".
- **Evidence:** The outcome is proven (bell19); `bell/p9-prepared.txt` is bell19's file (mtime 12:16 UTC, matching `pw/play-bell19.log`; bell17's Loop 2 files are `p8-loop2` / the 80–92 series). **Fix:** Retitle the section to cover Loop 2 Dawn + Loop 2 Noon outcome, add the outcome beat (Mina at the well, "The main alley is still blocked; the changed route, not a changed crowd, brought her here."), and correct the attribution to bell19.

### M6 — Moments detail counter is wrong for A (38/120 vs 44/120), and the B detail file is a duplicate of A's
- **Files:** `records/moments/journey--small-hours-2026-10-28.md` row 9 ("A details 'a brass key that hums when the tide comes in' (38/120 chars)") and `records/moments/session--small-hours-agent-2026-10-28.md` row 8 ("(38/120)").
- **Evidence:** `moments/81-detail-A.txt` shows the counter "44 / 120". Counted: "a brass key that hums when the tide comes in" is 44 characters. 38 is the length of B's detail ("the smell of rain on the harbour steps" = 38 characters) — the two counts were swapped. Worse, `moments/81-detail-B.txt` is byte-identical to `81-detail-A.txt` (both show "PERSON A · YOUR PART OF THE STORY", "44 / 120", button "Tuck away my detail") — B's detail screen was never captured. The B submit label "Bring our details together" is nonetheless real (verified in `builds/small-hours/build/views.js:35` and in `moments/a2-keepsake.txt` / `a3-after-save.txt`), so the claim is true but the cited file contradicts it.
- **Fix:** A = 44/120 in both files. State that B's detail counter is not in evidence (81-detail-B.txt is a duplicate of A's screen) and re-cite the B submit label to `a2-keepsake.txt` / the source.

### M7 — Bell session record gives the wrong time for bell19
- **File:** `records/bell/session--bell-0.1.0-agent-2026-10-28.md`: "Start / end UTC: 2026-10-28 ~14:30–14:45 UTC (approx; driver log timestamps)."
- **Evidence:** The VM clock is UTC (`date` = Wed Oct 28 12:26:42 UTC 2026 at review time); `pw/play-bell19.cjs` mtime 12:11, `pw/play-bell19.log` mtime 12:16, `bell/p9-prepared.txt` and `bell/q1-outcome.txt` mtime 12:16. bell19 ran ~12:11–12:16 UTC, not 14:30–14:45. The driver logs carry no timestamps, so "driver log timestamps" cannot source any time.
- **Fix:** Correct to ~12:11–12:16 UTC (file mtimes) and drop the "driver log timestamps" attribution.

### M8 — Organize Q1's answer is now false
- **File:** `organize-self-qa.md`, Q1: "A: Unproven. Every run's journal/screenshots were re-read: the highest loop counter seen is 1; the phase never passed Dusk except bell10 (Dusk reached, Midnight never entered)."
- **Evidence:** bell15/bell16 reached Midnight (`pw/play-bell15.log` tail: "loop=1 phase=MIDNIGHT"; bell16 same), bell17 reached Loop 2 Dawn, bell19 proved the Loop 2 Noon outcome. Q1's answer contradicts the file's own section 9 and Q6, which record the bell19 resolution.
- **Fix:** Rewrite Q1 to record the corrected answer (the outcome was unproven at ~06:00 PDT and was proven by bell19) or delete it — a self-Q&A that states the opposite of the final finding cannot stand.

### M9 — Organize Bell table row is stale
- **File:** `organize-self-qa.md`, "What was actually played" table, Bell row: "Dawn → Noon, 6 driver runs (bell3/6/7/8/9/10/11/12; bell13 in flight)" / "Loop 2 + Mina outcome still [OPEN] pending bell13".
- **Evidence:** The parenthetical lists 8 runs, not 6; bell13–bell19 all ran; the outcome is proven (bell19). **Fix:** Correct the count/list and mark the outcome resolved (as Q6 already does).

### M10 — Organize "Decisions for the critique #1" contradicts the final critique
- **File:** `organize-self-qa.md`: "Bell's core loop is proven but its headline payoff (Mina's route changing in Loop 2) is still unproven by first-hand play."
- **Evidence:** The final critique's Bell verdict is "proven end to end" (bell19). **Fix:** Update decision #1 to match the delivered verdict.

### M11 — Vivid journey checks a box for something not played
- **File:** `records/vivid/journey--vivid-0.1.2-2026-10-28.md`, Coverage checklist: "- [x] Iona neutral profile (`?profile=neutral#iona`) — not played (optional per launch doc)".
- **Evidence:** A checked box asserts coverage; the item itself says "not played". **Fix:** Uncheck it (`- [ ]`) or move it to the "does not claim" section.

### M12 — Vivid citations point at logs that no longer exist
- **Files:** `records/vivid/journey--vivid-0.1.2-2026-10-28.md` rows 4/5/6 ("iona5 log") and Mara rows 2/3 ("mara2 log"); `records/vivid/art--vivid-0.1.2-2026-10-28.md` Mara beats 3–6 ("mara2 log").
- **Evidence:** No `iona5` or `mara2` log exists anywhere on disk (`grep -rl "mara2\|iona5" pw/ vivid/` returns only `pw/play-vivid15.cjs`, a comment; `pw/` holds only bell12–19, moments14–16, vivid15 logs — the /tmp drivers were lost in the VM restart, as the records honestly state elsewhere). The underlying claims are true and ARE evidenced by surviving beat files: the 0/2-marks failure + notch text in `vivid/27-after-signal.txt` ("0/2 harbour marks found" + "Find both harbour marks first. A good signal begins with evidence." + the full WORN NOTCH text); the 1/2-marks state in `vivid/55-after-signal.txt`; the wrong-pattern failure ("No answering light yet") in `vivid/65-after-signal.txt`; Mara's lightbox + ending in `vivid/42-aligned-notch3.txt` and `vivid/43-mara-ending.txt`.
- **Fix:** Re-cite every "iona5 log" / "mara2 log" reference to the surviving beat files above. Do not cite a lost log as evidence.

### M13 — Bell journey cites the wrong file for the notch quote (Bell's "worn notch" is Vivid's; the Bell citation is `m3-notch`)
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md` — this finding is about the VIVID journey: `records/vivid/journey--vivid-0.1.2-2026-10-28.md` row 3 cites `m3-notch` for the notch text ("A WORN NOTCH — A shallow notch has been rubbed smooth beside the lamp. A little wooden wedge rests below it…").
- **Evidence:** `vivid/m3-notch.txt` does NOT contain that text — it shows the brass plate ("A WORN BRASS PLATE — FERRY CALL…") and the vivid15 log records "[m3] worn notch -> no wedge text". The notch text IS in evidence, in `vivid/27-after-signal.txt` (full text, with "BESIDE THE LAMP / Notice the worn notch"), `vivid/24-notch.txt`, and `vivid/53-notch.txt`.
- **Fix:** Re-cite row 3 to `27-after-signal.txt` (or `24-notch.txt`) and note vivid15's replay did not re-capture the notch text.

### M14 — Critique action item 5 is already done; cite the issue number
- **File:** `critique--one-page-2026-10-28.md`, "What to do before 20 November", item 5: "File the loopback-blocker as a GitHub issue (agent browser cannot reach local servers)".
- **Evidence:** The issue is already filed and open (verified via API above): PaperStrange/IndiaGames #5, created 2026-10-28T12:24:43Z. Listing it as a to-do is stale.
- **Fix:** Mark item 5 done ("Filed as PaperStrange/IndiaGames #5, 2026-10-28") or remove it from the action list. Also add the issue number where the Bell journey ("is filed as a GitHub issue per Sakura's instruction") and Bell session record ("see the loopback-blocker issue") refer to it without a number.

---

## SHOULD-FIX

### S1 — Stall count contradicts itself: "seven" vs the itemized five
- **Files:** "Seven runs stalled for lack of it" appears in `critique--one-page-2026-10-28.md`, `records/bell/coverage--bell-0.1.0-2026-10-28.md` (closing), `records/bell/decision--bell-0.1.0-2026-10-28.md` (§1 "seven times over" + Proposed decision "Seven agent runs stalled"), and `records/bell/session--bell-0.1.0-agent-2026-10-28.md` (BELL-AGENT-01). The Bell journey's Reactions section itemizes "Three runs stalled in Noon for lack of it, and two more stalled at Midnight" — five. The surviving logs (`pw/play-bell12.log`–`play-bell19.log`) do not let me count seven game stalls: bell18 was a driver crash (`[ERROR] driver exception -> clickAny is not defined`), not a game stall; bell14 reached Dusk, bell15/16 Midnight, bell17 Loop 2 Dawn, bell19 Loop 2 Noon; earlier logs (bell3–bell11) are gone.
- **Fix:** Reconcile to one number with a named list of the stalled runs, or soften all five occurrences to "several runs stalled". Do not let the critique and its primary record disagree on the count.

### S2 — Competitor narrative details are not in the banked PDFs; they rest on handoff text that is not banked as a file
- **Files:** ROLLBACK "THE PROMISE" (1 of 8) + Maya quotes (`records/bell/coverage--bell-0.1.0-2026-10-28.md`); skribbl.io "Uluru" / "landfill" / "rest" (`records/moments/coverage--small-hours-2026-10-28.md` — "Uluru" and "landfill" appear in 0 of the 5 banked PDFs; only "stove" appears, in beat3); Gartic Phone GIF export (`records/moments/coverage--small-hours-2026-10-28.md` — "GIF" appears in 0 of the 5 PDFs; "CoolNickname8787" does appear); Pixel Harbor "1 square look wrong" (`records/vivid/coverage--vivid-0.1.2-2026-10-28.md` — 0 hits in all 5 PDFs); Birdography bird names "Blue Jay" / "Ruby-Throated Hummingbird" (`records/vivid/coverage--vivid-0.1.2-2026-10-28.md` — 0 hits in all 5 PDFs; the PDFs carry only the itch-page text).
- **Evidence:** `pdftotext` + `grep -c` per file, run during this review. The ROLLBACK row honestly discloses "the evidence is the task's textual report"; the other four rows do not carry that caveat, so a reader would assume the PDFs verify the quotes.
- **Fix:** Bank each browser task's report text as a file under `competitors/<game>/` (or state in each row that the word-level details come from the task report, not the PDF text layers). The Canvas-shell limitation should be stated for skribbl/Gartic/Birdography as it already is for ROLLBACK.

### S3 — "Both complete sessions" for Gartic + skribbl is unverified for skribbl
- **File:** `records/moments/coverage--small-hours-2026-10-28.md`, Coverage check: "Gartic Phone (telephone) + skribbl.io (live draw-guess) — both complete sessions".
- **Evidence:** The skribbl report text available to this review covers Round 1 (guesser) and Round 2 (drawer + two guesser turns) and ends mid-sentence ("rest" typed after the timer…); no Round 3 or final standings appear in the report or in the PDFs. Gartic's Solo completion is supported (album + export in the report; nickname in the PDFs).
- **Fix:** Verify skribbl's Round 3/final standings from the full task report, or soften to "Gartic: complete Solo session; skribbl: partial session (Rounds 1–2 observed)".

### S4 — Core Rush "published 2026-10-22" is unverified from the evidence on disk
- **File:** `records/bell/coverage--bell-0.1.0-2026-10-28.md` row 2.
- **Evidence:** The date appears in neither the Bell sweep file (no Core Rush entry at all — it was added later as the second browser edition) nor the two banked PDFs (`pdftotext` + `grep -i "published\|oct 22\|2026"` on both = no hits). The feature claims in the same row ARE verified from the PDFs (see "verified clean").
- **Fix:** Drop the date or cite its actual source (itch page metadata / task brief).

### S5 — Birdography "update 2026-10-20" is unverified from the evidence on disk
- **File:** `records/vivid/coverage--vivid-0.1.2-2026-10-28.md` row 1.
- **Evidence:** `grep -in "oct 20\|2026-10-20\|updated"` on the Vivid sweep finds no such date (only the Life is Strange line). The itch page text in `birdography-beat1.pdf` does not carry an update date either.
- **Fix:** Drop the date or cite its actual source.

### S6 — Bell journey rules 4–5 cite driver-log steps as if they were beat files
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md`, phase-engine table rules 4 ("bell8 a6, bell9 c8, bell12 j5/j5b") and 5 ("bell14 l6b/n7; bell15 n7; bell16 p5").
- **Evidence:** `j5`/`j5b`/`n7`/`p5`/`l6b` do not exist as `bell/*.txt` files — but they DO exist as steps in the driver logs (`pw/play-bell12.log:14-15` `[j5]`/`[j5b]`; `pw/play-bell14.log:19-21` `[l6b]`/`[n7]`; `pw/play-bell15.log:19-20`; `pw/play-bell16.log:8` `[p5]`). The citations are valid but indistinguishable in form from beat-file citations (e.g. `g7-anchor.txt`, which does exist).
- **Fix:** Mark log-step citations as such (e.g. "bell12 log [j5]/[j5b]") so a checker does not look for files that do not exist.

### S7 — "Prediction disproved (bell7)" attribution is untraceable; the full quoted sentence is not verbatim in any dump
- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md` row 7: "a disproved prediction yields 'Prediction disproved — The Glassworks furnace begins to sing. No Momentum is lost.' (bell7)".
- **Evidence:** No `play-bell7.log` survives (only bell12–19 logs are on disk). "Prediction disproved" appears in `bell/90-loop2.txt`, `91-prepared.txt`, `92-loop2-noon.txt` — not in any file attributable to bell7. The full sentence as quoted (with em-dash) does not appear verbatim in any `.txt` file; "Prediction disproved" and "The Glassworks furnace begins to sing" (in `bell/32-step20/21/22.txt`) appear as separate panel elements. ("Foresight fulfilled" is verified in 16 files.)
- **Fix:** Drop the "(bell7)" attribution or re-attribute to the run that owns the 90-series files, and present the disproved grading as panel elements (or verify the exact sentence against the beat PNG).

### S8 — Vivid durations are estimates, not driver-log measurements
- **Files:** `records/vivid/journey--vivid-0.1.2-2026-10-28.md` ("both completed inside them [15/10 min]") and `records/vivid/session--vivid-0.1.2-agent-2026-10-28.md` ("Total duration: Iona ~8 min; Mara ~4 min | Driver logs").
- **Evidence:** `pw/play-vivid15.log` has 13 lines and no timestamps; no mara2 log exists. The "~1:00" elapsed tables are estimates. The 15/10-minute figures themselves are maximums/budgets, not targets (`PLAYTEST-CHECKLIST.md`: "At most 15 minutes unaided play within 25-minute session budget").
- **Fix:** Label the durations as estimates and the 15/10 figures as session maximums, not measured playtimes or targets.

### S9 — Critique action items 1, 3, 4 name no owner, no date, no next step
- **File:** `critique--one-page-2026-10-28.md`, "What to do before 20 November": item 1 (Bell one-line rule fix + "re-test with a fresh player" — who edits the build? who re-tests?); items 3–4 ("run the six-pair human gate" / "run the human gate" — the records themselves say "facilitator, participants, reviewer unassigned").
- **Fix:** Give each item an owner (or "owner: unassigned — first step is to assign") and a date/order. An action item that no one owns is a wish, and the standing rule is that every section ends in an executable action.

### S10 — Critique item 2 is a status statement, not an action
- **File:** `critique--one-page-2026-10-28.md`, item 2: "Bell: the Loop 2 outcome is proven (bell19, first-hand). No further Bell play is needed before the gate…"
- **Fix:** Move it out of the action list (into the verdicts or a status line) or reframe it as an action ("No further Bell play — close the Bell play workstream").

### S11 — Moments and Vivid decision ledgers omit the session records
- **Files:** `records/moments/decision--small-hours-2026-10-28.md` and `records/vivid/decision--vivid-0.1.2-2026-10-28.md` evidence ledgers list journey/art/coverage/beats/competitors but not their session records, while the Bell ledger (`records/bell/decision--bell-0.1.0-2026-10-28.md`) does list `session--bell-0.1.0-agent-2026-10-28.md`.
- **Fix:** Add `session--small-hours-agent-2026-10-28.md` and `session--vivid-0.1.2-agent-2026-10-28.md` to their ledgers.

### S12 — Organize file omits the second-edition competitor plays
- **File:** `organize-self-qa.md`: the "What was actually played" table and "Competitors — deep comparisons" list only ROLLBACK, Birdography, Gartic Phone; Q4 says "The other 15 sweep titles are desk research" (18 − 3 = 15), which was true at ~06:00 PDT but not after skribbl.io and Pixel Harbor were played first-hand.
- **Fix:** Add skribbl.io and Pixel Harbor rows to the table and update Q4 (18 sweep titles − 5 first-hand = 13 desk-only, with Core Rush still [OPEN]).

### S13 — Stray empty `competitors/gartic/` directory
- **Evidence:** `ls competitors/gartic/` = 0 PDFs; the Gartic captures live in `competitors/gartic-phone/` (5 PDFs), which is what the records cite. **Fix:** Remove the empty dir (or note it) so a checker does not think a capture set is missing.

### S14 — `38-curtain-b.txt` is misnamed (see F1)
- **Evidence:** `diff moments/38-curtain-b.txt moments/39-b-choice.txt` is empty; both contain Person A's choice screen. **Fix:** Rename to `38-a-choice-again.txt` (or annotate) and stop citing it as a curtain file.

### S15 — Bell art Strip 3 opens with Vivid's wedge
- **File:** `records/bell/art--bell-0.1.0-2026-10-28.md`, Strip 3: "First appearance: 'A little wooden wedge' (Vivid, not Bell — the pattern repeats across the demos)."
- **Evidence:** The wedge belongs to Vivid (`vivid/27-after-signal.txt`); the strip then corrects itself mid-sentence to Bell's traveler hum / drum key. Cross-demo contamination in a per-game record.
- **Fix:** Rewrite Strip 3 as Bell-only (traveler's hum → "Bell's true song"; drum key → still [OPEN]).

### S16 — Two Moments labels are real but cited to files that do not contain them
- **Files:** "See the rehearsal reveal" cited to `s5-rehearsal-reveal` (journey row 4, session record); "Person A's line is tucked away until you finish" cited to `s6-rehearsal-keepsake` (journey row 5).
- **Evidence:** `grep -i "reveal"` on `moments/s5-rehearsal-reveal.txt` returns nothing (the file shows the reveal screen, post-click); `grep -i "tucked away"` on `moments/s6-rehearsal-keepsake.txt` returns nothing (it shows the keepsake screen). Both labels are real — "See the rehearsal reveal" via the driver click (`pw/play-moments16.cjs:54`); the curtain line via the source (`builds/small-hours/build/views.js:32`).
- **Fix:** Re-cite to the driver log / source line instead of the post-click beat files.

### S17 — Two Bell labels are real but cited to beat files that do not contain them
- **Files:** "Anchor these into tomorrow" and "Face the thirteenth bell" cited to `p6-anchored.txt` / `n8-anchor.txt` (journey rules 5–6, critique, session record, decision brief).
- **Evidence:** `grep -ri "anchor these\|face the thirteenth" bell/*.txt` returns nothing; `grep -i "anchor" bell/p6-anchored.txt` returns only "Anchored memories". Both labels ARE in the build source (see "verified clean"). The text dumps do not capture the wake/continue buttons (they are set dynamically and the dumps were taken in other states).
- **Fix:** Cite the source lines in `release-candidates/thirteenth-bell/0.1.0/build/index.html` for these two labels, or add a note that the labels are source-verified because the dumps do not capture the buttons.

---

## Addendum (2026-10-28 ~12:35 UTC — information received after verification)

Two facts arrived via the parent agent's context update after the checks above were run. They do not change the FAIL verdict (F1 and M1–M14 stand), but they change the Core Rush items and add one Gartic caveat the fix pass must apply:

- **Core Rush play ENDED — partial, not pending.** Per the parent's update: 37 minutes, 1 coal dug, pod wedged, no sale / upgrade / field note / loop reset; held keys do not exist in this environment; the game tab was left open, paused, at the 1-coal state for a human to resume. Consequence for the fix pass: the Bell coverage row 2 and the critique's Core Rush bullet must be updated from "[OPEN] — task running 30+ min, report pending" to "first-hand play ended partial (37 min, 1 coal dug, pod wedged; no sale, upgrade, field note, or loop reset observed)". The template's second deep comparison for Bell is therefore NOT satisfied by Core Rush — it is a partial play, and the coverage's substitution plan (Quiet Express: Cabin 909 demo, or another browser edition) is now the live next step, not a contingency. The Bell coverage's "Browser editions actually studied: 1 confirmed + 1 in progress" line must become "1 confirmed + 1 partial".
- **Gartic Phone: Solo-only limitation, now confirmed.** Per the parent's update: Solo mode full session with "GIF export verified 770×490" (which corroborates the GIF-export claim in S2 — the dimension comes from the task report, not the PDFs), BUT "the telephone write→draw→guess chain was NOT exercised, Solo only". Consequence for the fix pass: the Moments coverage Gartic row should note the Solo-only limitation explicitly — the multiplayer telephone chain (the game's core mechanic) was not played, so the "deep comparison" is deep on Solo mode only. This is adjacent to S3 (which concerns skribbl's completion); the same "complete session" language should be qualified for Gartic too.

No other finding is affected by this update.
- Critique items 1, 3, 4 (S9) and item 2 (S10) and item 5 (M14) are the executability problems: one item is already done, one is not an action, and three name no owner. After fixes, the executable core is: (a) Bell branch owner adds one in-game line stating the advance rule, then a fresh player re-tests; (b) assign a facilitator + 12 people for the six-pair Small Hours gate and 6 pairs for the Vivid gate before 20 November; (c) nothing else blocks the gates.
- The Bell decision brief's condition ("Choose Bell — conditional on one fix") is executable as written only if the fix owner is named; same for the Moments/Vivid "run the human gate" decisions.

## Files checked (commands run)
- `ls -la` + per-dir listings of `play-2026-10-28/` (all beat/PDF/log files counted); `sha256sum` Bell index.html; `du -sb` Small Hours/Vivid builds; `find … -type f | wc -l` Vivid build (15); `wc -c` keepsake SVG (1,425); `cat builds/small-hours/baseline.json` (hash/commit/files).
- Quote greps across `bell/*.txt`, `moments/*.txt`, `vivid/*.txt` (verbatim + case-insensitive) for every headline quote; `diff moments/38-curtain-b.txt moments/39-b-choice.txt` (identical); `grep -rl` for "tucked", "Bring our details together", "Pass the screen to Person B", "WORN NOTCH", "Find both harbour marks first", "No answering light yet", "No visit recorded".
- `pdftotext` + `grep -c` on all 30 competitor PDFs (ROLLBACK 8, Birdography 5, Gartic 5, Core Rush 2, skribbl 5, Pixel Harbor 5).
- `gh api repos/PaperStrange/IndiaGames/issues/5` and the open-issue list (verified).
- `grep -rin` on the three sweep files (prices, dates, Core Rush/Birdography/Field Guide/BOKURA) and on the branch launch docs (Bell 20-min cap + thresholds; Vivid 15/10-min maximums + thresholds; Moments gate thresholds + "solo mode is a rehearsal").
- `browser.open https://exocoatl.itch.io/field-guide` (2026-10-28 12:31 UTC) to verify the Field Guide row.
- `cat` of `pw/play-bell12.log`–`play-bell19.log`, `pw/play-vivid15.log`, `pw/play-moments15.log`, `pw/play-moments16.log`; `grep -n` for log-step identifiers l6b/n7/p5/j5.
- Full reads of the critique, all 15 records, and `organize-self-qa.md`.
