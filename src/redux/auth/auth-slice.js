import { createSlice } from '@reduxjs/toolkit';

import { register, login, logout, current } from './auth-operations';

const initialState = {
	user: {},
	isLogin: false,
	token: '',
	userId: '',
	loading: false,
	error: null,
	isFirstQuery: true,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(register.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(register.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.user = payload.user;
			})
			.addCase(register.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(login.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(login.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.user = payload.user;
				store.token = payload.accessToken;
				store.isLogin = true;
				store.isFirstQuery = false;
			})
			.addCase(login.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(logout.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(logout.fulfilled, store => {
				store.loading = false;
				store.user = {};
				store.token = '';
				store.isLogin = false;
			})
			.addCase(logout.rejected, (store, { payload }) => {
				store.loading = false;
				store.error = payload;
			})
			.addCase(current.pending, store => {
				store.loading = true;
				store.error = null;
			})
			.addCase(current.fulfilled, (store, { payload }) => {
				store.loading = false;
				store.user = payload;
				store.isLogin = true;
				store.isFirstQuery = false;
				store.userId = payload._id;
			})
			.addCase(current.rejected, (store, { payload }) => {
				store.loading = false;
				store.token = '';
				store.error = payload;
				store.isFirstQuery = false;
			});
	},
});

export default authSlice.reducer;
