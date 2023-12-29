import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}
