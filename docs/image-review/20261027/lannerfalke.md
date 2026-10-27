# Lannerfalke – Porträtvorschlag

Status: Vorschlag zur späteren Freigabe. Keine Einbindung, keine neue Variante. AGENTS.md, docs/vogelbild-standard.md und docs/image-prompts/portrait.md gelesen und angewendet.

## Ausgabedateien und Herkunft

- Porträt: `outputs/proposals/portraits/lannerfalke.png` — RGBA PNG, 1254 × 1254. SHA-256: `57eec83be411986ede320bb0968f3132599ba7c8f78e19b95c7ff587a4c30efd`.
- Vergleich: `outputs/proposals/lannerfalke-check.png` — aktuelles Bild gegen Vorschlag auf #e8e8e4, #22282a und #2d7f7a, zusätzlich 64/48 px. SHA-256: `66bb66ba35f8ae78c8581e6ccc41bff87772d01e9cb15e833be084c988f488dc`.
- Beide Ausgaben stammen von `public/birds/portrait-lannerfalke-20260913-feather-ends.png`, SHA-256 `0f8ab9c344bbbc8a9cd64d93453e636eef8022ee3ef7339083d9550eab6f8c21` (entspricht dem Auftrag). Aktive Zuordnung in lib/portrait-images.ts bestätigt.

## Referenzen

- `public/birds/portrait-baumfalke-20260913-v3.png`: Nur Kopf-Hals-Verhältnis und Federabschluss. SHA-256 `a018b6cae8c0f0d49b192cb91801536d45dd89b21d87ad44b8a6d538e787b1fb`.
- `public/birds/portrait-gerfalke-20260913-v2.png`: Nur Rendering, Kopf-Hals-Verhältnis und Federabschluss. SHA-256 `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.
- `public/birds/portrait-habicht-20260912.png`: Nur gemeinsame Komposition. SHA-256 `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.

Andere Arten liefern keine Anatomie oder Gefiederfarben. Referenzreihenfolge im Tool: Original, Baumfalke, Gerfalke, Habicht.

## Generierung

Built-in image_gen, zwei gezielte Bearbeitungen, beide unmittelbar aus dem Original mit denselben drei Referenzen. Keine Variantenkette.

### Durchgang 1 – verworfen

Tool-Pfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-acdc-7691-8bdf-426170cdfa6a/exec-6dc4e740-55c5-4903-b87c-ab4f46fd333a.png`.
Lokale unveränderte Kopie: `outputs/proposals/lannerfalke-work/generated-1.png`, SHA-256 `b675b5305c12052047134826dd1d947e0d53d59d175be535f264b9c95236d356`.
Verworfen: Hals zu stark verkürzt (unterster sichtbarer Abschluss etwa y=970); feine Farbsäume nach einfacher Entmischung.

Exakter Prompt (feste Blöcke 1–3 wörtlich und in Reihenfolge; auch maschinell geprüft):

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

Species: Lanner falcon (Falco biarmicus), adult.
Identity: warm rufous crown and nape, dark brown iris, yellow orbital ring and cere, slate-grey hooked bill with dark tip, dark cheek and moustachial marking, cream throat and cheek. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: clean the cutout edge halo and shorten the visible neck A BIT by redrawing the lowest neck feather tips about 55-70 pixels higher on the 1254x1254 canvas, retaining naturally irregular intact feather ends. Preserve the head, eye, bill, face, crown, upper neck, feather pattern, colours, head scale and their exact original coordinates. Do not scale, move, stretch or compress the bird. Replace the transparent background with flat pure #00FF00 for later local green unmixing. Input image 2 (Baumfalke) is ONLY a reference for head-to-neck balance and natural feather endings; input image 3 (Gerfalke) is ONLY a reference for head-to-neck balance, rendering and feather endings; input image 4 (Habicht) is ONLY the shared composition reference. Do not copy anatomy or colour from those references. The targeted edit requires preserving input 1 head position even where general composition guidance differs.
Keep everything else pixel-identical in size and position.
```

### Durchgang 2 – ausgewählte Grundlage

