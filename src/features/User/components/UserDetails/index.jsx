import { Button } from '@mui/material';
import React from 'react';
import { URL_IMG } from '../../../../constants/storage_urls';
import { formatDateTime } from '../../../../utils/common';

function UserDetails(props) {
  const { user } = props;

  return (
    <div className="container mt-3">
      <div className="row text-center">
        <div className="col-3 border text-white p-4" style={{ backgroundColor: '#1976d2' }}>
          Definitions
        </div>
        <div className="col-9 text-white p-4" style={{ backgroundColor: '#1976d2' }}>
          Informations
        </div>
        <div className="col-3 p-3 border">User Email</div>
        <div className="col-9 p-3 border">{user.email}</div>
        <div className="col-3 p-3 border">Full Name</div>
        <div className="col-9 p-3 border">{user.firstName + ' ' + user.lastName}</div>
        <div className="col-3 p-3 border d-flex justify-content-center align-items-center">Image</div>
        <div className="col-9 p-3 border">
          <img
            // 'https://hsestorage71.blob.core.windows.net/images/temp_image.png'
            src={
              user.image === null
                ? 'https://i.pinimg.com/564x/c8/42/c3/c842c3f8c238fd4fa7d5fa21843e2493.jpg'
                : URL_IMG + user.image
            }
            alt={'User Image'}
            style={{ aspectRatio: '6/3', objectFit: 'contain', width: '55%' }}
          />
        </div>
        <div className="col-3 p-3 border">Role</div>
        <div className="col-9 p-3 border">{user.role}</div>
        <div className="col-3 p-3 border">Gender</div>
        <div className="col-9 p-3 border">
          {user.genderId === 2 ? 'Female' : user.genderId === 1 ? 'Male' : 'Other'}
        </div>
        <div className="col-3 p-3 border">Date Of Birth</div>
        <div className="col-9 p-3 border">{user.dob ? formatDateTime(user.dob).split(',')[0] : 'Not yet'}</div>
        <div className="col-3 p-3 border">Phone Number</div>
        <div className="col-9 p-3 border">{user.phoneNumber}</div>
        <div className="col-3 p-3 border">Address</div>
        <div className="col-9 p-3 border">{user.address ? user.address : 'Not yet'}</div>
        <div className="col-3 p-3 border">Created On</div>
        <div className="col-9 p-3 border">{formatDateTime(user.createdOn)}</div>
        <div className="col-3 p-3 border">Modified On</div>
        <div className="col-9 p-3 border">{formatDateTime(user.modifiedOn)}</div>
        <div className="col-3 p-3 border">Status</div>
        <div className="col-9 p-3 border">{user.status}</div>
        <div className="p-0 text-end">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={props.handleClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
