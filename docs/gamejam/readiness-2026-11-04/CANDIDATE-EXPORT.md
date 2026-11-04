# Export a new Keeper's Frame candidate

Use [prepare-vivid-candidate.py](prepare-vivid-candidate.py) after the runtime change, package version and lockfile version are committed. The dated [0.1.2 exporter](../milestone-2026-10-27/prepare-vivid-pilot.py) remains unchanged and verifies only its original frozen packet.

The new helper reads Git objects without changing the checkout, index, refs or remotes. It archives the selected source into two temporary directories, installs lockfile dependencies separately, runs `npm run build` twice and requires byte-identical build inventories. It keeps the generated shipping-story catalog, makes a fresh blank schema-v2 human report from the reviewed policy template, and runs the actual reviewed release validator in staging mode before exporting a new directory. It accepts no arbitrary prebuilt directory and does not invent human observations.

## Requirements and invocation

- Python 3.10+, Git and a Node/npm version supported by the committed application.
- The full source, current master staging and reviewed policy commits must already exist locally. The helper never fetches them.
- `package.json`, the lockfile's root version and its root package version must match `--version`.
- Confirm the version remains unused on the latest remote `master` before running and again before opening the staging PR. Pass that exact current master SHA as `--staging-ref`. The helper checks both the staging and policy commits' candidate/release paths; it cannot establish remote freshness itself.
- Choose a new output directory outside the repository. Existing files or directories are never reused.

```sh
python docs/gamejam/readiness-2026-11-04/prepare-vivid-candidate.py \
  --repo /workspace/IndiaGames \
  --source-ref FULL_COMMITTED_SOURCE_SHA \
  --staging-ref FULL_CURRENT_MASTER_SHA \
  --version 0.1.3 \
  --output /workspace/indiagames-readiness-2026-11-04/exports/keepers-frame-0.1.3 \
  --npm-cache /workspace/indiagames-env/npm-cache
```

Replace both placeholders with actual 40-character commit SHAs. The default policy is the reviewed PR #1 merge, `7a26e07a71062766e357b51aece9cce8b00c9b17`; `--policy-ref` permits a later explicitly reviewed full commit. Policy and staging provenance are separate because master may contain candidate versions absent from the policy commit. Never substitute an older validator to bypass the multi-story gate. The command uses `npm ci --prefer-offline --ignore-scripts`, so cached dependencies are reused and a missing package may be downloaded. Add `--offline` to require cache-only operation. Build-script output goes to stderr; the JSON provenance summary goes to stdout. Save both with the agent verification record.

The exported directory contains `candidate.json`, `human-playtest.json`, `notes.md` and `build/`. The aggregate SHA-256 hashes the compact, sorted file-hash inventory, not a ZIP. Both build attempts use the same exact source archive and lockfile. Node/npm versions, source SHA, reviewed policy SHA, staging-base SHA and build inventory digest appear in the summary; the lockfile digest is also recorded in notes.

## Staging and handoff

1. Inspect the summary, candidate identity, complete file inventory, two-story catalog and blank human report. Run the agent browser checks against these exact exported bytes; prior source-server checks do not prove the exported route works.
2. Complete `notes.md` with the concrete source changes, actual agent checks and remaining limitations. Keep human validation pending. Never change `build/` after hashing; a build change requires another export and correct version identity.
3. In a separate reviewed release-operations change, copy this entire packet to `release-candidates/keepers-frame/0.1.3/` on a branch based on current `master`. Re-run `scripts/validate-release.py --root . --staging` with the reviewed policy. A staging success permits empty human cohorts and is **not** approval.
4. Open and review the staging PR to `master`. Record the resulting immutable master commit in [HUMAN-HANDOFF](HUMAN-HANDOFF.md). The helper does not open, merge or publish PRs.
5. Humans are arranged later. Keep six Iona and six distinct Mara sessions, assessed critical-bug counts and approval blank until actual evidence exists. Official `main` promotion remains conditional on the existing gate.

A failed build, non-reproducible inventory, version mismatch or staging rejection leaves no exported candidate. Temporary build directories are cleaned automatically. The script does not modify any existing 0.1.2 packet or certify physical devices, enjoyment, human readiness or an official release.
