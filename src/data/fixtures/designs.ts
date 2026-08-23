import type { TattooDesign } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Demo tattoo designs — varied gallery variants for editorial masonry. */
export const designs: TattooDesign[] = [
	{
		id: 'design-wolf-realism',
		slug: 'wolf-realism',
		title: 'Волк — реализм',
		motifSlug: 'wolf',
		styleSlug: 'realism',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-men', 'with-meaning'],
		image: getPlaceholder('design01'),
		galleryVariant: 'portrait',
		isPopular: true,
	},
	{
		id: 'design-wolf-minimal',
		slug: 'wolf-minimal',
		title: 'Волк — минимализм',
		motifSlug: 'wolf',
		styleSlug: 'minimalism',
		bodyPartSlug: 'wrist',
		categorySlugs: ['small', 'minimalism'],
		image: getPlaceholder('design02'),
		galleryVariant: 'tall',
		isPopular: true,
	},
	{
		id: 'design-wolf-geo',
		slug: 'wolf-geometric',
		title: 'Волк — геометрия',
		motifSlug: 'wolf',
		styleSlug: 'geometric',
		bodyPartSlug: 'arm',
		categorySlugs: ['for-men', 'minimalism'],
		image: getPlaceholder('design03'),
		galleryVariant: 'square',
		isPopular: true,
	},
	{
		id: 'design-rose-minimal',
		slug: 'rose-minimal',
		title: 'Роза — линии',
		motifSlug: 'rose',
		styleSlug: 'linework',
		bodyPartSlug: 'ankle',
		categorySlugs: ['for-women', 'small'],
		image: getPlaceholder('design04'),
		galleryVariant: 'landscape',
		isPopular: true,
	},
	{
		id: 'design-moon-dot',
		slug: 'moon-dotwork',
		title: 'Луна — dotwork',
		motifSlug: 'moon',
		styleSlug: 'dotwork',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-women', 'small', 'with-meaning'],
		image: getPlaceholder('design05'),
		galleryVariant: 'portrait',
		isPopular: true,
	},
	{
		id: 'design-snake-black',
		slug: 'snake-blackwork',
		title: 'Змея — blackwork',
		motifSlug: 'snake',
		styleSlug: 'blackwork',
		bodyPartSlug: 'arm',
		categorySlugs: ['for-men'],
		image: getPlaceholder('design06'),
		galleryVariant: 'tall',
		isPopular: true,
	},
	{
		id: 'design-bird-linework',
		slug: 'bird-linework',
		title: 'Птица — linework',
		motifSlug: 'bird',
		styleSlug: 'linework',
		bodyPartSlug: 'shoulder',
		categorySlugs: ['for-women', 'with-meaning'],
		image: getPlaceholder('design07'),
		galleryVariant: 'square',
		isPopular: true,
	},
	{
		id: 'design-text-script',
		slug: 'script-text',
		title: 'Надпись — script',
		motifSlug: 'text',
		styleSlug: 'minimalism',
		bodyPartSlug: 'forearm',
		categorySlugs: ['inscriptions'],
		image: getPlaceholder('design08'),
		galleryVariant: 'portrait',
		isPopular: true,
	},
	{
		id: 'design-dragon-trad',
		slug: 'dragon-traditional',
		title: 'Дракон — traditional',
		motifSlug: 'dragon',
		styleSlug: 'traditional',
		bodyPartSlug: 'back',
		categorySlugs: ['for-men'],
		image: getPlaceholder('design09'),
		galleryVariant: 'landscape',
	},
	{
		id: 'design-flower-realism',
		slug: 'flower-realism',
		title: 'Цветок — реализм',
		motifSlug: 'flower',
		styleSlug: 'realism',
		bodyPartSlug: 'leg',
		categorySlugs: ['for-women'],
		image: getPlaceholder('design10'),
		galleryVariant: 'tall',
	},
	{
		id: 'design-compass-geo',
		slug: 'compass-geometric',
		title: 'Компас — геометрия',
		motifSlug: 'compass',
		styleSlug: 'geometric',
		bodyPartSlug: 'chest',
		categorySlugs: ['for-men', 'with-meaning'],
		image: getPlaceholder('design11'),
		galleryVariant: 'portrait',
	},
	{
		id: 'design-anchor-minimal',
		slug: 'anchor-minimal',
		title: 'Якорь — минимализм',
		motifSlug: 'anchor',
		styleSlug: 'minimalism',
		bodyPartSlug: 'wrist',
		categorySlugs: ['small', 'for-men'],
		image: getPlaceholder('design12'),
		galleryVariant: 'square',
	},
]

export function getDesignBySlug(slug: string): TattooDesign | undefined {
	return designs.find((design) => design.slug === slug)
}

export function getDesignsByIds(ids: string[]): TattooDesign[] {
	return ids
		.map((id) => designs.find((design) => design.id === id))
		.filter((design): design is TattooDesign => Boolean(design))
}

export function getDesignsByMotif(motifSlug: string): TattooDesign[] {
	return designs.filter((design) => design.motifSlug === motifSlug)
}

export function getPopularDesigns(): TattooDesign[] {
	return designs.filter((design) => design.isPopular)
}
