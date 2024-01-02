import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

InputFileUpload.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function InputFileUpload(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form.formState;

  return (
    <FormControl fullWidth variant="outlined" className='mt-2'>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <div className='d-flex flex-column'>
            <img
              className="mx-auto rounded-circle"
              src={
                value instanceof File
                  ? URL.createObjectURL(value)
                  : value === null || value === 'https://hsestorage71.blob.core.windows.net/images/null'
                  ? 'https://hsestorage71.blob.core.windows.net/images/temp_image.png'
                  : value
              }
              alt="upload file"
              style={{ aspectRatio: '6/3', objectFit: 'cover' , width: '15vw', height: '15vw'}}
            />
            <div className='text-primary text-center'>JPG or PNG no larger than 5 MB</div>
            <Button className='my-3 mx-auto' component="label" fullWidth variant="contained" startIcon={<CloudUploadIcon />} style={{width:'100px'}}>
              {label}
              <VisuallyHiddenInput
                type="file"
                name={name}
                ref={ref}
                onChange={(e) => {
                  onChange(e.target.files[0]); // Update the form value
                }}
                onBlur={onBlur}
                disabled={disabled}
              />
            </Button>
          </div>
        )}
      />
      <FormHelperText style={{ color: '#d32f2f' }}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}
