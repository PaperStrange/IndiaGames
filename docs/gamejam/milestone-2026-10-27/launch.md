# Baseline launch and invitation

## Prepare the exact package

From the repository root, choose a new output directory:

```sh
python3 docs/gamejam/milestone-2026-10-27/package-baseline.py --output /workspace/indiagames-backups/small-hours-baseline-2026-10-27
python3 -m http.server 8111 --bind 127.0.0.1 --directory /workspace/indiagames-backups/small-hours-baseline-2026-10-27/build
```

Open `http://127.0.0.1:8111/` in that machine's browser. This is a local preparation URL, not a public participant link. Stop that owned server when finished. The output directory contains the unchanged `build/`, `baseline.json`, and a ZIP whose root contains `index.html`. The script refuses to overwrite an existing output; retain the prior artifact and compare inventories when producing another copy.

No dependency installation or build step is needed for play. Use HTTP(S), not `file://`, because JavaScript modules need a web origin. On a static host, serve all the exported files together. Check a project subpath and the real embed: scrolling, narrow layout, keyboard focus, touch/virtual keyboard, opening and downloading SVG, and leaving/reloading. Do not infer physical Safari/Chrome support from browser emulation.

Before a human session, record the actual host, exact inventory hash and any host-specific failures. Hosting this unchanged baseline for a study is not an official main release. No itch.io upload, campaign or account creation is part of this packet. An itch.io HTML5 page remains a delivery hypothesis; CrazyGames eligibility/acquisition remains a separate question requiring then-current requirements.

## Invitation copy for review

> Small Hours is a little browser game for two willing people sharing one screen. Make private choices, reveal them together, then invent a tiny exhibit, impossible postcard or playful forecast. You can imagine objects, play seated, change the activity and leave writing blank. At the end you may agree to save a keepsake or simply finish. No account is needed. We are testing a roughly five-minute design target; actual session time has not been established with people.

Active choices and text stay in the current tab's memory. Reload, navigation or End & forget clears that session; an SVG already downloaded remains on the device. Handoff curtains are visual courtesy, not authentication or secure storage. There is no remote partner or AI partner; solo mode is a rehearsal. The invitation makes no claim of relationship benefit, better memory, market uniqueness or human-tested accessibility.

## Current verification status

Runtime unchanged from the previously checked baseline. Historical 33-assertion Chromium evidence is linked in the packet README; it is not a new run. Root coordinator records new packaging/launch verification separately with date, source, hash and precise checks. Physical devices, assistive technology, actual hosted-platform behavior and real pair play remain pending until observed.

## Downloadable baseline

[Download the frozen baseline ZIP](small-hours-baseline.zip), extract all files into one directory, then serve it over HTTP as above. ZIP SHA-256: `64ebb3bdfd69b4a643a06817cc023754e94fc114c5a812fae6fb111af1ad2fd2`. This is a pilot baseline, not an approved release.
