import axios from 'axios';
import StorageKeys from '../constants/storage_keys';
const axiosClient = axios.create({
    baseURL: 'https://hse-api.azurewebsites.net/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient;