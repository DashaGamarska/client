export const getEmailOpt = dict => ({
	name: 'email',
	type: 'email',
	placeholder: dict.user.form.emailPlaceholder,
	required: true,
	requiredMessage: dict.user.form.emailRequired,
	pattern:
		/^(?=.{10,63}$)(([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/i,
	patternMessage: dict.user.form.emailPattern,
});

export const getPasswordOpt = dict => ({
	name: 'password',
	type: 'password',
	placeholder: dict.user.form.passwordPlaceholder,
	required: true,
	requiredMessage: dict.user.form.passwordRequired,
	pattern: /^(?=.{7,32}$)([0-9A-Za-z])*$/i,
	patternMessage: dict.user.form.passwordPattern,
});

export const getConfirmPasswordOpt = dict => ({
	name: 'passwordConfirm',
	type: 'password',
	placeholder: dict.user.form.confirmPasswordPlaceholder,
	required: true,
	requiredMessage: dict.user.form.confirmPasswordRequired,
	confirmPassword: true,
});

export const getNameOpt = dict => ({
	name: 'name',
	type: 'text',
	placeholder: dict.user.form.namePlaceholder,
	required: true,
	requiredMessage: dict.user.form.nameRequired,
	pattern:
		/^([A-Za-zА-Яа-яІіЇїЄєҐґ\s\-']+)(,\s?[A-Za-zА-Яа-яІіЇїЄєҐґ\s\-']+)*$/,
	patternMessage: dict.user.form.namePattern,
});

export const getCityOpt = dict => ({
	name: 'city',
	type: 'text',
	placeholder: dict.user.form.locationPlaceholder,
	required: true,
	requiredMessage: dict.user.form.locationRequired,
	pattern:
		/^([A-Za-zА-Яа-яІіЇїЄєҐґ\s\-']+)(,\s?[A-Za-zА-Яа-яІіЇїЄєҐґ\s\-']+)*$/,
	patternMessage: dict.user.form.locationPattern,
	label: dict.user.form.locationLabel,
	zero: true,
});

export const getPhoneOpt = dict => ({
	name: 'phone',
	type: 'tel',
	placeholder: dict.user.form.phonePlaceholder,
	required: true,
	requiredMessage: dict.user.form.phoneRequired,
	pattern: /^(0[5-9][0-9]\d{7})$/i,
	patternMessage: dict.user.form.phonePattern,
});

// notice pets modal form
export const petName = {
	label: 'Name pet',
	name: 'name',
	type: 'text',
	placeholder: 'Type pet name',
	// required: true,
	// requiredMessage: "Enter your pet's name",
	pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]{2,16}$/,
	patternMessage: 'Latin only, min 2, max 16',
	maxLength: 16,
	minLength: 2,
};
export const petBirth = {
	label: 'Date of Birth',
	name: 'birthday',
	type: 'text',
	placeholder: 'Type date of birth',
	// required: true,
	// requiredMessage: 'Enter the date of birth',
	pattern:
		/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/,
	patternMessage: '01.01.2020',
};
export const petBreed = {
	label: 'Breed',
	name: 'breed',
	type: 'text',
	placeholder: 'Type breed',
	// required: true,
	// requiredMessage: "Enter your pet's breed",
	pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]{2,16}$/,
	patternMessage: 'Latin only, min 2, max 16',
	maxLength: 16,
	minLength: 2,
};
export const petComment = {
	label: 'Comments',
	name: 'comments',
	type: 'text',
	placeholder: 'Type comments',
	// required: true,
	// requiredMessage: 'Enter your comment',
	// eslint-disable-next-line no-useless-escape
	pattern: /^[A-Za-zА-Яа-я0-9ІіЇїЄєҐґ\s!@#$%^&*()_+=\-`~[\]{}|';:/.,?><]*$/,
	patternMessage: 'Latin only, min 8, max 120',
	maxLength: 120,
	minLength: 8,
};
export const getPetAdTitle = dict => ({
	label: dict.pets.form.titleLabel,
	name: 'title',
	type: 'text',
	placeholder: dict?.form?.titlePlaceholder,
	required: true,
	requiredMessage: dict?.form?.titleRequired,
	pattern:
		/^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9\s!@#$%^&*()_+=\-`~[\]{}|';:/.,?><]{2,48}$/,
	patternMessage: dict?.form?.titlePattern,
	maxLength: 48,
	minLength: 2,
	zero: true,
});

export const getPetsLocation = dict => ({
	name: 'location',
	type: 'text',
	placeholder: dict.user.form.locationPlaceholder,
	required: true,
	requiredMessage: dict.user.form.locationRequired,
	pattern: /^([A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]+)(,\s?[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]+)*$/u,
	patternMessage: dict.user.form.locationPattern,
	label: dict.user.form.locationLabel,
	zero: true,
});
// user pets modal form

export const getPetBirthUser = dict => ({
	label: dict.pets.form.birthday,
	name: 'birthday',
	type: 'text',
	placeholder: dict?.form?.birthdayPlaceholder,
	required: true,
	requiredMessage: dict?.form?.birthdayRequired,
	pattern:
		/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/,
	patternMessage: dict?.form?.birthdayPattern,
});

export const getPetNameUser = dict => ({
	label: dict.pets.form.name,
	name: 'name',
	type: 'text',
	placeholder: dict?.form?.namePlaceholder,
	required: true,
	requiredMessage: dict?.form?.nameRequired,
	pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]{2,16}$/,
	patternMessage: dict?.form?.namePattern,
	maxLength: 16,
	minLength: 2,
});

export const getPetBreedUser = dict => ({
	label: dict.pets.form.breed,
	name: 'breed',
	type: 'text',
	placeholder: dict?.form?.breedPlaceholder,
	required: true,
	requiredMessage: dict?.form?.breedRequired,
	pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'\- ]{2,16}$/,
	patternMessage: dict?.form?.breedPattern,
	maxLength: 16,
	minLength: 2,
});

export const getPetCommentUser = dict => ({
	label: dict?.form?.commentLabel,
	name: 'comments',
	type: 'text',
	placeholder: dict?.form?.commentPlaceholder,
	required: true,
	requiredMessage: dict?.form?.commentRequired,
	pattern:
		/^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9\s.,!?'"%:;()\-–—@№#&*+={}[\]\\/|<>~`^$]*$/u,
	patternMessage: dict?.form?.commentPattern,
	maxLength: 120,
	minLength: 8,
});
