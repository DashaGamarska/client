import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';

export const PublicRouter = ({
	children,
	restricted = false,
	redirect = '/user',
}) => {
	const isLogin = useAuth();
	const { lang } = useParams();
	const langPrefix = lang || 'uk';

	const redirectWithLang = `/${langPrefix}${
		redirect.startsWith('/') ? redirect : `/${redirect}`
	}`;

	return isLogin && restricted ? (
		<Navigate to={redirectWithLang} replace />
	) : (
		children
	);
};
