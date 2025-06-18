import { Button } from 'components/Reuse/Button/Button';

import style from './Buttons.module.scss';

export const Buttons = ({
	onTogglePage,
	isFirstPage,
	onSubmit,
	onCloseModal,
	dict,
}) => {
	
	return (
		<div className={style.wrapper}>
			{isFirstPage && (
				<Button
					text={dict.pets.form.cancel}
					colorType={'white'}
					type={'button'}
					onClickFunc={onCloseModal}
				/>
			)}
			<Button
				text={isFirstPage ? dict.pets.form.next : dict.pets.form.back}
				colorType="orange"
				type="button"
				onClickFunc={onTogglePage}
			/>
			{!isFirstPage && (
				<button type="submit" onSubmit={onSubmit} className={style.submitBtn}>
					{dict.pets.form.done}
				</button>
			)}
		</div>
	);
};
