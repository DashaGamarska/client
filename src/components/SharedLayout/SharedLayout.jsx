import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Header } from './../Header/Header';

export const SharedLayout = () => {
	const { lang } = useParams();

	return (
		<>
			<Header lang={lang} />
			<main>
				<Outlet />
			</main>
		</>
	);
};
