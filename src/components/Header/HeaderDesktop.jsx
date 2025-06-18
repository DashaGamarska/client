import { Logo } from './Logo/Logo';
import { Nav } from './Nav/Nav';
import { UserNav } from './UserNav/UserNav';
import { AuthNav } from './AuthNav/AuthNav';
import { useAuth } from 'shared/hooks/useAuth';
import { LanguageMenu } from './LanguageMenu/LanguageMenu';

import style from './Header.module.scss';

export const HeaderDesktop = ({ lang }) => {
	const isAuth = useAuth();

	return (
		<div className={style.wrapper}>
			<div className={style.mainNav}>
				<Logo />
				<Nav />
			</div>
			<div>
				<LanguageMenu lang={lang} />
			</div>

			{isAuth ? <UserNav /> : <AuthNav />}
		</div>
	);
};
