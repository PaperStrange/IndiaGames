/* Read-only presentation of versioned project, task and release records. */
'use strict';

const REPOSITORY = 'https://github.com/PaperStrange/IndiaGames/';
const MAIN_ROOT = REPOSITORY + 'blob/main/';
const REVIEW_ROOT = REPOSITORY + 'blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/';
const LANES = ['memorable', 'vivid', 'bell'];
const LANE_NAMES = { memorable: 'Small Hours', vivid: 'Vivid', bell: 'The Thirteenth Bell', shared: 'Shared team' };
const STATUS_NAMES = { active: 'In progress', done: 'Done', not_selected: 'Not selected', proposed: 'Proposed', conditional: 'Conditional', waiting_for_records: 'Awaiting records', blocked_human: 'Needs people' };
const TODO_PATHS = { memorable: 'docs/games/small-hours/TODO.md', vivid: 'docs/games/keepers-frame/TODO.md', bell: 'docs/games/thirteenth-bell/TODO.md' };
const PAGE_SIZE = 12;
const el = id => document.getElementById(id);
let snapshot = null;
let manifest = null;
let presentation = null;
let releaseRegistry = null;
let loadAttempt = 0;
let currentPage = 1;
let pageCount = 1;

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function link(text, href, className = '') {
  const hasArrow = text.endsWith(' ↗');
  const element = node('a', className, hasArrow ? text.slice(0, -2) : text);
  if (hasArrow) {
    const arrow = node('span', 'link-arrow');
    arrow.setAttribute('aria-hidden', 'true');
    element.append(arrow);
  }
  element.href = href;
  return element;
}
function sourceLink(text, file, className = '') {
  return link(text, file.startsWith('docs/') ? MAIN_ROOT + file : REVIEW_ROOT + file, className);
}
function shortDate(value, year = false) {
  return new Date(value + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', ...(year ? { year: 'numeric' } : {}), timeZone: 'UTC' });
}
function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function githubUrl(value) {
  return typeof value === 'string' && value.startsWith(REPOSITORY);
}
function setViewFromHash({ focus = false } = {}) {
  let hash = location.hash.slice(1);
  try { hash = decodeURIComponent(hash); } catch { /* Treat malformed escapes as an unknown anchor. */ }
  const taskAnchor = /^task-[A-Z]+-\d+$/.test(hash);
  const board = hash === 'main' ? !el('tasks').hidden : hash === 'tasks' || hash === 'tasks-title' || taskAnchor;
  el('overview-view').hidden = board;
  el('tasks').hidden = !board;
  el('overview-link').toggleAttribute('aria-current', !board);
  el('board-link').toggleAttribute('aria-current', board);
  if (board) el('board-link').setAttribute('aria-current', 'page');
  else el('overview-link').setAttribute('aria-current', 'page');
  if (['sources', 'evidence', 'evidence-title'].includes(hash)) el('evidence-details').open = true;
  if (taskAnchor && snapshot) {
    const taskIndex = snapshot.tasks.findIndex(task => 'task-' + task.id === hash);
    if (taskIndex !== -1) {
      el('task-search').value = '';
      ['lane-filter', 'status-filter', 'perspective-filter'].forEach(id => { el(id).value = 'all'; });
      currentPage = Math.floor(taskIndex / PAGE_SIZE) + 1;
      renderTasks();
      const toggle = el(hash).querySelector('.task-toggle');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.textContent = 'Details −';
      el(toggle.getAttribute('aria-controls')).hidden = false;
    }
  }
  const target = el(hash) || (board ? el('tasks') : el('overview'));
  if (focus) {
    const heading = hash === 'main' ? el('main') : board ? el('tasks-title') : el('page-title');
    heading.focus({ preventScroll: true });
  }
  // Reveal the appropriate view before restoring a legacy section anchor.
  if (hash) requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
}

function renderProjects() {
  el('project-grid').replaceChildren(...LANES.map((lane, index) => {
    const source = manifest.sources.find(item => item.lane === lane);
    const display = presentation.projects.find(item => item.lane === lane);
    const card = node('article', 'project-card ' + lane);
    const imageLink = link('', './' + display.image.src, 'project-image-link');
    imageLink.setAttribute('aria-label', `Open the full ${LANE_NAMES[lane]} image`);
    const image = node('img', 'project-image');
    image.src = './' + display.image.src;
    image.alt = display.image.alt;
    image.width = display.image.width;
    image.height = display.image.height;
    image.decoding = 'async';
    if (index > 0) image.loading = 'lazy';
    imageLink.append(image);
    const body = node('div', 'project-body');
    const kicker = node('p', 'project-kicker');
    kicker.append(node('span', '', '0' + (index + 1)), node('span', '', source.candidate_version ? 'Candidate ' + source.candidate_version : 'Baseline prepared'));
    const next = node('p', 'project-next');
    next.append(node('strong', '', 'Next: '), document.createTextNode(display.next_action));
    const links = node('div', 'project-links');
    const setup = link('Playtest setup ↗', source.human_playtest_packet);
    setup.setAttribute('aria-label', `${LANE_NAMES[lane]} playtest setup and recording forms`);
    const code = link('View source ↗', REPOSITORY + 'tree/' + source.reviewed_head);
    code.setAttribute('aria-label', `View ${LANE_NAMES[lane]} source on GitHub`);
    links.append(setup, code);
    body.append(kicker, node('h3', '', LANE_NAMES[lane]), node('p', 'project-promise', display.promise), next, links);
    const provenance = node('details', 'image-details');
    const summary = node('summary', '', 'Image & provenance');
    const caption = node('p', '', display.image.caption);
    caption.append(node('br'), link('Original source image ↗', display.image.source_url));
    provenance.append(summary, caption);
    card.append(imageLink, body, provenance);
    return card;
  }));
}

function renderReadiness() {
  const humanZero = manifest.sources.every(source => source.human_participant_rows === 0);
  el('readiness-note').textContent = humanZero
    ? 'No human sessions recorded. Physical-device checks and independent approval are pending.'
    : 'Review each game’s original session records before making a release decision.';
  el('readiness-rows').replaceChildren(...LANES.map(lane => {
    const source = manifest.sources.find(item => item.lane === lane);
    const row = node('tr');
    row.dataset.lane = lane;
    const name = node('th', '', LANE_NAMES[lane]); name.scope = 'row';
    const build = node('td'); build.dataset.label = 'Build';
    build.append(node('span', '', source.candidate_version ? 'Candidate ' + source.candidate_version : 'Pilot baseline'));
    const sessions = node('td'); sessions.dataset.label = 'Human sessions';
    const counts = node('span', 'human-session-count');
    if (source.human_participant_rows === 0) {
      if (lane === 'vivid') counts.append(document.createTextNode('Iona 0 / 6'), node('br'), document.createTextNode('Mara 0 / 6'));
      else counts.textContent = lane === 'memorable' ? '0 / 6 pairs' : '0 / 6 people';
    } else counts.append(link('See recorded sessions', source.human_playtest_packet));
    sessions.append(counts);
    const devices = node('td'); devices.dataset.label = 'Physical devices'; devices.append(node('span', 'status-label', 'Not verified'));
    const approval = node('td'); approval.dataset.label = 'Human approval'; approval.append(node('span', 'status-label', 'Pending'));
    row.append(name, build, sessions, devices, approval);
    return row;
  }));
}

function renderTimeline() {
  const launch = manifest.launch;
  const steps = [
    ['31 Oct–4 Nov', 'Human pilots', 'Observe all attempts'],
    ['5 November', 'Select a response', 'Change, hold or stop'],
    ['6–10 November', 'Bounded corrections', 'Only evidence-led work'],
    [shortDate(launch.candidate_freeze_date_utc), 'Freeze candidates', 'Exact source and build'],
    [shortDate(launch.decision_date_utc), 'Go / no-go', 'Human review complete'],
    [shortDate(launch.target_date_utc), 'Conditional launch', 'Only approved games']
  ];
  el('timeline').replaceChildren(...steps.map(([date, title, note]) => {
    const step = node('li');
    step.append(node('span', 'milestone-date', date), node('strong', '', title), node('p', '', note));
    return step;
  }));
  el('launch-date').textContent = shortDate(launch.target_date_utc);
  el('launch-year').textContent = launch.target_date_utc.slice(0, 4);
  el('launch-plan-link').href = MAIN_ROOT + launch.plan_document;
}

function renderEvidence() {
  const questionLabels = [['why_play', 'Why play?'], ['differentiation', 'What differs?'], ['unique_experience', 'Distinctive experience?']];
  el('question-grid').replaceChildren(...LANES.map(lane => {
    const display = presentation.projects.find(item => item.lane === lane);
    const card = node('article', 'question-card');
    card.append(node('h3', '', LANE_NAMES[lane]));
    const list = node('dl');
    for (const [key, title] of questionLabels) list.append(node('dt', '', title), node('dd', '', display.questions[key]));
    card.append(list);
    return card;
  }));
  el('source-ledger').replaceChildren(...LANES.map(lane => {
    const source = manifest.sources.find(item => item.lane === lane);
    const record = node('article', 'source-record');
    record.append(node('h3', '', LANE_NAMES[lane]), node('p', '', source.qa_scope));
    const list = node('ul');
    const refs = [
      ['Frozen pilot packet', source.pilot_packet],
      ['Competitor records & limitations', source.latest_research_readme],
      ['Detailed game plan', MAIN_ROOT + TODO_PATHS[lane]],
      ['Candidate manifest', source.candidate_manifest],
      ['Separate policy review', source.release_policy_review?.url]
    ];
    refs.filter(([, url]) => url).forEach(([label, url]) => {
      const item = node('li'); item.append(link(label, url)); list.append(item);
    });
    record.append(list, node('p', '', 'Reviewed source ' + source.reviewed_head.slice(0, 8)));
    return record;
  }));
}

function renderReleases() {
  const names = { 'small-hours': 'Small Hours', 'keepers-frame': 'Vivid', 'thirteenth-bell': 'The Thirteenth Bell' };
  if (!releaseRegistry.releases.length) {
    const empty = node('article', 'release-empty');
    empty.append(node('strong', '', 'No official releases yet.'), node('p', '', 'Candidates await measured human playtests and independent approval.'));
    el('release-grid').replaceChildren(empty);
    return;
  }
  el('release-grid').replaceChildren(...[...releaseRegistry.releases].reverse().map(release => {
    const card = node('article', 'release-card');
    card.append(node('p', 'eyebrow', 'Official release'), node('h3', '', `${names[release.game]} · ${release.version}`));
    const links = node('div', 'project-links');
    links.append(link('Play this version ↗', './' + release.path), link('GitHub version ↗', release.release_url), link('Release notes ↗', MAIN_ROOT + release.notes_path));
    card.append(links, node('p', 'table-note', 'Released ' + release.released_at.slice(0, 10)));
    return card;
  }));
}

function taskDetails(task) {
  const body = node('div', 'task-detail-body');
  body.append(node('h3', '', task.id + ' · Acceptance & evidence'), node('p', '', task.deliverable));
  const list = node('dl');
  list.append(node('dt', '', 'Acceptance criteria'));
  const acceptance = node('dd');
  const criteria = node('ul');
  (Array.isArray(task.acceptance_criteria) ? task.acceptance_criteria : [task.acceptance_criteria]).forEach(text => criteria.append(node('li', '', text)));
  acceptance.append(criteria); list.append(acceptance);
  list.append(node('dt', '', 'Owner'), node('dd', '', task.owner_role + (task.assigned_person_or_agent ? ' · Recorded assignment: ' + task.assigned_person_or_agent : ' · No individual lead recorded.')));
  if (task.assigned_agents?.length) list.append(node('dt', '', 'Recorded agents'), node('dd', '', task.assigned_agents.join(' · ')));
  if (task.focus) list.append(node('dt', '', 'Focus'), node('dd', '', task.focus));
  list.append(node('dt', '', 'Dependencies'), node('dd', '', task.depends_on.length ? task.depends_on.join(' · ') : 'None listed'));
  if (task.dependency_rule) list.append(node('dt', '', 'Dependency rule'), node('dd', '', task.dependency_rule));
  if (task.dependency_note) list.append(node('dt', '', 'Dependency note'), node('dd', '', task.dependency_note));
  if (task.effort_person_hours) list.append(node('dt', '', 'Effort estimate'), node('dd', '', task.effort_person_hours));
  body.append(list);
  if (task.human_participants_required) body.append(node('p', 'task-flags', 'Requires willing real participants; an agent cannot fill this role.'));
  if (task.plan_settlement_required_before_execution) body.append(node('p', 'task-flags', 'Plan settlement is required before execution.'));
  if (task.completion_note) body.append(node('p', '', task.completion_note));
  if (task.remaining_manual_checks) body.append(node('p', 'task-flags', task.remaining_manual_checks));
  const links = node('div', 'task-detail-links');
  links.append(sourceLink('Open source plan ↗', task.source_plan));
  task.completion_evidence.forEach((url, index) => links.append(link('Evidence ' + (index + 1) + ' ↗', url)));
  body.append(links);
  if (!task.completion_evidence.length) body.append(node('p', 'table-note', 'No completion evidence recorded for this task.'));
  return body;
}

function taskRows(task) {
  const row = node('tr', 'task-row ' + task.lane);
  row.dataset.taskId = task.id;
  row.id = 'task-' + task.id;
  const title = node('th', 'task-primary'); title.scope = 'row';
  const name = node('span', 'task-title'); name.append(node('span', 'task-id', task.id), document.createTextNode(task.title || task.deliverable));
  title.append(name, node('span', 'task-lane', LANE_NAMES[task.lane]));
  const status = node('td'); status.append(node('span', 'task-status ' + task.status, STATUS_NAMES[task.status]));
  const owner = node('td'); owner.append(node('p', 'task-owner', task.owner_role), node('p', 'task-perspective', task.perspective || 'Shared work'));
  const priority = node('td', 'task-priority', task.priority);
  const control = node('td');
  const button = node('button', 'task-toggle', 'Details +'); button.type = 'button';
  const detailRow = node('tr', 'task-detail-row'); detailRow.hidden = true; detailRow.id = 'details-' + task.id;
  const detailCell = node('td'); detailCell.colSpan = 5; detailCell.append(taskDetails(task)); detailRow.append(detailCell);
  button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', detailRow.id); button.setAttribute('aria-label', `Details for ${task.id}: ${task.title || task.deliverable}`);
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open)); button.textContent = open ? 'Details −' : 'Details +'; detailRow.hidden = !open;
  });
  control.append(button); row.append(title, status, owner, priority, control);
  return [row, detailRow];
}

