# Lumen Security — projectoverdracht (geheugen voor een andere chat)

> Plak dit bericht in de andere chat als startcontext. Alle code staat in de
> git-branch (zie §9); dit document vat de beslissingen en afspraken samen.
> Laatst bijgewerkt: 2026-07-22.

---

## 1. Wat we bouwen
De website voor **Lumen Security**, een Belgisch beveiligingsbedrijf
(camerabeveiliging, brandbeveiliging, monitoring — B2B én residentieel).
- Domein: **lumensecurity.be**
- Werktaal: **Nederlands** (site meertalig: NL standaard, FR + EN via taalkeuze)
- We bouwen **lokaal**; de site gaat **nog niet online**.

## 2. Vaste merkregels (niet wijzigen zonder overleg)
**Kleuren**
| Naam | Hex | Gebruik |
|---|---|---|
| Navy | `#0E2A47` | hoofdkleur: titels, header, footer, tekst |
| Accentrood | `#C0392B` | knoppen, links, beacon-dot |
| Donkerrood | `#8B1A1A` | **alleen** schaduw/gradiënt (lichtbundel) |
| Zilver | `#B9BCBE` | lichte lijnen, subtiele accenten |
| Staalgrijs | `#9BA0A3` | secundaire tekst |
| Achtergrond | `#F7F6F3` | paginagrond (gebroken wit) |

**Fonts:** Space Grotesk (titels), Inter (lopende tekst) — **lokaal** opgeslagen in
`assets/fonts/` (geen Google Fonts, om privacy/GDPR-redenen).

**Logo:** gestapte vuurtoren met cameralens als lantaarn, Japanse hoed met rode
beacon-dot, brede neerwaartse lichtbundel rood→zilver. Als **inline SVG**
nagebouwd (nav-versie + grote hero-versie met lichtbundel-gradiënt) én de
originele logo-lockup staat in `assets/img/logo/lumen-logo-lockup.jpg`.

## 3. Sitestructuur
Home / Diensten (subpagina's: Camerabewaking, Brandbeveiliging, Monitoring &
Onderhoud) / Over ons / Realisaties / Nieuws-blog / Contact met offerteformulier
/ Privacy- en cookiebeleid. Talen in aparte mappen: `nl/`, `fr/`, `en/`.

## 4. Werkwijze (belangrijk — zo werkt de eigenaar graag)
1. **Eén stap per keer**; toon het resultaat en wacht op goedkeuring.
2. Bij elke **visuele keuze**: toon **4–6 gelabelde varianten** naast elkaar,
   zodat er een letter/nummer gekozen kan worden. Pas daarna losse aanpassingen.
3. **Leg jargon uit** — de eigenaar is geen developer.
4. **Verzin nooit** feiten, projecten, certificaten of klanten. Gebruik
   placeholders waar echte inhoud ontbreekt.
5. Teksten zijn **nog niet definitief**; huidige teksten zijn placeholder,
   worden later samen herschreven.

## 5. Compliance
Site **nog niet publiceren**: de sectorvergunning (FOD Binnenlandse Zaken) is nog
niet rond. Bovenaan elke pagina staat een tijdelijke "ontwerp-preview"-melding.

## 6. Genomen beslissingen
- **Basisontwerp:** "variant B" (licht, zakelijk, logo rechts in de hero,
  vertrouwensbalk onderaan) → uitgewerkt tot een complete "goede variant"
  (nav met logo links, hero met SVG-vuurtoren, diensten/waarom/footer).
- **Homepage-hero:** **MIX 1** (goede variant × variant F) = foto-achtergrond +
  SVG-vuurtoren met lichtbundel + vertrouwensbalk.
- **Hero-sluier:** **behandeling B** gekozen (sterkere sluier links voor
  leesbaarheid). Fijn af te regelen zodra de echte hero-foto er is.
- **Dag/nacht-thema:** volledige lichte + donkere modus met **wissel-knop**
  (onthoudt keuze via localStorage, volgt ook het systeemthema). Gespiegelde
  tokens in `tokens.css`. Afgestemd op de referentie-artifact uit de 2e chat.
- **Interactieve hero:** DAG = MIX 1 (foto + sluier B) met SVG-vuurtoren waarvan
  de **lichtbundel de muis volgt**; NACHT = cinematische **canvas-vuurtoren**
  (bundel volgt de muis + lichtdeeltjes). Kleine logo's **knipperen** zachtjes.
- **Donkere modus:** live (zie boven). `design/donkere-modus-hero.html` (MIX 4)
  blijft als alternatief bewaard.
- **Fonts:** lokaal zelf-gehost (uit de goede variant geëxtraheerd).

## 7. Bestandsstructuur (wat er staat)
```
index.html                 → doorverwijzing naar /nl/
assets/
  css/ tokens.css          → merkkleuren + @font-face (fonts)
       base.css            → reset, typografie, knoppen
       layout.css          → header/nav, trustbar, footer
       home.css            → hero (MIX 1 + behandeling B) + secties
  js/  main.js             → mobiel menu
       i18n.js             → taalkeuze (nog leeg)
  fonts/ space-grotesk.woff2, inter.woff2
  img/logo/ lumen-logo-lockup.jpg
nl/  index.html            → HOMEPAGE (af, in review)
     diensten/ (index + 3 subpagina's)  → placeholders
     over-ons / realisaties / nieuws / contact / privacy-cookies → placeholders
fr/  en/                   → leeg, klaar voor vertaling
design/ hero-mixen-referentie.html + README  → o.a. MIX 4 (dark-template)
```

## 8. Status: klaar vs. placeholder
- **Klaar & getest (desktop + mobiel):** homepage `nl/index.html` — nav, hero
  (MIX 1 + behandeling B), diensten, waarom, oproep, footer. Merkkleuren + eigen
  fonts. Geen console-fouten, geen horizontale overloop.
- **Placeholder:** alle teksten; de hero-foto (nu een arcering-vlak); de overige
  pagina's; contactgegevens; het offerteformulier.

## 9. Waar staat de code
- Repo: **suli1496/lumenwebisite-**
- Branch: **`claude/logo-designer-skill-plugin-ncdac1`**  ← alle commits staan hier
- In de andere chat: haal deze branch op (`git fetch` + `git checkout`) om
  meteen met dezelfde bestanden verder te werken.

## 10. Volgende stappen (nog te doen)
- [ ] Echte hero-foto inzetten + sluier exact bijregelen op dat beeld.
- [ ] Overige pagina's bouwen (Diensten-subpagina's, Contact + offerteformulier,
      Over ons, Realisaties, Nieuws, Privacy/cookies).
- [ ] Definitieve teksten samen schrijven (NL), daarna FR + EN vertalen.
- [ ] Taalkeuze (`i18n.js`) werkend maken.
- [x] Dag/nacht-thema + interactieve hero (muis-bundel, canvas-nacht, knipperlens).
- [ ] Favicon + metagegevens (Open Graph) per pagina.
