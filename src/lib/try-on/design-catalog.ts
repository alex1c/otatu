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
 * Media Pack v2 — only real-alpha overlays (programmatically verified).
 */
export const TRYON_CATALOG: TryOnCatalogDesign[] = [
	{
		slug: 'rose-transparent',
		title: 'Роза — fine-line',
		src: '/images/tryon/rose-transparent.webp',
		hasTransparentBg: true,
	},
	{
		slug: 'snake-transparent',
		title: 'Змея — linework',
		src: '/images/tryon/snake-transparent.webp',
		hasTransparentBg: true,
	},
	{
		slug: 'wolf-transparent',
		title: 'Волк — контур',
		src: '/images/tryon/wolf-transparent.webp',
		hasTransparentBg: true,
	},
	{
		slug: 'bird-transparent',
		title: 'Птица — linework',
		src: '/images/tryon/bird-transparent.webp',
		hasTransparentBg: true,
	},
	{
		slug: 'compass-transparent',
		title: 'Компас — геометрия',
		src: '/images/tryon/compass-transparent.webp',
		hasTransparentBg: true,
	},
	{
		slug: 'anchor-transparent',
		title: 'Якорь — минимализм',
		src: '/images/tryon/anchor-transparent.webp',
		hasTransparentBg: true,
	},
]

export const TRYON_DEFAULT_DESIGN_SLUG = 'rose-transparent'

/** Resolves catalog entry by slug — unknown slugs fall back to default. */
export function resolveTryOnDesign(slug?: string | null): TryOnCatalogDesign {
	const match = TRYON_CATALOG.find((design) => design.slug === slug)
	if (match) return match
	return (
		TRYON_CATALOG.find((design) => design.slug === TRYON_DEFAULT_DESIGN_SLUG) ??
		TRYON_CATALOG[0]
	)
}
