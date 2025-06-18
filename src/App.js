import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getIsFirstQuery, getToken } from './redux/auth/auth-selectors';
import { current } from './redux/auth/auth-operations';

import { NoticesList } from 'components/Notices/list/NoticesList';
import { PrivateRoute } from 'components/Routes/PrivateRoute/PrivateRoute';
import { PublicRouter } from 'components/Routes/PublicRouter/PublicRouter';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { RedirectToLang } from 'components/Routes/RedirectToLang';

import './shared/styles/style.scss';

const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage/SupportPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
	const dispatch = useDispatch();
	const token = useSelector(getToken);
	const isFirstQuery = useSelector(getIsFirstQuery);

	useEffect(() => {
		if (token) {
			dispatch(current());
		}
	}, [dispatch, token]);

	if (token && isFirstQuery) return null;

	return (
		<>
			<Suspense fallback={null}>
				<Routes>
					{/* Redirect to default language */}
					<Route path="/" element={<RedirectToLang />} />

					<Route path="/:lang" element={<SharedLayout />}>
						<Route index element={<HomePage />} />

						<Route
							path="news"
							element={
								<PublicRouter>
									<NewsPage />
								</PublicRouter>
							}
						/>

						<Route
							path="support"
							element={
								<PublicRouter>
									<SupportPage />
								</PublicRouter>
							}
						/>

						<Route
							path="register"
							element={
								<PublicRouter restricted redirect="/user">
									<RegisterPage />
								</PublicRouter>
							}
						/>
						<Route
							path="login"
							element={
								<PublicRouter restricted redirect="/user">
									<LoginPage />
								</PublicRouter>
							}
						/>
						<Route
							path="user"
							element={
								<PrivateRoute redirect="/login">
									<UserPage />
								</PrivateRoute>
							}
						/>

						<Route
							path="notices"
							element={
								<PublicRouter>
									<NoticesPage />
								</PublicRouter>
							}
						>
							<Route
								path="lost-found"
								element={<NoticesList category="lost" />}
							/>
							<Route
								path="for-free"
								element={<NoticesList category="forFree" />}
							/>
							<Route
								path="favorite"
								element={<NoticesList category="favorite" />}
							/>
							<Route path="own" element={<NoticesList category="own" />} />
						</Route>

						{/* Unknown localized path */}
						<Route path="*" element={<RedirectToLang />} />
					</Route>

					{/* Fallback for unlocalized routes like /login, /user */}
					<Route path="*" element={<RedirectToLang />} />
				</Routes>
			</Suspense>

			<ToastContainer
				position="bottom-right"
				transition={Slide}
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
}

export default App;
