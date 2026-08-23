import Link from 'next/link'
import Image from 'next/image'
import type { TattooDesign } from '@/types/content'
import type { Locale } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getStyleBySlug } from '@/data/fixtures/styles'
import { getBodyPartBySlug } from '@/data/fixtures/body-parts'

interface TattooCardProps {
	design: TattooDesign
	locale: Locale
	showTryOn?: boolean
	priority?: boolean
}

/** Gallery card for a single tattoo design sketch. */
export function TattooCard({
	design,
	locale,
	showTryOn = true,
	priority = false,
}: TattooCardProps) {
	const style = getStyleBySlug(design.styleSlug)
	const bodyPart = getBodyPartBySlug(design.bodyPartSlug)
	const motifHref = `/${locale}/tattoo/${design.motifSlug}`

	return (
		<article className="group relative overflow-hidden rounded-xl bg-bg-elevated">
			<Link href={motifHref} className="block">
				<div className="relative overflow-hidden bg-bg-muted">
					<Image
						src={resolveImageUrl(design.image)}
						alt={design.image.alt}
						width={design.image.width}
						height={design.image.height}
						className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
						priority={priority}
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
					/>
				</div>
			</Link>

			<div className="p-3 sm:p-4">
				<Link href={motifHref}>
					<h3 className="text-sm font-medium text-text-primary line-clamp-1 hover:underline">
						{design.title}
					</h3>
				</Link>
				<div className="mt-1.5 flex flex-wrap gap-1.5">
					{style && (
						<span className="text-xs text-text-muted">{style.label}</span>
					)}
					{bodyPart && (
						<>
							<span className="text-xs text-text-muted" aria-hidden="true">
								·
							</span>
							<span className="text-xs text-text-muted">{bodyPart.label}</span>
						</>
					)}
				</div>

				<div className="mt-3 flex items-center justify-between gap-2">
					<button
						type="button"
						className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-strong transition-colors"
						aria-label="В избранное"
					>
						<HeartIcon />
					</button>
					{showTryOn && (
						<Link
							href={`/${locale}/try-tattoo`}
							className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors py-2 px-1 min-h-[36px] flex items-center"
						>
							Примерить
						</Link>
					)}
				</div>
			</div>
		</article>
	)
}

function HeartIcon() {
	return (
		<svg
			width="16"
			height="16"
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
