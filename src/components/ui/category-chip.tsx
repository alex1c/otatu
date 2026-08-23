import Link from 'next/link'

interface CategoryChipProps {
	label: string
	href?: string
	isActive?: boolean
	onClick?: () => void
}

/** Horizontal scroll chip for category / filter navigation. */
export function CategoryChip({
	label,
	href,
	isActive = false,
	onClick,
}: CategoryChipProps) {
	const className = [
		'inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[40px]',
		isActive
			? 'bg-accent text-text-inverse'
			: 'bg-bg-elevated text-text-secondary border border-border-subtle hover:border-border-strong hover:text-text-primary',
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
