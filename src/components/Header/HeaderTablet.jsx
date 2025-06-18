import { useEffect, useState } from 'react';
import { Logo } from './Logo/Logo';
import { Nav } from './Nav/Nav';
import { UserNav } from './UserNav/UserNav';
import { AuthNav } from './AuthNav/AuthNav';
import { ReactComponent as Strips } from 'shared/images/Burger/Strips.svg';
import { ReactComponent as Cross } from 'shared/images/Burger/x.svg';
import { useAuth } from 'shared/hooks/useAuth';
import { toggleBodyHidden } from 'shared/functions/toggleBodyHidden';
import { LanguageMenu } from './LanguageMenu/LanguageMenu';

import style from './Header.module.scss';

export const HeaderTablet = ({ lang }) => {
	const isAuth = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		toggleBodyHidden(isOpen);
	}, [isOpen]);

	const toggleMenu = () => {
		setIsOpen(isOpen => !isOpen);
	};
	return (
		<div className={style.wrapper}>
			<div className={style.btns}>
				<div className={style.logoLink}>
					<Logo setIsOpen={setIsOpen} />
				</div>
				<div className={style.logoBtn}>
					{!isOpen &&
						(isAuth ? (
							<UserNav setIsOpen={setIsOpen} />
						) : (
							<AuthNav setIsOpen={setIsOpen} />
						))}
					{isOpen ? (
						<>
							<button
								type="button"
								className={style.btnBurger}
								onClick={toggleMenu}
							>
								<Cross
									width="40px"
									heigth="40px"
									aria-label="Меню"
									className={style.cross}
								></Cross>
							</button>
						</>
					) : (
						<>
							<button
								type="button"
								className={style.btnBurger}
								onClick={toggleMenu}
							>
								<Strips
									width="30px"
									heigth="20px"
									aria-label="Меню"
									className={style.strips}
								></Strips>
							</button>
						</>
					)}
				</div>
			</div>

			<div className={isOpen ? `${style.open}` : `${style.closed}`}>
				<Nav setIsOpen={setIsOpen} />
				<div className={style.menuFooter}>
					<LanguageMenu lang={lang} />
				</div>
			</div>
		</div>
	);
};
