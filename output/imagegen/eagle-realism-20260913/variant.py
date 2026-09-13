"""Restore exact adult alpha after direct, aligned juvenile plumage edit."""
import sys,json,cv2,numpy as np
from scipy import ndimage as ndi
original,raw,out=sys.argv[1:]
a=cv2.imread(original,cv2.IMREAD_UNCHANGED);e=cv2.imread(raw,cv2.IMREAD_COLOR)
assert a.shape[:2]==e.shape[:2]
b,g,r=cv2.split(e.astype(float));excess=g-np.maximum(r,b)
fg=excess<80;adult=a[:,:,3]>128
intersection=(fg&adult).sum();union=(fg|adult).sum()
interior=ndi.binary_erosion(excess<1,iterations=2)
_,idx=ndi.distance_transform_edt(~interior,return_indices=True)
rgb=e.copy();band=(a[:,:,3]>0)&~interior;rgb[band]=e[idx[0][band],idx[1][band]]
result=np.dstack([rgb,a[:,:,3]]);result[a[:,:,3]==0]=0;cv2.imwrite(out,result)
# Independent interior feature alignment, not just alpha identity.
sift=cv2.SIFT_create();k1,d1=sift.detectAndCompute(cv2.cvtColor(a[:,:,:3],cv2.COLOR_BGR2GRAY),np.uint8(adult)*255);k2,d2=sift.detectAndCompute(cv2.cvtColor(e,cv2.COLOR_BGR2GRAY),np.uint8(fg)*255)
matches=cv2.BFMatcher().knnMatch(d1,d2,k=2);good=[m for m,n in matches if m.distance<.7*n.distance]
p=np.float32([k1[m.queryIdx].pt for m in good]);q=np.float32([k2[m.trainIdx].pt for m in good]);delta=np.linalg.norm(p-q,axis=1);stable=delta[delta<15]
report=dict(output=out,rawSilhouetteIoU=round(float(intersection/union),5),alphaIdentical=True,matchedInteriorFeatures=len(stable),medianInteriorShiftPx=round(float(np.median(stable)),2),p90InteriorShiftPx=round(float(np.percentile(stable,90)),2),noResize=True)
print(json.dumps(report))
open(out.replace('.png','-qa.json').replace('public/birds/','output/imagegen/eagle-realism-20260913/'),'w').write(json.dumps(report,indent=2)+'\n')
