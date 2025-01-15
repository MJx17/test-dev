import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/AuthStore'; // Adjust the path as needed
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  element: React.ReactElement; // The component to render if access is allowed
  requiredRole?: string[]; // Optional array of roles required for access
  fallback?: React.ReactElement; // Optional fallback component during loading
  isLoginRoute?: boolean; // If true, checks for already logged-in users
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRole,
  fallback,
  isLoginRoute = false, // Default to false for regular protected routes
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const location = useLocation();

  // Show a custom fallback component or a default loading spinner
  if (loading) {
    return fallback || <div>Loading...</div>;
  }

  // If the route is a login page, redirect logged-in users
  if (isLoginRoute && isAuthenticated) {
    toast.info('You are already logged in!');
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle unauthorized access based on roles
  if (requiredRole && role && !requiredRole.includes(role)) {
    toast.error('You do not have permission to access this page.');
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Render the protected component
  return element;
};

export default ProtectedRoute;
