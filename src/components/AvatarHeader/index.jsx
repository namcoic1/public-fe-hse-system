import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PasswordIcon from '@mui/icons-material/Password';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown, Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorage, getRole } from '../../utils/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../features/Profile/profileSlice';
import { URL_IMG } from '../../constants/storage_urls';
import userApi from '../../api/userApi';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function AvatarHeader() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const status = useSelector((state) => state.profile.status);
  const roleStr = getRole().role;
  // Admin Criteria15 Service15 System15 User15

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // if (status === 'idle') {
    (async () => {
      try {
        const action = getProfile();
        await dispatch(action);
      } catch (error) {}
    })();
    // }
  }, []);
  // }, [dispatch, status]);

  const handleLogout = async () => {
    try {
      const actionResult = await userApi.signout();
      if (actionResult.success) {
        clearLocalStorage();
        navigate('/authentication/signin');
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionResult = await userApi.signout();
        if (actionResult.success) {
          clearLocalStorage();
          navigate('/authentication/signin');
        }
      }
    }
  };

  return (
    // <Stack direction="row" spacing={2}>
    <div>
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
          <Avatar alt={profile.firstname} src={URL_IMG + profile.image} />
        </StyledBadge>
        <ArrowDropDown />
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 7,
              width: 10,
              height: 9,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/admin/profile')}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/admin/profile/change-password')}>
          <ListItemIcon>
            <PasswordIcon fontSize="small" />
          </ListItemIcon>
          Change password
        </MenuItem>
        {(roleStr.includes('Admin') > 0) &&
        (
          <MenuItem onClick={() => navigate('/admin/system-information')}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            System settings
          </MenuItem>
        )}
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
    // </Stack>
  );
}
