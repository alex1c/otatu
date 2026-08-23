# OTATU — Search Architecture (Phase 2)

Status: **Phase 2 discovery — no routes implemented yet**

Phase 1A baseline: `/ru`, `/ru/tattoo`, `/ru/tattoo/wolf`, `/ru/try-tattoo`.

---

## 1. Current model (Phase 1A audit)

| Layer | State |
| --- | --- |
| Routes | 4 live RU pages + redirect `/` → `/ru` |
| Motif pages | Only `wolf` has full `Motif` fixture + SSG |
| Designs | 12 designs; 9 unique `motifSlug` values; 8 lack motif pages → 404 from gallery cards |
| Taxonomies | Styles (7), body parts (8), categories (8) — fixtures only, no landing routes |
| Search | Header button stub; no `/search` route |
| Articles | 3 cards on Home; no article routes |
| Collections | 3 home rows; all link to `/ru/tattoo` |
| SEO | `buildPageMetadata`, sitemap, robots; sitemap lists only existing motif slugs |
| Locale | RU active; EN reserved in types/middleware but blocked |

**Key gap:** discovery UI links to motif URLs that do not exist yet (`/ru/tattoo/snake`, etc.).

---

## 2. Taxonomy

### Primary dimensions

| Dimension | Slug examples | Landing route? |
| --- | --- | --- |
| **Motif** | wolf, snake, dragon, rose, lion, butterfly, raven, owl, moon, cross, compass, anchor, flower, bird | Yes — `/ru/tattoo/{motif}/` |
| **Style** | minimalism, linework, realism, blackwork, dotwork, geometric, traditional | Yes — `/ru/style/{style}/` |
| **Body part** | arm, forearm, wrist, shoulder, chest, back, leg, ankle | Yes — `/ru/body/{part}/` |
| **Audience** | for-women, for-men | Yes — `/ru/tattoo-for-women/`, `/ru/tattoo-for-men/` |
| **Size** | small | Yes — `/ru/small-tattoos/` |
| **Lettering** | inscriptions, text | Yes — `/ru/lettering/` (single hub) |
| **Tool** | try-on | Yes — `/ru/try-tattoo/` |

### Secondary dimensions (no standalone URL in MVP)

| Dimension | Handling |
| --- | --- |
| **Meaning** | Section inside motif page; no `/ru/meaning/...` |
| **Sketch vs idea vs inspiration** | Same motif page; H1 + modules cover merged intent |
| **Keyword variations** | Synonyms map to one canonical URL (see §4) |

### Motif priority set (first launch)

Tier 1: wolf, snake, dragon, rose, lion, butterfly  
Tier 2: raven, owl, moon, cross, compass, anchor

---

## 3. Chosen URL model

```
/ru/                              Home hub
/ru/tattoo/                       Ideas & sketches catalog
/ru/tattoo/{motif}/               Motif landing (meaning + gallery + variations)
/ru/tattoo-for-women/             Audience collection
/ru/tattoo-for-men/               Audience collection
/ru/small-tattoos/                Size collection
/ru/body/{part}/                  Body placement landing
/ru/style/{style}/                Style landing
/ru/lettering/                    Lettering / inscriptions hub
/ru/try-tattoo/                   Browser-only try-on tool
```

### Why this model

| Criterion | Decision |
| --- | --- |
| **Clarity** | Flat, readable paths; motif under `/tattoo/` matches current wolf pattern |
| **SEO** | One strong URL per intent cluster; avoids `/wolf-meaning` cannibalization |
| **EN future** | Same structure with `/en/` prefix; slug stays English |
| **Breadcrumbs** | Home → Ideas → Motif; Home → Body → Forearm |
| **Canonical** | One canonical per page; filters are on-page sections, not duplicate URLs |
| **Depth** | Max 2 segments after locale (`/ru/body/forearm/`); no compound paths like `/women/small/arm/wolf` |

### Rejected patterns

| Pattern | Reason |
| --- | --- |
| `/ru/wolf/` | Breaks motif grouping; harder to scale taxonomy |
| `/ru/meaning/wolf/` | Splits intent; cannibalizes motif page |
| `/ru/tattoo/wolf/meaning/` | Over-nested; thin child pages |
| `/ru/women/small/arm/minimalism/wolf` | Facet explosion; unmaintainable |
| Query-only landing pages (`?motif=wolf`) | Weak canonical signals for launch set |

---

## 4. Intent consolidation rules

