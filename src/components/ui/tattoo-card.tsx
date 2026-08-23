import Link from 'next/link'
import Image from 'next/image'
import type { TattooDesign } from '@/types/content'
import type { Locale } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getMotifLabel, getGalleryAspectClass } from '@/lib/content/motif-labels'
import { getStyleBySlug } from '@/data/fixtures/styles'
import { TRYON_CATALOG } from '@/lib/try-on/design-catalog'

interface TattooCardProps {
	design: TattooDesign
	locale: Locale
	showTryOn?: boolean
	priority?: boolean
	/** Discovery cards hide heavy metadata — image leads. */
	variant?: 'discovery' | 'compact'
}

/** Lightweight discovery card — image-first with minimal caption. */
export function TattooCard({
	design,
	locale,
	showTryOn = true,
	priority = false,
	variant = 'discovery',
}: TattooCardProps) {
	const style = getStyleBySlug(design.styleSlug)
	const motifHref = `/${locale}/tattoo/${design.motifSlug}`
	const motifLabel = getMotifLabel(design.motifSlug)
	const aspectClass = getGalleryAspectClass(design.galleryVariant)
	/** Only deep-link designs that exist as try-on overlays. */
	const isTryOnReady = TRYON_CATALOG.some((item) => item.slug === design.slug)
	const tryOnHref = isTryOnReady
		? `/${locale}/try-tattoo?design=${design.slug}`
		: `/${locale}/try-tattoo`

	return (
		<article className="group relative">
			<Link href={motifHref} className="block overflow-hidden rounded-xl bg-bg-muted">
				<div className={`relative ${aspectClass} overflow-hidden`}>
					<Image
						src={resolveImageUrl(design.image)}
						alt={design.image.alt}
						fill
						className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
						priority={priority}
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
					/>
				</div>
			</Link>

			{variant === 'discovery' && (
				<div className="mt-2 flex items-center justify-between gap-2 px-0.5">
					<Link
						href={motifHref}
						className="text-xs text-text-secondary hover:text-text-primary transition-colors truncate"
					>
						{motifLabel}
						{style && (
							<span className="text-text-muted"> · {style.label.toLowerCase()}</span>
						)}
					</Link>
					<div className="flex items-center gap-1 shrink-0">
						<button
							type="button"
							className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text-primary transition-colors"
							aria-label="В избранное"
						>
							<HeartIcon />
						</button>
						{showTryOn && (
							<Link
								href={tryOnHref}
								className="text-xs text-text-muted hover:text-text-primary transition-colors px-1 py-1"
							>
								Примерить
							</Link>
						)}
					</div>
				</div>
			)}

			{variant === 'compact' && (
				<Link href={motifHref} className="mt-1.5 block text-xs text-text-muted truncate">
					{design.title}
				</Link>
			)}
		</article>
	)
}

function HeartIcon() {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			aria-hidden="true"
		>
			<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
		</svg>
	)
}
