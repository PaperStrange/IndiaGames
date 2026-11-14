# Draft implementation verification — Notebook extension, 14 November 2026

**Current authored checks: 64 release-gate tests passed. This is technical verification of a draft, not human policy adoption or release qualification.** The original November6 record is preserved below and its 42 independent cases are historical evidence for that earlier snapshot, not a new independent review of the Notebook extension.

The extension starts from draft PR17 commit `0f570a65266fe1cf5d49a7957671bf40dc33a3b5`. Current validator SHA-256: `cbd00e5ff6bce8308edc55c1b9269381208cc66009680e85b83b5c1fee8d79b6`. No game runtime, workflow, CODEOWNERS, repository setting, existing packet or registry entry changed here. PR17 remains draft/unmerged; Notebook's [product protocol](NOTEBOOK-PROTOCOL.md) and [decision worksheet](NOTEBOOK-DECISION.md) require responsible human review before qualifying sessions. `REVIEWED_LOCALE_PROTOCOLS` remains empty.

| November14 check | Actual result |
|---|---|
| Full versioned suite | **64 passed**, including all 53 prior test methods and 11 Notebook methods. Command: `python3 -m unittest discover -s tests -p 'test_release_gate.py' -v`. The first run passed; no failed run was relabelled. |
| Notebook joint criterion | Exactly four joint completion/explanation successes accepted under a synthetic test-only comprehension callback; three joint successes and four marginal successes with only two joint successes rejected. |
| Notebook eligibility and manual evidence | Missing/extra/reordered sessions, non-solo/reused participants, prior or unknown exposure, prior project-cohort participation, truthy Boolean substitutes, late preregistration, wrong hashes, unobserved runs, critical bugs and approver conflicts rejected. |
| Catalog and physical coverage | The `toms-notebook` unit requires all three locales. Wrong/missing/duplicate units, missing locale, diary-control failure/omission, missing physical cell, emulation and missing fluent review rejected. Blank Notebook template can stage with correct identity but cannot approve. |
| Production protocol boundary | Empty production registry and candidate-invented protocol ID reject Notebook readiness. Positive tests inject an explicitly synthetic callback only in memory; no real comprehension protocol/sample was added. |
| Original policy preservation | Compared original `GAMES`, locale-unit and device-check entries against PR17's previous head: unchanged. The original 30-person baseline and Vivid's optional neutral study retain their contracts. |
| Actual immutable master | Re-extracted all six packets from `ac931cde281e9483f6f693289cad2d99038d5bc0`. Every complete-packet digest equals the preserved table; all six stage unchanged, all six reject readiness, and one added notes newline removes each staging exception. Notebook has no exception. |
| Static checks | Validator/tests parse; all 14 JSON templates parse; all 34 relative Markdown links in the changed documents, including this addendum, resolve; `git diff --check` passed. |
| Independent review of this extension | [Root technical review](NOTEBOOK-INDEPENDENT-REVIEW.md): no unresolved blocker; 11 Notebook cases rerun and original contracts independently compared. The earlier 42-case result remains historical. Human governance adoption is still pending. |

Synthetic fixtures do not establish real fluency, physical hardware, fresh eligibility, source understanding or authentic approval. Humans must check the private roster/originals and exact game build. The draft extends the technical acceptance contract while preserving those responsibilities.

## Preserved November6 verification record

**Engineering checks passed. Human policy review, adoption and release qualification remain pending.** These are synthetic validator tests and preservation checks, not player sessions, language approvals or physical-device observations.

The draft is based on main `ec2be8169d008e1925648eb5f0534e7fa9d750bd`. Reviewed validator SHA-256: `e9c8914deea46571d2f7b3f96fd86f45ec51a01b7b59d7c112a9b11e3954786d`. No game runtime, existing candidate bytes, workflow, CODEOWNERS or repository setting changed in this patch.

