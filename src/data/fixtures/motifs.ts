import type { Motif } from '@/types/content'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Motif pages content — wolf is the Phase 1A reference page. */
export const motifs: Motif[] = [
	{
		id: 'motif-wolf',
		slug: 'wolf',
		title: 'Тату волк',
		intro:
			'Волк — один из самых популярных мотивов в тату-культуре. Сильный, узнаваемый символ свободы, верности и инстинкта.',
		semanticTags: ['Свобода', 'Сила', 'Верность', 'Независимость'],
		meanings: [
			'Свобода и независимость — волк как символ жизни вне стадных правил',
			'Верность и защита семьи — образ вожака стаи',
			'Инстинкт и внутренняя сила — связь с природой и первобытной энергией',
			'Одиночество и путь — «lone wolf» как метафора собственного пути',
		],
		variations: [
			{
				id: 'var-wolf-moon',
				title: 'Волк с луной',
				description:
					'Классическое сочетание: волк и лунная фаза. Подчёркивает ночную, мистическую энергию мотива.',
				image: getPlaceholder('wolfMoon'),
			},
			{
				id: 'var-wolf-snarl',
				title: 'Оскал волка',
				description:
					'Агрессивная, мощная подача — акцент на защиту территории и внутреннюю силу.',
				image: getPlaceholder('wolfSnarl'),
			},
			{
				id: 'var-wolf-geo',
				title: 'Геометрический волк',
				description:
					'Волк в геометрической стилистике — современный, графичный вариант.',
				image: getPlaceholder('wolfGeo'),
			},
			{
				id: 'var-wolf-minimal',
				title: 'Волк минимализм',
				description:
					'Лаконичный силуэт или контур — идеален для маленькой тату.',
				image: getPlaceholder('wolfMinimal'),
			},
		],
		bodyPartSlugs: ['forearm', 'shoulder', 'chest', 'back', 'wrist'],
		styleSlugs: ['realism', 'minimalism', 'geometric', 'blackwork'],
		relatedSlugs: ['moon', 'snake', 'bird'],
		designIds: [
			'design-wolf-realism',
			'design-wolf-minimal',
			'design-wolf-geo',
		],
		// Only unmistakable wolf visuals — stock process shot + generated designs.
		galleryImages: [
			getPlaceholder('wolfGallery01'),
			getPlaceholder('wolfSnarl'),
			getPlaceholder('wolfGallery03'),
		],
		image: getPlaceholder('wolfHero'),
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
