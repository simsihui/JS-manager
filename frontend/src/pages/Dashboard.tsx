import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import NavBar from '../components/dashboard/NavBar';

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ zIndex: { sm: 1201 }, marginLeft: { sm: "240px" } }}>
        <Outlet />
      </Box>
    </>
  );
};
export default Dashboard;
