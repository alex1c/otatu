'use client'

import { useState } from 'react'
import { CategoryChip } from '@/components/ui/category-chip'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { categories } from '@/data/fixtures/categories'
import { styles } from '@/data/fixtures/styles'
import { designs } from '@/data/fixtures/designs'
import type { Locale } from '@/types/content'

interface CatalogClientProps {
	locale: Locale
	title: string
	intro: string
	filtersLabel: string
	loadMoreLabel: string
	resultsLabel: string
}

/** Client-side catalog with UI-only filter chips (Phase 1A). */
export function CatalogClient({
	locale,
	title,
	intro,
	filtersLabel,
	loadMoreLabel,
	resultsLabel,
}: CatalogClientProps) {
	const [activeCategory, setActiveCategory] = useState<string | null>(null)
	const [activeStyle, setActiveStyle] = useState<string | null>(null)
	const [visibleCount, setVisibleCount] = useState(8)

	const filteredDesigns = designs.filter((design) => {
		const matchesCategory =
			!activeCategory || design.categorySlugs.includes(activeCategory)
		const matchesStyle =
			!activeStyle || design.styleSlug === activeStyle
		return matchesCategory && matchesStyle
	})

	const visibleDesigns = filteredDesigns.slice(0, visibleCount)
	const hasMore = visibleCount < filteredDesigns.length

	return (
		<div className="container-app py-8 md:py-12">
			<header className="max-w-2xl mb-8 md:mb-10">
				<h1 className="font-brand text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
					{title}
				</h1>
				<p className="mt-4 text-base text-text-secondary leading-relaxed">
					{intro}
				</p>
				<p className="mt-3 text-sm text-text-muted">
					{filteredDesigns.length} {resultsLabel}
				</p>
			</header>

			{/* Category filters */}
			<div className="mb-4">
				<p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
					{filtersLabel}
				</p>
				<div className="chips-scroll">
					<CategoryChip
						label="Все"
						isActive={activeCategory === null}
						onClick={() => setActiveCategory(null)}
					/>
					{categories.map((category) => (
						<CategoryChip
							key={category.id}
							label={category.label}
							isActive={activeCategory === category.slug}
							onClick={() => setActiveCategory(category.slug)}
						/>
					))}
				</div>
			</div>

			{/* Style filters */}
			<div className="mb-8">
				<div className="chips-scroll">
					<CategoryChip
						label="Все стили"
						isActive={activeStyle === null}
						onClick={() => setActiveStyle(null)}
					/>
					{styles.map((style) => (
						<CategoryChip
							key={style.id}
							label={style.label}
							isActive={activeStyle === style.slug}
							onClick={() => setActiveStyle(style.slug)}
						/>
					))}
				</div>
			</div>

			<TattooGallery designs={visibleDesigns} locale={locale} priorityCount={4} />

			{hasMore && (
				<div className="mt-10 text-center">
					<button
						type="button"
						onClick={() => setVisibleCount((count) => count + 4)}
						className="inline-flex items-center justify-center rounded-full border border-border-strong bg-bg-elevated px-8 py-3 text-sm font-medium text-text-primary hover:bg-bg-secondary transition-colors min-h-[44px]"
					>
						{loadMoreLabel}
					</button>
				</div>
			)}
		</div>
	)
}
