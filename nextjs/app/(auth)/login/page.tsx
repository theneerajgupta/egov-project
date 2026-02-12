export default function LoginPage() {
  return (
    <div className='flex items-center justify-center px-6 py-16 h-full'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 flex flex-col gap-6'>
        <h1 className='text-lg text-gray-900 font-medium text-center'>
          Sign In
        </h1>

        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='email'
              className='text-sm text-gray-700 font-medium'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='you@example.com'
              className='px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor='password'
              className='text-sm text-gray-700 font-medium'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='••••••••'
              className='px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <button
            type='submit'
            className='mt-2 px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150'
          >
            Sign In
          </button>
        </form>

        <p className='text-sm text-gray-500 text-center'>
          Don’t have an account?{' '}
          <a
            href='/register'
            className='text-gray-700 font-medium hover:text-gray-900 transition-colors duration-150'
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
