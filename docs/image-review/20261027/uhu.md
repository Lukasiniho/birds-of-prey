# Uhu — Porträtvorschlag, NICHT ABNAHMEFÄHIG

Status: Vier von maximal vier Generierungen ausgeschöpft. Der Ersatz ist technisch als RGBA-PNG vorhanden, erfüllt aber das verbindliche Porträtraster noch nicht vollständig. Keine Einbindung und keine Freigabeempfehlung.

## Ergebnis und Herkunft

- Ausgabe: `outputs/proposals/portraits/uhu.png`, 1254 × 1254, RGBA, SHA-256 `42faa1b00313b7091af246ca8bce6c46b006dcfd64935fb30b821514bebef6b9`.
- Zu ersetzende aktive Quelle: `public/birds/portrait-uhu.png`, SHA-256 `cbf06144ed93adab7c0a729fe266e3dc99f36224aac3d367deac47cf04a5d926`. Entspricht exakt der Auftragsprüfsumme. Aktive Zuordnung gelesen in `lib/portrait-images.ts`: `/birds/portrait-uhu.png?v=841e50dbeb3f`.
- Direkte Pixelquelle des Ergebnisses: `outputs/proposals/uhu-work/generation-4.png`, SHA-256 `dc4b647ef847eebe85f3e481db026cde0b650839aad468f8f643d762757627fe`.
- Vergleich: `outputs/proposals/uhu-check.png`, SHA-256 `c89e14c78516603ba59174c3a059a598d86a821745daabddad32ad72e76af74a`; obere Reihe aktuelle Quelle, untere Reihe Vorschlag, Spalten hell #e8e8e4 / dunkel #22282a / petrol #2d7f7a. Unter jeder Ansicht 64 px und 48 px (aktuelle Rollen aus `app/species-row.css`). Die großen Vergleichsansichten sind 420 px; zusätzliche Prüfbilder im Arbeitsordner sind volle 1254 px.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png`: ausschließlich Komposition und Kamerawinkel; SHA-256 `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png`: ausschließlich Rendering, weiche Federstruktur und natürlicher unterer Federabschluss; SHA-256 `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.
- [Echtes Uhu-Foto von Steeman](https://www.steeman.org/Images/Eagle-Owl-9.jpg), [Kontextseite](https://www.steeman.org/Eagle-Owl): im Chrome-Browser visuell betrachtet. Nur Anatomie: runder Gesichtsschleier, Iris, Schnabelbasis, feines Gesichtsgefieder. Offenen Schnabel und Umfeld nicht übernehmen. Netzwerkdownload per Shell/Node schlug fehl; kein lokales Foto vorgetäuscht, keine lokale Prüfsumme vorhanden. Das Foto wurde nicht als Datei an Imagegen übergeben.
- Die aktuelle Uhu-Datei wurde nur in Durchlauf 1 als zu ersetzendes Bild übergeben; sie war keine verbindliche Geometrievorlage. Keine anderen Arten oder Varianten bearbeitet.

## Generierungsweg

Built-in `image_gen.imagegen`, vier Durchläufe. Das Tool legt automatisch Kopien in seinem eigenen Cache ab; alle manuell geschriebenen Dateien liegen ausschließlich unter `outputs/proposals/`. Keine Änderungen an public/, lib/, app/, tests/, docs/ oder Bildzuordnungen.

| Durchlauf | Lokale Kopie | SHA-256 | Eingaben / Entscheidung |
|---|---|---|---|
| 1 | `outputs/proposals/uhu-work/generation-1.png` | `c69ef434326108f4eb2574f93d5fabb5d93480ab7f5d3bea42ce6e7c7788ff8c` | Aktueller Uhu + Habicht + Gerfalke. Verworfen: alte Perspektive und tiefe Augenposition zu stark übernommen. |
| 2 | `outputs/proposals/uhu-work/generation-2.png` | `850fea563b93f6c269325e1ad622d0a2525d5181da60644c464325b93d18fa9a` | Keine Bilddatei als Eingabe, Neuerstellung. Verworfen: Augenhöhe und Perspektive weiterhin unzureichend. |
| 3 | `outputs/proposals/uhu-work/generation-3.png` | `6dd1fb953eebc418f76c5c328090948c105ff271e937a1a0c55f851e04dfb7d8` | Habicht + Gerfalke als Rollenreferenzen. Verworfen: Hintergrund nicht grün und sichtbare Randartefakte. |
| 4 | `outputs/proposals/uhu-work/generation-4.png` | `dc4b647ef847eebe85f3e481db026cde0b650839aad468f8f643d762757627fe` | Direkt generation-3.png als Korrekturziel. Für den dokumentierten Vorschlag lokal freigestellt; weiterhin keine vollständige Abnahme. |

Automatische Originalpfade des Tools:

1. `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a934-7bb1-bf68-1b0ae1842c3d/exec-7996aad1-372c-4e89-a4e9-63d6706dbf43.png`
2. `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a934-7bb1-bf68-1b0ae1842c3d/exec-3ff39136-29b9-4987-b11d-cac5debf1ee3.png`
3. `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a934-7bb1-bf68-1b0ae1842c3d/exec-f3fd7cff-ee83-48a4-ae0e-e077dbd39617.png`
4. `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a934-7bb1-bf68-1b0ae1842c3d/exec-5d05edf5-ff6b-4e08-bc4e-0a78f2c07e7d.png`

## Lokale Verarbeitung

Reproduzierbar mit `node outputs/proposals/uhu-work/process.cjs`; Node + vorhandenes sharp 0.34.5, da Python-PIL fehlt. Vorlage gelesen: `docs/portrait-user-refinements-20260913/extract.py`.

1. Hintergrund-RGB aus Randmedian ermittelt: [5, 249, 4]. Alle Prompts forderten exakt #00FF00 an; das Generierungsresultat wich geringfügig ab, daher tatsächliche Hintergrundfarbe für das Unmixing verwendet.
2. Excess-green-Alpha nach der Vorlage, Schwelle 0,045, größte zusammenhängende Vogelkomponente und 5×5-Nachbarschaft für feine Federränder.
3. Lokale Matte anhand benachbarter deckender Federfarben verfeinert, um olivgrünen Spill zu verringern; RGB durch Rückrechnung des Hintergrundanteils entmischt. Kein Weiß-/Grau-Key, keine pauschale Entfernung heller Gefiederpixel.
4. Native Freistellung unter `outputs/proposals/uhu-work/cutout-native.png`. Native Vogelgrenzen [162,47,1170,1147]. Ausschließlich gleichmäßige Skalierung um 0,89918256, keine Verzerrung von Hals/Kopf. Auf transparente 1254×1254-Leinwand gesetzt: sichtbarer Rahmen ungefähr [174,101,1080,1090]. So bleiben Ohrbüschel und Schnabel vollständig, oberer Rand mindestens 8 %, Abschluss ungefähr 87 %.
5. Vollformat-Komposite für beide Bilder auf allen drei Hintergründen sowie Vergleich mit nativen 64-/48-px-Ansichten erzeugt. Technische Werte in `outputs/proposals/uhu-work/processing.json` und `outputs/proposals/uhu-work/alpha-check.json`.

## Eigene Prüfung

Alle drei finalen Hintergründe bei vollen 1254 px und im Vergleich mit 64/48 px visuell angesehen. Ergebnis:

- Echte Transparenz vorhanden: 908715 vollständig transparente, 45229 teiltransparente und 618572 deckende Pixel; kein belegtes Pixel am Leinwandrand. Keine sichtbaren Löcher im Gesicht oder hellen Kehlgefieder. Schnabel und beide Ohrbüschel vollständig erhalten.
- Linksdrehung gegenüber Altbild verbessert, eine sichtbare orange Iris, geschlossener schwarzer Schnabel, arttypischer Schleier und Ohrbüschel vorhanden.
- **Nicht bestanden: Augenhöhe.** Visuell gemessene Augenmitte ungefähr y=480/1254, also 38,3 %, statt etwa 32 %. Das entspricht rund 79 px Abweichung. Die Skalierung zur Randkorrektur behebt dies nicht.
- **Nicht bestanden: kurzer Halsanteil.** Unterhalb des Schleiers bleibt ein zu langer, brustartig wirkender Federanteil; die Kopfgröße ohne Ohrbüschel wirkt in kleiner Anzeige relativ klein gegenüber dem Habicht.
- **Nicht sicher bestanden: völlig farbsaumfreie Kontur.** Nach verfeinertem Unmixing deutlich verbessert; in Vollgröße bleiben einzelne grünlich/olivfarbene feine Spitzen an der Stirn und geringfügig farbige Außenfedern erkennbar. In 64/48 px unauffällig. Deshalb keine pauschale Behauptung einer sauberen Endabnahme.
- Stil stellenweise weiterhin zu kontrastreich und scharf gegenüber der Gerfalkenreferenz. Der untere Abschluss zeigt relativ gleichförmige Federzacken.

Die Grenze von vier Generierungen wurde eingehalten. Für Freigabe wäre ein weiterer gestalterischer Korrekturdurchlauf nötig; er wurde nicht eigenmächtig gestartet. Dieser Vorschlag bleibt ausdrücklich eine dokumentierte Zwischenlösung zur Sichtung.

## Exakte Prompts

Die festen Blöcke 1–3 wurden für alle vier Prompts automatisiert gegen `docs/image-prompts/portrait.md` auf wortgleiche Reihenfolge geprüft. Nur Art-/Auftragsblöcke wurden ergänzt. Finaler verwendeter Prompt ist Durchlauf 4; zur vollständigen Nachvollziehbarkeit folgen alle vier tatsächlich verwendeten Prompts.

### Durchlauf 1

Datei: `outputs/proposals/uhu-work/prompt-1.txt`

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Eurasian Eagle-Owl (Bubo bubo), adult.
Identity: Long erect ear tufts, deep orange iris, tawny facial disc with a dark rim, dark-streaked crown, pale throat, and a short black hooked bill largely hidden in facial feathers. Anatomy from real photographs of this species only.

Task: NEW PORTRAIT, a full replacement of the current Uhu portrait, correcting the perspective. Follow the left-facing slight three-quarter view and eye-height grid above; do not preserve the old portrait's incorrect perspective or low eye position. Keep the owl's rounded facial disc and distinctive anatomy, with the far side naturally foreshortened and the gaze clearly directed left. Ear tufts must be complete, anatomically natural and clear of the canvas border. Show only the head and a short feathered neck, no breast or shoulders.
Reference roles: public/birds/portrait-uhu.png is the old portrait to replace, not a geometry constraint. public/birds/portrait-habicht-20260912.png is composition only. public/birds/portrait-gerfalke-20260913-v2.png is rendering and natural lower feather termination only. Anatomy was checked against the real Eurasian Eagle-Owl photograph https://www.steeman.org/Images/Eagle-Owl-9.jpg (https://www.steeman.org/Eagle-Owl); the owl has a rounded, forward-facing facial disc, an orange iris, fine facial down around the mostly concealed hooked bill, and streaked tawny head feathers. Use that species anatomy, never the setting or crop. Do not transfer hawk or falcon anatomy to the owl.
```

### Durchlauf 2

Datei: `outputs/proposals/uhu-work/prompt-2.txt`

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Eurasian Eagle-Owl (Bubo bubo), adult.
Identity: Long erect ear tufts, deep orange iris, tawny facial disc with a dark rim, dark-streaked crown, pale throat, and a short black hooked bill largely hidden in facial feathers. Anatomy from real photographs of this species only.

Task: Create a completely NEW replacement portrait from scratch, not a retouch of the old owl. Correct the perspective: near-profile left, rotated only 20 degrees toward the viewer, with the bill projecting clearly left and the far eye hidden by the bridge and facial feathers. Eye-level camera, natural upright head, not looking down. The near iris centre must be at x=40%, y=32%. Crown near y=19%, intact long ear tufts rise to y=8-10%; keep a broad rounded owl head beneath the tufts, a rounded facial disc ending near y=69%, and only short neck feather tips ending near y=87%. Preserve natural owl anatomy and do not flatten or stretch it. The owl must not look frontal or repeat the incorrect downward-tilted old portrait.
Reference roles: The approved composition reference is public/birds/portrait-habicht-20260912.png (head scale, leftward angle and eye height only). The rendering and lower feather-edge reference is public/birds/portrait-gerfalke-20260913-v2.png (soft living feather texture and irregular feather tips only). Never borrow hawk/falcon anatomy. Real species anatomy was checked against https://www.steeman.org/Images/Eagle-Owl-9.jpg: broad rounded tawny facial disc, fine facial down obscuring the bill base, orange eye, dense brown and black head streaking. Do not copy its open bill or setting.
```

### Durchlauf 3

Datei: `outputs/proposals/uhu-work/prompt-3.txt`

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Eurasian Eagle-Owl (Bubo bubo), adult.
Identity: Long erect ear tufts, deep orange iris, tawny facial disc with a dark rim, dark-streaked crown, pale throat, and a short black hooked bill largely hidden in facial feathers. Anatomy from real photographs of this species only.

Task: NEW UHU PORTRAIT. Use the attached goshawk portrait strictly as the camera-angle and composition reference, and the attached gyrfalcon strictly as the soft feather-rendering and feather-edge reference. Create a Eurasian Eagle-Owl, not a hawk, but with exactly the same LEFTWARD NEAR-PROFILE camera angle as those references. This must be a real change from the old Uhu image: face points to the LEFT EDGE, not the lower-left corner or viewer. Rotate the owl head a further 25 degrees toward the left edge compared with the previous owl drafts. Only the near eye is visible; the facial disc is foreshortened in width and the curved bill silhouette projects to the left at x=20%, y=45%. The near eye is at x=36%, y=32%. Do not draw a front-facing oval face. The crown is at y=18%, the intact ear tufts reach y=8%, and the bill is closed. The upper head must not tilt downward. Bottom feather tips at y=87%, no body or breast. A compact pale throat beneath the rounded owl facial disc. No flat cut or feather fringe made of repeated equal triangular points. Anatomy of Bubo bubo from actual species photos only: https://www.steeman.org/Images/Eagle-Owl-9.jpg. Use the rounded facial disc, orange iris, feather-covered bill base and natural streaked head from the photo, not its open bill or background.
```

### Durchlauf 4

Datei: `outputs/proposals/uhu-work/prompt-4.txt`

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Eurasian Eagle-Owl (Bubo bubo), adult.
Identity: Long erect ear tufts, deep orange iris, tawny facial disc with a dark rim, dark-streaked crown, pale throat, and a short black hooked bill largely hidden in facial feathers. Anatomy from real photographs of this species only.

Task: Correct the attached replacement Uhu portrait. Turn the head slightly farther left so the beak projects clearly left in near-profile, with one eye visible, matching the approved goshawk composition. Rebuild the upper-head composition naturally: the near eye centre must rise to y=32% of the canvas, with the crown at y=18-20% and the long but anatomically proportioned ear-tuft tips at y=8-10%, never above 8%. Keep the bottom feather tips at y=87%. Do not shrink or stretch the facial disc; redraw the head correctly with a short compact throat only, not a long breast. Retain the tawny and black-streaked adult Bubo bubo identity, deep orange iris, partly hidden black hooked bill and pale throat. Keep realistic soft feather detail. Replace ALL background with opaque uniform pure green RGB(0,255,0), including every gap between the feather tips; absolutely no transparent, black, white or checkerboard background pixels. The green backing is mandatory for the subsequent local matte. Maintain at least 8% empty green margin on all sides. References: input 1 is the replacement draft to correct; approved public/birds/portrait-habicht-20260912.png controls composition only, and public/birds/portrait-gerfalke-20260913-v2.png controls natural rendering and feather-edge only. Anatomy checked against the real Uhu photo https://www.steeman.org/Images/Eagle-Owl-9.jpg, with closed bill for this portrait.
```
