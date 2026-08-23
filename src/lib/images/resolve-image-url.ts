import type { MediaAsset } from '@/types/content'

/**
 * Resolves the public URL for a media asset.
 * Phase 1A uses local `/public` paths; future phases prepend CDN base.
 */
export function resolveImageUrl(asset: MediaAsset): string {
	if (asset.src.startsWith('http')) {
		return asset.src
	}

	if (asset.cdnBase) {
		return `${asset.cdnBase.replace(/\/$/, '')}/${asset.src.replace(/^\//, '')}`
	}

	return asset.src
}
