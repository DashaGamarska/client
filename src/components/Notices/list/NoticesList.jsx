import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDictionary } from 'lib/dictionary';
import {
	getCurrentNotices,
	getFavoriteNotices,
	getNoticesLoading,
	getTotalPages,
} from '../../../redux/notices/notices-selectors';
import { getUserId } from '../../../redux/auth/auth-selectors';
import {
	getFavoriteNoticeByUser,
	getNoticeByCategory,
	removeNotice,
} from '../../../redux/notices/notices-operations';
import { NoticesItems } from '../items/NoticesItems';
import { NoticesPaginationList } from '../pagination/paginationList/PaginationList';
import { setQueryParams } from '../../../redux/notices/notices-slice';
import { useAuth } from 'shared/hooks/useAuth';
import { NewsEmpty } from 'components/News/NewsEmpty/NewsEmpty';

import styles from './NoticesList.module.scss';

export const NoticesList = ({ category }) => {
	const isLogin = useAuth();
	const dispatch = useDispatch();

	const ownerId = useSelector(getUserId);
	const notices = useSelector(getCurrentNotices);

	const favNotices = useSelector(getFavoriteNotices);
	const isFavLoading = useSelector(getNoticesLoading);

	const totalPages = useSelector(getTotalPages);
	const showPagination = !!(
		totalPages > 1 && (category !== 'favorite') & (category !== 'own')
	);

	const isLoading = useSelector(getNoticesLoading);

	const noResults = !notices.length && !isLoading;

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
		dispatch(setQueryParams({ category }));
		if (isLogin) dispatch(getFavoriteNoticeByUser());
		dispatch(getNoticeByCategory());
	}, [category, dispatch, isLogin]);

	const onDeleteNotice = e => {
		const noticeId = e.currentTarget.id;
		dispatch(removeNotice(noticeId));
	};

	if (!dict || !dict.noticesPage) return null;

	return noResults ? (
		<NewsEmpty text={dict.noticesPage.noResults} />
	) : (
		<div className={styles.wrapper}>
			{
				<ul className={styles.galery}>
					{notices.map(data => (
						<li className={styles.galery__item} key={data._id}>
							<NoticesItems
								data={data}
								isLogin={isLogin}
								ownerId={ownerId}
								favNotices={favNotices}
								isFavLoading={isFavLoading}
								onDeleteNotice={onDeleteNotice}
								dict={dict.noticesPage}
							/>
						</li>
					))}
				</ul>
			}
			<div className={styles.pagination}>
				{showPagination && <NoticesPaginationList pages={totalPages} />}
			</div>
		</div>
	);
};
