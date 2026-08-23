import type { MetadataRoute } from 'next'
import { activeLocales } from '@/lib/i18n/config'
import { getMotifSlugs } from '@/data/fixtures/motifs'
import {
	collectionLandings,
	bodyLandings,
	styleLandings,
} from '@/data/fixtures/landing-pages'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otatu.ru'

/** Wave A routes with production-quality content — sitemap only. */
export default function sitemap(): MetadataRoute.Sitemap {
	const motifSlugs = getMotifSlugs()
	const staticPaths = ['', '/tattoo', '/try-tattoo']

	const collectionPaths = collectionLandings.map((page) => page.path)
	const bodyPaths = bodyLandings.map((page) => page.path)
	const stylePaths = styleLandings.map((page) => page.path)

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

		for (const path of collectionPaths) {
			entries.push({
				url: `${siteUrl}/${locale}${path}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.75,
			})
		}

		for (const path of bodyPaths) {
			entries.push({
				url: `${siteUrl}/${locale}${path}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.75,
			})
		}

		for (const path of stylePaths) {
			entries.push({
				url: `${siteUrl}/${locale}${path}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.75,
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
