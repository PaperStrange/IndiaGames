# Rebuild Review A — Adversarial (boss / business-partner lens)

**Scope:** the three rebuilt competitor-play packages at `docs/gamejam/competitor-plays-2026-10-22/` in
`~/workspace/checkouts/bell` (the-thirteenth-bell), `~/workspace/checkouts/moments` (memorable-moments-game),
`~/workspace/india-games/IndiaGames` (vivid-2.5d-photo-game).
**Method:** every embedded image in every gallery was opened and compared against its caption; record prose was
read in full; README layout/coverage claims were checked against the actual trees; link integrity was verified
mechanically (all embeds resolve, zero orphan images, zero `captures/` references outside `notes/`).
**Overall verdict: NOT CLEAN — 3 FAIL, 5 MUST-FIX, the rest PASS.** The structural rebuild is real (evidence now
lives inside the records and every link resolves), but three honesty defects survived the builder's audit —
one of them is exactly the failure class these packages exist to prevent: a blank file presented as a screenshot.

---

## FAIL findings

### F1 — A Dark Room: a completely blank image is filed and captioned as a gameplay screenshot
- **File:** bell `evidence/a-dark-room-03-reverification-stranger-builds-things.png`
- **Caption:** bell `records/a-dark-room--player-replay-2026-10-12-partial.md` lines 29–30 —
  "Re-verification — the stranger builds."
- **Evidence:** the PNG is 1919×998 with exactly **one unique pixel value (255)** — pure white, verified
  programmatically (PIL extrema 255/255) and visually. It shows nothing: no room, no stranger, no building.
- **Aggravating:** nothing in the record, the gallery intro, or the README discloses this. Bell `README.md`
  line 13 lists B6's evidence class as "5 banked screenshots"; one of the five is blank. A partner opening
  this record sees a white rectangle captioned as a verified beat.
- **Fix:** remove the file and the embed (four real screenshots remain), or replace it with a genuine capture
  and correct the README count/disclosure either way.

### F2 — Anchorhead beat 3: "full scrollback" claimed in caption, prose, and filename — the capture holds one room
- **Caption:** bell `records/anchorhead--player-record-2026-10-20.md` lines 37–38 —
  "The hidden Observatory, with the day's full scrollback (transcript PDF, page 1)."
- **Prose:** same record, line 6 — "…including the deepest capture's full-day scrollback."
- **Evidence:** `evidence/anchorhead-beat3-hidden-observatory-full-scrollback.pdf` is **1 letter page,
  349 words of text**, containing only the Observatory segment (status line "day two"; telescope/charts
  exchanges). `pdftotext` finds no day-one content, no File Room, no "Verlac" — the day's scrollback is not
  in the file. The rendered embed shows the Observatory only, which is all there is.
- **Fix:** rename/re-caption to what the capture is ("The hidden Observatory, day two"), and correct the
  Evidence line's "full-day scrollback" claim.

### F3 — Detective caption names a location the image does not show ("office door" = the bathroom door)
- **Caption:** bell `records/detective-again--player-replay-2026-10-12-partial.md` lines 41–42 and
  `records/detective-again--playtest-report-2026-10-06.md` lines 41–42 —
  "Detective at the office door (session capture)."
- **Evidence:** the image shows a tiled **bathroom** (tiles, toilet) with the detective at a brown door.
  The playtest report's own journal (line 13) states what this frame is: "Clicked door '05' → new scene:
  tiled bathroom, detective-in-hat at a brown door." The filename agrees:
  `detective-again-01-bathroom-detective-door-05.png`. No office door appears in the image.
- **Fix:** re-caption in both records (e.g., "The detective at the bathroom door (door 05)").

---

## MUST-FIX findings

### M1 — Bell market records: the "about/system requirements" embed shows another storefront-top view
- **Files:** bell `market-research/outer-wilds--market-research-record-2026-10-20.md` lines 22–23 and
  `market-research/into-the-breach--market-research-record-2026-10-20.md` lines 22–23.
- **Evidence:** both "about-sysreq" page-1 renders show the storefront **top** again (trailer mid-play:
  Outer Wilds at 0:35, Into the Breach at 0:26/1:10) — no About text, no system requirements, near-duplicate
  of the first embed. The content does exist deeper in the filed PDFs (OW top 5 pp / about 7 pp; ItB 4 pp /
  5 pp; `pdftotext` confirms "About This Game", "System Requirements", and the 90,732 / 19,131 all-language
  totals), so this is a wrong-page embed, not a fabrication — but a cold reader is told they are looking at
  system requirements when they are not.
- **Fix:** render the page that actually carries About/SysReq, or re-caption as "storefront capture (full PDF
  — page 1 shown)".

