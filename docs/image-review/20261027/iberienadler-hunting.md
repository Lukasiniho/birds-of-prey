# Iberienadler – Jagdbild-Vorschlag

Stand: 27. Oktober 2026. **Nur Vorschlag, nicht eingebunden; Gesamtabnahme nicht bestanden.** Vier von maximal vier erlaubten Generierungen. Ausgewählt: Versuch 1. Er bewahrt die Komposition am besten, erreicht den gewünschten fotografischen Stil aber noch nicht ausreichend. Die spätere stärkere Stilbetonung brachte keine überzeugende Verbesserung; Versuch 4 lieferte zudem trotz Grün-Anforderung einen bereits freigestellten Hintergrund.

## Dateien

- RGBA: `outputs/proposals/hunting/iberienadler.png`, 1254 × 1254.
- Vergleich: `outputs/proposals/iberienadler-hunting-check.png`, Original links, Vorschlag rechts, je 440 px; Hintergründe #e8e8e4, #22282a und #2d7f7a.
- Vollauflösende Vergleiche: `outputs/proposals/hunting/iberienadler-work/current-{0,1,2}-full.png` und `proposal-{0,1,2}-full.png`; Nummern entsprechen den Hintergründen in obiger Reihenfolge.
- Silhouettenvergleich: `outputs/proposals/hunting/iberienadler-work/silhouette-overlay.png` (Alt allein rot, Neu allein türkis, Überlappung rosa).
- Messwerte: `metrics.json`, `qa.json`, `validation.json` im Arbeitsordner.

Keine zusätzlichen Alters-, Geschlechts- oder Morphenvarianten. Keine Änderung an public/, lib/, app/, tests/ oder docs/. Alle manuell angelegten Dateien liegen unter outputs/proposals/. Das eingebaute Imagegen-Werkzeug speichert seine Rohresultate automatisch zusätzlich im unten dokumentierten .codex/generated_images-Verzeichnis; die Ergebnisse wurden in den Vorschlagsordner kopiert.

## Quellen und Referenzrollen

AGENTS.md, docs/vogelbild-standard.md, beide Promptvorlagen und docs/portrait-user-refinements-20260913/extract.py gelesen. Aktive Jagdbild-Zuordnung in lib/hunting-images.ts bestätigt. Die ausdrücklich vorgegebene akzeptierte Flugreferenz verwendet.

1. `public/birds/hunting-iberienadler.png`
   - Rolle: Bearbeitungsziel; ausschließlich Komposition, Pose, Flügel-/Schwanzstellung, Beute und Beuteposition.
   - SHA-256: `92d3db17dd6b71724bac222c967fc8566b97a3d67f23548407acb51289492df0`
2. `outputs/proposals/flight/iberienadler/male.png`
   - Rolle: Vom Nutzer akzeptierte adulte Gefieder-/Identitätsreferenz; niemals Pose.
   - SHA-256: `70c51de321e333543098402352580e65d851343ff0ed9f609111141ca7fb795a`
3. `public/hunting-steinadler.png`
   - Rolle: Nur Rendering, keine Anatomie, Pose oder Beute.
   - SHA-256: `559bde6f567a4479d4add1422bd5f1cd71f0d5e2830d9dd7887a7f298aaebb86`
4. `public/hunting-seeadler.png`
   - Rolle: Nur Rendering, keine Anatomie, Pose oder Beute.
   - SHA-256: `2c7e0193ba86fe21c1cad55096cfe7680991c8d697c201d30c5288c280006f07`

## Generierungsweg

Eingebautes `image_gen__imagegen`; vier getrennte Edits, jeweils direkt mit denselben vier Originalreferenzen in der oben angegebenen Reihenfolge. Keine Generierung aus einer vorherigen Fassung. Jeder Prompt enthält Flugblock 1 und 3 sowie Jagdblock 2 wörtlich, dazu ausgefüllte Jagdblöcke 4 und 5. Wörtliche Blöcke für alle vier Prompts automatisiert verifiziert.

