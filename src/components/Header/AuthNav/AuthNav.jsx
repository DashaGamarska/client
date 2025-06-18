import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDictionary } from '../../../lib/dictionary';
import style from './AuthNav.module.scss';

export const AuthNav = ({ setIsOpen = () => {} }) => {
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

	return (
		<div className={style.btn}>
			<div className={style.login}>
				<Link
					to={`/${lang}/login`}
					className={style.linkLogo}
					onClick={() => setIsOpen(false)}
				>
					{dict.common.login}
				</Link>
			</div>
			<div className={style.registration}>
				<Link
					to={`/${lang}/register`}
					className={style.linkRegistration}
					onClick={() => setIsOpen(false)}
				>
					{dict.common.registration}
				</Link>
			</div>
		</div>
	);
};
