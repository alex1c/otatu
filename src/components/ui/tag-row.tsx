interface TagRowProps {
	tags: string[]
	label?: string
}

/** Horizontal row of metadata tags (styles, body parts, etc.). */
export function TagRow({ tags, label }: TagRowProps) {
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
					<li key={tag}>
						<span className="inline-flex items-center rounded-full bg-bg-secondary px-3 py-1.5 text-sm text-text-secondary">
							{tag}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
