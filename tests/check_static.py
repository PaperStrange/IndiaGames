#!/usr/bin/env python3
"""Static checks for The Thirteenth Bell repo tree. Zero dependencies.

1. node --check on every js/ file (parse-level).
2. data/engine split integrity: every TTB_DATA.<key> referenced in engine.js
   is declared in data.js; engine.js declares no story-data of its own.
3. Asset-reference validation: every relative src/href/url() in index.html,
   css/ and js/ resolves to a file on disk, case-exact.
4. Build reproducibility: create two isolated outputs and compare them. If a
   local dist file exists, check freshness without overwriting it.
"""
import os, re, subprocess, sys, tempfile
from pathlib import Path

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
failures = []

def check(name, cond, detail=""):
    print(("PASS " if cond else "FAIL ") + name + (f" — {detail}" if detail and not cond else ""))
    if not cond:
        failures.append(name)

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, cwd=ROOT)

# 1. syntax
js_files = [os.path.join("js", f) for f in sorted(os.listdir(os.path.join(ROOT, "js"))) if f.endswith(".js")]
check("js files found", len(js_files) > 0)
for jf in js_files:
    r = run(["node", "--check", jf])
    check(f"node --check {jf}", r.returncode == 0, r.stderr.strip()[:200])

# 2. split integrity
data_js = open(os.path.join(ROOT, "js", "data.js")).read()
engine_js = open(os.path.join(ROOT, "js", "engine.js")).read()
declared = set(re.findall(r"^  (\w+):", data_js, re.M))
referenced = set(re.findall(r"TTB_DATA\.(\w+)", engine_js))
check("data.js declares keys", len(declared) >= 5, f"found {sorted(declared)}")
check("engine refs resolve in data.js", referenced <= declared,
      f"unresolved: {sorted(referenced - declared)}")
check("engine declares no extracted story-data vars",
      not re.search(r"^\s*var\s+(icons|loopMeta|worlds|npcScheduleRows|bonds|keepsakes|schedules|risky)\s*=", engine_js, re.M))
check("data.js has no functions/DOM access", "function" not in data_js and "document." not in data_js)

# 3. asset references
refs = set()
html = open(os.path.join(ROOT, "index.html")).read()
refs.update(re.findall(r'(?:src|href)="([^"#]+)"', html))
for css in [os.path.join(ROOT, "css", f) for f in os.listdir(os.path.join(ROOT, "css")) if f.endswith(".css")]:
    refs.update(re.findall(r"url\(([^)]+)\)", open(css).read()))
for jf in js_files:
    refs.update(re.findall(r"""['"]((?:assets|css|js)/[^'"]+)['"]""", open(os.path.join(ROOT, jf)).read()))
refs = {r.strip("'\" ").strip() for r in refs}
refs = {r for r in refs if r and not r.startswith(("data:", "http", "#", "mailto:"))}
missing = [r for r in sorted(refs) if not os.path.isfile(os.path.join(ROOT, r))]
check("asset refs resolve on disk", not missing, f"missing: {missing}")
# case-exactness: the file must exist at exactly the referenced casing
for r in sorted(refs):
    d, base = os.path.split(os.path.join(ROOT, r))
    if os.path.isdir(d):
        check(f"case-exact {r}", base in os.listdir(d))

# 4. dist/ is ignored local output. Validation must not create or replace it.
dist = os.path.join(ROOT, "dist", "thirteenth-bell-playable-demo.html")
existing = Path(dist).read_bytes() if os.path.isfile(dist) else None
with tempfile.TemporaryDirectory(prefix="bell-static-build-") as directory:
    outputs = []
    for number in (1, 2):
        output = Path(directory) / f"build-{number}.html"
        r = run(["node", "build.mjs", "--output", str(output)])
        check(f"isolated build {number} succeeds", r.returncode == 0 and output.is_file(),
              r.stderr.strip()[:200])
        if r.returncode == 0 and output.is_file():
            outputs.append(output.read_bytes())
    if len(outputs) == 2:
        check("isolated builds are byte-identical", outputs[0] == outputs[1])
        if existing is not None:
            check("local dist matches fresh build", existing == outputs[0],
                  "local output is stale; run node build.mjs deliberately to replace it")
check("static validation preserves local dist",
      Path(dist).read_bytes() == existing if existing is not None else not Path(dist).exists())

print()
if failures:
    print(f"{len(failures)} FAILING: {failures}")
    sys.exit(1)
print("all static checks green")
