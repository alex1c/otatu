import type { MediaAsset } from '@/types/content'

/**
 * Production visual assets registry.
 * Paths point to processed WebP files in public/images/.
 */
const assets: Record<string, MediaAsset> = {
	hero01: {
		id: 'hero-01',
		src: '/images/hero/hero-01.webp',
		alt: 'Close-up of a fine-line arm tattoo',
		width: 1200,
		height: 1800,
	},
	hero02: {
		id: 'hero-02',
		// NOTE: hero-02 contains a small cartoon mascot tattoo on upper arm.
		// Not suitable as a featured hero — avoid using as primary cover for quality pages.
		src: '/images/hero/hero-02.webp',
		alt: 'Небольшая символичная тату на руке',
		width: 1200,
		height: 1800,
	},
	hero03: {
		id: 'hero-03',
		src: '/images/hero/hero-03.webp',
		alt: 'Minimalist line art tattoo on arm',
		width: 1000,
		height: 1498,
	},
	wolfHero: {
		id: 'wolf-g01',
		src: '/images/wolf/wolf-g01.webp',
		alt: 'Wolf tattoo being inked on forearm',
		width: 1200,
		height: 1800,
	},
	wolfGallery01: {
		id: 'wolf-g01',
		src: '/images/wolf/wolf-g01.webp',
		alt: 'Wolf tattoo process on arm',
		width: 1200,
		height: 1800,
	},
	wolfGallery02: {
		id: 'wolf-g02',
		src: '/images/wolf/wolf-g02.webp',
		alt: 'Healed wolf tattoo on skin',
		width: 900,
		height: 599,
	},
	wolfGallery03: {
		id: 'wolf-g03',
		src: '/images/wolf/wolf-g03.webp',
		alt: 'Geometric wolf tattoo design',
		width: 921,
		height: 1440,
	},
	wolfMoon: {
		id: 'wolf-moon',
		src: '/images/wolf/wolf-moon.webp',
		alt: 'Волк с луной — эскиз OTATU',
		width: 906,
		height: 1440,
	},
	wolfSnarl: {
		id: 'wolf-snarl',
		src: '/images/wolf/wolf-snarl.webp',
		alt: 'Волк с оскалом — эскиз OTATU',
		width: 888,
		height: 1440,
	},
	wolfGeo: {
		id: 'wolf-geo',
		src: '/images/wolf/wolf-geo.webp',
		alt: 'Геометрический волк — эскиз OTATU',
		width: 816,
		height: 1440,
	},
	wolfMinimal: {
		id: 'wolf-minimal',
		src: '/images/wolf/wolf-minimal.webp',
		alt: 'Минималистичный волк — эскиз OTATU',
		width: 870,
		height: 1440,
	},
	collArm: {
		id: 'coll-arm',
		src: '/images/collections/coll-arm.webp',
		alt: 'Подборка — тату на руке',
		width: 1600,
		height: 2133,
	},
	collSmall: {
		id: 'coll-small',
		// NOTE: coll-small shows three avant-garde small tattoos (abstract faces, fish, leg motif).
		// Identified as low-quality "doodle" content during Phase 3 review.
		// Not suitable as cover for small-tattoos or minimalism pages.
		// Kept in registry but removed from coverImage assignments.
		src: '/images/collections/coll-small.webp',
		alt: 'Маленькие авангардные тату на руке',
		width: 1200,
		height: 1800,
	},
	collMeaning: {
		id: 'coll-meaning',
		src: '/images/collections/coll-meaning.webp',
		alt: 'Подборка — символичная тату на запястье',
		width: 1200,
		height: 1800,
	},
	design01: {
		id: 'design-01',
		src: '/images/designs/design-01.webp',
		alt: 'Волк и ботаника на верхней части спины',
		width: 960,
		height: 639,
	},
	design02: {
		id: 'design-02',
		src: '/images/designs/design-02.webp',
		alt: 'Minimal wolf tattoo design',
		width: 800,
		height: 1200,
	},
	design03: {
		id: 'design-03',
		src: '/images/designs/design-03.webp',
		alt: 'Geometric wolf tattoo design',
		width: 762,
		height: 1425,
	},
	design04: {
		id: 'design-04',
		src: '/images/designs/design-04.webp',
		alt: 'Fine-line tattoo on forearm',
		width: 1200,
		height: 1800,
	},
	design05: {
		id: 'design-05',
		src: '/images/designs/design-05.webp',
		alt: 'Dotwork tattoo on back of arm',
		width: 960,
		height: 1440,
	},
	design06: {
		id: 'design-06',
		src: '/images/designs/design-06.webp',
		alt: 'Змея и цветы — blackwork на руке',
		width: 800,
		height: 1553,
	},
	design07: {
		id: 'design-07',
		src: '/images/designs/design-07.webp',
		alt: 'Bird linework tattoo design',
		width: 744,
		height: 1425,
	},
	design08: {
		id: 'design-08',
		src: '/images/designs/design-08.webp',
		alt: 'Script tattoos on arm in sunlight',
		width: 960,
		height: 1449,
	},
	design09: {
		id: 'design-09',
		src: '/images/designs/design-09.webp',
		alt: 'Traditional dragon tattoo design',
		width: 735,
		height: 1425,
	},
	design10: {
		id: 'design-10',
		src: '/images/designs/design-10.webp',
		alt: 'Надпись на ноге — lettering tattoo',
		width: 800,
		height: 1200,
	},
	design11: {
		id: 'design-11',
		src: '/images/designs/design-11.webp',
		alt: 'Geometric compass tattoo design',
		width: 732,
		height: 1425,
	},
	design12: {
		id: 'design-12',
		src: '/images/designs/design-12.webp',
		alt: 'Minimal anchor tattoo design',
		width: 729,
		height: 1425,
	},
	article01: {
		id: 'ph-article-01',
		src: '/images/placeholders/article-01.svg',
		alt: 'Как выбрать первую татуировку',
		width: 640,
		height: 400,
	},
	article02: {
		id: 'article-02',
		src: '/images/editorial/article-02.webp',
		alt: 'Процесс нанесения тату — мастер за работой',
		width: 1280,
		height: 1920,
	},
	article03: {
		id: 'ph-article-03',
		src: '/images/placeholders/article-03.svg',
		alt: 'Значение популярных символов',
		width: 640,
		height: 400,
	},
	tryOnPreview: {
		id: 'tryon-preview',
		src: '/images/tryon/tryon-preview.webp',
		alt: 'Чистая рука для примерки тату',
		width: 675,
		height: 1425,
	},
}

/** Returns a media asset by fixture key. */
export function getPlaceholder(key: keyof typeof assets): MediaAsset {
	return assets[key]
}

export { assets }
