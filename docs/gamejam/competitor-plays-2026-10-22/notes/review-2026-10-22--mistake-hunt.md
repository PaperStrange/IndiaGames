# Mistake-hunt / executability review — competitor-plays-2026-10-22 packages

**Reviewer:** mistake-hunt subagent · **Date:** 2026-10-22 · **Scope:** mechanical integrity only — file paths, names, numbers, hashes, formats. Content quality and framing are the adversarial reviewer's brief.
**Packages reviewed (staging, unmodified by this review):**
- `~/workspace/package-staging-2026-10-22/bell/docs/gamejam/competitor-plays-2026-10-22/` (46 files, 128,379,605 B ≈ 122.4 MiB)
- `~/workspace/package-staging-2026-10-22/moments/docs/gamejam/competitor-plays-2026-10-22/` (30 files, 74,321,584 B ≈ 70.9 MiB)
- `~/workspace/package-staging-2026-10-22/vivid/docs/gamejam/competitor-plays-2026-10-22/` (25 files, 172,459,773 B ≈ 164.5 MiB)

**Headline:** No BLOCKERs. All play numbers, all market numbers, all capture counts, all supersession carryovers, and all file-integrity checks pass. The one systematic defect class is filename/path citations inside records that do not match the names the files are actually filed under (SHOULD-FIX, one consistent rename-or-edit pass).

---

## Bell package (`the-thirteenth-bell`)

### B-1 [SHOULD-FIX] Market records cite storefront PDFs by names that are not the filed names
- **Check:** extracted every `*.pdf`/`*.mp4` filename cited in `bell/docs/gamejam/competitor-plays-2026-10-22/market-research/*.md` and compared against the folder listing.
- **Found:**
  - `outer-wilds--market-research-record-2026-10-20.md:4` cites `storefront-top.pdf` and `storefront-about-sysreq.pdf`; the filed files are `outer-wilds-storefront-top.pdf` and `outer-wilds-storefront-about-sysreq.pdf`.
  - `into-the-breach--market-research-record-2026-10-20.md:4` cites `storefront-top.pdf` and `storefront-about-sysreq.pdf`; the filed files are `into-the-breach-storefront-top.pdf` and `into-the-breach-storefront-about-sysreq.pdf`.
  - Trailer citations in the same sentences are exact and correct: `outer-wilds-accolades-trailer.mp4` ✓, `into-the-breach-announcement-trailer.mp4` ✓, and `slice-and-dice-steam-trailer.mp4` in `slice-and-dice--market-research-record-2026-10-20.md:17` ✓.
- **Fix:** edit the two records' source lines to the filed names (or strip the game prefixes from the filed PDFs — one or the other, consistently).

### B-2 [SHOULD-FIX] Play records cite study-dir folders (`captures-2026-10-20/`, `captures-2026-10-20-session2/`) that do not exist in this package
- **Check:** `grep -rn 'captures-2026' bell --include='*.md'`. The package files captures flat in `captures/` with game-prefixed names; no `captures-2026-10-20*` folder exists in the package, so a repo reader following these strings finds nothing.
- **Found (path string wrong; the stated counts are all verified correct — see B-5):**
  - `records/anchorhead--player-record-2026-10-20.md:6` — "`captures-2026-10-20/`" (4 PDFs; 4 filed ✓)
  - `records/desktop-dungeons--player-record-2026-10-20.md:6` — "`captures-2026-10-20/`" (7 PDFs; 7 filed ✓)
  - `records/rogue-fable-iv--player-replay-2026-10-20.md:27` — "`captures-2026-10-20-session2/`" (1 of 6 shells banked; 1 filed ✓)
  - `records/seedship--player-replay-2026-10-20.md:42` — "`captures-2026-10-20-session2/`" (5 PDFs; 5 filed ✓)
- **Fix:** in each record, replace the study-dir folder string with the package location (`captures/` in this package, files prefixed `anchorhead-…`, `desktop-dungeons-…`, `rogue-fable-iv-…`, `seedship-s2-…`).

