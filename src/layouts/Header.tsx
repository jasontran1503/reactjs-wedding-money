import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import authApi from 'apis/authApi';
import { DataResponse } from 'apis/axiosApi';
import { authActions } from 'features/auth/authActions';
import { useAuth } from 'features/auth/authContext';
import { useSnackbar } from 'hooks/useSnackbar';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbars';

const Header = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigateProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(authActions.logout());
      setAnchorEl(null);
      navigate('/auth');
    } catch (error) {
      alert((error as DataResponse<null>).message);
    }
  };

  useEffect(() => {
    const isAuththen = async () => {
      const { data } = await authApi.isAuthenticated();
      dispatch(authActions.isAuthenticated(data));
    };

    isAuththen();
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      const getCurrentUser = async () => {
        const { data } = await authApi.getCurrentUser();
        dispatch(authActions.getCurrentUser(data));
      };

      getCurrentUser();
    }
  }, [state.isAuthenticated]);

  return (
    <Box style={{ width: '100%' }} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/home')}
          >
            Photos
          </Typography>
          {state.isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                <strong>{state.user?.username}</strong>
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
