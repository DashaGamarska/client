export const getAuthFormContent = (type, dict) => {
	return type === 'login'
		? {
				title: dict.auth.login.title,
				navigateMessage: dict.auth.nav.toRegister,
				navigatePath: '/register',
				linkText: dict.auth.nav.toRegister,
		  }
		: {
				title: dict.auth.register.title,
				navigateMessage: dict.auth.nav.toLogin,
				navigatePath: '/login',
				linkText: dict.auth.nav.toLogin,
		  };
};
