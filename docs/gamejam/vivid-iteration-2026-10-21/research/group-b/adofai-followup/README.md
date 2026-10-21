# ADOFAI follow-up: isolated core-entry attempt

Date: 2026-10-21 UTC. This is a new session after the [first partial record](../adofai.md), which remains unchanged. Same public itch browser demo, v0.4.2 December 2018. New isolated Chromium context, with Vivid's shared GPU verification finished. The initial calibration screen was entered and exited with Escape without submitting calibration taps, avoiding the first session's unvalidated offset inputs. Audio still was not heard; calibration correctness remains unverified.

The objective is to reach an actual track, observe an input error and recovery, and complete a bounded tutorial if possible. The session uses only normal keyboard/mouse input and screenshots. No game state, level identifier, progression variable, save field or completion function is inspected or changed.

## Assistance and evidence

Menu navigation is assisted by detecting coloured planets in screenshots and sending Space when the visible orbit approaches a chosen tile. Captures were reduced to the relevant region and later taken through Chromium's screenshot API to reduce automation delay. This remains external visible-image observation; it is not direct game-state access. Capture delay varies, so some intended moves land in a different direction or fail. Such errors are recorded as automation outcomes, not evidence of human difficulty or the game's responsiveness.

`inputs.jsonl` records subsequent actual key submissions, visual navigation observations and screenshot checkpoints. Initial page loading and the first calibration-screen exit occurred before that logger was installed. Captures document actual rendered screens. Assisted navigation success cannot be treated as unaided human completion.

## Journey so far

- Reopened the original public page in a fresh context, clicked Run game, entered then exited calibration without rhythmic samples.
- Reached the menu at Highest Level Reached 0.
- A first visually aimed input produced a red flash and stayed at the starting tile.
- Adjusting the timing of visible-image targeting reached the first adjacent tile.
- Three further observed inputs climbed to the World 1 row.
- A rightward attempt instead moved downward; the agent then used fresh rendered positions to correct its next input rather than modifying the game.

The final endpoint will be recorded below; the first partial report is not retroactively relabelled.
