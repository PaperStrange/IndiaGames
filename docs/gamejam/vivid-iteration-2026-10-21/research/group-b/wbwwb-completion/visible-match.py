"""Find an already-observed visible image patch; never inspect game state.

Usage: current.png 'reference.png|left,top,right,bottom'
Image transforms stay in memory for analysis; no edited research image is saved.
"""
import json, sys
from PIL import Image, ImageOps
import numpy as np
from scipy.signal import fftconvolve
from scipy.ndimage import uniform_filter

if sys.argv[2] == 'visible-grey-hair':
    pixels = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
    mask = (pixels[:, :, 0] >= 150) & (pixels[:, :, 0] <= 156)
    mask &= (abs(pixels[:, :, 0] - pixels[:, :, 1]) < 2) & (abs(pixels[:, :, 0] - pixels[:, :, 2]) < 2)
    mask[:140, :] = False
    mask[660:, :] = False
    mask[:, :170] = False
    mask[:, 1110:] = False
    mask[320:420, 565:715] = False
    density = uniform_filter(mask.astype(float), size=55)
    y, x = np.unravel_index(density.argmax(), density.shape)
    print(json.dumps({'x': float(x), 'y': float(y + 15),
                      'score': float(min(1, density[y, x] * 55 ** 2 / 300))}))
    sys.exit(0)

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
