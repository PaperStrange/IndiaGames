"""Synthetic fixtures test the gate; none are real observations or release artifacts."""
import copy
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, SCRIPTS / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


gate = load("gate", "validate-release.py")
publisher = load("publisher", "publish-releases.py")


def add_locale_catalog(package, game):
    (package / "build/locale-catalog.json").write_text(json.dumps({
        "schema_version": 1, "game": game, "default_locale": "en", "locales": sorted(gate.LOCALES),
        "units": [{"id": unit, "locales": sorted(gate.LOCALES)} for unit in sorted(gate.LOCALE_UNITS[game])]}))


def synthetic_comprehension_protocol(block, game, report):
    """TEST ONLY: not a proposed sample size or an adopted human-study protocol."""
    expected = {(unit, locale) for unit in gate.LOCALE_UNITS[game] for locale in gate.LOCALES}
    gate.require({(row["unit"], row["locale"]) for row in block["records"]} == expected,
                 "synthetic protocol needs all test cells")
    gate.require(all(row["findings"] == {"synthetic_example_only": True} for row in block["records"]),
                 "synthetic protocol criteria failed")


def adopt_test_only_protocol(test):
    # Production policy stays empty. Every positive release fixture explicitly installs
    # an invented trusted protocol in memory; no real packet can select it.
    for module in (gate, publisher.gate):
        temporary = patch.dict(module.REVIEWED_LOCALE_PROTOCOLS, {
            (game, "synthetic-protocol-not-for-release"): {"sha256": "c" * 64, "validate": synthetic_comprehension_protocol}
            for game in gate.GAMES})
        temporary.start()
        test.addCleanup(temporary.stop)


def add_locale_evidence(report, game, version, built):
    evidence = {"schema_version": 1, "game": game, "version": version,
        "build_sha256": built["sha256"], "locale_catalog_sha256": built["files"][gate.LOCALE_CATALOG],
        "language_reviews": [], "device_claims": [], "physical_checks": [],
        "comprehension": {"protocol_id": "synthetic-protocol-not-for-release", "protocol_sha256": "c" * 64,
            "registered_at": "2025-01-01T00:00:00Z", "records": []}}
    for family in sorted(gate.DEVICE_FAMILIES):
        evidence["device_claims"].append({"id": "synthetic-" + family, "device_family": family,
            "model": "Synthetic device only", "os": "Synthetic OS", "os_version": "1.0",
            "browser": "Synthetic browser", "browser_version": "1.0", "engine": "Synthetic engine",
            "inputs": ["synthetic input"]})
    for unit in sorted(gate.LOCALE_UNITS[game]):
        for locale in sorted(gate.LOCALES):
            common = {"unit": unit, "locale": locale, "build_sha256": built["sha256"],
                "locale_catalog_sha256": built["files"][gate.LOCALE_CATALOG],
                "evidence_reference": "Synthetic test fixture only; no actual private evidence."}
            evidence["language_reviews"].append(dict(common, reviewer_id="synthetic-editor-" + locale,
                reviewer_is_human=True, fluent_in_locale=True, competence_statement="Invented test role, not a real reviewer.",
                reviewed_in_game=True, reviewed_all_player_facing_content=True, review_notes="Synthetic content review only.",
                reviewed_at="2025-01-01T10:20:00Z", outcome="approved"))
            for device in evidence["device_claims"]:
                evidence["physical_checks"].append(dict(common, device=copy.deepcopy(device), tester_id="synthetic-device-tester",
                    tester_is_human=True, method="manual-physical", is_physical=True, started_at="2025-01-01T10:00:00Z",
                    completed_at="2025-01-01T10:20:00Z", critical_bugs_open=0,
                    checks={key: True for key in gate.DEVICE_CHECKS | gate.GAME_DEVICE_CHECKS[game]},
                    observation_notes="Synthetic hardware fixture only.", outcome="pass"))
            evidence["comprehension"]["records"].append(dict(common, id=f"synthetic-locale-{unit}-{locale}",
                participant_ids=[f"synthetic-locale-person-{unit}-{locale}"], observer_id="synthetic-locale-observer",
                observer_is_human=True, method="manual-remote", prior_exposure="Synthetic fixture only.",
                started_at="2025-01-01T10:00:00Z", completed_at="2025-01-01T10:20:00Z",
                findings={"synthetic_example_only": True}, observation_notes="Invented test observation only."))
    report["locale_device_evidence"] = evidence
    report["human_approval"].update(reviewed_locale_device_evidence=True,
        reviewed_locale_comprehension_evidence=True, played_exact_build=True)


