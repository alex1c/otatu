/** Bundled try-on design entry for the editor picker. */
export interface TryOnCatalogDesign {
	slug: string
	title: string
	/** Public path to design image (prefer transparent PNG/WebP). */
	src: string
	/**
	 * Whether the asset has a usable transparent/isolated background.
	 * Opaque studio backgrounds still work with multiply, but look less natural.
	 */
	hasTransparentBg: boolean
}

/**
 * OTATU bundled designs available in the try-on editor.
 * Skin photos and mislabeled stock are excluded — they are content assets, not overlays.
 */
export const TRYON_CATALOG: TryOnCatalogDesign[] = [
	{
		slug: 'wolf-minimal',
		title: 'Волк — минимализм',
		src: '/images/designs/design-02.webp',
		hasTransparentBg: false,
	},
	{
		slug: 'wolf-geometric',
		title: 'Волк — геометрия',
		src: '/images/designs/design-03.webp',
		hasTransparentBg: false,
	},
	{
		slug: 'anchor-minimal',
		title: 'Якорь — минимализм',
		src: '/images/designs/design-12.webp',
		hasTransparentBg: false,
	},
	{
		slug: 'compass-geometric',
		title: 'Компас — геометрия',
		src: '/images/designs/design-11.webp',
		hasTransparentBg: false,
	},
	{
		slug: 'bird-linework',
		title: 'Птица — linework',
		src: '/images/designs/design-07.webp',
		hasTransparentBg: false,
	},
]

export const TRYON_DEFAULT_DESIGN_SLUG = 'wolf-minimal'

/** Resolves catalog entry by slug — unknown slugs fall back to default. */
export function resolveTryOnDesign(slug?: string | null): TryOnCatalogDesign {
	const match = TRYON_CATALOG.find((design) => design.slug === slug)
	if (match) return match
	return (
		TRYON_CATALOG.find((design) => design.slug === TRYON_DEFAULT_DESIGN_SLUG) ??
		TRYON_CATALOG[0]
	)
}
