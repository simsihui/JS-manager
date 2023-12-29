import { useState } from "react";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Login() {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <Box
      className="flex h-full w-full items-center justify-center"
      sx={{
        backgroundImage: "url('svitlana-j7Ssk0Km8Jo-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={24}
        className="h-4/5 w-4/5 rounded-3xl"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <Stack className="flex h-full flex-col sm:flex-row">
          {haveAccount ? (
            <Box
              className={`my-4 flex min-w-[33%] flex-col items-center justify-center gap-1 ${
                haveAccount ? "animate-slide-up sm:animate-slide-left" : ""
              }`}
            >
              <Typography className="text-center">No Account?</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setHaveAccount(!haveAccount);
                }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Paper
              elevation={24}
              className={`flex grow items-center justify-center rounded-3xl ${
                haveAccount ? "" : "z-10 animate-slide-up sm:animate-slide-left"
              }`}
            >
              <SignUp />
            </Paper>
          )}

          {haveAccount ? (
            <Paper
              elevation={24}
              className={`z-10 flex grow items-center justify-center rounded-3xl ${
                haveAccount ? "animate-slide-down sm:animate-slide-right" : ""
              }`}
            >
              <SignIn />
            </Paper>
          ) : (
            <Box
              className={`my-4 flex min-w-[33%] flex-col items-center justify-center gap-1 ${
                haveAccount ? "" : "animate-slide-down sm:animate-slide-right"
              }`}
            >
              <Typography className="px-2 text-center">
                Already Have an Account?
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setHaveAccount(!haveAccount);
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
