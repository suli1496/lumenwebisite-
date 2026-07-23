# Lumen Security — projectoverdracht (geheugen voor een andere chat)

> Plak dit bericht in de andere chat als startcontext, of zeg: "lees
> OVERDRACHT.md en VERSIES.md in deze map." Alle code staat op GitHub
> (zie §9); dit document vat de beslissingen en afspraken samen.
> Laatst bijgewerkt: 2026-07-23.

---

## 1. Wat we bouwen
De website voor **Lumen Security**, een Belgisch beveiligingsbedrijf
(camerabeveiliging, brandbeveiliging, monitoring — B2B én residentieel).
- Domein: **lumensecurity.be**
- Werktaal: **Nederlands** (site meertalig: NL standaard, FR + EN via taalkeuze)
- We bouwen **lokaal**; de site gaat **nog niet online**.

## 2. Vaste merkregels (niet wijzigen zonder overleg)
**Kleuren (merkkleuren — vast, ongeacht dag/nacht-thema)**
| Naam | Hex | Gebruik |
|---|---|---|
| Navy | `#0E2A47` | hoofdkleur: titels, dag-tekst, dag-header/footer |
| Accentrood | `#C0392B` | knoppen, links, beacon-dot, lichtbundel-bron |
| Donkerrood | `#8B1A1A` | **alleen** schaduw/gradiënt (lichtbundel) |
| Zilver | `#B9BCBE` | lichte lijnen, subtiele accenten |
| Staalgrijs | `#9BA0A3` | secundaire tekst |
| Achtergrond (dag) | `#F7F6F3` | paginagrond in dagmodus |

**Fonts:** Space Grotesk (titels), Inter (lopende tekst) — **lokaal** opgeslagen in
`assets/fonts/` (geen Google Fonts, om privacy/GDPR-redenen).

**Logo:** gestapte vuurtoren met cameralens als lantaarn, Japanse hoed met rode
beacon-dot, brede neerwaartse lichtbundel rood→zilver. Als **inline SVG**
nagebouwd (nav-versie + grote hero-versie) én de originele logo-lockup-foto
staat in `assets/img/logo/lumen-logo-lockup.jpg`.

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
5. Teksten zijn **nog niet definitief**; huidige teksten zijn placeholder.
   **Belangrijk (nieuw):** eerst het ontwerp/design volledig laten kloppen,
   pas daarna samen de definitieve teksten schrijven.
6. Elke belangrijke stap wordt vastgelegd als een **benoemde git-commit**, en
   nieuwe richtingen/experimenten gaan op een **eigen branch** (tak), zodat
   alles terugvindbaar en terug te draaien is. Zie §9 en `VERSIES.md`.

## 5. Compliance
Site **nog niet publiceren**: de sectorvergunning (FOD Binnenlandse Zaken) is nog
niet rond. Bovenaan elke pagina staat een tijdelijke "ontwerp-preview"-melding.

## 6. Genomen beslissingen (actueel)
- **Basisontwerp:** variant A (split: tekst links, vuurtoren rechts).
- **Homepage-hero = dag/nacht, zelfde sjabloon, gespiegeld:**
  - **Dagmodus:** licht, rustig, de scherpe **SVG-vuurtoren** rechts; de
    lichtbundel volgt de muis (rotatie rond een vast lenspunt).
  - **Nachtmodus:** dezelfde split-lay-out, maar met een **cinematische
    canvas-scène** (bewegende lichtbundel die de muis volgt, lichtdeeltjes,
    pulserende beacon-dot) i.p.v. de statische SVG.
  - Een **dag/nacht-schakelaar** (zon/maan-icoon) rechts in de nav; keuze
    wordt onthouden (`localStorage`), valt anders terug op de systeeminstelling.
  - Alle kleuren lopen via **CSS-tokens** in `assets/css/tokens.css`
    (`--bg`, `--ink`, `--panel-bg`, `--scene-top`, enz.) zodat dag/nacht
    één en dezelfde sjabloon delen — nooit losse dubbele CSS.
  - Het "Waarom Lumen"-blok **spiegelt mee**: donker navy-blok in dagmodus,
    licht blok in nachtmodus.
- **Kleine logo's (nav/footer):** knipperende cameralens (`.lumen-pulse`),
  bewegen zelf niet mee met de muis — dat effect zit alleen in de grote hero.
- **Meetellende cijfers** in het "Waarom Lumen"-blok (tellen op zodra
  zichtbaar in beeld) — placeholder-waarden.
