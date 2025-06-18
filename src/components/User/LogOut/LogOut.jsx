import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/auth-operations';
import { ReactComponent as LogOutIcon } from 'shared/images/user/LogOutIcon.svg';

import styles from './LogOut.module.scss';

export const LogOut = ({ dict }) => {
	const dispatch = useDispatch();

	return (
		<button
			type="button"
			onClick={() => dispatch(logout())}
			className={styles.LogOut}
		>
			<LogOutIcon fill="#7db9e8" width={18} height={18} />
			<p className={styles.LogOut__text}>{dict.userPage.logout}</p>
		</button>
	);
};
