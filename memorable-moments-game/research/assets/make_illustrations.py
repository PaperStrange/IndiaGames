#!/usr/bin/env python3
"""Generate SVG illustrations for the memorable-moments-game research report."""
import os

OUT = os.path.expanduser("~/workspace/memorable-moments-game/research/assets/illustrations")
os.makedirs(OUT, exist_ok=True)

STYLE = """<style>
text{font-family:'Segoe UI',system-ui,-apple-system,sans-serif}
.title{font-size:20px;font-weight:700;fill:#1a1a2e}
.sub{font-size:12.5px;fill:#55556a}
.node{fill:#ffffff;stroke:#4f46e5;stroke-width:2}
.nodet{font-size:13px;font-weight:700;fill:#1a1a2e}
.noded{font-size:11px;fill:#55556a}
.warn{fill:#fff7ed;stroke:#f59e0b;stroke-width:2}
.warnt{font-size:13px;font-weight:700;fill:#92400e}
.tag{font-size:10.5px;font-weight:700}
</style>"""

def arrow(x1, y1, x2, y2, color="#4f46e5"):
    # direction-aware arrowhead: tip at (x2,y2), wings folded back along the line
    import math
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L
    bx, by = x2 - 9 * ux, y2 - 9 * uy
    nx, ny = -uy * 5, ux * 5
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="2.5"/>'
            f'<polygon points="{x2},{y2} {bx+nx:.1f},{by+ny:.1f} {bx-nx:.1f},{by-ny:.1f}" fill="{color}"/>')

def box(x, y, w, h, title, desc, fill="#ffffff", stroke="#4f46e5"):
    t = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{fill}" stroke="{stroke}" stroke-width="2"/>'
         f'<text x="{x+w/2}" y="{y+26}" text-anchor="middle" class="nodet">{title}</text>')
    yy = y + 46
    for line in desc:
        t += f'<text x="{x+w/2}" y="{yy}" text-anchor="middle" class="noded">{line}</text>'
        yy += 16
    return t

# 1. Locked-reveal loop
nodes = [
    ("Mission dealt", ["sealed, hint only", "no backing out"]),
    ("Commit", ["both lock in", "countdown"]),
    ("Reveal", ["simultaneous", "anticipation peak"]),
    ("Do it together", ["same time window", "shared effort"]),
    ("Capture bell", ["one focused beat", "visual, deliberate"]),
    ("Co-retelling", ["tell it together", "this IS encoding"]),
    ("Archive", ["co-owned", "day-one export"]),
]
W, H = 1240, 380
s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#fafaf8" rx="16"/>{STYLE}']
s.append(f'<text x="30" y="40" class="title">The locked-reveal loop — the category\'s strongest-evidenced mechanic</text>')
s.append(f'<text x="30" y="62" class="sub">Each stage is evidence-backed; the digital transfer of the commit/reveal beat is validation gate #1 [OPEN]</text>')
n, bw, gap, y0 = len(nodes), 150, 22, 110
x = 24
for i, (t, d) in enumerate(nodes):
    s.append(box(x, y0, bw, 110, t, d))
    if i < n - 1:
        s.append(arrow(x + bw, y0 + 55, x + bw + gap, y0 + 55))
    x += bw + gap
s.append(f'<text x="30" y="{y0+200}" class="sub">Physical proof: scratch-to-reveal (Adventure Challenge, 5M+ company-claimed) · Digital proof: answer-lock (Paired) · Neuroscience: curiosity gap boosts recollection (Gruber 2014)</text>')
s.append(f'<text x="30" y="{y0+224}" class="sub" fill="#92400e">Cautionary shape: reveal WITHOUT stake = a button tap (OurCouple generator tried first-hand: instant card, unlimited spins, zero commitment)</text>')
open('f"{OUT}/reveal-loop.svg"', 'w') if False else None
with open(f"{OUT}/reveal-loop.svg", "w") as f:
    f.write("\n".join(s) + "</svg>")

# 2. Peak-end curve
W, H = 900, 380
s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#fafaf8" rx="16"/>{STYLE}']
s.append('<text x="30" y="40" class="title">Design the peak and the ending — duration buys almost nothing</text>')
s.append('<text x="30" y="62" class="sub">Peak-end rule (Kahneman 1993): remembered utility = peak + end, not duration</text>')
s.append('<line x1="70" y1="300" x2="830" y2="300" stroke="#999" stroke-width="1.5"/>')
s.append('<line x1="70" y1="300" x2="70" y2="90" stroke="#999" stroke-width="1.5"/>')
s.append('<text x="830" y="322" text-anchor="end" class="sub">time →</text>')
s.append('<text x="52" y="100" text-anchor="end" class="sub">intensity</text>')
path = "M70,270 C180,265 230,260 300,255 C360,250 380,140 450,135 C520,130 540,210 620,205 C700,200 760,190 830,185"
s.append(f'<path d="{path}" fill="none" stroke="#4f46e5" stroke-width="4"/>')
s.append('<circle cx="450" cy="135" r="9" fill="#e11d48"/><text x="450" y="110" text-anchor="middle" class="tag" fill="#e11d48">ONE ENGINEERED PEAK</text>')
s.append('<circle cx="830" cy="185" r="9" fill="#0d9488"/><text x="800" y="160" text-anchor="end" class="tag" fill="#0d9488">WARM SHARED ENDING</text>')
s.append('<text x="180" y="292" text-anchor="middle" class="sub">no filler — flat stretches add nothing to memory</text>')
with open(f"{OUT}/peak-end.svg", "w") as f:
    f.write("\n".join(s) + "</svg>")

