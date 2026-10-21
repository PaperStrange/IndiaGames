// Writer-editable fiction. Stable object/actor IDs belong in index.js, names here.
export const defaultCast = {
  keeper: {
    name: 'Iona', pronouns: 'she/her', subject: 'she', object: 'her', possessive: 'her',
    portrait: 'art/keeper-portrait.svg',
    description: 'A harbour keeper in a weathered blue coat. One hand rests beside a small, carefully repaired lamp.',
  },
};

export function makeContent(cast) {
  const k = cast.keeper;
  return {
    title: 'A Place for the Promise', subtitle: 'An evening at the harbour',
    description: 'Help a keeper bring a ferry home. Learn what steadies a light, and choose where a promise belongs.',
    welcome: `The last ferry is somewhere in the fog. ${k.name} cannot reach beyond the painted frame. Two harbour marks will tell you how to call it home. There is time to look carefully.`,
    invitation: 'You there. Will you help me with the light? The marks are tucked around the frame. Lean a little; you will find them.',
    explore: 'The harbour is quiet enough to hear the rope strike the mooring post. Look around the edges of the frame, then set the lamp from what you find.',
    marks: {
      ledger: { title: 'A page behind the frame', text: 'FOG PROCEDURE · Aim EAST, toward the old breakwater. The west channel is closed.', short: 'Bearing · EAST' },
      plate: { title: 'A worn brass plate', text: 'FERRY CALL · One short flash. One long flash. One short flash. Wait for the answering light.', short: 'Rhythm · SHORT / LONG / SHORT' },
      notch: { title: 'A worn notch', text: 'A shallow notch has been rubbed smooth beside the lamp. A little wooden wedge rests below it. Someone has kept this ordinary scrap for a long time.', short: 'A worn notch and a wooden wedge' },
      letter: { title: 'A folded letter', text: `To whoever keeps this light after me: I was frightened every night. I turned it on anyway. — ${k.name}`, short: 'A letter meant for the next keeper' },
    },
    firstPeek: 'That was my letter. You could have asked. We can speak about it later. For now, please read the harbour marks; people are waiting.',
    noEvidence: 'Find both harbour marks first. A good signal begins with evidence.',
    incompleteSignal: 'Choose a bearing and a flash pattern. The two marks will guide you.',
    wrongSignal: 'No answering light yet. Compare the settings with the two harbour marks. Nothing is lost; you can try again.',
    rescued: 'There. The answering light. The ferry has found the breakwater. We can leave the lamp steady now. Would you like to know why I kept that little wedge?',
    recollection: {
      entered: 'An earlier watch, years before this ferry. The shade rattled all night. I thought keeping the light meant never being frightened. First, help me brace the shade. It will stay where you put it.',
      braced: 'Yes. Hold it there with the little catch; your hands are free now. I cut this wedge from a broken crate. Fit it into the notch beside the lamp.',
      wedged: 'The shade is still. Just a scrap of wood, but I could breathe again. I did not become fearless. I found one small thing I could do, and then another.',
      finished: 'Back in the present. The same notch, worn smooth by years of use. The ferry is safely in. The letter is yours to read now, if you would like.',
    },
    choice: `The letter belongs to ${k.name}. You may keep it between you, or ask permission to hang a short dedication where the harbour can see it. Either is a way of caring.`,
    dedication: `For ${k.name}, who kept the harbour light through difficult nights. With thanks from those it brought home.`,
    endings: {
      private: { title: 'A promise between frames', text: 'Then it stays between us. I will leave a sheltered space beside the lamp. Come back when you like; there will be a place for it.', summary: 'You chose to keep the original letter private.' },
      archive: { title: 'A name facing the harbour', text: 'Yes. Those words may face the harbour. Thank you for asking. The original letter will stay folded here; the dedication can carry my name.', summary: 'You approved a public dedication with the keeper. The original letter remains private.' },
    },
    intrusion: 'You read before I had said yes. I remember that, too. Thank you for hearing me now.',
    returns: {
      private: 'You kept the letter between us. Here is the sheltered recess I promised. Will you put the folded letter there, out of the weather?',
      archive: 'The dedication is ready. Here, on the edge facing the harbour, people will be able to see it. Will you pin it in place?',
      legacyArchive: 'On your earlier visit, you placed my letter in the public record, with my permission. It is already public; that has not been undone. This new dedication can have a place on the frame as well.',
      neutral: 'Good to see you. I have finished cleaning the lamp. Will you put this cloth on its peg, where it can dry?',
    },
    placed: {
      letter: 'There. Out of the wind, beside the light. A private promise can have a place in the world, too.',
      dedication: 'There. The harbour can read it in the morning. The little repair and the long nights belong to the same person.',
      cloth: 'There. It will be dry for tomorrow. Thank you for helping with this small task.',
    },
    closing: 'The ferry is home. The lamp is steady. You can leave the frame as it is, and find it this way when you return.',
  };
}
