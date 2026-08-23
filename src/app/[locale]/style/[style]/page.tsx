import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StylePageContent } from '@/components/pages/style-page-content'
import {
	getStyleLanding,
	getStyleLandingSlugs,
} from '@/data/fixtures/landing-pages'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import type { Locale } from '@/types/content'

interface StylePageProps {
	params: Promise<{ locale: string; style: string }>
}

export async function generateStaticParams() {
	return getStyleLandingSlugs().map((style) => ({ style }))
}

export async function generateMetadata({
	params,
}: StylePageProps): Promise<Metadata> {
	const { locale: localeParam, style } = await params
	if (!isActiveLocale(localeParam)) return {}

	const page = getStyleLanding(style)
	if (!page) return {}

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: page.title,
		description: page.metaDescription,
		path: page.path,
		ogImage: page.coverImage.src,
	})
}

export default async function StyleLandingPage({ params }: StylePageProps) {
	const { locale: localeParam, style } = await params
	if (!isActiveLocale(localeParam)) notFound()

	const page = getStyleLanding(style)
	if (!page) notFound()

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)

	return (
		<StylePageContent locale={locale} page={page} dictionary={dictionary} />
	)
}
