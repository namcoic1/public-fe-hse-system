import axiosClient from "./axiosClient";

const surveyApi = {
    verifyPatientCode(data) {
        const url = `patient/verify-patient-code/${data}`;
        return axiosClient.get(url);
    },
    viewServices() {
        const url = `patient/view-evaluation-services`;
        return axiosClient.get(url);
    },
    viewCriterias(data) {
        const url = `patient/view-evaluation-criteria-for-patient/${data}`;
        return axiosClient.get(url);
    },
    submitEvaluationResult(data) {
        const { patientId, ...dataBody } = data;
        const url = `patient/submit-evaluation/${patientId}`;
        return axiosClient.post(url, dataBody);
    },
    getSystemInformation() {
        const url = `patient/get-system-information`;
        return axiosClient.get(url);
    },
};

export default surveyApi;