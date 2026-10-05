#!/usr/bin/env python3
"""Competitor landscape map v2 — all 33 grid products.
x: conversation/keeping -> moment-manufacturing; y: physical -> digital.
Color = platform family (matches report grid tags). Vertical spread inside the
digital band separates families for readability (see caption)."""
import os

OUT = os.path.expanduser("~/workspace/memorable-moments-game/research/assets/illustrations")

W, H = 1080, 680
X0, X1, Y0, Y1 = 90, 1010, 100, 600  # plot area

def px(x01):
    return X0 + x01 * (X1 - X0)

def py(d01):
    return Y1 - d01 * (Y1 - Y0)

# (name, x01 manufacturing, d01 digital, color, label-dx, label-dy)
MOB = "#4f46e5"; PHY = "#e11d48"; PC = "#d97706"; WEB = "#0d9488"
pts = [
    # physical (6)
    ("Adventure Challenge", 0.86, 0.06, PHY, 10, -12),
    ("WNRS", 0.30, 0.06, PHY, 10, 18),
    ("TableTopics", 0.16, 0.04, PHY, 10, -12),
    ("The Skin Deep", 0.28, 0.10, PHY, 10, -12),
    ("BestSelf", 0.22, 0.03, PHY, 10, 18),
    ("Esther Perel", 0.34, 0.08, PHY, 10, 18),
    # PC / console (9)
    ("It Takes Two", 0.88, 0.62, PC, 10, -12),
    ("A Way Out", 0.84, 0.57, PC, 10, 20),
    ("Split Fiction", 0.90, 0.66, PC, -78, -12),
    ("Keep Talking", 0.72, 0.58, PC, 10, -12),
    ("We Were Here", 0.68, 0.63, PC, -78, 16),
    ("Overcooked", 0.78, 0.60, PC, 10, -14),
    ("Lovers in a Dangerous Spacetime", 0.82, 0.53, PC, -190, 22),
    ("Stardew Valley", 0.45, 0.60, PC, 10, -12),
    ("Minecraft", 0.50, 0.56, PC, 10, 18),
    # mobile (12)
    ("Paired", 0.38, 0.78, MOB, 10, -12),
    ("Spicer", 0.52, 0.82, MOB, 10, -12),
    ("Desire", 0.56, 0.78, MOB, 10, 18),
    ("Cozy Couples", 0.36, 0.86, MOB, -84, -12),
    ("Widgetable", 0.27, 0.90, MOB, 10, -12),
    ("Bondly", 0.42, 0.84, MOB, 10, 18),
    ("Between", 0.22, 0.70, MOB, 10, -12),
    ("FamilyAlbum", 0.19, 0.66, MOB, 10, 18),
    ("BackThen", 0.24, 0.74, MOB, -60, -14),
    ("Marco Polo", 0.27, 0.70, MOB, 10, 20),
    ("Cupla", 0.44, 0.72, MOB, 10, -12),
    ("Lasting", 0.33, 0.74, MOB, 10, 18),
    # web (6)
    ("Jackbox", 0.80, 0.88, WEB, 10, -12),
    ("INREDA", 0.62, 0.80, WEB, 10, 18),
    ("Sync or Swim", 0.42, 0.90, WEB, -80, -12),
    ("Couple Storm", 0.66, 0.76, WEB, 10, -12),
    ("Count Together", 0.55, 0.94, WEB, 10, -12),
    ("OurCouple generator", 0.48, 0.80, WEB, 10, 18),
]

s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
s.append(f'<rect width="{W}" height="{H}" fill="#fafaf8" rx="16"/>')
s.append("""<style>text{font-family:'Segoe UI',system-ui,sans-serif}
.t{font-size:20px;font-weight:700;fill:#1a1a2e}.sub{font-size:12px;fill:#55556a}
.ax{font-size:13px;font-weight:700;fill:#1a1a2e}.lb{font-size:10.5px;fill:#33334a}
.star{font-size:13px;font-weight:700;fill:#4f46e5}.note{font-size:11px;fill:#55556a;font-style:italic}</style>""")
s.append('<text x="30" y="38" class="t">Competitor landscape — 33 products mapped</text>')
s.append('<text x="30" y="60" class="sub">x: conversation / keeping → moment-manufacturing · y: physical → digital</text>')

# whitespace quadrant: digital + manufacturing + preserve (capture/share)
s.append(f'<rect x="{px(0.62)}" y="{py(1.0)}" width="{px(1.0)-px(0.62)}" height="{py(0.60)-py(1.0)}" fill="#4f46e5" opacity="0.06" rx="12"/>')
s.append(f'<rect x="{px(0.62)}" y="{py(1.0)}" width="{px(1.0)-px(0.62)}" height="{py(0.60)-py(1.0)}" fill="none" stroke="#4f46e5" stroke-width="2" stroke-dasharray="8,6" rx="12"/>')

# axes
s.append(f'<line x1="{X0}" y1="{Y1}" x2="{X1}" y2="{Y1}" stroke="#999" stroke-width="1.5"/>')
s.append(f'<line x1="{X0}" y1="{Y0}" x2="{X0}" y2="{Y1}" stroke="#999" stroke-width="1.5"/>')
s.append(f'<text x="{X0}" y="{Y1+28}" class="ax">conversation / keeping</text>')
s.append(f'<text x="{X1}" y="{Y1+28}" text-anchor="end" class="ax">moment-manufacturing →</text>')
s.append(f'<text x="{X0-12}" y="{Y1}" text-anchor="end" class="ax">physical</text>')
s.append(f'<text x="{X0-12}" y="{Y0+6}" text-anchor="end" class="ax">digital</text>')

# legend (4 grid families)
s.append(f'<circle cx="{X1-300}" cy="76" r="7" fill="{PHY}"/><text x="{X1-288}" y="80" class="lb">physical</text>')
s.append(f'<circle cx="{X1-215}" cy="76" r="7" fill="{MOB}"/><text x="{X1-203}" y="80" class="lb">mobile</text>')
s.append(f'<circle cx="{X1-135}" cy="76" r="7" fill="{PC}"/><text x="{X1-123}" y="80" class="lb">PC / console</text>')
s.append(f'<circle cx="{X1-300}" cy="98" r="7" fill="{WEB}"/><text x="{X1-288}" y="102" class="lb">web</text>')

for name, x01, d01, color, dx, dy in pts:
    x, y = px(x01), py(d01)
    s.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="7" fill="{color}"/>')
    s.append(f'<text x="{x+dx:.0f}" y="{y+dy:.0f}" class="lb">{name}</text>')

# whitespace star
sx, sy = px(0.93), py(0.72)
s.append(f'<text x="{sx}" y="{sy}" text-anchor="middle" font-size="32">⭐</text>')
s.append(f'<text x="{sx}" y="{sy+30}" text-anchor="middle" class="star">OUR GAME</text>')
s.append(f'<text x="{sx}" y="{sy+47}" text-anchor="middle" class="lb">manufacture + preserve,</text>')
s.append(f'<text x="{sx}" y="{sy+61}" text-anchor="middle" class="lb">digital</text>')

s.append(f'<text x="30" y="{H-14}" class="note">Dashed quadrant = digital × manufacturing × preserve (capture/share). Jackbox and It Takes Two manufacture moments but keep no persistent keepsake — the preserve layer is the gap. Emptiness is a hypothesis, not proof of demand.</text>')
s.append('</svg>')
with open(f"{OUT}/landscape.svg", "w") as f:
    f.write("\n".join(s))
print("landscape.svg v2 written:", len(pts), "dots")
