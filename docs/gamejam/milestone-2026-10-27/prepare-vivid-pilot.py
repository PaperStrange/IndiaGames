#!/usr/bin/env python3
"""Verify/export the frozen Vivid candidate without switching branches or rebuilding."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess

MASTER_COMMIT = "f9488e5079d1d193caef560d1fe72936add6cba3"
SOURCE_COMMIT = "0c72da97994d9f2d315e6aba1afba5219936b78b"
PACKET = "release-candidates/keepers-frame/0.1.2"
EXPECTED_HASH = "e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, help="new directory outside the checkout; omit to verify only")
    args = parser.parse_args()
    repo = Path(subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip()).resolve()

    def blob(relative):
        return subprocess.check_output(["git", "-C", str(repo), "show", f"{MASTER_COMMIT}:{PACKET}/{relative}"])

    packet_files = {name: blob(name) for name in ("candidate.json", "human-playtest.json", "notes.md")}
    candidate = json.loads(packet_files["candidate.json"])
    assert (candidate["game"], candidate["version"], candidate["source_commit"]) == ("keepers-frame", "0.1.2", SOURCE_COMMIT)
    expected = candidate["build"]
    assert expected["entrypoint"] == "index.html" and expected["sha256"] == EXPECTED_HASH
    tracked = subprocess.check_output(["git", "-C", str(repo), "ls-tree", "-r", "--name-only", MASTER_COMMIT, f"{PACKET}/build/"], text=True).splitlines()
    assert sorted(path.removeprefix(f"{PACKET}/build/") for path in tracked) == sorted(expected["files"]), "tracked inventory mismatch"
    files, hashes = {}, {}
    for name, digest in sorted(expected["files"].items()):
        path = PurePosixPath(name)
        assert not path.is_absolute() and ".." not in path.parts and "\\" not in name, "unsafe build path"
        data = blob(f"build/{name}")
        actual = hashlib.sha256(data).hexdigest()
        assert actual == digest, f"file hash mismatch: {name}"
        hashes[name], files[name] = actual, data
    inventory_hash = hashlib.sha256(json.dumps(hashes, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    assert inventory_hash == EXPECTED_HASH
    catalog = json.loads(files["story-catalog.json"])
    assert {s["id"]: s["release_profile"] for s in catalog["stories"]} == {"iona": "iona-return-v1", "mara": "mara-object-v1"}
    report = json.loads(packet_files["human-playtest.json"])
    assert report["schema_version"] == 2 and report["build_sha256"] == EXPECTED_HASH
    assert all(not r["sessions"] for r in report["story_reports"]) and not report["human_approval"]["approved"]
    summary = {"master_commit": MASTER_COMMIT, "source_commit": SOURCE_COMMIT, "version": "0.1.2", "build_sha256": inventory_hash, "files": len(files), "bytes": sum(map(len, files.values())), "human_sessions": 0, "human_approved": False}
    if args.output:
        destination = args.output.resolve()
        assert destination != repo and repo not in destination.parents, "export outside the shared checkout"
        assert not destination.exists(), "refusing to overwrite an existing export"
        destination.mkdir(parents=True)
        for name, data in {**packet_files, **{f"build/{name}": data for name, data in files.items()}}.items():
            target = destination / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
        summary["exported_to"] = str(destination)
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
