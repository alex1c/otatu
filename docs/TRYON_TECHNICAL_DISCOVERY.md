# OTATU — Try-On Technical Discovery (Phase 2)

Status: **Proof implemented on `/ru/try-tattoo`**

---

## 1. Requirement recap

Browser-only MVP flow:

1. Upload local photo
2. Overlay bundled tattoo design (future: user PNG)
3. Drag, scale, rotate, opacity
4. Reset
5. Export composite PNG

No backend upload. No accounts. No AI blending in MVP.

---

## 2. Options evaluated

| Approach | React/Next | Bundle | Touch | Transform | Export | TS | SSR | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Native Canvas 2D** | Manual integration | ~0 KB | Custom | Manual math | `toDataURL` | ✅ | ✅ (client only) | Viable but high glue code |
| **Fabric.js v6** | Wrapper needed | ~300 KB+ | Good | Built-in | `toDataURL` | ✅ | Client only | Powerful; heavier than needed for POC |
| **Konva.js + react-konva** | First-class | ~150 KB | Good | Transformer + drag | Stage export | ✅ | **SSR incompatible** | **Selected** |
| **PixiJS** | Possible | Medium | Good | Overkill for static overlay | Yes | ✅ | Client only | Rejected — game-engine scope |
| **CSS transform on `<img>`** | Easy | 0 | Limited | No real composite export | html2canvas hack | — | — | Rejected — unreliable export |

### Selected: **Konva.js + react-konva**

**Why:**

- React-friendly `Stage` / `Layer` / `Image` / `Transformer`
- Drag + corner resize + rotate handles out of the box
- Sliders sync with node properties for fine control
- `stage.toDataURL()` for export
- Touch events work on mobile for drag
- Active maintenance, TypeScript types

**Rejected Fabric.js:** excellent for full editors, but larger bundle and more imperative API for a minimal overlay proof.

**Rejected raw Canvas:** would reimplement transform handles, hit testing, and touch — unnecessary for Phase 2.

---

## 3. Implementation (spike)

| File | Role |
| --- | --- |
| `src/components/try-on/try-on-spike.tsx` | Interactive proof UI |
| `src/lib/try-on/prepare-photo.ts` | EXIF orientation + resize |
| `src/lib/try-on/constants.ts` | Limits and default asset |
| `src/app/[locale]/try-tattoo/page.tsx` | Dynamic import (`ssr: false`) |

### Features verified in spike

- [x] Local file picker (`image/jpeg`, `image/png`, `image/webp`)
- [x] Photo displayed on canvas
- [x] Bundled tattoo overlay (`/images/designs/design-03.webp`)
- [x] Drag tattoo on canvas
- [x] Transformer handles (scale + rotate)
- [x] Opacity / size / rotation sliders
- [x] Reset
- [x] Export PNG download
- [x] Mobile-friendly sliders + touch drag

### Privacy path

- `File` → `createImageBitmap({ imageOrientation: 'from-image' })` → canvas resize → `blob:` URL
- No `fetch` to server for user photo
- No `localStorage` persistence
- Export strips re-encoded JPEG/PNG metadata (new canvas encode)

---

## 4. Mobile considerations

| Topic | Strategy |
| --- | --- |
| Layout | Preview first (`order-1` on mobile); controls below |
| Touch | Konva native drag + Transformer pinch-friendly handles |
| Controls | 3 sliders + 2 large buttons (44px min tap) — no icon toolbar |
| Viewport | Stage width = container; height = 4:3 |
| EXIF | `createImageBitmap` with `imageOrientation: 'from-image'` |
| Large photos | Downscale to max edge **2048px** before canvas |

---

## 5. Performance

- Working canvas capped at 2048px edge → avoids 8000×6000 mobile camera memory spikes
- Single Stage, two image layers + Transformer
- Default tattoo loaded once on mount
- Object URLs should be revoked on replace (implemented on re-upload)

---

## 6. Export

- Method: `stage.toDataURL({ mimeType: 'image/png', pixelRatio: 1 })`
- Trigger: download via temporary `<a>` element
- Transformer hidden during export for clean output

### Cross-browser notes

| Browser | Expected |
| --- | --- |
| Desktop Chromium | ✅ Verified via automated test |
| iOS Safari | Konva + `toDataURL` generally supported; manual QA recommended before production |
| Android Chrome | Same as Chromium; manual QA recommended |

**Known limitation:** very old browsers without `createImageBitmap` + `imageOrientation` may show wrong orientation — acceptable for MVP; polyfill optional later.

---

## 7. Future upgrade path (not in Phase 2)

| Feature | Approach |
| --- | --- |
| Multiply / darken blend | Custom Konva filter or offscreen canvas `globalCompositeOperation` |
| Perspective warp | Mesh warp library or manual corner pins (Fabric has better warp ergonomics) |
| Body segmentation | ML model (MediaPipe / ONNX) — separate track |
| User PNG upload | Same pipeline as photo; validate alpha channel |
| Design picker | Wire catalog `TattooDesign` assets with transparent PNGs |
| Cloud save | Post-MVP; requires backend + auth |

---

## 8. Known limitations (MVP proof)

- No AI skin blending or realistic ink simulation
- No body detection / auto-placement
- No perspective correction
- Bundled tattoo may include non-transparent background (WebP sketch) — production needs transparent PNG assets
- Design selector from catalog not wired in spike (single bundled asset)
- No undo history
- Export resolution = screen stage size (not full camera resolution)

---

## 9. Tests

| Test | Command |
| --- | --- |
| Spike interaction | `npm run test:tryon` |
| Route smoke | `npm run smoke` |
| Visual regression | `npm run screenshot:validate` |

`scripts/tryon-spike-test.mjs` verifies: route render, upload, tattoo layer, reset, export click, no upload network requests.

---

## 10. Dependencies added

```json
"konva": "^9.x",
"react-konva": "^19.x"
```

Loaded only on try-on page via `next/dynamic` + `ssr: false`.
