import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ProjectMenu from './ProjectMenu';

export default function NavBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabs = [
    { label: "Overview", icon: <LeaderboardIcon /> },
    { label: "Tasks", icon: <AssignmentIcon /> },
    { label: "Tags", icon: <LocalOfferIcon /> },
  ];

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      {isSmallScreen && (
        <IconButton
          aria-label="delete"
          className="fixed top-2"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        <Box
          sx={{
            width: { xs: "100vw", sm: "240px" },
            marginTop: { xs: "56px", sm: 0 },
            bgcolor: "primary.dark",
            height: "100vh",
            overflow: "auto",
            boxShadow: 24,
          }}
          role="presentation"
        >
          <ProjectMenu />
          <Divider />
          <List>
            {tabs.map((tab) => (
              <ListItemButton
                key={tab.label}
                onClick={() => {
                  navigate(`${id}/${tab.label.toLowerCase()}`);
                  setDrawerOpen(!drawerOpen);
                }}
              >
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
