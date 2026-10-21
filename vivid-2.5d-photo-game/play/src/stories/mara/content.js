export const defaultCast = {
  painter: {
    name: 'Mara', pronouns: 'she/her', subject: 'she', object: 'her', possessive: 'her',
    description: 'The station sign painter, present through paint marks, notes, and work left carefully unfinished.',
  },
};

export function makeContent(cast) {
  const m = cast.painter;
  return {
    title: 'The Unfinished Postcard', subtitle: 'A mystery told by objects',
    description: 'A closed station. Three things left on a workbench. Find the picture its sign painter was still making.',
    welcome: `The station closed on a Thursday. On Friday, its sign painter, ${m.name}, was still at the workbench. The room is empty now. What was ${m.subject} making?`,
    investigate: 'The workbench is just as it was left: a timetable, a paint-marked postcard, and two thin sheets of drawings. You can begin with any of them.',
    objects: {
      timetable: {
        title: 'The cancelled timetable',
        text: 'LAST SERVICE · THURSDAY, 18:40. Across the bottom, in fresh blue paint: “Key kept at the bakery. A room does not stop being a room when the trains stop.”',
        short: 'The last train left. Someone kept a key.',
      },
      postcard: {
        title: 'A postcard with paint on its edge',
        text: `The picture shows the old waiting room. On the back, ${m.name} has written: “Bring the thing you do not know how to mend. Saturdays, if enough of us come.” The address line is empty.`,
        short: 'An invitation to bring something broken.',
      },
      sketches: {
        title: 'Two architectural sketches',
        text: 'One sheet traces the waiting-room windows. The other adds broad tables and a rack of tools. Three little registration notches are drawn beside the layers. At the third notch, the window edges should meet.',
        short: 'The old room and a new arrangement, drawn on separate sheets.',
      },
    },
    adjustment: 'The layers move across the lightbox. Look for the window edges meeting at registration notch 3. There is no time limit; each step can be undone.',
    aligned: 'The window edges meet. The benches have become worktables; the ticket shelf holds tools. The same room, ready to be used differently.',
    notYet: 'The picture is not quite together. Inspect all three objects, then line up the window edges at notch 3.',
    reveal: `The postcard was an invitation, not a farewell. ${m.name} was drawing a community workshop inside the old waiting room. The trains had stopped; the room could still bring people together. There is space at the nearest table.`,
    interpretations: [
      { id: 'repair', label: 'A place to repair things', ending: 'Perhaps someone will bring a chair with one loose leg. Perhaps they will stay for tea. A place can begin again with a small repair.' },
      { id: 'meet', label: 'A reason to meet again', ending: 'The old timetable once gave people a reason to arrive together. The new invitation might do that, too. No ticket required.' },
      { id: 'unfinished', label: 'An invitation still taking shape', ending: 'Not every edge is inked. There is room to add a table, change a plan, bring an idea. Unfinished can mean there is a place for you.' },
    ],
    closing: 'You leave the layers aligned on the lightbox. The empty address line on the postcard could be for anyone in the town.',
  };
}
