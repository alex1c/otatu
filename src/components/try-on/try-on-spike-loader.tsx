'use client'

import dynamic from 'next/dynamic'

interface TryOnSpikeLoaderProps {
	labels: {
		upload: string
		uploadHint: string
		preview: string
		controls: string
		opacity: string
		size: string
		rotate: string
		save: string
		reset: string
		proofNote: string
	}
}

/** Konva requires browser APIs — disable SSR for the editor bundle. */
const TryOnSpike = dynamic(
	() =>
		import('@/components/try-on/try-on-spike').then((mod) => mod.TryOnSpike),
	{
		ssr: false,
		loading: () => (
			<div className="mt-6 rounded-2xl bg-bg-muted min-h-[320px] animate-pulse" />
		),
	},
)

/** Client boundary wrapper for the try-on technical proof. */
export function TryOnSpikeLoader({ labels }: TryOnSpikeLoaderProps) {
	return <TryOnSpike labels={labels} />
}
