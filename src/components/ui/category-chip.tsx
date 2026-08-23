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
		'inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
		isActive
			? 'bg-accent/90 text-text-inverse'
			: 'text-text-muted hover:text-text-secondary bg-transparent',
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
