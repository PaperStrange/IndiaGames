# Vivid browser research — group A

Research date: **2026-10-21 UTC**. Researcher: coding agent `/root/browser_research_a`. These are agent-operated browser observations, **not human participant sessions**. No completion, enjoyment, accessibility or retention rate is inferred from them.

| Game / exact edition | Entry URL | Current endpoint | Evidence |
|---|---|---|---|
| Adventures With Anxiety! / creator-hosted HTML5 English edition | <https://ncase.me/anxiety/> | In progress: first two chapter endings + real reload/resume verified; final story ending still open | [Journey](adventures-with-anxiety.md), curated captures, `ui-log.jsonl` |
| Sort the Court! / updated Poki 2.5.2 edition | <https://poki.com/en/g/sort-the-court> | Two days, funded-jester callback, day summaries and real re-entry to day three; full campaign unplayed | [Separate agent journey](sort-the-court/README.md) |
| Six Cats Under / Team Bean Loop itch.io HTML5 edition | <https://teambeanloop.itch.io/six-cats-under> | Not yet played in this session | Pending |

These browser editions do **not** close the original unplayed native slots for Event[0], TOEM, full Townscaper or Rhythm Doctor. Other agents cover the remaining approved browser comparison set; consult their records separately.

## Method and limits

Chromium 151, Linux headless, 1280 × 900 viewport, mouse-coordinate input. The operating agent inspects screenshots and OCR of rendered pixels, then chooses visible options. For click-to-advance passages, batches of ordinary clicks capture every step and stop when OCR detects text in the visible choice area. This is assisted agent play: no game variables, localStorage, hidden state, reducers or success handlers are read or written to progress the game. No walkthrough was used to choose Anxiety options. The Storybench creator interview was read after the first chapter's choices and exposed the existence of later alternative outcomes, so this is not a fully blind first encounter. External source reading is identified separately below.

The first direct browser navigations failed with `ERR_CERT_AUTHORITY_INVALID`. Automatic approval review rejected importing the proxy CA into Chromium's persistent user trust store; the persistent import was not carried out. Subsequent play uses a **task-scoped authenticated request relay**: Playwright APIRequestContext fetches upstream through the inherited managed `HTTPS_PROXY`, with TLS verification enabled and `NODE_EXTRA_CA_CERTS` pointing to the environment's already-installed proxy CA. Browser routes receive those authenticated responses. No `ignoreHTTPSErrors`, certificate bypass flags, direct-network bypass or persistent trust changes are used.

The relay and shared CPU contention can affect loading and timing. An OCR/OpenMP oversubscription problem was identified during this run; helpers were changed to one OCR thread and a bounded timeout. Recorded elapsed time includes tool latency, reading, research notes and pauses; it is **not a game-length or performance benchmark**. Audio was not listened to; sound, music and spoken performance are unassessed. No physical phone or assistive-technology test was performed.

`ui-log.jsonl` preserves observation-completion timestamps, ordinary input coordinates and OCR reading notes. Timestamps are written after OCR, so they are not precise input times. OCR can contain errors; curated screenshots are the stronger visual evidence. Intermediate capture filenames marked `local-scratch`, and uncurated images in earlier records, refer to temporary local research material rather than promised repository attachments. The curated files are listed in each journey. Anxiety's own page identifies its material as public domain; this log is not a general permission to redistribute other games' assets or full transcripts.

## Secondary and creator sources read

- [Nicky Case interview, Storybench, 7 October 2019](https://www.storybench.org/how-nicky-case-designed-the-game-adventures-with-anxiety/): creator describes personal choices and later callbacks within a largely shared plot. This supports investigating perceived recognition rather than assuming every choice needs an entirely separate ending. It is a creator explanation, not our play result or evidence of clinical effectiveness.
- [Joel Couture, Indie Games Plus, 21 July 2021](https://indiegamesplus.com/six-cats-under-review/): criticism describes indirect object manipulation, cat preferences and the sadness beneath a cute rescue. Read **before** our cat-game play, so the upcoming run is not an uncontaminated first encounter; the review exposed the fan/catnip interaction.
- [Graeme Borland's game page](https://www.graemeborland.com/games/sort-the-court/): developer identifies the original 72-hour jam, two-button design and subsequent expansion. This is production context, not a measurement of the updated Poki version.

Search snippets exposed additional Six Cats Under hints concerning a cat's route, toilet paper, a television and yarn. They were not deliberately opened as a walkthrough, but this prior exposure must be considered when interpreting later puzzle solving. We cannot call that run fully unaided.
