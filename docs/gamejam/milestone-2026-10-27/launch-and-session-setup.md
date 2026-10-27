# Launch the unchanged Vivid 0.1.2 candidate

These instructions use an immutable package, not the current game branch's development server. Run from the IndiaGames repository with the pinned master commit available. If it is missing, fetch the repository normally; do not substitute another build. The export is outside the shared checkout, so another branch change cannot alter the served files.

```sh
python3 docs/gamejam/milestone-2026-10-27/prepare-vivid-pilot.py
python3 docs/gamejam/milestone-2026-10-27/prepare-vivid-pilot.py --output /tmp/vivid-pilot-0.1.2
python3 -m http.server 8114 --bind 127.0.0.1 --directory /tmp/vivid-pilot-0.1.2/build
```

The helper refuses to overwrite an existing directory. For a later repeat, choose a new output directory and serve that same directory. Do not rebuild the candidate. The first command verifies committed bytes; it does not prove browser operation, physical performance or a human result. Record a separate actual launch check before the first session: loaded URL, story title, missing assets/console errors, date and device. Check the direct route and a nested-host route if that will be the actual test host.

| Assignment | Local setup URL | JSON export template | Required endpoint |
|---|---|---|---|
| Iona remembered | `http://127.0.0.1:8114/?profile=remembered#iona` | [Iona blank](session-iona-blank.json) | First ending, scheduled same-session return, corresponding placement. |
| Mara | `http://127.0.0.1:8114/?profile=remembered#mara` | [Mara blank](session-mara-blank.json) | Any inspection order, alignment, workshop reveal, any interpretation ending. |
| Optional Iona neutral | `http://127.0.0.1:8114/?profile=neutral#iona` | [Neutral blank](session-iona-neutral-blank.json) | Same first story; return cloth placement. |

For a physical phone, the facilitator runs this artifact on a machine reachable on the same trusted LAN, binds the server to that machine's specific private LAN address and substitutes that address in the URL. A cloud `127.0.0.1` address cannot be opened from the phone. Record the actual host and URL; no public hosting or `master` Pages site is implied. Stop the owned server after the session block.

## Before each participant

Use a new browser profile/context dedicated to that person. It must have no legacy `keepers-frame:v1` record and no `vivid:save:<story>:<profile>` progress on the test origin. A new tab in an existing profile is not a clean context. Keep personal profiles and unrelated local storage untouched. Do not import a saved state or inject a completed state for a scored session.

Select the assigned route before the participant sees it. Verify the expected title: **A Place for the Promise** for Iona or **The Unfinished Postcard** for Mara. Keep profile assignment in the facilitator sheet; do not describe the expected remembered/neutral payoff to the player. Record browser, input, motion and 3D/flat settings. Built-in alternatives, hints and transcript are allowed; their use is an observation.

For an operator's dry run only, **Forget this story → Confirm: forget this story** resets the active story/profile; Escape cancels the confirmation. It does not reset every story/profile. Prefer a fresh context for actual new participants so hidden or older records cannot leak across assignments. If storage fails, preserve the warning and report the actual failure; do not silently repair the participant's attempt.

## Iona procedure

Use the canonical opening script and expectation question. Observe rescue, earlier-watch recollection, the privacy/public-recognition choice and first ending without teaching the sequence. Unless the player already returned spontaneously, say only: **“Please leave this story and open the same one once more.”** Keep the same context, origin and profile through this return. Do not use Forget, clear site data, close an ephemeral context, change ports or switch to the other study profile mid-session. Those actions can destroy or isolate the needed memory.

Record whether return was spontaneous or scheduled. Ask the existing causal question only after the return task. Limit scored unaided gameplay to 15 minutes within the 25-minute study budget, including consent/debrief. These are study limits, not claimed typical play times. Keep the same procedure for neutral Iona without teaching the cloth task.

## Mara procedure

Open Mara in its own fresh assigned context. Let the player choose object order, use any exposed alignment control and choose any ending interpretation. Do not point to an alignment notch or imply a preferred emotional answer. Ask **“Describe one thing you changed and what you could see change because of it.”** after scored play. There is no scheduled return requirement. Limit scored unaided gameplay to 10 minutes within the 20-minute study budget.

## Close and export

Lock observations before demonstrating alternate routes. Keep the exact words and timing of any help. A blank template contains `null` metrics because no person has played; after an actual attempt use the protocol's evidence-based booleans, including false for assistance, abandonment or an unobserved explanation. A no-show is not a completed false session: retain it as missing and keep the gate pending.

The templates retain the existing `session.vivid.json` fields. Place completed deidentified sessions into their matching `story_reports` (or optional neutral `study_reports`) in a working copy of the schema-v2 report. Preserve its artifact hash and catalog profiles. The independent reviewer resolves disputed coding and personally plays this artifact; the software cannot establish that a person really did so.
