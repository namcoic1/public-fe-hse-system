import { Grid } from '@mui/material';
import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';

function ChangePassword() {
  return (
    <Grid container spacing={0} justifyContent={'center'} alignItems={'center'} display={'flex'}>
      <Grid item xs={6} mt={6}>
        <ChangePasswordForm />
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
