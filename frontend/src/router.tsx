import { createBrowserRouter } from 'react-router-dom';

import App from './App';

import AuthLayout from './auth/Layout';
import Login from './auth/Login';
import Register from './auth/Register';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
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
