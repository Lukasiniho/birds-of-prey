from pathlib import Path
import sys,json
import cv2,numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes,distance_transform_edt
polygons={
'fischadler':[(109,520),(155,429),(220,380),(245,296),(322,222),(435,162),(594,111),(746,115),(920,151),(1035,211),(1095,329),(1132,478),(1158,651),(1178,811),(1175,999),(1120,1094),(1000,1152),(839,1161),(710,1165),(547,1141),(400,1092),(300,1023),(255,935),(299,833),(330,752),(370,701),(359,650),(339,598),(315,584),(262,610),(159,624),(170,687),(135,652),(110,597)],
'aguja':[(52,479),(75,387),(123,319),(181,275),(215,185),(317,102),(450,52),(626,44),(791,86),(929,163),(1038,285),(1105,430),(1160,599),(1183,760),(1240,892),(1223,1038),(1123,1139),(994,1190),(820,1215),(657,1220),(490,1210),(327,1166),(232,1110),(184,1028),(228,928),(286,839),(328,750),(370,672),(377,600),(328,540),(271,496),(200,515),(128,526),(105,589),(66,552)],
'schwarzmilan':[(104,521),(133,443),(186,382),(237,300),(260,210),(344,136),(476,92),(639,62),(824,91),(963,184),(1066,313),(1137,487),(1164,656),(1183,817),(1225,939),(1179,1078),(1087,1138),(922,1192),(759,1215),(572,1200),(435,1175),(289,1141),(187,1082),(172,994),(230,902),(286,811),(344,730),(363,659),(352,594),(310,558),(241,572),(156,584),(145,653),(116,613)]}
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
