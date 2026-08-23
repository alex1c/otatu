import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MotifPageContent } from '@/components/pages/motif-page-content'
import { getMotifBySlug, getMotifSlugs } from '@/data/fixtures/motifs'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
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

	return (
		<MotifPageContent locale={locale} slug={slug} dictionary={dictionary} />
	)
}
