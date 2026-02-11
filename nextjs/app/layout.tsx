import { ReactNode } from 'react';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DG4Modules',
  description: 'Internal application management system.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-(--background) text-(--foreground)'>
        {children}
      </body>
    </html>
  );
}
