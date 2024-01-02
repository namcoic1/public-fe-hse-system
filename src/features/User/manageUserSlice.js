import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import manageUserApi from '../../api/manageUserApi';
import userApi from '../../api/userApi';

export const fetchAllUsers = createAsyncThunk('user/fetchAll', async () => {
  try {
    const response = await manageUserApi.getAll();
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.getAll();
      return response.data;
    }
  }
});

export const createUser = createAsyncThunk('user/create', async (payload) => {
  try {
    const response = await manageUserApi.create(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.create(payload);
      return response;
    }
    if (error.response.status === 400 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

export const updateUser = createAsyncThunk('user/update', async (payload) => {
  try {
    const response = await manageUserApi.update(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.update(payload);
      return response;
    }
    if (error.response.status === 400 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

export const readUser = createAsyncThunk('user/read', async (payload) => {
  try {
    const response = await manageUserApi.read(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.read(payload);
      return response;
    }
    if (error.response.status === 404) {
      return error.response.data;
    }
  }
});

export const changeUserStatus = createAsyncThunk('user/status', async (payload) => {
  try {
    const response = await manageUserApi.changeStatus(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.changeStatus(payload);
      return response;
    }
    if (error.response.status === 404 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

export const fetchAllRoles = createAsyncThunk('role/fetchAll', async () => {
  try {
    const response = await manageUserApi.getAllRole();
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.getAllRole();
      return response.data;
    }
  }
});

export const readRole = createAsyncThunk('role/read', async (payload) => {
  try {
    const response = await manageUserApi.readRole(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.readRole(payload);
      return response;
    }
    if (error.response.status === 404 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

export const updateRole = createAsyncThunk('role/update', async (payload) => {
  try {
    const response = await manageUserApi.updateRole(payload);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await userApi.refreshToken();
      const response = await manageUserApi.updateRole(payload);
      return response;
    }
    if (error.response.status === 400 || error.response.status === 409) {
      return error.response.data;
    }
  }
});

const manageUserSlice = createSlice({
  name: 'manageUser',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        // state.data = action.payload;
        state.error = action.error.message;
      })
      .addCase(readUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.data = action.payload;
      })
      .addCase(readUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changeUserStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.data = action.payload;
      })
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(readRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(readRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default manageUserSlice.reducer;
