# A Dance of Fire and Ice browser demo — observed journey

Date: 2026-10-21 UTC. Observer: agent `/root/browser_research_b`. Exact page: https://fizzd.itch.io/a-dance-of-fire-and-ice . Embedded build: `https://html-classic.itch.zone/html/1175401/index.html`. This is the public browser demo, not the paid full game or the 2026 Switch edition discussed in a separate review. Input: mouse and keyboard through Playwright. **No audio was listened to.**

## Intention and limits

The planned endpoint is calibration, a natural mistake, a retry and one completed track. A visual/automated agent attempt can document prompts, feedback and recovery controls, but cannot fairly evaluate musical pleasure, human timing difficulty, controller latency or audio accessibility. The shared headless renderer and task-scoped network transport also prevent consumer performance claims.

## Observed first contact

The itch page separated “Run game” from purchase/download. Its text described a one-button rhythm game and explicitly distinguished the browser demo from the larger paid version. Clicking Run game loaded the embedded game. The first screen read “Device Calibration. Press to begin!” with a blue planet on a dotted horizontal line. Clicking it changed the instruction to “Press to the beat. Join in anytime.” A red planet visibly orbited the blue planet.

I closed this tab while concentrating on WBWWB and later Vivid QA. At that point, **calibration had started but had not been completed**, and no track had been attempted. This distinction matters: a loaded title or calibration screen is not a gameplay completion.

## Hypothesis to carry into Vivid

One input can still have a demanding timing contract. For a care-focused story, use a latched brace and explicit placement acceptance rather than assuming a single button or a short gesture is accessible. The question for the human observer is whether players understand an action's result and can recover, not how many buttons the design advertises.

## Resumed input and recovery observations

The resumed screen again began with device calibration. I clicked to begin, then sent sixteen Space presses separated by nominal 500 ms waits, followed by sixteen with nominal 600 ms waits. The game displayed numerical calibration feedback and orbit marks. **These cadences were automated visual probes, not beats matched by hearing.** Calibration accuracy was not established. Escape returned to the main menu; this is an observed exit/recovery path, not proof that calibration passed.

The menu identified the build as **v0.4.2, December 2018** and showed “Highest Level Reached: 0,” World 1/2/3, Continue, “Any key to move,” `[ ]` calibration adjustment, and `C` to reopen calibration. Clicking a World label did not act like a conventional menu button. Further Space presses moved the orbiting planets across the visible tile grid. Thus the menu itself teaches/uses the game's timing interaction; merely reaching this screen is not a completed level.

To reach a tutorial without inventing audio perception, I then used visible-pixel detection of the red and blue planets to time legitimate Space presses toward adjacent tiles. This is **assisted UI navigation**, with no inspection or modification of internal game state. Any later success must be attributed to that assistance rather than human rhythm skill.

## Actual endpoint and unresolved criteria

**Partial interaction only: calibration attempts and menu navigation; no track reached or completed.** The intended rightward navigation sometimes moved to a different row. A further twenty-four nominal 500 ms inputs moved around the menu grid but did not reach a world. I stopped this bounded attempt rather than interpret the assisted timing as a human skill result.

I verified the displayed `C` shortcut: it reopened “Device Calibration. Press to begin!”; Escape then returned to the menu at its starting position. This is a concrete recovery observation. It is **not** the planned track failure/retry/completion sequence. Calibration success, a natural in-track error, recovery within a track, and a completed track remain pending for an observer who can hear the audio and control inputs in real time. The final visible “Highest Level Reached: 0” agrees with that limitation. No game script errors were captured; this does not establish performance or timing correctness.

## Answers we can responsibly carry forward

- **Motivation hypothesis:** one repeated action can offer mastery through increasingly precise timing. This is consistent with the public description and criticism, but our limited, unheard session cannot establish musical enjoyment.
- **Browser differentiation:** Vivid should promise patient interpretation and legible consequences, while providing direct accessible story selection. Do not infer that reducing buttons automatically removes onboarding or control demands.
- **Specific experience to test:** make Iona's brace and Mara's alignment meaningful through what they reveal, without requiring rhythmic precision. Keep a visible route back to a stable checkpoint when an input, renderer or save cannot be used.

The right follow-up is a real-time audio-enabled play session, not more automated cadence trials presented as empathetic human evidence.

## Later independent follow-up

The [isolated follow-up](adofai-followup/README.md) reached track 1-1, observed an explicit Late!! error, retried, and exited to the menu. Track completion remains open. This additional session does not change the original calibration/menu-only record above.
