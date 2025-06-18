import { Navigate } from 'react-router-dom';

const getDefaultLang = () => {
	const storedLang = localStorage.getItem('lang');
	if (storedLang && ['uk', 'en'].includes(storedLang)) return storedLang;

	const browserLang = navigator.language?.startsWith('uk') ? 'uk' : 'en';
	return ['uk', 'en'].includes(browserLang) ? browserLang : 'uk';
};

export const RedirectToLang = () => {
	const lang = getDefaultLang();
	return <Navigate to={`/${lang}`} replace />;
};
