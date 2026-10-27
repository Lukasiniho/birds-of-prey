# Zwergadler – Jagdbild-Vorschlag

Nur Vorschlag, nicht eingebunden. AGENTS.md und docs/vogelbild-standard.md gelesen und beachtet. Zwei von maximal vier Generierungen. Alle eigenen Schreibzugriffe ausschließlich unter outputs/proposals/. Der Imagegen-Dienst legt Rohbilder automatisch in seinem eigenen Cache ab.

## Quellen und Rollen

- `public/birds/hunting-zwergadler.png` — Input 1, einziges Bearbeitungsziel; Komposition, Pose, Beute, Flügel, Rahmen. SHA256 `9ab9aa10159ffd6013ac13c8f4d029080cf808c6aeda8d6bcfd2799f657eb6c6`.
- `outputs/proposals/flight/zwergadler/male.png` — Input 2, akzeptiertes adultes Flugoriginal; ausschließlich Gefieder und Identität, niemals Pose. SHA256 `409279e50f0d3e19861947a67e46e61f748de90ae1897932a31fa5cd8b1ede9e`.
- `public/hunting-steinadler.png` — Input 3, ausschließlich Rendering. SHA256 `559bde6f567a4479d4add1422bd5f1cd71f0d5e2830d9dd7887a7f298aaebb86`.
- `public/hunting-seeadler.png` — Input 4, ausschließlich Rendering. SHA256 `2c7e0193ba86fe21c1cad55096cfe7680991c8d697c201d30c5288c280006f07`.

## Lokale Schritte und Prüfung

Grün-Entmischung mit dem vorhandenen Node/sharp-Helfer outputs/proposals/zwergadler-work/process.mjs, adaptiert aus docs/portrait-user-refinements-20260913/extract.py: Alpha aus Grünüberschuss, größte zusammenhängende Szene mit 2-px-Nachbarschaft, algebraische Entmischung und lokale Randfarbschätzung aus deckenden Nachbarn. Niemals Weiß-/Grau-Key. Generierung 1 wegen heller gemalter Federränder verworfen; Generierung 2 gewählt. Die gesamte Szene wurde proportional um 1263/1254 (0,718 %) skaliert und bei (-4,-4) wieder auf die unveränderte 1254×1254-Leinwand gesetzt. 23 durch Resampling entstandene Grünüberschuss-Randpixel neutralisiert; Alpha unverändert. Keine Einzelanpassung von Beute oder Flügeln; keine Spitze abgeschnitten.

RGBA, echte Transparenz. Visuell auf #e8e8e4, #22282a und #2d7f7a in voller 1254-px-Größe und bei 360 px geprüft. Keine sichtbaren Freistellungssäume, grünen Ränder, Löcher oder abgeschnittenen Spitzen. Zwei Flügel, Schwanz, Kopf und Füße der Beute vollständig; Zehen teilweise natürlich verdeckt, Greifkontakt am oberen Körper plausibel. Der kleine braune Singvogel wird als weiblicher Haussperling interpretiert (keine eindeutige Artbestimmung des gezeichneten Originals). Kleine Singvögel sind plausible Beute: [Naturalis, Birds of Europe](https://birds-europe.linnaeus.naturalis.nl/linnaeus_ng/app/views/species/taxon.php?id=130502). Die konkrete Art ist eine visuelle Interpretation; keine Behauptung einer durch diese Quelle belegten artspezifischen Beuteliste.

Original enthält vereinzelte Alpha-Restpixel unter 11/255 außerhalb der sichtbaren Szene. Deshalb werden zusätzlich zur strengen Alpha>0-Begrenzung auch Alpha>10 und >127 ausgewiesen. Beide Maßstäbe bleiben nach der kleinen proportionalen Rahmenkorrektur innerhalb 2 %.
- Alpha > 0: Original 0,9, 1248×1245; Vorschlag 12,3, 1232×1225. Breite -1.28 %, Höhe -1.61 %, Mittelpunkt +4.0/-16.0 px.
- Alpha > 10: Original 26,11, 1208×1205; Vorschlag 13,4, 1230×1223. Breite +1.82 %, Höhe +1.49 %, Mittelpunkt -2.0/+2.0 px.
- Alpha > 127: Original 27,12, 1206×1203; Vorschlag 15,6, 1227×1219. Breite +1.74 %, Höhe +1.33 %, Mittelpunkt -1.5/+2.0 px.
- Alpha > 230: Original 28,13, 1204×1201; Vorschlag 16,6, 1225×1218. Breite +1.74 %, Höhe +1.42 %, Mittelpunkt -1.5/+1.5 px.

Ausgabe: `outputs/proposals/hunting/zwergadler.png`, SHA256 `bacf6402b6c1ca7f9c176a91769e944b7c782bbe90f928ecac64907f2ee7024f`. Grünüberschuss-Test (G > max(R,B)+12 bei Alpha >10): 0 Pixel.

