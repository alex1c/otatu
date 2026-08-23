import type { TattooDesign } from '@/types/content'
import type { Locale } from '@/types/content'
import { TattooCard } from '@/components/ui/tattoo-card'
import { getGalleryGridClass } from '@/lib/content/motif-labels'

interface TattooGalleryProps {
	designs: TattooDesign[]
	locale: Locale
	priorityCount?: number
	/** Use editorial CSS grid instead of column masonry. */
	layout?: 'editorial' | 'masonry'
}

/** Editorial discovery gallery with varied aspect ratios. */
export function TattooGallery({
	designs,
	locale,
	priorityCount = 0,
	layout = 'editorial',
}: TattooGalleryProps) {
	if (layout === 'masonry') {
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

	return (
		<div className="gallery-editorial" role="list">
			{designs.map((design, index) => (
				<div
					key={design.id}
					className={`gallery-editorial-item ${getGalleryGridClass(design.galleryVariant)}`}
					role="listitem"
				>
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
