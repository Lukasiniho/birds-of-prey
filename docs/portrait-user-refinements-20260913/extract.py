import json,hashlib
from pathlib import Path
import cv2,numpy as np
from PIL import Image

folder=Path(__file__).resolve().parent
m=json.loads((folder/'manifest.json').read_text())
passes=json.loads((folder/'mattes.json').read_text())
for p in passes:
 r=next(x for x in m['records'] if x['id']==p['id'])
 rgb=np.array(Image.open(p['generated']).convert('RGB')).astype(float)
 bg=np.median(np.concatenate([rgb[0],rgb[-1],rgb[:,0],rgb[:,-1]]),axis=0)
 excess=rgb[:,:,1]-np.maximum(rgb[:,:,0],rgb[:,:,2])
 alpha=np.clip(1-excess/(bg[1]-max(bg[0],bg[2])),0,1)
 alpha[excess<10]=1;alpha[alpha<.045]=0
 fg=(alpha>.15).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(fg,8)
 body=(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 near=cv2.dilate(body,np.ones((5,5),np.uint8));alpha[near==0]=0
 color=np.clip((rgb-(1-alpha[:,:,None])*bg)/np.maximum(alpha[:,:,None],.001),0,255)
 color[alpha==0]=0
 rgba=np.dstack([color,alpha*255]).round().astype(np.uint8)
 Image.fromarray(rgba).save(r['output'])
 r['mattePass']={**p,'backgroundRgb':bg.tolist(),'generatedSha256':hashlib.sha256(Path(p['generated']).read_bytes()).hexdigest()}
 r['localFinish']='Separate green-background matte, excess-green alpha with background unmixing, isolated matte-noise removal. No neutral/white color key.'
 for field in ['original','reference','generated','output']:r[field+'Sha256']=hashlib.sha256(Path(r[field]).read_bytes()).hexdigest()
 yy,xx=np.where(alpha>.5);print(r['id'],'bbox',[int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())])
 if r['id']!='habichtsadler':
  old=np.array(Image.open(r['original']).convert('RGBA'))
  mask1=(old[:,:,3]>230).astype(np.uint8)*255;mask1[650:]=0
  mask2=(rgba[:,:,3]>230).astype(np.uint8)*255;mask2[700:]=0
  sift=cv2.SIFT_create()
  kp1,d1=sift.detectAndCompute(cv2.cvtColor(old[:,:,:3],cv2.COLOR_RGB2GRAY),mask1)
  kp2,d2=sift.detectAndCompute(cv2.cvtColor(rgba[:,:,:3],cv2.COLOR_RGB2GRAY),mask2)
  matches=cv2.BFMatcher().knnMatch(d2,d1,k=2)
  good=[a for a,b in matches if a.distance<.65*b.distance]
  if len(good)>8:
   src=np.float32([kp2[x.queryIdx].pt for x in good]);dst=np.float32([kp1[x.trainIdx].pt for x in good])
   matrix,inliers=cv2.estimateAffinePartial2D(src,dst,method=cv2.RANSAC,ransacReprojThreshold=2)
   r['headAlignmentEstimate']={'matrix':matrix.tolist(),'matches':len(good),'inliers':int(inliers.sum())}
   print(r['id'],r['headAlignmentEstimate'])
(folder/'manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
