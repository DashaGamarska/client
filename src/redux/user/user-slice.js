import { createSlice } from '@reduxjs/toolkit';

import {
	getUserData,
	updateUserData,
	addUserPet,
	removeUserPet,
} from './user-operations';

const initialState = {
	user: { avatarURL: null, userInfo: {} },
	loading: false,
	userLoading: false,
	error: null,
	addPetError: null,
	isLoadingUpdate: false,
	isDisabledFields: false,
	isAddedPetSuccess: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleIsDisablet(state) {
			state.isDisabledFields = true;
		},
		resetIsAddedPetSuccess(state) {
			state.isAddedPetSuccess = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getUserData.pending, state => {
				state.loading = true;
				state.userLoading = true;
				state.error = null;
			})
			.addCase(getUserData.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userLoading = false;
				state.user = payload.user;
			})
			.addCase(getUserData.rejected, (state, { payload }) => {
				state.loading = false;
				state.userLoading = false;
				state.error = payload;
			})

			.addCase(updateUserData.pending, state => {
				state.loading = true;
				state.error = null;
				state.isLoadingUpdate = true;
				state.isDisabledFields = false;
			})
			.addCase(updateUserData.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.user = { ...state.user, ...payload.user };
				state.isLoadingUpdate = false;
			})
			.addCase(updateUserData.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.isLoadingUpdate = false;
			})

			.addCase(addUserPet.pending, state => {
				state.loading = true;
				state.error = null;
				state.addPetError = null;
			})
			.addCase(addUserPet.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.addPetError = null;
				state.user.pets = [payload, ...state.user.pets];
				state.isAddedPetSuccess = true;
			})
			.addCase(addUserPet.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.addPetError = true;
			})

			.addCase(removeUserPet.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeUserPet.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.user.pets = state.user.pets.filter(
					({ _id }) => _id !== payload.id
				);
			})
			.addCase(removeUserPet.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			});
	},
});

export const { toggleIsDisablet, resetIsAddedPetSuccess } = userSlice.actions;
export default userSlice.reducer;
