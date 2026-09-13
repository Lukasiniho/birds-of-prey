# Bildbereinigung vom 13. September 2026

Auf Nutzerwunsch wurden überholte Bildversionen und nicht mehr benötigte
Arbeitsbilder entfernt. Maßgeblich für die Nutzung sind die aktuellen
Bildzuordnungen und tatsächlich aufgelösten Pfade der Anwendung, einschließlich
aller vorhandenen Altersstufen, Geschlechter, Morphen, Porträts und Jagdbilder.
Erwähnungen in historischen Prüfberichten zählen nicht als aktuelle Nutzung.

Erhalten bleiben:

- sämtliche 237 Bildquellen der Anwendung einschließlich Icons und Lebensräumen;
- die zusätzliche, in `vogelbild-standard.md` festgelegte Stilreferenz
  `public/birds/habichtsadler-20260913-v2.png`;
- die 41 Kartenoriginale unter `data/ranges/reference-originals`, die als
  Quellen und Bearbeitungsgrundlagen der Verbreitungskarten benötigt werden.

Entfernt wurden insgesamt 414 Bilder (rund 371 MB), darunter alte Vogelbilder,
Generierungsergebnisse, Freistellungszwischenstände und historische
Vergleichsbögen. Die optimierten Ausgaben werden mit `npm run images` neu
abgeglichen; verwaiste WebP-Dateien entfernt dieses Skript automatisch.

Die Texte, Prompts und Prüfprotokolle in `docs` und `output` bleiben als
historische Aufzeichnungen erhalten. Darin genannte alte Bildpfade und
Vergleichsbögen sind nach dieser Bereinigung gegebenenfalls nicht mehr
vorhanden. Historische Bearbeitungs- und Prüfscripte benötigen daher ihre
damaligen Eingaben; sie gehören nicht zur aktuellen Build-Pipeline. Für neue
Bildarbeiten immer die aktuellen Quellen gemäß `vogelbild-standard.md` verwenden.
