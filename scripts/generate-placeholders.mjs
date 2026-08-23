/**
 * Generates abstract tattoo-inspired SVG placeholders for Phase 1A prototype.
 * Run once: node scripts/generate-placeholders.mjs
 * License: original OTATU demo assets — free to use in this project.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images', 'placeholders')

mkdirSync(outDir, { recursive: true })

/** Skin-tone backgrounds and ink accent colors per placeholder. */
const palette = [
	{ bg: '#EDE8E1', ink: '#1A1A1A', accent: '#8B7355' },
	{ bg: '#F0EBE3', ink: '#2D2D2D', accent: '#6B5B4F' },
	{ bg: '#E8E4DC', ink: '#141414', accent: '#A69076' },
	{ bg: '#F5F0EA', ink: '#1F1F1F', accent: '#7A6A5A' },
	{ bg: '#EBE6DE', ink: '#252525', accent: '#9C8570' },
	{ bg: '#F2EDE6', ink: '#181818', accent: '#5C4F44' },
]

function svgContent(
	width,
	height,
	bg,
	ink,
	accent,
	seed,
) {
	// Pseudo-random decorative paths based on seed
	const cx = width / 2
	const cy = height / 2
	const r = Math.min(width, height) * 0.28

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.35"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.6}" fill="none" stroke="${ink}" stroke-width="2" opacity="0.5"/>
  <path d="M ${cx - r * 0.8} ${cy} Q ${cx} ${cy - r * 1.2} ${cx + r * 0.8} ${cy}" fill="none" stroke="${ink}" stroke-width="2.5" opacity="0.7"/>
  <path d="M ${cx - r * 0.5} ${cy + r * 0.3} C ${cx - r * 0.2} ${cy + r * 0.8} ${cx + r * 0.2} ${cy + r * 0.8} ${cx + r * 0.5} ${cy + r * 0.3}" fill="none" stroke="${ink}" stroke-width="2" opacity="0.6"/>
  <line x1="${cx - r}" y1="${cy + r * 0.5}" x2="${cx + r}" y2="${cy + r * 0.5}" stroke="${accent}" stroke-width="1" opacity="0.4"/>
  <text x="${width / 2}" y="${height - 24}" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${accent}" opacity="0.6">OTATU demo · ${seed}</text>
</svg>`
}

const files = [
	{ name: 'hero-collage.svg', w: 1200, h: 800, p: 0 },
	{ name: 'wolf-hero.svg', w: 800, h: 1000, p: 1 },
	{ name: 'wolf-moon.svg', w: 600, h: 750, p: 2 },
	{ name: 'wolf-snarl.svg', w: 600, h: 750, p: 3 },
	{ name: 'wolf-geo.svg', w: 600, h: 750, p: 4 },
	{ name: 'wolf-minimal.svg', w: 600, h: 750, p: 0 },
	{ name: 'tryon-preview.svg', w: 800, h: 600, p: 1 },
	{ name: 'article-01.svg', w: 640, h: 400, p: 2 },
	{ name: 'article-02.svg', w: 640, h: 400, p: 3 },
	{ name: 'article-03.svg', w: 640, h: 400, p: 4 },
	...Array.from({ length: 12 }, (_, i) => ({
		name: `design-${String(i + 1).padStart(2, '0')}.svg`,
		w: 480,
		h: 600,
		p: i % palette.length,
	})),
]

for (const file of files) {
	const { bg, ink, accent } = palette[file.p]
	const content = svgContent(file.w, file.h, bg, ink, accent, file.name)
	writeFileSync(join(outDir, file.name), content, 'utf8')
}

console.log(`Generated ${files.length} placeholder SVGs in ${outDir}`)
