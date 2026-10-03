# Mistake-hunt / executability review — The Thirteenth Bell
**Date:** 2026-10-03 · **Reviewer:** subagent (mistake-hunt) · **Tree:** `~/workspace/india-games/stage/the-thirteenth-bell/` (pre-commit, pre-push)
**Method:** executed, not just read. Every verdict below has a reproduction command.

## Verdict
**No gate-blocking findings.** The tree builds deterministically, the data/engine split is sound, the game runs with zero console errors in headless Chromium (split tree AND dist), and a fresh-clone simulation passes the README's exact commands. Two **should-fix** robustness issues (both are "next person breaks it silently/loudly" class), two nits. Safe to push as-is; fixes recommended before the next contributor touches it.

---

## Should-fix

### 1. `build.mjs` — whitespace-sensitive replaces are silent no-ops
**Repro:**
```sh
cd ~/workspace/india-games/stage/the-thirteenth-bell
# reindent line 111 of index.html (e.g. 2 spaces instead of 4), then:
node build.mjs   # exits 0, no error
grep -c 'src="js/' dist/thirteenth-bell-playable-demo.html  # now 1 — external refs survive in the "single-file" build
```
All three `String.replace` calls match exact strings from `index.html` (the `<script>` block match embeds `\n    ` indentation). If anyone reformats `index.html`, the inlining silently doesn't happen and `dist/` ships with dangling relative refs — the build stays green while the artifact is broken.
**Fix:** after each replace, assert the string changed (throw otherwise). Currently verified: `grep -c 'src="js/\|href="css/' dist/...` → `0`, so today's dist is correct.

### 2. `build.mjs` — map replace only hits the first occurrence
**Repro / evidence:**
```sh
grep -o 'assets/images/town-map.webp' index.html css/main.css js/data.js js/engine.js | wc -l   # → 1 today
```
`html.replace('assets/images/town-map.webp', ...)` uses a string pattern → replaces only the FIRST occurrence. True today (exactly 1 reference, verified replaced in dist: 0 leftover, 1 base64 payload). If a second `<img>` or preload is ever added, it silently 404s in dist.
**Fix:** assert the count is exactly 1, or use `replaceAll` with the replacer-function pattern already in use.

### 3. `tests/smoke_cdp.py` — hardcoded Chromium path, no graceful failure
**Repro:**
```sh
sed -n '26p' tests/smoke_cdp.py   # CHROME = "/opt/meta-chromium/chrome" — no env override, no existence check
```
On any machine without that exact path (i.e. every fresh contributor), the test dies with a bare `FileNotFoundError` from `subprocess.Popen`, not a helpful message. README tells the next person to run this command.
**Fix:** honor a `CHROME` env var and fail early with "Chromium not found — set CHROME=/path/to/chrome".

---

## Nits
- **Dist is "single-file" except fonts.** `css/main.css` line 2 `@import`s Google Fonts, so `dist/thirteenth-bell-playable-demo.html` still needs network for Marcellus/Public Sans. Degrades gracefully (smoke test: game boots, only an environmental `ERR_EMPTY_RESPONSE` WARN), but offline Drive/itch previews will show fallback fonts. Consider self-hosting the woff2 or documenting the fallback.
- **README "Tests" line mentions "JSON"** (`python3 tests/check_static.py # syntax, JSON, asset references, dist freshness`) but the tree contains no JSON — stale word, harmless.

## False alarm I chased (recorded so nobody re-opens it)
My first data-shape script reported `risky` as `{}` and `bonds`/`keepsakes` as "not arrays" — that was **my** script's fault: `JSON.stringify(/regex/)` → `'{}'`, and bonds/keepsakes are location-keyed **objects** (6 keys each), not arrays. Direct inspection confirms `js/data.js` line 52 holds the real RegExp literal `risky: /^(Release|Unmask|Touch|Break|Cross|Offer|Descend)/`, matching the original demo's `risky=/^(Release|Unmask|Touch|Break|Cross|Offer|Descend)/;` and the engine's `TTB_DATA.risky.test(c[0])`. The headless smoke test (zero console errors, choices render) independently proves this path executes.

## Verified green (evidence, not reading)
- `python3 tests/check_static.py` → **15/15 PASS**, exit 0.
- `node build.mjs` → exit 0; **three consecutive builds byte-identical** (sha256 `20620f039d9624626c6a993c880e15dbd7b054b3e2410c268b0610cbda7d5339`).
- `dist/` embeds **verbatim** `js/data.js`, `js/engine.js`, `css/main.css`; `$$` helper count 9 in sources = 9 in dist (the `$$`→`$` bug class is clean); no single-`$` `.forEach` candidates anywhere.
- Independent window-shim Node script (kept at `/tmp/ttb_data_check.js`, not in tree): all 8 `TTB_DATA.*` keys referenced in `engine.js` exist in `data.js`; `worlds` = 3 entries × exactly the 6 locations, every scene has title + ≥2 `[label,hint,reward,note]` 4-tuples; `loopMeta` = 3 with name/objective/text/scene; `npcScheduleRows` = 4 NPCs × [name + 4 phase cells]; `schedules` = 3; `icons` = 6 inline SVGs keyed by location; `bonds`/`keepsakes` = 6 location keys; `risky` is a RegExp.
- Extraction fidelity vs original single-file demo: **18/18 scene titles identical**, 3 schedule titles present in `schedules`.
- Fresh-clone simulation (`cp -r` → `/tmp/fresh-clone-test/`): `check_static.py` green, `node build.mjs` green, `python3 -m http.server` serves `index.html`, `css/main.css`, `js/data.js`, `js/engine.js`, `assets/images/town-map.webp` all HTTP 200. No absolute-path reliance.
- `python3 tests/smoke_cdp.py` → **green on both split tree and dist**: boot, start click, 6 place buttons, 4 clock phases, choice rendering, Original/Contrast toggle, zero console/page errors (only environmental font-CDN WARNs).
- Scratch `git init` + `git status --porcelain`: would add exactly the tree; `tests/.tmp/` (chrome-profile, screenshots) is ignored via `.gitignore` line 10 (verified with `git check-ignore -v`); no `__pycache__`/`.pyc` litter from test runs.
- Leak scan (tracked files, base64 stripped from dist): no company names, no API keys, no absolute local paths. (Absolute `/home/hatch` strings exist only inside git-ignored `tests/.tmp/chrome-profile` logs.)
- `LICENSE` is MIT, matching README's code-license claim; content/art marked all-rights-reserved in README as stated.
