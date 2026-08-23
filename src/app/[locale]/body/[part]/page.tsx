import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BodyPageContent } from '@/components/pages/body-page-content'
import {
	getBodyLanding,
	getBodyLandingSlugs,
} from '@/data/fixtures/landing-pages'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import type { Locale } from '@/types/content'

interface BodyPageProps {
	params: Promise<{ locale: string; part: string }>
}

export async function generateStaticParams() {
	return getBodyLandingSlugs().map((part) => ({ part }))
}

export async function generateMetadata({
	params,
}: BodyPageProps): Promise<Metadata> {
	const { locale: localeParam, part } = await params
	if (!isActiveLocale(localeParam)) return {}

	const page = getBodyLanding(part)
	if (!page) return {}

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: page.title,
		description: page.metaDescription,
		path: page.path,
		ogImage: page.coverImage.src,
	})
}

export default async function BodyPartPage({ params }: BodyPageProps) {
	const { locale: localeParam, part } = await params
	if (!isActiveLocale(localeParam)) notFound()

	const page = getBodyLanding(part)
	if (!page) notFound()

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)

	return (
		<BodyPageContent locale={locale} page={page} dictionary={dictionary} />
	)
}
