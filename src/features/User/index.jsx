import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';

function UserFeature() {
  return (
    <Routes>
      <Route path="/" Component={UserList} />
    </Routes>
  );
}

export default UserFeature;
