import Image from 'next/image'
import type { MediaAsset } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'

interface VisualCompositionProps {
	images: MediaAsset[]
	priority?: boolean
}

/**
 * Editorial multi-image composition for motif pages.
 * Asymmetric grid — inspiration-first, not product detail.
 */
export function VisualComposition({
	images,
	priority = false,
}: VisualCompositionProps) {
	if (images.length === 0) return null

	const [primary, secondary, tertiary] = images

	return (
		<div className="grid grid-cols-12 gap-2 sm:gap-3 auto-rows-[minmax(120px,auto)]">
			{primary && (
				<div className="col-span-7 row-span-2 relative overflow-hidden rounded-2xl bg-bg-muted min-h-[200px] sm:min-h-[280px]">
					<Image
						src={resolveImageUrl(primary)}
						alt={primary.alt}
						fill
						className="object-cover"
						priority={priority}
						sizes="(max-width: 768px) 58vw, 40vw"
					/>
				</div>
			)}
			{secondary && (
				<div className="col-span-5 relative overflow-hidden rounded-2xl bg-bg-muted min-h-[140px]">
					<Image
						src={resolveImageUrl(secondary)}
						alt={secondary.alt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 42vw, 28vw"
					/>
				</div>
			)}
			{tertiary && (
				<div className="col-span-5 relative overflow-hidden rounded-2xl bg-bg-muted min-h-[140px]">
					<Image
						src={resolveImageUrl(tertiary)}
						alt={tertiary.alt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 42vw, 28vw"
					/>
				</div>
			)}
		</div>
	)
}
