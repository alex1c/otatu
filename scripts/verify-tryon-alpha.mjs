/**
 * Verifies Try-On catalog assets exist and have real alpha transparency.
 * Run: node scripts/verify-tryon-alpha.mjs
 */
import sharp from 'sharp'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

/** Slugs that must be TRYON READY after Media Pack v2. */
const REQUIRED = [
	'rose-transparent',
	'snake-transparent',
	'wolf-transparent',
	'bird-transparent',
	'compass-transparent',
	'anchor-transparent',
]

async function verifyFile(relPath) {
	const abs = join(root, 'public', relPath.replace(/^\//, '').replace(/^images\//, 'images/'))
	const publicPath = join(root, 'public', relPath.replace(/^\//, ''))
	const path = existsSync(publicPath) ? publicPath : abs
	if (!existsSync(path)) {
		throw new Error(`Missing file: ${relPath}`)
	}
	const meta = await sharp(path).metadata()
	const { data, info } = await sharp(path)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true })
	let transparent = 0
	for (let i = 3; i < data.length; i += info.channels) {
		if (data[i] < 8) transparent += 1
	}
	if (!meta.hasAlpha || transparent < 100) {
		throw new Error(
			`INVALID TRANSPARENCY: ${relPath} (hasAlpha=${meta.hasAlpha}, transparent=${transparent})`,
		)
	}
	return { path: relPath, transparent, width: meta.width, height: meta.height }
}

async function main() {
	const catalogPath = join(root, 'src', 'lib', 'try-on', 'design-catalog.ts')
	const catalogSrc = readFileSync(catalogPath, 'utf8')

	for (const slug of REQUIRED) {
		if (!catalogSrc.includes(`slug: '${slug}'`)) {
			throw new Error(`Catalog missing slug: ${slug}`)
		}
		const src = `/images/tryon/${slug}.webp`
		const result = await verifyFile(src)
		console.log(`✓ ${slug} alpha OK (${result.transparent} transparent px)`)
	}

	// Motif fixtures must deep-link to transparent designs
	const motifsPath = join(root, 'src', 'data', 'fixtures', 'motifs.ts')
	const motifsSrc = readFileSync(motifsPath, 'utf8')
	for (const pair of [
		["slug: 'rose'", "tryOnDesignSlug: 'rose-transparent'"],
		["slug: 'snake'", "tryOnDesignSlug: 'snake-transparent'"],
		["slug: 'wolf'", "tryOnDesignSlug: 'wolf-transparent'"],
	]) {
		const idx = motifsSrc.indexOf(pair[0])
		if (idx < 0) throw new Error(`Motif block not found: ${pair[0]}`)
		const slice = motifsSrc.slice(idx, idx + 2500)
		if (!slice.includes(pair[1])) {
			throw new Error(`Deep-link missing near ${pair[0]}: expected ${pair[1]}`)
		}
		console.log(`✓ motif deep-link ${pair[1]}`)
	}

	// Rose/Snake heroes must use rose/snake assets
	if (!motifsSrc.includes("withAlt('rose01'") && !motifsSrc.includes("getPlaceholder('rose01'")) {
		throw new Error('Rose hero must use rose01 asset')
	}
	if (!motifsSrc.includes("withAlt('snake01'") && !motifsSrc.includes("getPlaceholder('snake01'")) {
		throw new Error('Snake hero must use snake01 asset')
	}
	console.log('✓ rose/snake heroes map to motif assets')

	console.log('\nTry-On alpha + motif mapping verification passed')
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
