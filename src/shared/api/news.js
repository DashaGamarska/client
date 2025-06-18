import instance from './auth';

export const getAllNews = async ({ page = 1, query = '', lang }) => {
	const { data } = await instance.get(
		`/news?limit=6&page=${page}&search=${query}&lang=${lang}`
	);
	return data;
};
