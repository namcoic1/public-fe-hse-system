import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

function LazyLoading() {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LazyLoading;
