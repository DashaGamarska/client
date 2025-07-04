import { formatDate } from 'shared/functions/formatDate';
import style from './NewsItem.module.scss';

export const NewsItem = ({ data, readMoreLabel }) => {
	const { title, description, url, date } = data;
	const optimizedDate = formatDate(date);
	return (
		<div>
			<article className={style.article}>
				<h3 className={style.heading}>{title}</h3>
				<p className={style.tooltip}>{title}</p>
				<p className={style.text}>{description}</p>
				<div className={style.details}>
					<span className={style.date}>{optimizedDate}</span>
					<a
						className={style.link}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{readMoreLabel}
					</a>
				</div>
			</article>
		</div>
	);
};
