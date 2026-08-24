import type { TattooDesign } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Demo tattoo designs — mixed stock photos + generated OTATU designs. */
export const designs: TattooDesign[] = [
	{
		id: 'design-wolf-realism',
		slug: 'wolf-realism',
		title: 'Волк — реализм',
		motifSlug: 'wolf',
		styleSlug: 'realism',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-men', 'with-meaning'],
		image: getPlaceholder('wolfSnarl'),
		galleryVariant: 'tall',
		isPopular: true,
	},
	{
		id: 'design-wolf-minimal',
		slug: 'wolf-minimal',
		// NOTE: design02 is a geometric wolf illustration (dark bg, AI-generated).
		// It is labelled as wolf-minimal but visually is NOT minimal — it's a detailed
		// geometric wolf face. Kept for wolf page but removed from minimalism category.
		title: 'Волк — геометрия',
		motifSlug: 'wolf',
		styleSlug: 'geometric',
		bodyPartSlug: 'wrist',
		categorySlugs: ['for-men'],
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
		id: 'design-botanical-back',
		slug: 'botanical-back',
		title: 'Волк и ботаника на спине',
		motifSlug: 'wolf',
		styleSlug: 'realism',
		bodyPartSlug: 'back',
		categorySlugs: ['for-women', 'with-meaning'],
		image: getPlaceholder('design01'),
		galleryVariant: 'landscape',
		isPopular: true,
	},
	{
		id: 'design-arm-linework',
		slug: 'arm-linework',
		title: 'Геометрия на предплечье',
		motifSlug: 'arm',
		styleSlug: 'dotwork',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-women', 'arm'],
		image: getPlaceholder('design04'),
		galleryVariant: 'tall',
		isPopular: true,
	},
	{
		id: 'design-arm-dotwork',
		slug: 'arm-dotwork',
		// REMEDIATED: design05 (duck tattoo) replaced with hero01 (fine-line botanical arm).
		// duck tattoo was identified as low-quality content during Phase 3 review.
		title: 'Fine-line ботаника на руке',
		motifSlug: 'botanical',
		styleSlug: 'linework',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-women', 'small', 'with-meaning', 'minimalism'],
		image: getPlaceholder('hero01'),
		galleryVariant: 'portrait',
		isPopular: true,
	},
	{
		id: 'design-arm-blackwork',
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
		id: 'design-minimal-symbol-wrist',
		slug: 'minimal-symbol-wrist',
		title: 'Минималистичный символ на запястье',
		motifSlug: 'geometric',
		styleSlug: 'minimalism',
		bodyPartSlug: 'wrist',
		categorySlugs: ['small', 'minimalism', 'for-women', 'with-meaning'],
		image: getPlaceholder('collMeaning'),
		galleryVariant: 'portrait',
		isPopular: true,
	},
	{
		id: 'design-fineline-forearm',
		slug: 'fineline-forearm',
		title: 'Fine-line на предплечье',
		motifSlug: 'lineart',
		styleSlug: 'minimalism',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-women', 'small', 'minimalism'],
		image: getPlaceholder('hero03'),
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
		// design08: fine-line abstract art tattoos on freckled forearm
		title: 'Fine-line арт на предплечье',
		motifSlug: 'arm',
		styleSlug: 'linework',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-women', 'arm'],
		image: getPlaceholder('design08'),
		galleryVariant: 'portrait',
		isPopular: true,
	},
	{
		id: 'design-eye-forearm',
		slug: 'eye-forearm',
		// coll-arm: Eye of Ra minimal tattoo on forearm — B&W photo, high quality
		title: 'Символ на предплечье',
		motifSlug: 'arm',
		styleSlug: 'minimalism',
		bodyPartSlug: 'forearm',
		categorySlugs: ['for-women', 'arm', 'with-meaning', 'small'],
		image: getPlaceholder('collArm'),
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
		galleryVariant: 'portrait',
	},
	{
		id: 'design-lettering-leg',
		slug: 'lettering-leg',
		title: 'Надпись на ноге',
		motifSlug: 'text',
		styleSlug: 'minimalism',
		bodyPartSlug: 'leg',
		categorySlugs: ['for-women', 'inscriptions'],
		image: getPlaceholder('design10'),
		galleryVariant: 'tall',
		isPopular: true,
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

