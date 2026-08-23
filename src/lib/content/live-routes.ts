import {
	getBodyLandingSlugs,
	getStyleLandingSlugs,
} from '@/data/fixtures/landing-pages'

/** Filters body-part slugs to Wave A pages that actually exist. */
export function filterLiveBodyPartSlugs(slugs: string[]): string[] {
	const live = new Set(getBodyLandingSlugs())
	return slugs.filter((slug) => live.has(slug))
}

/** Filters style slugs to Wave A style landing pages. */
export function filterLiveStyleSlugs(slugs: string[]): string[] {
	const live = new Set(getStyleLandingSlugs())
	return slugs.filter((slug) => live.has(slug))
}

/** Keeps sub-area links that resolve to a live body landing route. */
export function filterLiveBodyLinks(
	items: { label: string; path: string }[],
): { label: string; path: string }[] {
	const live = new Set(getBodyLandingSlugs())
	return items.filter((item) => {
		const slug = item.path.replace(/^\/body\//, '')
		return live.has(slug)
	})
}

/** Maps home collection card slugs to Wave A routes. */
export function getCollectionHref(
	locale: string,
	collectionSlug: string,
): string {
	const routes: Record<string, string> = {
		'arm-tattoos': `/${locale}/body/arm`,
		'small-tattoos': `/${locale}/small-tattoos`,
		'meaningful-tattoos': `/${locale}/tattoo`,
	}
	return routes[collectionSlug] ?? `/${locale}/tattoo`
}

/** Maps category chip slugs to Wave A landing pages when available. */
export function getCategoryHref(locale: string, categorySlug: string): string {
	const routes: Record<string, string> = {
		'for-women': `/${locale}/tattoo-for-women`,
		'for-men': `/${locale}/tattoo-for-men`,
		small: `/${locale}/small-tattoos`,
		arm: `/${locale}/body/arm`,
		minimalism: `/${locale}/style/minimalism`,
	}
	return routes[categorySlug] ?? `/${locale}/tattoo?category=${categorySlug}`
}

/** All Wave A URLs (without locale prefix) for smoke/SEO tests. */
export const WAVE_A_PATHS = [
	'',
	'/tattoo',
	'/try-tattoo',
	'/small-tattoos',
	'/tattoo-for-women',
	'/tattoo-for-men',
	'/body/arm',
	'/body/forearm',
	'/style/minimalism',
	'/tattoo/wolf',
	'/tattoo/snake',
	'/tattoo/rose',
] as const
