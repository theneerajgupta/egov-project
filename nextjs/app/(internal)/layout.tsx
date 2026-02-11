// src/app/(internal)/layout.tsx

import Link from 'next/link';

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-64 border-r border-[var(--color-two)] bg-[var(--color-three)] p-6'>
        <h2 className='mb-8 text-xl font-semibold'>Internal Panel</h2>

        <nav className='flex flex-col gap-4 text-sm font-medium'>
          <Link href='/dashboard' className='hover:underline'>
            Dashboard
          </Link>

          <Link href='/grievances' className='hover:underline'>
            Grievance Redressal
          </Link>

          <Link href='/crisis' className='hover:underline'>
            Crisis Management
          </Link>

          <Link href='/mti' className='hover:underline'>
            MTI
          </Link>

          <Link href='/rpsl' className='hover:underline'>
            RPSL
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className='flex flex-1 flex-col'>
        {/* Header */}
        <header className='flex h-16 items-center justify-between border-b border-[var(--color-two)] px-6'>
          <div className='text-sm font-medium'>Internal System</div>

          <div className='flex items-center gap-4 text-sm'>
            <span>User Name</span>
            <button className='rounded-md border px-3 py-1 text-xs'>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </div>
  );
}
