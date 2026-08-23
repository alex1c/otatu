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

/** Step indicator for the try-on flow prototype. */
function StepIndicator({
	step,
	title,
	description,
	isActive,
}: {
	step: number
	title: string
	description: string
	isActive: boolean
}) {
	return (
		<div
			className={`flex gap-3 rounded-xl p-4 transition-colors ${isActive ? 'bg-bg-elevated border border-border-subtle' : 'opacity-60'}`}
		>
			<span
				className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${isActive ? 'bg-accent text-text-inverse' : 'bg-bg-muted text-text-muted'}`}
			>
				{step}
			</span>
			<div>
				<p className="text-sm font-medium text-text-primary">{title}</p>
				<p className="mt-0.5 text-xs text-text-muted">{description}</p>
			</div>
		</div>
	)
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
		<div className="container-app py-8 md:py-12">
			<Breadcrumbs
				items={[
					{ label: dictionary.common.breadcrumbHome, href: `/${locale}` },
					{ label: dictionary.tryOn.title },
				]}
			/>

			<header className="mt-6 max-w-2xl">
				<div className="flex items-center gap-3">
					<h1 className="font-brand text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
						{dictionary.tryOn.title}
					</h1>
					<span className="rounded-full bg-bg-muted px-3 py-1 text-xs font-medium text-text-muted">
						{dictionary.tryOn.comingSoon}
					</span>
				</div>
				<p className="mt-4 text-base text-text-secondary leading-relaxed">
					{dictionary.tryOn.subtitle}
				</p>
			</header>

			{/* 3-step flow overview */}
			<div className="mt-8 grid gap-3 sm:grid-cols-3">
				<StepIndicator
					step={1}
					title={dictionary.tryOn.step1}
					description={dictionary.tryOn.step1Desc}
					isActive
				/>
				<StepIndicator
					step={2}
					title={dictionary.tryOn.step2}
					description={dictionary.tryOn.step2Desc}
					isActive={false}
				/>
				<StepIndicator
					step={3}
					title={dictionary.tryOn.step3}
					description={dictionary.tryOn.step3Desc}
					isActive={false}
				/>
			</div>

			{/* Main editor shell — upload + preview + controls */}
			<div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr_280px]">
				{/* Upload area */}
				<section aria-label={dictionary.tryOn.step1}>
					<h2 className="text-sm font-medium text-text-primary mb-3">
						{dictionary.tryOn.step1}
					</h2>
					<div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-strong bg-bg-secondary p-8 min-h-[240px] text-center">
						<UploadIcon />
						<p className="mt-4 text-sm font-medium text-text-primary">
							{dictionary.tryOn.upload}
						</p>
						<p className="mt-1 text-xs text-text-muted">
							{dictionary.tryOn.uploadHint}
						</p>
						<button
							type="button"
							disabled
							className="mt-4 rounded-full bg-accent/50 px-5 py-2 text-sm font-medium text-text-inverse cursor-not-allowed"
						>
							{dictionary.tryOn.comingSoon}
						</button>
					</div>
				</section>

				{/* Preview canvas placeholder */}
				<section aria-label={dictionary.tryOn.preview}>
					<h2 className="text-sm font-medium text-text-primary mb-3">
						{dictionary.tryOn.preview}
					</h2>
					<div className="relative rounded-2xl overflow-hidden bg-bg-muted aspect-[4/5] sm:aspect-[3/4]">
						<Image
							src={resolveImageUrl(previewImage)}
							alt={previewImage.alt}
							fill
							className="object-cover opacity-80"
							sizes="(max-width: 1024px) 100vw, 40vw"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<p className="rounded-full bg-bg-elevated/90 px-4 py-2 text-xs text-text-muted backdrop-blur-sm">
								Canvas preview placeholder
							</p>
						</div>
					</div>
				</section>

				{/* Controls placeholder */}
				<section aria-label={dictionary.tryOn.controls}>
					<h2 className="text-sm font-medium text-text-primary mb-3">
						{dictionary.tryOn.controls}
					</h2>
					<div className="rounded-2xl bg-bg-secondary p-5 space-y-5">
						<ControlSlider label={dictionary.tryOn.opacity} value={70} />
						<ControlSlider label={dictionary.tryOn.size} value={50} />
						<ControlSlider label={dictionary.tryOn.rotate} value={0} />
						<button
							type="button"
							disabled
							className="w-full rounded-full bg-accent/50 py-3 text-sm font-medium text-text-inverse cursor-not-allowed"
						>
							{dictionary.tryOn.save}
						</button>
					</div>
				</section>
			</div>

			{/* Design selection row */}
			<section className="mt-10">
				<h2 className="text-sm font-medium text-text-primary mb-3">
					{dictionary.tryOn.selectDesign}
				</h2>
				<div className="chips-scroll">
					{demoDesigns.map((design, index) => (
						<button
							key={design.id}
							type="button"
							className={`relative shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden border-2 transition-colors ${index === 0 ? 'border-accent' : 'border-transparent'}`}
							aria-label={design.title}
						>
							<Image
								src={resolveImageUrl(design.image)}
								alt={design.image.alt}
								fill
								className="object-cover"
								sizes="96px"
							/>
						</button>
					))}
				</div>
			</section>

			{/* Privacy note */}
			<aside className="mt-10 rounded-xl bg-bg-secondary p-5 flex gap-3">
				<LockIcon />
				<p className="text-sm text-text-secondary leading-relaxed">
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
			<div className="flex justify-between text-xs text-text-muted mb-2">
				<span>{label}</span>
				<span>{value}%</span>
			</div>
			<div
				className="h-1.5 rounded-full bg-bg-muted"
				role="slider"
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={label}
			>
				<div
					className="h-full rounded-full bg-accent/40"
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	)
}

function UploadIcon() {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			className="text-text-muted"
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
			width="20"
			height="20"
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
