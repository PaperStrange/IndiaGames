# Human-tested releases: game branches → master → main

`master` is the release-candidate staging branch. Preserve its earlier prototype history. Each game continues development on its own branch; export a browser build to `master` for manual human playtests. `main` is the official release hub and receives only a selected approved package. **There are currently no official game releases.** The empty `data/releases.json` is intentional.

An automated check can establish file identity, recorded counts and consistency. It cannot prove that a participant, observer, observation or approval is authentic. A human must review the original observations and actually play the submitted build before approving its promotion. Generated personas, agent/browser automation, walkthroughs and invented reactions do not count as human playtests.

## Fixed pilot criteria

These are provisional product acceptance criteria from the current plans, not estimates of population conversion or statistical proof. Before testing, register exactly six session IDs for each required cohort on the frozen build, in order. Report all six attempts, including abandonment and failed attempts, without replacing unfavorable results. `completed_at` means the session ended, not that gameplay succeeded. Use distinct participants: six pairs / twelve people for Small Hours; six people for Bell; six people for each of Vivid's two stories (twelve total), with a separate optional six-person neutral cohort. Any exclusion or protocol change requires an explicitly reviewed new protocol before another run. Do not cherry-pick six successes from a larger denominator. Keep all observations, including failures, available to the human reviewer.

| Game | Required observations on the same candidate build |
|---|---|
| Small Hours | At least 5/6 pairs reach the reveal unaided; 4/6 pairs both contribute; 3/6 pairs voluntarily save or replay. |
| Vivid / Iona: A Place for the Promise | At least 4/6 players each both complete unassisted **and** explain how a choice changes a return action. At most 1/6 expects unrestricted AI; two or more is a recurring false expectation and fails. |
| Vivid / Mara: The Unfinished Postcard | At least 4/6 players each both complete unassisted **and** explain how their action changes a visible consequence. Emotional interpretation is not graded. |
| Thirteenth Bell | At least 4/6 players both explain cause **and** predict before the outcome; 4/6 both earn the action uncoached **and** explain Fracture; 3/6 recall a specific Mina outcome after a predeclared neutral break of at least two minutes. This measures short delayed recall, not day-two retention. |

All games require zero open critical bugs. A critical bug blocks completion, corrupts/loses required state, or prevents the promised player action. Humans classify severity and verify fixes. The gate checks the recorded zero; it does not discover all bugs. Changing any build byte invalidates the report's build identity and requires a new recorded test run. Record only deidentified participant IDs and concise behavioral notes in the release repository; retain consented raw evidence outside the public packet.

## Vivid is one release containing two reviewed stories

Vivid keeps the technical game ID `keepers-frame` and the hub's existing Vivid lane. It does not create a fourth game. Every new Vivid candidate, including a candidate numbered below `0.1.0`, requires a schema-2 `human-playtest.json` and `build/story-catalog.json`. The shipping catalog is part of the hashed build; it mirrors the shipped story manifests rather than acting as an unhashed attachment. Its schema is:

```json
{
  "schema_version": 1,
  "game": "keepers-frame",
  "stories": [
    {"id": "iona", "revision": 1, "title": "A Place for the Promise", "release_profile": "iona-return-v1"},
    {"id": "mara", "revision": 1, "title": "The Unfinished Postcard", "release_profile": "mara-object-v1"}
  ]
}
```

The current reviewed policy requires both story IDs and their listed profiles. Revisions may increase. New story IDs, removed stories or different profiles need a separately reviewed policy change before a candidate can ship. Story authors cannot lower a threshold through content or catalog data: the validator owns the criteria. A human reviewer verifies that the catalog describes the actual playable bundle; hashing alone cannot inspect game behavior.

The schema-2 envelope has `game`, `version`, `build_sha256`, `critical_bugs_open`, `story_reports`, optional `study_reports`, and one `human_approval`. Each shipping story has exactly one report with its `story_id`, `release_profile`, `condition: "remembered"`, the same build hash, its own critical-bug count, preregistered protocol and six sessions. Every session repeats the story ID and condition. Session IDs and participants must be distinct across all cohorts. The one reviewer must be independent of every participant and observer across the bundle and approve after every included session ends. Existing manual-session, timestamp, Boolean-metric and observation-note requirements still apply.

