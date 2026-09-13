"""Local, user-authorized portrait background segmentation and canvas fitting.

Run from the repository root with Python containing OpenCV, Pillow and scipy.
Polygons describe each generated bird, never a different species' silhouette.
Interior plumage is protected; color alone never removes light feathers.
"""
import json
import hashlib
import sys
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt, binary_fill_holes

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = Path(__file__).with_name('manifest.json')
OUT = Path('/tmp/portrait-review-20260912/finished')
OUT.mkdir(parents=True, exist_ok=True)
# Coordinates on each generated 1254px canvas, traced from the visible contour.
POLYGONS = {
 'habicht': [(90,500),(160,360),(195,290),(240,210),(365,132),(515,90),(670,90),(850,135),(990,230),(1080,370),(1130,505),(1140,620),(1190,790),(1215,940),(1175,1030),(1100,1085),(970,1115),(820,1150),(650,1130),(460,1145),(310,1115),(210,1050),(195,940),(230,850),(310,755),(355,650),(335,565),(255,562),(200,575),(140,650),(100,570)],
 'turmfalke': [(195,480),(245,395),(245,315),(335,210),(445,167),(560,145),(725,170),(860,242),(940,370),(1005,520),(1025,630),(1050,715),(1075,800),(1040,875),(970,935),(870,970),(730,995),(600,1005),(485,990),(390,950),(330,900),(310,830),(340,740),(355,690),(330,630),(300,595),(280,557),(240,575),(233,635),(205,595),(190,540)],
 'fischadler': [(22,535),(80,430),(155,355),(185,245),(290,155),(465,95),(685,70),(870,95),(1010,140),(1120,215),(1150,310),(1220,440),(1190,560),(1220,710),(1220,880),(1200,1000),(1130,1100),(1020,1150),(855,1175),(665,1180),(510,1100),(390,1050),(365,975),(410,850),(395,740),(315,645),(280,615),(165,650),(90,652),(95,750),(60,710),(25,640)],
 'wespenbussard': [(25,480),(95,390),(145,365),(205,265),(335,180),(480,105),(645,90),(860,130),(1040,225),(1110,350),(1170,450),(1190,590),(1230,765),(1220,920),(1190,1030),(1075,1110),(925,1165),(765,1190),(610,1170),(445,1125),(365,1040),(385,930),(435,795),(420,700),(365,610),(285,570),(210,550),(60,550),(50,635),(30,590)],
 'wanderfalke': [(170,460),(230,360),(275,255),(395,155),(510,122),(690,132),(865,210),(960,350),(1020,495),(1060,620),(1120,760),(1140,930),(1110,990),(1040,1040),(860,1060),(685,1060),(500,1040),(330,1045),(120,1030),(150,955),(260,830),(350,715),(390,625),(365,560),(315,505),(225,505),(210,570),(180,535)],
}

data = json.loads(MANIFEST.read_text())
for rec in data['records']:
    if len(sys.argv)>1 and rec['id'] not in sys.argv[1:]:
        continue
    rec['originalSha256'] = hashlib.sha256((ROOT / rec['original']).read_bytes()).hexdigest()
    if rec['reference']:
        rec['referenceSha256'] = hashlib.sha256((ROOT / rec['reference']).read_bytes()).hexdigest()
    name = rec['id']
    if name not in POLYGONS:
        continue
    rgb = np.array(Image.open(rec['generated']).convert('RGB'))
    h, w = rgb.shape[:2]
    shape = np.zeros((h,w), np.uint8)
    polygon = np.array(POLYGONS[name], np.float32) * [w/1254, h/1254]
    cv2.fillPoly(shape, [polygon.astype(np.int32)], 1)
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (71,71))
    inner = cv2.erode(shape, k)
    outer = cv2.dilate(shape, cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(45,45)))
    mask = np.where(shape, cv2.GC_PR_FGD, cv2.GC_PR_BGD).astype(np.uint8)
    mask[outer==0] = cv2.GC_BGD
    mask[inner==1] = cv2.GC_FGD
    cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),mask,None,np.zeros((1,65)),np.zeros((1,65)),5,cv2.GC_INIT_WITH_MASK)
    fg = ((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD)).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(fg,8)
    fg = (labels == (1 + np.argmax(stats[1:,cv2.CC_STAT_AREA]))).astype(np.uint8)
    fg = binary_fill_holes(fg).astype(np.uint8)
    alpha = cv2.GaussianBlur(fg.astype(np.float32),(3,3),0.55)
    alpha[alpha<0.04]=0
    alpha[alpha>0.96]=1
    # Remove checkerboard fringe colors only within 2px of the boundary.
    core = cv2.erode(fg,np.ones((5,5),np.uint8))
    _, nearest = distance_transform_edt(1-core,return_indices=True)
    edge = (alpha>0)&(core==0)
    rgb[edge] = rgb[nearest[0][edge],nearest[1][edge]]
    rgba=np.dstack([rgb,(alpha*255).round().astype(np.uint8)])
    rgba[alpha==0]=0
    image=Image.fromarray(rgba)
    if name not in ('wanderfalke','turmfalke'):
        # Shared 81% visible extent, centered in the existing 1254px canvas.
        box=image.getbbox()
        cut=image.crop(box)
        scale=1016/max(cut.size)
        cut=cut.resize((round(cut.width*scale),round(cut.height*scale)),Image.Resampling.LANCZOS)
        image=Image.new('RGBA',(1254,1254))
        top=(1254-cut.height)//2
        if name=='fischadler':
            top-=55  # Align eye height to the Seeadler pilot grid.
        image.alpha_composite(cut,((1254-cut.width)//2,top))
        rec['canvasFit']={'sourceBounds':box,'scale':scale,'visibleExtent':1016,'top':top}
    image.save(ROOT / rec['output'])
    Image.fromarray((alpha*255).round().astype(np.uint8)).save(OUT/f'{name}-mask.png')
    rec['localFinish']='Own manually traced trimap; GrabCut in boundary band with protected interior; largest connected bird and filled internal holes; subpixel edge and 2px color decontamination. Shared canvas fit except preserved peregrine/kestrel framing; osprey eye-height alignment.'
    rec['outputSha256']=hashlib.sha256((ROOT/rec['output']).read_bytes()).hexdigest()
    print(name, image.getbbox())
MANIFEST.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
