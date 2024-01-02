import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ServiceList from './pages/ServiceList';

function ServiceFeature() {
  return (
    <Routes>
        <Route path="/" Component={ServiceList} />
    </Routes>
  );
}

export default ServiceFeature;
