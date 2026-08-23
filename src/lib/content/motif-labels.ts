import type { GalleryVariant } from '@/types/content'

/** Maps motif slugs to short Russian display labels for discovery cards. */
const motifLabels: Record<string, string> = {
	wolf: 'Волк',
	rose: 'Роза',
	moon: 'Луна',
	snake: 'Змея',
	bird: 'Птица',
	text: 'Надпись',
	dragon: 'Дракон',
	flower: 'Цветок',
	compass: 'Компас',
	anchor: 'Якорь',
}

/** Returns a human-readable motif name from its slug. */
export function getMotifLabel(slug: string): string {
	return motifLabels[slug] ?? slug
}

/** Tailwind aspect-ratio class per gallery variant. */
export function getGalleryAspectClass(
	variant: GalleryVariant = 'portrait',
): string {
	const map: Record<GalleryVariant, string> = {
		portrait: 'aspect-[4/5]',
		tall: 'aspect-[3/5]',
		square: 'aspect-square',
		landscape: 'aspect-[5/4]',
	}
	return map[variant]
}

/** Masonry span classes for editorial rhythm in CSS grid galleries. */
export function getGalleryGridClass(
	variant: GalleryVariant = 'portrait',
): string {
	const map: Record<GalleryVariant, string> = {
		portrait: '',
		tall: 'gallery-item-tall',
		square: 'gallery-item-square',
		landscape: 'gallery-item-landscape',
	}
	return map[variant]
}
