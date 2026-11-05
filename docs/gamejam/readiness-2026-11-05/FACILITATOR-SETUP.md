# Small Hours — facilitator-machine setup and unblock checklist

**Current state: prepared, not booked.** The user chose all three game lanes in parallel and facilitator-machine access. Recruitment needs more time. No participant, facilitator, physical-device result or reviewer approval is implied by this guide.

## What the user/coordinator supplies

| Needed | Confirmation to provide | Present status |
|---|---|---|
| Facilitator | Accepted person, available session windows and actual test machine | Unassigned |
| Six willing pairs | Twelve distinct people; private contact/consent handling; availability | Unregistered / unbooked |
| Device tester | Shared computer/keyboard and at least one actual mobile/touch device; iPhone/Safari and Android/Chrome if those are to be claimed | Unassigned / physical coverage pending |
| Independent reviewer | A human separate from every participant and observer; time to play this exact artifact and inspect observations | Unassigned |
| Study schedule | Earliest realistic bookings; preserve the November 11 freeze and November 16 go/no-go cutoffs | Unconfirmed |

The canonical checklist suggests about 30 minutes per pair, plus setup/debrief and scheduling buffer. This is an appointment estimate, not measured play duration. If the required pilot/staging work cannot fit before freeze, report a later game date rather than compressing consent or observations.

## 1. Extract the frozen ZIP on the actual facilitator machine

Use [small-hours-baseline.zip](../milestone-2026-10-27/small-hours-baseline.zip) and [baseline-inventory.json](../milestone-2026-10-27/baseline-inventory.json). In a checkout of this game branch, use a fresh directory outside the checkout. Substitute your own destination for `/tmp/small-hours-study`:

```sh
python3 -m zipfile -e docs/gamejam/milestone-2026-10-27/small-hours-baseline.zip /tmp/small-hours-study/build
python3 -m http.server 8111 --bind 127.0.0.1 --directory /tmp/small-hours-study/build
```

Do not reuse a directory containing a different build. Keep the terminal/server open and open `http://127.0.0.1:8111/` in **that same machine's** browser. Two willing people share that machine; the game has no remote-partner feature. No JavaScript dependency installation is required. A GitHub source page and another machine's localhost are not participant play links. Do not use `file://` for this module-based build. Stop the owned server with Ctrl-C when finished.

Before play, verify the ZIP SHA-256 is `64ebb3bdfd69b4a643a06817cc023754e94fc114c5a812fae6fb111af1ad2fd2`, and verify every extracted file against the inventory. The eight-file inventory aggregate must be `fa4ca1930fc1964d929bca9704c5f0bba89dc9cc46208d34294a1e1ae5c458e3`. From the checkout, this read-only verifier can use a substituted build path:

```sh
python3 - /tmp/small-hours-study/build <<'PYVERIFY'
import hashlib, json, pathlib, sys
root = pathlib.Path(sys.argv[1])
expected = json.loads(pathlib.Path('docs/gamejam/milestone-2026-10-27/baseline-inventory.json').read_text())['build']
actual = {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
          for p in sorted(root.rglob('*')) if p.is_file()}
assert actual == expected['files'], 'Extracted files differ from frozen inventory'
aggregate = hashlib.sha256(json.dumps(actual, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
assert aggregate == expected['sha256']
print('Verified frozen build:', aggregate)
PYVERIFY
```

## 2. Verify the physical-phone route separately

Loopback only serves the facilitator machine. For a phone check, the device owner may serve **only the frozen build directory** on a trusted local network and open the facilitator's actual LAN address from the phone. For that agreed setup, replace the bind argument with `--bind 0.0.0.0`; record the exact address, model/OS/browser and result. Do not expose consent/contact files or a whole workspace. Network/firewall permissions and this physical route have not been checked here. A failed phone connection remains a setup blocker, not a completed mobile test. Public hosting and the older candidate Pages URL repair are outside this setup.

Before declaring an input/device supported, a person performs actual entry, keyboard or touch/virtual-keyboard flow, readable focus/text, SVG download **and open**, End & forget, and reload. Use the existing [device CSV](../launch-2026-11-20/device-checks.template.csv); browser emulation does not fill it. Saved SVGs remain on the device after session clearing.

## 3. Preregister and observe without teaching

Use the existing [canonical protocol](../milestone-2026-10-27/protocol.md), [registration JSON](../milestone-2026-10-27/study-registration.template.json), [human checklist](../launch-2026-11-20/human-playtest-checklist.md), [recording sheet](../launch-2026-11-20/session-recording-template.md) and [session JSON](../milestone-2026-10-27/session.template.json). No new protocol or schema replaces them.

Record the exact hash, actual host and ordered six session IDs **before first play**. Keep participants distinct, all attempted/assisted/abandoned sessions visible, and unknown outcomes blank/null. Read the canonical neutral opening verbatim and do not point out the reveal, save or replay controls. Observe the actual path, detours and offscreen contributions; do not populate a journey from the expected screen sequence. Keep quotes, observed behavior and interpretation distinct. Contact details, consent keys, raw recordings and personal keepsakes remain outside Git; media capture is optional and needs separate consent.

The unchanged criteria are **5/6 unaided reveals, 4/6 pairs with both contributing creatively to the offscreen activity, and 3/6 spontaneous saves/replays**. Typing/clicking alone does not establish creative contribution; an automated save does not establish willingness. Numerical passes do not waive critical privacy, exit or accessibility failures.

## 4. Hand over the decision

After all six registered attempts, complete the [decision sheet](../launch-2026-11-20/decision-template.md), preserving counterexamples. SH-06 selects at most one bounded correction, no change, further study or stop. Small Hours is still a baseline, not a staged candidate: SH-06, SH-10 and SH-12 remain prerequisites before SH-17. The reviewer determines whether complete preregistered pilot evidence can be reused for a byte-identical candidate; changed builds require new identity and build-specific validation. Zero unresolved critical bugs and independent human approval remain mandatory before official release.
