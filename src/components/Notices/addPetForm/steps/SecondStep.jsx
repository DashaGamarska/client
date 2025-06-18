import { ReactComponent as MaleSvg } from 'shared/images/Notices/el_male.svg';
import { ReactComponent as FemaleSvg } from 'shared/images/Notices/el_female.svg';
import { ReactComponent as UploadCross } from 'shared/images/user/uploadCross.svg';
import { AddPetRadioItem } from '../AddPetRadioItem/AddPetSex';
import { Button } from 'components/Reuse/Button/Button';
import { AddPetInput } from 'components/User/AddPetForm/AddPetInput/AddPetInput';
import { AddPetVaccination } from 'components/Notices/addPetForm/AddPetVaccination/AddPetVaccination';
import { getPetsLocation } from 'components/Authorization/Input/inputOptions';
import { ValidationError } from 'components/Authorization/ValidationError/ValidationError';

import styles from '../NoticesAddPetForm.module.scss';

export const SecondStep = ({
	register,
	watch,
	errors,
	control,
	dict,
	nextPage,
	onCloseModal,
}) => {
	const newImage = watch('avatar');

	return (
		<>
			<div className={styles.sex__wrapper}>
				<p className={styles.sex__paragraph}>
					{dict.noticesPage.learnMoreModal.sex}
					<span className={styles.start}>&#42;</span>:
				</p>
				<ul className={styles.sex}>
					<li className={styles.sex__item}>
						<AddPetRadioItem
							data="petMale"
							img={<MaleSvg className={styles.sexSvg} />}
							text={dict.noticesPage.learnMoreModal.sexMale}
							value="male"
							field="sex"
							register={register}
						/>
					</li>
					<li className={styles.sex__item}>
						<AddPetRadioItem
							data="petFeMale"
							img={<FemaleSvg />}
							text={dict.noticesPage.learnMoreModal.sexFemale}
							value="female"
							field="sex"
							register={register}
						/>
					</li>
				</ul>
				{errors['sex'] && (
					<ValidationError customStyle={{ bottom: '5px' }}>
						{errors['sex']?.message}
					</ValidationError>
				)}
			</div>
			<div className={styles.input__wrapper}>
				<AddPetInput
					register={register}
					errors={errors}
					settings={getPetsLocation(dict)}
				/>
				<div className={styles.upload}>
					<div className={styles.upload__label}>
						<p className={styles.upload__text}>
							{dict.noticesPage.modal.imageLabel}
						</p>
						<label htmlFor="petImg" className={styles.upload__wrapper}>
							{newImage?.length ? (
								<img src={URL.createObjectURL(newImage[0])} alt="poster" />
							) : (
								<UploadCross
									width={48}
									height={48}
									stroke="rgba(17, 17, 17, 0.6)"
								/>
							)}
						</label>
						<input
							type="file"
							{...register('avatar')}
							id="petImg"
							name="avatar"
							placeholder="Type name pet"
							className={styles.upload__input}
						/>
					</div>
				</div>
				<AddPetVaccination control={control} register={register} dict={dict} />
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
		</>
	);
};
