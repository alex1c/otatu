/**
 * Unit checks for try-on image utilities (no browser required).
 * Run: node scripts/tryon-unit-test.mjs
 */

/** Mirrors fitWithinEdge from prepare-photo.ts */
function fitWithinEdge(width, height, maxEdge) {
	if (width <= maxEdge && height <= maxEdge) {
		return { width, height }
	}
	const scale = maxEdge / Math.max(width, height)
	return {
		width: Math.round(width * scale),
		height: Math.round(height * scale),
	}
}

function assert(condition, message) {
	if (!condition) throw new Error(message)
}

function testFitWithinEdge() {
	const small = fitWithinEdge(800, 600, 2048)
	assert(small.width === 800 && small.height === 600, 'small image unchanged')

	const wide = fitWithinEdge(4000, 2000, 2048)
	assert(wide.width === 2048 && wide.height === 1024, 'wide image scaled')

	const tall = fitWithinEdge(1000, 3000, 2048)
	assert(tall.width === 683 && tall.height === 2048, 'tall image scaled')
}

testFitWithinEdge()
console.log('✓ fitWithinEdge unit tests passed')
