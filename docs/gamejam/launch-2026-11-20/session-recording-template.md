# Small Hours · blank human session record

**Template only. No participant, observation or result is represented by a blank.** Copy outside the Git checkout for an actual preregistered session. Use the [authoritative protocol](../milestone-2026-10-27/protocol.md) and [JSON session template](../milestone-2026-10-27/session.template.json); this sheet supplies the behavioral evidence for that JSON.

## Identity, preparation and actual timing

- Protocol ID / registration timestamp / preserved registration reference:
- Preregistered session ID / ordinal:
- Source commit / build SHA-256 / verified served URL / verification reference:
- Actual UTC date and start / end timestamps:
- Participant A / B pseudonyms; prior exposure to this game:
- Human observer pseudonym / method (`manual-in-person` or `manual-remote`):
- Consent confirmed privately / quote permission / accessibility arrangements:
- Device model / OS / browser and version / input / viewport and zoom:
- Pair context voluntarily offered (optional, no sensitive detail):
- Invitation supplied / first action / reveal / finish-or-stop timestamps:
- Loading/setup seconds / play seconds / seconds to reveal / debrief seconds:
- Scene selected / any scene changes:

## Actual player journey

Use timestamps or elapsed seconds and numbered observation IDs. Quote only with permission. A facial expression is an observation; “felt connected” is an interpretation unless the player actually said it. Add rows for detours and revisits. Leave unobserved stages blank and mark why.

| Observation ID / time | Stage / actual action or route | Player's words, if permitted | Visible response / consequence | Help, confusion, pause or exit | Observer interpretation / alternative explanation |
|---|---|---|---|---|---|
| | Entry and expectations | | | | |
| | Mutual willingness and scene choice | | | | |
| | A choice/prediction | | | | |
| | Handoff | | | | |
| | B choice/prediction | | | | |
| | Both-ready reveal | | | | |
| | Activity: A's contribution | | | | |
| | Activity: B's contribution | | | | |
| | Timer / change / optional writing | | | | |
| | Ending / spontaneous next action | | | | |
| | Exit or retry / debrief | | | | |

## Outcome and assistance evidence

Choose **true, false or unknown** for each; unknown maps to JSON `null`, never automatic false/true. Give observation IDs. `completed_at` records session end, not successful gameplay completion.

| Field | Actual value | Observation IDs and reason |
|---|---|---|
| `reached_reveal_unaided` | | |
| `both_contributed` | | |
| `voluntarily_saved_or_replayed` | | |

- A's creative contribution to the offscreen activity (not merely a click):
- B's creative contribution to the offscreen activity (not merely a click):
- Save/replay/leave chosen / spontaneous or prompted / both agreed:
- If save: attempted / file actually delivered / relevant host issue:
- If replay: selected / next activity actually started / final stopping point:

| Time | Help requested or volunteered | Exact help given | Effect / affected metric |
|---|---|---|---|
| | | | |

- Skipped stages, withdrawal, missing observations and reason if voluntarily offered:
- Actual stopping point and ability to leave comfortably:
- Issues: ID, impact, reproduction and severity awaiting human triage:
- Neutral debrief: what happened; each contribution; keep/change; unclear/uncomfortable:
- Evidence against the desired hypothesis / other explanations:
- Approved deidentified quote(s), if any; publication permission reference kept privately:
- Reviewer questions / uncertain coding to resolve from existing evidence:

## Shareable record check

- [ ] Contains only pseudonyms and minimal behavioral detail; no contact/consent key, personal text, keepsake or unintended screenshot content.
- [ ] Outcomes reflect this attempt; assistance and failures remain visible; no generated example has been copied as observation.
- [ ] Saved into the private study folder; only an explicitly reviewed deidentified copy is proposed for GitHub.
- [ ] Corresponding JSON record and session-index entry agree with this sheet. Unresolved unknowns remain null and block readiness where required.

For release aggregation, see [decision-template.md](decision-template.md#mapping-real-evidence-to-the-release-packet). Do not set human approval fields from this form automatically.
