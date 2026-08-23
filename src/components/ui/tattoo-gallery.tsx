import type { TattooDesign } from '@/types/content'
import type { Locale } from '@/types/content'
import { TattooCard } from '@/components/ui/tattoo-card'

interface TattooGalleryProps {
	designs: TattooDesign[]
	locale: Locale
	/** Enable priority loading for above-the-fold images. */
	priorityCount?: number
}

/** Responsive masonry gallery of tattoo design cards. */
export function TattooGallery({
	designs,
	locale,
	priorityCount = 0,
}: TattooGalleryProps) {
	return (
		<div className="gallery-masonry" role="list">
			{designs.map((design, index) => (
				<div key={design.id} className="gallery-masonry-item" role="listitem">
					<TattooCard
						design={design}
						locale={locale}
						priority={index < priorityCount}
					/>
				</div>
			))}
		</div>
	)
}
