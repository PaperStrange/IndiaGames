# Adversarial review — competitor play packages, staged 2026-10-22

**Reviewer role:** adversarial (boss / business-partner lens). **Scope:** the three staged packages under `~/workspace/package-staging-2026-10-22/` (`bell/`, `moments/`, `vivid/`), checked line-by-line against the source records in `~/workspace/gamejam-studies/` and against the other packages on the vivid branch (`player-first-replays-2026-10-15/`, `vivid-iteration-2026-10-21/research/`, read via `git show origin/vivid-2.5d-photo-game:<path>`). Nothing in the packages was edited.

## Method note — what was verified clean before any finding below

- **No silent edits.** All 28 packaged text records and every packaged capture file are byte-identical (md5/diff) to their `gamejam-studies/` sources. Whatever the records say — good or bad — is what ships.
- **Numbers trace.** Every figure I sampled in the three READMEs traces to its record: Seedship 2,873 / 10,357 / 677 survivors; Anchorhead "2 in-game days, score 9"; Rogue Fable IV "two sessions, four runs, best XP 74%" (record: S1 two runs; S2 runs at XP 44% and 74%); Hanabi "57 turns, 18/18"; GeoGuessr "6 runs, 0 days survived, 0 pins placed"; Townscaper "~15 min, six structures"; Twin Flames "Level 1 COMPLETED … (12 steps vs par 8)"; novena "played twice"; Beyond the Trees "7 timed rounds, 15+ photos"; FNF "Tutorial ×2 + Bopeebo ×2, no song passed". Spot render checks: the Anchorhead beat-2 PDF's text layer contains the "Verlac" passage, the Galatea beat-3 PDF contains "*** The End ***", the Seedship S2 beat-5 PDF contains "Planet Arcadia" and "10357" — the "legible transcript PDF" claims for those titles are real.
- The bell market-research records are the standard the rest should be held to: prices as displayed in R$ (BRL) with USD explicitly marked [OPEN], no conversions invented, Slice & Dice's trailer substitution (Steam cut archived instead of the YouTube 3.0 cut) disclosed in the record itself.

Findings below are what remains after that pass. Severities: **BLOCKER** = do not commit as-is; **SHOULD-FIX** = commit only with the fix; **NOTE** = fix or consciously accept.

---

## Package 1 — Bell (`bell/docs/gamejam/competitor-plays-2026-10-22/`)

### B-1 · SHOULD-FIX — README claims storefront captures for Slice & Dice that do not exist in the package

- **Claim** (`README.md` line 15): "Market research for the three paid originals is in `market-research/` (record + Steam storefront captures + archived trailer each): Outer Wilds, Into the Breach, Slice & Dice".
- **Contradicting evidence:** the package's `market-research/` contains for Slice & Dice only the record and `slice-and-dice-steam-trailer.mp4` — no storefront capture file. Worse, the Slice & Dice record itself says the opposite of the README, under "Storefront snapshots (honest note)": the three captures "exist only as in-session references and are **NOT banked as files**." Outer Wilds and Into the Breach do have `storefront-top.pdf` + `storefront-about-sysreq.pdf` each; the blanket "each" makes the sentence false for one of its three subjects. A boss who opens the folder after reading the README finds the package contradicting its own record.
- **Required fix:** amend line 15 so the parenthetical applies only where true, e.g. "(record + archived trailer each; Steam storefront captures banked for Outer Wilds and Into the Breach — Slice & Dice's storefront captures were not banked, as its record states)".

### B-2 · NOTE — "kept in git history" misdescribes the superseded package's status

