import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <h1 className='text-2xl font-thin'>Registration Page</h1>
      <Link
        className='bg-red-600 text-white text-lg py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-200'
        to='/'
      >
        Home
      </Link>
    </div>
  );
}
