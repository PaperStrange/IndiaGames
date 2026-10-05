# 2.5D Photo Effects from a Single Still Image — Technology Research
**Date:** 2026-10-03 · **Thread:** 02a (depth + 2.5D parallax) · **Research type:** TECHNOLOGY
(sources: research papers, official tech sites/blogs, GitHub repos — opened and read directly unless labeled otherwise)

**Evidence legend:** [REAL] = I opened the repo/paper/page and verified it myself. [SECONDARY] = a paper, blog, or third-party repo claims it (source cited). [OPEN] = unvalidated gap. **Rule applied:** claims never run ahead of ground truth.

> AGENTS.md note: the 2026-10-03 first-hand-testing law applies to *playing* game products in the live browser; this thread is second-hand technology research by design, and says so plainly.

---

## 1. Monocular depth estimation SOTA (as of 2026-10-03)

### 1.1 The 2026 default: Depth Anything 3 (DA3)

Depth Anything 3 (ByteDance Seed, ICLR 2026; arXiv:2511.10647, released Nov 2025) is the current SOTA and community default [SECONDARY — playbook and research notes from multiple independent repos agree; the arXiv paper states: "surpassing prior SOTA VGGT by an average of 35.7% in camera pose accuracy and 23.6% in geometric accuracy", and "outperforms DA2 in monocular depth estimation" — quoted in the official README, https://github.com/ByteDance-Seed/Depth-Anything-3].

- **Architecture:** vanilla DINOv2 ViT encoder (frozen) + DualDPT head; single depth-ray prediction target; one checkpoint spans monocular, multi-view, and pose estimation [REAL — read in the official README].
- **3D Gaussian head:** the main-series models directly predict 3D Gaussians for "high-fidelity novel view synthesis" [REAL — read in the official README "3D Gaussian Estimation" bullet].
- **Model zoo + license (per-model, critical for commercial use):**

| Checkpoint | Params | License (as listed in official README model table) |
|---|---|---|
| DA3NESTED-GIANT-LARGE(-1.1) | 1.40B | CC BY-NC 4.0 |
| DA3-GIANT(-1.1), DA3-LARGE(-1.1) | 1.15B / 0.35B | CC BY-NC 4.0 |
| DA3-BASE | 0.12B | Apache 2.0 |
| DA3-SMALL | 0.08B | Apache 2.0 |
| DA3METRIC-LARGE | 0.35B | Apache 2.0 |
| DA3MONO-LARGE | 0.35B | Apache 2.0 |

[REAL — read directly from the README model-zoo table, https://github.com/ByteDance-Seed/Depth-Anything-3; repo-level LICENSE file = Apache 2.0, but **individual weights carry the NC restriction above** — the table is explicit per row.]
- **Metric depth:** `DA3METRIC-LARGE` is the metric fine-tune; conversion `metric_depth = focal * net_output / 300` [REAL — official README FAQ].
- **DA3-Streaming** (Nov 2025): sliding-window inference for long video on <12GB GPU [REAL — official README News].
- **Community maturity:** ComfyUI nodes, Blender addon, ROS2 + TensorRT real-time wrappers already exist [REAL — "Awesome DA3 Projects" section, official README].
- **Speed/VRAM:** "Fast on GPU; usable but slow on CPU" [SECONDARY — fullstackcv/playbook]; exact per-checkpoint latency numbers were not published in the README [OPEN — no benchmark table for ms/VRAM found in the repo].

**Commercial read:** for a commercial product, only DA3-SMALL / DA3-BASE / DA3MONO-LARGE / DA3METRIC-LARGE are license-clean (Apache 2.0). The best depth quality lives in the Giant/Large weights, which are **CC BY-NC 4.0 — non-commercial only**. This is the single most important license trap in the 2026 depth landscape.

### 1.2 Depth Anything V2 (2024, still the deployment workhorse)

- Checkpoints: Small 24.8M / Base 97.5M / Large 335.3M / Giant 1.3B (Giant listed "coming soon" on the page) [REAL — official README, https://github.com/DepthAnything/Depth-Anything-V2].
- **License:** "Depth-Anything-V2-Small model is under the Apache-2.0 license. Depth-Anything-V2-Base/Large/Giant models are under the CC-BY-NC-4.0 license." [REAL — README "LICENSE" section, verbatim].
- **On-device proof (official vendor numbers):**
  - Apple official Core ML FP16 export (`apple/coreml-depth-anything-small`): iPhone 12 Pro Max **31.1 ms**, iPhone 15 Pro Max **33.9 ms**, MacBook M3 Max **24.6 ms** on Neural Engine [SECONDARY — Apple's official HuggingFace model card inference-time table, https://huggingface.co/apple/coreml-depth-anything-small].
  - Qualcomm official ONNX NPU numbers for Depth-Anything-V2: Snapdragon 8 Gen 3 **36.4 ms** (float) / **20.3 ms** (w8a16); Snapdragon 8 Elite **25.4 ms**; Snapdragon 8 Elite Gen 5 **18.8 ms**; Snapdragon X2 Elite **19.1 ms** float / **12.3 ms** w8a16 [SECONDARY — Qualcomm's official HF card performance table, https://huggingface.co/qualcomm/Depth-Anything-V2].
  - Quest 3 via LiteRT GPU delegate: V2-Small TFLite 518×518 = **180–183 ms** (CPU fallback ~4 s) [SECONDARY — https://github.com/neonatural/xr-3d-viewer/blob/HEAD/DEPTH_MODEL_BENCHMARK.md].
- V2-Small at 24.8M params remains the best-evidenced **commercially clean** small model for real-time use; V2 is supported in Transformers, Apple Core ML, TensorRT, ONNX, Android, and Transformers.js real-time web depth [REAL — official README community-support section].

### 1.3 MoGe / MoGe-2 / MoGe-3 (Microsoft — the MIT-licensed alternative)

- Official repo https://github.com/microsoft/MoGe. **MoGe-3 released 2026-08-18** — "significantly improved fine-grained point map geometry" [REAL — official README News].
- One model, one forward pass: metric point maps + metric depth + normals + camera FOV + valid-pixel mask [REAL — official README Features].
- Checkpoints: MoGe-3 vitg 1.25B / vitl 370M; MoGe-2 vitl 326M, vitb 104M, vits 35M [REAL — official README pretrained table].
- **License:** "MoGe code is released under the MIT license, except for DINOv2 code in `moge/model/modules/dinov2` which is released by Meta AI under the Apache 2.0 license. See LICENSE for more details." [REAL — read in the official README §License].
- **Speed (authors' claim):** "Achieves 60ms latency per image (A100 or RTX3090, FP16, ViT-L)" [SECONDARY — official README; authors' own number, conditions named but not independently reproduced here].
- Direct GLB/PLY export with textured meshes built into the CLI (`moge infer ... --glb --ply`) [REAL — official README usage section] — unusually production-friendly for a research model.
- MoGe-3 has sparse volumetric refinement (3 steps default) and **does not support macOS** (Triton/FlexGEMM dependency) [REAL — official README].
- Mobile: community TFLite export of MoGe-2 ViT-S (35M): 136 MB file, **~522 ms on Pixel 8a GPU** [SECONDARY — https://github.com/john-rocky/LiteRT-Models/releases/tag/v3].
- **Commercial read:** MIT = clean. MoGe is the strongest license-clean competitor to DA3 for metric geometry, and its output (point map + intrinsics in one pass) is exactly what 2.5D rendering needs.

### 1.4 Depth Pro (Apple, 2024)

- Official repo now at https://github.com/apple-aiml-research/ml-depth-pro. Sharp metric monocular depth, "producing a 2.25-megapixel depth map in 0.3 seconds on a standard GPU" [SECONDARY — authors' claim quoted in the official README].
- **License: Apple Machine Learning Research License (AMLR) = non-commercial research only** [SECONDARY — two independent sources agree: https://github.com/computer-vision-dhankar-rohit/spatial_raw and https://github.com/yats0x7/depthwizard; repo license field reads "Other (NOASSERTION)" [REAL]]. **Not usable in a commercial product.**

### 1.5 UniDepth / UniDepthV2 / UniK3D (ETH Zurich)

- Universal metric depth predicting its own camera intrinsics from one uncalibrated image [SECONDARY — UniDepthV2 paper summary].
- **License: CC BY-NC 4.0 (non-commercial)** [SECONDARY — upstream LICENSE cited verbatim by multiple independent forks, e.g. https://github.com/yester31/monocular_depth_estimation_trt; the successor repo UniK3D's own README states "released under Creative Commons BY-NC 4.0" [SECONDARY — https://github.com/lpiccinelli-eth/unik3d]]. **Not usable in a commercial product.**
- Speed reference: community TensorRT build of UniDepthV2 vitb ≈ 27 ms @518×518 (conditions unrecorded, not reproducible) [SECONDARY — https://github.com/yester31/monocular_depth_estimation_trt].

### 1.6 Marigold (ETH Zurich, CVPR 2024 Oral)

- Diffusion-based depth (Stable Diffusion 2 U-Net backbone): exceptionally sharp object boundaries — the sharpest edges of any depth model here — at the cost of diffusion iterations (10–50 denoising steps; v1.1 adds LCM checkpoint, 2025-05) [REAL — read in the official README, https://github.com/prs-eth/Marigold].
- **License: code Apache 2.0** [REAL — GitHub repo license metadata + separate LICENSE.txt]; model weights on HF are listed Apache-2.0 [SECONDARY — HF model card].
- Now a family (depth, normals, intrinsic decomposition) merged into `diffusers` core [REAL — official README News].
- **Role in the pipeline:** too slow for real-time, but the best boundary fidelity for **offline** depth generation (boundaries are what sell 2.5D parallax).

### 1.7 ZoeDepth (Intel, 2023) and MiDaS

- ZoeDepth: **MIT license** [REAL — repo metadata] but the project is **archived and not under active management** — "Intel has ceased development and contributions" [REAL — README header, https://github.com/isl-org/ZoeDepth]. Superseded by DA3/MoGe; usable but dead.
- MiDaS: MIT [SECONDARY — landscape table at https://github.com/yats0x7/depthwizard]; also Intel-archived; legacy baseline only.

### 1.8 Summary table — depth backbones, 2026

| Model | License (commercial OK?) | Params (small→large) | Notable speed evidence | Standing 2026 |
|---|---|---|---|---|
| DA3 (ByteDance) | Apache-2.0 **only** for Small/Base/Mono/Metric; Giant/Large/Nested = CC BY-NC 4.0 | 0.08B–1.4B | no official ms table [OPEN] | SOTA, active (ComfyUI, Blender, ROS2/TensorRT community) |
| DA V2 (TikTok/HKU) | Apache-2.0 Small; B/L/G = CC BY-NC 4.0 | 24.8M–1.3B | 31 ms iPhone NPU (Apple); 18–36 ms Snapdragon NPU (Qualcomm) | Deployment workhorse, best on-device evidence |
| MoGe-3 (Microsoft) | **MIT** (DINOv2 part Apache-2.0) | 370M / 1.25B | 60 ms A100/3090 FP16 vitl (authors) | Best license-clean metric geometry; GLB/PLY export built in |
| Depth Pro (Apple) | **No** — AMLR research-only | — | 0.3 s / 2.25MP (authors) | Best boundary sharpness, but commercially unusable |
| UniDepthV2 | **No** — CC BY-NC 4.0 | ViT-S/B/L | ~27 ms TensorRT (community) | Strong, but NC |
| Marigold | Apache-2.0 | SD2 U-Net | slow (diffusion) | Sharpest edges; offline use |
| ZoeDepth / MiDaS | MIT but archived/dead | — | — | Legacy only |

---

## 2. Single image → 2.5D parallax techniques

### 2.1 3D Photos / LDI — Layered Depth Images (Shih et al., CVPR 2020) — PRODUCTION-READY

- "3D Photography Using Context-Aware Layered Depth Inpainting" (Shih, Su, Kopf, Huang, Facebook Reality Labs): depth → Layered Depth Image with **context-aware inpainting of occluded layers**; this is the technology behind Facebook's 3D Photos feature [SECONDARY — paper abstract via https://www.researchgate.net/publication/343461051_3D_Photography_Using_Context-Aware_Layered_Depth_Inpainting].
- LDI = RGBA-D per layer; rendering is texture-mapped mesh/quad strips — trivially real-time in any GL/WebGL pipeline. Shipped at Facebook scale = the only approach here with mass-production deployment evidence [SECONDARY — Facebook 3D Photos is the deployed product of this paper].
- Verdict: **the reference production architecture** for photo parallax. Inpainting is done once per photo (import time), rendering is real-time.

### 2.2 3D Ken Burns (Niklaus et al., 2019) — RESEARCH DEMO, conceptually foundational

- Semantic-aware depth → point cloud → forward-warp rendering along a camera path, with color+depth inpainting of disocclusions at extreme views [SECONDARY — paper abstract, arXiv:1909.05483].
- Established the canonical pipeline (depth → point cloud → inpaint → render) that everything else builds on; the repo is a research demo, not a product component.

### 2.3 MPI — Multiplane Images, esp. AdaMPI (Han et al., SIGGRAPH 2022)

- Adaptive MPI: learned per-image plane placement + warp-back self-supervision from single-view collections; beat prior methods on Ken Burns LPIPS/PSNR/SSIM benchmarks in the paper [SECONDARY — AdaMPI paper Table 1 via http://arxiv.org/pdf/2205.11733v1].
- Rendering MPI = N textured quads alpha-composited in a shader: extremely cheap, mobile-GPU friendly, real-time [analysis of the published technique; the rendering cost is standard alpha compositing].
- **License: "personal/research/non-commercial purposes only"** [SECONDARY — quoted identically in three independent mirror repos, e.g. https://github.com/dio3ding/adampi]. Research reference, not shippable.
- Note: the *technique* (MPI rendering) is not patented-by-this-paper in a way that blocks reimplementation, but the pretrained model and code are NC — any commercial MPI path means reimplementing planes on top of your own depth [analysis].

### 2.4 SynSin (Wiles et al., CVPR 2020) — research demo

- End-to-end single-image view synthesis with a differentiable point-cloud renderer + GAN refinement [SECONDARY — https://github.com/facebookresearch/synsin]. Influential, but superseded in quality by MPI/LDI/GS approaches; license not verified here [OPEN].

### 2.5 Feed-forward 3D Gaussian Splatting from a single image — RESEARCH, promising

- **Flash3D** (Szymanowicz et al., 3DV 2025; arXiv:2406.04343): builds on a monocular depth foundation model, predicts a first layer of 3D Gaussians at predicted depth plus offset layers behind occlusions; "trainable on a single GPU in a day"; SOTA on RealEstate10K, strong zero-shot transfer to NYU/KITTI [SECONDARY — paper abstract, https://arxiv.org/abs/2406.04343]. Rendering via 3DGS rasterizer = hundreds of FPS class [SECONDARY — Splatter Image paper reports 588 FPS for the same renderer family].
- **License status: the official repo https://github.com/eldar/flash3d has NO license file at all** [REAL — root file list shows no LICENSE]. No license = no grant = all rights reserved. **Cannot be used commercially as-is.**
- **Splatter Image** (Szymanowicz et al., CVPR 2024): one 3D Gaussian per pixel via 2D image-to-image net; 38 FPS reconstruction, 588 FPS rendering [SECONDARY — paper, https://arxiv.org/pdf/2312.13150]; object-focused, not scenes.
- **DA3's 3D Gaussian head** (see §1.1): direct 3DGS prediction from the depth foundation model [REAL — official README], but only on the Giant/Nested checkpoints = CC BY-NC 4.0 = non-commercial [REAL — model table].
- Newer related work: Bolt3D (ICCV 2025, feed-forward 3D scene *generation* in 6.25s, Szymanowicz et al.) and LagerNVS (CVPR 2026 highlight, real-time NVS) [SECONDARY — https://szymanowiczs.github.io/] — generative, not reconstructive; watch-list, not pipeline components today.

### 2.6 Production-readiness ranking (2.5D parallax from one photo)

1. **Depth map → LDI/point-cloud mesh → WebGL render, inpaint once offline** — PRODUCTION-READY (shipped at Facebook scale; all components Apache-2.0/MIT available today).
2. **Depth map → MPI planes in a custom shader** — production-feasible, but you'd reimplement the MPI fit (AdaMPI weights are NC); engineering cost medium.
3. **Feed-forward 3DGS (Flash3D-style)** — research: best quality-per-effort trajectory, but no license grant and single-dataset generalization caveats; revisit in 12–18 months.
4. **Diffusion NVS (CAT3D/Zero123-style, FlashWorld)** — offline/seconds-scale, not interactive; not suitable for the real-time parallax loop.

---

## 3. Occlusion / disocclusion inpainting

Key architectural fact: for a 2.5D photo product, inpainting happens **once per photo at import** (filling background revealed at extreme parallax angles), not per frame — so throughput matters, interactivity does not.

| Model | License (verified) | Maturity / notes |
|---|---|---|
| **LaMa** (WACV 2022) | **Apache-2.0** [REAL — repo metadata, https://github.com/advimman/lama] | 10k stars; the default. Fourier convs, generalizes to ~2k resolution despite 256px training; powers cleanup.pictures, lama-cleaner, CoreML ports [REAL — README]. `big-lama` checkpoint is the quality pick. |
| ZITS / ZITS++ (CVPR 2022 / TPAMI 2023) | **Apache-2.0** [SECONDARY — https://github.com/cthackers/inpaint/blob/HEAD/THIRD_PARTY_NOTICES.md] | Structure-aware transformer inpainting; quality-competitive with LaMa, less ecosystem. |
| MAT (ICCV 2021) | **CC BY-NC 4.0** [SECONDARY — same source] | Strong quality, commercially unusable. |
| MI-GAN (Picsart) | **MIT** [SECONDARY — same source] | Lightweight alternative. |
| SDXL Inpainting | CreativeML Open RAIL++-M (use restrictions) [SECONDARY — same source] | Diffusion = slow; only for hero-quality offline passes. |

**Pick: LaMa** — Apache-2.0, most battle-tested, runs on GPU in seconds per image, and the disocclusion masks in 2.5D parallax are narrow strips where LaMa excels.

---

## 4. Mobile / on-device depth in 2026

- **iOS:** Apple ships official Core ML Depth Anything (V1 small + V2 small) — V2-Small FP16: **~31–34 ms on iPhone 12/15 Pro Max Neural Engine**, 24.6 ms on M3 Max [SECONDARY — https://huggingface.co/apple/coreml-depth-anything-small]. Community CoreML conversion of **DA3-Small** (0.08B): 44 MB download, ~300 MB peak RAM, iOS 17+ [SECONDARY — https://huggingface.co/mlboydaisuke/Depth-Anything-3-Small-CoreML]. LaMa also has CoreML ports [REAL — LaMa README lists CoreMLaMa].
- **Android/Qualcomm:** official Depth-Anything-V2 NPU builds: **18–36 ms** on Snapdragon 8 Gen 3 → 8 Elite Gen 5 (w8a16 fastest) [SECONDARY — https://huggingface.co/qualcomm/Depth-Anything-V2]. Community Android demos and ncnn ports exist [REAL — DA2 README lists them]. MoGe-2 ViT-S TFLite: ~522 ms on Pixel 8a GPU [SECONDARY — LiteRT-Models release].
- **Web:** Transformers.js real-time depth in browser via WebGPU [REAL — DA2 README links the live Space]; 3DGS WebGL viewers exist in the community [OPEN — not verified this session].
- **Bottom line:** phone-friendly depth is a solved problem — DA2-Small class models run at 20–35 ms on 2024–2026 phone NPUs. The constraint is never depth latency; it's license (use Apache-2.0/MIT weights) and boundary sharpness (small models smear fine edges — the thing 2.5D portraits live or die by).

---

## 5. Practical verdict — production-ready 2.5D parallax pipeline for 2026

**Recommended pipeline (all license-clean for commercial use):**

1. **Depth:** `DA3MONO-LARGE` (Apache-2.0, true depth not disparity) for server-side quality, or `Depth-Anything-V2-Small` (Apache-2.0) for on-device/realtime. If metric scale + normals + point map in one pass is wanted, **MoGe-2/MoGe-3 (MIT)**. Depth Pro, UniDepth, DA3-Giant/Large are disqualified by non-commercial licenses despite better numbers.
2. **Edge refinement:** Marigold (Apache-2.0) as an optional offline boundary-sharpening pass for hero photos — its diffusion edges beat feed-forward models where parallax fringes appear.
3. **Scene representation:** depth → Layered Depth Image (Shih et al. approach): peel foreground/background layers by depth discontinuities.
4. **Disocclusion inpainting:** LaMa `big-lama` (Apache-2.0), once per photo at import; masks = pixels revealed at the extreme camera poses of the interaction envelope.
5. **Rendering:** textured LDI mesh/quad strips (or MPI planes) in WebGL/three.js — pure shader compositing, 60 fps on any 2020+ phone. For maximal fidelity with slight quality loss tolerance: DA3's forward-warp point-cloud export → same renderer.

**Latency/VRAM budget (numbers with evidence; [OPEN] where not):**

| Stage | Where | Latency | VRAM / size | Evidence |
|---|---|---|---|---|
| Depth (V2-Small) | iPhone NPU | 31–34 ms | 46 MB FP16 | [SECONDARY] Apple HF card |
| Depth (V2-Small) | Snapdragon NPU | 18–36 ms | on-chip | [SECONDARY] Qualcomm HF card |
| Depth (DA3-Small) | iPhone (CoreML, community) | [OPEN] | 44 MB dl / ~300 MB peak | [SECONDARY] HF card (no ms published) |
| Depth (MoGe vitl) | A100/3090 FP16 | 60 ms | [OPEN] | [SECONDARY] authors' README |
| Depth (Depth Pro) | "standard GPU" | 300 ms / 2.25MP | [OPEN] | [SECONDARY] authors; NC license anyway |
| LaMa inpaint (import-time) | server GPU | seconds/photo | ~0.5–1 GB | [SECONDARY] community usage; not per-frame so non-critical |
| LDI/MPI render | any phone GPU | 60 fps | textures only | [analysis] shader compositing; FB 3D Photos shipped this |

**What stays [OPEN] / next validation gates:**
- Measured DA3-SMALL/BASE and DA3MONO-LARGE latency + VRAM on a specific GPU (no official table found).
- Side-by-side boundary-quality comparison (DA3MONO-LARGE vs MoGe-3 vs Marigold) on portrait photos — the actual product input.
- Flash3D license clarification (currently no grant) and whether DA3's 3DGS head will ever ship on an Apache-2.0 checkpoint.
- End-to-end prototype: depth → LDI → LaMa → WebGL with measured fps on a mid-range Android — the "no test no fact no result" gate before this counts as a solution.

**One-line verdict:** In 2026, believable interactive 2.5D parallax from a single photo is a solved systems problem — the winning stack is **license-clean depth (DA3-Small/Mono or MoGe, Apache-2.0/MIT) → LDI layering → LaMa inpainting at import → WebGL shader rendering at 60 fps**; the research frontier (feed-forward 3DGS) is better but not yet license-clean or hardened.
