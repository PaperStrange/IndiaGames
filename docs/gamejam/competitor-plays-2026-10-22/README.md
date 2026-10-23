# Competitor play records — Memorable Moments (M1–M6), rebuilt set
**Filed:** 2026-10-22 · **Operation:** first-hand live-browser play sessions, 2026-10-13 → 2026-10-20
**Supersedes:** `docs/gamejam/competitor-plays-2026-10-20/` (an earlier, thinner package pushed before the confirmation gate — kept in git history; this package is the complete rebuilt set and the one to cite).

## Coverage index
| Slot | Original | Status | Played record | Evidence class |
|---|---|---|---|---|
| M1 | Make it Meme | **Played** — solo walk; the public flow is functionally gated until a 2nd player joins, so the real social loop is UNTESTED | `records/make-it-meme--player-walk-2026-10-13.md` | 3 banked screenshots |
| M2 | Fireboy & Watergirl | **Fragment** — reached Level 1; no keyboard input reaches its Flash-emulated canvas from our tooling | `records/fireboy-and-watergirl--player-attempt-2026-10-20-fragment.md` | 5 page shells (canvas) |
| M2 substitute | — | **Twin Flames** — Level 1 COMPLETED solo (mouse-only), Level 2 crossed (its cleared banner not witnessed; stated in the record) | `records/twin-flames--player-record-2026-10-20.md` | Page shell (Unity canvas) |
| M3 | Hanabi | **Played** — full game on hanabi.live with two bot partners, 57 turns, 18/18 (the reachable maximum); human shorthand untested | `records/hanabi--player-record-2026-10-20.md` | 2 verified PDFs (mid-game capture filter-blocked; logged) |
| M4 | GeoGuessr | PARTIAL — main modes account-walled, not played; free seasonal mode **HorrorGuessr played** (6 runs, 0 days survived, 0 pins placed; the matrix's shared-guessing question remains untested) | `records/geoguessr--player-record-2026-10-20.md` | 7 verified PDFs |
| M5 | Townscaper | **Played** — official free web build, ~15 min, six structures built | `records/townscaper--player-record-2026-10-20.md` | Save-state URL (in record); PDF captures blank by rendering class |
| M6 | Florence | Not played — paid native install → market record | Substitute: **novena** — COMPLETE, played twice in full (two cycles verified identical) — `records/novena--player-record-2026-10-20.md` | 4 verified PDFs |
| M6 candidate | missed messages. | Access result only — no browser build exists (download-only); never played | `records/missed-messages--access-check-2026-10-20.md` | Listing-page capture |

Market research for Florence is in `market-research/` (record + Steam storefront capture + archived trailer).

## What the substitutes leave unanswered
- **Twin Flames for Fireboy:** the mechanical interdependence is fully exercised, but one operator ran both characters — the two-humans layer (negotiation, blame, timing in real time) remains untested, as it is for every solo route.
- **novena for Florence:** the small-moments accumulation mechanic transfers; Florence's wordless, tactile handling of a two-person domestic arc does not.
- **Hanabi with bots:** the information structure and clue economy are validated first-hand; a human group's private shorthand is not.

## Evidence classes (used across all three branch packages)
- **Verified captures** — PDF/PNG files render-checked by the coordinator; they show the game state they are named for.
- **Page shells** — PDF captures of canvas-rendered games (WebGL / Flash-emulator / large canvas) whose game area prints blank or black. Filed under names that say "page-shell"; they prove the session was on the genuine game page and nothing more. The play account for those titles rests on the session report and is labeled as such in the record.
- **Save-state URL** — Townscaper's town lives in its page URL; the record carries the URL as the evidence.
- Every record states its coverage (full play / deep partial / partial / fragment / access result) and its exact stop point. Tooling failures are recorded inside each record, separate from judgments of the game.
- All play was performed by the agent in live browser sessions. Zero human participants.

## Package layout
- `records/` — the play records, each with its evidence gallery embedded at the end.
- `evidence/` — the filed capture originals (PDFs and PNG screenshots); `evidence/img/` holds the rendered page views the galleries embed.
- `market-research/` — market records for the titles that could not be played, with their storefront captures, rendered views (`img/`), and trailers.
- `notes/` — the review records behind this package.
