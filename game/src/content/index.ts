import { en } from './en.ts';
import { ja } from './ja.ts';
import { zhHans } from './zh-Hans.ts';
import type { Locale, Messages, Story } from './types.ts';
export { LOCALES } from './types.ts';
export type { Locale, Messages, Story, Beat, Intent, Resolution, EndingId, PriorPattern } from './types.ts';

export const CATALOGS: Record<Locale, Messages> = { en, ja, 'zh-Hans': zhHans };
export function catalog(locale: Locale): Messages { return CATALOGS[locale]; }

const intent = (id: string, mark: 'circle' | 'strike') => ({
  id, mark, labelKey: `intent.${id}.label`, sourceKey: `intent.${id}.source`,
  replyKey: `intent.${id}.reply`,
  outcomeKeys: { accept: `intent.${id}.accept`, correct: `intent.${id}.correct` },
});

export const STORY: Story = {
  id: 'borrowed-words', version: 1,
  titleKey: 'story.title', subtitleKey: 'story.subtitle',
  introKeys: ['story.intro1', 'story.intro2', 'story.intro3'],
  cast: {
    keeper: { id: 'keeper', nameKey: 'cast.keeper' },
    correspondent: { id: 'correspondent', nameKey: 'cast.correspondent' },
  },
  beats: [
    {
      id: 'doorway', sceneKey: 'beat.doorway.scene', promptKey: 'beat.doorway.prompt',
      arrivalKeys: { accept: 'beat.doorway.arrival.accept', correct: 'beat.doorway.arrival.correct' },
      options: [intent('keep-door-closed', 'strike'), intent('allow-one-knock', 'circle')],
    },
    {
      id: 'name', sceneKey: 'beat.name.scene', promptKey: 'beat.name.prompt',
      arrivalKeys: { accept: 'beat.name.arrival.accept', correct: 'beat.name.arrival.correct' },
      options: [intent('use-borrowed-name', 'circle'), intent('leave-name-blank', 'strike')],
    },
    {
      id: 'record', sceneKey: 'beat.record.scene', promptKey: 'beat.record.prompt',
      arrivalKeys: { accept: 'beat.record.arrival.accept', correct: 'beat.record.arrival.correct' },
      options: [intent('keep-both-accounts', 'circle'), intent('lend-last-line', 'strike')],
    },
  ],
  endings: [
    { id: 'own-hand', titleKey: 'ending.own-hand.title', bodyKey: 'ending.own-hand.body', patternKeys: {
      'accept-accept': 'ending.own-hand.accept-accept', 'accept-correct': 'ending.own-hand.accept-correct',
      'correct-accept': 'ending.own-hand.correct-accept', 'correct-correct': 'ending.own-hand.correct-correct',
    } },
    { id: 'borrowed-hand', titleKey: 'ending.borrowed-hand.title', bodyKey: 'ending.borrowed-hand.body', patternKeys: {
      'accept-accept': 'ending.borrowed-hand.accept-accept', 'accept-correct': 'ending.borrowed-hand.accept-correct',
      'correct-accept': 'ending.borrowed-hand.correct-accept', 'correct-correct': 'ending.borrowed-hand.correct-correct',
    } },
  ],
};
