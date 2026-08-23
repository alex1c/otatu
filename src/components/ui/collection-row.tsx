import Link from 'next/link'
import type { Collection } from '@/types/content'
import type { TattooDesign } from '@/types/content'
import type { Locale } from '@/types/content'
import { TattooCard } from '@/components/ui/tattoo-card'

interface CollectionRowProps {
	collection: Collection
	designs: TattooDesign[]
	locale: Locale
}

/** Horizontal scroll row of designs for a curated collection. */
export function CollectionRow({
	collection,
	designs,
	locale,
}: CollectionRowProps) {
	return (
		<section>
			<div className="flex items-end justify-between gap-4 mb-4">
				<div>
					<h3 className="font-brand text-xl sm:text-2xl font-semibold tracking-tight">
						{collection.title}
					</h3>
					<p className="mt-1 text-sm text-text-secondary">
						{collection.description}
					</p>
				</div>
				<Link
					href={`/${locale}/tattoo`}
					className="shrink-0 text-sm text-text-muted hover:text-text-primary transition-colors"
				>
					Все
				</Link>
			</div>
			<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
				{designs.map((design) => (
					<div key={design.id} className="w-[160px] sm:w-[200px] shrink-0">
						<TattooCard design={design} locale={locale} showTryOn={false} />
					</div>
				))}
			</div>
		</section>
	)
}
