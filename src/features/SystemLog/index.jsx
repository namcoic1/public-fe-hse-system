import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SystemLogList from './pages/SystemLogList';

function SystemLogFeature() {
  return (
    <Routes>
      <Route path="/" Component={SystemLogList} />
    </Routes>
  );
}

export default SystemLogFeature;
