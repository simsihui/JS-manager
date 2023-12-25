import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/user/userApiSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Error } from '../types/Error.types';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // check screen size

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error((err as Error)?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box className="p-8">
      <Typography component="h1" variant="h5" className="text-center">
        Sign In
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
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          className="mt-2"
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  );
};
export default SignIn;
