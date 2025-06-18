import { useFieldArray } from 'react-hook-form';
import styles from './AddPetVaccination.module.scss';

export const AddPetVaccination = ({ control, register, dict }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'healthHistory',
	});

	return (
		<div className={styles.vaccine__wrapper}>
			<p className={styles.section__label}>
				{dict.noticesPage.modal.vaccineHistoryLabel}:
			</p>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.vaccine__group}>
					<input
						type="text"
						placeholder="Назва вакцини"
						{...register(`healthHistory.${index}.vaccine`)}
						className={styles.vaccine__input}
					/>
					<input
						type="date"
						{...register(`healthHistory.${index}.date`)}
						className={styles.vaccine__input}
					/>
					<button
						type="button"
						className={styles.vaccine__remove}
						onClick={() => remove(index)}
					>
						✕
					</button>
				</div>
			))}
			<button
				type="button"
				className={styles.vaccine__add}
				onClick={() => append({ vaccine: '', date: '' })}
			>
				+ {dict.noticesPage.modal.addVaccine}
			</button>
		</div>
	);
};
