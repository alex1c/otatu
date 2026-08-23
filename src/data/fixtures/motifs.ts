import type { Motif } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Motif pages content — shared archetype for Wave A motifs. */
export const motifs: Motif[] = [
	{
		id: 'motif-wolf',
		slug: 'wolf',
		title: 'Тату волк',
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
		intro:
			'Змея — гибкий мотив с сильным визуальным ритмом. Подходит для обвивающих композиций на руке, предплечье и плече.',
		semanticTags: ['Трансформация', 'Защита', 'Цикличность', 'Сила'],
		meanings: [
			'Трансформация и обновление — ассоциация со сменой «кожи»',
			'Защита и инстинкт — образ хищника, который держит дистанцию',
			'Цикличность — линия змеи хорошо повторяет изгибы тела',
			'Сила без лишней агрессии — мотив может быть и спокойным, и драматичным',
		],
		variations: [
			{
				id: 'var-snake-blackwork',
				title: 'Blackwork змея',
				description: 'Контрастная змея с крупными элементами на руке.',
				image: getPlaceholder('design06'),
			},
			{
				id: 'var-snake-linework',
				title: 'Fine-line змея',
				description: 'Тонкий контур — аккуратный формат для предплечья.',
				image: getPlaceholder('design04'),
			},
			{
				id: 'var-snake-floral',
				title: 'Змея и цветы',
				description: 'Сочетание змеи с ботаническими элементами.',
				image: getPlaceholder('design06'),
			},
			{
				id: 'var-snake-coiled',
				title: 'Coiled snake',
				description: 'Обвивающая композиция вдоль руки.',
				image: getPlaceholder('hero01'),
			},
		],
		bodyPartSlugs: ['arm', 'forearm', 'shoulder', 'chest'],
		styleSlugs: ['blackwork', 'linework', 'traditional', 'dotwork'],
		relatedSlugs: ['wolf', 'rose'],
		designIds: ['design-snake-blackwork', 'design-arm-linework'],
		galleryImages: [
			getPlaceholder('design06'),
			getPlaceholder('hero01'),
			getPlaceholder('design04'),
		],
		image: getPlaceholder('design06'),
	},
	{
		id: 'motif-rose',
		slug: 'rose',
		title: 'Тату роза',
		intro:
			'Роза — универсальный мотив для тату: от минималистичного контурa до детализированных композиций с листьями и надписями.',
		semanticTags: ['Красота', 'Контраст', 'Память', 'Нежность'],
		meanings: [
			'Красота и контраст — мягкий мотив с выразительным силуэтом',
			'Личная история — часто выбирают как символ памяти или этапа жизни',
			'Композиции с текстом — роза хорошо сочетается с надписями',
			'Масштаб от мини до крупного — мотив гибко адаптируется к зоне',
		],
		variations: [
			{
				id: 'var-rose-linework',
				title: 'Fine-line роза',
				description: 'Тонкий контур и лёгкая графика.',
				image: getPlaceholder('design10'),
			},
			{
				id: 'var-rose-botanical',
				title: 'Ботаническая роза',
				description: 'Роза в окружении листьев и ботаники.',
				image: getPlaceholder('design01'),
			},
			{
				id: 'var-rose-lettering',
				title: 'Роза и надпись',
				description: 'Сочетание цветочного мотива с текстом.',
				image: getPlaceholder('design10'),
			},
			{
				id: 'var-rose-minimal',
				title: 'Минималистичная роза',
				description: 'Небольшой символ на запястье или предплечье.',
				image: getPlaceholder('collMeaning'),
			},
		],
		bodyPartSlugs: ['forearm', 'wrist', 'shoulder', 'chest'],
		styleSlugs: ['linework', 'minimalism', 'realism', 'blackwork'],
		relatedSlugs: ['wolf', 'snake'],
		designIds: ['design-rose-linework', 'design-botanical-back'],
		galleryImages: [
			getPlaceholder('design10'),
			getPlaceholder('collMeaning'),
			getPlaceholder('design05'),
		],
		image: getPlaceholder('design10'),
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

/** Default try-on design slug per motif page. */
export function getMotifDefaultDesignSlug(slug: string): string {
	const defaults: Record<string, string> = {
		wolf: 'wolf-minimal',
		snake: 'snake-blackwork',
		rose: 'rose-linework',
	}
	return defaults[slug] ?? 'wolf-minimal'
}
