/* A static publication of the reviewed snapshot. Task data is never mutated. */
'use strict';

const REVIEW_ROOT = 'https://github.com/PaperStrange/IndiaGames/blob/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20/';
const REPOSITORY_ROOT = 'https://github.com/PaperStrange/IndiaGames/tree/';
const MAIN_ROOT = 'https://github.com/PaperStrange/IndiaGames/blob/main/';
const LANE_NAMES = { memorable: 'Small Hours', vivid: 'Vivid', bell: 'The Thirteenth Bell', shared: 'Shared team' };
const STATUS_NAMES = { active: 'In progress', done: 'Done', not_selected: 'Not selected', proposed: 'Proposed', conditional: 'Conditional', waiting_for_records: 'Awaiting records', blocked_human: 'Needs human validation' };
const TODO_PATHS = { memorable: 'docs/games/small-hours/TODO.md', vivid: 'docs/games/keepers-frame/TODO.md', bell: 'docs/games/thirteenth-bell/TODO.md' };
const PROJECTS = [
  { lane: 'memorable', number: '01', label: 'Memorable Moments', tagline: 'Make a small shared memory.', decision: 'Does the existing shared action feel authored by both people? Observe real pairs before selecting a change.', state: 'Pilot preparation · human validation pending', plan: 'memorable-next.md' },
  { lane: 'vivid', number: '02', label: 'Vivid', tagline: 'Two small worlds. Different ways to care.', decision: 'Do Iona’s remembered placement and Mara’s object-led reveal make their actions meaningful to real players?', state: 'Candidate 0.1.2 · human validation pending', plan: 'vivid-next.md' },
  { lane: 'bell', number: '03', label: 'The Thirteenth Bell', tagline: 'Learn the town. Change an outcome.', decision: 'Can witnessing a town event help the player plan an intervention that changes an outcome?', state: 'Pilot preparation · human validation pending', plan: 'bell-next.md' }
];
const GATE_COPY = {
  'plan-settlement': { title: 'Track the settled scope', note: 'Three playtest packets; Bell’s Mina-route scene is the selected gameplay change.' },
  'incoming-records': { title: 'Reconcile new records', note: 'Keep new records, substitutions and unfinished journeys traceable.' },
  'competitor-coverage': { title: 'Close coverage gaps', note: 'Six titles and four broad families per demo.' },
  'human-validation': { title: 'Observe real people', note: 'Use diagnostic gates on actual participants.' }
};
const el = (id) => document.getElementById(id);
let snapshot = null;
let manifest = null;
let releaseRegistry = null;
let loadAttempt = 0;

function node(tag, className, text) {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (text !== undefined) result.textContent = text;
  return result;
}

