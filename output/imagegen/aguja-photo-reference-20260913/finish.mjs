import fs from 'node:fs/promises';
import sharp from 'sharp';
import crypto from 'node:crypto';
const record={matte:'/Users/lukasvonhohnhorst/.codex/generated_images/01a099ef-de8d-7712-bd8a-c8942ee0ec43/exec-965c83ce-8c4c-4b54-b6fd-edabd9913d61.png'};
  const {data: rgb, info} = await sharp(record.matte).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const {width, height} = info;
  const rgba = Buffer.alloc(width * height * 4);
  // Extract the explicit green matte; neutral and white feather colors are never keyed.
  for (let i=0; i<width*height; i++) {
    const r=rgb[i*3], g=rgb[i*3+1], b=rgb[i*3+2];
    const excess=g-Math.max(r,b);
    let alpha=Math.max(0, Math.min(1,1-excess/255));
    if (excess<10) alpha=1;
    if (alpha<0.045) alpha=0;
    for (let c=0;c<3;c++) rgba[i*4+c]=alpha ? Math.max(0,Math.min(255,Math.round((rgb[i*3+c]-(c===1 ? 255*(1-alpha):0))/alpha))) : 0;
    rgba[i*4+3]=Math.round(alpha*255);
  }
  // Keep only the connected bird and its two-pixel antialiased edge, removing matte noise.
  const mask=new Uint8Array(width*height), queue=new Int32Array(width*height);
  let head=0,tail=0;
  const seed=Math.floor(height*0.4)*width+Math.floor(width*0.5);
  mask[seed]=1;queue[tail++]=seed;
  while(head<tail) {
    const i=queue[head++],x=i%width,y=Math.floor(i/width);
    for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) {
      const nx=x+dx,ny=y+dy,n=ny*width+nx;
      if(nx>=0&&nx<width&&ny>=0&&ny<height&&!mask[n]&&rgba[n*4+3]>64) {mask[n]=1;queue[tail++]=n;}
    }
  }
  const near=new Uint8Array(mask);
  for(let i=0;i<mask.length;i++) if(mask[i]) {
    const x=i%width,y=Math.floor(i/width);
    for(let dy=-2;dy<=2;dy++) for(let dx=-2;dx<=2;dx++) if(x+dx>=0&&x+dx<width&&y+dy>=0&&y+dy<height) near[(y+dy)*width+x+dx]=1;
  }
  for(let i=0;i<mask.length;i++) {
    if(!near[i]) rgba.fill(0,i*4,i*4+4);
    else if(rgba[i*4+3]<255) rgba[i*4+1]=Math.min(rgba[i*4+1],Math.max(rgba[i*4],rgba[i*4+2]));
  }

const folder='output/imagegen/aguja-photo-reference-20260913/';
const original='public/birds/portrait-aguja-20260913-v2.png';
const output='public/birds/portrait-aguja-20260913-v3.png';
function bounds(data,w,h){let left=w,top=h,right=0,bottom=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(data[(y*w+x)*4+3]>32){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}return {left,top,width:right-left+1,height:bottom-top+1};}
const old=await sharp(original).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const target=bounds(old.data,old.info.width,old.info.height),source=bounds(rgba,width,height);
await sharp(rgba,{raw:{width,height,channels:4}}).png().toFile(folder+'cutout.png');
const scale=Math.min(target.width/source.width,target.height/source.height);
const placedWidth=Math.round(source.width*scale),placedHeight=Math.round(source.height*scale);
const left=Math.round(target.left+(target.width-placedWidth)/2),top=target.top;
const cropped=await sharp(rgba,{raw:{width,height,channels:4}}).extract(source).resize(placedWidth,placedHeight).png().toBuffer();
await sharp({create:{width:old.info.width,height:old.info.height,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:cropped,left,top}]).png().toFile(output);
const review=[];
for(let row=0;row<2;row++)for(let col=0;col<3;col++){const input=await sharp([original,output][row]).resize(280,280).flatten({background:['#f5f9fa','#15252d','#557d77'][col]}).png().toBuffer();review.push({input,left:col*280,top:row*280});}
await sharp({create:{width:840,height:560,channels:3,background:'#f5f9fa'}}).composite(review).png().toFile(folder+'comparison.png');
const report={original,matte:record.matte,output,sourceBounds:source,targetBounds:target,placement:{scale,left,top,width:placedWidth,height:placedHeight},canvas:[old.info.width,old.info.height],localFinish:'Explicit green-matte extraction with connected foreground mask and spill cleanup. Uniform placement in existing portrait frame; no anisotropic scaling. Own alpha for corrected anatomy, no restoration of rejected old bill/eye or feather texture.'};
for(const key of ['original','matte','output'])report[key+'Sha256']=crypto.createHash('sha256').update(await fs.readFile(report[key])).digest('hex');
await fs.writeFile(folder+'verification.json',JSON.stringify(report,null,2)+'\n');
console.log(report);
