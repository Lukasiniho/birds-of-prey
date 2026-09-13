"""Remove a uniform saturated blue generation background locally."""
import sys
import cv2
import numpy as np
from scipy.ndimage import distance_transform_edt
src=cv2.imread(sys.argv[1])
b,g,r=cv2.split(src.astype(float))
fg=((b-np.maximum(g,r)<60)|(b<130)).astype('uint8')
n,labels,stats,_=cv2.connectedComponentsWithStats(fg,8)
fg=(labels==(1+np.argmax(stats[1:,cv2.CC_STAT_AREA]))).astype('uint8')
alpha=np.clip((cv2.GaussianBlur(fg.astype(float),(0,0),.5)-.06)/.88,0,1)
core=cv2.erode(fg,np.ones((3,3),'uint8'))>0
_,near=distance_transform_edt(~core,return_indices=True)
rgb=src.copy()
edge=(alpha>0)&~core
rgb[edge]=src[near[0][edge],near[1][edge]]
out=np.dstack([rgb,(alpha*255).astype('uint8')]);out[alpha==0]=0
cv2.imwrite(sys.argv[2],out)
print(sys.argv[2])
