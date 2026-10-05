// State-owned: no browser or DOM access. The renderer must expose only what the current step needs.
import { scenes } from './content.js';
export function fresh() { return { step: 'home', mode: 'pair', sceneIndex: 0, answers: [null, null], lines: ['', ''], choice: null, guess: null }; }
export function sceneOf(state) { return scenes[state.sceneIndex]; }
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
export function sealLine(state, value) {
  if (!['write-a', 'write-b'].includes(state.step)) return state;
  const person = state.step === 'write-a' ? 0 : 1;
  const lines = [...state.lines];
  lines[person] = value.trim().slice(0, 120) || 'Some details are just for us.';
  return { ...state, lines, step: person === 0 ? 'pass-write-b' : 'keepsake' };
}
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
export function xmlText(value) { return escapeHtml(value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')); }
export function wrappedLines(text, width = 39) {
  const parts = Array.from(text); const lines = [];
  while (parts.length) {
    let end = Math.min(parts.length, width);
    const whitespace = parts.slice(0, end).lastIndexOf(' ');
    if (parts.length > width && whitespace > width / 2) end = whitespace;
    lines.push(parts.splice(0, end).join('').trim());
    while (parts[0] === ' ') parts.shift();
  }
  return lines;
}
export function keepsakeSvg(state, dateLabel) {
  const scene = sceneOf(state);
  const text = (value, y, size, color = '#263c34') => `<text x="60" y="${y}" fill="${color}" font-family="Georgia,serif" font-size="${size}">${xmlText(value)}</text>`;
  const contributions = state.lines.map((line, i) => text(`PERSON ${i ? 'B' : 'A'}`, 340 + i * 180, 13, '#8b604e') + wrappedLines(line).map((l, j) => text(l, 380 + i * 180 + j * 32, 24)).join('')).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="850" viewBox="0 0 720 850"><rect width="720" height="850" fill="#f5f0e3"/><rect x="22" y="22" width="676" height="806" rx="12" fill="none" stroke="#cfc8b4"/><circle cx="630" cy="98" r="28" fill="#da906b"/>${text('SMALL HOURS  /  MEMORABLE MOMENTS', 90, 15)}${wrappedLines(scene.keepsake, 28).map((l, i) => text(l, 180 + i * 48, 40)).join('')}<path d="M60 285h600" stroke="#cfc8b4"/>${contributions}<path d="M60 720h600" stroke="#cfc8b4"/>${text(scene.stamp, 761, 13)}${text(`${dateLabel}${state.mode === 'solo' ? ' · SOLO REHEARSAL' : ' · MADE TOGETHER'}`, 793, 13)}</svg>`;
}