Vergleich: `outputs/proposals/zwergadler-hunting-check.png`. Volle Ansichten und 360-px-Ansichten: `outputs/proposals/zwergadler-hunting-work/proposal-{light,dark,teal}.png` und `*-360.png`. Reproduzierbare Prüfung: `check.mjs`; Messwerte `checks.json`. Die gestalterische Nutzerfreigabe bleibt offen.

## Exakte Prompts und Generierungspfade

### Generierung 1 – verworfen

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-79b0-a294-585669ebc32a/exec-6559fe53-42e3-42ac-8a5d-1edf2e54163b.png`.
Lokale Kopie: `outputs/proposals/zwergadler-hunting-work/generated-1.png`; SHA256 `4335477fcea77b48998d35967c03ed3c3f4d4763b5596377a1277732e7c8b37e`.

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Booted Eagle (Hieraaetus pennatus), adult, plumage exactly as in input image
2 (the species' active flight image). Prey: female House Sparrow (Passer domesticus), the same small brown passerine already depicted in input 1.

Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted feather rendering and ambiguous small prey toe details, preserving the same small passerine and grip location.

Input roles: image 1 is the ONLY hunting edit target and exact composition. Image 2 is the user-approved pale adult of this same species, PLUMAGE AND IDENTITY ONLY, never its pose. Images 3 and 4 are photographic rendering references ONLY, never anatomy, pose, prey or landscape. Apply the photographic style block to BOTH birds. Match image 2 creamy white underwing coverts and body, dark brown flight feathers, subtly barred grey-brown tail, buff-brown streaked head, dark brown iris and yellow cere. Preserve every feather tip position and the existing asymmetric raised wings, head facing right, spread tail towards bottom left, small prey below the feet at bottom right. No mirrored pose. No added habitat. The small female sparrow retains brown streaked upperparts, plain grey-buff underside, pale eyebrow, short conical seed-eating bill, two anatomically correct wings, one tail, two small feet with normal passerine toes; eagle toes wrap around its upper body plausibly without extra talons or fused limbs. No blood. Keep the 1254x1254 square canvas and the original scene bounding box size and centre within 2 percent. Keep all raptor primary and tail tips and the entire prey. Only rendering and necessary identity/anatomy corrections; do not recompose. Opaque uniform RGB(0,255,0) background for subsequent local green unmixing, no transparency or checkerboard in generated output.
```

### Generierung 2 – final

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-79b0-a294-585669ebc32a/exec-8ce24827-b19f-4a31-9390-faf6de35e8cb.png`.
Lokale Kopie: `outputs/proposals/zwergadler-hunting-work/generated-2.png`; SHA256 `4dfa781a2f8c806f33ee863408648675cfa0e86833fb084fb02cb7d44ba8b749`.

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Booted Eagle (Hieraaetus pennatus), adult, plumage exactly as in input image
2 (the species' active flight image). Prey: female House Sparrow (Passer domesticus), the same small brown passerine already depicted in input 1.

Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted feather rendering and ambiguous small prey toe details, preserving the same small passerine and grip location.

Input roles: image 1 is the ONLY hunting edit target and exact composition. Image 2 is the user-approved pale adult of this same species, PLUMAGE AND IDENTITY ONLY, never its pose. Images 3 and 4 are photographic rendering references ONLY, never anatomy, pose, prey or landscape. Apply the photographic style block to BOTH birds. Match image 2 creamy white underwing coverts and body, dark brown flight feathers, subtly barred grey-brown tail, buff-brown streaked head, dark brown iris and yellow cere. Preserve every feather tip position and the existing asymmetric raised wings, head facing right, spread tail towards bottom left, small prey below the feet at bottom right. No mirrored pose. No added habitat. The small female sparrow retains brown streaked upperparts, plain grey-buff underside, pale eyebrow, short conical seed-eating bill, two anatomically correct wings, one tail, two small feet with normal passerine toes; eagle toes wrap around its upper body plausibly without extra talons or fused limbs. No blood. Keep the 1254x1254 square canvas and the original scene bounding box size and centre within 2 percent. Keep all raptor primary and tail tips and the entire prey. Only rendering and necessary identity/anatomy corrections; do not recompose. Opaque uniform RGB(0,255,0) background for subsequent local green unmixing, no transparency or checkerboard in generated output.

Photographic refinement priority: replace the painted/sculpted surface with real soft irregular feather barbs and fine down as captured by a wildlife camera. Remove the artificial cream rim on every dark secondary feather and tail tip: those feather ends must remain naturally dark brown all the way to the edge, no light piping, no backlight and no glow. Avoid individually outlined repeating scalloped feathers. Keep diffuse neutral overcast illumination. Keep the current geometry and all plumage colour regions of the accepted flight bird. Do not make feathers copper-red. Sparrow feet need clean anatomically separate toes, three forward and one rear per foot, with natural occlusion. Preserve the original scene placement exactly.
```
