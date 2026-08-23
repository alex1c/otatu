import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ImageViewer } from '@/components/ui/image-viewer'
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
		<article className="container-app py-8 md:py-12">
			<Breadcrumbs
				items={[
					{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
					{ label: dictionary.common.ideas, href: `/${locale}/tattoo` },
					{ label: motif.title },
				]}
			/>

			<div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
				<ImageViewer image={motif.image} priority />

				<header>
					<h1 className="font-brand text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
						{motif.title}
					</h1>
					<p className="mt-4 text-base text-text-secondary leading-relaxed">
						{motif.intro}
					</p>
				</header>
			</div>

			{/* Meanings */}
			<section className="mt-12 md:mt-16">
				<h2 className="font-brand text-xl sm:text-2xl font-semibold tracking-tight mb-4">
					{dictionary.motif.meanings}
				</h2>
				<ul className="grid gap-3 sm:grid-cols-2">
					{motif.meanings.map((meaning) => (
						<li
							key={meaning}
							className="rounded-xl bg-bg-secondary p-4 text-sm text-text-secondary leading-relaxed"
						>
							{meaning}
						</li>
					))}
				</ul>
			</section>

			{/* Gallery of designs for this motif */}
			<section className="mt-12 md:mt-16">
				<h2 className="font-brand text-xl sm:text-2xl font-semibold tracking-tight mb-6">
					Эскизы
				</h2>
				<TattooGallery designs={designs} locale={locale} />
			</section>

			{/* Variations */}
			<section className="mt-12 md:mt-16">
				<h2 className="font-brand text-xl sm:text-2xl font-semibold tracking-tight mb-6">
					{dictionary.motif.variations}
				</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{motif.variations.map((variation) => (
						<figure
							key={variation.id}
							className="rounded-xl overflow-hidden bg-bg-elevated"
						>
							<div className="relative aspect-[4/5] bg-bg-muted">
								<Image
									src={resolveImageUrl(variation.image)}
									alt={variation.image.alt}
									fill
									className="object-cover"
									sizes="(max-width: 640px) 50vw, 25vw"
								/>
							</div>
							<figcaption className="p-4">
								<h3 className="font-medium text-text-primary text-sm">
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

			{/* Suitable places & styles */}
			<div className="mt-12 md:mt-16 grid gap-8 sm:grid-cols-2">
				<TagRow
					label={dictionary.motif.suitablePlaces}
					tags={bodyParts.map((part) => part.label)}
				/>
				<TagRow
					label={dictionary.motif.suitableStyles}
					tags={styles.map((style) => style.label)}
				/>
			</div>

			{/* Related motifs */}
			{related.length > 0 && (
				<section className="mt-12 md:mt-16">
					<h2 className="font-brand text-xl sm:text-2xl font-semibold tracking-tight mb-6">
						{dictionary.motif.related}
					</h2>
					<div className="flex flex-wrap gap-3">
						{related.map((relatedMotif) => (
							<Link
								key={relatedMotif.id}
								href={`/${locale}/tattoo/${relatedMotif.slug}`}
								className="inline-flex items-center rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
							>
								{relatedMotif.title}
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Try-on CTA */}
			<div className="mt-12 md:mt-16">
				<CTA
					title={`${dictionary.motif.tryMotif} ${motif.title.replace('Тату ', '')}`}
					primaryLabel={dictionary.home.tryTattoo}
					primaryHref={`/${locale}/try-tattoo`}
					variant="dark"
				/>
			</div>
		</article>
	)
}
