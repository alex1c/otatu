/**
 * Smoke test — verifies Wave A routes return HTTP 200.
 * Run: node scripts/smoke-routes.mjs
 */
const port = Number(process.env.PORT ?? 3000)
const baseUrl = process.env.BASE_URL ?? `http://127.0.0.1:${port}`

const routes = [
	'/ru',
	'/ru/tattoo',
	'/ru/tattoo/wolf',
	'/ru/tattoo/snake',
	'/ru/tattoo/rose',
	'/ru/try-tattoo',
	'/ru/small-tattoos',
	'/ru/tattoo-for-women',
	'/ru/tattoo-for-men',
	'/ru/body/arm',
	'/ru/body/forearm',
	'/ru/style/minimalism',
]

async function main() {
	let failed = false

	for (const route of routes) {
		const url = `${baseUrl}${route}`
		const res = await fetch(url, { redirect: 'follow' })
		const ok = res.status === 200
		console.log(`${ok ? '✓' : '✗'} ${route} → ${res.status}`)
		if (!ok) failed = true
	}

	if (failed) {
		process.exit(1)
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
