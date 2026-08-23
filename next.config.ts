import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		// Local SVG placeholders are used in Phase 1A prototype
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
}

export default nextConfig
