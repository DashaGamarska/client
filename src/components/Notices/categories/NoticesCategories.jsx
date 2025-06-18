import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';
import { categoryLinks } from '../../../shared/constants/categoryLinks';

import style from './NoticesCategories.module.scss';

export const NoticesCategories = ({ dict }) => {
	const { lang } = useParams();
	const activ = {
		color: '#FFFFFF',
		background: '#7db9e8',
		borderColor: 'transparent',
	};
	const notActive = { color: '#111111' };

	const isLogin = useAuth();

	return (
		<ul className={style.nav}>
			{categoryLinks.map((el, index) => {
				if (!isLogin && !el.private) {
					return (
						<li key={index} className={style.nav__item}>
							<NavLink
								to={`/${lang}${el.path}`}
								className={style.nav__link}
								style={({ isActive }) => (isActive ? activ : notActive)}
							>
								{dict[el.key]}
							</NavLink>
						</li>
					);
				}
				if (isLogin) {
					return (
						<li key={index} className={style.nav__item}>
							<NavLink
								to={`/${lang}${el.path}`}
								className={style.nav__link}
								style={({ isActive }) => (isActive ? activ : notActive)}
							>
								{dict[el.key]}
							</NavLink>
						</li>
					);
				}
				return '';
			})}
		</ul>
	);
};
