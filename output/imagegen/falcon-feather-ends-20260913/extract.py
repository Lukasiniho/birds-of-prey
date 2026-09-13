from pathlib import Path
import json,hashlib
import cv2,numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes,distance_transform_edt
root=Path('public/birds'); generated=Path('/Users/lukasvonhohnhorst/.codex/generated_images/01a09ad9-bc2d-7391-aa5e-7947c87962a6'); out=Path('output/imagegen/falcon-feather-ends-20260913')
jobs=[('lannerfalke','v2','97b2d052-2b6b-45c8-b3f4-654cd46496f2'),('sakerfalke','v2','bc4a4a1f-37c5-4159-9196-67f48470c988'),('turmfalke','v5','8f3d76fe-aff9-4908-a872-298401ee4c55')]
reports=[]
for id,version,uid in jobs:
 original=root/f'portrait-{id}-20260913-{version}.png'; source=generated/f'exec-{uid}.png'; target=root/f'portrait-{id}-20260913-feather-ends.png'
 rgb=np.array(Image.open(source).convert('RGB'));h,w=rgb.shape[:2]
 # The original supplies only the coarse seed for segmentation. The changed
 # feather ends get their own silhouette from the generated image.
 original_alpha=np.array(Image.open(original).convert('RGBA'))[:,:,3]
 original_alpha=cv2.resize(original_alpha,(w,h),interpolation=cv2.INTER_NEAREST)
 m=(original_alpha>128).astype(np.uint8)
 inner=cv2.erode(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(65,65)))
 outer=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(101,101)))
 trimap=np.where(m,cv2.GC_PR_FGD,cv2.GC_PR_BGD).astype(np.uint8)
 trimap[inner==1]=cv2.GC_FGD;trimap[outer==0]=cv2.GC_BGD
 neutral=(rgb.max(axis=2).astype(int)-rgb.min(axis=2).astype(int)<12)&(rgb.min(axis=2)>185)
 candidate=(neutral&(inner==0)).astype(np.uint8)
 _,bglabels=cv2.connectedComponents(candidate,8)
 border_ids=np.unique(np.concatenate([bglabels[0],bglabels[-1],bglabels[:,0],bglabels[:,-1]]))
 checker=np.isin(bglabels,border_ids[border_ids!=0]);trimap[checker]=cv2.GC_BGD
 trimap[(rgb.max(axis=2)<165)&(outer==1)]=cv2.GC_FGD
 cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),trimap,None,np.zeros((1,65)),np.zeros((1,65)),5,cv2.GC_INIT_WITH_MASK)
 fg=((trimap==cv2.GC_FGD)|(trimap==cv2.GC_PR_FGD)).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(fg,8)
 fg=binary_fill_holes(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 # Subpixel edge coverage only; no visible feather blur or opacity fade.
 alpha=cv2.GaussianBlur(fg.astype(np.float32),(3,3),.45);alpha[alpha<.04]=0;alpha[alpha>.96]=1
 core=cv2.erode(fg,np.ones((3,3),np.uint8));_,idx=distance_transform_edt(1-core,return_indices=True)
 edge=(alpha>0)&(core==0);rgb[edge]=rgb[idx[0][edge],idx[1][edge]]
 rgba=np.dstack([rgb,(alpha*255).round().astype(np.uint8)]);rgba[alpha==0]=0
 Image.fromarray(rgba).save(target)
 report={'species':id,'original':str(original),'generated':str(source),'output':str(target),'prompt':str(out/f'{id}-prompt.txt'),'method':'Built-in imagegen edit of lower contour feathers; local GrabCut with original-derived coarse seed, protected interior, independent new silhouette, edge decontamination. No reframing or scaling.','size':[w,h],'transparent_pixels':int((alpha==0).sum())}
 for role,path in [('original',original),('generated',source),('output',target),('featherReferenceHobby',root/'portrait-baumfalke-20260913-v3.png'),('featherReferenceGyrfalcon',root/'portrait-gerfalke-20260913-v2.png')]:report[role+'Sha256']=hashlib.sha256(path.read_bytes()).hexdigest()
 reports.append(report)
 print(id,report['outputSha256'])
(out/'manifest.json').write_text(json.dumps(reports,indent=2)+'\n')
