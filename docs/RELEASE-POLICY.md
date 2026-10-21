# Human-tested releases: game branches → master → main

`master` is the release-candidate staging branch. Preserve its earlier prototype history. Each game continues development on its own branch; export a browser build to `master` for manual human playtests. `main` is the official release hub and receives only a selected approved package. **There are currently no official game releases.** The empty `data/releases.json` is intentional.

An automated check can establish file identity, recorded counts and consistency. It cannot prove that a participant, observer, observation or approval is authentic. A human must review the original observations and actually play the submitted build before approving its promotion. Generated personas, agent/browser automation, walkthroughs and invented reactions do not count as human playtests.

## Fixed pilot criteria

These are provisional product acceptance criteria from the current plans, not estimates of population conversion or statistical proof. Before testing, register exactly six session IDs for the frozen build, in order. Report all six attempts, including abandonment and failed attempts, without replacing unfavorable results. `completed_at` means the session ended, not that gameplay succeeded. Use distinct participants: six pairs / twelve people for Small Hours; six people for each other game. Any exclusion or protocol change requires an explicitly reviewed new protocol before another run. Do not cherry-pick six successes from a larger denominator. Keep all observations, including failures, available to the human reviewer.

| Game | Required observations on the same candidate build |
|---|---|
| Small Hours | At least 5/6 pairs reach the reveal unaided; 4/6 pairs both contribute; 3/6 pairs voluntarily save or replay. |
| Keeper’s Frame | At least 4/6 players both complete unassisted **and** explain how a choice changes a return action. At most 1/6 expects unrestricted AI; two or more is a recurring false expectation and fails. |
| Thirteenth Bell | At least 4/6 players both explain cause **and** predict before the outcome; 4/6 both earn the action uncoached **and** explain Fracture; 3/6 recall a specific Mina outcome after a predeclared neutral break of at least two minutes. This measures short delayed recall, not day-two retention. |

All games require zero open critical bugs. A critical bug blocks completion, corrupts/loses required state, or prevents the promised player action. Humans classify severity and verify fixes. The gate checks the recorded zero; it does not discover all bugs. Changing any build byte invalidates the report's build identity and requires a new recorded test run. Record only deidentified participant IDs and concise behavioral notes in the release repository; retain consented raw evidence outside the public packet.

## Stage every candidate on master

Use the [blank packet templates](../templates/release-candidate/README.md). The packet is exactly:

```text
release-candidates/<game>/<version>/
  candidate.json        Game, version, full implementation SHA, build inventory/hash
  human-playtest.json   Protocol, six manual sessions, critical bugs, human approval
  notes.md             Changes, human validation and known limitations
  build/index.html     Browser entry, with all other shipped files under build/
```

The manifest `build.files` maps every relative file path to its SHA-256. `build.sha256` is SHA-256 of the UTF-8 JSON encoding of that map with sorted keys and separators `(',', ':')`; use `--inventory` to generate it. Packages cannot contain symlinks. Export a self-contained browser build; verify that asset URLs work below `/IndiaGames/releases/<game>/<version>/build/`. The presence of `index.html` is checked automatically, but actual playability, browser compatibility and external dependencies require human testing.

```sh
python3 scripts/validate-release.py --staging
python3 scripts/validate-release.py --candidate GAME/VERSION
```

The first command checks every staged packet's identity and build integrity, allowing draft playtest evidence and notes. It does **not** approve a release. The second checks all human criteria and completed notes for the selected version. Blank templates must fail readiness until real evidence replaces the blank fields.

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
