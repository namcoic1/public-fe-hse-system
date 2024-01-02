import axiosClient from "./axiosClient";

const reportApi = {
    listServiceResult() {
        const url = `report/result-of-evaluation-service`;
        return axiosClient.get(url);
    },
    overviewScore(data) {
        // api/Report/overview-score-by-service-criteria/2?dateFrom=2023-10-16&dateTo=2023-11-18
        const url = `report/overview-score-by-service-criteria/${data.serId}?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    },
    overviewVote(data) {
        // api/Report/overview-votes-by-degree/2?dateFrom=2023-10-16&dateTo=2023-11-18
        const url = `report/overview-votes-by-degree/${data.serId}?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    },
    detailServiceResult(data) {
        // api/Report/result-of-evaluation-service/2?dateFrom=2023-10-16&dateTo=2023-11-18
        const url = `report/result-of-evaluation-service/${data.serId}?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    },
    serviceComparision(data) {
        // api/Report/service-comparison?ser1Id=1&ser2Id=2&dateFrom=2023-11-2&dateTo=2023-12-2
        const url = `report/service-comparison?ser1Id=${data.sourceService.serId}&ser2Id=${data.targetService.serId}&dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    },
    getStatSatisfaction(data) {
        // api/Report/statistics-satisfaction?dateFrom=2023-11-2&dateTo=2023-12-2
        const url = `report/statistics-satisfaction?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    },
    getStatSatisfactionByPoint(data) {
        // api/Report/statistics-satisfaction/5?dateFrom=2023-11-2&dateTo=2023-12-2
        const url = `report/statistics-satisfaction/${data.keyIndex}?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`;
        return axiosClient.get(url);
    }
};

export default reportApi;