| Check | Observed result |
|---|---|
| Versioned release-gate suite | **53 passed**, including original product-cohort and publication regressions. Run `python3 -m unittest discover -s tests -p 'test_release_gate.py' -v` from the repository root. |
| Independent read-only agent review | **42 additional adversarial/preservation cases passed**, with zero unexpected acceptances; no implementation blocker found. This is technical review of a draft, not eligible human policy review or permission to merge. |
| Actual immutable master packets | Independently extracted all six packets from `ac931cde281e9483f6f693289cad2d99038d5bc0`; each complete-packet digest matched the pinned value. All six stage unchanged and all six fail readiness. Changing one notes byte removes each exception. |
| Empty production protocol registry | New readiness, full promotion and publication reject it. The independent publication fixture made zero mocked API calls before rejection; no actual publication request occurred. |
| Existing archive immutability | A trusted-base archive remains readable; adding a file is rejected. An old version number does not exempt a newly promoted packet. |
| Evidence rejection boundaries | Missing/duplicate locale or unit cells, stale build/catalog hashes, malformed/unknown supplemental fields, missing physical families/configurations, emulation, incomplete attestations, role conflicts and approval before observations are rejected. |
| Final static and hub checks | Python syntax parsed for validator/tests; all 12 JSON helpers/templates parsed; all 16 relative Markdown links in changed documents resolved; `git diff --check` passed. The current empty official registry validated against the immutable base and still reports human review required. |

The [versioned tests](../../../tests/test_release_gate.py) use explicitly synthetic people, devices and observations. Their positive fixtures temporarily install an explicitly synthetic protocol in both in-process validator modules. That callback is not a real comprehension study, does not choose a production sample and is absent from the production registry. Independent review also tested the empty, unpatched production registry. Full independent case results and original run logs are retained in the local task audit; they contain no real human observations and are not release evidence.

Two earlier development runs found fixture problems before the final pass. First, three publisher tests failed because their separately imported validator had not received the test-only protocol; the test helper now patches both modules explicitly. Second, one stale-hash test expected the supplemental rejection, but the earlier product-envelope check correctly rejected first; the fixture now isolates the intended supplemental mismatch. No production exemption was added for either failure. The independent review's first snapshot command selected a nonexistent external directory and was retried from the existing worktree before any test ran.

The six staging exceptions are exact complete-packet identities, not a version range:

| Packet | Complete-packet SHA-256 |
|---|---|
| `keepers-frame/0.1.0` | `5fa7f7e5a611928b50c1d64ef233069543e99bfce5693566f63c7e5f3e026a35` |
| `keepers-frame/0.1.1` | `5840d9787e4cb96061ba29ee491dd63adfbdb3a33001e70f2db66cae04c95ddc` |
| `keepers-frame/0.1.2` | `f6e94461e3c65d33ae58dae0cd9a136c89d999d9cded371da39597fdce11dc98` |
| `keepers-frame/0.1.3` | `3cb64e4c7bf0fef4760afbf2df6ac2731ef42c7fece0cf2b749c5660d1f048c0` |
| `keepers-frame/0.1.4` | `461f1b5c217ec812e7e9ee7cfc4986a37ec652817245a9ceb0c52b6105e0f0ad` |
| `thirteenth-bell/0.1.0` | `750cc4b23c83f535000985e58b2ae52a71dcb0d10846b2f61e5713915a16d5b3` |

Reproduction of a packet digest: hash every relative packet file, JSON-encode that filename-to-SHA-256 mapping with sorted keys and separators `(',', ':')`, then SHA-256 the UTF-8 JSON bytes. The exception never applies to readiness or promotion.

Before adoption, the human reviewer should resolve the [decision worksheet](POLICY-DECISION.md) and the [trusted-base rollout](README.md#compatibility-and-rollout). The current empty protocol registry deliberately prevents a new official release. Automated checks cannot establish actual fluency, fresh-player comprehension, hardware identity, human independence or complete private evidence; those remain genuine human responsibilities. Existing six-session cohorts, thresholds and the optional neutral study remain unchanged.
