import axiosClient from "./axiosClient"

const evalCriteriaApi = {
    getAll() {
        const url = `/evaluationcriteria`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = `/evaluationcriteria`;
        return axiosClient.post(url, data);
    },
    read(data) {
        const url = `/evaluationcriteria/${data}`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/evaluationcriteria/${data.criId}`;
        return axiosClient.put(url, data);
    },
    changeStatus(data) {
        const url = `/evaluationcriteria/change-status/${data}`;
        return axiosClient.put(url);
    },
}

export default evalCriteriaApi;