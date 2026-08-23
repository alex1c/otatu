import type { Locale } from '@/types/content'

/** Locales that ship real content in Phase 1A. */
export const activeLocales: Locale[] = ['ru']

/** Default locale for redirects and fallbacks. */
export const defaultLocale: Locale = 'ru'

/** All locales reserved for future routing (includes inactive). */
export const allLocales: Locale[] = ['ru', 'en']

/** Returns true when the locale has implemented content. */
export function isActiveLocale(locale: string): locale is Locale {
	return activeLocales.includes(locale as Locale)
}

/** Validates locale string against the full reserved set. */
export function isValidLocale(locale: string): locale is Locale {
	return allLocales.includes(locale as Locale)
}
