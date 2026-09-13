"""Read-only asset checks; writes the audit, never portrait mappings or images."""
import hashlib
import json
import re
from pathlib import Path

import numpy as np
from PIL import Image

folder = Path(__file__).parent
manifest = json.loads((folder / 'manifest.json').read_text())
before = {r['id']: r for r in json.loads((folder / 'before-inventory.json').read_text())}
revised = {r['id']: r for r in manifest['records']}
inventory = []
for bird, url in re.findall(r"(\w+): '(/birds/[^']+)'", Path('lib/portrait-images.ts').read_text()):
    path = Path('public' + url.split('?')[0])
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    im = Image.open(path)
    assert im.mode == 'RGBA', bird
    alpha = np.array(im)[:, :, 3]
    edges = int(np.count_nonzero(alpha[0]) + np.count_nonzero(alpha[-1]) + np.count_nonzero(alpha[:, 0]) + np.count_nonzero(alpha[:, -1]))
    assert edges == 0, bird
    assert np.count_nonzero(alpha == 0) > alpha.size / 4, bird
    if bird in revised:
        assert str(path) == revised[bird]['output'], bird
        assert digest == revised[bird]['outputSha256'], bird
        assert url.endswith('?v=' + digest[:12]), bird
    else:
        assert digest == before[bird]['sha256'], bird
    inventory.append(dict(id=bird, path=str(path), sha256=digest, size=list(im.size), opaqueEdgePixels=edges))
assert len(inventory) == 39
assert len(revised) == 16
assert revised['gerfalke']['uniformScale'] == .88
assert all(revised[x]['headPixelCheck']['changedInteriorPixelsAbove650'] == 0 for x in ['turmfalke', 'baumfalke', 'fischadler'])
report = dict(portraits=39, revised=16, unchanged=23, confirmedReferencesUnchanged=['habicht', 'seeadler', 'aguja', 'wuestenbussard'], gerfalkeScale=.88, opaqueCanvasEdges=0, inventory=inventory)
(folder / 'verification.json').write_text(json.dumps(report, indent=2) + '\n')
print({k: v for k, v in report.items() if k != 'inventory'})
