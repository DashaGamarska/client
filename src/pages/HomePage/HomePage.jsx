import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDictionary } from '../../lib/dictionary';
import { Container } from 'components/Reuse/Container/Container';

import style from './HomePage.module.scss';

const HomePage = () => {
	const { lang } = useParams();
	const [dict, setDict] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const load = async () => {
			const data = await getDictionary(lang);
			setDict(data);
		};
		load();
	}, [lang]);

	useEffect(() => {
		if (!dict || !dict.supportPage) return;

		const donationParam = searchParams.get('donation');
		const localDonation = localStorage.getItem('donationSuccess');

		if (donationParam === 'success' || localDonation === 'true') {
			toast.success(dict.supportPage.successTitle);

			if (donationParam) {
				searchParams.delete('donation');
				setSearchParams(searchParams);
			}

			localStorage.removeItem('donationSuccess');
		}
	}, [dict, lang, searchParams, setSearchParams]);

	if (!dict || !dict.supportPage || !dict.home) return null;

	const heartCount = 8;

	return (
		<>
			<section className={style.headerSection}>
				<div className={style.hearts}>
					{Array.from({ length: heartCount }, (_, index) => (
						<div
							key={index}
							className={`${style.heart} ${style[`heart${index + 1}`]}`}
						></div>
					))}
				</div>
				<Container>
					<div className={style.headerControlBox}>
						<h1 className={style.text}>{dict.home.title}</h1>
					</div>
				</Container>
			</section>
		</>
	);
};

export default HomePage;
