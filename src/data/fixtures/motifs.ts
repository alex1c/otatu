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
		tryOnDesignSlug: 'wolf-minimal',
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
				id: 'var-snake-blackwork',
				title: 'Blackwork змея',
				description:
					'Контрастная змея с крупными элементами — читается на руке и предплечье.',
				image: withAlt('design06', 'Змея blackwork на руке'),
			},
			{
				id: 'var-snake-floral',
				title: 'Змея и цветы',
				description:
					'Змея в цветочной композиции — мягкий контраст к чешуе и линиям.',
				image: withAlt(
					'design06',
					'Змея и цветы — blackwork композиция на руке',
				),
			},
		],
		bodyPartSlugs: ['arm', 'forearm', 'shoulder', 'chest'],
		styleSlugs: ['blackwork', 'linework', 'traditional', 'dotwork'],
		relatedSlugs: ['wolf', 'rose'],
		designIds: ['design-snake-blackwork'],
		// design-06 is a skin photo, not a transparent sketch — do not deep-link it.
		tryOnDesignSlug: null,
		galleryImages: [
			withAlt('design06', 'Змея blackwork на руке'),
			withAlt('collArm', 'Тату на руке — пример размещения'),
			withAlt('design08', 'Надписи на руке — соседний формат для этой зоны'),
		],
		image: withAlt('design06', 'Змея blackwork на руке'),
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
				id: 'var-rose-floral-arm',
				title: 'Цветы на руке',
				description:
					'Цветочная композиция на руке — близкий визуальный контекст к мотиву розы.',
				image: withAlt(
					'design06',
					'Цветочная композиция на руке (в паре со змеёй)',
				),
			},
			{
				id: 'var-rose-small-wrist',
				title: 'Маленький символ на запястье',
				description:
					'Компактный формат на запястье — типичный масштаб для мини-розы.',
				image: withAlt(
					'collMeaning',
					'Маленькая тату на запястье — пример масштаба',
				),
			},
			{
				id: 'var-rose-minimal-arm',
				title: 'Минимализм на руке',
				description:
					'Тонкая линия и много воздуха — частый подход к маленьким цветочным эскизам.',
				image: withAlt(
					'design05',
					'Минималистичная тату на руке — пример fine-line масштаба',
				),
			},
		],
		bodyPartSlugs: ['forearm', 'wrist', 'shoulder', 'chest'],
		styleSlugs: ['linework', 'minimalism', 'realism', 'blackwork'],
		relatedSlugs: ['wolf', 'snake'],
		// No dedicated rose sketch in the current media set — avoid false design cards.
		designIds: [],
		tryOnDesignSlug: null,
		galleryImages: [
			withAlt(
				'design06',
				'Цветочная композиция на руке — визуальный контекст для розы',
			),
			withAlt('collMeaning', 'Маленькая тату на запястье'),
			withAlt('hero03', 'Минималистичная line-art тату на руке'),
		],
		image: withAlt(
			'design06',
			'Цветочная композиция на руке — визуальный контекст для розы',
		),
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
