import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import systemInformationApi from '../../api/systemInformationApi';
import userApi from '../../api/userApi';

export const getSystemInformation = createAsyncThunk('systemInfo/get', async () => {
    try {
        const response = await systemInformationApi.get();
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await systemInformationApi.get();
            return response.data;
        }
    }
});
export const updateSystemInformation = createAsyncThunk('systemInfo/update', async (payload) => {
    try {
        const response = await systemInformationApi.update(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await systemInformationApi.update(payload);
            return response;
        }
        if (error.response.status === 400 || error.response.status === 409) {
            return error.response.data;
        }
    }
});

const systemInformationSlice = createSlice({
    name: 'systemInfo',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSystemInformation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSystemInformation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getSystemInformation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateSystemInformation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSystemInformation.fulfilled, (state, action) => {
                state.status = 'idle';
                //state.data = action.payload;
            })
            .addCase(updateSystemInformation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default systemInformationSlice.reducer;