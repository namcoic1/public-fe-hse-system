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

export const createService = createAsyncThunk('service/create', async (payload) => {
    try {
        const response = await serviceApi.create(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await serviceApi.create(payload);
            return response;
        }
        if (error.response.status === 400 || error.response.status === 409) {
            return error.response.data;
        }
    }
});

export const updateService = createAsyncThunk('service/update', async (payload) => {
    try {
        const response = await serviceApi.update(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await serviceApi.update(payload);
            return response;
        }
        if (error.response.status === 400 || error.response.status === 409) {
            return error.response.data;
        }
    }
});

export const readService = createAsyncThunk('service/read', async (payload) => {
    try {
        const response = await serviceApi.read(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await serviceApi.read(payload);
            return response;
        }
    }
});

export const changeServiceStatus = createAsyncThunk('service/status', async (payload) => {
    try {
        const response = await serviceApi.changeStatus(payload);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            await userApi.refreshToken();
            const response = await serviceApi.changeStatus(payload);
            return response;
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
            .addCase(createService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.data = action.payload;
            })
            .addCase(createService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(readService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(readService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.data = action.payload;
            })
            .addCase(readService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.data = action.payload;
            })
            .addCase(updateService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(changeServiceStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changeServiceStatus.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.data = action.payload;
            })
            .addCase(changeServiceStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default serviceSlice.reducer;