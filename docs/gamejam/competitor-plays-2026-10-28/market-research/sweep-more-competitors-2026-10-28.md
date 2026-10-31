# Desk sweep — more competitors (backup pool) — 2026-10-28

Scope: DESK ONLY. No play, no purchases, no accounts. Backup pool for the
three parallel play agents. A candidate is PLAYABLE only when a free,
no-account, browser build was verified from the page itself (itch "Run in
browser" badge / HTML5 embed, or a standalone free site). Anything else is
MARKET-ONLY or NOT PLAYABLE — never presented as a play.

Existing titles — NOT duplicated here (already covered):
- Bell: ROLLBACK, Core Rush, Loop Hero, Until Then, Duck Detective, Blue Prince.
- Moments: Gartic Phone, skribbl.io, Split Fiction, PICO PARK 2, BOKURA: planet, Tiny Glade.
- Vivid: Birdography, Pixel Harbor, Lost Records, Paper Trail, EOS, 1000xRESIST.

Verification method per itch title: page HTML fetched with curl (HTTP 200),
price taken from itch metadata in that HTML (actual_price / min_price),
embed URL taken from the page's own game iframe (html-classic.itch.zone or
html.itch.zone). Standalone sites were fetched the same way and checked for
a login wall in the homepage HTML.

---

## Vivid (Keeper's Frame — photography/collection, cozy exploration, light/puzzle)

| Title | Family | Page URL | Itch embed URL | Free? | Account? | Browser build? | Controls | Endpoint to aim for | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Field Guide (Exocoatl, VelenGeth) | photography/collection | https://exocoatl.itch.io/field-guide | https://html.itch.zone/html/13726142/Web/index.html?v=1785626809 | Yes — itch metadata actual_price 0, min_price 0 | No (login only for comments) | Yes — "Run game", Platforms HTML5 + Windows + Linux, Godot 4.4, Wild Jam #81 | WASD move, Space jump, left-click photo, C / right-click-hold camera mode, E interact, Shift sneak, Alt/X sprint | Photograph one creature cleanly; fill one gallery entry | PLAYABLE — lead candidate. Caveat: WASD + mouse-look; play agent must confirm key-sending works in its harness before committing a deep session. |
| PhotoHacks (GeeseBumps) | photography/collection | https://geese-bumps.itch.io/photohacks | https://html-classic.itch.zone/html/19581011-2233642/index.html?v=1793185663 | Yes — actual_price 0; devlog: "free, no ads, no microtransactions and no accounts" | No | Yes — "Run game", Platforms HTML5 + Win/macOS/Linux/Android; updated 16h before sweep | Camera controls per devlog (keys/controller/touch named in options; exact keys on in-game help) | Complete one Academy lesson or one arcade assignment with a developed-photo report | PLAYABLE — strongest photography-fit after Field Guide; teaching framing/focus/exposure, closest to Keeper's Frame's collection loop. |
| Tranquility (Occular Malice) | photography/collection, cozy exploration | https://bsimser.itch.io/tranquility | https://html-classic.itch.zone/html/12060488-1128834/Tranquility/index.html?v=1782914515 | Yes — min_price 0 | No | Yes — Platforms HTML5 (Unity), Cozy Fall Jam | WASD move, mouse look, E camera, Spacebar photo, Esc menu | Photograph 1 of the 10 animals; view photo album from main menu | PLAYABLE, with a known-bug warning from the page itself: "camera sometimes doesn't work and the in-game menu can get messed up" (workaround on page: return to main menu and re-enter; progress saved). WASD caveat as Field Guide. |
| Pathipelago (OneBitKid) | cozy exploration / diorama-building | https://onebitkid.itch.io/pathipelago | https://html-classic.itch.zone/html/20017251/index.html?v=1792916878 | Yes — min_price 0; free browser demo (first island + daily island); full game is a separate paid desktop release | No | Yes — "Run game", Platforms HTML5, in development, updated 3 days before sweep | Mouse-driven, turn-based island building (no WASD dependence stated) | Build the first island's cottages/fields/workshops; observe one villager day-cycle (work → fireside) | PLAYABLE — best non-WASD cozy backup; also a Moments diorama candidate (listed here to avoid double-counting). |

Vivid count: 4 verified PLAYABLE, 0 market-only in this batch.

---

## Bell (Thirteenth Bell — time-loop, deduction/mystery, escape/puzzle-loop)

