import { ReactNode } from 'react';
import Link from 'next/link';
export default function SecureLayout({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen max-w-screen font-sans bg-background text-foreground antialiased flex flex-row'>
      <div className='bg-rose-50 border-4 border-rose-600 justify-center items-center h-screen sticky top-0 p-4 min-w-80'>
        <div className='text-2xl font-semibold text-rose-600'>
          Secure Interface Layout
        </div>
        <hr className='text-rose-400 border-2 my-4' />
        <div className='flex flex-col w-full'>
          <Link
            href={'/dashboard'}
            className='text-rose-800 hover:text-rose-950 font-semibold text-lg'
          >
            Dashboard
          </Link>
          <Link
            href={'/grievances'}
            className='text-rose-800 hover:text-rose-950 font-semibold text-lg'
          >
            Grievances Redressal
          </Link>
          <Link
            href={'/crisis'}
            className='text-rose-800 hover:text-rose-950 font-semibold text-lg'
          >
            Crisi Management
          </Link>
          <Link
            href={'/mti'}
            className='text-rose-800 hover:text-rose-950 font-semibold text-lg'
          >
            MTI
          </Link>
          <Link
            href={'/rpsl'}
            className='text-rose-800 hover:text-rose-950 font-semibold text-lg'
          >
            RPSL
          </Link>
        </div>
      </div>
      {children}
    </main>
  );
}
