#!/usr/bin/env python3
"""Create GitHub Releases after approved promotion to main; default is a local dry run."""
import argparse
import importlib.util
import json
import os
from pathlib import Path
import sys
from urllib.error import HTTPError
from urllib.request import Request, urlopen

spec = importlib.util.spec_from_file_location("gate", Path(__file__).with_name("validate-release.py"))
gate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate)


def api(method, path, data=None):
    token = os.environ.get("GH_TOKEN")
    gate.require(token, "GH_TOKEN is required only for --apply")
    request = Request("https://api.github.com/repos/PaperStrange/IndiaGames/" + path,
                      data=json.dumps(data).encode() if data is not None else None,
                      headers={"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json",
                               "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json"},
                      method=method)
    try:
        with urlopen(request, timeout=30) as response:
            return json.load(response)
    except HTTPError as error:
        if method == "GET" and error.code == 404:
            return None
        raise ValueError(f"GitHub {method} {path} failed with HTTP {error.code}") from error


def publish(root, base_ref, head_ref, apply=False, call=api):
    gate.require(gate.SHA.fullmatch(head_ref), "full main commit SHA required")
    gate.require(gate.git(root, "rev-parse", "HEAD").decode().strip() == head_ref,
                 "checkout must match the exact main commit being released")
    if apply:
        gate.git(root, "merge-base", "--is-ancestor", head_ref, "refs/remotes/origin/main")
    gate.validate(root, base_ref=base_ref)
    previous = gate.tree(root, base_ref, gate.REGISTRY) if base_ref else {}
    old = gate.registry(gate.decode(previous[gate.REGISTRY])) if gate.REGISTRY in previous else {}
    current = gate.registry(gate.read_json(root / gate.REGISTRY))
    published = []
    for key in sorted(current.keys() - old.keys()):
        entry = current[key]
        tag, notes = entry["tag"], (root / entry["notes_path"]).read_text(encoding="utf-8")
        if apply:
            ref = call("GET", f"git/ref/tags/{tag}")
            if ref is None:
                call("POST", "git/refs", {"ref": f"refs/tags/{tag}", "sha": head_ref})
            else:
                obj = ref["object"]
                # Accept an existing annotated tag only if it peels to this exact main commit.
                for _ in range(8):
                    if obj["type"] != "tag":
                        break
                    obj = call("GET", "git/tags/" + obj["sha"])["object"]
                gate.require(obj["type"] == "commit" and obj["sha"] == head_ref,
                             f"refusing to move existing tag {tag}")
            existing = call("GET", f"releases/tags/{tag}")
            if existing is not None:
                gate.require(existing["tag_name"] == tag and existing["body"] == notes
                             and not existing["draft"] and not existing["prerelease"],
                             f"existing GitHub Release differs; will not overwrite {tag}")
            else:
                call("POST", "releases", {"tag_name": tag, "target_commitish": head_ref,
                     "name": f"{entry['game']} {entry['version']}", "body": notes,
                     "draft": False, "prerelease": False, "generate_release_notes": False})
        published.append(tag)
    return published


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--base-ref")
    parser.add_argument("--head-ref", required=True)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    try:
        tags = publish(args.root, args.base_ref, args.head_ref, args.apply)
        print(("Published/verified: " if args.apply else "Dry run; would publish: ") + (", ".join(tags) or "none"))
    except (ValueError, KeyError, TypeError, OSError) as error:
        print(f"Release publication failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
