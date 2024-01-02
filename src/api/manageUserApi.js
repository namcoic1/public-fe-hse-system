import axiosClient from './axiosClient';

const manageUserApi = {
  getAll() {
    const url = `/user`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/user';
    // console.log(data.status);
    const formData = new FormData();
    formData.append('Email', data.email);
    formData.append('FirstName', data.firstName);
    formData.append('LastName', data.lastName);
    formData.append('Password', data.password);
    formData.append('PhoneNumber', data.phoneNumber);
    if (data.dob) {
      formData.append('Dob', data.dob);
    }
    if (data.selectedGender.genderId) {
      formData.append('GenderId', data.selectedGender.genderId);
    }
    if (data.address) {
      formData.append('Address', data.address);
    }
    if (data.image) {
      formData.append('Image', data.image);
    }
    formData.append('Status', !data.status);
    if (data.selectedRole.label)
      switch (data.selectedRole.label) {
        case 'Admin':
          formData.append('Role.UserId', 1);
          formData.append('Role.MAdmin', true);
          formData.append('Role.MQAO', false);
          formData.append('Role.MBOM', false);
          formData.append('Role.MSystem', 7);
          formData.append('Role.MUser', 7);
          formData.append('Role.MService', 7);
          formData.append('Role.MCriteria', 7);
          break;
        case 'QAO':
          formData.append('Role.UserId', 1);
          formData.append('Role.MAdmin', false);
          formData.append('Role.MQAO', true);
          formData.append('Role.MBOM', false);
          formData.append('Role.MSystem', 0);
          formData.append('Role.MUser', 0);
          formData.append('Role.MService', 7);
          formData.append('Role.MCriteria', 7);
          break;
        case 'BOM':
          formData.append('Role.UserId', 1);
          formData.append('Role.MAdmin', false);
          formData.append('Role.MQAO', false);
          formData.append('Role.MBOM', true);
          formData.append('Role.MSystem', 0);
          formData.append('Role.MUser', 0);
          formData.append('Role.MService', 1);
          formData.append('Role.MCriteria', 1);
          break;
        default:
          break;
      }
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  read(data) {
    const url = `/user/${data}`;
    return axiosClient.get(url);
  },
  update(data) {
    const url = `/user/${data.userId}`;
    const formData = new FormData();
    formData.append('UserId', data.userId);
    // formData.append('Email', data.email);
    formData.append('FirstName', data.firstName);
    formData.append('LastName', data.lastName);
    if (data.password) {
      formData.append('Password', data.password);
    }
    formData.append('PhoneNumber', data.phoneNumber);
    if (data.dob) {
      formData.append('Dob', data.dob);
    }
    if (data.selectedGender.genderId) {
      formData.append('GenderId', data.selectedGender.genderId);
    }
    if (data.address) {
      formData.append('Address', data.address);
    }
    formData.append('Image', data.image instanceof File ? data.image : null);
    return axiosClient.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  changeStatus(data) {
    const url = `/user/${data}/change-status`;
    return axiosClient.put(url);
  },
  getAllRole() {
    const url = `/role`;
    return axiosClient.get(url);
  },
  readRole(data) {
    const url = `/role/${data}`;
    return axiosClient.get(url);
  },
  updateRole(data) {
    const url = `/role/${data.userId}`;
    return axiosClient.put(url, data);
  },

};

export default manageUserApi;
