import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AvatarHeader from '../AvatarHeader';
import { ListSubheader } from '@mui/material';
import { getRole } from '../../utils/common';
import {
  Assessment,
  CompareArrows,
  Dashboard,
  Grading,
  Group,
  InsertComment,
  MedicalServices,
  QuestionAnswer,
  ThumbsUpDown,
  Wysiwyg,
} from '@mui/icons-material';
import StorageKeys from '../../constants/storage_keys';

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function HeaderSideBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const location = useLocation();
  if (location.pathname.includes('admin')) {
    if (!localStorage.getItem(StorageKeys.ACCESS_TOKEN) || !localStorage.getItem(StorageKeys.ACCESS_TOKEN)) {
      navigate('/authentication/signin');
    } else {
      const roleStr = getRole().role;
      // console.log(roleStr);
      // Admin Criteria15 Service15 System15 User15
      const handleDrawer = () => {
        setOpen(!open);
      };

      const handleSubMenu = () => {
        setOpenSubMenu(!openSubMenu);
      };

      const focusCustom = {
        color: 'white',
        backgroundColor: '#1976d2',
      };

      const focusIcon = {
        color: 'white',
      };

      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} style={{ zIndex: '1000' }}>
            <Toolbar className="justify-content-between">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{
                  marginRight: 5,
                }}
              >
                <MenuIcon />
              </IconButton>
              <AvatarHeader />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} style={{ zIndex: '999' }}>
            <DrawerHeader>
              <h1
                className="text-center w-100"
                style={{ color: '#1976d2', cursor: 'pointer' }}
                onClick={() => navigate('/admin/welcome')}
              >
                HSE
              </h1>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/dashboard')}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  style={location.pathname.includes('/admin/dashboard') ? focusCustom : {}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                    style={location.pathname.includes('/admin/dashboard') ? focusIcon : {}}
                  >
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              {(roleStr.includes('Admin') || roleStr.includes('BOM')) && (
                <>
                  <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={() => navigate('/admin/report/statistics-satisfaction')}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      style={location.pathname.includes('/admin/report/statistics-satisfaction') ? focusCustom : {}}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                        style={location.pathname.includes('/admin/report/statistics-satisfaction') ? focusIcon : {}}
                      >
                        <ThumbsUpDown />
                      </ListItemIcon>
                      <ListItemText primary={'Satisfaction Statistics'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={() => navigate('/admin/report/service-comparision')}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      style={location.pathname.includes('/admin/report/service-comparision') ? focusCustom : {}}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                        style={location.pathname.includes('/admin/report/service-comparision') ? focusIcon : {}}
                      >
                        <CompareArrows />
                      </ListItemIcon>
                      <ListItemText primary={'Service Comparison'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                    onClick={() => navigate('/admin/report/overview-results')}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      style={location.pathname.includes('/admin/report/overview-results') ? focusCustom : {}}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                        style={location.pathname.includes('/admin/report/overview-results') ? focusIcon : {}}
                      >
                        <Assessment />
                      </ListItemIcon>
                      <ListItemText primary={'Evaluation Results Statistics'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </>
              )}

              <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/evaluation-answers')}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  style={location.pathname.includes('/admin/evaluation-answers') ? focusCustom : {}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                    style={location.pathname.includes('/admin/evaluation-answers') ? focusIcon : {}}
                  >
                    <QuestionAnswer />
                  </ListItemIcon>
                  <ListItemText primary={'Evaluation Answers'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/patient-opinions')}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  style={location.pathname.includes('/admin/patient-opinions') ? focusCustom : {}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                    style={location.pathname.includes('/admin/patient-opinions') ? focusIcon : {}}
                  >
                    <InsertComment />
                  </ListItemIcon>
                  <ListItemText primary={`Patient's Opinions`} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              {roleStr.includes('User') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/user')}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    style={location.pathname.includes('/admin/user') ? focusCustom : {}}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                      style={location.pathname.includes('/admin/user') ? focusIcon : {}}
                    >
                      <Group />
                    </ListItemIcon>
                    <ListItemText primary={'User Management'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              )}
              {roleStr.includes('Service') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/service')}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    style={location.pathname.includes('/admin/service') ? focusCustom : {}}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                      style={location.pathname.includes('/admin/service') ? focusIcon : {}}
                    >
                      <MedicalServices />
                    </ListItemIcon>
                    <ListItemText primary={'Service Management'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              )}
              {roleStr.includes('Criteria') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/criteria')}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    style={location.pathname.includes('/admin/criteria') ? focusCustom : {}}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                      style={location.pathname.includes('/admin/criteria') ? focusIcon : {}}
                    >
                      <Grading />
                    </ListItemIcon>
                    <ListItemText primary={'Criteria Management'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              )}
              {roleStr.includes('Admin') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/system-log')}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    style={location.pathname.includes('/admin/system-log') ? focusCustom : {}}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                      style={location.pathname.includes('/admin/system-log') ? focusIcon : {}}
                    >
                      <Wysiwyg />
                    </ListItemIcon>
                    <ListItemText primary={'System Log'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
            {/* <Divider /> */}
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      );
    }
  }
}
