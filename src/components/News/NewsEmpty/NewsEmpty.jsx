import style from './NewsEmpty.module.scss';

export const NewsEmpty = ({ text }) => {
	return (
		<div className={style.wrapper}>
			<p className={style.text}>{text}</p>
		</div>
	);
};
