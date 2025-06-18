import { HeartLoader } from 'components/Notices/HeartLoader/HeartLoader';
import { ReactComponent as AddToIcon } from 'shared/images/Notices/AddToIcon.svg';

import style from '../Buttons.module.scss';

export const RemoveFrom = ({
	id,
	onRemoveFromFavorite,
	isFavLoading,
	dict,
}) => {
	return (
		<button
			id={id}
			type="button"
			onClick={onRemoveFromFavorite}
			className={style.infoModal__removeFrom}
		>
			{isFavLoading ? (
				<>
					<p>{dict.modal.wait}</p>
					<HeartLoader />
				</>
			) : (
				<>
					<p>{dict.modal.removeFrom}</p>

					<AddToIcon
						width={18}
						height={18}
						className={style.infoModal__removeIcon}
					/>
				</>
			)}
		</button>
	);
};
