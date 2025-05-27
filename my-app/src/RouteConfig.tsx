import SignupForm from './pages/AdminPages/Sign';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import Unauthorized from './components/unauthorized';  // The Unauthorized page component
import { ProtectedRoute } from './auth/protectedRoutes';




import Dashboard from './pages/AdminPages/Dashboard'
import Branch from './pages/Branch';
import Branch2 from './pages/branch2';
import SlideList from './pages/SlideList'
import SlidesListAdmin from './pages/AdminPages/SlideListAdmin'

import Permissions from './pages/AdminPages/Permissions'
import RolePermissionManager from './pages/AdminPages/RolePermissionManagement';
import ResourceList from './pages/AdminPages/ResourceForm';
import CurrencyList from './pages/CurrencyList';
import CurrencyManagement from './pages/AdminPages/CurrencyManagement';
import CardList from './pages/cards/cardList';
import CardManagement from './pages/cards/cardManagement'
import Cards from './pages/cards/cards'
// import Loans from './pages/loans'
import Loans2 from './pages/loans2'
import Loans3 from './pages/loans3'
import Loans4 from './pages/loans4'
import SiteMap from './components/siteMap';
import AtmCard from './components/atm';
import Properties from './pages/Properties';
import PropertiesDetails from './pages/property-details'
import CompanyGOV from './pages/company'
import InfoSectionPage from './components/infoPage';
import CareerPage from './pages/career';
import Company1 from './pages/company2'
import Company2 from './pages/company3'

export const routes = [
  // Public route, no navbar needed
  { path: '/login', element: <LoginForm /> },    // Public route, no navbar needed
  
  // Public routes, will use public layout with navbar
  { path: '/', element: <Home />, useLayout: 'public' }, 

  { path: '/home', element: <Home />, useLayout: 'public' },
  { path: '/branch', element: <Branch/>, useLayout: 'public' },
    { path: '/branch2', element: <Branch2/>, useLayout: 'public' },
  { path: '/loans', element: <Loans4/>, useLayout: 'public' },
  { path: '/loans-2', element: <Loans2/>, useLayout: 'public' },
  { path: '/loans-3', element: <Loans3/>, useLayout: 'public' },
    { path: '/loans-4', element: <Loans4/>, useLayout: 'public' },
  { path: '/sitemap', element: <SiteMap/>, useLayout: 'public' },
  { path: '/atm', element: <AtmCard/>, useLayout: 'public' },
  { path: '/properties', element: <Properties/>, useLayout: 'public' },
   { path: '/properties-details/:id', element: <PropertiesDetails />, useLayout: 'public' },
,

  { path: '/corporate-governance', element: <CompanyGOV/>, useLayout: 'public' },
    { path: '/company-policies', element: <Company1/>, useLayout: 'public' },
      { path: '/company-disclosures', element: <Company2/>, useLayout: 'public' },

  { path: '/careers', element: <CareerPage/>, useLayout: 'public' },
  {
    path: '/:sectionPath',
    element: <InfoSectionPage />,  // your component handling hash
    useLayout: 'public',
  },

  
  // Protected routes, will use auth layout with navbar + sidebar
  {
    path: '/cardlist',
    element: <ProtectedRoute element={<CardList />} requiredRole={['superadmin', 'admin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/cards',
    element: <ProtectedRoute element={<Cards />} requiredRole={['superadmin', 'admin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/card-management',
    element: <ProtectedRoute element={<CardManagement />} requiredRole={['superadmin', 'admin']} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
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
    path: '/permissions',
    element: <ProtectedRoute element={<Permissions/>} requiredRole={['superadmin', ]} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/currency',
    element: <ProtectedRoute element={<CurrencyList/>} requiredRole={['superadmin', ]} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/currency-management',
    element: <ProtectedRoute element={<CurrencyManagement/>} requiredRole={['superadmin', ]} />,
    useLayout: 'auth', // Protected route with navbar + sidebar
  },
  {
    path: '/currency-list',
    element: <ProtectedRoute element={<CurrencyList/>} requiredRole={['superadmin', ]} />,
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
