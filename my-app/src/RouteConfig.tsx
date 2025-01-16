import SignupForm from './pages/AdminPages/Sign';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import Unauthorized from './components/unauthorized';  // The Unauthorized page component
import { ProtectedRoute } from './auth/protectedRoutes';
// import Rates from './pages/Rates';
import Dashboard from './pages/AdminPages/Dashboard'
import Branch from './pages/Branch';
import SlideList from './pages/SlideList'
import SlidesListAdmin from './pages/AdminPages/SlideListAdmin'
import Permissions from './pages/AdminPages/Permissions'
import RolePermissionManager from './pages/AdminPages/RolePermissionManagement';
import ResourceList from './pages/AdminPages/ResourceForm';


export const routes = [
  // Public route, no navbar needed
  { path: '/login', element: <LoginForm /> },    // Public route, no navbar needed
  
  // Public routes, will use public layout with navbar
  { path: '/', element: <Home />, useLayout: 'public' },  
  { path: '/home', element: <Home />, useLayout: 'public' },
  { path: '/branch', element: <Branch/>, useLayout: 'public' },
  
  // // Protected routes, will use auth layout with navbar + sidebar
  // {
  //   path: '/rates',
  //   element: <ProtectedRoute element={<Rates />} requiredRole={['superadmin', 'admin']} />,
  //   useLayout: 'auth', // Protected route with navbar + sidebar
  // },
  {
    path: '/slidelist-admin',
    element: <ProtectedRoute element={<SlidesListAdmin />} requiredRole={['superadmin', 'admin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/slidelist',
    element: <ProtectedRoute element={<SlideList/>} requiredRole={['superadmin', 'admin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/resource-list',
    element: <ProtectedRoute element={<ResourceList/>} requiredRole={['superadmin', ]} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/',
    element: <ProtectedRoute element={<Permissions/>} requiredRole={['superadmin', ]} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/role-permission-management',
    element: <ProtectedRoute element={<RolePermissionManager/>} requiredRole={['superadmin', ]} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
 
  {
    path: '/dashboard',
    element: <ProtectedRoute element={<Dashboard />} requiredRole={['superadmin' , 'admin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/create-user',
    element: <ProtectedRoute element={<SignupForm />} requiredRole={['superadmin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },

  // Unauthorized route: if an unauthorized user tries to access a protected route, redirect to this page
  { path: '/unauthorized', element: <Unauthorized /> },

  // Catch-all for undefined paths: redirect to unauthorized if the path is not defined in routes

  // Add other routes as needed...
];

export default routes;
