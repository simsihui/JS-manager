import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

const Project = () => {
  const { id } = useParams();
  return <Box>Project {id}</Box>;
};
export default Project;