# 3. Collision
W, H = 1000, 340
s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#fafaf8" rx="16"/>{STYLE}']
s.append('<text x="30" y="40" class="title">The open collision: #3 vs #6 — both cannot hold as stated</text>')
s.append(box(30, 90, 300, 130, "Finding #3", ["everyone acts in the", "same time window", "synchrony bonds [REAL]"]))
s.append(box(670, 90, 300, 130, "Finding #6", ["loop must complete with", "a passive partner", "top killer [SECONDARY]"]))
s.append(arrow(330, 155, 420, 155, "#e11d48"))
s.append(arrow(670, 155, 580, 155, "#e11d48"))
s.append(f'<rect x="430" y="105" width="140" height="100" rx="12" class="warn"/>'.replace('class="warn"', 'fill="#fff7ed" stroke="#f59e0b" stroke-width="2"'))
s.append('<text x="500" y="145" text-anchor="middle" class="warnt">⚠ [OPEN]</text>')
s.append('<text x="500" y="170" text-anchor="middle" class="noded">gated, not resolved</text>')
s.append('<text x="500" y="190" text-anchor="middle" class="noded">pilot must test</text>')
s.append('<text x="30" y="270" class="sub">First pilot: measure closeness gain with one passive player vs two active. The plan must name which side gives —</text>')
s.append('<text x="30" y="292" class="sub">narrow to motivated pairs + gift acquisition, or prove passivity-tolerant bonding. Until then, neither "kills async" nor "survives passivity" is settled.</text>')
with open(f"{OUT}/collision.svg", "w") as f:
    f.write("\n".join(s) + "</svg>")

# 4. Threat-ranked gates
gates = [
    ("1", "Prove the reveal/commitment loop works DIGITALLY", "#e11d48"),
    ("2", "#3 vs #6 collision: which side gives?", "#e11d48"),
    ("3", "One game or three editions? (couples / friends / family)", "#f59e0b"),
    ("4", "Content supply past month 12", "#f59e0b"),
    ("5", "LDR segment vs location-bound missions", "#f59e0b"),
    ("6", "Synchrony transfer — residual: phone-mediated only", "#0d9488"),
    ("7", "Consent / takedown policy for shared captures", "#0d9488"),
]
W, H = 1000, 480
s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#fafaf8" rx="16"/>{STYLE}']
s.append('<text x="30" y="40" class="title">Open decision gates, threat-ranked</text>')
s.append('<text x="30" y="62" class="sub">2026-10-03 ruling: digital/virtual is the priority form factor — gate 1 is now the whole ballgame</text>')
y = 100
for num, label, color in gates:
    w = 940 - (int(num) - 1) * 70
    s.append(f'<rect x="30" y="{y}" width="{w}" height="40" rx="8" fill="{color}" opacity="0.85"/>')
    s.append(f'<text x="48" y="{y+26}" font-size="14" font-weight="700" fill="#ffffff">{num} · {label}</text>')
    y += 50
with open(f"{OUT}/gates.svg", "w") as f:
    f.write("\n".join(s) + "</svg>")

# 5. Digital gap
W, H = 1000, 400
s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#fafaf8" rx="16"/>{STYLE}']
s.append('<text x="30" y="40" class="title">The unbuilt combination — nobody has shipped this digitally</text>')
s.append(box(30, 90, 280, 120, "Blind mutual reveal", ["Paired proved it", "answer-lock works"], fill="#eef2ff"))
s.append('<text x="170" y="228" text-anchor="middle" class="tag" fill="#4f46e5">PROVEN</text>')
s.append(box(360, 90, 280, 120, "Shared trophy case", ["Between proved it", "35M claimed"], fill="#eef2ff"))
s.append('<text x="500" y="228" text-anchor="middle" class="tag" fill="#4f46e5">PROVEN</text>')
s.append(box(690, 90, 280, 120, "Real stake mechanic", ["limited rounds / timer", "forfeit — unrepeatable"], fill="#fff7ed", stroke="#f59e0b"))
s.append('<text x="830" y="228" text-anchor="middle" class="tag" fill="#92400e">UNBUILT</text>')
s.append(arrow(170, 250, 170, 285)); s.append(arrow(500, 250, 500, 285)); s.append(arrow(830, 250, 830, 285))
s.append(f'<rect x="300" y="285" width="400" height="70" rx="12" fill="#4f46e5"/>')
s.append('<text x="500" y="313" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff">The design opening</text>')
s.append('<text x="500" y="336" text-anchor="middle" font-size="12" fill="#e0e7ff">reveal + trophy case + stake, in one digital loop</text>')
with open(f"{OUT}/digital-gap.svg", "w") as f:
    f.write("\n".join(s) + "</svg>")

print("done:", os.listdir(OUT))
