import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { useGetProjectQuery } from '../../../features/project/projectApiSlice';
import Loading from '../../Loading';
import TaskDialog from './TaskDialog';

export default function Tasks() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProjectQuery(id);

  // Headers for the DataGrid
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title" },
    { field: "content", headerName: "Content" },
    ...(data?.tags?.length
      ? data.tags.map((tag) => ({
          field: tag.label,
          headerName: tag.label,
        }))
      : []),
  ];

  if (data)
    return (
      <Box sx={{ margin: 2 }}>
        <TaskDialog projectTags={data?.tags} />
        <DataGrid
          autoHeight
          rows={data?.tasks as GridRowsProp}
          columns={columns}
        />
      </Box>
    );
  else return <Loading />;
}
