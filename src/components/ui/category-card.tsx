import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'

interface CategoryCardProps {
	category: Category
	href: string
}

/** Larger category card for collection rows. */
export function CategoryCard({ category, href }: CategoryCardProps) {
	return (
		<Link
			href={href}
			className="group block rounded-xl overflow-hidden bg-bg-elevated hover:shadow-sm transition-shadow"
		>
			{category.image ? (
				<div className="relative aspect-[16/10] bg-bg-muted">
					<Image
						src={resolveImageUrl(category.image)}
						alt={category.image.alt}
						fill
						className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
						sizes="(max-width: 768px) 100vw, 33vw"
					/>
				</div>
			) : (
				<div className="aspect-[16/10] bg-bg-muted flex items-center justify-center">
					<span className="font-brand text-2xl text-text-muted/40">
						{category.label.charAt(0)}
					</span>
				</div>
			)}
			<div className="p-4">
				<h3 className="font-medium text-text-primary group-hover:text-accent-soft transition-colors">
					{category.label}
				</h3>
				{category.description && (
					<p className="mt-1 text-sm text-text-muted line-clamp-2">
						{category.description}
					</p>
				)}
			</div>
		</Link>
	)
}
