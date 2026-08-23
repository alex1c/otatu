import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { getPopularDesigns } from '@/data/fixtures/designs'
import { isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getPlaceholder } from '@/data/fixtures/placeholders'
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
	const demoDesigns = getPopularDesigns().slice(0, 6)
	const previewImage = getPlaceholder('tryOnPreview')

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

			{/* Desktop: upload | preview | controls — mobile: preview first */}
			<div className="mt-6 try-on-grid gap-4 lg:gap-5">
				{/* Preview — dominant visual */}
				<section
					className="try-on-preview order-1 lg:order-2"
					aria-label={dictionary.tryOn.preview}
				>
					<p className="sr-only">{dictionary.tryOn.preview}</p>
					<div className="relative rounded-2xl overflow-hidden bg-bg-muted aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] lg:min-h-[480px] shadow-sm">
						<Image
							src={resolveImageUrl(previewImage)}
							alt={previewImage.alt}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 1024px) 100vw, 45vw"
						/>
					</div>
				</section>

				{/* Controls — secondary on desktop, second on mobile */}
				<section
					className="try-on-controls order-2 lg:order-3"
					aria-label={dictionary.tryOn.controls}
				>
					<p className="text-xs text-text-muted mb-2 lg:mb-3">
						{dictionary.tryOn.controls}
					</p>
					<div className="rounded-xl bg-bg-secondary/60 p-4 space-y-4">
						<ControlSlider label={dictionary.tryOn.opacity} value={70} />
						<ControlSlider label={dictionary.tryOn.size} value={50} />
						<ControlSlider label={dictionary.tryOn.rotate} value={0} />
						<button
							type="button"
							disabled
							className="w-full rounded-full bg-accent/40 py-2.5 text-sm text-text-inverse cursor-not-allowed"
						>
							{dictionary.tryOn.save}
						</button>
					</div>
				</section>

				{/* Upload — quietest panel */}
				<section
					className="try-on-upload order-4 lg:order-1"
					aria-label={dictionary.tryOn.step1}
				>
					<p className="text-xs text-text-muted mb-2 lg:mb-3">
						{dictionary.tryOn.step1}
					</p>
					<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-bg-secondary/40 p-6 min-h-[140px] lg:min-h-[200px] text-center">
						<UploadIcon />
						<p className="mt-3 text-xs text-text-muted">
							{dictionary.tryOn.uploadHint}
						</p>
					</div>
				</section>

				{/* Design selector — full width below on mobile */}
				<section className="try-on-selector order-3 lg:order-4 lg:col-span-3">
					<p className="text-xs text-text-muted mb-2">
						{dictionary.tryOn.selectDesign}
					</p>
					<div className="chips-scroll">
						{demoDesigns.map((design, index) => (
							<button
								key={design.id}
								type="button"
								className={`relative shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-colors ${index === 0 ? 'border-accent/60' : 'border-transparent opacity-80'}`}
								aria-label={design.title}
							>
								<Image
									src={resolveImageUrl(design.image)}
									alt={design.image.alt}
									fill
									className="object-cover"
									sizes="80px"
								/>
							</button>
						))}
					</div>
				</section>
			</div>

			<aside className="mt-8 rounded-xl bg-bg-secondary/50 p-4 flex gap-3">
				<LockIcon />
				<p className="text-xs text-text-muted leading-relaxed">
					{dictionary.tryOn.privacyNote}
				</p>
			</aside>
		</div>
	)
}

function ControlSlider({
	label,
	value,
}: {
	label: string
	value: number
}) {
	return (
		<div>
			<div className="flex justify-between text-[11px] text-text-muted mb-1.5">
				<span>{label}</span>
				<span>{value}%</span>
			</div>
			<div
				className="h-1 rounded-full bg-bg-muted"
				role="slider"
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={label}
			>
				<div
					className="h-full rounded-full bg-accent/30"
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	)
}

function UploadIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			className="text-text-muted/60"
			aria-hidden="true"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" y1="3" x2="12" y2="15" />
		</svg>
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
