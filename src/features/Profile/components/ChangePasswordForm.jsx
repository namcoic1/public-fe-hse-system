import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import { default as React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import PasswordField from '../../../components/form-controls/PasswordField';
import { changePassword } from '../profileSlice';
import { clearLocalStorage, passwordValidation } from '../../../utils/common';
import LazyLoading from '../../../components/LazyLoading';
import userApi from '../../../api/userApi';

function ChangePasswordForm() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup
    .object({
      password: passwordValidation,
      newPassword: passwordValidation.when('password', (password, field) => {
        return password
          ? field
              .required()
              .notOneOf([yup.ref('password')], 'New password must be different from the current password.')
          : field;
      }),
      confirmNewPassword: passwordValidation.when('newPassword', (password, field) => {
        return password
          ? field
              .required()
              .oneOf([yup.ref('newPassword')], 'Confirmation password does not match with the new password.')
          : field;
      }),
    })
    .required();

  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    setShowLazyLoading(true);
    const payload = {
      oldPassword: values.password,
      newPassword: values.newPassword,
    };
    try {
      const resultAction = await userApi.changePassword(payload);
      // console.log(resultAction);
      if (resultAction.success) {
        clearLocalStorage();
        localStorage.setItem('messAgain', 'Password was successfully updated. Please sign in again.');
        navigate('/authentication/signin');
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const resultAction = await userApi.changePassword(payload);
        if (resultAction.success) {
          clearLocalStorage();
          localStorage.setItem('messAgain', 'Password was successfully updated. Please sign in again.');
          navigate('/authentication/signin');
        }
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Current password is inccorect',
        });
      }
    }
    setShowLazyLoading(false);
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <>
      {showLazyLoading && <LazyLoading />}
      <Stack>
        <Stack mb={6} textAlign={'center'}>
          <Typography sx={{ fontSize: '60px', color: '#1976d2' }}>Change password</Typography>
          <Typography sx={{ color: '#00385C' }}>Fill the form to change your password.</Typography>
        </Stack>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Box mb={2}>
            <PasswordField name="password" label="Current password *" form={form} />
          </Box>
          <Box mb={2}>
            <PasswordField name="newPassword" label="New password *" form={form} />
          </Box>
          <Box mb={2}>
            <PasswordField name="confirmNewPassword" label="Confirm new password *" form={form} />
          </Box>
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              onClick={handleCancel}
              variant="contained"
              sx={{ maxWidth: 200, marginBottom: '15px' }}
              className="bg-secondary"
              fullWidth
            >
              Clear
            </Button>
            <Button type="submit" variant="contained" sx={{ maxWidth: 200, marginBottom: '15px' }} fullWidth>
              Change Password
            </Button>
          </Stack>
        </form>
      </Stack>

      {/* {error &&
                <Alert severity="error" color="error">
                    This is a error alert — check it out!
                </Alert>
            } */}
    </>
  );
}

export default ChangePasswordForm;
