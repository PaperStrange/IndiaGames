# ADOFAI follow-up: track entry, timing error and recovery

Observed 2026-10-21 UTC in a new isolated browser session; closed at **08:13:49Z**. This supplements the [first partial record](../adofai.md), whose original calibration/menu-only endpoint remains unchanged. Played the [public itch browser demo](https://fizzd.itch.io/a-dance-of-fire-and-ice), embedded at `https://html-classic.itch.zone/html/1175401/index.html`, with the menu identifying **v0.4.2 December 2018**. Chromium 151.0.7922.173, Linux, 1280 × 800. Vivid's shared GPU verification had finished before this follow-up.

**Actual endpoint: partial core play.** Entered **1-1 Playing it Straight**, experienced a visible timing error, restarted with Space, and exited to the menu. The tutorial track was **not completed**. No audio was heard, so this is not evidence about musical satisfaction, intended rhythm difficulty, or calibration quality.

## Method and assistance

The first calibration screen was entered and exited with Escape without submitting rhythmic samples. This avoided repeating the earlier session's unvalidated calibration inputs; it does not establish a correct default offset. The same task-scoped, TLS-verified transport described in the [method record](../README.md) was used.

All interaction used normal keyboard/mouse input and screenshots. Menu navigation was assisted by detecting coloured planets in rendered screenshots and submitting Space as the visible orbit approached a chosen tile. Reduced screenshot regions and Chromium's screenshot API reduced observation delay. This was external image observation: no game state, level identifier, progression variable, save field, source-level completion function or timing rule was inspected or altered. Assisted navigation is not unaided human play.

`inputs.jsonl` preserves 73 chronological records of actual key submissions, visual observations and capture checkpoints. Initial page loading and the first calibration exit occurred before the logger was installed. The first logged input was at 08:00:24Z; the final menu capture was at 08:13:35Z. The capture ledger records all 27 screenshots with timestamps, hashes and retention status. Eight key images remain here; repetitive intermediates are in task scratch storage. No browser script errors were recorded; that does not validate performance.

## Full observed journey

| Stage and player intent | Actual action and feedback | Interpretation and limit |
| --- | --- | --- |
| Arrive and enter without another unvalidated calibration | Opened the public page, clicked Run game, entered calibration and escaped. Menu showed Highest Level Reached 0. [Menu](captures/02-menu-default-calibration.png) | The browser demo exposes calibration before track play. This session did not establish a reliable audio offset. |
| Learn movement and aim for World 1 | A visually aimed Space produced a red flash while staying at the starting tile. The filename `03-first-tile` is misleading: this image records that failed attempt. [Error](captures/03-first-tile.png) | Timing has consequences even while selecting a world. Screenshot latency confounds any claim that a person would find this difficult. |
| Recover and make progress through the menu | Compensating for observed screenshot delay moved to the adjacent tile. Further inputs climbed toward the World 1 row; one intended rightward move went downward, followed by correction using fresh screenshots. [First successful move](captures/04-timing-compensation.png) | Actual movement provides feedback for adjustment. This was assisted control, not measured human learning. |
| Reach actual core play | Continuing visible menu navigation reached the World 1 endpoint at about 08:06:27Z. The scene changed to **1-1 Playing it Straight**, a row of tiles, two planets, an end marker and a countdown. [Track entry](captures/09-menu-endpoint-attempt.png) | This closes the first session's core-entry gap. Entering a track does not complete it. |
| Miss the timing window | While observing through screenshots, the track collapsed into a small horizontal line. [Collapsed track](captures/10-first-track-error.png) | Lack of timely input produced an observable failed attempt. There was no completion scene. |
| Retry and test a fixed input cadence | Space restored the track and countdown. A trial with the first further press after about 3.4 seconds and subsequent 500 ms intervals produced a particle burst/track collapse, followed by another restart. [Retry countdown](captures/11-retry-input.png) | Retry is available through the same input. The programmed cadence is assistance; it is not natural human timing or a known correct beat. |
| Make one bounded recovery attempt | A second trial delayed the first further press about 4.2 seconds, then used 500 ms intervals. The screen visibly showed **Late!!** and a red background. Intermediate presses also produced another countdown. [Explicit timing error](captures/14-bounded-retry-9.png) | This directly observes the error vocabulary. It does not establish the cause as game difficulty: absent audio, uncertain offset, headless rendering and capture delay remain confounds. |
| Leave after the bounded attempt | Escape returned to the menu, now showing **Highest Level Reached: 1**. The browser then closed cleanly. [Exit/menu](captures/15-exit-to-menu.png) | The label changed after entering 1-1. It is an entry/progress indicator here, **not proof of track completion**. Reload persistence was not tested in this follow-up. |

## What this adds to the three design questions

**Why might someone want to play?** The observed relationship between a single press, a moving orbit, explicit timing feedback and immediate retry supports a hypothesis of satisfaction from mastering a precise action. The audio-dependent part of that motivation remains unobserved; no claim about enjoyment or player demand follows from this agent session.

**How could Vivid differ on the browser platform?** ADOFAI's menu and track both require the core timing action. For Vivid's contemplative stories, make story entry and progression possible through patient, untimed actions, with a clear selected state and reversible placement. The contrast is a testable product choice, not a conclusion that timing gates are bad for rhythm games. Validate with human players on actual touch and keyboard devices.

**Which unusual experience could Vivid offer?** Let an object's first placement be a practical task, its worn edge later become narrative evidence, and its surviving placement on return become a personal trace. Reuse the physical action across different protagonists and stories while changing its meaning. This combination is a proposal to test; this sample cannot establish global uniqueness.

## Remaining evidence gaps and next test

A person with audible playback and measured calibration should complete this browser tutorial, record the first error and recovery, and describe whether the repeated action becomes satisfying or frustrating. Record device, input method, actual audio output, offset, completion and observed retry count; ask for reasons without prescribing an emotional answer. Full native ADOFAI and Rhythm Doctor remain unplayed. No historical gap is retroactively closed, and no paid edition's features or criticism are attributed to this browser demo.
