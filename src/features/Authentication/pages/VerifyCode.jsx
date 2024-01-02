import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/form-controls/InputField';
import { Button, Link } from '@mui/material';
import userApi from '../../../api/userApi';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';

function VerifyCode() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  const schema = yup
    .object({
      resetCode: yup.string().required('Please enter the required field.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      resetCode: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    setShowLazyLoading(true);
    try {
      console.log(email, values);
      const actionResult = await userApi.verifyCode({ email, ...values });
      if (actionResult.success) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'New password is sent to your email.',
          // showCancelButton: true,
          confirmButtonText: 'Go to Sign in',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/authentication/signin');
          }
        });
      }
    } catch (error) {
      setShowLazyLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The reset code is invalid or expired.',
      });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      {showLazyLoading && <LazyLoading />}
      <div className="w-100 fixed-top">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-100" viewBox="0 0 2635 355" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2635 158.868L2487.88 211.823C2342.95 264.779 2048.71 370.691 1756.67 353.039C1464.62 335.387 1170.38 194.171 878.333 150.042C586.288 105.912 292.046 158.867 147.121 185.345L0 211.823V0L147.121 0C292.046 0 586.288 0 878.333 0C1170.38 0 1464.62 0 1756.67 0C2048.71 0 2342.95 0 2487.88 0H2635V158.868Z"
            fill="#1976D2"
          />
        </svg>
      </div>
      <div>
        <h1 className="text-center" style={{ fontSize: '60px', color: '#1976d2' }}>
          Forgot Password
        </h1>
        <p className="text-center" style={{ color: '#1976d2' }}>
          Please check your email and fill the form to reset password
        </p>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="resetCode" label="Reset code *" form={form} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Verify Code
          </Button>
        </form>
        <Link variant="body2" style={{ cursor: 'pointer' }} onClick={() => navigate('/authentication/forgot-password')}>
          Back to Forgot password
        </Link>
      </div>
      <div className="w-100 fixed-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2635 347" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 191.713L147.121 139.95C292.046 88.1877 586.288 -15.3372 878.333 1.91691C1170.38 19.1711 1464.62 157.204 1756.67 200.34C2048.71 243.475 2342.95 191.713 2487.88 165.831L2635 139.95V347H2487.88C2342.95 347 2048.71 347 1756.67 347C1464.62 347 1170.38 347 878.333 347C586.288 347 292.046 347 147.121 347H0L0 191.713Z"
            fill="#1976D2"
          />
        </svg>
      </div>
    </div>
  );
}

export default VerifyCode;
