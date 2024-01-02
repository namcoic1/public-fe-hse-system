import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

CheckboxField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function CheckboxField(props) {
  const { form, name, label, disabled } = props;

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => <Checkbox {...field} checked={field.value} color="primary" disabled={disabled} />}
        />
      }
      label={label}
    />
  );
}

export default CheckboxField;