### B-3 [SHOULD-FIX] README overstates Slice & Dice market contents: "storefront captures … each"
- **Check:** `bell/docs/gamejam/competitor-plays-2026-10-22/README.md` states market research for all three paid originals is "(record + Steam storefront captures + archived trailer each)". Folder listing + `find ~/workspace/gamejam-studies/slice-and-dice -type f` show Slice & Dice has **no storefront capture PDFs anywhere** — not in the package, not in the study source (only the access check, the market record, and the trailer exist). Its market record is itch.io-based, not a Steam storefront capture.
- **Fix:** amend the README sentence so the "record + storefront captures + trailer" formula applies to Outer Wilds and Into the Breach, with Slice & Dice called out as "record + trailer (itch-based record; no Steam storefront capture)".

### B-4 [NOTE] Supersession mechanics: the Oct-20 package will still sit beside the new one, unmarked
- **Check:** `git ls-tree origin/the-thirteenth-bell -- docs/gamejam/competitor-plays-2026-10-20` (package present at branch tip). The new README's "Supersedes" claim is fulfilled only by its own text; committing this package does not remove or annotate the Oct-20 package, whose own README carries no superseded pointer. Not an error, but a reader landing on the old package first gets no forward signpost. Optional fix: a one-line commit touching the old README, or accept and rely on the new README's wording.

### B-5 [CLEAN] Numbers — README vs records vs captures (all verified)
- Seedship (`records/seedship--player-replay-2026-10-20.md`): S1 settled "Dearth", 873 survivors after landing → colony wiped to 0, **Total: 2,873** (line 32); S2 settled **"Arcadia"**, **677 survivors**, **10,357** (line 41) — matches README B5 row (2,873 / "Arcadia" / 677 / 10,357) exactly.
...[truncated 12766 chars]- Anchorhead (`records/anchorhead--player-record-2026-10-20.md:5,17`): "two full in-game days … score 9 points" — README B2 row "2 in-game days, score 9" ✓.
- Desktop Dungeons (`records/desktop-dungeons--player-record-2026-10-20.md:13`): warlock hit sequence 10/15 → **5/15**, protection fired, hit 3 kills, "You die..." — README B3 row "full run to death + partial 2nd stage" ✓; the record's own evidence line (line 6) states the death screen shows the warlock at 5/15 ✓.
- Rogue Fable IV (`records/rogue-fable-iv--player-replay-2026-10-20.md`): session 1 two runs (Run 1, Run 2) + session 2 "two more runs" (line 24–25), best XP **74%** (S2 Run 2) — README B4 row "two sessions, four runs, best XP 74%" ✓.
- Evidence counts vs filed files: B1 "3 banked screenshots" = 3 `detective-again-*.png` ✓; B2 "4 legible transcript PDFs" = 4 `anchorhead-*.pdf` ✓; B3 "7 verified PDFs" = 7 `desktop-dungeons-*.pdf` ✓; B5 "5 verified PDFs (S2)" = 5 `seedship-s2-*.pdf` ✓; B6 "5 banked screenshots" = 5 `a-dark-room-*.png` ✓; B4 1 page shell filed ✓.
- README internal: B1 "case solved 2026-10-06; partial replay 2026-10-12" matches the two filed Detective records' names/dates ✓.

### B-6 [CLEAN] Market numbers vs filed storefront PDFs (pdftotext spot-check — every value found)
- Outer Wilds (`outer-wilds-storefront-top.pdf` + `outer-wilds-storefront-about-sysreq.pdf`): record claims R$ 67,99 list / R$ 33,99 at −50%; 18 Jun 2020; 90,732 total / 53,515 EN / 1,132 recent; Mobius Digital — **all strings found** in the two PDFs.
- Into the Breach (`into-the-breach-storefront-top.pdf` + `into-the-breach-storefront-about-sysreq.pdf`): record claims R$ 28,99 no discount; 27 Feb 2018; 19,131 total / 12,721 EN; Subset Games — **all strings found**.
- Trailer claims: Outer Wilds record "27 MB" vs filed 27,111,673 B ✓; Into the Breach "51 MB" vs 51,276,197 B ✓; durations probe as real video (38.0 s / 70.6 s).
- Slice & Dice market record: its claims are itch-sourced (no storefront PDF exists to check against — see B-3); its one filename citation (`slice-and-dice-steam-trailer.mp4`) matches the filed trailer exactly ✓.

