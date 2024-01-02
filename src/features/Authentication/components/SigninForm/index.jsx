import React from 'react';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import PasswordField from '../../../../components/form-controls/PasswordField';
import CheckboxField from '../../../../components/form-controls/CheckboxField';
import { Button, Link } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import StorageKeys from '../../../../constants/storage_keys';

const getInfoLogin = () => {
  if (localStorage.getItem(StorageKeys.USER) !== null) {
    const tempObject = JSON.parse(localStorage.getItem(StorageKeys.USER));
    const isRemember = tempObject.remember;
    // console.log(tempObject);
    if (isRemember) {
      return tempObject;
    }
  }
  return {
    email: '',
    password: '',
    remember: false,
  };
};

function SigninForm(props) {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .required('Please enter the required field.')
      .email('The email is in the wrong format.')
      .max(256, 'The email exceeds 255 characters.'),
    password: yup
      .string()
      .required('Please enter the required field.')
      .min(8, 'The password is between 8 and 20 characters.')
      .max(20, 'The password is between 8 and 20 characters.')
      .matches(
        '(?=^.{8,20}$)(?=.*\\d)(?![.\\n])(?=.*[a-z|A-Z]).*$',
        'The password must contain at least 1 letter and 1 number.',
      ),
  });

  const form = useForm({
    defaultValues: getInfoLogin(),
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };
  return (
    <div className="d-flex align-items-center" style={{ height: '100vh' }}>
      <div className="w-100" style={{ padding: '0px 80px 0px 80px' }}>
        <h1 className="text-center" style={{ fontSize: '60px', color: '#1976d2' }}>
          SIGN IN
        </h1>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="email" label="Email *" form={form} />
          <PasswordField name="password" label="Password *" form={form} />
          <CheckboxField name="remember" label="Remember me" form={form} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign in
          </Button>
          <div className="text-center">
            <Link
              variant="body2"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/authentication/forgot-password')}
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
