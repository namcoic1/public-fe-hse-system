import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileApi from '../../api/profileApi';
import userApi from '../../api/userApi';

export const getProfile = createAsyncThunk('profile/getProfile', async () => {
    try {
        const response = await profileApi.get();
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await profileApi.get();
            return response.data;
        }
    }
});

export const updateProfile = createAsyncThunk('profile/update', async (payload) => {
    try {
        const response = await profileApi.update(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await profileApi.update(payload);
            return response;
        }
    }
});

export const changeImage = createAsyncThunk('profile/changeImage', async (payload) => {
    try {
        const response = await profileApi.changeImage(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await profileApi.changeImage(payload);
            return response;
        }
        if (error.response.status === 400 || error.response.status === 409) {
            return error.response.data;
        }
    }
});

export const changePassword = createAsyncThunk('profile/change-password', async (payload) => {
    try {
        const data = await userApi.changePassword(payload);
        return data;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const data = await userApi.changePassword(payload);
            return data;
        }
    }
});


const profileSlice = createSlice({
    name: 'profile',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.data = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(changeImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changeImage.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.data = action.payload;
            })
            .addCase(changeImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default profileSlice.reducer;