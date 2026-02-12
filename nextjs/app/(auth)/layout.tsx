import { ReactNode } from 'react';
import Link from 'next/link';
export default function SecureLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex w-full min-h-screen max-w-screen font-sans bg-background text-foreground antialiased'>
      {children}
    </main>
  );
}
