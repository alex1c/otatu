import type { Metadata } from 'next'
import type { Locale } from '@/types/content'
import { activeLocales } from '@/lib/i18n/config'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otatu.ru'

interface PageMetadataOptions {
	locale: Locale
	title: string
	description: string
	path: string
	ogImage?: string
	noIndex?: boolean
}

/** Builds consistent page metadata with hreflang-ready alternates. */
export function buildPageMetadata({
	locale,
	title,
	description,
	path,
	ogImage = '/images/placeholders/hero-collage.svg',
	noIndex = false,
}: PageMetadataOptions): Metadata {
	const canonicalPath = `/${locale}${path}`
	const canonicalUrl = `${siteUrl}${canonicalPath}`

	const languages: Record<string, string> = {}

	for (const activeLocale of activeLocales) {
		languages[activeLocale] = `${siteUrl}/${activeLocale}${path}`
	}

	return {
		title: `${title} | OTATU`,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages,
		},
		openGraph: {
			title: `${title} | OTATU`,
			description,
			url: canonicalUrl,
			siteName: 'OTATU',
			locale: locale === 'ru' ? 'ru_RU' : 'en_US',
			type: 'website',
			images: [
				{
					url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		robots: noIndex
			? { index: false, follow: false }
			: { index: true, follow: true },
	}
}

export { siteUrl }