- **Claim** (`README.md` line 3): the 2026-10-20 package was "pushed before the confirmation gate — kept in git history; this package is the complete rebuilt set and the one to cite".
- **Evidence:** `git ls-tree origin/the-thirteenth-bell docs/gamejam/` shows `docs/gamejam/competitor-plays-2026-10-20` present **at the branch tip**, i.e. a live sibling directory, not something that survives only in history. As staged, this commit adds the new package alongside the old one; nothing in the staged tree removes the old directory. Two coverage indexes will sit side by side, and "kept in git history" will be wrong on its face.
- **Required fix:** either delete `docs/gamejam/competitor-plays-2026-10-20/` in the same commit (then the sentence becomes true), or reword to "an earlier, thinner package, retained alongside this one at `docs/gamejam/competitor-plays-2026-10-20/`; this package supersedes it and is the one to cite."

### B-3 · NOTE — B2 gap statement uses "identical" where the record is more careful

- **Claim** (`README.md`, "What each substitute leaves unanswered"): "**Anchorhead for Outer Wilds:** the knowledge-gating is identical; …".
- **Evidence:** the record's own framing is "Anchorhead preserves B2's core structure" and "The knowledge-gating is the same; the vehicle and the clock are not." "Identical" is a stronger word than the record defends — a text IF's archive-lookup gating and Outer Wilds' ship-log/rumor gating are analogous, not identical. Low risk, but this is exactly the word a skeptical reader circles.
- **Required fix:** "the knowledge-gating is the same in structure" (matching the record).

### Categories checked and clean for Bell

