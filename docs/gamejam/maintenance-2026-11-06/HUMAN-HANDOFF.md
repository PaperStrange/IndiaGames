# Vivid 0.1.4 · human-study handoff

**Prepared, not booked or approved.** This handoff selects the new metadata-corrected artifact. It does not register participants or supersede the canonical protocol. Engineering continues while recruitment is pending; official release still needs both required cohorts and independent human approval.

| Identity | Required value |
|---|---|
| Game / version | `keepers-frame/0.1.4`, containing both Iona and Mara |
| Build inventory | `a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1` |
| Files / bytes | 15 / 1,401,606 |
| Implementation commit | Read the full `source_commit` from the reviewed, exported `candidate.json`; the integrator binds it after committing the implementation |
| Master commit | Record the full immutable master SHA containing the reviewed packet before preregistration |
| Readiness | Human cohorts, physical devices, critical-bug adjudication and independent approval pending |

The badge should now say **“Work in progress · 0.1.4”**. Its agreement is a useful setup check; the complete inventory remains the exact-artifact identity. Older 0.1.3 reports keep their old hash and are not relabelled as 0.1.4 human evidence.

## Extract the reviewed packet, then verify it

The integrator must stage the packet before these commands can succeed. Until the version exists on master and passes the inventory check, leave the study setup pending. Use a full-history repository clone and Bash; stop on any error. This reads committed Git objects without changing the working branch or building from uncommitted source:

```sh
set -euo pipefail
git fetch origin master
VIVID_STAGING_SHA=$(git rev-parse origin/master)
git cat-file -e "$VIVID_STAGING_SHA:release-candidates/keepers-frame/0.1.4/candidate.json"
VIVID_STUDY_ROOT=$(mktemp -d)
git archive "$VIVID_STAGING_SHA" release-candidates/keepers-frame/0.1.4 | tar -x -C "$VIVID_STUDY_ROOT"
python3 - "$VIVID_STUDY_ROOT/release-candidates/keepers-frame/0.1.4" "$VIVID_STAGING_SHA" <<'PY'
from pathlib import Path
import hashlib, json, re, sys
packet = Path(sys.argv[1])
manifest = json.loads((packet / 'candidate.json').read_text())
assert manifest['game'] == 'keepers-frame' and manifest['version'] == '0.1.4'
assert re.fullmatch(r'[0-9a-f]{40}', manifest['source_commit'])
build = packet / 'build'
assert not any(path.is_symlink() for path in build.rglob('*'))
actual = {path.relative_to(build).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
          for path in sorted(build.rglob('*')) if path.is_file()}
digest = hashlib.sha256(json.dumps(actual, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
assert actual == manifest['build']['files']
assert digest == manifest['build']['sha256'] == 'a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1'
assert len(actual) == 15
assert 'Work in progress · 0.1.4' in (build / 'index.html').read_text()
print('Verified Vivid 0.1.4:', digest)
print('Implementation:', manifest['source_commit'])
print('Master packet:', sys.argv[2])
PY
python3 -m http.server 8080 --bind 127.0.0.1 --directory "$VIVID_STUDY_ROOT/release-candidates/keepers-frame/0.1.4/build"
```

Keep the printed identities with the private registration record. Stop the owned server with Ctrl-C after sessions. If port 8080 is occupied, stop the known server or select and record an available port; do not terminate another task's process. Serve only `build/`, never the consent or recordings folder.

| Required story | Same-machine route |
|---|---|
| Iona remembered | `http://127.0.0.1:8080/?profile=remembered#iona` |
| Mara remembered | `http://127.0.0.1:8080/?profile=remembered#mara` |

Verify the actual facilitator hardware and both entry pages before preregistration. Use a fresh browser profile for each person. Keep the same profile, host and port throughout Iona's scheduled return; changing origin or clearing storage changes the available memory. Record any intervention. Synthetic save/fault fixtures are not human-study inputs.

## Canonical forms and unchanged criteria

Copy the [protocol](../vivid-iteration-2026-10-21/human-study/protocol.md), [facilitator script](../vivid-iteration-2026-10-21/human-study/facilitator.md), [observation sheet](../vivid-iteration-2026-10-21/human-study/observation-sheet.md) and [session record](../launch-2026-11-20/SESSION-RECORD.md) into a private workspace outside Git and served directories. No roster is populated here.

- Register six fresh Iona people and six different Mara people, with separate first-six cohorts on this same build. Keep all assisted, abandoned and failed attempts.
- Iona has a 15-minute unaided limit including the scheduled same-session return and actual placement. The neutral return instruction remains “Please leave this story and open the same one once more.” Do not teach the relationship between the choice and return.
- Mara has a 10-minute unaided limit: inspect, align, reveal and choose any interpretation. Emotional interpretation is not graded.
- Iona needs at least 4/6 of the same people both to complete unassisted and explain choice → return; at most 1/6 may expect unrestricted AI. Mara needs at least 4/6 of the same people both to complete unassisted and explain action → visible consequence.
- Both need zero unresolved critical bugs and an independent human reviewer who plays the exact build and is neither participant nor observer. The reviewer inspects original observations rather than treating JSON booleans as authenticity evidence.
- Optional neutral and 48–72-hour recall studies remain optional, unbooked and separate from required release criteria. Scheduled return and prompted recall are not retention metrics.

## Physical devices and release decision

Loopback on a phone points to the phone. For actual phone checks, verify a private same-network route to the facilitator's machine and serve only the immutable build. Record the real URL, phone/OS/browser, input method and result. No public tunnel or candidate Pages repair is implied. Follow the [physical-device method](../vivid-iteration-2026-10-21/human-study/devices-and-recall.md); emulated 390px screenshots and headless rendering cannot supply a physical-device or numerical performance result.

Collect actual journeys, quotations and contradictory cases before interpreting motivation, differentiation or memorable action/consequence. Any required missing evidence at the November 16 go/no-go leaves this candidate on master; no story, cohort or recall interval is removed to reach November 20. The separate engineering milestone—clean build metadata, reproducible export and technical staging—can finish while recruitment remains unbooked.
