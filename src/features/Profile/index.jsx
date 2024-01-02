import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import EditProfile from './pages/ProfileEdit';
import ChangePassword from './pages/ChangePassword';

function ProfileFeature() {
  return (
    <Routes>
      <Route path="/" Component={Profile} />
      <Route path="/edit/" Component={EditProfile} />
      <Route path="/change-password" Component={ChangePassword} />
    </Routes>
  );
}

export default ProfileFeature;
