"""Find an already-observed visible image patch; never inspect game state.

Usage: current.png 'reference.png|left,top,right,bottom'
Image transforms stay in memory for analysis; no edited research image is saved.
"""
import json, sys
from PIL import Image, ImageOps
import numpy as np

if sys.argv[2].startswith('visible-grey-hair'):
    pixels = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
    mask = (pixels[:, :, 0] >= 150) & (pixels[:, :, 0] <= 156)
    mask &= (abs(pixels[:, :, 0] - pixels[:, :, 1]) < 2) & (abs(pixels[:, :, 0] - pixels[:, :, 2]) < 2)
    mask[:140, :] = False
    mask[660:, :] = False
    mask[:, :170] = False
    mask[:, 1110:] = False
    mask[320:420, 565:715] = False
    integral = np.pad(mask.astype(int), ((1, 0), (1, 0))).cumsum(0).cumsum(1)
    counts = integral[55:, 55:] - integral[:-55, 55:] - integral[55:, :-55] + integral[:-55, :-55]
    y, x = np.unravel_index(counts.argmax(), counts.shape)
    ys, xs = np.where(mask[y:y+55, x:x+55])
    cx = float(x + (xs.mean() if len(xs) else 27))
    cy = float(y + (ys.mean() if len(ys) else 27) + 20)
    score = float(min(1, counts[y, x] / 300)) if counts[y, x] < 1400 else 0
    if sys.argv[2].endswith('with-neighbour'):
        # White connected components are visible heads. Seek a nearby second
        # subject so the frame contains an interaction, rather than only the
        # shouting character's identity. This is disclosed aiming assistance.
        from collections import deque
        white = np.all(pixels > 245, axis=2)
        white[:140, :] = False; white[660:, :] = False
        white[:, :170] = False; white[:, 1110:] = False
        white[320:420, 565:715] = False
        heads=[]
        for yy, xx in zip(*np.where(white)):
            if not white[yy, xx]: continue
            pending=deque([(int(yy),int(xx))]); white[yy,xx]=False; points=[]
            while pending:
                py,px=pending.popleft(); points.append((py,px))
                for ny,nx in [(py-1,px),(py+1,px),(py,px-1),(py,px+1)]:
                    if 0 <= ny < white.shape[0] and 0 <= nx < white.shape[1] and white[ny,nx]:
                        white[ny,nx]=False; pending.append((ny,nx))
            ys2=[p[0] for p in points]; xs2=[p[1] for p in points]
            if 300 < len(points) < 1800 and 24 < max(xs2)-min(xs2) < 55 and 20 < max(ys2)-min(ys2) < 55:
                hx=(max(xs2)+min(xs2))/2;hy=(max(ys2)+min(ys2))/2
                distance=((hx-cx)**2+(hy-cy)**2)**.5
                if 30 < distance < 120 and abs(hy-cy)<65:heads.append((distance,hx,hy))
        if heads:
            _, hx, hy = min(heads)
            cx=(cx+hx)/2;cy=(cy+hy)/2
        else:score=0
    print(json.dumps({'x':cx,'y':cy,'score':score}))
    sys.exit(0)

from scipy.signal import fftconvolve

path, box = sys.argv[2].rsplit('|', 1)
source = Image.open(path).convert('L').crop(tuple(map(int, box.split(','))))
current = np.asarray(Image.open(sys.argv[1]).convert('L'), dtype=float)[135:665, 165:1115]
best = (-1, None)
for flip in [False, True]:
    for angle in [-18, -9, 0, 9, 18]:
        sample = (ImageOps.mirror(source) if flip else source).rotate(angle, fillcolor=210)
        template = np.asarray(sample, dtype=float)
        template -= template.mean()
        norm = np.linalg.norm(template)
        ones = np.ones(template.shape)
        number = template.size
        numerator = fftconvolve(current, template[::-1, ::-1], mode='valid')
        total = fftconvolve(current, ones, mode='valid')
        square = fftconvolve(current * current, ones, mode='valid')
        denominator = norm * np.sqrt(np.maximum(square - total * total / number, 1))
        score = numerator / np.maximum(denominator, 1)
        # The central television is a display of earlier photos, not a crowd
        # subject. Do not aim at the already-published image.
        score[185:285, 400:550] = -1
        y, x = np.unravel_index(score.argmax(), score.shape)
        maximum = float(score[y, x])
        if maximum > best[0]:
            best = (maximum, {'x': float(x + 165 + template.shape[1] / 2),
                              'y': float(y + 135 + template.shape[0] / 2), 'score': maximum})
print(json.dumps(best[1]))