def rebind_fixture(report, built):
    """Explicit fixture-only binding when a test intentionally changes catalog bytes."""
    report["build_sha256"] = built["sha256"]
    for cohort in [report] + report.get("story_reports", []) + report.get("study_reports", []):
        cohort["build_sha256"] = built["sha256"]
        for session in cohort.get("sessions", []):
            session["build_sha256"] = built["sha256"]
    evidence = report.get("locale_device_evidence")
    if evidence:
        for row in [evidence] + evidence["language_reviews"] + evidence["physical_checks"] + evidence["comprehension"]["records"]:
            row["build_sha256"] = built["sha256"]
            row["locale_catalog_sha256"] = built["files"].get(gate.LOCALE_CATALOG)


class ReleaseGateTests(unittest.TestCase):
    def setUp(self):
        adopt_test_only_protocol(self)
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
        add_locale_catalog(path, game)
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
        add_locale_evidence(report, game, "1.0.0", built)
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
        report = self.report()
        report["critical_bugs_open"] = None
        report["sessions"] = []
        report["human_approval"]["approved"] = False
        self.write(destination / "human-playtest.json", report)
        self.assertIn("1 staged packages", gate.validate(self.root, staging=True))
        with self.assertRaisesRegex(ValueError, "critical bugs"):
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