- Versuch 1: Werkzeugpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-7313-82d1-3ef6b5aaf7d7/exec-9523518e-8990-4de3-84b3-14dc85addd36.png`; lokale Kopie `outputs/proposals/hunting/iberienadler-work/generation-1.png`; SHA-256 `23248c0a9b1eb35453b82600e986d5505b12174824cdb15d495d18f68a9fb26f`; vollständiger Prompt `outputs/proposals/hunting/iberienadler-work/prompt-1.txt`. **Ausgewählt.**
- Versuch 2: Werkzeugpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-7313-82d1-3ef6b5aaf7d7/exec-3b703976-17e2-4196-b953-05b8dd9e95aa.png`; lokale Kopie `outputs/proposals/hunting/iberienadler-work/generation-2.png`; SHA-256 `5b716ac3a435c743889333f90f771084109c1a1b66a87ae61894ff6e39a0a605`; vollständiger Prompt `outputs/proposals/hunting/iberienadler-work/prompt-2.txt`. Verworfen.
- Versuch 3: Werkzeugpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-7313-82d1-3ef6b5aaf7d7/exec-ee9ae4cc-6b5b-4153-9ddc-25c3763bd3ae.png`; lokale Kopie `outputs/proposals/hunting/iberienadler-work/generation-3.png`; SHA-256 `1a7a87b6d9089dd11ca2e1c1108bfa258fec61390a0bdbbc0ac382903105c7bc`; vollständiger Prompt `outputs/proposals/hunting/iberienadler-work/prompt-3.txt`. Verworfen.
- Versuch 4: Werkzeugpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-7313-82d1-3ef6b5aaf7d7/exec-2c862c22-3fba-493f-8b5c-beddad599b30.png`; lokale Kopie `outputs/proposals/hunting/iberienadler-work/generation-4.png`; SHA-256 `6ba9c2c2b4496c2a215e9d95dd5f06336735374af412b65bb76a4ad77b7e3989`; vollständiger Prompt `outputs/proposals/hunting/iberienadler-work/prompt-4.txt`. Verworfen.

## Lokale Freistellung

Python-Pakete PIL, numpy und cv2 waren nicht vorhanden. Deshalb die Grün-Entmischung aus extract.py mit Node + vorhandenem sharp umgesetzt: `finish.cjs`, danach `qa.cjs`, beide im Arbeitsordner. Keine Installation, keine Weiß-/Grau-Key-Freistellung, keine Original-Alpha-Maske auf abweichende Geometrie gelegt.

1. Randmedian des ersten Rohbilds: RGB [5, 249, 5]; angefordert war flaches #00FF00. Für die Entmischung wurde der tatsächlich generierte Grünton gemessen.
2. Alpha aus Grünüberschuss: clamp(1 − (G − max(R,B)) / (bgG − max(bgR,bgB)), 0, 1); bei Überschuss < 10 Alpha 1, bei Alpha < 0,045 Alpha 0.
3. Größte zusammenhängende Komponente bei Alpha > 0,15 mit 5×5-Nachbarschaft erhalten; 1188 isolierte Rauschpixel entfernt.
4. RGB mit dem gemessenen Hintergrund entmischt: (RGB − (1−Alpha) × Hintergrund) / Alpha. Helle Gefieder- und Fellflächen bleiben erhalten.
5. Randfarben an 34584 Pixeln aus benachbarten, mindestens vier Pixel tiefen deckenden Innenbereichen fortgeführt; schmalen Zwei-Pixel-Rand berücksichtigt. Bei 221 sehr feinen Randpixeln ohne passende Innenreferenz blieb die Entmischung erhalten.
6. 1178 olivfarbene Restpixel im maximal 14 Pixel tiefen Randbereich anhand benachbarter sauberer R/G-Verhältnisse entsättigt: nur Grünkanal, kein Alpha-Eingriff. Keine globale Umfärbung.
7. Alpha bei beiden Farbnacharbeiten unverändert; kein Beschnitt, keine Skalierung, keine Verschiebung oder Verzerrung.

## Prüfung und offene Abweichungen

Alle drei Hintergrundansichten in voller Auflösung (1254 px) und bei 440 px geprüft; 440 ist der in HuntingArt deklarierte displayWidth (app/raptor-app.tsx). Es wurden Bildkompositionen geprüft, keine geänderte App eingebunden.

