import style from '../Buttons.module.scss';

export const ContactBtn = ({ phone, dict }) => {
	return (
		<a href={`tel:${phone}`} className={style.infoModal__contact}>
			{dict.modal.contact}
		</a>
	);
};