**Rule 1 — One canonical URL per search cluster.**  
Example: «тату волк», «значение волка», «эскиз волка», «идеи волка» → `/ru/tattoo/wolf/`.

**Rule 2 — Meaning is a module, not a route.**  
Motif page includes: short meanings list, semantic tags, variations. Separate `/meaning/` only if future data shows distinct SERP requiring standalone page (not in MVP).

**Rule 3 — Style × motif combinations are filtered views, not URLs.**  
«Минималистичный волк» → `/ru/tattoo/wolf/` with on-page style filter / section linking to `/ru/style/minimalism/`.

**Rule 4 — Body × motif combinations are cross-links, not URLs.**  
«Волк на предплечье» → `/ru/tattoo/wolf/` links to `/ru/body/forearm/`; forearm page links back to wolf.

**Rule 5 — Audience + size are collection pages.**  
«Маленькие тату для девушек» → `/ru/small-tattoos/` + `/ru/tattoo-for-women/`; no `/ru/small-tattoos-for-women/`.

**Rule 6 — Lettering is one hub.**  
«тату надписи», «фразы для тату», «короткие надписи» → `/ru/lettering/`.

**Rule 7 — Tool intents map to try-on.**  
«примерить тату», «наложить тату на фото» → `/ru/try-tattoo/`.

**Rule 8 — No programmatic URL generation.**  
New pages require explicit entry in `FIRST_LAUNCH_PAGES.md` and fixture/content work.

---

## 5. Meaning architecture decision

**Decision: no standalone `/ru/meaning/` section in MVP.**

| For | Against separate meaning routes |
| --- | --- |
| Motif page already has meanings module (wolf template) | «значение волка» SERP satisfied by H2 + structured list on motif page |
| Reduces cannibalization | Separate thin pages harm quality |
| Matches Visual Discovery (image-first) | Meaning without visuals is weak for OTATU brand |

**Exception (Phase 3+):** editorial guides like «значение популярных символов» → `/ru/guides/{slug}/` when article infrastructure exists. Not in first launch.

---

## 6. Page archetypes

### A. Motif page — `/ru/tattoo/{motif}/`

| Module | Purpose |
| --- | --- |
| H1 + semantic tags | Primary intent |
| Visual composition | Hero gallery |
| Meanings (short) | Meaning intent |
| Ideas gallery | Sketches / inspiration |
| Variations | Sub-motifs |
| Styles row | Links to style pages |
| Placements row | Links to body pages |
| Related motifs | Internal linking |
| Try-On CTA | Product conversion |

**Data entity:** `Motif` (existing)

### B. Body placement page — `/ru/body/{part}/`

| Module | Purpose |
| --- | --- |
| H1 + intro | Placement intent |
| Inspiration gallery | Filtered designs |
| Sub-areas (e.g. forearm, wrist under arm) | Secondary navigation |
| Audience links | Women / men |
| Small tattoos link | Size collection |
| Style recommendations | Top 3–4 styles |
| Motif recommendations | Top motifs for placement |
| Try-On CTA | Product |

**Data entity:** `BodyPart` + `Collection` filter rules

### C. Style page — `/ru/style/{style}/`

| Module | Purpose |
| --- | --- |
| H1 + visual definition | Style intent |
| Gallery | Style-filtered designs |
| Popular motifs | Cross-links to motif pages |
| Placements | Body part links |
| Audience / small | Collection links |
| Try-On CTA | Product |

**Data entity:** `TattooStyle` + filtered `TattooDesign[]`

### D. Audience / collection page — women, men, small

| Module | Purpose |
| --- | --- |
| H1 + intro | Audience/size intent |
| Curated gallery | `categorySlugs` filter |
| Style chips | Style pages |
| Placement chips | Body pages |
| Motif highlights | Motif pages |
| Try-On CTA | Product |

**Data entity:** `Collection` (extended with `categoryFilter`, `audienceSlug`)

### E. Catalog hub — `/ru/tattoo/`

Existing catalog; becomes ideas/sketches hub. Client filters remain; future: URL-synced facets optional in Phase 3.

### F. Lettering hub — `/ru/lettering/`

Single page for all inscription intents. Gallery filtered by `text` / `inscriptions` category.

### G. Try-On — `/ru/try-tattoo/`

Product tool page; not SEO landing for every tool keyword (metadata covers primary terms).

---

## 7. Entity model (typed, fixture-ready)