| Title | Family | Page URL | Itch embed URL | Free? | Account? | Browser build? | Controls | Endpoint to aim for | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Night OClock (MrNoupGames) | time-loop, deduction/mystery | https://mrnoupgames.itch.io/night-oclock | https://html-classic.itch.zone/html/14942823/index.html | Yes — actual_price 0; 4.5/5 (37 ratings) | No | Yes — "Run Night OClock", Platforms HTML5 + Windows, GMTK 2025 | WASD (or ZQSD) move, Shift run, Space jump/climb, left-click push | Survive one 1-minute loop carrying an item/memory into the next loop; solve one victim puzzle | PLAYABLE — closest Bell fit (loop + murder + mansion deduction). WASD caveat as Field Guide. |
| The Same Bullet (SomeTimesAtNight) | time-loop, puzzle-loop | https://sometimesatnight.itch.io/the-same-bullet | https://html-classic.itch.zone/html/18171746/index.html?v=1782950624 | Yes — min_price 0; donations optional ("free to play") | No | Yes — "Run game", Platforms HTML5 + Windows + Android; 10 temporal rooms | Mouse aim/shoot (top-down puzzle shooter; exact keys on page) | Clear room 1 using a past-loop bullet (ricochet/switch) — the loop mechanic itself | PLAYABLE — purest loop-mechanic contrast to Bell's deduction loop. |
| Inside the loop (satolas) | time-loop, escape/puzzle-loop | https://satolas.itch.io/inside-the-loop | https://html-classic.itch.zone/html/2833883/index.html?v=1782588931 | Yes — actual_price 0; 4.4/5 (32 ratings) | No | Yes — Platforms HTML5 + Windows + macOS, "Playable in browsers supporting WEBGLv2", Ludum Dare 47, 5–10 min | Arrows/WASD move, Space jump (controller also supported) | Reach the exit of the mega-loop in one 5–10 min run | PLAYABLE — shortest Bell backup; WebGL2 requirement noted (not WebGL1). |
| last seen online (qwook, sochinstudio) | deduction/mystery, escape/puzzle-loop | https://qwook.itch.io/last-seen-online | https://html-classic.itch.zone/html/19480086-2047391/index.html?v=1790871920 | Yes — actual_price 0; 4.8/5 (4,271 ratings); guide sources: browser + Steam both free, no paid tier | No | Yes — "Run game", itch "Play in browser" badge; mouse/keyboard/touch, ~30–60 min, 9 puzzles | Mouse + keyboard (simulated desktop: open files/messages/apps, type passwords) | Solve the first desktop puzzle gate (of 9) toward the ending | PLAYABLE — best non-WASD Bell backup (mouse/keyboard, no held keys); deduction via evidence, closest to Bell's notebook logic. |
| Quiet Express: Cabin 909 (STUDIO909) | time-loop, deduction/mystery | https://store.steampowered.com/app/3962240 (task-supplied URL) | — | Demo free on Steam; full game price TBD, release 2027 | Steam account required (by platform) | NO browser build found — Oct 28 searches return only Steam coverage (demo Oct 16, 2026, ~30 min, 7-day train loop, Blue Prince-like cabin choice) and no itch/browser result | — | — | MARKET-ONLY — re-verified 2026-10-28: Steam-demo-only. Do NOT present as playable. Market value: closest commercial analogue to Bell (loop + room-choice + deduction). |
| Deloop (Sierra5) | time-loop, puzzle-loop | https://sierrafive.itch.io/deloop | — | Free (page states downloadable game) | No | NO — page metadata: Platforms Windows, Linux only; no HTML5, no "Play in browser" | Keyboard | — | NOT PLAYABLE (download-only) — recorded so it is not re-proposed as a browser candidate. Loop premise (find two hidden levers to break the loop) fits Bell, but the build does not. |

Bell count: 4 verified PLAYABLE, 2 non-playable recorded (Quiet Express MARKET-ONLY, Deloop download-only).

---

## Moments (Small Hours — party/draw-guess, 2-player co-op, diorama/building, word/social)

Gap note: existing deep plays are draw-guess-adjacent only. The diorama/deep-play gap is filled below by Reign (bot-filled, solo-playable, ~30 min) and Pathipelago (listed under Vivid to avoid double-counting; it is equally a Moments diorama candidate).

