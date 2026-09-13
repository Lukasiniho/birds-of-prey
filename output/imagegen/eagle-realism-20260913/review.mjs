import sharp from 'sharp';
const ids=['klippenadler','steppenadler','kaiseradler'];
const panels=[],bgs=['#e8f1f5','#202630','#796899'];
for(let i=0;i<3;i++){
const adult=`public/birds/${ids[i]}-20260913-v3.png`, juvenile=`public/birds/juvenile-${ids[i]}-20260913-v3.png`;
for(let j=0;j<2;j++)panels.push({input:await sharp(j?juvenile:adult).resize(500).flatten({background:bgs[i]}).png().toBuffer(),left:j*500,top:i*500});
const a=await sharp(adult).resize(500).raw().toBuffer({resolveWithObject:true}),b=await sharp(juvenile).resize(500).raw().toBuffer();
for(let p=0;p<b.length;p++)a.data[p]=Math.round((a.data[p]+b[p])/2);
panels.push({input:await sharp(a.data,{raw:a.info}).flatten({background:bgs[i]}).png().toBuffer(),left:1000,top:i*500});
}
await sharp({create:{width:1500,height:1500,channels:3,background:'#e8f1f5'}}).composite(panels).png().toFile('output/imagegen/eagle-realism-20260913/final-review.png');
const crops=[];for(let i=0;i<3;i++)crops.push({input:await sharp('public/birds/kaiseradler-20260913-v3.png').extract({left:435,top:510,width:360,height:220}).resize(720).flatten({background:bgs[i]}).png().toBuffer(),left:0,top:i*440});
await sharp({create:{width:720,height:1320,channels:3,background:'#ffffff'}}).composite(crops).png().toFile('output/imagegen/eagle-realism-20260913/kaiseradler-head-qa.png');
