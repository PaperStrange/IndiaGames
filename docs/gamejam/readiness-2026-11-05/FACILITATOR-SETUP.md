# Bell · facilitator-machine setup

**Facilitator-only. Prepared, not booked or registered.** This guide operationalizes the [existing protocol](../milestone-2026-10-27/protocol.md); it changes no denominator, prompt, build, time limit or threshold. Keep these instructions and the diagnostic screenshots away from participants.

## 1. Staff and copy the blank forms privately

Name the coordinator, actual facilitator/observer, device tester and independent human reviewer. Arrange six fresh individuals. The reviewer must differ from every participant and observer. The owner needs more recruitment time; dates remain unconfirmed. Reserve approximately one hour per paired appointment plus administration and separate device/reviewer time; this is a staffing estimate, not a measured completion duration.

Copy the [blank roster](../launch-2026-11-20/roster-template.csv), [paired session sheet](../launch-2026-11-20/SESSION-RECORD.md), [manual checks](../launch-2026-11-20/MANUAL-CHECKS.md) and [decision record](../launch-2026-11-20/DECISION-RECORD.md) into a private folder **outside Git and outside either served build directory**. Agree consent, optional recording, access, withdrawal and deletion arrangements with the coordinator. Do not commit names, contacts, consent mappings or raw recordings.

## 2. Extract and verify the frozen comparison

Use a full-history IndiaGames clone. These commands do not switch the working branch or rebuild a candidate. Run in Bash from the clone root, and retain the printed private temporary-folder path for the server terminals:

```sh
git fetch origin master the-thirteenth-bell
BELL_STUDY_DIR="$(mktemp -d "${TMPDIR:-/tmp}/bell-private-study.XXXXXX")"
export BELL_STUDY_DIR
git archive 02c78ad9739622fb447850fbecb5f46e7dec8de8 release-candidates/thirteenth-bell/0.1.0 | tar -x -C "$BELL_STUDY_DIR"
git archive 56eec3e7d96410492ad70bf39b5eb5ae003feec8 docs/gamejam/milestone-2026-10-27/reference | tar -x -C "$BELL_STUDY_DIR"
python3 - <<'PY'
import hashlib, json, os
from pathlib import Path
root = Path(os.environ['BELL_STUDY_DIR'])
for folder, manifest_name, build_folder in [
    ('release-candidates/thirteenth-bell/0.1.0', 'candidate.json', 'build'),
    ('docs/gamejam/milestone-2026-10-27/reference', 'manifest.json', '.'),
]:
    packet = root / folder
    manifest = json.loads((packet / manifest_name).read_text())
    build = packet / build_folder
    files = {p.relative_to(build).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
             for p in build.rglob('*') if p.is_file() and p.name != 'manifest.json'}
    digest = hashlib.sha256(json.dumps(files, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    assert files == manifest['build']['files'], folder + ': file mismatch'
    assert digest == manifest['build']['sha256'], folder + ': inventory mismatch'
    print(folder, digest)
print('Private study folder:', root)
PY
```

Expected candidate inventory: `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e`; reference inventory: `47793d0ebc1801226a6b1f1e4fc11fb056d632c54919f179b91e14520c54fda8`. Stop on any extraction or assertion error. Preserve a failed setup record; do not edit frozen files to make hashes match. The dated packet commit is an immutable ancestor of `master`, not an instruction to move any branch backwards.

## 3. Serve two builds on the facilitator's computer

In each server terminal, set `BELL_STUDY_DIR` to the exact private folder printed above. Then run one command per terminal:

```sh
python3 -m http.server 8113 --bind 127.0.0.1 --directory "$BELL_STUDY_DIR/release-candidates/thirteenth-bell/0.1.0/build"
```

```sh
python3 -m http.server 8114 --bind 127.0.0.1 --directory "$BELL_STUDY_DIR/docs/gamejam/milestone-2026-10-27/reference"
```

