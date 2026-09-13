import fs from 'node:fs/promises';
import sharp from 'sharp';
import crypto from 'node:crypto';
const dir='docs/portrait-user-refinements-20260913/';
const m=JSON.parse(await fs.readFile(dir+'manifest.json','utf8'));
for(const r of m.records.filter(r=>r.uniformScale)){
 if(process.argv[2]&&r.id!==process.argv[2])continue;
 const side=Math.round(1254*r.uniformScale);
 const x=Math.round(627*(1-r.uniformScale)),y=Math.round(370*(1-r.uniformScale));
 const resized=await sharp(r.original).resize(side,side).png().toBuffer();
 const margin=160;
 const png=await sharp({create:{width:1574,height:1574,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:resized,left:margin+x,top:margin+y}]).png().toBuffer();
 await sharp(png).extract({left:margin,top:margin,width:1254,height:1254}).png().toFile(r.output);
 r.localFinish='Imagegen composition draft reviewed; final requested uniform placement uses original RGBA pixels to preserve anatomy, feather pattern and neck ratio exactly. No separate neck scaling.';
 r.placement={scale:side/1254,x,y,anchor:[627,370]};
 for(const k of ['original','reference','generated','output'])r[k+'Sha256']=crypto.createHash('sha256').update(await fs.readFile(r[k])).digest('hex');
 console.log(r.id,r.placement);
}
await fs.writeFile(dir+'manifest.json',JSON.stringify(m,null,2)+'\n');
