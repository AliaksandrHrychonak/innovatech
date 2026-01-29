import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  kk: () => import('@/dictionaries/kk.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ru' | 'kk') => 
  dictionaries[locale]?.() ?? dictionaries.en()
