import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ViewServices from './pages/ViewServices';
import ViewCriterias from './pages/ViewCriterias';
import ViewEvaluationResult from './pages/ViewEvaluationResult';
import { useSystemData } from '../../app/SystemContext';

function Survey() {
  return (
    <Routes>
      <Route path="/" Component={Welcome} />
      <Route path="/services" Component={ViewServices} />
      <Route path="/services/:serId/:serName/:serDesc" Component={ViewCriterias} />
      <Route path="/services/:serId/:serName/:serDesc/view-evaluation-result" Component={ViewEvaluationResult} />
    </Routes>
  );
}

export default Survey;
