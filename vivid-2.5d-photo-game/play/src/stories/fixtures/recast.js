// Development fixture. Deliberately absent from the shipping catalog.
// A different actor needs no shared-runtime edits or story-event renaming.
import { createIonaPack } from '../iona/index.js';
export const recastPack = createIonaPack({
  id: 'recast-fixture',
  cast: {
    keeper: {
      name: 'Eris', pronouns: 'they/them', subject: 'they', object: 'them', possessive: 'their',
      description: 'Eris, a keeper with a weathered coat and an ordinary wooden repair beside the lamp.',
    },
  },
});
