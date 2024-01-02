import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export default function RadioGroupField(props) {
  const { form, name, label, options } = props;
  const { errors } = form.formState;
  const hasError = errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        // <RadioGroup row {...field} error={!!hasError} helperText={hasError?.message}>
        <RadioGroup row {...field}>
          {label && <div className="col-4 d-flex justify-content-center align-items-center">{label}</div>}
          {options.map((option, index) => (
            <div
              key={option.value}
              className={
                index === 0
                  ? 'col-2 d-flex justify-content-center align-items-center'
                  : 'col-3 d-flex justify-content-center align-items-center'
              }
            >
              <FormControlLabel value={option.value} label={option.label} control={<Radio />} sx={{ margin: 'auto' }} />
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
