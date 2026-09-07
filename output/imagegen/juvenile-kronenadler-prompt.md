# Kronenadler-Jungtier

Werkzeug: integriertes Imagegen, keine CLI.
Vorlage: `public/birds/kronenadler-20260907.png` (aktuell eingebundenes adultes Tier).
Status: Nach ausdrücklicher Nutzerfreigabe lokal mit Pillow freigestellt und als `public/birds/juvenile-kronenadler-adult-based-20260907.png` eingebunden. Neutralen, mit dem Bildrand verbundenen Hintergrund entfernt; die Kontur um einen Pixel bereinigt und leicht geglättet. Transparenz in PNG und optimiertem WebP erhalten. Die Pose stammt aus dem aktuellen adulten Bild.

## Generierungsprompt

Use case: precise-object-edit.
Asset type: transparent ornithological illustration for a bird identification website.
Input image 1 is the CURRENT ADULT crowned eagle and is the sole edit target and sole reference. Derive this juvenile directly from this adult image.
Primary request: change ONLY age-related feather plumage to a juvenile crowned eagle (Stephanoaetus coronatus).
Preserve exactly the adult's pose, silhouette, body proportions, head position, left-facing orientation, eye and beak placement, diagonal spread wing angles (one wing extending toward upper right, the other toward lower left), individual feather outlines, tail fan spread, tucked legs and feet position, scale, margins and square framing. Do not rotate, mirror, recompose, or redesign the bird.
Juvenile plumage: pale creamy white head, throat, breast, belly and underwing coverts; replace heavy adult dark spotting with very sparse light brown spotting. Keep flight feathers and tail recognizably barred in soft brown and grey. The small crown crest should remain in the same location with pale juvenile coloration. Preserve anatomical realism and the exact detailed realistic illustration style and lighting of the adult source.
Background: genuine fully transparent alpha background. No black, white, grey or colored backdrop, no checkerboard drawn into the image, no cast shadow, no glow, no text or watermark.
Output: one square image, ideally the same 1280 x 1280 dimensions as the source, all wingtip feathers and tail fully in frame with source-equivalent margins. The resulting image must read as the very same bird silhouette with juvenile feather colors.

## Korrekturprompt

Use case: precise-object-edit.
Input image 1 is the sole edit target: a juvenile crowned eagle illustration derived directly from the adult. Make only these two corrections:
1. Remove the entire baked light grey and white checkerboard surrounding the bird and replace it with ACTUAL transparent pixels in the PNG alpha channel. This must be a genuine cutout, with alpha zero outside the bird, not a simulated checkerboard or solid-color background. Preserve clean feather edges and all fine details. No backdrop, no shadow.
2. Change only the yellow iris of the visible eye to a natural juvenile grey-brown iris, retaining the black pupil and catchlight.
Keep everything else unchanged: the exact left-facing pose, head and beak shape, small crest, diagonal spread wings, individual feather contours, spread tail, tucked legs and feet, pale cream plumage with sparse light brown spotting, barred grey brown flight feathers and tail, realistic illustration style, lighting, scale and square framing. Do not regenerate or redesign the bird. All feathers must remain fully in frame. Output one PNG with genuine transparency.
