import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	addNoticeToFavorite,
	getNoticeByCategory,
	removeNoticeFromFavorite,
} from '../../../redux/notices/notices-operations';
import { getCategory } from '../../../redux/notices/notices-selectors';
import { Favorite } from '../Favorite/Favorite';
import { LearnMore } from '../learnMore/LearnMore';
import { getAge } from 'shared/functions/getAge';
import { numberToWord } from 'shared/functions/numberToWord';
import { ReactComponent as TrashIcon } from 'shared/images/user/trashIcon.svg';

import styles from './NoticesItems.module.scss';

export const NoticesItems = ({
	data,
	ownerId,
	isLogin,
	favNotices,
	isFavLoading,
	onDeleteNotice,
	dict,
}) => {
	const {
		name,
		breed,
		title,
		owner,
		_id: id,
		category,
		birthday,
		location,
		imageURL,
	} = data;

	const dispatch = useDispatch();

	const listCategory = useSelector(getCategory);
	const [isShowModal, setIsShowModal] = useState(false);

	const onAddToFavorite = e => {
		const cardId = e.currentTarget.id;

		isLogin
			? dispatch(addNoticeToFavorite(cardId))
			: toast.error('Authorize please');
	};

	const onRemoveFromFavorite = e => {
		const cardId = e.currentTarget.id;

		dispatch(removeNoticeFromFavorite(cardId));
		if (listCategory === 'favorite' && !isShowModal) {
			dispatch(getNoticeByCategory());
		}
	};
	const { lang } = useParams();

	const born = getAge(birthday);
	const age = numberToWord(born, lang);

	const categoryKey = {
		forFree: 'forFree',
		lost: 'lost',
	}[category];

	return (
		<div className={styles.wrapper}>
			<div className={styles.pctWrap}>
				<img className={styles.pctWrap__pictures} src={imageURL} alt={name} />

				<div className={styles.likeWrap}>
					<Favorite
						id={id}
						favNotices={favNotices}
						isFavLoading={isFavLoading}
						onAddToFavorite={onAddToFavorite}
						onRemoveFromFavorite={onRemoveFromFavorite}
					/>
				</div>

				<div className={styles.categor}>
					<p className={styles.categor__paragraph}>
						{dict?.categories?.[categoryKey] || category}
					</p>
				</div>
			</div>
			<div className={styles.boxWrap}>
				<div>
					<div className={styles.heading}>
						<h2 className={styles.heading__title}>{title}</h2>
						<p className={styles.heading__tooltip}>{title}</p>
					</div>

					<ul className={styles.list}>
						{breed !== '' && (
							<li className={styles.list__item}>
								<p className={styles.list__paragraph}>{dict.item.breed}:</p>
								<p className={styles.list__span}>{breed}</p>
							</li>
						)}
						{location !== '' && (
							<li className={styles.list__item}>
								<p className={styles.list__paragraph}>{dict.item.place}:</p>
								<p className={styles.list__span}>{location}</p>
							</li>
						)}
						{age !== '' && (
							<li className={styles.list__item}>
								<p className={styles.list__paragraph}>{dict.item.age}:</p>
								<p className={styles.list__span}>{age}</p>
							</li>
						)}
					</ul>
				</div>
				<div className={styles.btnContainer}>
					<LearnMore
						listCategory={listCategory}
						isShowModal={isShowModal}
						setIsShowModal={setIsShowModal}
						data={data}
						favNotices={favNotices}
						isFavLoading={isFavLoading}
						onAddToFavorite={onAddToFavorite}
						onRemoveFromFavorite={onRemoveFromFavorite}
						dict={dict}
					/>

					{ownerId === owner && (
						<button
							id={id}
							type="button"
							onClick={e => onDeleteNotice(e)}
							className={styles.deleteOwnNotice}
						>
							{dict.item.delete}
							{
								<div className={styles.deleteOwnNotice__trash}>
									<TrashIcon fill="currentColor" width={16} height={17} />
								</div>
							}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
