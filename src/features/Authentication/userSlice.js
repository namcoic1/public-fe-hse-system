import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKeys from "../../constants/storage_keys";
import userApi from "../../api/userApi";

export const signin = createAsyncThunk('user/signin', async (payload) => {
    const params = {
        email: payload.email,
        password: payload.password
    };
    const data = await userApi.signin(params);
    // save data to local storage

    localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.data.accessToken);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, data.data.refreshToken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(payload));

    return payload;
});

export const refreshToken = createAsyncThunk('user/refresh', async ()=>{
    const params = {
        accessToken: localStorage.getItem(StorageKeys.ACCESS_TOKEN),
        refreshToken: localStorage.getItem(StorageKeys.REFRESH_TOKEN)
    };
    const data = await userApi.refreshToken(params);
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.data.accessToken);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, data.data.refreshToken);
    return JSON.parse(localStorage.getItem(StorageKeys.USER));
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {}
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
            localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
            state.current = {};
        }
    },
    extraReducers: {
        [signin.fulfilled]: (state, action) => {
            state.current = action.payload;
        }
    }
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;