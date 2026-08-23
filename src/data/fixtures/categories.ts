import type { Category } from '@/types/content'

/** Quick-browse categories for chips and home sections. */
export const categories: Category[] = [
	{
		id: 'cat-women',
		slug: 'for-women',
		label: 'Для девушек',
		description: 'Идеи и эскизы для женских тату',
	},
	{
		id: 'cat-men',
		slug: 'for-men',
		label: 'Для мужчин',
		description: 'Мужские тату — от минимализма до реализма',
	},
	{
		id: 'cat-small',
		slug: 'small',
		label: 'Маленькие',
		description: 'Компактные тату для первого опыта',
	},
	{
		id: 'cat-arm',
		slug: 'arm',
		label: 'На руке',
		description: 'Эскизы для предплечья, запястья и плеча',
	},
	{
		id: 'cat-leg',
		slug: 'leg',
		label: 'На ноге',
		description: 'Идеи для голени, бедра и стопы',
	},
	{
		id: 'cat-minimal',
		slug: 'minimalism',
		label: 'Минимализм',
		description: 'Лаконичные линии и простые формы',
	},
	{
		id: 'cat-text',
		slug: 'inscriptions',
		label: 'Надписи',
		description: 'Текстовые тату и каллиграфия',
	},
	{
		id: 'cat-meaning',
		slug: 'with-meaning',
		label: 'Со смыслом',
		description: 'Символы с глубоким значением',
	},
]

export function getCategoryBySlug(slug: string): Category | undefined {
	return categories.find((category) => category.slug === slug)
}
