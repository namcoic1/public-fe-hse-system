import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Authentication/userSlice';
import serviceReducer from '../features/Service/serviceSlice';
import criteriaReducer from '../features/Criteria/criteriaSlice';
import manageUserReducer from '../features/User/manageUserSlice';
import evaluationResultReducer from '../features/EvaluationResult/evaluationResultSlice';
import systemReducer from '../features/SystemInformation/systemInformationSlice';
import profileReducer from '../features/Profile/profileSlice';

const rootReducer = {
  user: userReducer,
  service: serviceReducer,
  criteria: criteriaReducer,
  manageUser: manageUserReducer,
  evaluationResult: evaluationResultReducer,
  systemInfo: systemReducer,
  profile: profileReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
