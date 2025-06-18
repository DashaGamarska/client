import style from './CardMarkUp.module.scss';

export const CardMarkUp = ({ cardData, id, dict }) => {
	const labelMap = {
		name: dict.pets.form.name,
		birthday: dict.pets.form.birthday,
		breed: dict.pets.form.breed,
		comments: dict.pets.form.commentLabel,
	};

	return (
		<ul className={style.card__meta}>
			{Object.entries(cardData)?.map(([key, value], idx) => (
				<li key={`${id}+${idx}`} id={id} className={style.card__metaInfo}>
					<p className={style.card__metaText}>
						<span className={style.card__metaHeading}>
							{labelMap[key] || key}:
						</span>{' '}
						{value}
					</p>
				</li>
			))}
		</ul>
	);
};
