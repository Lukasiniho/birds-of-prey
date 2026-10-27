# Aguja – Porträtvorschlag

Status: Vorschlag zur späteren Nutzerfreigabe, nicht eingebunden. Ein vorhandenes adultes Porträt vollständig ersetzt; keine Flugbilder, Varianten oder Bildzuordnungen bearbeitet. AGENTS.md, docs/vogelbild-standard.md, docs/image-prompts/portrait.md und die Freistellungsvorlage wurden gelesen. Die aktuelle ausdrückliche Ablehnung des Nutzers hat Vorrang vor der älteren Bestätigung des Aguja-Porträts im Standard.

## Ergebnis und Herkunft

- Ausgabe: `outputs/proposals/portraits/aguja.png`, RGBA PNG, 1254 × 1254 px.
- Ausgabe-SHA256: `054732a3929aed2fd2f283158a02b0a903d1b195d626e6aca0c67abb1973562b`.
- Ersetzungsziel / Vorher-Quelle: `public/birds/portrait-aguja-20260913-v4.png`.
- Quellen-SHA256, vor und nach der Bearbeitung unverändert: `b62d7d18bafe9623a1d7f7d806f7b5b7aa9e52d6308699f3bc3c423f24c6479d`.
- Aktive Zuordnung überprüft in `lib/portrait-images.ts`, Schlüssel `aguja`; URL-Abfrageparameter nicht Teil des Dateipfads.
- Direkte Pixelquelle des Vorschlags: `outputs/proposals/aguja-work/generated-02.png`, SHA256 `99a14336439cb71f01f58045590e543b30831385e26b3baf7c5602ded309d9a7`. Das alte Porträt wurde nicht als Ausgangsbild des finalen Entwurfs verwendet.
- Vergleich: `outputs/proposals/aguja-check.png`, SHA256 `525183ff6da9c90ac56232743231d9966f4c75db72f693edbb39d8bc1dc048c4`. Quellen sind das unveränderte Original (SHA oben) und der finale Vorschlag (SHA oben). Obere Reihe bisher, untere Reihe Vorschlag; je Hell, Dunkel, Petrol, zusätzlich 48 / 64 / 160 px.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png` – ausschließlich Komposition, optische Kopfgröße, Augenhöhe; SHA256 `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png` – ausschließlich Rendering und natürlicher Federabschluss, keine Anatomie oder Gefiederzeichnung; SHA256 `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.
- Echte Fotografie: [Holger Kirk – Aguja](https://www.holgerkirk.de/media/aguja_1.jpg), gefunden über [Exotische Greife](https://www.holgerkirk.de/voegel/exotische-greife.html). Im Browser visuell geprüft: flach anliegende Kronenfedern, breite niedrige Stirn, kompakter Hakenschnabel, natürliche Wangenfedern. Nur Anatomie/Federwuchs; fotografiertes Individuum nicht als Vorgabe für die gewünschte dunkelbraune Iris verwendet. Der Download wurde vom Browser abgelehnt; keine lokale Fotokopie und kein lokaler Foto-SHA verfügbar. Kein Umgehungsversuch nach der Ablehnung.
- `outputs/proposals/aguja-work/reference-check.png`: Habicht / Vorschlag / Gerfalke bei identischer Leinwandgröße zum direkten Größen- und Ausschnittvergleich.

## Generierungen

Built-in `image_gen`, zwei Generierungen von maximal vier; kein CLI/API-Fallback.

1. `outputs/proposals/aguja-work/generated-01.png`, SHA256 `a993814ef24e40171f98318429f339b9f54a8ee66359a873990ddb80ffb1dd09`. Werkzeugablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a82d-71f0-9318-8a29b3785b4e/exec-d7d5647b-31f2-4da2-8b6b-3e3c30f78d51.png`. Eingabebilder Habicht, Gerfalke in dieser Reihenfolge. Exakter Prompt: `aguja-work/prompt-01.txt`. Verworfen wegen zu regelmäßiger, harter Federformen und zu heller Iris.
2. `outputs/proposals/aguja-work/generated-02.png`, SHA256 `99a14336439cb71f01f58045590e543b30831385e26b3baf7c5602ded309d9a7`. Werkzeugablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a82d-71f0-9318-8a29b3785b4e/exec-dd07e589-f7ec-4eff-9827-2c23c823824b.png`. Vollständige neue Generierung ohne angehängte Pixelreferenzen, um die harte Federstruktur der Referenzbilder nicht erneut zu übertragen. Referenzrollen im Prompt und durch anschließenden direkten Sichtvergleich erhalten. Exakter Prompt: `aguja-work/prompt-02.txt`, vollständig unten wiedergegeben. Gewählt wegen ruhigerer, dichterer Federstruktur und dunkler Iris.

Die Werkzeugablagen wurden automatisch vom Bildwerkzeug angelegt; alle selbst angelegten Projektdateien liegen ausschließlich unter `outputs/proposals/`.

## Lokale Verarbeitung

Reproduzierbar mit `node outputs/proposals/aguja-work/process.cjs`. Python PIL war nicht verfügbar; entsprechend dem Auftrag Node mit vorhandenem sharp genutzt.

1. RGB-Rohbild 1254 × 1254 dekodiert. Hintergrund war trotz #00FF00-Prompt gemessen median RGB [5, 249, 3]; für die Entmischung den gemessenen Hintergrund verwendet.
2. Alpha über Grünüberschuss berechnet: `excess = G - max(R,B)`, `alpha = clamp(1 - excess / (bgG - max(bgR,bgB)))`. Bei Überschuss unter 10 vollständig deckend, unter 0,045 Alpha vollständig transparent.
3. Größte zusammenhängende Vordergrundkomponente ab Alpha 0,15 bestimmt; 5 × 5 Nachbarschaft erhält feine Federspitzen. Nur isoliertes Maskenrauschen außerhalb dieser Nachbarschaft entfernt.
4. RGB per Hintergrund-Entmischung zurückgerechnet: `(RGB - (1-alpha)*background)/alpha`. Verbleibenden Grünüberschuss in teiltransparenten Randpixeln begrenzt, Alpha dabei nicht beschnitten. Kein Weiß-/Grau-Key und keine pauschale Entfernung heller Federn.
5. Freigestelltes Zwischenbild `aguja-work/cutout-native.png` gespeichert. Anschließend den gesamten Vogel samt Leinwand gleichmäßig von 1254 auf 1179 px skaliert, ohne lokale Verformung. Auf transparenter 1254er-Leinwand bei x=6, y=15 platziert. So liegt die Augenmitte etwa bei 32 % und der untere Federabschluss bei 87,5 %. Kein separates Stauchen/Dehnen des Halses.
6. Vergleichsblatt und drei vollständige 1254er-Prüfansichten aus dem finalen RGBA-Bild zusammengesetzt.

## Prüfung

- Finale Ausgabe: 1254 × 1254, echter RGBA-Alpha-Kanal; 960.609 vollständig transparente, 24.130 teiltransparente und 587.777 deckende Pixel. Keine eingebrannte Schachbrettstruktur.
- Alpha-Begrenzung einschließlich feiner Randpixel: x=179…1079, y=182…1097. Alle Ränder liegen deutlich über dem Mindestabstand von 8 %. Schnabel und Kopffedern vollständig.
- Visuell geprüft in nativer Auflösung auf #e8e8e4, #22282a und #2d7f7a, einschließlich Schnabelspitze, Stirn, hinterer Kopfkontur und unterem Federabschluss. Keine sichtbaren Löcher, breiten Farbsäume, weißen Halos oder abgeschnittenen Federn. Helle Federn am Halsabschluss bleiben erhalten.
- Anzeigegrößen 48 und 64 px aus `app/species-row.css` gelesen und auf allen drei Hintergründen geprüft, zusätzlich 160 px im Vergleichsblatt. Natürlichere ruhige Kronen-/Wangenstruktur und dunkle Iris bleiben erkennbar.
- Kopfgröße, Augenhöhe und Halsanteil separat im direkten Habicht-/Gerfalke-Vergleich geprüft. Der neue Ausschnitt hat mehr Rand als das alte vergrößerte Aguja-Bild, folgt aber dem verbindlichen Porträtraster.
- Linksgerichtetes leichtes Dreiviertelporträt, geschlossener Schnabel, kurze Halsdarstellung ohne Schultern. Artspezifische schiefergraue Färbung, gelbe Wachshaut, dunkler Hakenschnabel und dunkelbraune Iris vorhanden.
- Technische und visuelle Vorschlagsprüfung bestanden; stilistische Endfreigabe bleibt beim Nutzer. Keine Produktintegration und kein tatsächlicher UI-Austausch vorgenommen.
- `alpha-check.json` enthält Messwerte; `sha256.json` enthält SHA256 aller Bild-, Prompt- und Prüfartefakte. Die Pflichtblöcke 1–3 wurden automatisiert wortgleich und in richtiger Reihenfolge in beiden gespeicherten Prompts verifiziert.

## Exakter finaler Prompt (Generierung 2)

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

Species: Black-chested Buzzard-Eagle (Geranoaetus melanoleucus), adult.
Identity: dark slate-grey head with fine compact, flat-lying crown feathers;
dark chocolate-brown iris with a subdued small catchlight, not orange or amber;
yellow cere; modest dark hooked bill with the full tip visible; slightly paler
finely streaked throat; broad low forehead with a shallow brow. Anatomy from real photographs of this species only.

Task: NEW PORTRAIT, full replacement. The rejected portrait looks AI-generated
with bizarre engraved, stiff feathers. This replacement must have the authentic
soft texture and subtle irregularity of an actual wildlife photograph. Treat the
fixed photographic style block literally. Fine feathers merge into soft natural
surfaces; individual feather shafts must NOT all be separately outlined. Larger
cheek and neck feather groups lie flat and overlap irregularly, never radiating
as identical sharp blades or roof tiles. Keep a short compact neck without body
or shoulders. The eye is dark chocolate-brown, with a small natural catchlight,
not an exaggerated shiny spherical amber marble. Real species photograph inspected:
Holger Kirk, https://www.holgerkirk.de/media/aguja_1.jpg, used only for the broad
low forehead, compact crown feather texture and modest hooked bill anatomy.
Reference roles: public/birds/portrait-habicht-20260912.png only composition and
optical head size; public/birds/portrait-gerfalke-20260913-v2.png only naturally
irregular lower feather-tip termination. Neither reference supplies anatomy,
plumage pattern, exaggerated feather outlines, or engraving-like texture.
Follow the numeric composition grid exactly; eye centre 32% down, end of short
neck 87% down, all contours at least 8% from canvas edge. Generate one image.
```
