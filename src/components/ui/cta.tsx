import Link from 'next/link'

interface CTAProps {
	title: string
	subtitle?: string
	primaryLabel: string
	primaryHref: string
	secondaryLabel?: string
	secondaryHref?: string
	variant?: 'default' | 'dark'
}

/** Call-to-action block for try-on and other conversions. */
export function CTA({
	title,
	subtitle,
	primaryLabel,
	primaryHref,
	secondaryLabel,
	secondaryHref,
	variant = 'default',
}: CTAProps) {
	const isDark = variant === 'dark'

	return (
		<section
			className={
				isDark
					? 'rounded-2xl bg-accent text-text-inverse p-8 md:p-12'
					: 'rounded-2xl bg-bg-secondary p-8 md:p-12'
			}
		>
			<div className="max-w-xl">
				<h2
					className={`font-brand text-2xl sm:text-3xl font-semibold tracking-tight ${isDark ? 'text-text-inverse' : 'text-text-primary'}`}
				>
					{title}
				</h2>
				{subtitle && (
					<p
						className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-text-secondary'}`}
					>
						{subtitle}
					</p>
				)}
				<div className="mt-6 flex flex-wrap gap-3">
					<Link
						href={primaryHref}
						className={
							isDark
								? 'inline-flex items-center justify-center rounded-full bg-bg-elevated px-6 py-3 text-sm font-medium text-text-primary hover:bg-bg-primary transition-colors min-h-[44px]'
								: 'inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-inverse hover:bg-accent-soft transition-colors min-h-[44px]'
						}
					>
						{primaryLabel}
					</Link>
					{secondaryLabel && secondaryHref && (
						<Link
							href={secondaryHref}
							className={
								isDark
									? 'inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-text-inverse hover:bg-white/10 transition-colors min-h-[44px]'
									: 'inline-flex items-center justify-center rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-text-primary hover:bg-bg-elevated transition-colors min-h-[44px]'
							}
						>
							{secondaryLabel}
						</Link>
					)}
				</div>
			</div>
		</section>
	)
}
