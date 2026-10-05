// Authored fiction. No dialogue model or inference service is used.
export const clues = {
  ledger: { title: 'A page behind the frame', body: 'FOG PROCEDURE · Aim EAST, toward the old breakwater. The west channel is closed.', short: 'Bearing · EAST', view: -1 },
  plate: { title: 'A worn brass plate', body: 'FERRY CALL · One short flash. One long flash. One short flash. Wait for the answering light.', short: 'Rhythm · SHORT / LONG / SHORT', view: 1 },
};
export const dialogue = {
  welcome: 'You there. The ferry is coming, and I cannot reach outside this frame. Help me send the safe signal.',
  returningPrivate: 'You kept my letter between us. I remember. This time, I will open it for you — because you waited.',
  returningArchive: 'You put my name in the harbour record. They came back to thank me. I saved you a place beside the lamp.',
  returningPeek: 'You looked before I said yes. Then you kept my secret. I remember both things. We can still do good work together.',
  letter: 'To whoever keeps this light after me: I was frightened every night. I turned it on anyway. — Iona',
  firstPeek: 'That was my letter. You could have asked. Read the harbour marks, please. People are waiting.',
  grant: 'That is the way home. Look — the ferry is answering. You noticed what the fog tried to hide.',
};
export const endings = {
  private: { title: 'A promise between frames', body: 'Iona folds the letter back into its envelope. The ferry reaches the breakwater. One person knows what her courage cost.', memory: 'You kept her letter private.' },
  archive: { title: 'A name in the harbour record', body: 'With Iona’s permission, you place her letter in the public record. The ferry reaches the breakwater. Tomorrow, the harbour will know who kept its light.', memory: 'You helped the harbour remember her.' },
};
