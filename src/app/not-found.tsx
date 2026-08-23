import Link from 'next/link'

/** Global not-found page — also used for inactive locales like /en. */
export default function NotFound() {
	return (
		<div className="container-app flex flex-1 flex-col items-center justify-center py-24 text-center">
			<p className="font-brand text-6xl font-semibold text-text-muted/30">404</p>
			<h1 className="mt-4 font-brand text-2xl font-semibold text-text-primary">
				Страница не найдена
			</h1>
			<p className="mt-2 text-sm text-text-secondary">
				Запрашиваемая страница не существует или ещё не доступна.
			</p>
			<Link
				href="/ru"
				className="mt-6 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-inverse hover:bg-accent-soft transition-colors"
			>
				На главную
			</Link>
		</div>
	)
}
