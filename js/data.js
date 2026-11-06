/* Narrative content and explicit semantic action metadata. Labels never decide rules. */
window.TTB_DATA = {
  "icons": {
    "floodedArchive": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 54h44M14 49h36M18 49V24h28v25M14 24h36L32 10 14 24ZM25 31v11M39 31v11\"/></svg>",
    "hospice": "<svg viewBox=\"0 0 64 64\"><path d=\"M8 30 32 9l24 21M14 27v29h36V27M25 56V38h14v18\"/></svg>",
    "underbell": "<svg viewBox=\"0 0 64 64\"><path d=\"M16 57h32M20 57V20h24v37M16 20h32L42 7H22l-6 13ZM26 31h12M26 39h12M26 47h12\"/></svg>",
    "square": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 25h44M14 25v29h36V25M8 25l7-15h34l7 15M23 54V38h15v16\"/></svg>",
    "gate": "<svg viewBox=\"0 0 64 64\"><path d=\"M6 24c11 8 18-8 29 0s18-8 23 0M6 40c11 8 18-8 29 0s18-8 23 0M14 10h36M20 10v12M44 10v12\"/></svg>",
    "glassworks": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 56h44M14 56V25l12 9V22l12 9V14h11v42M21 45h7M37 45h7\"/></svg>"
  },
  "loopMeta": [
    {
      "name": "The ordinary morning",
      "objective": "Find what the tower is pulling from the town.",
      "text": "People follow familiar routines. Notice who leaves, who waits, and what the bell disturbs.",
      "scene": "Bellweather is awake, and so is the tower. Walk the town, meet its people, and let each return reshape the day."
    },
    {
      "name": "The day answers back",
      "objective": "Follow the people displaced by your first return.",
      "text": "The floodwater runs uphill. The archive opens early. Familiar faces have moved to unfamiliar places.",
      "scene": "You wake to an altered town. Bell Square wears masks; the North Gate road climbs skyward; the bellkeeper walks where no street existed yesterday."
    },
    {
      "name": "The fractured day",
      "objective": "Bring three anchored memories to the clocktower.",
      "text": "The world is coming apart, but the route, song, and lens can turn disruption into a way forward.",
      "scene": "Dawn arrives in pieces. Streets overlap, voices echo ahead of their speakers, and the tower door stands open."
    }
  ],
  "worlds": [
    {
      "floodedArchive": {
        "hint": "Chained doors; voices below",
        "title": "The lecture beneath the floodline",
        "weather": "Silt moves against the current.",
        "text": "The public doors are chained above black floodwater, yet a lecture carries through a brass drain. Archivist Vale is arguing that the tower was built over an older stair.",
        "choices": [
          {
            "id": "world-0-floodedArchive-0",
            "label": "Listen at the drain",
            "description": "Map the voices moving beneath you.",
            "effect": "route",
            "result": "You follow the lecture from grate to grate and sketch a spiral passage under the tower.",
            "fracture": 1
          },
          {
            "id": "world-0-floodedArchive-1",
            "label": "Mark the sealed doors",
            "description": "Leave chalk signs above the floodline.",
            "effect": "note",
            "result": "At midnight the doors may reset, but your chalk marks point toward a submerged basement entrance.",
            "fracture": 1
          }
        ]
      },
      "hospice": {
        "hint": "A recovery bell rings once",
        "title": "The bellkeeper has left his sickbed",
        "weather": "One cup is still warm.",
        "text": "At Saint Orra’s, Orrin’s bed is made, his coat is gone, and muddy water pools beneath the ward window. A half-written lullaby lies beside his medicine.",
        "choices": [
          {
            "id": "world-0-hospice-0",
            "label": "Read the unfinished lullaby",
            "description": "Listen for the rhythm between its lines.",
            "effect": "note",
            "result": "The melody repeats in thirteens, ending just before the resolving note.",
            "fracture": 1
          },
          {
            "id": "world-0-hospice-1",
            "label": "Follow the wet footprints",
            "description": "Trace Orrin’s escape through the herb garden.",
            "effect": "item:footprints",
            "result": "The prints cross the hospice garden and point toward North Gate before they vanish.",
            "fracture": 1
          }
        ]
      },
      "underbell": {
        "hint": "A festival crowds the descent",
        "title": "Procession of the first chime",
        "weather": "Every bird leaves at once.",
        "text": "Town musicians circle the sealed stair into Underbell while an official keeps everyone smiling. Behind him, a maintenance hatch exhales warm air from below.",
        "choices": [
          {
            "id": "world-0-underbell-0",
            "label": "Join the procession",
            "description": "Walk the full circle and watch the guards.",
            "effect": "note",
            "result": "A narrow service lane vanishes behind festival banners at dusk.",
            "fracture": 1
          },
          {
            "id": "world-0-underbell-1",
            "label": "Help a fallen drummer",
            "description": "Carry her instrument away from the crowd.",
            "effect": "item:drum",
            "result": "Inside the drum you hear a second rhythm answering from deep in Underbell.",
            "fracture": 1
          }
        ]
      },
      "square": {
        "hint": "Red flowers, blue uniforms",
        "title": "The flower auction",
        "weather": "Petals fall upward.",
        "text": "Inspector Brann is buying every redflower in the square. Mina, the youngest seller, is trying to hide one damaged crate from him.",
        "choices": [
          {
            "id": "world-0-square-0",
            "label": "Help Mina move the crate",
            "description": "Take the alley before the inspector turns.",
            "effect": "item:redflower",
            "result": "Mina gives you a redflower. Its pollen glows whenever the tower chimes.",
            "fracture": 1
          },
          {
            "id": "world-0-square-1",
            "label": "Shadow Inspector Brann",
            "description": "Follow him through the breakfast crowd.",
            "effect": "note",
            "result": "He delivers the flowers to the tower—not as tribute, but to keep the gears asleep.",
            "fracture": 1
          }
        ]
      },
      "gate": {
        "hint": "Guards bar the flooded road",
        "title": "The traveler with no reflection",
        "weather": "The gate moat is perfectly still.",
        "text": "North Gate is sealed. Beneath its arch, a silent traveler waits under a silver umbrella—but the moat casts no reflection of them.",
        "choices": [
          {
            "id": "world-0-gate-0",
            "label": "Wait beside the traveler",
            "description": "Ask where the road goes after midnight.",
            "effect": "song",
            "result": "The stranger hums a low phrase. Ripples in the moat draw the shape of the bell’s missing note.",
            "fracture": 1
          },
          {
            "id": "world-0-gate-1",
            "label": "Help the gatekeeper raise the portcullis",
            "description": "Take the chain and pull against the seized gears.",
            "effect": "item:gate-token",
            "result": "He gives you a punched brass token and whispers that Orrin passed before sunrise.",
            "fracture": 1
          }
        ]
      },
      "glassworks": {
        "hint": "Furnace shift begins",
        "title": "A moth in the furnace",
        "weather": "Glass shadows point east.",
        "text": "An ember moth beats against the sealed furnace window while apprentice Sella struggles with the pressure wheel. The glass is beginning to sing.",
        "choices": [
          {
            "id": "world-0-glassworks-0",
            "label": "Release the ember moth",
            "description": "Open the cooling sluice at the risky moment.",
            "effect": "note",
            "result": "The moth escapes carrying a bead of living glass. It flies toward the canal.",
            "fracture": 2
          },
          {
            "id": "world-0-glassworks-1",
            "label": "Steady the pressure wheel",
            "description": "Work beside Sella until the singing stops.",
            "effect": "item:glass-bead",
            "result": "Sella presses a warm glass bead into your palm. It shows the tower with a stair descending beneath it.",
            "fracture": 1
          }
        ]
      }
    },
    {
      "floodedArchive": {
        "hint": "Open before sunrise",
        "title": "The archive remembers your chalk",
        "weather": "Pages turn by themselves.",
        "text": "Your marks from the lost day now cover the open doors. Vale waits below with a lamp, certain you arranged a meeting neither of you remembers making.",
        "choices": [
          {
            "id": "world-1-floodedArchive-0",
            "label": "Descend with Vale",
            "description": "Trace the buried architecture together.",
            "effect": "route",
            "result": "Below the stacks, you walk the hidden route: market well, old conduit, tower heart. The path is anchored in memory.",
            "fracture": 2
          },
          {
            "id": "world-1-floodedArchive-1",
            "label": "Search the moving index",
            "description": "Follow cards that rearrange around your name.",
            "effect": "note",
            "result": "The index lists events you have not caused yet—including “Glassworks mirror fire.”",
            "fracture": 1
          }
        ]
      },
      "hospice": {
        "hint": "A child tends the empty ward",
        "title": "The echo in Saint Orra’s",
        "weather": "The medicine clock runs backward.",
        "text": "A child wearing Orrin’s coat waits beside his empty bed. She says the hospice has treated the same wounds for hundreds of mornings, then asks whether you heard the note from North Gate.",
        "choices": [
          {
            "id": "world-1-hospice-0",
            "label": "Sing the phrase you heard",
            "description": "Give the unfinished lullaby its ending.",
            "effect": "song",
            "result": "The child completes the phrase. You anchor the bell’s true song—not a password, but the rhythm that can calm its heart.",
            "fracture": 1
          },
          {
            "id": "world-1-hospice-1",
            "label": "Ask who she is",
            "description": "Stay until her borrowed face settles.",
            "effect": "note",
            "result": "She is the hospice’s memory of Orrin, shaped by every reset he endured alone.",
            "fracture": 1
          }
        ]
      },
      "underbell": {
        "hint": "The door below is suddenly ajar",
        "title": "Inside the Underbell vestibule",
        "weather": "The clock has no hands.",
        "text": "The festival is gone. The iron door below the tower opens onto a subterranean room wider than Bell Square, where three empty sockets ring a sleeping mechanism.",
        "choices": [
          {
            "id": "world-1-underbell-0",
            "label": "Enter and map the chamber",
            "description": "Tie your route to the room beyond.",
            "effect": "route",
            "result": "Your sketch and the chamber align. There is a safer way in through the abandoned market well.",
            "fracture": 1
          },
          {
            "id": "world-1-underbell-1",
            "label": "Touch the warm socket",
            "description": "Risk learning what belongs there.",
            "effect": "note",
            "result": "It wants a lens: something made in one loop and remembered into the next.",
            "fracture": 2
          }
        ]
      },
      "square": {
        "hint": "Masks where flowers were",
        "title": "The breakfast masquerade",
        "weather": "No one has a shadow.",
        "text": "The stalls have become a silent dance. Inspector Brann wears a fox mask and Mina carries a lantern filled with yesterday’s red petals.",
        "choices": [
          {
            "id": "world-1-square-0",
            "label": "Dance beside Mina",
            "description": "Mirror her steps through the altered square.",
            "effect": "item:red-thread",
            "result": "At the final turn she ties red thread around your wrist. It points toward people displaced by the loop.",
            "fracture": 1
          },
          {
            "id": "world-1-square-1",
            "label": "Unmask the inspector",
            "description": "Interrupt the performance and face him.",
            "effect": "note",
            "result": "Brann is exhausted, not cruel. He has been feeding flowers to the bell for years to postpone this fracture.",
            "fracture": 2
          }
        ]
      },
      "gate": {
        "hint": "The road climbs into the sky",
        "title": "The upside-down gatehouse",
        "weather": "Rain rises over the battlements.",
        "text": "North Gate hangs above its own arch as if gravity changed its mind. Orrin walks across the underside of the bridge, following the melody you heard last loop.",
        "choices": [
          {
            "id": "world-1-gate-0",
            "label": "Follow Orrin overhead",
            "description": "Trust the red thread and climb after him.",
            "effect": "song",
            "result": "Orrin teaches you the cadence that makes the bell release what it has taken. The song stays with you.",
            "fracture": 1
          },
          {
            "id": "world-1-gate-1",
            "label": "Turn the counterweight",
            "description": "Give the stranded guards a path to solid ground.",
            "effect": "item:iron-hook",
            "result": "The gatehouse rights itself long enough for its keeper to throw you an iron hook.",
            "fracture": 1
          }
        ]
      },
      "glassworks": {
        "hint": "A mirror fire burns cold",
        "title": "The furnace shows tomorrow",
        "weather": "Reflections arrive early.",
        "text": "Sella is shaping a lens from the ember moth’s glass. In its surface you see yourself entering the tower by a stair that does not yet exist.",
        "choices": [
          {
            "id": "world-1-glassworks-0",
            "label": "Help shape the lens",
            "description": "Hold the pressure wheel at the remembered rhythm.",
            "effect": "lens",
            "result": "The glass cools without becoming inert. Its image survives when you close your eyes: an ember lens anchored beyond midnight.",
            "fracture": 1
          },
          {
            "id": "world-1-glassworks-1",
            "label": "Break the future reflection",
            "description": "Refuse the one path the furnace predicts.",
            "effect": "note",
            "result": "The mirror splits into many possible entries. The loop can be changed; the vision is not fate.",
            "fracture": 2
          }
        ]
      }
    },
    {
      "floodedArchive": {
        "hint": "The building walks in circles",
        "title": "A library without walls",
        "weather": "Sentences drift through rain.",
        "text": "Shelves march around the square. Vale rides a ladder between them, trying to keep the town’s oldest map from unfolding into the sky.",
        "choices": [
          {
            "id": "world-2-floodedArchive-0",
            "label": "Stabilize the living map",
            "description": "Use what you know of the underground stair.",
            "effect": "route",
            "result": "The map settles around your memory. The route beneath the tower becomes real wherever you step.",
            "fracture": 1
          },
          {
            "id": "world-2-floodedArchive-1",
            "label": "Rescue Vale’s loose pages",
            "description": "Chase the archive through the street.",
            "effect": "note",
            "result": "One page says the bell was built to store days the town feared losing.",
            "fracture": 1
          }
        ]
      },
      "hospice": {
        "hint": "Orrin remembers you now",
        "title": "Two bellkeepers in one ward",
        "weather": "Two mornings share one room.",
        "text": "In Saint Orra’s recovery ward, Orrin sits across from his younger echo. They argue over which one should enter Underbell and which one deserves to remain.",
        "choices": [
          {
            "id": "world-2-hospice-0",
            "label": "Ask them to sing together",
            "description": "Let both lives share the missing ending.",
            "effect": "song",
            "result": "Their voices resolve into the bell’s true song. Neither version has to be erased.",
            "fracture": 1
          },
          {
            "id": "world-2-hospice-1",
            "label": "Offer to enter alone",
            "description": "Take responsibility for the final descent.",
            "effect": "note",
            "result": "Orrin gives you his coat pin and tells you the bell responds to changed lives, not sacrifice.",
            "fracture": 2
          }
        ]
      },
      "underbell": {
        "hint": "The impossible stair is open",
        "title": "The heart of the thirteenth bell",
        "weather": "Midnight waits at the threshold.",
        "text": "Underbell unfolds into a descending avenue beneath the clock. Every person you met appears in its brass windows, caught in the choices they might have made.",
        "choices": [
          {
            "id": "world-2-underbell-0",
            "label": "Descend with your anchors",
            "description": "Use route, song, and lens to release the day.",
            "effect": "final",
            "result": "You walk the hidden route, sing the mechanism open, and turn the ember lens toward morning.",
            "fracture": 2
          },
          {
            "id": "world-2-underbell-1",
            "label": "Walk the outer gallery",
            "description": "See what Underbell has been preserving.",
            "effect": "note",
            "result": "Hundreds of abandoned Bellweathers glow inside the gears. The heart can release them, if you return prepared.",
            "fracture": 1
          }
        ]
      },
      "square": {
        "hint": "Stalls drift like little boats",
        "title": "The floating redflower market",
        "weather": "Cobblestones ripple like water.",
        "text": "Mina poles her stall between rooftops. She is collecting small memories from townspeople before the tower can swallow them whole.",
        "choices": [
          {
            "id": "world-2-square-0",
            "label": "Help gather memories",
            "description": "Carry lanterns from roof to roof.",
            "effect": "note",
            "result": "The lanterns reveal a bright line from the old market well to the tower foundation.",
            "fracture": 1
          },
          {
            "id": "world-2-square-1",
            "label": "Trade your fading satchel",
            "description": "Give up this loop’s objects for one clear vision.",
            "effect": "route",
            "result": "Your possessions dissolve. In return, the hidden route sharpens in memory.",
            "fracture": 1
          }
        ]
      },
      "gate": {
        "hint": "An arch made of reflections",
        "title": "Crossing the mirrored threshold",
        "weather": "The sky is under your feet.",
        "text": "North Gate has risen into a vertical sheet of reflected stone. Its keeper admits only travelers whose reflection remembers another day.",
        "choices": [
          {
            "id": "world-2-gate-0",
            "label": "Cross through your reflection",
            "description": "Step into the version of you carrying the ember lens.",
            "effect": "lens",
            "result": "You emerge with the lens fixed in memory, warm behind your eyes.",
            "fracture": 2
          },
          {
            "id": "world-2-gate-1",
            "label": "Guide stranded townspeople",
            "description": "Turn the shifting reflections into stepping stones.",
            "effect": "note",
            "result": "Each person you help reappears in the Underbell windows, awake and waiting.",
            "fracture": 1
          }
        ]
      },
      "glassworks": {
        "hint": "The cold furnace is singing",
        "title": "Sella’s impossible workshop",
        "weather": "Sparks freeze in the air.",
        "text": "The Glassworks hangs upside down above its own chimney. Sella needs one steady memory to finish the lens while every tool drifts away.",
        "choices": [
          {
            "id": "world-2-glassworks-0",
            "label": "Hold the remembered shape",
            "description": "Describe the lens until the glass obeys.",
            "effect": "lens",
            "result": "Sella completes it inside your memory. This time, midnight cannot take it.",
            "fracture": 1
          },
          {
            "id": "world-2-glassworks-1",
            "label": "Catch the drifting tools",
            "description": "Leap between worktables and falling sparks.",
            "effect": "note",
            "result": "You save the workshop. Sella promises to keep the furnace dark when morning finally comes.",
            "fracture": 1
          }
        ]
      }
    }
  ],
  "npcScheduleRows": [
    {
      "id": "mina",
      "cells": [
        "Mina",
        "Flower auction",
        "Masked market",
        "Roof lanterns",
        "Tower vigil"
      ]
    },
    {
      "id": "orrin",
      "cells": [
        "Orrin",
        "Saint Orra’s",
        "North Gate",
        "Twin ward",
        "Underbell"
      ]
    },
    {
      "id": "sella",
      "cells": [
        "Sella",
        "Furnace shift",
        "Mirror fire",
        "Inverted shop",
        "Cold forge"
      ]
    },
    {
      "id": "vale",
      "cells": [
        "Vale",
        "Archive doors",
        "Buried stair",
        "Living map",
        "Bell records"
      ]
    }
  ],
  "bonds": {
    "square": "Mina, redflower seller",
    "gate": "Orrin, the missing bellkeeper",
    "glassworks": "Sella, glassworker",
    "hospice": "The child in Orrin’s coat",
    "floodedArchive": "Archivist Vale",
    "underbell": "The procession drummer"
  },
  "keepsakes": {
    "square": "redflower petal",
    "gate": "punched gate token",
    "glassworks": "warm glass bead",
    "hospice": "lullaby page",
    "floodedArchive": "chalk map",
    "underbell": "drum key"
  },
  "schedules": [
    {
      "title": "What changes by noon?",
      "clue": "Market notices name three possible disruptions.",
      "options": [
        "Bell Square draws a masked crowd",
        "North Gate closes to all travelers",
        "Glassworks begins an emergency firing"
      ],
      "answer": 0,
      "reveal": "The masked crowd gathers in Bell Square."
    },
    {
      "title": "What breaks before dusk?",
      "clue": "The town clock skips a tooth; one district answers.",
      "options": [
        "The archive floods upward",
        "The Glassworks furnace sings",
        "Saint Orra’s empties its ward"
      ],
      "answer": 1,
      "reveal": "The Glassworks furnace begins to sing."
    },
    {
      "title": "Where does midnight strike first?",
      "clue": "The last schedule is smudged with redflower pollen.",
      "options": [
        "Underbell opens below the tower",
        "North Gate rises from the road",
        "The archive sheds its walls"
      ],
      "answer": 0,
      "reveal": "Underbell opens before the thirteenth bell."
    }
  ],
  "squareScenes": {
    "pending": {
      "hint": "Mina waits at the auction stalls",
      "title": "The alley before Noon",
      "weather": "Bootsteps approach the market.",
      "text": "Mina has packed her redflowers into a damaged crate. Inspector Brann is marking the main alley for the masked procession. A narrow side passage runs behind the stalls toward the sheltered market well. The crowd has not arrived yet."
    },
    "ready": {
      "hint": "A remembered blockage; a different route",
      "title": "A route remembered",
      "weather": "The same bootsteps approach.",
      "text": "Mina is packing the crate again. Brann is marking the same main alley. You remember how the crowd closed it at Noon. The side passage toward the sheltered market well is still tangled with empty stands."
    },
    "prepared": {
      "hint": "Side passage cleared; Noon still ahead",
      "title": "A passage waiting for Mina",
      "weather": "A redflower marks the cleared way.",
      "text": "You have moved the empty stands aside. Mina knows the side passage leads to the sheltered market well. The crowd has not arrived yet; the result will be known at Noon. Your saved minute can still carry you to another district before that bell."
    },
    "blocked": {
      "hint": "Mina and her crate at the auction stalls",
      "title": "The alley has closed",
      "weather": "Masks press shoulder to shoulder.",
      "text": "The masked crowd fills the main alley. Mina and her crate remain at the auction stalls, unable to pass. The shelter at the market well is still beyond them. Arriving after the bell shows the aftermath; it does not tell you how the blockage began."
    },
    "safe": {
      "hint": "Mina and her crate at the sheltered well",
      "title": "Redflowers beside the market well",
      "weather": "The crowd passes beyond the shelter.",
      "text": "Mina and her crate reach the sheltered market well through the side passage you cleared. She puts one uncrushed redflower on the well stones. The main alley is still blocked; the changed route, not a changed crowd, brought her here."
    },
    "interrupted": {
      "hint": "Noon interrupted by catastrophe",
      "title": "The market before the broken bell",
      "weather": "Midnight cuts across the morning.",
      "text": "Fracture reached four before Noon. The planned crossing never happened. No one can claim that Mina reached the shelter or witnessed the scheduled blockage in this interrupted day."
    }
  },
  "squareLoopDetails": [
    "Brann’s delivery marks lead toward the clocktower. Mina is trying to save the flowers he has not bought.",
    "The market wears fox masks this morning. A length of red thread hangs from Mina’s crate; Brann’s sealed ledger records the market’s repeated days.",
    "Small paper memories cling to Mina’s crate. The fractured town has left a trail between the old well and the tower foundation."
  ],
  "squareChoices": [
    [
      {
        "id": "square-flowers",
        "label": "Help Mina sort the crate",
        "effect": "item:redflower",
        "fracture": 1,
        "result": "You save a redflower from the damaged crate. Mina gives it to you; its pollen glows when the tower chimes. Sorting the crate does not open an alley.",
        "descriptions": {
          "pending": "Sort the damaged flowers beside the auction stalls. Mina has not crossed the market yet.",
          "blocked": "Save the crushed flowers beside the auction stalls. This does not reopen the crowded alley.",
          "safe": "Set the flowers in order beside the sheltered well. Mina’s crossing is already complete."
        }
      },
      {
        "id": "square-deliveries",
        "label": "Read Brann’s delivery marks",
        "effect": "note",
        "fracture": 1,
        "result": "The marks show that Brann delivers redflowers to the tower to keep its gears asleep. His purchase does not explain a safe route through the crowd.",
        "descriptions": {
          "pending": "Follow the chalk marks on the auction stands before the procession arrives.",
          "blocked": "Read the delivery marks still visible on the blocked auction stalls.",
          "safe": "Read the marks on the crate now resting beside the market well."
        }
      }
    ],
    [
      {
        "id": "square-thread",
        "label": "Tie a red thread to Mina’s crate",
        "effect": "item:red-thread",
        "fracture": 1,
        "result": "Mina ties the spare red thread around your wrist. It points toward people displaced by the loop. It does not clear the side passage.",
        "descriptions": {
          "pending": "Fasten the loose crate panels before the crowd arrives.",
          "blocked": "Fasten the crate where Mina is stranded at the auction stalls.",
          "safe": "Fasten the crate beside Mina at the sheltered market well."
        }
      },
      {
        "id": "square-ledger",
        "label": "Unseal Brann’s private ledger",
        "effect": "note",
        "fracture": 2,
        "result": "Breaking the seal strains the town. The ledger shows an exhausted inspector feeding flowers to the bell for years to postpone the fracture.",
        "descriptions": {
          "pending": "Risk breaking the wax seal beneath an empty auction stand. +2 Fracture.",
          "blocked": "Reach the sealed ledger beneath the crowded stalls. +2 Fracture; the alley stays blocked.",
          "safe": "Read the ledger copy Mina brought to the shelter. Breaking its seal adds +2 Fracture."
        }
      }
    ],
    [
      {
        "id": "square-memories",
        "label": "Gather the market’s memories",
        "effect": "note",
        "fracture": 1,
        "result": "The rescued paper memories reveal a bright line from the old market well to the tower foundation.",
        "descriptions": {
          "pending": "Gather the scraps caught on Mina’s crate before the procession scatters them.",
          "blocked": "Catch the paper scraps tumbling through the stranded auction stalls.",
          "safe": "Collect the paper memories Mina has laid around the sheltered well."
        }
      },
      {
        "id": "square-remembered-route",
        "label": "Trace the route through your keepsakes",
        "effect": "route",
        "fracture": 1,
        "result": "Your keepsakes and the market’s memories align. The hidden route from the old well to the tower sharpens in memory; your possessions remain with you.",
        "descriptions": {
          "pending": "Compare your keepsakes with Mina’s scraps while the crossing is still ahead.",
          "blocked": "Trace the old well from the memories gathered at the blocked stalls.",
          "safe": "Lay your keepsakes beside Mina’s memories at the well and trace the tower route."
        }
      }
    ]
  ],
  "squareAction": {
    "id": "prepare-mina-route",
    "label": "Prepare the side passage",
    "description": "Move the empty stands before Noon. Ordinary visit: one phase +1 Fracture. A valid borrowed visit saves the phase, not the Fracture.",
    "effect": "prepare-mina-route",
    "result": "You clear the side passage and show Mina where it reaches the sheltered market well. Her crossing still waits for Noon.",
    "fracture": 1
  },
  "squareLimits": {
    "unseen": "You have no eyewitness clue about this blockage. A report or a late visit is not the same as seeing it happen.",
    "next-loop": "Carry this witnessed clue into the next loop before preparing a different route.",
    "late": "The preparation window ended at Noon. The outcome cannot be changed by arriving late; another loop offers another morning.",
    "resolved": "This morning’s crossing has already resolved.",
    "prepared": "The side passage is already prepared. No second preparation is needed or charged.",
    "ready": "You witnessed why the main alley failed. Prepare the side passage before Noon: +1 Fracture and one phase, or use an eligible borrowed minute to preserve the phase."
  },
  "squareOutcomes": {
    "blocked": "The masked crowd closes the main alley. Mina and her crate remain at the auction stalls. The crowd, not Brann’s flower purchase, stops the crossing.",
    "safe": "The masked crowd closes the main alley. Mina and her crate reach the sheltered market well through the side passage you prepared. One uncrushed redflower rests on the well stones.",
    "interrupted": "Fracture reaches four before Noon. The crossing is interrupted: no Mina outcome, eyewitness clue or forecast reward is claimed for the skipped bell."
  },
  "itemNames": {
    "redflower": "redflower",
    "footprints": "footprints",
    "drum": "drum",
    "gate-token": "gate token",
    "glass-bead": "glass bead",
    "red-thread": "red thread",
    "iron-hook": "iron hook",
    "blank-token": "a blank brass token"
  }
};
