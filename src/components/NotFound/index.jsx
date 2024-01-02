import React from 'react';
import { getRole } from '../../utils/common';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  var roleStr = '';
  const navigate = useNavigate();
  try {
    roleStr = getRole().role;
    // console.log(roleStr);
  } catch (error) {
    roleStr = '';
  }
  if (roleStr === '') {
    navigate('/authentication/signin');
  } else {
    return (
      <h1
        className="d-flex justify-content-center align-items-center text-white m-0"
        style={{ height: '100vh', backgroundColor: '#1976d2' }}
      >
        404 | Page not found
      </h1>
    );
  }
}

export default NotFound;
