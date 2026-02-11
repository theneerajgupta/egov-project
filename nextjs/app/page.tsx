// src/app/page.tsx

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-4xl font-bold mb-6'>Multi User Workflow Platform</h1>

      <p className='max-w-xl text-lg mb-8'>
        Centralized modules for application processing, reporting, and
        operational dashboards.
      </p>

      <div className='flex gap-4'>
        <a
          href='/login'
          className='rounded-md px-6 py-3 bg-(--color-two) text-(--color-one) font-medium'
        >
          Login
        </a>

        <a
          href='/register'
          className='rounded-md px-6 py-3 border border-(--color-two)'
        >
          Register
        </a>
      </div>
    </main>
  );
}
