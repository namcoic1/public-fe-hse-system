import React from 'react';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import InputFileField from '../../../../components/form-controls/InputFileField';
import SwitchField from '../../../../components/form-controls/SwitchField';

function ServiceFormAdd(props) {
  const schema = yup.object({
    serName: yup.string().required('Please enter the required field.'),
    serDesc: yup.string().required('Please enter the required field.'),
    icon: yup.mixed().required('Please choose file'),
  });

  const form = useForm({
    defaultValues: {
      serName: '',
      serDesc: '',
      icon: null, // Set the default value to null for file,
      status: false,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="serName" label="Service name *" form={form} />
      <InputField name="serDesc" label="Service description *" form={form} isMultiline={true} numRows={4} />
      <InputFileField name="icon" label="Choose an Image (PNG or JPG < 5MB) *" form={form} />
      <SwitchField name="status" label="Display" form={form} />
      <div className="text-end">
        <Button variant="contained" className="bg-secondary" sx={{ mt: 3, mb: 2, mr: 1 }} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </div>
    </form>
  );
}

export default ServiceFormAdd;
