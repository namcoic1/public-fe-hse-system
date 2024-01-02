import React from 'react';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import InputFileField from '../../../../components/form-controls/InputFileField';
import { URL_IMG } from '../../../../constants/storage_urls';

function SystemInformationFormEdit(props) {
  const { systemInformation } = props;
  const schema = yup.object({
    sysName: yup.string().required('Please enter the required field.'),
    zalo: yup
      .string()
      .required('Please enter the required field.')
      .matches('^[0-9\\-\\+]{9,15}$', 'The phone numbers only contain 9 to 15 numbers.'),
    hotline: yup
      .string()
      .required('Please enter the required field.')
      .matches('^[0-9\\-\\+]{9,15}$', 'The phone numbers only contain 9 to 15 numbers.'),
    address: yup.string().required('Please enter the required field.'),
  });

  const form = useForm({
    defaultValues: {
      sysName: systemInformation.sysName,
      iconFile: URL_IMG + systemInformation.icon,
      logoFile: URL_IMG + systemInformation.logo,
      zalo: systemInformation.zalo,
      hotline: systemInformation.hotline,
      address: systemInformation.address,
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
      <InputField name="sysName" label="System name *" form={form} />
      <div className="row">
        <div className="col-6">
          <InputFileField name="iconFile" label="Choose icon (ico < 5MB) *" form={form} />
        </div>
        <div className="col-6">
          <InputFileField name="logoFile" label="Choose logo (PNG or JPG < 5 MB) *" form={form} />
        </div>
      </div>
      <InputField name="zalo" label="Zalo *" form={form} />
      <InputField name="hotline" label="Hotline *" form={form} />
      <InputField name="address" label="Address *" form={form} />
      <div className="text-end">
        <Button variant="contained" className="bg-secondary" sx={{ mt: 3, mb: 2, mr: 1 }} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default SystemInformationFormEdit;
