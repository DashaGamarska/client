import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserData, removeUserPet } from '../../redux/user/user-operations';
import { resetIsAddedPetSuccess } from '../../redux/user/user-slice';
import {
	getIsAddedPetSuccess,
	getUserError,
} from '../../redux/user/user-selectors';
import { selectors } from './selectors';

import { UserForm } from 'components/User/UserForm/UserForm';
import { Card } from 'components/User/Card/Card';
import { Title } from 'components/User/Title/Title';
import { getIsLoading } from '../../redux/auth/auth-selectors';
import { UserModal } from 'components/User/UserModal/UserModal';
import { getDictionary } from '../../lib/dictionary';

import style from './UserPage.module.scss';

const UserPage = () => {
	const dispatch = useDispatch();

	const userInfo = useSelector(selectors.getUserInfo);
	const userAvatar = useSelector(selectors.getUserAvatar);
	const userPets = useSelector(selectors.getUserPets);
	const isPetsLoading = useSelector(selectors.getPetsLoading);
	const isUserLoading = useSelector(selectors.getUserLoading);
	const isCurrentLoading = useSelector(getIsLoading);
	const error = useSelector(getUserError);
	const isAddedPetSuccess = useSelector(getIsAddedPetSuccess);
	const { lang } = useParams();
	const [dict, setDict] = useState(null);

	useEffect(() => {
		const load = async () => {
			const data = await getDictionary(lang);
			setDict(data);
		};
		load();
	}, [lang]);

	useEffect(() => {
		dispatch(getUserData());
	}, [dispatch]);

	useEffect(() => {
		if (isAddedPetSuccess) {
			toast.success(dict?.userPage?.addSuccess);
			dispatch(resetIsAddedPetSuccess());
		}

		if (error) {
			toast.error(dict?.userPage?.error);
		}
	}, [dispatch, isAddedPetSuccess, error, dict]);

	const isUserPets = !!userPets?.length;
	const onDeletePet = e => {
		const petToRemove = e.currentTarget.id;
		dispatch(removeUserPet(petToRemove));
	};
	const formData = { userInfo, userAvatar, isUserLoading, isCurrentLoading };
	const cardData = { userPets, onDeletePet, isPetsLoading };
	if (!dict) return null;

	return (
		<div className={style.section}>
			<div className={style.user__wrapper}>
				<Title title={dict.userPage.title} className={style.titleUser} />
				<UserForm formData={formData} dict={dict} />
			</div>
			<div className={style.desktop}>
				<UserModal
					isUserPets={isUserPets}
					isPetsLoading={isPetsLoading}
					dict={dict}
				/>
				<Card cardData={cardData} dict={dict} />
			</div>
		</div>
	);
};

export default UserPage;
