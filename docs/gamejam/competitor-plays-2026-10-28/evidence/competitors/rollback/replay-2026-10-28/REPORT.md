# ROLLBACK — standalone Playwright replay report (2026-10-28)

**Outcome: BLOCKED — 0 game beats banked, no ending reached.**
No play is claimed. Nothing below is presented as a game beat; the only frames
banked are the organisation block page itself, as evidence of the block.

## Counts (for the parent)

- PNG game beats banked: **0** (title: not played; notebook: not played;
  interrogation: not played; ending: not played).
- Ending reached: **none** — not "THE PROMISE", not any other of the 8 endings.
- Block-evidence files banked: 3 PNG + 4 TXT (the block page, three runs).
- Driver: `driver.cjs` in this directory reproduces the block deterministically.

## Route taken

1. Playwright: `playwright-core` required from
   `/home/hatch/workspace/gamejam-studies/play-2026-10-28/pw/node_modules/playwright-core`
   (already installed; no `npm install` needed).
2. Browser binary: `/opt/meta-chromium/chrome`, launched headless by PID with
   `--headless=new --disable-gpu --window-size=1280,800
   --remote-debugging-port=9271 --user-data-dir=/tmp/pw-replay-rollback`,
   proxy first (no `--no-proxy-server`), then connected via
   `chromium.connectOverCDP('http://127.0.0.1:9271')` and the page picked from
   `contexts()[0].pages()` — the task's startup-URL pattern.
3. One deviation, required to run at all: `--no-sandbox` was added. The first
   launch without it never opened a debugging listener and CDP failed with
   `connect ECONNREFUSED 127.0.0.1:9271`; with `--no-sandbox` the listener
   opens and the block page loads. All other flags match the task.
4. Chrome was killed by PID only in every run. Other parallel replay agents'
   Chrome processes (other ports/profiles) were not touched.
5. `curl` fallback, per task: `curl` fetched the itch page with HTTP 200 and
   the page HTML embeds the direct game URL
   `https://html-classic.itch.zone/html/19927425/index.html?v=1792595243`
   (iframe `game_drop`). `curl` also fetched that direct URL with HTTP 200
   (6,696 bytes; a DOM game — `#log`, `#acts`, `#runlbl` "RUN 1", notebook /
   sound / voice buttons — not a canvas game, so PNG screenshots would have
   worked had the page loaded).

## Exact block error (observed three times, two URLs)

Chrome loads `chrome-error://chromewebdata/` for both URLs, with innerText:

```
This page is blocked

Your organization doesn’t allow you to view this site
```

- Itch page `https://yokindo.itch.io/rollback` → block page (confirmed twice).
- Direct game URL `https://html-classic.itch.zone/html/19927425/index.html?v=1792595243`
  → block page (confirmed twice, including a clean run with viewport handling).
- Per the task's stop condition for a blocked direct URL, work stopped here:
  no proxy bypass was attempted, and no locally downloaded copy of the game
  was played. Those would be different routes needing a fresh decision, not
  something to smuggle into this "fresh play" report.

## Files in this directory

| File | What it is | Size |
|---|---|---|
| `probe.png` / `probe.txt` | Block page, first direct-URL run, full 1280×800 frame (eyeballed: block notice) | 16,536 B |
| `block-itch-page.png` / `block-itch-page.txt` | Block page, itch-page run — PNG is only 1,090×44 (error page captured before viewport handling; the TXT dump is the reliable evidence for this run) | 522 B |
| `block-direct-game.txt` | Block text, direct-URL run (its screenshot failed in that run: `Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 width` — the picked tab was a zero-width error tab; the TXT dump still confirms the block) | 77 B |
| `block-direct-clean.png` / `block-direct-clean.txt` | Block page, clean direct-URL rerun (eyeballed: "This page is blocked" notice; 955×273 — viewport override is unsupported on `chrome-error://` pages, so the frame is the error page's own size, not 1280×800) | 12,267 B |
| `driver.cjs` | Reproducible driver for the route above; prints `RESULT: BLOCKED` | — |
| `REPORT.md` | This report | — |

No files were written to `records/` or `competitors/rollback/img/`; nothing
from the earlier browser-task session (which reached "THE PROMISE" in Run 2)
is reused here as evidence — that history is noted only so the parent knows
what this replay did *not* reproduce.

## Honest gaps

- The whole game is unplayed in this replay: title screen, notebook
  carry-over, the 02:00 WREN interrogation, the patience economy, and all
  8 endings are unobserved first-hand here.
- The earlier session's findings (notebook persistence across runs, "Skip
  ahead" replay at higher patience, the "THE PROMISE" choice to disable
  restores permanently) are **not** re-verified by this run.
- The `block-itch-page.png` frame is a partial error-page capture (see table);
  it is not counted as a beat and should not be presented as one.

## What would unblock this

- A route where Chrome is not subject to this organisation block for
  `itch.io` / `html-classic.itch.zone` (e.g. the parent/root live browser,
  which is outside this subagent's scope), or an explicit parent decision to
  authorise a different route (proxy change or local-copy play). Until then,
  any ROLLBACK replay from this standalone setup will hit the same block.
