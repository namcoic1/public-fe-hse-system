import React from 'react';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import SwitchField from '../../../../components/form-controls/SwitchField';
import ComboBoxField from '../../../../components/form-controls/ComboBoxField';

function CriteriaFormAdd(props) {
  const { services } = props;
  const schema = yup.object({
    criDesc: yup.string().required('Please enter the required field.'),
    selectedService: yup.object().required('Please enter the required field.'),
  });

  const form = useForm({
    // Set the default value to null for file,
    defaultValues: {
      note: '',
      status: false,
      selectedService: services[0],
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
      <InputField name="criDesc" label="Criteria name *" form={form} />
      <InputField name="note" label="Criteria description" form={form} isMultiline={true} numRows={4} />
      <div
        style={{
          marginTop: '15px',
        }}
      ></div>
      <ComboBoxField name="selectedService" label="Service *" form={form} options={props.services} />
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

export default CriteriaFormAdd;
