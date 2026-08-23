import Image from 'next/image'
import type { HeroCollageSlot } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getPlaceholder } from '@/data/fixtures/placeholders'

/** Hero collage slots — replace images via placeholder keys / asset IDs. */
const heroSlots: HeroCollageSlot[] = [
	{
		id: 'hero-dominant',
		image: getPlaceholder('hero01'),
		layoutClass:
			'absolute right-0 top-0 w-[58%] sm:w-[55%] aspect-[4/5] z-10',
		priority: true,
	},
	{
		id: 'hero-overlay-1',
		image: getPlaceholder('hero02'),
		layoutClass:
			'absolute left-0 top-[12%] w-[42%] sm:w-[38%] aspect-[3/4] z-20 shadow-lg',
	},
	{
		id: 'hero-overlay-2',
		image: getPlaceholder('hero03'),
		layoutClass:
			'absolute left-[18%] bottom-0 w-[32%] sm:w-[28%] aspect-square z-30 shadow-md',
	},
]

/** Editorial overlapping image collage for the home hero. */
export function HeroCollage() {
	return (
		<div
			className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] max-h-[520px] lg:max-h-[580px]"
			aria-hidden="false"
		>
			{heroSlots.map((slot) => (
				<div
					key={slot.id}
					className={`${slot.layoutClass} overflow-hidden rounded-2xl bg-bg-muted`}
				>
					<Image
						src={resolveImageUrl(slot.image)}
						alt={slot.image.alt}
						fill
						className="object-cover"
						priority={slot.priority}
						sizes="(max-width: 1024px) 45vw, 28vw"
					/>
				</div>
			))}
		</div>
	)
}
