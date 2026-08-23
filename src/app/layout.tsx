import { Inter, Literata } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

/** Clean sans-serif with excellent Cyrillic support for UI. */
const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-ui',
	display: 'swap',
})

/** Editorial serif for brand wordmark and display headings. */
const literata = Literata({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-brand',
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otatu.ru',
	),
	title: {
		default: 'OTATU — Визуальный портал о татуировках',
		template: '%s | OTATU',
	},
	description:
		'Идеи, эскизы и значения татуировок. Вдохновение для твоей следующей тату.',
	robots: { index: true, follow: true },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="ru"
			className={`${inter.variable} ${literata.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
				{children}
			</body>
		</html>
	)
}
