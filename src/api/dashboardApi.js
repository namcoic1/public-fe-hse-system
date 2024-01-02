import axiosClient from "./axiosClient";

const dashboardApi = {
    viewDashboard(data) {
        const url = `admin/dashboard?date=${data.date}`;
        return axiosClient.get(url);
    }
};

export default dashboardApi;