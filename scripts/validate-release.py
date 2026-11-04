#!/usr/bin/env python3
"""Validate release evidence and immutable master provenance; never publish or run builds."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

GAMES = {
    "small-hours": (2, (("reached_reveal_unaided",), ("both_contributed",),
                        ("voluntarily_saved_or_replayed",)), (5, 4, 3)),
    "keepers-frame": (1, (("completed_unassisted", "explained_choice_to_return_action"),
                          ("expected_unrestricted_ai",)), (4, None)),
    "thirteenth-bell": (1, (("explained_cause", "predicted_before_outcome"),
                            ("earned_action_uncoached", "explained_fracture"),
                            ("delayed_recalled_specific_mina_outcome",)), (4, 4, 3)),
}
VERSION = re.compile(r"(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\Z")
SHA = re.compile(r"[0-9a-f]{40}\Z")
REGISTRY = "data/releases.json"
STORY_CATALOG = "story-catalog.json"
# Policy lives in the trusted validator, never in writer-editable story content.
# Adding a shipping story or changing a threshold requires a separate policy review.
VIVID_STORIES = {"iona": "iona-return-v1", "mara": "mara-object-v1"}
STORY_CRITERIA = {
    "iona-return-v1": GAMES["keepers-frame"],
    "mara-object-v1": (1, (("completed_unassisted", "explained_action_to_visible_consequence"),), (4,)),
}
NEUTRAL_CRITERIA = (1, (("completed_unassisted",), ("explained_choice_to_return_action",),
                        ("expected_unrestricted_ai",)), (0, 0, 0))


def require(condition, message):
    if not condition:
        raise ValueError(message)


def object_pairs(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"duplicate JSON key: {key}")
        result[key] = value
    return result


def decode(data):
    return json.loads(data, object_pairs_hook=object_pairs)


def read_json(path):
    return decode(path.read_text(encoding="utf-8"))


def timestamp(value):
    require(isinstance(value, str) and value.endswith("Z"), "timestamps must use UTC Z")
    result = datetime.fromisoformat(value[:-1] + "+00:00")
    require(result <= datetime.now(timezone.utc), "timestamps cannot be in the future")
    return result


def filled(value):
    return isinstance(value, str) and bool(value.strip()) and not re.search(
        r"\b(TODO|TBD|REPLACE|PLACEHOLDER)\b|<[^>]+>", value, re.I)


def files_under(path):
    """Reject links, including directory links, before reading any package file."""
    require(not path.is_symlink(), f"symlink forbidden: {path}")
    files = {}
    if path.exists():
        for entry in sorted(path.rglob("*")):
            require(not entry.is_symlink(), f"symlink forbidden: {entry}")
            require(entry.is_file() or entry.is_dir(), f"non-regular file: {entry}")
            if entry.is_file():
                files[entry.relative_to(path).as_posix()] = entry.read_bytes()
    return files


def inventory(build):
    files = {name: hashlib.sha256(data).hexdigest()
             for name, data in files_under(build).items()}
    digest = hashlib.sha256(json.dumps(files, sort_keys=True, separators=(",", ":"))
                            .encode("utf-8")).hexdigest()
    return {"entrypoint": "index.html", "sha256": digest, "files": files}


def playtests(report, game, version, digest, criteria=None):
    require(report["schema_version"] == 1 and report["game"] == game
            and report["version"] == version, "playtest identity mismatch")
    require(report["build_sha256"] == digest, "playtests must use the exact shipped build")
    require(type(report["critical_bugs_open"]) is int and report["critical_bugs_open"] == 0,
            "all critical bugs must be closed")
    protocol = report["protocol"]
    require(protocol["sampling_rule"] == "first-six-predeclared-sessions",
            "use the first six predeclared sessions without post-hoc replacement")
    registered = timestamp(protocol["registered_at"])
    ids = protocol["session_ids"]
    require(isinstance(ids, list) and len(ids) == 6 and len(set(ids)) == 6
            and all(filled(i) for i in ids), "predeclare six unique session IDs")
    sessions = report["sessions"]
    require(len(sessions) == 6 and [s["id"] for s in sessions] == ids,
            "report all six sessions in predeclared order")
    participants, groups, minimums = criteria or GAMES[game]
    metrics = {metric for group in groups for metric in group}
    completed_times = []
    seen_people = set()
    for session in sessions:
        require(type(session["participant_count"]) is int
                and session["participant_count"] == participants, "incorrect participant count")
        people = session["participant_ids"]
        require(isinstance(people, list) and len(people) == participants
                and all(filled(person) for person in people) and len(set(people)) == participants
                and not seen_people.intersection(people), "use distinct deidentified real participants")
        seen_people.update(people)
        require(session["method"] in ("manual-in-person", "manual-remote")
                and session["observer_is_human"] is True and filled(session["observer_id"]),
                "a human must manually observe each session")
        require(session["build_sha256"] == digest, "session build mismatch")
        start, end = timestamp(session["started_at"]), timestamp(session["completed_at"])
        require(registered <= start <= end, "register protocol before sessions start")
        require(filled(session["observation_notes"]), "record deidentified observation notes")
        require(set(session["metrics"]) == metrics
                and all(type(v) is bool for v in session["metrics"].values()),
                "supply every game metric as a real JSON boolean")
        if game == "thirteenth-bell":
            delay = protocol["delayed_recall_min_hours"]
            require(type(delay) in (int, float) and delay >= 2 / 60,
                    "predeclare at least a two-minute neutral break before recall")
            follow_up = timestamp(session["follow_up_at"])
            require((follow_up - end).total_seconds() >= delay * 3600,
                    "delayed recall must follow the predeclared delay")
            require(filled(session["follow_up_notes"]), "record follow-up observations")
            completed_times.append(follow_up)
        completed_times.append(end)
    counts = [sum(all(s["metrics"][m] for m in group) for s in sessions) for group in groups]
    for count, minimum in zip(counts, minimums):
        require(count <= 1 if minimum is None else count >= minimum,
                f"{game} human criteria failed: counts {counts}, thresholds {minimums}")
    approval = report["human_approval"]
    require(approval["approved"] is True and approval["reviewer_is_human"] is True
            and approval["reviewed_manual_evidence"] is True and filled(approval["reviewer_id"]),
            "a human reviewer must approve the manual evidence")
    require(approval["reviewer_id"] not in seen_people
            and approval["reviewer_id"] not in {session["observer_id"] for session in sessions},
            "the approving reviewer must be independent of observers and participants")
    require(timestamp(approval["reviewed_at"]) >= max(completed_times),
            "approval must follow all sessions and follow-ups")
    return timestamp(approval["reviewed_at"])


def shipping_stories(build):
    """Return a reviewed, versioned shipping catalog already covered by build inventory."""
    path = build / STORY_CATALOG
    require(path.is_file(), "new Vivid candidates require build/story-catalog.json")
    catalog = read_json(path)
    require(type(catalog["schema_version"]) is int and catalog["schema_version"] == 1
            and catalog["game"] == "keepers-frame", "invalid shipping story catalog identity")
    stories = catalog["stories"]
    require(isinstance(stories, list) and len(stories) == len(VIVID_STORIES),
            "shipping catalog must contain the two reviewed stories")
    result = {}
    for story in stories:
        story_id = story["id"]
        require(isinstance(story_id, str) and story_id in VIVID_STORIES and story_id not in result,
                "unknown or duplicate shipping story ID")
        require(story["release_profile"] == VIVID_STORIES[story_id],
                "story release profile is not the reviewed policy")
        require(type(story["revision"]) is int and story["revision"] >= 1 and filled(story["title"]),
                "shipping story needs a positive revision and title")
        result[story_id] = story
    require(set(result) == set(VIVID_STORIES), "missing reviewed shipping story")
    return result


def story_playtests(report, version, digest, stories, ready=True):
    """One evidence report per shipping story, one independent approval for the bundle."""
    require(type(report["schema_version"]) is int and report["schema_version"] == 2
            and report["game"] == "keepers-frame" and report["version"] == version,
            "multi-story Vivid requires schema 2 playtest identity")
    require(report["build_sha256"] == digest, "playtests must use the exact shipped build")
    reports = report["story_reports"]
    require(isinstance(reports, list) and len(reports) == len(stories),
            "supply exactly one report for every shipping story")
    seen_stories = set()
    for item in reports:
        story_id = item["story_id"]
        require(isinstance(story_id, str) and story_id in stories and story_id not in seen_stories,
                "unknown or duplicate story report")
        seen_stories.add(story_id)
        require(item["release_profile"] == stories[story_id]["release_profile"]
                and item["condition"] == "remembered", "story report has wrong profile or condition")
        require(item["build_sha256"] == digest, "story report build mismatch")
    require(seen_stories == set(stories), "missing shipping story report")
    studies = report.get("study_reports", [])
    require(isinstance(studies, list) and len(studies) <= 1, "at most one optional neutral study report")
    for item in studies:
        require(item["story_id"] == "iona" and item["condition"] == "neutral"
                and item["release_profile"] == "iona-neutral-v1",
                "only the reviewed Iona neutral comparison is optional")
        require(item["build_sha256"] == digest, "neutral study build mismatch")
    if not ready:
        return None  # Staging verifies identities; pending human observations remain pending.
    require(type(report["critical_bugs_open"]) is int and report["critical_bugs_open"] == 0,
            "all critical bugs must be closed")
    all_people, all_ids, approvals = set(), set(), []
    for item in reports + studies:
        criteria = NEUTRAL_CRITERIA if item["condition"] == "neutral" else STORY_CRITERIA[item["release_profile"]]
        # Reuse the existing manual-session checks without allowing content-defined thresholds.
        individual = dict(item, schema_version=1, game="keepers-frame", version=version,
                          human_approval=report["human_approval"])
        approvals.append(playtests(individual, "keepers-frame", version, digest, criteria=criteria))
        for session in item["sessions"]:
            require(session["story_id"] == item["story_id"] and session["condition"] == item["condition"],
                    "session story or condition mismatch")
            people = set(session["participant_ids"])
            require(not people.intersection(all_people), "use distinct participants across all story and study cohorts")
            require(session["id"] not in all_ids, "session IDs must be unique across the bundle")
            all_people.update(people)
            all_ids.add(session["id"])
    return max(approvals)


def validate_package(package, game, version, ready=True, allow_legacy_vivid=False):
    require(game in GAMES and VERSION.fullmatch(version), "unknown game or invalid version")
    all_files = files_under(package)
    require(set(all_files) == {"candidate.json", "notes.md", "human-playtest.json"}
            | {name for name in all_files if name.startswith("build/")},
            "package must contain candidate.json, notes.md, human-playtest.json and build/")
    manifest = read_json(package / "candidate.json")
    require(manifest["schema_version"] == 1 and manifest["game"] == game
            and manifest["version"] == version, "candidate identity mismatch")
    require(isinstance(manifest["source_commit"], str) and SHA.fullmatch(manifest["source_commit"]),
            "source_commit must be a full implementation commit SHA")
    built = inventory(package / "build")
    require(built == manifest["build"] and bool(built["files"]), "build inventory/hash mismatch")
    require(bool(all_files.get("build/index.html", b"").strip()), "build/index.html is required")
    report = read_json(package / "human-playtest.json")
    multi_story = game == "keepers-frame" and (
        not allow_legacy_vivid
        or STORY_CATALOG in built["files"] or report.get("schema_version") == 2)
    stories = shipping_stories(package / "build") if multi_story else None
    if multi_story:
        story_playtests(report, version, built["sha256"], stories, ready=False)
    if ready:
        notes = all_files["notes.md"].decode("utf-8")
        require(filled(notes) and len(notes.strip()) >= 80
                and all(title in notes for title in ("## Changes", "## Human validation", "## Known limitations")),
                "complete release notes, human validation and known limitations")
        if multi_story:
            return story_playtests(report, version, built["sha256"], stories)
        return playtests(report, game, version, built["sha256"])
    return None


def git(root, *args):
    result = subprocess.run(["git", "-C", str(root), *args], capture_output=True)
    require(result.returncode == 0, f"git {' '.join(args[:2])} failed: {result.stderr.decode().strip()}")
    return result.stdout


def tree(root, ref, prefix):
    raw = git(root, "ls-tree", "-rz", ref, "--", prefix)
    result = {}
    for entry in raw.split(b"\0"):
        if entry:
            info, name = entry.split(b"\t", 1)
            mode, kind, oid = info.split()
            require(mode in (b"100644", b"100755") and kind == b"blob", "Git package contains links/submodules")
            result[name.decode()] = git(root, "cat-file", "blob", oid.decode())
    return result


def registry(data):
    require(data["schema_version"] == 1 and isinstance(data["releases"], list), "invalid release registry")
    entries = {}
    for entry in data["releases"]:
        game, version = entry["game"], entry["version"]
        require(game in GAMES and VERSION.fullmatch(version), "invalid registry game/version")
        key = f"{game}/{version}"
        require(key not in entries, "duplicate game/version")
        tag = f"{game}-v{version}"
        require(entry["tag"] == tag and entry["path"] == f"releases/{key}/build/index.html"
                and entry["notes_path"] == f"releases/{key}/notes.md"
                and entry["release_url"] == f"https://github.com/PaperStrange/IndiaGames/releases/tag/{tag}",
                "registry links/tag do not match the release")
        require(SHA.fullmatch(entry["source_master_commit"]), "full master commit SHA required")
        timestamp(entry["released_at"])
        entries[key] = entry
    return entries


def validate(root, master_ref="refs/remotes/origin/master", base_ref=None, staging=False):
    if staging:
        paths = files_under(root / "release-candidates")
        keys = {"/".join(path.split("/")[:2]) for path in paths}
        for key in sorted(keys):
            game, version = key.split("/")
            validate_package(root / "release-candidates" / key, game, version, ready=False)
        return f"{len(keys)} staged packages checked; human readiness is NOT approval."
    require(not files_under(root / "release-candidates"), "promote selected packages, not the candidate queue")
    entries = registry(read_json(root / REGISTRY))
    released = files_under(root / "releases")
    require(all("/".join(path.split("/")[:2]) in entries for path in released),
            "unregistered files under releases/")
    old_entries = {}
    if base_ref:
        # Only byte-identical, already-published archives may use their old evidence schema.
        # A smaller candidate version number never opts a new Vivid build out of story review.
        for name, data in tree(root, base_ref, "releases/").items():
            target = root / name
            require(target.is_file() and target.read_bytes() == data, f"released file is immutable: {name}")
        old_data = tree(root, base_ref, REGISTRY)
        if REGISTRY in old_data:
            old_entries = registry(decode(old_data[REGISTRY]))
            for key, entry in old_entries.items():
                require(entries.get(key) == entry, f"released registry entry is immutable: {key}")
    for key, entry in entries.items():
        game, version = key.split("/")
        approved_at = validate_package(root / "releases" / key, game, version,
                                       allow_legacy_vivid=key in old_entries)
        implementation = read_json(root / "releases" / key / "candidate.json")["source_commit"]
        git(root, "cat-file", "-e", implementation + "^{commit}")
        require(timestamp(entry["released_at"]) >= approved_at, "release cannot precede human approval")
        sha = entry["source_master_commit"]
        git(root, "merge-base", "--is-ancestor", sha, master_ref)
        prefix = f"release-candidates/{key}/"
        original = {name[len(prefix):]: data for name, data in tree(root, sha, prefix).items()}
        require(original == files_under(root / "releases" / key),
                f"{key} differs from the immutable master candidate at {sha}")
    return f"{len(entries)} official releases validated; human review remains required."


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--master-ref", default="refs/remotes/origin/master")
    parser.add_argument("--base-ref")
    parser.add_argument("--staging", action="store_true", help="check candidate integrity, allow draft evidence")
    parser.add_argument("--candidate", help="check readiness of one GAME/VERSION on master")
    parser.add_argument("--inventory", type=Path, help="print build inventory for candidate.json")
    args = parser.parse_args()
    try:
        if args.inventory:
            print(json.dumps(inventory(args.inventory), indent=2))
        elif args.candidate:
            game, version = args.candidate.split("/")
            validate_package(args.root / "release-candidates" / game / version, game, version)
            print("Candidate meets recorded criteria; human authenticity review is still required.")
        else:
            print(validate(args.root, args.master_ref, args.base_ref, args.staging))
    except (ValueError, KeyError, TypeError, AttributeError, OSError) as error:
        print(f"Release gate failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
