import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
import { useToastify } from 'hooks/useToastify';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const toastify = useToastify;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(authActions.logout());
      setAnchorEl(null);
      navigate('/auth');
    } catch (error) {
      toastify('error', (error as DataResponse<null>).message);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    const isAuththen = async () => {
      try {
        if (!isCancelled) {
          const { data } = await authApi.isAuthenticated();
          dispatch(authActions.isAuthenticated(data));
        }
      } catch (error) {
        toastify('error', (error as DataResponse<null>).message);
      }
    };

    isAuththen();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (state.isAuthenticated) {
      const getCurrentUser = async () => {
        try {
          if (!isCancelled) {
            const { data } = await authApi.getCurrentUser();
            dispatch(authActions.getCurrentUser(data));
          }
        } catch (error) {
          toastify('error', (error as DataResponse<null>).message);
        }
      };

      getCurrentUser();
      return () => {
        isCancelled = true;
      };
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
            Save Money
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
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate('/profile');
                  }}
                >
                  <ManageAccountsIcon />
                  <span style={{ marginLeft: '10px' }}>Cài đặt thông tin</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate('/home/editor');
                  }}
                >
                  <AddCircleIcon />
                  <span style={{ marginLeft: '10px' }}>Tạo mới</span>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  <span style={{ marginLeft: '10px' }}>Đăng xuất</span>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
