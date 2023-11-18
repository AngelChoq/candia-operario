import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

// administrator page
const Administrator = Loadable(lazy(() => import('app/views/admin/Adminitrator')));

// administrator recipe page
const Production = Loadable(lazy(() => import('app/views/admin/production/Production')));

// administrator recipe page
const Recipe = Loadable(lazy(() => import('app/views/admin/recipe/Recipe')));

// administrator order page
const Order = Loadable(lazy(() => import('app/views/admin/order/Order')));

// worker historic page
const Historic = Loadable(lazy(() => import('app/views/worker/historic/Historic')));

// worker weight page
const Weight = Loadable(lazy(() => import('app/views/worker/weight/Weight')));

const routes = [
  {
    element: (
        <MatxLayout />
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // adminitrator route
      {
        path: '/admin/administrator',
        element: <Administrator />,
        auth: authRoles.admin
      },

      // adminitrator historic route
      {
        path: '/admin/production',
        element: <Production />,
        auth: authRoles.admin
      },

      // adminitrator recipe route
      {
        path: '/admin/recipe',
        element: <Recipe />,
        auth: authRoles.admin
      },

      // adminitrator order route
      {
        path: '/admin/order',
        element: <Order />,
        auth: authRoles.admin
      },

      // worker historic route
      {
        path: '/worker/historic',
        element: <Historic />,
        auth: authRoles.admin
      },

      // worker weight route
      {
        path: '/worker/weight',
        element: <Weight />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  // { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '/', element: <Navigate to="session/signin" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
