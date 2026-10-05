# AI NPC / Free-Text Conversation Games — Expanded Research
**Date:** 2026-10-03 · **Document:** `05b-ai-npc-conversation-games.md`
**Scope:** shipped games and tech demos where NPCs actually converse with the player in open text or voice. All titles verified to exist — no invented names.
**Evidence legend:** [REAL] = verified on official page/store/repo; [SECONDARY] = press-reported; [OPEN] = unvalidated gap.

---

## 1. Shipped games with free-text NPC conversation

### 1.1 Event[0] (Ocelot Society, 2016) — the pre-LLM proof
- **What:** Indie sci-fi exploration game set on the derelict ship *Nautilus*. Your only companion is Kaizen-85, an insecure, emotionally unstable ship AI. [REAL — Wikipedia]
- **Interaction model:** TYPED free text on in-world computer terminals — no dialogue trees, no prescribed options. Kaizen "procedurally generates over two million lines of dialog," with mood/personality (gratitude, jealousy, anxiety) influenced by how you talk to it; multiple endings depend on your attitude toward it. [REAL — Eurogamer, Wikipedia]
- **Platform:** PC + Mac via Steam/Humble Store (Unity). [REAL]
- **Reception:** Cult hit. PCWorld called it "the most important indie game of 2016… certainly the most ambitious"; Ron Carmel (World of Goo): "moments where I can suspend disbelief and feel like I'm actually having a conversation with an advanced AI." [SECONDARY]
- **Why it matters for us:** This is the existence proof that free-text NPC conversation carries a whole game — *six years before ChatGPT*. Note the design: the AI's *emotional state* is the mechanic (you manage a relationship, not just extract information), and the terminal framing gives the typing a diegetic home. Our portraits need the same: a reason to talk *to* the face, not just at it.
- Sources: https://en.wikipedia.org/wiki/Event_0 · https://www.eurogamer.net/event-0-is-2001-meets-firewatch-due-this-september · https://www.pcworld.com/article/416420/event0-review-an-ambitious-2001-a-space-odyssey-tinged-adventure-you-can-talk-to.html

