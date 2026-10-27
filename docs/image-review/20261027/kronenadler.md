# Kronenadler – Flugbild-Vorschläge

Status: Vorschläge zur Nutzerfreigabe. Keine Einbindung und keine Änderung an public/, lib/, app/, tests/, docs/ oder Bildzuordnungen. Ausschließlich vorhandenes adultes Normalbild (Dateischlüssel male) und vorhandener Jungvogel; keine neue Geschlechtsvariante.

AGENTS.md, docs/vogelbild-standard.md und docs/image-prompts/flight.md gelesen. Aktive Quellen: lib/bird-images.ts, Zeilen 41 und 81; kein Kronenadler-Morpheneintrag in lib/morphs.ts.

## Ergebnisse und Originalnachweis

### outputs/proposals/flight/kronenadler/male.png

- Quelle: `public/birds/kronenadler-20260913-v3.png`
- Quelle SHA-256: `cb9ea80ed220182ba0f867008b638f7975b81f6b76fa1d11cda2476fdf3f9089`
- Ergebnis SHA-256: `9d9bba3075d7298d46da94d51c8e015671f945507282a974262a26f53e3cb198`
- Auswahl: adult-generated-2.png, neues adultes Original
- Prüfung: 1254 × 1254 Pixel; echte Transparenz; Alpha-BBox x=74–1182, y=77–1177, 1109 × 1101 Pixel, Mittelpunkt (628,627). Leinwand, Größe und Mittelpunkt entsprechen exakt der aktiven adulten Quelle (0 % Abweichung).

### outputs/proposals/flight/kronenadler/juvenile.png

- Quelle: `public/birds/juvenile-kronenadler-20260913-v3.png`
- Quelle SHA-256: `10deb514c8c029433eb1fa98043b67bd12b5b6296821e604319b57050017ba62`
- Ergebnis SHA-256: `cefb9aa4468ac46fa9ccba9820546b68d9a8cd6ebc0c18681e0f7f618c15edbd`
- Auswahl: juvenile-generated-2.png, direkte Bearbeitung des neuen adulten Originals
- Prüfung: 1254 × 1254 Pixel; echte Transparenz; Alpha-BBox x=74–1182, y=77–1177, 1109 × 1101 Pixel, Mittelpunkt (628,627). Leinwand, Größe und Mittelpunkt entsprechen exakt der aktiven adulten Quelle (0 % Abweichung).

## Referenzen und Rollen

