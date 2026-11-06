// Stable semantic IDs are shared by every locale; display prose never drives rules.
import { message } from './locales.js';
const definitions = [
  {
    "id": "museum",
    "choices": [
      {
        "id": "color",
        "icon": "◒"
      },
      {
        "id": "shape",
        "icon": "⌁"
      },
      {
        "id": "story",
        "icon": "✧"
      }
    ]
  },
  {
    "id": "postcard",
    "choices": [
      {
        "id": "sea",
        "icon": "≈"
      },
      {
        "id": "moon",
        "icon": "☾"
      },
      {
        "id": "garden",
        "icon": "✳"
      }
    ]
  },
  {
    "id": "weather",
    "choices": [
      {
        "id": "sun",
        "icon": "☀"
      },
      {
        "id": "rain",
        "icon": "☂"
      },
      {
        "id": "wind",
        "icon": "↝"
      }
    ]
  }
];
const fields = ["tag", "title", "subtitle", "noun", "question", "prompt", "actionTitle", "action", "writing", "keepsake", "stamp"];
export function scenesFor(locale = 'en') {
  return definitions.map(scene => ({ id: scene.id, ...Object.fromEntries(fields.map(key => [key, message(locale, `scene.${scene.id}.${key}`)])), choices: scene.choices.map(choice => ({ ...choice, ...Object.fromEntries(['label', 'detail', 'action'].map(key => [key, message(locale, `choice.${scene.id}.${choice.id}.${key}`)])) })) }));
}
export const scenes = scenesFor('en');
