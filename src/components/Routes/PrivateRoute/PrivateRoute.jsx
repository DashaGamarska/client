import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';

export const PrivateRoute = ({ children, redirect = '/login' }) => {
	const isLogin = useAuth();
	const { lang } = useParams();
	const langPrefix = lang || 'uk';

	const redirectWithLang = `/${langPrefix}${
		redirect.startsWith('/') ? redirect : `/${redirect}`
	}`;

	return isLogin ? children : <Navigate to={redirectWithLang} replace />;
};
