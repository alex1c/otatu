'use client'

import dynamic from 'next/dynamic'
import type { Dictionary } from '@/lib/i18n/types'

interface TryOnEditorLoaderProps {
	dictionary: Dictionary
	initialDesignSlug?: string | null
}

/** Konva requires browser APIs — disable SSR for the editor bundle. */
const TryOnEditor = dynamic(
	() =>
		import('@/components/try-on/try-on-editor').then((mod) => mod.TryOnEditor),
	{
		ssr: false,
		loading: () => (
			<div
				className="mt-6 rounded-2xl bg-bg-muted min-h-[320px] animate-pulse"
				data-testid="tryon-editor-loading"
			/>
		),
	},
)

/** Client boundary — keeps Konva off content pages and out of SSR. */
export function TryOnEditorLoader({
	dictionary,
	initialDesignSlug,
}: TryOnEditorLoaderProps) {
	const { tryOn: labels } = dictionary

	return (
		<TryOnEditor
			initialDesignSlug={initialDesignSlug}
			labels={{
				upload: labels.step1,
				uploadHint: labels.uploadHint,
				selectDesign: labels.selectDesign,
				customDesign: labels.customDesign,
				customDesignHint: labels.customDesignHint,
				preview: labels.preview,
				controls: labels.controls,
				opacity: labels.opacity,
				size: labels.size,
				rotate: labels.rotate,
				save: labels.save,
				reset: labels.reset,
				startOver: labels.startOver,
				startOverConfirm: labels.startOverConfirm,
				removeTattoo: labels.removeTattoo,
			errors: labels.errors,
			comparison: labels.comparison,
		}}
	/>
	)
}
