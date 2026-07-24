# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the marketing website for **Lumen Security**, a Belgian security company (camera surveillance, fire safety, monitoring — B2B and residential). Domain will be `lumensecurity.be`. The site is built **locally** and is **not yet public**: the Belgian sector license (FOD Binnenlandse Zaken) is still pending, so every page shows a temporary "ontwerp-preview" (design preview) banner. Do not remove that banner or treat the site as ready to publish.

The working language of the project (content, code comments, commit messages) is **Dutch**. Keep new comments and commit messages in Dutch to stay consistent with the existing codebase.

For full project history/context and the reasoning behind design decisions, read **`OVERDRACHT.md`** (project handover notes, kept up to date with each major decision) and **`VERSIES.md`** (branch map + git cheat sheet) before making non-trivial changes.

## No build system — plain static site

There is no `package.json`, bundler, linter, or test suite. It's hand-written HTML/CSS/JS served as static files.

- **Preview locally**: open the HTML files directly, or serve the repo root with any static file server (e.g. `python3 -m http.server`) so root-relative navigation and the `index.html` → `/nl/` redirect work.
- **No build/lint/test commands exist.** Don't invent npm scripts or add tooling unless explicitly asked.
- Verify changes by opening the affected page(s) in a browser and checking both light and dark theme (see below), plus the mobile breakpoint.

## Architecture

### Routing / i18n structure
- `index.html` at the repo root is a redirect stub (`<meta http-equiv="refresh">`) that sends visitors to `/nl/`.
- Content lives in per-language folders: `nl/` (built out), `fr/` and `en/` (currently empty, reserved for translation). Site nav, footer, and language switcher (`.lang-switch`) exist in the markup, but `assets/js/i18n.js` is still an empty stub — language switching is not yet wired up.
- Within `nl/`, `diensten/` (services) holds the services index plus one subpage per service (`camerabewaking.html`, `brandbeveiliging.html`, `monitoring-onderhoud.html`); other top-level pages (`over-ons.html`, `realisaties.html`, `contact.html`, `privacy-cookies.html`, `nieuws/index.html`) are currently placeholder shells pointing back to the homepage.

### CSS layering (assets/css/)
Loaded in this order on every real page — later files build on earlier ones, don't duplicate rules across files:
1. **`tokens.css`** — the single source of truth for brand colors, `@font-face` declarations, and *all* theme variables (light/dark). Fixed brand colors (do not change without discussion, see below) live under `:root`. Everything else that should differ between day and night is a CSS custom property here, mirrored between a default (`:root`) block, a `prefers-color-scheme: dark` block, and a `:root[data-theme="dark"]` override block. **Never hardcode a color that should be theme-aware — add/reuse a token instead.**
2. **`base.css`** — reset, typography, `.container`, `.btn` variants, shared micro-animations (e.g. `.lumen-pulse`), reduced-motion handling.
3. **`layout.css`** — header/nav, theme toggle button, trustbar, footer. Shared across all pages.
4. **`home.css`** — homepage-only hero and section styles (not loaded on placeholder pages).

### Day/night theme system
The whole site shares **one template** for both themes — never write separate light/dark markup or duplicate a component's CSS block; instead branch on the CSS custom properties from `tokens.css`.
- Theme is applied via `data-theme="dark"|"light"` on `<html>`, toggled by `.theme-toggle` in `assets/js/main.js`, persisted to `localStorage` under the key `lumen-theme`, and falls back to `prefers-color-scheme` when no explicit choice has been made.
- An inline script in `<head>` (see `nl/index.html`) reads `localStorage` and sets `data-theme` before first paint to avoid a flash of the wrong theme.
- The "Waarom Lumen" (Why Lumen) panel deliberately inverts: dark navy panel in day mode, light panel in night mode — this is intentional mirroring, not a bug.

### Homepage hero (nl/index.html + main.js)
The hero has two mutually-exclusive visuals sharing one layout, both tracking the mouse:
- **Day**: a static inline SVG lighthouse (`.hero-visual`). Its light beam (`.lumen-beam`) rotates toward the cursor around a fixed pivot point (`.lumen-lens-point`), animated in `initHeroBeam()`.
- **Night**: a `<canvas id="heroScene">` cinematic scene (`initHeroScene()`) — animated beam, floating light particles, pulsing beacon dot — drawn every frame by reading the current theme's `--scene-*` custom properties, so it repaints correctly on theme switch via the `themechange` custom event.
- Small nav/footer logos only pulse gently (`.lumen-pulse`) and never mouse-track; that interaction is exclusive to the large hero visual.

## Brand conventions (do not change without discussion)

- **Fixed brand colors**, constant regardless of theme: Navy `#0E2A47`, Accent red `#C0392B`, Deep red `#8B1A1A` (shadow/gradient use only, never plain text/fill), Silver `#B9BCBE`, Steel gray `#9BA0A3`, Day background `#F7F6F3`.
- **Fonts**: Space Grotesk (headings) + Inter (body), self-hosted as `.woff2` in `assets/fonts/`. No Google Fonts or other external font/asset CDNs — this is a deliberate privacy/GDPR choice for the eventual live site.
- **Logo**: stacked lighthouse with a camera lens as the lantern, a Japanese-style roof with a red beacon dot, and a broad downward red→silver light beam. Rebuilt as inline SVG (nav-size + large hero-size variants live inline in the HTML; standalone files are in `assets/img/logo/` and `5SVGs/`); the original logo lockup photo is `assets/img/logo/lumen-logo-lockup.jpg`.

## Working style expected on this project

The repo owner is **not a developer** — explain jargon, don't assume familiarity with git/CSS/HTML terms.

- **One step at a time**: make a change, show the result, wait for approval before moving on to the next step.
- **For any visual choice**, present 4–6 labeled variants side by side (e.g. A/B/C…) rather than picking one — let the owner choose, then refine.
- **Never fabricate facts, projects, certificates, or clients.** Where real content is missing, use an explicit, visible placeholder (existing convention: `<em>(placeholder-tekst)</em>` inline, or an "In opbouw" page).
- **Design before copy**: current text throughout the site is placeholder by design — the visual/design direction is finalized first, and final Dutch copy (then FR/EN translations) is written together with the owner afterward. Don't polish placeholder text as if it were final.
- **Every meaningful step becomes its own named git commit**, and new directions or experiments go on their own branch rather than overwriting `main` — see `VERSIES.md` for the existing branch map and how to compare/merge/revert. `main` is always the safe, confirmed baseline.
- When a major decision changes, reflect it back into `OVERDRACHT.md` (and update its "Laatst bijgewerkt" date) so the handover doc stays accurate for the next session.
