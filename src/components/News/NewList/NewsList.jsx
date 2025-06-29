import { NewsItem } from '../NewsItem/NewsItem';

import style from './NewsList.module.scss';

export const NewsList = ({ data, readMoreLabel }) => {
	return (
		<div className={style.wrapper}>
			<ul className={style.list}>
				{data.map(({ _id, ...details }) => {
					return (
						<NewsItem key={_id} data={details} readMoreLabel={readMoreLabel} />
					);
				})}
			</ul>
		</div>
	);
};
