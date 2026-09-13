"""Extract an aligned generated edit using the original silhouette as seeds only.
Final alpha follows the new image, not a clipped old silhouette.
"""
import sys,cv2,numpy as np
from scipy import ndimage as ndi
base,raw,out=sys.argv[1:]
a=cv2.imread(base,cv2.IMREAD_UNCHANGED)[:,:,3]
im=cv2.imread(raw)
if im.shape[:2]!=a.shape: im=cv2.resize(im,(a.shape[1],a.shape[0]))
inside=ndi.distance_transform_edt(a>127)
outside=ndi.distance_transform_edt(a<=127)
mask=np.where(a>127,cv2.GC_PR_FGD,cv2.GC_PR_BGD).astype(np.uint8)
mask[inside>18]=cv2.GC_FGD
mask[outside>22]=cv2.GC_BGD
# Neutral checker cells in uncertain external edge are known background.
neutral=np.ptp(im.astype(np.int16),axis=2)<12
mask[neutral&(inside<10)]=cv2.GC_BGD
cv2.grabCut(im,mask,None,np.zeros((1,65),np.float64),np.zeros((1,65),np.float64),4,cv2.GC_INIT_WITH_MASK)
fg=(mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD)
labels,n=ndi.label(fg);counts=np.bincount(labels.ravel());counts[0]=0
fg=ndi.binary_fill_holes(labels==counts.argmax())
alpha=np.clip((cv2.GaussianBlur(fg.astype(np.float32),(0,0),.5)-.04)/.92,0,1)
core=ndi.binary_erosion(fg,iterations=2)
_,near=ndi.distance_transform_edt(~core,return_indices=True)
edge=(alpha>0)&~core
im[edge]=im[near[0][edge],near[1][edge]]
im[alpha==0]=0
cv2.imwrite(out,np.dstack([im,np.round(alpha*255).astype(np.uint8)]))
print(out)
