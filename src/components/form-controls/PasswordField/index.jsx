import React from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form.formState;
  const hasError = errors[name];
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl
        fullWidth
        variant="outlined"
        // style={{ marginTop: '16px', marginBottom: '8px' }}
        className="mt-2"
      >
        {/* <InputLabel htmlFor="outlined-adornment-password" style={{ color: hasError ? '#d32f2f' : undefined }}>
          {label}
        </InputLabel> */}
        <label>{label}</label>
        <Controller
          control={form.control}
          name={name}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id={name}
              type={showPassword ? 'text' : 'password'}
              placeholder={'Enter ' + label.replace(' *', '').toLowerCase()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              disabled={disabled}
              error={!!hasError}
            />
          )}
        />
        <FormHelperText style={{ color: '#d32f2f' }}>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