function sourceLink(text, file, className = 'arrow-link') {
  const link = node('a', className, text);
  link.href = file.startsWith('docs/games/') ? MAIN_ROOT + file : REVIEW_ROOT + file;
  const arrow = node('span', '', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  link.append(arrow);
  return link;
}

function projectArt(lane) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 140 100');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const shapes = lane === 'memorable' ? [
    ['circle', { cx: '52', cy: '53', r: '29', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6' }],
    ['circle', { cx: '87', cy: '53', r: '29', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6' }],
    ['path', { d: 'M70 35v36M63 42h14M63 64h14', stroke: 'currentColor', fill: 'none', 'stroke-width': '1.2' }],
    ['path', { d: 'M17 15h11m-5.5-5.5v11M119 81h9m-4.5-4.5v9', stroke: 'currentColor', 'stroke-width': '1.2' }]
  ] : lane === 'vivid' ? [
    ['path', { d: 'M39 12h62v78H39zM45 18h50v66H45z', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }],
    ['path', { d: 'M51 73V45a19 19 0 0 1 38 0v28z', fill: 'currentColor', opacity: '.12' }],
    ['path', { d: 'M52 73V45a18 18 0 0 1 36 0v28M52 73h36M58 63l12-9 12 9v10H58zM58 63l12 9 12-9', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.4' }],
    ['path', { d: 'M112 22h14m-7-7v14M19 74h9m-4.5-4.5v9', stroke: 'currentColor', 'stroke-width': '1.2' }]
  ] : [
    ['path', { d: 'M44 65c6-7 8-12 8-25a18 18 0 0 1 36 0c0 13 2 18 8 25H44zM69 16v6M60 70a10 10 0 0 0 20 0', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6' }],
    ['path', { d: 'M41 42a29 29 0 0 1 5-16M99 42a29 29 0 0 0-5-16M25 87h90M35 81h70', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.2' }],
    ['circle', { cx: '70', cy: '44', r: '4', fill: 'currentColor', opacity: '.4' }],
    ['path', { d: 'M113 56h10m-5-5v10M18 23h8m-4-4v8', stroke: 'currentColor', 'stroke-width': '1.2' }]
  ];
  shapes.forEach(([tag, attributes]) => {
    const shape = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([name, value]) => shape.setAttribute(name, value));
    svg.append(shape);
  });
  return svg;
}

function renderProjects() {
  const cards = PROJECTS.map((project) => {
    const reviewed = manifest.sources.find((source) => source.lane === project.lane);
    const card = node('article', `project-card ${project.lane}`);
    const art = node('div', 'project-art');
    art.append(node('p', 'eyebrow', project.label), projectArt(project.lane));
    const index = node('span', 'art-index', project.number);
    index.setAttribute('aria-hidden', 'true');
    art.append(index);
    const body = node('div', 'project-body');
    body.append(node('h3', '', LANE_NAMES[project.lane]), node('p', 'project-tagline', project.tagline));
    const decision = node('div', 'project-decision');
    decision.append(node('p', 'eyebrow', 'Next decision'), node('p', '', project.decision));
    body.append(decision, node('p', 'project-state', reviewed.milestone_status_label || project.state));
    if (reviewed.milestone_summary) body.append(node('p', 'project-source', reviewed.milestone_summary));
    if (reviewed.qa_scope) body.append(node('p', 'project-source', reviewed.qa_scope));
    if (reviewed.pilot_packet) {
      const packet = node('a', 'reviewed-plan-link', 'Playtest packet & launch instructions');
      packet.href = reviewed.pilot_packet;
      body.append(packet);
    }
    if (reviewed.human_playtest_packet) {
      const humanPacket = node('a', 'reviewed-plan-link', 'Human test list, recording forms & next iteration');
      humanPacket.href = reviewed.human_playtest_packet;
      body.append(humanPacket);
    }
    if (reviewed.latest_research_readme) {
      const research = node('a', 'reviewed-plan-link', 'Latest competitor records · limits included');
      research.href = reviewed.latest_research_readme;
      body.append(research);
    }
    if (reviewed.human_staffing) body.append(node('p', 'project-source', reviewed.human_staffing));
    if (reviewed.stories?.length) {
      body.append(node('p', 'project-source', reviewed.stories.map(story => story.title).join(' · ')));
    }
    if (reviewed.implementation_readme && reviewed.current_decision_document) {
      const implementation = node('a', 'reviewed-plan-link', 'Current implementation & run instructions');
      implementation.href = reviewed.implementation_readme;
      body.append(implementation);
      const decisionLink = node('a', 'reviewed-plan-link', 'Approved direction & product hypotheses');
      decisionLink.href = reviewed.current_decision_document;
      body.append(decisionLink);
      if (reviewed.candidate_manifest) {
        const candidate = node('a', 'reviewed-plan-link', `Staged ${reviewed.candidate_version} packet · human review pending`);
        candidate.href = reviewed.candidate_manifest.replace('/blob/', '/tree/').replace('/candidate.json', '');
        body.append(candidate);
      }
      if (reviewed.research_readme) {
        const research = node('a', 'reviewed-plan-link', 'Competitor journeys & design findings');
        research.href = reviewed.research_readme;
        body.append(research);
      }
      if (reviewed.release_policy_review?.url) {
        const policy = node('a', 'reviewed-plan-link', 'Separate release-policy review');
        policy.href = reviewed.release_policy_review.url;
        body.append(policy);
      }
    }
    const links = node('div', 'project-links');
    const planLink = sourceLink('Detailed todo', TODO_PATHS[project.lane]);
    planLink.setAttribute('aria-label', `Read ${LANE_NAMES[project.lane]} detailed todo`);
    const taskLink = node('button', 'text-button', `${snapshot.tasks.filter((task) => task.lane === project.lane).length} tasks →`);
    taskLink.type = 'button';
    taskLink.setAttribute('aria-label', `Show ${LANE_NAMES[project.lane]} tasks`);
    taskLink.addEventListener('click', () => {
      el('lane-filter').value = project.lane;
      el('status-filter').value = 'all';
      el('task-search').value = '';
      el('perspective-filter').value = 'all';
      renderTasks();
      el('tasks-title').focus({ preventScroll: true });
      el('tasks').scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    links.append(planLink, taskLink);
    body.append(links);
    const planSource = sourceLink('20 Oct reviewed plan', project.plan, 'reviewed-plan-link');
    planSource.setAttribute('aria-label', `Read ${LANE_NAMES[project.lane]} reviewed plan from 20 October`);
    body.append(planSource);
    const branch = node('p', 'project-source', 'Game branch ');
    const branchAnchor = node('a', '', reviewed.branch);
    branchAnchor.href = REPOSITORY_ROOT + encodeURIComponent(reviewed.branch);
    branch.append(branchAnchor);
    body.append(branch);
    const source = node('p', 'project-source source-sha', 'Reviewed source ');
    const sourceAnchor = node('a', '', reviewed.reviewed_head.slice(0, 8));
    sourceAnchor.href = REPOSITORY_ROOT + reviewed.reviewed_head;
    sourceAnchor.setAttribute('aria-label', `${LANE_NAMES[project.lane]} reviewed source ${reviewed.reviewed_head.slice(0, 8)}`);
    source.append(sourceAnchor);
    body.append(source);
    card.append(art, body);
    return card;
  });
  el('project-grid').replaceChildren(...cards);
}

function taskCard(task) {
  const card = node('article', `task-card ${task.lane}`);
  const top = node('div', 'task-top');
  const status = node('span', 'task-status');
  const dot = node('span', `status-dot ${task.status}`);
  dot.setAttribute('aria-hidden', 'true');
  status.append(dot, document.createTextNode(STATUS_NAMES[task.status]));
  top.append(node('span', 'task-id', task.id), status);
  const title = node('h3', '', task.title || task.deliverable);
  title.id = `task-${task.id}`;
  card.setAttribute('aria-labelledby', title.id);
  card.append(top, node('p', 'task-lane', LANE_NAMES[task.lane]), title);
  if (task.perspective) card.append(node('p', 'task-perspective', task.perspective));
  const bottom = node('p', 'task-bottom');
  const priority = node('span', 'priority', task.priority);
  priority.setAttribute('aria-label', `Priority ${task.priority}`);
  bottom.append(priority);
  if (task.effort_person_hours) bottom.append(node('span', '', task.effort_person_hours));
  card.append(bottom);
  const details = node('details', 'task-details');
  const summary = node('summary', '', 'Acceptance, owner & dependencies');
  summary.setAttribute('aria-label', `Acceptance, owner and dependencies for ${task.id}`);
  const body = node('div', 'detail-body');
  const list = node('dl');
  if (task.title && task.title !== task.deliverable) body.append(node('p', 'task-deliverable', task.deliverable));
  list.append(node('dt', '', 'Acceptance criteria'));
  const acceptance = node('dd');
  if (Array.isArray(task.acceptance_criteria)) {
    const criteria = node('ul', 'criteria-list');
    task.acceptance_criteria.forEach((criterion) => criteria.append(node('li', '', criterion)));
    acceptance.append(criteria);
  } else acceptance.textContent = task.acceptance_criteria;
  list.append(acceptance);
  const fields = [
    ['Owner role', `${task.owner_role}. ${task.assigned_person_or_agent ? `Assigned: ${task.assigned_person_or_agent}.` : 'No person or agent assigned.'}`],
    ['Dependencies', task.depends_on.length ? task.depends_on.join(' · ') : 'No task dependencies listed.']
  ];
  fields.forEach(([label, value]) => list.append(node('dt', '', label), node('dd', '', value)));
  body.append(list);
  if (task.dependency_rule && task.depends_on.length) body.append(node('p', 'detail-note', `Dependency rule: ${task.dependency_rule}.`));
  if (task.dependency_note) body.append(node('p', 'detail-note', task.dependency_note));
  const flags = node('div', 'task-flags');
  if (task.plan_settlement_required_before_execution) flags.append(node('span', '', 'Plan settlement required'));
  if (task.incoming_records_gate) flags.append(node('span', '', 'Incoming records gate'));
  if (task.human_participants_required) flags.append(node('span', '', 'Human participants required'));
  if (flags.childNodes.length) body.append(flags);
  if (task.completion_note) body.append(node('p', 'detail-note', task.completion_note));
  if (task.completion_evidence.length) {
    const evidence = node('ul', 'criteria-list');
    task.completion_evidence.forEach((url, index) => {
      const item = node('li');
      const link = node('a', '', `Evidence ${index + 1}: ${url.split('/').pop()}`);
      link.href = url;
      item.append(link);
      evidence.append(item);
    });
    body.append(evidence);
  } else body.append(node('p', 'detail-note', 'No completion evidence recorded in this snapshot.'));
  body.append(sourceLink('Open source plan', task.source_plan));
  details.append(summary, body);
  card.append(details);
  return card;
}

function renderTasks() {
  if (!snapshot) return;
  const query = el('task-search').value.trim().toLocaleLowerCase();
  const lane = el('lane-filter').value;
  const status = el('status-filter').value;
  const perspective = el('perspective-filter').value;
  const tasks = snapshot.tasks.filter((task) => {
    const searchable = [task.id, task.title || '', task.deliverable, task.acceptance_criteria, task.owner_role, task.priority, task.perspective || '', LANE_NAMES[task.lane], STATUS_NAMES[task.status], ...task.depends_on].join(' ').toLocaleLowerCase();
    return (lane === 'all' || task.lane === lane) && (status === 'all' || task.status === status) && (perspective === 'all' || task.perspective === perspective) && (!query || searchable.includes(query));
  });
  el('task-grid').replaceChildren(...tasks.map(taskCard));
  const planDate = new Date(`${snapshot.plan_date_utc || snapshot.snapshot_date_utc}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  el('result-count').textContent = `Showing ${tasks.length} of ${snapshot.tasks.length} tasks · ${planDate} plan`;
  el('clear-filters').hidden = !query && lane === 'all' && status === 'all' && perspective === 'all';
  el('empty-state').hidden = tasks.length > 0;
}


function renderReleases() {
  const names = { 'small-hours': 'Small Hours', 'keepers-frame': 'Vivid', 'thirteenth-bell': 'The Thirteenth Bell' };
  if (!releaseRegistry.releases.length) {
    const empty = node('article', 'release-empty');
    empty.append(node('p', 'eyebrow', 'No official releases yet'), node('h3', '', 'The demos are still experiments.'), node('p', '', 'No candidate has a recorded, approved human playtest report in this registry. Explore the development branches above; official play links, versions and release notes will appear here after promotion.'));
    el('release-grid').replaceChildren(empty);
    return;
  }
  const cards = [...releaseRegistry.releases].reverse().map((release) => {
    const card = node('article', 'release-card');
    card.append(node('p', 'eyebrow', 'Official release'), node('h3', '', names[release.game]), node('p', 'release-version', `v${release.version}`));
    const links = node('div', 'project-links');
    const play = node('a', 'arrow-link', 'Play this version ↗'); play.href = './' + release.path;
    const github = node('a', 'arrow-link', 'Version on GitHub ↗'); github.href = release.release_url;
    const notes = node('a', 'arrow-link', 'Release notes ↗'); notes.href = MAIN_ROOT + release.notes_path;
    links.append(play, github, notes); card.append(links);
    card.append(node('p', 'project-source', `Released ${release.released_at.slice(0, 10)} · Candidate ${release.source_master_commit.slice(0, 8)}`));
    return card;
  });
  el('release-grid').replaceChildren(...cards);
}

function validateReleaseRegistry(registry) {
  const games = ['small-hours', 'keepers-frame', 'thirteenth-bell'];
  if (!registry || registry.schema_version !== 1 || !Array.isArray(registry.releases)) throw new Error('Invalid release registry');
  const seen = new Set();
  registry.releases.forEach((release) => {
    if (!games.includes(release.game) || !/^\d+\.\d+\.\d+$/.test(release.version)) throw new Error('Invalid release version');
    const stem = `releases/${release.game}/${release.version}/`;
    const tag = `${release.game}-v${release.version}`;
    if (release.path !== stem + 'build/index.html' || release.notes_path !== stem + 'notes.md' || release.tag !== tag || release.release_url !== 'https://github.com/PaperStrange/IndiaGames/releases/tag/' + tag || !/^[0-9a-f]{40}$/.test(release.source_master_commit) || typeof release.released_at !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(release.released_at) || Number.isNaN(Date.parse(release.released_at)) || seen.has(tag)) throw new Error('Invalid release record');
    seen.add(tag);
  });
}

function renderGates() {
  const gates = snapshot.gates || [];
  el('gate-list').hidden = !gates.length;
  document.querySelector('.gate-heading').hidden = !gates.length;
  el('gate-list').replaceChildren(...gates.map((gate, index) => {
    const copy = GATE_COPY[gate.id];
    const card = node('article', 'gate');
    card.append(node('div', 'gate-number', `0${index + 1}`), node('h3', '', copy.title), node('p', '', copy.note));
    const details = node('details');
    const summary = node('summary', '', 'Read requirement');
    summary.setAttribute('aria-label', `Read requirement: ${copy.title}`);
    details.append(summary, node('p', '', gate.requirement));
    card.append(details);
    return card;
  }));
}

function renderPlanningMetadata() {
  const dateString = snapshot.plan_date_utc || snapshot.snapshot_date_utc;
  const date = new Date(`${dateString}T12:00:00Z`);
  const dateElement = el('plan-date');
  dateElement.dateTime = dateString;
  dateElement.replaceChildren(document.createTextNode(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })), node('br'), document.createTextNode(String(date.getUTCFullYear())));
  const perspectives = [...new Set(snapshot.tasks.map((task) => task.perspective).filter(Boolean))].sort();
  const options = [node('option', '', 'All perspectives')];
  options[0].value = 'all';
  perspectives.forEach((perspective) => {
    const option = node('option', '', perspective);
    option.value = perspective;
    options.push(option);
  });
  el('perspective-filter').replaceChildren(...options);
  el('perspective-field').hidden = perspectives.length === 0;
  document.querySelector('.board-toolbar').classList.toggle('has-perspectives', perspectives.length > 0);
  const statuses = new Set(snapshot.tasks.map((task) => task.status));
  const allStatuses = node('option', '', 'All statuses');
  allStatuses.value = 'all';
  el('status-filter').replaceChildren(allStatuses, ...[...statuses].map((status) => {
    const option = node('option', '', STATUS_NAMES[status]);
    option.value = status;
    return option;
  }));
  if (manifest.launch) {
    const target = new Date(`${manifest.launch.target_date_utc}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    const decision = new Date(`${manifest.launch.decision_date_utc}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
    const freeze = new Date(`${manifest.launch.candidate_freeze_date_utc}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
    el('snapshot-title').textContent = 'Launch preparation';
    el('snapshot-note').textContent = `Target ${target}. Go/no-go ${decision}; human approval remains pending for each game.`;
    el('incoming-label').textContent = `Launch target · ${target}`;
    const plan = node('a', '', 'Read the launch plan');
    plan.href = `https://github.com/PaperStrange/IndiaGames/blob/main/${manifest.launch.plan_document}`;
    el('incoming-copy').replaceChildren(document.createTextNode(`Run the human pilots, select evidence-backed corrections, freeze candidates on ${freeze}, then decide which games can ship on ${decision}. `), plan);
    el('incoming-status').textContent = 'Human gates pending';
  } else if (manifest.milestone) {
    el('snapshot-title').textContent = 'Playtest preparation';
    el('snapshot-note').textContent = manifest.milestone.summary;
    el('incoming-label').textContent = 'Settled milestone · 27 October';
    el('incoming-copy').textContent = 'Each game has its own packet and evidence trail. Small Hours keeps its baseline; Vivid keeps candidate 0.1.2; Bell adds the selected Mina-route scene. See each card for verification and staging status.';
    el('incoming-status').textContent = 'Human validation pending';
  } else if (snapshot.incoming_evidence_reviewed === true) {
    el('incoming-label').textContent = 'Evidence reviewed';
    el('incoming-copy').textContent = 'Human validation remains open; per-game source records retain their own QA dates.';
    el('incoming-status').textContent = 'Human validation open';
  }
}

function validateData(tasks, sources) {
  if (!Array.isArray(tasks.tasks) || (tasks.gates && !Array.isArray(tasks.gates)) || !Array.isArray(sources.sources) || !sources.research) throw new Error('Missing snapshot data');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tasks.plan_date_utc || tasks.snapshot_date_utc)) throw new Error('Missing planning date');
  const ids = new Set();
  tasks.tasks.forEach((task) => {
    if (!task || typeof task.id !== 'string' || !task.id || ids.has(task.id) || !Object.hasOwn(LANE_NAMES, task.lane) || !Object.hasOwn(STATUS_NAMES, task.status) || !['README.md', 'memorable-next.md', 'vivid-next.md', 'bell-next.md', ...Object.values(TODO_PATHS)].includes(task.source_plan)) throw new Error('Invalid task metadata');
    ids.add(task.id);
    if (!['deliverable', 'owner_role', 'priority'].every((field) => typeof task[field] === 'string') || !(typeof task.acceptance_criteria === 'string' || (Array.isArray(task.acceptance_criteria) && task.acceptance_criteria.every((criterion) => typeof criterion === 'string'))) || !Array.isArray(task.depends_on) || !task.depends_on.every((id) => typeof id === 'string') || !Array.isArray(task.completion_evidence)) throw new Error('Invalid task content');
    if (task.title !== undefined && typeof task.title !== 'string') throw new Error('Invalid task title');
    if (task.perspective !== undefined && typeof task.perspective !== 'string') throw new Error('Invalid task perspective');
    if (!task.completion_evidence.every((url) => typeof url === 'string' && url.startsWith('https://github.com/PaperStrange/IndiaGames/'))) throw new Error('Invalid evidence link');
    if (task.completion_note !== undefined && typeof task.completion_note !== 'string') throw new Error('Invalid task completion note');
  });
  PROJECTS.forEach((project) => {
    const source = sources.sources.find((item) => item.lane === project.lane);
    if (!source || !/^[0-9a-f]{40}$/.test(source.reviewed_head)) throw new Error('Invalid reviewed source');
    ['pilot_packet', 'human_playtest_packet', 'latest_research_readme', 'candidate_manifest'].forEach(field => {
      if (source[field] !== undefined && (typeof source[field] !== 'string' || !source[field].startsWith('https://github.com/PaperStrange/IndiaGames/'))) throw new Error('Invalid project evidence link');
    });
    if (source.implementation_started && (![source.implementation_readme, source.current_decision_document].every((url) => typeof url === 'string' && url.startsWith('https://github.com/PaperStrange/IndiaGames/')))) throw new Error('Invalid implementation metadata');
  });
  if (sources.launch) {
    const launch = sources.launch;
    const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
    if (!['target_date_utc', 'decision_date_utc', 'candidate_freeze_date_utc'].every(field => validDate(launch[field])) || launch.candidate_freeze_date_utc > launch.decision_date_utc || launch.decision_date_utc > launch.target_date_utc || launch.status !== 'planned_human_gates_pending' || launch.plan_document !== `docs/launch/${launch.target_date_utc}/README.md`) throw new Error('Invalid launch plan metadata');
    const packetPattern = new RegExp(`^https://github\\.com/PaperStrange/IndiaGames/blob/[0-9a-f]{40}/docs/gamejam/launch-${launch.target_date_utc}/README\\.md$`);
    if (!sources.sources.every(source => packetPattern.test(source.human_playtest_packet || ''))) throw new Error('Missing pinned human playtest packet');
  }
  if (tasks.gates && !tasks.gates.every((gate) => Object.hasOwn(GATE_COPY, gate.id) && typeof gate.requirement === 'string')) throw new Error('Invalid gate content');
  ['core_gameplay_evidence_assignments', 'required_assignments', 'snapshot_unique_sha256_count', 'human_participant_rows'].forEach((key) => {
    if (!Number.isInteger(sources.research[key]) || sources.research[key] < 0) throw new Error('Invalid evidence counts');
  });
}

async function loadDashboard() {
  const attempt = ++loadAttempt;
  el('load-error').hidden = true;
  ['task-search', 'lane-filter', 'status-filter', 'perspective-filter'].forEach((id) => { el(id).disabled = true; });
  ['project-grid', 'task-grid', 'gate-list'].forEach((id) => el(id).setAttribute('aria-busy', 'true'));
  el('result-count').textContent = 'Loading task cards…';
  try {
    const [tasksResponse, sourcesResponse, releasesResponse] = await Promise.all([fetch('./data/tasks.json'), fetch('./data/source-manifest.json'), fetch('./data/releases.json')]);
    if (!tasksResponse.ok || !sourcesResponse.ok || !releasesResponse.ok) throw new Error('Snapshot request failed');
    const [tasks, sources, releases] = await Promise.all([tasksResponse.json(), sourcesResponse.json(), releasesResponse.json()]);
    validateData(tasks, sources);
    validateReleaseRegistry(releases);
    if (attempt !== loadAttempt) return;
    snapshot = tasks;
    manifest = sources;
    releaseRegistry = releases;
    el('project-count').textContent = manifest.sources.length;
    el('task-count').textContent = snapshot.tasks.length;
    el('gameplay-evidence').textContent = manifest.research.core_gameplay_evidence_assignments;
    el('required-assignments').textContent = manifest.research.required_assignments;
    el('snapshot-files').textContent = manifest.research.snapshot_unique_sha256_count;
    el('human-rows').textContent = manifest.research.human_participant_rows;
    renderPlanningMetadata();
    renderProjects();
    renderReleases();
    renderTasks();
    renderGates();
    ['task-search', 'lane-filter', 'status-filter', 'perspective-filter'].forEach((id) => { el(id).disabled = false; });
  } catch (error) {
    if (attempt !== loadAttempt) return;
    el('load-error').hidden = false;
    el('project-grid').replaceChildren(node('p', 'loading-state', 'Project data unavailable. Read the pinned review above.'));
    el('result-count').textContent = 'Task data unavailable.';
    el('release-grid').replaceChildren(node('p', 'loading-state', 'Release registry unavailable. No release status can be verified.'));
  } finally {
    if (attempt === loadAttempt) ['project-grid', 'task-grid', 'gate-list'].forEach((id) => el(id).setAttribute('aria-busy', 'false'));
  }
}

function clearFilters() {
  el('task-search').value = '';
  el('lane-filter').value = 'all';
  el('status-filter').value = 'all';
  el('perspective-filter').value = 'all';
  renderTasks();
  el('task-search').focus();
}

el('task-search').addEventListener('input', renderTasks);
el('lane-filter').addEventListener('change', renderTasks);
el('status-filter').addEventListener('change', renderTasks);
el('perspective-filter').addEventListener('change', renderTasks);
el('clear-filters').addEventListener('click', clearFilters);
el('empty-clear').addEventListener('click', clearFilters);
el('retry-load').addEventListener('click', loadDashboard);
loadDashboard();
