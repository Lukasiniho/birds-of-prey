"""Local matte restoration for variants generated directly from their adult.

Retains the adult alpha and edge feather texture. Extends the generated
foreground colour adjustment to the edge to avoid checkerboard contamination
or the blocky texture caused by copying a single neighbouring colour.
Does not align changed poses; inspect geometry before using this cleanup.
"""
import argparse
import cv2
import numpy as np
from scipy.ndimage import distance_transform_edt

parser = argparse.ArgumentParser()
parser.add_argument('original')
parser.add_argument('generated')
parser.add_argument('output')
args = parser.parse_args()
base = cv2.imread(args.original, cv2.IMREAD_UNCHANGED)
edit = cv2.imread(args.generated)
if base is None or edit is None or base.shape[2] != 4:
    raise ValueError('Readable adult RGBA and generated image required')
h, w = base.shape[:2]
if abs(edit.shape[1] / edit.shape[0] - w / h) > 0.001:
    raise ValueError('Canvas aspect ratio changed')
edit = cv2.resize(edit, (w, h), interpolation=cv2.INTER_LANCZOS4).astype(float)
alpha = base[:, :, 3]
source = base[:, :, :3].astype(float)
distance = distance_transform_edt(alpha > 128)
core = distance > 24
ratio = np.log((edit + 5) / (source + 5))
weight = cv2.GaussianBlur(core.astype(float), (0, 0), 18)
shift = cv2.GaussianBlur(ratio * core[:, :, None], (0, 0), 18)
shift /= np.maximum(weight[:, :, None], 1e-6)
good = weight > 0.08
_, nearest = distance_transform_edt(~good, return_indices=True)
shift[~good] = shift[nearest[0][~good], nearest[1][~good]]
recovered = np.clip((source + 5) * np.exp(np.clip(shift, np.log(0.65), np.log(1.6))) - 5, 0, 255)
blend = np.clip((distance - 12) / 12, 0, 1)[:, :, None]
rgb = recovered * (1 - blend) + edit * blend
output = np.dstack([rgb.astype('uint8'), alpha])
output[alpha == 0] = 0
if not cv2.imwrite(args.output, output):
    raise OSError(args.output)
print(args.output)
