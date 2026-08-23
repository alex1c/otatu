import Link from 'next/link'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'
import { HeroCollage } from '@/components/ui/hero-collage'

interface HeroProps {
	locale: Locale
	dictionary: Dictionary
}

/** Visual-first hero — editorial typography + overlapping image collage. */
export function Hero({ locale, dictionary }: HeroProps) {
	return (
		<section className="relative overflow-hidden">
			<div className="container-app pt-8 pb-4 md:pt-12 md:pb-6 lg:pt-14">
				<div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:items-center">
					<div className="max-w-lg order-2 lg:order-1">
						<h1 className="font-brand text-[2rem] sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-text-primary">
							{dictionary.home.heroTitle}
						</h1>
						<p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
							{dictionary.home.heroSubtitle}
						</p>
						<div className="mt-6 flex flex-wrap gap-2.5">
							<Link
								href={`/${locale}/tattoo`}
								className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-text-inverse hover:bg-accent-soft transition-colors min-h-[44px]"
							>
								{dictionary.home.findIdeas}
							</Link>
							<Link
								href={`/${locale}/try-tattoo`}
								className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors min-h-[44px]"
							>
								{dictionary.home.tryTattoo}
							</Link>
						</div>
					</div>

					{/* Collage first on mobile for immediate visual impact */}
					<div className="order-1 lg:order-2">
						<HeroCollage />
					</div>
				</div>
			</div>
		</section>
	)
}
