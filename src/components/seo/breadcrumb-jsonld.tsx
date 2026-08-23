import { siteUrl } from '@/lib/seo/build-metadata'

interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbJsonLdProps {
	locale: string
	items: BreadcrumbItem[]
}

/** Emits BreadcrumbList structured data for Wave A landing pages. */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
	const listItems = items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: item.label,
		...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
	}))

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: listItems,
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
