# Supporting Tech: Segmentation/Matting, TTS, Lip-Sync, Dialogue
**Date:** 2026-10-03 · **Thread:** vivid 2.5D photo interaction game — supporting tech
**Research type:** TECHNOLOGY only (research papers, official tech sites, verified blogs, GitHub repos/discussions/forums). No product-design frameworks or business articles.

**Evidence discipline:** every substantive claim carries one label:
- **[REAL]** — verified first-hand (e.g. I read the repo's actual LICENSE file, 2026-10-03).
- **[SECONDARY]** — a source claims it; source cited inline.
- **[OPEN]** — unvalidated gap; do not treat as fact.

---

## 1. Portrait segmentation / background separation

Use case in this game: cut the person out of a still photo cleanly (hair-level alpha) so the portrait can float over a parallax-reconstructed background. Needs: one-shot quality on stills > video real-time, but fast enough for user-uploaded photos at import time.

### 1.1 License verification (read from the repo itself, 2026-10-03)

| Model | Repo | LICENSE file read | Verdict |
|---|---|---|---|
| SAM2 | `facebookresearch/sam2` | `LICENSE` (main) | **Apache 2.0** [REAL] |
| BiRefNet | `ZhengPeng7/BiRefNet` | `LICENSE` (main) — "Copyright (c) 2024 ZhengPeng" | **MIT** [REAL] |
| U²-Net | `xuebinqin/U-2-Net` | `LICENSE` (master) | **Apache 2.0** [REAL] |
| MODNet | `ZHKKKe/MODNet` | `LICENSE` (master) is Apache 2.0; README "License" section: "The code, models, and demos in this repository … are released under the Apache License 2.0" | **Apache 2.0** [REAL] (code, models, AND demos — correction of the common claim that MODNet is non-commercial) |
| RVM (Robust Video Matting) | `PeterL1n/RobustVideoMatting` | `LICENSE` (master) — full GPL-3.0 text | **GPL-3.0** [REAL]. Note: default branch is `master`, not `main` — raw `main/LICENSE` 404s. README news: "Code is re-released under GPL-3.0 license" (Sep 2021) [SECONDARY] |
| BiSeNet (face-parsing impl) | `zllrunning/face-parsing.PyTorch` | `LICENSE` (master) — "Copyright (c) 2019 zll" | **MIT** [REAL] |

⚠️ GPL-3.0 flag on RVM: copyleft applies to distributed derivatives — in-process linking into a proprietary game client is the risky pattern; process-isolated server-side use avoids the "convey" trigger but still needs legal review. MODNet and BiRefNet cover the same job permissively, so RVM is avoidable.

### 1.2 Quality / speed notes

| Model | Quality tier | Speed | Notes |
|---|---|---|---|
| **SAM2** | Top zero-shot boundary quality. In one 2026 ablation (pig weight estimation, MDPI), SAM2 zero-shot beat BiRefNet by 7.2% error on boundary clarity [SECONDARY](https://WWW.MDPI.COM/2076-3417/16/11/5708). Generalist (not portrait-tuned); needs a prompt or auto-mask mode. | SAM2-L: ~23 ms latency, 42.7 FPS @ 1024² FP16 [SECONDARY](https://onlinelibrary.wiley.com/doi/10.1111/exsy.70383) (2026 medical-imaging benchmark). Tiny variant faster. | Currency: SAM3 exists in 2026 (861M params, ~43 ms) [SECONDARY](https://onlinelibrary.wiley.com/doi/10.1111/exsy.70383) — heavier, text-prompted; not needed for this game. |
| **BiRefNet** | Current SOTA for dichotomous (binary) segmentation quality; dedicated `portrait`, `matting`, `HR`, and `lite` variants [SECONDARY](https://github.com/1038lab/ComfyUI-RMBG). RMBG-2.0 (BRIA AI, BiRefNet architecture, trained on 15k+ high-quality images) is the production-hardened packaging [SECONDARY](https://github.com/adelineazure/comfyui-rmbg). | Heavier than MODNet; `BiRefNet_lite` / `lite-2K` for faster processing [SECONDARY](https://github.com/1038lab/ComfyUI-RMBG). | MIT [REAL] + portrait-specific checkpoint = strongest still-photo cutout candidate. |
| **U²-Net** | Legacy SOTA (ECCV 2020-era). Below BiRefNet/RMBG-2.0 on fine boundaries [SECONDARY — consensus across community benchmarks]. | Light, CPU-feasible; the classic `rembg` default. | Apache 2.0 [REAL]. Fine as a cheap fallback tier, not the quality pick. |
| **MODNet** | Real-time portrait matting with RGB-only input (AAAI 2022); alpha matte quality good on hair, slightly below BiRefNet-HR on hard edges [SECONDARY — community consensus; no head-to-head numbers found]. | Unpublished 7M demo model processes **2K images "fast" on common PCs or mobiles** per README [SECONDARY](https://raw.githubusercontent.com/ZHKKKe/MODNet/master/README.md); real-time webcam demos included. | Apache 2.0 incl. models [REAL]. Best pick if matting must run on-device/in-browser. |
| **RVM** | Robust human video matting; temporal memory smooths video [SECONDARY README]. | **4K @ 76 FPS, HD @ 104 FPS on GTX 1080 Ti** [SECONDARY](https://github.com/PeterL1n/RobustVideoMatting). | GPL-3.0 [REAL] — avoid for a proprietary product; MODNet covers the real-time need. |
| **BiSeNet** (face-parsing) | Semantic face-part parsing (19 classes incl. lips, eyes, hair — trained on CelebAMask-HQ per README [SECONDARY](https://raw.githubusercontent.com/zllrunning/face-parsing.PyTorch/master/README.md)). Coarser than matting; its value is *part labels*, not alpha. | Fast (lightweight real-time segmentation net). | MIT [REAL]. Use: lip-region masks for the lip-sync module, hair/face regions for animation rigs — complementary to a matting model, not a replacement. |

**Recommendation for this game:** BiRefNet (portrait/matting variant) for one-shot import-time cutout quality [hypothesis — needs a bake-off on actual game photos]; MODNet as the on-device fallback; BiSeNet face-parsing for part masks feeding the animation layer. SAM2 only if you need promptable segmentation (user taps what to keep).

---

## 2. Text-to-speech in 2026

The portrait must *talk*. Dimensions that matter: quality, voice cloning (per-character voices), streaming/low-latency (conversational), and license.

### 2.1 Open-source TTS

#### License verification (2026-10-03)

| Model | Repo | Code license | Weights license | Commercial verdict |
|---|---|---|---|---|
| **Kokoro** (82M) | `hexgrad/kokoro` | **Apache 2.0** [REAL — LICENSE file read] | Apache 2.0 (e.g. `hexgrad/Kokoro-82M` on HF) [SECONDARY](https://github.com/aynursusuz/unitts/blob/HEAD/README.md) | ✅ Clean |
| **XTTS v2** (Coqui) | `coqui-ai/TTS` | **MPL-2.0** [REAL — LICENSE.txt read] | **Coqui Public Model License 1.0.0 — non-commercial only** ("allows only non-commercial use of a machine learning model and its outputs") [SECONDARY](https://huggingface.co/coqui/XTTS-v2/blob/v2.0.2/LICENSE.txt). Coqui shut down end-2023, so a commercial license is effectively unobtainable [SECONDARY](https://github.com/anubhavg-icpl/vibe/blob/HEAD/skills/xtts-coqui-expert/SKILL.md) | ❌ Not shippable commercially. (The actively-maintained `idiap/coqui-ai-TTS` fork keeps the same code; the weight license still binds [SECONDARY](https://github.com/subtitld/addon-coqui-xtts).) |
| **CosyVoice 2** (Alibaba FunAudioLLM) | `FunAudioLLM/CosyVoice` | **Apache 2.0** [REAL — LICENSE file read] | Apache 2.0 incl. CosyVoice2-0.5B weights [SECONDARY — multiple downstream license audits, e.g.](https://github.com/shinshin86/local-tts-on-google-colab/commit/114d7505cadbe220ce2e03ddbce4aac9c7815b57) | ✅ Clean |
| **CosyVoice 3** | — | — | **Conflicting**: one source (2025-07) says CosyVoice3 weights were not open-sourced, only paper + eval set [SECONDARY](https://github.com/kizuna-ai-lab/sokuji-bridge/issues/1); a Feb-2026 article claims CosyVoice 3.0 (Dec 2025) is Apache 2.0 [SECONDARY](https://medium.com/@contact_45426/ai-voice-tech-just-got-cheap-the-2026-efficiency-revolution-c025da0a7f97) | [OPEN] — verify the actual HF model card before relying on it |
| **F5-TTS** | `SWivid/F5-TTS` | **MIT** [REAL — LICENSE file read; corrects the common "CC BY-NC" claim] | **CC-BY-NC-4.0** for all public checkpoints (inherited from the Emilia training dataset), stated in the upstream README license section [SECONDARY](https://github.com/instavar/f5-tts-lora-finetuning/blob/HEAD/README.md) | ⚠️ Code yes, weights no. Commercial use requires self-trained checkpoints. |
| **IndexTTS 1.5** | `index-tts/index-tts` (older state) | Apache-2.0, weights Apache-2.0 [SECONDARY](https://github.com/stelnetxcis-create/cielvox2/blob/HEAD/hf_readmes/indextts-1.5-GGUF.md) | — | ✅ (1.5 line) |
| **IndexTTS 2.x** | `index-tts/index-tts` (current) | **LicenseRef-Bilibili-IndexTTS** (custom model-use license covering weights AND final code — no permissive split) [SECONDARY](https://github.com/aoye-3/dubbing-room/blob/HEAD/docs/technical/indextts25-upstream-contract.md) | Same custom license; commercially permissive **but** with a scale gate: separate license above 100M MAU or ¥1B revenue; bans using output to train other models [SECONDARY](https://github.com/SubtitleEdit/subtitleedit/pull/13679) | ⚠️ Shippable with the scale gate monitored; needs legal read |
| **Fish Speech** (v1.x / S2) | `fishaudio/fish-speech` | Apache 2.0 [SECONDARY](https://github.com/kadirnar/awesome-codec-architectures/blob/HEAD/models/speech.md) | v1.x weights **CC-BY-NC-SA-4.0**; newer S2/S2-Pro under **Fish Audio Research License** (research/non-commercial; commercial via separate license) [SECONDARY](https://github.com/dangnyan/fish-speech-pyqt6-gui/blob/HEAD/docs/LICENSE.md) | ❌/⚠️ Weights not commercial-clean (official API is the commercial route) |

#### Quality / cloning / streaming notes

| Model | Quality | Voice cloning | Streaming / latency |
|---|---|---|---|
| **Kokoro-82M** | ELO comparable to 10×-larger models; won HuggingFace TTS Arena for single-speaker quality; UTMOS predicted MOS 4.46 on CPU benchmark [SECONDARY](https://medium.com/@contact_45426/ai-voice-tech-just-got-cheap-the-2026-efficiency-revolution-c025da0a7f97) [SECONDARY](https://github.com/gauravvij/kokoro-tts-vs-supertonic-3-tts/blob/HEAD/results/benchmark_report.md) | Fixed voices (no zero-shot cloning in v1) | CPU RTF ≈ 0.45–0.65 (4-core; ~2× realtime); GPU 47 ms TTFA warm, RTF 0.02 [SECONDARY](https://github.com/gauravvij/kokoro-tts-vs-supertonic-3-tts/blob/HEAD/results/benchmark_report.md) [SECONDARY](https://dev.to/danivs10/near-gpu-tts-latency-zero-gpu-what-voice-agents-actually-need-in-production-23h9). `kokoro-js` ships a `TextSplitterStream` for chunked streaming [SECONDARY](https://github.com/neovand/voicebook/blob/HEAD/references/TTS_models_Claude_Deep_Research.md). Runs WASM in-browser [SECONDARY](https://github.com/neovand/voicebook/blob/HEAD/references/TTS_models_Claude_Deep_Research.md) |
| **XTTS v2** | High (MOS ~4.2, emotion transfer) [SECONDARY](https://github.com/doronindobrocorp/research-automation/blob/HEAD/output/raw/5-3_voice-cloning-models-2026_parallel.md) | Zero-shot from **6-second** reference clip; 17 languages [SECONDARY](https://github.com/subtitld/addon-coqui-xtts) | Streaming <200 ms on consumer GPUs; ~0.1 RTF on RTX 4090 [SECONDARY](https://github.com/doronindobrocorp/research-automation/blob/HEAD/output/raw/5-3_voice-cloning-models-2026_parallel.md) [SECONDARY](https://github.com/anubhavg-icpl/vibe/blob/HEAD/skills/xtts-coqui-expert/SKILL.md) |
| **CosyVoice 2** (0.5B) | Industry-leading naturalness; 30–50% fewer pronunciation errors vs v1 [SECONDARY](https://github.com/kizuna-ai-lab/sokuji-bridge/issues/1) | Zero-shot from 3–10 s prompt; SFT / zero-shot / cross-lingual / instruct modes; strong on ZH/EN/JA/KO + Chinese dialects [SECONDARY](https://github.com/kizuna-ai-lab/sokuji-bridge/issues/1) | **Native streaming**, latency "as low as 150 ms" [SECONDARY](https://github.com/kizuna-ai-lab/sokuji-bridge/issues/1) |
| **CosyVoice 3.0** (Dec 2025) | 0.81% CER Chinese (0.5B), 1.45% WER English (1.5B); 9 languages + 18 dialects [SECONDARY](https://medium.com/@contact_45426/ai-voice-tech-just-got-cheap-the-2026-efficiency-revolution-c025da0a7f97) | 78% speaker similarity [SECONDARY, same source] | 150 ms streaming latency claimed [SECONDARY, same source] |
| **F5-TTS** (1.26B) | Strong zero-shot cloning quality | 10–15 s reference + transcript [SECONDARY](https://github.com/ivangegovdve-sudo/f5-tts-book-tts) | RTX 4090: 500 chars → ~8 s gen for ~45 s audio (RTF ~0.18); RTX 3060 ~0.67; CPU impractical (~60–200×) [SECONDARY](https://github.com/ivangegovdve-sudo/f5-tts-book-tts) |
| **IndexTTS 2.5** | Emotion + speaking-rate control; JA/ES/AR added over 1.5 [SECONDARY](https://github.com/SubtitleEdit/subtitleedit/pull/13679) | Zero-shot voice cloning [SECONDARY](https://github.com/SubtitleEdit/subtitleedit/pull/13679) | Streaming-focused (Faster IndexTTS-2 paper, arXiv 2607.21042) [SECONDARY](https://github.com/winston774/winston-10xai-toolspack) |
| **Fish Speech 1.5** | Quality leader on some arenas (ELO 1339, 3.5% WER English) [SECONDARY](https://medium.com/@contact_45426/ai-voice-tech-just-got-cheap-the-2026-efficiency-revolution-c025da0a7f97) | Voice cloning [SECONDARY](https://github.com/ori-muchim/fish-speech-int8/blob/HEAD/README.md) | Streaming supported [SECONDARY — repo is streaming-oriented] |

**Also-rans worth one line:** Pocket TTS (100M, Jan 2026, MIT, 6× realtime on MacBook Air M4, ELO 2016 — the current efficiency dark horse) [SECONDARY](https://medium.com/@contact_45426/ai-voice-tech-just-got-cheap-the-2026-efficiency-revolution-c025da0a7f97); Supertonic 3 (66–99M, sample code MIT but weights OpenRAIL-M; RTF 0.005–0.012 — fastest measured, fixed-voice) [SECONDARY](https://github.com/neovand/voicebook/blob/HEAD/references/TTS_models_Claude_Deep_Research.md); Chatterbox (Resemble AI, MIT code+weights, 23 languages, zero-shot) [SECONDARY](https://github.com/shinshin86/local-tts-on-google-colab/commit/114d7505cadbe220ce2e03ddbce4aac9c7815b57).

**Recommendation:** Kokoro (clean license, CPU-friendly, conversational latency) for fixed cast voices; CosyVoice 2 (clean license, 150 ms streaming, 3–10 s cloning) for per-portrait custom voices. XTTS v2 and F5-TTS weights and Fish Speech weights are license-blocked for a commercial game.

### 2.2 Commercial TTS APIs (ballpark — vendor/aggregator claims, verify at build time)

| Provider | Streaming latency (vendor claim) | Pricing ballpark | Cloning | Notes |
|---|---|---|---|---|
| **ElevenLabs** | Flash v2.5: **~75 ms** published; Turbo v2.5: ~250–300 ms; Multilingual v2/v3 higher quality, ~250–300 ms [SECONDARY](https://github.com/inference-sh/grid/blob/HEAD/api/elevenlabs/PRICING.md) | API pay-as-you-go: **$0.15 / 1K chars** Flash/Turbo, **$0.30 / 1K chars** Multilingual v2/v3; plan tiers discount this (Business ~$0.06 / 1K Flash) [SECONDARY](https://github.com/inference-sh/grid/blob/HEAD/api/elevenlabs/PRICING.md) [SECONDARY](https://github.com/trendpilotai/invesco-demo) | Instant (1–5 min) + Professional (30+ min) [SECONDARY](https://github.com/doronindobrocorp/research-automation/blob/HEAD/output/raw/5-3_voice-cloning-models-2026_parallel.md) | 32 langs (Flash) → 70+ (v3). WebSocket streaming. Content policy: prohibits "unauthorized sexualization" — check against game content [SECONDARY](https://github.com/doronindobrocorp/research-automation/blob/HEAD/output/raw/5-3_voice-cloning-models-2026_parallel.md) |
| **Cartesia** (Sonic 3.6 current) | **Sub-90 ms** model latency (vendor claim; third-party measures ~40 ms TTFA fastest tier) [SECONDARY](https://github.com/alexkapadia/omni/blob/HEAD/docs/research/naomi/cartesia-sonic-realtime-tts/summary.md) [SECONDARY](https://www.marktechpost.com/2026/08/18/cartesia-ships-sonic-3-6-a-streaming-tts-model-that-now-leads-both-artificial-analysis-speech-arenas/) | Credit plans: $5/mo ≈ 133 min … $299/mo ≈ 10,667 min; Artificial Analysis normalizes ~**$49 / 1M chars** [SECONDARY](https://github.com/timoconnellaus/orchestrator/blob/HEAD/docs/research/voice-responsiveness-options.md) [SECONDARY](https://www.marktechpost.com/2026/08/18/cartesia-ships-sonic-3-6-a-streaming-tts-model-that-now-leads-both-artificial-analysis-speech-arenas/) | Instant from ~10 s [SECONDARY](https://www.marktechpost.com/2026/08/18/cartesia-ships-sonic-3-6-a-streaming-tts-model-that-now-leads-both-artificial-analysis-speech-arenas/) | Leads Artificial Analysis speech arenas (2026-08) [SECONDARY, same]. WebSocket streaming; LiveKit Agents plugin exists [SECONDARY](https://www.marktechpost.com/2026/08/18/cartesia-ships-sonic-3-6-a-streaming-tts-model-that-now-leads-both-artificial-analysis-speech-arenas/) |
| **OpenAI** | ~300 ms (TTS), ~500 ms (TTS HD) per third-party aggregation [SECONDARY](https://github.com/trendpilotai/invesco-demo) | tts-1 **$15 / 1M chars**, tts-1-hd **$30 / 1M chars**; gpt-4o-mini-tts: **$0.60 / 1M input tokens + $12 / 1M audio-output tokens** [SECONDARY](https://tech-insider.org/text-to-speech-api-gemini-vs-elevenlabs-2026/) [SECONDARY](https://github.com/trendpilotai/invesco-demo) | None (fixed voices) | Realtime API (speech-to-speech) is the conversational path — different product from REST TTS |
| **Azure Speech** | ~200 ms (neural) per third-party aggregation [SECONDARY](https://github.com/trendpilotai/invesco-demo) | Neural **~$16 / 1M chars** [SECONDARY](https://github.com/trendpilotai/invesco-demo) | Limited custom voice [SECONDARY, same] | 100+ languages; server-side VAD/semantic turn detection for voice agents [SECONDARY](https://github.com/srthorat/livekit-realtime-voice-agent/blob/HEAD/ENGINEERING_CHALLENGES.md) |

**Cost framing:** ~1,000 chars ≈ 1 minute of audio [SECONDARY](https://github.com/trendpilotai/invesco-demo). Self-hosted Kokoro costs compute only (CPU-feasible); commercial APIs are 10–100× more per minute but zero GPU ops.

---

## 3. Lip-sync as a separate module

The pipeline is: dialogue text → TTS audio → lip-sync module paints mouth motion onto the portrait (or its video frames). Separate module = you can swap voices/models without retraining the face.

### 3.1 License verification (2026-10-03)

| Model | Repo | LICENSE read | Verdict |
|---|---|---|---|
| **Wav2Lip** | `Rudrabha/Wav2Lip` | No LICENSE file (404 on raw). README "License and Citation": "**This repository can only be used for personal/research/non-commercial purposes.** For commercial requests contact rudrabha@synclabs.so" — authors pivoted to paid Sync Labs [SECONDARY](https://github.com/pkprajapati7402/wav2lip) [SECONDARY](https://github.com/adithya11sci/speech_assistent) | ❌ Non-commercial only (README statement, not an OSI license) |
| **LatentSync** | `bytedance/LatentSync` | `LICENSE` (main) = **Apache 2.0** [REAL] | ✅ (corrects the common "CC BY-NC-SA" claim) |
| **MuseTalk** | `TMElyralab/MuseTalk` | `LICENSE` (master) = **MIT**, © 2024 Tencent Music Entertainment Group [REAL]. Bundled LICENSE also documents deps: SD-VAE-ft-mse MIT, Whisper MIT, face-parsing.PyTorch MIT, DWPose Apache-2.0, S3FD, face-alignment BSD-3 [REAL] | ✅ Cleanest legal profile |

### 3.2 Quality / speed / fit

| Model | Approach | Quality | Speed / cost | Fit |
|---|---|---|---|---|
| **Wav2Lip** (2020) | GAN, mouth-crop inpaint | Dated; small blurry mouth crop (96 px) [SECONDARY](https://sync.so/blog/what-is-latentsync) | Light (runs on modest GPU/CPU-ish); file-based, not streaming-friendly [SECONDARY](https://github.com/adithya11sci/speech_assistent) | ❌ License-blocked for commercial; quality dated anyway |
| **LatentSync** (1.5 / 1.6, ByteDance, Dec 2024) | Audio-conditioned **latent diffusion** (SD-based) on mouth region; Whisper audio embeddings + SyncNet supervision [SECONDARY](https://sync.so/blog/what-is-latentsync) | **Highest open-source fidelity**: 256–512 px face region, sharp, temporally stable; 1.6 trained at 512 px [SECONDARY](https://sync.so/blog/what-is-latentsync) | 1.5: ~8 GB VRAM; 1.6: ~18 GB VRAM. Diffusion = **minutes per clip**, not real-time [SECONDARY](https://sync.so/blog/what-is-latentsync) | ✅ **Offline/asset-pipeline lip-sync** (pre-render portrait lines), not conversational |
| **MuseTalk** (Tencent Music) | Mouth-region inpaint (256 px) | Good real-time quality; seams on extreme pose [SECONDARY](https://github.com/adme-dev/dashboard/blob/HEAD/docs/engagr-ai-media-studio-presenter-RnD.md) | **Real-time 30 fps+ on V100; runs in 4 GB fp16** [SECONDARY, same] | ✅ **Real-time conversational lip-sync** candidate |

Caveats logged from downstream analyses [SECONDARY](https://github.com/adme-dev/dashboard/blob/HEAD/docs/engagr-ai-media-studio-presenter-RnD.md): LatentSync's HF tag mentions `creativeml-openrail-m` via the SD-VAE dependency and it uses InsightFace (non-commercial) for alignment — reconcile in legal review / swap the detector. MuseTalk's HF tag also references OpenRAIL-m via SD-VAE despite "commercial OK" prose — same reconcile step.

### 3.3 When lip-sync-only vs full-head animation

- **Lip-sync-only** (MuseTalk / LatentSync on an existing portrait/video): the identity, pose, lighting, and background stay exactly the source photo; only the mouth moves. Right when the game is "the photo itself comes alive and talks" — the Hogwarts-portrait feel demands the portrait stay *the portrait* [reasoning from task requirements].
- **Full-head animation** (e.g. LivePortrait — MIT, 1 still image + audio/video → head pose + expression + mouth [SECONDARY](https://github.com/damionrashford/media-os/blob/HEAD/skills/media-lipsync/SKILL.md); or Sonic/Tencent — CC-BY-NC-SA, blocked): invents head motion and expressions. Rule of thumb from the field: still photo → portrait-animation model for expressive motion; existing video → lip-sync to preserve the real face/performance [SECONDARY](https://github.com/damionrashford/media-os/blob/HEAD/skills/media-lipsync/SKILL.md).
- For this game: **lip-sync-only is the primary path** (identity preservation is the whole point); consider a subtle full-head layer (LivePortrait-class, offline) only for idle "breathing" motion, gated on quality review.

---

## 4. Dialogue layer (plumbing only — kept brief)

Not model selection; the transport and turn-taking machinery around an LLM.

- **Two architectures** [SECONDARY](https://dev.to/jarvisbitztech/production-voice-ai-architecture-in-2026-how-realtime-conversational-agents-are-built-558p): (a) **chained pipeline** — STT → text LLM → TTS, inspectable at every stage (policy checks, transcripts), turn-taking owned by you; (b) **speech-to-speech** (OpenAI Realtime API, Gemini Live) — lower latency, less inspectable.
- **Latency chain** (measured in the wild): VAD detects speech end 20–150 ms → audio commit/network RTT → model first-audio-token 300–900 ms → TTS streams back [SECONDARY](https://github.com/srthorat/livekit-realtime-voice-agent/blob/HEAD/ENGINEERING_CHALLENGES.md). Humans switch turns in ~208 ms on average [SECONDARY](https://github.com/kadirnar/voice-agent-next/blob/HEAD/docs/research/04-turn-taking-vad-interruptions.md) — sub-second is the bar, not a nice-to-have.
- **Turn-taking is the hard problem**, not the LLM: LiveKit Agents defaults to a semantic turn-detector model (meaning + acoustics), with VAD-only / STT-endpointing / realtime-model / manual modes [SECONDARY](https://dev.to/jarvisbitztech/production-voice-ai-architecture-in-2026-how-realtime-conversational-agents-are-built-558p); Pipecat splits turn-start (VAD) from turn-end (SmartTurn model) [SECONDARY, same]. LiveKit eot-bench: keeping false cutoffs at 5% costs ~543 ms even for the best detector [SECONDARY](https://github.com/abhisheksharma-17/livekit-agent-platform/blob/HEAD/docs/research-v6/low-latency-stack.md).
- **VAD + barge-in off the shelf** [SECONDARY](https://dev.to/quintana/roomkit-pipecat-ten-framework-livekit-agents-choosing-the-right-conversational-ai-framework-2h80): Silero VAD (both frameworks), Pipecat `InterruptionFrame` auto-cancels in-flight generation, LiveKit built-in interruption handling (+ adaptive interruption, Cloud-only, Mar 2026), OpenAI/Azure Realtime server-side VAD + `interrupt_response`. All support interruption today; false-interruption handling (backchannels like "uh-huh") is the tuning surface.
- **Frameworks (actively released Sep 2026)**: `livekit-agents` 1.8.2, `pipecat-ai` 1.11.0; TEN Framework and RoomKit are alternatives [SECONDARY](https://dev.to/jarvisbitztech/production-voice-ai-architecture-in-2026-how-realtime-conversational-agents-are-built-558p) [SECONDARY](https://dev.to/quintana/roomkit-pipecat-ten-framework-livekit-agents-choosing-the-right-conversational-ai-framework-2h80). Both ship TTS plugins (Deepgram, ElevenLabs, Cartesia, OpenAI…) so the TTS choice from §2 plugs in without custom glue.
- **On-device vs API LLM**: chained pipeline lets you start with an API LLM (fastest time-to-talking-portrait) and swap to on-device later; speech-to-speech APIs are API-only by construction. For this game the chained pipeline + streaming LLM (TTFT is the metric to shop) + streaming TTS (Kokoro/CosyVoice 2/Cartesia) is the pragmatic stack.

---

## 5. Comparison tables

### 5.1 Segmentation / matting

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| BiRefNet | High (SOTA dichotomous seg; portrait/HR/lite variants) | Top still-photo boundaries | Heavy (GPU; lite variants exist) | Self-host compute | **MIT** [REAL] |
| MODNet | High (AAAI 2022; widely deployed) | Good alpha, below BiRefNet-HR on hard edges | Real-time; 2K on common PC/mobile | Self-host compute | **Apache 2.0** (code+models) [REAL] |
| SAM2 | High (foundation model; SAM3 now exists) | Top zero-shot boundaries; generalist | 23 ms (L) @1024² FP16 | Self-host compute | **Apache 2.0** [REAL] |
| U²-Net | Legacy (2020) | Below current SOTA | Light / CPU-feasible | Self-host compute | **Apache 2.0** [REAL] |
| RVM | High but archived-ish (2021) | Strong video matting | 4K@76fps / HD@104fps (1080 Ti) | Self-host compute | **GPL-3.0** [REAL] — avoid |
| BiSeNet face-parsing | High (standard tooling) | Part labels, not alpha | Fast | Self-host compute | **MIT** [REAL] |

### 5.2 Open-source TTS

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| Kokoro-82M | High (HF arena winner) | MOS 4.46 (UTMOS); 10×-size ELO parity | CPU ~2×RT; GPU 47 ms TTFA | Compute only | **Apache 2.0** (code+weights) [REAL/SECONDARY] |
| CosyVoice 2 | High (Alibaba flagship OSS) | SOTA multilingual naturalness | ~150 ms streaming | Compute only | **Apache 2.0** (code [REAL]; weights [SECONDARY]) |
| F5-TTS | High | Strong cloning quality | 4090 RTF ~0.18 (batch-ish) | Compute only | Code **MIT** [REAL]; weights **CC-BY-NC** [SECONDARY] — blocked |
| XTTS v2 | High but **unmaintained** (Coqui dead; idiap fork) | MOS ~4.2 | <200 ms streaming | Compute only | Code **MPL-2.0** [REAL]; weights **CPML non-commercial** [SECONDARY] — blocked |
| IndexTTS 2.5 | Medium-high (2026 line) | Emotion/rate control | Streaming-focused | Compute only | **Bilibili custom** (scale gate) [SECONDARY] |
| Fish Speech | High | Arena quality leader (v1.5) | Streaming | Compute only / API | Weights **CC-BY-NC-SA / Research License** [SECONDARY] — blocked |

### 5.3 Commercial TTS APIs

| Provider | Maturity | Quality | Latency (claimed) | Cost ballpark | License |
|---|---|---|---|---|---|
| ElevenLabs | Highest (market leader) | Top (v3 arena-class) | ~75 ms (Flash v2.5) | $0.15–0.30 / 1K chars PAYG | Proprietary; content policy applies |
| Cartesia (Sonic 3.6) | High (arena leader 2026-08) | Top | sub-90 ms | ~$49 / 1M chars (AA-normalized) | Proprietary |
| OpenAI | High | Strong (fixed voices) | ~300–500 ms | $15–30 / 1M chars; mini-tts token-based | Proprietary |
| Azure Speech | Highest (enterprise) | Strong | ~200 ms | ~$16 / 1M chars neural | Proprietary |

### 5.4 Lip-sync

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| MuseTalk | High (Tencent Music; 2025 training code) | Good; seams on extreme pose | **Real-time 30fps+ (V100, 4 GB fp16)** | Compute | **MIT** [REAL] |
| LatentSync 1.5/1.6 | High (ByteDance; active forks) | Best OSS fidelity (512 px) | Minutes/clip (offline) | Compute (8–18 GB VRAM) | **Apache 2.0** [REAL] (weights/detector caveats [SECONDARY]) |
| Wav2Lip | Legacy (2020) | Dated (96 px GAN) | Light | Compute | **Non-commercial README terms** [SECONDARY] — blocked |

### 5.5 Dialogue plumbing

| Component | Off-the-shelf 2026 | Notes |
|---|---|---|
| Voice frameworks | LiveKit Agents 1.8.2, Pipecat 1.11.0 (Sep 2026) [SECONDARY] | Session-managed pipelines; TTS/STT plugins included |
| VAD | Silero VAD (both frameworks); server VAD (OpenAI/Azure Realtime) [SECONDARY] | 20–150 ms speech-end detection [SECONDARY] |
| Turn detection | LiveKit semantic turn detector; Pipecat SmartTurn; Flux; AssemblyAI [SECONDARY] | Best ~543 ms @ 5% false cutoffs (eot-bench) [SECONDARY] |
| Barge-in | Built-in both frameworks + Realtime APIs [SECONDARY] | LiveKit adaptive interruption is Cloud-only [SECONDARY] |
| Streaming LLM | Any — TTFT is the shopping metric | Chained pipeline keeps model swappable |

---

## 6. Stack sketch for the vivid-2.5D game (hypotheses, not validated)

1. **Import:** BiRefNet-portrait cutout (MIT) → hair-level alpha; BiSeNet face-parsing (MIT) → part masks for the animation rig.
2. **Voice:** Kokoro (Apache 2.0) for the fixed cast; CosyVoice 2 (Apache 2.0) if per-portrait cloned voices are needed (3–10 s prompt each).
3. **Mouth:** MuseTalk (MIT) for real-time conversation; LatentSync (Apache 2.0) for pre-rendered cinematic lines.
4. **Conversation:** Chained pipeline (STT → LLM → streaming TTS) on LiveKit Agents or Pipecat — inspectable text stage for the game's content policy; Silero VAD + built-in barge-in.
5. **Do not use commercially:** XTTS v2, F5-TTS, Fish Speech weights (non-commercial); Wav2Lip (non-commercial); RVM (GPL-3.0 copyleft risk).

Validation gates before any of this counts as a decision: bake-off BiRefNet vs MODNet vs SAM2 on actual game photos; MOS/AB test Kokoro vs CosyVoice 2 voices for the cast; measure MuseTalk real-time on the target GPU; legal read of LatentSync weight terms and IndexTTS 2.x scale gate.

---

## Sources (inline above; key repos)

- Segmentation: https://github.com/facebookresearch/sam2 · https://github.com/ZhengPeng7/BiRefNet · https://github.com/xuebinqin/U-2-Net · https://github.com/ZHKKKe/MODNet · https://github.com/PeterL1n/RobustVideoMatting · https://github.com/zllrunning/face-parsing.PyTorch
- TTS: https://github.com/hexgrad/kokoro · https://github.com/coqui-ai/TTS · https://github.com/FunAudioLLM/CosyVoice · https://github.com/SWivid/F5-TTS · https://github.com/index-tts/index-tts · https://github.com/fishaudio/fish-speech
- Lip-sync: https://github.com/Rudrabha/Wav2Lip · https://github.com/bytedance/LatentSync · https://github.com/TMElyralab/MuseTalk
- Dialogue: https://github.com/livekit/agents · https://github.com/pipecat-ai/pipecat
