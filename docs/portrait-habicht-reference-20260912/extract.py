"""User-authorized local extraction. Protect interior plumage, segment edge only."""
import json
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt,binary_fill_holes

folder=Path(__file__).resolve().parent
out=Path('/tmp/portrait-habicht-reference');out.mkdir(exist_ok=True)
polys={
'turmfalke':[(190,480),(240,370),(250,290),(350,190),(510,117),(670,119),(840,180),(950,335),(1005,500),(1050,660),(1080,795),(1100,940),(1080,1010),(1010,1090),(880,1140),(700,1185),(590,1195),(420,1140),(300,1080),(250,980),(275,850),(330,740),(350,650),(300,565),(230,560),(233,620),(200,590)],
'wanderfalke':[(140,475),(200,365),(235,265),(340,190),(480,122),(650,117),(790,155),(900,245),(1000,405),(1050,540),(1090,660),(1135,800),(1150,950),(1070,1030),(930,1090),(760,1120),(600,1110),(460,1070),(350,990),(290,875),(285,790),(350,710),(380,640),(335,565),(300,530),(220,528),(180,600),(145,545)],
'rotschwanzbussard':[(115,465),(180,355),(200,295),(290,235),(420,165),(540,150),(740,175),(880,260),(980,395),(1020,500),(1070,660),(1120,770),(1140,850),(1130,915),(1030,995),(870,1050),(700,1035),(510,1050),(355,1010),(265,960),(220,880),(245,790),(305,705),(350,630),(330,565),(275,545),(200,555),(160,625),(130,580)],
'maeusebussard':[(185,515),(240,435),(280,355),(360,275),(480,215),(610,195),(770,215),(920,305),(1000,430),(1050,585),(1075,740),(1115,855),(1090,940),(1030,1000),(860,1045),(715,1065),(570,1040),(445,1010),(340,935),(300,850),(330,770),(385,710),(380,655),(340,610),(300,585),(245,590),(225,660),(195,615)],
'koenigsbussard':[(100,500),(145,420),(210,345),(255,275),(375,200),(540,140),(705,130),(875,200),(1000,335),(1060,500),(1100,660),(1120,780),(1150,875),(1120,945),(1000,1000),(835,1045),(640,1045),(470,1055),(335,1000),(270,925),(275,870),(335,775),(380,700),(355,650),(315,600),(275,570),(195,605),(150,675),(120,625)]
}
for r in json.loads((folder/'manifest.json').read_text())['records']:
 rgb=np.array(Image.open(r['generated']).convert('RGB'));h,w=rgb.shape[:2]
 m=np.zeros((h,w),np.uint8);cv2.fillPoly(m,[np.array(polys[r['id']],np.int32)],1)
 inner=cv2.erode(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(71,71)))
 outer=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(45,45)))
 trimap=np.where(m,cv2.GC_PR_FGD,cv2.GC_PR_BGD).astype(np.uint8);trimap[inner==1]=cv2.GC_FGD;trimap[outer==0]=cv2.GC_BGD
 cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),trimap,None,np.zeros((1,65)),np.zeros((1,65)),5,cv2.GC_INIT_WITH_MASK)
 fg=((trimap==cv2.GC_FGD)|(trimap==cv2.GC_PR_FGD)).astype(np.uint8)
 _,labels,stats,_=cv2.connectedComponentsWithStats(fg,8);fg=binary_fill_holes(labels==1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
 alpha=cv2.GaussianBlur(fg.astype(np.float32),(3,3),.55);alpha[alpha<.04]=0;alpha[alpha>.96]=1
 core=cv2.erode(fg,np.ones((5,5),np.uint8));_,idx=distance_transform_edt(1-core,return_indices=True);edge=(alpha>0)&(core==0);rgb[edge]=rgb[idx[0][edge],idx[1][edge]]
 rgba=np.dstack([rgb,(alpha*255).round().astype(np.uint8)]);rgba[alpha==0]=0
 Image.fromarray(rgba).save(out/f"{r['id']}.png")
 print(r['id'])
