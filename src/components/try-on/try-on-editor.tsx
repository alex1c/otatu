'use client'

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
} from 'react'
import Image from 'next/image'
import { Stage, Layer, Image as KonvaImage, Transformer, Rect } from 'react-konva'
import type Konva from 'konva'
import {
	loadHtmlImage,
	preparePhotoFile,
} from '@/lib/try-on/prepare-photo'
import {
	TRYON_ACCEPTED_TYPES,
	TRYON_MAX_FILE_BYTES,
} from '@/lib/try-on/constants'
import {
	TRYON_CATALOG,
	resolveTryOnDesign,
	type TryOnCatalogDesign,
} from '@/lib/try-on/design-catalog'

interface TryOnEditorLabels {
	upload: string
	uploadHint: string
	selectDesign: string
	customDesign: string
	customDesignHint: string
	preview: string
	controls: string
	opacity: string
	size: string
	rotate: string
	save: string
	reset: string
	startOver: string
	startOverConfirm: string
	removeTattoo: string
	errors: {
		unsupportedType: string
		fileTooLarge: string
		decodeError: string
		exportError: string
	}
	comparison: {
		label: string
		before: string
		after: string
		toggleBefore: string
		toggleAfter: string
	}
}

interface TryOnEditorProps {
	labels: TryOnEditorLabels
	/** Deep-link preselect from ?design= query param. */
	initialDesignSlug?: string | null
}

const DEFAULT_OPACITY = 70
const DEFAULT_SCALE = 50
const DEFAULT_ROTATION = 0

