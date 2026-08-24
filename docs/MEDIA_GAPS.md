# MEDIA GAPS — OTATU Phase 3

Assets required but not yet available in the media set.
These gaps block full visual quality on the affected pages.

Last updated: 2026-08-24

---

## Priority 1 — Rose page (`/ru/tattoo/rose/`)

**Status: ROSE MEDIA GAP — page CANNOT be visually honest without these.**

The rose motif page currently shows fine-line botanical and wrist tattoos as
visual context — there is no actual rose tattoo in the media set.

### Required assets

| File | Description |
|------|-------------|
| `images/motifs/rose-photo-01.webp` | Real fine-line rose tattoo on forearm/wrist — studio or natural light |
| `images/motifs/rose-photo-02.webp` | Real blackwork or realistic rose tattoo — different placement |
| `images/motifs/rose-photo-03.webp` | Rose + lettering or rose + botanical composition |
| `tryon/rose-transparent.webp` | OTATU rose sketch — transparent background, monochrome ink |

**Requirements for stock photos:**
- Must visibly contain a rose (not just flowers generally)
- Pexels or equivalent freely-licensed source
- Portrait orientation preferred (4:5 or 2:3)
- Tattoo clearly visible, good lighting

**Requirements for transparent design:**
- No background (transparent alpha)
- Tattoo artwork only — no skin, paper, frame, or shadow
- Monochrome / dark ink suitable for `multiply` blend mode
- Minimum 800×1200px source

---

## Priority 2 — Snake transparent design

**Status: SNAKE TRYON GAP — Try-On shows no bundled snake design.**

`design06` is a photograph of a real snake tattoo on skin — it is not suitable
for overlay because it includes the skin itself.

### Required asset

| File | Description |
|------|-------------|
| `tryon/snake-transparent.webp` | OTATU snake sketch — coiled or wrapping, transparent background |

---

## Priority 3 — Small tattoos quality photos

**Status: SMALL MEDIA GAP — current cover replaced, but gallery needs more variety.**

`coll-small` (three avant-garde doodle tattoos) was removed as cover.
Gallery currently shows fine-line botanical and geometric wrist symbol.
Need 2–3 more quality small tattoo examples.

### Required assets

| File | Description |
|------|-------------|
| `images/collections/small-01.webp` | Tiny flower (rose bud, lavender, or daisy) on wrist |
| `images/collections/small-02.webp` | Fine-line bird or botanical on forearm |
| `images/collections/small-03.webp` | Small geometric or symbolic tattoo |

---

## Priority 4 — Transparent OTATU designs for Try-On picker

**Status: TRYON PICKER GAP — current bundled designs all have rectangular backgrounds.**

The Try-On picker currently shows AI-generated wolf illustrations and
photographed tattoo-on-skin assets. None are truly transparent.

### Required assets

| File | Design | Notes |
|------|--------|-------|
| `tryon/wolf-transparent.webp` | Wolf — minimal linework | Transparent, monochrome, 800×1200+ |
| `tryon/rose-transparent.webp` | Rose — fine-line | Transparent, monochrome |
| `tryon/snake-transparent.webp` | Snake — coiled | Transparent, monochrome |
| `tryon/bird-transparent.webp` | Bird — simple linework | Transparent, monochrome |
| `tryon/compass-transparent.webp` | Compass — geometric | Transparent, monochrome |
| `tryon/anchor-transparent.webp` | Anchor — minimal | Transparent, monochrome |

**All transparent designs must:**
- Have genuine alpha transparency (not white background)
- Contain only the artwork (no skin, paper, table, frame, watermark)
- Use dark ink on transparent background
- Be suitable for CSS `multiply` blend mode overlay
- Minimum 600×900px

---

## Priority 5 — Arm page diversity

**Status: ARM MEDIA GAP — arm page shows snake+flowers only as prominent visual.**

The human reviewer asked for diversity: forearm + upper arm + fine-line +
medium/large + small. Current set leans toward one photo.

### Required assets

| File | Description |
|------|-------------|
| `images/body/arm-diversity-01.webp` | Upper arm sleeve or large tattoo — shows full arm potential |
| `images/body/arm-diversity-02.webp` | Forearm fine-line — different from existing hero01/hero03 |

---

## Notes

- Do NOT generate AI imagery as a replacement for real stock photography.
- All stock assets must be documented in `docs/IMAGE_SOURCES.md` with source URL.
- Transparent designs should be produced by a tattoo artist or designer.
- When a gap is filled, remove the corresponding entry from this file and add
  the asset to `docs/IMAGE_SOURCES.md`.
