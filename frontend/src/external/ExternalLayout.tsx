import { Outlet } from 'react-router-dom';

export default function ExternalLayout() {
  return (
    <div className='p-4 w-screen h-screen flex flex-col gap-2'>
      <div className='w-full p-2 bg-black text-white border font-normal flex justify-center items-center'>
        Auth Layout
      </div>
      <div className='w-full p-4 border flex flex-1 justify-center items-center'>
        <Outlet />
      </div>
    </div>
  );
}