function filteredTasks() {
  const query = el('task-search').value.trim().toLocaleLowerCase();
  const lane = el('lane-filter').value;
  const status = el('status-filter').value;
  const perspective = el('perspective-filter').value;
  return snapshot.tasks.filter(task => {
    const searchable = [task.id, task.title || '', task.deliverable, task.acceptance_criteria, task.owner_role, task.assigned_person_or_agent || '', task.assigned_agents || [], task.focus || '', task.remaining_manual_checks || '', task.priority, task.perspective || '', LANE_NAMES[task.lane], STATUS_NAMES[task.status], ...task.depends_on].join(' ').toLocaleLowerCase();
    return (lane === 'all' || task.lane === lane) && (status === 'all' || task.status === status) && (perspective === 'all' || task.perspective === perspective) && (!query || searchable.includes(query));
  });
}
function renderTasks({ resetPage = false } = {}) {
  if (!snapshot) return;
  if (resetPage) currentPage = 1;
  const tasks = filteredTasks();
  pageCount = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  currentPage = Math.max(1, Math.min(currentPage, pageCount));
  const start = (currentPage - 1) * PAGE_SIZE;
  const page = tasks.slice(start, start + PAGE_SIZE);
  el('task-grid').replaceChildren(...page.flatMap(taskRows));
  el('result-count').textContent = tasks.length ? `${start + 1}–${start + page.length} of ${tasks.length} matching tasks · ${snapshot.tasks.length} total` : `0 matching tasks · ${snapshot.tasks.length} total`;
  el('empty-state').hidden = tasks.length > 0;
  document.querySelector('.task-table').hidden = tasks.length === 0;
  el('pagination').hidden = tasks.length === 0;
  el('page-status').textContent = `Page ${currentPage} of ${pageCount}`;
  el('page-previous').disabled = currentPage === 1;
  el('page-next').disabled = currentPage === pageCount;
  el('clear-filters').hidden = !el('task-search').value && ['lane-filter', 'status-filter', 'perspective-filter'].every(id => el(id).value === 'all');
}
function clearFilters() {
  el('task-search').value = '';
  ['lane-filter', 'status-filter', 'perspective-filter'].forEach(id => { el(id).value = 'all'; });
  renderTasks({ resetPage: true }); el('task-search').focus();
}
function renderBoardSummary() {
  const done = snapshot.tasks.filter(task => task.status === 'done').length;
  const humans = snapshot.tasks.filter(task => task.status === 'blocked_human').length;
  const values = [[snapshot.tasks.length, 'tasks retained'], [done, 'tasks with evidence'], [humans, 'tasks need people']];
  el('board-summary').replaceChildren(...values.map(([value, title]) => {
    const item = node('div', 'summary-stat'); item.append(node('strong', '', value), node('span', '', title)); return item;
  }));
  el('status-definitions').replaceChildren(...Object.entries(snapshot.status_definitions || {}).flatMap(([status, description]) => [node('dt', '', STATUS_NAMES[status] || status), node('dd', '', description)]));
}
function renderPlanningMetadata() {
  el('project-count').textContent = manifest.sources.length;
  el('task-count').textContent = snapshot.tasks.length;
  const date = snapshot.plan_date_utc || snapshot.snapshot_date_utc;
  el('plan-date').dateTime = date;
  el('plan-date').textContent = shortDate(date, true);
  const perspectives = [...new Set(snapshot.tasks.map(task => task.perspective).filter(Boolean))].sort();
  const firstPerspective = node('option', '', 'All perspectives'); firstPerspective.value = 'all';
  el('perspective-filter').replaceChildren(firstPerspective, ...perspectives.map(value => { const option = node('option', '', value); option.value = value; return option; }));
  const firstStatus = node('option', '', 'All statuses'); firstStatus.value = 'all';
  const statuses = [...new Set(snapshot.tasks.map(task => task.status))];
  el('status-filter').replaceChildren(firstStatus, ...statuses.map(value => { const option = node('option', '', STATUS_NAMES[value]); option.value = value; return option; }));
}

