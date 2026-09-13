"""Extract the explicitly requested green matte; preserve all white/gray feathers."""
import sys,json,cv2,numpy as np
from scipy import ndimage as ndi
original,raw,out=sys.argv[1:]
a=cv2.imread(original,cv2.IMREAD_UNCHANGED);e=cv2.imread(raw,cv2.IMREAD_COLOR)
b,g,r=cv2.split(e.astype(float));excess=g-np.maximum(r,b)
alpha=np.clip(1-(excess-10)/180,0,1);alpha[excess>190]=0
interior=ndi.binary_erosion((alpha>.99)&(excess<1),iterations=2)
_,idx=ndi.distance_transform_edt(~interior,return_indices=True)
rgb=e.copy(); band=(alpha>0)&~interior;rgb[band]=e[idx[0][band],idx[1][band]]
cut=np.dstack((rgb,np.uint8(alpha*255)));cut[alpha==0]=0
y,x=np.where(a[:,:,3]>128);ox,oy,ox1,oy1=int(x.min()),int(y.min()),int(x.max()+1),int(y.max()+1)
y,x=np.where(alpha>.5);bx,by,bx1,by1=int(x.min()),int(y.min()),int(x.max()+1),int(y.max()+1)
scale=min((ox1-ox)/(bx1-bx),(oy1-oy)/(by1-by));cx=(ox+ox1)/2;cy=(oy+oy1)/2
mat=np.array([[scale,0,cx-scale*(bx+bx1)/2],[0,scale,cy-scale*(by+by1)/2]],dtype=float)
result=cv2.warpAffine(cut,mat,(a.shape[1],a.shape[0]),flags=cv2.INTER_LANCZOS4);result[result[:,:,3]==0]=0
cv2.imwrite(out,result)
print(json.dumps(dict(output=out,originalBounds=[ox,oy,ox1,oy1],segmentedBounds=[bx,by,bx1,by1],uniformScale=scale,alphaZero=int((result[:,:,3]==0).sum()))))
