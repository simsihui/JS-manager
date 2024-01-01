import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface Color {
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
}

export default function Loading({ color = "secondary" }: Color) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color={color} />
    </Box>
  );
}