### M2 — Detective replay record embeds the earlier session's screenshots without attribution
- **File:** bell `records/detective-again--player-replay-2026-10-12-partial.md`, gallery lines 41–46.
- **Evidence:** the record's own addenda state the replay sessions produced **no capturable screenshots**
  ("No screenshots capturable — eyewitness account only"). The gallery nevertheless embeds the three
  2026-10-06 session captures with only "(session capture)" as attribution. A cold reader will take them as
  illustrations of the replay they document nothing about.
- **Fix:** label the gallery in the replay record as captures from the 2026-10-06 solved session (as filed in
  the companion playtest report).

### M3 — Galatea embeds clip the ends of long transcript lines (reader-facing legibility defect)
- **Files:** vivid `records/galatea--player-record-2026-10-20.md` gallery; `evidence/img/galatea-beat1/2/3*.png`.
- **Evidence:** in all three renders, long lines run off the right edge mid-word (beat 1: "…has since committed
  suicid—", "…immediately after my waki—"). The filed PDFs' text layer is complete (`pdftotext` returns the
  full lines), so the underlying evidence is sound — but the embedded views, which are what a partner
  actually reads, truncate most long lines.
- **Fix:** re-render the views fit-to-page-width, or add a gallery note that line endings are in the PDF
  originals.

