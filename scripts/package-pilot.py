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


def read_build(directory, require_catalog):
    """Inventory the whole build before creating a candidate directory."""
    entries = sorted(directory.rglob('*'))
    if any(p.is_symlink() for p in entries):
        raise ValueError('Build contains a symbolic link')
    expected = ['thirteenth-bell-playable-demo.html']
    if require_catalog:
        expected = ['locale-catalog.json'] + expected
    if [p.relative_to(directory).as_posix() for p in entries] != expected:
        raise ValueError(f'Expected exactly {expected} in the build')
    built = {'index.html': (directory / 'thirteenth-bell-playable-demo.html').read_bytes()}
    if require_catalog:
        raw = (directory / 'locale-catalog.json').read_bytes()
        catalog = json.loads(raw)
        required = {'schema_version': 1, 'game': 'thirteenth-bell', 'default_locale': 'en',
                    'locales': ['en', 'ja', 'zh-Hans'],
                    'units': [{'id': 'thirteenth-bell', 'locales': ['en', 'ja', 'zh-Hans']}]}
        if catalog != required:
            raise ValueError('Locale catalog does not match Bell content scope')
        built['locale-catalog.json'] = raw
    return built


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
        built = read_build(temp / 'dist', require_catalog='js/i18n.js' in paths)
    files = {name: hashlib.sha256(content).hexdigest() for name, content in sorted(built.items())}
    digest = hashlib.sha256(json.dumps(files, sort_keys=True,
                                      separators=(',', ':')).encode()).hexdigest()
    build = output / 'build'
    build.mkdir(parents=True)
    for name, content in built.items():
        (build / name).write_bytes(content)
    manifest = {'schema_version': 1, 'game': 'thirteenth-bell',
                'version': version, 'source_commit': commit,
                'build': {'entrypoint': 'index.html', 'sha256': digest, 'files': files}}
    (output / 'candidate.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps({'output': str(output), 'source_commit': commit,
                      'bytes': sum(map(len, built.values())), 'build_sha256': digest}, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, help='Pinned commit/ref to export')
    parser.add_argument('--output', required=True, type=Path, help='New directory only')
    parser.add_argument('--version', required=True, help='Explicit new candidate version; never overwrite a frozen version')
    args = parser.parse_args()
    export(args.source, args.output.resolve(), args.version)
