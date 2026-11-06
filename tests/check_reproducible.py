#!/usr/bin/env python3
"""Compare complete portable-build inventories without touching local dist/."""
import argparse
import hashlib
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_NAME = 'thirteenth-bell-playable-demo.html'


def inventory(directory):
    """Require exactly the portable HTML and locale catalog, rejecting extras/symlinks."""
    entries = sorted(directory.rglob('*'))
    if any(path.is_symlink() for path in entries):
        raise ValueError('Build inventory contains a symbolic link')
    files = [path for path in entries if path.is_file()]
    names = [path.relative_to(directory).as_posix() for path in files]
    expected = ['locale-catalog.json', OUTPUT_NAME]
    if names != expected or len(entries) != 2:
        raise ValueError(f'Expected only {expected}; found {names}')
    catalog = json.loads((directory / 'locale-catalog.json').read_text())
    required = {'schema_version': 1, 'game': 'thirteenth-bell', 'default_locale': 'en',
                'locales': ['en', 'ja', 'zh-Hans'],
                'units': [{'id': 'thirteenth-bell', 'locales': ['en', 'ja', 'zh-Hans']}]}
    if catalog != required:
        raise ValueError('Locale catalog does not match the reviewed build scope')
    return [{'path': path.name, 'bytes': len(path.read_bytes()),
             'sha256': hashlib.sha256(path.read_bytes()).hexdigest()} for path in files]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-sha', help='Checkout commit supplied by the CI runner')
    parser.add_argument('--report', type=Path, help='Write a new JSON report; existing files are preserved')
    args = parser.parse_args()
    if args.source_sha and not re.fullmatch(r'[0-9a-f]{40}', args.source_sha):
        parser.error('--source-sha must be a full lowercase commit SHA')
    if args.report and args.report.exists():
        parser.error('--report already exists; choose a fresh path')

    with tempfile.TemporaryDirectory(prefix='bell-inventory-') as temporary:
        builds = []
        for number in (1, 2):
            directory = Path(temporary) / f'build-{number}'
            output = directory / OUTPUT_NAME
            result = subprocess.run(['node', str(ROOT / 'build.mjs'), '--output', str(output)],
                                    cwd=ROOT, capture_output=True, text=True)
            if result.returncode:
                raise RuntimeError(f'Build {number} failed: {result.stderr or result.stdout}')
            builds.append(inventory(directory))
        if builds[0] != builds[1]:
            raise ValueError('The two clean build inventories differ')

    report = {'kind': 'automated-portable-build-inventory', 'status': 'pass',
              'source_commit': args.source_sha, 'build_count': 2,
              'inventories_equal': True, 'files': builds[0],
              'node': subprocess.check_output(['node', '--version'], text=True).strip(),
              'python': sys.version.split()[0],
              'human_approval': False, 'deployment': False}
    encoded = json.dumps(report, indent=2) + '\n'
    if args.report:
        with args.report.open('x') as destination:
            destination.write(encoded)
    print(encoded, end='')


if __name__ == '__main__':
    main()
