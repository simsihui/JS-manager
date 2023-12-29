import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

export default function Overview() {
  const { id } = useParams();
  return <Box>Overview {id}</Box>;
}
