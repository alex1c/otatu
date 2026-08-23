import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CatalogClient } from '@/app/[locale]/tattoo/catalog-client'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import type { Locale } from '@/types/content'

interface CatalogPageProps {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({
	params,
}: CatalogPageProps): Promise<Metadata> {
	const { locale: localeParam } = await params

	if (!isActiveLocale(localeParam)) return {}

	const dictionary = getDictionary(localeParam as Locale)

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: dictionary.catalog.title,
		description: dictionary.catalog.intro,
		path: '/tattoo',
	})
}

export default async function CatalogPage({ params }: CatalogPageProps) {
	const { locale: localeParam } = await params

	if (!isActiveLocale(localeParam)) {
		notFound()
	}

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)

	return (
		<CatalogClient
			locale={locale}
			title={dictionary.catalog.title}
			intro={dictionary.catalog.intro}
			filtersLabel={dictionary.catalog.filters}
			loadMoreLabel={dictionary.catalog.loadMore}
			resultsLabel={dictionary.catalog.results}
		/>
	)
}
