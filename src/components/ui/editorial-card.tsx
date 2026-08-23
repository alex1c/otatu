import Image from 'next/image'
import type { Article } from '@/types/content'
import { resolveImageUrl } from '@/lib/images/resolve-image-url'

interface EditorialCardProps {
	article: Article
}

/** Editorial article card for guides section on home page. */
export function EditorialCard({ article }: EditorialCardProps) {
	return (
		<article className="group">
			<div className="relative overflow-hidden rounded-xl bg-bg-muted aspect-[8/5]">
				<Image
					src={resolveImageUrl(article.image)}
					alt={article.image.alt}
					fill
					className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
			</div>
			<div className="mt-4">
				<p className="text-xs text-text-muted">{article.readTime}</p>
				<h3 className="mt-1 font-medium text-text-primary group-hover:underline line-clamp-2">
					<span className="cursor-default">{article.title}</span>
				</h3>
				<p className="mt-2 text-sm text-text-secondary line-clamp-2">
					{article.excerpt}
				</p>
			</div>
		</article>
	)
}