class MultiStoryGateTests(unittest.TestCase):
    """Invented fixtures exercise policy; they must never be copied into a candidate."""

    def setUp(self):
        adopt_test_only_protocol(self)
        self.temp = tempfile.TemporaryDirectory(prefix="synthetic-story-gate-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.package = self.root / "release-candidates/keepers-frame/0.1.0"
        (self.package / "build").mkdir(parents=True)
        (self.package / "build/index.html").write_text("<!doctype html><title>Synthetic fixture only</title>")
        self.catalog = {"schema_version": 1, "game": "keepers-frame", "stories": [
            {"id": key, "revision": 1, "title": f"Synthetic {key}", "release_profile": profile}
            for key, profile in gate.VIVID_STORIES.items()]}
        self.write("build/story-catalog.json", self.catalog)
        add_locale_catalog(self.package, "keepers-frame")
        built = gate.inventory(self.package / "build")
        self.digest = built["sha256"]
        self.manifest = {"schema_version": 1, "game": "keepers-frame", "version": "0.1.0",
                         "source_commit": "a" * 40, "build": built}
        self.write("candidate.json", self.manifest)
        (self.package / "notes.md").write_text("# Synthetic fixture\n\n## Changes\nSynthetic test only.\n\n"
            "## Human validation\nSynthetic fixture only, never actual observations.\n\n"
            "## Known limitations\nNot an actual game or release.\n")
        self.report = {"schema_version": 2, "game": "keepers-frame", "version": "0.1.0",
            "build_sha256": self.digest, "critical_bugs_open": 0,
            "story_reports": [self.story_report(story, profile) for story, profile in gate.VIVID_STORIES.items()],
            "study_reports": [], "human_approval": {"approved": True, "reviewer_is_human": True,
                "reviewed_manual_evidence": True, "reviewer_id": "synthetic-independent-reviewer",
                "reviewed_at": "2025-01-01T12:00:00Z"}}
        add_locale_evidence(self.report, "keepers-frame", "0.1.0", built)
        self.write("human-playtest.json", self.report)

    def write(self, path, value):
        (self.package / path).write_text(json.dumps(value, indent=2) + "\n")

    def story_report(self, story, profile, condition="remembered"):
        criteria = gate.NEUTRAL_CRITERIA if condition == "neutral" else gate.STORY_CRITERIA[profile]
        _, groups, _ = criteria
        sessions = [{"id": f"synthetic-{story}-{condition}-{i}", "story_id": story, "condition": condition,
            "participant_count": 1, "participant_ids": [f"synthetic-person-{story}-{condition}-{i}"],
            "method": "manual-in-person", "observer_is_human": True, "observer_id": f"synthetic-observer-{story}",
            "build_sha256": self.digest, "started_at": "2025-01-01T10:00:00Z",
            "completed_at": "2025-01-01T10:10:00Z", "observation_notes": "Synthetic fixture, not a real observation.",
            "metrics": {metric: metric != "expected_unrestricted_ai" for group in groups for metric in group}}
            for i in range(6)]
        return {"story_id": story, "release_profile": profile, "condition": condition,
            "build_sha256": self.digest, "critical_bugs_open": 0,
            "protocol": {"sampling_rule": "first-six-predeclared-sessions", "registered_at": "2025-01-01T00:00:00Z",
                         "session_ids": [s["id"] for s in sessions]}, "sessions": sessions}

    def check(self, ready=True):
        self.write("human-playtest.json", self.report)
        return gate.validate_package(self.package, "keepers-frame", "0.1.0", ready=ready)

    def refresh_inventory(self):
        self.manifest["build"] = gate.inventory(self.package / "build")
        self.digest = self.manifest["build"]["sha256"]
        rebind_fixture(self.report, self.manifest["build"])
        self.write("candidate.json", self.manifest)

    def git(self, *args):
        return subprocess.check_output(["git", "-C", str(self.root), *args], stderr=subprocess.DEVNULL).decode().strip()

    def stage_and_promote_fixture(self, version="0.1.0"):
        """Construct only local synthetic Git history to exercise immutable provenance."""
        self.git("init", "-b", "main")
        self.git("config", "user.email", "synthetic-test@example.invalid")
        self.git("config", "user.name", "Synthetic Test Fixture")
        (self.root / "data").mkdir()
        (self.root / gate.REGISTRY).write_text(json.dumps({"schema_version": 1, "releases": []}))
        self.git("add", "data")
        self.git("commit", "-m", "Synthetic empty registry")
        base = self.git("rev-parse", "HEAD")
        self.git("checkout", "-b", "master")
        self.manifest["source_commit"] = base
        self.manifest["version"] = version
        self.write("candidate.json", self.manifest)
        if version != self.package.name:
            renamed = self.package.with_name(version)
            self.package.rename(renamed)
            self.package = renamed
        self.git("add", "release-candidates")
        self.git("commit", "-m", "Synthetic candidate, not human evidence")
        master = self.git("rev-parse", "HEAD")
        self.git("update-ref", "refs/remotes/origin/master", master)
        saved = self.root / "saved-packet"
        shutil.copytree(self.package, saved)
        self.git("checkout", "main")
        self.package = self.root / f"releases/keepers-frame/{version}"
        self.package.parent.mkdir(parents=True)
        shutil.move(saved, self.package)
        entry = {"game": "keepers-frame", "version": version, "tag": f"keepers-frame-v{version}",
            "source_master_commit": master, "path": f"releases/keepers-frame/{version}/build/index.html",
            "notes_path": f"releases/keepers-frame/{version}/notes.md",
            "release_url": f"https://github.com/PaperStrange/IndiaGames/releases/tag/keepers-frame-v{version}",
            "released_at": "2025-01-02T00:00:00Z"}
        (self.root / gate.REGISTRY).write_text(json.dumps({"schema_version": 1, "releases": [entry]}))
        return base

    def test_two_stories_pass_with_independent_approval(self):
        self.check()
        for item in self.report["story_reports"]:
            for session in item["sessions"][4:]:
                session["metrics"]["completed_unassisted"] = False
        self.check()  # Exactly 4/6 meet both dimensions for both stories.

    def test_each_story_requires_joint_completion_and_explanation(self):
        for index in (0, 1):
            with self.subTest(story=index):
                saved = copy.deepcopy(self.report)
                item = self.report["story_reports"][index]
                explanation = next(metric for metric in item["sessions"][0]["metrics"] if metric.startswith("explained_"))
                for i, session in enumerate(item["sessions"]):
                    session["metrics"]["completed_unassisted"] = i < 4
                    session["metrics"][explanation] = i >= 2  # Four each, only two people achieved both.
                with self.assertRaisesRegex(ValueError, "criteria failed"):
                    self.check()
                self.report = saved

    def test_iona_ai_expectations_boundary(self):
        sessions = self.report["story_reports"][0]["sessions"]
        sessions[0]["metrics"]["expected_unrestricted_ai"] = True
        self.check()
        sessions[1]["metrics"]["expected_unrestricted_ai"] = True
        with self.assertRaisesRegex(ValueError, "criteria failed"):
            self.check()

    def test_new_vivid_cannot_use_legacy_report_or_omit_catalog(self):
        self.report["schema_version"] = 1
        with self.assertRaisesRegex(ValueError, "schema 2"):
            self.check(ready=False)
        (self.package / "build/story-catalog.json").unlink()
        self.refresh_inventory()
        with self.assertRaisesRegex(ValueError, "require build/story-catalog"):
            self.check(ready=False)

    def test_catalog_is_hashed_and_profile_cannot_be_content_defined(self):
        self.catalog["stories"][1]["release_profile"] = "easy-mode-one-person"
        self.write("build/story-catalog.json", self.catalog)
        with self.assertRaisesRegex(ValueError, "inventory"):
            self.check()
        self.refresh_inventory()
        with self.assertRaisesRegex(ValueError, "reviewed policy"):
            self.check()

    def test_catalog_cannot_hide_duplicate_or_unknown_shipping_story(self):
        for mutation in ("missing", "duplicate", "unknown"):
            with self.subTest(mutation=mutation):
                original = copy.deepcopy(self.catalog)
                if mutation == "missing":
                    self.catalog["stories"].pop()
                elif mutation == "duplicate":
                    self.catalog["stories"][1] = self.catalog["stories"][0]
                else:
                    self.catalog["stories"][1]["id"] = "unreviewed"
                self.write("build/story-catalog.json", self.catalog)
                self.refresh_inventory()
                with self.assertRaises(ValueError):
                    self.check(ready=False)
                self.catalog = original

    def test_missing_extra_duplicate_and_mismatched_reports_fail(self):
        for mutation in ("missing", "extra", "duplicate", "profile", "condition", "story"):
            with self.subTest(mutation=mutation):
                original = copy.deepcopy(self.report)
                rows = self.report["story_reports"]
                if mutation == "missing":
                    rows.pop()
                elif mutation == "extra":
                    rows.append(copy.deepcopy(rows[0]))
                elif mutation == "duplicate":
                    rows[1] = copy.deepcopy(rows[0])
                elif mutation == "profile":
                    rows[1]["release_profile"] = "iona-return-v1"
                elif mutation == "condition":
                    rows[0]["condition"] = "neutral"
                else:
                    rows[0]["story_id"] = "unlisted"
                with self.assertRaises(ValueError):
                    self.check(ready=False)
                self.report = original

    def test_every_report_and_session_must_use_same_bundle(self):
        for target in (self.report, self.report["story_reports"][0], self.report["story_reports"][1]["sessions"][0]):
            target["build_sha256"] = "0" * 64
            with self.assertRaisesRegex(ValueError, "build"):
                self.check()
            target["build_sha256"] = self.digest

    def test_story_cohorts_and_sessions_must_be_distinct(self):
        first, second = self.report["story_reports"]
        second["sessions"][0]["participant_ids"] = first["sessions"][0]["participant_ids"]
        with self.assertRaisesRegex(ValueError, "distinct participants across"):
            self.check()
        second["sessions"][0]["participant_ids"] = ["synthetic-new-person"]
        second["sessions"][0]["id"] = first["sessions"][0]["id"]
        second["protocol"]["session_ids"][0] = first["sessions"][0]["id"]
        with self.assertRaisesRegex(ValueError, "unique across"):
            self.check()

    def test_reviewer_cannot_observe_or_participate_in_either_story(self):
        for row in self.report["story_reports"]:
            for person in (row["sessions"][0]["observer_id"], row["sessions"][0]["participant_ids"][0]):
                self.report["human_approval"]["reviewer_id"] = person
                with self.assertRaisesRegex(ValueError, "independent"):
                    self.check()

    def test_zero_critical_bugs_global_and_per_story(self):
        for target in (self.report, *self.report["story_reports"]):
            target["critical_bugs_open"] = 1
            with self.assertRaisesRegex(ValueError, "critical bugs"):
                self.check()
            target["critical_bugs_open"] = 0

    def test_session_identity_cannot_mix_conditions(self):
        self.report["story_reports"][0]["sessions"][0]["condition"] = "neutral"
        with self.assertRaisesRegex(ValueError, "story or condition mismatch"):
            self.check()

    def test_optional_neutral_study_does_not_replace_shipping_cohorts(self):
        neutral = self.story_report("iona", "iona-neutral-v1", "neutral")
        for session in neutral["sessions"]:
            session["metrics"] = {key: False for key in session["metrics"]}
        self.report["study_reports"] = [neutral]
        self.check()  # Optional study has no comparative efficacy threshold.
        self.report["story_reports"].pop(0)
        with self.assertRaisesRegex(ValueError, "exactly one report"):
            self.check()

    def test_optional_neutral_study_is_independent_and_reviewed(self):
        neutral = self.story_report("iona", "iona-neutral-v1", "neutral")
        self.report["study_reports"] = [neutral]
        neutral["sessions"][0]["participant_ids"] = self.report["story_reports"][0]["sessions"][0]["participant_ids"]
        with self.assertRaisesRegex(ValueError, "distinct participants across"):
            self.check()
        neutral["sessions"][0]["participant_ids"] = ["synthetic-neutral-person"]
        self.report["human_approval"]["reviewer_id"] = "synthetic-neutral-person"
        with self.assertRaisesRegex(ValueError, "independent"):
            self.check()

    def test_pending_humans_can_stage_but_never_release(self):
        self.report["critical_bugs_open"] = None
        self.report["human_approval"]["approved"] = False
        for row in self.report["story_reports"]:
            row["sessions"] = []
            row["critical_bugs_open"] = None
        self.check(ready=False)
        with self.assertRaisesRegex(ValueError, "critical bugs"):
            self.check()

    def test_multistory_promotion_keeps_immutable_master_provenance(self):
        base = self.stage_and_promote_fixture()
        self.assertIn("1 official releases", gate.validate(self.root, base_ref=base))
        self.report["story_reports"][1]["sessions"][0]["observation_notes"] += " unstaged alteration"
        self.write("human-playtest.json", self.report)
        with self.assertRaisesRegex(ValueError, "differs from the immutable master"):
            gate.validate(self.root, base_ref=base)

    def test_legacy_schema_one_archive_readable_but_not_new_candidate(self):
        # The internal compatibility path is selected only for an immutable trusted-base release.
        (self.package / "build/story-catalog.json").unlink()
        self.refresh_inventory()
        self.manifest["version"] = "0.0.1"
        self.write("candidate.json", self.manifest)
        row = self.report["story_reports"][0]
        digest = self.manifest["build"]["sha256"]
        row["build_sha256"] = digest
        for session in row["sessions"]:
            session["build_sha256"] = digest
        report = dict(row, schema_version=1, game="keepers-frame", version="0.0.1",
                      human_approval=self.report["human_approval"])
        self.write("human-playtest.json", report)
        with self.assertRaisesRegex(ValueError, "require build/story-catalog"):
            gate.validate_package(self.package, "keepers-frame", "0.0.1")
        gate.validate_package(self.package, "keepers-frame", "0.0.1", allow_legacy_vivid=True, allow_legacy_locale=True)
        base = self.stage_and_promote_fixture(version="0.0.1")
        with self.assertRaisesRegex(ValueError, "require build/story-catalog"):
            gate.validate(self.root, base_ref=base)
        # Simulate a release that predated this policy; do not create a real promotion.
        self.git("add", "data", "releases")
        self.git("commit", "-m", "Synthetic historical legacy release")
        archived_base = self.git("rev-parse", "HEAD")
        self.assertIn("1 official releases", gate.validate(self.root, base_ref=archived_base))
        (self.package / "notes.md").write_text("An attempted rewrite of historical notes")
        with self.assertRaisesRegex(ValueError, "released file is immutable"):
            gate.validate(self.root, base_ref=archived_base)

    def test_blank_multistory_template_cannot_approve(self):
        template = gate.read_json(SCRIPTS.parent / "templates/release-candidate/human-playtest.vivid.json")
        self.report = template
        with self.assertRaises(ValueError):
            self.check()


class LocaleDeviceGateTests(unittest.TestCase):
    """Real gate behavior with explicitly invented local-only protocol/evidence fixtures."""

    setUp = MultiStoryGateTests.setUp
    write = MultiStoryGateTests.write
    story_report = MultiStoryGateTests.story_report
    check = MultiStoryGateTests.check
    refresh_inventory = MultiStoryGateTests.refresh_inventory

    @property
    def evidence(self):
        return self.report["locale_device_evidence"]

    def test_complete_supplement_passes_only_under_explicit_test_policy(self):
        self.check()
        with patch.dict(gate.REVIEWED_LOCALE_PROTOCOLS, {}, clear=True):
            with self.assertRaisesRegex(ValueError, "protocol is not adopted"):
                self.check()

    def test_candidate_cannot_self_approve_pending_protocol_or_borrow_other_game(self):
        self.evidence["comprehension"]["protocol_id"] = "candidate-approved-protocol"
        with self.assertRaisesRegex(ValueError, "protocol is not adopted"):
            self.check()
        self.evidence["comprehension"]["protocol_id"] = "synthetic-protocol-not-for-release"
        with patch.dict(gate.REVIEWED_LOCALE_PROTOCOLS, {
            ("small-hours", "synthetic-protocol-not-for-release"):
                {"sha256": "c" * 64, "validate": synthetic_comprehension_protocol}}, clear=True):
            with self.assertRaisesRegex(ValueError, "protocol is not adopted"):
                self.check()

    def test_catalog_requires_exact_three_locales_and_all_units(self):
        path = self.package / "build/locale-catalog.json"
        original = gate.read_json(path)
        for mutation in ("missing-locale", "duplicate-locale", "wrong-default", "missing-unit",
                         "duplicate-unit", "unit-locale", "renamed-story", "unknown-field", "boolean-schema"):
            with self.subTest(mutation=mutation):
                catalog = copy.deepcopy(original)
                if mutation == "missing-locale": catalog["locales"].remove("ja")
                elif mutation == "duplicate-locale": catalog["locales"].append("en")
                elif mutation == "wrong-default": catalog["default_locale"] = "ja"
                elif mutation == "missing-unit": catalog["units"].pop()
                elif mutation == "duplicate-unit": catalog["units"][1] = catalog["units"][0]
                elif mutation == "unit-locale": catalog["units"][1]["locales"].remove("zh-Hans")
                elif mutation == "renamed-story": catalog["units"][1]["id"] = "mara-ja"
                elif mutation == "unknown-field": catalog["approved"] = True
                else: catalog["schema_version"] = True
                self.write("build/locale-catalog.json", catalog)
                self.refresh_inventory()
                with self.assertRaises(ValueError): self.check(ready=False)
        self.write("build/locale-catalog.json", original)
        self.refresh_inventory()
        self.check(ready=False)

    def test_catalog_and_supplement_identity_cannot_be_stale(self):
        path = self.package / "build/locale-catalog.json"
        path.write_text(path.read_text() + "\n")
        with self.assertRaisesRegex(ValueError, "inventory"): self.check(ready=False)
        stale = copy.deepcopy(self.evidence)
        self.refresh_inventory()  # Product reports follow the new bytes; supplemental identity deliberately does not.
        self.report["locale_device_evidence"] = stale
        with self.assertRaisesRegex(ValueError, "exact build and catalog"): self.check(ready=False)

    def test_new_candidate_requires_supplement_and_rejects_sidecar(self):
        original = copy.deepcopy(self.evidence)
        del self.report["locale_device_evidence"]
        with self.assertRaisesRegex(ValueError, "locale/device evidence"): self.check(ready=False)
        self.report["locale_device_evidence"] = original
        self.write("locale-review.json", original)
        with self.assertRaisesRegex(ValueError, "package must contain"): self.check(ready=False)

    def test_lower_version_or_old_schema_does_not_opt_out(self):
        (self.package / "build/locale-catalog.json").unlink()
        self.refresh_inventory()
        for version in ("0.0.0", "0.0.1", "0.1.0", "99.0.0"):
            with self.subTest(version=version):
                self.manifest["version"] = version
                self.report["version"] = version
                self.write("candidate.json", self.manifest)
                self.write("human-playtest.json", self.report)
                with self.assertRaisesRegex(ValueError, "require build/locale-catalog"):
                    gate.validate_package(self.package, "keepers-frame", version, ready=False)

    def test_pending_blank_supplement_can_stage_but_never_approve(self):
        for field in ("language_reviews", "device_claims", "physical_checks"):
            self.evidence[field] = []
        self.evidence["comprehension"] = {"protocol_id": None, "protocol_sha256": None,
                                          "registered_at": None, "records": []}
        self.check(ready=False)
        with self.assertRaisesRegex(ValueError, "missing fluent review"): self.check()

    def test_language_review_covers_every_story_locale(self):
        original = copy.deepcopy(self.evidence["language_reviews"])
        self.evidence["language_reviews"].pop()
        with self.assertRaisesRegex(ValueError, "missing fluent review"): self.check()
        self.evidence["language_reviews"] = original + [copy.deepcopy(original[0])]
        with self.assertRaisesRegex(ValueError, "duplicate language"): self.check()

    def test_language_attestations_require_real_fluent_in_game_review(self):
        original = copy.deepcopy(self.evidence["language_reviews"][0])
        for field, value in (("reviewer_is_human", False), ("fluent_in_locale", "true"),
                ("competence_statement", None), ("reviewed_in_game", False),
                ("reviewed_all_player_facing_content", False), ("review_notes", "TODO"),
                ("outcome", "draft"), ("reviewer_id", None), ("evidence_reference", None)):
            with self.subTest(field=field):
                self.evidence["language_reviews"][0] = dict(original, **{field: value})
                with self.assertRaises(ValueError): self.check()

    def test_all_declared_hardware_and_all_language_unit_cells_required(self):
        original = copy.deepcopy(self.evidence)
        self.evidence["device_claims"] = [x for x in self.evidence["device_claims"] if x["device_family"] != "tablet"]
        with self.assertRaisesRegex(ValueError, "desktop_web, phone and tablet"): self.check()
        self.report["locale_device_evidence"] = copy.deepcopy(original)
        self.evidence["physical_checks"].pop()
        with self.assertRaisesRegex(ValueError, "every claimed device"): self.check()
        self.report["locale_device_evidence"] = copy.deepcopy(original)
        extra = dict(self.evidence["device_claims"][0], id="synthetic-unseen-device")
        self.evidence["device_claims"].append(extra)
        with self.assertRaisesRegex(ValueError, "every claimed device"): self.check()

    def test_emulation_and_different_observed_configuration_cannot_fill_physical_cell(self):
        original = copy.deepcopy(self.evidence["physical_checks"][0])
        for field, value in (("is_physical", False), ("tester_is_human", False),
                             ("method", "browser-automation"), ("tester_id", None)):
            with self.subTest(field=field):
                self.evidence["physical_checks"][0] = dict(original, **{field: value})
                with self.assertRaisesRegex(ValueError, "actual hardware"): self.check()
        self.evidence["physical_checks"][0] = copy.deepcopy(original)
        self.evidence["physical_checks"][0]["device"]["browser_version"] = "unobserved version"
        with self.assertRaisesRegex(ValueError, "observed hardware"): self.check()

    def test_physical_coverage_retains_critical_journey_and_failure_semantics(self):
        original = copy.deepcopy(self.evidence["physical_checks"][0])
        for field, value in (("outcome", "fail"), ("critical_bugs_open", 1),
                             ("critical_bugs_open", False), ("observation_notes", "TBD")):
            with self.subTest(field=field, value=value):
                self.evidence["physical_checks"][0] = dict(original, **{field: value})
                with self.assertRaises(ValueError): self.check()
        self.evidence["physical_checks"][0] = copy.deepcopy(original)
        self.evidence["physical_checks"][0]["checks"]["flat_fallback"] = False
        with self.assertRaisesRegex(ValueError, "critical journeys"): self.check()
        self.evidence["physical_checks"][0] = copy.deepcopy(original)
        self.evidence["physical_checks"].append(copy.deepcopy(original))
        with self.assertRaisesRegex(ValueError, "duplicate physical"): self.check()

    def test_each_observation_requires_exact_build_and_catalog(self):
        for group in ("language_reviews", "physical_checks"):
            for field in ("build_sha256", "locale_catalog_sha256"):
                with self.subTest(group=group, field=field):
                    original = self.evidence[group][0][field]
                    self.evidence[group][0][field] = "0" * 64
                    with self.assertRaisesRegex(ValueError, "observation build/catalog"): self.check()
                    self.evidence[group][0][field] = original

    def test_approver_independence_extends_to_all_supplemental_roles(self):
        comp = self.evidence["comprehension"]["records"][0]
        for actor in (self.evidence["language_reviews"][0]["reviewer_id"],
                      self.evidence["physical_checks"][0]["tester_id"], comp["observer_id"], comp["participant_ids"][0]):
            with self.subTest(actor=actor):
                self.report["human_approval"]["reviewer_id"] = actor
                with self.assertRaisesRegex(ValueError, "independent of language"): self.check()

    def test_final_approval_must_explicitly_cover_new_evidence(self):
        for field in ("reviewed_locale_device_evidence", "reviewed_locale_comprehension_evidence", "played_exact_build"):
            with self.subTest(field=field):
                self.report["human_approval"][field] = False
                with self.assertRaisesRegex(ValueError, "explicitly cover"): self.check()
                self.report["human_approval"][field] = True
        self.evidence["language_reviews"][0]["reviewed_at"] = "2025-01-01T13:00:00Z"
        with self.assertRaisesRegex(ValueError, "follow all locale/device"): self.check()

    def test_adopted_protocol_is_pinned_preregistered_and_executed(self):
        comp = self.evidence["comprehension"]
        comp["protocol_sha256"] = "0" * 64
        with self.assertRaisesRegex(ValueError, "protocol hash mismatch"): self.check()
        comp["protocol_sha256"] = "c" * 64
        comp["registered_at"] = "2025-01-01T11:00:00Z"
        with self.assertRaisesRegex(ValueError, "register locale protocol"): self.check()
        comp["registered_at"] = "2025-01-01T00:00:00Z"
        comp["records"][0]["findings"] = {"synthetic_example_only": False}
        with self.assertRaisesRegex(ValueError, "synthetic protocol criteria"): self.check()

    def test_unknown_supplement_fields_are_not_ignored(self):
        self.evidence["waive_humans"] = True
        with self.assertRaisesRegex(ValueError, "exactly the documented"): self.check(ready=False)

    def test_staging_exception_is_exact_packet_identity_not_version_range(self):
        (self.package / "build/locale-catalog.json").unlink()
        self.refresh_inventory()
        del self.report["locale_device_evidence"]
        self.write("human-playtest.json", self.report)
        files = gate.files_under(self.package)
        import hashlib
        hashes = {name: hashlib.sha256(data).hexdigest() for name, data in files.items()}
        digest = hashlib.sha256(json.dumps(hashes, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
        with patch.dict(gate.LEGACY_STAGED_PACKETS, {"keepers-frame/0.1.0": digest}):
            self.check(ready=False)
            with self.assertRaisesRegex(ValueError, "require build/locale-catalog"): self.check()
            (self.package / "notes.md").write_text("Changed old packet")
            with self.assertRaisesRegex(ValueError, "require build/locale-catalog"): self.check(ready=False)


if __name__ == "__main__":
    unittest.main()
