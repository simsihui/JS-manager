import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider
} from 'react-router-dom';

import { StyledEngineProvider } from '@mui/material';

import App from './App.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Settings from './pages/Settings.tsx';
import store from './store.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route index path="/login" element={<Login />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route index path="/settings" element={<Settings />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>,
);
