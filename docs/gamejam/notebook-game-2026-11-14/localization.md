# Borrowed Words — language contract and reviewer handoff

Shipping scope is **English (`en`), Japanese (`ja`) and Simplified Chinese (`zh-Hans`)** for the entire `toms-notebook` unit. English is the authored source. All three require human language review; Japanese and Chinese are explicitly agent drafts, not certified translations. Missing qualification defers the game rather than silently removing a language.

## Content architecture

`game/src/content/` contains the story/cast/action structure, complete-message catalogs and shared types. Story IDs, intent IDs, resolutions and ending IDs are language-independent. Visible strings include interface controls, save/recovery states, assistive instructions, source labels, full narrative, ending callbacks and downloaded transcript text.

The runtime selects complete messages. Interpolation placeholders such as `{current}`, `{total}`, `{language}`, `{version}` and `{story}` must remain identical across languages. Do not assemble translated sentences from English fragments. Development aliases were removed when the runtime adopted the canonical message names, leaving one editable translation per message.

Every sent entry retains its source language and literal source/reply/consequence snapshots together with semantic IDs. Changing display language must not rewrite historical words as if the player chose a different original. An optional translated reading view must be labelled separately from the retained original. A save built by an unsupported future story revision must not be silently coerced into current text.

The game does not require handwritten or free-form recognition. All players, including those using Japanese or Chinese input methods, can progress with the same focusable phrase choices. Characters or scripts alone must not be used to infer a player's preferred language. Traditional Chinese must not be silently presented as Simplified Chinese.

## Meaning that must survive translation

| Narrative distinction | English example | Review requirement |
|---|---|---|
| Refusal versus postponement | “will not” / “not yet” | The added timing assumption must be clear; the original must not already imply it. |
| Permission versus expansion | one knock / entry | The notebook must visibly exceed the limited permission without making the original ambiguous. |
| Temporary role versus invented history | Guest, for this conversation / always returned | Keep the time limit and the invented past distinct. No gendered or personal identity may be added. |
| Missing identity versus exclusive witness | leave name blank / only I know you | A blank field must not itself mean consent to secrecy or ownership. |
| Coexistence versus interpretive authority | both accounts / mine explains yours | Preserve the final choice about whose explanation leads, rather than implying physical data deletion. |
| Limited permission versus continuation | this last line / next chapter | Permission has a scope; the notebook's next heading exceeds it. |
| Comfort versus authorship | welcoming voice / retained boundary | Neither resolution should be translated as the universally correct, safe or shameful option. |

Japanese currently uses `保管者` / `返事の主` for cast roles and `言い分` for narrative account; Chinese uses `保管者` / `回信者` and `说法`. These are reviewable terminology choices, not facts about reader comprehension. The game's localized title is `借りものの言葉` / `借来的话`; the canonical story ID remains `borrowed-words`.

## What a fluent reviewer should return

Use the shared language-review form with the exact source commit, build inventory and catalog identity. Cover every displayed state and all narrative branches, not only the first ending. For each issue retain:

| Field | What to record |
|---|---|
| Location | Locale, message key, scene/state and actual tested build |
| Original | Exact displayed wording and any screenshot/record timestamp |
| Correction | Proposed full replacement, reason and severity |
| Narrative effect | Whether permission, negation, tone, agency, source identity or a clue changes |
| Presentation | Actual device/font, wrapping, punctuation, line height and focus/readout result |
| Recheck | Exact corrected build, reviewed keys and unresolved limitations |

Keyboard-only play, touch target geometry, CJK wrapping, mixed-locale original records and actual downloaded transcript opening need technical/physical observations in addition to editorial review. Browser viewport tests do not establish native device or fluent approval. Record unknowns and skipped checks explicitly.

Automated key/placeholder checks confirm structure only. They cannot confirm tone, meaning, comfort, literary quality or that the game is fun.