function validateData(tasks, sources, visuals) {
  if (!Array.isArray(tasks.tasks) || !Array.isArray(sources.sources) || !sources.research || !validDate(tasks.plan_date_utc || tasks.snapshot_date_utc)) throw new Error('Missing snapshot data');
  const ids = new Set();
  tasks.tasks.forEach(task => {
    if (!task || typeof task.id !== 'string' || !task.id || ids.has(task.id) || !Object.hasOwn(LANE_NAMES, task.lane) || !Object.hasOwn(STATUS_NAMES, task.status) || !['README.md', 'memorable-next.md', 'vivid-next.md', 'bell-next.md', ...Object.values(TODO_PATHS)].includes(task.source_plan)) throw new Error('Invalid task metadata');
    ids.add(task.id);
    if (!['deliverable', 'owner_role', 'priority'].every(field => typeof task[field] === 'string') || !(typeof task.acceptance_criteria === 'string' || (Array.isArray(task.acceptance_criteria) && task.acceptance_criteria.every(item => typeof item === 'string'))) || !Array.isArray(task.depends_on) || !task.depends_on.every(id => typeof id === 'string') || !Array.isArray(task.completion_evidence) || !task.completion_evidence.every(githubUrl)) throw new Error('Invalid task content');
    if (task.title !== undefined && typeof task.title !== 'string') throw new Error('Invalid task title');
    if (task.perspective !== undefined && typeof task.perspective !== 'string') throw new Error('Invalid task perspective');
  });
  LANES.forEach(lane => {
    const source = sources.sources.find(item => item.lane === lane);
    if (!source || !/^[0-9a-f]{40}$/.test(source.reviewed_head) || !Number.isInteger(source.human_participant_rows) || source.human_participant_rows < 0) throw new Error('Invalid project metadata');
    ['pilot_packet', 'human_playtest_packet', 'latest_research_readme'].forEach(field => { if (!githubUrl(source[field])) throw new Error('Missing project evidence link'); });
    ['candidate_manifest'].forEach(field => { if (source[field] !== undefined && !githubUrl(source[field])) throw new Error('Invalid project evidence link'); });
  });
  const launch = sources.launch;
  if (!launch || !['target_date_utc', 'decision_date_utc', 'candidate_freeze_date_utc'].every(field => validDate(launch[field])) || launch.candidate_freeze_date_utc > launch.decision_date_utc || launch.decision_date_utc > launch.target_date_utc || launch.plan_document !== `docs/launch/${launch.target_date_utc}/README.md`) throw new Error('Invalid launch plan');
  if (!visuals || visuals.schema_version !== 1 || !Array.isArray(visuals.projects) || visuals.projects.length !== LANES.length) throw new Error('Invalid visual presentation');
  LANES.forEach(lane => {
    const visual = visuals.projects.find(item => item.lane === lane);
    if (!visual || !['promise', 'next_action'].every(key => typeof visual[key] === 'string' && visual[key].trim()) || !visual.image || !/^assets\/hub\/[a-z0-9-]+\.(png|webp|jpe?g)$/.test(visual.image.src) || !['alt', 'caption'].every(key => typeof visual.image[key] === 'string' && visual.image[key].trim()) || !githubUrl(visual.image.source_url) || !/^[0-9a-f]{40}$/.test(visual.image.source_commit) || !/^[0-9a-f]{64}$/.test(visual.image.sha256) || ![visual.image.width, visual.image.height].every(value => Number.isInteger(value) && value > 0)) throw new Error('Invalid image provenance');
    if (!visual.questions || !['why_play', 'differentiation', 'unique_experience'].every(key => typeof visual.questions[key] === 'string')) throw new Error('Missing product hypotheses');
  });
}
function validateReleaseRegistry(registry) {
  const games = ['small-hours', 'keepers-frame', 'thirteenth-bell'];
  if (!registry || registry.schema_version !== 1 || !Array.isArray(registry.releases)) throw new Error('Invalid release registry');
  const seen = new Set();
  registry.releases.forEach(release => {
    if (!games.includes(release.game) || !/^\d+\.\d+\.\d+$/.test(release.version)) throw new Error('Invalid release version');
    const stem = `releases/${release.game}/${release.version}/`;
    const tag = `${release.game}-v${release.version}`;
    if (release.path !== stem + 'build/index.html' || release.notes_path !== stem + 'notes.md' || release.tag !== tag || release.release_url !== REPOSITORY + 'releases/tag/' + tag || !/^[0-9a-f]{40}$/.test(release.source_master_commit) || typeof release.released_at !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(release.released_at) || Number.isNaN(Date.parse(release.released_at)) || seen.has(tag)) throw new Error('Invalid release record');
    seen.add(tag);
  });
}
async function loadDashboard() {
  const attempt = ++loadAttempt;
  el('load-error').hidden = true;
  ['task-search', 'lane-filter', 'status-filter', 'perspective-filter'].forEach(id => { el(id).disabled = true; });
  ['project-grid', 'task-grid'].forEach(id => el(id).setAttribute('aria-busy', 'true'));
  try {
    const responses = await Promise.all(['tasks', 'source-manifest', 'releases', 'hub-presentation'].map(name => fetch('./data/' + name + '.json')));
    if (responses.some(response => !response.ok)) throw new Error('Snapshot request failed');
    const [tasks, sources, releases, visuals] = await Promise.all(responses.map(response => response.json()));
    validateData(tasks, sources, visuals); validateReleaseRegistry(releases);
    if (attempt !== loadAttempt) return;
    snapshot = tasks; manifest = sources; releaseRegistry = releases; presentation = visuals;
    currentPage = 1;
    renderPlanningMetadata(); renderProjects(); renderReadiness(); renderTimeline(); renderEvidence(); renderReleases(); renderBoardSummary(); renderTasks();
    ['task-search', 'lane-filter', 'status-filter', 'perspective-filter'].forEach(id => { el(id).disabled = false; });
    setViewFromHash();
  } catch (error) {
    if (attempt !== loadAttempt) return;
    snapshot = null;
    el('load-error').hidden = false;
    el('project-grid').replaceChildren(node('p', 'loading-state', 'Project data unavailable. Open the launch plan above.'));
    el('task-grid').replaceChildren();
    el('readiness-rows').replaceChildren();
    el('result-count').textContent = 'Task data unavailable.';
    el('release-grid').replaceChildren(node('p', 'loading-state', 'Release status is unavailable.'));
    el('page-previous').disabled = true; el('page-next').disabled = true;
  } finally {
    if (attempt === loadAttempt) ['project-grid', 'task-grid'].forEach(id => el(id).setAttribute('aria-busy', 'false'));
  }
}

['task-search', 'lane-filter', 'status-filter', 'perspective-filter'].forEach(id => {
  el(id).addEventListener(id === 'task-search' ? 'input' : 'change', () => renderTasks({ resetPage: true }));
});
el('clear-filters').addEventListener('click', clearFilters);
el('empty-clear').addEventListener('click', clearFilters);
el('retry-load').addEventListener('click', loadDashboard);
for (const [id, delta] of [['page-previous', -1], ['page-next', 1]]) {
  el(id).addEventListener('click', () => {
    currentPage += delta; renderTasks();
    el('tasks-title').focus({ preventScroll: true });
    el('result-count').scrollIntoView({ block: 'start', behavior: 'instant' });
  });
}
window.addEventListener('hashchange', () => setViewFromHash({ focus: true }));
setViewFromHash();
loadDashboard();