Recruitment targets eighteen new participants: six Iona remembered, six Iona neutral, six Mara. Twelve suffice for the release decision if the neutral comparison cannot run. If included, the neutral cohort is one `study_reports` item with `story_id: "iona"`, `condition: "neutral"`, `release_profile: "iona-neutral-v1"`, the same bundle hash, six separately preregistered sessions and the Iona metric keys. Its outcome counts carry no efficacy threshold and cannot substitute for the remembered cohort. It still needs genuine observations, distinct participants, zero critical bugs and the independent bundle review. Absence of a neutral cohort means no comparative claim about remembered versus neutral return. Optional 48–72-hour prompted recall is research, not retention, and does not replace the required release observations; preregister it separately and report attrition.

The schema-1 reader remains for historical releases. A legacy Vivid packet is accepted only if it was already registered in the trusted `--base-ref` and both the packet bytes and registry entry are unchanged. No new candidate can opt into the legacy route by choosing an earlier version. Use the prior trusted main commit when validating a hub containing legacy archives. Existing releases stay immutable; no conversion or replacement of old evidence is performed.

## Stage every candidate on master

Use the [blank packet templates](../templates/release-candidate/README.md). The packet is exactly:

```text
release-candidates/<game>/<version>/
  candidate.json        Game, version, full implementation SHA, build inventory/hash
  human-playtest.json   Required cohort protocols, manual sessions, critical bugs, human approval
  notes.md             Changes, human validation and known limitations
  build/index.html     Browser entry, with all other shipped files under build/
```

The manifest `build.files` maps every relative file path to its SHA-256. `build.sha256` is SHA-256 of the UTF-8 JSON encoding of that map with sorted keys and separators `(',', ':')`; use `--inventory` to generate it. Packages cannot contain symlinks. Export a self-contained browser build; verify that asset URLs work below `/IndiaGames/releases/<game>/<version>/build/`. The presence of `index.html` is checked automatically, but actual playability, browser compatibility and external dependencies require human testing.

```sh
python3 scripts/validate-release.py --staging
python3 scripts/validate-release.py --candidate GAME/VERSION
```

The first command checks every staged packet's identity and build integrity, allowing draft playtest evidence and notes. For Vivid it also requires the reviewed catalog and complete story-report identities, even while sessions and approvals are pending. It does **not** approve a release. The second checks all human criteria and completed notes for the selected version. Blank templates must fail readiness until real evidence replaces the blank fields. If either Vivid story fails, the entire version remains on `master`; do not publish the passing story's report as approval for the bundle.

Commit the complete approved packet to `master` and record its full immutable commit SHA. This SHA belongs in the main registry, not inside the candidate packet, avoiding a commit self-reference. `candidate.json` → `source_commit` identifies the implementation commit; that commit must exist in fetched history. Humans verify that the export was built from it. The hash inventory proves shipped byte identity, not reproducible build derivation.

Before committing, inspect `git status --short --untracked-files=all` and `git ls-files -- release-candidates/GAME/VERSION` after staging. Confirm every inventoried build file is tracked. The repository's general `build/` ignore needs explicit exceptions for release candidate and official build directories; an ignored local file is not an uploaded artifact.

## Promote one approved version without importing the queue

Create a promotion branch from current `main` in a clean separate checkout/task environment, or use a serialized branch switch after checking for local changes and stopping servers. Copy just `release-candidates/GAME/VERSION/` from the approved master SHA to `releases/GAME/VERSION/`. Do not merge `master` wholesale. For example, in the clean promotion checkout after setting `GAME`, `VERSION` and the full `MASTER_SHA`:

```sh
git fetch origin main master
mkdir -p "releases/$GAME/$VERSION"
git archive "$MASTER_SHA" "release-candidates/$GAME/$VERSION" |
  tar -x --strip-components=3 -C "releases/$GAME/$VERSION"
```

Add one `data/releases.json` entry with these exact values (replace uppercase tokens):

