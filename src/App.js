import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ServiceFeature from './features/Service';
import SystemInformationFeature from './features/SystemInformation';
import ProfileFeature from './features/Profile';
import AuthenticationFeature from './features/Authentication';
import NotFound from './components/NotFound';
import Survey from './features/Survey';
import HeaderSideBar from './components/HeaderSideBar';
import EvaluationResultFeature from './features/EvaluationResult';
import UserFeature from './features/User';
import CriteriaFeature from './features/Criteria';
import ReportFeature from './features/Report';
import DashboardFeature from './features/Dashboard';
import surveyApi from './api/surveyApi';
import { URL_IMG } from './constants/storage_urls';
import { useSystemData } from './app/SystemContext';
import ServiceFeedbackFeature from './features/ServiceFeedback';
import SystemLogFeature from './features/SystemLog';
import StorageKeys from './constants/storage_keys';
import { getRole } from './utils/common';
import WelcomeFeature from './features/Welcome';

function App() {
  const location = useLocation();
  const { updateSystemData } = useSystemData();
  const navigate = useNavigate();
  // console.log(location.pathname);
  useEffect(() => {
    (async () => {
      try {
        const actionSystem = await surveyApi.getSystemInformation();
        if (actionSystem.success) {
          //   "data": {
          //     "sysId": 1,
          //     "sysName": "HSE_System",
          //     "icon": "IconFile20231207124418.ico",
          //     "logo": "LogoFile20231121164311.jpg",
          //     "zalo": "0373701834",
          //     "hotline": "0393345962",
          //     "address": "Nam Dinh"
          // }
          // console.log(actionSystem.data);
          updateSystemData(actionSystem.data);
          document.title = actionSystem.data.sysName;
          document.querySelector('link[rel="icon"]').href = URL_IMG + actionSystem.data.icon;
        }
      } catch (error) {

      }
    })();
  }, [location.pathname]);

  var roleStr = "";
  try {
    roleStr = getRole().role;
    // console.log(roleStr);
  } catch (error) {
    roleStr = "";
  }

  return (
    <Routes>
      {/* <Route path='/authentication/*' Component={AuthenticationFeature} /> */}
      <Route path='/survey/*' Component={Survey} />
      {/* <Route path='/admin' Component={HeaderSideBar}>
        {roleStr.includes("Service") && (
          <Route path='service/*' Component={ServiceFeature} />
        )}
        {roleStr.includes("Criteria") && (
          <Route path='criteria/*' Component={CriteriaFeature} />
        )}
        {roleStr.includes("User") && (
          <Route path="user/*" Component={UserFeature} />
        )}
        {(roleStr.includes("Admin") || roleStr.includes("BOM")) && (
          <>
            <Route path='report/*' Component={ReportFeature} />
          </>
        )}
        <Route path='welcome/*' Component={WelcomeFeature} />
        <Route path='profile/*' Component={ProfileFeature} />
        <Route path='dashboard/*' Component={DashboardFeature} />
        <Route path="evaluation-answers/*" Component={EvaluationResultFeature} />
        <Route path="patient-opinions/*" Component={ServiceFeedbackFeature} />
        {roleStr.includes("Admin") && (
          <>
            <Route path='system-information/*' Component={SystemInformationFeature} />
            <Route path="system-log/*" Component={SystemLogFeature} />
          </>
        )}
      </Route> */}
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default App;
