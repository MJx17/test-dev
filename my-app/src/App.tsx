import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './RouteConfig';
import PublicLayout from './layout/publicLayout';
import AuthLayout from './layout/AuthLayout';
import MuiTheme from './utils/muiTheme'
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import useAuthStore from './store/AuthStore'; // Import your Zustand store
import './App.css';

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize(); // Call initialize to set state from cookies
  }, [initialize]);

  return (
    <ThemeProvider theme={MuiTheme}>
    <Router>
      <Routes>
        {routes.map((route, index) => {
          let Layout = null;

          if (route.useLayout === 'public') {
            Layout = PublicLayout;
          } else if (route.useLayout === 'auth') {
            Layout = AuthLayout;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                Layout ? (
                  <Layout>{route.element}</Layout>
                ) : (
                  route.element
                )
              }
            />
          );
        })}
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
    </ThemeProvider>
  );
};

export default App;
