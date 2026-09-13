# Natürlichere Porträts – 13. September 2026

Auf Nutzerwunsch wurden fünf vorhandene Porträts ersetzt. Die finale Auswahl
wurde mit dem eingebauten Imagegen-Werkzeug erzeugt und lokal freigestellt.

| Art | Finale Datei | Änderung |
| --- | --- | --- |
| Fischadler | `public/birds/portrait-fischadler-20260913-v4.png` | Kompakterer, kürzerer Halsabschluss; ruhigere Federdarstellung |
| Kronenadler | `public/birds/portrait-kronenadler-20260913-v3.png` | Neues Porträt mit natürlich weichen Federn und lockerer Haube |
| Aguja | `public/birds/portrait-aguja-20260913-v4.png` | Klarere, natürliche Details bei vergleichbarer Kopfform und Komposition |
| Schwarzmilan | `public/birds/portrait-schwarzmilan-20260913-v2.png` | Ruhigere Federlagen; Rotmilan als Darstellungsreferenz |
| Harpyie | `public/birds/portrait-harpyie-20260913-v2.png` | Neues Porträt mit weichem Gesichtsschleier und natürlicher Doppelhaube |

Der Habicht bleibt die gemeinsame Kompositionsreferenz. Der Zwergadler dient
als Referenz für die weichere Federdarstellung. Für die Neuerstellungen wurden
zusätzlich reale Fotos herangezogen: [Kronenadler beim San Diego Zoo](https://animals.sandiegozoo.org/animals/crowned-eagle)
und [Harpyie, Foto von Luismanati](https://www.flickr.com/photos/luismanati/336635138/).
Andere Arten dienten ausschließlich als Stil- und Kompositionsreferenzen.

## Freistellung und Platzierung

- Fischadler, Aguja und Schwarzmilan: individuell geführte GrabCut-Masken mit
  geschütztem Innenbereich. Nur mit dem Außenraum verbundene Schachbrettpixel
  im unsicheren Randbereich wurden als Hintergrund behandelt. Keine pauschale
  Entfernung weißer oder grauer Gefiederflächen. Randfarben wurden lokal
  bereinigt.
- Kronenadler und Harpyie: blauen Hintergrund über Farbanteile entfernt und
  teiltransparente Randfarben entmischt. Helle und graue Federn bleiben erhalten.
- Alle Bilder: quadratische Leinwand von 1254 × 1254 px, proportionale Skalierung
  und Platzierung. Keine Stauchung oder Streckung von Hals oder Kopf.

Die vollständigen finalen Prompts, Originalpfade und Prüfsummen, Referenzrollen,
Generierungspfade, Maskenmethoden und Platzierungswerte stehen in
[`manifest.json`](manifest.json). `extract.py` und `place.py` dokumentieren die
lokalen Bearbeitungsschritte; sie benötigen die dort protokollierten Eingaben.
Die fünf ersetzten Originale wurden nach der Prüfung entsprechend dem
Bereinigungswunsch aus `public` entfernt.

## Prüfung

- Alle fünf Finaldateien besitzen echtes Alpha, teilweise transparente
  Federkanten und vollständig transparente Außenränder von mindestens 50 px.
- Auf hellem, dunklem und farbigem Hintergrund sowie bei 64 px verglichen.
- Alle 39 aktuell zugeordneten Porträts sind vorhanden und besitzen Alpha.
- In der lokalen Artenleiste sind die fünf neuen Dateien zugeordnet. Die
  optimierte Porträtstufe wurde zentral von maximal 280 auf 560 px ergänzt,
  um Details bei Browser-Zoom zu erhalten. Zeilengrößen bleiben unverändert.
- `npm run build` erfolgreich. Der Design-System-Check besteht.
- Der vollständige Lint-Lauf meldet drei unabhängige Fehler in
  `output/imagegen/portrait-balance-20260913/finish.mjs` (unbenutzte Variablen
  und `prefer-const`); diese Datei gehört zu einer parallelen Bearbeitung.
# Nachkorrektur: mehr Hals beim Kronenadler

Auf Nutzerwunsch wurde das aktuelle adulte Porträt `portrait-kronenadler-20260913-v3.png` mit dem eingebauten Imagegen gezielt um einen längeren sichtbaren Halsansatz ergänzt. Kopfgröße, Haube, Blickrichtung und naturalistischer Stil bleiben vergleichbar; der Habicht dient ausschließlich als gemeinsame Kompositionsreferenz. Die übrigen Porträts wurden nicht bearbeitet.

Aktuell eingebunden: `public/birds/portrait-kronenadler-20260913-v4.png`. Exakter Prompt: [kronenadler-hals-prompt.txt](kronenadler-hals-prompt.txt). Original- und Ausgabehash, Generatorquelle und Platzierung: [kronenadler-hals.json](kronenadler-hals.json). Die lokale Freistellung entfernt das gerenderte Schachbrett mit geschütztem Vogelinneren und geschütztem Schnabel; anschließend nur proportionale Skalierung, keine Streckung der Anatomie. RGBA, 1254 × 1254, mindestens 55 Pixel transparenter Rand. Vergleich mit Original und Habicht auf hellem Hintergrund visuell geprüft.

Die Artenliste wurde nach der Einbindung im Browser visuell geprüft; `npm run images` und die RGBA-/Randprüfung waren erfolgreich. Das ersetzte v3-Porträt wurde aus `public/birds` entfernt (Sicherung unter `/tmp/portrait-natural-20260913/portrait-kronenadler-20260913-v3-vor-halskorrektur.png`).
