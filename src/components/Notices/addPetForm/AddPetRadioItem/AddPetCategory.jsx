import { ValidationError } from 'components/Authorization/ValidationError/ValidationError';
import styles from '../NoticesAddPetForm.module.scss';

export const AddPetCategory = ({
	data,
	register,
	field,
	text,
	value,
	dict,
	errors,
}) => {
	const errorMsg = errors?.[field]?.message;

	return (
		<>
			<div className={styles.category__wrapper}>
				<input
					{...register(field, {
						required: {
							value: true,
							message: dict?.form?.categoryRequired || 'Оберіть категорію',
						},
					})}
					type="radio"
					value={value}
					id={data}
					name={field}
					className={styles.category__input}
				/>
				<label htmlFor={data} className={styles.category__label}>
					<p className={styles.category__paragraph}>{dict.categories[value]}</p>
				</label>
			</div>

			{value === 'forFree' && errorMsg && (
				<ValidationError>{errorMsg}</ValidationError>
			)}
		</>
	);
};