- `public/birds/kronenadler-20260913-v3.png`: recherchierte adulte Gefiedermerkmale und Ausgangsrahmen; keine verbindliche alte Geometrie und kein Zielstil.
- `public/birds/juvenile-kronenadler-20260913-v3.png`: ausschließlich recherchierte juvenile Gefiedermerkmale; kein Bearbeitungsoriginal.
- `public/birds/steinadler.png`, `public/birds/seeadler.png`: Stilreferenzen gemäß Promptvorlage, visuell gelesen; beim verworfenen Adultversuch 1 als Eingaben. Keine fremde Anatomie übernommen.
- Echtes Flugfoto: [Ferncliffe, Kronenadler](https://ferncliffe.org/wp-content/uploads/2021/05/crowned-eagle.jpg), im Browser angesehen. Lokaler Beleg: `flight/kronenadler/work/anatomy-flight-browser.png`. Rolle: breite Flügel, Gelenke, räumliche Verkürzung, Schwanzproportionen und zusammenhängender Körper. Das Foto zeigt die Gegenrichtung; die Vorschläge folgen der verlangten Linksrichtung und diagonalen Flügelachse. Direkter Download war netzwerkbedingt nicht verfügbar, deshalb Screenshot der tatsächlichen Fotodarstellung.
- `flight/kronenadler/work/adult-original-green.png`: einziges Bearbeitungsoriginal für beide Jungvogelversuche, direkte Grünkomposition des fertig gerahmten neuen adulten Originals. Nach der Variantenproduktion wurde bei beiden Ergebnissen dieselbe lokale Farbsäuberung an den feinen Haubenspitzen vorgenommen; Geometrie und Alpha blieben dabei unverändert. Die tatsächlich eingespeiste Grünvorlage bleibt unverändert archiviert.

## Generierungsweg und Versuche

Built-in `image_gen` verwendet, kein CLI-/API-Fallback. Zwei Generationen je Bild, maximal vier erlaubt. Die ersten drei festen Promptblöcke wurden programmgesteuert wörtlich aus `docs/image-prompts/flight.md` zusammengesetzt und in derselben Reihenfolge belassen. Art-, Varianten- und Auftragsblöcke sind aufgabenspezifisch.

- adult, Versuch 1: Verworfen: alter gemalter Stil und Transparenz statt Grün. Eingaben: alte adulte Quelle, Fotoscreenshot, Steinadler, Seeadler.
  - Toolablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a700-7e93-b1b7-a473b45c3426/exec-4e75b7ca-5952-4f97-a47b-98f5475b9f91.png` (automatische Toolablage).
  - Archivkopie: `outputs/proposals/flight/kronenadler/work/adult-generated-1.png`, SHA-256 `10eac355be52ac11e5ca12ebd91c8bb496ec4308dc66f983e915bc2f78303d2d`.
- adult, Versuch 2: Ausgewählt: neue Erzeugung ohne Bildeingaben; Fotoreferenz und Gefiederbefund im Art-/Auftragsblock beschrieben.
  - Toolablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a700-7e93-b1b7-a473b45c3426/exec-2d28abd4-5078-4117-952d-04c693f705fb.png` (automatische Toolablage).
  - Archivkopie: `outputs/proposals/flight/kronenadler/work/adult-generated-2.png`, SHA-256 `23abc78bbfb4e9988ccab14f3f7a693d78d0e4a2c2bf321095db27c3d1adf980`.
- juvenile, Versuch 1: Verworfen: Haubenkontur verschoben und Kopftextur zu gezeichnet. Eingabe 1 neues adultes Grünoriginal; Eingabe 2 alte juvenile Quelle nur für Gefieder. Alpha-IoU vor Korrektur 0,990210.
  - Toolablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a700-7e93-b1b7-a473b45c3426/exec-4ee2c3fc-ad27-4f25-a6d7-9a2be8106333.png` (automatische Toolablage).
  - Archivkopie: `outputs/proposals/flight/kronenadler/work/juvenile-generated-1.png`, SHA-256 `de2371e25437c41f1b1237ab1e94cb0fb06d22c982423e7db58b81a568c92b86`.
- juvenile, Versuch 2: Ausgewählt: ausschließlich adultes Grünoriginal als Eingabe 1. Keine Variantenkette. Alpha-IoU vor Alpharestaurierung 0,994688.
  - Toolablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a700-7e93-b1b7-a473b45c3426/exec-0b677b67-ff5f-4add-b25c-2608165d5a22.png` (automatische Toolablage).
  - Archivkopie: `outputs/proposals/flight/kronenadler/work/juvenile-generated-2.png`, SHA-256 `13972600013d702401756975896ddf6ba0e70eea52f415bb30523a2d3c319903`.

## Lokale Verarbeitung

1. Node + vorhandenes sharp genutzt, da Python cv2 nicht installiert ist. `work/process.mjs` implementiert die Grün-Entmischung nach `docs/portrait-user-refinements-20260913/extract.py`: Alpha aus Grünüberschuss, sehr kleine Alpha-Werte auf null, größte zusammenhängende Vogelkomponente mit zwei Pixeln Rand, Rückrechnung der Vordergrundfarben gegen #00FF00. Keine Weiß-/Grau-Freistellung.
2. Adultversuch 2 hatte 1254 × 1254 Pixel und nach Freistellung eine BBox (42,39), 1180 × 1145. Einmalige Rahmeneinstellung des neuen adulten Originals auf 1109 × 1101 bei (74,77), mit getrennten Skalierungen x=1109/1180 und y=1101/1145. Erst anschließend Varianten abgeleitet. Keine unabhängige Varianten-Skalierung.
3. `scripts/restore-bird-alpha.mjs` nur ausgeführt, nicht verändert: Adult auf sich selbst angewendet, um schmale Randfarben aus inneren Federpixeln zu säubern; identisches Alpha. Danach Grün-Arbeitskopie erzeugt.
4. Juvenilversuch 2 lokal grün-entmischt. Rohüberlagerung vor Maskenübernahme kontrolliert: keine versetzten Flügel, Schnäbel, Augen, Füße oder Schwanzspitzen. Rohe Alpha-Abweichung 2530 Schwellwertpixel, IoU 99,4688 %, überwiegend Antialias-Rand. Anschließend mit vorhandenem restore-bird-alpha.mjs den adulten Alpha-Kanal exakt übernommen und Randfarben gereinigt.
5. Visuelle Vergrößerung zeigte noch Farbartefakte an sehr dünnen Haubenspitzen. Bei beiden Bildern in x=558–589, y=500–546 ausschließlich RGB der 992 vorhandenen Vordergrundpixel aus jeweils nächstgelegenen opaken, natürlich braunen eigenen Federpixeln links davon übernommen (Suchradius 28 px, Referenzbereich x=530–557, y=500–549; R≥G≥B). Alpha, Federkontur und Position nicht verändert. Dadurch weder weiße Federn entfernt noch Federspitzen abgeschnitten.
6. `work/check.mjs` erzeugt Vergleich, Prüfhintergründe, 50-%-Überlagerung und Alpha-Differenz. Messdaten stehen in `work/final-check.json`.

## Prüfung

- Selbst visuell geprüft: beide Ergebnisse bei 1254 × 1254 auf #e8e8e4, #22282a und #2d7f7a, außerdem 360 × 360 im Vergleichsbogen. Die App verwendet einen responsiven quadratischen Bildrahmen (hero-art, max. 950 px); 360 px ist eine repräsentative kompakte Anzeigegröße. Keine Einbindung oder Behauptung eines Live-App-Tests.
- Gesamter Vogel mit Schnabel, Haube, Flügel- und Schwanzspitzen im Bild. Kein sichtbarer grüner/weißer Farbrand nach lokaler Nacharbeit, keine unnatürlichen Löcher in den geschlossenen Gefiederflächen. Die normalen Zwischenräume gespreizter Federn bleiben transparent.
- Neue Unteransicht, Blick links, Flügelachse unten links nach oben rechts; anatomischer Vergleich mit der Fotoreferenz. Weichere Federstruktur und weniger gravierte Federkonturen als im Altbestand. Künstlerische Endfreigabe bleibt beim Nutzer.
- Variantenüberlagerung: `work/overlay-final-50.png`; keine sichtbare Verschiebung der anatomischen Landmarken. Alpha-Differenz: `work/alpha-difference.png`, exakt 0 unterschiedliche Alpha-Pixel.
- Beide BBoxen und Canvas stimmen exakt mit dem Rahmen der bisherigen adulten Datei überein.
- Vergleichsbogen: `outputs/proposals/kronenadler-check.png`, Zeilen Adult aktuell / Adult Vorschlag / Jungvogel aktuell / Jungvogel Vorschlag, Spalten hell / dunkel / teal.

## Exakte Prompts

### adult, Versuch 1

Promptdatei: `outputs/proposals/flight/kronenadler/work/adult-prompt-1.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: African Crowned Eagle (Stephanoaetus coronatus), normal adult.
Underside identity: dark brown head with short swept crest, powerful hooked dark bill and yellow cere, rufous-brown underwing coverts, pale flight feathers with dark transverse bars and dark fingered primary tips, creamy underbody densely barred and blotched black-brown, strongly barred fairly long tail, feathered legs and powerful yellow feet. Anatomy and proportions from real photographs of this species only.

Task: Create a completely new adult replacement, not a painted restyle of the old geometry. Input 1 is the current adult: use only its researched plumage identity and frame, never its stiff pose or engraved texture. Input 2 is a genuine flight photograph of this species: use only anatomy, broad rounded wings, natural joints, foreshortening and long tail; orient the new bird leftwards with the wing axis lower left to upper right. Inputs 3 and 4 are style references only, never anatomical models; the photographic realism specified above takes precedence over painted details in those references. Show a calm banked glide with both undersides visible and the feet naturally tucked. Canvas square, final 1254 x 1254. Bird alpha bounding box must occupy x=74..1182, y=77..1177 after local extraction, with centre (628,627) and dimensions 1109 x 1101, within 2%. Entire bird, clean feather tips, ample green margin, no text. Generate the green master in this same square composition.
```

### adult, Versuch 2 – final ausgewählt

Promptdatei: `outputs/proposals/flight/kronenadler/work/adult-prompt-2.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: African Crowned Eagle (Stephanoaetus coronatus), normal adult.
Underside identity: dark brown head with low swept crest, compact hooked dark bill and yellow cere, warm brown lesser underwing coverts, cream flight feathers with several dark transverse bars and dark primary tips, creamy body heavily blotched and barred black-brown, long banded tail, feathered legs, powerful yellow feet with dark claws tucked against belly. Anatomy and proportions from real photographs of this species only.

Task: NEW wildlife-photographic adult original, a real-looking African Crowned Eagle banking in a gentle soaring glide, viewed from below and obliquely forward. Its gaze and bill point left, near wing extends toward bottom left, far wing toward top right, long tail extends toward bottom right. Broad wings, plausible foreshortening, natural slightly irregular separated primaries, compact head, continuous streamlined body. Photographic soft feather detail, no uniform outlined scales, no drawn quill lines. The existing old adult is a rejected painted image; do not reproduce it. Real-flight anatomy reviewed at https://ferncliffe.org/wp-content/uploads/2021/05/crowned-eagle.jpg: broad rounded wing outlines, naturally flexed wrist, long tail, head small relative to wings. This is a studio-isolated bird on a completely opaque solid RGB(0,255,0) GREEN backdrop, not transparent. Canvas square 1254 x 1254; entire bird inside bounding rectangle x=74..1182, y=77..1177 with all feather tips intact and no cast shadow. No labels.
```

### juvenile, Versuch 1

Promptdatei: `outputs/proposals/flight/kronenadler/work/juvenile-prompt-1.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: African Crowned Eagle (Stephanoaetus coronatus), juvenile.
Underside identity: creamy white head and neck with sparse light brown streaking on crown and nape, largely clean creamy white breast and belly, pale cream underwing coverts with sparse brown spotting, dark barred flight feathers and tail, spotted feathered thighs, dark hooked bill and yellow cere, yellow feet. Anatomy and proportions from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: lighten head, neck, breast and belly to creamy white, replace dense adult chest bars with almost unmarked cream, lighten the rusty-brown underwing coverts to cream with sparse brown spotting, retain the barred primaries, secondaries and tail and spotted thighs. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Task: Input image 1 is the finalized NEW adult original on a green working background, outputs/proposals/flight/kronenadler/work/adult-original-green.png, a direct composite of outputs/proposals/flight/kronenadler/male.png. This is the sole geometry and style source. Input image 2 is the OLD juvenile solely as reference for researched juvenile plumage, never its geometry or painted feather style. Make a subtle colour/plumage edit of image 1 only. Every eye, bill, crest tip, shoulder, wrist, feather tip, foot and tail landmark stays exactly in place; no independent resize, crop, rotation or repositioning. Same 1254 x 1254 canvas. Retain the flat opaque RGB(0,255,0) green background for local green unmixing. Preserve the photographic softness of image 1. No text.
```

### juvenile, Versuch 2 – final ausgewählt

Promptdatei: `outputs/proposals/flight/kronenadler/work/juvenile-prompt-2.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: African Crowned Eagle (Stephanoaetus coronatus), juvenile.
Underside identity: creamy white head and neck with sparse light brown streaking on crown and nape, largely clean creamy white breast and belly, pale cream underwing coverts with sparse brown spotting, dark barred flight feathers and tail, spotted feathered thighs, dark hooked bill and yellow cere, yellow feet. Anatomy and proportions from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: lighten head, neck, breast and belly to creamy white, replace dense adult chest bars with almost unmarked cream, lighten the rusty-brown underwing coverts to cream with sparse brown spotting, retain the barred primaries, secondaries and tail and spotted thighs. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Task: Input image 1 is the finalized NEW adult original on a green working background, outputs/proposals/flight/kronenadler/work/adult-original-green.png, a direct composite of outputs/proposals/flight/kronenadler/male.png. This is the sole geometry and style source. The researched old juvenile was inspected separately for plumage; it is deliberately not an image input. Make a subtle colour/plumage edit of image 1 only. Every eye, bill, crest tip, shoulder, wrist, feather tip, foot and tail landmark stays exactly in place; no independent resize, crop, rotation or repositioning. Same 1254 x 1254 canvas. Retain the flat opaque RGB(0,255,0) green background for local green unmixing. Preserve the photographic softness of image 1. No text.

Refinement task: Keep exactly the original smooth photographic feather texture on head and chest; only change feather pigmentation, never add raised outlined scallops. Preserve the precise crest silhouette of input 1 with all crest tips at the original coordinates; do not enlarge the crest or move its top edge. Match every feather contour, and maintain the same subtle natural contrast as the adult original.
```

