import type { MediaAsset } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

export interface LandingLink {
	label: string
	/** Path without locale prefix, e.g. /body/forearm */
	path: string
}

export interface CollectionLanding {
	slug: string
	path: string
	title: string
	metaDescription: string
	intro: string
	framingNote: string
	practicalNotes: string[]
	categorySlugs: string[]
	coverImage: MediaAsset
	relatedMotifSlugs: string[]
	relatedStyleSlugs: string[]
	relatedBodyPartSlugs: string[]
	relatedCollections: LandingLink[]
}

export interface BodyLanding {
	slug: string
	path: string
	title: string
	metaDescription: string
	intro: string
	overview: string
	practicalNotes: string[]
	subAreas: LandingLink[]
	coverImage: MediaAsset
	relatedMotifSlugs: string[]
	relatedStyleSlugs: string[]
	relatedCollections: LandingLink[]
}

export interface StyleLanding {
	slug: string
	path: string
	title: string
	metaDescription: string
	intro: string
	characteristics: string[]
	coverImage: MediaAsset
	relatedMotifSlugs: string[]
	relatedBodyPartSlugs: string[]
	relatedCollections: LandingLink[]
}

/** Wave A collection landing pages — content lives here, not in components. */
export const collectionLandings: CollectionLanding[] = [
	{
		slug: 'small-tattoos',
		path: '/small-tattoos',
		title: 'Маленькие тату',
		metaDescription:
			'Идеи маленьких и мини-тату: эскизы, места нанесения и стили. Визуальный каталог OTATU.',
		intro:
			'Маленькие тату — способ начать с аккуратного, лаконичного образа. Здесь собраны идеи, которые хорошо читаются в компактном формате.',
		framingNote:
			'Подборка показывает популярные маленькие решения — без жёстких правил «можно / нельзя».',
		practicalNotes: [
			'Слишком мелкие детали со временем могут терять чёткость — проще работает чистый контур.',
			'Запястье, лодыжка и за ухом — частые зоны для мини-формата.',
			'Fine-line и минимализм чаще всего выбирают для маленьких эскизов.',
		],
		categorySlugs: ['small'],
		// SMALL MEDIA REMEDIATION: coll-small shows low-quality doodles — replaced with
		// hero01 (fine-line botanical) which shows quality small tattoo format.
		// SMALL MEDIA GAP: need 2–3 photos of quality small tattoos (flower, bird, geometric).
		// See docs/MEDIA_GAPS.md.
		coverImage: getPlaceholder('hero01'),
		relatedMotifSlugs: ['wolf', 'rose', 'anchor', 'moon'],
		relatedStyleSlugs: ['minimalism', 'linework'],
		relatedBodyPartSlugs: ['forearm', 'wrist', 'ankle'],
		relatedCollections: [
			{ label: 'Для девушек', path: '/tattoo-for-women' },
			{ label: 'Для мужчин', path: '/tattoo-for-men' },
		],
	},
	{
		slug: 'tattoo-for-women',
		path: '/tattoo-for-women',
		title: 'Тату для девушек',
		metaDescription:
			'Идеи тату для девушек: эскизы, стили и места нанесения. Визуальный каталог OTATU.',
		intro:
			'Подборка популярных визуальных решений — от минимализма до символичных мотивов. Это ориентир, а не список «строго женских» символов.',
		framingNote:
			'Любой мотив может подойти любому человеку — здесь собраны частые визуальные предпочтения и удачные форматы.',
		practicalNotes: [
			'Маленькие тату на запястье и предплечье часто выбирают за аккуратный масштаб.',
			'Fine-line и минимализм хорошо сочетаются с лёгкими, воздушными эскизами.',
			'Перед сеансом стоит обсудить с мастером, как эскиз будет смотреться на вашей коже.',
		],
		categorySlugs: ['for-women'],
		// WOMEN MEDIA REMEDIATION: hero02 shows cartoon cow tattoo (inappropriate).
		// Replaced with hero03 (fine-line two-face tattoo — relevant, quality).
		coverImage: getPlaceholder('hero03'),
		relatedMotifSlugs: ['rose', 'wolf', 'bird'],
		relatedStyleSlugs: ['minimalism', 'linework'],
		relatedBodyPartSlugs: ['wrist', 'forearm', 'shoulder'],
		relatedCollections: [
			{ label: 'Маленькие тату', path: '/small-tattoos' },
			{ label: 'Минимализм', path: '/style/minimalism' },
		],
	},
	{
		slug: 'tattoo-for-men',
		path: '/tattoo-for-men',
		title: 'Тату для мужчин',
		metaDescription:
			'Идеи тату для мужчин: эскизы, стили и места нанесения. Визуальный каталог OTATU.',
		intro:
			'Визуальные идеи для рук, предплечий и крупных форматов — от графики до реализма. Подборка помогает сузить поиск, а не задаёт жёсткие рамки.',
		framingNote:
			'Мотивы не делятся на «мужские» и «женские» — здесь собраны популярные решения и удачные пропорции.',
		practicalNotes: [
			'Предплечье и плечо дают достаточно места для детализированных эскизов.',
			'Blackwork и геометрия часто выбирают за контраст и читаемость.',
			'Крупный формат лучше планировать с мастером заранее — с учётом анатомии.',
		],
		categorySlugs: ['for-men'],
		coverImage: getPlaceholder('hero01'),
		relatedMotifSlugs: ['wolf', 'snake', 'dragon'],
		relatedStyleSlugs: ['blackwork', 'realism', 'geometric'],
		relatedBodyPartSlugs: ['arm', 'forearm', 'chest'],
		relatedCollections: [
			{ label: 'Маленькие тату', path: '/small-tattoos' },
			{ label: 'Тату на руке', path: '/body/arm' },
		],
	},
]

