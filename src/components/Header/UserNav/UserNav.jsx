import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDictionary } from '../../../lib/dictionary';
import { ReactComponent as AccountCircle } from 'shared/images/AccountCircle/AccountCircle.svg';

import style from './UserNav.module.scss';

export const UserNav = ({ setIsOpen = () => {} }) => {
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
		<div className={style.container}>
			<Link
				to={`/${lang}/user`}
				className={style.link}
				onClick={() => setIsOpen(false)}
			>
				<AccountCircle className={style.svg} width="28px" heigth="28px" />
				{dict.user.account}
			</Link>
		</div>
	);
};
