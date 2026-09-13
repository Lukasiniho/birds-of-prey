import sharp from 'sharp';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const generated='/Users/lukasvonhohnhorst/.codex/generated_images/01a09aa2-73d0-7cb3-a5ff-4b32c6c83090/exec-7c9ebbf1-477c-4cee-9587-927f44c7f969.png';
const output='public/birds/portrait-gaukler-20260913-v3.png';
const {data,info}=await sharp(generated).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const {width:w,height:h}=info,n=w*h,bg=new Uint8Array(n),queue=new Int32Array(n);let head=0,tail=0;
// Only border-connected neutral checkerboard is background; enclosed light
// feathers stay opaque. No global white/gray deletion or interior holes.
function candidate(i){const r=data[i*4],g=data[i*4+1],b=data[i*4+2];return Math.min(r,g,b)>177&&Math.max(r,g,b)-Math.min(r,g,b)<25;}
function visit(i){if(!bg[i]&&candidate(i)){bg[i]=1;queue[tail++]=i;}}
for(let x=0;x<w;x++){visit(x);visit((h-1)*w+x);}for(let y=0;y<h;y++){visit(y*w);visit(y*w+w-1);}
while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)visit(i-1);if(x<w-1)visit(i+1);if(y)visit(i-w);if(y<h-1)visit(i+w);}
for(let i=0;i<n;i++)if(bg[i])data.fill(0,i*4,i*4+4);
// Small edge antialias only along the segmented outside, never inside feathers.
for(let i=0;i<n;i++)if(!bg[i]){const x=i%w,y=Math.floor(i/w);const edge=(x&&bg[i-1])||(x<w-1&&bg[i+1])||(y&&bg[i-w])||(y<h-1&&bg[i+w]);if(edge){const v=Math.min(data[i*4],data[i*4+1],data[i*4+2]);if(v>110){const a=Math.max(.12,Math.min(1,(220-v)/110));for(let c=0;c<3;c++)data[i*4+c]=Math.max(0,Math.min(255,(data[i*4+c]-220*(1-a))/a));data[i*4+3]=Math.round(a*255);}}}
await sharp(data,{raw:{width:w,height:h,channels:4}}).png().toFile(output);
const paths={original:'public/birds/portrait-gaukler-20260913-v2.png',generated,output,compositionReference:'public/birds/portrait-habicht-20260912.png',approvedComparison:'public/birds/portrait-aguja-20260913-v3.png'};
const report={...paths,method:'Built-in imagegen edit; local border-connected background segmentation with protected light feathers and edge antialiasing. No neck distortion.',canvas:[w,h],transparentPixels:bg.reduce((a,b)=>a+b,0)};
for(const [k,p]of Object.entries(paths))report[k+'Sha256']=crypto.createHash('sha256').update(await fs.readFile(p)).digest('hex');
await fs.writeFile('output/imagegen/portrait-balance-20260913/verification.json',JSON.stringify(report,null,2)+'\n');
const panels=[];for(let row=0;row<2;row++)for(let col=0;col<3;col++)panels.push({input:await sharp([paths.original,output][row]).resize(300,300).flatten({background:['#f6f9fa','#182934','#557c77'][col]}).png().toBuffer(),left:col*300,top:row*300});
await sharp({create:{width:900,height:600,channels:3,background:'#f6f9fa'}}).composite(panels).png().toFile('output/imagegen/portrait-balance-20260913/alpha-review.png');
console.log(report);
