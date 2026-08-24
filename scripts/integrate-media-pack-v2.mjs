/**
 * Integrate Media Pack v2 — transparent Try-On overlays + approved Pexels stock.
 * Run: node scripts/integrate-media-pack-v2.mjs
 */
import sharp from 'sharp'
import {
	mkdirSync,
	existsSync,
	copyFileSync,
	writeFileSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const packRoot = join(root, '_media_pack_v2_tmp', 'otatu_media_pack_v2')
const tryonSrc = join(packRoot, 'tryon-designs')
const outRoot = join(root, 'public', 'images')
const tryonOut = join(outRoot, 'tryon')
const motifsOut = join(outRoot, 'motifs')
const bodyOut = join(outRoot, 'body')
const stylesOut = join(outRoot, 'styles')
const collectionsOut = join(outRoot, 'collections')

/** Approved stock from Media Pack STOCK_SOURCES.md — skip known weak doodles. */
const stock = [
	// ROSE
	{ id: 'rose-01', pexelsId: 8182253, author: 'RDNE Stock project', url: 'https://www.pexels.com/photo/person-with-rose-arm-tattoo-8182253/', w: 1200, folder: 'motifs' },
	{ id: 'rose-02', pexelsId: 29004935, author: 'Mert Coşkun', url: 'https://www.pexels.com/photo/elegant-arm-tattoo-of-woman-and-rose-29004935/', w: 1200, folder: 'motifs' },
	{ id: 'rose-03', pexelsId: 34426368, author: 'BULE', url: 'https://www.pexels.com/photo/black-and-white-portrait-of-rose-tattoo-on-back-34426368/', w: 1200, folder: 'motifs' },
	{ id: 'rose-04', pexelsId: 7246345, author: 'jovan curayag', url: 'https://www.pexels.com/photo/pink-flower-tattoo-on-a-person-s-back-7246345/', w: 1200, folder: 'motifs' },
	{ id: 'rose-05', pexelsId: 17187122, author: 'Ярослава Коваль', url: 'https://www.pexels.com/photo/studio-shot-of-a-young-woman-with-a-tattoo-on-the-wrist-17187122/', w: 1000, folder: 'motifs' },
	// SNAKE (snake-01 already exists as design-06 — re-download under motifs for clarity)
	{ id: 'snake-01', pexelsId: 3214681, author: 'Ralph Rabago', url: 'https://www.pexels.com/photo/close-up-photo-of-woman-s-tattooed-arm-3214681/', w: 1000, folder: 'motifs' },
	{ id: 'snake-02', pexelsId: 10216610, author: 'Jesus Con S Silbada', url: 'https://www.pexels.com/photo/person-in-red-shirt-and-jogging-pants-10216610/', w: 1200, folder: 'motifs' },
	{ id: 'snake-03', pexelsId: 10216618, author: 'Jesus Con S Silbada', url: 'https://www.pexels.com/photo/a-woman-in-red-shirt-with-tattoo-on-her-hand-10216618/', w: 1200, folder: 'motifs' },
	{ id: 'snake-04', pexelsId: 17239873, author: 'Chúng tớ Thích chụp ảnh', url: 'https://www.pexels.com/photo/portrait-of-a-brunet-17239873/', w: 1200, folder: 'motifs' },
	{ id: 'snake-05', pexelsId: 15288940, author: 'Amine İspir', url: 'https://www.pexels.com/photo/snake-tattoo-on-woman-arm-15288940/', w: 1200, folder: 'motifs' },
	// MINIMALISM — skip duck (17992192); reuse existing where possible via new filenames for clear mapping
	{ id: 'minimal-05', pexelsId: 9370001, author: 'Jonaorle', url: 'https://www.pexels.com/photo/close-up-shot-of-tattoo-on-a-person-s-arm-9370001/', w: 1000, folder: 'styles' },
	// SMALL — skip duck (17992205) and cartoon wrist (8182285)
	{ id: 'small-01', pexelsId: 3155386, author: 'Valeriia Miller', url: 'https://www.pexels.com/photo/photo-of-person-s-wrist-3155386/', w: 1000, folder: 'collections' },
	{ id: 'small-03', pexelsId: 18807268, author: 'Olga K', url: 'https://www.pexels.com/photo/hands-of-a-woman-wearing-a-small-heart-tattoo-18807268/', w: 1000, folder: 'collections' },
	{ id: 'small-05', pexelsId: 3421971, author: 'ANDRÉ FELLIPE', url: 'https://www.pexels.com/photo/photo-of-tattoo-near-person-s-ear-3421971/', w: 1000, folder: 'collections' },
	{ id: 'small-06', pexelsId: 4348034, author: 'ArtHouse Studio', url: 'https://www.pexels.com/photo/crop-slim-young-woman-with-arrow-tattoo-taking-off-light-top-4348034/', w: 1000, folder: 'collections' },
	// ARM diversity
	{ id: 'arm-02', pexelsId: 13771084, author: 'Mizuno K', url: 'https://www.pexels.com/photo/close-up-of-tattoos-on-an-arm-13771084/', w: 1200, folder: 'body' },
	{ id: 'arm-03', pexelsId: 17945125, author: 'Nur Demirbaş', url: 'https://www.pexels.com/photo/tattoo-on-the-biceps-of-embraced-heart-17945125/', w: 1200, folder: 'body' },
]

const tryonDesigns = [
	{ file: 'rose-transparent.png', slug: 'rose-transparent', title: 'Роза — fine-line' },
	{ file: 'snake-transparent.png', slug: 'snake-transparent', title: 'Змея — linework' },
	{ file: 'wolf-transparent.png', slug: 'wolf-transparent', title: 'Волк — контур' },
	{ file: 'bird-transparent.png', slug: 'bird-transparent', title: 'Птица — linework' },
	{ file: 'compass-transparent.png', slug: 'compass-transparent', title: 'Компас — геометрия' },
	{ file: 'anchor-transparent.png', slug: 'anchor-transparent', title: 'Якорь — минимализм' },
]

function pexelsCdnUrl(photoId, width) {
	return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

async function verifyAlpha(pngPath) {
	const meta = await sharp(pngPath).metadata()
	const { data, info } = await sharp(pngPath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true })
	let transparent = 0
	for (let i = 3; i < data.length; i += info.channels) {
		if (data[i] < 8) transparent += 1
	}
	return {
		hasAlpha: meta.hasAlpha === true,
		channels: meta.channels,
		width: meta.width,
		height: meta.height,
		transparentPixels: transparent,
		ready: meta.hasAlpha === true && transparent > 100,
	}
}

async function integrateTryOn() {
	mkdirSync(tryonOut, { recursive: true })
	const results = []

	for (const design of tryonDesigns) {
		const src = join(tryonSrc, design.file)
		if (!existsSync(src)) {
			results.push({ ...design, status: 'MISSING' })
			continue
		}

		const check = await verifyAlpha(src)
		if (!check.ready) {
			results.push({ ...design, status: 'INVALID TRANSPARENCY', check })
			continue
		}

		// Keep PNG with alpha for reliable overlay; also write WebP+alpha for catalog thumbs.
		const pngOut = join(tryonOut, `${design.slug}.png`)
		const webpOut = join(tryonOut, `${design.slug}.webp`)
		copyFileSync(src, pngOut)
		await sharp(src)
			.resize({ width: 900, height: 1200, fit: 'inside', withoutEnlargement: true })
			.webp({ quality: 90, alphaQuality: 100 })
			.toFile(webpOut)

		const webpCheck = await verifyAlpha(webpOut)
		results.push({
			...design,
			status: webpCheck.ready ? 'TRYON READY' : 'INVALID TRANSPARENCY',
			src: `/images/tryon/${design.slug}.webp`,
			png: `/images/tryon/${design.slug}.png`,
			check: webpCheck,
		})
		console.log(`✓ tryon ${design.slug} (${webpCheck.transparentPixels} transparent px)`)
	}

	return results
}

async function downloadStock() {
	const results = []
	const failed = []

	for (const item of stock) {
		const folder = item.folder === 'motifs' ? motifsOut
			: item.folder === 'body' ? bodyOut
			: item.folder === 'styles' ? stylesOut
			: collectionsOut
		mkdirSync(folder, { recursive: true })
		const outPath = join(folder, `${item.id}.webp`)

		try {
			const res = await fetch(pexelsCdnUrl(item.pexelsId, item.w), {
				headers: { 'User-Agent': 'OTATU-MediaPackV2/1.0' },
				signal: AbortSignal.timeout(20_000),
			})
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const buf = Buffer.from(await res.arrayBuffer())
			await sharp(buf)
				.resize({ width: item.w, withoutEnlargement: true })
				.webp({ quality: 86 })
				.toFile(outPath)
			const meta = await sharp(outPath).metadata()
			const entry = {
				id: item.id,
				path: `/images/${item.folder}/${item.id}.webp`,
				width: meta.width,
				height: meta.height,
				author: item.author,
				url: item.url,
				pexelsId: item.pexelsId,
			}
			results.push(entry)
			console.log(`✓ stock ${item.id}`)
		} catch (err) {
			failed.push({ id: item.id, url: item.url, error: String(err) })
			console.log(`✗ stock ${item.id}: ${err}`)
		}
	}

	return { results, failed }
}

async function main() {
	if (!existsSync(packRoot)) {
		throw new Error('Media Pack not found at _media_pack_v2_tmp/otatu_media_pack_v2')
	}

	const tryon = await integrateTryOn()
	const { results: stockResults, failed } = await downloadStock()

	const manifest = { tryon, stock: stockResults, failed, generatedAt: new Date().toISOString() }
	writeFileSync(
		join(root, 'scripts', 'media-pack-v2-manifest.json'),
		JSON.stringify(manifest, null, 2),
	)

	const ready = tryon.filter((t) => t.status === 'TRYON READY').length
	console.log(`\nTry-On READY: ${ready}/${tryon.length}`)
	console.log(`Stock integrated: ${stockResults.length}, failed: ${failed.length}`)
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
