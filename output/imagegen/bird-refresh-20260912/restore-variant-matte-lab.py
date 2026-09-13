"""Restore an aligned variant matte without inheriting the adult's edge hue.
Use the adult alpha/edge luminance texture; propagate the generated foreground's
Lab chroma to the edge. Prevents a blue-gray adult crown turning cyan on a white
variant when independent RGB channel gains are used.
"""
import argparse,cv2,numpy as np
from scipy.ndimage import distance_transform_edt
p=argparse.ArgumentParser();p.add_argument('original');p.add_argument('generated');p.add_argument('output');a=p.parse_args()
base=cv2.imread(a.original,cv2.IMREAD_UNCHANGED);edit=cv2.imread(a.generated)
h,w=base.shape[:2];edit=cv2.resize(edit,(w,h),interpolation=cv2.INTER_LANCZOS4)
alpha=base[:,:,3];source=cv2.cvtColor(base[:,:,:3].astype('float32')/255,cv2.COLOR_BGR2Lab);target=cv2.cvtColor(edit.astype('float32')/255,cv2.COLOR_BGR2Lab)
distance=distance_transform_edt(alpha>128);core=distance>24
weight=cv2.GaussianBlur(core.astype('float32'),(0,0),18)
params=target.copy();params[:,:,0]=np.log((target[:,:,0]+5)/(source[:,:,0]+5))
field=cv2.GaussianBlur(params*core[:,:,None],(0,0),18)/np.maximum(weight[:,:,None],1e-6)
good=weight>.08;_,near=distance_transform_edt(~good,return_indices=True);field[~good]=field[near[0][~good],near[1][~good]]
recovered=field.copy();recovered[:,:,0]=np.clip((source[:,:,0]+5)*np.exp(field[:,:,0])-5,0,100)
blend=np.clip((distance-12)/12,0,1)[:,:,None];lab=(recovered*(1-blend)+target*blend).astype('float32')
rgb=np.clip(cv2.cvtColor(lab,cv2.COLOR_Lab2BGR)*255,0,255).astype('uint8');out=np.dstack([rgb,alpha]);out[alpha==0]=0
assert cv2.imwrite(a.output,out);print(a.output)
