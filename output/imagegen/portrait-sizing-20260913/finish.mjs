import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';

const folder = new URL('./', import.meta.url);
const manifest = JSON.parse(await fs.readFile(new URL('manifest.json', folder), 'utf8'));
for (const record of manifest.records) {
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
  await sharp(rgba,{raw:{width,height,channels:4}}).png().toFile(new URL(`${record.id}-cutout.png`,folder).pathname);
  const original=await sharp(record.original).ensureAlpha().raw().toBuffer();
  const out=Buffer.from(original);
  // Preserve the original head exactly; blend only the generated lower-neck feather patch.
  for(let y=record.blend[0];y<height;y++) {
    let w=Math.max(0,Math.min(1,(y-record.blend[0])/(record.blend[1]-record.blend[0])));
    w=w*w*(3-2*w);
    for(let x=0;x<width;x++) {
      const i=(y*width+x)*4;
      const a=original[i+3]/255*(1-w),b=rgba[i+3]/255*w,alpha=a+b;
      for(let c=0;c<3;c++) out[i+c]=alpha ? Math.round((original[i+c]*a+rgba[i+c]*b)/alpha):0;
      out[i+3]=Math.round(alpha*255);
    }
  }
  await sharp(out,{raw:{width,height,channels:4}}).png().toFile(record.output);
  for(const key of ['original','reference','generated','matte','output']) record[`${key}Sha256`]=crypto.createHash('sha256').update(await fs.readFile(record[key])).digest('hex');
  record.localFinish='Explicit green matte extraction with background unmixing; original head pixels retained exactly, lower neck patch blended in premultiplied alpha without stretching or squashing.';
  record.headUnchanged=out.subarray(0,width*record.blend[0]*4).equals(original.subarray(0,width*record.blend[0]*4));
  console.log(record.id,{headUnchanged:record.headUnchanged,sha:record.outputSha256});
}
await fs.writeFile(new URL('manifest.json',folder),JSON.stringify(manifest,null,2)+'\n');
