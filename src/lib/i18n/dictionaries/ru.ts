import type { Dictionary } from '@/lib/i18n/types'

/** Russian UI strings — sole active locale in Phase 1A. */
export const ruDictionary: Dictionary = {
	brand: {
		name: 'OTATU',
		tagline: 'Визуальный портал о татуировках',
	},
	nav: {
		ideas: 'Идеи',
		sketches: 'Эскизы',
		meanings: 'Значения',
		styles: 'Стили',
		places: 'Места',
		inscriptions: 'Надписи',
		search: 'Поиск',
		menu: 'Меню',
		closeMenu: 'Закрыть',
		tryOn: 'Примерить',
	},
	home: {
		heroTitle: 'Вдохновение для твоей тату',
		heroSubtitle:
			'Найди идеи, узнай значения, выбери эскиз — и в будущем примерь тату онлайн на своём фото.',
		findIdeas: 'Найти идеи',
		tryTattoo: 'Примерить тату',
		quickCategories: 'Быстрые категории',
		collections: 'Подборки',
		popularSketches: 'Популярные эскизы',
		tryOnBlockTitle: 'Примерь тату на своём фото',
		tryOnBlockSubtitle:
			'Загрузи фото, выбери эскиз и посмотри, как тату будет смотреться на тебе.',
		guides: 'Статьи и гиды',
	},
	catalog: {
		title: 'Каталог идей тату',
		intro:
			'Листай эскизы по категориям, стилям и местам нанесения. Каждая карточка — отправная точка для твоей будущей тату.',
		filters: 'Фильтры',
		loadMore: 'Показать ещё',
		results: 'эскизов',
	},
	motif: {
		meanings: 'Основные значения',
		variations: 'Вариации',
		suitablePlaces: 'Подходящие места',
		suitableStyles: 'Подходящие стили',
		related: 'Похожие мотивы',
		tryMotif: 'Примерить тату',
	},
	tryOn: {
		title: 'Примерка тату',
		subtitle:
			'Загрузите фото, выберите эскиз и настройте положение — всё происходит в браузере, без отправки на сервер.',
		step1: 'Загрузить фото',
		step1Desc: 'Выбери фото участка тела, куда планируешь тату.',
		step2: 'Выбрать эскиз',
		step2Desc: 'Подбери эскиз из каталога или загрузи свой.',
		step3: 'Настроить и сохранить',
		step3Desc: 'Отрегулируй размер, поворот и положение.',
		upload: 'Загрузить фото',
		uploadHint: 'JPG, PNG, WebP · до 10 МБ',
		selectDesign: 'Выберите эскиз',
		customDesign: 'Загрузить свой эскиз',
		customDesignHint:
			'Для лучшего результата используйте PNG с прозрачным фоном.',
		preview: 'Предпросмотр',
		controls: 'Настройки',
		opacity: 'Прозрачность',
		size: 'Размер',
		rotate: 'Поворот',
		save: 'Сохранить результат',
		reset: 'Сбросить',
		startOver: 'Начать заново',
		startOverConfirm:
			'Удалить загруженное фото и начать сначала?',
		removeTattoo: 'Убрать эскиз',
		privacyNote:
			'Фото обрабатывается только в вашем браузере и не загружается на сервер.',
		errors: {
			unsupportedType: 'Неподдерживаемый формат — используйте JPG, PNG или WebP.',
			fileTooLarge: 'Файл слишком большой — максимум 10 МБ.',
			decodeError: 'Не удалось обработать изображение. Попробуйте другой файл.',
			exportError: 'Не удалось сохранить результат. Попробуйте ещё раз.',
		},
	},
	footer: {
		about: 'О проекте',
		aboutText:
			'OTATU — визуальный портал для поиска идей, эскизов и значений татуировок.',
		explore: 'Разделы',
		tools: 'Инструменты',
		legal: 'Правовая информация',
		privacy: 'Конфиденциальность',
		terms: 'Условия использования',
		copyright: '© 2026 OTATU. Все права защищены.',
	},
	common: {
		home: 'Главная',
		ideas: 'Идеи',
		tryOn: 'Примерить',
		viewAll: 'Смотреть все',
		favorite: 'В избранное',
		breadcrumbHome: 'Главная',
	},
}
