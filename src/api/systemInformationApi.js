import axiosClient from "./axiosClient"

const systemInformationApi = {
    get() {
        const url = `/systemInformation`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/systemInformation`;
        const formData = new FormData();
        const iconFile = data.iconFile instanceof File ? data.iconFile : null;

        const logoFile = data.logoFile instanceof File ? data.logoFile : null;
        console.log(logoFile);
        formData.append('SysName', data.sysName);
        formData.append('Icon', iconFile);
        formData.append('Logo', logoFile);
        formData.append('Zalo', data.zalo);
        formData.append('Hotline', data.hotline);
        formData.append('Address', data.address);
        // console.log(data);
        // console.log(iconFile);
        return axiosClient.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default systemInformationApi;