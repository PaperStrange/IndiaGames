#!/usr/bin/env python3
"""Export Small Hours' immutable study baseline; no checkout or tracked edits."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import zipfile

SOURCE = "ca7fb8ea0fa7ceb1a9fd1c8ab238a71a47e9c649"
CHECKED_BASELINE = "822366ad3eb309f7009bb7a05e26cddfb466422f"
PREFIX = "memorable-moments-game/play/"


def git(repo, *args):
    return subprocess.check_output(["git", "-C", str(repo), *args])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd())
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    repo = Path(git(args.repo, "rev-parse", "--show-toplevel").decode().strip())
    output = args.output.resolve()
    if output.exists():
        parser.error("output already exists; retain it and choose a new directory")
    if output == repo or repo in output.parents:
        parser.error("output must be outside the source checkout")
    if git(repo, "diff", "--name-only", CHECKED_BASELINE, SOURCE, "--",
           PREFIX, "memorable-moments-game/tests/").strip():
        parser.error("pinned baseline differs from the historically checked runtime/tests")
    contents = {}
    for record in git(repo, "ls-tree", "-r", "-z", SOURCE, "--", PREFIX).split(b"\0"):
        if not record:
            continue
        metadata, path_bytes = record.split(b"\t", 1)
        mode, kind, object_id = metadata.split()
        path = path_bytes.decode("utf-8")
        if mode not in (b"100644", b"100755") or kind != b"blob":
            parser.error("non-regular build entry: " + path)
        name = path.removeprefix(PREFIX)
        if not name or Path(name).is_absolute() or ".." in Path(name).parts:
            parser.error("unexpected build path: " + path)
        contents[name] = git(repo, "cat-file", "blob", object_id.decode())
    if "index.html" not in contents:
        parser.error("pinned source has no entrypoint")
    files = {name: hashlib.sha256(data).hexdigest() for name, data in sorted(contents.items())}
    digest = hashlib.sha256(json.dumps(files, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    output.mkdir(parents=True)
    build = output / "build"
    build.mkdir()
    archive = output / "small-hours-baseline-2026-10-27.zip"
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
        for name, data in sorted(contents.items()):
            target = build / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            info = zipfile.ZipInfo(name, date_time=(2026, 10, 27, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            bundle.writestr(info, data, compresslevel=9)
    manifest = {
        "schema_version": 1,
        "kind": "study-baseline-not-release",
        "game": "small-hours",
        "baseline_id": "SH-BASELINE-2026-10-27",
        "source_branch": "memorable-moments-game",
        "source_commit": SOURCE,
        "runtime_matches_historical_source": CHECKED_BASELINE,
        "build": {"entrypoint": "index.html", "sha256": digest, "files": files},
        "build_file_count": len(files),
        "build_bytes": sum(len(data) for data in contents.values()),
        "archive": {"file": archive.name, "sha256": hashlib.sha256(archive.read_bytes()).hexdigest()},
        "human_sessions_recorded": 0,
        "human_approval": False,
        "new_browser_verification": None,
    }
    (output / "baseline.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"output": str(output), "build_sha256": digest, "files": len(files)}))


if __name__ == "__main__":
    main()