| Title | Family | Page URL | Itch embed URL | Free? | Account? | Browser build? | Controls | Endpoint to aim for | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Drawize | party/draw-guess | https://drawize.com | — (standalone site, no itch embed) | Yes — free; page: "No account needed", "play as a guest" | No — explicit: "No sign-up needed" for live games and private rooms | Yes — live browser game, live rounds + private rooms + Quick Draw/Guess practice | Mouse draw, type guesses | Join one live round and guess/draw once; or one private-room round | PLAYABLE — strongest draw-guess backup (explicit guest flow on the homepage itself, not just secondary claims). |
| Drawasaurus | party/draw-guess | https://drawasaurus.org | — (standalone site) | Yes — homepage: "a free, online drawing & guessing game … on any browser" | No — secondary sources agree no account; homepage offers Quick Play + private rooms with no login wall in fetched HTML | Yes — browser game (JS; needs a modern browser) | Mouse draw, type guesses | One full draw-guess round via Quick Play or a private room | PLAYABLE. Multiplayer caveat: needs other players (public lobby) or a second player in a private room; a solo agent joins a public lobby. |
| Gartic.io | party/draw-guess | https://gartic.io | — (standalone site) | Yes — free browser game per multiple sources; core game free, optional cosmetics | No account wall in fetched homepage HTML: nickname field + PLAY button; social-login buttons are offered, not required | Yes — browser game, public rooms + private rooms | Mouse draw, type guesses | One draw-guess round in a public or private room | PLAYABLE, with a guest-flow check at play time: confirm the nickname-only entry still bypasses login before committing a session. |
| Codenames.game (official, Czech Games Edition) | word/social | https://codenames.game | — (standalone site) | Yes — free browser play on the official site | No — homepage: enter nickname + ENTER GAME, no login wall in fetched HTML | Yes — browser game, room URL shared with friends | Mouse click (word selection), type clues/guesses | Complete one full Codenames game | PLAYABLE, with a team-size caveat: the game is designed for 2 teams (4+ players ideal); a pair session needs additional players or the site's 2-player variant if offered — check at play time. |
| Reign: Settlement (catinrage) | diorama/building, party/board | https://catinrage.itch.io/reign | https://html-classic.itch.zone/html/20045381/index.html?v=1793001952 | Yes — min_price 0 | No for solo play — page verbatim: "Play a quick game against bots in seconds, no account needed. Make a free account to play online with friends." | Yes — Platforms HTML5 (Three.js), published 2 days before sweep, ~half-hour session | Mouse-driven (voxel board, dice, trading) | Finish one full bot game to 10 points (or one complete solo-campaign mission) | PLAYABLE — THE diorama/deep-play gap filler: a tiny voxel diorama island you build on, bots fill all seats, no second human needed, no WASD. Strongest Moments backup overall. |
| Fireboy & Watergirl 1: Forest Temple (Oslo Albet, via mirror) | 2-player co-op | https://fireboyandwatergirl.me/ | — (standalone mirror, self-hosted HTML5 build) | Yes — free, no registration per mirror sources | No — mirror states no registration/login/downloads | Yes, via mirror — self-hosted HTML5 build, full 32-room Forest Temple; official channels are Poki/CrazyGames/Steam (Steam build is paid, 2026) | Arrows (Fireboy) + WASD (Watergirl) on one keyboard; single player can control both | Clear level 1 with both characters exiting (collecting diamonds optional) | PLAYABLE (mirror) — with two caveats: (1) unofficial mirror, not the rights-holder's page — prefer it only as a fallback; (2) true 2-player needs one keyboard with both key sets (held-key limitation applies). Prior note: Flash/Ruffle canvas captures print black — record via screenshots, not PDF. |
| Money Movers (Meow Beast, via portals) | 2-player co-op, puzzle-platform | https://imigames.io/game/money-movers/ (portal; also https://www.learn4good.com/games/online/fun-duo-escape.htm) | — (portal embed, no itch) | Yes — free on portals, 20 levels | No account stated on portal pages | Yes — browser game on portals, desktop + mobile browsers | WASD (one brother) + arrows (other brother); solo play alternates characters | Clear level 1 with both brothers at the exit door | PLAYABLE (portal) — same caveats as Fireboy: unofficial portal, WASD+arrows co-op. Money Movers 3 (guard + dog variant) is on the same portals if the original fails to load. |
| Sketchful.io | party/draw-guess | https://sketchful.io | — | Yes — free | ACCOUNT-GATED in fetched page: "Sign in with Google to play / Your network needs a Google account to join a lobby" | Yes — browser game, but gated | Mouse draw, type guesses | — | NOT PLAYABLE under the no-account rule — recorded as a correction: secondary sources claim "no signup", but the site's own fetched HTML demands Google sign-in. Do not propose as a backup unless the gate is re-checked and lifted. |

Moments count: 7 verified PLAYABLE (Drawize, Drawasaurus, Gartic.io, Codenames.game, Reign, Fireboy & Watergirl via mirror, Money Movers via portals), 1 account-gated (Sketchful.io).

---

## Summary counts (desk-verified 2026-10-28)

- Vivid: 4 PLAYABLE — Field Guide, PhotoHacks, Tranquility, Pathipelago.
- Bell: 4 PLAYABLE — Night OClock, The Same Bullet, Inside the loop, last seen online; plus Quiet Express MARKET-ONLY (Steam-demo-only, re-verified) and Deloop download-only.
- Moments: 7 PLAYABLE — Drawize, Drawasaurus, Gartic.io, Codenames.game, Reign, Fireboy & Watergirl (mirror), Money Movers (portals); plus Sketchful.io account-gated.
- Total: 15 verified-playable backup candidates. No candidate above duplicates an existing title. No competitor directories created; no records/ files or img/ directories touched.
