import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { List, ListItemButton, Typography } from '@mui/material';
import React, { useState } from 'react';

function Criteria({ criteria, index, onSelect, checkedOption }) {
  const [selectedOption, setSelectedOption] = useState(checkedOption);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex + 1);
    onSelect(criteria.criId, optionIndex + 1);
  };

  return (
    <div>
      <Typography variant="h6">
        {index + 1}. {criteria.criDesc}
      </Typography>
      <List className="d-flex flex-column-reverse">
        {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, optionIndex) => (
          <div
            key={optionIndex}
            style={{
              backgroundColor: selectedOption === optionIndex + 1 ? '#1976d2' : '#ECECEC',
              color: selectedOption === optionIndex + 1 ? 'white' : 'black',
              borderRadius: '10px',
              marginBottom: '5px',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (checkedOption === null) {
                handleOptionSelect(optionIndex);
              }
            }}
          >
            <ListItemButton>
              {selectedOption === optionIndex + 1 ? (
                <RadioButtonChecked className="me-2" style={{ fontSize: '16px' }} />
              ) : (
                <RadioButtonUnchecked className="me-2" style={{ fontSize: '16px' }} />
              )}
              {option}
            </ListItemButton>
          </div>
        ))}
      </List>
    </div>
  );
}

export default Criteria;
