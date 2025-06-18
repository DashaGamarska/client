import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNoticeByCategory } from '../../../redux/notices/notices-operations';
import { Buttons } from './Buttons/Buttons';
import { Modal } from 'components/Reuse/Modal/Modal';
import { downloadAdoptionDocument } from 'shared/api/notices';

import styles from './LearnMore.module.scss';

export const LearnMore = ({
	data,
	favNotices,
	isFavLoading,
	onAddToFavorite,
	onRemoveFromFavorite,
	isShowModal,
	setIsShowModal,
	listCategory,
	dict,
}) => {
	const {
		_id: id,
		sex,
		name,
		breed,
		email,
		phone,
		title,
		location,
		imageURL,
		birthday,
		comments,
		category,
		healthHistory,
		behavioralNotes,
		specialNeeds,
	} = data;

	const dispatch = useDispatch();
	const { lang } = useParams();

	const showModal = () => {
		setIsShowModal(true);
		if (typeof window != 'undefined' && window.document) {
			document.body.style.overflow = 'hidden';
		}
	};

	const onClose = () => {
		if (listCategory === 'favorite') {
			dispatch(getNoticeByCategory());
		}
		setIsShowModal(false);
		document.body.style.overflow = 'unset';
	};

	useEffect(() => {
		const handeleClickDown = e => {
			if (e.code === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handeleClickDown);
		return () => {
			window.removeEventListener('keydown', handeleClickDown);
		};
		// eslint-disable-next-line
	}, []);

	const handleBackdropClick = e => {
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	const handleDownloadPdf = async () => {
		try {
			const blob = await downloadAdoptionDocument(id, lang);
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `adoption_agreement_${name}.pdf`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error('Error downloading PDF:', error);
		}
	};

	const getLocalizedSex = sex =>
		sex === 'male'
			? dict.learnMoreModal.sexMale
			: sex === 'female'
			? dict.learnMoreModal.sexFemale
			: '';

	const categoryKey = {
		forFree: 'forFree',
		lost: 'lost',
	}[category];

	return (
		<>
			<Modal
				btnType={'long'}
				isShowModal={isShowModal}
				setIsShowModal={showModal}
				handleBackdropClick={handleBackdropClick}
				dict={dict}
			>
				<div className={styles.box}>
					<div className={styles.box__flexBox}>
						<div className={styles.wrap}>
							<img
								className={styles.wrap__pictures}
								src={imageURL}
								alt={name}
							/>
							<div className={styles.wrapCategories}>
								<p className={styles.wrapCategories__categories}>
									{dict?.categories?.[categoryKey] || category}
								</p>
							</div>
						</div>
						<div>
							<div className={styles.heading}>
								<h2 className={styles.heading__title}>{title}</h2>
							</div>
							<div>
								<ul className={styles.list}>
									{name !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>{dict.learnMoreModal.name}:</p>
											<p className={styles.desc__paragraph}>{name}</p>
										</li>
									)}
									{birthday !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.birthday}:
											</p>
											<p className={styles.desc__paragraph}>{birthday}</p>
										</li>
									)}

									{breed !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.breed}:
											</p>
											<p className={styles.desc__paragraph}>{breed}</p>
										</li>
									)}
									{location !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.place}:
											</p>
											<p className={styles.desc__paragraph}>{location}</p>
										</li>
									)}
									{sex !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>{dict.learnMoreModal.sex}:</p>
											<p className={styles.desc__paragraph}>
												{getLocalizedSex(sex)}
											</p>
										</li>
									)}
									{email !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.email}:
											</p>
											<a
												href="mailto:email"
												className={styles.desc__paragraph__contact}
											>
												{email}
											</a>
										</li>
									)}
									{phone !== '' && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.phone}:
											</p>
											<a
												href="tel:phone"
												className={styles.desc__paragraph__contact}
											>
												{phone}
											</a>
										</li>
									)}

									{healthHistory?.length > 0 && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.healthHistory}:
											</p>
											<ul className={styles.vaccineList}>
												{healthHistory.map((vaccine, idx) => (
													<li key={idx} className={styles.vaccineItem}>
														{vaccine.vaccine} —{' '}
														{new Date(vaccine.date).toLocaleDateString()}
													</li>
												))}
											</ul>
										</li>
									)}
									{behavioralNotes && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.behavioralNotes}:
											</p>
											<p className={styles.desc__paragraph}>
												{behavioralNotes}
											</p>
										</li>
									)}
									{specialNeeds && (
										<li className={styles.list__item}>
											<p className={styles.desc}>
												{dict.learnMoreModal.specialNeeds}:
											</p>
											<p className={styles.desc__paragraph}>{specialNeeds}</p>
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>
					<div className={styles.commen}>
						{comments !== '' && (
							<p className={styles.commen__paragraph}>
								<span className={styles.commen__span}>
									{dict.learnMoreModal.comments}:
								</span>
								{comments}
							</p>
						)}
					</div>

					<Buttons
						id={id}
						phone={phone}
						onCloseModal={onClose}
						favNotices={favNotices}
						isFavLoading={isFavLoading}
						onAddToFavorite={onAddToFavorite}
						onRemoveFromFavorite={onRemoveFromFavorite}
						handleDownloadPdf={handleDownloadPdf}
						dict={dict}
					/>
				</div>
			</Modal>
		</>
	);
};
