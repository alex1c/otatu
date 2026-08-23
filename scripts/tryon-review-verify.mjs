/**
 * Phase 2 review verification for try-on spike.
 * Desktop + mobile viewport, privacy, export content.
 * Run: node scripts/tryon-review-verify.mjs
 */
import { chromium } from 'playwright'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const testImage = join(root, 'public', 'images', 'tryon', 'tryon-preview.webp')
const outDir = join(root, 'docs', 'screenshots', 'review')

async function verifyViewport(page, label, width, height) {
	await page.setViewportSize({ width, height })
	await page.goto('http://127.0.0.1:3000/ru/try-tattoo', {
		waitUntil: 'networkidle',
		timeout: 60_000,
	})

	const h1 = await page.locator('h1').first().textContent()
	if (!h1?.includes('Примерка тату')) {
		throw new Error(`${label}: bad H1 ${h1}`)
	}

	const overflow = await page.evaluate(() => {
		return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
	})
	if (overflow) throw new Error(`${label}: horizontal overflow`)

	const uploadPosts = []
	page.on('request', (req) => {
		if (req.method() === 'POST') uploadPosts.push(req.url())
	})

	await page.locator('[data-testid="tryon-upload-input"]').setInputFiles(testImage)
	await page.waitForSelector('[data-photo-loaded="true"]', { timeout: 15_000 })

	const previewOrder = await page.evaluate(() => {
		const preview = document.querySelector('.try-on-preview')
		if (!preview) return null
		return Number(getComputedStyle(preview).order)
	})
	if (width <= 390 && previewOrder !== 1) {
		throw new Error(`${label}: preview should be order 1 on mobile, got ${previewOrder}`)
	}

	const btnBox = await page.locator('[data-testid="tryon-export"]').boundingBox()
	if (!btnBox || btnBox.height < 40) {
		throw new Error(`${label}: export button touch target too small`)
	}

	await page.locator('[data-testid="tryon-opacity"]').fill('40')
	await page.locator('[data-testid="tryon-scale"]').fill('70')
	await page.locator('[data-testid="tryon-rotation"]').fill('25')

	const downloadPromise = page.waitForEvent('download', { timeout: 10_000 })
	await page.locator('[data-testid="tryon-export"]').click()
	const download = await downloadPromise
	mkdirSync(outDir, { recursive: true })
	const exportPath = join(outDir, `export-${label}.png`)
	await download.saveAs(exportPath)

	const bytes = readFileSync(exportPath)
	if (bytes.length < 5_000) {
		throw new Error(`${label}: export too small (${bytes.length} bytes)`)
	}
	if (bytes[0] !== 0x89 || bytes[1] !== 0x50) {
		throw new Error(`${label}: export is not a PNG`)
	}

	await page.locator('[data-testid="tryon-reset"]').click()

	const photoPosts = uploadPosts.filter((url) => !url.includes('_next'))
	if (photoPosts.length > 0) {
		throw new Error(`${label}: unexpected POST ${photoPosts.join(', ')}`)
	}

	await page.screenshot({
		path: join(outDir, `tryon-${label}.png`),
		fullPage: true,
	})

	console.log(`✓ ${label}: upload/controls/export/privacy/overflow OK (${bytes.length} byte PNG)`)
}

async function main() {
	if (!existsSync(testImage)) throw new Error('Missing tryon-preview.webp')

	const browser = await chromium.launch({ headless: true })
	const page = await browser.newPage()

	try {
		await verifyViewport(page, 'desktop-1440', 1440, 900)
		await verifyViewport(page, 'mobile-390', 390, 844)
		console.log('\nTry-on review verification passed')
	} finally {
		await browser.close()
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