See `src/types/search-entities.ts`.

| Entity | Role |
| --- | --- |
| `Motif` | Motif landing content |
| `TattooStyle` | Style taxonomy + style pages |
| `BodyPart` | Placement taxonomy + body pages |
| `TattooDesign` | Gallery items; filterable by slugs |
| `Collection` | Curated / audience / size pages |
| `Audience` | `women` \| `men` — maps to category slugs |
| `Category` | Filter chips (existing) |
| `MeaningSummary` | Optional short meaning block on motif (not standalone page) |
| `LaunchPage` | Registry entry for first-launch URLs |
| `PageArchetype` | Template type for code generation later |

**Relations:**

```
Motif ←→ TattooDesign (motifSlug)
Style ←→ TattooDesign (styleSlug)
BodyPart ←→ TattooDesign (bodyPartSlug)
Category ←→ TattooDesign (categorySlugs[])
Collection → designIds[] | categoryFilter
Motif.relatedSlugs → Motif
LaunchPage → archetype + primaryIntent
```

No PostgreSQL in Phase 2. Fixtures remain source of truth until content volume justifies DB.

---

## 8. Internal linking rules

Explicit, hand-curated links only. No auto-generated cross-link matrices.

### Motif page (example: wolf)

| Link to | Anchor context |
| --- | --- |
| `/ru/style/realism/` | Suitable styles |
| `/ru/style/minimalism/` | Suitable styles |
| `/ru/body/forearm/` | Placements |
| `/ru/body/shoulder/` | Placements |
| `/ru/tattoo-for-men/` | Audience |
| `/ru/tattoo/snake/`, `/ru/tattoo/lion/`, `/ru/tattoo/raven/` | Related motifs |
| `/ru/try-tattoo/` | CTA |

### Body page (example: arm)

| Link to | Context |
| --- | --- |
| `/ru/body/forearm/`, `/ru/body/wrist/` | Sub-areas |
| `/ru/tattoo-for-women/`, `/ru/tattoo-for-men/` | Audience |
| `/ru/small-tattoos/` | Size |
| Top 4 motifs for arm | Motif cards |
| Top 3 styles for arm | Style chips |
| `/ru/try-tattoo/` | CTA |

### Style page (example: minimalism)

| Link to | Context |
| --- | --- |
| `/ru/tattoo/wolf/`, `/ru/tattoo/moon/`, … | Popular motifs |
| `/ru/body/wrist/`, `/ru/body/forearm/` | Placements |
| `/ru/small-tattoos/` | Size |
| `/ru/tattoo-for-women/` | Audience |
| `/ru/try-tattoo/` | CTA |

### Global

- Every archetype page includes **one** Try-On CTA.
- Breadcrumbs reflect hierarchy (max 3 levels).
- Footer nav groups: Ideas, Styles, Tools — no link farms.

---

## 9. Pages deliberately NOT created (MVP)

| Avoid | Reason |
| --- | --- |
| Per-keyword URLs (`/tattoo-wolf-meaning/`) | Cannibalization |
| Style × motif pages (`/minimalism/wolf/`) | Combinatorial explosion |
| Body × style × audience triplets | Same |
| 100+ motif pages | Quality over quantity |
| `/ru/search/` with empty index | Ship when search works |
| AI-generated text pages | Brand risk |
| `/ru/masters/`, `/ru/shops/` | Out of scope |
| EN locale pages | Structure ready; content later |
| Design detail URLs (`/design/wolf-realism/`) | Motif page sufficient for MVP |

---

## 10. Future EN considerations

| Aspect | Approach |
| --- | --- |
| URL slugs | Keep English slugs (`/en/tattoo/wolf/`) |
| Content | Dictionary + localized fixture fields or CMS later |
| hreflang | Already in `buildPageMetadata`; activate when `en` locale goes live |
| robots | `/en/` currently disallowed until content exists |

---

## 11. Implementation sequence (post Phase 2)

1. Add motif fixtures for Tier 1 slugs (reuse wolf template).
2. Add route files for `/body/[part]`, `/style/[style]`, collection pages.
3. Extend sitemap from `LaunchPage` registry.
4. Fix broken collection `designIds` in fixtures.
5. Wire gallery cards only to existing motif slugs until pages ship.
6. Search route + index (Phase 3).

---

## Related documents

- `docs/FIRST_LAUNCH_PAGES.md` — launch shortlist table
- `src/types/search-entities.ts` — typed entity extensions
