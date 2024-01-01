import { Outlet, useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import NavBar from '../components/dashboard/NavBar';
import { useGetProjectQuery } from '../features/project/projectApiSlice';
import PageNotFound from './PageNotFound';

export default function Dashboard() {
  const { id } = useParams();
  const { data } = useGetProjectQuery(id);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          zIndex: { sm: 1201 },
          marginLeft: { sm: "240px" },
          height: "100%",
        }}
      >
        {data ? <Outlet /> : <PageNotFound />}
      </Box>
    </>
  );
}
