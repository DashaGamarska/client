import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDictionary } from '../../lib/dictionary';
import { Container } from 'components/Reuse/Container/Container';
import { Button } from 'components/Reuse/Button/Button';
import { createStripeSession } from '../../lib/stripe/createStripeSession';

import style from './SupportPage.module.scss';

const SupportPage = () => {
	const { lang } = useParams();
	const [dict, setDict] = useState(null);

	useEffect(() => {
		const load = async () => {
			const data = await getDictionary(lang);
			setDict(data);
		};
		load();
	}, [lang]);

	if (!dict) return null;

	return (
		<>
			<section className={style.supportSection}>
				<Container>
					<h1 className={style.title}>{dict.supportPage.title}</h1>
					<p className={style.description}>{dict.supportPage.description}</p>

					<h2 className={style.subheading}>{dict.supportPage.howToHelp}</h2>
					<div className={style.buttonGroup}>
						<Button
							text={dict.supportPage.donateOptions.option100}
							colorType="orange"
							onClickFunc={() =>
								createStripeSession(lang, [
									{ name: 'Пожертва', amount: 100, currency: 'uah' },
								])
							}
						/>
						<Button
							text={dict.supportPage.donateOptions.option200}
							colorType="orange"
							onClickFunc={() =>
								createStripeSession(lang, [
									{ name: 'Пожертва', amount: 200, currency: 'uah' },
								])
							}
						/>
						<Button
							text={dict.supportPage.donateOptions.option500}
							colorType="orange"
							onClickFunc={() =>
								createStripeSession(lang, [
									{ name: 'Пожертва', amount: 500, currency: 'uah' },
								])
							}
						/>
					</div>
				</Container>
			</section>
		</>
	);
};

export default SupportPage;