### B-7 [CLEAN] Supersession carryover from the Oct-20 bell package — nothing dropped
- **Check:** `git ls-tree -r origin/the-thirteenth-bell -- docs/gamejam/competitor-plays-2026-10-20` vs new package listing; md5 comparison of git blobs vs staged files for every shared item.
- **Found:** all 6 Oct-20 records are present in the new package — 4 byte-identical (`a-dark-room--player-replay-2026-10-12-partial.md`, `detective-again--player-replay-2026-10-12-partial.md`, `detective-again--playtest-report-2026-10-06.md`, `slice-and-dice--access-check-2026-10-20.md`), 2 updated (`rogue-fable-iv--player-replay-2026-10-20.md` — session-2 addendum; `seedship--player-replay-2026-10-20.md` — S2 addendum); the Slice & Dice market record is byte-identical; the trailer is byte-identical; all 8 Oct-20 snapshots (5 A Dark Room + 3 Detective) are re-filed under the same names in `captures/`. The only Oct-20 item not carried is its README itself, replaced by the new package README — expected for a superseding package.
- **Fix:** none.

### B-8 [CLEAN] File integrity (bell)
- Largest file 51,276,197 B (Into the Breach trailer) — under GitHub's 100 MB hard limit; over the 50 MB recommended threshold (push will succeed with a warning). All PDFs parse under `pdfinfo`; trailer probes as valid MP4 (70.6 s). No zero-byte files.

**Bell verdict: PASS-AFTER-FIXES (B-1, B-2, B-3).**

---

## Moments package (`memorable-moments-game`)

### M-1 [SHOULD-FIX] Florence market record cites the storefront PDF and trailer by names that are not the filed names
- **Check:** filename citations in `moments/docs/gamejam/competitor-plays-2026-10-22/market-research/florence--market-record-2026-10-20.md` vs folder listing.
- **Found:** line 3 cites `storefront-capture-2026-10-20.pdf`; the filed file is `florence-storefront-capture.pdf`. Line 12 cites `trailer.mp4`; the filed file is `florence-trailer.mp4`. (Also note the cited name embeds date 2026-10-20 while the record says the page was displayed 2026-10-21 — the filed name drops the date entirely, which is the cleaner resolution.)
- **Fix:** edit both citations to the filed names.

### M-2 [SHOULD-FIX] Missed Messages access check cites the listing capture by a name that is not the filed name
- **Check:** `moments/docs/gamejam/competitor-plays-2026-10-22/records/missed-messages--access-check-2026-10-20.md:9` cites `listing-page-capture-2026-10-20.pdf`; the filed file is `captures/missed-messages-listing-page-capture.pdf`.
- **Fix:** edit the citation to the filed name.

### M-3 [SHOULD-FIX] Play records cite study-dir folders (`captures-2026-10-20/`, `captures-2026-10-20-session2/`) that do not exist in this package
- **Check:** `grep -rn 'captures-2026' moments --include='*.md'`; package files captures flat in `captures/` with game-prefixed names. Counts in every cited sentence were re-verified against the filed files and are correct.
- **Found:**
  - `records/hanabi--player-record-2026-10-20.md:5` — "`captures-2026-10-20/`" (2 PDFs; 2 filed ✓)
  - `records/geoguessr--player-record-2026-10-20.md:5` — "`captures-2026-10-20/`" (7 files; 7 filed ✓)
  - `records/novena--player-record-2026-10-20.md:6` — "`captures-2026-10-20/`" (4 PDFs; 4 filed ✓)
  - `records/twin-flames--player-record-2026-10-20.md:7` — "`captures-2026-10-20/`" (1 of 4 shells banked; 1 filed ✓)
  - `records/fireboy-and-watergirl--player-attempt-2026-10-20-fragment.md:25` — "`captures-2026-10-20-session2/`" (5 shells retained; 5 filed ✓)
