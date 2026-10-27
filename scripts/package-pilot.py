#!/usr/bin/env python3
"""Export a pinned Bell build without switching or mutating the checkout."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args])


def export(source, output, version):
    commit = git('rev-parse', source + '^{commit}').decode().strip()
    if output.exists():
        raise SystemExit(f'Refusing to overwrite {output}')
    tracked = git('ls-tree', '-r', '--name-only', commit).decode().splitlines()
    paths = [p for p in tracked if p in ('index.html', 'build.mjs') or
             p.startswith(('css/', 'js/', 'assets/images/'))]
    with tempfile.TemporaryDirectory(prefix='bell-export-') as directory:
        temp = Path(directory)
        for name in paths:
            path = temp / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(git('show', f'{commit}:{name}'))
        subprocess.run(['node', 'build.mjs'], cwd=temp, check=True)
        built = (temp / 'dist/thirteenth-bell-playable-demo.html').read_bytes()
    files = {'index.html': hashlib.sha256(built).hexdigest()}
    digest = hashlib.sha256(json.dumps(files, sort_keys=True,
                                      separators=(',', ':')).encode()).hexdigest()
    build = output / 'build'
    build.mkdir(parents=True)
    (build / 'index.html').write_bytes(built)
    manifest = {'schema_version': 1, 'game': 'thirteenth-bell',
                'version': version, 'source_commit': commit,
                'build': {'entrypoint': 'index.html', 'sha256': digest, 'files': files}}
    (output / 'candidate.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps({'output': str(output), 'source_commit': commit,
                      'bytes': len(built), 'build_sha256': digest}, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, help='Pinned commit/ref to export')
    parser.add_argument('--output', required=True, type=Path, help='New directory only')
    parser.add_argument('--version', default='0.1.0')
    args = parser.parse_args()
    export(args.source, args.output.resolve(), args.version)
