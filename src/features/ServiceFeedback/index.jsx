import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ServiceFeedbackList from './pages/ServiceFeedbackList';

function ServiceFeedbackFeature() {
  return (
    <Routes>
      <Route path="/" Component={ServiceFeedbackList} />
    </Routes>
  );
}

export default ServiceFeedbackFeature;
