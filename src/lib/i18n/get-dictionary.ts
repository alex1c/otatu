import type { Locale } from '@/types/content'
import { ruDictionary } from '@/lib/i18n/dictionaries/ru'
import type { Dictionary } from '@/lib/i18n/types'

const dictionaries: Record<Locale, Dictionary | null> = {
	ru: ruDictionary,
	en: null,
}

/** Returns the UI dictionary for an active locale. */
export function getDictionary(locale: Locale): Dictionary {
	const dictionary = dictionaries[locale]

	if (!dictionary) {
		throw new Error(`Dictionary not available for locale: ${locale}`)
	}

	return dictionary
}
