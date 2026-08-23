import Image from 'next/image'
import type { MediaAsset } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'

interface ImageViewerProps {
	image: MediaAsset
	priority?: boolean
}

/** Full-width image viewer shell for motif hero and detail views. */
export function ImageViewer({ image, priority = false }: ImageViewerProps) {
	return (
		<figure className="relative overflow-hidden rounded-2xl bg-bg-muted">
			<div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5]">
				<Image
					src={resolveImageUrl(image)}
					alt={image.alt}
					fill
					className="object-cover"
					priority={priority}
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
		</figure>
	)
}
