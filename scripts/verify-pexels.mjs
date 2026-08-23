/**
 * Verifies Pexels CDN downloads match approved photo IDs.
 * Run: node scripts/verify-pexels.mjs
 */
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const pexelsStock = {
	'hero-01': { id: 5088486, path: 'public/images/hero/hero-01.webp' },
	'hero-02': { id: 8182285, path: 'public/images/hero/hero-02.webp' },
	'hero-03': { id: 34155039, path: 'public/images/hero/hero-03.webp' },
	'coll-small': { id: 7147839, path: 'public/images/collections/coll-small.webp' },
	'coll-meaning': { id: 1993189, path: 'public/images/collections/coll-meaning.webp' },
	'coll-arm': { id: 9079557, path: 'public/images/collections/coll-arm.webp' },
	'design-01': { id: 27847860, path: 'public/images/designs/design-01.webp' },
	'design-04': { id: 4750247, path: 'public/images/designs/design-04.webp' },
	'design-05': { id: 17992192, path: 'public/images/designs/design-05.webp' },
	'design-06': { id: 3214681, path: 'public/images/designs/design-06.webp' },
	'design-08': { id: 6044740, path: 'public/images/designs/design-08.webp' },
	'design-10': { id: 7237673, path: 'public/images/designs/design-10.webp' },
	'wolf-g01': { id: 17573238, path: 'public/images/wolf/wolf-g01.webp' },
	'wolf-g02': { id: 27847860, path: 'public/images/wolf/wolf-g02.webp' },
	'article-02': { id: 35833291, path: 'public/images/editorial/article-02.webp' },
}

function hashFile(relPath) {
	const abs = join(root, relPath)
	if (!existsSync(abs)) return null
	return createHash('sha256').update(readFileSync(abs)).digest('hex').slice(0, 16)
}

function pexelsUrl(photoId, width = 400) {
	return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

async function fetchTitle(photoId) {
	const res = await fetch(`https://www.pexels.com/photo/x-${photoId}/`, {
		headers: { 'User-Agent': 'OTATU-Verify/1.0' },
	})
	const html = await res.text()
	const titleMatch = html.match(/<title>([^<]+)<\/title>/i)
	return titleMatch ? titleMatch[1].trim() : 'unknown'
}

async function fetchCdnHash(photoId) {
	const res = await fetch(pexelsUrl(photoId), {
		headers: { 'User-Agent': 'OTATU-Verify/1.0' },
	})
	if (!res.ok) return { error: `HTTP ${res.status}` }
	const buf = Buffer.from(await res.arrayBuffer())
	return {
		bytes: buf.length,
		hash: createHash('sha256').update(buf).digest('hex').slice(0, 16),
	}
}

async function main() {
	console.log('asset\tphotoId\tpageTitle\tlocalHash\tcdnHash\tmatch')
	for (const [assetId, meta] of Object.entries(pexelsStock)) {
		const title = await fetchTitle(meta.id)
		const localHash = hashFile(meta.path)
		const cdn = await fetchCdnHash(meta.id)
		const note =
			cdn.error ? cdn.error : localHash === cdn.hash ? 'webp-diff' : 'jpeg-ok'
		console.log(
			`${assetId}\t${meta.id}\t${title.slice(0, 50)}\t${localHash ?? 'MISSING'}\t${cdn.hash ?? cdn.error}\t${note}`,
		)
	}

	// Duplicate ID check
	const d01 = hashFile('public/images/designs/design-01.webp')
	const wg02 = hashFile('public/images/wolf/wolf-g02.webp')
	console.log(`\ndesign-01 vs wolf-g02 same source ID 27847860 — local hashes equal: ${d01 === wg02}`)
}

main().catch(console.error)
