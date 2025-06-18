import style from '../Buttons.module.scss';

export const DownloadAgreementBtn = ({ onClick, dict }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={style.infoModal__download}
		>
			{dict.modal.download}
		</button>
	);
};
