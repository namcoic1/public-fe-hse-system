import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from '../../api/serviceApi';
import userApi from '../../api/userApi';

export const fetchAllServices = createAsyncThunk('service/fetchAll', async () => {
    try {
        const response = await serviceApi.getAll();
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await serviceApi.getAll();
            return response.data;
        }
    }
});

const serviceSlice = createSlice({
    name: 'service',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAllServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default serviceSlice.reducer;