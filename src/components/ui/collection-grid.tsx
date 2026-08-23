import Link from 'next/link'
import Image from 'next/image'
import type { Collection } from '@/types/content'
import type { TattooDesign } from '@/types/content'
import type { Locale } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'
import { getCollectionHref } from '@/lib/content/live-routes'

interface CollectionGridProps {
	collections: Collection[]
	designsByCollection: Map<string, TattooDesign[]>
	locale: Locale
}

/** Aspect class per collection layout variant. */
function getCollectionAspect(variant: Collection['layoutVariant']): string {
	switch (variant) {
		case 'wide':
			return 'aspect-[4/3] sm:aspect-[16/10]'
		case 'square':
			return 'aspect-square'
		case 'portrait':
		default:
			return 'aspect-[3/4]'
	}
}

/** Image-led collection cards in an editorial grid. */
export function CollectionGrid({
	collections,
	designsByCollection,
	locale,
}: CollectionGridProps) {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
			{collections.map((collection) => {
				const designs = designsByCollection.get(collection.id) ?? []
				const aspect = getCollectionAspect(collection.layoutVariant)

				return (
					<Link
						key={collection.id}
						href={getCollectionHref(locale, collection.slug)}
						className="group relative overflow-hidden rounded-2xl bg-bg-muted"
					>
						<div className={`relative ${aspect}`}>
							<Image
								src={resolveImageUrl(collection.coverImage)}
								alt={collection.coverImage.alt}
								fill
								className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
								sizes="(max-width: 640px) 100vw, 33vw"
							/>
							{/* Gradient overlay for title legibility */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

							<div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
								<h3 className="font-brand text-lg sm:text-xl font-semibold text-white tracking-tight">
									{collection.title}
								</h3>
								<p className="mt-0.5 text-xs sm:text-sm text-white/75">
									{collection.description}
								</p>
							</div>

							{/* Stacked thumbnail hints */}
							{designs.length > 0 && (
								<div className="absolute top-3 right-3 flex -space-x-2">
									{designs.slice(0, 3).map((design) => (
										<div
											key={design.id}
											className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-white/80 shadow-sm"
										>
											<Image
												src={resolveImageUrl(design.image)}
												alt=""
												fill
												className="object-cover"
												sizes="40px"
											/>
										</div>
									))}
								</div>
							)}
						</div>
					</Link>
				)
			})}
		</div>
	)
}
