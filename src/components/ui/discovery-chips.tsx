import Link from 'next/link'

interface DiscoveryChipProps {
	label: string
	href?: string
	isActive?: boolean
	onClick?: () => void
}

/** Lightweight text chip — navigation aid, not a content section. */
export function DiscoveryChip({
	label,
	href,
	isActive = false,
	onClick,
}: DiscoveryChipProps) {
	const className = [
		'inline-flex shrink-0 items-center text-sm transition-colors whitespace-nowrap py-1',
		isActive
			? 'text-text-primary font-medium underline underline-offset-4 decoration-text-primary/40'
			: 'text-text-muted hover:text-text-secondary',
	].join(' ')

	if (href) {
		return (
			<Link href={href} className={className}>
				{label}
			</Link>
		)
	}

	return (
		<button type="button" className={className} onClick={onClick}>
			{label}
		</button>
	)
}

interface DiscoveryChipsProps {
	items: Array<{
		label: string
		href?: string
		isActive?: boolean
		onClick?: () => void
	}>
}

/** Compact horizontal discovery navigation with dot separators. */
export function DiscoveryChips({ items }: DiscoveryChipsProps) {
	return (
		<nav
			className="chips-scroll items-center gap-x-1 text-sm"
			aria-label="Категории"
		>
			{items.map((item, index) => (
				<span key={item.label} className="inline-flex items-center shrink-0">
					{index > 0 && (
						<span
							className="mx-2 text-text-muted/40 select-none"
							aria-hidden="true"
						>
							·
						</span>
					)}
					<DiscoveryChip
						label={item.label}
						href={item.href}
						isActive={item.isActive}
						onClick={item.onClick}
					/>
				</span>
			))}
		</nav>
	)
}

/** Re-export for catalog filter buttons that need pill style. */
export { CategoryChip } from '@/components/ui/category-chip'
