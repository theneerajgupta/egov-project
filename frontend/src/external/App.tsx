import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='flex justify-center items-center gap-4'>
      <Link to='/auth/login'>
        <button className='bg-amber-500 text-white py-2 px-4 rounded'>
          Go To Login
        </button>
      </Link>

      <Link to='/auth/register'>
        <button className='bg-red-500 text-white py-2 px-4 rounded'>
          Go To Register
        </button>
      </Link>
    </div>
  );
}

export default App;