- Coverage labels: B1 "case solved 2026-10-06" matches the playtest report ("Coverage: COMPLETE — one full case loop from title to SOLVED state to restart"); B5 "Played twice" matches two full plays in the record; B6 "**Played** (partial replay)" matches the record's PARTIAL header. No inflation found.
- Evidence classes: "7 verified PDFs" (Desktop Dungeons), "4 legible transcript PDFs" (Anchorhead), "5 verified PDFs (S2)" (Seedship, with no claim made for S1's unbanked captures), "Report + page shell" (Rogue Fable IV, one shell file banked, the rest logged in the record) — all accurate.
- Substitute gaps for Desktop Dungeons ("solo hero, no squad, no telegraphed multi-unit enemy intent") and Rogue Fable IV ("dice-as-build loadout drafting and party composition are not exercised") state the unanswered parts at full strength.

**Bell verdict: PASS-AFTER-FIXES (B-1 required; B-2 and B-3 are wording fixes that should ride along).**

---

## Package 2 — Moments (`moments/docs/gamejam/competitor-plays-2026-10-22/`)

### M-1 · SHOULD-FIX — the Fireboy record's own coverage header contradicts both its addendum and the README

- **Claim in the record** (`records/fireboy-and-watergirl--player-attempt-2026-10-20-fragment.md`, line 4): "**Coverage:** FRAGMENT — title screen and main menu reached; **zero gameplay**."
- **Contradicting evidence:** the same record's session-2 addendum (line 21) documents title screen → main menu → level-select map → "**into Level 1 itself**", with the stop point at the Level 1 spawn (line 23). The README row (line 9) correctly says "**Fragment** — reached Level 1". So the package's index is right and the record's header is stale — but a reader opens the record, reads "zero gameplay" in its fourth line, and concludes the package contradicts itself. The header was never updated when the addendum was appended.
- **Required fix:** update the record's Coverage header to cover both sessions (e.g. "FRAGMENT — S1: title screen and main menu, zero gameplay; S2: into Level 1, stop at the Level 1 spawn; zero controllable play") or add an explicit "superseded by the session-2 addendum below" line at the header. The README needs no change.

### M-2 · NOTE — "kept in git history" (same defect as B-2)

- **Claim** (`README.md` line 3), identical wording to Bell's. `git ls-tree origin/memorable-moments-game docs/gamejam/` likewise shows `docs/gamejam/competitor-plays-2026-10-20` live at the branch tip.
- **Required fix:** same as B-2 — delete in the same commit, or reword.

### M-3 · NOTE — M4 row drops the record's own "PARTIAL PLAY" label

- **Claim** (`README.md` line 12): the GeoGuessr row's Status reads "Main modes account-walled — not played; free seasonal mode **HorrorGuessr played** (6 runs, 0 days survived, 0 pins placed)".
- **Evidence:** the record's coverage line is "**PARTIAL PLAY** with an access finding. The main GeoGuessr game is account-walled … and was not played," and it stresses the matrix's core M4 question (shared simultaneous guessing) "remains UNTESTED". The README row is factually accurate — nothing in it is false — but every other row carries its coverage word in the Status cell and this one doesn't; a skim reader sees the slot as covered without the partial label the record insists on.
- **Required fix:** prefix the status with "PARTIAL —" (matching the record).

### Categories checked and clean for Moments

- Coverage labels: M1's UNTESTED social loop is stated in the row itself; M3's "18/18 (the reachable maximum)" matches the record's accounting (25-point game capped to 18 by documented discards, 2 strikes, bot partners named in the row); M6's "COMPLETE, played twice in full (two cycles verified identical)" matches the novena record verbatim; Twin Flames' unwitnessed Level 2 banner is disclosed in the row, not buried.
- Evidence classes: Fireboy's five files are all named `…-page-shell--…` and classed "5 page shells (canvas)"; Twin Flames is classed "Page shell (Unity canvas)" with a single `twin-flames-00-page-shell.pdf`; the missed-messages listing capture is classed "Listing-page capture" for an access result, not dressed as play evidence.
- Substitute gaps (Twin Flames' two-humans layer, novena vs Florence's domestic arc, Hanabi-with-bots vs human shorthand) are stated at full strength in the README, not minimized.

**Moments verdict: PASS-AFTER-FIXES (M-1 required; M-2/M-3 wording fixes to ride along).**

---

## Package 3 — Vivid (`vivid/docs/gamejam/competitor-plays-2026-10-22/`)

This package sits next to two other packages on the same branch, and its V1/V2 rows lean on the Oct-15 package. That is where all of its problems are. The new Oct-20 records (V3–V6) are as disciplined as Bell's and Moments'.

### V-1 · SHOULD-FIX (borderline BLOCKER) — V2 Six Cats Under is labeled "**Played**"; its filed records are a FAILED attempt and a kitchen-only PARTIAL

- **Claim** (`README.md` line 13): "| V2 | Six Cats Under | **Played** (Oct 12–13) | Filed in `player-first-replays-2026-10-15/` | Verified screenshots (there) |".
- **Contradicting evidence:** the records actually filed at that path are `records/six-cats-under--player-replay-2026-10-13-failed.md` — "Status: FAILED. Saw the title screen and the opening bedroom scene; never interacted — zero clicks registered on the Unity canvas, zero cats found, story and ending unreached" — and `records/six-cats-under--player-replay-2026-10-13-retry-partial.md` — "Coverage: opening conversation + long stretch exploring the kitchen. Did NOT reach the ending." The Oct-15 package's own README describes this slot as "Six Cats Under (**parked at the kitchen partial** per Sakura)". And the other session's iteration package records the same title again as an *assisted partial* with "no rescue ending" (`vivid-iteration-2026-10-21/research/coverage.json`). In other words: on this branch, Six Cats Under has never been played past the kitchen, and the package's own cited sources say so three times. A clean "**Played**" erases exactly the qualification the boss's label discipline exists to preserve.
- **Required fix:** relabel the row, e.g. "**Played — partial** (Oct 12–13; opening + kitchen reached, ending not reached; first attempt failed on tooling — see the records filed there)". If the intent was "the slot was attempted in that operation," the word must still carry "partial".

### V-2 · SHOULD-FIX — V1 Sort the Court! is labeled "**Played**" with the record's PARTIAL / no-finale status dropped, and dates that don't trace

- **Claim** (`README.md` line 12): "| V1 | Sort the Court! | **Played** (Oct 12–13; ~6 in-game days) | …".
- **Contradicting evidence:** the filed record is `records/sort-the-court--player-replay-2026-10-13-partial.md`, titled "Player replay — Sort the Court! (**PARTIAL — visuals died day 6, no finale**)": "NO finale reached — screenshots stopped capturing around day 6… the captures didn't survive. … quotes and numbers below are my best recollection of live screenshots viewed during play, **not re-verifiable**." The "~6 in-game days" figure is supported; the unqualified "Played" is not — and the row's evidence cell ("Verified screenshots (there)") compounds it: the Oct-15 package's snapshots for this slot are the Oct-15 *re-shoots* (fresh sessions), while the Oct-13 record the row summarizes states its own captures didn't survive. The row merges two different sessions' evidence into one clean claim. Separately, the dates "Oct 12–13" do not trace: the filed replay is dated 2026-10-13 only, and the earlier playtest report in the study sources is dated 2026-10-05.
- **Required fix:** relabel, e.g. "**Played — partial** (2026-10-13; ~6 in-game days, no finale; the record's own captures did not survive — screenshots filed there are the Oct-15 re-shoots)". Drop or source the "Oct 12–" half of the date range.

### V-3 · SHOULD-FIX — two Friday Night Funkin' capture filenames violate the package's own page-shell naming rule

- **The package's own rule** (`README.md` line 28): page shells are "**Filed under names that say "page-shell"**; they prove the session was on the genuine game page and nothing more."
- **Contradicting evidence:** `captures/friday-night-funkin-01-itch-title-page.pdf` and `captures/friday-night-funkin-02-itch-title-page-2.pdf` say "page-shell" nowhere, and "-02 … title-page-2" implies a second, distinct title-page state. The FNF record itself is blunt that **all seven** captures from the session are page shells and the itch renders are near-blank. Every other shell in all three packages complies (`beyond-the-trees-00-page-shell.pdf`, `twin-flames-00-page-shell.pdf`, `rogue-fable-iv-00-page-shell.pdf`, all five Fireboy files). These two are the outliers, and a boss sampling files — not reading records — will take "itch-title-page" at face value.
- **Required fix:** rename to carry the marker, e.g. `friday-night-funkin-01-page-shell--itch-title-page.pdf`, `friday-night-funkin-02-page-shell--itch-title-page-again.pdf`. (The third file, `…-03-newgrounds-page-shell--bopeebo-game-over.pdf`, does carry the marker; its "--bopeebo-game-over" suffix names the capture moment, not visible content — acceptable under the packages' Fireboy naming precedent, but the suffix should not be read as content, and renaming it to match the other two's pattern after the fix keeps one convention.)

### V-4 · SHOULD-FIX — V5 Townscaper row merges two sessions, but the linked record covers only one and disowns the other

- **Claim** (`README.md` line 16): "V5 | Townscaper | **Played** — official free web build (Oct-13 session + Oct-20 session) | `records/townscaper--player-record-2026-10-20.md` | …".
- **Contradicting evidence:** the linked record's header identifies it as the "**Memorable Moments competitor M5**" record, and its Coverage line states: "This is Moments' own session for M5 (**the Vivid branch's 2026-10-13 Townscaper session stands separately**; cross-comparison no longer needs to borrow custody)." The Oct-20 record documents exactly one session (~15 min, six structures, the save-state URL). The other session's record lives in the *other* package (`vivid-iteration-2026-10-21/research/group-b/townscaper.md` — demo 0.23, declared making task completed). A reader following this package's V5 link finds no Oct-13 session documented, and finds the record explicitly pointing away from this branch's custody of it.
- **Required fix:** scope the row to what its record proves ("**Played** — official free web build, Oct-20 session (record shared with the Moments package, where it is M5)") and add a pointer for the other session to `vivid-iteration-2026-10-21/research/group-b/townscaper.md`. Sharing the record file across packages is fine — claiming both sessions under it is not.

### V-5 · SHOULD-FIX — the intro claims the substitutes "answer their matrix questions"; the package's own V6 row refutes that for Rhythm Doctor

- **Claim** (`README.md` line 7): "Native Event[0], TOEM, and Rhythm Doctor remain unplayed, here as everywhere on this branch; **the substitutes below answer their matrix questions in browser-playable form**, and each original also carries a market record."
- **Contradicting evidence:** the V6 row (line 17) records an FNF attempt in which **no song was passed**, and the README's own gap section concludes "Rhythm Doctor's one-button seventh-beat design specifically **remains unjudged**." An attempt that the tooling defeated does not "answer" the slot's matrix question; the intro says the opposite of the package's own analysis, eleven lines apart. (For V3 the claim is defensible — Galatea was played to an ending; for V4 it is defensible in verb if not in full — which is why this is a wording fix, not a content problem.)
- **Required fix:** qualify the intro, e.g. "the substitutes below address their matrix questions in browser-playable form where the tooling allows; V6 documents the barrier instead of an answer."

### V-6 · NOTE — Rhythm Doctor carries two unreconciled prices inside one package

- **Evidence:** `records/rhythm-doctor--access-check-2026-10-20.md` prices the main game at "**$20.00 USD minimum**" (the developer's itch page); `market-research/rhythm-doctor--market-record-2026-10-20.md` prices it at "**$10.49 USD**, no discount shown" (Steam, as displayed 2026-10-21). Both are honestly source-labeled, so neither is wrong — but nothing tells the reader they are different stores on different days, and a boss comparing the two files will ask which number is real.
- **Required fix:** one cross-note line in the market record ("itch lists the same release at $20 minimum — different storefront, see the access check").

### Attribution audit — what the vivid README gets right about the other packages (explicitly clean)

- The description of `vivid-iteration-2026-10-21/research/` (line 6) is accurate against its `coverage.json`: the six titles named are exactly its roster (Sort the Court!, Six Cats Under, Adventures With Anxiety, We Become What We Behold, Townscaper, A Dance of Fire and Ice); "its own coverage ledger and synthesis" correctly names `coverage.json` and `SYNTHESIS.md`; "a separate session's" is the right attribution. The package does **not** import that session's completions into its own index — its V1/V2 rows point back to the Oct-15 package, and its only overlap file is the Townscaper record (see V-4, a scoping error, not credit theft).
- The description of `player-first-replays-2026-10-15/` as "the Oct 12–15 operation holding the V1/V2 records and the Player-First Play Report" is accurate.
- "Native Event[0], TOEM, and Rhythm Doctor remain unplayed, here as everywhere on this branch" is consistent with the iteration package's own "Work still owed" ("Native Event[0], TOEM, full Townscaper and Rhythm Doctor remain unplayed"). No double-claiming of the other session's endpoints (e.g. its declared-unit completions for Sort the Court! / Townscaper) appears anywhere in this package.
- V3 and V4 rows are models of the standard: Galatea "COMPLETE, played blind to a genuine ending" is backed by the record and by the ending PDF itself; Beyond the Trees carries its unobserved-score caveat **in the index row**, not just in the record.

**Vivid verdict: PASS-AFTER-FIXES (V-1, V-2, V-3, V-4, V-5 required — all are README-row/label fixes and two file renames; no underlying record needs to change. V-1 is the one I would hold the commit for if only one fix could land.)**

---

## Summary

| Package | Verdict | Required fixes |
|---|---|---|
| Bell | PASS-AFTER-FIXES | B-1 (README market-research claim vs Slice & Dice contents); B-2, B-3 wording |
| Moments | PASS-AFTER-FIXES | M-1 (Fireboy record header stale vs its own addendum); M-2, M-3 wording |
| Vivid | PASS-AFTER-FIXES | V-1 (Six Cats "Played" inflation), V-2 (Sort the Court partial dropped), V-3 (FNF shell filenames), V-4 (Townscaper session merge), V-5 (intro overclaim vs V6); V-6 note |

No package is a FAIL: the underlying records are unusually honest — the failures are concentrated in the index layer (README rows and two filenames) claiming one notch more than the records beneath them. That is precisely the layer a boss reads first, so the fixes above are the price of committing.
