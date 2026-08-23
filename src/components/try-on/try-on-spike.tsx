'use client'

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
} from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer, Rect } from 'react-konva'
import type Konva from 'konva'
import {
	loadHtmlImage,
	preparePhotoFile,
} from '@/lib/try-on/prepare-photo'
import {
	TRYON_ACCEPTED_TYPES,
	TRYON_DEFAULT_TATTOO_SRC,
	TRYON_MAX_FILE_BYTES,
} from '@/lib/try-on/constants'

interface TryOnSpikeLabels {
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

interface TryOnSpikeProps {
	labels: TryOnSpikeLabels
}

const DEFAULT_OPACITY = 70
const DEFAULT_SCALE = 50
const DEFAULT_ROTATION = 0

/** Browser-only try-on technical proof — Konva canvas overlay. */
export function TryOnSpike({ labels }: TryOnSpikeProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const stageRef = useRef<Konva.Stage>(null)
	const tattooRef = useRef<Konva.Image>(null)
	const transformerRef = useRef<Konva.Transformer>(null)

	const [stageSize, setStageSize] = useState({ width: 360, height: 480 })
	const [photo, setPhoto] = useState<{
		url: string
		width: number
		height: number
	} | null>(null)
	const [photoElement, setPhotoElement] = useState<HTMLImageElement | null>(
		null,
	)
	const [tattooElement, setTattooElement] =
		useState<HTMLImageElement | null>(null)
	const [opacity, setOpacity] = useState(DEFAULT_OPACITY)
	const [scalePct, setScalePct] = useState(DEFAULT_SCALE)
	const [rotation, setRotation] = useState(DEFAULT_ROTATION)
	const [tattooPos, setTattooPos] = useState({ x: 0, y: 0 })
	const [error, setError] = useState<string | null>(null)

	/** Load default bundled tattoo asset on mount. */
	useEffect(() => {
		let cancelled = false
		loadHtmlImage(TRYON_DEFAULT_TATTOO_SRC)
			.then((img) => {
				if (!cancelled) setTattooElement(img)
			})
			.catch(() => {
				if (!cancelled) setError('Failed to load default tattoo asset')
			})
		return () => {
			cancelled = true
		}
	}, [])

	/** Resize stage to fit container width. */
	useEffect(() => {
		const node = containerRef.current
		if (!node) return

		const observer = new ResizeObserver((entries) => {
			const width = Math.floor(entries[0]?.contentRect.width ?? 360)
			const height = Math.round(width * (4 / 3))
			setStageSize({ width, height })
		})

		observer.observe(node)
		return () => observer.disconnect()
	}, [])

	/** Attach transformer to tattoo layer when ready. */
	useEffect(() => {
		const transformer = transformerRef.current
		const tattoo = tattooRef.current
		if (!transformer || !tattoo || !photoElement) return
		transformer.nodes([tattoo])
		transformer.getLayer()?.batchDraw()
	}, [photoElement, tattooElement, stageSize])

	/** Sync slider values to Konva tattoo node. */
	useEffect(() => {
		const tattoo = tattooRef.current
		if (!tattoo || !photoElement) return

		const baseScale =
			(stageSize.width * 0.35) / (tattooElement?.width ?? 1)
		const scale = baseScale * (scalePct / 50)

		tattoo.scaleX(scale)
		tattoo.scaleY(scale)
		tattoo.rotation(rotation)
		tattoo.opacity(opacity / 100)
		tattoo.getLayer()?.batchDraw()
	}, [opacity, scalePct, rotation, photoElement, tattooElement, stageSize])

	const resetTattoo = useCallback(
		(size = stageSize) => {
			setOpacity(DEFAULT_OPACITY)
			setScalePct(DEFAULT_SCALE)
			setRotation(DEFAULT_ROTATION)

			const centerX = size.width / 2
			const centerY = size.height / 2
			setTattooPos({ x: centerX, y: centerY })

			const tattoo = tattooRef.current
			if (tattoo) {
				tattoo.position({ x: centerX, y: centerY })
				tattoo.getLayer()?.batchDraw()
			}
		},
		[stageSize],
	)

	const applyInitialTattooPlacement = useCallback(
		(size: { width: number; height: number }) => {
			setOpacity(DEFAULT_OPACITY)
			setScalePct(DEFAULT_SCALE)
			setRotation(DEFAULT_ROTATION)
			setTattooPos({ x: size.width / 2, y: size.height / 2 })
		},
		[],
	)

	const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setError(null)

		if (!TRYON_ACCEPTED_TYPES.includes(file.type)) {
			setError('Unsupported file type')
			return
		}

		if (file.size > TRYON_MAX_FILE_BYTES) {
			setError('File exceeds 10 MB limit')
			return
		}

		try {
			if (photo?.url) URL.revokeObjectURL(photo.url)

			const prepared = await preparePhotoFile(file)
			const img = await loadHtmlImage(prepared.url)

			setPhoto(prepared)
			setPhotoElement(img)
			applyInitialTattooPlacement(stageSize)
		} catch {
			setError('Failed to process photo')
		}
	}

