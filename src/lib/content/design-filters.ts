import type { TattooDesign } from '@/types/content'
import { designs } from '@/data/fixtures/designs'

/** Body-part groups for arm landing and filters. */
const ARM_GROUP = ['arm', 'forearm', 'wrist', 'shoulder'] as const

/** Returns designs matching a category slug. */
export function getDesignsByCategory(categorySlug: string): TattooDesign[] {
	return designs.filter((design) => design.categorySlugs.includes(categorySlug))
}

/** Returns designs for a tattoo style slug. */
export function getDesignsByStyle(styleSlug: string): TattooDesign[] {
	return designs.filter((design) => design.styleSlug === styleSlug)
}

/** Returns designs for a body placement slug, with arm group expansion. */
export function getDesignsByBodyPart(bodyPartSlug: string): TattooDesign[] {
	if (bodyPartSlug === 'arm') {
		return designs.filter((design) =>
			ARM_GROUP.includes(design.bodyPartSlug as (typeof ARM_GROUP)[number]),
		)
	}

	return designs.filter((design) => design.bodyPartSlug === bodyPartSlug)
}

/** Returns all designs for gallery fallbacks when filters are sparse. */
export function getDesignsForGallery(
	filtered: TattooDesign[],
	minCount = 4,
): TattooDesign[] {
	if (filtered.length >= minCount) return filtered
	const extras = designs.filter((design) => !filtered.includes(design))
	return [...filtered, ...extras].slice(0, Math.max(minCount, filtered.length))
}
