import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, changeImage } from '../profileSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import { convertToLocalDate, formatDateTime } from '../../../utils/common';
import { URL_IMG } from '../../../constants/storage_urls';
function Profile() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);
  const navigate = useNavigate();

  useEffect(() => {
    // if (status === 'idle') {
    (async () => {
      try {
        const action = getProfile();
        await dispatch(action);
      } catch (error) {}
    })();
    // }
  }, []);
  // }, [dispatch, status]);

  const handleEditClick = () => {
    navigate(`./edit`, { state: { profile } });
  };

  // console.log(profile);
  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>Profile</h1>
        <div className="row px-2">
          <div className="col-4" style={{ backgroundColor: '#1976D2' }}>
            <div className="mt-5 p-5 d-flex flex-column">
              <img
                className="rounded-circle mx-auto"
                src={URL_IMG + (profile.image !== null ? profile.image : 'avatar_image.png')}
                alt={profile.email}
                style={{ aspectRatio: '6/3', objectFit: 'cover', width: '100%', width: '20vw', height: '20vw' }}
              />
              <div className="mt-2 text-white text-center fs-4">{profile.firstName + ' ' + profile.lastName}</div>
              <div className="mt-2 text-white text-center fs-6">{profile.role}</div>
            </div>
          </div>
          <div className="col-8 px-4 d-flex flex-column">
            <div className="fw-bolder fs-5 mt-3">Account Details</div>
            <hr className="border border-dark border-1 mt-1"></hr>
            <div className="row">
              <div className="col-6">
                <div className="fw-bolder fs-6 mt-4">Email</div>
                <div className="text-black-50">{profile.email}</div>
                <div className="fw-bolder fs-6 mt-5">Birthday</div>
                <div className="text-black-50">{profile.dob?.split('T')[0] || 'Not yet'}</div>
                <div className="fw-bolder fs-6 mt-5">Address</div>
                <div className="text-black-50">{profile.address !== 'None' ? profile.address : ''}</div>
              </div>
              <div className="col-6">
                <div className="fw-bolder fs-6 mt-4">Phone number</div>
                <div className="text-black-50">{profile.phoneNumber}</div>
                <div className="fw-bolder fs-6 mt-5">Gender</div>
                <div className="text-black-50">
                  {profile.genderId === 1
                    ? 'Male'
                    : profile.genderId === 2
                    ? 'Female'
                    : profile.genderId === 3
                    ? 'Other'
                    : ''}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-auto">
              <Button variant="contained" className="me-2" onClick={() => handleEditClick()}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
