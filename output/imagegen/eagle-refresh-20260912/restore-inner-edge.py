"""Local checker removal using verified aligned adult alpha and clean inner RGB."""
import cv2,numpy as np,sys
from scipy import ndimage as ndi
base,generated,out=sys.argv[1:]
b=cv2.imread(base,cv2.IMREAD_UNCHANGED);a=b[:,:,3]
g=cv2.imread(generated);g=cv2.resize(g,(a.shape[1],a.shape[0]),interpolation=cv2.INTER_LANCZOS4)
d=ndi.distance_transform_edt(a>220);core=d>6
_,near=ndi.distance_transform_edt(~core,return_indices=True)
edge=(a>0)&~core
rgb=g.copy();rgb[edge]=g[near[0][edge],near[1][edge]];rgb[a==0]=0
cv2.imwrite(out,np.dstack([rgb,a]))
