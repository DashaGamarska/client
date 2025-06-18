import {
	getPetBirthUser,
	getPetBreedUser,
	getPetNameUser,
	getPetAdTitle,
} from 'components/Authorization/Input/inputOptions';
import { Button } from 'components/Reuse/Button/Button';
import { AddPetInput } from 'components/User/AddPetForm/AddPetInput/AddPetInput';
import { AddPetCategory } from '../AddPetRadioItem/AddPetCategory';

import styles from '../NoticesAddPetForm.module.scss';

export const FirstStep = ({
	register,
	errors,
	nextPage,
	onCloseModal,
	dict,
}) => {
	return (
		<div>
			<ul className={styles.categor}>
				<li className={styles.categor__item}>
					<AddPetCategory
						data="petCategoriesLost"
						value="lost"
						field="category"
						register={register}
						dict={dict}
						errors={errors}
					/>
				</li>
				<li className={styles.categor__item}>
					<AddPetCategory
						data="petCategoriesForFree"
						value="forFree"
						field="category"
						register={register}
						dict={dict}
						errors={errors}
					/>
				</li>
			</ul>

			<div className={styles.inputWrapper}>
				<AddPetInput
					register={register}
					errors={errors}
					settings={getPetAdTitle(dict)}
				/>
				<AddPetInput
					register={register}
					errors={errors}
					settings={getPetNameUser(dict)}
				/>
				<AddPetInput
					register={register}
					errors={errors}
					settings={getPetBirthUser(dict)}
				/>
				<AddPetInput
					register={register}
					errors={errors}
					settings={getPetBreedUser(dict)}
				/>
			</div>

			<div className={styles.buttonWrap}>
				<Button
					type={'button'}
					text={dict.pets.form.cancel}
					colorType={'white'}
					onClickFunc={onCloseModal}
				/>
				<Button
					type={'button'}
					text={dict.pets.form.next}
					colorType={'orange'}
					onClickFunc={nextPage}
				/>
			</div>
		</div>
	);
};
