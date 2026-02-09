import { createBrowserRouter } from 'react-router-dom';

import App from './external/App';

import AuthLayout from './auth/AuthLayout';
import Login from './auth/Login';
import Register from './auth/Register';
import ExternalLayout from './external/ExternalLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExternalLayout />,
    children: [{ path: '/', element: <App /> }],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
export default router;
