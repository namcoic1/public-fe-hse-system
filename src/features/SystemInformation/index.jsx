import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SystemInformation from './pages/SystemInformation';

function SystemInformationFeature() {
  return (
    <Routes>
        <Route path="/" Component={SystemInformation} />
    </Routes>
  );
}

export default SystemInformationFeature;