```json
{
  "game": "GAME",
  "version": "VERSION",
  "tag": "GAME-vVERSION",
  "source_master_commit": "FULL_MASTER_SHA",
  "path": "releases/GAME/VERSION/build/index.html",
  "release_url": "https://github.com/PaperStrange/IndiaGames/releases/tag/GAME-vVERSION",
  "notes_path": "releases/GAME/VERSION/notes.md",
  "released_at": "ACTUAL_UTC_TIMESTAMP_ENDING_IN_Z"
}
```

`released_at` is the promotion record timestamp, after manual approval; the GitHub Release API separately records the actual publication time. The registry remains `{ "schema_version": 1, "releases": [...] }`. Existing records, tags, notes and artifacts are immutable; corrections require a new version. A failed version may remain staged while another game's approved version ships.

```sh
python3 scripts/validate-release.py --base-ref origin/main
python3 -m unittest discover -s tests -p 'test_release_gate.py' -v
```

The main gate requires the source SHA to be an ancestor of fetched `origin/master`, verifies the full candidate packet byte-for-byte from that SHA, and compares all existing releases/registry records to the base main commit. It rejects unstaged packages, substituted evidence, extra unregistered files, changed old releases and incomplete gates. `--master-ref` may select another trusted ref for isolated integration tests; CI uses `origin/master`. No check merges branches automatically.

## Required GitHub configuration and human review

The workflow is an implementable gate, **not evidence that branch rules are already enabled**. A repository administrator must configure and verify:

- Protect `main`: require pull requests, a human approving review, dismissal of stale approvals, resolved conversations, and the required `release-gate` status on the latest changes. Prevent direct/force pushes and deletion, including administrator bypass where supported.
- Require owner review for `.github/workflows/`, `scripts/validate-release.py`, `scripts/publish-releases.py`, `tests/test_release_gate.py`, this policy and the ownership file itself. The gate loads its validator from the trusted PR base when available, but an editable workflow still needs independent owner review. Review policy changes separately from promotion packets.
- Protect `master` from force pushes/deletion so immutable source commits remain reachable. Its staging check intentionally permits incomplete human evidence.
- Restrict creation/movement/deletion of official tags, and verify Pages uses `main` at the repository root. Enable GitHub Actions permissions needed by the publication job.

Until these rules are actually configured and verified, checks provide review feedback but cannot prevent all unauthorized direct writes. The PR's human reviewer verifies real participants, protocol preregistration, raw observations, uncoached metrics, build identity, bug severity, notes and actual playability. The approving reviewer must be a different person from every participant and observer; the gate checks distinct pseudonymous IDs and humans verify actual independence. JSON booleans never substitute for that review.

The human release checklist also covers keyboard play, focus/readability, and actual physical mobile-device play where the game supports mobile. Automated DOM checks cannot substitute for these manual device checks.

## Publish the approved version and links

After the reviewed promotion merges into `main` and the gate passes, the separate `publish-approved-releases` job creates the version tag on that exact main commit and publishes the package's `notes.md` as its GitHub Release notes. Only this job has `contents: write`; checks have read permission and checkout does not retain credentials. No game version is created for an empty registry. The public hub reads the registry to show the official version, playable build, notes and GitHub Release link.

Publication is idempotent: an existing tag must resolve to the same main commit and an existing release must have identical notes and final-release flags. The job refuses to move tags or overwrite notes. It never publishes from `master` or a PR. A failed API call can leave a tag without a Release; rerun the **original promotion workflow** after resolving the failure. Later pushes only process their own new entries, so they do not repair earlier failed publication. The hub's GitHub Release link may be unavailable until publication succeeds. Different promotion commits use separate concurrency groups so one cannot silently cancel another pending publication.

For a local publication preview, use the exact promotion checkout and its previous main commit; the default does not contact GitHub:

```sh
python3 scripts/publish-releases.py --base-ref PREVIOUS_MAIN_SHA --head-ref EXACT_MAIN_SHA
```

`--apply` explicitly performs GitHub writes and requires `GH_TOKEN`. It also requires the checked-out commit to be an ancestor of freshly fetched `origin/main`. Fetch before any manual invocation; do not run it for unmerged or unreviewed packets. Workflow installation and test fixtures do not create a release, fabricate human evidence or implement any game feature.
