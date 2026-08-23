import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { CTA } from '@/components/ui/cta'
import { LinkTagRow, buildLinkTags } from '@/components/ui/link-tag-row'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import {
	getDesignsByBodyPart,
	getDesignsForGallery,
} from '@/lib/content/design-filters'
import { getMotifBySlug } from '@/data/fixtures/motifs'
import { getStyleBySlug } from '@/data/fixtures/styles'
import {
	filterLiveBodyLinks,
	filterLiveStyleSlugs,
} from '@/lib/content/live-routes'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import type { BodyLanding } from '@/data/fixtures/landing-pages'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'

interface BodyPageContentProps {
	locale: Locale
	page: BodyLanding
	dictionary: Dictionary
}

/** Body placement archetype — arm, forearm, etc. */
export function BodyPageContent({
	locale,
	page,
	dictionary,
}: BodyPageContentProps) {
	const designs = getDesignsForGallery(getDesignsByBodyPart(page.slug))

	const breadcrumbItems = [
		{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
		{ label: 'Места', href: `/${locale}/body/arm` },
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
						{page.overview}
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

			{page.subAreas.length > 0 && (
				<section className="mt-6">
					<LinkTagRow
						label="Зоны руки"
						tags={buildLinkTags(
							locale,
							filterLiveBodyLinks(page.subAreas),
						)}
					/>
				</section>
			)}

			{page.practicalNotes.length > 0 && (
				<section className="mt-8 max-w-2xl">
					<h2 className="font-brand text-lg font-semibold tracking-tight mb-3">
						Практические советы
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
					Идеи для этой зоны
				</h2>
				<TattooGallery
					designs={designs}
					locale={locale}
					layout="editorial"
					priorityCount={4}
				/>
			</section>

			<div className="mt-10 md:mt-12 grid gap-6 sm:grid-cols-2">
				<LinkTagRow
					label="Мотивы"
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
			</div>

			{page.relatedCollections.length > 0 && (
				<section className="mt-8">
					<h2 className="text-sm font-medium text-text-muted mb-3">
						Подборки
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
					title="Примерь тату на фото"
					primaryLabel={dictionary.home.tryTattoo}
					primaryHref={`/${locale}/try-tattoo`}
					variant="dark"
				/>
			</div>
		</article>
	)
}
