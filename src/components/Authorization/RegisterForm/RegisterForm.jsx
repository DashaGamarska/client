import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Input } from '../Input/Input';
import {
	getEmailOpt,
	getPasswordOpt,
	getConfirmPasswordOpt,
	getNameOpt,
	getCityOpt,
	getPhoneOpt,
} from '../Input/inputOptions';
import { register as reg } from '../../../redux/auth/auth-operations';
import { getIsLoading } from '../../../redux/auth/auth-selectors';

import { Spinner } from 'components/Reuse/Loaders/Spinner/Spinner';

import style from '../Authorization.module.scss';

export const RegisterForm = ({ dict }) => {
	const [nextStep, setNextStep] = useState(false);
	const defaultValues = {
		email: '',
		password: '',
		city: '',
		name: '',
		phone: '',
		passwordConfirm: '',
	};

	const dispatch = useDispatch();
	const isLoading = useSelector(getIsLoading);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({ mode: 'onBlur', defaultValues: defaultValues });

	const password = useRef({});
	password.current = watch('password', '');

	const onSubmit = ({ email, password, city, phone, name }) => {
		phone = '+38' + phone;
		let res = {
			name,
			email,
			password,
			city,
			phone,
		};

		dispatch(reg(res))
			.unwrap()
			.then(res => {
				const { name } = res.user;
				return toast.success(`Welcome, ${name} !`);
			})
			.catch(e => {
				const errorMessage =
					e.status === 409
						? 'This email is already in use'
						: 'Oops, something went wrong... Try again, please';
				return toast.error(errorMessage);
			});
	};

	const toggleBackBtn = () => {
		if (!nextStep && !isValid) return;
		setNextStep(prevState => !prevState);
	};

	return (
		<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
			{!nextStep && (
				<>
					<Input
						settings={getEmailOpt(dict)}
						register={register}
						errors={errors}
					/>
					<Input
						settings={getPasswordOpt(dict)}
						register={register}
						errors={errors}
						inputRef={password}
					/>
					<Input
						settings={getConfirmPasswordOpt(dict)}
						register={register}
						errors={errors}
						inputRef={password}
					/>

					<button className={style.btn} onClick={toggleBackBtn}>
						{dict.pets.form.next}
					</button>
				</>
			)}
			{nextStep && (
				<>
					<Input
						settings={getNameOpt(dict)}
						register={register}
						errors={errors}
					/>
					<Input
						settings={getCityOpt(dict)}
						register={register}
						errors={errors}
					/>
					<Input
						settings={getPhoneOpt(dict)}
						register={register}
						errors={errors}
					/>

					<button className={style.btn} type="submit">
						{isLoading ? (
							<Spinner customStyle={{ color: 'inherit' }} />
						) : (
							dict.auth.register.button
						)}
					</button>
					<button
						onClick={toggleBackBtn}
						className={style.lightBtn}
						type="button"
					>
						{dict.auth.register.back}
					</button>
				</>
			)}
		</form>
	);
};
