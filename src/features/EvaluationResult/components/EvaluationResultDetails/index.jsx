import { Button } from '@mui/material';
import React from 'react';
import { formatDateTime } from '../../../../utils/common';

function EvaluationResultDetails(props) {
  const { evaluationResult } = props;

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
        <div className="col-9 p-3 border">{evaluationResult.serName}</div>
        <div className="col-3 p-3 border">Criteria Name</div>
        <div className="col-9 p-3 border">{evaluationResult.criDesc}</div>
        <div className="col-3 p-3 border">Survey Answer</div>
        <div className="col-9 p-3 border">{evaluationResult.option}</div>
        <div className="col-3 p-3 border">Service Feedback</div>
        <div className="col-9 p-3 border">{evaluationResult.serFb}</div>
        <div className="col-3 p-3 border">Patient Name</div>
        <div className="col-9 p-3 border">{evaluationResult.patientName}</div>
        <div className="col-3 p-3 border">Submitted On</div>
        <div className="col-9 p-3 border">{formatDateTime(evaluationResult.createOn)}</div>
        {/* <div className="col-3 p-3 border">Status</div> */}
        {/* <div className="col-9 p-3 border">{evaluationResult.status ? 'Show' : 'Hide'}</div> */}
        <div className="p-0 text-end">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={props.handleClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EvaluationResultDetails;
