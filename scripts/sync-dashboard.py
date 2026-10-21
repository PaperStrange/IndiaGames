#!/usr/bin/env python3
"""Validate the three authored task lists and rebuild the static dashboard data."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANES = {
    'small-hours': ('memorable', 'SH-'),
    'keepers-frame': ('vivid', 'KF-'),
    'thirteenth-bell': ('bell', 'TB-'),
}
STATUSES = {'proposed', 'conditional', 'blocked_human', 'active', 'done', 'not_selected'}
REQUIRED = {'id', 'lane', 'perspective', 'priority', 'status', 'owner_role', 'title',
            'deliverable', 'acceptance_criteria', 'depends_on', 'source_plan',
            'human_participants_required', 'completion_evidence'}

def build():
    tasks = []
    for folder, (lane, prefix) in LANES.items():
        path = ROOT / 'docs' / 'games' / folder / 'tasks.json'
        records = json.loads(path.read_text())
        if not isinstance(records, list) or not records:
            raise ValueError(f'{path}: expected nonempty array')
        for task in records:
            missing = REQUIRED - task.keys()
            if missing:
                raise ValueError(f'{path}: missing {sorted(missing)}')
            if task['lane'] != lane or not task['id'].startswith(prefix):
                raise ValueError(f'{path}: wrong lane or ID: {task["id"]}')
            if task['status'] not in STATUSES or task['priority'] not in {'P0', 'P1', 'P2'}:
                raise ValueError(f'{task["id"]}: invalid status or priority')
            if not isinstance(task['acceptance_criteria'], list) or not task['acceptance_criteria']:
                raise ValueError(f'{task["id"]}: acceptance criteria must be a nonempty array')
            if not isinstance(task['depends_on'], list):
                raise ValueError(f'{task["id"]}: dependencies must be an array')
            if task['status'] == 'done' and not task['completion_evidence']:
                raise ValueError(f'{task["id"]}: completion needs evidence')
            plan = ROOT / task['source_plan']
            if not plan.is_file() or ROOT not in plan.resolve().parents:
                raise ValueError(f'{task["id"]}: missing or external source plan')
            tasks.append(task)
    by_id = {task['id']: task for task in tasks}
    if len(by_id) != len(tasks):
        raise ValueError('Duplicate task ID')
    visiting, done = set(), set()
    def visit(task_id):
        if task_id not in by_id:
            raise ValueError(f'Unknown dependency: {task_id}')
        if task_id in visiting:
            raise ValueError(f'Cyclic task dependency: {task_id}')
        if task_id in done:
            return
        visiting.add(task_id)
        for dependency in by_id[task_id]['depends_on']:
            visit(dependency)
        visiting.remove(task_id)
        done.add(task_id)
    for task_id in by_id:
        visit(task_id)
    result = {
        'schema_version': 2,
        'type': 'versioned planning snapshot; role owners are proposed, not external assignments',
        'snapshot_date_utc': '2026-10-21',
        'plan_date_utc': '2026-10-21',
        'demo_qa_date_utc': '2026-10-20',
        'incoming_evidence_reviewed': True,
        'implementation_started': False,
        'source_manifest': 'source-manifest.json',
        'status_definitions': {
            'proposed': 'Planned; not started.',
            'conditional': 'Select only if preceding observations support the change.',
            'blocked_human': 'Requires willing real participants; no agent roleplay substitute.',
            'active': 'Assigned and in progress; not completed.',
            'done': 'Acceptance criteria met with linked evidence.',
            'not_selected': 'Explicitly closed by a recorded design decision.'
        },
        'gates': [
            {'id': 'plan-settlement', 'status': 'open', 'applies_to': ['memorable', 'vivid', 'bell'],
             'requirement': 'Settle each bounded game experiment before implementation or new competitor play.'},
            {'id': 'competitor-coverage', 'status': 'open', 'applies_to': ['memorable', 'vivid', 'bell'],
             'requirement': 'Retain six distinct titles and four broad families before final comparative synthesis; label partials and explicitly decide substitutions.'},
            {'id': 'human-validation', 'status': 'not_run', 'applies_to': ['memorable', 'vivid', 'bell'],
             'requirement': 'Observe actual people using the per-game protocol; automated checks and emotional agent prose are not human evidence.'}
        ],
        'tasks': tasks,
    }
    output = ROOT / 'data' / 'tasks.json'
    output.parent.mkdir(exist_ok=True)
    output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + '\n')
    print(f'Validated {len(tasks)} tasks across {len(LANES)} games; dependencies are acyclic. Wrote {output.relative_to(ROOT)}.')

if __name__ == '__main__':
    build()
