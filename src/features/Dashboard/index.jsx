import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function DashboardFeature() {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
    </Routes>
  );
}

export default DashboardFeature;
