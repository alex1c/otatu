/**
 * Phase 3 human-review screenshots.
 * Captures desktop 1440 + mobile 390 review set after real try-on setup.
 * Run: node scripts/phase3-review-screenshots.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'docs', 'screenshots', 'phase3-review')
const testImage = join(root, 'public', 'images', 'tryon', 'tryon-preview.webp')

const desktopPages = [
	{ name: 'home-1440', path: '/ru', h1: null },
	{ name: 'small-tattoos-1440', path: '/ru/small-tattoos', h1: 'Маленькие тату' },
	{ name: 'arm-1440', path: '/ru/body/arm', h1: 'Тату на руке' },
	{ name: 'minimalism-1440', path: '/ru/style/minimalism', h1: 'Минималистичные тату' },
	{ name: 'snake-1440', path: '/ru/tattoo/snake', h1: 'Тату змея' },
	{ name: 'rose-1440', path: '/ru/tattoo/rose', h1: 'Тату роза' },
]

const mobilePages = [
	{ name: 'home-390', path: '/ru', h1: null },
	{ name: 'small-tattoos-390', path: '/ru/small-tattoos', h1: 'Маленькие тату' },
	{ name: 'snake-390', path: '/ru/tattoo/snake', h1: 'Тату змея' },
]

async function isServerUp(baseUrl) {
	try {
		const res = await fetch(`${baseUrl}/ru`)
		return res.ok
	} catch {
		return false
	}
}

function startServer(port) {
	return spawn('npm', ['run', 'start', '--', '-p', String(port)], {
		cwd: root,
		shell: true,
		stdio: 'ignore',
	})
}

async function waitForServer(baseUrl, timeoutMs = 60_000) {
	const started = Date.now()
	while (Date.now() - started < timeoutMs) {
		if (await isServerUp(baseUrl)) return
		await new Promise((resolve) => setTimeout(resolve, 500))
	}
	throw new Error(`Server not ready at ${baseUrl}`)
}

async function waitImages(page) {
	await page.waitForLoadState('networkidle')
	await page.evaluate(async () => {
		const images = [...document.images]
		await Promise.all(
			images.map((img) =>
				img.complete
					? Promise.resolve()
					: new Promise((resolve) => {
							img.addEventListener('load', resolve, { once: true })
							img.addEventListener('error', resolve, { once: true })
						}),
			),
		)
	})
}

async function capturePage(page, baseUrl, item, width, height) {
	await page.setViewportSize({ width, height })
	const url = `${baseUrl}${item.path}`
	await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })

	const current = page.url()
	if (!current.includes(item.path)) {
		throw new Error(`URL mismatch for ${item.name}: ${current}`)
	}

	if (item.h1) {
		const h1 = await page.locator('h1').first().textContent()
		if (!h1?.includes(item.h1)) {
			throw new Error(`H1 mismatch for ${item.name}: ${h1}`)
		}
	}

	await waitImages(page)
	await page.screenshot({
		path: join(outDir, `${item.name}.png`),
		fullPage: false,
	})
	console.log(`✓ ${item.name}`)
}

async function captureTryOn(page, baseUrl, name, width, height) {
	await page.setViewportSize({ width, height })
	await page.goto(`${baseUrl}/ru/try-tattoo?design=wolf-minimal`, {
		waitUntil: 'networkidle',
		timeout: 60_000,
	})

	const h1 = await page.locator('h1').first().textContent()
	if (!h1?.includes('Примерка тату')) {
		throw new Error(`Try-on H1 mismatch: ${h1}`)
	}

	await page.waitForSelector('[data-testid="tryon-upload-input"]', {
		timeout: 45_000,
	})
	await page.locator('[data-testid="tryon-upload-input"]').setInputFiles(testImage)
	await page.waitForSelector('[data-photo-loaded="true"]', { timeout: 15_000 })
	await page.waitForTimeout(800)

	await page.screenshot({
		path: join(outDir, `${name}.png`),
		fullPage: false,
	})
	console.log(`✓ ${name}`)
}

async function main() {
	mkdirSync(outDir, { recursive: true })

	const port = Number(process.env.PORT ?? 3000)
	const baseUrl = process.env.BASE_URL ?? `http://127.0.0.1:${port}`

	let serverProcess = null
	if (!(await isServerUp(baseUrl))) {
		if (!existsSync(join(root, '.next'))) {
			throw new Error('Missing .next build — run npm run build first')
		}
		serverProcess = startServer(port)
		await waitForServer(baseUrl)
	}

	const browser = await chromium.launch({ headless: true })
	const page = await browser.newPage()

	try {
		for (const item of desktopPages) {
			await capturePage(page, baseUrl, item, 1440, 900)
		}
		await captureTryOn(page, baseUrl, 'tryon-editor-1440', 1440, 900)

		for (const item of mobilePages) {
			await capturePage(page, baseUrl, item, 390, 844)
		}
		await captureTryOn(page, baseUrl, 'tryon-editor-390', 390, 844)

		console.log(`\nSaved review screenshots to ${outDir}`)
	} finally {
		await browser.close()
		if (serverProcess) serverProcess.kill()
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
