import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDictionary } from '../../lib/dictionary';
import {
	getNews,
	getQueryParams,
	getTotalPages,
	getNewsLoading,
} from '../../redux/news/news-selectors';
import { getAllNews } from '../../redux/news/news-operations';

import { NewsList } from 'components/News/NewList/NewsList';
import { Container } from 'components/Reuse/Container/Container';
import { Title } from 'components/Reuse/Title/Title';
import { Search } from 'components/News/Search/Search';
import { PaginationList } from 'components/Reuse/Pagination/PaginationList/PaginationList';
import { NewsEmpty } from 'components/News/NewsEmpty/NewsEmpty';
import { BigSpinner } from 'components/Reuse/Loaders/Spinner/BigSpinner';

import styles from './NewsPage.module.scss';

const NewsPage = () => {
	const dispatch = useDispatch();
	const { lang } = useParams();

	const news = useSelector(getNews);
	const totalPages = useSelector(getTotalPages);
	const queryParams = useSelector(getQueryParams);
	const isLoading = useSelector(getNewsLoading);

	const noResults = !news.length && !isLoading;

	useEffect(() => {
		dispatch(getAllNews({ ...queryParams, lang }));
	}, [dispatch, queryParams, lang]);

	const [dict, setDict] = useState(null);

	useEffect(() => {
		const load = async () => {
			const data = await getDictionary(lang);
			setDict(data);
		};
		load();
	}, [lang]);

	if (!dict) return <p>Loading...</p>;

	return (
		<section className={styles.section}>
			<Container>
				<Title text={dict.newsPage.title} />
				<Search placeholder={dict.newsPage.searchPlaceholder} />
				{isLoading ? (
					<div className={styles.spinner}>
						<BigSpinner />
					</div>
				) : (
					<NewsList data={news} readMoreLabel={dict.newsPage.readMore} />
				)}
				{noResults && <NewsEmpty text={dict.newsPage.noResults} />}

				{totalPages > 1 && <PaginationList pages={totalPages} />}
			</Container>
		</section>
	);
};

export default NewsPage;