- **Freistellung:** kein erkennbarer umlaufender Grün-/Weißsaum nach lokaler Korrektur, keine auffälligen Hintergrundreste oder Löcher im Gefieder. Messung: 0 sichtbare Pixel mit G−max(R,B)>10. Dies ist ein technischer Zusatzcheck, kein alleiniger Qualitätsnachweis.
- **Vollständigkeit:** sämtliche Flügel- und Schwanzspitzen sowie Kaninchenohren, Pfoten und Schwanz sichtbar; 0 nichttransparente Pixel direkt am Leinwandrand. Keine abgeschnittenen Spitzen.
- **Beute/Griff:** weiterhin Europäisches Kaninchen rechts unten, Kopf nach rechts, zwei Ohren, zwei Vorder- und zwei Hinterläufe; keine erkennbaren Zusatzgliedmaßen. Zehen/Krallen mit Kontakt zum Rücken plausibel, ohne Blut.
- **Gefieder/Identität:** dunkler brauner Körper, heller Nacken, weiße Schulter-/Vorderkantenpartien und gebänderte Schwingen/Schwanz erhalten. Die neue Brust ist wärmer und konturierter als die akzeptierte Flugreferenz; eine exakte Gefieder-/Renderübereinstimmung wird daher nicht bestätigt.
- **Stil – nicht bestanden:** wiederholte konturierte Federformen an Brust und Flügeldecken bleiben deutlich sichtbar. Die Umstellung auf den akzeptierten fotografischeren Eindruck ist auch nach vier Versuchen nicht ausreichend.
- **Komposition:** Gesamtanordnung, Flügelhaltung, Blickrichtung, Schwanzfächer, Beutetyp und Beuteposition erhalten. Keine exakte Pixeldeckung: Flügelfinger, äußere Federränder und einzelne innere Strukturen sind leicht versetzt. Silhouetten-IoU bei Alpha > 127: 0,954694. Eine streng unveränderte Silhouette/Pose wird nicht behauptet.

### Alpha-Begrenzung

Koordinaten inklusiv. Die Szene liegt visuell innerhalb der 2-%-Toleranz; die rohe Alpha>0-Begrenzung besteht die Höhentoleranz jedoch nicht. Das Original enthält sehr schwache Rand-/Rauschpixel bis x=0 und y=1253, außerhalb der sichtbaren Szene. Diese wurden nicht künstlich in den Vorschlag kopiert, um einen Messwert zu erfüllen.

| Schwelle | Original x/y–x/y | Vorschlag x/y–x/y | Breitenänderung | Höhenänderung | Zentrumänderung x/y (% Leinwand) | ≤2 % |
|---|---|---|---:|---:|---:|---|
| Alpha > 0 | 0/5–1225/1253 | 12/5–1228/1207 | -0.734% | -3.683% | +0.598/-1.834 | nein |
| Alpha > 16 | 13/8–1223/1203 | 12/6–1226/1207 | +0.330% | +0.502% | +0.080/+0.080 | ja |
| Alpha > 127 | 14/8–1222/1202 | 13/7–1226/1206 | +0.414% | +0.418% | +0.120/+0.120 | ja |
| Alpha > 230 | 15/9–1221/1200 | 14/8–1225/1205 | +0.414% | +0.503% | +0.120/+0.159 | ja |

**Entscheidung:** Als überprüfbarer Vorschlag abgelegt, nicht als abgenommener Ersatz. Keine fünfte Generierung, da das erlaubte Limit ausgeschöpft ist.

## Ausgabesummen

- `outputs/proposals/hunting/iberienadler.png`: `c12c0e468a99412f00d83293e0be9d1856e33b2f697307d845b7af5133f941cc`
- `outputs/proposals/iberienadler-hunting-check.png`: `8af875bfa4c12e8528f07737899c24ad38e1ed6215ffdb1dec9d92b6e1fefed5`

## Exakter final verwendeter Prompt (ausgewählter Versuch 1)

