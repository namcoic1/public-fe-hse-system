import { Button } from '@mui/material';
import React from 'react';

function CriteriaDetails(props) {
  const { criteria } = props;

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
        <div className="col-9 p-3 border">{criteria.serName}</div>
        <div className="col-3 p-3 border">Criteria Name</div>
        <div className="col-9 p-3 border">{criteria.criDesc}</div>
        <div className="col-3 p-3 border">Description</div>
        <div className="col-9 p-3 border">{criteria.note}</div>
        <div className="col-3 p-3 border">Created On</div>
        <div className="col-9 p-3 border">{criteria.createdOn}</div>
        <div className="col-3 p-3 border">Created By</div>
        <div className="col-9 p-3 border">{criteria.createdBy}</div>
        <div className="col-3 p-3 border">Modified On</div>
        <div className="col-9 p-3 border">{criteria.modifiedOn}</div>
        <div className="col-3 p-3 border">Modified By</div>
        <div className="col-9 p-3 border">{criteria.modifiedBy}</div>
        <div className="col-3 p-3 border">Display</div>
        <div className="col-9 p-3 border">{criteria.status ? 'Show' : 'Hide'}</div>
        <div className="p-0 text-end">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={props.handleClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CriteriaDetails;
