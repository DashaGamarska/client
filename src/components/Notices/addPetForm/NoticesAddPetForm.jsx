import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotice } from '../../../redux/notices/notices-operations';
import { useForm } from 'react-hook-form';
import { FirstStep, SecondStep, ThirdStep } from './steps';
import { createFormData } from 'shared/functions/createFormData';

import styles from './NoticesAddPetForm.module.scss';

export const AddPetForm = ({ onClose, dict }) => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			category: '',
			birthday: '01.01.2020',
			avatar: '',
			behavioralNotes: '',
			specialNeeds: '',
		},
	});

	const [step, setStep] = useState(1);

	const dispatch = useDispatch();

	const onNextStep = async () => {
		if (step === 1) {
			const isStepValid = await trigger([
				'category',
				'title',
				'name',
				'birthday',
				'breed',
			]);
			if (!isStepValid) return;
		}
		setStep(prev => Math.min(prev + 1, 3));
	};

	const onPrevStep = () => {
		setStep(prev => Math.max(prev - 1, 1));
	};

	const onSubmit = data => {
		if (data) {
			const newNotice = createFormData(data);
			dispatch(addNotice(newNotice));
			onClose();
		}
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{step === 1 && (
					<FirstStep
						errors={errors}
						register={register}
						nextPage={onNextStep}
						onCloseModal={onClose}
						dict={dict}
					/>
				)}
				{step === 2 && (
					<SecondStep
						errors={errors}
						register={register}
						watch={watch}
						dict={dict}
						control={control}
						nextPage={onNextStep}
						onCloseModal={onClose}
						downPage={onPrevStep}
					/>
				)}
				{step === 3 && (
					<ThirdStep
						errors={errors}
						register={register}
						watch={watch}
						dict={dict}
						control={control}
						downPage={onPrevStep}
						onSubmit={onSubmit}
					/>
				)}
			</form>
		</div>
	);
};