```text
Use case: style-transfer.
Re-render the existing Iberian imperial eagle hunting image, preserving its composition exactly, with photographic realism rather than the painted look the user rejected.

Input image 1: public/birds/hunting-iberienadler.png — edit target and sole composition, pose, prey placement, wing position, silhouette and framing reference.
Input image 2: outputs/proposals/flight/iberienadler/male.png — the USER-ACCEPTED adult Iberian imperial eagle; plumage and species identity reference ONLY, never pose.
Input image 3: public/hunting-steinadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.
Input image 4: public/hunting-seeadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.

1 Style
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic treatment to the entire scene, both eagle and rabbit.

2 Scene
One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

3 Background
Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Square canvas corresponding to 1254 x 1254 pixels. Keep the visible scene's bounds and centre within 2% of input image 1. Target meaningful alpha bounds on that canvas: x=13..1223, y=8..1203. Preserve the original narrow clear margins; do not crop a single wing feather or foot. No new habitat fragment, landscape, rock, ground or water; input 1 has none.

4 Raptor and prey
Raptor: Spanish imperial eagle / Iberian imperial eagle (Aquila adalberti), adult, plumage exactly as in input image
2 (the species' accepted flight image). Prey: European rabbit (Oryctolagus cuniculus).

Transfer image 2's dark warm brown body and underwing coverts, muted grey-brown barred flight feathers and tail with dark terminal bands, pale buff crown/nape and white shoulder/leading-edge patches to the unchanged hunting pose. Keep natural fine feather texture and diffuse photographic tonal transitions. The flight image is not a pose reference.

5 Task
Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted feather and fur treatment, matching the accepted adult plumage in input image 2.

Strict geometry lock: keep the large raised near wing filling the upper-left, the far wing raised into the upper-right, the eagle's head facing right near the right-centre, its tail fanned down-left, both feet grasping the rabbit at the same locations, and the rabbit below-right facing right with both ears upright and all four limbs anatomically correct. Preserve relative size, every joint location, overall silhouette and angle of each wing and tail. Do not substitute the soaring pose of image 2 or hunting poses of images 3–4. Render the rabbit's complete ears, muzzle, forelegs, hindlegs and tail naturally; talons wrap plausibly around the rabbit with real contact and occlusion, no extra toes or limbs. Change surface rendering and required plumage only, no composition redesign.

Output one image only on pure #00FF00 for local green unmixing. No typography, borders, watermark, checkerboard or mock transparency.
```

## Exakter Prompt Versuch 2 (verworfen)

```text
Use case: style-transfer.
Re-render the existing Iberian imperial eagle hunting image, preserving its composition exactly, with photographic realism rather than the painted look the user rejected.

Input image 1: public/birds/hunting-iberienadler.png — edit target and sole composition, pose, prey placement, wing position, silhouette and framing reference.
Input image 2: outputs/proposals/flight/iberienadler/male.png — the USER-ACCEPTED adult Iberian imperial eagle; plumage and species identity reference ONLY, never pose.
Input image 3: public/hunting-steinadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.
Input image 4: public/hunting-seeadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.

1 Style
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic treatment to the entire scene, both eagle and rabbit.

2 Scene
One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

3 Background
Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Square canvas corresponding to 1254 x 1254 pixels. Keep the visible scene's bounds and centre within 2% of input image 1. Target meaningful alpha bounds on that canvas: x=13..1223, y=8..1203. Preserve the original narrow clear margins; do not crop a single wing feather or foot. No new habitat fragment, landscape, rock, ground or water; input 1 has none.

4 Raptor and prey
Raptor: Spanish imperial eagle / Iberian imperial eagle (Aquila adalberti), adult, plumage exactly as in input image
2 (the species' accepted flight image). Prey: European rabbit (Oryctolagus cuniculus).

Transfer image 2's dark warm brown body and underwing coverts, muted grey-brown barred flight feathers and tail with dark terminal bands, pale buff crown/nape and white shoulder/leading-edge patches to the unchanged hunting pose. Keep natural fine feather texture and diffuse photographic tonal transitions. The flight image is not a pose reference.

5 Task
Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted feather and fur treatment, matching the accepted adult plumage in input image 2.

Strict geometry lock: keep the large raised near wing filling the upper-left, the far wing raised into the upper-right, the eagle's head facing right near the right-centre, its tail fanned down-left, both feet grasping the rabbit at the same locations, and the rabbit below-right facing right with both ears upright and all four limbs anatomically correct. Preserve relative size, every joint location, overall silhouette and angle of each wing and tail. Do not substitute the soaring pose of image 2 or hunting poses of images 3–4. Render the rabbit's complete ears, muzzle, forelegs, hindlegs and tail naturally; talons wrap plausibly around the rabbit with real contact and occlusion, no extra toes or limbs. Change surface rendering and required plumage only, no composition redesign.

Output one image only on pure #00FF00 for local green unmixing. No typography, borders, watermark, checkerboard or mock transparency.

Critical rendering refinement: the current hunting image's repeated outlined feathers and highly graphic bar patterns are precisely what must change. Reconstruct the surface as an actual sharp wildlife photograph captured in soft cloud-filtered daylight, while tracing the exact original pose and placement. Feather groups must form natural overlapping masses with subtle soft transitions, fine irregular barbs and matte organic texture, not individually outlined leaf shapes. Avoid the hard pale gold outline around each brown body feather and the spiky painted crown. Use the softer dark brown coverts, subdued grey-brown flight feathers and softly buff nape of accepted input 2. The eagle must read as the very same adult as input 2 in a different, locked pose. Rabbit fur must be fine three-dimensional photographic fur with natural individual hairs rather than stippled painted fuzz. Preserve original overall exposure and readable dark plumage; do not oversoften, blur or change pose.
```