export const bodyLandings: BodyLanding[] = [
	{
		slug: 'arm',
		path: '/body/arm',
		title: 'Тату на руке',
		metaDescription:
			'Идеи тату на руке: эскизы, стили и зоны нанесения. Предплечье, запястье, плечо.',
		intro:
			'Рука — одна из самых популярных зон для тату. Здесь удобно размещать как маленькие символы, так и крупные композиции.',
		overview:
			'Верхняя часть руки, предплечье и запястье дают разный масштаб и ритм. Маленькие эскизы чаще идут на запястье, более детальные — на предплечье.',
		practicalNotes: [
			'Длинные композиции хорошо смотрятся вдоль предплечья.',
			'Запястье подходит для минималистичных символов.',
			'При активном образе жизни стоит учитывать зону сгиба и частоту солнечного света.',
		],
		subAreas: [{ label: 'Предплечье', path: '/body/forearm' }],
		// ARM MEDIA REMEDIATION: coll-arm (Eye of Ra, small symbol) was "WEAK" per review.
		// design06 (snake+flowers blackwork wrapping full arm) demonstrates the diversity
		// and scale potential of arm tattoos more compellingly.
		coverImage: getPlaceholder('design06'),
		relatedMotifSlugs: ['wolf', 'snake', 'rose'],
		relatedStyleSlugs: ['minimalism', 'linework', 'blackwork'],
		relatedCollections: [
			{ label: 'Маленькие тату', path: '/small-tattoos' },
			{ label: 'Для мужчин', path: '/tattoo-for-men' },
		],
	},
	{
		slug: 'forearm',
		path: '/body/forearm',
		title: 'Тату на предплечье',
		metaDescription:
			'Идеи тату на предплечье: эскизы, стили и визуальные примеры для внутренней и внешней стороны.',
		intro:
			'Предплечье — универсальная зона: сюда хорошо ложатся вертикальные композиции, надписи и средние по размеру мотивы.',
		overview:
			'Внутренняя сторона часто выбирают для более личных символов, внешняя — для заметных графических решений.',
		practicalNotes: [
			'Вертикальный формат эскиза часто лучше повторяет линию руки.',
			'Fine-line хорошо смотрится на предплечье при достаточном контрасте линий.',
			'Перед сеансом стоит примерить масштаб на фото — инструмент Try-On поможет.',
		],
		subAreas: [{ label: 'Рука', path: '/body/arm' }],
		coverImage: getPlaceholder('design04'),
		relatedMotifSlugs: ['wolf', 'snake', 'rose'],
		relatedStyleSlugs: ['minimalism', 'linework'],
		relatedCollections: [
			{ label: 'Маленькие тату', path: '/small-tattoos' },
			{ label: 'Минимализм', path: '/style/minimalism' },
		],
	},
]

export const styleLandings: StyleLanding[] = [
	{
		slug: 'minimalism',
		path: '/style/minimalism',
		title: 'Минималистичные тату',
		metaDescription:
			'Идеи минималистичных тату: тонкие линии, простые формы и аккуратные эскизы.',
		intro:
			'Минимализм в тату — это чистые линии, лаконичные формы и акцент на силуэте, а не на детализации.',
		characteristics: [
			'Тонкие контуры и много «воздуха» вокруг мотива',
			'Небольшой масштаб и простые геометрические или символические формы',
			'Часто сочетается с запястьем, предплечьем и мини-форматом',
		],
		coverImage: getPlaceholder('hero03'),
		relatedMotifSlugs: ['wolf', 'rose', 'anchor'],
		relatedBodyPartSlugs: ['wrist', 'forearm', 'ankle'],
		relatedCollections: [
			{ label: 'Маленькие тату', path: '/small-tattoos' },
			{ label: 'Для девушек', path: '/tattoo-for-women' },
		],
	},
]

export function getCollectionLanding(
	slug: string,
): CollectionLanding | undefined {
	return collectionLandings.find((page) => page.slug === slug)
}

export function getBodyLanding(slug: string): BodyLanding | undefined {
	return bodyLandings.find((page) => page.slug === slug)
}

export function getStyleLanding(slug: string): StyleLanding | undefined {
	return styleLandings.find((page) => page.slug === slug)
}

export function getCollectionSlugs(): string[] {
	return collectionLandings.map((page) => page.slug)
}

export function getBodyLandingSlugs(): string[] {
	return bodyLandings.map((page) => page.slug)
}

export function getStyleLandingSlugs(): string[] {
	return styleLandings.map((page) => page.slug)
}
