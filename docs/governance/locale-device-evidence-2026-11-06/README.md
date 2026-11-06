# Locale/device evidence v1 — governed draft

**Status: pending eligible human policy/code-owner review. No human evidence, support claim or official release is approved.** Game development can use the shared catalog now. Adoption of this validator change and adoption of a comprehension protocol are separate decisions. Both must be complete before a new multilingual release can pass.

The [verification record](VERIFICATION.md) separates engineering results from the human review and evidence still required.

## Packet and identity

Keep `candidate.json`, `human-playtest.json`, `notes.md` and `build/**` as the only packet files. Existing candidate schema 1 and product-report schemas 1/2 remain. The new supplement has its own schema version, is explicitly validated and cannot be omitted from a new packet. The schema-2 Vivid shipping-story reports and optional neutral study are unchanged.

`build/locale-catalog.json` has exactly:

```json
{
  "schema_version": 1,
  "game": "small-hours",
  "default_locale": "en",
  "locales": ["en", "ja", "zh-Hans"],
  "units": [{"id": "small-hours", "locales": ["en", "ja", "zh-Hans"]}]
}
```

Use `keepers-frame` with units `iona`, `mara`, or `thirteenth-bell` with its same-named unit. Arrays must contain each required value exactly once; no extra locale/story IDs or fields. The catalog is a hashed declaration of scope, not proof of translated behavior. Game checks and human review must verify that it describes the actual shipped content.

Include the catalog before generating the complete build inventory. Its file SHA-256 is `locale_catalog_sha256`; `build_sha256` is the existing inventory digest. Any changed font, text, layout or other build byte requires a new immutable version and exact-build records. Do not rewrite prior English candidates or transplant their approvals.

## Explicit supplemental contract

Copy the blank [supplement helper](../../../templates/release-candidate/locale-device-evidence.json) into the `locale_device_evidence` field of the owning `human-playtest.json`, not into another packet file. The updated product templates already contain it.

| Field | Required meaning |
|---|---|
| `schema_version` | Integer `1`; unsupported versions and unknown supplemental fields fail. |
| `game`, `version` | Same game/version as the candidate and product evidence. |
| `build_sha256`, `locale_catalog_sha256` | Exact shipped inventory and hashed catalog file. |
| `language_reviews` | One completed content review for every playable unit × required locale. Blank list is pending. |
| `device_claims` | Exact configurations actually claimed: stable ID, family, model, OS/version, browser/version, engine and actual input methods. At least one configuration in each requested family is necessary; this does not establish other devices. |
| `physical_checks` | One completed coverage record for every declared configuration × unit × locale. Blank or missing cells do not inherit another cell's result. |
| `comprehension` | Protocol ID/hash, actual preregistration timestamp and all records under the future adopted protocol. Currently pending; it cannot be self-approved by packet data. |

Staging checks catalog and envelope identity while allowing empty human lists. It does not score incomplete observations or approve hardware. Readiness rejects missing, malformed or incomplete evidence.

### Fluent content review

Use [language-review.json](../../../templates/release-candidate/language-review.json). Each record repeats unit, locale, build/catalog hashes and a deidentified evidence reference. It names a real human reviewer, their voluntarily stated relevant competence, and explicit fluent/in-game/all-content attestations. `review_notes`, actual `reviewed_at` and `outcome: "approved"` document the result. Strings, truthy values, automated translation and unreviewed agent drafts do not satisfy the Boolean attestations. Include privacy/consent, instructions, clues, errors, assistive text, endings and exported artifacts where present.

A fluent editor may review multiple stories/locales they actually know. This is editorial work, not fresh-player comprehension or a new product participant. Keep contrary observations and prior revisions available privately; the final approval refers to the exact current bytes.

### Actual physical configurations

Use [device-claim.json](../../../templates/release-candidate/device-claim.json) and [physical-check.json](../../../templates/release-candidate/physical-check.json). Families are `desktop_web`, `phone`, `tablet`. The observed `device` must exactly repeat the claimed hardware/software/input configuration. Record actual versions and engine; do not infer an engine from an iOS browser brand or infer Safari hardware from Playwright WebKit.

Each check names a human tester and `method: "manual-physical"`, `is_physical: true`, actual start/end, notes and a deidentified evidence reference. `outcome` must be `pass`, `critical_bugs_open` must be integer zero, and every applicable check below must be literal `true` after observation. No empty form establishes zero defects.