## Exakter Prompt Versuch 3 (verworfen)

```text
Use case: style-transfer.
Re-render the existing Iberian imperial eagle hunting image, preserving its composition exactly, with photographic realism rather than the painted look the user rejected.

Input image 1: public/birds/hunting-iberienadler.png — edit target and sole composition, pose, prey placement, wing position, silhouette and framing reference.
Input image 2: outputs/proposals/flight/iberienadler/male.png — the USER-ACCEPTED adult Iberian imperial eagle; plumage and species identity reference ONLY, never pose.
Input image 3: public/hunting-steinadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.
Input image 4: public/hunting-seeadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.

1 Style
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic treatment to the entire scene, both eagle and rabbit.

2 Scene
One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

3 Background
Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Square canvas corresponding to 1254 x 1254 pixels. Keep the visible scene's bounds and centre within 2% of input image 1. Target meaningful alpha bounds on that canvas: x=13..1223, y=8..1203. Preserve the original narrow clear margins; do not crop a single wing feather or foot. No new habitat fragment, landscape, rock, ground or water; input 1 has none.

4 Raptor and prey
Raptor: Spanish imperial eagle / Iberian imperial eagle (Aquila adalberti), adult, plumage exactly as in input image
2 (the species' accepted flight image). Prey: European rabbit (Oryctolagus cuniculus).

Transfer image 2's dark warm brown body and underwing coverts, muted grey-brown barred flight feathers and tail with dark terminal bands, pale buff crown/nape and white shoulder/leading-edge patches to the unchanged hunting pose. Keep natural fine feather texture and diffuse photographic tonal transitions. The flight image is not a pose reference.

5 Task
Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted feather and fur treatment, matching the accepted adult plumage in input image 2.

Strict geometry lock: keep the large raised near wing filling the upper-left, the far wing raised into the upper-right, the eagle's head facing right near the right-centre, its tail fanned down-left, both feet grasping the rabbit at the same locations, and the rabbit below-right facing right with both ears upright and all four limbs anatomically correct. Preserve relative size, every joint location, overall silhouette and angle of each wing and tail. Do not substitute the soaring pose of image 2 or hunting poses of images 3–4. Render the rabbit's complete ears, muzzle, forelegs, hindlegs and tail naturally; talons wrap plausibly around the rabbit with real contact and occlusion, no extra toes or limbs. Change surface rendering and required plumage only, no composition redesign.

Output one image only on pure #00FF00 for local green unmixing. No typography, borders, watermark, checkerboard or mock transparency.

Priority clarification for this re-render: use image 1 as a geometry template only. Its painted feather surfaces are REJECTED. Fully replace those surfaces with the much softer, subdued photographic surfaces of image 2. Image 2 is the authoritative plumage AND photographic realism target for this individual. Keep the exact outline and skeletal landmarks of image 1, but do not trace its internal feather drawings. In particular eliminate the repeated tan-edged scallop pattern across the breast and wings, the hard blade-like painted nape feathers, and the chalky high-contrast bars inside the primaries. Render feathers as softly overlapping dark brown plumage with delicate real feather vanes, subdued grey-brown barred flight feathers as in image 2, and soft natural buff nape hairs. A real animal photographed in diffuse daylight, not a digital painting or a 3D render. Reconstruct rabbit fur photographically, with convincing ears and limb joints. No local contrast boost, clarity filter, artificial sharpening, dark etched outlines or gold trim on each feather. The pose stays IDENTICAL even though the surface is fully re-rendered.
```

