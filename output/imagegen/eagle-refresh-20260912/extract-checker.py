"""Locally remove neutral checker background connected to the canvas border.
For this dark eagle only; never apply blindly to birds with pale outlines.
"""
import sys
import cv2
import numpy as np
from scipy import ndimage as ndi
src,dst=sys.argv[1:]
im=cv2.imread(src,cv2.IMREAD_UNCHANGED)
if im.shape[2]==4 and im[:,:,3].min()==0:
    cv2.imwrite(dst,im); print('Existing alpha retained'); sys.exit()
bgr=im[:,:,:3]
neutral=(np.ptp(bgr.astype(np.int16),axis=2)<18)&(bgr.min(axis=2)>158)
labels,n=ndi.label(neutral)
border=np.unique(np.concatenate([labels[0],labels[-1],labels[:,0],labels[:,-1]]));border=border[border!=0]
bg=np.isin(labels,border)
fg=~bg
lab,n=ndi.label(fg)
counts=np.bincount(lab.ravel());counts[0]=0
fg=lab==counts.argmax()
# Preserve internal pale feathers; the only deleted region is exterior checker.
fg=ndi.binary_fill_holes(fg)
a=cv2.GaussianBlur(fg.astype(np.float32),(0,0),0.5)
a=np.clip((a-.04)/.92,0,1)
core=ndi.binary_erosion(fg,iterations=2)
_,nearest=ndi.distance_transform_edt(~core,return_indices=True)
edge=(a>0)&~core
clean=bgr.copy();clean[edge]=bgr[nearest[0][edge],nearest[1][edge]]
clean[a==0]=0
cv2.imwrite(dst,np.dstack([clean,(a*255).round().astype(np.uint8)]))
print(dst, 'alpha coverage',round(float(a.mean()),4))
