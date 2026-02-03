import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='border p-4 w-screen h-screen'>
      <h1>Auth</h1>
      <Outlet />
    </div>
  );
}
