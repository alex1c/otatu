import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { TryOnSpikeLoader } from '@/components/try-on/try-on-spike-loader'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import type { Locale } from '@/types/content'

interface TryOnPageProps {
	params: Promise<{ locale: string }>
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

export default async function TryOnPage({ params }: TryOnPageProps) {
	const { locale: localeParam } = await params

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
				<div className="flex items-center gap-2">
					<h1 className="font-brand text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
						{dictionary.tryOn.title}
					</h1>
					<span className="rounded-full bg-bg-muted px-2.5 py-0.5 text-[10px] font-medium text-text-muted uppercase tracking-wide">
						{dictionary.tryOn.comingSoon}
					</span>
				</div>
				<p className="mt-2 text-sm text-text-muted leading-relaxed">
					{dictionary.tryOn.subtitle}
				</p>
			</header>

			<TryOnSpikeLoader
				labels={{
					upload: dictionary.tryOn.step1,
					uploadHint: dictionary.tryOn.uploadHint,
					preview: dictionary.tryOn.preview,
					controls: dictionary.tryOn.controls,
					opacity: dictionary.tryOn.opacity,
					size: dictionary.tryOn.size,
					rotate: dictionary.tryOn.rotate,
					save: dictionary.tryOn.save,
					reset: dictionary.tryOn.reset,
					proofNote: dictionary.tryOn.proofNote,
				}}
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
