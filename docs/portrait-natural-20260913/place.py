from pathlib import Path
import json,hashlib
from PIL import Image
root=Path('/Users/lukasvonhohnhorst/Coding/birds-of-prey')
work=Path('/tmp/portrait-natural-20260913')
records=[('fischadler','portrait-fischadler-20260913-v3.png','portrait-fischadler-20260913-v4.png'),('aguja','portrait-aguja-20260913-v3.png','portrait-aguja-20260913-v4.png'),('schwarzmilan','portrait-schwarzmilan-20260913.png','portrait-schwarzmilan-20260913-v2.png'),('kronenadler','portrait-kronenadler-20260913-v2.png','portrait-kronenadler-20260913-v3.png'),('harpyie','portrait-harpyie-20260913.png','portrait-harpyie-20260913-v2.png')]
report=[]
for id,old,new in records:
 source=root/'public/birds'/old; output=root/'public/birds'/new
 original=Image.open(source).convert('RGBA'); im=Image.open(work/(id+'-cut.png')).convert('RGBA')
 oldbox=original.getchannel('A').point(lambda a:255 if a>128 else 0).getbbox()
 target=(105,115,1148,1125) if id=='fischadler' else oldbox
 box=im.getchannel('A').getbbox();cut=im.crop(box)
 scale=min((target[2]-target[0])/cut.width,(target[3]-target[1])/cut.height)
 size=(round(cut.width*scale),round(cut.height*scale))
 offset=(round((target[0]+target[2]-size[0])/2),round((target[1]+target[3]-size[1])/2))
 final=Image.new('RGBA',original.size,(0,0,0,0));final.alpha_composite(cut.resize(size,Image.Resampling.LANCZOS),offset);final.save(output)
 report.append({'id':id,'original':str(source.relative_to(root)),'originalSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'output':str(output.relative_to(root)),'outputSha256':hashlib.sha256(output.read_bytes()).hexdigest(),'originalBounds':oldbox,'generatedBounds':box,'placement':{'uniformScale':scale,'offset':offset,'canvas':original.size},'finalBounds':final.getbbox()})
json.dump(report,open(work/'placement.json','w'),indent=2)
print(json.dumps(report,indent=2))