Tool-Pfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-acdc-7691-8bdf-426170cdfa6a/exec-d5e60b67-d290-410e-8ecc-beeb56c78114.png`.
Lokale unveränderte Kopie: `outputs/proposals/lannerfalke-work/generated-2.png`, SHA-256 `5171657606baa32836420547dd35170be4bef7120e1ad8ac0e8f5e137970e8cc`.
Ausgewählt: dezente Kürzung, unterster sichtbarer Abschluss y=1056 statt etwa y=1105 im Original.

Exakter Prompt (feste Blöcke 1–3 wörtlich und in Reihenfolge; auch maschinell geprüft):

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

Species: Lanner falcon (Falco biarmicus), adult.
Identity: warm rufous crown and nape, dark brown iris, yellow orbital ring and cere, slate-grey hooked bill with dark tip, dark cheek and moustachial marking, cream throat and cheek. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: clean the cutout edge halo and shorten the visible neck A BIT by redrawing the lowest neck feather tips only 55-70 pixels higher on the 1254x1254 canvas: the original lowest tips are at y=1105, so the new lowest tips MUST remain near y=1040, not y=970. Keep substantial short neck feathering down to y=1040; this is a subtle trim, not a large reduction, retaining naturally irregular intact feather ends. Preserve the head, eye, bill, face, crown, upper neck, feather pattern, colours, head scale and their exact original coordinates. Do not scale, move, stretch or compress the bird. Replace the transparent background with flat pure #00FF00 for later local green unmixing. Input image 2 (Baumfalke) is ONLY a reference for head-to-neck balance and natural feather endings; input image 3 (Gerfalke) is ONLY a reference for head-to-neck balance, rendering and feather endings; input image 4 (Habicht) is ONLY the shared composition reference. Do not copy anatomy or colour from those references. The targeted edit requires preserving input 1 head position even where general composition guidance differs.
Keep everything else pixel-identical in size and position.
```

## Lokale Verarbeitung

Pillow/cv2 nicht verfügbar; Node und vorhandenes sharp verwendet. Reproduzierbare Skripte ausschließlich unter `outputs/proposals/lannerfalke-work/`: process.cjs, finish.cjs und check.cjs.

1. Generierung auf reinem Grün angefordert. Tatsächlicher medianer Randfarbwert [4, 249, 6] zur Entmischung gemessen.
2. Grünüberschuss-Alpha nach extract.py: a = clamp(1 − (G − max(R,B)) / (bgG − max(bgR,bgB))). Überschuss unter 10 wird deckend, Alpha unter 0,045 transparent. Größte zusammenhängende Vogelmaske mit 5×5-Nachbarschaft behalten. Hintergrundfarbe mathematisch aus dem RGB entfernen. Kein Weiß-/Grau-Key.
3. Ausschließlich im schmalen Konturbereich: Farbwerte aus benachbarten deckenden Federpixeln ermittelt und Alpha durch Projektion auf Vordergrund-/Grünmischung korrigiert. Keine pauschale Erosion und kein Abschneiden der Kontur.
4. 398.664 deckende Pixel des Originalkopfes und oberen Halses an exakt denselben Koordinaten wieder eingesetzt. Übergang ausschließlich innerhalb des Gefieders in Zeilen 730–820. Weder Skalierung noch Verschiebung, Stauchung oder Streckung. Außenkontur verwendet die bereinigte generierte Maske; sie ist ausdrücklich nicht bitidentisch mit dem alten, beanstandeten Alpha.
5. Elf isolierte transparente Einzelpixel unmittelbar an Federrändern aus ihren Nachbarpixeln geschlossen; außen verbundene Federzwischenräume bleiben frei.
6. RGBA PNG ohne Größenänderung gespeichert; Vergleichsansichten und Prüfdaten erzeugt.

## Selbstprüfung

- Alle drei Hintergründe in voller Auflösung 1254 × 1254 selbst angesehen; Kopf, Schnabel und Federspitzen vollständig. Keine sichtbaren weißen/grünen Säume, kein Nebel, keine Löcher und kein harter Halsabschnitt. Natürlich heller Kehlrand bleibt erhalten.
- Vergleichsbogen mit 64 und 48 px selbst angesehen; Kopfgröße und Position bleiben stabil, der Hals ist etwas kürzer. Referenzen zusätzlich bei 64 px verglichen (reference-display.png: Vorschlag, Baumfalke, Gerfalke, Habicht).
- Erster verworfener Durchgang ebenfalls auf allen drei Hintergründen in voller Auflösung sowie 64/48 px geprüft.
- Augenausschnitt [430, 290, 140, 120] einschließlich aller vier Kanäle pixelidentisch zum Original (0 geänderte Kanäle).
- Finale Alpha-Begrenzung bei Alpha > 127: [165, 129, 1143, 1056]; vollständig innerhalb der Leinwand.
- 16.865 teiltransparente Kantenpixel, 0 eingeschlossene vollständig transparente Pixel, 0 sichtbare Pixel mit Grünüberschuss > 10. Technische Metriken in final-metrics.json.
- Generische Augenhöhe der Vorlage wurde gemäß gezieltem Auftrag nicht durch Verschieben des bestehenden Kopfes erzwungen.
- Abnahme als Vorschlag: bestanden. Freigabe und spätere Produktintegration bleiben beim Nutzer/der Koordination. Produktansicht nicht verändert; die lokale Größenprüfung verwendet die aktuellen 64-/48-px-Rollen aus app/species-row.css.

Alle bewusst geschriebenen Projektdateien liegen unter outputs/proposals/. public/, lib/, app/, tests/, docs/ und Bildzuordnungen wurden nicht geändert.
