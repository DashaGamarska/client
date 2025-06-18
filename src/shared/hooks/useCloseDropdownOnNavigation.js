import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useCloseDropdownOnNavigation = setIsMenuOpen => {
	const location = useLocation();

	useEffect(() => {
		if (typeof setIsMenuOpen === 'function') {
			setIsMenuOpen(false);
		}
	}, [location.pathname, setIsMenuOpen]);
};

export default useCloseDropdownOnNavigation;
