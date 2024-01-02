import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';

export default function ComboBoxField(props) {
  const { form, name, label, disabled, options } = props;
  const { errors } = form.formState;
  const hasError = errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="mt-2">
          {label === '' ? '' : <label>{label}</label>}
          <Autocomplete
            // style={{ marginTop: '16px', marginBottom: '8px' }}
            {...field}
            fullWidth
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={(e, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                // label={label}
                disabled={disabled}
                error={!!hasError}
                helperText={hasError?.message}
                variant="outlined"
              />
            )}
          />
        </div>
      )}
    />
  );
}
