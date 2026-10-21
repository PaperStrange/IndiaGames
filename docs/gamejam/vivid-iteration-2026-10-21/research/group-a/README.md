# Vivid browser research — group A

Research date: **2026-10-21 UTC**. Coordinating researcher: coding agent `/root/browser_research_a`; the separate Sort the Court and Six Cats Under records identify their own agent-operated sessions. These are agent-operated browser observations, **not human participant sessions**. No completion, enjoyment, accessibility or retention rate is inferred from them.

| Game / exact edition | Entry URL | Current endpoint | Evidence |
|---|---|---|---|
| Adventures With Anxiety! / creator-hosted HTML5 English edition | <https://ncase.me/anxiety/> | One full path through safe outcome, epilogue, credits and resources/Replay; chapter resume and post-completion re-entry verified | [Journey](adventures-with-anxiety.md), curated captures, `ui-log.jsonl` |
| Sort the Court! / updated Poki 2.5.2 edition | <https://poki.com/en/g/sort-the-court> | Two days, funded-jester callback, day summaries and real re-entry to day three; full campaign unplayed | [Separate agent journey](sort-the-court/README.md) |
| Six Cats Under / Team Bean Loop itch.io HTML5 edition | <https://teambeanloop.itch.io/six-cats-under> | Assisted partial: Geoffrey/bathroom/yarn/remote progress, unresolved TV; reload returned to opening; rescue/ending not reached | [Separate agent journey](six-cats-under/README.md) |

These browser editions do **not** close the original unplayed native slots for Event[0], TOEM, full Townscaper or Rhythm Doctor. Other agents cover the remaining approved browser comparison set; consult their records separately.

## Method and limits

The Anxiety run used Chromium 151, Linux headless, a 1280 × 900 viewport and mouse-coordinate input, plus a keyboard action on the visible reading-speed slider. The two other operator records specify their own input methods. The operating agent inspects screenshots and OCR of rendered pixels, then chooses visible options. For click-to-advance passages, batches of ordinary clicks capture every step and stop when OCR detects text in the visible choice area. This is assisted agent play: no game variables, localStorage, hidden state, reducers or success handlers are read or written to progress the game. No walkthrough was used to choose Anxiety options. The Storybench creator interview was read after the first chapter's choices and exposed the existence of later alternative outcomes, so this is not a fully blind first encounter. External source reading is identified separately below.

The first direct browser navigations failed with `ERR_CERT_AUTHORITY_INVALID`. Automatic approval review rejected importing the proxy CA into Chromium's persistent user trust store; the persistent import was not carried out. Subsequent play uses a **task-scoped authenticated request relay**: Playwright APIRequestContext fetches upstream through the inherited managed `HTTPS_PROXY`, with TLS verification enabled and `NODE_EXTRA_CA_CERTS` pointing to the environment's already-installed proxy CA. Browser routes receive those authenticated responses. No `ignoreHTTPSErrors: true`, certificate bypass flags, direct-network bypass or persistent trust changes are used.

The relay and shared CPU contention can affect loading and timing. An OCR/OpenMP oversubscription problem was identified during this run; helpers were changed to one OCR thread and a bounded timeout. Recorded elapsed time includes tool latency, reading, research notes and pauses; it is **not a game-length or performance benchmark**. Audio was not listened to; sound, music and spoken performance are unassessed. No physical phone or assistive-technology test was performed.

`ui-log.jsonl` preserves observation-completion timestamps, ordinary input coordinates and OCR reading notes. Timestamps are written after OCR, so they are not precise input times. OCR can contain errors; curated screenshots are the stronger visual evidence. Intermediate capture filenames marked `local-scratch`, and uncurated images in earlier records, refer to temporary local research material rather than promised repository attachments. The curated Anxiety files and their hashes are listed in `capture-index.json`; each other journey has its own capture index. Anxiety's own page identifies its material as public domain; this log is not a general permission to redistribute other games' assets or full transcripts.

## Secondary and creator sources read

- [Nicky Case interview, Storybench, 7 October 2019](https://www.storybench.org/how-nicky-case-designed-the-game-adventures-with-anxiety/): creator describes personal choices and later callbacks within a largely shared plot. This supports investigating perceived recognition rather than assuming every choice needs an entirely separate ending. It is a creator explanation, not our play result or evidence of clinical effectiveness.
- [Joel Couture, Indie Games Plus, 21 July 2021](https://indiegamesplus.com/six-cats-under-review/): criticism describes indirect object manipulation, cat preferences and the sadness beneath a cute rescue. Read by the group coordinator before the separate operator completed the cat-game run. The review exposed the fan/catnip interaction to the coordinator; the operator's own assistance disclosure controls interpretation of that run.
- [Graeme Borland's game page](https://www.graemeborland.com/games/sort-the-court/): developer identifies the original 72-hour jam, two-button design and subsequent expansion. This is production context, not a measurement of the updated Poki version.

Search snippets also exposed Six Cats Under hints to the coordinator. The separate operator records their own comment/walkthrough exposure; do not label assisted puzzle progress unaided. A review's described ending never counts as our observed ending.
