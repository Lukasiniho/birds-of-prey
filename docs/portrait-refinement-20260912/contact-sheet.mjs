import fs from 'node:fs/promises';
import sharp from 'sharp';
const folder=new URL('./',import.meta.url);
const {records}=JSON.parse(await fs.readFile(new URL('manifest.json',folder),'utf8'));
const entries=[{id:'Habicht · Referenz',original:'public/birds/portrait-habicht-20260912.png',output:'public/birds/portrait-habicht-20260912.png'},...records.filter(r=>r.status!=='rejected')];
for(let start=1,page=1;start<entries.length;start+=5,page++){
 const group=[entries[0],...entries.slice(start,start+5)];const layers=[];const cell=206,width=group.length*cell;
 const labels=group.map((r,i)=>`<text x="${i*cell+10}" y="22">${r.id}</text>`).join('');
 layers.push({input:Buffer.from(`<svg width="${width}" height="32"><style>text{font:14px sans-serif;fill:#263d48}</style>${labels}</svg>`),left:0,top:0});
 for(let i=0;i<group.length;i++)for(const row of [{y:32,key:'original',bg:'#f5f3ef'},{y:244,key:'output',bg:'#f5f3ef'},{y:456,key:'output',bg:'#233747'}]){
  const input=await sharp(group[i][row.key]).resize(196,196).flatten({background:row.bg}).png().toBuffer();layers.push({input,left:i*cell+5,top:row.y});
 }
 for(let i=0;i<group.length;i++)for(const s of [64,48]){
  layers.push({input:await sharp(group[i].output).resize(s,s).flatten({background:'#e6efeb'}).png().toBuffer(),left:i*cell+(s===64?28:112),top:668});
 }
 await sharp({create:{width,height:740,channels:4,background:'#dde3e6'}}).composite(layers).webp({quality:94}).toFile(new URL(`comparison-${page}.webp`,folder).pathname);
}
