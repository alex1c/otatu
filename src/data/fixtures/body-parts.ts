import type { BodyPart } from '@/types/content'

/** Body placement taxonomy for filters and motif pages. */
export const bodyParts: BodyPart[] = [
	{ id: 'bp-arm', slug: 'arm', label: 'Рука' },
	{ id: 'bp-forearm', slug: 'forearm', label: 'Предплечье' },
	{ id: 'bp-shoulder', slug: 'shoulder', label: 'Плечо' },
	{ id: 'bp-chest', slug: 'chest', label: 'Грудь' },
	{ id: 'bp-back', slug: 'back', label: 'Спина' },
	{ id: 'bp-leg', slug: 'leg', label: 'Нога' },
	{ id: 'bp-ankle', slug: 'ankle', label: 'Лодыжка' },
	{ id: 'bp-wrist', slug: 'wrist', label: 'Запястье' },
]

export function getBodyPartBySlug(slug: string): BodyPart | undefined {
	return bodyParts.find((part) => part.slug === slug)
}

export function getBodyPartsBySlugs(slugs: string[]): BodyPart[] {
	return slugs
		.map((slug) => getBodyPartBySlug(slug))
		.filter((part): part is BodyPart => Boolean(part))
}
