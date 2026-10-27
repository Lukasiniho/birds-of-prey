# Schleiereule — Porträtvorschlag

Status: Vorschlag zur Nutzerfreigabe; keine Einbindung. Nur ein Ersatz für das vorhandene Porträt, keine neuen Varianten. Zwei von maximal vier Generierungen verwendet. AGENTS.md, docs/vogelbild-standard.md und docs/image-prompts/portrait.md gelesen und angewendet.

## Quelle und Referenzen

Aktive Zuordnung: `lib/portrait-images.ts:4`.
Original/Bearbeitungsziel: `public/birds/portrait-schleiereule-20260913.png`  
SHA-256: `186d118ca9518d0916a085fdb45f41bd3968bbb6365dbadd17e7b60154d7b771` (vor und nach der Bearbeitung identisch).
Das Original dient der Identität und bestehenden weiß/goldgrauen Farbpalette; seine frontale Pose wird ersetzt.

- `public/birds/portrait-habicht-20260912.png` — Nur Komposition: Kopfgröße, Augenhöhe, kurzer Hals, Ausschnitt. SHA-256: `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png` — Nur Rendering und natürlicher Federabschluss; keine Anatomie oder Farben. SHA-256: `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.

Echte Fotoreferenz: [Schleiereule, Foto von Caroline Legg über iNaturalist](https://inaturalist-open-data.s3.amazonaws.com/photos/163607771/original.jpg), gefunden über [iNaturalist](https://inaturalist.mma.gob.cl/taxa/20445-Tyto-alba). Im Chrome-Browser tatsächlich visuell geprüft: links gerichteter Gesichtsschleier mit verdecktem fernem Auge, dunkles Auge und kleiner heller Schnabel. Nur Anatomieprüfung; kein Bildbestandteil kopiert und keine Aufnahme als Stilvorlage verwendet. Direkte Abrufe über Web/Terminal scheiterten; der Browser konnte diese Aufnahme öffnen. Das Foto wurde nicht als Generator-Input angehängt.

## Generierungen

Built-in `image_gen.imagegen`, keine CLI/API-Alternative. Die ersten drei festen Promptblöcke wurden programmgesteuert unverändert aus portrait.md übernommen und die Reihenfolge geprüft.

### Generierung 01

Tool-Pfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-aac4-78a1-bd07-d0e6c3925190/exec-126d1bc3-956e-4108-8a31-ec014f85bd9a.png`  
Lokale unveränderte Kopie: `outputs/proposals/schleiereule-work/generation-01.png`  
SHA-256: `4956540928ecd9e84be9f1c1b0fa606cc2348d22c94034a7cbcbd0712410cc99`.

Inputs in Reihenfolge: aktuelles Schleiereulenporträt (Farbe), Habicht (Komposition), Gerfalke (Rendering/Federabschluss). Verworfen: Pose zu frontal und verlangter grüner Hintergrund nicht umgesetzt.

Exakter tatsächlich verwendeter Prompt:

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

Species: Barn Owl (Tyto alba), adult.
Identity: heart-shaped white facial disc with a thin warm buff rim; black-brown
eyes; small closed pale ivory bill; rounded golden-buff and grey crown with
fine dark and white dots; no ear tufts. Anatomy from real photographs of this species only.
Preserve the white, pale golden-buff and soft grey plumage colours of input image 1.

