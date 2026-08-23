import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/ui/hero'
import { DiscoveryChips } from '@/components/ui/discovery-chips'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { TryOnCTA } from '@/components/ui/try-on-cta'
import { EditorialCard } from '@/components/ui/editorial-card'
import { CollectionGrid } from '@/components/ui/collection-grid'
import { categories } from '@/data/fixtures/categories'
import { getPopularDesigns, getDesignsByIds } from '@/data/fixtures/designs'
import { collections, articles } from '@/data/fixtures/articles'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import { getCategoryHref } from '@/lib/content/live-routes'
import type { Locale } from '@/types/content'

interface HomePageProps {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({
	params,
}: HomePageProps): Promise<Metadata> {
	const { locale: localeParam } = await params

	if (!isActiveLocale(localeParam)) return {}

	const dictionary = getDictionary(localeParam as Locale)

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: dictionary.brand.tagline,
		description: dictionary.home.heroSubtitle,
		path: '',
	})
}

export default async function HomePage({ params }: HomePageProps) {
	const { locale: localeParam } = await params

	if (!isActiveLocale(localeParam)) {
		notFound()
	}

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)
	const popularDesigns = getPopularDesigns()

	const designsByCollection = new Map(
		collections.map((collection) => [
			collection.id,
			getDesignsByIds(collection.designIds),
		]),
	)

	return (
		<>
			<Hero locale={locale} dictionary={dictionary} />

			{/* Compact discovery chips — navigation aid, not a section */}
			<div className="container-app pb-6 md:pb-8">
				<DiscoveryChips
					items={categories.map((category) => ({
						label: category.label,
						href: getCategoryHref(locale, category.slug),
					}))}
				/>
			</div>

			{/* Image-led collections */}
			<section className="container-app pb-8 md:pb-10">
				<CollectionGrid
					collections={collections}
					designsByCollection={designsByCollection}
					locale={locale}
				/>
			</section>

			{/* Main discovery gallery — central visual element */}
			<section className="container-app pb-10 md:pb-14">
				<div className="flex items-baseline justify-between gap-4 mb-4 md:mb-5">
					<h2 className="font-brand text-xl sm:text-2xl font-semibold tracking-tight">
						{dictionary.home.popularSketches}
					</h2>
					<Link
						href={`/${locale}/tattoo`}
						className="text-xs sm:text-sm text-text-muted hover:text-text-primary transition-colors shrink-0"
					>
						{dictionary.common.viewAll}
					</Link>
				</div>
				<TattooGallery
					designs={popularDesigns}
					locale={locale}
					priorityCount={4}
					layout="editorial"
				/>
			</section>

			<section className="container-app pb-10 md:pb-14">
				<TryOnCTA
					locale={locale}
					title={dictionary.home.tryOnBlockTitle}
					subtitle={dictionary.home.tryOnBlockSubtitle}
					buttonLabel={dictionary.home.tryTattoo}
				/>
			</section>

			{/* Editorial — pushed below visual discovery */}
			<section className="container-app pb-14 md:pb-20">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-5 text-text-secondary">
					{dictionary.home.guides}
				</h2>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<EditorialCard key={article.id} article={article} />
					))}
				</div>
			</section>
		</>
	)
}
