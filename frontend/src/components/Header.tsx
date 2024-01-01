import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import { clearCredentials } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/user/userApiSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function Header() {
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
  const location = useLocation();

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
      label: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => {
        navigate(`/dashboard/${userInfo?.defaultProject}/overview`);
        handleClose();
      },
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => {
        navigate("/settings");
        handleClose();
      },
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Box sx={{ height: { xs: "56px", sm: "64px" } }}>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2,
          height: { xs: "56px", sm: "64px" },
          width: {
            xs: "100vw",
            sm: location.pathname.includes("/dashboard")
              ? "calc(100% - 240px)"
              : "100vw",
          },
          marginLeft: location.pathname.includes("/dashboard") ? "240px" : 0,
        }}
      >
        <Toolbar className="flex justify-between">
          <Box>
            <Link
              to="/"
              className={
                userInfo
                  ? "fixed left-10 top-1 sm:static sm:left-0 sm:top-0"
                  : ""
              }
            >
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
                  <MenuItem key={link.label} onClick={link.onClick}>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.label} />
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
    </Box>
  );
}
