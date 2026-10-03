# Review response — the-thirteenth-bell reorg (2026-10-03)

Two independent reviews ran against the staged tree before push:
- `notes/review-adversarial-2026-10-03.md` (claims attack)
- `notes/review-mistakehunt-2026-10-03.md` (executability / mistake hunt)

Every finding below is dispositioned. Full suite re-run green after fixes.

## Adversarial findings

| # | Finding | Verdict | Disposition |
|---|---------|---------|-------------|
| 1 | `notes/reorg-self-questioning.md` missing from staged tree | GATE-BLOCKING | FIXED — copied into `notes/`; both review files also live in `notes/` as the written record |
| 2 | `build.mjs` silently no-ops on missed replacements | SHOULD-FIX | FIXED before review landed (mistake-hunt found it independently too): `replaceOrThrow` throws with a clear message naming the anchor; map replace asserts exactly 1 occurrence. Negative-tested against a reformatted `index.html` — exits 1 with the anchor named |
| 3 | README "engine declares no story content" false — engine.js holds theoryCopy, consequenceLead, UI copy | SHOULD-FIX | FIXED — README now says: story/world data in `js/data.js` via `window.TTB_DATA`; engine.js holds systems + the narrative UI copy those systems render. `check_static.py` check renamed to "engine declares no extracted story-data vars" to match what it actually asserts |
| 4 | Confirm repo private before pushing all-rights-reserved content | SHOULD-FIX | VERIFIED — unauthenticated GitHub API returns 404 for `PaperStrange/IndiaGames` while credentialed `git ls-remote` succeeds → repo is private. LICENSE + README both state the ARR carve-out |
| 5 | dist/ "whole game in one file" overstated — Google Fonts fetched at runtime | SHOULD-FIX | FIXED — README qualifies: "web fonts excepted … degrade to system fallbacks offline". Verified non-fatal: smoke suite passes with the font CDN unreachable |
| 6 | Smoke test oversells coverage (boot + 1 of ~36 paths) | SHOULD-FIX | FIXED — docstring now states smoke-level scope and lists what's NOT covered |
| 7 | LICENSE grants MIT to `js/` then carves out `data.js` | SHOULD-FIX | FIXED — grant names `js/engine.js` positively (LICENSE + README) |
| 8 | `data.js` "no logic" ignores the `risky` regex rule | NIT | FIXED wording — check is now "data.js has no functions/DOM access" |
| 9 | Dead `chose()` carried over; `tests/.tmp/` litter | NIT | `tests/.tmp/` deleted (was already gitignored). `chose()` kept deliberately: faithful to the original, flagged in the adversarial record |
| 10 | README "Drive previews" dubious for split tree | NIT | FIXED — README now recommends `dist/` for sharing/Drive |

Caveat noted, not adopted: a permanent `tests/reference_check.py` replaying the
literal/identifier comparison against the original single file. The transform is
one-time and frozen; equivalence is evidenced by two independent mechanical
comparisons (836 literals multiset-equal, zero lost identifiers, byte-identical
CSS/HTML modulo intended map-src change) recorded in the adversarial review,
plus identical smoke results on split vs dist.

## Mistake-hunt findings

| # | Finding | Verdict | Disposition |
|---|---------|---------|-------------|
| 1 | 15 static checks green; 3 consecutive builds byte-identical; `$$` count 9/9 source-vs-dist; data/engine split verified by execution (8/8 keys, 3×6 worlds, 4×4 schedule rows, 18/18 scene titles) | — | No action; independently confirms the reorg |
| 2 | `build.mjs` whitespace-sensitive replaces are silent no-ops | SHOULD-FIX | FIXED — same as adversarial #2 |
| 3 | `smoke_cdp.py` hardcodes `/opt/meta-chromium/chrome` | SHOULD-FIX | FIXED — `CHROME_BIN` env override, documented default |
| 4 | Fresh-clone simulation passed; scratch `git init` adds exactly the tree; no secrets/company names/absolute paths | — | No action |

## Pre-push state (2026-10-03)

- Static suite: all green. Smoke suite: green on split + dist (only environmental font-CDN warnings).
- `git status` of the staged tree will be clean apart from the intended files.
- Branch `the-thirteenth-bell` created from `main`; commit + push next.
