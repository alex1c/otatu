/**
 * Wave A SEO checks — metadata, canonical, sitemap membership.
 * Run: node scripts/wave-a-seo-test.mjs
 * Requires: npm run build && npm run start (or auto-starts)
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const port = Number(process.env.PORT ?? 3000)
const baseUrl = process.env.BASE_URL ?? `http://127.0.0.1:${port}`
const locale = 'ru'

const waveAPaths = [
	'',
	'/tattoo',
	'/try-tattoo',
	'/small-tattoos',
	'/tattoo-for-women',
	'/tattoo-for-men',
	'/body/arm',
	'/body/forearm',
	'/style/minimalism',
	'/tattoo/wolf',
	'/tattoo/snake',
	'/tattoo/rose',
]

const futurePaths = ['/body/wrist', '/body/shoulder', '/style/blackwork']

async function isServerUp() {
	try {
		const res = await fetch(`${baseUrl}/${locale}`)
		return res.ok
	} catch {
		return false
	}
}

function startServer() {
	return spawn('npm', ['run', 'start', '--', '-p', String(port)], {
		cwd: root,
		shell: true,
		stdio: 'ignore',
	})
}

async function waitForServer(timeoutMs = 60_000) {
	const started = Date.now()
	while (Date.now() - started < timeoutMs) {
		if (await isServerUp()) return
		await new Promise((resolve) => setTimeout(resolve, 500))
	}
	throw new Error(`Server not ready at ${baseUrl}`)
}

function extractMeta(html, name) {
	const titleMatch = html.match(/<title>([^<]+)<\/title>/i)
	if (name === 'title') return titleMatch?.[1]?.trim() ?? null

	const descMatch = html.match(
		/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
	)
	if (name === 'description') return descMatch?.[1]?.trim() ?? null

	const canonicalMatch = html.match(
		/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
	)
	if (name === 'canonical') return canonicalMatch?.[1]?.trim() ?? null

	return null
}

function countH1(html) {
	return (html.match(/<h1[\s>]/gi) ?? []).length
}

async function main() {
	let serverProcess = null
	if (!(await isServerUp())) {
		if (!existsSync(join(root, '.next'))) {
			throw new Error('Missing .next build — run npm run build first')
		}
		serverProcess = startServer()
		await waitForServer()
	}

	const titles = new Set()
	let failed = false

	for (const path of waveAPaths) {
		const url = `${baseUrl}/${locale}${path}`
		const res = await fetch(url)
		if (res.status !== 200) {
			console.log(`✗ ${path || '/'} → ${res.status}`)
			failed = true
			continue
		}

		const html = await res.text()
		const title = extractMeta(html, 'title')
		const description = extractMeta(html, 'description')
		const canonical = extractMeta(html, 'canonical')
		const h1Count = countH1(html)

		if (!title) {
			console.log(`✗ ${path || '/'} missing title`)
			failed = true
		}
		if (!description) {
			console.log(`✗ ${path || '/'} missing description`)
			failed = true
		}
		if (!canonical?.includes(`/${locale}${path || ''}`)) {
			console.log(`✗ ${path || '/'} bad canonical: ${canonical}`)
			failed = true
		}
		if (h1Count !== 1) {
			console.log(`✗ ${path || '/'} expected 1 H1, got ${h1Count}`)
			failed = true
		}
		if (title && titles.has(title)) {
			console.log(`✗ duplicate title on ${path || '/'}: ${title}`)
			failed = true
		}
		if (title) titles.add(title)

		console.log(`✓ SEO ${path || '/'} — title, description, canonical, H1`)
	}

	const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`)
	if (!sitemapRes.ok) {
		console.log(`✗ sitemap.xml → ${sitemapRes.status}`)
		failed = true
	} else {
		const sitemap = await sitemapRes.text()
		for (const path of waveAPaths) {
			const expected = `/${locale}${path}`
			if (!sitemap.includes(expected)) {
				console.log(`✗ sitemap missing ${expected}`)
				failed = true
			}
		}
		for (const path of futurePaths) {
			const unexpected = `/${locale}${path}`
			if (sitemap.includes(unexpected)) {
				console.log(`✗ sitemap should not include future route ${unexpected}`)
				failed = true
			}
		}
		console.log('✓ sitemap contains Wave A routes only')
	}

	if (failed) {
		if (serverProcess) serverProcess.kill()
		process.exit(1)
	}

	console.log('\nWave A SEO test passed')
	if (serverProcess) serverProcess.kill()
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
