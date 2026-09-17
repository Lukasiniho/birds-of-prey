import os,json,cv2,numpy as np,sys
from scipy.optimize import least_squares
from scipy.ndimage import map_coordinates
from shapely.geometry import shape
from shapely.ops import unary_union
from pyproj import Proj
root=os.getcwd();out='/private/tmp/eagle-range-additions-20260913/registration';os.makedirs(out,exist_ok=True)
world=json.load(open(root+'/data/ranges/world.geojson'));land=unary_union([shape(f['geometry']) for f in world['features']]);polys=list(land.geoms)
coords=[]
for p in polys:
 if p.bounds[3]<-60:continue
 for line in [p.exterior,*p.interiors]:
  c=np.array(line.coords)
  for a,b in zip(c[:-1],c[1:]):
   if abs(a[0]-b[0])>180:continue
   n=max(1,int(np.linalg.norm(b-a)/.15));coords.extend(a+(b-a)*np.arange(n)[:,None]/n)
coords=np.array(coords);coords=coords[np.abs(coords[:,1])<83]
configs=json.load(open('/private/tmp/eagle-range-additions-20260913/fit-config.json'));results={}
for ident in sys.argv[1:] or configs:
 config=configs[ident];raw=cv2.imread('/private/tmp/eagle-range-additions-20260913/'+ident+'.png',cv2.IMREAD_UNCHANGED);h,w=raw.shape[:2];ratio=1000/w;img=cv2.resize(raw,(1000,round(h*ratio)));H,W=img.shape[:2]
 if img.shape[2]==4:
  alpha=img[:,:,3]/255;img=(img[:,:,:3]*alpha[:,:,None]+255*(1-alpha[:,:,None])).astype(np.uint8)
 else:img=img[:,:,:3]
 ocean=np.array(config.get('ocean',[255,255,255]));mask=(np.linalg.norm(img.astype(float)-ocean,axis=2)>config.get('ocean_threshold',30)).astype(np.uint8)
 if config.get('white_land'):
  hsv=cv2.cvtColor(img,cv2.COLOR_BGR2HSV); mask=(((hsv[:,:,1]<20)&(hsv[:,:,2]>240))|(hsv[:,:,2]<60)|(hsv[:,:,1]>200)).astype(np.uint8)
 mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8));edge=cv2.morphologyEx(mask,cv2.MORPH_GRADIENT,np.ones((3,3),np.uint8));edge[:4]=0;edge[-4:]=0;edge[:,:4]=0;edge[:,-4:]=0;dist=cv2.distanceTransform(1-edge,cv2.DIST_L2,5)
 cv2.imwrite(out+'/'+ident+'-mask.png',mask*255)
 fits=[]
 for spec in config.get('projections',['+proj='+p+' +R=1 +lon_0=0' for p in ['merc','mill','eqc','gall','robin','eqearth','moll','wintri','eck4','eck6']]):
  proj=Proj(spec);control=np.array(config['controls']);cxy=np.column_stack(proj(control[:,0],control[:,1]));cpx=control[:,2:]*ratio
  sx,tx=np.linalg.lstsq(np.column_stack([cxy[:,0],np.ones(len(cxy))]),cpx[:,0],rcond=None)[0];sy,ty=np.linalg.lstsq(np.column_stack([cxy[:,1],np.ones(len(cxy))]),cpx[:,1],rcond=None)[0];init=np.array([sx,sy,tx,ty]);xy=np.column_stack(proj(coords[:,0],coords[:,1]));px=xy*init[:2]+init[2:]; chosen=np.isfinite(px).all(1)&(px[:,0]>15)&(px[:,0]<W-15)&(px[:,1]>15)&(px[:,1]<H-15);
  if config.get('review_bounds'):
   west,south,east,north=config['review_bounds'];chosen &= (coords[:,0]>west)&(coords[:,0]<east)&(coords[:,1]>south)&(coords[:,1]<north)
  q=xy[chosen]
  def residual(t,qq=q):
   v=qq*t[:2]+t[2:];return map_coordinates(dist,[v[:,1],v[:,0]],order=1,mode='constant',cval=40)
  # Even samples are fitting data; odd samples are retained for validation.
  train=q[::2];delta=np.array([abs(sx)*.18,abs(sy)*.18,80,80]);fit=least_squares(lambda t:residual(t,train),init,bounds=(init-delta,init+delta),diff_step=1e-4,loss='soft_l1',f_scale=1.5,max_nfev=180)
  d=residual(fit.x,q[1::2]);score=np.sqrt(np.mean(np.minimum(d,15)**2));f={'proj_string':spec,'parameters_1000px':fit.x.tolist(),'coast_rmse_capped15_px':float(score),'coast_median_px':float(np.median(d)),'coast_p90_px':float(np.percentile(d,90)),'sample_count':len(d)};fits.append(f)
 fits.sort(key=lambda f:f['coast_rmse_capped15_px']);best=fits[0];t=np.array(best['parameters_1000px']);proj=Proj(best['proj_string']);overlay=img.copy()
 for p in polys:
  c=np.array(p.exterior.coords);v=np.column_stack(proj(c[:,0],np.clip(c[:,1],-85,85)))*t[:2]+t[2:]
  for a,b in zip(v[:-1],v[1:]):
   if np.isfinite([a,b]).all() and np.linalg.norm(b-a)<100 and max(abs(a).max(),abs(b).max())<20000:cv2.line(overlay,tuple(a.astype(int)),tuple(b.astype(int)),(0,0,255),1,cv2.LINE_AA)
 cv2.imwrite(out+'/'+ident+'-overlay.png',overlay)
 best.update(image_width=w,image_height=h,pixel_transform_native=(t/ratio).tolist(),transform_definition='pixel_x=sx*projected_x+tx; pixel_y=sy*projected_y+ty',validation='Odd coastline samples withheld from affine fit. Normalized to 1000px width.',controls=config['controls'],review_bounds=config.get('review_bounds'),all_fits=fits[1:]);json.dump(best,open(out+'/'+ident+'.json','w'),indent=2);print(ident,best['proj_string'],'p90',round(best['coast_p90_px'],2),'cappedRMSE',round(best['coast_rmse_capped15_px'],2),flush=True)
