import StorageKeys from "../constants/storage_keys";
import axiosClient from "./axiosClient";

const userApi = {
    signin(data) {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },
    signout() {
        const url = '/auth/logout';
        return axiosClient.post(url);
    },
    checkEmailSystem(data) {
        const url = `/auth/check-email-system/${data}`;
        return axiosClient.post(url);
    },
    verifyCode(data) {
        const url = `/auth/verify-reset-code/${data.email}`;
        const formData = new FormData();
        formData.append('resetCode', data.resetCode);
        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async refreshToken() {
        const url = `/auth/refresh-token`;
        const params = {
            accessToken: localStorage.getItem(StorageKeys.ACCESS_TOKEN),
            refreshToken: localStorage.getItem(StorageKeys.REFRESH_TOKEN)
        };
        const data = await axiosClient.post(url, params);
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.data.accessToken);
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, data.data.refreshToken);
        return data;
    },
    changePassword(payload) {
        const url = `/user/change-password`;
        return axiosClient.post(url, { ...payload });
    }

};

export default userApi;