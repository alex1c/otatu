import Link from 'next/link'

export interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
}

/** Accessible breadcrumb navigation for motif and catalog pages. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav aria-label="Хлебные крошки">
			<ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					return (
						<li key={item.label} className="flex items-center gap-1.5">
							{index > 0 && (
								<span aria-hidden="true" className="text-text-muted/50">
									/
								</span>
							)}
							{isLast || !item.href ? (
								<span
									className="text-text-secondary"
									aria-current={isLast ? 'page' : undefined}
								>
									{item.label}
								</span>
							) : (
								<Link
									href={item.href}
									className="hover:text-text-primary transition-colors"
								>
									{item.label}
								</Link>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
