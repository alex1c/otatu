import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { VisualComposition } from '@/components/ui/visual-composition'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { CTA } from '@/components/ui/cta'
import { LinkTagRow, buildLinkTags } from '@/components/ui/link-tag-row'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import { getDesignsByMotif } from '@/data/fixtures/designs'
import { getStylesBySlugs } from '@/data/fixtures/styles'
import { getBodyPartsBySlugs } from '@/data/fixtures/body-parts'
import { getRelatedMotifs, getMotifBySlug, getMotifDefaultDesignSlug } from '@/data/fixtures/motifs'
import { filterLiveBodyPartSlugs, filterLiveStyleSlugs } from '@/lib/content/live-routes'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'

interface MotifPageContentProps {
	locale: Locale
	slug: string
	dictionary: Dictionary
}

/** Shared motif archetype — wolf, snake, rose and future motifs. */
export function MotifPageContent({
	locale,
	slug,
	dictionary,
}: MotifPageContentProps) {
	const motif = getMotifBySlug(slug)
	if (!motif) return null

	const designs = getDesignsByMotif(slug)
	const styles = getStylesBySlugs(filterLiveStyleSlugs(motif.styleSlugs))
	const bodyParts = getBodyPartsBySlugs(filterLiveBodyPartSlugs(motif.bodyPartSlugs))
	const related = getRelatedMotifs(motif.relatedSlugs).filter((item) =>
		getMotifBySlug(item.slug),
	)

	const motifName = motif.title.replace('Тату ', '').toLowerCase()
	const defaultDesign = getMotifDefaultDesignSlug(slug)

	const breadcrumbItems = [
		{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
		{ label: dictionary.common.ideas, href: `/${locale}/tattoo` },
		{ label: motif.title },
	]

	return (
		<article className="container-app py-6 md:py-10">
			<BreadcrumbJsonLd locale={locale} items={breadcrumbItems} />
			<Breadcrumbs items={breadcrumbItems} />

			<header className="mt-4 max-w-2xl">
				<h1 className="font-brand text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
					{motif.title}
				</h1>
				<p className="mt-3 text-sm text-text-muted">
					{motif.semanticTags.join(' · ')}
				</p>
				<p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
					{motif.intro}
				</p>
			</header>

			<section className="mt-6 md:mt-8" aria-label="Галерея вдохновения">
				<VisualComposition images={motif.galleryImages} priority />
			</section>

			<section className="mt-10 md:mt-12">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-4">
					Что означает {motifName}
				</h2>
				<ul className="grid gap-2 sm:grid-cols-2">
					{motif.meanings.map((meaning) => (
						<li
							key={meaning}
							className="text-sm text-text-secondary leading-relaxed py-2 border-b border-border-subtle last:border-0"
						>
							{meaning}
						</li>
					))}
				</ul>
			</section>

			<section className="mt-10 md:mt-12">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-4 md:mb-5">
					Идеи тату с {motifName}
				</h2>
				<TattooGallery
					designs={designs}
					locale={locale}
					layout="editorial"
					priorityCount={3}
				/>
			</section>

			<section className="mt-10 md:mt-12">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-4">
					{dictionary.motif.variations}
				</h2>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
					{motif.variations.map((variation) => (
						<figure key={variation.id} className="group">
							<div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-muted">
								<Image
									src={resolveImageUrl(variation.image)}
									alt={variation.image.alt}
									fill
									className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
									sizes="(max-width: 640px) 50vw, 25vw"
								/>
							</div>
							<figcaption className="mt-2 px-0.5">
								<h3 className="text-xs sm:text-sm font-medium text-text-primary">
									{variation.title}
								</h3>
								<p className="mt-1 text-xs text-text-muted leading-relaxed">
									{variation.description}
								</p>
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			<div className="mt-10 md:mt-12 grid gap-6 sm:grid-cols-2">
				<LinkTagRow
					label={dictionary.motif.suitableStyles}
					tags={buildLinkTags(
						locale,
						styles.map((style) => ({
							label: style.label,
							path: `/style/${style.slug}`,
						})),
					)}
				/>
				<LinkTagRow
					label={dictionary.motif.suitablePlaces}
					tags={buildLinkTags(
						locale,
						bodyParts.map((part) => ({
							label: part.label,
							path: `/body/${part.slug}`,
						})),
					)}
				/>
			</div>

			{related.length > 0 && (
				<section className="mt-8">
					<h2 className="text-sm font-medium text-text-muted mb-3">
						{dictionary.motif.related}
					</h2>
					<div className="flex flex-wrap gap-2">
						{related.map((relatedMotif) => (
							<Link
								key={relatedMotif.id}
								href={`/${locale}/tattoo/${relatedMotif.slug}`}
								className="text-sm text-text-secondary hover:text-text-primary transition-colors"
							>
								{relatedMotif.title}
							</Link>
						))}
					</div>
				</section>
			)}

			<div className="mt-10 md:mt-12">
				<CTA
					title={`${dictionary.motif.tryMotif} ${motifName}`}
					primaryLabel="Примерить этот эскиз"
					primaryHref={`/${locale}/try-tattoo?design=${defaultDesign}`}
					variant="dark"
				/>
			</div>
		</article>
	)
}
