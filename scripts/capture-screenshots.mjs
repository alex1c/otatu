/**
 * Captures responsive screenshots with URL + H1 assertions.
 * Requires production build: npm run build && npm run start
 * Run: node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'docs', 'screenshots')

/** Each shot must land on the exact route and show the expected page H1. */
const SHOTS = [
	{
		file: 'home-1440',
		path: '/ru',
		width: 1440,
		height: 900,
		h1: 'Вдохновение для твоей тату',
	},
	{
		file: 'home-390',
		path: '/ru',
		width: 390,
		height: 844,
		h1: 'Вдохновение для твоей тату',
	},
	{
		file: 'catalog-1440',
		path: '/ru/tattoo',
		width: 1440,
		height: 900,
		h1: 'Каталог идей тату',
	},
	{
		file: 'catalog-390',
		path: '/ru/tattoo',
		width: 390,
		height: 844,
		h1: 'Каталог идей тату',
	},
	{
		file: 'wolf-1440',
		path: '/ru/tattoo/wolf',
		width: 1440,
		height: 900,
		h1: 'Тату волк',
	},
	{
		file: 'wolf-390',
		path: '/ru/tattoo/wolf',
		width: 390,
		height: 844,
		h1: 'Тату волк',
	},
	{
		file: 'tryon-1440',
		path: '/ru/try-tattoo',
		width: 1440,
		height: 900,
		h1: 'Примерка тату',
	},
	{
		file: 'tryon-390',
		path: '/ru/try-tattoo',
		width: 390,
		height: 844,
		h1: 'Примерка тату',
	},
]

/** Scrolls the page to trigger lazy-loaded images, then waits for completion. */
async function waitForImages(page) {
	await page.evaluate(async () => {
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
		const step = Math.max(window.innerHeight, 400)
		let y = 0
		const max = document.body.scrollHeight

		while (y <= max) {
			window.scrollTo(0, y)
			await delay(80)
			y += step
		}

		window.scrollTo(0, 0)
	})

	await page.waitForFunction(
		() => {
			const images = Array.from(document.querySelectorAll('img')).filter((img) => {
				const rect = img.getBoundingClientRect()
				return rect.width > 0 || rect.height > 0
			})

			if (images.length === 0) return true

			return images.every((img) => {
				if (!img.complete) return false
				if (img.naturalWidth > 0) return true
				// Allow completed SVG/decorative assets that report zero intrinsic size.
				return img.currentSrc.includes('.svg')
			})
		},
		{ timeout: 45_000 },
	)
}

/** Asserts pathname and primary H1 before saving a screenshot. */
async function captureShot(page, baseUrl, shot) {
	await page.setViewportSize({ width: shot.width, height: shot.height })
	const targetUrl = `${baseUrl}${shot.path}`

	await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60_000 })

	const pathname = new URL(page.url()).pathname
	if (pathname !== shot.path) {
		throw new Error(
			`${shot.file}: expected pathname ${shot.path}, got ${pathname} (${page.url()})`,
		)
	}

	const h1Text = (await page.locator('h1').first().textContent())?.trim() ?? ''
	if (!h1Text.includes(shot.h1)) {
		throw new Error(
			`${shot.file}: expected H1 containing "${shot.h1}", got "${h1Text}"`,
		)
	}

	await waitForImages(page)

	const outPath = join(outDir, `${shot.file}.png`)
	await page.screenshot({ path: outPath, fullPage: true })
	console.log(`✓ ${shot.file} → ${shot.path} (${shot.width}px)`)
}

async function isServerUp(baseUrl) {
	try {
		const res = await fetch(`${baseUrl}/ru`, { redirect: 'follow' })
		return res.ok
	} catch {
		return false
	}
}

/** Starts next start when no server is listening on the configured port. */
function startServer(port) {
	return spawn('npm', ['run', 'start', '--', '-p', String(port)], {
		cwd: root,
		shell: true,
		stdio: 'ignore',
		detached: false,
	})
}

async function waitForServer(baseUrl, timeoutMs = 60_000) {
	const started = Date.now()
	while (Date.now() - started < timeoutMs) {
		if (await isServerUp(baseUrl)) return
		await new Promise((resolve) => setTimeout(resolve, 500))
	}
	throw new Error(`Server not ready at ${baseUrl} within ${timeoutMs}ms`)
}

async function main() {
	const port = Number(process.env.PORT ?? 3000)
	const baseUrl = process.env.BASE_URL ?? `http://127.0.0.1:${port}`

	mkdirSync(outDir, { recursive: true })

	let serverProcess = null
	const alreadyRunning = await isServerUp(baseUrl)

	if (!alreadyRunning) {
		if (!existsSync(join(root, '.next'))) {
			throw new Error('Missing .next build — run npm run build first')
		}
		console.log(`Starting server on port ${port}…`)
		serverProcess = startServer(port)
		await waitForServer(baseUrl)
	}

	const browser = await chromium.launch({ headless: true })
	const page = await browser.newPage()

	try {
		for (const shot of SHOTS) {
			await captureShot(page, baseUrl, shot)
		}
		console.log(`\nSaved ${SHOTS.length} screenshots to docs/screenshots/`)
	} finally {
		await browser.close()
		if (serverProcess) {
			serverProcess.kill()
		}
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
