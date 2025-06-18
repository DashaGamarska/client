import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import useCloseDropdownOnNavigation from '../../../shared/hooks/useCloseDropdownOnNavigation';

import languageData from './languageData';
import styles from './LanguageMenu.module.scss';

export const LanguageMenu = ({ className }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen(prev => !prev);
	const [selectedLanguage, setSelectedLanguage] = useState(languageData[0]);

	const location = useLocation();
	const pathName = location.pathname;
	const lang = pathName.split('/')[1];

	useCloseDropdownOnNavigation(setIsMenuOpen);

	const handleLanguageSelect = language => {
		setSelectedLanguage(language);
		setIsMenuOpen(false);
	};

	const redirectedPathName = locale => {
		const segments = location.pathname.split('/');
		if (segments[1] === 'en' || segments[1] === 'uk') {
			segments[1] = locale;
		} else {
			segments.unshift(locale);
		}
		return segments.join('/') || '/';
	};

	const currentLanguage =
		selectedLanguage.value === lang ? selectedLanguage : languageData[1];

	return (
		<div className={`${styles.languageMenu} ${className || ''}`}>
			<div className={styles.languageContainer} onClick={toggleMenu}>
				<img
					src={currentLanguage.icon}
					alt={currentLanguage.lang}
					width={24}
					height={24}
					className={styles.languageIcon}
				/>
				<span className={styles.languageTitle}>{currentLanguage.lang}</span>
				{isMenuOpen ? (
					<MdKeyboardArrowUp className={styles.arrowIcon} />
				) : (
					<MdKeyboardArrowDown className={styles.arrowIcon} />
				)}
			</div>

			{isMenuOpen && (
				<ul className={styles.languageList}>
					{languageData.map(language => (
						<li
							key={language.id}
							className={`${styles.languageItem} ${
								language.id === selectedLanguage.id
									? styles.selectedLanguage
									: ''
							}`}
						>
							<Link
								to={redirectedPathName(language.value)}
								onClick={() => handleLanguageSelect(language)}
								className={styles.languageLink}
							>
								<img
									src={language.icon}
									alt={language.lang}
									width={24}
									height={24}
								/>
								<span>{language.lang}</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
