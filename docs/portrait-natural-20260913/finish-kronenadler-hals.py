"""Extract the generated checker backdrop, protecting the portrait interior."""
from pathlib import Path
import hashlib
import json
import cv2
import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, distance_transform_edt

root = Path(__file__).resolve().parents[2]
source = Path('/Users/lukasvonhohnhorst/.codex/generated_images/01a09a94-5834-7373-b69d-17476a072171/exec-51ebcdb9-b493-4386-82ad-412f6f5697bf.png')
original = root / 'public/birds/portrait-kronenadler-20260913-v3.png'
output = root / 'public/birds/portrait-kronenadler-20260913-v4.png'
rgb = np.array(Image.open(source).convert('RGB'))
# The polygon follows the outer silhouette; pale interior feathers stay protected.
points = [(113,605),(144,530),(207,455),(215,383),(318,283),(481,202),(641,129),(767,58),(848,36),(899,79),(952,43),(982,71),(960,143),(1043,163),(1105,146),(1125,172),(1100,233),(1150,265),(1141,311),(1106,331),(1137,393),(1150,445),(1110,446),(1134,507),(1161,558),(1122,574),(1073,607),(1087,700),(1061,735),(1065,828),(1097,919),(1124,978),(1092,991),(1118,1033),(1064,1046),(1086,1095),(1002,1133),(915,1167),(820,1224),(711,1228),(625,1230),(530,1208),(463,1175),(375,1160),(318,1112),(253,1073),(273,1005),(246,1015),(267,947),(306,868),(330,794),(340,728),(323,681),(288,655),(209,656),(174,653),(170,726),(148,718),(126,675)]
mask = np.zeros(rgb.shape[:2], np.uint8)
cv2.fillPoly(mask, [np.array(points, np.int32)], 1)
inner = cv2.erode(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (35,35)))
outer = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (45,45)))
trimap = np.where(mask, cv2.GC_PR_FGD, cv2.GC_PR_BGD).astype(np.uint8)
trimap[inner == 1] = cv2.GC_FGD
trimap[outer == 0] = cv2.GC_BGD
neutral = (rgb.max(2).astype(int)-rgb.min(2).astype(int) < 15) & (rgb.min(2) > 195) & (rgb[:,:,2].astype(int) >= rgb[:,:,0].astype(int)-1)
beak = np.zeros(mask.shape, np.uint8)
cv2.fillPoly(beak,[np.array([(124,603),(145,549),(196,491),(234,455),(263,470),(300,520),(327,558),(322,619),(279,649),(203,660),(170,722),(149,701),(130,670)],np.int32)],1)
beak[645:] = 0
_, bglabels = cv2.connectedComponents((neutral & (beak == 0)).astype(np.uint8), 8)
border = np.unique(np.concatenate([bglabels[0],bglabels[-1],bglabels[:,0],bglabels[:,-1]]))
checker = np.isin(bglabels, border[border != 0])
trimap[checker] = cv2.GC_BGD
trimap[beak == 1] = cv2.GC_FGD
cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),trimap,None,np.zeros((1,65)),np.zeros((1,65)),5,cv2.GC_INIT_WITH_MASK)
fg = ((trimap == cv2.GC_FGD) | (trimap == cv2.GC_PR_FGD)).astype(np.uint8)
_, labels, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
fg = binary_fill_holes(labels == 1+np.argmax(stats[1:,cv2.CC_STAT_AREA])).astype(np.uint8)
fg[checker] = 0
alpha = cv2.GaussianBlur(fg.astype(np.float32),(3,3),.55)
alpha[alpha < .04] = 0
alpha[alpha > .96] = 1
core = cv2.erode(fg,np.ones((5,5),np.uint8))
_, idx = distance_transform_edt(1-core,return_indices=True)
edge = (alpha > 0) & (core == 0)
rgb[edge] = rgb[idx[0][edge],idx[1][edge]]
rgba = np.dstack([rgb,(alpha*255).round().astype(np.uint8)])
rgba[alpha == 0] = 0
cut = Image.fromarray(rgba)
box = cut.getbbox()
cut = cut.crop(box)
scale = min(1144/cut.width, 1144/cut.height)
size = tuple(round(v*scale) for v in cut.size)
offset = ((1254-size[0])//2,55)
final = Image.new('RGBA',(1254,1254))
final.alpha_composite(cut.resize(size,Image.Resampling.LANCZOS),offset)
final.save(output)
report = {'generator':'built-in image_gen','prompt':'kronenadler-hals-prompt.txt','original':str(original.relative_to(root)),'originalSha256':hashlib.sha256(original.read_bytes()).hexdigest(),'compositionReference':'public/birds/portrait-habicht-20260912.png','generatedSource':str(source),'output':str(output.relative_to(root)),'outputSha256':hashlib.sha256(output.read_bytes()).hexdigest(),'generatedBounds':box,'uniformScale':scale,'offset':offset,'finalBounds':final.getbbox(),'canvas':final.size,'processing':'Protected-interior GrabCut, outside-connected checker removal, 2px edge decontamination, uniform placement; no anatomical pixel stretching.'}
(root/'docs/portrait-natural-20260913/kronenadler-hals.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
