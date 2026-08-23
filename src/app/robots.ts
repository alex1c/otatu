import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otatu.ru'

/** Robots.txt — allow indexing of RU content only. */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/ru/',
				disallow: ['/en/', '/api/'],
			},
		],
		sitemap: `${siteUrl}/sitemap.xml`,
	}
}
