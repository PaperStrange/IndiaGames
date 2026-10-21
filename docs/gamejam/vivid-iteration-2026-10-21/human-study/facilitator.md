# Facilitator guide

Read the [protocol](protocol.md) first. This guide is a script for a future human session, not a record of one.

## Prepare the exact candidate

Use the frozen `master` artifact and its recorded build hash. Serve its existing `build/` directory; do not rebuild from a development checkout during testing. A local example, with the selected version substituted, is:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory release-candidates/keepers-frame/VERSION/build
```

For a physical phone, bind to the host's trusted private LAN interface and use that host's LAN address on the same trusted network. Record the actual URL. Do not expose the server publicly and do not assume a `master` GitHub Pages URL exists. Confirm assets load from this exact artifact before enrolling a participant. The source UI supports these routes:

- Iona remembered: `/?profile=remembered#iona`
- Iona neutral: `/?profile=neutral#iona`
- Mara: `/?profile=remembered#mara`

Use a fresh browser profile/context for each participant. Check that it has no legacy `keepers-frame:v1` memory and no previous Vivid save. Preserve the same context through that person's scheduled return; do not reset or clear storage mid-session. Record failed/blocked storage if encountered. Keep experimental assignment out of the spoken task; the neutral query parameter is for setup, not an instruction to behave differently.

## Opening, before the first game action

Confirm consent, pseudonym, assigned cohort, exact artifact, device and start time. Say:

“We are testing the story, not you. Please explore at your own pace. You can use any controls or accessibility options in the experience. It is fine to make mistakes, be silent or stop. I will mostly watch, and I may ask what you expected after an action.”

Then ask once: **“From what you can see so far, what do you think this experience will let you do?”** Record the answer verbatim where possible. Do not mention a correct signal, an AI limitation, a workshop, a return consequence or a preferred interpretation. Do not ask a leading yes/no question such as “Do you expect this to remember your choice?”

## Observe without solving

Begin the scored play timer. Record action → visible feedback → next expectation, with relative times. Capture hesitation, control attempts, wrong inputs, recovery, rereading, voluntary use of hints/transcript/settings, and the first thing that holds attention. Report what was observed; do not turn a facial expression into a claimed emotion without asking.

Permitted neutral prompts are “What were you expecting there?” and “What are you looking for?” Use sparingly and record them. If the participant asks for a solution, say “You can keep exploring, or we can stop this attempt and look together.” If they choose help, timestamp it, lock `completed_unassisted` false and separate guided play from scored evidence. Never silently help a successful run.

For Iona, observe the first ending. If the participant has not already returned, say: **“Please leave this story and open the same one once more.”** This schedules the same exposure in remembered and neutral cohorts. Give no further direction about objects or destinations. Record spontaneous return separately from prompted return. Keep storage intact. Watch whether placement is understood through clicking, touch, dragging or keyboard controls; every built-in equivalent is valid.

For Mara, let the player choose the inspection order. Do not point out notch 3 or ask which interpretation is “correct.” The game text supplies its own alignment guidance. The endpoint is any interpretation ending.

## Debrief only after the scored actions

First use the gate questions, without confirming correctness during the answer:

- Iona, both conditions: **“What, if anything, connects what you did earlier with what you could do on this visit? Please point to something in the story.”** Accept a neutral player's accurate statement that the cloth task had no visible choice-specific connection; record the defined metric consistently rather than rewarding invented causality.
- Mara: **“Describe one thing you changed and what you could see change because of it.”** A meaningful action/consequence account is the criterion, not a preferred emotional reading.
- All: **“What would you tell someone this experience can and cannot do?”** Record any unrestricted-AI expectation without introducing that term yourself.

Then ask the product questions:

1. “When did you first want to continue, if you did? What had just happened?”
2. “When did you want to stop or feel unsure? What did you try next?”
3. “Which action felt most connected to the story? Which felt like an instruction to get through?”
4. “What would you remember or describe to a friend? What other game or experience does it remind you of?”
5. “Was there anything you wanted to do that the experience would not let you do?”

Do not ask “Was this fun?” as the sole assessment, praise favorable answers or defend the design. Record a player's own comparison as their comparison, not verified competitor evidence. Lock the metrics from behavior and answers before explaining the intended narrative or demonstrating alternate paths.

## Close and review

Record end time, completion state, assistance, open bugs and any unobserved criterion. Remind participants of the agreed data retention and withdrawal contact. Send a delayed question only if the optional protocol and contact permission were declared beforehand.

The independent reviewer examines original consented notes/evidence, failed attempts as well as successes, exact artifact identity and severity decisions, and personally plays the candidate. They resolve disputed classifications with written reasons. A reviewer must never infer that the code's automated pass proves the human was unassisted. Only then can real report fields and approval be completed.
