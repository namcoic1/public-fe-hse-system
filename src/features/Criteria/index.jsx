import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CriteriaList from './pages/CriteriaList';

function CriteriaFeature() {
  return (
    <Routes>
        <Route path="/" Component={CriteriaList} />
    </Routes>
  );
}

export default CriteriaFeature;