NEW PORTRAIT: create a full replacement for input image 1, the current
Schleiereule portrait, correcting its near-frontal pose. Turn the head clearly
toward the left, about 20-30 degrees from pure profile toward the viewer,
showing the near facial-disc lobe prominently and the far lobe strongly
foreshortened, with the far eye mostly concealed. Keep the species-specific
heart-shaped disc, soft facial feathers and compact owl anatomy.
Input image 1 is only the current plumage-colour reference, not a pose reference.
Input image 2 (Habicht) is ONLY the composition reference: framing, optical
head size, eye height and short neck; never copy its anatomy or colours.
Input image 3 (Gerfalke) is ONLY the rendering and natural feather-tip ending
reference; never copy its anatomy or colours. Fit the entire facial disc,
bill and all feather tips inside the margins. No added body or shoulders.
```

### Generierung 02

Tool-Pfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-aac4-78a1-bd07-d0e6c3925190/exec-26f4eaf9-1367-47a1-890a-5931d2f65735.png`  
Lokale unveränderte Kopie: `outputs/proposals/schleiereule-work/generation-02.png`  
SHA-256: `2c94e0c0f76c792b150bdb4eae991d0543e1e5c9acc5f8570ed0e253fb44dd85`.

Inputs in Reihenfolge: Habicht (Komposition), Gerfalke (Rendering/Federabschluss). Ausgewählt: vollständige Neuerstellung mit klarer Linksdrehung, verdecktem fernem Auge und grünem Hintergrund. Kein abgeleiteter Variantenauftrag.

Exakter tatsächlich verwendeter Prompt:

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

Species: Barn Owl (Tyto alba), adult.
Identity: heart-shaped white facial disc with a thin warm buff rim, black-brown
eye, pale ivory closed bill, golden-buff and grey finely dotted rounded crown,
no ear tufts. Anatomy from real photographs of this species only.
Colours remain white on the facial disc and throat, pale golden-buff on the
sides of the head, grey with fine dark and white dots on the crown.