Candidate: `http://127.0.0.1:8113/`. Reference: `http://127.0.0.1:8114/`. If a port is occupied, choose a free port and record the actual URL. Open on **that same computer**, verify both load, choose **Try GameJam / Contrast**, then **Step into Bellweather**. A GitHub source page is not a playable URL. Stop both owned servers with Ctrl+C after the session block.

Preflight before the participant arrives: verify Contrast/loop 1/Dawn, a visible action/resolution and a fresh reload. Keep the smoke route private. Reload deliberately discards the run; it is not a recovery/save function. After preflight, close its tab and open a fresh run for the participant. Keep one active game tab, hide the other build and switcher instructions until its turn. Original remains inspection-only, not the comparison build.

The reference retains an optional remote Google Fonts request. Record actual failures and fallback appearance without intercepting or modifying it. A failed required game resource or inaccessible control pauses testing. Ask the study/review owner to adjudicate a materially confounding reference appearance/access failure before proceeding; never silently hide it.

## 4. Verify physical-phone access separately

`127.0.0.1` on a phone means the phone, not the facilitator's computer. The desktop setup does **not** establish a physical-phone pass. Device QA must arrange a trusted local-network route to the same immutable build, bind the static server to the facilitator computer's actual private LAN address, and use that address from the phone. Serve only the build directory; never serve the private records folder. Record the actual URL, computer/firewall setup, phone, OS, browser and result. Do not use an unapproved public tunnel or treat desktop viewport emulation as a substitute. If no reachable physical device is available, leave that gate pending.

## 5. Register first; observe without teaching

Before any human play, register six ordered session IDs, six distinct participant pseudonyms, both inventory hashes, actual device/URL, UTC registration and planned order privately. The table below is **an order plan, not registered sessions or attendance**:

| Slot | First build | Second build |
|---|---|---|
| 1 | Previous Contrast | Candidate Contrast |
| 2 | Candidate Contrast | Previous Contrast |
| 3 | Previous Contrast | Candidate Contrast |
| 4 | Candidate Contrast | Previous Contrast |
| 5 | Previous Contrast | Candidate Contrast |
| 6 | Candidate Contrast | Previous Contrast |

Read only: **“Explore the town and try to understand what your actions change. You can stop at any time.”** No solution demonstration, route directions, forecast answers or earned-action explanation. At a naturally chosen decision ask “What do you expect to happen, and why?” **before** its result; ask what the action costs without supplying an answer. Record help verbatim and retain assisted, stopped, failed and unavailable attempts. Do not replace an unfavorable result with another person.

Use an external clock for the **20-minute maximum per build**. Record actual run-end time even if incomplete. Hide the game and do unrelated neutral activity for **at least 120 seconds**, with no game discussion or feedback; record break start/end and recall time. Then ask “What changed in the town because of something you did?” **Finish that recall before exposing the second build.** Repeat the break and recall after the second run. The game's elapsed timer does not enforce either protocol interval. No automated timer reading proves a human neutral break occurred.

## 6. Adjudicate and hand over

Keep candidate and reference observations separate and report candidate totals plus both first-build groups of three. Preserve the existing thresholds: ≥4/6 each both explain cause and predict before outcome; ≥4/6 each both earn the action uncoached and explain that Fracture can still end the day; ≥3/6 recall Mina's specific changed outcome after the neutral break. Short-delay recall and optional immediate retry are not retention measures.

Complete the physical-device, keyboard/accessibility and critical-defect checks. Map only the six genuine candidate sessions to the [canonical JSON form](../milestone-2026-10-27/session-template.json); retain paired raw observations privately for the reviewer. Approval stays false until the independent human inspects the evidence and plays the exact candidate. A critical failure pauses sessions; retain failed records and refreeze/review changed bytes under a new version.

No sessions are booked here. Keep the November 11 freeze and November 16 go/no-go boundaries: if required evidence or approval cannot fit, report a later date rather than shortening the gate. The candidate remains on `master` until approved promotion.
