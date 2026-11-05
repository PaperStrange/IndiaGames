# Vivid — facilitator-machine setup, 5 November 2026

**Prepared; no sessions booked or conducted.** All three game preparation lanes continue in parallel. The owner needs more recruitment time. The selected route is supervised play on a facilitator's machine, not a public candidate website. A source link is not a play link.

## Use the frozen two-story package

| Identity | Required value |
|---|---|
| Candidate | `keepers-frame/0.1.3`, both Iona and Mara |
| Implementation commit | `813f264400bfc01d7e3e5f668de29bb835f5a70d` |
| Immutable master commit | `2be5f3648fed5422eb4459486661385df73c91be` |
| Inventory SHA-256 | `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00` |
| Package | 15 build files; 1,401,316 bytes |

The candidate's page badge still says **“Work in progress · 0.1.2”**. This is a known metadata discrepancy, not the package identity. Use `candidate.json` and the full inventory above in session records. Do not edit the frozen badge. A future separately versioned build should correct the label and validate its agreement with the package version; it is not required to begin this candidate's study.

From a repository checkout containing the immutable master commit, export into a fresh directory. This reads Git objects without switching the shared checkout or rebuilding the game:

```sh
VIVID_STUDY_ROOT=$(mktemp -d)
git archive 2be5f3648fed5422eb4459486661385df73c91be release-candidates/keepers-frame/0.1.3 | tar -x -C "$VIVID_STUDY_ROOT"
python3 - "$VIVID_STUDY_ROOT/release-candidates/keepers-frame/0.1.3" <<'PY'
from pathlib import Path
import hashlib, json, sys
packet = Path(sys.argv[1])
manifest = json.loads((packet / 'candidate.json').read_text())
build = packet / 'build'
files = sorted(path for path in build.rglob('*') if path.is_file())
assert not any(path.is_symlink() for path in build.rglob('*'))
actual = {path.relative_to(build).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest() for path in files}
assert actual == manifest['build']['files']
digest = hashlib.sha256(json.dumps(actual, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
assert digest == manifest['build']['sha256'] == '7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00'
assert len(actual) == 15
print('Verified frozen Vivid 0.1.3:', digest)
PY
python3 -m http.server 8080 --bind 127.0.0.1 --directory "$VIVID_STUDY_ROOT/release-candidates/keepers-frame/0.1.3/build"
```

Stop the server with Ctrl-C after the session. Verify the actual route and both entry pages on the facilitator's hardware before registering participants. Record the full URL, browser version, artifact identity and setup-check UTC. The commands are a preparation recipe; their presence is not a result from a participant's machine.

| Required story | Local route |
|---|---|
| Iona remembered | `http://127.0.0.1:8080/?profile=remembered#iona` |
| Mara remembered | `http://127.0.0.1:8080/?profile=remembered#mara` |

Use a new isolated browser profile/context for each person. Confirm no previous `vivid:save:*` or legacy `keepers-frame:v1` record is present **before** play. Keep that same profile and origin throughout Iona's scheduled return: switching between `localhost` and `127.0.0.1`, changing the port, closing an incognito profile or clearing storage can remove access to the earlier memory. Never reset or recover a save midway through a scored attempt without recording the intervention. Do not use the synthetic fault fixtures from automated QA in a human session.

## Register privately before play

Use the [canonical protocol](../vivid-iteration-2026-10-21/human-study/protocol.md), [facilitator script](../vivid-iteration-2026-10-21/human-study/facilitator.md), [observation sheet](../vivid-iteration-2026-10-21/human-study/observation-sheet.md) and [blank session record](../launch-2026-11-20/SESSION-RECORD.md). Copy forms into the private study workspace. This document does not create session IDs or record attendance.

- Six fresh Iona individuals and six different fresh Mara individuals. Keep required cohorts on the same hashed build; record all six preregistered attempts, including abandoned, failed or assisted sessions.
- Iona: 15-minute unaided limit; endpoint includes the scheduled same-session return and performed placement. If needed, use exactly “Please leave this story and open the same one once more.” A scheduled return is not voluntary retention.
- Mara: 10-minute unaided limit; inspect, align, reveal, then choose any interpretation. Emotional interpretation is not graded.
- Iona threshold: at least 4/6 of the same people both complete unaided and explain choice → return; at most 1/6 expect unrestricted AI. Mara: at least 4/6 of the same people both complete unaided and explain action → visible consequence.
- Lock mandatory metrics before post-scoring design questions. The optional neutral cohort and 48–72-hour prompted recall are not scheduled, required or substitutes for a failed story.
- Keep consent, contacts, recordings and identity mappings outside Git. Publish only deliberately reviewed deidentified observations.

| Owner-supplied field | Status |
|---|---|
| Facilitator / coordinator / independent reviewer | Unassigned |
| Participant roster, cohort order and preregistration UTC | Pending; held privately |
| Actual local URL and hardware setup checks | Pending on facilitator's machine |
| Appointment slots and test/retest capacity | Unbooked |
| Consent, withdrawal arrangement and private evidence location | Pending |
| Physical-device checks and critical-bug assessment | Pending |

## Physical phones need their own verified route

`127.0.0.1` on a phone addresses the phone, not the facilitator's computer. For an owner-approved private LAN test, bind the server to the facilitator computer's actual trusted LAN interface and open that address from the phone on the same trusted network. Verify reachability and all assets before the session, then record the real URL. Do not expose this development server publicly or assume the paused candidate Pages URL has been repaired.

Follow the [physical-device method](../vivid-iteration-2026-10-21/human-study/devices-and-recall.md): real keyboard, touch alternatives, orientation, background/resume, save/return, readability and reduced motion. Record whether rendering is 3D or illustrated. A numerical 3D performance claim requires actual hardware instrumentation and three 30-second active-interaction samples; headless Chromium and emulated viewports cannot satisfy it. Our localhost QA supplies no physical-phone result.

## Decision and release boundary

No new story, art replacement or gameplay correction is selected from these technical checks. After genuine sessions, review player, narrative, interaction/art, systems and operator observations; retain contradictions and select at most one bounded correction, no change, further study or stop. Human interpretation of fun and the original three product questions remains pending.

November 11 candidate freeze, November 16 go/no-go and November 20 launch are conditional cut lines. An incomplete cohort, missing physical check, unresolved critical bug or absent independent human approval keeps the version on `master`. If bytes change, create a new immutable version and validate it separately. The November 4 agent-code-review exception does not substitute for human approval.
