// A story is registered here, never selected by name inside the shared runtime.
export const catalog = [
  {
    id: 'iona', title: 'A Place for the Promise', subtitle: 'An evening at the harbour',
    description: 'Help a keeper bring a ferry home. Learn what steadies a light, and choose where a promise belongs.',
    duration: 'About 5–8 minutes · a return visit',
    presentation: { kind: 'portrait', art: 'art/keeper-portrait.svg' },
    load: () => import('./iona/index.js'),
  },
  {
    id: 'mara', title: 'The Unfinished Postcard', subtitle: 'A mystery told by objects',
    description: 'A closed station. Three things left on a workbench. Find the picture its sign painter was still making.',
    duration: 'About 2–4 minutes · one sitting',
    presentation: { kind: 'workbench', art: 'art/postcard.svg' },
    load: () => import('./mara/index.js'),
  },
];
