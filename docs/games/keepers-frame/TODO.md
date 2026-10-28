# Vivid — implemented stories and remaining release work

## Next iteration · launch target 20 November 2026

Use the [game-specific human test list, blank records and iteration plan](https://github.com/PaperStrange/IndiaGames/blob/a63834557de0a8132ce5355c0d50858e200a3914/docs/gamejam/launch-2026-11-20/README.md), alongside the [cross-game launch calendar](../../launch/2026-11-20/README.md). Candidate freeze: **11 November**; go/no-go: **16 November**. Human roles and results remain pending. This schedule adds no completed gameplay or human-validation claims; existing task status and evidence below remain authoritative.

## Current milestone · 27 October 2026

Prepare separate Iona and Mara sessions against the exact existing 0.1.2 candidate. Its runtime and historical QA are unchanged. The operational packet supplements the canonical October 21 protocol; physical-device observations, both human cohorts and separate policy review remain pending.

[Current playtest packet](https://github.com/PaperStrange/IndiaGames/blob/545a867fe0d6b1fe2555526e2b48278b96372f9a/docs/gamejam/milestone-2026-10-27/README.md) · [Team milestone](../../milestones/2026-10-27.md) · [Current task status](tasks.json)

The current packet reconciles the October 22 research uploads with edition, substitution and partial-journey limits. Underlying play dates remain explicit. The detailed baseline below is retained for design rationale and acceptance criteria; its historical coverage/status statements do not replace the current packet, task JSON or source manifest. No human facilitator or independent reviewer is assigned.

## Preserved design rationale and acceptance criteria

Updated **21 October 2026**. Vivid now contains two playable stories on `vivid-2.5d-photo-game`: **A Place for the Promise** and **The Unfinished Postcard**. The technical release ID remains `keepers-frame`; this is one of the same three game projects. **Candidate 0.1.2 is staged on master. There is no official release and there are zero human participant results.**

The user approved a multi-day iteration with a tactile 3D frame, painted art, narrative methods informed by developer accounts of *What Remains of Edith Finch*, replaceable protagonists and a second story with a different structure. This supersedes the earlier return-only restrictions. The [accepted decision](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/docs/gamejam/vivid-iteration-2026-10-21/DECISION.md), [implementation](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/vivid-2.5d-photo-game/play/README.md) and [authoring contract](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/vivid-2.5d-photo-game/play/src/stories/README.md) are pinned. The [20 October review](https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/vivid-next.md) remains historical evidence.

## What a player can now do

| Story | Implemented journey | Meaning to test with people |
|---|---|---|
| **A Place for the Promise** | Lean around Iona's frame, collect both harbour marks, safely retry a signal and bring the ferry home. In **The Worn Notch**, brace a lamp shade and fit a wedge during an explicitly earlier watch. Return to the present, keep the letter private or approve a dedication, then place the corresponding object on a later visit. | Does performing a specific act of care change what the player understands about the worn frame? Can they explain why the earlier choice changes the return action? |
| **The Unfinished Postcard** | Inspect Mara's cancelled timetable, paint-marked postcard and drawings in any order. Align the sheets on a lightbox to reveal a community workshop in the closed station; choose an interpretation without a correct-answer score. | Does arranging evidence let the player discover a hopeful intention through their own action? Can they explain the visible consequence? |

Iona's privacy and public-recognition routes receive equal warmth. A premature peek remains acknowledged. New public sharing authorizes a dedication; a legacy `keepers-frame:v1` archive save truthfully remembers that the old ending published the letter. Completed saves go to the return, not another compulsory rescue. The neutral study condition uses the same first rescue/recollection, followed by a routine cloth placement with no reference to the earlier choice.

Both stories have keyboard and click/tap equivalents for dragging. Camera movement previews a bounded view; it never awards success. OS/manual reduced motion and complete flat illustration mode preserve the same rules. Progress is local to each story/profile, with explicit recovery and forgetting. No accounts, unrestricted AI dialogue, voice service or player-photo upload are implemented. Displayed durations are authored estimates, not measured human times.

## Three product answers remain hypotheses

| Question | Current design answer | What could refute it? |
|---|---|---|
| **Why play?** | A brief, quiet visit makes curiosity useful: steady a frightened keeper's lamp or recognize an unfinished invitation in an empty station. | Players feel that the inputs add nothing to the prose, cannot explain a consequence or leave before finding a meaningful action. |
| **Why choose it on a browser-game platform?** | Immediate local-asset entry, no account and a short anthology whose stories use different physical actions may reduce commitment while retaining specificity. | Established browser stories or making games deliver the same payoff with clearer controls or less friction. Browser access and parallax alone do not differentiate it. |
| **What distinctive experience could it offer?** | A place visibly remembers the consequence of care: privacy and public recognition leave different objects in Iona's world. Mara demonstrates a separate form of discovery through arranging a future place. | People remember only the picture, cannot connect action and change, or find the neutral return equally meaningful. No global uniqueness claim follows from this prototype. |

## Work by perspective

The [machine-readable cards](tasks.json) carry detailed acceptance criteria, dependencies, coding-agent assignments and immutable source links. **Done means a deliverable is implemented or prepared; it never means the game is human-approved.** Human facilitator/reviewer roles remain unstaffed.

| IDs | Perspective | Current state and next responsibility |
|---|---|---|
| **KF-01, 03** | Product and systems | Approved direction and Iona state/journey contract implemented. Keep product hypotheses falsifiable. |
| **KF-02** | Competitor research | Active follow-ups: six core-play records and qualified synthesis are reconciled. Finish Six Cats, WBWWB and ADOFAI endpoints; preserve the partials. |
| **KF-04, 08** | Narrative and Iona implementation | Authored recollection, consent, both histories and persistent return implemented. Human meaning/comprehension remains open. |
| **KF-05, 09** | Art and frontend | Original Blender props, painted layers, 3D/flat views, gallery and shared controls implemented. Keep presentation subordinate to semantic state. |
| **KF-06, 07** | Accessibility and saves | Equivalent controls, cancellation, profile isolation, migration and explicit recovery implemented; real-device checks remain separate. |
| **KF-10** | Automated QA | Done: 51 unit tests and 16 browser scenarios on 0.1.2 passed. Earlier 10 input/lifecycle and 9 art checks remain supporting evidence; dates and scopes are preserved. |
| **KF-11, 14** | Study preparation and team production | Recruitment/protocol sheets and disjoint agent ownership are prepared. Preparation recruited nobody and generated no participant results. |
| **KF-12, 13** | Human research | Blocked: run separate story cohorts; optional predeclared 48–72-hour prompted recall is not retention. |
| **KF-15, 17** | Packaging and staging | Done: 0.1.2 includes dependency notices and pack-owned scene labels, with verified build hash/master SHA. 0.1.0 and 0.1.1 are preserved unchanged. |
| **KF-16** | Product decision | Conditional: advance, revise or stop only after actual observations; one story cannot compensate for another failing the shipping gate. |
| **KF-18, 19** | Human review and release | Human approval pending; official promotion remains conditional. Main's official registry is empty. |
| **KF-20, 21** | Flexible architecture and second story | Pack contract, validation, recast fixture, story-owned captions/accessible labels and Mara's independent investigation/alignment structure implemented. |
| **KF-22** | Release policy | Active: [PR #1](https://github.com/PaperStrange/IndiaGames/pull/1) awaits separate independent review before any promotion. It is not merged; policy work is not game approval. |
| **KF-23** | Physical performance and accessibility | Blocked: measure real phones and human screen-reader use; headless emulation is not physical-device evidence. |

The [team contract](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/docs/gamejam/vivid-iteration-2026-10-21/TEAM-CONTRACT.md) records separate story, runtime, art, UI, research and release ownership. One coordinator integrates cross-cutting changes. Source checkpoints stay on the Vivid branch; master receives versioned build packets; policy changes are reviewed independently from game promotion.

## Research roster and preserved gaps

The approved browser roster changes the inaccessible-native plan without pretending those original studies occurred. **Six titles have core gameplay across five families; three declared units completed and three remain partial.** Read the [journey ledger](https://github.com/PaperStrange/IndiaGames/blob/931118f19f22cee53d82a0248e0e073aa1551252/docs/gamejam/vivid-iteration-2026-10-21/research/README.md), [counts](https://github.com/PaperStrange/IndiaGames/blob/931118f19f22cee53d82a0248e0e073aa1551252/docs/gamejam/vivid-iteration-2026-10-21/research/coverage.json) and [answers to the three product questions](https://github.com/PaperStrange/IndiaGames/blob/931118f19f22cee53d82a0248e0e073aa1551252/docs/gamejam/vivid-iteration-2026-10-21/research/SYNTHESIS.md). Sort the Court's two-day loop, Anxiety's one full path and Townscaper's composition/re-entry task reached their declared endpoints; Six Cats' rescue, WBWWB's full cycle and ADOFAI's tutorial remain open. These are different observation units, not six completed games. Keep historical partials and their dates; count neither a title screen nor a critic article as firsthand core play.

| Browser comparator | Family and comparison question |
|---|---|
| **Sort the Court! — updated Poki edition** | Decision/management: request, later consequence, resolved milestone and re-entry. Older itch sessions remain separate. |
| **Six Cats Under — original HTML5** | Indirect puzzle: purposeful helping, recovery, rescue/ending and restart. |
| **Adventures With Anxiety — browser edition** | Interactive narrative: viewpoint, dialogue choices, completion and re-entry. |
| **We Become What We Behold — browser edition** | Interactive narrative: framing, system feedback, a complete cycle and another framing attempt. |
| **Townscaper — browser demo** | Creative construction: intended composition, revision, chosen stopping point and re-entry. This is not the full native edition. |
| **A Dance of Fire and Ice — browser demo** | Rhythm action: calibration, natural errors, recovery and a completed track if actually reached. Do not claim heard audio without listening. |

This selection spans five broad families, including management, construction and rhythm outside narrative/deduction. **Event[0], TOEM, full native Townscaper and Rhythm Doctor remain unplayed native gaps.** Sources and criticism contextualize observations; they do not supply missing play. The Little Prince reference received a bounded access/interaction check, and Edith Finch informed methodology through developer sources rather than a claimed playthrough.

## Human criteria and delivery boundary

Use the [prepared protocol](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/docs/gamejam/vivid-iteration-2026-10-21/human-study/protocol.md), [recruitment plan](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/docs/gamejam/vivid-iteration-2026-10-21/human-study/recruitment.md) and [empty observation sheets](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/docs/gamejam/vivid-iteration-2026-10-21/human-study/observation-sheet.md). Target 18 fresh people: six Iona remembered, six Iona neutral and six Mara. Release needs at least the two separate six-person shipping cohorts; no neutral cohort means no comparative claim.

- **Iona:** at least 4/6 people each both complete unassisted and explain choice-to-return causality; at most 1/6 expects unrestricted AI interaction.
- **Mara:** at least 4/6 people each both complete unassisted and explain an action-to-visible-consequence connection. Emotional interpretation is not graded.
- **Both:** include all predeclared attempts, distinct cohorts, the same exact build hash, zero open critical bugs and an independent real human reviewer who also plays the candidate. Automation cannot authenticate participants or approve their experiences.
- **Devices:** target ≤8 MiB cold load, ≤100,000 active triangles, DPR ≤1.5 and 30 FPS on physical phones. The 0.1.2 build contains 1,401,263 bytes across 15 files (about 1.336 MiB), and each scene has fewer than 7,000 triangles. Physical-phone FPS, reading comfort and actual screen-reader operation remain unknown.

Candidate **0.1.2** is pinned at [master `f9488e50`](https://github.com/PaperStrange/IndiaGames/tree/f9488e5079d1d193caef560d1fe72936add6cba3/release-candidates/keepers-frame/0.1.2). Its [16-scenario browser recheck](https://github.com/PaperStrange/IndiaGames/blob/76eb93eacb001808a0fc66c9bdb25f740d76c441/vivid-2.5d-photo-game/play/evidence/iteration-2026-10-21T08-12-07-932Z/browser-observations.json) and [15-file served-artifact verification](https://github.com/PaperStrange/IndiaGames/blob/76eb93eacb001808a0fc66c9bdb25f740d76c441/vivid-2.5d-photo-game/play/evidence/iteration-2026-10-21T08-12-07-932Z/artifact-verification.json) passed. Build hash: `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4`. The 0.1.0 packet and 0.1.1 license-notice revision remain unchanged. Version 0.1.2 moves setting-specific captions and accessible labels into packs, preserving existing text, saves and choices. All three packets pass staging integrity checks; none has human approval.

Serve the exact selected master artifact locally or on an agreed trusted LAN for manual testing. Do not assume a master Pages deployment. If either story fails or evidence remains incomplete, the anthology stays staged. After separate policy review and human approval, promote only that packet to main and verify the version tag, release notes and deployed URL. **No official game release, human pass or physical-device pass is claimed.** The project dashboard is now live from main/root following the owner’s manual Pages switch; see [current publication status](../../PUBLISHING.md). The earlier October 21 publication limits above retain their historical date.
