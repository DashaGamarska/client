import { useMediaQuery } from 'react-responsive';
import { ReactComponent as CrossIcon } from 'shared/images/user/uploadCross.svg';

import style from './Modal.module.scss';

export const Modal = ({
	children,
	btnType,
	setIsShowModal,
	handleBackdropClick,
	isShowModal,
	dict,
}) => {
	const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

	switch (btnType) {
		case 'circle':
			return (
				<>
					<button className={style.circle} onClick={() => setIsShowModal()}>
						<span>{dict.noticesPage.modal.addPet}</span>
					</button>
					{isShowModal && (
						<div onClick={handleBackdropClick} className={style.backdrop}>
							<div className={style.modal_circle}>
								<div
									onClick={handleBackdropClick}
									className={style.close}
								></div>
								{children}
							</div>
						</div>
					)}
				</>
			);
		case 'long':
			return (
				<>
					<button className={style.long} onClick={() => setIsShowModal()}>
						{dict.modal.learnMore}
					</button>
					{isShowModal && (
						<div onClick={handleBackdropClick} className={style.backdrop}>
							<div className={style.modal_long}>
								<div
									onClick={handleBackdropClick}
									className={style.close}
								></div>
								{children}
							</div>
						</div>
					)}
				</>
			);
		case 'circle-info':
			return (
				<>
					<button className={style.info} onClick={() => setIsShowModal()}>
						<span>{dict.noticesPage.modal.addPet}</span>
					</button>
					{isShowModal && (
						<div onClick={handleBackdropClick} className={style.backdrop}>
							<div className={style.modal_info}>
								<div
									onClick={handleBackdropClick}
									className={style.close}
								></div>
								{children}
							</div>
						</div>
					)}
				</>
			);
		case 'empty':
			return (
				<>
					<p className={style.empty__text}>
						{dict.noticesPage.modal.addPet}
						{isBigScreen && ':'}
					</p>
					<button className={style.empty} onClick={() => setIsShowModal()}>
						<CrossIcon stroke="#ffffff" width={44} height={44} />
					</button>
					{isShowModal && (
						<div onClick={handleBackdropClick} className={style.backdrop}>
							<div className={style.modal_empty}>
								<div
									onClick={handleBackdropClick}
									className={style.close}
								></div>
								{children}
							</div>
						</div>
					)}
				</>
			);
		default:
			<div>Where is props?</div>;
	}
};