## Exakter Prompt Versuch 4 (verworfen)

```text
PHOTOGRAPHIC RECONSTRUCTION, not enhancement of an illustration. The user rejects input 1's painted appearance. Produce the equivalent REAL WILDLIFE PHOTOGRAPH with the exact same composition. Treat input 1 like a rough pose diagram: retain its geometry and discard its drawn surface. Input 2 shows the approved plumage and soft natural rendering to match. Do not reproduce the brown outlined leaf-shaped feather pattern of input 1. Imagine a real eagle and a real rabbit photographed at 1/2000s in diffuse natural daylight, isolated against a green screen. No hyperreal CGI, no digital painting. Preserve focus without painted precision or artificial sharpness.

Use case: style-transfer.
Re-render the existing Iberian imperial eagle hunting image, preserving its composition exactly, with photographic realism rather than the painted look the user rejected.

Input image 1: public/birds/hunting-iberienadler.png — edit target and sole composition, pose, prey placement, wing position, silhouette and framing reference.
Input image 2: outputs/proposals/flight/iberienadler/male.png — the USER-ACCEPTED adult Iberian imperial eagle; plumage and species identity reference ONLY, never pose.
Input image 3: public/hunting-steinadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.
Input image 4: public/hunting-seeadler.png — rendering reference ONLY, not anatomy, pose, prey or scenery.

1 Style
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic treatment to the entire scene, both eagle and rabbit.

2 Scene
One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

3 Background
Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Square canvas corresponding to 1254 x 1254 pixels. Keep the visible scene's bounds and centre within 2% of input image 1. Target meaningful alpha bounds on that canvas: x=13..1223, y=8..1203. Preserve the original narrow clear margins; do not crop a single wing feather or foot. No new habitat fragment, landscape, rock, ground or water; input 1 has none.

4 Raptor and prey
Raptor: Spanish imperial eagle / Iberian imperial eagle (Aquila adalberti), adult, plumage exactly as in input image
2 (the species' accepted flight image). Prey: European rabbit (Oryctolagus cuniculus).

Transfer image 2's dark warm brown body and underwing coverts, muted grey-brown barred flight feathers and tail with dark terminal bands, pale buff crown/nape and white shoulder/leading-edge patches to the unchanged hunting pose. Keep natural fine feather texture and diffuse photographic tonal transitions. The flight image is not a pose reference.

5 Task
Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted feather and fur treatment, matching the accepted adult plumage in input image 2.

Strict geometry lock: keep the large raised near wing filling the upper-left, the far wing raised into the upper-right, the eagle's head facing right near the right-centre, its tail fanned down-left, both feet grasping the rabbit at the same locations, and the rabbit below-right facing right with both ears upright and all four limbs anatomically correct. Preserve relative size, every joint location, overall silhouette and angle of each wing and tail. Do not substitute the soaring pose of image 2 or hunting poses of images 3–4. Render the rabbit's complete ears, muzzle, forelegs, hindlegs and tail naturally; talons wrap plausibly around the rabbit with real contact and occlusion, no extra toes or limbs. Change surface rendering and required plumage only, no composition redesign.

Output one image only on pure #00FF00 for local green unmixing. No typography, borders, watermark, checkerboard or mock transparency.

Final priority: changing the surface rendering is the purpose of this task. Photographic soft overlapping plumage, natural slightly irregular contours, muted grey brown primaries, softly buff nape. A real eagle's breast reads as a mass of fine dark soft feathers, NOT a tiled pattern of separate outlined brown scales. Preserve the original silhouette but entirely regenerate the microtexture as fine real feather barbs. The accepted input 2 should determine feather softness and contrast. Do not merely recolour or sharpen the rejected painting.
```