NEW PORTRAIT, full replacement, not a retouch. Draw a new Barn Owl head in a
clearly LEFT-facing slight three-quarter view, only 20-30 degrees toward the
viewer from a strict left side profile. The bill points left and downward;
the far eye is hidden behind the nasal ridge, with only one eye clearly
visible. Do not make a frontal or near-frontal symmetric heart-shaped face.
The visible facial-disc lobe is deep and rounded and the far lobe is strongly
foreshortened. Preserve the owl's natural disc and small ivory bill, never a
hawk beak. Match the compact neck and eye height from the composition guide.
Input image 1 (Habicht) is ONLY composition, optical head size, eye height and
framing reference. Input image 2 (Gerfalke) is ONLY rendering and individual
natural feather tips reference. Neither is an anatomy or colour reference.
The background MUST be fully opaque, solid vivid green RGB(0,255,0), including
all four corners and the full area outside the bird. Do not output transparency
or black background: green is required for later local colour unmixing.
Head and all bill and feather tips must be comfortably within the 8% margins.
```

## Lokale Verarbeitung

Reproduzierbar mit `node outputs/proposals/schleiereule-work/process.cjs`; Node/sharp wurde verwendet, da Python PIL fehlte.

1. `outputs/proposals/schleiereule-work/generation-02.png` dekodiert. Hintergrundrand-Median RGB `[5,249,4]`; #00FF00 war unverändert angefordert, der Generator lieferte eine geringe Farbabweichung.
2. Grün-Entmischung analog `docs/portrait-user-refinements-20260913/extract.py`: `alpha = clamp(1 - (G-max(R,B))/(bgG-max(bgR,bgB)),0,1)`, Überschuss unter 10 voll deckend, Alpha unter 0,045 transparent.
3. Größte zusammenhängende Vogelmaske ab Alpha 0,15 erhalten, 5×5-Nachbarschaft zum Schutz feiner Federn; isoliertes Hintergrundrauschen entfernt. RGB-Hintergrundanteil mathematisch entmischt. Kein Weiß-/Grau-Key, keine Entfernung heller Gefiederbereiche.
4. Verbleibende chromatisch gemischte Randfarben aus der nächsten deckenden Feder innerhalb 12 px rekonstruiert; Alpha unverändert. Nach der Skalierung grünen Farbüberschuss ausschließlich in teildurchsichtigen Pixeln begrenzt. Keine Konturerosion.
5. Gesamte freigestellte Leinwand gleichmäßig von 1254 auf 1179 px skaliert und bei `(0,14)` auf eine transparente 1254×1254-Leinwand gesetzt. Keine getrennte Hals-/Kopfskalierung, kein Stauchen und kein Beschneiden des Vogels. Das bringt Oberkante, Augenhöhe und Federabschluss ins gemeinsame Raster.
6. RGBA-PNG gespeichert, Vergleich und Prüfansichten aus genau dieser Datei erzeugt.

## Ausgabedateien und Herkunft

| Datei | Quelle | SHA-256 der Ausgabe |
| --- | --- | --- |
| `outputs/proposals/portraits/schleiereule.png` | Generierung 02; Ersatz für `public/birds/portrait-schleiereule-20260913.png` (Originalhash oben) | `6b9c8b85437ef73ab38117e0ae7e5168003b2b69a5d5a8ba6ddcce3a0f94242b` |
| `outputs/proposals/schleiereule-check.png` | Aktuelles Original `public/birds/portrait-schleiereule-20260913.png` + fertiges `outputs/proposals/portraits/schleiereule.png`; beide Hashes oben | `10a0be190e3359071af681dba849d4c3b7bb4d8441681be0613c1d1d489a4770` |

Alle zusätzlichen Arbeitsdateien liegen unter `outputs/proposals/schleiereule-work/`. `generation-01.png` ist ausdrücklich verworfen; `generation-02.png` ist die unveränderte Rohgenerierung. `full-0.png`, `full-1.png`, `full-2.png` sind aus dem finalen Porträt zusammengesetzte Vollgrößenprüfungen auf #e8e8e4, #22282a, #2d7f7a. `reference-check.png` vergleicht Habicht, Vorschlag und Gerfalke bei identischer Leinwandgröße und 64 px. `cutout-native.png` ist die Freistellung vor der einheitlichen Rasteranpassung. Vollständige Arbeitsdatei-Hashes stehen in `schleiereule-work/sha256.json`.

## Prüfung

- Finalformat: RGBA PNG, 1254×1254 px, echte Transparenz.
- Sichtbarer Alpha-Rahmen: x 167–1113, y 101–1096. Mindestens 8 % Rand an jeder Seite; Federabschluss bei 87,4 %, Augenmitte ungefähr 33 % von oben.
- Alle drei finalen Vollgrößenansichten selbst visuell geprüft, ebenso den Vergleichsbogen mit echten 64-/48-px-Kacheln. Kein sichtbarer Grün-/Weißsaum oder Halo, keine ausgeschnittenen Gefiederflächen, vollständiger Schnabel und vollständige Randfedern. Keine Flügel im Porträt.
- Natürlicher kurzer Halsabschluss mit einzelnen Federspitzen; weißer Gesichtsschleier, dunkles Auge, heller Schnabel und goldgraue Krone bleiben erhalten. Die neue Linksdrehung ist auch in der kleinen Anzeige erkennbar. Anatomie am echten Foto und optische Kopfgröße im Referenzbogen geprüft.
- Technisch: 863359 vollständig transparente, 26897 teildurchsichtige und 682260 deckende Pixel. 0 sichtbare Pixel mit grünem Überschuss >12. Ein zusätzlicher strenger Nullalpha-Fluttest meldet mikroskopische Zwischenräume zwischen Randfeder-/Antialiaspixeln (bei 8er-Nachbarschaft größte eingeschlossene Gruppe 14 Pixel, nur eine Pixelzeile); diese liegen am äußeren Federabschluss, nicht als sichtbare Löcher in den Gefiederflächen.
- Beide Prompts bestehen den wörtlichen Präfixvergleich der festen Blöcke. Original-Prüfsumme abschließend unverändert.
- Freigabeumfang: geprüfter Vorschlag, keine Live-Einbindung und kein App-Build. Alle eigenen Projektdateien ausschließlich unter `outputs/proposals/` geschrieben; `public/`, Zuordnungen, App-Code, Tests und Dokumentation unverändert.
