import Link from 'next/link'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'

interface HeaderProps {
	locale: Locale
	dictionary: Dictionary
}

/** Site header with logo, desktop nav, search, and mobile menu trigger. */
export function Header({ locale, dictionary }: HeaderProps) {
	const navItems = [
		{ href: `/${locale}/tattoo`, label: dictionary.nav.ideas },
		{ href: `/${locale}/small-tattoos`, label: 'Маленькие' },
		{ href: `/${locale}/style/minimalism`, label: dictionary.nav.styles },
		{ href: `/${locale}/body/arm`, label: dictionary.nav.places },
		{ href: `/${locale}/tattoo/wolf`, label: dictionary.nav.meanings },
	]

	return (
		<header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/95 backdrop-blur-sm">
			<div className="container-app flex h-16 items-center justify-between gap-4">
				<Link
					href={`/${locale}`}
					className="font-brand text-xl font-semibold tracking-tight text-text-primary shrink-0"
					aria-label={`${dictionary.brand.name} — ${dictionary.common.home}`}
				>
					{dictionary.brand.name}
				</Link>

				<nav
					className="hidden lg:flex items-center gap-6"
					aria-label="Основная навигация"
				>
					{navItems.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="text-sm text-text-secondary hover:text-text-primary transition-colors"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2 sm:gap-3">
					<button
						type="button"
						className="hidden sm:flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-sm text-text-muted hover:border-border-strong transition-colors"
						aria-label={dictionary.nav.search}
					>
						<SearchIcon />
						<span className="hidden md:inline">{dictionary.nav.search}</span>
					</button>

					<Link
						href={`/${locale}/try-tattoo`}
						className="hidden sm:inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-text-inverse hover:bg-accent-soft transition-colors"
					>
						{dictionary.nav.tryOn}
					</Link>

					{/* Mobile menu — details/summary for accessible no-JS fallback */}
					<details className="relative lg:hidden group">
						<summary
							className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated cursor-pointer list-none [&::-webkit-details-marker]:hidden"
							aria-label={dictionary.nav.menu}
						>
							<MenuIcon />
						</summary>
						<nav
							className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border-subtle bg-bg-elevated p-3 shadow-lg"
							aria-label="Мобильная навигация"
						>
							<ul className="flex flex-col gap-1">
								{navItems.map((item) => (
									<li key={item.label}>
										<Link
											href={item.href}
											className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
										>
											{item.label}
										</Link>
									</li>
								))}
								<li className="mt-2 pt-2 border-t border-border-subtle">
									<Link
										href={`/${locale}/try-tattoo`}
										className="block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-medium text-text-inverse"
									>
										{dictionary.nav.tryOn}
									</Link>
								</li>
							</ul>
						</nav>
					</details>
				</div>
			</div>
		</header>
	)
}

function SearchIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	)
}

function MenuIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
		>
			<path d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	)
}
