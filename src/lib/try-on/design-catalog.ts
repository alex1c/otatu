/** Bundled try-on design entry for the editor picker. */
export interface TryOnCatalogDesign {
	slug: string
	title: string
	/** Public path to design image (prefer transparent PNG/WebP). */
	src: string
}

/** OTATU bundled designs available in the try-on editor. */
export const TRYON_CATALOG: TryOnCatalogDesign[] = [
	{
		slug: 'wolf-minimal',
		title: 'Волк — минимализм',
		src: '/images/designs/design-02.webp',
	},
	{
		slug: 'wolf-geometric',
		title: 'Волк — геометрия',
		src: '/images/designs/design-03.webp',
	},
	{
		slug: 'snake-blackwork',
		title: 'Змея — blackwork',
		src: '/images/designs/design-06.webp',
	},
	{
		slug: 'rose-linework',
		title: 'Роза — linework',
		src: '/images/designs/design-10.webp',
	},
	{
		slug: 'anchor-minimal',
		title: 'Якорь — минимализм',
		src: '/images/designs/design-12.webp',
	},
	{
		slug: 'compass-geometric',
		title: 'Компас — геометрия',
		src: '/images/designs/design-11.webp',
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