- **Fix:** same pass as B-2 — point each string at the package `captures/` folder and the prefixed filed names.

### M-4 [NOTE] Supersession mechanics (moments)
- Same situation as B-4: `docs/gamejam/competitor-plays-2026-10-20/` exists at the `origin/memorable-moments-game` tip and will coexist, unmarked, after this package lands. Optional forward pointer in the old README; not an error.

### M-5 [CLEAN] Numbers — README vs records (all verified)
- Hanabi (`records/hanabi--player-record-2026-10-20.md`): **57 turns** (line 3); final piles **Red 1, Yellow 4, Green 3, Blue 5, Purple 5** summing to **score 18** with **2 strikes**, "18/18" (line 14); evidence line quotes the end screen's "Players score 18 points," Turn 57 (line 5) — README M3 row "57 turns, 18/18 (the reachable maximum)" ✓. The record consistently labels the partners as bots and human shorthand as untested, matching the README.
- Twin Flames (`records/twin-flames--player-record-2026-10-20.md:5,10`): **Level 1 COMPLETED, LEVEL CLEARED, 12 steps vs par 8**; Level 2 crossed with the cleared banner explicitly *not* witnessed — README M2-substitute row says exactly this ("Level 2 crossed (its cleared banner not witnessed; stated in the record)") ✓.
- GeoGuessr (`records/geoguessr--player-record-2026-10-20.md:4,13,18,23`): two sessions × 3 runs = **six runs total, 0 days survived, 0 pins placed** — README M4 row ✓. (Session/capture naming: the 7 filed PDFs are session-2 beats; the record states session 1 captures are not banked — consistent with the README's "7 verified PDFs".)
- novena (`records/novena--player-record-2026-10-20.md:5`): "the full piece played **twice**, two entire cycles (eighteen audiences), and the second cycle verified … identical" — README M6 row "COMPLETE, played twice in full (two cycles verified identical)" ✓.
- Evidence counts vs filed files: M1 "3 banked screenshots" = 3 `make-it-meme-*.png` ✓; M2 "5 page shells" = 5 `fireboy-and-watergirl-*.pdf` ✓; M2-sub 1 page shell = `twin-flames-00-page-shell.pdf` ✓; M3 "2 verified PDFs" = 2 `hanabi-*.pdf` ✓; M4 "7 verified PDFs" = 7 `geoguessr-*.pdf` ✓; M5 save-state URL class, no captures claimed ✓; M6 "4 verified PDFs" = 4 `novena-*.pdf` ✓; M6-candidate listing capture = `missed-messages-listing-page-capture.pdf` ✓.

### M-6 [CLEAN] Market numbers vs filed storefront PDF (pdftotext — every value found)
- Florence (`market-research/florence-storefront-capture.pdf`): record claims **$0.94 at −75%** (regular $3.79), **13 Feb 2020**, Very Positive **14,934** total / 4,404 EN / 123 recent — the strings `0.94`, `75%`, `3.79`, `13 Feb`, `2020`, `14,934`, `4,404`, `123` are **all present** in the capture's text layer.
- Trailer claim "24 MB, 0:33" vs filed `florence-trailer.mp4` = 24,136,227 B, ffprobe duration 33.2 s ✓ (name citation wrong — see M-1).

### M-7 [CLEAN] Supersession carryover from the Oct-20 moments package — nothing dropped
- **Check:** `git ls-tree -r origin/memorable-moments-game -- docs/gamejam/competitor-plays-2026-10-20` vs new package; md5 blob comparison.
- **Found:** both Oct-20 records are present — `make-it-meme--player-walk-2026-10-13.md` byte-identical, `fireboy-and-watergirl--player-attempt-2026-10-20-fragment.md` updated (session-2 addendum); all 3 Oct-20 Make it Meme snapshots re-filed under the same names in `captures/`. Only the Oct-20 README is not carried (replaced) — expected.

### M-8 [CLEAN] File integrity (moments)
- Largest file 24,136,227 B — comfortably under all GitHub limits. All PDFs parse under `pdfinfo` (including the 5 Fireboy page shells and the 3.2 MB Hanabi end-screen PDF); all PNGs verify as PNG image data via `file`; no zero-byte files.

**Moments verdict: PASS-AFTER-FIXES (M-1, M-2, M-3).**

---

## Vivid package (`vivid-2.5d-photo-game`)

### V-1 [SHOULD-FIX] All three market records cite the storefront PDF and trailer by names that are not the filed names
- **Check:** filename citations in `vivid/docs/gamejam/competitor-plays-2026-10-22/market-research/*.md` (line 3 and line 12 of each) vs folder listing.
- **Found:** `event-0--market-record-2026-10-20.md`, `toem--market-record-2026-10-20.md`, and `rhythm-doctor--market-record-2026-10-20.md` each cite `storefront-capture-2026-10-20.pdf` and `trailer.mp4`. The filed files are `event-0-storefront-capture.pdf` / `event-0-trailer.mp4`, `toem-storefront-capture.pdf` / `toem-trailer.mp4`, `rhythm-doctor-storefront-capture.pdf` / `rhythm-doctor-trailer.mp4`. (Same date wrinkle as M-1: cited name says 2026-10-20, records say displayed 2026-10-21.)
- **Fix:** edit the six citations (two per record) to the filed names.

### V-2 [SHOULD-FIX] Play records cite the study-dir folder `captures-2026-10-20/` that does not exist in this package
- **Check:** `grep -rn 'captures-2026' vivid --include='*.md'`; counts re-verified correct.
- **Found:**
  - `records/galatea--player-record-2026-10-20.md:6` — "`captures-2026-10-20/`" (3 PDFs; 3 filed ✓)
  - `records/beyond-the-trees--player-record-2026-10-20.md:6` — "`captures-2026-10-20/`" (1 of 4 shells banked; 1 filed ✓)
  - `records/friday-night-funkin--player-attempt-2026-10-20-partial.md:5` — "`captures-2026-10-20/`" (3 of 7 shells banked; 3 filed ✓)
- **Fix:** same pass as B-2/M-3 — point each string at the package `captures/` folder and the prefixed filed names.

### V-3 [NOTE] Coverage-index shorthand for V1/V2 drops the repo path prefix used elsewhere in the same README
- **Check:** vivid README prose cites `docs/gamejam/player-first-replays-2026-10-15/` (full path, verified present on `origin/vivid-2.5d-photo-game`), but the coverage table's Played-record cells say only "Filed in `player-first-replays-2026-10-15/`". A reader inside `competitor-plays-2026-10-22/` could look for a non-existent sibling folder. Cosmetic; recommend matching the full-path form in the table.

### V-4 [NOTE] V1/V2 evidence-class wording ("Verified screenshots (there)") vs the Oct-15 records' own caveats
- **Check:** `git show origin/vivid-2.5d-photo-game:docs/gamejam/player-first-replays-2026-10-15/records/sort-the-court--player-replay-2026-10-13-partial.md` header: coverage "~6 in-game days" (README V1 "~6 in-game days" ✓ — number is right), but the same record states its quotes/numbers rest on screenshots viewed in play and that "the captures didn't survive" / "No screenshots attachable" for that run; the Six Cats Under records in that package are likewise labeled `-failed` and `-retry-partial`. The vivid README's blanket "Verified screenshots (there)" for V1/V2 is stronger than the cited package's own record-level labeling. This is a wording tension across packages, not a staging error I can resolve mechanically — recommend the README mirror the Oct-15 package's own labels (screenshots exist at package level; the Sort the Court! record itself disclaims attachable captures for its run).

### V-5 [CLEAN] Numbers — README vs records (all verified)
- Beyond the Trees (`records/beyond-the-trees--player-record-2026-10-20.md:4,5,11,14`): **7 timed rounds completed, 15+ photographs**, stopped at round 7's Game Over screen; the promised score explicitly recorded as **never observed** — README V4 row "7 timed rounds, 15+ photos, deep partial" + "its promised score was never observed in play (record states this)" ✓.
- Galatea (`records/galatea--player-record-2026-10-20.md`): played blind to a genuine ending; README V3 "COMPLETE" ✓; 3 transcript PDFs filed ✓.
- Friday Night Funkin' (`records/friday-night-funkin--player-attempt-2026-10-20-partial.md`): menus + Tutorial ×2 + Bopeebo ×2, no song passed — README V6 row matches, including the input-latency attribution ✓.
- Townscaper V5 row: "~15 min, six structures" (moments M5 row) / sessions Oct-13 + Oct-20 (vivid V5 row) per the shared record — see X-1.
- Evidence counts vs filed files: V3 "3 legible transcript PDFs" = 3 `galatea-*.pdf` ✓; V4 1 page shell = `beyond-the-trees-00-page-shell.pdf` ✓; V6 "Page shells" = 3 `friday-night-funkin-*.pdf` ✓.
- External references all resolve on `origin/vivid-2.5d-photo-game`: `docs/gamejam/competitor-matrix-2026-10-06.md` ✓ exists; `docs/gamejam/player-first-replays-2026-10-15/` ✓ exists and does contain the V1 (`sort-the-court--player-replay-2026-10-13-partial.md`) and V2 (`six-cats-under--player-replay-2026-10-13-*.md`) records the README points to; `docs/gamejam/vivid-iteration-2026-10-21/research/` ✓ exists, and its `coverage.json` roster matches the six titles the README names (spot-verified: sort-the-court, six-cats-under, adventures-with-anxiety present with the same titles).
- Branch-hygiene check per the brief: this vivid package is a pure addition under `docs/gamejam/competitor-plays-2026-10-22/` and re-files nothing from, and modifies nothing in, the other session's `vivid-iteration-2026-10-21/` tree or the Oct-15 package.

### V-6 [CLEAN] Market numbers vs filed storefront PDFs (pdftotext — every value found)
- Event[0] (`event-0-storefront-capture.pdf`): record claims **19,99€**, no discount; **14 Sep 2016**; Mostly Positive **1,464** (recent Very Positive 17) — strings `19,99`, `14 Sep`, `2016`, `1,464`, `Mostly Positive` **all present**.
- TOEM (`toem-storefront-capture.pdf`): record claims **18,99€**; **17 Sep 2021**; Overwhelmingly Positive **10,185** / 3,442 EN / 472 recent — strings `18,99`, `17 Sep`, `2021`, `10,185`, `3,442`, `472` **all present**.
- Rhythm Doctor (`rhythm-doctor-storefront-capture.pdf`): record claims **$10.49**; full release **6 Dec 2025** (EA 26 Feb 2021); Overwhelmingly Positive **25,177** / 8,169 EN / 166 recent — strings `10.49`, `6 Dec`, `2025`, `25,177`, `8,169`, `166` **all present**.
- Trailer claims vs filed MP4s (ffprobe): Event[0] "72 MB, 1:47" vs 71,897,493 B / 107.3 s ✓; TOEM "50 MB, 1:08" vs 50,258,613 B / 68.1 s ✓; Rhythm Doctor "27 MB, 1:28" vs 27,208,260 B / 88.2 s ✓ (name citations wrong — see V-1).

### V-7 [CLEAN] File integrity (vivid)
- Largest single file 71,897,493 B (Event[0] trailer) — under the 100 MB hard limit; two of this package's trailers exceed GitHub's 50 MB recommended threshold (Event[0] 71.9 MB, TOEM 50.3 MB; Rhythm Doctor 27.2 MB is under) — pushes succeed with warnings. Package total 172,459,773 B is the largest of the three. All PDFs parse under `pdfinfo`; no zero-byte files.

**Vivid verdict: PASS-AFTER-FIXES (V-1, V-2).**

---

## Cross-package checks

### X-1 [CLEAN] Townscaper duplication is intentional and the copies are identical
- **Check:** `md5sum` on both filed copies.
- **Found:** `moments/…/records/townscaper--player-record-2026-10-20.md` and `vivid/…/records/townscaper--player-record-2026-10-20.md` both hash to `7b1e21e68dce37f4d6445c7df71eb907` — byte-identical, as intended (M5 and V5 are the same original played for both matrices). It is the **only** cross-package duplicate: a hash sweep of all 31 `.md` files across the three packages found no other shared hash.

### X-2 [CLEAN] Provenance: every staged non-README file is byte-identical to its study source
- **Check:** full md5 set comparison of all 101 staged files against every file under `~/workspace/gamejam-studies/`.
- **Found:** 98 of 101 staged files match a study-source file byte-for-byte; the only three without a source counterpart are the three new package `README.md` files. No record or capture was silently edited, re-encoded, or divergently copied during staging.

### X-3 [CLEAN] Checks that came back fully clean across all three packages (explicit list)
1. Every file path/name referenced in each `README.md` exists in its package exactly as named (scripted existence check over all backticked record paths — zero missing). External repo references (superseded Oct-20 packages, Oct-15 package, Oct-21 research tree, competitor matrix) all verified present on the respective `origin/` branch tips.
2. Capture **counts** stated in records and READMEs vs files actually filed — all 18 slots verified (see per-package CLEAN sections).
3. All eight mandated number sets (Hanabi, Seedship S1+S2, Anchorhead, Twin Flames, Desktop Dungeons, GeoGuessr, novena, Beyond the Trees) cross-check README ↔ record exactly.
4. All seven market records' price / discount / release-date / review-count claims appear verbatim in their filed storefront PDFs (pdftotext), including the BRL-denominated Outer Wilds / Into the Breach figures; all six trailer size/duration claims match `ffprobe`/byte counts.
5. File hygiene: **no file over 100 MB** (max 71,897,493 B); **no zero-byte files**; **every PDF in all three packages parses** under `pdfinfo`; every MP4 identifies as ISO Media and probes with a real duration; every PNG identifies as PNG image data.
6. Supersession (check 7): **nothing filed in either Oct-20 package is dropped** by the rebuilds — every record, snapshot, market record, and the trailer is carried, identical or addendum-updated.

### X-4 [NOTE] Aggregate push weight
- The three commits will add ≈ 357 MiB total across the three branches (bell 122.4 MiB, moments 70.9 MiB, vivid 164.5 MiB), driven by seven trailers. Nothing violates a GitHub limit (per-file hard limit respected; three files exceed the 50 MB recommended threshold and will draw warnings: Into the Breach trailer 51.3 MB, Event[0] trailer 71.9 MB, TOEM trailer 50.3 MB — the other four trailers are under). Flagging only so the push size is a decision, not a surprise.

---

## Verdict summary

| Package | Verdict | Required fixes |
|---|---|---|
| Bell | **PASS-AFTER-FIXES** | B-1, B-2, B-3 |
| Moments | **PASS-AFTER-FIXES** | M-1, M-2, M-3 |
| Vivid | **PASS-AFTER-FIXES** | V-1, V-2 |

All required fixes are one mechanical class: make in-text filename/path citations match the filed names (market records' `trailer.mp4` / `storefront-capture-2026-10-20.pdf` / `storefront-top.pdf` / `storefront-about-sysreq.pdf` / `listing-page-capture-2026-10-20.pdf` citations, and play records' `captures-2026-10-20*/` folder strings) — plus the single wording correction in B-3. No content, number, capture, or carryover defect was found. NOTEs (B-4, M-4, V-3, V-4, X-4) are optional and do not block the commit.
