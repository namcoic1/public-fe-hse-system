import axiosClient from './axiosClient';

const serviceFeedbackApi = {
    getAll(data) {
        const url =
            data === undefined
                ? `/admin/view-service-feedback-for-bom`
                : `/admin/view-service-feedback-for-bom?from=${data.dateFrom}&to=${data.dateTo}`;
        return axiosClient.get(url);
    },
    read(data) {
        const url = `/admin/view-service-feedback-for-bom/${data}`;
        return axiosClient.get(url);
    },
    //   changeStatus(data) {
    //     const url = `/admin/change-status/${data}`;
    //     return axiosClient.put(url);
    //   },
};

export default serviceFeedbackApi;
