/** UI dictionary shape — extend per locale file. */
export interface Dictionary {
	brand: {
		name: string
		tagline: string
	}
	nav: {
		ideas: string
		sketches: string
		meanings: string
		styles: string
		places: string
		inscriptions: string
		search: string
		menu: string
		closeMenu: string
		tryOn: string
	}
	home: {
		heroTitle: string
		heroSubtitle: string
		findIdeas: string
		tryTattoo: string
		quickCategories: string
		collections: string
		popularSketches: string
		tryOnBlockTitle: string
		tryOnBlockSubtitle: string
		guides: string
	}
	catalog: {
		title: string
		intro: string
		filters: string
		loadMore: string
		results: string
	}
	motif: {
		meanings: string
		variations: string
		suitablePlaces: string
		suitableStyles: string
		related: string
		tryMotif: string
	}
	tryOn: {
		title: string
		subtitle: string
		step1: string
		step1Desc: string
		step2: string
		step2Desc: string
		step3: string
		step3Desc: string
		upload: string
		uploadHint: string
		selectDesign: string
		preview: string
		controls: string
		opacity: string
		size: string
		rotate: string
		save: string
		reset: string
		proofNote: string
		privacyNote: string
		comingSoon: string
	}
	footer: {
		about: string
		aboutText: string
		explore: string
		tools: string
		legal: string
		privacy: string
		terms: string
		copyright: string
	}
	common: {
		home: string
		ideas: string
		tryOn: string
		viewAll: string
		favorite: string
		breadcrumbHome: string
	}
}
