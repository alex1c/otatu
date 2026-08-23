import type { Locale } from '@/types/content'

/**
 * Reusable page templates for OTATU landing pages.
 * Each archetype maps to one React layout — not one-off pages.
 */
export type PageArchetype =
	| 'home'
	| 'catalog'
	| 'motif'
	| 'body'
	| 'style'
	| 'collection'
	| 'lettering'
	| 'try-on'
	| 'article'

/** Audience segments for collection pages — maps to category slugs in fixtures. */
export type AudienceSlug = 'women' | 'men'

/** Short meaning block embedded in motif pages (not a standalone route in MVP). */
export interface MeaningSummary {
	motifSlug: string
	headline: string
	points: string[]
}

/** Extended collection definition for audience / size landing pages. */
export interface CollectionPage {
	id: string
	slug: string
	title: string
	description: string
	archetype: 'collection'
	/** Filter designs by category slug, e.g. for-women, small. */
	categorySlugs: string[]
	audienceSlug?: AudienceSlug
	relatedMotifSlugs: string[]
	relatedStyleSlugs: string[]
	relatedBodyPartSlugs: string[]
}

/** Registry entry for a planned or live landing page. */
export interface LaunchPage {
	/** Path without locale prefix, e.g. /tattoo/wolf */
	path: string
	locale: Locale
	archetype: PageArchetype
	primaryIntent: string
	secondaryIntents: string[]
	relatedPaths: string[]
	/** P2 = Phase 2 target; live = already shipped */
	status: 'live' | 'p2' | 'p3' | 'later'
}

/** Explicit internal link rule for SEO navigation graphs. */
export interface InternalLinkRule {
	fromArchetype: PageArchetype
	toPathPattern: string
	context: string
	maxLinks: number
}
