"""Localized feather-edge replacement; the original head is retained unchanged."""
import json,hashlib
from pathlib import Path
import cv2,numpy as np
from PIL import Image

folder=Path(__file__).resolve().parent
m=json.loads((folder/'manifest.json').read_text())
(folder/'raw-cutouts').mkdir(exist_ok=True)
settings={'turmfalke':(None,780,850),'baumfalke':(1060,800,915),'fischadler':(1097,750,900)}
for id,(target,start,end) in settings.items():
 r=next(x for x in m['records'] if x['id']==id)
 raw=folder/'raw-cutouts'/f'{id}.png'
 if not raw.exists():raw.write_bytes(Path(r['output']).read_bytes())
 generated=np.array(Image.open(raw).convert('RGBA'))
 original=np.array(Image.open(r['original']).convert('RGBA'))
 _,labels,stats,_=cv2.connectedComponentsWithStats((original[:,:,3]>32).astype(np.uint8),8)
 body=(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 original[cv2.dilate(body,np.ones((3,3),np.uint8))==0]=0
 last=np.where(generated[:,:,3]>128)[0].max()
 shift=0 if target is None else int(target-last)
 patch=cv2.warpAffine(generated,np.float32([[1,0,0],[0,1,shift]]),(1254,1254),flags=cv2.INTER_NEAREST)
 weight=np.clip((np.arange(1254)-start)/(end-start),0,1)
 weight=weight*weight*(3-2*weight)
 w=weight[:,None,None]
 a=original[:,:,3:4].astype(float)/255;b=patch[:,:,3:4].astype(float)/255
 alpha=a*(1-w)+b*w
 rgb=(original[:,:,:3]*a*(1-w)+patch[:,:,:3]*b*w)/np.maximum(alpha,.000001)
 out=np.dstack([rgb,alpha[:,:,0]*255]).round().clip(0,255).astype(np.uint8)
 out[alpha[:,:,0]==0]=0
 Image.fromarray(out).save(r['output'])
 r['neckFinish']={'rawCutout':str(raw),'patchVerticalTranslation':shift,'blendRows':[start,end],'targetBottom':target,'unchangedHeadThroughRow':start-1,'method':'Original head and upper neck retained; generated lower feather-edge patch translated without any stretching and blended only within lower neck.'}
 r['outputSha256']=hashlib.sha256(Path(r['output']).read_bytes()).hexdigest()
 r['headPixelCheck']={'changedInteriorPixelsAbove650':int(np.any(out[:650,:,:3]!=original[:650,:,:3],axis=2)[original[:650,:,3]>250].sum())}
 print(id,r['neckFinish'],r['headPixelCheck'])
(folder/'manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
