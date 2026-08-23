import type { Article, Collection } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Editorial guide cards for the home page. */
export const articles: Article[] = [
	{
		id: 'article-first-tattoo',
		slug: 'how-to-choose-first-tattoo',
		title: 'Как выбрать первую татуировку',
		excerpt:
			'С чего начать: место, размер, стиль и как не пожалеть о решении.',
		readTime: '7 мин',
		image: getPlaceholder('article01'),
	},
	{
		id: 'article-pain',
		slug: 'does-tattoo-hurt',
		title: 'Больно ли делать тату',
		excerpt:
			'Честно о болевых ощущениях на разных участках тела и как к ним подготовиться.',
		readTime: '5 мин',
		image: getPlaceholder('article02'),
	},
	{
		id: 'article-symbols',
		slug: 'popular-symbols-meaning',
		title: 'Значение популярных символов',
		excerpt:
			'Волк, роза, змея, луна — что означают самые частые мотивы в тату.',
		readTime: '9 мин',
		image: getPlaceholder('article03'),
	},
]

/** Curated collections — image-led cards with varied proportions. */
export const collections: Collection[] = [
	{
		id: 'coll-arm',
		slug: 'arm-tattoos',
		title: 'Тату на руке',
		description: 'От запястья до плеча',
		coverImage: getPlaceholder('collArm'),
		layoutVariant: 'wide',
		designIds: [
			'design-wolf-realism',
			'design-snake-black',
			'design-text-script',
		],
	},
	{
		id: 'coll-small',
		slug: 'small-tattoos',
		title: 'Маленькие тату',
		description: 'Компактные эскизы',
		coverImage: getPlaceholder('collSmall'),
		layoutVariant: 'portrait',
		designIds: [
			'design-wolf-minimal',
			'design-moon-dot',
			'design-anchor-minimal',
		],
	},
	{
		id: 'coll-meaning',
		slug: 'meaningful-tattoos',
		title: 'Тату со смыслом',
		description: 'Символы с глубоким значением',
		coverImage: getPlaceholder('collMeaning'),
		layoutVariant: 'square',
		designIds: [
			'design-wolf-geo',
			'design-bird-linework',
			'design-compass-geo',
		],
	},
]
