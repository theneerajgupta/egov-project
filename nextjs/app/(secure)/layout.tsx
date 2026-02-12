import { ReactNode } from 'react';
import Link from 'next/link';

import Navbar from '@/components/ui/Navbar';

export default function SecureLayout({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen w-screen font-sans bg-background text-foreground antialiased flex flex-row'>
      <Navbar />
      {children}
    </main>
  );
}
