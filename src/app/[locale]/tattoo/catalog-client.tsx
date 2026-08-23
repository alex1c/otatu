'use client'

import { useState } from 'react'
import { DiscoveryChips } from '@/components/ui/discovery-chips'
import { CategoryChip } from '@/components/ui/category-chip'
import { TattooGallery } from '@/components/ui/tattoo-gallery'
import { styles } from '@/data/fixtures/styles'
import { designs } from '@/data/fixtures/designs'
import type { Locale } from '@/types/content'

/** Primary catalog navigation chips — gallery-first UX. */
const primaryNav = [
	{ slug: 'for-you', label: 'Для тебя' },
	{ slug: 'all', label: 'Все' },
	{ slug: 'small', label: 'Маленькие' },
	{ slug: 'for-women', label: 'Для девушек' },
	{ slug: 'for-men', label: 'Для мужчин' },
	{ slug: 'arm', label: 'На руке' },
	{ slug: 'minimalism', label: 'Минимализм' },
	{ slug: 'inscriptions', label: 'Надписи' },
]

interface CatalogClientProps {
	locale: Locale
	title: string
	intro: string
	loadMoreLabel: string
}

/** Gallery-first catalog with compact filter navigation. */
export function CatalogClient({
	locale,
	title,
	intro,
	loadMoreLabel,
}: CatalogClientProps) {
	const [activeNav, setActiveNav] = useState<string | null>('for-you')
	const [activeStyle, setActiveStyle] = useState<string | null>(null)
	const [showStyleFilters, setShowStyleFilters] = useState(false)
	const [visibleCount, setVisibleCount] = useState(8)

	const filteredDesigns = designs.filter((design) => {
		if (!activeNav || activeNav === 'for-you' || activeNav === 'all') {
			return true
		}

		if (activeNav === 'arm') {
			return ['arm', 'forearm', 'wrist', 'shoulder'].includes(
				design.bodyPartSlug,
			)
		}

		return design.categorySlugs.includes(activeNav)
	}).filter((design) => {
		if (!activeStyle) return true
		return design.styleSlug === activeStyle
	})

	const visibleDesigns = filteredDesigns.slice(0, visibleCount)
	const hasMore = visibleCount < filteredDesigns.length

	return (
		<div className="container-app py-6 md:py-8">
			{/* Compact header — gallery follows quickly */}
			<header className="mb-4 md:mb-5">
				<h1 className="font-brand text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
					{title}
				</h1>
				<p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
					{intro}
				</p>
			</header>

			{/* Primary navigation row */}
			<div className="mb-3">
				<DiscoveryChips
					items={primaryNav.map((item) => ({
						label: item.label,
						isActive: activeNav === item.slug,
						onClick: () => setActiveNav(item.slug),
					}))}
				/>
			</div>

			{/* Secondary style filters — visually subdued */}
			<div className="mb-5 flex items-center gap-3">
				<button
					type="button"
					onClick={() => setShowStyleFilters((value) => !value)}
					className="text-xs text-text-muted hover:text-text-secondary transition-colors py-1"
				>
					Фильтры
					{activeStyle && (
						<span className="ml-1 text-text-primary">· {activeStyle}</span>
					)}
				</button>
				{showStyleFilters && (
					<div className="chips-scroll flex-1">
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
				)}
			</div>

			<TattooGallery
				designs={visibleDesigns}
				locale={locale}
				priorityCount={6}
				layout="editorial"
			/>

			{hasMore && (
				<div className="mt-8 text-center">
					<button
						type="button"
						onClick={() => setVisibleCount((count) => count + 4)}
						className="inline-flex items-center justify-center rounded-full border border-border-subtle px-6 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors min-h-[44px]"
					>
						{loadMoreLabel}
					</button>
				</div>
			)}
		</div>
	)
}
