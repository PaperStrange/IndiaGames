#!/usr/bin/env python3
"""Build an immutable Vivid source twice and export a draft candidate outside Git."""
import argparse
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile


APP = "vivid-2.5d-photo-game/play"
GAME = "keepers-frame"
# Reviewed multi-story policy, merged through PR #1. Never fall back to an older master.
POLICY_COMMIT = "7a26e07a71062766e357b51aece9cce8b00c9b17"
VALIDATOR = "scripts/validate-release.py"
REPORT_TEMPLATE = "templates/release-candidate/human-playtest.vivid.json"
SHA = re.compile(r"[0-9a-f]{40}\Z")
VERSION = re.compile(r"(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\Z")


def require(condition, message):
    if not condition:
        raise ValueError(message)


def run(command, cwd=None):
    """Keep stdout machine-readable; relay build/validation logs to stderr."""
    result = subprocess.run(command, cwd=cwd, capture_output=True)
    if result.returncode:
        raise ValueError(f"command failed ({result.returncode}): {' '.join(map(str, command))}\n"
                         + result.stdout.decode(errors="replace")
                         + result.stderr.decode(errors="replace"))
    return result


def git(repo, *args):
    return run(["git", "-C", str(repo), *args]).stdout


def commit(repo, value):
    require(SHA.fullmatch(value), "use a full lowercase 40-character commit SHA")
    actual = git(repo, "rev-parse", "--verify", value + "^{commit}").decode().strip()
    require(actual == value, "commit identity mismatch")
    return actual


def write_json(path, value):
    path.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")


def emit_logs(result):
    sys.stderr.write(result.stdout.decode(errors="replace"))
    sys.stderr.write(result.stderr.decode(errors="replace"))


def export_source(archive, destination):
    """Extract regular committed files only; no checkout, submodule or symlink."""
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:") as stream:
        for entry in stream:
            relative = PurePosixPath(entry.name)
            require(not relative.is_absolute() and ".." not in relative.parts
                    and "\\" not in entry.name, "unsafe source archive path")
            require(entry.isdir() or entry.isfile(), "source archive contains a link or special file")
            target = destination.joinpath(*relative.parts)
            if entry.isdir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with stream.extractfile(entry) as source:
                    target.write_bytes(source.read())
                target.chmod(entry.mode & 0o777)
    return destination / APP


def check_version(app, version):
    package = json.loads((app / "package.json").read_text())
    lock = json.loads((app / "package-lock.json").read_text())
    require(package["name"] == GAME and lock["name"] == GAME,
            "source package name must be keepers-frame")
    require(package["version"] == version == lock["version"]
            == lock["packages"][""]["version"],
            "commit the requested version in package.json and package-lock.json before export")


def build(app, cache, offline):
    require(not (app / "node_modules").exists(), "source must not include node_modules")
    require(not (app / "dist").exists(), "source must not include a prebuilt dist")
    install = ["npm", "ci", "--ignore-scripts", "--no-audit", "--no-fund",
               "--offline" if offline else "--prefer-offline"]
    if cache:
        install.extend(["--cache", str(cache)])
    emit_logs(run(install, cwd=app))
    emit_logs(run(["npm", "run", "build"], cwd=app))
    return app / "dist"


def inventory(validator, build_dir):
    return json.loads(run([sys.executable, str(validator), "--inventory", str(build_dir)]).stdout)


