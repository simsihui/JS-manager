import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import { clearCredentials } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/user/userApiSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const links = [
    // navlinks
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => {
        navigate("/dashboard");
        handleClose();
      },
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      onClick: () => {
        navigate("/settings");
        handleClose();
      },
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Box
              component="img"
              alt="Logo"
              src="/logo.png"
              height={50}
              width={50}
            />
          </Link>
        </Box>

        {userInfo ? (
          <>
            <Button
              id="menu-button"
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              disableElevation
            >
              {userInfo.name}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "menu-button",
              }}
            >
              {links.map((link) => (
                <MenuItem onClick={link.onClick}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText>{link.name}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
