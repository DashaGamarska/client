import { createSlice } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import {
	getNoticeByCategory,
	addNotice,
	addNoticeToFavorite,
	getFavoriteNoticeForCategories,
	getFavoriteNoticeByUser,
	removeNoticeFromFavorite,
	getUserNotices,
	removeNotice,
} from './notices-operations';

const initialState = {
	currentNotices: [],
	favorite: [],
	loading: false,
	error: null,
	totalPages: 1,
	isAddedSuccess: false,
	queryParams: {
		filter: '',
		category: 'for-free',
		page: 1,
	},
};

const noticesSlice = createSlice({
	name: 'notices',
	initialState,
	reducers: {
		setQueryParams: (state, { payload }) => {
			const {
				page = 1,
				filter = '',
				category = state.queryParams.category,
			} = payload;
			state.queryParams.filter = filter;
			state.queryParams.category = category;
			state.queryParams.page = page;
		},
		setTotalPages: (state, { payload }) => {
			state.totalPages = payload;
		},
		resetIsAddedSuccess: state => {
			state.isAddedSuccess = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getNoticeByCategory.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(getNoticeByCategory.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.currentNotices = payload.notices;
				store.totalPages = payload.totalPages;
			})
			.addCase(getNoticeByCategory.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(getUserNotices.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(getUserNotices.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.currentNotices = payload;
			})
			.addCase(getUserNotices.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(getFavoriteNoticeForCategories.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(
				getFavoriteNoticeForCategories.fulfilled,
				(store, { payload }) => {
					store.loading = false;
					store.currentNotices = payload;
					store.favorite = payload.map(el => el._id);
				}
			)
			.addCase(
				getFavoriteNoticeForCategories.rejected,
				(store, { payload }) => {
					store.loading = false;
					store.error = payload;
				}
			)
			.addCase(getFavoriteNoticeByUser.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(getFavoriteNoticeByUser.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.favorite = payload.map(el => el._id);
			})
			.addCase(getFavoriteNoticeByUser.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(addNoticeToFavorite.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(addNoticeToFavorite.fulfilled, (store, { payload }) => {
				store.loading = false;
				const addedNotice = payload.favorite.length - 1;
				store.favorite.push(payload.favorite[addedNotice]);
			})
			.addCase(addNoticeToFavorite.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(removeNoticeFromFavorite.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(removeNoticeFromFavorite.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.favorite = store.favorite.filter(id => id !== payload.id);
			})
			.addCase(removeNoticeFromFavorite.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(addNotice.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(addNotice.fulfilled, (store, { payload }) => {
				store.isAddedSuccess = true;
				store.loading = false;
				if ([payload.category, 'own'].includes(store.queryParams.category)) {
					store.currentNotices = [payload, ...store.currentNotices];
				}
			})
			.addCase(addNotice.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(removeNotice.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(removeNotice.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.currentNotices = store.currentNotices.filter(
					({ _id }) => _id !== payload.id
				);
			})
			.addCase(removeNotice.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			});
	},
});

export const { setQueryParams, setTotalPages, resetIsAddedSuccess } =
	noticesSlice.actions;

const noticesReducer = noticesSlice.reducer;

const persistConfig = {
	key: 'noticesQueryParams',
	storage: storageSession,
	whitelist: ['queryParams'],
};

const persistedNoticesReducer = persistReducer(persistConfig, noticesReducer);

export default persistedNoticesReducer;