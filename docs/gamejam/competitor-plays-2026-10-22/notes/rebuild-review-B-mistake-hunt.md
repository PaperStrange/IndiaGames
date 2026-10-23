# Rebuild Review B — Mistake-Hunt / Executability

**Date:** 2026-10-22 · **Reviewer role:** mistake-hunt / executability (mechanical verification only; no impressions)
**Scope:** the uncommitted rebuild in three checkouts — evidence galleries embedded into records, `captures/` renamed to `evidence/`:

- bell — `~/workspace/checkouts/bell`, branch `the-thirteenth-bell`, package `docs/gamejam/competitor-plays-2026-10-22/`
- moments — `~/workspace/checkouts/moments`, branch `memorable-moments-game`, package `docs/gamejam/competitor-plays-2026-10-22/`
- vivid — `~/workspace/india-games/IndiaGames`, branch `vivid-2.5d-photo-game`, package `docs/gamejam/competitor-plays-2026-10-22/`

**Overall verdict: PASS with 1 flagged finding (F-1, minor).** 66/66 embeds resolve; 63/63 captures embedded; 0 stale `captures/` references outside `notes/`; 0 changes outside the package in any checkout; townscaper copies byte-identical; no file >100 MB; all 52 gallery PNGs valid. One finding: two pairs of Fireboy gallery renders in Moments are byte-identical images captioned as different beats (the source PDFs are distinct files — see F-1).

---

## Check 1 — Embed integrity — PASS

Method: regex-extracted every `![..](path)` with a local (non-URL) target from every `.md` in the three packages, resolved each against its record's directory, tested `os.path.isfile`.

| Package | .md files | Local image embeds | Broken |
|---|---|---|---|
| bell | 15 | 32 | 0 |
| moments | 13 | 24 | 0 |
| vivid | 12 | 10 | 0 |
| **Total** | **40** | **66** | **0** |

## Check 2 — Gallery completeness — PASS

Method: inventoried every capture original in `evidence/` and `market-research/` (PDF/PNG, excluding `img/` subdirs and `.mp4` trailers), then tested whether each file — or, for a PDF, its rendered `img/<name>.png` counterpart — is the target of at least one gallery embed; then repeated the test per record for every capture basename a record's own text cites.

| Package | Capture originals | Not embedded anywhere | Not cited by any record either |
|---|---|---|---|
| bell | 29 | 0 | 0 |
| moments | 24 | 0 | 0 |
| vivid | 10 | 0 | 0 |
| **Total** | **63** | **0** | **0** |

Per-record cross-check (embeds counted in each record; every record whose text cites capture basenames embeds all of them — result `OK` for all 27 records + market records):

- bell records: a-dark-room 5, anchorhead 4, desktop-dungeons 7, detective-replay 3, detective-playtest 3, rogue-fable-iv 1, seedship 5, slice-and-dice-access 0 → 28; market records: into-the-breach 2, outer-wilds 2, slice-and-dice 0 → 4. Sum 32 = Check 1 total. (The 32-vs-29 gap is by design: the same 3 Detective screenshots are embedded in both Detective records.)
- moments records: fireboy 5, geoguessr 7, hanabi 2, make-it-meme 3, missed-messages 1, novena 4, townscaper 0, twin-flames 1 → 23; market: florence 1. Sum 24 = Check 1 total.
- vivid records: beyond-the-trees 1, friday-night-funkin 3, galatea 3, rhythm-doctor-access 0, townscaper 0 → 7; market: event-0 1, rhythm-doctor 1, toem 1 → 3. Sum 10 = Check 1 total.

Records with 0 embeds are exactly the ones with no captures to embed (the two access checks and the two townscaper copies) — consistent with the package design.

## Check 3 — Stale references — PASS

