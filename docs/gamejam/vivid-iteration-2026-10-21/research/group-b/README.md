# Browser competitor observations: group B

Observed on 2026-10-21 by an agent, using Chromium 151 on Linux at 1280 × 800. These are direct UI observations with captures, not human participant sessions, consumer performance benchmarks, audio listening reports, or proof of market demand. Full native editions remain unplayed.

## Editions and goals

| Game | Exact edition | Intended endpoint |
| --- | --- | --- |
| We Become What We Behold | [Nicky Case's itch.io browser release](https://ncase.itch.io/wbwwb), iframe `https://html-classic.itch.zone/html/300364/index.html?v=1782253839` | First complete cycle, then different framing on re-entry |
| Townscaper | [Oskar Stålberg's browser demo](https://oskarstalberg.com/Townscaper/), page declares product version 0.23 | Intentional composition, revision, voluntary finish, exit/re-entry |
| A Dance of Fire and Ice | [fizzd's itch.io browser demo](https://fizzd.itch.io/a-dance-of-fire-and-ice), iframe `https://html-classic.itch.zone/html/1175401/index.html` | Calibration, natural error, recovery, completed track |

## Method and limits

The first direct navigations failed with `ERR_CERT_AUTHORITY_INVALID`. The managed environment has an HTTP proxy and a supplied CA, but Chromium's persistent trust store lacked that CA. Automatic approval review rejected importing the CA into the persistent store; that import was not performed. No certificate-ignore flag was used.

A task-scoped Playwright API transport subsequently fetched each public response through the existing proxy, with upstream TLS verification enabled and the supplied environment CA configured for that Node process only. Responses were passed to Chromium without altering game scripts, game state, progression, assets, or rules. This permits observing the public deployed games, but changes the delivery path and makes load times unsuitable as consumer measurements. The nonexistent `https://ncase.me/wbwwb/` returned 404; the creator's itch page was used instead. One itch request returned 429; a later manual reload succeeded.

Inputs were clicks, mouse movements, and keyboard presses. Screenshots were inspected between inputs. Because this introduces substantial delay when characters move, WBWWB later used visible-image colour targeting to aim the camera at hearts and a grey-haired character. This assistance is disclosed in its journey and must not be counted as unaided human play. No internal game state or source-level completion function was used. No audio was listened to. Screenshots were taken at actual observed stages; intermediate repeated captures are retained only in task scratch storage to keep repository size bounded.

Detailed journeys and their actual endpoints are in the individual records. Distinguish each observation from the design hypothesis derived from it. Human research is still necessary to establish enjoyment, comprehension, preference, accessibility, or comparative benefit.

## Preserve the original gaps

Event[0], TOEM, the full native Townscaper release, and Rhythm Doctor were not played in this work. Townscaper's browser task does not close the native-edition gap, and ADOFAI is a separate approved browser comparator, not a report of playing Rhythm Doctor. These records add evidence to the new six-game browser set; they do not rewrite the historical roster or retrospectively complete older observations.

## Additional sessions

The [ADOFAI isolated follow-up](adofai-followup/README.md) reached actual track 1-1, observed a visible timing error and retry, then exited. Its completed track endpoint remains open; the first session retains its original status.
