import fs from 'node:fs/promises';
import sharp from 'sharp';
const folder=new URL('./',import.meta.url);
const entries=JSON.parse(await fs.readFile(new URL('inventory.json',folder),'utf8'));
const reference=entries.find(r=>r.id==='habicht');
for(let page=0;page<3;page++){
 const group=[{...reference,id:'HABICHT · REFERENZ'},...entries.slice(page*13,page*13+13)];
 const layers=[];
 for(let n=0;n<group.length;n++){
  const x=n%4*250,y=Math.floor(n/4)*200,r=group[n];
  layers.push({input:Buffer.from(`<svg width="250" height="30"><text x="8" y="21" font-family="sans-serif" font-size="14" fill="#263d48">${r.id}</text></svg>`),left:x,top:y});
  for(const [dx,bg] of [[10,'#f5f3ef'],[132,'#233747']])layers.push({input:await sharp(r.path).resize(108,108).flatten({background:bg}).png().toBuffer(),left:x+dx,top:y+30});
  for(const [dx,size] of [[48,64],[140,48]])layers.push({input:await sharp(r.path).resize(size,size).flatten({background:'#e6efeb'}).png().toBuffer(),left:x+dx,top:y+136});
 }
 await sharp({create:{width:1000,height:800,channels:4,background:'#dde3e6'}}).composite(layers).webp({quality:94}).toFile(new URL(`audit-${page+1}.webp`,folder).pathname);
}
