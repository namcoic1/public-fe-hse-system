import { List, Typography } from '@mui/material';
import React from 'react';

function CriteriaResult({ resultDetail, index }) {
  if (resultDetail.options === null) {
    const defaultOptions = [
      {
        optionName: 'Strongly Agree',
        optionVote: 0,
        votePercent: 0.0,
      },
      {
        optionName: 'Agree',
        optionVote: 0,
        votePercent: 0.0,
      },
      {
        optionName: 'Neutral',
        optionVote: 0,
        votePercent: 0.0,
      },
      {
        optionName: 'Disagree',
        optionVote: 0,
        votePercent: 0.0,
      },
      {
        optionName: 'Strongly Disagree',
        optionVote: 0,
        votePercent: 0.0,
      },
    ];
    return (
      <div>
        <Typography variant="h6">
          {index + 1}. {resultDetail.criDesc} ({resultDetail.vote} votes)
        </Typography>
        <List>
          {defaultOptions.map((option, optionIndex) => (
            <div key={optionIndex}>
              <p style={{ color: '#1976d2' }}>
                {option.optionName} {`(${option.optionVote} votes)`}
              </p>
              <div className="progress mb-2" style={{ height: '30px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${option.votePercent}%`, backgroundColor: '#1976d2' }}
                  aria-valuenow={option.votePercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {option.votePercent}%
                </div>
              </div>
            </div>
          ))}
        </List>
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h6">
        {index + 1}. {resultDetail.criDesc} ({resultDetail.vote} votes)
      </Typography>
      <List>
        {resultDetail.options?.map((option, optionIndex) => (
          <div key={optionIndex}>
            <p style={{ color: '#1976d2' }}>
              {option.optionName} {`(${option.optionVote} votes)`}
            </p>
            <div className="progress mb-2" style={{ height: '30px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${option.votePercent}%`, backgroundColor: '#1976d2' }}
                aria-valuenow={option.votePercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {option.votePercent}%
              </div>
            </div>
          </div>
        ))}
      </List>
    </div>
  );
}

export default CriteriaResult;