def blank_report(template, version, digest, catalog):
    report = json.loads(template)
    require(report["schema_version"] == 2 and report["game"] == GAME,
            "reviewed schema-v2 Vivid template required")
    require(report["critical_bugs_open"] is None and report["study_reports"] == [],
            "template must contain no assessed bugs or optional study results")
    require(report["human_approval"] == {
        "approved": False, "reviewer_is_human": False, "reviewed_manual_evidence": False,
        "reviewer_id": None, "reviewed_at": None,
    }, "template must contain no human approval")
    expected = {row["id"]: row["release_profile"] for row in catalog["stories"]}
    require(len(expected) == len(catalog["stories"]), "duplicate shipping story ID")
    reports = report["story_reports"]
    require({row["story_id"]: row["release_profile"] for row in reports} == expected
            and len(reports) == len(expected), "report and generated shipping catalog disagree")
    report["version"], report["build_sha256"] = version, digest
    for row in reports:
        require(row["condition"] == "remembered" and row["sessions"] == []
                and row["critical_bugs_open"] is None and row["protocol"] == {
                    "sampling_rule": "first-six-predeclared-sessions",
                    "registered_at": None, "session_ids": [],
                }, "template must contain blank first-six cohorts")
        row["build_sha256"] = digest
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-ref", required=True, help="full committed Vivid source SHA")
    parser.add_argument("--staging-ref", required=True, help="full current master commit SHA for version availability")
    parser.add_argument("--version", required=True, help="unused MAJOR.MINOR.PATCH matching source")
    parser.add_argument("--output", required=True, type=Path, help="new packet directory outside checkout")
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="local repository; read-only access")
    parser.add_argument("--policy-ref", default=POLICY_COMMIT, help="full reviewed policy commit SHA")
    parser.add_argument("--npm-cache", type=Path, help="reuse an existing npm download cache")
    parser.add_argument("--offline", action="store_true", help="fail rather than fetch a missing dependency")
    args = parser.parse_args()
    try:
        require(VERSION.fullmatch(args.version), "version must be MAJOR.MINOR.PATCH without leading zeroes")
        repo = Path(git(args.repo, "rev-parse", "--show-toplevel").decode().strip()).resolve()
        source_ref = commit(repo, args.source_ref)
        policy_ref = commit(repo, args.policy_ref)
        staging_ref = commit(repo, args.staging_ref)
        destination = args.output.absolute()
        require(not destination.exists() and not destination.is_symlink(), "refusing to overwrite output")
        destination = destination.resolve()
        require(destination != repo and repo not in destination.parents,
                "output must be outside the shared checkout")
        package_path = f"release-candidates/{GAME}/{args.version}"
        for ref in dict.fromkeys((policy_ref, staging_ref)):
            for prefix in ("release-candidates", "releases"):
                existing = git(repo, "ls-tree", "--name-only", ref, "--",
                               f"{prefix}/{GAME}/{args.version}").decode().strip()
                require(not existing, f"version already exists at {ref}: {existing}")
        archive = git(repo, "archive", "--format=tar", source_ref, "--", APP)
        require(archive, "source archive is empty")
        validator_bytes = git(repo, "show", f"{policy_ref}:{VALIDATOR}")
        template = git(repo, "show", f"{policy_ref}:{REPORT_TEMPLATE}")
        destination.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="vivid-candidate-", dir=destination.parent) as temporary:
            temp = Path(temporary)
            validator = temp / "validate-release.py"
            validator.write_bytes(validator_bytes)
            inventories, outputs = [], []
            for attempt in (1, 2):
                app = export_source(archive, temp / f"source-{attempt}")
                check_version(app, args.version)
                output = build(app, args.npm_cache.resolve() if args.npm_cache else None, args.offline)
                inventories.append(inventory(validator, output))
                outputs.append(output)
            require(inventories[0] == inventories[1], "two clean builds differ; no candidate exported")
            built = inventories[0]
            require("index.html" in built["files"] and "story-catalog.json" in built["files"],
                    "build is missing entrypoint or shipping-story catalog")
            catalog = json.loads((outputs[0] / "story-catalog.json").read_text())
            report = blank_report(template, args.version, built["sha256"], catalog)
            stage_root = temp / "staging"
            packet = stage_root / package_path
            packet.mkdir(parents=True)
            shutil.copytree(outputs[0], packet / "build")
            write_json(packet / "candidate.json", {
                "schema_version": 1, "game": GAME, "version": args.version,
                "source_commit": source_ref, "build": built,
            })
            write_json(packet / "human-playtest.json", report)
            (packet / "notes.md").write_text(
                f"# Keeper's Frame {args.version} — staged candidate\n\n"
                "## Changes\n\n"
                f"Built twice from immutable source `{source_ref}` with matching file inventories. "
                "This export records build provenance; consult the source change and readiness "
                "handoff for gameplay changes and actual agent verification.\n\n"
                "## Human validation\n\n"
                "Pending. The six Iona and six distinct Mara first-six cohorts are empty; "
                "no person, reaction, device measurement, assessed critical-bug count or approval "
                "has been supplied. Staging integrity is not readiness or release approval.\n\n"
                "## Known limitations\n\n"
                "Physical-device/accessibility checks and independent human review remain pending. "
                "Optional neutral/recall studies are unperformed. Official main promotion is blocked "
                "until the existing human gate passes.\n\n"
                f"Policy validator: `{policy_ref}` (`{VALIDATOR}`); staging base: `{staging_ref}`; source lock SHA-256: "
                f"`{hashlib.sha256((temp / 'source-1' / APP / 'package-lock.json').read_bytes()).hexdigest()}`.\n",
                encoding="utf-8")
            checked = run([sys.executable, str(validator), "--root", str(stage_root), "--staging"])
            emit_logs(checked)
            # Export only after both builds and the real reviewed staging validator pass.
            require(not destination.exists() and not destination.is_symlink(), "output appeared during build")
            packet.rename(destination)
            summary = {
                "game": GAME, "version": args.version, "source_commit": source_ref,
                "policy_commit": policy_ref, "staging_commit": staging_ref,
                "build_sha256": built["sha256"],
                "reproducible_builds": 2, "files": len(built["files"]),
                "bytes": sum((destination / "build" / name).stat().st_size for name in built["files"]),
                "staging_result": checked.stdout.decode().strip(),
                "human_sessions": 0, "human_approved": False, "exported_to": str(destination),
                "node_version": run(["node", "--version"]).stdout.decode().strip(),
                "npm_version": run(["npm", "--version"]).stdout.decode().strip(),
            }
            print(json.dumps(summary, indent=2))
        return 0
    except (ValueError, KeyError, TypeError, OSError, tarfile.TarError) as error:
        print(f"Candidate export failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
