import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getDictionary } from '../../../lib/dictionary';
import { navLinks } from '../../../shared/constants/navLinks';

import style from './Nav.module.scss';

export const Nav = ({ setIsOpen = () => {} }) => {
	const { lang } = useParams();

	const [dict, setDict] = useState(null);

	useEffect(() => {
		const load = async () => {
			const data = await getDictionary(lang);
			setDict(data);
		};
		load();
	}, [lang]);

	if (!dict) return null;

	const active = { color: '#7db9e8', textDecoration: 'underline' };
	const noActive = {};

	return (
		<ul className={style.menu}>
			{navLinks.map((el, index) => (
				<li key={index} className={style.item}>
					<NavLink
						to={`/${lang}${el.path}`}
						className={style.link}
						style={({ isActive }) => (isActive ? active : noActive)}
						onClick={() => setIsOpen(false)}
					>
						{dict.navigation[el.key]}
					</NavLink>
				</li>
			))}
		</ul>
	);
};
