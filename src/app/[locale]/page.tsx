import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/ui/hero'
import { SectionHeading } from '@/components/ui/section-heading'
import { CategoryChip } from '@/components/ui/category-chip'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { TryOnCTA } from '@/components/ui/try-on-cta'
import { EditorialCard } from '@/components/ui/editorial-card'
import { CollectionRow } from '@/components/ui/collection-row'
import { categories } from '@/data/fixtures/categories'
import { getPopularDesigns, getDesignsByIds } from '@/data/fixtures/designs'
import { collections, articles } from '@/data/fixtures/articles'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
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

	return (
		<>
			<Hero locale={locale} dictionary={dictionary} />

			{/* Quick categories — horizontal scroll chips */}
			<section className="container-app pb-10 md:pb-14">
				<SectionHeading title={dictionary.home.quickCategories} />
				<div className="chips-scroll">
					{categories.map((category) => (
						<CategoryChip
							key={category.id}
							label={category.label}
							href={`/${locale}/tattoo?category=${category.slug}`}
						/>
					))}
				</div>
			</section>

			{/* Curated collections */}
			<section className="container-app pb-10 md:pb-14 space-y-10">
				<SectionHeading
					title={dictionary.home.collections}
					viewAllHref={`/${locale}/tattoo`}
					viewAllLabel={dictionary.common.viewAll}
				/>
				{collections.map((collection) => (
					<CollectionRow
						key={collection.id}
						collection={collection}
						designs={getDesignsByIds(collection.designIds)}
						locale={locale}
					/>
				))}
			</section>

			{/* Popular sketches masonry gallery */}
			<section className="container-app pb-12 md:pb-16">
				<SectionHeading
					title={dictionary.home.popularSketches}
					viewAllHref={`/${locale}/tattoo`}
					viewAllLabel={dictionary.common.viewAll}
				/>
				<TattooGallery
					designs={popularDesigns}
					locale={locale}
					priorityCount={4}
				/>
			</section>

			{/* Try-on CTA block */}
			<section className="container-app pb-12 md:pb-16">
				<TryOnCTA
					locale={locale}
					title={dictionary.home.tryOnBlockTitle}
					subtitle={dictionary.home.tryOnBlockSubtitle}
					buttonLabel={dictionary.home.tryTattoo}
				/>
			</section>

			{/* Editorial guides */}
			<section className="container-app pb-16 md:pb-24">
				<SectionHeading title={dictionary.home.guides} />
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<EditorialCard key={article.id} article={article} />
					))}
				</div>
			</section>
		</>
	)
}
