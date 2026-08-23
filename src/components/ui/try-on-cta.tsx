import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getPlaceholder } from '@/data/fixtures/placeholders'

interface TryOnCTAProps {
	locale: Locale
	title: string
	subtitle: string
	buttonLabel: string
}

/** Large visual try-on promotion block with preview imagery. */
export function TryOnCTA({
	locale,
	title,
	subtitle,
	buttonLabel,
}: TryOnCTAProps) {
	const previewImage = getPlaceholder('tryOnPreview')

	return (
		<section className="relative overflow-hidden rounded-2xl bg-bg-secondary">
			<div className="grid md:grid-cols-2 md:items-center">
				<div className="p-8 md:p-12">
					<h2 className="font-brand text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
						{title}
					</h2>
					<p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
						{subtitle}
					</p>
					<Link
						href={`/${locale}/try-tattoo`}
						className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-inverse hover:bg-accent-soft transition-colors min-h-[44px]"
					>
						{buttonLabel}
					</Link>
				</div>
				<div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[200px] bg-bg-muted">
					<Image
						src={resolveImageUrl(previewImage)}
						alt={previewImage.alt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</div>
			</div>
		</section>
	)
}
