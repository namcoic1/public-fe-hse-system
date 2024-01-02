import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EvaluationResultList from './pages/EvaluationResultList';

function EvaluationResultFeature() {
  return (
    <Routes>
      <Route path="/" Component={EvaluationResultList} />
    </Routes>
  );
}

export default EvaluationResultFeature;
