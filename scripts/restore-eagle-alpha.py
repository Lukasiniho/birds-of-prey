"""User-authorized alpha restoration, preserving the exact adult silhouette.
GrabCut removes baked backgrounds; nearest interior colors fill edge drift.
"""
from pathlib import Path
import argparse

import cv2
import numpy as np
from scipy.ndimage import distance_transform_edt


def restore_alpha(adult_path: str, edited_path: str, output_path: str) -> None:
    adult = cv2.imread(adult_path, cv2.IMREAD_UNCHANGED)
    edited = cv2.imread(edited_path, cv2.IMREAD_COLOR)
    if adult is None or edited is None:
        raise ValueError("Both input images must be readable.")
    if adult.ndim != 3 or adult.shape[2] != 4:
        raise ValueError("The adult reference must have an alpha channel.")
    if adult.shape[:2] != edited.shape[:2]:
        raise ValueError("The adult and edited images must have identical dimensions.")

    alpha = adult[:, :, 3]
    mask = (alpha > 128).astype("uint8")
    core = cv2.erode(mask, np.ones((35, 35), np.uint8))
    outer = cv2.dilate(mask, np.ones((45, 45), np.uint8))
    segmentation = np.where(mask, cv2.GC_PR_FGD, cv2.GC_PR_BGD).astype("uint8")
    segmentation[outer == 0] = cv2.GC_BGD
    segmentation[core == 1] = cv2.GC_FGD
    cv2.grabCut(
        edited, segmentation, None,
        np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64),
        5, cv2.GC_INIT_WITH_MASK,
    )
    foreground = (
        (segmentation == cv2.GC_FGD) | (segmentation == cv2.GC_PR_FGD)
    ).astype("uint8")
    # Use only interior edited feather colors near the original silhouette edges.
    foreground = cv2.erode(foreground, np.ones((5, 5), np.uint8))
    foreground[alpha < 250] = 0
    if not foreground.any():
        raise ValueError("No interior feather colors found in the edited image.")
    _, nearest = distance_transform_edt(1 - foreground, return_indices=True)
    colors = edited.copy()
    replace = (alpha > 0) & (foreground == 0)
    colors[replace] = edited[nearest[0][replace], nearest[1][replace]]
    output = np.dstack([colors, alpha])
    output[alpha == 0] = 0
    if not cv2.imwrite(output_path, output):
        raise OSError(f"Could not write {output_path}")
    print(Path(output_path).name, "edge pixels restored", int(replace.sum()))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("adult", help="Normal adult reference PNG with transparency")
    parser.add_argument("edited", help="Variant generated directly from that adult")
    parser.add_argument("output", help="Destination PNG")
    args = parser.parse_args()
    restore_alpha(args.adult, args.edited, args.output)
