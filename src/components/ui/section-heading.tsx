import Link from 'next/link'
import type { Locale } from '@/types/content'

interface SectionHeadingProps {
	title: string
	subtitle?: string
	viewAllHref?: string
	viewAllLabel?: string
	locale?: Locale
}

/** Section title with optional subtitle and view-all link. */
export function SectionHeading({
	title,
	subtitle,
	viewAllHref,
	viewAllLabel = 'Смотреть все',
}: SectionHeadingProps) {
	return (
		<div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
			<div>
				<h2 className="font-brand text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
					{title}
				</h2>
				{subtitle && (
					<p className="mt-2 text-sm sm:text-base text-text-secondary max-w-2xl">
						{subtitle}
					</p>
				)}
			</div>
			{viewAllHref && (
				<Link
					href={viewAllHref}
					className="shrink-0 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors py-2"
				>
					{viewAllLabel}
				</Link>
			)}
		</div>
	)
}
