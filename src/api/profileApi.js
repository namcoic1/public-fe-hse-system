import axiosClient from "./axiosClient"

const profileApi = {
    get() {
        const url = `/user/view-profile`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/user/update-profile`;
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('genderId', data.selectedGender.genderId);
        formData.append('dob', data.dob || '');
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('address', data.address);
        // console.log(data);
        return axiosClient.put(url, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    changeImage(data) {
        const url = `/user/change-image`;
        const formData = new FormData();
        const image = data.image instanceof File ? data.image : null;
        formData.append('files', image);
        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
}

export default profileApi;