- `grep -rI 'captures/'` over each full package excluding `notes/`: **0 hits in all three packages** (all file types, not only `.md`).
- `captures/` inside `notes/`: 11 occurrences per package, all inside the historical 2026-10-22 review documents (`review-2026-10-22--adversarial.md`, `review-2026-10-22--mistake-hunt.md`, `plural-review-2026-10-22--fixes-applied.md` context) — historical review text, expected, not a defect.
- `package-staging` / absolute local paths: `grep -rIl 'package-staging'` returns exactly 2 files per package, both in `notes/` (`review-2026-10-22--adversarial.md:3` and `review-2026-10-22--mistake-hunt.md:5-7,33,161` — the original reviews' scope lines referencing `~/workspace/package-staging-2026-10-22/` and `~/workspace/gamejam-studies/`). **Zero hits in any README, record, or market record.**

## Check 4 — Townscaper identity — PASS

`records/townscaper--player-record-2026-10-20.md`:

- moments: md5 `45cf8b8b0c396a47ce919883ebc06f80`
- vivid: md5 `45cf8b8b0c396a47ce919883ebc06f80`

Byte-identical: **yes**.

## Check 5 — Change scope — PASS

`git status --porcelain` per checkout, rename targets resolved, every resulting path tested against the package prefix:

| Checkout | Changed paths | Outside `docs/gamejam/competitor-plays-2026-10-22/` |
|---|---|---|
| bell | 37 | 0 |
| moments | 35 | 0 |
| vivid | 17 | 0 |

Vivid detail (full status inspected): changes are the README modification, 8 `captures/ → evidence/` renames, 3 market-record modifications, 4 record modifications, and 2 untracked dirs (`evidence/img/`, `market-research/img/`). **Zero modifications to `docs/gamejam/vivid-iteration-2026-10-21/` and zero to any game build files** (`dist/`, `vivid-2.5d-photo-game/` untouched).

## Check 6 — Size / render sanity — PASS with finding F-1

- Files >100 MB: **none** in any package. Largest files: bell `market-research/into-the-breach-announcement-trailer.mp4` 51,276,197 B; moments `market-research/florence-trailer.mp4` 24,136,227 B; vivid `market-research/event-0-trailer.mp4` 71,897,493 B. Package totals: bell 131,407,973 B / 68 files; moments 81,257,899 B / 59 files; vivid 174,649,571 B / 35 files.
- Gallery PNGs: 52 total (bell 21 = 17 `evidence/img` + 4 `market-research/img`; moments 21 = 20 + 1; vivid 10 = 7 + 3). Every one is non-empty and carries the PNG magic header (`\x89PNG\r\n\x1a\n`): **0 invalid, 0 empty**.
- Byte-identical duplicate groups among `img/*.png`: **2 groups, both in moments, both Fireboy** — see F-1. No duplicates in bell or vivid. (The brief's known identical-shell cases do not produce duplicate gallery images: rogue-fable contributes a single render, bell `evidence/img/rogue-fable-iv-00-page-shell.png` md5 `f48d0b78003b5a2d64da265cc24b970c`; beyond-the-trees a single render, vivid `evidence/img/beyond-the-trees-00-page-shell.png` md5 `9fe8109f07c0cb79f76b48fc434d70d6`.)

### F-1 (minor, flagged for a decision — not silently passed)

Moments' Fireboy gallery embeds 5 renders for 5 claimed beats, but two pairs are byte-identical images:

- `evidence/img/fireboy-and-watergirl-02-page-shell--main-menu.png` ≡ `…-03-page-shell--level-select.png` — md5 `0db99569bc5559693b2757b9ec2b93db` (both)
- `evidence/img/fireboy-and-watergirl-04-page-shell--level1-opening.png` ≡ `…-05-page-shell--level1-after-input-attempts.png` — md5 `d39f65d4f0ae27e133b5576613800a7f` (both)

Characterization: the five source PDFs are **all distinct files** (md5 `8341ab2a…`, `2a664872…`, `0300e8b0…`, `2602aeca…`, `3bbb30f3…`; sizes 1,128,682 / 1,123,093 / 1,123,861 / 1,059,189 / 1,058,346 B), so nothing was copied or fabricated at the source level — the Ruffle canvas prints black and the surrounding page frame renders identically for beats 02/03 and for 04/05, so the rendered views cannot visually distinguish "main menu" from "level select", nor "Level 1 opening" from "Level 1 after input attempts". The gallery captions, however, present them as five distinct moments. Recommended fix (one line): note in the two captions — or in the gallery header of the Fireboy record — that the 02/03 and 04/05 renders are visually identical page shells because the game area does not print. Not a blocker for filing if that note is added.

## Check 7 — README "Package layout" vs reality — PASS (exact match)

All three READMEs carry the identical 4-bullet section:

- `records/` — play records with embedded galleries → exists in all three (bell 8 files, moments 8, vivid 5).
- `evidence/` — capture originals, with `evidence/img/` rendered views → exists in all three (bell 26 + 17 img; moments 24 + 20 img; vivid 8 + 7 img).
- `market-research/` — market records with storefront captures, `img/` views, trailers → exists in all three (bell 11 + 4 img; moments 4 + 1 img; vivid 10 + 3 img).
- `notes/` — review records → exists in all three (3 files each).

Actual directory set per package (identical in all three): `.`, `evidence/`, `evidence/img/`, `market-research/`, `market-research/img/`, `notes/`, `records/`. Every directory named in the README exists; every directory present is named in the README. No `captures/` directory remains anywhere.

---

## Verdict summary

| # | Check | Verdict |
|---|---|---|
| 1 | Embed integrity | PASS — 66 embeds, 0 broken |
| 2 | Gallery completeness | PASS — 63/63 captures embedded; 0 uncited-and-unembedded |
| 3 | Stale references | PASS — 0 `captures/` outside `notes/`; local-path hits only in historical `notes/` reviews |
| 4 | Townscaper identity | PASS — md5 `45cf8b8b…` in both packages |
| 5 | Change scope | PASS — 37/35/17 changed paths, 0 outside the package; vivid-iteration and builds untouched |
| 6 | Size/render sanity | PASS with F-1 — no file >100 MB; 52/52 PNGs valid; 2 duplicate render pairs (Fireboy, moments) |
| 7 | README layout | PASS — exact match in all three |

**Required before filing:** none mechanically blocking. **Recommended:** the one-line caption note in F-1 so the Fireboy gallery does not present identical shell images as visually distinct beats.
