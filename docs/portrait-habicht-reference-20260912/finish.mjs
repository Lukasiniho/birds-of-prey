import fs from 'node:fs/promises';
import sharp from 'sharp';
import { createHash } from 'node:crypto';

const manifestPath=new URL('./manifest.json',import.meta.url);
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const settings={
  turmfalke:{sourceStart:740,sourceEnd:1210,targetStart:740,targetEnd:1120,blend:60,preserveHead:true},
  wanderfalke:{sourceStart:680,sourceEnd:1130,targetStart:680,targetEnd:970,blend:65,preserveHead:true},
  rotschwanzbussard:{sourceStart:650,sourceEnd:1070,targetStart:650,targetEnd:985,blend:0},
  maeusebussard:{sourceStart:650,sourceEnd:1070,targetStart:650,targetEnd:1010,blend:0,offsetY:-45},
  koenigsbussard:{sourceStart:650,sourceEnd:1070,targetStart:650,targetEnd:985,blend:0},
};
for(const r of manifest.records){
 const s=settings[r.id],clean=`/tmp/portrait-habicht-reference/${r.id}.png`;
 const original=await sharp(r.original).ensureAlpha().raw().toBuffer();
 const full=await sharp(clean).ensureAlpha().raw().toBuffer();
 const lower=await sharp(clean).extract({left:0,top:s.sourceStart,width:1254,height:s.sourceEnd-s.sourceStart}).resize(1254,s.targetEnd-s.targetStart,{fit:'fill'}).ensureAlpha().raw().toBuffer();
 const pixels=Buffer.alloc(1254*1254*4);const upper=s.preserveHead?original:full;
 for(let y=0;y<s.targetEnd;y++)for(let x=0;x<1254;x++){
  const p=(y*1254+x)*4;
  if(y<s.targetStart){upper.copy(pixels,p,p,p+4);continue;}
  const q=((y-s.targetStart)*1254+x)*4;
  const t=s.blend?Math.min(1,(y-s.targetStart)/s.blend):1;
  const a=(1-t)*upper[p+3]/255,b=t*lower[q+3]/255,total=a+b;
  for(let c=0;c<3;c++)pixels[p+c]=total?Math.round((a*upper[p+c]+b*lower[q+c])/total):0;
  pixels[p+3]=Math.round(total*255);
 }
 let final=pixels;
 if(s.offsetY){final=Buffer.alloc(pixels.length);for(let y=0;y<1254;y++){const sy=y-s.offsetY;if(sy>=0&&sy<1254)pixels.copy(final,y*1254*4,sy*1254*4,(sy+1)*1254*4);}}
 await sharp(final,{raw:{width:1254,height:1254,channels:4}}).png().toFile(r.output);
 const hash=b=>createHash('sha256').update(b).digest('hex');
 r.originalSha256=hash(await fs.readFile(r.original));r.referenceSha256=hash(await fs.readFile(r.reference));r.outputSha256=hash(await fs.readFile(r.output));
 r.localFinish={segmentation:'Own protected-interior trimap; GrabCut edge segmentation and 2px edge-color cleanup. No global white/gray removal.',neckPlacement:s,description:'Generated lower neck fitted to the prescribed depth. Falcon head pixels copied unchanged above the blend band; no head rescaling.',headPixelDifferencesAboveSeam:s.preserveHead?final.subarray(0,s.targetStart*1254*4).compare(original.subarray(0,s.targetStart*1254*4)):null};
 console.log(r.id, r.localFinish.headPixelDifferencesAboveSeam);
}
await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
