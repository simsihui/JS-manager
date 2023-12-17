import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider
} from 'react-router-dom';

import { StyledEngineProvider } from '@mui/material';

import App from './App.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route index path="/login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);
