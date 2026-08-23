/**
 * Integrates incoming generated assets + approved Pexels stock into public/images.
 * Run: node scripts/integrate-assets.mjs
 */
import sharp from 'sharp'
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const incoming = join(root, 'incoming-assets')
const outRoot = join(root, 'public', 'images')

/** Maps asset ID to output folder under public/images */
function outputPath(assetId) {
	if (assetId.startsWith('hero-')) return join('hero', `${assetId}.webp`)
	if (assetId.startsWith('coll-')) return join('collections', `${assetId}.webp`)
	if (assetId.startsWith('design-')) return join('designs', `${assetId}.webp`)
	if (assetId.startsWith('wolf-')) return join('wolf', `${assetId}.webp`)
	if (assetId.startsWith('article-')) return join('editorial', `${assetId}.webp`)
	if (assetId.startsWith('tryon-')) return join('tryon', `${assetId}.webp`)
	return `${assetId}.webp`
}

/** Approved Pexels sources from OTATU_STOCK_SOURCES.md */
const pexelsStock = {
	'hero-01': { id: 5088486, author: 'cottonbro studio', url: 'https://www.pexels.com/photo/close-up-of-an-arm-tattoo-5088486/', w: 1200 },
	'hero-02': { id: 8182285, author: 'RDNE Stock project', url: 'https://www.pexels.com/photo/close-up-shot-of-a-woman-holding-her-hair-8182285/', w: 1200 },
	'hero-03': { id: 34155039, author: 'Slava Kol', url: 'https://www.pexels.com/photo/minimalist-line-art-tattoo-on-arm-34155039/', w: 1000 },
	'coll-small': { id: 7147839, author: 'Michael Burrows', url: 'https://www.pexels.com/photo/crop-faceless-woman-showing-tattoos-on-arm-7147839/', w: 1200 },
	'coll-meaning': { id: 1993189, author: 'Leticia Ribeiro', url: 'https://www.pexels.com/photo/black-wrist-tattoo-1993189/', w: 1200 },
	'coll-arm': { id: 9079557, author: 'Lisa', url: 'https://www.pexels.com/photo/tattoo-on-arm-9079557/', w: 1600, reserve: true },
	'design-01': { id: 27847860, author: 'Nguyen Ngoc Tien', url: 'https://www.pexels.com/photo/sweat-and-wolf-tattoo-27847860/', w: 960 },
	'design-04': { id: 4750247, author: 'Kaboompics', url: 'https://www.pexels.com/photo/tattoo-on-an-arm-4750247/', w: 1200 },
	'design-05': { id: 17992192, author: 'Alican Helik', url: 'https://www.pexels.com/photo/close-up-of-a-tattoo-on-the-back-of-the-arm-of-a-woman-17992192/', w: 960 },
	'design-06': { id: 3214681, author: 'Ralph Rabago', url: 'https://www.pexels.com/photo/close-up-photo-of-woman-s-tattooed-arm-3214681/', w: 800 },
	'design-08': { id: 6044740, author: 'Skylar Kang', url: 'https://www.pexels.com/photo/faceless-person-demonstrating-tattoos-on-arm-in-sunlight-6044740/', w: 960 },
	'design-10': { id: 7237673, author: 'Jonathan Borba', url: 'https://www.pexels.com/photo/woman-with-tattoos-siting-on-grass-with-bunch-of-flowers-7237673/', w: 800 },
	'wolf-g01': { id: 17573238, author: 'Fatih Doğrul', url: 'https://www.pexels.com/photo/man-tattooing-wolf-on-arm-17573238/', w: 1200 },
	'wolf-g02': { id: 27847860, author: 'Nguyen Ngoc Tien', url: 'https://www.pexels.com/photo/sweat-and-wolf-tattoo-27847860/', w: 900 },
	'article-02': { id: 35833291, author: 'Matheus Bertelli', url: 'https://www.pexels.com/photo/tattoo-artist-inking-a-forearm-design-35833291/', w: 1280 },
}

