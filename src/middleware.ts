import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
	activeLocales,
	defaultLocale,
	isValidLocale,
} from '@/lib/i18n/config'

/** Redirects bare paths to the default locale prefix `/ru/...`. */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Skip static assets and API routes
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.includes('.')
	) {
		return NextResponse.next()
	}

	const segments = pathname.split('/').filter(Boolean)
	const maybeLocale = segments[0]

	// Root → default locale home
	if (pathname === '/') {
		return NextResponse.redirect(
			new URL(`/${defaultLocale}`, request.url),
		)
	}

	// Reserved but inactive locale (e.g. /en) → 404
	if (isValidLocale(maybeLocale) && !activeLocales.includes(maybeLocale)) {
		return NextResponse.rewrite(new URL('/not-found', request.url))
	}

	// Paths without locale prefix → prepend default locale
	if (!maybeLocale || !isValidLocale(maybeLocale)) {
		return NextResponse.redirect(
			new URL(`/${defaultLocale}${pathname}`, request.url),
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
