export const getItemInfo = dict => [
	{
		text: dict.userPage?.form?.name,
		field: 'name',
		pattern: {
			pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]{2,16}$/,
			patternMessage: dict.userPage?.form?.nameInvalid,
		},
	},
	{
		text: dict.userPage?.form?.email,
		type: 'email',
		field: 'email',
		pattern: {
			pattern:
				// eslint-disable-next-line no-useless-escape
				/^(?=.{10,63}$)(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/,
			patternMessage: dict.userPage?.form?.emailInvalid,
		},
	},
	{
		text: dict.userPage?.form?.birthday,
		field: 'birthday',
		pattern: {
			pattern:
				/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/,
			patternMessage: dict.userPage?.form?.birthdayInvalid,
		},
	},
	{
		text: dict.userPage?.form?.phone,
		field: 'phone',
		pattern: {
			pattern: /^\+38(0\d{9})$/,
			patternMessage: dict.userPage?.form?.phoneInvalid,
		},
	},
	{
		text: dict.userPage?.form?.city,
		field: 'city',
		pattern: {
			pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]{2,16}$/,
			patternMessage: dict.userPage?.form?.cityInvalid,
		},
	},
];
