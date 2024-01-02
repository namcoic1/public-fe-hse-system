import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

MonthYearField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function MonthYearField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form.formState;
  const hasError = errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="mt-2">
          <label className="d-block">{label}</label>
          <TextField
            // margin="normal"
            variant="outlined"
            {...field}
            // label={label}
            disabled={disabled}
            //   fullWidth
            error={!!hasError}
            helperText={hasError?.message}
            type="month" // Use 'month' type to show only month and year
            InputLabelProps={{
              shrink: true,
            }}
            //   inputProps={{
            //     min: 'yyyy-MM',
            //     max: 'yyyy-MM',
            //   }}
          />
        </div>
      )}
    />
  );
}

export default MonthYearField;
