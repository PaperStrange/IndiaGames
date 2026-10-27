# Bell pilot launch and comparison

This browser pilot tests whether a witnessed blockage makes the next-loop intervention understandable and worth doing. It is prepared for local/direct-link or itch.io-style browser testing; no portal publication or market acceptance is claimed. CrazyGames remains a separate acquisition question.

## Candidate

The frozen package is `release-candidates/thirteenth-bell/0.1.0/` on master. It includes `candidate.json`, notes, blank human evidence and one portable `build/index.html`. The game-branch `candidate-identity.json` records the exact source and byte inventory. From a checkout of master, run:

```sh
python3 scripts/validate-release.py --staging
python3 -m http.server 8113 --bind 127.0.0.1 --directory release-candidates/thirteenth-bell/0.1.0/build
```

Open `http://127.0.0.1:8113/` on that machine, select Contrast, then Start. Stop the owned server after the session block. Master itself is not a public Pages deployment; a repository source URL does not run the game.

To rebuild only this artifact without switching branches, run the game branch's `scripts/package-pilot.py` with `--source 700dcea61eaedc704ddce5adc98d5a6bd5d42a06`, `--output` pointing to a new external directory, and `--version 0.1.0`. It refuses to overwrite an existing export. Compare every build file and the inventory digest before using a new export. A release's version cannot be reused for changed bytes.

## Frozen comparison

The old Original and previous Contrast reference is committed at `docs/gamejam/milestone-2026-10-27/reference/index.html`. Its source is `252cc55e8515da1438c3e74af2e7dcc58eb13118`; build-inventory hash is `47793d0ebc1801226a6b1f1e4fc11fb056d632c54919f179b91e14520c54fda8`. Serve that directory on a different port, choose Contrast, then Start. Keep Original available only as a historical inspection reference, not the study comparator.

The previous build retains its optional Google Fonts request. In this managed browser it failed certificate validation and rendered fallback fonts; that failure is documented separately. The new candidate removes the remote font dependency and uses local system stacks. Never edit the reference to make its results look cleaner.

## Player-facing limits

The game keeps a run only in the active tab: reload loses it. Restart clears learned clues and outcomes. Original and Contrast keep separate in-tab states; begin fresh for each study run. Fracture can end a day before its next scheduled event; a borrowed minute does not remove that risk. There are no accounts, cloud saves, purchases or analytics in this package.

The on-screen duration is game-session timing, not a measured typical human completion time. Follow the 20-minute per-build maximum and neutral recall break in [the protocol](protocol.md). Browser emulation does not establish physical phone/Safari or screen-reader support. Record actual host, browser/device, source/hash, load problems and help; human staffing and approval remain pending.
