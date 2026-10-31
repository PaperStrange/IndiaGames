# skribbl.io replay — BLOCKED, no game played

**Date:** 2026-10-29 (PDT, early morning) · **Agent:** standalone Playwright replay (skribbl.io slot)
**Outcome: FAILED TO REACH THE GAME. Zero guesser turns, zero drawer turns, no round, no winner screen.**
No beat from the requested set (home / guessing / drawing / results) was played. What was banked
instead is verified evidence of the block itself. Nothing below is borrowed from any earlier
browser-task report; every claim here comes from this session's own runs.

## Verdict in one line

skribbl.io does not load in this standalone-Chrome environment: the egress proxy answers the
browser's navigation with an organisation block page, while the same URL fetched with curl
through the same proxy returns HTTP 200. The game was never reached, so no words, guesses,
scores, chat events, or drawing behaviour were observed — and none are claimed.

## Route attempts (all with /opt/meta-chromium/chrome, --headless=new, --window-size=1280,800, --remote-debugging-port=9274, --user-data-dir=/tmp/pw-replay-skribbl, startup URL https://skribbl.io)

1. **Proxy first (implicit, no proxy flags) — FAILED.** Page landed on `chrome-error://chromewebdata/`
   with innerText: "This site can't be reached … ERR_TUNNEL_CONNECTION_FAILED".
2. **Direct (--no-proxy-server) — FAILED, different error.** SSL handshake failures
   (`net_error -107`) and the page landed on `http://connectivitycheck.gstatic.com/generate_204`
   with innerText: "muse: Other TCP connections is turned off for this assistant. To allow it,
   ask the user to open Muse settings -> Permissions -> Direct network protocols and switch
   other_tcp from Deny to Ask." Direct TCP is permission-denied for this agent, so the
   no-proxy route cannot work here. Chrome from run 2 was killed by PID only.
3. **Explicit --proxy-server from the environment (proxy value read from env at runtime,
   never written to any file) — BLOCK PAGE, reproduced twice.** Run 4: innerText captured but
   the screenshot failed (0-width page during transition), so the run aborted. Run 5 (fixed
   driver): startup navigation produced the block page; a `page.goto` retry then failed with
   `net::ERR_NO_SUPPORTED_PROXIES`; two reloads stayed on the error page; the driver aborted
   cleanly and killed Chrome by PID. Run 6 (final, fixed `page.url()` bug — see Defects):
   startup navigation again produced the block page, `page.goto` again failed with
   `net::ERR_NO_SUPPORTED_PROXIES`, two reloads failed, clean abort, Chrome killed by PID.
4. **Control checks.** `curl` through the proxy to https://skribbl.io/ returns HTTP 200
   (21,530 bytes, real homepage HTML — name input `.input-name`, `Play!` button
   `.button-play`, `#game-canvas` 800×600 canvas, `#game-round`, `#game-word`, `#game-chat`
   guess input all present in the markup) — including with a Chrome user-agent string, and
   on repeat. So the block is specific to the browser's proxied navigation, not to the URL
   being down and not to the user-agent. itch.io loaded over the proxy in the same session
   window for other purposes, so this is not a general proxy outage.

## Beats banked (counts)

- **PNG beats of gameplay: 0.** Requested beats home / guessing / drawing / results: **none played.**
- **PNG beats of the block itself: 4 files, all real frames (verified by `file` + eyeballing
  blocked.png):**
  - `blocked.png` (12,254 bytes, 955×271) + `blocked.txt` — "This page is blocked / Your
    organization doesn't allow you to view this site". Eyeballed: genuine block-page frame.
  - `home.png` (12,254 bytes, same frame as blocked.png, from the final run's startup navigation).
  - `home-goto.png` (18,369 bytes, 1090×330) + `home-goto.txt` — Chrome error page after the
    `page.goto` retry: "This site can't be reached … ERR_NO_SUPPORTED_PROXIES".
  - `home-retry1.png` (18,708 bytes, 1090×330) + `home-retry1.txt` — same error page on reload.
  - `home-retry2.txt` only (its screenshot failed with the 0-width error during transition;
    text matches the error page). `route-failure.txt` holds the final error text.
- **InnerText dumps:** `blocked.txt`, `home.txt`, `home-goto.txt`, `home-retry1.txt`,
  `home-retry2.txt`, `route-failure.txt` — all in this directory.
- **Driver:** `driver.cjs` (final version; proxy taken from env, never embedded), plus
  `driver.log` / `driver-stdout*.log` for all six runs.
- Note on PNG size: the block/error pages render short, so the screenshots are 955×271 /
  1090×330 rather than 1280×800. They are real rendered frames of those pages, not blanks.

## What was NOT played (honest gaps)

- No nickname entry, no "Play!" click, no public room joined — the homepage never rendered.
- No guesser turn: no drawer canvas, no hints, no chat, no guesses typed.
- No drawer turn: no three-word choice, no mouse-drag drawing, no results/scores screen.
- No round number, no winner screen, no stranger behaviour (AFK drawers, votekick, join/leave
  churn) — nothing of the game was observable.
- No words, guesses, scores, or chat events exist to report. Any such detail attributed to
  this replay would be fabrication.

## Defects / incidents during the replay itself (reported before any recovery)

- Run 3 died early when its Chrome process exited with zygote communication errors
  ("Failed to send GetTerminationStatus message to zygote") while six parallel replay
  Chromes were running; the driver then polled a closed page for the rest of its loop.
  Cause not proven (load pressure is plausible, not established).
- Run 5 crashed on a driver bug: `page.url().catch(...)` — `page.url()` returns a string,
  not a promise. Fixed in the final driver (plain `page.url()` in try/catch); the orphaned
  Chrome from run 5 was killed by PID before the final run.
- Run 1's Chrome and run 2's Chrome were each killed by PID only (no broad pkill used).

## What would unblock a real replay

- Play from a network where skribbl.io is not proxy-blocked for browser traffic (the block
  page names an organisation policy, so this is a policy/allowlist question, not a game
  outage — curl proves the site itself is up), or from the main agent's live browser
  session, which does not go through this standalone-Chrome proxy path.
- Do NOT retry the same three routes expecting a different result: implicit-proxy tunnel
  failure, direct-TCP permission denial, and explicit-proxy block page are each now
  reproduced and documented. A retry only makes sense after the block policy changes.

## Files in this directory

`REPORT.md` (this file), `driver.cjs`, `driver.log`, `driver-stdout*.log`,
`blocked.png` + `blocked.txt`, `home.png` + `home.txt`, `home-goto.png` + `home-goto.txt`,
`home-retry1.png` + `home-retry1.txt`, `home-retry2.txt`, `route-failure.txt`.
No files were written to `records/` or `competitors/skribbl-io/img/` by this task.