const generatedMap = {
	'wolf-moon.png': 'wolf-moon',
	'wolf-snarl.png': 'wolf-snarl',
	'wolf-geo.png': 'wolf-geo',
	'wolf-minimal.png': 'wolf-minimal',
	'wolf-g03.png': 'wolf-g03',
	'design-03-wolf-geometric.png': 'design-03',
	'design-07-bird-linework.png': 'design-07',
	'design-09-dragon.png': 'design-09',
	'design-11-compass.png': 'design-11',
	'design-12-anchor.png': 'design-12',
	'tryon-preview.png': 'tryon-preview',
}

const manualRequired = []

function pexelsUrl(photoId, width) {
	return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

async function downloadPexels(assetId, meta) {
	const rel = outputPath(assetId)
	const outPath = join(outRoot, rel)
	mkdirSync(dirname(outPath), { recursive: true })

	try {
		const res = await fetch(pexelsUrl(meta.id, meta.w), {
			headers: { 'User-Agent': 'OTATU-AssetIntegrator/1.0' },
		})
		if (!res.ok) throw new Error(`HTTP ${res.status}`)
		const buf = Buffer.from(await res.arrayBuffer())
		await sharp(buf).webp({ quality: 85 }).toFile(outPath)
		const finalMeta = await sharp(outPath).metadata()
		return {
			id: assetId,
			path: `/images/${rel.replace(/\\/g, '/')}`,
			width: finalMeta.width ?? meta.w,
			height: finalMeta.height ?? Math.round(meta.w * 1.25),
			source: 'pexels',
			author: meta.author,
			url: meta.url,
			reserve: meta.reserve ?? false,
		}
	} catch (err) {
		manualRequired.push({ assetId, url: meta.url, author: meta.author, error: String(err) })
		return null
	}
}

async function processGenerated(filename, assetId) {
	const src = join(incoming, filename)
	if (!existsSync(src)) {
		manualRequired.push({ assetId, error: `Missing ${filename}` })
		return null
	}
	const rel = outputPath(assetId)
	const outPath = join(outRoot, rel)
	mkdirSync(dirname(outPath), { recursive: true })
	await sharp(src).webp({ quality: 88 }).toFile(outPath)
	const meta = await sharp(outPath).metadata()
	return {
		id: assetId,
		path: `/images/${rel.replace(/\\/g, '/')}`,
		width: meta.width ?? 800,
		height: meta.height ?? 1000,
		source: 'generated',
	}
}

/** design-02 tall portrait — cropped from wolf-minimal generated asset */
async function processDesign02() {
	const src = join(incoming, 'wolf-minimal.png')
	const outPath = join(outRoot, 'designs', 'design-02.webp')
	mkdirSync(dirname(outPath), { recursive: true })
	await sharp(src)
		.resize({ width: 800, height: 1200, fit: 'cover', position: 'centre' })
		.webp({ quality: 88 })
		.toFile(outPath)
	const meta = await sharp(outPath).metadata()
	return {
		id: 'design-02',
		path: '/images/designs/design-02.webp',
		width: meta.width ?? 800,
		height: meta.height ?? 1200,
		source: 'generated',
		note: 'cropped from wolf-minimal.png',
	}
}

async function main() {
	mkdirSync(outRoot, { recursive: true })
	const manifest = []

	for (const [filename, assetId] of Object.entries(generatedMap)) {
		const result = await processGenerated(filename, assetId)
		if (result) {
			manifest.push(result)
			console.log(`✓ generated ${assetId}`)
		}
	}

	manifest.push(await processDesign02())
	console.log('✓ generated design-02')

	for (const [assetId, meta] of Object.entries(pexelsStock)) {
		const result = await downloadPexels(assetId, meta)
		if (result) {
			manifest.push(result)
			console.log(`✓ pexels ${assetId}`)
		} else {
			console.log(`✗ pexels ${assetId}`)
		}
	}

	writeFileSync(
		join(root, 'scripts', 'asset-manifest.json'),
		JSON.stringify({ manifest, manualRequired }, null, 2),
	)
	console.log(`\nDone: ${manifest.length} integrated, ${manualRequired.length} manual.`)
}

main().catch(console.error)
