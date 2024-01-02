import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import evaluationResultApi from '../../api/evaluationResultApi';
import userApi from '../../api/userApi';

export const fetchAllEvaluationResult = createAsyncThunk('evaluationResult/fetchAll', async () => {
  try {
    const response = await evaluationResultApi.getAll();
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await evaluationResultApi.getAll();
      return response.data;
    }
  }
});

export const readEvaluationResult = createAsyncThunk('evaluationResult/read', async (payload) => {
  try {
    const response = await evaluationResultApi.read(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await evaluationResultApi.read(payload);
      return response;
    }
    if (error.response.status === 400 || error.response.status === 404) {
      return error.response.data;
    }
  }
});

// export const changeEvaluationResultStatus = createAsyncThunk('evaluationResult/status', async (payload) => {
//   try {
//     const response = await evaluationResultApi.changeStatus(payload);
//     return response;
//   } catch (error) {
//     if (error.response.status === 401) {
//       await userApi.refreshToken();
//       const response = await evaluationResultApi.changeStatus(payload);
//       return response;
//     }
//     if (error.response.status === 400 || error.response.status === 404 || error.response.status === 409) {
//       return error.response.data;
//     }
//   }
// });

const evaluationResultSlice = createSlice({
  name: 'evaluationResult',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvaluationResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllEvaluationResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllEvaluationResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(readEvaluationResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readEvaluationResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.data = action.payload;
      })
      .addCase(readEvaluationResult.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload;
        // state.error = action.error.message;
      });
    //   .addCase(changeEvaluationResultStatus.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(changeEvaluationResultStatus.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //   })
    //   .addCase(changeEvaluationResultStatus.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.data = action.payload;
    //   });
  },
});

export default evaluationResultSlice.reducer;
