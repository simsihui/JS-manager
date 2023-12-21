import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/userApiSlice';
import { Error } from '../types/Error.types';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // check screen size

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error((err as Error)?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Box className="p-8">
      <Typography component="h1" variant="h5" className="text-center">
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          size={isSmallScreen ? "small" : "medium"}
          margin="normal"
          required
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
          required
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
          required
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
          Register
        </LoadingButton>
      </Box>
    </Box>
  );
};
export default SignUp;
