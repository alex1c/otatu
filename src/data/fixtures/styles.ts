import type { TattooStyle } from '@/types/content'

/** Tattoo style taxonomy for filters and motif pages. */
export const styles: TattooStyle[] = [
	{ id: 'style-realism', slug: 'realism', label: 'Реализм' },
	{ id: 'style-minimal', slug: 'minimalism', label: 'Минимализм' },
	{ id: 'style-geo', slug: 'geometric', label: 'Геометрия' },
	{ id: 'style-trad', slug: 'traditional', label: 'Traditional' },
	{ id: 'style-dot', slug: 'dotwork', label: 'Dotwork' },
	{ id: 'style-linework', slug: 'linework', label: 'Linework' },
	{ id: 'style-blackwork', slug: 'blackwork', label: 'Blackwork' },
]

export function getStyleBySlug(slug: string): TattooStyle | undefined {
	return styles.find((style) => style.slug === slug)
}

export function getStylesBySlugs(slugs: string[]): TattooStyle[] {
	return slugs
		.map((slug) => getStyleBySlug(slug))
		.filter((style): style is TattooStyle => Boolean(style))
}
