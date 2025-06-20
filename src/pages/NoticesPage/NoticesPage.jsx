import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getIsAddedSuccess,
	getNoticesError,
} from '../../redux/notices/notices-selectors';
import { resetIsAddedSuccess } from '../../redux/notices/notices-slice';
import { Container } from 'components/Reuse/Container/Container';
import { getDictionary } from '../../lib/dictionary';
import { NoticesHeading } from 'components/Notices/heading/NoticesHeading';
import { NoticesSearch } from 'components/Notices/search/NoticesSearch';
import { NoticesCategories } from 'components/Notices/categories/NoticesCategories';
import { NoticesAddPet } from 'components/Notices/addPet/NoticesAddPet';

import styles from './NoticesPage.module.scss';

const NoticesPage = () => {
	const dispatch = useDispatch();
	const error = useSelector(getNoticesError);
	const isAddedSuccess = useSelector(getIsAddedSuccess);

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
		if (isAddedSuccess) {
			toast.success(`Ad successfully added.`);
			dispatch(resetIsAddedSuccess());
		}
	}, [dispatch, isAddedSuccess]);

	useEffect(() => {
		if (error) {
			toast.error('Oops, something went wrong, please try again.');
		}
	}, [error]);

	if (!dict) return null;

	return (
		<section className={styles.section}>
			<Container>
				<NoticesHeading title={dict.noticesPage.text} />
				<NoticesSearch placeholder={dict.noticesPage.searchPlaceholder} />
				<div className={styles.categories}>
					<NoticesCategories dict={dict.noticesPage.categories} />
					<NoticesAddPet dict={dict} />
				</div>
				<Outlet />
			</Container>
		</section>
	);
};

export default NoticesPage;
