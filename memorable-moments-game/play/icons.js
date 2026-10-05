// Small authored vectors keep pictograms consistent across browser font/emoji sets.
const paths = {
  '↗': '<path d="M6 18 18 6M6 6h12v12" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  '✳': '<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  '◒': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 12a9 9 0 0 0 18 0z" fill="currentColor"/>',
  '⌁': '<path d="M3 16C4 4 11 3 12 12s8 8 9-4" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  '✧': '<path d="M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10z" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  '≈': '<path d="M2 9c6-7 8 7 14 0 3-3 4-3 6-2M2 16c6-7 8 7 14 0 3-3 4-3 6-2" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  '☾': '<path d="M17 2a10 10 0 1 0 3 17C9 21 5 7 17 2z" fill="none" stroke="currentColor" stroke-width="1.2"/>',
  '☀': '<circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2" stroke="currentColor" stroke-width="1.3"/>',
  '☂': '<path d="M3 12a9 9 0 0 1 18 0c-3-2-5-2-9 0-3-2-6-2-9 0zm9-10v17c0 5 5 4 5 0" fill="none" stroke="currentColor" stroke-width="1.3"/>',
  '↝': '<path d="M2 8h13c7 0 5-7 1-4M2 13h19M5 18h8c7 0 5 7 1 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
};
export const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths['✧']}</svg>`;
