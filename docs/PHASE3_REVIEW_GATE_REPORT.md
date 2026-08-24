# OTATU Phase 3 — Media Remediation + Try-On Before/After Report

**Status:** BLOCKED ON MEDIA ASSETS  
**Branch:** `phase3/first-launch-and-tryon-mvp`  
**Base HEAD:** `44d7c22`  
**Date:** 2026-08-24

---

## Media remediation

### Arm (`/ru/body/arm/`)

- **Before problem:** weak small-symbol hero did not clearly communicate arm intent.
- **Replacement:** hero switched to `design-06` (snake + floral blackwork wrapping arm).
- **Source:** Pexels (Ralph Rabago), documented in `docs/IMAGE_SOURCES.md`.
- **Remaining gap:** still needs more arm diversity photos (upper arm + medium/large).

### Minimalism (`/ru/style/minimalism/`)

- **Before problem:** minimalism gallery mixed with non-minimal heavy motifs.
- **Replacement:** fixtures rebalanced toward `hero-03`, `hero-01`, `coll-meaning`,
  `design-04`, and non-minimal wolf entries were removed from minimal buckets.
- **Source:** existing Pexels assets and existing OTATU assets.
- **Remaining gap:** no additional dedicated tiny-botanical/minimal lettering photos.

### Small Tattoos (`/ru/small-tattoos/`)

- **Before problem:** `coll-small` looked like low-quality doodles.
- **Replacement:** cover switched from `coll-small` to `hero-01` and small-category
  fixtures now prefer clean fine-line / minimal symbols.
- **Source:** existing Pexels assets.
- **Remaining gap:** needs 2–3 additional quality small tattoo photos.

### Snake (`/ru/tattoo/snake/`)

- **Before problem:** snake intent could be interpreted as mixed/weak.
- **Replacement:** snake page now explicitly centers `design-06` with snake-specific
  captions and removes misleading non-snake visuals.
- **Source:** existing Pexels asset `design-06`.
- **Remaining gap:** only one strong snake photo available; needs additional snake photos.

### Rose (`/ru/tattoo/rose/`)

- **Before problem:** page did not clearly show rose motif.
- **Replacement:** removed misleading assets/captions and switched to honest floral
  context placeholders (`hero-01`, `hero-03`, `coll-meaning`) without claiming roses.
- **Source:** existing Pexels assets.
- **Remaining gap:** **ROSE MEDIA GAP** remains critical (no true rose photos available).

---

## Try-On assets

| Design | Transparent | TRYON READY |
|---|---|---|
| wolf-minimal | no | no |
| wolf-geometric | no | no |
| anchor-minimal | no | no |
| compass-geometric | no | no |
| bird-linework | no | no |

Result: picker now surfaces transparent-asset gap state and keeps custom upload flow.
Detailed requirements are documented in `docs/MEDIA_GAPS.md`.

---

## Before / After

- **Desktop:** implemented two-panel comparison (`До` and `После`) with same source photo.
- **Mobile (390):** implemented segmented toggle (`До | После`) with no overflow.
- **Live state:** `После` reflects current editor transform state (position, scale,
  rotation, opacity, blend).
- **Lifecycle:**
  - reset updates `После`,
  - tattoo changes update `После`,
  - start-over clears comparison state.
- **Export:** unchanged, still exports only `После`.
- **Privacy:** browser-only flow preserved (no photo upload endpoints).

---

## Media gaps

See `docs/MEDIA_GAPS.md`:

- dedicated rose photo set (2–3)
- snake transparent design
- rose transparent design
- wolf/bird/compass/anchor transparent designs
- additional quality small tattoo photos
- additional arm diversity photos

---

## Validation

Executed:

```text
npm run lint                 PASS
npm run build                PASS
npm run smoke                PASS
npm run test:wave-a          PASS
npm run test:tryon           PASS
npm run screenshot:validate  PASS
node scripts/phase3-review-screenshots.mjs  PASS
```

---

## Screenshots

Location: `docs/screenshots/phase3-media-remediation/`

- desktop: `arm-1440.png`, `minimalism-1440.png`, `small-tattoos-1440.png`,
  `snake-1440.png`, `rose-1440.png`, `tryon-before-after-1440.png`
- mobile: `small-tattoos-390.png`, `snake-390.png`, `rose-390.png`,
  `tryon-before-after-390.png`

---

## Git

- branch: `phase3/first-launch-and-tryon-mvp`
- current HEAD (before remediation commit): `44d7c22`
- merge: NO
- deploy: NO
