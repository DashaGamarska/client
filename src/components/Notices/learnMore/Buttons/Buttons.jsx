import { AddTo } from './AddTo/AddTo';
import { RemoveFrom } from './RemoveFrom/RemoveFrom';
import { ContactBtn } from './ContactBtn/ContactBtn';
import { DownloadAgreementBtn } from './DownloadAgreement/DownloadAgreementBtn';

import style from './Buttons.module.scss';

export const Buttons = ({
	id,
	phone,
	favNotices,
	isFavLoading,
	onCloseModal,
	onAddToFavorite,
	onRemoveFromFavorite,
	handleDownloadPdf,
	dict,
}) => {
	return (
		<div className={style.infoModal__buttons}>
			<DownloadAgreementBtn onClick={handleDownloadPdf} dict={dict} />
			<ContactBtn phone={phone} onCloseModal={onCloseModal} dict={dict} />

			{favNotices.includes(id) ? (
				<RemoveFrom
					id={id}
					isFavLoading={isFavLoading}
					onRemoveFromFavorite={onRemoveFromFavorite}
					dict={dict}
				/>
			) : (
				<AddTo
					id={id}
					isFavLoading={isFavLoading}
					onAddToFavorite={onAddToFavorite}
					dict={dict}
				/>
			)}
		</div>
	);
};
