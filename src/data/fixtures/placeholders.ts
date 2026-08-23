import type { MediaAsset } from '@/types/content'

/** Placeholder palette — abstract skin/ink tones for demo SVGs. */
const placeholderAssets: Record<string, MediaAsset> = {
	wolfHero: {
		id: 'ph-wolf-hero',
		src: '/images/placeholders/wolf-hero.svg',
		alt: 'Эскиз татуировки волка — демо-изображение',
		width: 800,
		height: 1000,
	},
	wolfMoon: {
		id: 'ph-wolf-moon',
		src: '/images/placeholders/wolf-moon.svg',
		alt: 'Волк с луной — вариация эскиза',
		width: 600,
		height: 750,
	},
	wolfSnarl: {
		id: 'ph-wolf-snarl',
		src: '/images/placeholders/wolf-snarl.svg',
		alt: 'Волк с оскалом — вариация эскиза',
		width: 600,
		height: 750,
	},
	wolfGeo: {
		id: 'ph-wolf-geo',
		src: '/images/placeholders/wolf-geo.svg',
		alt: 'Геометрический волк — вариация эскиза',
		width: 600,
		height: 750,
	},
	wolfMinimal: {
		id: 'ph-wolf-minimal',
		src: '/images/placeholders/wolf-minimal.svg',
		alt: 'Минималистичный волк — вариация эскиза',
		width: 600,
		height: 750,
	},
	design01: {
		id: 'ph-design-01',
		src: '/images/placeholders/design-01.svg',
		alt: 'Эскиз тату — абстрактный мотив 1',
		width: 480,
		height: 600,
	},
	design02: {
		id: 'ph-design-02',
		src: '/images/placeholders/design-02.svg',
		alt: 'Эскиз тату — абстрактный мотив 2',
		width: 480,
		height: 600,
	},
	design03: {
		id: 'ph-design-03',
		src: '/images/placeholders/design-03.svg',
		alt: 'Эскиз тату — абстрактный мотив 3',
		width: 480,
		height: 600,
	},
	design04: {
		id: 'ph-design-04',
		src: '/images/placeholders/design-04.svg',
		alt: 'Эскиз тату — абстрактный мотив 4',
		width: 480,
		height: 600,
	},
	design05: {
		id: 'ph-design-05',
		src: '/images/placeholders/design-05.svg',
		alt: 'Эскиз тату — абстрактный мотив 5',
		width: 480,
		height: 600,
	},
	design06: {
		id: 'ph-design-06',
		src: '/images/placeholders/design-06.svg',
		alt: 'Эскиз тату — абстрактный мотив 6',
		width: 480,
		height: 600,
	},
	design07: {
		id: 'ph-design-07',
		src: '/images/placeholders/design-07.svg',
		alt: 'Эскиз тату — абстрактный мотив 7',
		width: 480,
		height: 600,
	},
	design08: {
		id: 'ph-design-08',
		src: '/images/placeholders/design-08.svg',
		alt: 'Эскиз тату — абстрактный мотив 8',
		width: 480,
		height: 600,
	},
	design09: {
		id: 'ph-design-09',
		src: '/images/placeholders/design-09.svg',
		alt: 'Эскиз тату — абстрактный мотив 9',
		width: 480,
		height: 600,
	},
	design10: {
		id: 'ph-design-10',
		src: '/images/placeholders/design-10.svg',
		alt: 'Эскиз тату — абстрактный мотив 10',
		width: 480,
		height: 600,
	},
	design11: {
		id: 'ph-design-11',
		src: '/images/placeholders/design-11.svg',
		alt: 'Эскиз тату — абстрактный мотив 11',
		width: 480,
		height: 600,
	},
	design12: {
		id: 'ph-design-12',
		src: '/images/placeholders/design-12.svg',
		alt: 'Эскиз тату — абстрактный мотив 12',
		width: 480,
		height: 600,
	},
	article01: {
		id: 'ph-article-01',
		src: '/images/placeholders/article-01.svg',
		alt: 'Как выбрать первую татуировку',
		width: 640,
		height: 400,
	},
	article02: {
		id: 'ph-article-02',
		src: '/images/placeholders/article-02.svg',
		alt: 'Больно ли делать тату',
		width: 640,
		height: 400,
	},
	article03: {
		id: 'ph-article-03',
		src: '/images/placeholders/article-03.svg',
		alt: 'Значение популярных символов',
		width: 640,
		height: 400,
	},
	heroCollage: {
		id: 'ph-hero-collage',
		src: '/images/placeholders/hero-collage.svg',
		alt: 'Коллаж эскизов тату — визуальное вдохновение',
		width: 1200,
		height: 800,
	},
	tryOnPreview: {
		id: 'ph-tryon-preview',
		src: '/images/placeholders/tryon-preview.svg',
		alt: 'Предпросмотр примерки тату',
		width: 800,
		height: 600,
	},
}

export function getPlaceholder(key: keyof typeof placeholderAssets): MediaAsset {
	return placeholderAssets[key]
}

export { placeholderAssets }
