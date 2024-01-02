import { Button } from '@mui/material';
import React from 'react';
import { URL_IMG } from '../../../../constants/storage_urls';

function ServiceDetails(props) {
  // {
  //   "serId": 10,
  //   "serName": "Service10",
  //   "serDesc": "This is service 10",
  //   "icon": "Icon20231102231426.png",
  //   "createdOn": "2023-11-01T20:57:52.2892463",
  //   "createdBy": 5,
  //   "modifiedOn": "2023-11-01T20:57:52.2893222",
  //   "modifiedBy": 5,
  //   "status": true
  // }
  const { service } = props;

  return (
    <div className="container mt-3">
      <div className="row text-center">
        <div className="col-3 border text-white p-4" style={{ backgroundColor: '#1976d2' }}>
          Definitions
        </div>
        <div className="col-9 text-white p-4" style={{ backgroundColor: '#1976d2' }}>
          Informations
        </div>
        <div className="col-3 p-3 border">Service Name</div>
        <div className="col-9 p-3 border">{service.serName}</div>
        <div className="col-3 p-3 border">Service Description</div>
        <div className="col-9 p-3 border">{service.serDesc}</div>
        <div className="col-3 p-3 border">Service Image</div>
        <div className="col-9 p-3 border">
          <img
            src={URL_IMG + service.icon}
            alt={service.serName}
            style={{ aspectRatio: '6/3', objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="col-3 p-3 border">Created On</div>
        <div className="col-9 p-3 border">{service.createdOn}</div>
        <div className="col-3 p-3 border">Created By</div>
        <div className="col-9 p-3 border">{service.createdBy}</div>
        <div className="col-3 p-3 border">Modified On</div>
        <div className="col-9 p-3 border">{service.modifiedOn}</div>
        <div className="col-3 p-3 border">Modified By</div>
        <div className="col-9 p-3 border">{service.modifiedBy}</div>
        <div className="col-3 p-3 border">Display</div>
        <div className="col-9 p-3 border">{service.status ? 'Show' : 'Hide'}</div>
        <div className="p-0 text-end">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={props.handleClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
