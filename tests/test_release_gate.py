"""Synthetic fixtures test the gate; none are real observations or release artifacts."""
import copy
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, SCRIPTS / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


gate = load("gate", "validate-release.py")
publisher = load("publisher", "publish-releases.py")


class ReleaseGateTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="synthetic-release-gate-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.git("init", "-b", "main")
        self.git("config", "user.email", "synthetic-test@example.invalid")
        self.git("config", "user.name", "Synthetic Test Fixture")
        self.write(gate.REGISTRY, {"schema_version": 1, "releases": []})
        self.base = self.commit("Synthetic empty main fixture")
        self.git("checkout", "-b", "master")
        self.game, self.version = "small-hours", "1.0.0"
        self.key = f"{self.game}/{self.version}"
        self.staged = self.root / "release-candidates" / self.key
        self.make_packet(self.staged, self.game)
        self.master = self.commit("Synthetic candidate fixture; not human evidence")
        self.git("update-ref", "refs/remotes/origin/master", self.master)
        self.saved_packet = self.root / "saved-packet"
        shutil.copytree(self.staged, self.saved_packet)
        self.git("checkout", "main")
        self.package = self.root / "releases" / self.key
        shutil.move(str(self.saved_packet), self.package)
        self.entry = {"game": self.game, "version": self.version,
                      "tag": f"{self.game}-v{self.version}", "source_master_commit": self.master,
                      "path": f"releases/{self.key}/build/index.html",
                      "notes_path": f"releases/{self.key}/notes.md",
                      "release_url": f"https://github.com/PaperStrange/IndiaGames/releases/tag/{self.game}-v{self.version}",
                      "released_at": "2025-01-02T00:00:00Z"}
        self.write(gate.REGISTRY, {"schema_version": 1, "releases": [self.entry]})

    def git(self, *args):
        return subprocess.check_output(["git", "-C", str(self.root), *args], stderr=subprocess.DEVNULL).decode().strip()

    def commit(self, message):
        self.git("add", ".")
        self.git("commit", "-m", message)
        head = self.git("rev-parse", "HEAD")
        if self.git("branch", "--show-current") == "main":
            self.git("update-ref", "refs/remotes/origin/main", head)
        return head

    def write(self, path, data):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    def make_packet(self, path, game):
        (path / "build").mkdir(parents=True)
        (path / "build/index.html").write_text("<!doctype html><title>Synthetic test only</title>")
        built = gate.inventory(path / "build")
        self.write(path / "candidate.json", {"schema_version": 1, "game": game,
                   "version": "1.0.0", "source_commit": self.base, "build": built})
        (path / "notes.md").write_text("# Synthetic fixture\n\n## Changes\nSynthetic test only.\n\n"
            "## Human validation\nSynthetic fixture only, never actual observations.\n\n"
            "## Known limitations\nNot an actual game or release.\n")
        count, groups, _ = gate.GAMES[game]
        sessions = []
        for index in range(6):
            sessions.append({"id": f"synthetic-session-{index}", "participant_count": count,
                "participant_ids": [f"synthetic-person-{index}-{person}" for person in range(count)],
                "method": "manual-remote", "observer_is_human": True, "observer_id": "synthetic-observer",
                "build_sha256": built["sha256"], "started_at": "2025-01-01T10:00:00Z",
                "completed_at": "2025-01-01T10:10:00Z", "observation_notes": "Synthetic test fixture only.",
                "metrics": {metric: metric != "expected_unrestricted_ai" for group in groups for metric in group},
                "follow_up_at": "2025-01-01T10:12:00Z", "follow_up_notes": "Synthetic test follow-up only."})
        report = {"schema_version": 1, "game": game, "version": "1.0.0", "build_sha256": built["sha256"],
                  "critical_bugs_open": 0, "protocol": {"sampling_rule": "first-six-predeclared-sessions",
                    "registered_at": "2025-01-01T00:00:00Z", "session_ids": [s["id"] for s in sessions],
                    "delayed_recall_min_hours": 2 / 60}, "sessions": sessions,
                  "human_approval": {"approved": True, "reviewer_is_human": True,
                    "reviewed_manual_evidence": True, "reviewer_id": "synthetic-reviewer",
                    "reviewed_at": "2025-01-01T12:00:00Z"}}
        self.write(path / "human-playtest.json", report)
        return report

    def report(self):
        return gate.read_json(self.package / "human-playtest.json")

    def validate(self, base=None):
        return gate.validate(self.root, base_ref=base or self.base)

    def test_valid_promotion_and_empty_hub(self):
        self.assertIn("1 official releases", self.validate())
        shutil.rmtree(self.root / "releases")
        self.write(gate.REGISTRY, {"schema_version": 1, "releases": []})
        self.assertIn("0 official releases", self.validate())

    def test_build_tampering_and_symlinks_fail(self):
        entry = self.package / "build/index.html"
        original = entry.read_bytes()
        entry.write_bytes(original + b"tampered")
        with self.assertRaisesRegex(ValueError, "inventory"):
            self.validate()
        entry.write_bytes(original)
        (self.package / "build/outside").symlink_to(self.root / gate.REGISTRY)
        with self.assertRaisesRegex(ValueError, "symlink"):
            self.validate()

    def test_unstaged_report_and_unreachable_master_fail(self):
        report = self.report()
        report["sessions"][0]["observation_notes"] += " changed after staging"
        self.write(self.package / "human-playtest.json", report)
        with self.assertRaisesRegex(ValueError, "differs from"):
            self.validate()
        with self.assertRaisesRegex(ValueError, "merge-base"):
            gate.validate(self.root, master_ref=self.base)

    def test_missing_human_and_reused_people_fail(self):
        report = self.report()
        report["human_approval"]["approved"] = False
        with self.assertRaisesRegex(ValueError, "human reviewer"):
            gate.playtests(report, self.game, self.version, report["build_sha256"])
        report = self.report()
        report["sessions"][1]["participant_ids"] = report["sessions"][0]["participant_ids"]
        with self.assertRaisesRegex(ValueError, "distinct"):
            gate.playtests(report, self.game, self.version, report["build_sha256"])
        report = self.report()
        report["human_approval"]["reviewer_id"] = report["sessions"][0]["observer_id"]
        with self.assertRaisesRegex(ValueError, "independent"):
            gate.playtests(report, self.game, self.version, report["build_sha256"])

    def test_metrics_strict_booleans_counts_and_critical_bugs(self):
        for mutation in ("truthy", "count", "critical"):
            with self.subTest(mutation=mutation):
                report = self.report()
                if mutation == "truthy":
                    report["sessions"][0]["metrics"]["both_contributed"] = "true"
                elif mutation == "count":
                    for session in report["sessions"][:2]:
                        session["metrics"]["reached_reveal_unaided"] = False
                else:
                    report["critical_bugs_open"] = 1
                with self.assertRaises(ValueError):
                    gate.playtests(report, self.game, self.version, report["build_sha256"])

    def test_all_game_threshold_boundaries(self):
        for game in gate.GAMES:
            report = self.make_packet(self.root / "fixtures" / game, game)
            _, groups, minimums = gate.GAMES[game]
            for group, minimum in zip(groups, minimums):
                candidate = copy.deepcopy(report)
                for i, session in enumerate(candidate["sessions"]):
                    session["metrics"][group[0]] = i < (minimum if minimum else 1)
                gate.playtests(candidate, game, "1.0.0", candidate["build_sha256"])
                index = minimum - 1 if minimum else 1
                candidate["sessions"][index]["metrics"][group[0]] = minimum is None
                with self.assertRaisesRegex(ValueError, "criteria failed"):
                    gate.playtests(candidate, game, "1.0.0", candidate["build_sha256"])

    def test_bell_requires_neutral_break(self):
        report = self.make_packet(self.root / "bell", "thirteenth-bell")
        report["sessions"][0]["follow_up_at"] = "2025-01-01T10:11:59Z"
        with self.assertRaisesRegex(ValueError, "predeclared delay"):
            gate.playtests(report, "thirteenth-bell", "1.0.0", report["build_sha256"])

    def test_existing_registry_and_releases_cannot_be_removed(self):
        released = self.commit("Synthetic official fixture")
        shutil.rmtree(self.root / "releases")
        self.write(gate.REGISTRY, {"schema_version": 1, "releases": []})
        with self.assertRaisesRegex(ValueError, "immutable"):
            self.validate(released)

    def test_existing_registry_metadata_cannot_be_rewritten(self):
        released = self.commit("Synthetic official fixture")
        self.entry["released_at"] = "2025-01-03T00:00:00Z"
        self.write(gate.REGISTRY, {"schema_version": 1, "releases": [self.entry]})
        with self.assertRaisesRegex(ValueError, "registry entry is immutable"):
            self.validate(released)

    def test_staging_accepts_draft_but_readiness_does_not(self):
        destination = self.root / "release-candidates" / self.key
        shutil.copytree(self.package, destination)
        self.write(destination / "human-playtest.json", {"schema_version": 1})
        self.assertIn("1 staged packages", gate.validate(self.root, staging=True))
        with self.assertRaises(KeyError):
            gate.validate_package(destination, self.game, self.version)

    def test_blank_templates_fail(self):
        templates = SCRIPTS.parent / "templates/release-candidate"
        for name in ("candidate.json", "human-playtest.json", "notes.md"):
            shutil.copyfile(templates / name, self.package / name)
        with self.assertRaises(ValueError):
            self.validate()

    def test_unknown_source_commit_fails(self):
        manifest = gate.read_json(self.package / "candidate.json")
        manifest["source_commit"] = "0" * 40
        self.write(self.package / "candidate.json", manifest)
        with self.assertRaisesRegex(ValueError, "cat-file"):
            self.validate()

    def test_unregistered_release_files_fail(self):
        (self.root / "releases/rogue.html").write_text("Unregistered")
        with self.assertRaisesRegex(ValueError, "unregistered"):
            self.validate()

    def test_publisher_dry_run_has_no_api_calls(self):
        head = self.commit("Synthetic promotion fixture")
        def fail(*args):
            self.fail("dry run must not contact GitHub")
        self.assertEqual(publisher.publish(self.root, self.base, head, call=fail), [self.entry["tag"]])

    def test_publisher_rejects_wrong_tag_and_is_idempotent(self):
        head = self.commit("Synthetic promotion fixture")
        notes = (self.package / "notes.md").read_text()
        def existing(method, path, data=None):
            self.assertEqual(method, "GET", "idempotent replay must not write")
            if path.startswith("git/ref/"):
                return {"object": {"type": "commit", "sha": head}}
            return {"tag_name": self.entry["tag"], "body": notes, "draft": False, "prerelease": False}
        self.assertEqual(publisher.publish(self.root, self.base, head, True, existing), [self.entry["tag"]])
        def wrong_tag(*args):
            return {"object": {"type": "commit", "sha": self.base}}
        with self.assertRaisesRegex(ValueError, "refusing to move"):
            publisher.publish(self.root, self.base, head, True, wrong_tag)

    def test_publisher_creates_only_selected_approved_version(self):
        head = self.commit("Synthetic promotion fixture")
        writes = []
        def fake_api(method, path, data=None):
            if method == "POST":
                writes.append((path, data))
                return {}
            return None
        publisher.publish(self.root, self.base, head, True, fake_api)
        self.assertEqual([path for path, _ in writes], ["git/refs", "releases"])
        self.assertEqual(writes[0][1], {"ref": "refs/tags/" + self.entry["tag"], "sha": head})
        self.assertEqual(writes[1][1]["body"], (self.package / "notes.md").read_text())
        self.assertFalse(writes[1][1]["draft"])
        self.assertFalse(writes[1][1]["prerelease"])

    def test_publisher_cannot_apply_from_unmerged_branch(self):
        self.git("checkout", "-b", "unmerged-promotion")
        head = self.commit("Synthetic unmerged fixture")
        def fail(*args):
            self.fail("unmerged promotion must not contact GitHub")
        with self.assertRaisesRegex(ValueError, "merge-base"):
            publisher.publish(self.root, self.base, head, True, fail)


if __name__ == "__main__":
    unittest.main()
