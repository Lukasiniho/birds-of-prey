from pathlib import Path
import sys,json
import cv2,numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes,distance_transform_edt
polygons={"wespenbussard":[(88, 506), (103, 444), (157, 390), (211, 353), (252, 278), (335, 208), (433, 164), (562, 146), (704, 163), (833, 205), (949, 271), (1011, 363), (1049, 453), (1080, 555), (1106, 674), (1137, 772), (1190, 889), (1160, 918), (1194, 977), (1152, 981), (1190, 1030), (1090, 1021), (1118, 1063), (1028, 1061), (1005, 1101), (936, 1108), (931, 1146), (872, 1129), (829, 1147), (787, 1125), (754, 1161), (710, 1143), (678, 1170), (628, 1140), (601, 1156), (559, 1126), (520, 1157), (482, 1132), (454, 1150), (437, 1109), (394, 1124), (404, 1074), (370, 1070), (400, 1006), (422, 928), (448, 843), (463, 752), (443, 672), (401, 606), (353, 564), (301, 538), (233, 532), (161, 535), (126, 530), (111, 596), (96, 568)]}
id,source,destination=sys.argv[1:]
rgb=np.array(Image.open(source).convert('RGB')); h,w=rgb.shape[:2]
if id in {'kronenadler','harpyie'}:
 f=rgb.astype(float); bg=np.median(np.concatenate([f[0],f[-1],f[:,0],f[:,-1]]),axis=0)
 excess=f[:,:,2]-np.maximum(f[:,:,0],f[:,:,1])
 alpha=np.clip(1-excess/(bg[2]-max(bg[0],bg[1])),0,1); alpha[excess<8]=1; alpha[alpha<.045]=0
 mask=(alpha>.15).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(mask,8)
 body=(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 alpha[cv2.dilate(body,np.ones((5,5),np.uint8))==0]=0
 rgb=np.clip((f-(1-alpha[:,:,None])*bg)/np.maximum(alpha[:,:,None],.001),0,255).round().astype(np.uint8)
else:
 m=np.zeros((h,w),np.uint8);cv2.fillPoly(m,[np.array(polygons[id],np.int32)],1)
 inner=cv2.erode(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(51,51)))
 outer=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(75,75)))
 trimap=np.where(m,cv2.GC_PR_FGD,cv2.GC_PR_BGD).astype(np.uint8)
 trimap[inner==1]=cv2.GC_FGD;trimap[outer==0]=cv2.GC_BGD
 # Only neutral checker pixels connected to the outside in the uncertain edge
 # band are background; the protected interior retains all pale plumage.
 neutral=(rgb.max(axis=2).astype(int)-rgb.min(axis=2).astype(int)<5)&(rgb.min(axis=2)>192)
 candidate=(neutral&(inner==0)).astype(np.uint8)
 _,bglabels=cv2.connectedComponents(candidate,8)
 border_ids=np.unique(np.concatenate([bglabels[0],bglabels[-1],bglabels[:,0],bglabels[:,-1]]))
 checker=np.isin(bglabels,border_ids[border_ids!=0])
 trimap[checker]=cv2.GC_BGD
 trimap[(rgb.max(axis=2)<165)&(outer==1)]=cv2.GC_FGD
 cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),trimap,None,np.zeros((1,65)),np.zeros((1,65)),5,cv2.GC_INIT_WITH_MASK)
 fg=((trimap==cv2.GC_FGD)|(trimap==cv2.GC_PR_FGD)).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(fg,8)
 fg=binary_fill_holes(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 alpha=cv2.GaussianBlur(fg.astype(np.float32),(3,3),.55);alpha[alpha<.04]=0;alpha[alpha>.96]=1
 core=cv2.erode(fg,np.ones((5,5),np.uint8));_,idx=distance_transform_edt(1-core,return_indices=True)
 edge=(alpha>0)&(core==0);rgb[edge]=rgb[idx[0][edge],idx[1][edge]]
rgba=np.dstack([rgb,(alpha*255).round().astype(np.uint8)]);rgba[alpha==0]=0
Image.fromarray(rgba).save(destination)
y,x=np.where(alpha>.5)
print(json.dumps({'id':id,'size':[w,h],'bbox':[int(x.min()),int(y.min()),int(x.max()),int(y.max())],'transparent':int((alpha==0).sum())}))