| Scope | Exact `checks` keys |
|---|---|
| Every game | `entry_and_critical_path`, `readable_text_and_controls`, `input_and_focus`, `orientation_and_resize`, `lifecycle_and_recovery` |
| Small Hours also | `private_handoff`, `ime_and_keepsake` |
| Vivid also | `flat_fallback`, `story_save_recovery` |
| Bell also | `map_and_receipts`, `restart` |

These record the declared game's actual behaviors: Small Hours clears private state; Bell does not promise saved progress; Vivid preserves its story/profile saves. Desktop orientation/resize checks use applicable window changes, not a fictional rotating monitor. Physical observations must retain failed attempts, assistance, limitations and human severity decisions in the referenced original evidence. Record the accepted current-build coverage summary only after reviewing that history. Repeated technical rows may use familiar QA staff; they do not increase fresh-player denominators. No new FPS/performance threshold or browser/OS minimum is invented by this schema.

### Locale comprehension: deliberately blocked pending adoption

The supplement's `comprehension` object has exactly `protocol_id`, `protocol_sha256`, `registered_at`, `records`. Leave the first three null and records empty until an actual reviewed protocol exists. [The session helper](../../../templates/release-candidate/locale-comprehension-session.json) is a blank recording shape, not a study design or permission to recruit a particular sample.

Every eventual record binds unit/locale/build/catalog, a unique session ID, pseudonymous participant IDs, an actual human observer/method, prior exposure, start/end, original observation notes and evidence reference. `findings` belongs to the adopted protocol. The trusted callback must validate its exact findings, sample/coverage rules, all preregistered attempts, fresh/repeat eligibility, exclusions and pass/fail criteria. A generic string or a participant's existence cannot substitute for those checks.

The validator's `REVIEWED_LOCALE_PROTOCOLS` is **empty**. Registration is keyed by `(game, protocol_id)` and contains a fixed protocol document SHA-256 plus reviewed executable criteria. An unregistered protocol, another game's protocol, or an altered protocol hash fails. There is no CLI bypass, candidate-defined threshold or data-only `status: approved` route. The [decision worksheet](POLICY-DECISION.md) must be completed and reviewed before a separate policy patch adds a registration and meaningful acceptance/rejection fixtures. No real sampling number is chosen by the synthetic test-only callback.

### Final independent approval

The existing `human_approval` must retain all current product-study requirements and additionally set `reviewed_locale_device_evidence`, `reviewed_locale_comprehension_evidence` and `played_exact_build` to literal true after the work occurs. Its reviewer must be independent of all product participants/observers and all supplemental editors/testers/observers/participants. Approval time must follow every included observation. Human code review, a bot approval or an agent's translation does not replace this exact-build human release decision. The gate checks attestations and consistency; humans verify authenticity, competence and independence against private originals.

## Compatibility and rollout

1. Review this governed patch separately from any promotion. Required human CODEOWNERS review and repository protection remain unchanged; the presentation-only exception does not apply.
2. Adopt the same reviewed validator and relevant policy/templates/tests on the trusted main and master paths before claiming this gate is operational. PR checks run the trusted base validator, so a policy PR's own new tests do not prove the old base already enforces new fields. No workflow change is needed; do not weaken the trusted-base selection. Keep official promotion blocked while adoption is incomplete.
3. Preserve the six complete pre-policy master packets (`keepers-frame/0.1.0` through `0.1.4`, `thirteenth-bell/0.1.0`) exactly. The validator embeds their complete packet digests from immutable master `ac931cde281e9483f6f693289cad2d99038d5bc0`. The allowance is staging-only and includes every file, note and evidence byte. Changing any file or version loses it. These English packets cannot use the allowance to become new official releases.
4. Already-published archives may use their historical locale evidence only when the entire packet and registry entry equal trusted `--base-ref` exactly. Added files, changed records, lower versions and newly copied packets are not archives. The current official registry is empty; compatibility is exercised with explicitly synthetic historical fixtures.
5. New development builds can proceed while human policy review is pending. New staged multilingual packets need correct catalog/supplement identity but may keep all observations blank. Original game-specific staging prerequisites, including Small Hours' pilot decision, still apply.
6. Adopt actual comprehension criteria in a separate reviewed policy change, then collect and review exact-build evidence. Keep original fixed cohorts and optional neutral conditions unchanged. If any required language, physical claim or independent approval is missing at go/no-go, defer the game.

Rollback is a reviewed policy decision, not a candidate-authored downgrade. Never remove a required gate during promotion or reuse an old English approval to meet the calendar.
