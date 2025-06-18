export const createFormData = data => {
	const formData = new FormData();

	for (const [key, value] of Object.entries(data)) {
		if (key === 'avatar') {
			if (value && value.length) {
				formData.append('avatar', value[0]);
			}
		} else if (key === 'healthHistory') {
			if (Array.isArray(value) && value.length > 0) {
				const filtered = value.filter(
					entry => entry.vaccine?.trim() || entry.date?.trim()
				);
				if (filtered.length > 0) {
					const jsonString = JSON.stringify(filtered);
					formData.append('healthHistory', jsonString);
				}
			}
		} else if (typeof value === 'string') {
			formData.append(key, value.trim());
		}
	}

	return formData;
};
