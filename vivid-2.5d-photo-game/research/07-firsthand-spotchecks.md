# Firsthand Spot-Checks — Multi-Platform (partial)
**Date:** 2026-10-03 · **Document:** `07-firsthand-spotchecks.md`
**Status:** PARTIAL — the browser renderer died mid-task; items 1–7 below are directly observed, the rest were retried in a fresh task.

## Directly observed (main agent, real browser)

### Whispers from the Star (Steam) — closest shipped analog, HAS A FREE DEMO
- Price ¥33.99 (JPY storefront); **free demo available** ("Download Whispers from the Star Demo"); Windows-only; requires microphone + Anuttacon account.
- Very Positive, 1,663 Steam reviews. Released Aug 14, 2025 (Anuttacon).
- Trailer (30s launch trailer, Steam player): Stella as a 3D-animated astronaut in a video-call UI with "STELLA IS SPEAKING" indicator and call-style HUD icons. Real-time AI voice/text dialogue per store copy.
- Relevance: closest shipped product to a talking-portrait game — one face, real-time open conversation — but a rendered 3D scene, not a still photo given depth. Its known wounds (needs a game framework around the chat; compliance built late) are our design requirements.
- [REAL — hands-on to the demo gate; demo not installed]

### Light and Night / 光与夜之恋 (CN App Store)
- Free + IAP (gacha); 4.4★, 500,000 ratings; 16+; Tencent; 2.4 GB.
- Store copy emphasizes voice actors, multi-branch endings, "rich interaction" — but NO explicit voice-call/phone-call feature in the observed copy; screenshots show 2D illustrated portraits with dialogue boxes (visual-novel style).
- Correction vs desk research: the "voice-recognition calling" claim stays [SECONDARY] — not confirmed in primary store copy.
- [REAL — store page observed]

### Tears of Themis / 未定事件簿 (CN App Store)
- Free + IAP; 3.9★, 72,000 ratings; 16+; miHoYo; 3.4 GB.
- Store copy: romance × deduction; screenshots show anime portraits, dynamic card faces, phone-like UI frames. The words "video call" (视频电话) did NOT appear in the observed CN copy.
- Correction vs desk research: "incoming video calls" stays [SECONDARY] — not confirmed in primary store copy.
- [REAL — store page observed]

### OneShot: World Machine Edition (Switch eShop)
- $14.99 digital, Sept 22, 2022, DANGEN/Future Cat. "The World Knows You Exist" — fourth-wall framed for console via the World Machine OS conceit.
- [REAL — store page observed]

### Doki Doki Literature Club Plus! (Switch eShop)
- $14.99 digital, June 30, 2021, Serenity Forge/Team Salvato. Mature 17+. 6 side stories, 100+ unlockables.
- [REAL — store page observed]

## Blocked (named, not faked)
- Whispers from the Star iOS: US App Store URLs force-redirect to CN storefront from this route; CN search returned no results.
- Talkie (MiniMax): CN App Store page errors (region-restricted); Google Play unreachable; talkie-ai.com unreachable. 730k+ Play reviews etc. remain [SECONDARY].
- PlayStation Store: Akamai bot protection ("Access Denied"); Xbox not checked.

## Retried in fresh task — COMPLETED 2026-10-03
- **Suck Up! (Steam, app 2726370, Proxima):** listing verified via Steam Web API. CORRECTION: release date is **Oct 1, 2025** (desk research said 2023 — wrong), price HK$108, no demo. Store page region-blocked from this route; read via API. Directly observed in official store screenshots: doorstep conversation with AI townsperson "Grandma Maude" (speech-bubble replies), "Hold the right mouse button to record voice", text input via Return key, "LEAVE CONVERSATION" button, and a "PHRASE CHALLENGE!" requiring the exact phrase 'Don't slam the door like my dad did.' Store copy: "Talk your way into homes using your real voice." Relevance: voice-or-text LLM persuasion gameplay; no photo/depth element. [REAL]
- **Event[0] (Steam, app 470260, Ocelot Society):** verified on store page. Released Sept 14, 2016; HK$119 (¥68 in-region); no demo. Directly observed in official screenshots: retro CRT "Kaizen Terminal - 86", player types free text ("what did you do to the fish, you monster?!"), Kaizen replies with mood ("I'm not in the mood to answer you."). Store copy: Kaizen "procedurally generates over two million lines of dialog"; reacts with gratitude, disappointment, jealousy. Relevance: the classic typed free-text NPC conversation; no visual/depth aspect. [REAL]
- **PopPic:** poppic.com is PARKED (Afternic for-sale page); product moved to poppic.cam (live, but footer "© 2021 PopPic 3D LLC"). Still on App Store in 2026 (v1.12.1, 4.8★ per snippets — exact last-update date unverified). Demo video unwatchable (YouTube embed). Site copy: "Take one photo... turn it into 3D... wiggle, zoom, share." Maintenance status QUESTIONABLE. Relevance: single-photo depth archetype; nobody attached conversation. [REAL/SECONDARY]
- **Facebook 3D Photos:** NOT retired — help article live (facebook.com/help/414295416095269), "Make 3D" flow still documented in the 2026 Help Center (46 search results, top hit). Desktop path requires uploading image + depth map. Relevance: still-active depth-photo feature; no conversation element. [REAL]

## Egress note
- Steam storefront currency flapped between ¥ (JPY), HK$, and CNY across pages — this route egresses via Asia. Prices recorded as displayed, not converted.
