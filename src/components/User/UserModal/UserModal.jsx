import { Title } from '../Title/Title';
import { UserModalEmpty } from './UserModalEmpty';
import { UserModalWithPets } from './UserModalWithPets';

import style from 'pages/UserPage/UserPage.module.scss';

export const UserModal = ({ isUserPets, isPetsLoading, dict }) => {
	
	return (
		<div className={style.tablet}>
			{isUserPets && (
				<Title title={dict.userPage?.myPets} className={style.title} />
			)}
			{isUserPets ? (
				<UserModalWithPets dict={dict} />
			) : (
				<UserModalEmpty isPetsLoading={isPetsLoading} dict={dict} />
			)}
		</div>
	);
};
