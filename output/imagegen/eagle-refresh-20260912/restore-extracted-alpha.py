"""Retain adult alpha and generated RGB; locally extend extracted edge colors.
Use only after independent silhouette/landmark validation of aligned edits.
"""
import cv2,numpy as np,sys
from scipy import ndimage as ndi
base,cut,out=sys.argv[1:]
a=cv2.imread(base,cv2.IMREAD_UNCHANGED)[:,:,3]
g=cv2.imread(cut,cv2.IMREAD_UNCHANGED)
if g.shape[:2]!=a.shape:g=cv2.resize(g,(a.shape[1],a.shape[0]))
core=ndi.binary_erosion(g[:,:,3]>220,iterations=1)
_,near=ndi.distance_transform_edt(~core,return_indices=True)
rgb=g[:,:,:3].copy()
edge=(a>0)&~core
rgb[edge]=rgb[near[0][edge],near[1][edge]]
rgb[a==0]=0
cv2.imwrite(out,np.dstack([rgb,a]))
print(out)
