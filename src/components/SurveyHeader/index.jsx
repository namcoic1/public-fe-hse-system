import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
import { useSystemData } from '../../app/SystemContext';
import { URL_IMG } from '../../constants/storage_urls';

export default function SurveyHeader() {
  const navigate = useNavigate();
  const { systemData } = useSystemData();
  console.log(systemData);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/survey/services')}
          >
            <img src={URL_IMG + systemData?.logo} alt={systemData?.sysName} style={{ width: '30px' }} />
            {/* <LocalHospitalIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            onClick={() => navigate('/survey/services')}
            style={{ cursor: 'pointer' }}
          >
            Customer Service Survey
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
