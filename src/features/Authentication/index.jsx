import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
function AuthenticationFeature() {
  return (
    <Routes>
      <Route path="/signin" Component={Signin} />
      <Route path="/forgot-password" Component={ForgotPassword} />
      <Route path="/verify-code/:email" Component={VerifyCode} />
    </Routes>
  );
}

export default AuthenticationFeature;
