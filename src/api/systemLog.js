import axiosClient from "./axiosClient"

const systemLog = {
    get(data) {
        const url = `/systemInformation/get-log?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    }
}

export default systemLog;