	const handleExport = () => {
		const stage = stageRef.current
		if (!stage || !photoElement) return

		const transformer = transformerRef.current
		transformer?.visible(false)
		stage.draw()

		const dataUrl = stage.toDataURL({ pixelRatio: 1, mimeType: 'image/png' })

		transformer?.visible(true)
		stage.draw()

		const link = document.createElement('a')
		link.download = 'otatu-tryon.png'
		link.href = dataUrl
		link.click()
	}

	const handleTattooDragEnd = () => {
		const tattoo = tattooRef.current
		if (!tattoo) return
		setTattooPos({ x: tattoo.x(), y: tattoo.y() })
	}

	const handleTransformEnd = () => {
		const tattoo = tattooRef.current
		if (!tattoo || !tattooElement) return

		const baseScale =
			(stageSize.width * 0.35) / tattooElement.width
		const applied = tattoo.scaleX()
		setScalePct(Math.round((applied / baseScale) * 50))
		setRotation(Math.round(tattoo.rotation()))
		setTattooPos({ x: tattoo.x(), y: tattoo.y() })
	}

	/** Scale photo to cover stage while preserving aspect ratio. */
	const getPhotoLayout = () => {
		if (!photo) {
			return {
				x: 0,
				y: 0,
				width: stageSize.width,
				height: stageSize.height,
			}
		}

		const scale = Math.max(
			stageSize.width / photo.width,
			stageSize.height / photo.height,
		)
		const width = photo.width * scale
		const height = photo.height * scale

		return {
			x: (stageSize.width - width) / 2,
			y: (stageSize.height - height) / 2,
			width,
			height,
		}
	}

	const photoLayout = getPhotoLayout()

