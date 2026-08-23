import Link from 'next/link'
import type { Locale } from '@/types/content'
import type { Dictionary } from '@/lib/i18n/types'

interface FooterProps {
	locale: Locale
	dictionary: Dictionary
}

/** Site footer with explore links and legal placeholders. */
export function Footer({ locale, dictionary }: FooterProps) {
	const exploreLinks = [
		{ href: `/${locale}/tattoo`, label: dictionary.nav.ideas },
		{ href: `/${locale}/tattoo`, label: dictionary.nav.sketches },
		{ href: `/${locale}/tattoo/wolf`, label: dictionary.nav.meanings },
		{ href: `/${locale}/tattoo`, label: dictionary.nav.styles },
	]

	const toolLinks = [
		{ href: `/${locale}/try-tattoo`, label: dictionary.nav.tryOn },
	]

	return (
		<footer className="mt-auto border-t border-border-subtle bg-bg-secondary">
			<div className="container-app py-12 md:py-16">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="sm:col-span-2 lg:col-span-1">
						<p className="font-brand text-xl font-semibold tracking-tight">
							{dictionary.brand.name}
						</p>
						<p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xs">
							{dictionary.footer.aboutText}
						</p>
					</div>

					<div>
						<h2 className="text-sm font-medium text-text-primary">
							{dictionary.footer.explore}
						</h2>
						<ul className="mt-4 space-y-2">
							{exploreLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="text-sm text-text-secondary hover:text-text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="text-sm font-medium text-text-primary">
							{dictionary.footer.tools}
						</h2>
						<ul className="mt-4 space-y-2">
							{toolLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="text-sm text-text-secondary hover:text-text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="text-sm font-medium text-text-primary">
							{dictionary.footer.legal}
						</h2>
						<ul className="mt-4 space-y-2">
							<li>
								<span className="text-sm text-text-muted">
									{dictionary.footer.privacy}
								</span>
							</li>
							<li>
								<span className="text-sm text-text-muted">
									{dictionary.footer.terms}
								</span>
							</li>
						</ul>
					</div>
				</div>

				<p className="mt-10 pt-6 border-t border-border-subtle text-xs text-text-muted">
					{dictionary.footer.copyright}
				</p>
			</div>
		</footer>
	)
}
