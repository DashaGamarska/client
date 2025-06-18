import { Title } from 'components/Reuse/Title/Title';

import styles from './NoticesHeading.module.scss';

export const NoticesHeading = ({ title }) => {
	return (
		<div className={styles.wrapper}>
			<Title text={title} />
		</div>
	);
};
