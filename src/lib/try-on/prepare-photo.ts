import { TRYON_MAX_EDGE } from '@/lib/try-on/constants'

export interface PreparedPhoto {
	/** Object URL for preview — caller must revoke when done. */
	url: string
	width: number
	height: number
}

/**
 * Loads a user photo with EXIF orientation correction and downscales
 * to a safe working resolution for canvas compositing.
 */
export async function preparePhotoFile(file: File): Promise<PreparedPhoto> {
	const bitmap = await createImageBitmap(file, {
		imageOrientation: 'from-image',
	})

	const { width, height } = fitWithinEdge(bitmap.width, bitmap.height, TRYON_MAX_EDGE)

	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height

	const ctx = canvas.getContext('2d')
	if (!ctx) {
		bitmap.close()
		throw new Error('Canvas 2D context unavailable')
	}

	ctx.drawImage(bitmap, 0, 0, width, height)
	bitmap.close()

	const blob = await new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(result) => {
				if (result) resolve(result)
				else reject(new Error('Failed to encode prepared photo'))
			},
			'image/jpeg',
			0.92,
		)
	})

	return {
		url: URL.createObjectURL(blob),
		width,
		height,
	}
}

/** Scales dimensions to fit within max edge while preserving aspect ratio. */
export function fitWithinEdge(
	width: number,
	height: number,
	maxEdge: number,
): { width: number; height: number } {
	if (width <= maxEdge && height <= maxEdge) {
		return { width, height }
	}

	const scale = maxEdge / Math.max(width, height)
	return {
		width: Math.round(width * scale),
		height: Math.round(height * scale),
	}
}

/**
 * Loads an image element from a URL — used for bundled tattoo assets.
 */
export function loadHtmlImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.crossOrigin = 'anonymous'
		img.onload = () => resolve(img)
		img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
		img.src = src
	})
}
