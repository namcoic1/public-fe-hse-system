import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';

SwitchField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function SwitchField(props) {
  const { form, name, label, disabled } = props;
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => <Switch {...field} checked={field.value} color="primary" disabled={disabled} />}
        />
      }
      label={label}
    />
  );
}

export default SwitchField;