	return (
		<div className="try-on-spike mt-6 space-y-4">
			<p className="text-xs text-accent/80 font-medium">{labels.proofNote}</p>

			<div className="try-on-grid gap-4 lg:gap-5">
				<section
					className="try-on-preview order-1 lg:order-2"
					aria-label={labels.preview}
				>
					<div
						ref={containerRef}
						className="relative rounded-2xl overflow-hidden bg-bg-muted shadow-sm min-h-[320px]"
						data-testid="tryon-stage-container"
						data-photo-loaded={photoElement ? 'true' : 'false'}
						data-tattoo-ready={tattooElement ? 'true' : 'false'}
					>
						<Stage
							ref={stageRef}
							width={stageSize.width}
							height={stageSize.height}
						>
							<Layer>
								{photoElement ? (
									<KonvaImage
										image={photoElement}
										x={photoLayout.x}
										y={photoLayout.y}
										width={photoLayout.width}
										height={photoLayout.height}
										listening={false}
									/>
								) : (
									<Rect
										width={stageSize.width}
										height={stageSize.height}
										fill="#e8e4df"
										listening={false}
									/>
								)}

								{photoElement && tattooElement && (
									<>
										<KonvaImage
											ref={tattooRef}
											image={tattooElement}
											x={tattooPos.x}
											y={tattooPos.y}
											offsetX={tattooElement.width / 2}
											offsetY={tattooElement.height / 2}
											draggable
											onDragEnd={handleTattooDragEnd}
											onTransformEnd={handleTransformEnd}
										/>
										<Transformer
											ref={transformerRef}
											rotateEnabled
											enabledAnchors={[
												'top-left',
												'top-right',
												'bottom-left',
												'bottom-right',
											]}
											boundBoxFunc={(oldBox, newBox) => {
												if (newBox.width < 20 || newBox.height < 20) {
													return oldBox
												}
												return newBox
											}}
										/>
									</>
								)}
							</Layer>
						</Stage>

						{!photoElement && (
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<p className="text-xs text-text-muted px-4 text-center">
									{labels.uploadHint}
								</p>
							</div>
						)}
					</div>
				</section>

				<section
					className="try-on-controls order-2 lg:order-3"
					aria-label={labels.controls}
				>
					<p className="text-xs text-text-muted mb-2 lg:mb-3">
						{labels.controls}
					</p>
					<div className="rounded-xl bg-bg-secondary/60 p-4 space-y-4">
						<ControlSlider
							label={labels.opacity}
							value={opacity}
							onChange={setOpacity}
							testId="tryon-opacity"
						/>
						<ControlSlider
							label={labels.size}
							value={scalePct}
							onChange={setScalePct}
							testId="tryon-scale"
						/>
						<ControlSlider
							label={labels.rotate}
							value={rotation}
							min={-180}
							max={180}
							onChange={setRotation}
							testId="tryon-rotation"
						/>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => resetTattoo()}
								disabled={!photoElement}
								className="flex-1 rounded-full border border-border-subtle py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-40"
								data-testid="tryon-reset"
							>
								{labels.reset}
							</button>
							<button
								type="button"
								onClick={handleExport}
								disabled={!photoElement}
								className="flex-1 rounded-full bg-accent py-2.5 text-sm text-text-inverse hover:bg-accent-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
								data-testid="tryon-export"
							>
								{labels.save}
							</button>
						</div>
					</div>
				</section>

				<section
					className="try-on-upload order-4 lg:order-1"
					aria-label={labels.upload}
				>
					<p className="text-xs text-text-muted mb-2 lg:mb-3">
						{labels.upload}
					</p>
					<label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-bg-secondary/40 p-6 min-h-[140px] lg:min-h-[200px] text-center cursor-pointer hover:border-accent/30 transition-colors">
						<input
							type="file"
							accept={TRYON_ACCEPTED_TYPES.join(',')}
							onChange={handleUpload}
							className="sr-only"
							data-testid="tryon-upload-input"
						/>
						<UploadIcon />
						<p className="mt-3 text-xs text-text-muted">{labels.uploadHint}</p>
					</label>
					{error && (
						<p className="mt-2 text-xs text-red-600" role="alert">
							{error}
						</p>
					)}
				</section>
			</div>
		</div>
	)
}

function ControlSlider({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	testId,
}: {
	label: string
	value: number
	onChange: (value: number) => void
	min?: number
	max?: number
	testId?: string
}) {
	return (
		<div>
			<div className="flex justify-between text-[11px] text-text-muted mb-1.5">
				<span>{label}</span>
				<span>{value}{max === 100 ? '%' : '°'}</span>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
				className="w-full h-1 accent-accent cursor-pointer"
				aria-label={label}
				data-testid={testId}
			/>
		</div>
	)
}

function UploadIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			className="text-text-muted/60"
			aria-hidden="true"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" y1="3" x2="12" y2="15" />
		</svg>
	)
}
