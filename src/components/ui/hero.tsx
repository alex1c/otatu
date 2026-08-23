import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getPlaceholder } from '@/data/fixtures/placeholders'

interface HeroProps {
	locale: Locale
	dictionary: Dictionary
}

/** Visual-first hero with editorial typography and collage imagery. */
export function Hero({ locale, dictionary }: HeroProps) {
	const heroImage = getPlaceholder('heroCollage')

	return (
		<section className="relative overflow-hidden">
			<div className="container-app py-10 md:py-16 lg:py-20">
				<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
					<div className="max-w-xl">
						<h1 className="font-brand text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-text-primary">
							{dictionary.home.heroTitle}
						</h1>
						<p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed">
							{dictionary.home.heroSubtitle}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href={`/${locale}/tattoo`}
								className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-inverse hover:bg-accent-soft transition-colors min-h-[44px]"
							>
								{dictionary.home.findIdeas}
							</Link>
							<Link
								href={`/${locale}/try-tattoo`}
								className="inline-flex items-center justify-center rounded-full border border-border-strong bg-bg-elevated px-6 py-3 text-sm font-medium text-text-primary hover:bg-bg-secondary transition-colors min-h-[44px]"
							>
								{dictionary.home.tryTattoo}
							</Link>
						</div>
					</div>

					<div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-bg-muted">
						<Image
							src={resolveImageUrl(heroImage)}
							alt={heroImage.alt}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
