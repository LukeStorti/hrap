import { Box, Paper, Typography } from "@mui/material";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "#f1f1f1" }}
    >
      <Paper
        sx={{ width: "700px", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box p={2}>
          <Typography variant="h4">Login</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <AuthForm />
        </Box>
      </Paper>
    </Box>
  );
}
