import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { VisualComposition } from '@/components/ui/visual-composition'
import { TagRow } from '@/components/ui/tag-row'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { CTA } from '@/components/ui/cta'
import {
	getMotifBySlug,
	getMotifSlugs,
	getRelatedMotifs,
} from '@/data/fixtures/motifs'
import { getDesignsByMotif } from '@/data/fixtures/designs'
import { getStylesBySlugs } from '@/data/fixtures/styles'
import { getBodyPartsBySlugs } from '@/data/fixtures/body-parts'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import type { Locale } from '@/types/content'

interface MotifPageProps {
	params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
	const slugs = getMotifSlugs()
	return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
	params,
}: MotifPageProps): Promise<Metadata> {
	const { locale: localeParam, slug } = await params

	if (!isActiveLocale(localeParam)) return {}

	const motif = getMotifBySlug(slug)
	if (!motif) return {}

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: motif.title,
		description: motif.intro,
		path: `/tattoo/${slug}`,
		ogImage: motif.image.src,
	})
}

export default async function MotifPage({ params }: MotifPageProps) {
	const { locale: localeParam, slug } = await params

	if (!isActiveLocale(localeParam)) {
		notFound()
	}

	const motif = getMotifBySlug(slug)

	if (!motif) {
		notFound()
	}

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)
	const designs = getDesignsByMotif(slug)
	const styles = getStylesBySlugs(motif.styleSlugs)
	const bodyParts = getBodyPartsBySlugs(motif.bodyPartSlugs)
	const related = getRelatedMotifs(motif.relatedSlugs)

	return (
		<article className="container-app py-6 md:py-10">
			<Breadcrumbs
				items={[
					{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
					{ label: dictionary.common.ideas, href: `/${locale}/tattoo` },
					{ label: motif.title },
				]}
			/>

			{/* Editorial header — text compact, visuals follow immediately */}
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

			{/* Visual composition — inspiration-first */}
			<section className="mt-6 md:mt-8" aria-label="Галерея вдохновения">
				<VisualComposition images={motif.galleryImages} priority />
			</section>

			{/* Meanings — structured but compact */}
			<section className="mt-10 md:mt-12">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-4">
					Что означает {motif.title.replace('Тату ', '').toLowerCase()}
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

			{/* Ideas gallery — large visual block */}
			<section className="mt-10 md:mt-12">
				<h2 className="font-brand text-lg sm:text-xl font-semibold tracking-tight mb-4 md:mb-5">
					Идеи тату с {motif.title.replace('Тату ', '').toLowerCase()}
				</h2>
				<TattooGallery
					designs={designs}
					locale={locale}
					layout="editorial"
					priorityCount={3}
				/>
			</section>

			{/* Variations — image-led cards, minimal caption */}
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
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			<div className="mt-10 md:mt-12 grid gap-6 sm:grid-cols-2">
				<TagRow
					label={dictionary.motif.suitableStyles}
					tags={styles.map((style) => style.label)}
				/>
				<TagRow
					label={dictionary.motif.suitablePlaces}
					tags={bodyParts.map((part) => part.label)}
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
					title={`${dictionary.motif.tryMotif} ${motif.title.replace('Тату ', '').toLowerCase()}`}
					primaryLabel={dictionary.home.tryTattoo}
					primaryHref={`/${locale}/try-tattoo`}
					variant="dark"
				/>
			</div>
		</article>
	)
}
