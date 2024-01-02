import axiosClient from './axiosClient';

const evaluationResultApi = {
  getAll(data) {
    const url = `/admin/view-evaluation-result-for-bom?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
    return axiosClient.get(url);
  },
  read(data) {
    const url = `/admin/view-evaluation-result-for-bom/${data}`;
    return axiosClient.get(url);
  },
  //   changeStatus(data) {
  //     const url = `/admin/change-status/${data}`;
  //     return axiosClient.put(url);
  //   },
};

export default evaluationResultApi;