### 1.2 Façade (Michael Mateas & Andrew Stern, 2005) — the academic ancestor
- **What:** AI-based interactive drama: you're a friend visiting Grace and Trip's apartment as their marriage collapses in real time (~15 min per run). [REAL]
- **Interaction model:** TYPED free sentences at any time ("say anything you want"); Grace and Trip answer with SPOKEN voice plus expressive facial/body animation, moving around their 3D apartment. A drama manager steers the plot while the NLP layer interprets your input. Replayable — each run reveals ~25% of possible beats. [REAL — authors' design doc, PC Gamer retrospective]
- **Platform:** PC, free download (2005). Winner of the 2006 Slamdance Independent Games Festival Grand Jury Prize; exhibited as art. [REAL]
- **Reception:** Seminal in academia; mainstream afterlife as a YouTube/streamer toy (players deliberately breaking it). [SECONDARY]
- **Why it matters for us:** The *original* "type at a face, the face talks back" game — and the critical lesson is architectural: human-authored drama management + authored personalities, with AI filling the *response surface*. Twenty years later, that is still the winning formula (see Ubisoft's NEO NPC lesson below). Also: the fragility lesson — when the parser misses, the illusion shatters, and players remember the misses.
- Sources: https://www.pcgamer.com/13-years-later-facades-groundbreaking-ai-lives-on-through-bad-youtube-jokes/ · https://gamicus.fandom.com/wiki/Fa%C3%A7ade · https://oldapplestuff.com/download/Macintosh/Macintosh_Garden/manuals/BehindtheFacade.pdf

### 1.3 Suck Up! (Proxima Enterprises, 2023) — LLM-native, voice-first
- **What:** You play a vampire charming LLM-powered townsfolk into inviting you inside. Comedy RPG. [REAL]
- **Interaction model:** VOICE (mic) or typed text; each resident has personality and weaknesses; NPC replies generated in real time (ChatGPT-era LLM) with TTS. Persuasion is the entire objective — conversation IS the gameplay, not a layer on top. [REAL — buff.game listing, Hypergrid Business, The Magic Rain]
- **Platform:** PC + Mac (Steam), single player. [REAL]
- **Monetization/fate:** "AI Tokens" meter every NPC interaction — 10,000 tokens included ≈ 40–50 hours of play; players can hit a hard cap, and the devs were "exploring ways to increase the token limit and add top-ups at a fair price." [SECONDARY] — the first clear case of LLM inference cost as a *game-design* constraint shipped to players.
- **Why it matters for us:** Two lessons: (1) give free speech a *purpose* (persuade the portrait to do something) or it becomes a chatbot toy; (2) the token-meter fight is a preview of our own unit economics — decide the pricing of the "living" layer before players do it for you.
- Sources: https://portal.buff.game/game/suck-up · https://themagicrain.com/2024/04/suck-up-is-a-vampire-game-that-uses-a-i-to-interact-with-its-players/ · https://www.hypergridbusiness.com/2025/10/indie-vampire-game-highlights-future-for-ai-driven-games/

### 1.4 AI Dungeon (Latitude, 2019–) — the pioneer and its cost scar
- **What:** Open-ended text adventure: you type anything, an AI game-master narrates outcomes. Started as a hackathon project; GPT-2 → GPT-3 ("Dragon" premium, "Griffin" free). [REAL — Wikipedia]
- **Interaction model:** TYPED free commands; AI responds as narrator/world/ever-evolving NPC cast. Scenario scripting hooks let creators inject state. Since Jan 2025 Latitude ships its own fine-tunes (Wayfarer etc.). [REAL — Wikipedia, Medium technical breakdown]
- **Platform/reception:** ~1.5M monthly active users at peak; $3.3M seed (NFX, 2021). [SECONDARY — TechCrunch, Game World Observer]
- **Fate:** **Retired from Steam on March 12, 2024** [REAL — Wikipedia]. Mobile (iOS/Android) still live and updated (v1.3.33, Jan/Feb 2026) [REAL — store listings]. Latitude unveiled **Voyage** (April 2026, TechCrunch) — a platform for creating AI-powered RPGs with unscripted NPC interactions. [REAL — TechCrunch]
- **Cost lesson:** GPT-3 API pricing forced a $10/mo premium tier within months of the GPT-3 upgrade; the economics of "infinite story" nearly sank the company — the canonical case for deciding budget-vs-mid LLM tiers *before* launch. [SECONDARY]
- **Why it matters for us:** Validated that players want unscripted NPCs at massive scale; also the blood-and-tears evidence that inference cost is the #1 design constraint. Their pivot to Voyage (creator platform) is itself a signal: the *tooling* for AI NPCs may be a bigger business than any single AI-NPC game.
- Sources: https://en.wikipedia.org/wiki/AI_Dungeon · https://techcrunch.com/2021/02/04/latitude-seed-funding/ · https://techcrunch.com/2026/04/21/voyage-is-an-ai-rpg-platform-for-creating-custom-gaming-worlds-with-ai-generated-npc-interactions/

### 1.5 Inworld-powered shipped games — the middleware generation
**Vaudeville (Bumblebee Studios, Early Access June 30 2023, Steam):**
- Detective whodunit in fictive early-1900s Europe; interrogate suspects via TYPED text or MIC; Inworld AI generates dialogue in real time, TTS voices per suspect. Built by a one-man team racing to be "first to release a game based on conversational AI." [REAL — Steam Community retrospective, Dexerto, IndieDB]
- Broke through via streamers (MoistCr1TiKal, HasanAbi, Videogamedunkey drove hundreds of thousands to the Steam page); user reception "very polarised" — excitement plus technical complaints. Inworld's case study claims ~$300k in free publicity. [SECONDARY — dev retrospective, dlh.net]
- **Why it matters:** the streamer-discovery lesson — *surprising AI replies are the viral unit* (same beat as Deep Nostalgia's reaction videos). Also the caution: polarized reviews show the tech demo → game gap is real.
**Inworld Origins (Inworld AI, Steam playable short):**
- Inworld's own UE5 detective demo: mic-based witness interrogation, unscripted real-time dialogue, made with John Gaeta (Matrix). Free on Steam. [REAL — Steam store page]
**Detective Bureau (Early Access June 20, 2026, Steam):**
- Newer gen-AI detective entry; same interrogation loop; EA explicitly to "refine voice interactions" with the community. [REAL — Steam store page]
- Sources: https://steamcommunity.com/app/2240920 · https://www.dexerto.com/gaming/how-does-vaudeville-work-ai-murder-mystery-game-explained-2216792/ · https://store.steampowered.com/app/2199920/Inworld_Origins/ · https://store.steampowered.com/app/3716000/Detective_Bureau/

### 1.6 Mantella (art-from-the-machine, Skyrim/Fallout 4 mod) — the modders' lab
- **What:** Mod letting you NATURALLY SPEAK to NPCs via STT (Whisper/Moonshine) → LLM (local, OpenAI, or OpenRouter) → TTS (Piper/xVASynth/XTTS). ~30,000 unique downloads. [REAL — GitHub README, press]
- **Interaction model:** Voice-first; NPC memories via recursive conversation summarization (memory "lucidity" tied to model context length); 1,000+ authored NPC background descriptions seed the prompts; ~5s response time on API setups. [REAL — GitHub, HN Show post]
- **Reception:** Tens of thousands of players; "meaningful conversations… debates on Skyrim's philosophy"; similar mods now exist for Hogwarts Legacy, Cyberpunk 2077, Garry's Mod. Nexus Mods had to write AI-content policies in response. [SECONDARY]
- **Why it matters for us:** The memory architecture is the direct template for our moat — identity persistence via summarization, with the honest caveat that recall quality depends on the model. Also the pipeline shape (STT→LLM→TTS with an inspectable text stage) matches the tech report's recommendation. And the policy fallout is a warning: user-facing AI content needs governance before scale, not after.
- Sources: https://github.com/art-from-the-machine/Mantella · https://news.ycombinator.com/item?id=37370815 · https://m.getcoai.com/news/modders-are-using-ai-to-add-talkative-npcs-in-popular-games/

### 1.7 Whispers from the Star (Anuttacon, 2025) — the closest shipped analog
- **What:** AI-native interactive narrative by Anuttacon, the studio founded by miHoYo's Cai Haoyu. You guide Stella, an astronaut stranded on planet Gaia, via VIDEO CALL, VOICE message, or TEXT — "AI-driven dialogue," mic required, every line affects plot and her fate. [REAL — Steam description]
- **Interaction model:** Real-time voice/text/video conversation; Stella messages you throughout the day; open-ended ("talk about literally anything"); gameplay capped at 40–60 min/day. [REAL — Steam page]
- **Platform/reception:** Steam Aug 14, 2025 ($9.99), iOS Dec 4, 2025 ($4.99); "Very Positive" (~1,663 Steam reviews). [REAL — store data via instant-gaming, Game8]
- **Friction:** Critics call it "a big C.AI toy" lacking a game framework; mainland social accounts deactivated ~Dec 2025 over an unfiled domestic AI model (compliance). [SECONDARY — industry landscape analysis]
- **Why it matters for us:** This is the single closest shipped product to a talking-portrait game — one face, real-time open conversation, relationship stakes. Its two wounds are our two design requirements: (1) conversation needs a *game framework* around it (objectives, progression), and (2) the compliance/licensing layer must be built in from day one.
- Sources: https://www.instant-gaming.com/en/20081-buy-whispers-from-the-star-pc-steam/ · https://game8.co/articles/games/whispers-from-the-star · https://www.metacritic.com/game/whispers-from-the-star/

### 1.8 Where Winds Meet (Everstone/NetEase, 2025) — the AAA-scale warning
- **What:** Free-to-play wuxia open-world RPG (PS5/PC, Nov 14 2025); 2M players in 24h. NPCs use LLM dialogue. [SECONDARY — Kotaku, Sportskeeda]
- **Interaction model:** Chat with world NPCs; lightweight model serving a F2P audience at scale. [SECONDARY]
- **What went wrong:** Players jailbroke quests — typing "(Suddenly, her two brothers appear)" as narration made the NPC accept it as fact and complete the quest; parroting the NPC's request back until it "gave up and paid out" (the "Metal Gear"/"Solid Snake method"); NSFW roleplay sessions with unfiltered NPCs; anachronistic replies ("ChatGPT in cosplay," ketchup recipes in the Song dynasty). [SECONDARY — Kotaku, TheGamer, case-study analysis]
- **Why it matters for us:** The load-bearing negative case: **never let LLM output become game fact.** Player input must not be treated as narration; the character must not judge itself; cheaper models need stronger structural guardrails. Any portrait with quest/objective power needs a separate adjudication layer (cf. Suck Up!'s judge lesson).
- Sources: https://kotaku.com/where-winds-meet-game-reddit-steam-reviews-2000645900 · https://kotaku.com/where-winds-meet-ai-npc-llm-chatgpt-steam-2000650074 · https://www.thegamer.com/where-winds-meet-ai-npc-flirting-reply/

---

## 2. Tech demos / prototypes (never shipped as games)

### 2.1 Ubisoft NEO NPC (GDC 2024, prototype)
- **What:** Ubisoft Paris prototype with Inworld's Character Engine + Nvidia Audio2Face (ACE). Three behind-closed-doors scenarios: befriend resistance leader Bloom (voice), a stealth mission with Bloom reacting in real time, mission planning with NPC Iron who critiques your tactics. [SECONDARY — GamesHub, Hitmarker, Ubisoft blog via press]
- **Interaction model:** VOICE input; NPCs take player tone into account, guide conversation "back to the task at hand," unlock new story stages/quests from dialogue. [SECONDARY]
- **The key design quote** (project director Xavier Manzanares): experiments "just attaching ChatGPT to games… saw negative stuff where people were saying it was soulless." Ubisoft's answer: characters are **human-written first** (personality, backstory, emotion), generative AI "fleshes out" and opens the interaction pathway. [SECONDARY — GamesIndustry.biz via GamesHub]
- **Fate:** Prototype only; no ship date; press immediately compared it to Project Milo (below). [SECONDARY]
- **Why it matters for us:** The industry's most explicit statement of our architecture: authored persona bibles + LLM response surface. "Don't just bolt an LLM onto a face" is the law to bank.
- Sources: https://www.gameshub.com/news/news/ubisoft-ai-neo-npcs-gdc-2024-2638181/ · https://hitmarker.net/news/ubisoft-shows-off-ai-powered-npc-project-at-gdc-2024-883339 · https://www.tweaktown.com/news/96982/ubisofts-project-neo-npc-game-demo-uses-nvidias-audio2face-and-inworld-generative-ai/index.html

### 2.2 Nvidia ACE — Covert Protocol (GDC 2024, tech demo)
- **What:** Inworld + Nvidia tech demo on Unreal Engine 5: you are a private detective; objectives complete based on outcomes of conversations; AI digital humans are "custodians of crucial information." [REAL — nvidia.com]
- **Interaction model:** Voice (Riva ASR) → Inworld Engine (personality, knowledge, goals, memory, relationships, safety) → Audio2Face facial animation; NeMo Guardrails align interactions to scene context. Each playthrough unique. [REAL — nvidia.com, TechRadar]
- **Fate:** Demo only; Inworld promised source-code release for developers. [REAL — nvidia.com]
- **Why it matters for us:** The reference pipeline for voice-driven NPCs with animated faces — and the guardrail layer (NeMo Guardrails) is the concrete answer to Where Winds Meet's failures.
- Sources: https://www.nvidia.com/en-us/geforce/news/gfecnt/20243/nvidia-ace-gdc-gtc-2024-ai-character-game-and-app-demo-videos/ · https://www.techradar.com/gaming/a-new-nvidia-tech-demo-features-real-time-ai-characters-that-react-to-player-decisions · https://wccftech.com/nvidia-presents-covert-protocol-demo-powered-by-inworld-ai/

### 2.3 Project Milo (Lionhead, demoed E3 2009, cancelled 2010) — the original cautionary tale
- **What:** Peter Molyneux's virtual boy: talk to Milo via Kinect (Project Natal) voice + emotion recognition; he responds, reads your feelings, plays. [REAL — Wikipedia]
- **Interaction model:** Voice + gesture + emotion detection; scripted-behavior tree underneath (Molyneux later admitted they "cheated" the voice recognition — today "almost a solved problem"). [SECONDARY — VGC 2025 interview]
- **Why it died:** (1) the Kinect prototype Milo was built for would have cost ~$5,000/unit — Microsoft cost-reduced it to a "minuscule field-of-view"; (2) Microsoft repositioned Kinect as a *party* device (sports/dance), so Milo "didn't fit into the Microsoft portfolio"; (3) Lionhead needed to ship revenue — "it wasn't necessarily a game, it was an experiment." Microsoft: it "was never a product." Some tech carried into Fable: The Journey. [REAL — Wikipedia, Prima Games, Polygon]
- **Why it matters for us:** Two bankable lessons: (a) a beloved *demo* of talking to a face is not a game — Milo never found its game loop, and press is already making the Milo comparison about NEO NPC; (b) platform dependencies kill — don't tie the portrait's core magic to hardware you don't control (cf. our framed-installation decision).
- Sources: https://en.wikipedia.org/wiki/Project_Milo · https://www.videogameschronicle.com/news/peter-molyneux-explains-why-his-infamous-kinect-game-project-milo-was-never-released/ · https://www.polygon.com/features/2013/3/21/4063508/milo-and-kate/

---

## 3. Failures and retirements — the ledger
| Product | Fate | Reported cause | Label |
|---|---|---|---|
| Project Milo (Lionhead) | Cancelled 2010, never shipped | Kinect cost-reduced; repositioned as party device; "never a game, an experiment" | [REAL] |
| AI Dungeon (Latitude) | Retired from Steam Mar 12, 2024 | GPT-3 API economics forced premium tier; Steam version sunset (mobile/web live) | [REAL] |
| xAI Grok 3D companions | Retired ~Aug 2026 | Cause [OPEN] — cost, moderation, or retention unknown | [SECONDARY] |
| Suck Up! token model | Live but friction | 10k AI-token cap ≈ 40–50 hrs; players hit hard cap; top-up pricing [OPEN] | [SECONDARY] |
| Whispers from the Star (CN) | Mainland social accounts deactivated ~Dec 2025 | Domestic AI model unfiled (compliance) | [SECONDARY] |
| Where Winds Meet NPC exploits | Live, reputational damage | No adjudication layer; player narration accepted as fact; unfiltered RP | [SECONDARY] |

## 4. Design laws for our talking-portrait game (synthesized from this domain)
1. **Authored persona + LLM surface** (Façade → Ubisoft NEO NPC): human-written personality/backstory/emotion, generative AI opens the interaction. Never "just bolt an LLM onto a face."
2. **Conversation needs a purpose** (Suck Up!, Vaudeville, Event[0]): persuade, interrogate, or befriend — free speech with a clear objective beats open chat.
3. **Never let LLM output become game fact** (Where Winds Meet): separate adjudication layer for quest/objective outcomes; don't treat player input as narration; the character never judges itself.
4. **Memory is the moat** (Mantella): recursive summarization for identity persistence across sessions; recall quality is model-dependent — budget for it.
5. **Cost is a design constraint, not a billing afterthought** (AI Dungeon, Suck Up!): decide budget-vs-mid LLM tiers and the token/meter model before launch.
6. **Surprise is the viral unit** (Vaudeville streamers, Deep Nostalgia reaction videos): design portrait moments worth clipping.
7. **A beloved demo is not a game** (Project Milo): the game loop must exist independently of the "talking face" wow.
8. **Don't tie the magic to hardware you don't control** (Project Milo/Kinect): relevant to our framed-installation vs mobile/web decision.

## 5. Honesty notes
- Reception figures (review counts, "2M players," "$300k publicity") are press/developer-reported [SECONDARY]; I did not independently verify store metrics.
- Whispers from the Star review count (~1,663) and compliance incident come from secondary aggregators, not Steam directly.
- Vaudeville's full-release date (Nov 28, 2025 per Steambase) conflicts with the dev's "still in Early Access" retrospective — treated as [SECONDARY]/unresolved; the EA June 2023 launch is [REAL].
- No firsthand playtesting was performed in this pass (desk research by design); per the standing law, the parent agent should personally play the top candidates (Doctor Dekker, Event[0], Vaudeville demo, Whispers from the Star) before any PRD.
