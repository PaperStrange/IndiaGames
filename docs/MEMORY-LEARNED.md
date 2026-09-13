# Memory and learned decisions

Product **alpha 0.4** · Documentation **docs-v4** · Artifact **v6-alpha04-2026-09-13**

- One companion per user across notebooks; current-notebook retrieval by default, explicit cross-notebook scope per reply.
- Automatically save useful memories with provenance, history and undo. Instruction/tool-strategy changes require review.
- Built-in and personal multi-provider access; task rules within capability/budget limits and a strict selected-model lock.
- Generic plugins. PaperQA is an example; PaperReadingAgent remains source-only until its service is hosted.
- OCR and fading start together at input-end. Automatic best-match formatting, no uncertainty confirmation.
- During fading, erase restores remaining text first, then clears only the touched region. Neither erase nor rewrite aborts running OCR.
- Preserve originals, physical page flips, PDF annotations, samples, fonts/media and mobile reuse.
- Preserve alpha 0.1. Track documentation and product versions separately.

Engineering findings: browser UUID and Cache APIs are capability-dependent; Tailwind must not scan tokenizer/model assets; older OCR completion must not replace the visible current cycle; OpenRouter native model IDs retain provider prefixes; slow connection checks must not restore removed credentials; plugin citations need independent arrays and explicit stream events. Workspace maintenance can remove checkouts; pushed checkpoints and reproducible assets are the recovery source.

Boundaries: paid provider calls and native devices remain unverified. Samples are labeled. Local OCR is English-focused, retrieval is bounded lexical search, and routing is application rules. The private owner fallback is unsuitable for public/native authentication. No model weights or source code undergo autonomous recursive modification.
