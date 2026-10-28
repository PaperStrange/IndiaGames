# Vivid: human playtests and the 20 November launch

Prepared **28 October 2026** for `vivid-2.5d-photo-game`; release ID `keepers-frame`. Target: a browser launch on **20 November 2026**, conditional on actual human results, physical-device checks, independent approval and verified hosting. This packet contains **no completed sessions or approvals**. The October 21 study protocol and October 27 frozen artifact remain authoritative.

## Use this packet

1. The human coordinator assigns a facilitator and an independent reviewer, then completes the [playtest checklist](PLAYTEST-CHECKLIST.md). Staffing and recruitment remain pending; this document sends no invitations.
2. Register the required six Iona and six different Mara participants before play using a private copy of the header-only [session register](session-register.csv). Use the existing [canonical protocol](../vivid-iteration-2026-10-21/human-study/protocol.md) and [facilitator script](../vivid-iteration-2026-10-21/human-study/facilitator.md).
3. Copy the [blank session record](SESSION-RECORD.md) for each actual attempt. It collects the full journey, assistance, player words and release-field mapping. Keep raw and identifying material outside Git, preferably in the coordinator-controlled `/workspace/indiagames-human-playtests/keepers-frame/` or an agreed private store. If a local repo-side folder is necessary, use ignored `playtest-private/` and never force-add it. Publish only reviewed, permitted deidentified evidence.
4. Record real-device results with the [existing device form](../milestone-2026-10-27/journey-and-device-form.md); track problems in a private copy of the header-only [issue register](issue-register.csv).
5. Use the [dated iteration plan](NEXT-ITERATION.md) to decide whether to retain 0.1.2, revise it or postpone. A deadline does not lower the gate.

## Test exactly this build first

| Identity | Frozen value |
|---|---|
| Candidate | `keepers-frame/0.1.2` |
| Source commit | `0c72da97994d9f2d315e6aba1afba5219936b78b` |
| Immutable master packet commit | `f9488e5079d1d193caef560d1fe72936add6cba3` |
| Path | `release-candidates/keepers-frame/0.1.2/` |
| Inventory SHA-256 | `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4` |
| Contents | 15 files, 1,401,263 bytes; Iona and Mara |

Use the [verified export and launch instructions](../milestone-2026-10-27/launch-and-session-setup.md). Export committed bytes and serve them from a separate directory. Do not rebuild during the pilot or let switching the shared checkout change the served game. This digest covers the sorted file inventory, not a ZIP. Historical automated results keep their original dates; they are not human observations.

## Decisions the pilot must support

- **Why play?** Look for the specific action or discovery that makes someone want to continue, alongside the moment they want to leave. Record their account, rather than infer enjoyment from completion.
- **Why choose it in a browser catalogue?** Test whether a brief, local-asset story is understandable from entry and whether the player can name a meaningful difference from a familiar experience. A participant's comparison is their opinion, not new competitor verification.
- **What distinctive experience survives contact with players?** Iona asks whether a performed act of care and a later remembered choice are intelligible. Mara asks whether arranging objects lets a player discover a possible future without a correct emotional answer. Specific action-to-consequence explanations support this promise; generic praise or a remembered picture alone do not.

Required thresholds: Iona at least **4/6 joint unaided completions and choice-to-return explanations**, with **at most 1/6 unrestricted-AI expectations**; Mara at least **4/6 joint unaided completions and action-to-visible-consequence explanations**. Keep all first-six attempts. The optional neutral cohort and optional 48–72-hour prompted recall cannot rescue a failed required story. Zero open critical bugs, independent human approval and the separate [policy review](https://github.com/PaperStrange/IndiaGames/pull/1) remain necessary. No official release or working Pages URL is asserted here.