- **Fonts:** lokaal zelf-gehost, `.woff2` in `assets/fonts/`.
- Twee **niet-gekozen** experimenten blijven bewaard op aparte branches (zie
  §9): een gecentreerde hero met de echte logo-foto, en 6 hero-varianten A–F.

## 7. Bestandsstructuur (wat er staat, op branch `main`)
```
index.html                 → doorverwijzing naar /nl/
assets/
  css/ tokens.css          → merkkleuren + dag/nacht-thema-tokens + @font-face
       base.css            → reset, typografie, knoppen (thema-bewust)
       layout.css          → header/nav, dag/nacht-schakelaar, footer
       home.css            → hero (dag=SVG / nacht=canvas) + secties
  js/  main.js             → mobiel menu, thema-schakelaar, canvas-vuurtoren,
                              muis-volgende SVG-bundel, meetellende cijfers
       i18n.js             → taalkeuze (nog leeg)
  fonts/ space-grotesk.woff2, inter.woff2
  img/logo/ lumen-logo-lockup.jpg + schone SVG-varianten
nl/  index.html            → HOMEPAGE (dag/nacht af, in review)
     diensten/ (index + 3 subpagina's)  → placeholders
     over-ons / realisaties / nieuws / contact / privacy-cookies → placeholders
fr/  en/                   → leeg, klaar voor vertaling
design/ hero-mixen-referentie.html, donkere-modus-hero.html, README
.claude/skills/logo-designer/  → herbruikbare skill om logo's te ontwerpen
VERSIES.md                 → overzicht van alle branches + terugkeer-spiekbrief
```

## 8. Status: klaar vs. placeholder
- **Klaar & getest:** homepage `nl/index.html` — nav met dag/nacht-schakelaar,
  hero (dag=SVG-vuurtoren / nacht=cinematische canvas, beide muis-volgend),
  diensten, waarom (met meetel-cijfers), oproep, footer. Geen console-fouten.
- **Placeholder:** alle teksten (bewust — design komt eerst); de overige
  pagina's; contactgegevens; het offerteformulier.

## 9. Waar staat de code
- Repo: **suli1496/lumenwebisite-** (momenteel publiek — na gebruik terugzetten
  op privé via GitHub → Settings → Danger Zone → Change visibility)
- **Branch `main`** = het bevestigde, actuele model. Begin hier.
- Overige branches (experimenten / tussenstappen, zie ook `VERSIES.md`):
  - `feature/logo-in-hero` — niet-gekozen: gecentreerde hero met de echte
    logo-foto in plaats van de SVG-vuurtoren.
  - `design/hero-varianten-foto` — 6 gelabelde hero-varianten (A–F) met de
    echte logo-foto, in `design/hero-varianten.html`.
  - `showcase/creatief-vrij` — vrije creatieve demo (`design/showcase-creatief.html`)
    met de cinematische canvas-vuurtoren en 6 micro-interacties; de bron
    waaruit de huidige nachtmodus is overgenomen.
  - `feature/dag-nacht-modus`, `feature/dag-A-nacht-cinematisch` — tussenstappen
    die tot het huidige `main`-model hebben geleid (al samengevoegd in `main`).
- **Om verder te werken in een nieuwe chat/computer:**
  ```
  git clone https://github.com/suli1496/lumenwebisite-.git
  cd lumenwebisite-
  git checkout main
  ```
  Zeg daarna tegen Claude: *"Lees OVERDRACHT.md en VERSIES.md, dat is de
  volledige context van dit project."*

## 10. Volgende stappen (nog te doen)
- [ ] Beslissen of/hoe de niet-gekozen branches nog gebruikt worden
      (logo-foto-hero, hero-varianten A–F) of gearchiveerd mogen worden.
- [ ] Eventueel de dag/nacht-overgang nog verder verfijnen (bv. bundel-intensiteit,
      overgangssnelheid) — wachten op akkoord van de eigenaar.
- [ ] Overige pagina's bouwen (Diensten-subpagina's, Contact + offerteformulier,
      Over ons, Realisaties, Nieuws, Privacy/cookies) — **design eerst**, dan pas
      definitieve teksten.
- [ ] Definitieve teksten samen schrijven (NL), daarna FR + EN vertalen.
- [ ] Taalkeuze (`i18n.js`) werkend maken.
- [ ] Favicon + metagegevens (Open Graph) per pagina.
