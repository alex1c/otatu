/**
 * Generates abstract SVG placeholders with varied aspect ratios.
 * Run: node scripts/generate-placeholders.mjs
 * License: original OTATU demo assets.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images', 'placeholders')

mkdirSync(outDir, { recursive: true })

const palette = [
	{ bg: '#EDE8E1', ink: '#1A1A1A', accent: '#8B7355' },
	{ bg: '#F0EBE3', ink: '#2D2D2D', accent: '#6B5B4F' },
	{ bg: '#E8E4DC', ink: '#141414', accent: '#A69076' },
	{ bg: '#F5F0EA', ink: '#1F1F1F', accent: '#7A6A5A' },
	{ bg: '#EBE6DE', ink: '#252525', accent: '#9C8570' },
	{ bg: '#F2EDE6', ink: '#181818', accent: '#5C4F44' },
]

function svgContent(width, height, bg, ink, accent, label) {
	const cx = width / 2
	const cy = height / 2
	const r = Math.min(width, height) * 0.28

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.35"/>
  <path d="M ${cx - r * 0.8} ${cy} Q ${cx} ${cy - r * 1.1} ${cx + r * 0.8} ${cy}" fill="none" stroke="${ink}" stroke-width="2.5" opacity="0.65"/>
  <text x="${width / 2}" y="${height - 20}" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="${accent}" opacity="0.55">${label}</text>
</svg>`
}

/** Each entry defines filename, dimensions, and palette index. */
const files = [
	{ name: 'hero-01.svg', w: 960, h: 1200, p: 0, label: 'hero-01 · 4:5' },
	{ name: 'hero-02.svg', w: 720, h: 960, p: 1, label: 'hero-02 · 3:4' },
	{ name: 'hero-03.svg', w: 640, h: 640, p: 2, label: 'hero-03 · 1:1' },
	{ name: 'wolf-hero.svg', w: 800, h: 1000, p: 3, label: 'wolf hero' },
	{ name: 'wolf-g01.svg', w: 800, h: 1000, p: 0, label: 'wolf g01 · 4:5' },
	{ name: 'wolf-g02.svg', w: 600, h: 750, p: 1, label: 'wolf g02 · 4:5' },
	{ name: 'wolf-g03.svg', w: 800, h: 600, p: 2, label: 'wolf g03 · 4:3' },
	{ name: 'wolf-moon.svg', w: 600, h: 750, p: 4, label: 'wolf moon' },
	{ name: 'wolf-snarl.svg', w: 600, h: 750, p: 5, label: 'wolf snarl' },
	{ name: 'wolf-geo.svg', w: 600, h: 750, p: 3, label: 'wolf geo' },
	{ name: 'wolf-minimal.svg', w: 600, h: 750, p: 0, label: 'wolf minimal' },
	{ name: 'coll-arm.svg', w: 960, h: 720, p: 1, label: 'coll arm · 4:3' },
	{ name: 'coll-small.svg', w: 720, h: 960, p: 2, label: 'coll small · 3:4' },
	{ name: 'coll-meaning.svg', w: 800, h: 800, p: 4, label: 'coll meaning · 1:1' },
	{ name: 'tryon-preview.svg', w: 800, h: 1000, p: 0, label: 'try-on preview' },
	{ name: 'article-01.svg', w: 640, h: 400, p: 3, label: 'article 01' },
	{ name: 'article-02.svg', w: 640, h: 400, p: 5, label: 'article 02' },
	{ name: 'article-03.svg', w: 640, h: 400, p: 1, label: 'article 03' },
	{ name: 'design-01.svg', w: 480, h: 600, p: 0, label: '4:5 portrait' },
	{ name: 'design-02.svg', w: 480, h: 720, p: 1, label: '2:3 tall' },
	{ name: 'design-03.svg', w: 480, h: 480, p: 2, label: '1:1 square' },
	{ name: 'design-04.svg', w: 600, h: 480, p: 3, label: '5:4 landscape' },
	{ name: 'design-05.svg', w: 480, h: 600, p: 4, label: '4:5 portrait' },
	{ name: 'design-06.svg', w: 480, h: 720, p: 5, label: '2:3 tall' },
	{ name: 'design-07.svg', w: 480, h: 480, p: 0, label: '1:1 square' },
	{ name: 'design-08.svg', w: 480, h: 600, p: 1, label: '4:5 portrait' },
	{ name: 'design-09.svg', w: 600, h: 480, p: 2, label: '5:4 landscape' },
	{ name: 'design-10.svg', w: 480, h: 720, p: 3, label: '2:3 tall' },
	{ name: 'design-11.svg', w: 480, h: 600, p: 4, label: '4:5 portrait' },
	{ name: 'design-12.svg', w: 480, h: 480, p: 5, label: '1:1 square' },
]

for (const file of files) {
	const { bg, ink, accent } = palette[file.p]
	writeFileSync(
		join(outDir, file.name),
		svgContent(file.w, file.h, bg, ink, accent, file.label),
		'utf8',
	)
}

console.log(`Generated ${files.length} placeholder SVGs`)
