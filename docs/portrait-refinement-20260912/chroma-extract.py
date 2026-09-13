"""Remove the deliberately generated green matte without keying pale feathers."""
import json, hashlib
from pathlib import Path
import numpy as np
import cv2
from PIL import Image

folder=Path(__file__).resolve().parent
manifest=json.loads((folder/'manifest.json').read_text())
passes=json.loads((folder/'chroma-records.json').read_text())
for p in passes:
 r=next(x for x in manifest['records'] if x['id']==p['id'])
 rgb=np.array(Image.open(p['generated']).convert('RGB')).astype(float)
 bg=np.median(np.concatenate([rgb[0],rgb[-1],rgb[:,0],rgb[:,-1]]),axis=0)
 excess=rgb[:,:,1]-np.maximum(rgb[:,:,0],rgb[:,:,2])
 alpha=np.clip(1-excess/(bg[1]-max(bg[0],bg[2])),0,1)
 alpha[excess<10]=1
 alpha[alpha<.045]=0
 # Discard isolated matte noise, retaining the entire connected bird and
 # a two-pixel band for its antialiased feather tips.
 fg=(alpha>.15).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(fg,8)
 body=(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 near=cv2.dilate(body,np.ones((5,5),np.uint8))
 alpha[near==0]=0
 # Undo the known green background contribution at partially covered edges.
 color=np.clip((rgb-(1-alpha[:,:,None])*bg)/np.maximum(alpha[:,:,None],.001),0,255)
 color[alpha==0]=0
 rgba=np.dstack([color,alpha*255]).round().astype(np.uint8)
 Image.fromarray(rgba).save(r['output'])
 p['generatedSha256']=hashlib.sha256(Path(p['generated']).read_bytes()).hexdigest()
 p['sourceSha256']=hashlib.sha256(Path(p['source']).read_bytes()).hexdigest()
 p['backgroundRgb']=bg.tolist()
 r['mattePass']=p
 r['localFinish']='Generated flat green background matte; excess-green alpha and background unmixing. No neutral/white feather pixels keyed; no geometry change.'
 for field in ['original','reference','generated','output']:
  r[field+'Sha256']=hashlib.sha256(Path(r[field]).read_bytes()).hexdigest()
 print(r['id'],bg.tolist(),int((alpha==0).sum()))
(folder/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
