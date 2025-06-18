const dictionaries = {
	en: () => import('../dictionaries/en.json').then(mod => mod.default),
	uk: () => import('../dictionaries/uk.json').then(mod => mod.default),
};

export const getDictionary = async (lang = 'en') =>
	dictionaries[lang]?.() ?? dictionaries.en();
