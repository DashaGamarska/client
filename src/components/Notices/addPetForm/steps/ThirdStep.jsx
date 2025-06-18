import { Button } from 'components/Reuse/Button/Button';
import { AddPetInput } from 'components/User/AddPetForm/AddPetInput/AddPetInput';

import styles from '../NoticesAddPetForm.module.scss';

export const ThirdStep = ({
	register,
	onSubmit,
	downPage,
	watch,
	errors,
	control,
	dict,
}) => {
	return (
		<>
			<div className={styles.inputsWrapper}>
				<AddPetInput
					register={register}
					textarea
					errors={errors}
					settings={{
						label: dict.noticesPage.modal.behavioralNotesLabel,
						name: 'behavioralNotes',
						placeholder: dict.noticesPage.modal.behavioralNotesPlaceholder,
						validation: { required: false, minLength: 0 },
					}}
					notices
				/>
				<AddPetInput
					register={register}
					textarea
					errors={errors}
					settings={{
						label: dict.noticesPage.modal.specialNeedsLabel,
						name: 'specialNeeds',
						placeholder: dict.noticesPage.modal.specialNeedsPlaceholder,
						validation: { required: false, minLength: 0 },
					}}
					notices
				/>
				<AddPetInput
					register={register}
					textarea
					errors={errors}
					settings={{
						label: dict.noticesPage.modal.commentsLabel,
						name: 'comments',
						placeholder: dict.noticesPage.modal.commentsPlaceholder,
						validation: { required: false, minLength: 0 },
					}}
					notices
				/>
			</div>
			<div className={styles.buttonWrap}>
				<Button
					type={'button'}
					text={dict.pets.form.back}
					colorType={'white'}
					onClickFunc={downPage}
				/>
				<button
					type="submit"
					onSubmit={onSubmit}
					className={styles.buttonWrap__done}
				>
					{dict.noticesPage.modal.done}
				</button>
			</div>
		</>
	);
};
