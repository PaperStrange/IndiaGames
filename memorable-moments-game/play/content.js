// Content-owned: add scenes with three concrete, low-pressure prompts.
// Keep every activity possible seated, without a camera, purchase, or disclosure.
export const scenes = [
  {
    id: 'museum', tag: 'NOTICE SOMETHING', title: 'The pocket museum', subtitle: 'Two ordinary objects. One extraordinary exhibit.',
    noun: 'detail', question: 'What catches your eye first?', prompt: 'Choose a way to find an ordinary object nearby. Imagining one works, too.',
    choices: [
      { id: 'color', label: 'A little color', detail: 'Something with a color you like', icon: '◒', action: 'Find or imagine an object with a color you like.' },
      { id: 'shape', label: 'An odd shape', detail: 'Something with an interesting outline', icon: '⌁', action: 'Find or imagine an object with an interesting shape.' },
      { id: 'story', label: 'A quiet story', detail: 'Something you could invent a story for', icon: '✧', action: 'Find or imagine an object you could give a story.' }
    ],
    actionTitle: 'Open a very small museum.', action: 'Put your two objects together—or describe them. Give the pair one impossible job. A teaspoon and a sock might become a lighthouse for ants. Each add a sentence to the exhibit’s story.',
    writing: 'One detail from your tiny exhibit', keepsake: 'Our museum of ordinary wonders', stamp: 'TWO OBJECTS · ONE NEW STORY'
  },
  {
    id: 'postcard', tag: 'GO SOMEWHERE ELSE', title: 'An impossible postcard', subtitle: 'Visit a place that only the two of you can invent.',
    noun: 'destination', question: 'Where does your mind wander?', prompt: 'Choose one ingredient for a place that does not exist yet.',
    choices: [
      { id: 'sea', label: 'An upside-down sea', detail: 'Water overhead, wonder underfoot', icon: '≈', action: 'Imagine an upside-down sea. Describe one thing you see there.' },
      { id: 'moon', label: 'A sleepy little moon', detail: 'Quiet craters and very long shadows', icon: '☾', action: 'Imagine a sleepy little moon. Describe one thing you see there.' },
      { id: 'garden', label: 'A midnight garden', detail: 'Flowers that only open for stories', icon: '✳', action: 'Imagine a midnight garden. Describe one thing you see there.' }
    ],
    actionTitle: 'Send a postcard from nowhere.', action: 'Combine your two destinations into one place. Take turns inventing three details: what you see, what you hear, and what you would bring home. Finish with “Wish you were here, because…”',
    writing: 'One detail you would put on the postcard', keepsake: 'A postcard from our impossible place', stamp: 'NO MAP · JUST US'
  },
  {
    id: 'weather', tag: 'MAKE A LITTLE RITUAL', title: 'Weather for two', subtitle: 'Make up a forecast for this exact little moment.',
    noun: 'weather', question: 'What kind of weather is this moment?', prompt: 'Pick a playful weather pattern. It need not say anything deep about you.',
    choices: [
      { id: 'sun', label: 'Soft sunshine', detail: 'A warm square on the floor', icon: '☀', action: 'Describe a small imaginary forecast with soft sunshine.' },
      { id: 'rain', label: 'Friendly rain', detail: 'Raindrops keeping an uneven beat', icon: '☂', action: 'Describe a small imaginary forecast with friendly rain.' },
      { id: 'wind', label: 'Curious wind', detail: 'A breeze with somewhere to be', icon: '↝', action: 'Describe a small imaginary forecast with curious wind.' }
    ],
    actionTitle: 'Give this moment a forecast.', action: 'Blend your two weather patterns into a silly forecast. Each add one unlikely thing falling from the sky. Invent a tiny hand gesture for your forecast and try it together—or describe it aloud.',
    writing: 'One thing you want to remember about the forecast', keepsake: 'The weather when we were here', stamp: 'A FORECAST THAT ONLY HAPPENS ONCE'
  }
];
