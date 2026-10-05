# Hogwarts Talking Portraits — Concept Reference (Portrait Rules)
**Date:** 2026-10-03 · **Document:** `06-hogwarts-portrait-concept.md`
**Purpose:** the canonical behavior rules of talking portraits as depicted in Harry Potter, distilled as the design reference for the vivid 2.5D photo interaction game.

**Honesty note:** video was blocked on every site tried (YouTube "unable to play media"/Error 153, Bilibili player never loaded, Dailymotion blank, Rumble/archive.org/fandom unreachable from the browser task's route). The rules below are distilled from the Harry Potter Wiki "Portrait" article (read in full via text fetch, 2026-10-03) plus Rowling's writings as quoted in press — READ, not watched. [SECONDARY] throughout.

---

## The Portrait Rules (canon)

1. **Sentience by enchantment, personality by the painter's eye.** The subject is sentient due to enchantments placed by the painter. The portrait uses the subject's favorite phrases and imitates their general demeanor — *as the subject appeared to the painter*. Rowling: Sir Cadogan forever challenges passersby to fights and keeps falling off his horse, because that is how he looked to the poor wizard who painted him; the Fat Lady indulges her love of good food, drink, and tip-top security long after her living model passed away.
2. **Limited minds.** A portrait knows little if anything of its subject's life — "only representations of the living subjects as seen by the artist" — and cannot hold a very interesting conversation about its subject. McGonagall: *"portraits don't represent even half of their subjects."* Do not mistake the portrait for the person.
3. **The headmaster exception.** Headmaster portraits are painted while the subject is alive, kept in a cupboard until the subject dies — so the living headmaster can *teach the portrait to act and speak like them*, as a support mechanism to counsel successors. Their apparent sleepiness when visitors enter the office "was not necessarily genuine" — they pretend to sleep while listening.
4. **Movement between frames.** A portrait can move from portrait to portrait, or visit a portrait of itself elsewhere in the world. Sir Cadogan travels picture-to-picture to give directions; Phineas Nigellus commutes between the headmaster's office and 12 Grimmauld Place, carrying messages across locations. Before the Battle of Hogwarts, the inhabitants flee their frames entirely (empty frames).
5. **A social life.** Portraits visit each other, gossip (the Fat Lady chats and gossips), keep friendships (Violet is friends with the Fat Lady), get drunk and stray from their frames (the Fat Lady), and shout encouragement (Sir Cadogan paces Harry, cheering him on before the battle).
6. **They hold jobs.** Guarding (the Fat Lady demands the password; Sir Cadogan volunteers as her replacement), advising (headmasters counsel the incumbent), message-carrying (Phineas Nigellus), concealing secret passages (Ariana Dumbledore's portrait hides the passage to the Room of Requirement; many others hide passages/shortcuts).
7. **They can be harmed and can fear.** "A portrait did have reason to fear for their life or well-being." Sirius Black slashes the Fat Lady's portrait; she flees and hides inside another painting.
8. **Photographs are lesser.** Magical photographs are animated loops; some react to their surroundings (Lockhart's photos nod along as he speaks, dodge out of sight) — but they cannot talk or interact with the outside world the way portraits do. (This is exactly our product's ladder: photo → reactive photo → talking portrait.)
9. **Power-scaled abilities.** Per Wizarding World: a portrait's abilities depend on the artist's talent *and* the subject's power. Dumbledore's portrait can sustain complex conversation; the Fat Lady can chat and gossip but that is her ceiling; a portrait of an invented character can barely observe and comment.

## Personality sheet (canon examples)
- **The Fat Lady** — dramatic, vain, dutiful; loves food, drink, and security; gossips; gets drunk; fiercely guards her post (and her replacement).
- **Sir Cadogan** — pompous, reckless, brave; challenges everyone; falls off his horse; treats every request as a Quest; volunteers for danger.
- **Phineas Nigellus Black** — sardonic, reluctant, sharp-tongued; the unwilling messenger who knows things.
- **Dumbledore's portrait** — wise, twinkling, strategic; hides the Sword of Gryffindor; advises Harry from beyond.

## Iconic film moments
- *Philosopher's Stone* — the Fat Lady's "Password?" at the Gryffindor entrance; staircases lined with shifting portraits.
- *Prisoner of Azkaban* — the slashed Fat Lady; her hiding in another frame; Sir Cadogan's "Who dares challenge Sir Cadogan!"
- *Order of the Phoenix* — the headmaster portraits in Dumbledore's office, pretending to sleep while listening.
- *Deathly Hallows* — Phineas Nigellus ferrying messages; Dumbledore's portrait advising; Ariana's portrait swinging open onto the secret passage.

---

## Design translations (concept → game mechanics)
1. **Portraits have jobs** (guard / advisor / messenger / gossip) — conversation needs a purpose, not open chat. Matches the AI-NPC law: give free speech an objective.
2. **Personality over fidelity** — the portrait is the *painter's impression*, not the person. Authored persona bibles are canon-accurate; "don't mistake the portrait for the person" is the diegetic version of "don't bolt an LLM onto a face."
3. **They move between frames** — multi-portrait navigation (visiting, message-carrying, fleeing) is native to the fiction, not a UI invention.
4. **They pretend to sleep** — "the portrait notices you even when it looks idle" is canon. Idle-state awareness (camera/mic attention) is the cheapest vividness.
5. **Power-scaled dialogue depth** — not every portrait needs deep conversation. Tier the dialogue engine by character importance: major portraits get the flagship model, minor ones the budget tier. Canon justifies the cost architecture.
6. **Portraits can have stakes** — they fear damage. A portrait that can be harmed, lose its frame, or flee gives the game consequences without combat.
7. **The photo→portrait ladder** — magical photos (reactive loops) vs portraits (full interaction) gives a natural progression: the player's own uploaded photo starts as a reactive photo and *earns* portrait-hood.

## Sources
- https://harrypotter.fandom.com/wiki/Portrait (read 2026-10-03)
- https://gamerant.com/harry-potter-magical-portraits-explained/
- https://screenrant.com/harry-potter-hogwarts-portraits-dumbledore-explained/
- https://www.ranker.com/list/hogwarts-portraits-lore/damon-davis
- https://en.wikibooks.org/wiki/Muggles%27_Guide_to_Harry_Potter/Characters/Sir_Cadogan
