# Enchanted Notebook — alpha 0.4

Product **alpha 0.4** · Documentation **docs-v4** · Artifact **v6-alpha04-2026-09-13**

A private interactive notebook with pressure-aware ink, layered vellum, physical page turns, PDF annotations and a persistent companion. React/TypeScript is shared by the hosted app and mobile bundle. Previous alpha 0.1–0.3 checkpoints remain in Git.

[Project handover — 2026-10-18](HANDOVER.md) records completed implementation, saved QA evidence, publication/source checkpoints, remaining acceptance work and development restart instructions.

Art research, proposals, material assets and review evidence are collected in [docs/art-design](docs/art-design/README.md), with implementation status and original-source provenance.

## Write and reply

Write with a pointer, stylus, touch or the composer. After 380 ms without input, OCR and a five-second fade start together. Recognition applies its best matching formatted text without a confirmation dialog. Erasing during fading restores the remaining text first, then clears only the touched region. Corrections begin a new cycle at the next input-end; running OCR jobs continue, with revision checks preventing stale results from resurrecting changed ink. Replies progressively appear only after both OCR and fading finish. Original ink is recoverable.

No provider key is bundled. Without one, the writing is retained with a setup message; clearly labeled sample buttons remain playable. Samples are not substitutes for live answers.

## Configure AI

1. Open **Settings → Models** and choose OpenAI, Anthropic, DeepSeek, DashScope, OpenRouter or Custom provider.
2. Select the correct API protocol: Responses, OpenAI-compatible chat or Anthropic Messages. Set the public HTTPS base URL and enter the key in the password field. Keys are encrypted server-side and bound to the exact endpoint; changing it removes the old key.
3. **Save & check connection** lists model IDs. This verifies connectivity, not a paid generation. Set the reply, reasoning and vision models and their profiles: capabilities, context size and current USD prices per million tokens. Unknown prices must be entered before use. Presets are editable, not current-price guarantees.
4. Enable **Lock selected model** for an exact model. Otherwise v1 uses task rules: ordinary replies, reasoning keywords, and vision OCR. Model-driven routing is a future adapter. OpenRouter's native `openai/...` IDs remain intact; upstream `openrouter/auto` is rejected because it cannot enforce the lock.
5. Send a small request and check Activity for actual model choice, usage, tools and sources.

The daily limit uses configured prices. Concurrent turns atomically reserve estimated maximum cost; complete usage releases unused reservations. Failed/interrupted turns without complete usage retain a conservative estimate. Separate plugin fees are excluded.

Built-in AI uses a server-owned `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`. `COMPANION_CONFIG_KEY` must contain base64-encoded 32 random bytes to encrypt personal credentials. See `.env.example`; never commit real secrets.

## OCR, lettering and media

Auto recognition uses a connected vision model when supported, otherwise bundled TrOCR in a dedicated WASM worker. On-device recognition targets English single-line handwriting; use a vision model for broader scripts. Initial model loading is substantial; supported secure browsers cache assets. Failures preserve raw ink. The model asset inventory is in `docs/OCR-MODEL-MANIFEST.json`.

Replies support handwritten, serif and typewriter fonts; text, emoji and compact tables. Pictures, stickers and videos require a tool returning a matching media artifact. Existing sample media are available without a provider. No diffusion/image model is silently invoked.

## Plugins and PaperReadingAgent

Settings → Tools supports **Notebook HTTP v1** and **MCP Streamable HTTP (2025 revisions)** with optional bearer tokens. Discovery defaults every action to disabled. Enable specific actions and notebooks. The bounded loop permits at most three tool calls across two model rounds. It does not install arbitrary GitHub source, stdio servers or OAuth plugins.

HTTP endpoint GET manifest:

```json
{"schemaVersion":1,"tools":[{"name":"research","description":"Search a research collection","inputSchema":{"type":"object","properties":{"query":{"type":"string"}},"required":["query"],"additionalProperties":false}}]}
```

POST receives `{"schemaVersion":1,"tool":"research","arguments":{"query":"..."}}`. Return JSON with optional `citations: [{title,url,excerpt}]` and `artifacts: [{kind:"picture"|"sticker"|"video",url,caption}]`. Media URLs must be HTTPS.

The provider registry adapts naming/configuration conventions from [PaperReadingAgent](https://github.com/PaperStrange/PaperReadingAgent), pinned in `ROUTER_SOURCE`. **This is a configuration adapter, not an installed or hosted Python agent.** To use its research functions, host an authenticated HTTP/MCP wrapper matching the contract above. No modification was pushed to the user's repository. Hosting, service credentials and live verification remain external work.

## Companion memory

One identity is shared across notebooks. Retrieval defaults to the current notebook; **Across notebooks** expands one turn. V1 uses bounded lexical/CJK-bigram retrieval, eight excerpts at most, recent conversation and up to 500 learned records. It is not vector RAG or unlimited context.

Tool-capable models can automatically remember durable facts, preferences, lessons and labeled inferences. Memory settings expose sources, editing, forgetting, restoring and history. Forgotten claims are tombstoned against automatic relearning. Instruction/strategy changes are reviewable proposals with rollback. Model weights and source code are never recursively rewritten.

## Development and native continuation

- `npm run build`: verified hosted Worker build and migration packaging.
- `npm run build:mobile`: shared client in `dist-mobile`.
- `node node_modules/typescript/bin/tsc --noEmit`: TypeScript check.
- `node --test tests/*.test.mjs`: focused tests after a hosted build.

D1 stores owner-scoped notebooks, configuration, memory and activity; R2 stores uploaded PDFs. The hosted app relies on private Sites edge access. Do not expose the current owner fallback as a public multi-user API.

`capacitor.config.json` points to `dist-mobile`. Native authentication/CORS, signing, store metadata and physical iOS/Android QA remain. A mobile bundle is not a store submission. See [architecture](docs/ARCHITECTURE.md), [workflow](docs/WORKFLOW.md), [decisions](docs/MEMORY-LEARNED.md) and [QA](QA.md).
