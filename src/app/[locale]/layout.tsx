import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { activeLocales, isActiveLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Locale } from '@/types/content'

interface LocaleLayoutProps {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

/** Generates static params for active locales only. */
export function generateStaticParams() {
	return activeLocales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale: localeParam } = await params

	if (!isActiveLocale(localeParam)) {
		notFound()
	}

	const locale = localeParam as Locale
	const dictionary = getDictionary(locale)

	return (
		<>
			<Header locale={locale} dictionary={dictionary} />
			<main id="main-content" className="flex-1">
				{children}
			</main>
			<Footer locale={locale} dictionary={dictionary} />
		</>
	)
}
