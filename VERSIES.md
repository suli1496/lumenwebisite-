# Versies & takken — Lumen Security

Dit project staat onder **versiebeheer (git)**. Elke wijziging is bewaard, met
een naam, zodat je alles kunt terugvinden en desnoods terugkeren. Je hoeft niets
te installeren om dit te lezen — dit bestand is de kaart.

Kort jargon:
- **tak (branch)** = een aparte werkversie naast de hoofdversie. De hoofdversie
  (`main`) blijft altijd veilig staan terwijl er op een tak wordt geëxperimenteerd.
- **commit** = een opgeslagen momentopname met een naam.

---

## De takken

| Tak | Wat het is | Bekijk dit bestand |
|-----|------------|--------------------|
| **`main`** | De veilige hoofdversie. De volledige homepage met de MIX 1-hero (SVG-vuurtoren die de muis volgt) + alle basisbestanden. | `nl/index.html` |
| **`feature/logo-in-hero`** | De **echte logo-foto** in een gecentreerde hero met een zachte, ademende lichtgloed erachter. | `nl/index.html` |
| **`design/hero-varianten-foto`** | **6 gelabelde hero-varianten** (A t/m F) naast elkaar, met de echte logo-foto — om een richting te kiezen. | `design/hero-varianten.html` |
| **`showcase/creatief-vrij`** | Vrije **creatieve showcase**: cinematische canvas-vuurtoren + zes micro-interacties ("trucjes"). | `design/showcase-creatief.html` |

---

## De benoemde geschiedenis op `main`

Elke stap die we deden, is een aparte opname met een naam:

1. Projectbasis: mapstructuur, merk-tokens en basis-CSS
2. Lokale lettertypes: Space Grotesk + Inter zelf-gehost
3. Logo-assets: schone inline-SVG's + originele lockup-foto
4. Interacties: mobiel menu en muis-volgende hero-lichtbundel
5. Homepage NL (MIX 1): hero met sluier, bundel-effect en knipperende cameralens
6. Placeholder-pagina's (diensten, over ons, contact, nieuws, privacy)
7. Ontwerp-referenties: donkere-modus-template en hero-mixen-overzicht
8. Logo-designer skill en overdrachtsdocument
9. Overige bronbestanden (originele logo-SVG's, projectinstellingen)

---

## Spiekbrief — bekijken, wisselen, terugkeren

> Deze commando's typ je in een terminal in de projectmap. Vraag gerust of ik
> ze voor je uitvoer; je hoeft dit niet zelf te doen.

**Alle takken zien**
```bash
git branch
```

**Naar een andere tak kijken** (bv. de logo-in-hero-versie)
```bash
git checkout feature/logo-in-hero
```

**Terug naar de veilige hoofdversie**
```bash
git checkout main
```

**De hele geschiedenis met namen zien**
```bash
git log --oneline --all --graph
```

**Een tak samenvoegen met main** (pas doen als je die richting kiest)
```bash
git checkout main
git merge feature/logo-in-hero
```

**Iets teruggedraaid krijgen** — niets gaat ooit definitief verloren; vraag me
gewoon "zet het terug naar stap X" of "ga terug naar de vorige versie", dan doe
ik het veilig voor je.
