import Link from 'next/link'
import type { Locale } from '@/types/content'

export interface LinkTag {
	label: string
	href: string
}

interface LinkTagRowProps {
	tags: LinkTag[]
	label?: string
}

/** Tag row with internal navigation links for landing pages. */
export function LinkTagRow({ tags, label }: LinkTagRowProps) {
	if (tags.length === 0) return null

	return (
		<div>
			{label && (
				<p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
					{label}
				</p>
			)}
			<ul className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<li key={tag.href}>
						<Link
							href={tag.href}
							className="inline-flex items-center rounded-full bg-bg-secondary px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors min-h-[36px]"
						>
							{tag.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

/** Builds locale-prefixed link tags from path + label pairs. */
export function buildLinkTags(
	locale: Locale,
	items: { label: string; path: string }[],
): LinkTag[] {
	return items.map((item) => ({
		label: item.label,
		href: `/${locale}${item.path}`,
	}))
}
