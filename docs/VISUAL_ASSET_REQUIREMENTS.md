# OTATU Visual Asset Requirements

Phase 1A visual remediation — asset list for the **original visual starter pack**.

These slots map directly to components and placeholder IDs in the codebase. Replace SVG placeholders under `public/images/placeholders/` with final assets (CDN/object storage in production).

**Total assets: 27**

---

## Home — Hero Collage

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `hero-01` | Home hero dominant | Forearm with fine-line botanical tattoo on skin | Portrait | 4:5 | 1200×1500 | Skin photo | No | Safe crop: tattoo centred, allow top/bottom trim. Dominant right-side collage slot. |
| `hero-02` | Home hero overlay (back) | Small wrist tattoo detail, close crop | Portrait | 3:4 | 900×1200 | Skin photo | No | Overlaps left of dominant. Soft focus acceptable on edges. |
| `hero-03` | Home hero overlay (front) | Minimal single-line tattoo, square crop | Square | 1:1 | 800×800 | Skin photo | No | Smallest overlap card. High contrast ink on skin. |

---

## Home — Collections

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `coll-arm` | Collection card «Тату на руке» | Full forearm sleeve or half-sleeve on arm | Landscape | 4:3 | 1600×1200 | Skin photo | No | Title overlay at bottom — keep lower third readable. |
| `coll-small` | Collection card «Маленькие тату» | Cluster of 2–3 small tattoos (wrist/ankle) | Portrait | 3:4 | 1200×1600 | Skin photo | No | Intimate close crop, editorial feel. |
| `coll-meaning` | Collection card «Тату со смыслом» | Symbolic tattoo (compass, wolf silhouette, etc.) | Square | 1:1 | 1200×1200 | Skin photo | No | Strong central subject for square crop. |

---

## Home + Catalog — Discovery Gallery (12 designs)

Mixed aspect ratios for editorial masonry. Can be **tattoo on skin** or **sketch on neutral paper**.

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `design-01` | Gallery card | Wolf portrait realism on forearm | Portrait | 4:5 | 960×1200 | Skin photo | No | Motif: wolf · realism |
| `design-02` | Gallery card (tall) | Minimal wolf line on inner wrist | Tall portrait | 2:3 | 800×1200 | Skin photo | No | Extra vertical span in grid |
| `design-03` | Gallery card (square) | Geometric wolf head, flat sketch | Square | 1:1 | 960×960 | Tattoo design | Yes optional | Works on white or transparent |
| `design-04` | Gallery card (landscape) | Fine-line rose band on ankle | Landscape | 5:4 | 1200×960 | Skin photo | No | Spans 2 cols on desktop |
| `design-05` | Gallery card | Moon dotwork on forearm | Portrait | 4:5 | 960×1200 | Skin photo | No | |
| `design-06` | Gallery card (tall) | Snake blackwork wrapping arm | Tall portrait | 2:3 | 800×1200 | Skin photo | No | |
| `design-07` | Gallery card (square) | Bird linework sketch | Square | 1:1 | 960×960 | Tattoo design | Yes optional | |
| `design-08` | Gallery card | Script lettering on forearm | Portrait | 4:5 | 960×1200 | Skin photo | No | Cyrillic or Latin script |
| `design-09` | Gallery card (landscape) | Traditional dragon segment | Landscape | 5:4 | 1200×960 | Tattoo design | No | |
| `design-10` | Gallery card (tall) | Realistic flower on thigh/leg | Tall portrait | 2:3 | 800×1200 | Skin photo | No | |
| `design-11` | Gallery card | Geometric compass on chest | Portrait | 4:5 | 960×1200 | Skin photo | No | |
| `design-12` | Gallery card (square) | Minimal anchor on wrist | Square | 1:1 | 960×960 | Skin photo | No | |

---

## Wolf Motif Page — Visual Composition

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `wolf-g01` | Motif hero composition (large) | Wolf realism on shoulder/back | Portrait | 4:5 | 1200×1500 | Skin photo | No | Left-dominant grid cell |
| `wolf-g02` | Motif hero composition (small) | Wolf profile sketch or healed tattoo detail | Portrait | 4:5 | 900×1125 | Mixed | No | Top-right cell |
| `wolf-g03` | Motif hero composition (small) | Geometric wolf or wolf+moon wide crop | Landscape | 4:3 | 1200×900 | Tattoo design | No | Bottom-right cell |

---

## Wolf Motif Page — Variations

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `wolf-moon` | Variation card | Wolf howling at moon | Portrait | 4:5 | 800×1000 | Tattoo design | Yes preferred | Sketch or healed tattoo |
| `wolf-snarl` | Variation card | Wolf snarl / aggressive profile | Portrait | 4:5 | 800×1000 | Tattoo design | Yes preferred | |
| `wolf-geo` | Variation card | Geometric/low-poly wolf | Portrait | 4:5 | 800×1000 | Tattoo design | Yes preferred | |
| `wolf-minimal` | Variation card | Single-line wolf silhouette | Portrait | 4:5 | 800×1000 | Tattoo design | Yes preferred | |

---

## Try-On Shell

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `tryon-preview` | Try-on canvas preview | Neutral forearm/shoulder skin, no tattoo | Portrait | 4:5 | 1200×1500 | Skin photo | No | Even lighting, minimal shadows. Space for overlay tattoo. |

---

## Editorial / Guides (optional for first pack)

| ID | Usage | Subject | Orientation | Ratio | Min size | Type | Transparent | Notes |
|---|---|---|---|---|---|---|---|---|
| `article-01` | Guide card | Person consulting tattoo artist / studio mood | Landscape | 16:10 | 1280×800 | Editorial photo | No | Lower priority — can stay placeholder longer |
| `article-02` | Guide card | Close-up tattoo process (needle, ink cap) | Landscape | 16:10 | 1280×800 | Editorial photo | No | |
| `article-03` | Guide card | Flat lay: symbols sheet / flash sheet | Landscape | 16:10 | 1280×800 | Editorial photo | No | |

---

## Asset production guidelines

1. **Original only** — all photos and sketches must be owned or commissioned for OTATU.
2. **Consistent tone** — warm skin tones, soft natural light, no heavy filters.
3. **No text in images** — UI provides all copy.
4. **File format** — WebP or AVIF for production; keep `MediaAsset.width/height` accurate.
5. **Naming** — match IDs above (e.g. `hero-01.webp`) for drop-in replacement.
6. **Storage** — Phase 2: upload to object storage; update `MediaAsset.src` / `storageKey` in fixtures.

---

## Component → asset mapping

| Component | Asset IDs |
|---|---|
| `HeroCollage` | hero-01, hero-02, hero-03 |
| `CollectionGrid` | coll-arm, coll-small, coll-meaning |
| `TattooGallery` / `TattooCard` | design-01 … design-12 |
| `VisualComposition` (wolf) | wolf-g01, wolf-g02, wolf-g03 |
| Wolf variations grid | wolf-moon, wolf-snarl, wolf-geo, wolf-minimal |
| Try-on preview | tryon-preview |
| `EditorialCard` | article-01 … article-03 |

---

*Generated during Phase 1A visual remediation. Update when new pages or layouts are added.*
