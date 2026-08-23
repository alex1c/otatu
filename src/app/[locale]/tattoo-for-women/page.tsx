import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CollectionPageContent } from '@/components/pages/collection-page-content'
import { getCollectionLanding } from '@/data/fixtures/landing-pages'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import type { Locale } from '@/types/content'

const SLUG = 'tattoo-for-women'

interface PageProps {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale: localeParam } = await params
	if (!isActiveLocale(localeParam)) return {}

	const page = getCollectionLanding(SLUG)
	if (!page) return {}

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: page.title,
		description: page.metaDescription,
		path: page.path,
		ogImage: page.coverImage.src,
	})
}

export default async function TattooForWomenPage({ params }: PageProps) {
	const { locale: localeParam } = await params
	if (!isActiveLocale(localeParam)) notFound()

	const page = getCollectionLanding(SLUG)
	if (!page) notFound()

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)

	return (
		<CollectionPageContent
			locale={locale}
			page={page}
			dictionary={dictionary}
		/>
	)
}
