import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListServiceResult from './pages/ListServiceResult';
import DetailServiceResult from './pages/DetailServiceResult';
import OverviewResult from './pages/OverviewResult';
import ServiceComparision from './pages/ServiceComparision';
import StatSatisfaction from './pages/StatSatisfaction';

function ReportFeature() {
  return (
    <Routes>
      <Route path="/overview-results" Component={ListServiceResult} />
      <Route path="/overview-results/:serId" Component={OverviewResult} />
      <Route path="/overview-results/:serId/detail" Component={DetailServiceResult} />
      <Route path="/service-comparision" Component={ServiceComparision} />
      <Route path="/statistics-satisfaction" Component={StatSatisfaction} />
    </Routes>
  );
}

export default ReportFeature;
