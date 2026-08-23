import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { TryOnEditorLoader } from '@/components/try-on/try-on-editor-loader'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import type { Locale } from '@/types/content'

interface TryOnPageProps {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ design?: string }>
}

export async function generateMetadata({
	params,
}: TryOnPageProps): Promise<Metadata> {
	const { locale: localeParam } = await params

	if (!isActiveLocale(localeParam)) return {}

	const dictionary = getDictionary(localeParam as Locale)

	return buildPageMetadata({
		locale: localeParam as Locale,
		title: dictionary.tryOn.title,
		description: dictionary.tryOn.subtitle,
		path: '/try-tattoo',
	})
}

export default async function TryOnPage({
	params,
	searchParams,
}: TryOnPageProps) {
	const { locale: localeParam } = await params
	const { design: designSlug } = await searchParams

	if (!isActiveLocale(localeParam)) {
		notFound()
	}

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)

	return (
		<div className="container-app py-6 md:py-10">
			<Breadcrumbs
				items={[
					{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
					{ label: dictionary.tryOn.title },
				]}
			/>

			<header className="mt-4 max-w-xl">
				<h1 className="font-brand text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
					{dictionary.tryOn.title}
				</h1>
				<p className="mt-2 text-sm text-text-muted leading-relaxed">
					{dictionary.tryOn.subtitle}
				</p>
			</header>

			<TryOnEditorLoader
				dictionary={dictionary}
				initialDesignSlug={designSlug ?? null}
			/>

			<aside className="mt-8 rounded-xl bg-bg-secondary/50 p-4 flex gap-3">
				<LockIcon />
				<p className="text-xs text-text-muted leading-relaxed">
					{dictionary.tryOn.privacyNote}
				</p>
			</aside>
		</div>
	)
}

function LockIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			className="shrink-0 text-text-muted mt-0.5"
			aria-hidden="true"
		>
			<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
			<path d="M7 11V7a5 5 0 0 1 10 0v4" />
		</svg>
	)
}
