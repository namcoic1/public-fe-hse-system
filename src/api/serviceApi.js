import axiosClient from "./axiosClient"

const serviceApi = {
    getAll() {
        const url = `/service`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = `/service`;
        const formData = new FormData();
        formData.append('SerName', data.serName);
        formData.append('SerDesc', data.serDesc);
        formData.append('Icon', data.icon);
        formData.append('Status', data.status);
        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    read(data) {
        const url = `/service/${data}`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/service/${data.serId}`;
        const formData = new FormData();
        const icon = data.icon instanceof File ? data.icon : null;
        // console.log(icon);
        formData.append('SerId', data.serId);
        formData.append('SerName', data.serName);
        formData.append('SerDesc', data.serDesc);
        formData.append('Icon', icon);
        // formData.append('Status', data.status);
        return axiosClient.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    changeStatus(data) {
        const url = `/service/${data}/change-status`;
        return axiosClient.put(url);
    },
    getServiceForCompare() {
        const url = `/service/list-of-service-name`;
        return axiosClient.get(url);
    }
}

export default serviceApi;