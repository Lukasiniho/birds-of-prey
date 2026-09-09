# Adler-Ergänzungen vom 9. September 2026

Vier Arten sind über dieselben Datenpfade wie der bestehende Katalog integriert:
Habichtsadler (Aquila fasciata), Iberienadler (Aquila adalberti), Klippenadler
(Aquila verreauxii), Zwergadler (Hieraaetus pennatus). Der Katalog enthält 39 Arten.

Jede Art hat adulte und juvenile Flugillustrationen, Porträt, Jagdszene,
Farbpaletten einschließlich Augen und Zehen, Maße, Nahrung und Beutebeispiele,
Jagdtechniken, illustrierte Lebensräume, Artprofil, fünf kompakte Fakten,
Quizmerkmale, eine Rufaufnahme und eine Verbreitungskarte. Zwergadler erhalten
helle und dunkle adulte und juvenile Varianten. Die normalen adulten Bilder
sind die direkte Vorlage aller Flugvarianten derselben Art.

## Quellen

- [SEO/BirdLife: Habichtsadler](https://seo.org/ave/aguila-perdicera/)
- [Französische Umweltbehörde: Habichtsadler-Maße](https://www.auvergne-rhone-alpes.developpement-durable.gouv.fr/l-aigle-de-bonelli-en-bref-a21682.html)
- [CSIC: Habichtsadler-Verbreitung](https://www.vertebradosibericos.org/aves/distribucion/aqufasdi.html)
- [SEO/BirdLife: Iberienadler](https://seo.org/ave/aguila-imperial-iberica/)
- [CMS: globaler Iberienadler-Status](https://www.cms.int/species/aquila-adalberti)
- [SANBI: Klippenadler](https://www.sanbi.org/animal-of-the-week/verreauxs-eagle/)
- [BirdLife South Africa: regionale und globale Kategorien](https://www.birdlife.org.za/red-data-book/red-list/verreauxs-eagle/)
- [SEO/BirdLife: Zwergadler](https://seo.org/ave/aguila-calzada/)
- [CSIC: Zwergadler-Farbformen und Maße](https://www.vertebradosibericos.org/aves/identificacion/hiepenid.html)
- [MME: Zwergadler-Gewichte und globaler Status](https://mme.hu/en/magyarorszagmadarai/madaradatbazis-hiepen)
- [DAK: seltene Vogelarten in Deutschland](https://www.dda-web.de/downloads/publications/statusreports/svid_2021_seltenheitenbericht.pdf)

Lebensdauer und Gelege sind zusätzlich feldbezogen in `lib/species-facts.ts`
belegt. Die Größenklassen folgen dem bestehenden Gewichtsschema, nicht der
Spannweite. Die beiden Zwergadler-Morphen sind keine getrennten Arten.

## Medien und Nutzungsrechte

`data/audio/sources.json` enthält Originalquellen, Autor, Lizenz, gewählten
Zeitraum, Bearbeitung, Dauer und SHA-256 für alle vier echten Rufaufnahmen.
Habichtsadler, Klippenadler und Zwergadler: Tierstimmenarchiv / Museum für
Naturkunde Berlin, CC BY-SA 3.0 DE. Iberienadler: João Tomás, XC973524,
CC BY-NC-SA 4.0 (nur nichtkommerzielle Nutzung). Die Lizenz wird am Player
angezeigt. Die Ausschnitte sind 7–8,45 Sekunden lang; Geschwindigkeit und
Tonhöhe bleiben unverändert.

Kartenquellen und geometrische Prüfungen: `data/ranges/README.md`. Karten sind
historische, generalisierte Referenzillustrationen mit jeweils ausgewiesenem
Quellenstand. Bilder sind mit dem eingebauten Imagegen-Werkzeug erzeugte
Illustrationen; die Prompts werden neben dieser Dokumentation gespeichert.

Die technische Transparenzkorrektur wurde ausdrücklich genehmigt.
`scripts/restore-eagle-alpha.py` übernimmt den Alpha-Kanal des jeweiligen
adulten Bildes unverändert. Eingebrannte Hintergründe werden mit GrabCut
entfernt; bei kleinen Abweichungen an der Kontur werden nahe innere
Gefiederfarben bis zur gemeinsamen Silhouette fortgesetzt. Benötigt NumPy,
OpenCV und SciPy nur zur Bildaufbereitung, nicht im Betrieb oder Build.
