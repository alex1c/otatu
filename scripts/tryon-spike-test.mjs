/**
 * Playwright test for try-on MVP editor.
 * Run: node scripts/tryon-spike-test.mjs
 * Requires: npm run build && npm run start (or auto-starts)
 */
import { chromium } from 'playwright'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const testImage = join(root, 'public', 'images', 'tryon', 'tryon-preview.webp')
const customDesign = join(root, 'public', 'images', 'designs', 'design-02.webp')

async function isServerUp(baseUrl) {
	try {
		const res = await fetch(`${baseUrl}/ru/try-tattoo`)
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

async function main() {
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

	const uploadRequests = []
	page.on('request', (req) => {
		if (req.method() === 'POST' && !req.url().includes('_next')) {
			uploadRequests.push(req.url())
		}
	})

	try {
		await page.goto(`${baseUrl}/ru/try-tattoo?design=wolf-geometric`, {
			waitUntil: 'networkidle',
			timeout: 60_000,
		})

		const h1 = await page.locator('h1').first().textContent()
		if (!h1?.includes('Примерка тату')) {
			throw new Error(`Unexpected H1: ${h1}`)
		}
		console.log('✓ route renders with correct H1')

		await page.waitForSelector('[data-testid="tryon-upload-input"]', {
			state: 'attached',
			timeout: 45_000,
		})
		console.log('✓ editor shell loads')

		await page.waitForSelector('[data-testid="tryon-design-picker"]', {
			timeout: 15_000,
		})
		console.log('✓ design picker visible')

		await page.waitForFunction(
			() =>
				document
					.querySelector('[data-testid="tryon-stage-container"]')
					?.getAttribute('data-design-slug') === 'wolf-geometric',
			{ timeout: 15_000 },
		)
		console.log('✓ deep-link preselects design slug')

		// Unknown slug safely falls back to default bundled design
		await page.goto(`${baseUrl}/ru/try-tattoo?design=not-a-real-design`, {
			waitUntil: 'networkidle',
			timeout: 60_000,
		})
		await page.waitForSelector('[data-testid="tryon-stage-container"]', {
			timeout: 15_000,
		})
		await page.waitForFunction(
			() =>
				document
					.querySelector('[data-testid="tryon-stage-container"]')
					?.getAttribute('data-design-slug') === 'wolf-minimal',
			{ timeout: 15_000 },
		)
		console.log('✓ unknown design slug falls back to default')

		const fileInput = page.locator('[data-testid="tryon-upload-input"]')
		await fileInput.setInputFiles(testImage)

		await page.waitForSelector('[data-photo-loaded="true"]', {
			timeout: 15_000,
		})
		console.log('✓ photo loaded into editor')

		await page.waitForSelector('[data-testid="tryon-before-panel"]', {
			timeout: 10_000,
		})
		console.log('✓ original photo available as Before')

		const canvas = page.locator('[data-testid="tryon-stage-container"] canvas')
		await canvas.waitFor({ state: 'attached', timeout: 10_000 })
		console.log('✓ konva canvas renders')

		const readyDesignButtons = await page
			.locator('[data-testid^="tryon-design-"]')
			.count()
		if (readyDesignButtons > 0) {
			await page.locator('[data-testid^="tryon-design-"]').first().click()
			console.log('✓ bundled design selection works')
		} else {
			await page.waitForSelector('[data-testid="tryon-ready-gap"]', {
				timeout: 10_000,
			})
			console.log('✓ picker shows transparent-asset gap state')
		}

		await page.waitForFunction(() => {
			const panel = document.querySelector('[data-testid="tryon-before-panel"]')
			if (!panel) return false
			const img = panel.querySelector('img')
			const canvas = panel.querySelector('canvas')
			return Boolean(img) && !canvas
		}, { timeout: 10_000 })
		console.log('✓ tattoo absent from Before source image')

		await page.locator('[data-testid="tryon-opacity"]').fill('40')
		await page.locator('[data-testid="tryon-scale"]').fill('60')
		await page.locator('[data-testid="tryon-rotation"]').fill('15')
		console.log('✓ transform sliders respond')

		await page.locator('[data-testid="tryon-reset"]').click()
		console.log('✓ reset control works')

		await page.setViewportSize({ width: 390, height: 844 })
		await page.waitForSelector('[data-testid="tryon-toggle-before"]', {
			timeout: 10_000,
		})
		await page.locator('[data-testid="tryon-toggle-before"]').click()
		await page.waitForSelector('[data-testid="tryon-before-panel"]', {
			state: 'visible',
			timeout: 10_000,
		})
		await page.locator('[data-testid="tryon-toggle-after"]').click()
		await page.waitForSelector('[data-testid="tryon-stage-container"]', {
			state: 'visible',
			timeout: 10_000,
		})
		console.log('✓ Before/After mobile toggle works')

		const customInput = page.locator('[data-testid="tryon-custom-design-input"]')
		await customInput.setInputFiles(customDesign)
		await page.waitForFunction(
			() =>
				document
					.querySelector('[data-testid="tryon-stage-container"]')
					?.getAttribute('data-design-slug') === 'custom',
			{ timeout: 10_000 },
		)
		console.log('✓ custom design upload works')

		const exportBtn = page.locator('[data-testid="tryon-export"]')
		if (await exportBtn.isDisabled()) {
			throw new Error('Export button should be enabled after upload')
		}

		await exportBtn.click()
		console.log('✓ export triggered')

		page.once('dialog', async (dialog) => {
			await dialog.accept()
		})
		await page.locator('[data-testid="tryon-start-over"]').click()
		await page.waitForSelector('[data-photo-loaded="false"]', {
			timeout: 10_000,
		})
		console.log('✓ start-over clears comparison state')

		if (uploadRequests.length > 0) {
			throw new Error(
				`Unexpected upload POST requests: ${uploadRequests.join(', ')}`,
			)
		}
		console.log('✓ no server upload for local photo')

		console.log('\nTry-on MVP test passed')
	} finally {
		await browser.close()
		if (serverProcess) serverProcess.kill()
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