/** Browser-only try-on editor — Konva overlay with bundled + custom designs. */
export function TryOnEditor({ labels, initialDesignSlug }: TryOnEditorProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const stageRef = useRef<Konva.Stage>(null)
	const tattooRef = useRef<Konva.Image>(null)
	const transformerRef = useRef<Konva.Transformer>(null)

	const initialDesign = resolveTryOnDesign(initialDesignSlug)

	const [stageSize, setStageSize] = useState({ width: 360, height: 480 })
	const [photo, setPhoto] = useState<{
		url: string
		width: number
		height: number
	} | null>(null)
	const [photoElement, setPhotoElement] = useState<HTMLImageElement | null>(
		null,
	)
	const [selectedDesign, setSelectedDesign] =
		useState<TryOnCatalogDesign>(initialDesign)
	const [tattooElement, setTattooElement] =
		useState<HTMLImageElement | null>(null)
	const [customDesignName, setCustomDesignName] = useState<string | null>(null)
	const [opacity, setOpacity] = useState(DEFAULT_OPACITY)
	const [scalePct, setScalePct] = useState(DEFAULT_SCALE)
	const [rotation, setRotation] = useState(DEFAULT_ROTATION)
	const [tattooPos, setTattooPos] = useState({ x: 0, y: 0 })
	const [tattooVisible, setTattooVisible] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [warning, setWarning] = useState<string | null>(null)
	/**
	 * Mobile comparison toggle — 'after' shows the composite (default view),
	 * 'before' shows the original photo without tattoo overlay.
	 * On desktop, both panels are visible simultaneously.
	 */
	const [mobileView, setMobileView] = useState<'before' | 'after'>('after')

	/** Load selected bundled or custom tattoo asset. */
	const loadTattooFromSrc = useCallback(async (src: string) => {
		const img = await loadHtmlImage(src)
		setTattooElement(img)
		setTattooVisible(true)
		return img
	}, [])

	/** Initial bundled design from deep link or default. */
	useEffect(() => {
		let cancelled = false

		void loadHtmlImage(initialDesign.src)
			.then((img) => {
				if (cancelled) return
				setTattooElement(img)
				setTattooVisible(true)
			})
			.catch(() => {
				if (!cancelled) setError(labels.errors.decodeError)
			})

		return () => {
			cancelled = true
		}
	}, [initialDesign.src, labels.errors.decodeError])

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
		if (!transformer || !tattoo || !photoElement || !tattooVisible) return
		transformer.nodes([tattoo])
		transformer.getLayer()?.batchDraw()
	}, [photoElement, tattooElement, stageSize, tattooVisible])

	/** Sync slider values to Konva tattoo node. */
	useEffect(() => {
		const tattoo = tattooRef.current
		if (!tattoo || !photoElement || !tattooElement || !tattooVisible) return

		const baseScale =
			(stageSize.width * 0.35) / (tattooElement.width || 1)
		const scale = baseScale * (scalePct / 50)

		tattoo.scaleX(scale)
		tattoo.scaleY(scale)
		tattoo.rotation(rotation)
		tattoo.opacity(opacity / 100)
		tattoo.getLayer()?.batchDraw()
	}, [
		opacity,
		scalePct,
		rotation,
		photoElement,
		tattooElement,
		stageSize,
		tattooVisible,
	])

	const resetTattooTransform = useCallback(
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

	const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setError(null)
		setWarning(null)

		if (!TRYON_ACCEPTED_TYPES.includes(file.type)) {
			setError(labels.errors.unsupportedType)
			return
		}

		if (file.size > TRYON_MAX_FILE_BYTES) {
			setError(labels.errors.fileTooLarge)
			return
		}

		try {
			if (photo?.url) URL.revokeObjectURL(photo.url)

			const prepared = await preparePhotoFile(file)
			const img = await loadHtmlImage(prepared.url)

			setPhoto(prepared)
			setPhotoElement(img)
			applyInitialTattooPlacement(stageSize)
			resetTattooTransform(stageSize)
		} catch {
			setError(labels.errors.decodeError)
		}

		event.target.value = ''
	}

	const handleCustomDesignUpload = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0]
		if (!file) return

		setError(null)
		setWarning(null)

		if (!TRYON_ACCEPTED_TYPES.includes(file.type)) {
			setError(labels.errors.unsupportedType)
			return
		}

		if (file.size > TRYON_MAX_FILE_BYTES) {
			setError(labels.errors.fileTooLarge)
			return
		}

		if (file.type === 'image/jpeg') {
			setWarning(labels.customDesignHint)
		}

		try {
			const url = URL.createObjectURL(file)
			await loadTattooFromSrc(url)
			setCustomDesignName(file.name)
			setSelectedDesign({
				slug: 'custom',
				title: file.name,
				src: url,
				hasTransparentBg: file.type !== 'image/jpeg',
			})
			if (photoElement) resetTattooTransform(stageSize)
		} catch {
			setError(labels.errors.decodeError)
		}

		event.target.value = ''
	}

	const handleSelectDesign = async (design: TryOnCatalogDesign) => {
		setError(null)
		setCustomDesignName(null)
		setSelectedDesign(design)
		try {
			await loadTattooFromSrc(design.src)
			if (photoElement) resetTattooTransform(stageSize)
		} catch {
			setError(labels.errors.decodeError)
		}
	}

	const handleRemoveTattoo = () => {
		setTattooVisible(false)
		transformerRef.current?.nodes([])
	}

	const handleExport = () => {
		const stage = stageRef.current
		if (!stage || !photoElement) return

		try {
			const transformer = transformerRef.current
			transformer?.visible(false)
			stage.draw()

			const dataUrl = stage.toDataURL({
				pixelRatio: 1,
				mimeType: 'image/png',
			})

			transformer?.visible(true)
			stage.draw()

			const link = document.createElement('a')
			link.download = 'otatu-tryon.png'
			link.href = dataUrl
			link.click()
		} catch {
			setError(labels.errors.exportError)
		}
	}

	const handleStartOver = () => {
		if (photoElement) {
			const confirmed = window.confirm(labels.startOverConfirm)
			if (!confirmed) return
		}

		if (photo?.url) URL.revokeObjectURL(photo.url)

		setPhoto(null)
		setPhotoElement(null)
		setError(null)
		setWarning(null)
		setCustomDesignName(null)
		setTattooVisible(true)
		setSelectedDesign(initialDesign)
		// Clear comparison state — Before/After only meaningful when photo is loaded.
		setMobileView('after')
		loadTattooFromSrc(initialDesign.src).catch(() => {
			setError(labels.errors.decodeError)
		})
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
	const readyCatalog = TRYON_CATALOG.filter((design) => design.hasTransparentBg)

	return (
		<div className="try-on-editor mt-6 space-y-4">
			<div className="try-on-grid gap-4 lg:gap-5">
			{/* Mobile order: 1 preview — Before/After comparison section */}
			<section
				className="try-on-preview order-1"
				aria-label={labels.comparison.label}
			>
				{/* Mobile segmented toggle — only visible when photo is loaded */}
				{photoElement && (
					<div
						className="flex sm:hidden mb-2 rounded-full border border-border-subtle overflow-hidden w-fit"
						role="group"
						aria-label={labels.comparison.label}
					>
						<button
							type="button"
							onClick={() => setMobileView('before')}
							className={`px-4 py-1.5 text-xs font-medium transition-colors ${
								mobileView === 'before'
									? 'bg-text-primary text-bg-primary'
									: 'text-text-secondary hover:text-text-primary'
							}`}
							aria-pressed={mobileView === 'before'}
							data-testid="tryon-toggle-before"
						>
							{labels.comparison.before}
						</button>
						<button
							type="button"
							onClick={() => setMobileView('after')}
							className={`px-4 py-1.5 text-xs font-medium transition-colors ${
								mobileView === 'after'
									? 'bg-text-primary text-bg-primary'
									: 'text-text-secondary hover:text-text-primary'
							}`}
							aria-pressed={mobileView === 'after'}
							data-testid="tryon-toggle-after"
						>
							{labels.comparison.after}
						</button>
					</div>
				)}

				{/* Desktop: two-panel side-by-side comparison.
				    Mobile: single panel controlled by toggle above. */}
				<div
					className={`grid gap-3 ${
						photoElement ? 'sm:grid-cols-2' : 'grid-cols-1'
					}`}
					data-testid="tryon-comparison-grid"
				>
					{/* BEFORE panel — original photo, no tattoo overlay */}
					{photoElement && (
						<div
							className={`relative rounded-2xl overflow-hidden bg-bg-muted shadow-sm ${
								mobileView === 'after' ? 'hidden sm:block' : 'block'
							}`}
							style={{ aspectRatio: `${stageSize.width} / ${stageSize.height}` }}
							data-testid="tryon-before-panel"
							aria-label={labels.comparison.before}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={photo!.url}
								alt={labels.comparison.before}
								className="absolute inset-0 w-full h-full object-cover"
								draggable={false}
							/>
							<span
								className="absolute top-2 left-2 rounded-full bg-bg-primary/80 px-2 py-0.5 text-[10px] text-text-secondary"
								aria-hidden="true"
							>
								{labels.comparison.before}
							</span>
						</div>
					)}

					{/* AFTER panel — Konva stage with tattoo overlay */}
					<div
						ref={containerRef}
						className={`relative rounded-2xl overflow-hidden bg-bg-muted shadow-sm min-h-[320px] ${
							photoElement && mobileView === 'before'
								? 'hidden sm:block'
								: 'block'
						}`}
						data-testid="tryon-stage-container"
						data-photo-loaded={photoElement ? 'true' : 'false'}
						data-tattoo-ready={tattooElement ? 'true' : 'false'}
						data-design-slug={selectedDesign.slug}
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

								{photoElement && tattooElement && tattooVisible && (
									<>
										<KonvaImage
											ref={tattooRef}
											image={tattooElement}
											x={tattooPos.x}
											y={tattooPos.y}
											offsetX={tattooElement.width / 2}
											offsetY={tattooElement.height / 2}
											draggable
											globalCompositeOperation="multiply"
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
												if (
													newBox.width < 20 ||
													newBox.height < 20
												) {
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

						{/* After label — only visible when Before panel is also shown */}
						{photoElement && (
							<span
								className="absolute top-2 left-2 rounded-full bg-bg-primary/80 px-2 py-0.5 text-[10px] text-text-secondary"
								aria-hidden="true"
							>
								{labels.comparison.after}
							</span>
						)}
					</div>
				</div>
			</section>

				{/* Mobile order: 2 design picker */}
				<section
					className="try-on-picker order-2"
					aria-label={labels.selectDesign}
				>
					<p className="text-xs text-text-muted mb-2">{labels.selectDesign}</p>
					<div
						className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x"
						data-testid="tryon-design-picker"
					>
						{readyCatalog.map((design) => {
							const isActive = selectedDesign.slug === design.slug
							return (
								<button
									key={design.slug}
									type="button"
									onClick={() => handleSelectDesign(design)}
									className={`shrink-0 snap-start w-[88px] rounded-xl border p-1.5 text-left transition-colors ${
										isActive
											? 'border-accent bg-bg-secondary'
											: 'border-border-subtle bg-bg-secondary/40 hover:border-accent/30'
									}`}
									data-testid={`tryon-design-${design.slug}`}
									aria-pressed={isActive}
									aria-label={design.title}
								>
									<div className="relative aspect-square overflow-hidden rounded-lg bg-bg-muted">
										<Image
											src={design.src}
											alt=""
											fill
											className="object-contain p-1"
											sizes="88px"
										/>
									</div>
									<span className="mt-1.5 block text-[10px] leading-tight text-text-secondary line-clamp-2">
										{design.title}
									</span>
								</button>
							)
						})}
					</div>
					{readyCatalog.length === 0 && (
						<p className="mt-2 text-[11px] text-text-muted" data-testid="tryon-ready-gap">
							Встроенные прозрачные эскизы временно недоступны. Загрузите свой PNG/WebP с прозрачным фоном.
						</p>
					)}

					<div className="mt-3">
						<label className="flex items-center gap-2 rounded-xl border border-dashed border-border-subtle bg-bg-secondary/40 px-3 py-2.5 cursor-pointer hover:border-accent/30 transition-colors min-h-[44px]">
							<input
								type="file"
								accept={TRYON_ACCEPTED_TYPES.join(',')}
								onChange={handleCustomDesignUpload}
								className="sr-only"
								data-testid="tryon-custom-design-input"
								aria-label={labels.customDesign}
							/>
							<UploadIcon />
							<span className="text-xs text-text-muted">
								{labels.customDesign}
							</span>
						</label>
						{customDesignName && (
							<p className="mt-1 text-[10px] text-text-muted truncate">
								{customDesignName}
							</p>
						)}
						{warning && (
							<p className="mt-1 text-[10px] text-amber-700" role="status">
								{warning}
							</p>
						)}
					</div>
				</section>

				{/* Mobile order: 3 controls */}
				<section
					className="try-on-controls order-3"
					aria-label={labels.controls}
				>
					<p className="text-xs text-text-muted mb-2">{labels.controls}</p>
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
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => resetTattooTransform()}
								disabled={!photoElement}
								className="flex-1 min-w-[120px] rounded-full border border-border-subtle py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-40"
								data-testid="tryon-reset"
							>
								{labels.reset}
							</button>
							<button
								type="button"
								onClick={handleRemoveTattoo}
								disabled={!photoElement || !tattooVisible}
								className="flex-1 min-w-[120px] rounded-full border border-border-subtle py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-40"
								data-testid="tryon-remove-tattoo"
							>
								{labels.removeTattoo}
							</button>
						</div>
					</div>
				</section>

				{/* Mobile order: 4 upload + actions */}
				<section
					className="try-on-upload order-4 space-y-3"
					aria-label={labels.upload}
				>
					<p className="text-xs text-text-muted">{labels.upload}</p>
					<label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-bg-secondary/40 p-5 min-h-[120px] text-center cursor-pointer hover:border-accent/30 transition-colors">
						<input
							type="file"
							accept={TRYON_ACCEPTED_TYPES.join(',')}
							capture="environment"
							onChange={handlePhotoUpload}
							className="sr-only"
							data-testid="tryon-upload-input"
							aria-label={labels.upload}
						/>
						<UploadIcon />
						<p className="mt-2 text-xs text-text-muted">{labels.uploadHint}</p>
					</label>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleStartOver}
							className="flex-1 rounded-full border border-border-subtle py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
							data-testid="tryon-start-over"
						>
							{labels.startOver}
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

					{error && (
						<p className="text-xs text-red-600" role="alert">
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
				<span>
					{value}
					{max === 100 ? '%' : '°'}
				</span>
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
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			className="text-text-muted/60 shrink-0"
			aria-hidden="true"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" y1="3" x2="12" y2="15" />
		</svg>
	)
}
