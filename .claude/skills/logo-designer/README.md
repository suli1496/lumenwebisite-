# logo-designer skill

Vendored from the [`neonwatty/logo-designer-skill`](https://github.com/neonwatty/logo-designer-skill)
Claude Code plugin (v1.0.0, MIT licensed, by Jeremy Watt).

This skill lets Claude Code design and iterate on logos using SVG — running a
structured interview, exploring concepts, refining a direction, and exporting
PNGs at standard sizes. It is auto-discovered by any Claude Code session in this
repo via `.claude/skills/`.

- `SKILL.md` — the skill instructions
- `scripts/export.sh` — SVG → PNG export helper (resvg / Inkscape / librsvg)
- `LICENSE` — upstream MIT license

To update, re-vendor from the upstream repo's `skills/logo-designer/` directory.
