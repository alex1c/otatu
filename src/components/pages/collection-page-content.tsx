import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { CTA } from '@/components/ui/cta'
import { LinkTagRow, buildLinkTags } from '@/components/ui/link-tag-row'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import {
	getDesignsByCategory,
	getDesignsForGallery,
} from '@/lib/content/design-filters'
import { getMotifBySlug } from '@/data/fixtures/motifs'
import { getStyleBySlug } from '@/data/fixtures/styles'
import { getBodyPartBySlug } from '@/data/fixtures/body-parts'
import { filterLiveBodyPartSlugs, filterLiveStyleSlugs } from '@/lib/content/live-routes'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import type { CollectionLanding } from '@/data/fixtures/landing-pages'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'

interface CollectionPageContentProps {
	locale: Locale
	page: CollectionLanding
	dictionary: Dictionary
}

/** Collection archetype — small tattoos, women, men. */
export function CollectionPageContent({
	locale,
	page,
	dictionary,
}: CollectionPageContentProps) {
	const designs = getDesignsForGallery(
		getDesignsByCategory(page.categorySlugs[0]),
	)

	const breadcrumbItems = [
		{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
		{ label: dictionary.common.ideas, href: `/${locale}/tattoo` },
		{ label: page.title },
	]

	return (
		<article className="container-app py-6 md:py-10">
			<BreadcrumbJsonLd locale={locale} items={breadcrumbItems} />
			<Breadcrumbs items={breadcrumbItems} />

			<div className="mt-4 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
				<header className="max-w-2xl">
					<h1 className="font-brand text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
						{page.title}
					</h1>
					<p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
						{page.intro}
					</p>
					<p className="mt-3 text-sm text-text-muted leading-relaxed">
						{page.framingNote}
					</p>
				</header>
				<div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-2xl bg-bg-muted">
					<Image
						src={resolveImageUrl(page.coverImage)}
						alt={page.coverImage.alt}
						fill
						className="object-cover"
						priority
						sizes="320px"
					/>
				</div>
			</div>

			{page.practicalNotes.length > 0 && (
				<section className="mt-8 max-w-2xl">
					<h2 className="font-brand text-lg font-semibold tracking-tight mb-3">
						На что обратить внимание
					</h2>
					<ul className="space-y-2">
						{page.practicalNotes.map((note) => (
							<li
								key={note}
								className="text-sm text-text-secondary leading-relaxed"
							>
								{note}
							</li>
						))}
					</ul>
				</section>
			)}

			<section className="mt-10 md:mt-12">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-4 md:mb-5">
					Галерея идей
				</h2>
				<TattooGallery
					designs={designs}
					locale={locale}
					layout="editorial"
					priorityCount={4}
				/>
			</section>

			<div className="mt-10 md:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<LinkTagRow
					label="Популярные мотивы"
					tags={buildLinkTags(
						locale,
						page.relatedMotifSlugs
							.filter((slug) => getMotifBySlug(slug))
							.map((slug) => ({
								label: getMotifBySlug(slug)!.title.replace('Тату ', ''),
								path: `/tattoo/${slug}`,
							})),
					)}
				/>
				<LinkTagRow
					label="Стили"
					tags={buildLinkTags(
						locale,
						filterLiveStyleSlugs(page.relatedStyleSlugs).map((slug) => ({
							label: getStyleBySlug(slug)!.label,
							path: `/style/${slug}`,
						})),
					)}
				/>
				<LinkTagRow
					label="Места"
					tags={buildLinkTags(
						locale,
						filterLiveBodyPartSlugs(page.relatedBodyPartSlugs).map((slug) => ({
							label: getBodyPartBySlug(slug)!.label,
							path: `/body/${slug}`,
						})),
					)}
				/>
			</div>

			{page.relatedCollections.length > 0 && (
				<section className="mt-8">
					<h2 className="text-sm font-medium text-text-muted mb-3">
						Смотрите также
					</h2>
					<div className="flex flex-wrap gap-3">
						{page.relatedCollections.map((item) => (
							<Link
								key={item.path}
								href={`/${locale}${item.path}`}
								className="text-sm text-text-secondary hover:text-text-primary transition-colors"
							>
								{item.label}
							</Link>
						))}
					</div>
				</section>
			)}

			<div className="mt-10 md:mt-12">
				<CTA
					title="Примерь эскиз на своём фото"
					primaryLabel={dictionary.home.tryTattoo}
					primaryHref={`/${locale}/try-tattoo`}
					variant="dark"
				/>
			</div>
		</article>
	)
}
