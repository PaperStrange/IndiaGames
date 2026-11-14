export const LOCALES = ['en', 'ja', 'zh-Hans'] as const;
export type Locale = (typeof LOCALES)[number];
export type Resolution = 'accept' | 'correct';
export type EndingId = 'own-hand' | 'borrowed-hand';
export type PriorPattern = `${Resolution}-${Resolution}`;
export type Messages = Record<string, string>;

export interface Intent {
  id: string;
  mark: 'circle' | 'strike';
  labelKey: string;
  sourceKey: string;
  replyKey: string;
  outcomeKeys: Record<Resolution, string>;
}

export interface Beat {
  id: string;
  sceneKey: string;
  promptKey: string;
  options: readonly Intent[];
  arrivalKeys: Record<Resolution, string>;
}

export interface Story {
  id: string;
  version: number;
  titleKey: string;
  subtitleKey: string;
  introKeys: readonly string[];
  cast: Record<'keeper' | 'correspondent', { id: string; nameKey: string }>;
  beats: readonly Beat[];
  endings: readonly { id: EndingId; titleKey: string; bodyKey: string; patternKeys: Record<PriorPattern, string> }[];
}
