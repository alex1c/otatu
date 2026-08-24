/**
 * Phase 3 Media Pack v2 — human-review screenshots.
 */
import { chromium } from 'playwright'
import { mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'docs', 'screenshots', 'phase3-media-pack-v2')
const testImage = join(root, 'public', 'images', 'tryon', 'tryon-preview.webp')

const desktopPages = [
	{ name: 'rose-1440', path: '/ru/tattoo/rose', h1: 'Тату роза' },
	{ name: 'snake-1440', path: '/ru/tattoo/snake', h1: 'Тату змея' },
	{
		name: 'minimalism-1440',
		path: '/ru/style/minimalism',
		h1: 'Минималистичные тату',
	},
	{ name: 'small-tattoos-1440', path: '/ru/small-tattoos', h1: 'Маленькие тату' },
	{ name: 'arm-1440', path: '/ru/body/arm', h1: 'Тату на руке' },
]

const mobilePages = [
	{ name: 'rose-390', path: '/ru/tattoo/rose', h1: 'Тату роза' },
	{ name: 'snake-390', path: '/ru/tattoo/snake', h1: 'Тату змея' },
	{ name: 'small-tattoos-390', path: '/ru/small-tattoos', h1: 'Маленькие тату' },
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
	await page.waitForFunction(
		() =>
			Array.from(document.images).every(
				(img) =>
					img.complete &&
					(img.naturalWidth > 0 || img.currentSrc.includes('.svg')),
			),
		{ timeout: 45_000 },
	)
}

async function assertPathAndH1(page, expectedPath, expectedH1) {
	const pathname = new URL(page.url()).pathname
	if (pathname !== expectedPath) {
		throw new Error(`Path mismatch: expected ${expectedPath}, got ${pathname}`)
	}
	const h1 = (await page.locator('h1').first().textContent())?.trim() ?? ''
	if (!h1.includes(expectedH1)) {
		throw new Error(`H1 mismatch for ${expectedPath}: got "${h1}"`)
	}
}

async function capturePage(page, baseUrl, item, width, height) {
	await page.setViewportSize({ width, height })
	await page.goto(`${baseUrl}${item.path}`, {
		waitUntil: 'networkidle',
		timeout: 60_000,
	})
	await assertPathAndH1(page, item.path, item.h1)
	await waitImages(page)
	await page.screenshot({
		path: join(outDir, `${item.name}.png`),
		fullPage: false,
	})
	console.log(`✓ ${item.name}`)
}

async function captureTryOnComparison(page, baseUrl, fileName, width, height, mobile) {
	await page.setViewportSize({ width, height })
	await page.goto(`${baseUrl}/ru/try-tattoo?design=rose-transparent`, {
		waitUntil: 'networkidle',
		timeout: 60_000,
	})
	await assertPathAndH1(page, '/ru/try-tattoo', 'Примерка тату')

	await page.waitForSelector('[data-testid="tryon-upload-input"]', {
		timeout: 45_000,
	})
	await page.locator('[data-testid="tryon-upload-input"]').setInputFiles(testImage)
	await page.waitForSelector('[data-photo-loaded="true"]', { timeout: 15_000 })
	await page.waitForSelector('[data-testid="tryon-stage-container"]', {
		timeout: 15_000,
	})

	// Prefer a moderate opacity for more natural overlay look
	await page.locator('[data-testid="tryon-opacity"]').fill('70')
	await page.locator('[data-testid="tryon-scale"]').fill('45')

	if (mobile) {
		await page.waitForSelector('[data-testid="tryon-before-panel"]', {
			state: 'attached',
			timeout: 15_000,
		})
		await page.locator('[data-testid="tryon-toggle-before"]').click()
		await page.waitForFunction(
			() =>
				document
					.querySelector('[data-testid="tryon-toggle-before"]')
					?.getAttribute('aria-pressed') === 'true',
			{ timeout: 10_000 },
		)
		// Before panel uses `block` on mobile when selected; avoid strict
		// visibility checks that fail when the panel is below the fold.
		await page.locator('[data-testid="tryon-before-panel"]').scrollIntoViewIfNeeded()
		await page.locator('[data-testid="tryon-toggle-after"]').click()
		await page.waitForFunction(
			() =>
				document
					.querySelector('[data-testid="tryon-toggle-after"]')
					?.getAttribute('aria-pressed') === 'true',
			{ timeout: 10_000 },
		)
		await page.locator('[data-testid="tryon-stage-container"]').scrollIntoViewIfNeeded()
	} else {
		await page.waitForSelector('[data-testid="tryon-before-panel"]', {
			state: 'visible',
			timeout: 15_000,
		})
	}

	await waitImages(page)
	await page.waitForTimeout(400)
	await page.screenshot({
		path: join(outDir, `${fileName}.png`),
		fullPage: false,
	})
	console.log(`✓ ${fileName}`)
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
		await captureTryOnComparison(
			page,
			baseUrl,
			'tryon-before-after-1440',
			1440,
			900,
			false,
		)

		for (const item of mobilePages) {
			await capturePage(page, baseUrl, item, 390, 844)
		}
		await captureTryOnComparison(
			page,
			baseUrl,
			'tryon-before-after-390',
			390,
			844,
			true,
		)

		console.log(`\nSaved Media Pack v2 screenshots to ${outDir}`)
	} finally {
		await browser.close()
		if (serverProcess) serverProcess.kill()
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