### M4 — Rhythm Doctor market record: cross-reference path does not resolve
- **File:** vivid `market-research/rhythm-doctor--market-record-2026-10-20.md` line 2 cites
  `../access-check-2026-10-20.md`; the actual file is `../records/rhythm-doctor--access-check-2026-10-20.md`.
  (The record's other reference, "see the access check in `records/`", is fine.)

### M5 — Make it Meme gallery caption over-broad: "Modes and topics" over a topics-only frame
- **File:** moments `records/make-it-meme--player-walk-2026-10-13.md` lines 31–32.
- **Evidence:** the embedded frame shows the "Choose some topics" step (Lobby #139) with the setup flow bar;
  no game-mode selection screen appears anywhere in the gallery, though the record describes choosing one.
  The caption mirrors the record's section title rather than the frame's content.
- **Fix:** re-caption ("Topics selection (Oct-15 re-shoot)") or add the modes frame.

---

## PASS — caption-by-caption verification (what was opened and matched)

**Moments**
- GeoGuessr beats 1–7 — all PASS. Beat 5 specifically re-verified: the in-frame readout reads **"13 M AWAY"**
  (health 6000/6000, the CASEY van below), exactly as the corrected caption states; the caption's explanation
  of the stale "20m" filename is honest and visible in the image itself. Beat 4 (same street, 26 M, "Happy
  Thoughts USED"), beat 6 ("UNFOLD THE MAP — Click the red dot"), beats 3/7 end screens — all match.
- Hanabi beats 1–2 — PASS. Beat 2 shows the action log ending "Players score 18 points.", Turn 57,
  Score 18/18, two strike marks, and final piles Red 1 / Yellow 4 / Green 3 / Blue 5 / Purple 5 — caption and
  record prose agree to the digit.
- Novena beats 1–4 — PASS (opening church; "the ebb tide / takes you in its jaw" at the shrine; dawn shore;
  final line "make a wish / i will help" at the dawn shrine).
- Make it Meme 01 (lobby) and 03 (two-player gate — the toast "At least two players are needed to start the
  game" is legible in-frame) — PASS. (02 is M5 above.)
- Fireboy shells 01–05 — PASS, on the strength of the disclosure the builder added at record line 28: the
  02/03 and 04/05 render pairs are byte-identical frames (verified by md5), and the record says so plainly
  before the gallery. Captions claim no visible game content. This is the honest pattern F1 should have
  followed.
- Twin Flames shell — PASS ("The itch page with the game's cover art" is exactly what renders; game area
  black and captioned as a shell).
- Missed Messages listing — PASS (itch page: "A downloadable game for Windows, macOS, and Linux",
  "Download Now — Name your own price"; caption "download-only, no browser build" is what the frame proves).
- Florence storefront — PASS: −75% and **$0.94 USD** legible in the Buy box; record figures (13 Feb 2020,
  Mountains/Annapurna, English 4,404, recent 123) all visible in the same render.

**Bell**
- Seedship S2 beats 1–5 — PASS. Beat 5 shows Planet Arcadia, Colonists 677, and the score block totalling
  **10357**, matching caption, record, and README (677 survivors, 10,357). Beat 3 is the comet trade-off,
  beat 4 the Arcadia profile, beat 2 the probe result — all as captioned.
- Desktop Dungeons beats 1, 4, 5, 6, 7 — PASS, several to the digit: beat 4 panel reads "Goblin — Next hit
  estimate: VICTORY — 1/6"; beat 5 "Warlock … DEATH … 5/15" with the hero at 1/10 (caption: "standoff at
  1 HP"); beat 6 the "You die..." dialog with the warlock at 5/15. Beat 7 shows the Gnome Wizard stage.
- Anchorhead beats 0–2 — PASS (title screen; "Outside the Real Estate Office" opening; beat 2 shows the
  whispered **"Verlac."** and the keys pocketed from the filing cabinets, +2 points — the session's emblem
  beat is genuinely in the file). Beat 3 is F2.
- A Dark Room 01, 02, reshoot-02, reshoot-03 — PASS (stranger-arrival text; "A Silent Forest" + stores;
  village pop 4/4; the build list). 03 is F1.
- Rogue Fable IV shell — PASS, the package's honesty exemplar: caption and record prose both state all six
  session-2 captures are the identical shell and that only one is banked.
- Outer Wilds / Into the Breach storefront **top** embeds — PASS against the market records' figures
  (OW: R$ 67,99 → R$ 33,99 at −50%, recent 1,132, English 53,515; ItB: R$ 28,99, 27 Feb 2018, Subset Games).
  The "about-sysreq" embeds are M1.
- Slice & Dice records — PASS: no gallery, and both the access check and market record state on their face
  that the storefront captures were not banked; README repeats it. Nothing is presented that doesn't exist.

**Vivid**
- Galatea beats 1–3 captions — PASS on content (opening exchanges; mid-conversation; beat 3 shows the
  goodbye and a literal "*** The End ***"). Legibility of the renders is M3.
- Beyond the Trees shell — PASS (loaded title frame with the phone UI, captioned as proving load only).
- Friday Night Funkin' shells 01–03 (the just-rewritten captions) — PASS, all three: 01 is a blank white
  page and says so; 02 shows the itch frame with white embed area and Download button, as captioned; 03
  shows the Newgrounds frame — header, medals, credits/author comments — with a white game area, as
  captioned. These captions describe failure precisely instead of dressing it up.
- Storefront renders vs market-record captions — PASS: Event[0] **19,99€** visible (record: Mostly Positive
  1,464, recent 17, 14 Sep 2016, Ocelot Society — all in-frame); TOEM **18,99€** (English 3,442, recent 472,
  17 Sep 2021 — in-frame); Rhythm Doctor **$10.49 USD** (English 8,169, recent 166, 6 Dec 2025 — in-frame),
  and the $20 itch cross-note is present in the record as the prior review required.
- Townscaper records in Moments and Vivid are byte-identical (md5 match), as the Vivid README's "shared
  record" claim requires; both state plainly that no capture exists and the save-state URL is the evidence.

**README accuracy (all three packages)**
- "Package layout" sections match the rebuilt trees exactly (`records/`, `evidence/` + `evidence/img/`,
  `market-research/` + `img/`, `notes/`). No reference to the old `captures/` structure survives anywhere
  outside `notes/` (grep-verified across all three packages).
- Coverage tables match the trees and record contents, with one exception: Bell B6's "5 banked screenshots"
  (F1). Moments and Vivid tables — PASS, including Vivid's pointers to the Oct-15 package and the
  vivid-iteration Townscaper record, both of which exist at the cited paths.

**Reader test (one record, cold)**
- Opening the Hanabi or Seedship record cold: the prose is self-contained, the gallery sits at the end of the
  same file, images render at ~850 px wide, and the decisive numbers (18 points / Turn 57; 10,357 / 677) are
  legible without zooming. This is the standard the package now meets in most places.
- Friction a partner will hit: Galatea's clipped line-endings (M3); Desktop Dungeons renders where the game
  occupies only the top ~40 % of the page (legible, but small); the two near-duplicate storefront embeds in
  each Bell market record (M1); and the three FAIL items above, each of which a partner can falsify from the
  record itself — the worst kind of defect in an evidence package.

## Minor observations (not graded)
- The FNF shell 02 embed incidentally shows a YouTube bot-check block containing an IP-address string —
  session infrastructure data baked into a filed evidence image; consider cropping if these are ever shared
  outside the team.
- Desktop Dungeons beats 1 and 2 are near-identical frames under different captions ("Run start" / "Fight
  frame"); not false, but the gallery would be stronger with the fight panel visible in beat 2.
- GeoGuessr end-screen headings are right-clipped inside the captures themselves ("STRUGGL…") — inherent to
  the source capture, not a caption issue.

## Bottom line for the boss
The rebuild did the structural work: evidence is inside the records, links resolve, shells are labeled, and
the figures in the market records trace to their storefront renders. But the audit missed three places where
the words still run ahead of the pictures — a blank "screenshot" of A Dark Room (F1), a "full scrollback"
that is one room (F2), and a bathroom captioned as an office (F3). F1–F3 and M1–M5 are each small, mechanical
fixes; until they land, the packages should not be cited as fully verified.
