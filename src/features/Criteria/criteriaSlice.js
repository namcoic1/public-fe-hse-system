import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import criteriaApi from '../../api/criteriaApi';
import userApi from '../../api/userApi';

export const fetchAllCriteria = createAsyncThunk('criteria/fetchAll', async () => {
  try {
    const response = await criteriaApi.getAll();
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await criteriaApi.getAll();
      return response.data;
    }
  }
});

export const createCriteria = createAsyncThunk('criteria/create', async (payload) => {
  try {
    const response = await criteriaApi.create(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await criteriaApi.create(payload);
      return response;
    }
    if (error.response.status === 400 || error.response.status === 404 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

export const updateCriteria = createAsyncThunk('criteria/update', async (payload) => {
  try {
    const response = await criteriaApi.update(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await criteriaApi.update(payload);
      return response;
    }
    if (error.response.status === 400 || error.response.status === 404 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

export const readCriteria = createAsyncThunk('criteria/read', async (payload) => {
  try {
    const response = await criteriaApi.read(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await criteriaApi.read(payload);
      return response;
    }
    if (error.response.status === 404) {
      return error.response.data;
    }
  }
});

export const changeCriteriaStatus = createAsyncThunk('criteria/status', async (payload) => {
  try {
    const response = await criteriaApi.changeStatus(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await criteriaApi.changeStatus(payload);
      return response;
    }
    if (error.response.status === 404 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

const criteriaSlice = createSlice({
  name: 'criteria',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCriteria.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCriteria.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(createCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload;
        // state.error = action.error.message;
      })
      .addCase(readCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readCriteria.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.data = action.payload;
      })
      .addCase(readCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload;
      })
      .addCase(updateCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCriteria.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload;
      })
      .addCase(changeCriteriaStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeCriteriaStatus.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(changeCriteriaStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload;
      });
  },
});

export default criteriaSlice.reducer;
