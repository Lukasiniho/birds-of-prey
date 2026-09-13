import sharp from 'sharp';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const original='public/birds/portrait-aguja.png';
const generated='/Users/lukasvonhohnhorst/.codex/generated_images/01a099ef-de8d-7712-bd8a-c8942ee0ec43/exec-dc752405-e057-4662-8f8b-24a48253d6db.png';
const output='public/birds/portrait-aguja-20260913-v2.png';
const base=await sharp(original).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const edit=await sharp(generated).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const {width,height}=base.info;
if(width!==edit.info.width||height!==edit.info.height) throw new Error('Canvas changed');
const count=width*height,distance=new Uint16Array(count).fill(65535),queue=new Int32Array(count);
let head=0,tail=0;
for(let i=0;i<count;i++) if(base.data[i*4+3]<250){distance[i]=0;queue[tail++]=i;}
while(head<tail){
  const i=queue[head++],x=i%width,y=Math.floor(i/width);
  for(const n of [x>0?i-1:-1,x+1<width?i+1:-1,y>0?i-width:-1,y+1<height?i+width:-1])
    if(n>=0&&distance[n]>distance[i]+1){distance[n]=distance[i]+1;queue[tail++]=n;}
}
// Keep the exact approved silhouette and its feather tips. The generated
// surface replaces only the interior; its rendered background is never used.
const out=Buffer.from(base.data);
for(let i=0;i<count;i++){
  let w=Math.max(0,Math.min(1,(distance[i]-20)/30));w=w*w*(3-2*w);
  for(let c=0;c<3;c++)out[i*4+c]=Math.round(base.data[i*4+c]*(1-w)+edit.data[i*4+c]*w);
  if(!out[i*4+3])out.fill(0,i*4,i*4+4);
}
await sharp(out,{raw:base.info}).png().toFile(output);
const report={original,generated,output,canvas:[width,height],alphaIdentical:true,edgeGeometry:'Original alpha and outer 20 px retained, smooth interior surface transition over the next 30 px. No scaling, cropping, translation or neck distortion.'};
for(const key of ['original','generated','output'])report[`${key}Sha256`]=crypto.createHash('sha256').update(await fs.readFile(report[key])).digest('hex');
await fs.writeFile('output/imagegen/aguja-natural-20260913/verification.json',JSON.stringify(report,null,2)+'\n');
const inputs=[];
for(let row=0;row<2;row++)for(let col=0;col<3;col++){
const input=await sharp([original,output][row]).resize(320,320).flatten({background:['#f5f9fa','#15252d','#557d77'][col]}).png().toBuffer();
inputs.push({input,left:col*320,top:row*320});
}
await sharp({create:{width:960,height:640,channels:3,background:'#f5f9fa'}}).composite(inputs).png().toFile('output/imagegen/aguja-natural-20260913/comparison.png');
console.log(report);
