import type { MetadataRoute } from 'next'
import { activeLocales } from '@/lib/i18n/config'
import { getMotifSlugs } from '@/data/fixtures/motifs'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otatu.ru'

/** Sitemap foundation — only active locale routes with real content. */
export default function sitemap(): MetadataRoute.Sitemap {
	const motifSlugs = getMotifSlugs()
	const staticPaths = ['', '/tattoo', '/try-tattoo']

	const entries: MetadataRoute.Sitemap = []

	for (const locale of activeLocales) {
		for (const path of staticPaths) {
			entries.push({
				url: `${siteUrl}/${locale}${path}`,
				lastModified: new Date(),
				changeFrequency: path === '' ? 'weekly' : 'monthly',
				priority: path === '' ? 1 : 0.8,
			})
		}

		for (const slug of motifSlugs) {
			entries.push({
				url: `${siteUrl}/${locale}/tattoo/${slug}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.7,
			})
		}
	}

	return entries
}
