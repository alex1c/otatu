/** Supported locale codes — only `ru` has content in Phase 1A. */
export type Locale = 'ru' | 'en'

/** Tattoo design record for gallery cards and catalog listings. */
export interface TattooDesign {
	id: string
	slug: string
	title: string
	motifSlug: string
	styleSlug: string
	bodyPartSlug: string
	categorySlugs: string[]
	image: MediaAsset
	isPopular?: boolean
}

/** Motif (theme) page content — e.g. wolf, rose, dragon. */
export interface Motif {
	id: string
	slug: string
	title: string
	intro: string
	meanings: string[]
	variations: MotifVariation[]
	bodyPartSlugs: string[]
	styleSlugs: string[]
	relatedSlugs: string[]
	designIds: string[]
	image: MediaAsset
}

/** Named variation within a motif (e.g. wolf with moon). */
export interface MotifVariation {
	id: string
	title: string
	description: string
	image: MediaAsset
}

/** Browse category for chips and quick links. */
export interface Category {
	id: string
	slug: string
	label: string
	description?: string
	image?: MediaAsset
}

/** Tattoo style reference (minimalism, realism, etc.). */
export interface TattooStyle {
	id: string
	slug: string
	label: string
}

/** Body placement reference (arm, leg, etc.). */
export interface BodyPart {
	id: string
	slug: string
	label: string
}

/** Editorial article card for guides section. */
export interface Article {
	id: string
	slug: string
	title: string
	excerpt: string
	readTime: string
	image: MediaAsset
}

/** Curated collection row on the home page. */
export interface Collection {
	id: string
	slug: string
	title: string
	description: string
	designIds: string[]
}

/**
 * Media asset abstraction — local paths in Phase 1A,
 * object storage / CDN URLs in future content phases.
 */
export interface MediaAsset {
	id: string
	/** Resolved public path or absolute CDN URL. */
	src: string
	alt: string
	width: number
	height: number
	/** Future: S3 / object storage key. */
	storageKey?: string
	/** Future: override CDN origin for this asset. */
	cdnBase?: string
}
