import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDictionary } from 'lib/dictionary';
import { Authorization } from 'components/Authorization/Authorization';

const LoginPage = () => {
	const { lang } = useParams();
	const [dict, setDict] = useState(null);

	useEffect(() => {
		getDictionary(lang).then(setDict);
	}, [lang]);

	if (!dict) return null;

	return <Authorization type="login" dict={dict} />;
};

export default LoginPage;
