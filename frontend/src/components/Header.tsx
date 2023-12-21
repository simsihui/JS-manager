import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import { clearCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
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
