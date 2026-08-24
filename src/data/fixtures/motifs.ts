import type { Motif, MediaAsset } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Builds a media asset with an honest, context-specific alt text. */
function withAlt(key: Parameters<typeof getPlaceholder>[0], alt: string): MediaAsset {
	return { ...getPlaceholder(key), alt }
}

/**
 * Motif pages content — shared archetype for Wave A motifs.
 * Image assignments must match visible motif (no false captions).
 */
export const motifs: Motif[] = [
	{
		id: 'motif-wolf',
		slug: 'wolf',
		title: 'Тату волк',
		shortName: 'волк',
		ideasPhrase: 'с волком',
		intro:
			'Волк — один из самых популярных мотивов в тату-культуре. Сильный, узнаваемый символ свободы, верности и инстинкта.',
		semanticTags: ['Свобода', 'Сила', 'Верность', 'Независимость'],
		meanings: [
			'Свобода и независимость — образ жизни вне стадных правил',
			'Верность и защита близких — вожак стаи как метафора семьи',
			'Инстинкт и внутренняя сила — связь с природной энергией',
			'Собственный путь — «lone wolf» как личный выбор',
		],
		variations: [
			{
				id: 'var-wolf-moon',
				title: 'Волк с луной',
				description: 'Классическое сочетание волка и лунной фазы.',
				image: getPlaceholder('wolfMoon'),
			},
			{
				id: 'var-wolf-snarl',
				title: 'Оскал волка',
				description: 'Мощная подача — акцент на защиту и силу.',
				image: getPlaceholder('wolfSnarl'),
			},
			{
				id: 'var-wolf-geo',
				title: 'Геометрический волк',
				description: 'Графичный современный вариант мотива.',
				image: getPlaceholder('wolfGeo'),
			},
			{
				id: 'var-wolf-minimal',
				title: 'Волк минимализм',
				description: 'Лаконичный контур для маленькой тату.',
				image: getPlaceholder('wolfMinimal'),
			},
		],
		bodyPartSlugs: ['forearm', 'shoulder', 'chest', 'back', 'wrist'],
		styleSlugs: ['realism', 'minimalism', 'geometric', 'blackwork'],
		relatedSlugs: ['snake', 'rose'],
		designIds: [
			'design-wolf-realism',
			'design-wolf-minimal',
			'design-wolf-geo',
		],
		tryOnDesignSlug: 'wolf-transparent',
		galleryImages: [
			getPlaceholder('wolfGallery01'),
			getPlaceholder('wolfSnarl'),
			getPlaceholder('wolfGallery03'),
		],
		image: getPlaceholder('wolfHero'),
	},
	{
		id: 'motif-snake',
		slug: 'snake',
		title: 'Тату змея',
		shortName: 'змея',
		ideasPhrase: 'со змеёй',
		intro:
			'Змея — гибкий мотив с сильным визуальным ритмом. Хорошо работает в обвивающих композициях на руке и предплечье.',
		semanticTags: ['Трансформация', 'Защита', 'Цикличность', 'Сила'],
		meanings: [
			'Трактовки зависят от культуры и личного контекста — универсального «значения змеи» нет',
			'Часто связывают с трансформацией и обновлением — образ смены «кожи»',
			'Линия змеи хорошо повторяет изгибы тела — поэтому мотив любят для обвивающих композиций',
			'Может выглядеть спокойно или драматично: от тонкого контура до плотного blackwork',
		],
		variations: [
			{
				id: 'var-snake-floral',
				title: 'Змея и цветы',
				description:
					'Змея в цветочной композиции — мягкий контраст чешуи и лепестков.',
				image: withAlt('snake01', 'Змея и цветы — blackwork на руке'),
			},
			{
				id: 'var-snake-wrap',
				title: 'Обвивающая змея',
				description:
					'Змея следует изгибу предплечья — популярный формат для длинной зоны.',
				image: withAlt('snake02', 'Змея на предплечье — обвивающая композиция'),
			},
			{
				id: 'var-snake-inner',
				title: 'Змея на внутренней стороне',
				description:
					'Тонкий linework на внутренней стороне предплечья — читается в движении.',
				image: withAlt('snake03', 'Змея на внутренней стороне предплечья'),
			},
		],
		bodyPartSlugs: ['arm', 'forearm', 'shoulder', 'chest'],
		styleSlugs: ['blackwork', 'linework', 'traditional', 'dotwork'],
		relatedSlugs: ['wolf', 'rose'],
		designIds: [
			'design-snake-blackwork',
			'design-snake-wrap',
			'design-snake-inner',
		],
		tryOnDesignSlug: 'snake-transparent',
		galleryImages: [
			withAlt('snake01', 'Змея и цветы — blackwork на руке'),
			withAlt('snake02', 'Змея на предплечье — обвивающая композиция'),
			withAlt('snake03', 'Змея на внутренней стороне предплечья'),
			withAlt('snake04', 'Змея на руке — портретный кадр'),
		],
		image: withAlt('snake01', 'Змея и цветы — blackwork на руке'),
	},
	{
		id: 'motif-rose',
		slug: 'rose',
		title: 'Тату роза',
		shortName: 'роза',
		ideasPhrase: 'с розой',
		intro:
			'Роза — популярный цветочный мотив: от лаконичного контура до детализированных композиций с листьями и текстом. Значение почти всегда личное — не сводится только к «любви».',
		semanticTags: ['Красота', 'Контраст', 'Память', 'Нежность'],
		meanings: [
			'Красота и контраст — мягкий силуэт с выразительной формой',
			'Личная история — часто выбирают как символ памяти или этапа жизни',
			'Композиции с текстом — цветочный мотив хорошо сочетается с надписями',
			'Масштаб от мини до крупного — мотив гибко адаптируется к зоне',
		],
		variations: [
			{
				id: 'var-rose-traditional-arm',
				title: 'Traditional роза на руке',
				description:
					'Цветные розы с баннерами — классический traditional на предплечье.',
				image: withAlt('rose01', 'Цветная тату роза на предплечье'),
			},
			{
				id: 'var-rose-fineline',
				title: 'Fine-line роза',
				description:
					'Тонкий контур розы рядом с портретом — лаконичный современный вариант.',
				image: withAlt('rose02', 'Fine-line роза и портрет на плече'),
			},
			{
				id: 'var-rose-minimal-back',
				title: 'Минималистичная роза',
				description:
					'Контурная роза на верхней части спины — много воздуха вокруг мотива.',
				image: withAlt('rose03', 'Минималистичная роза на верхней части спины'),
			},
			{
				id: 'var-rose-wrist',
				title: 'Роза на запястье',
				description:
					'Компактный формат на запястье — типичный масштаб для мини-розы.',
				image: withAlt('rose05', 'Небольшая роза на запястье'),
			},
		],
		bodyPartSlugs: ['forearm', 'wrist', 'shoulder', 'chest'],
		styleSlugs: ['linework', 'minimalism', 'realism', 'blackwork'],
		relatedSlugs: ['wolf', 'snake'],
		designIds: [
			'design-rose-traditional',
			'design-rose-fineline',
			'design-rose-minimal',
			'design-rose-otatu',
		],
		tryOnDesignSlug: 'rose-transparent',
		galleryImages: [
			withAlt('rose01', 'Цветная тату роза на предплечье'),
			withAlt('rose02', 'Fine-line роза и портрет на плече'),
			withAlt('rose03', 'Минималистичная роза на верхней части спины'),
			withAlt('rose04', 'Розовая цветочная тату на спине'),
			withAlt('tryonRose', 'Роза — эскиз OTATU'),
		],
		image: withAlt('rose01', 'Цветная тату роза на предплечье'),
	},
]

export function getMotifBySlug(slug: string): Motif | undefined {
	return motifs.find((motif) => motif.slug === slug)
}

export function getRelatedMotifs(slugs: string[]): Motif[] {
	return slugs
		.map((slug) => getMotifBySlug(slug))
		.filter((motif): motif is Motif => Boolean(motif))
}

/** Returns slugs for static generation of motif pages. */
export function getMotifSlugs(): string[] {
	return motifs.map((motif) => motif.slug)
}

/**
 * Default try-on design slug for a motif page.
 * Returns null when no suitable transparent bundled design exists.
 */
export function getMotifDefaultDesignSlug(slug: string): string | null {
	return getMotifBySlug(slug)?.tryOnDesignSlug ?? null
}
