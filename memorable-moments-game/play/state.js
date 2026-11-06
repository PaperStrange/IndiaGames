// State-owned: no browser or DOM access. The renderer must expose only what the current step needs.
import { scenesFor } from './content.js';
import { message, graphemes, limitText, fontStack } from './locales.js';
export function fresh() { return { step: 'home', mode: 'pair', sceneIndex: 0, answers: [null, null], lines: ['', ''], choice: null, guess: null }; }
export function sceneOf(state, locale = 'en') { return scenesFor(locale)[state.sceneIndex]; }
export function begin(state, mode) { return { ...fresh(), mode, step: 'scene', sceneIndex: state.sceneIndex }; }
export function choose(state, kind, id) {
  if (!['choose-a', 'choose-b'].includes(state.step) || !['choice', 'guess'].includes(kind) || !sceneOf(state).choices.some(c => c.id === id)) return state;
  return { ...state, [kind]: id };
}
export function seal(state) {
  if (!['choose-a', 'choose-b'].includes(state.step) || !state.choice || !state.guess) return state;
  const person = state.step === 'choose-a' ? 0 : 1;
  const answers = [...state.answers];
  answers[person] = { choice: state.choice, guess: state.guess };
  return { ...state, answers, choice: null, guess: null, step: person === 0 ? 'pass-b' : 'together' };
}
export function sealLine(state, value, locale = 'en') {
  if (!['write-a', 'write-b'].includes(state.step)) return state;
  const person = state.step === 'write-a' ? 0 : 1;
  const lines = [...state.lines];
  lines[person] = limitText(value.trim()) || message(locale, 'write.fallback');
  return { ...state, lines, step: person === 0 ? 'pass-write-b' : 'keepsake' };
}
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
export function xmlText(value) { return escapeHtml(value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')); }
// Width is in CSS pixels when a font-measuring callback is supplied. The
// conservative default treats every grapheme as a full em, including CJK.
export function wrappedLines(value, width = 39, measure = text => graphemes(text).length) {
  const output = [];
  for (const paragraph of value.split(/\r?\n/)) {
    let line = '';
    for (const part of graphemes(paragraph)) {
      if (line && measure(line + part) > width) {
        // Keep ordinary closing CJK punctuation with its preceding text. One
        // extra grapheme is fitted by the SVG line's final width guard.
        if (/^[、。，．！？；：）》」』】〕〉〗〙〛…]$/u.test(part) && measure(line + part) <= width + measure(part)) { line += part; continue; }
        const previous = graphemes(line);
        if (/^[（《「『【〔〈〖〘〚]$/u.test(previous.at(-1)) && previous.length > 1) {
          output.push(previous.slice(0, -1).join('')); line = previous.at(-1); line += part; continue;
        }
        const split = line.lastIndexOf(' ');
        if (split > line.length / 2) { output.push(line.slice(0, split)); line = line.slice(split + 1); }
        else { output.push(line); line = ''; }
      }
      // A single unusually wide grapheme stays intact; SVG uses a per-line
      // length cap as a final guard rather than splitting a person's character.
      line += part;
    }
    output.push(line);
  }
  return output;
}
export function keepsakeSvg(state, dateLabel, locale = 'en', measure) {
  const scene = sceneOf(state, locale), font = fontStack(locale);
  const width = 560;
  const wrap = (value, size) => wrappedLines(value, width, measure ? text => measure(text, size, font) : text => graphemes(text).length * size);
  const text = (value, y, size, color = '#263c34') => {
    const estimated = measure ? measure(value, size, font) : graphemes(value).length * size;
    const fit = estimated > width ? ` textLength="${width}" lengthAdjust="spacingAndGlyphs"` : '';
    return `<text x="60" y="${y}" fill="${color}" font-family="${xmlText(font)}" font-size="${size}"${fit}>${xmlText(value)}</text>`;
  };
  let y = 90, body = text(message(locale, 'keepsake.brand'), y, 15);
  y = 170;
  for (const line of wrap(scene.keepsake, 36)) { body += text(line, y, 36); y += 46; }
  y += 22; body += `<path d="M60 ${y}h600" stroke="#cfc8b4"/>`; y += 48;
  for (const [index, line] of state.lines.entries()) {
    body += text(message(locale, 'keepsake.person', {person: index ? 'B' : 'A'}), y, 14, '#8b604e'); y += 36;
    for (const part of wrap(line, 24)) { body += text(part, y, 24); y += 34; }
    y += 34;
  }
  body += `<path d="M60 ${y}h600" stroke="#cfc8b4"/>`; y += 38;
  for (const line of wrap(scene.stamp, 14)) { body += text(line, y, 14); y += 24; }
  for (const line of wrap(`${dateLabel} · ${message(locale, state.mode === 'solo' ? 'keepsake.solo' : 'keepsake.pair')}`, 14)) { body += text(line, y, 14); y += 24; }
  const height = Math.max(850, y + 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" xml:lang="${locale}" lang="${locale}" width="720" height="${height}" viewBox="0 0 720 ${height}"><title>${xmlText(scene.keepsake)}</title><rect width="720" height="${height}" fill="#f5f0e3"/><rect x="22" y="22" width="676" height="${height - 44}" rx="12" fill="none" stroke="#cfc8b4"/><circle cx="630" cy="98" r="28" fill="#da906b"/>${body}</svg>`;
}
