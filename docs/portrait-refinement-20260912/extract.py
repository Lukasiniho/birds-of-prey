"""Local alpha extraction only; no resizing, neck warping or recropping."""
import json, hashlib, sys
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, distance_transform_edt

folder=Path(__file__).resolve().parent
manifest=json.loads((folder/'manifest.json').read_text())
lower={
 'turmfalke':[(355,690),(1030,650),(1070,755),(1090,870),(1070,935),(1020,970),(895,1010),(740,1030),(610,1050),(500,1035),(380,1010),(300,950),(280,870),(325,760)],
 'wanderfalke':[(390,640),(1090,670),(1150,805),(1120,895),(1060,970),(920,1030),(760,1060),(600,1055),(480,1020),(385,970),(335,895),(295,800),(350,735)],
 'rotschwanzbussard':[(350,625),(1025,610),(1090,750),(1140,810),(1140,900),(1050,995),(920,1060),(765,1090),(610,1090),(470,1065),(375,1040),(290,960),(220,885),(245,810),(295,730)],
 'maeusebussard':[(385,630),(1050,610),(1100,780),(1160,900),(1125,990),(1015,1070),(865,1090),(715,1110),(565,1085),(450,1070),(340,995),(285,900),(295,815),(340,735)],
 'koenigsbussard':[(380,675),(1055,620),(1120,785),(1150,865),(1130,930),(1070,1010),(950,1080),(785,1100),(620,1100),(455,1080),(360,1030),(295,960),(265,900),(300,820),(365,745)],
 'lannerfalke':[(370,650),(1035,620),(1080,780),(1145,905),(1100,970),(990,1015),(865,1080),(680,1095),(490,1100),(365,1050),(265,990),(230,960),(270,845),(320,745)],
 'sakerfalke':[(345,590),(1060,620),(1120,790),(1150,1015),(1100,1120),(1000,1180),(840,1220),(650,1200),(510,1190),(365,1130),(245,1050),(180,930),(175,845),(260,735)],
 'baumfalke':[(345,610),(990,645),(1040,780),(1075,875),(1030,960),(940,1020),(835,1090),(720,1125),(560,1120),(440,1100),(340,1050),(270,970),(225,880),(280,735)],
 'steinadler':[(355,565),(1080,590),(1120,785),(1145,930),(1085,1010),(940,1030),(780,1040),(610,1030),(445,1030),(280,1000),(175,970),(180,865),(260,735),(330,650)],
 'riesenseeadler':[(435,580),(1040,615),(1090,795),(1150,905),(1120,970),(1000,1015),(865,1060),(695,1060),(535,1065),(390,1040),(270,985),(270,925),(345,820),(405,735)],
 'zwergadler':[(330,720),(1140,690),(1185,900),(1130,1020),(1040,1110),(905,1160),(720,1170),(560,1170),(420,1135),(320,1080),(270,990),(255,925),(300,825)],
 'gaukler':[(430,625),(1020,650),(1040,800),(1030,950),(970,980),(880,995),(760,1000),(640,1010),(480,995),(335,980),(225,950),(205,900),(260,865),(330,780)]
}
full={
 'habichtsadler':[(118,465),(155,390),(230,310),(300,250),(455,180),(620,152),(770,182),(920,260),(1000,390),(1080,495),(1120,660),(1160,790),(1185,930),(1170,1010),(1040,1075),(910,1120),(765,1170),(590,1155),(445,1110),(310,1085),(240,1000),(205,940),(245,815),(300,715),(340,650),(345,595),(310,550),(250,528),(165,540),(147,588),(127,555)],
 'kaiseradler':[(66,460),(125,375),(190,325),(245,270),(395,190),(550,145),(700,145),(855,175),(990,245),(1080,380),(1140,560),(1180,735),(1210,890),(1190,990),(1090,1050),(950,1120),(800,1150),(610,1150),(445,1130),(330,1070),(280,995),(295,900),(350,790),(395,705),(410,650),(345,580),(280,540),(225,540),(120,555),(115,630),(80,585)],
 'iberienadler':[(80,435),(130,365),(195,315),(245,245),(380,175),(535,130),(685,125),(830,155),(980,245),(1080,370),(1135,535),(1185,730),(1210,870),(1190,975),(1110,1070),(975,1135),(820,1155),(670,1170),(500,1125),(350,1110),(260,1045),(235,960),(300,850),(355,760),(390,685),(380,620),(345,560),(285,540),(200,525),(135,550),(125,615),(95,575)],
 'klippenadler':[(65,445),(120,370),(190,315),(230,270),(370,190),(550,135),(705,123),(850,155),(995,240),(1080,360),(1140,500),(1170,650),(1200,780),(1205,940),(1170,1030),(1050,1090),(915,1140),(760,1160),(610,1160),(445,1125),(310,1100),(245,1030),(235,955),(300,840),(360,750),(390,680),(380,620),(335,575),(280,550),(185,560),(125,595),(125,640),(85,600)],
 'sakerfalke':[(115,440),(165,345),(235,255),(290,180),(420,100),(600,60),(775,70),(905,145),(1015,285),(1080,445),(1110,615),(1135,780),(1150,1015),(1100,1120),(1000,1180),(840,1220),(650,1200),(510,1190),(365,1130),(245,1050),(180,930),(175,845),(260,735),(330,650),(350,590),(320,535),(270,505),(185,520),(160,580),(135,555)],
 'riesenseeadler':[(95,500),(100,440),(145,380),(240,325),(275,310),(315,215),(400,145),(620,118),(840,185),(970,350),(1040,515),(1080,800),(1145,910),(1130,970),(1000,1020),(865,1060),(695,1060),(535,1065),(390,1040),(270,985),(245,965),(320,840),(390,750),(420,645),(405,610),(365,580),(320,565),(280,580),(175,620),(158,700),(125,655),(100,600)]
}
full.update(json.loads((folder/'remaining-masks.json').read_text()))
full.update(json.loads((folder/'special-masks.json').read_text()))
for r in manifest['records']:
 if r['id'] not in lower and r['id'] not in full: continue
 if len(sys.argv)>1 and r['id'] not in sys.argv[1:]: continue
 if r['status']=='local-preview': continue
 if 'mattePass' in r: continue
 rgb=np.array(Image.open(r['generated']).convert('RGB'));h,w=rgb.shape[:2]
 assert (h,w)==(1254,1254)
 original=np.array(Image.open(r['original']).convert('RGBA'))
 m=(original[:,:,3]>128).astype(np.uint8);m[700:]=0
 neck=np.zeros_like(m)
 if r['id'] in lower: cv2.fillPoly(neck,[np.array(lower[r['id']],np.int32)],1)
 m=np.maximum(m,neck)
 if r['id'] in full:
  m=np.zeros_like(m);cv2.fillPoly(m,[np.array(full[r['id']],np.int32)],1)
 inner=cv2.erode(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(85,85)))
 outer=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(75,75)))
 trimap=np.where(m,cv2.GC_PR_FGD,cv2.GC_PR_BGD).astype(np.uint8)
 trimap[inner==1]=cv2.GC_FGD;trimap[outer==0]=cv2.GC_BGD
 if r['id'] == 'sekretaer':
  # Narrow black crest feathers and the hooked bill need explicit foreground
  # seeds: erosion of the body seed otherwise excludes these thin structures.
  trimap[(rgb.max(axis=2)<170)&(outer==1)]=cv2.GC_FGD
 cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),trimap,None,np.zeros((1,65)),np.zeros((1,65)),5,cv2.GC_INIT_WITH_MASK)
 fg=((trimap==cv2.GC_FGD)|(trimap==cv2.GC_PR_FGD)).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(fg,8)
 fg=binary_fill_holes(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 alpha=cv2.GaussianBlur(fg.astype(np.float32),(3,3),.55);alpha[alpha<.04]=0;alpha[alpha>.96]=1
 core=cv2.erode(fg,np.ones((5,5),np.uint8));_,idx=distance_transform_edt(1-core,return_indices=True)
 edge=(alpha>0)&(core==0);rgb[edge]=rgb[idx[0][edge],idx[1][edge]]
 rgba=np.dstack([rgb,(alpha*255).round().astype(np.uint8)]);rgba[alpha==0]=0
 Image.fromarray(rgba).save(r['output'])
 for field in ['original','reference','generated','output']:
  r[field+'Sha256']=hashlib.sha256(Path(r[field]).read_bytes()).hexdigest()
 if 'anatomyReference' in r: r['anatomyReference']['sha256']=hashlib.sha256(Path(r['anatomyReference']['path']).read_bytes()).hexdigest()
 yy,xx=np.where(alpha>.5)
 r['alphaCheck']={'bbox':[int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())],'transparentPixels':int((alpha==0).sum()),'opaquePixels':int((alpha==1).sum())}
 r['localFinish']='Protected interior GrabCut and 2px edge-color decontamination only. No resize, crop or geometry change.'
 print(r['id'],r['alphaCheck'])
(folder/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
