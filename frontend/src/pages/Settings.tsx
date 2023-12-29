import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { setCredentials } from "../features/auth/authSlice";
import { useUpdateUserMutation } from "../features/user/userApiSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Error } from "../types/Error.types";

export default function Settings() {
  const { userInfo } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // check screen size

  const dispatch = useAppDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUser({
          id: userInfo?.id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Settings updated");
      } catch (err) {
        toast.error((err as Error)?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Box className="p-8">
      <Typography component="h1" variant="h5" className="text-center">
        Update Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          size={isSmallScreen ? "small" : "medium"}
          margin="normal"
          fullWidth
          id="name"
          label="name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextField
          size={isSmallScreen ? "small" : "medium"}
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextField
          size={isSmallScreen ? "small" : "medium"}
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <TextField
          size={isSmallScreen ? "small" : "medium"}
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          className="mt-2"
          loading={isLoading}
        >
          Update
        </LoadingButton>
      </Box>
    </Box>
  );
}
