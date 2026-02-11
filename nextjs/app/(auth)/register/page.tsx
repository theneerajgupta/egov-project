// src/app/(auth)/register/page.tsx

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen items-center justify-center px-6'>
      <div className='w-full max-w-md rounded-lg border border-[var(--color-two)] p-8 shadow-sm'>
        <h1 className='text-2xl font-semibold mb-6 text-center'>Register</h1>

        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium'>
              Full Name
            </label>
            <input
              id='name'
              type='text'
              className='rounded-md border px-3 py-2'
              placeholder='John Doe'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>
            <input
              id='email'
              type='email'
              className='rounded-md border px-3 py-2'
              placeholder='you@example.com'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-sm font-medium'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='rounded-md border px-3 py-2'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            className='mt-4 rounded-md bg-[var(--color-two)] px-4 py-2 font-medium'
          >
            Create Account
          </button>
        </form>

        <p className='mt-6 text-sm text-center'>
          Already have an account?{' '}
          <a href='/login' className='underline'>
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
