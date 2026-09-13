import sharp from 'sharp';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const generated='/Users/lukasvonhohnhorst/.codex/generated_images/01a09ad9-bc2d-7391-aa5e-7947c87962a6/exec-f590262d-a7c2-44bb-b394-aaed09942bfc.png';
const output='public/birds/portrait-wespenbussard-20260913-middle.png';
const {data,info}=await sharp(generated).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const {width:w,height:h}=info,n=w*h,bg=new Uint8Array(n),queue=new Int32Array(n);let head=0,tail=0;
// Segment only neutral background connected to the canvas border. Interior
// pale throat feathers and all disconnected light markings remain protected.
function candidate(i){const r=data[i*4],g=data[i*4+1],b=data[i*4+2];return Math.min(r,g,b)>175&&Math.max(r,g,b)-Math.min(r,g,b)<22;}
function visit(i){if(!bg[i]&&candidate(i)){bg[i]=1;queue[tail++]=i;}}
for(let x=0;x<w;x++){visit(x);visit((h-1)*w+x);}for(let y=0;y<h;y++){visit(y*w);visit(y*w+w-1);}
while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)visit(i-1);if(x<w-1)visit(i+1);if(y)visit(i-w);if(y<h-1)visit(i+w);}
for(let i=0;i<n;i++)if(bg[i])data.fill(0,i*4,i*4+4);
for(let i=0;i<n;i++)if(!bg[i]){const x=i%w,y=Math.floor(i/w);const edge=(x&&bg[i-1])||(x<w-1&&bg[i+1])||(y&&bg[i-w])||(y<h-1&&bg[i+w]);if(edge){const v=Math.min(data[i*4],data[i*4+1],data[i*4+2]);if(v>110){const a=Math.max(.12,Math.min(1,(220-v)/110));for(let c=0;c<3;c++)data[i*4+c]=Math.max(0,Math.min(255,(data[i*4+c]-220*(1-a))/a));data[i*4+3]=Math.round(a*255);}}}
await sharp(data,{raw:{width:w,height:h,channels:4}}).png().toFile(output);
const paths={original:'public/birds/portrait-wespenbussard.png',otherEndpoint:'public/birds/portrait-wespenbussard-20260912.png',compositionReference:'public/birds/portrait-habicht-20260912.png',generated,output};
const report={...paths,method:'Built-in imagegen edit, then local border-connected neutral-background segmentation and edge decontamination. No geometric distortion.',canvas:[w,h],transparentPixels:tail};
for(const [k,p]of Object.entries(paths))report[k+'Sha256']=crypto.createHash('sha256').update(await fs.readFile(p)).digest('hex');
await fs.writeFile('output/imagegen/wespenbussard-middle-20260913/verification.json',JSON.stringify(report,null,2)+'\n');
const panels=[];for(let row=0;row<3;row++)for(let col=0;col<3;col++)panels.push({input:await sharp([paths.original,output,paths.otherEndpoint][row]).resize(260,260).flatten({background:['#f6f9fa','#182934','#557c77'][col]}).png().toBuffer(),left:col*260,top:row*260});
await sharp({create:{width:780,height:780,channels:3,background:'#f6f9fa'}}).composite(panels).png().toFile('output/imagegen/wespenbussard-middle-20260913/comparison.png');
console.log(report);
