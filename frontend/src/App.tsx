import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Box, CssBaseline } from '@mui/material';

import Header from './components/Header';

function App() {
  return (
    <Box className="flex h-screen flex-col">
      <CssBaseline />
      <ToastContainer />
      <Header />
      <Outlet />
    </Box>
  );
}

export default App;
